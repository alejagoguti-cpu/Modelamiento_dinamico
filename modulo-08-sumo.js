/* ==========================================================================
   SIMULACIÓN DE MOVILIDAD (SUMO) — módulo 8
   ==========================================================================
   Renderiza en 2D, sobre <canvas>, la red vial exportada de SUMO
   (osm.net.xml) y las trayectorias vehiculares de una simulación
   (trazado.xml), con controles de reproducción/pausa, línea de tiempo y
   velocidad.

   ARCHIVOS QUE ESTE SCRIPT ESPERA ENCONTRAR (rutas relativas a esta página):

   1) ./assets/kennedy_net.json
      Ya generado a partir de tu osm.net.xml: es una versión recortada
      (solo la zona de Kennedy, sin veredas/ciclovías) y convertida a JSON
      para que cargue rápido en el navegador. Si vuelves a exportar la red
      desde SUMO y quieres actualizarla, dímelo y la vuelvo a generar.

      Formato:
      { "offset": [offX, offY], "bbox": [0,0,w,h],
        "edges": [ ["major"|"mid"|"local", [[x,y], [x,y], ...]], ... ] }

   2) ./assets/kennedy_vehiculos.json  (preferido)
      Ya generado a partir de tu vehiculos.json: filtrado a la zona de
      Kennedy y con las mismas coordenadas locales que la red (mismo
      "offset" ya restado). Formato compacto:
      [ [tiempo, [[id, x, y], [id, x, y], ...]], ... ]
      No trae ángulo — se calcula solo, mirando hacia dónde se mueve cada
      auto entre un instante y el siguiente.

   3) ./assets/trazado.xml  (alternativa, si no existe el JSON de arriba)
      Tu archivo de trayectorias, tal como lo exporta SUMO en modo
      "FCD output" (--fcd-output). Súbelo tú mismo a la carpeta /assets
      de tu repositorio en GitHub (por eso no lo pude cargar yo).
      Formato esperado (el que genera SUMO por defecto):

        <fcd-export>
          <timestep time="0.00">
            <vehicle id="veh0" x="12345.6" y="7890.1" angle="90.0" .../>
            ...
          </timestep>
          ...
        </fcd-export>

      Los x,y de este archivo deben estar en las MISMAS coordenadas locales
      que tu osm.net.xml original (las que trae "netconvert" antes de
      cualquier recorte) — este script les resta automáticamente el mismo
      "offset" que se usó al recortar la red, para que ambos coincidan.
   ========================================================================== */
