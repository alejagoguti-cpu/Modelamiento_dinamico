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

    function drawNoiseLayer(vehicles, w, h) {
      if (!noiseCanvas || !noiseCtx) return;
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

    function drawNetwork(w, h) {
      netCtx.clearRect(0, 0, w, h);
      netCtx.lineJoin = "round";
      netCtx.lineCap = "round";
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
      // (marcadores de agua quitados a pedido)
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
        return { id: va.id, x, y, angle };
      });
    }

    function drawVehiclesAt(t) {
      const w = vehCanvas.parentElement.clientWidth, h = vehCanvas.parentElement.clientHeight;
      vehCtx.clearRect(0, 0, w, h);
      const vehicles = vehiclesAtTime(t);
      drawNoiseLayer(vehicles, w, h);
      vehicles.forEach((v) => {
        const [sx, sy] = toScreen(v.x, v.y);
        const rad = ((v.angle - 90) * Math.PI) / 180 + (ROTATE_DEG * Math.PI) / 180; // SUMO: 0° = norte, + la rotacion actual del encuadre
        vehCtx.save();
        vehCtx.translate(sx, sy);
        vehCtx.rotate(rad);
        // Carrito (rectángulo redondeado, como en SUMO), no un triángulo:
        // el "morro" queda del lado +x, hacia donde apunta el vehículo.
        const carLength = 6, carWidth = 3, r = 1;
        vehCtx.fillStyle = "#ffb020";
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
    slider?.addEventListener("input", () => {
      isScrubbing = true;
      playhead = Number(slider.value);
      drawVehiclesAt(playhead);
    });
    slider?.addEventListener("change", () => { isScrubbing = false; });
    speedSelect?.addEventListener("change", () => { speedMultiplier = Number(speedSelect.value) || 1; });

    // El mapa queda fijo: sin arrastrar ni hacer zoom, con el encuadre
    // definido por EXTRA_ZOOM/CENTER_X/CENTER_Y/ROTATE_DEG de arriba.

    window.addEventListener("resize", () => {
      resizeCanvases();
      drawVehiclesAt(playhead);
    });
  });
})();