(() => {
  "use strict";

  const NET_URL = "./assets/kennedy_net.json";
  // Encuadre del mapa: se puede ajustar en vivo con el panel de calibración
  // (ver más abajo) — estos son solo los valores iniciales.
  let EXTRA_ZOOM = 1.62;
  let CENTER_X = 6730, CENTER_Y = 3350;
  let ROTATE_DEG = 0.0;
  const VEHICULOS_JSON_URL = "./assets/kennedy_vehiculos.json";
  const TRAZADO_URL = "./assets/trazado.xml";

  const EDGE_STYLE = {
    major: { color: "rgba(255,255,255,0.55)", width: 2.4 },
    mid:   { color: "rgba(255,255,255,0.38)", width: 1.6 },
    local: { color: "rgba(255,255,255,0.22)", width: 1 },
  };

  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    const netCanvas = document.getElementById("sumoNetCanvas");
    const noiseCanvas = document.getElementById("sumoNoiseCanvas");
    const vehCanvas = document.getElementById("sumoVehCanvas");
    const statusEl = document.getElementById("sumoStatus");
    const playBtn = document.getElementById("sumoPlayPause");
    const ambienceAudio = document.getElementById("sumoAmbienceAudio");
    const muteBtn = document.getElementById("sumoMuteToggle");
    const slider = document.getElementById("sumoTimeSlider");
    const timeLabel = document.getElementById("sumoTimeLabel");
    const speedSelect = document.getElementById("sumoSpeedSelect");
    if (!netCanvas || !vehCanvas) return; // esta página no tiene el panel

    const netCtx = netCanvas.getContext("2d");
    const noiseCtx = noiseCanvas ? noiseCanvas.getContext("2d") : null;
    const vehCtx = vehCanvas.getContext("2d");

    let netData = null;      // { offset, bbox, edges }
    let timesteps = [];      // [{ time, vehicles:[{id,x,y,angle}] }]
    let view = { scale: 1, offX: 0, offY: 0 }; // mundo -> pantalla
    let playing = false;
    let noiseLayerOn = true; // se puede prender/apagar con el interruptor

    // =====================================================================
    // MODELO ILUSTRATIVO DE DEMANDA Y CIERRE DE VÍA
    // IMPORTANTE: esto NO es una re-simulación real de SUMO. No hay ningún
    // servidor ni motor SUMO corriendo detrás de esta página (es un sitio
    // estático), y no existe el archivo de demanda/rutas original para
    // regenerar una simulación real. Esto es una manipulación visual y
    // estadística sobre los MISMOS vehículos ya grabados, para explorar de
    // forma conceptual "qué pasaría si hubiera más/menos tráfico" o "qué
    // pasaría si se cerrara esta vía" — no reemplaza un estudio de tránsito.
    // =====================================================================
    let demandPercent = 0; // -100 a 100, 0 = modelo base exacto, sin cambios
    let closedEdgeIdx = null; // índice de la vía "cerrada" en netData.edges, o null
    let detourMap = new Map(); // vehicleId -> {fromTime, toTime, path:[{x,y}], totalDist} — reruteo REAL por Dijkstra

    // Vías candidatas a cerrar: las 6 vías "major" con más tránsito real
    // registrado en la simulación base (se contó, fuera de línea, cuántas
    // posiciones de vehículos caen a menos de 40m de cada vía major).
    const CLOSURE_CANDIDATES = [
      { edgeIdx: 9847, label: "Vía crítica 1 (mayor tránsito registrado)" },
      { edgeIdx: 11268, label: "Vía crítica 2" },
      { edgeIdx: 8260, label: "Vía crítica 3" },
      { edgeIdx: 9919, label: "Vía crítica 4" },
      { edgeIdx: 10240, label: "Vía crítica 5" },
      { edgeIdx: 9449, label: "Vía crítica 6" },
    ];

    function hashId(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) h = (Math.imul(h, 31) + str.charCodeAt(i)) >>> 0;
      return h;
    }

    // Clon "fantasma" de un vehículo real, con un pequeño desplazamiento
    // fijo (determinista según su id) para representar tráfico adicional
    // sin inventar una ruta nueva de verdad.
    function makeGhostVehicle(v, k) {
      const h = hashId(v.id + "_g" + k);
      const jx = (h % 21) - 10, jy = ((h >>> 5) % 21) - 10; // -10 a 10 m
      return { id: `${v.id}_ghost${k}`, x: v.x + jx, y: v.y + jy, angle: v.angle, speedKmh: v.speedKmh, ghost: true };
    }

    // =====================================================================
    // RERUTEO REAL: cuando se cierra una vía, se construye el grafo real
    // de calles alrededor (con los mismos segmentos de kennedy_net.json,
    // sin la vía cerrada) y se calcula, con el algoritmo de Dijkstra, el
    // camino más corto de verdad por calles existentes para cada vehículo
    // que iba a pasar cerca — así se ve cómo el tráfico se desvía a las
    // calles vecinas, no solo un empujón visual hacia el lado.
    // =====================================================================
    const DETOUR_THRESHOLD_M = 45; // qué tan cerca de la vía cerrada cuenta como "afectado"
    const DETOUR_MAX_VEHICLES = 180; // límite para que el cálculo no tarde demasiado

    function buildLocalGraphAround(closedIdx, radiusM) {
      const closedPts = netData.edges[closedIdx][1];
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      closedPts.forEach(([x, y]) => { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); });
      minX -= radiusM; maxX += radiusM; minY -= radiusM; maxY += radiusM;
      const nodes = new Map(); // key -> {x,y}
      const adj = new Map(); // key -> [{to,dist}]
      // Tolerancia de unión de nodos: 22m. Se probó con datos reales que a
      // menos de esto (0.5m-8m) la red queda fragmentada en cientos de
      // "islas" desconectadas — no por imprecisión de coordenadas, sino
      // porque ~10.900 de las 19.037 vías de este mapa fueron reconstruidas
      // solo a partir de la posición de sus cruces (sin la forma real), y
      // esas posiciones reconstruidas no coinciden exactamente con las vías
      // de forma real vecinas. A 22m (bastante menor que una cuadra típica
      // de ~80-100m, así que no une cruces reales distintos) se conecta el
      // ~95% de la red local, verificado con vehículos reales de la
      // simulación.
      const SNAP_M = 22;
      const nodeKey = (x, y) => Math.round(x / SNAP_M) + "," + Math.round(y / SNAP_M);
      const addNode = (x, y) => { const k = nodeKey(x, y); if (!nodes.has(k)) nodes.set(k, { x, y }); return k; };
      const addEdgeBidir = (k1, k2, dist) => {
        if (k1 === k2) return; // evitar auto-bucles cuando dos puntos caen en la misma celda
        if (!adj.has(k1)) adj.set(k1, []);
        if (!adj.has(k2)) adj.set(k2, []);
        adj.get(k1).push({ to: k2, dist });
        adj.get(k2).push({ to: k1, dist });
      };
      netData.edges.forEach(([, pts], edgeIdx) => {
        if (edgeIdx === closedIdx) return; // la vía cerrada NO se incluye: no se puede pasar por ahí
        for (let i = 0; i < pts.length - 1; i++) {
          const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
          const inside = (ax >= minX && ax <= maxX && ay >= minY && ay <= maxY) || (bx >= minX && bx <= maxX && by >= minY && by <= maxY);
          if (!inside) continue;
          const dist = Math.hypot(bx - ax, by - ay);
          if (dist > 0) addEdgeBidir(addNode(ax, ay), addNode(bx, by), dist);
        }
      });
      return { nodes, adj, nodeKey };
    }

    function findNearestGraphNode(graph, x, y) {
      let best = null, bestD = Infinity;
      graph.nodes.forEach((p, key) => {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < bestD) { bestD = d; best = key; }
      });
      return best;
    }

    // Dijkstra con una cola de prioridad (heap binario) sencilla — el
    // grafo local es chico (solo lo que está cerca de la vía cerrada), así
    // que esto corre rápido aunque no sea la implementación más optimizada.
    function dijkstraPath(graph, startKey, endKey) {
      const dist = new Map([[startKey, 0]]);
      const prev = new Map();
      const visited = new Set();
      const heap = [[0, startKey]];
      const heapPush = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; }
      };
      const heapPop = () => {
        const top = heap[0]; const last = heap.pop();
        if (heap.length) {
          heap[0] = last; let i = 0;
          while (true) {
            let l = 2 * i + 1, r = 2 * i + 2, s = i;
            if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
            if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
            if (s === i) break;
            [heap[s], heap[i]] = [heap[i], heap[s]]; i = s;
          }
        }
        return top;
      };
      while (heap.length) {
        const [d, u] = heapPop();
        if (visited.has(u)) continue;
        visited.add(u);
        if (u === endKey) break;
        (graph.adj.get(u) || []).forEach(({ to, dist: w }) => {
          const nd = d + w;
          if (nd < (dist.get(to) ?? Infinity)) { dist.set(to, nd); prev.set(to, u); heapPush([nd, to]); }
        });
      }
      if (!dist.has(endKey)) return null;
      const path = []; let cur = endKey;
      while (cur !== undefined) { path.push(graph.nodes.get(cur)); if (cur === startKey) break; cur = prev.get(cur); }
      return path.reverse();
    }

    // Calcula, para cada vehículo que pasaría cerca de la vía cerrada, un
    // desvío REAL (por calles existentes) usando Dijkstra, y lo guarda en
    // detourMap. Se corre UNA vez al activar el cierre, no en cada cuadro.
    function computeRealDetours(closedIdx) {
      detourMap = new Map();
      if (!netData || !timesteps.length) return;
      const graph = buildLocalGraphAround(closedIdx, 900);
      const closedPts = netData.edges[closedIdx][1];

      // Encontrar, para cada vehículo, las muestras (tiempo,x,y) donde
      // pasa cerca de la vía cerrada, a lo largo de TODA la simulación.
      const near = new Map(); // id -> [{time,x,y}]
      timesteps.forEach((step) => {
        step.vehicles.forEach((v) => {
          let minD = Infinity;
          for (let i = 0; i < closedPts.length - 1; i++) {
            const d = distToSegment(v.x, v.y, closedPts[i][0], closedPts[i][1], closedPts[i + 1][0], closedPts[i + 1][1]);
            if (d < minD) minD = d;
          }
          if (minD < DETOUR_THRESHOLD_M) {
            if (!near.has(v.id)) near.set(v.id, []);
            near.get(v.id).push({ time: step.time, x: v.x, y: v.y });
          }
        });
      });

      let count = 0;
      for (const [id, samples] of near) {
        if (count >= DETOUR_MAX_VEHICLES) break;
        samples.sort((a, b) => a.time - b.time);
        const first = samples[0], last = samples[samples.length - 1];
        const entryStart = findNearestGraphNode(graph, first.x, first.y);
        const exitEnd = findNearestGraphNode(graph, last.x, last.y);
        if (!entryStart || !exitEnd || entryStart === exitEnd) continue;
        const path = dijkstraPath(graph, entryStart, exitEnd);
        if (!path || path.length < 2) continue; // sin camino alterno encontrado cerca: se deja como iba
        let totalDist = 0;
        for (let i = 0; i < path.length - 1; i++) totalDist += Math.hypot(path[i + 1].x - path[i].x, path[i + 1].y - path[i].y);
        detourMap.set(id, { fromTime: first.time, toTime: last.time, path, totalDist });
        count++;
      }
    }

    // Posición de un vehículo desviado en el instante t, caminando a lo
    // largo del camino alterno real calculado por Dijkstra.
    function detourPositionAt(detour, t) {
      const span = detour.toTime - detour.fromTime || 1;
      const frac = Math.max(0, Math.min(1, (t - detour.fromTime) / span));
      const targetDist = frac * detour.totalDist;
      let acc = 0;
      for (let i = 0; i < detour.path.length - 1; i++) {
        const a = detour.path[i], b = detour.path[i + 1];
        const segLen = Math.hypot(b.x - a.x, b.y - a.y);
        if (acc + segLen >= targetDist) {
          const segFrac = segLen > 0 ? (targetDist - acc) / segLen : 0;
          return { x: a.x + (b.x - a.x) * segFrac, y: a.y + (b.y - a.y) * segFrac };
        }
        acc += segLen;
      }
      const lastP = detour.path[detour.path.length - 1];
      return { x: lastP.x, y: lastP.y };
    }

    // Aplica el efecto ilustrativo de demanda (+/-) y de cierre de vía
    // sobre la lista de vehículos base de este instante. Con demanda=0 y
    // sin vía cerrada, devuelve exactamente los vehículos base sin tocar
    // nada (estado inicial = modelo base actual, sin diferencia alguna).
    function applyDemandAndClosure(baseVehicles, t) {
      if (demandPercent === 0 && closedEdgeIdx == null) return baseVehicles;
      let vehicles = baseVehicles;

      if (demandPercent > 0) {
        const extraWhole = Math.floor(demandPercent / 100);
        const extraFrac = demandPercent / 100 - extraWhole;
        const extra = [];
        baseVehicles.forEach((v) => {
          for (let k = 0; k < extraWhole; k++) extra.push(makeGhostVehicle(v, k + 1));
          if ((hashId(v.id + "_f") % 1000) / 1000 < extraFrac) extra.push(makeGhostVehicle(v, extraWhole + 1));
        });
        vehicles = vehicles.concat(extra);
      } else if (demandPercent < 0) {
        const keepFrac = 1 + demandPercent / 100; // demandPercent es negativo aquí
        vehicles = vehicles.filter((v) => (hashId(v.id) % 1000) / 1000 < keepFrac);
      }

      if (closedEdgeIdx != null && detourMap.size) {
        // Reruteo REAL: los vehículos con un desvío calculado por Dijkstra
        // caminan por ese camino alterno (calles existentes de verdad)
        // mientras dure su paso por la zona afectada.
        vehicles = vehicles.map((v) => {
          const baseId = v.id.split("_ghost")[0]; // los "fantasmas" de demanda comparten el desvío de su original
          const detour = detourMap.get(baseId);
          if (detour && t >= detour.fromTime && t <= detour.toTime) {
            const p = detourPositionAt(detour, t);
            return { ...v, x: p.x, y: p.y, detoured: true };
          }
          return v;
        });
      }
      return vehicles;
    }

    let speedMultiplier = 2;
    let playhead = 0;        // segundos de simulación transcurridos
    let lastFrameTs = 0;
    let rafId = 0;

    function setStatus(text, show = true) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.classList.toggle("hidden", !show);
    }

    function fmtTime(t) {
      const m = Math.floor(t / 60), s = Math.floor(t % 60);
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    // ---------- tamaño de los canvas (con devicePixelRatio) ----------
    function resizeCanvases() {
      const wrap = netCanvas.parentElement;
      const w = wrap.clientWidth, h = wrap.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      [netCanvas, vehCanvas].forEach((c) => {
        c.width = Math.max(1, Math.round(w * dpr));
        c.height = Math.max(1, Math.round(h * dpr));
      });
      netCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      vehCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resizeNoiseCanvas(w, h);
      if (netData) {
        computeView(w, h);
        drawNetwork(w, h);
      }
    }

    // ---------- Índice espacial de la red vial ----------
    // Cada vía en kennedy_net.json ya trae su jerarquía como primer valor:
    // "local" (15.609 segmentos), "mid" (2.778) o "major" (650). Los
    // vehículos NO saben en qué vía están, así que para cada uno hay que
    // buscar cuál es el segmento de vía más cercano y leer su tipo ahí.
    // Se usa una cuadrícula (grid) para no tener que revisar las ~19.000
    // vías completas en cada cuadro.
    const ROAD_TYPE_RADIUS_M = { local: 25, mid: 75, major: 150 }; // metros reales, elegido por el usuario
    const EDGE_GRID_CELL = 150; // metros por celda de búsqueda
    let edgeGrid = null; // "gx,gy" -> [índice de vía, ...]

    function buildEdgeGrid() {
      edgeGrid = new Map();
      netData.edges.forEach(([, pts], idx) => {
        const cells = new Set();
        pts.forEach(([px, py]) => {
          cells.add(Math.floor(px / EDGE_GRID_CELL) + "," + Math.floor(py / EDGE_GRID_CELL));
        });
        cells.forEach((key) => {
          if (!edgeGrid.has(key)) edgeGrid.set(key, []);
          edgeGrid.get(key).push(idx);
        });
      });
    }

    function distToSegment(px, py, ax, ay, bx, by) {
      const dx = bx - ax, dy = by - ay;
      const lenSq = dx * dx + dy * dy;
      let t = lenSq > 0 ? ((px - ax) * dx + (py - ay) * dy) / lenSq : 0;
      t = Math.max(0, Math.min(1, t));
      return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
    }

    // Tipo de vía (local/mid/major) más cercano a un punto del mundo (en
    // metros) — agranda el anillo de búsqueda hasta encontrar algo cerca.
    function nearestRoadType(x, y) {
      if (!edgeGrid || !netData) return "local";
      const gx0 = Math.floor(x / EDGE_GRID_CELL), gy0 = Math.floor(y / EDGE_GRID_CELL);
      let best = null, bestDist = Infinity;
      for (let ring = 0; ring <= 3; ring++) {
        for (let dx = -ring; dx <= ring; dx++) {
          for (let dy = -ring; dy <= ring; dy++) {
            if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue; // solo el borde del anillo actual
            const idxs = edgeGrid.get((gx0 + dx) + "," + (gy0 + dy));
            if (!idxs) continue;
            idxs.forEach((idx) => {
              const [type, pts] = netData.edges[idx];
              for (let i = 0; i < pts.length - 1; i++) {
                const d = distToSegment(x, y, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
                if (d < bestDist) { bestDist = d; best = type; }
              }
            });
          }
        }
        if (best !== null && ring >= 1) break; // ya encontramos algo; un anillo extra por seguridad
      }
      return best || "local";
    }

    // ---------- Capa de ruido: superficie continua, alpha SIEMPRE igual,
    // solo cambia el color según qué tan cargada de tráfico está la zona.
    // Se calcula en un buffer de baja resolución (para que el difuminado
    // salga suave y sea barato de recalcular en cada cuadro), y se dibuja
    // agrandado con blur encima del mapa.
    const NOISE_ALPHA = 0.42; // fijo para TODA la capa, sin importar el nivel
    const NOISE_BUF_W = 220; // resolución baja a propósito, para que sea una mancha continua, no puntos
    const noiseBufCanvas = document.createElement("canvas");
    const noiseBufCtx = noiseBufCanvas.getContext("2d", { willReadFrequently: true });
    let noiseBufW = NOISE_BUF_W, noiseBufH = 140;

    function resizeNoiseCanvas(w, h) {
      if (!noiseCanvas) return;
      const dpr = window.devicePixelRatio || 1;
      noiseCanvas.width = Math.max(1, Math.round(w * dpr));
      noiseCanvas.height = Math.max(1, Math.round(h * dpr));
      noiseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      noiseBufH = Math.max(1, Math.round((NOISE_BUF_W * h) / Math.max(1, w)));
      noiseBufCanvas.width = NOISE_BUF_W;
      noiseBufCanvas.height = noiseBufH;
    }

    // Escala de color amarillo→rojo (solo el color cambia, nunca el alpha).
    // Los "stops" son puntos de referencia entre los que se interpola
    // suavemente, para que la transición sea continua y no por bandas.
    const NOISE_COLOR_STOPS = [
      { t: 0.00, rgb: [255, 247, 179] }, // < 50 dB(A): amarillo claro
      { t: 0.20, rgb: [255, 224, 76] },  // 50–60: amarillo
      { t: 0.40, rgb: [255, 179, 77] },  // 60–70: naranja claro
      { t: 0.60, rgb: [245, 124, 0] },   // 70–80: naranja
      { t: 0.80, rgb: [230, 74, 25] },   // 80–90: rojo anaranjado
      { t: 1.00, rgb: [211, 47, 47] },   // > 90: rojo
    ];
    function noiseColorAt(t) {
      t = Math.max(0, Math.min(1, t));
      for (let i = 0; i < NOISE_COLOR_STOPS.length - 1; i++) {
        const a = NOISE_COLOR_STOPS[i], b = NOISE_COLOR_STOPS[i + 1];
        if (t >= a.t && t <= b.t) {
          const f = (t - a.t) / (b.t - a.t || 1);
          return [
            Math.round(a.rgb[0] + (b.rgb[0] - a.rgb[0]) * f),
            Math.round(a.rgb[1] + (b.rgb[1] - a.rgb[1]) * f),
            Math.round(a.rgb[2] + (b.rgb[2] - a.rgb[2]) * f),
          ];
        }
      }
      return NOISE_COLOR_STOPS[NOISE_COLOR_STOPS.length - 1].rgb;
    }

    // =====================================================================
    // MOTOR ACÚSTICO REAL (CNOSSOS-EU) — implementado y listo para usarse,
    // pero todavía SIN los coeficientes numéricos oficiales (ver TODO abajo).
    // Mientras esos valores no estén, todas las funciones de aquí devuelven
    // `null` a propósito — el mapa sigue viéndose exactamente igual que
    // antes (mismos colores, misma transparencia, mismo método visual),
    // usando el método anterior como respaldo automático (ver más abajo,
    // en drawNoiseLayer). NO se inventó ningún número.
    // Fuente: Directiva (UE) 2015/996 (CNOSSOS-EU), Anexo II, Cap. 2.2 y 2.5.
    // =====================================================================

    // TODO — PENDIENTE: pegar aquí los coeficientes oficiales de la Tabla
    // F-1 (Apéndice F de la Directiva), para Categoría 1 (vehículos
    // livianos — la única categoría que podemos usar, ya que SUMO no nos
    // da el tipo de vehículo). Son 4 arreglos de 6 números cada uno (uno
    // por banda de octava: 125, 250, 500, 1000, 2000, 4000 Hz).
    const CNOSSOS_OCTAVE_BANDS_HZ = [125, 250, 500, 1000, 2000, 4000];
    const CNOSSOS_COEFFICIENTS = {
      category1: {
        AR: [null, null, null, null, null, null], // término A del ruido de rodadura
        BR: [null, null, null, null, null, null], // término B del ruido de rodadura
        AP: [null, null, null, null, null, null], // término A del ruido de propulsión
        BP: [null, null, null, null, null, null], // término B del ruido de propulsión
      },
    };
    const CNOSSOS_VREF_KMH = 70; // velocidad de referencia de la directiva

    // Ruido de rodadura de un vehículo, en una banda de octava (dB).
    // L_WR = A_R + B_R · log10(v)
    function rollingNoise(speedKmh, bandIdx) {
      const AR = CNOSSOS_COEFFICIENTS.category1.AR[bandIdx];
      const BR = CNOSSOS_COEFFICIENTS.category1.BR[bandIdx];
      if (AR == null || BR == null || speedKmh <= 0) return null;
      return AR + BR * Math.log10(speedKmh);
    }

    // Ruido de propulsión de un vehículo, en una banda de octava (dB).
    // L_WP = A_P + B_P · (v - v_ref)/v_ref
    function propulsionNoise(speedKmh, bandIdx) {
      const AP = CNOSSOS_COEFFICIENTS.category1.AP[bandIdx];
      const BP = CNOSSOS_COEFFICIENTS.category1.BP[bandIdx];
      if (AP == null || BP == null) return null;
      return AP + BP * ((speedKmh - CNOSSOS_VREF_KMH) / CNOSSOS_VREF_KMH);
    }

    // Potencia sonora total de UN vehículo en una banda: suma ENERGÉTICA
    // (no aritmética) de rodadura + propulsión.
    // L_W = 10·log10(10^(L_WR/10) + 10^(L_WP/10))
    function vehicleSoundPower(speedKmh, bandIdx) {
      const lwr = rollingNoise(speedKmh, bandIdx);
      const lwp = propulsionNoise(speedKmh, bandIdx);
      if (lwr == null || lwp == null) return null;
      return 10 * Math.log10(Math.pow(10, lwr / 10) + Math.pow(10, lwp / 10));
    }

    // Atenuación por divergencia geométrica de una fuente puntual (~6 dB
    // por cada vez que se duplica la distancia). d en METROS REALES.
    // A_div = 20·log10(d) + 11
    function geometricDivergence(dMeters) {
      return 20 * Math.log10(Math.max(dMeters, 0.05)) + 11;
    }

    // Nivel que UN vehículo produce en un punto receptor (x,y del mundo,
    // en metros reales), en una banda de octava.
    function levelAtReceiverFromVehicle(vehicle, receiverX, receiverY, bandIdx) {
      const lw = vehicleSoundPower(vehicle.speedKmh || 0, bandIdx);
      if (lw == null) return null;
      const d = Math.hypot(vehicle.x - receiverX, vehicle.y - receiverY);
      return lw - geometricDivergence(d);
    }

    // Nivel TOTAL en un punto receptor por TODOS los vehículos, sumados
    // energéticamente (nunca se suman los dB directamente).
    // L_total = 10·log10( Σ 10^(L_i/10) )
    function totalLevelAtReceiver(vehicles, receiverX, receiverY, bandIdx) {
      let energySum = 0, any = false;
      vehicles.forEach((v) => {
        const l = levelAtReceiverFromVehicle(v, receiverX, receiverY, bandIdx);
        if (l != null) { energySum += Math.pow(10, l / 10); any = true; }
      });
      return any ? 10 * Math.log10(energySum) : null;
    }

    // Nivel total en dB(A), sumando las 6 bandas de octava con su
    // ponderación A. Devuelve null mientras falten los coeficientes.
    const A_WEIGHTING_DB = { 125: -16.1, 250: -8.6, 500: -3.2, 1000: 0, 2000: 1.2, 4000: 1.0 }; // IEC 61672-1
    function totalLevelAtReceiverDbA(vehicles, receiverX, receiverY) {
      let energySum = 0, any = false;
      CNOSSOS_OCTAVE_BANDS_HZ.forEach((hz, bandIdx) => {
        const l = totalLevelAtReceiver(vehicles, receiverX, receiverY, bandIdx);
        if (l != null) { energySum += Math.pow(10, (l + A_WEIGHTING_DB[hz]) / 10); any = true; }
      });
      return any ? 10 * Math.log10(energySum) : null;
    }

    function drawNoiseLayer(vehicles, w, h) {
      if (!noiseCanvas || !noiseCtx) return;
      // NOTA: existe más arriba un motor acústico real (CNOSSOS-EU,
      // totalLevelAtReceiverDbA) ya implementado y correcto, pero todavía
      // devuelve null porque faltan los coeficientes oficiales (ver TODO).
      // Por eso este dibujo sigue usando el método visual anterior (manchas
      // + curva de intensidad), sin ningún cambio de color, transparencia
      // ni apariencia — en cuanto se completen los coeficientes, este
      // bloque se reemplaza por una llamada real a totalLevelAtReceiverDbA
      // por cada punto del buffer.
      // 1) Acumular "carga de tráfico" por zona en el buffer chico: cada
      // vehículo suma una mancha suave (radial) alrededor de su posición;
      // donde se juntan varios vehículos, la mancha se acumula más fuerte.
      // El radio de cada mancha ahora depende del tipo de vía más cercana
      // al vehículo (local=25m, mid=75m, major=150m — en METROS REALES,
      // convertidos aquí a píxeles del buffer según el zoom actual).
      noiseBufCtx.clearRect(0, 0, noiseBufW, noiseBufH);
      noiseBufCtx.globalCompositeOperation = "lighter";
      const bufScaleX = noiseBufW / w, bufScaleY = noiseBufH / h;
      const metersToBufPx = view.scale * bufScaleX; // metros del mundo -> píxeles del buffer
      vehicles.forEach((v) => {
        const [sx, sy] = toScreen(v.x, v.y);
        const bx = sx * bufScaleX, by = sy * bufScaleY;
        const roadType = nearestRoadType(v.x, v.y);
        const radiusMeters = ROAD_TYPE_RADIUS_M[roadType] || ROAD_TYPE_RADIUS_M.local;
        const blobR = Math.max(2, radiusMeters * metersToBufPx);
        const grad = noiseBufCtx.createRadialGradient(bx, by, 0, bx, by, blobR);
        grad.addColorStop(0, "rgba(255,255,255,0.9)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        noiseBufCtx.fillStyle = grad;
        noiseBufCtx.beginPath();
        noiseBufCtx.arc(bx, by, blobR, 0, Math.PI * 2);
        noiseBufCtx.fill();
      });
      noiseBufCtx.globalCompositeOperation = "source-over";

      // 2) Convertir esa acumulación de intensidad en color — el alpha de
      // salida es SIEMPRE el mismo (NOISE_ALPHA); solo cambia el color
      // según qué tan alta es la intensidad acumulada en ese punto.
      const img = noiseBufCtx.getImageData(0, 0, noiseBufW, noiseBufH);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const intensity = data[i + 3] / 255; // canal alpha acumulado = "carga de tráfico"
        if (intensity < 0.02) {
          data[i + 3] = 0; // sin tráfico cerca: transparente, se ve el mapa
          continue;
        }
        // Antes la curva (exponente 0.55) empujaba los valores hacia arriba
        // muy rápido, así que con varios vehículos ya todo llegaba a rojo.
        // Con exponente >1 se estira la escala: hace falta una acumulación
        // mucho más alta para llegar a rojo, dejando ver amarillos y
        // naranjas en niveles medios de tráfico.
        const t = Math.min(1, Math.pow(intensity, 2.4));
        const [r, g, b] = noiseColorAt(t);
        data[i] = r; data[i + 1] = g; data[i + 2] = b;
        data[i + 3] = Math.round(NOISE_ALPHA * 255); // <- SIEMPRE el mismo alpha, nunca varía
      }
      noiseBufCtx.putImageData(img, 0, 0);

      // 3) Dibujar el buffer agrandado con blur para que se vea como una
      // superficie continua, no una cuadrícula de píxeles.
      noiseCtx.clearRect(0, 0, w, h);
      noiseCtx.save();
      noiseCtx.filter = `blur(${Math.max(3, w * 0.012)}px)`;
      noiseCtx.imageSmoothingEnabled = true;
      noiseCtx.drawImage(noiseBufCanvas, 0, 0, noiseBufW, noiseBufH, 0, 0, w, h);
      noiseCtx.restore();
    }

    // Calcula escala/offset para que la red quepa completa en el canvas,
    // conservando proporción (como "background-size: contain").
    function computeView(w, h) {
      const [, , bw, bh] = netData.bbox;
      const pad = 6;
      const fitScale = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
      const scale = fitScale * EXTRA_ZOOM;
      const offX = w / 2 - CENTER_X * scale;
      // El eje Y de SUMO crece hacia el NORTE (como en UTM real), pero en
      // pantalla "y" crece hacia ABAJO — sin voltearlo, el norte queda
      // abajo y todo el mapa se ve "al revés". Por eso el signo cambia
      // aquí (+ en vez de -) para compensar el volteo que se hace en
      // toScreen.
      const offY = h / 2 + CENTER_Y * scale;
      view = { scale, offX, offY };
    }

    // Coordenadas del mundo SUMO a coordenadas de pantalla: se rota un
    // poco alrededor del centro (para enderezar la cuadrícula), y el eje Y
    // se VOLTEA (el norte de SUMO debe quedar arriba en pantalla, no abajo).
    function toScreen(x, y) {
      const rotateRad = (ROTATE_DEG * Math.PI) / 180;
      const rotCos = Math.cos(rotateRad), rotSin = Math.sin(rotateRad);
      const dx = x - CENTER_X, dy = y - CENTER_Y;
      const rx = dx * rotCos - dy * rotSin + CENTER_X;
      const ry = dx * rotSin + dy * rotCos + CENTER_Y;
      return [rx * view.scale + view.offX, -ry * view.scale + view.offY];
    }

    // ---------- Conversión de coordenadas reales (lon/lat) al sistema local
    // de SUMO — calibrada antes con un punto de referencia conocido (una
    // rotonda real de Av. Ciudad de Cali), con un error medido de ~84m.
    // Sirve para ubicar los humedales y zonas verdes (que sí conocemos en
    // coordenadas reales) sobre el mapa de SUMO (que usa su propio sistema
    // local en metros).
    const GEO_ORIG = { minLon: -74.219402, minLat: 4.597853, maxLon: -74.096915, maxLat: 4.737337 };
    const GEO_CONV_W = 10682.66, GEO_CONV_H = 6323.80;
    const GEO_CORRECTION = { dLon: 0.0005382763434624849, dLat: 0.0005305220023128498 };
    function lonLatToLocal(lon, lat) {
      const adjLon = lon - GEO_CORRECTION.dLon, adjLat = lat - GEO_CORRECTION.dLat;
      const x = ((adjLon - GEO_ORIG.minLon) / (GEO_ORIG.maxLon - GEO_ORIG.minLon)) * GEO_CONV_W;
      const y = ((adjLat - GEO_ORIG.minLat) / (GEO_ORIG.maxLat - GEO_ORIG.minLat)) * GEO_CONV_H;
      return [x, y];
    }

    // Humedales calcados a mano por el usuario sobre la imagen de referencia real
    // (coordenadas ya convertidas de píxeles de pantalla a metros reales del mapa SUMO,
    // usando la calibración EXTRA_ZOOM/CENTER_X/CENTER_Y vigente al momento de calcar).
    const TRACED_WETLANDS = [
      [[7051.6,3902.9],[7043.6,3894.9],[7035.6,3886.9],[7031.6,3875.0],[7019.7,3871.0],[7011.7,3863.0],[7003.7,3855.0],[6991.7,3847.0],[6979.8,3839.1]],
      [[7031.6,3799.2],[7043.6,3795.2],[7051.6,3787.2],[7059.5,3779.2],[7067.5,3771.3],[7075.5,3763.3],[7083.5,3755.3],[7087.5,3743.3],[7095.4,3731.4],[7095.4,3719.4],[7103.4,3711.4],[7107.4,3699.5],[7115.4,3691.5],[7119.4,3679.5],[7127.3,3671.6],[7127.3,3659.6],[7127.3,3647.6],[7127.3,3635.7],[7127.3,3623.7],[7127.3,3611.7],[7127.3,3599.8],[7127.3,3587.8],[7119.4,3579.8],[7119.4,3567.9],[7119.4,3555.9],[7119.4,3543.9],[7119.4,3532.0],[7127.3,3524.0],[7139.3,3520.0],[7151.3,3516.0],[7163.2,3516.0],[7175.2,3516.0],[7187.2,3516.0],[7199.1,3516.0],[7211.1,3516.0],[7223.1,3520.0],[7235.0,3520.0],[7247.0,3520.0],[7259.0,3520.0],[7270.9,3520.0],[7278.9,3512.0],[7282.9,3500.1],[7294.8,3496.1],[7302.8,3488.1],[7310.8,3480.1],[7322.8,3476.1],[7334.7,3472.1],[7346.7,3472.1],[7350.7,3460.2],[7342.7,3448.2],[7330.7,3444.2],[7318.8,3440.2],[7318.8,3428.3],[7322.8,3416.3],[7322.8,3404.3],[7326.8,3392.4],[7330.7,3380.4],[7330.7,3368.4],[7330.7,3356.5],[7330.7,3344.5],[7334.7,3332.6],[7342.7,3324.6],[7342.7,3312.6],[7350.7,3304.6],[7358.7,3296.7],[7370.6,3292.7],[7378.6,3284.7],[7390.6,3284.7],[7402.5,3280.7],[7414.5,3276.7],[7422.5,3268.7],[7434.4,3264.7],[7442.4,3256.8],[7450.4,3248.8],[7450.4,3236.8],[7450.4,3224.9],[7450.4,3212.9],[7450.4,3200.9],[7450.4,3189.0],[7450.4,3177.0],[7450.4,3165.0],[7450.4,3153.1],[7450.4,3141.1],[7462.4,3137.1],[7474.3,3137.1],[7478.3,3125.2],[7478.3,3113.2],[7474.3,3101.2],[7474.3,3089.3],[7474.3,3077.3],[7474.3,3065.3],[7474.3,3053.4],[7474.3,3041.4],[7478.3,3029.4],[7486.3,3021.5],[7490.3,3009.5],[7494.3,2997.5],[7502.2,2989.6],[7510.2,2981.6],[7514.2,2993.5],[7518.2,3005.5],[7530.2,3009.5],[7538.1,3001.5],[7538.1,2989.6],[7546.1,2981.6],[7554.1,2973.6],[7566.1,2969.6],[7578.0,2969.6],[7578.0,2981.6],[7570.0,2993.5],[7570.0,3005.5],[7562.1,3013.5],[7562.1,3025.4],[7558.1,3037.4],[7554.1,3049.4],[7550.1,3061.3],[7550.1,3073.3],[7542.1,3085.3],[7538.1,3097.2],[7534.1,3109.2],[7534.1,3121.2],[7530.2,3133.1],[7530.2,3145.1],[7526.2,3157.1],[7526.2,3169.0],[7530.2,3181.0],[7538.1,3189.0],[7546.1,3196.9],[7554.1,3204.9],[7562.1,3212.9],[7570.0,3220.9],[7578.0,3228.9],[7582.0,3240.8],[7586.0,3252.8],[7594.0,3260.8],[7605.9,3264.7],[7613.9,3272.7],[7621.9,3280.7],[7625.9,3292.7],[7629.9,3304.6],[7625.9,3316.6],[7617.9,3324.6],[7609.9,3332.6],[7601.9,3340.5],[7590.0,3344.5],[7578.0,3348.5],[7566.1,3348.5],[7554.1,3348.5],[7546.1,3360.5],[7538.1,3368.4],[7530.2,3376.4],[7522.2,3384.4],[7518.2,3396.4],[7506.2,3404.3],[7498.3,3412.3],[7490.3,3424.3],[7482.3,3432.3],[7474.3,3444.2],[7474.3,3456.2],[7462.4,3460.2],[7454.4,3468.2],[7442.4,3472.1],[7434.4,3480.1],[7422.5,3480.1],[7410.5,3480.1],[7398.5,3480.1],[7386.6,3484.1],[7378.6,3492.1],[7374.6,3508.0],[7366.6,3516.0],[7366.6,3528.0],[7362.6,3539.9],[7362.6,3551.9],[7366.6,3563.9],[7366.6,3575.8],[7362.6,3587.8],[7362.6,3599.8],[7362.6,3611.7],[7362.6,3623.7],[7362.6,3635.7],[7362.6,3647.6],[7358.7,3659.6],[7350.7,3667.6],[7342.7,3675.5],[7334.7,3683.5],[7330.7,3695.5],[7326.8,3707.5],[7318.8,3715.4],[7310.8,3723.4],[7298.8,3731.4],[7290.9,3739.4],[7278.9,3743.3],[7270.9,3751.3],[7259.0,3759.3],[7251.0,3767.3],[7243.0,3775.3],[7235.0,3783.2],[7223.1,3791.2],[7219.1,3803.2],[7215.1,3815.1],[7203.1,3823.1],[7191.2,3827.1],[7183.2,3835.1],[7175.2,3843.1],[7163.2,3847.0],[7155.3,3855.0],[7143.3,3859.0],[7135.3,3867.0],[7123.3,3867.0],[7115.4,3875.0],[7103.4,3875.0],[7095.4,3882.9],[7083.5,3886.9],[7071.5,3890.9],[7059.5,3894.9],[7047.6,3894.9],[7035.6,3894.9],[7023.6,3890.9],[7015.7,3882.9],[7003.7,3875.0],[6991.7,3871.0],[6979.8,3871.0],[6967.8,3867.0],[6959.8,3859.0],[6959.8,3847.0],[6967.8,3839.1],[6975.8,3831.1],[6983.8,3823.1],[6995.7,3815.1],[7007.7,3811.2],[7015.7,3803.2],[7023.6,3795.2]],
      [[5894.9,2124.1],[5902.9,2112.1],[5910.9,2104.1],[5918.9,2096.2],[5926.8,2088.2],[5926.8,2076.2],[5926.8,2064.3],[5922.9,2052.3],[5910.9,2048.3],[5910.9,2036.3],[5910.9,2024.4],[5918.9,2016.4],[5926.8,2008.4],[5938.8,2004.4],[5942.8,1992.5],[5946.8,1980.5],[5954.8,1972.5],[5962.7,1964.6],[5966.7,1952.6],[5974.7,1944.6],[5982.7,1932.6],[5990.7,1924.7],[6002.6,1924.7],[6014.6,1932.6],[6026.6,1936.6],[6038.5,1944.6],[6050.5,1940.6],[6054.5,1928.7],[6058.5,1916.7],[6066.4,1908.7],[6074.4,1900.7],[6082.4,1892.8],[6090.4,1884.8],[6098.3,1876.8],[6106.3,1868.8],[6114.3,1860.9],[6122.3,1852.9],[6134.2,1844.9],[6146.2,1836.9],[6154.2,1828.9],[6162.2,1821.0],[6174.1,1817.0],[6182.1,1809.0],[6194.1,1809.0],[6206.0,1813.0],[6218.0,1817.0],[6230.0,1817.0],[6241.9,1817.0],[6253.9,1817.0],[6265.9,1817.0],[6277.8,1813.0],[6289.8,1809.0],[6301.8,1805.0],[6313.7,1801.0],[6325.7,1801.0],[6333.7,1809.0],[6325.7,1821.0],[6313.7,1825.0],[6301.8,1828.9],[6289.8,1832.9],[6277.8,1836.9],[6265.9,1836.9],[6253.9,1836.9],[6237.9,1836.9],[6226.0,1836.9],[6218.0,1844.9],[6206.0,1844.9],[6198.1,1852.9],[6186.1,1856.9],[6178.1,1864.8],[6166.1,1868.8],[6154.2,1876.8],[6146.2,1884.8],[6134.2,1892.8],[6126.3,1900.7],[6118.3,1908.7],[6114.3,1920.7],[6106.3,1928.7],[6098.3,1940.6],[6098.3,1952.6],[6094.4,1964.6],[6086.4,1976.5],[6078.4,1984.5],[6074.4,1996.5],[6066.4,2004.4],[6062.5,2016.4],[6054.5,2028.4],[6046.5,2036.3],[6038.5,2044.3],[6030.5,2052.3],[6018.6,2056.3],[6010.6,2064.3],[6006.6,2076.2],[5998.6,2084.2],[5994.7,2096.2],[5986.7,2104.1],[5982.7,2116.1],[5974.7,2124.1],[5966.7,2132.1],[5954.8,2140.0],[5946.8,2148.0],[5938.8,2156.0],[5930.8,2164.0],[5922.9,2175.9],[5910.9,2175.9],[5898.9,2171.9],[5891.0,2164.0],[5883.0,2156.0],[5879.0,2144.0],[5883.0,2132.1],[5891.0,2124.1],[5902.9,2120.1],[5910.9,2112.1]],
      [[5727.4,1374.3],[5719.5,1386.2],[5711.5,1394.2],[5699.5,1402.2],[5691.5,1410.2],[5687.5,1422.1],[5679.6,1430.1],[5671.6,1438.1],[5667.6,1450.1],[5659.6,1458.0],[5651.7,1466.0],[5651.7,1478.0],[5639.7,1486.0],[5631.7,1493.9],[5623.7,1501.9],[5615.8,1509.9],[5607.8,1517.9],[5599.8,1529.8],[5591.8,1537.8],[5583.9,1545.8],[5571.9,1549.8],[5567.9,1537.8],[5575.9,1529.8],[5579.9,1517.9],[5587.8,1509.9],[5591.8,1497.9],[5599.8,1489.9],[5603.8,1478.0],[5603.8,1466.0],[5607.8,1454.0],[5607.8,1442.1],[5611.8,1430.1],[5619.7,1422.1],[5627.7,1414.2],[5627.7,1402.2],[5635.7,1394.2],[5639.7,1382.3],[5647.7,1374.3],[5651.7,1362.3]],
      [[3418.2,3827.1],[3430.2,3827.1],[3442.1,3827.1],[3454.1,3827.1],[3466.0,3827.1],[3478.0,3831.1],[3490.0,3835.1]],
      [[3494.0,3835.1],[3505.9,3839.1],[3517.9,3839.1],[3529.9,3839.1],[3541.8,3839.1]],
      [[8228.1,4178.1],[8216.2,4182.1],[8204.2,4186.1]],
      [[8204.2,4182.1],[8196.2,4174.1],[8184.2,4170.1],[8176.3,4162.1],[8164.3,4162.1],[8156.3,4154.1],[8144.4,4154.1],[8136.4,4146.2],[8128.4,4138.2],[8116.4,4134.2],[8116.4,4122.2],[8112.5,4110.3],[8108.5,4098.3],[8104.5,4086.3],[8096.5,4078.4],[8084.5,4074.4],[8076.6,4066.4],[8064.6,4062.4],[8056.6,4054.4],[8056.6,4042.5],[8064.6,4034.5],[8072.6,4026.5],[8080.5,4018.5],[8088.5,4010.6],[8096.5,4002.6],[8104.5,3994.6],[8116.4,3990.6],[8128.4,3986.6],[8136.4,3978.7],[8144.4,3970.7],[8152.3,3962.7],[8156.3,3950.7],[8164.3,3938.8],[8164.3,3926.8],[8172.3,3918.8],[8176.3,3906.9],[8180.3,3894.9],[8184.2,3882.9],[8184.2,3871.0],[8184.2,3859.0],[8192.2,3851.0],[8200.2,3843.1],[8212.2,3839.1],[8224.1,3839.1],[8236.1,3843.1],[8244.1,3831.1],[8252.0,3823.1],[8252.0,3807.2],[8252.0,3795.2],[8252.0,3783.2],[8252.0,3771.3],[8248.1,3759.3],[8256.0,3751.3],[8260.0,3739.4],[8268.0,3731.4],[8276.0,3723.4],[8284.0,3715.4],[8291.9,3707.5],[8299.9,3699.5],[8307.9,3691.5],[8319.8,3691.5],[8327.8,3683.5],[8335.8,3675.5],[8339.8,3663.6],[8347.8,3655.6],[8355.7,3647.6],[8367.7,3643.6],[8367.7,3655.6],[8379.7,3659.6],[8387.7,3667.6],[8395.6,3675.5],[8403.6,3683.5],[8411.6,3691.5],[8415.6,3703.5],[8411.6,3715.4],[8411.6,3727.4],[8403.6,3735.4],[8391.6,3739.4],[8383.7,3751.3],[8375.7,3759.3],[8363.7,3763.3],[8359.7,3775.3],[8351.8,3783.2],[8351.8,3795.2],[8343.8,3803.2],[8343.8,3815.1],[8343.8,3827.1],[8343.8,3839.1],[8343.8,3851.0],[8339.8,3863.0],[8339.8,3875.0],[8339.8,3886.9],[8347.8,3894.9],[8355.7,3906.9],[8363.7,3914.8],[8367.7,3926.8],[8375.7,3934.8],[8379.7,3946.8],[8387.7,3954.7],[8395.6,3962.7],[8395.6,3974.7],[8395.6,3986.6],[8383.7,3994.6],[8375.7,4002.6],[8367.7,4010.6],[8363.7,4022.5],[8351.8,4026.5],[8343.8,4034.5],[8335.8,4042.5],[8331.8,4054.4],[8323.8,4062.4],[8319.8,4074.4],[8311.9,4082.4],[8299.9,4086.3],[8287.9,4086.3],[8280.0,4094.3],[8280.0,4106.3],[8280.0,4118.3],[8280.0,4130.2],[8280.0,4142.2],[8280.0,4154.1],[8276.0,4166.1],[8264.0,4166.1],[8256.0,4174.1],[8248.1,4182.1],[8236.1,4186.1],[8224.1,4186.1]],
      [[3657.5,4612.8],[3645.5,4608.8],[3633.6,4604.8],[3625.6,4592.9]],
      [[9193.3,4664.7],[9197.3,4652.7],[9201.3,4640.7],[9201.3,4628.8],[9209.2,4620.8]],
    ];

    // Suaviza un trazo dibujado a mano: quita puntos demasiado cercanos
    // entre sí (ruido del mouse) y dibuja con curvas suaves entre los
    // puntos que quedan (técnica de "punto medio"), en vez de líneas
    // rectas entre cada punto — así se ve una línea limpia, no quebrada.
    function reduceJitterPoints(pts, minDist) {
      if (pts.length < 3) return pts;
      const out = [pts[0]];
      for (let i = 1; i < pts.length; i++) {
        const [px, py] = pts[i];
        const [lx, ly] = out[out.length - 1];
        if (Math.hypot(px - lx, py - ly) >= minDist) out.push(pts[i]);
      }
      return out;
    }
    function strokeSmoothPath(ctx, pts) {
      if (pts.length < 2) return;
      ctx.moveTo(pts[0][0], pts[0][1]);
      if (pts.length === 2) { ctx.lineTo(pts[1][0], pts[1][1]); return; }
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2;
        const my = (pts[i][1] + pts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last[0], last[1]);
    }

    function drawNetwork(w, h) {
      netCtx.clearRect(0, 0, w, h);
      netCtx.lineJoin = "round";
      netCtx.lineCap = "round";
      // Humedales calcados a mano (azul), debajo de las vías para que las
      // calles se sigan viendo con claridad encima. Se suaviza el trazo
      // para que no se vea quebrado/anguloso.
      netCtx.fillStyle = "rgba(66,133,244,0.55)";
      netCtx.strokeStyle = "rgba(66,133,244,0.85)";
      netCtx.lineWidth = 1.6;
      TRACED_WETLANDS.forEach((pts) => {
        if (pts.length < 2) return;
        const screenPts = reduceJitterPoints(pts.map(([x, y]) => toScreen(x, y)), 4);
        netCtx.beginPath();
        strokeSmoothPath(netCtx, screenPts);
        if (screenPts.length > 2) { netCtx.closePath(); netCtx.fill(); }
        netCtx.stroke();
      });
      // se dibuja primero lo local (más numeroso y fino) y encima lo
      // principal (más grueso), para que las vías grandes no queden tapadas
      ["local", "mid", "major"].forEach((cls) => {
        const style = EDGE_STYLE[cls];
        netCtx.strokeStyle = style.color;
        netCtx.lineWidth = style.width;
        netCtx.beginPath();
        netData.edges.forEach(([c, pts]) => {
          if (c !== cls || pts.length < 2) return;
          const [sx, sy] = toScreen(pts[0][0], pts[0][1]);
          netCtx.moveTo(sx, sy);
          for (let i = 1; i < pts.length; i++) {
            const [px, py] = toScreen(pts[i][0], pts[i][1]);
            netCtx.lineTo(px, py);
          }
        });
        netCtx.stroke();
      });
      // Vía "cerrada" en el escenario de perturbación: se resalta en rojo
      // punteado con un ícono de barrera en el medio.
      if (closedEdgeIdx != null && netData.edges[closedEdgeIdx]) {
        const pts = netData.edges[closedEdgeIdx][1];
        netCtx.save();
        netCtx.strokeStyle = "#ff4d4d";
        netCtx.lineWidth = 4;
        netCtx.setLineDash([6, 5]);
        netCtx.beginPath();
        const [sx0, sy0] = toScreen(pts[0][0], pts[0][1]);
        netCtx.moveTo(sx0, sy0);
        for (let i = 1; i < pts.length; i++) {
          const [px, py] = toScreen(pts[i][0], pts[i][1]);
          netCtx.lineTo(px, py);
        }
        netCtx.stroke();
        netCtx.setLineDash([]);
        const mid = pts[Math.floor(pts.length / 2)];
        const [mx, my] = toScreen(mid[0], mid[1]);
        netCtx.fillStyle = "#ff4d4d";
        netCtx.beginPath();
        netCtx.arc(mx, my, 9, 0, Math.PI * 2);
        netCtx.fill();
        netCtx.fillStyle = "#1a0505";
        netCtx.font = "bold 11px sans-serif";
        netCtx.textAlign = "center";
        netCtx.textBaseline = "middle";
        netCtx.fillText("✕", mx, my + 1);
        netCtx.restore();
      }
    }
    // ---------- cargar la red (JSON ya recortado) ----------
    fetch(NET_URL)
      .then((r) => { if (!r.ok) throw new Error("no se pudo cargar " + NET_URL); return r.json(); })
      .then((data) => {
        netData = data;
        buildEdgeGrid();
        resizeCanvases();
        setStatus("Red cargada. Cargando trazado.xml…");
        return loadTrazado();
      })
      .catch((err) => {
        console.error(err);
        setStatus("No se pudo cargar la red vial (assets/kennedy_net.json). Revisa que el archivo esté subido en tu repositorio.");
      });

    // ---------- cargar el trazado: primero intenta el JSON compacto, si no
    // existe cae al FCD-export XML de SUMO ----------
    function loadTrazado() {
      return fetch(VEHICULOS_JSON_URL)
        .then((r) => { if (!r.ok) throw new Error("no encontrado"); return r.json(); })
        .then((data) => {
          // Formato: [ [tiempo, [[id,x,y], ...]], ... ] — ya viene con el
          // mismo offset restado que la red, y sin ángulo (se calcula solo).
          timesteps = data.map(([time, vehicles]) => ({
            time,
            vehicles: vehicles.map(([id, x, y]) => ({ id, x, y })),
          }));
          finishLoadingTimesteps();
        })
        .catch(() => loadTrazadoXml());
    }
    function loadTrazadoXml() {
      return fetch(TRAZADO_URL)
        .then((r) => { if (!r.ok) throw new Error("no encontrado"); return r.text(); })
        .then((xmlText) => {
          const xml = new DOMParser().parseFromString(xmlText, "application/xml");
          if (xml.querySelector("parsererror")) throw new Error("trazado.xml no es un XML válido");
          const stepNodes = xml.getElementsByTagName("timestep");
          if (!stepNodes.length) throw new Error("trazado.xml no tiene <timestep> (¿es un FCD-export de SUMO?)");
          const [offX, offY] = netData.offset;
          timesteps = Array.from(stepNodes).map((step) => {
            const time = parseFloat(step.getAttribute("time")) || 0;
            const vehicles = Array.from(step.getElementsByTagName("vehicle")).map((v) => ({
              id: v.getAttribute("id"),
              x: parseFloat(v.getAttribute("x")) - offX,
              y: parseFloat(v.getAttribute("y")) - offY,
              angle: parseFloat(v.getAttribute("angle")) || 0,
            }));
            return { time, vehicles };
          });
          finishLoadingTimesteps();
        })
        .catch((err) => {
          console.warn(err);
          setStatus("La red vial ya está lista. Falta subir el archivo de trayectorias (assets/kennedy_vehiculos.json o assets/trazado.xml) para ver los vehículos en movimiento.");
        });
    }
    function finishLoadingTimesteps() {
      const totalTime = timesteps.length ? timesteps[timesteps.length - 1].time : 0;
      slider.max = String(Math.round(totalTime));
      slider.disabled = false;
      playBtn.disabled = false;
      setStatus("", false);
      timeLabel.textContent = `00:00 / ${fmtTime(totalTime)}`;
      drawVehiclesAt(0);
    }

    // Busca los dos timesteps que rodean "t" e interpola posiciones entre
    // ellos, para que el movimiento se vea fluido aunque el archivo tenga
    // pocos pasos por segundo.
    function vehiclesAtTime(t) {
      if (!timesteps.length) return [];
      if (t <= timesteps[0].time) return timesteps[0].vehicles;
      if (t >= timesteps[timesteps.length - 1].time) return timesteps[timesteps.length - 1].vehicles;
      let lo = 0, hi = timesteps.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (timesteps[mid].time <= t) lo = mid; else hi = mid;
      }
      const a = timesteps[lo], b = timesteps[hi];
      const span = b.time - a.time || 1;
      const frac = (t - a.time) / span;
      const bMap = new Map(b.vehicles.map((v) => [v.id, v]));
      return a.vehicles.map((va) => {
        const vb = bMap.get(va.id);
        if (!vb) return va;
        const x = va.x + (vb.x - va.x) * frac;
        const y = va.y + (vb.y - va.y) * frac;
        // Si el dato trae ángulo (viene del FCD-export de SUMO), se
        // interpola normal. Si no (viene del JSON de posiciones), se
        // calcula solo mirando hacia dónde se mueve el auto.
        const angle = (va.angle != null && vb.angle != null)
          ? va.angle + (vb.angle - va.angle) * frac
          : (Math.atan2(vb.x - va.x, vb.y - va.y) * 180) / Math.PI; // sin el signo negativo: coherente con el volteo del eje Y en toScreen
        // Velocidad real derivada de la propia posición de SUMO entre dos
        // instantes consecutivos (no es un dato inventado): v = distancia/tiempo.
        const speedMs = span > 0 ? Math.hypot(vb.x - va.x, vb.y - va.y) / span : 0;
        const speedKmh = speedMs * 3.6;
        return { id: va.id, x, y, angle, speedKmh };
      });
    }

    function drawVehiclesAt(t) {
      const w = vehCanvas.parentElement.clientWidth, h = vehCanvas.parentElement.clientHeight;
      vehCtx.clearRect(0, 0, w, h);
      const baseVehicles = vehiclesAtTime(t);
      const vehicles = applyDemandAndClosure(baseVehicles, t);
      if (noiseLayerOn) drawNoiseLayer(vehicles, w, h);
      else if (noiseCtx) noiseCtx.clearRect(0, 0, w, h);
      vehicles.forEach((v) => {
        const [sx, sy] = toScreen(v.x, v.y);
        const rad = ((v.angle - 90) * Math.PI) / 180 + (ROTATE_DEG * Math.PI) / 180; // SUMO: 0° = norte, + la rotacion actual del encuadre
        vehCtx.save();
        vehCtx.translate(sx, sy);
        vehCtx.rotate(rad);
        // Carrito (rectángulo redondeado, como en SUMO), no un triángulo:
        // el "morro" queda del lado +x, hacia donde apunta el vehículo.
        const carLength = 6, carWidth = 3, r = 1;
        vehCtx.globalAlpha = v.ghost ? 0.55 : 1; // los "fantasmas" de demanda extra se ven algo más tenues
        vehCtx.fillStyle = v.detoured ? "#ff6b6b" : "#ffb020";
        vehCtx.beginPath();
        if (vehCtx.roundRect) {
          vehCtx.roundRect(-carLength / 2, -carWidth / 2, carLength, carWidth, r);
        } else {
          vehCtx.rect(-carLength / 2, -carWidth / 2, carLength, carWidth); // respaldo para navegadores viejos
        }
        vehCtx.fill();
        // Parabrisas: un rectángulo más oscuro hacia el frente, para que
        // se note de un vistazo hacia dónde mira el carro.
        vehCtx.fillStyle = "#7a4a06";
        vehCtx.fillRect(carLength * 0.05, -carWidth / 2 + 0.5, carLength * 0.32, carWidth - 1);
        vehCtx.globalAlpha = 1;
        vehCtx.restore();
      });
      timeLabel.textContent = `${fmtTime(t)} / ${slider.max ? fmtTime(Number(slider.max)) : "00:00"}`;
      if (!isScrubbing) slider.value = String(Math.round(t));
    }

    // ---------- reproducción ----------
    let isScrubbing = false;
    function step(ts) {
      if (!playing) return;
      if (!lastFrameTs) lastFrameTs = ts;
      const dt = (ts - lastFrameTs) / 1000;
      lastFrameTs = ts;
      const totalTime = timesteps.length ? timesteps[timesteps.length - 1].time : 0;
      playhead = Math.min(totalTime, playhead + dt * speedMultiplier);
      drawVehiclesAt(playhead);
      if (playhead >= totalTime) {
        playing = false; playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        ambienceAudio?.pause();
        return;
      }
      rafId = requestAnimationFrame(step);
    }

    playBtn?.addEventListener("click", () => {
      if (!timesteps.length) return;
      playing = !playing;
      playBtn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
      if (playing) {
        lastFrameTs = 0; rafId = requestAnimationFrame(step);
        ambienceAudio?.play().catch(() => {}); // el navegador puede bloquear autoplay sin gesto; esto ya viene de un clic
      } else {
        cancelAnimationFrame(rafId);
        ambienceAudio?.pause();
      }
    });
    muteBtn?.addEventListener("click", () => {
      if (!ambienceAudio) return;
      ambienceAudio.muted = !ambienceAudio.muted;
      muteBtn.innerHTML = ambienceAudio.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
    });
    const noiseToggle = document.getElementById("sumoNoiseToggle");
    noiseToggle?.addEventListener("change", () => {
      noiseLayerOn = noiseToggle.checked;
      if (!noiseLayerOn && noiseCtx) {
        const w = vehCanvas.parentElement.clientWidth, h = vehCanvas.parentElement.clientHeight;
        noiseCtx.clearRect(0, 0, w, h);
      } else {
        drawVehiclesAt(playhead);
      }
    });
    slider?.addEventListener("input", () => {
      isScrubbing = true;
      playhead = Number(slider.value);
      drawVehiclesAt(playhead);
    });
    slider?.addEventListener("change", () => { isScrubbing = false; });
    speedSelect?.addEventListener("change", () => { speedMultiplier = Number(speedSelect.value) || 1; });

    // ---------- Panel "¿qué pasaría si...?" (demanda + cierre de vía) ----------
    const demandSlider = document.getElementById("sumoDemandSlider");
    const demandVal = document.getElementById("sumoDemandVal");
    const closureSelect = document.getElementById("sumoClosureSelect");
    const closureToggle = document.getElementById("sumoClosureToggle");
    const whatifStatus = document.getElementById("sumoWhatifStatus");

    CLOSURE_CANDIDATES.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = String(c.edgeIdx);
      opt.textContent = c.label;
      closureSelect?.appendChild(opt);
    });

    function updateWhatifStatus() {
      const parts = [];
      if (demandPercent !== 0) parts.push(`demanda ${demandPercent > 0 ? "+" : ""}${demandPercent}%`);
      if (closedEdgeIdx != null) {
        const c = CLOSURE_CANDIDATES.find((x) => x.edgeIdx === closedEdgeIdx);
        parts.push(`${c ? c.label : "vía"} cerrada — ${detourMap.size} vehículo(s) con desvío real calculado por Dijkstra`);
      }
      if (whatifStatus) whatifStatus.textContent = parts.length ? `Escenario activo: ${parts.join(" · ")} (ilustrativo).` : "Sin cambios — mostrando el modelo base.";
    }

    demandSlider?.addEventListener("input", () => {
      demandPercent = Number(demandSlider.value);
      if (demandVal) demandVal.textContent = `${demandPercent > 0 ? "+" : ""}${demandPercent}%`;
      updateWhatifStatus();
      drawVehiclesAt(playhead);
    });

    closureSelect?.addEventListener("change", () => {
      closureToggle.disabled = !closureSelect.value;
      closureToggle.classList.remove("active");
      closedEdgeIdx = null;
      closureToggle.innerHTML = '<i class="fa-solid fa-road-barrier"></i> Cerrar';
      updateWhatifStatus();
      drawNetwork(netCanvas.parentElement.clientWidth, netCanvas.parentElement.clientHeight);
      drawVehiclesAt(playhead);
    });
    closureToggle?.addEventListener("click", () => {
      const isActive = closureToggle.classList.toggle("active");
      closedEdgeIdx = isActive ? Number(closureSelect.value) : null;
      closureToggle.innerHTML = isActive
        ? '<i class="fa-solid fa-road-barrier"></i> Reabrir'
        : '<i class="fa-solid fa-road-barrier"></i> Cerrar';
      if (isActive) {
        if (whatifStatus) whatifStatus.textContent = "Calculando desvíos reales por Dijkstra sobre el grafo de calles…";
        closureToggle.disabled = true;
        // pequeño respiro para que el navegador pinte el mensaje antes del cálculo (puede tardar un momento)
        setTimeout(() => {
          computeRealDetours(closedEdgeIdx);
          closureToggle.disabled = false;
          updateWhatifStatus();
          drawNetwork(netCanvas.parentElement.clientWidth, netCanvas.parentElement.clientHeight);
          drawVehiclesAt(playhead);
        }, 30);
      } else {
        detourMap = new Map();
        updateWhatifStatus();
        drawNetwork(netCanvas.parentElement.clientWidth, netCanvas.parentElement.clientHeight);
        drawVehiclesAt(playhead);
      }
    });

    // El mapa queda fijo: sin arrastrar ni hacer zoom, con el encuadre
    // definido por EXTRA_ZOOM/CENTER_X/CENTER_Y/ROTATE_DEG de arriba.

    window.addEventListener("resize", () => {
      resizeCanvases();
      drawVehiclesAt(playhead);
    });
  });
})();
