/* ==========================================================
   Módulo 02 · Red externa (base de datos cargada desde Excel → Supabase)

   Este archivo es independiente de modulo-02.js: agrega, sobre la misma
   red SVG (#networkViz), una capa con TODOS los elementos cargados desde
   la base de datos (m2_elementos) y sus conexiones (m2_conexiones).

   Para que sea una RED de verdad (nodos + flujos) y no un bloque compacto:
     - Cada nodo tiene un radio propio según su GRADO (cuántas conexiones
       tiene): los hubs son visiblemente más grandes que los periféricos.
     - La separación mínima entre dos nodos es la suma de sus radios más un
       margen de aire fijo — nunca quedan pegados.
     - Las conexiones son "directa" (línea sólida, cercanía muy próxima) o
       "indirecta" (línea punteada, cercanía más laxa), igual que la
       leyenda "Tipos de relación" de la red original.
     - Se calculan los nodos PUENTE (puntos de articulación del grafo: si se
       quitan, la red se parte en componentes separadas) con el algoritmo
       clásico de Tarjan, y se pueden resaltar con un botón dedicado.
   ========================================================== */
(function () {
  const SUPABASE_URL = "https://mcitahjecaqsshzeamnj.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaXRhaGplY2Fxc3NoemVhbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDYwNjQsImV4cCI6MjEwNDAyMjA2NH0.xx63t4EZcdqZqf4onHsU1EcIFdCQS04VigGgyDbLxHQ";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const XHTML_NS = "http://www.w3.org/1999/xhtml";

  // Lienzo virtual grande: como el zoom/pan es propio (no el de la red
  // vieja), el layout no está atado al viewBox de 2500×1820 — usamos un
  // espacio bien más grande para que los nodos grandes (hubs) y el aire
  // entre todos entren sin apretarse, y el zoom inicial encuadra todo.
  const RECT = { x0: 0, y0: 0, x1: 6400, y1: 5200 };
  const R_MIN = 15, R_MAX = 62;
  const GAP = 26; // "aire" mínimo entre el borde de dos nodos cualesquiera

  function radiusForDegree(d) {
    return Math.max(R_MIN, Math.min(R_MAX, R_MIN + Math.sqrt(d) * 8.2));
  }

  // Solo se usan los 4 colores/íconos oficiales de las estructuras del POT
  // (ver leyenda "Categorías del POT" / STRUCT en modulo-02.js y modulo-02.html),
  // no un color distinto por cada una de las 11 categorías del Excel.
  const CATEGORIA_A_ESTRUCTURA = {
    sistema_hidrico: "e1",
    humedales: "e1",
    vias_arteriales: "e2",
    ciclorutas: "e2",
    parques: "e2",
    cuidado: "e2",
    salud: "e2",
    deporte: "e2",
    educacion: "e3",
    comercio: "e3",
    cultura: "e4",
  };
  const ESTRUCTURA_STYLE = {
    e1: { color: "#5cd6d1", icon: "fa-droplet" },
    e2: { color: "#ef9f54", icon: "fa-people-roof" },
    e3: { color: "#fac47b", icon: "fa-building-columns" },
    e4: { color: "#fb8d84", icon: "fa-landmark" },
  };

  /* -------- Vías: solo las que el POT nombra --------
     La malla vial completa ahogaba la lectura de la red. Se dejan
     únicamente los corredores que el POT (documento "Bogotá Reverdece")
     nombra de forma explícita, sea como obra estructurante del plan, como
     corredor del sistema de transporte o como vía de la malla arterial en
     conflicto con la Estructura Ecológica Principal. */
  const VIAS_POT = [
    { nombre: "Autopista Norte",            re: /autopista\s*norte/i },
    { nombre: "Carrera Séptima",            re: /(carrera|cra\.?|kr\.?)\s*7\b|s[ée]ptima/i },
    { nombre: "Carrera 10",                 re: /(carrera|cra\.?|kr\.?)\s*10\b|d[ée]cima/i },
    { nombre: "Carrera 80",                 re: /(carrera|cra\.?|kr\.?)\s*80\b/i },
    { nombre: "Calle 13",                   re: /calle\s*13\b/i },
    { nombre: "Calle 63",                   re: /calle\s*63\b/i },
    { nombre: "Calle 80",                   re: /calle\s*80\b/i },
    { nombre: "Calle 43 Sur",               re: /calle\s*43\s*sur/i },
    { nombre: "Avenida Boyacá",             re: /boyac[áa]/i },
    { nombre: "Avenida Ciudad de Cali",     re: /ciudad\s*de\s*cali/i },
    { nombre: "Avenida Caracas",            re: /caracas/i },
    { nombre: "Avenida Suba–Cota",          re: /suba\s*[-–]\s*cota|suba\s*cota/i },
    { nombre: "Avenida Longitudinal de Occidente (ALO)", re: /\balo\b|longitudinal\s*de\s*occidente/i },
  ];
  const ES_VIA = (e) => e.categoria_id === "vias_arteriales";
  function viaDelPot(nombre) {
    const v = VIAS_POT.find((x) => x.re.test(String(nombre || "")));
    return v ? v.nombre : null;
  }

  const state = {
    categorias: [],
    elementos: [],
    conexiones: [],
    byId: new Map(),
    grado: new Map(),
    puentes: new Set(),
    edgeTypeOn: { directa: true, indirecta: true },
    highlight: null, // null | 'hubs' | 'perifericos' | 'puentes'
  };

  async function fetchTable(name) {
    const res = await fetch(SUPABASE_URL + "/rest/v1/" + name + "?select=*", {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: "Bearer " + SUPABASE_ANON_KEY },
    });
    if (!res.ok) throw new Error("Error cargando " + name + ": " + res.status);
    return res.json();
  }

  // Caja fija sobre el área urbana de Bogotá (no min/max dinámico): así la
  // localidad rural de Sumapaz, muy alejada al sur, no aplasta el resto del
  // trazado — sus elementos quedan recortados (clamp) en el borde inferior.
  const BOUNDS = { lonMin: -74.20, lonMax: -74.00, latMin: 4.47, latMax: 4.82 };

  function project(lon, lat) {
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const tx = clamp((lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin));
    const ty = clamp((lat - BOUNDS.latMin) / (BOUNDS.latMax - BOUNDS.latMin));
    return { x: RECT.x0 + tx * (RECT.x1 - RECT.x0), y: RECT.y1 - ty * (RECT.y1 - RECT.y0) };
  }

  /* -------- grado y puntos de articulación (nodos "puente") -------- */
  function computeGradoYPuentes(elementos, conexiones) {
    const adj = new Map();
    elementos.forEach((e) => adj.set(e.id, []));
    conexiones.forEach((c) => {
      if (!adj.has(c.origen) || !adj.has(c.destino)) return;
      adj.get(c.origen).push(c.destino);
      adj.get(c.destino).push(c.origen);
    });
    const grado = new Map();
    adj.forEach((v, k) => grado.set(k, v.length));

    // Puntos de articulación (algoritmo de Tarjan, DFS iterativo para evitar
    // desbordar el stack con ~800 nodos encadenados).
    const disc = new Map(), low = new Map(), parent = new Map(), visited = new Set();
    const articulation = new Set();
    let timer = 0;

    adj.forEach((_, start) => {
      if (visited.has(start)) return;
      const stack = [{ id: start, iter: 0, children: 0 }];
      visited.add(start); disc.set(start, timer); low.set(start, timer); timer++;
      parent.set(start, null);
      while (stack.length) {
        const frame = stack[stack.length - 1];
        const neighbors = adj.get(frame.id);
        if (frame.iter < neighbors.length) {
          const v = neighbors[frame.iter++];
          if (!visited.has(v)) {
            frame.children++;
            visited.add(v); disc.set(v, timer); low.set(v, timer); timer++;
            parent.set(v, frame.id);
            stack.push({ id: v, iter: 0, children: 0 });
          } else if (v !== parent.get(frame.id)) {
            low.set(frame.id, Math.min(low.get(frame.id), disc.get(v)));
          }
        } else {
          stack.pop();
          const p = parent.get(frame.id);
          if (p != null) {
            low.set(p, Math.min(low.get(p), low.get(frame.id)));
            const pFrame = stack[stack.length - 1];
            const pIsRoot = parent.get(p) == null;
            if (pIsRoot && pFrame.children > 1) articulation.add(p);
            if (!pIsRoot && low.get(frame.id) >= disc.get(p)) articulation.add(p);
          }
        }
      }
    });
    return { grado, puentes: articulation };
  }

  /* -------- relajación por corrección posicional directa --------
     Cada nodo tiene su propio radio (según grado). La separación mínima
     entre dos nodos i,j es r_i + r_j + GAP (nunca menos): así queda "aire"
     de verdad entre todos, no solo entre los que tienen el mismo tamaño.
     Cada iteración corrige directamente la posición (sin velocidad, para
     que converja de forma monótona): separa los pares que invaden ese
     mínimo, acerca un poco los nodos conectados, y tira suave hacia el
     ancla geográfica. */
  function relaxLayout(elementos, conexiones) {
    const n = elementos.length;
    elementos.forEach((e) => {
      const p = project(e.lon_jitter, e.lat_jitter);
      e._x = p.x + (Math.random() - 0.5) * 6;
      e._y = p.y + (Math.random() - 0.5) * 6;
      e._ax = p.x; e._ay = p.y;
    });

    const cellSize = R_MAX * 2 + GAP + 5; // mayor que cualquier separación mínima posible
    const gridKey = (cx, cy) => (cx + 16384) * 65536 + (cy + 16384);
    const EDGE_LEN = R_MAX * 1.8;
    const ITER = 110;

    function buildGrid() {
      const grid = new Map();
      for (let i = 0; i < n; i++) {
        const e = elementos[i];
        const key = gridKey(Math.floor(e._x / cellSize), Math.floor(e._y / cellSize));
        let arr = grid.get(key);
        if (!arr) { arr = []; grid.set(key, arr); }
        arr.push(e);
      }
      return grid;
    }

    function separationPass(strict) {
      const grid = buildGrid();
      let any = false;
      for (let i = 0; i < n; i++) {
        const e = elementos[i];
        const cx = Math.floor(e._x / cellSize), cy = Math.floor(e._y / cellSize);
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const arr = grid.get(gridKey(gx, gy));
            if (!arr) continue;
            for (const o of arr) {
              if (o === e) continue;
              let dx = e._x - o._x, dy = e._y - o._y;
              let dist = Math.hypot(dx, dy);
              if (dist < 0.001) { dx = (Math.random() - 0.5) || 0.1; dy = (Math.random() - 0.5) || 0.1; dist = Math.hypot(dx, dy); }
              const minSep = e._r + o._r + GAP;
              if (dist < minSep - (strict ? 0.01 : 0)) {
                any = true;
                const overlap = (minSep - dist) / dist * 0.5;
                const mx = dx * overlap, my = dy * overlap;
                e._x += mx; e._y += my;
                o._x -= mx; o._y -= my;
              }
            }
          }
        }
      }
      return any;
    }

    for (let iter = 0; iter < ITER; iter++) {
      separationPass(false);

      // acercar un poco los nodos conectados (para que las líneas se lean con sentido)
      for (const c of conexiones) {
        const a = state.byId.get(c.origen), b = state.byId.get(c.destino);
        if (!a || !b) continue;
        const dx = b._x - a._x, dy = b._y - a._y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const target = a._r + b._r + EDGE_LEN;
        if (dist > target) {
          const f = (dist - target) / dist * 0.05;
          a._x += dx * f; a._y += dy * f;
          b._x -= dx * f; b._y -= dy * f;
        }
      }

      // tirar suave hacia el ancla geográfica
      for (let i = 0; i < n; i++) {
        const e = elementos[i];
        e._x += (e._ax - e._x) * 0.012;
        e._y += (e._ay - e._y) * 0.012;
        e._x = Math.max(RECT.x0 + e._r, Math.min(RECT.x1 - e._r, e._x));
        e._y = Math.max(RECT.y0 + e._r, Math.min(RECT.y1 - e._r, e._y));
      }
    }

    // pasadas finales de solo-separación, sin resortes, para garantizar 0 solapes
    for (let pass = 0; pass < 700; pass++) {
      const any = separationPass(true);
      for (let i = 0; i < n; i++) {
        const e = elementos[i];
        e._x = Math.max(RECT.x0 + e._r, Math.min(RECT.x1 - e._r, e._x));
        e._y = Math.max(RECT.y0 + e._r, Math.min(RECT.y1 - e._r, e._y));
      }
      if (!any) break;
    }
  }

  function buildDefs(svg, colors) {
    const defs = document.createElementNS(SVG_NS, "defs");
    defs.setAttribute("id", "m2re-defs");
    colors.forEach((color) => {
      const filter = document.createElementNS(SVG_NS, "filter");
      filter.setAttribute("id", "m2re-glow-" + color.replace("#", ""));
      filter.setAttribute("x", "-60%"); filter.setAttribute("y", "-60%");
      filter.setAttribute("width", "220%"); filter.setAttribute("height", "220%");
      const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
      blur.setAttribute("stdDeviation", "2"); blur.setAttribute("result", "blur");
      const merge = document.createElementNS(SVG_NS, "feMerge");
      ["blur", "SourceGraphic"].forEach((ref) => {
        const m = document.createElementNS(SVG_NS, "feMergeNode"); m.setAttribute("in", ref); merge.appendChild(m);
      });
      filter.appendChild(blur); filter.appendChild(merge);
      defs.appendChild(filter);
    });
    svg.appendChild(defs);
  }

  /* -------- zoom/pan propio de esta capa (independiente del de la red vieja) -------- */
  const view = { x: 0, y: 0, scale: 1 };
  let viewportG = null;

  function applyView() {
    if (viewportG) viewportG.setAttribute("transform", "translate(" + view.x + "," + view.y + ") scale(" + view.scale + ")");
    const label = document.getElementById("m2reZoomLevel");
    if (label) label.textContent = Math.round(view.scale * 100) + "%";
  }

  function clientToViewboxPoint(svg, clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    return pt.matrixTransform(ctm.inverse());
  }

  function zoomBy(svg, factor, clientX, clientY) {
    const p = (clientX != null) ? clientToViewboxPoint(svg, clientX, clientY) : { x: 1250, y: 910 };
    const newScale = Math.max(0.15, Math.min(8, view.scale * factor));
    const ratio = newScale / view.scale;
    view.x = p.x - ratio * (p.x - view.x);
    view.y = p.y - ratio * (p.y - view.y);
    view.scale = newScale;
    applyView();
  }

  function setupOwnZoomPan(svg) {
    svg.addEventListener("wheel", (ev) => {
      if (!viewportG) return;
      ev.preventDefault();
      const factor = ev.deltaY > 0 ? 0.88 : 1.14;
      zoomBy(svg, factor, ev.clientX, ev.clientY);
    }, { passive: false });

    let dragging = false, startPt = null, start = { x: 0, y: 0 };
    svg.addEventListener("pointerdown", (ev) => {
      if (!viewportG) return;
      if (ev.target.closest && ev.target.closest(".m2re-node-group")) return;
      dragging = true;
      startPt = clientToViewboxPoint(svg, ev.clientX, ev.clientY);
      start.x = view.x; start.y = view.y;
      svg.setPointerCapture(ev.pointerId);
      svg.classList.add("m2re-panning");
    });
    svg.addEventListener("pointermove", (ev) => {
      if (!dragging) return;
      const p = clientToViewboxPoint(svg, ev.clientX, ev.clientY);
      view.x = start.x + (p.x - startPt.x);
      view.y = start.y + (p.y - startPt.y);
      applyView();
    });
    const endDrag = (ev) => {
      if (!dragging) return;
      dragging = false;
      svg.classList.remove("m2re-panning");
      try { svg.releasePointerCapture(ev.pointerId); } catch (err) {}
    };
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);

    document.getElementById("m2reZoomIn")?.addEventListener("click", () => zoomBy(svg, 1.35));
    document.getElementById("m2reZoomOut")?.addEventListener("click", () => zoomBy(svg, 1 / 1.35));
    document.getElementById("m2reZoomReset")?.addEventListener("click", () => {
      view.x = state._initView.x; view.y = state._initView.y; view.scale = state._initView.scale;
      applyView();
    });
  }

  /* -------- resaltados: hubs / periféricos / puentes -------- */
  function clearHighlight() {
    document.querySelectorAll(".m2re-node-ring.m2re-hl").forEach((c) => c.classList.remove("m2re-hl"));
  }
  function applyHighlight(mode) {
    clearHighlight();
    state.highlight = mode;
    const info = document.getElementById("m2reHighlightInfo");
    if (mode === null) { if (info) info.textContent = ""; updateHighlightButtons(); return; }

    let ids = [];
    if (mode === "hubs") {
      const gradoVals = [...state.grado.values()].sort((a, b) => b - a);
      const p90 = gradoVals[Math.floor(gradoVals.length * 0.1)] ?? 0;
      const umbral = Math.max(p90, 12);
      ids = state.elementos.filter((e) => (state.grado.get(e.id) || 0) >= umbral).map((e) => e.id);
    } else if (mode === "perifericos") {
      ids = state.elementos.filter((e) => (state.grado.get(e.id) || 0) <= 1).map((e) => e.id);
    } else if (mode === "puentes") {
      ids = [...state.puentes];
    }
    ids.forEach((id) => { const e = state.byId.get(id); if (e && e._node) e._node.classList.add("m2re-hl"); });

    if (info) {
      const labels = { hubs: "nodos hub (más conectados)", perifericos: "nodos periféricos (0-1 conexiones)", puentes: "nodos puente (si se quitan, la red se parte en piezas separadas)" };
      info.textContent = ids.length + " " + labels[mode];
    }
    updateHighlightButtons();
  }
  function updateHighlightButtons() {
    ["m2reBtnHubs", "m2reBtnPerifericos", "m2reBtnPuentes"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.toggle("active", (id === "m2reBtnHubs" && state.highlight === "hubs") ||
        (id === "m2reBtnPerifericos" && state.highlight === "perifericos") ||
        (id === "m2reBtnPuentes" && state.highlight === "puentes"));
    });
  }
  function setupHighlightButtons() {
    document.getElementById("m2reBtnHubs")?.addEventListener("click", () => applyHighlight(state.highlight === "hubs" ? null : "hubs"));
    document.getElementById("m2reBtnPerifericos")?.addEventListener("click", () => applyHighlight(state.highlight === "perifericos" ? null : "perifericos"));
    document.getElementById("m2reBtnPuentes")?.addEventListener("click", () => applyHighlight(state.highlight === "puentes" ? null : "puentes"));
    // Reusa los botones "Todas/Directas/Indirectas" de la leyenda original
    // (que ya solo controlan la red vieja, ahora oculta) para que también
    // filtren esta red por tipo de conexión.
    document.querySelectorAll(".legend-footer-row .control-btn").forEach((btn) => {
      const txt = btn.textContent.trim();
      if (txt === "Todas") btn.addEventListener("click", () => setEdgeTypeFilter(true, true));
      if (txt === "Directas") btn.addEventListener("click", () => setEdgeTypeFilter(true, false));
      if (txt === "Indirectas") btn.addEventListener("click", () => setEdgeTypeFilter(false, true));
    });
  }
  function setEdgeTypeFilter(directa, indirecta) {
    state.edgeTypeOn.directa = directa;
    state.edgeTypeOn.indirecta = indirecta;
    document.querySelectorAll(".m2re-edge").forEach((line) => {
      const on = (line.classList.contains("m2re-edge-directa") && directa) ||
        (line.classList.contains("m2re-edge-indirecta") && indirecta);
      if (on) delete line.dataset.filteredOut; else line.dataset.filteredOut = "1";
    });
  }

  function buildLayer() {
    const svg = document.getElementById("networkViz");
    if (!svg) return;
    const old = svg.querySelector("#m2-red-externa");
    if (old) old.remove();
    const oldDefs = svg.querySelector("#m2re-defs");
    if (oldDefs) oldDefs.remove();

    buildDefs(svg, Object.values(ESTRUCTURA_STYLE).map((s) => s.color));

    const { grado, puentes } = computeGradoYPuentes(state.elementos, state.conexiones);
    state.grado = grado; state.puentes = puentes;
    state.elementos.forEach((e) => { e._r = radiusForDegree(grado.get(e.id) || 0); });

    relaxLayout(state.elementos, state.conexiones);

    // capa propia, colgada directo del <svg> (NO de #zoom-pan-group): así el
    // zoom/pan de esta red no depende ni interfiere con el de la red vieja.
    const layer = document.createElementNS(SVG_NS, "g");
    layer.setAttribute("id", "m2-red-externa");
    svg.appendChild(layer);
    viewportG = document.createElementNS(SVG_NS, "g");
    viewportG.setAttribute("id", "m2re-viewport");
    layer.appendChild(viewportG);

    // zoom inicial: encuadra TODA la red (con margen), para dar una vista de
    // conjunto legible de entrada; desde ahí se puede acercar a cada zona.
    const xs = state.elementos.map((e) => e._x).sort((a, b) => a - b);
    const ys = state.elementos.map((e) => e._y).sort((a, b) => a - b);
    const pct = (arr, q) => arr[Math.min(arr.length - 1, Math.max(0, Math.round((arr.length - 1) * q)))] || 0;
    const margen = R_MAX * 2;
    let minX = pct(xs, 0.02) - margen, maxX = pct(xs, 0.98) + margen;
    let minY = pct(ys, 0.02) - margen, maxY = pct(ys, 0.98) + margen;
    const w = maxX - minX, h = maxY - minY;
    const fitScale = Math.max(0.15, Math.min(2500 / w, 1820 / h) * 0.94);
    view.scale = fitScale;
    view.x = 1250 - (minX + maxX) / 2 * fitScale;
    view.y = 910 - (minY + maxY) / 2 * fitScale;
    state._initView = { x: view.x, y: view.y, scale: view.scale };
    applyView();
    setupOwnZoomPan(svg);
    setupHighlightButtons();

    const edgesG = document.createElementNS(SVG_NS, "g");
    edgesG.setAttribute("class", "m2re-edges");
    viewportG.appendChild(edgesG);
    const edgesByNode = new Map();
    const vecinosPorNodo = new Map();
    state.conexiones.forEach((c) => {
      const a = state.byId.get(c.origen), b = state.byId.get(c.destino);
      if (!a || !b) return;
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", a._x); line.setAttribute("y1", a._y);
      line.setAttribute("x2", b._x); line.setAttribute("y2", b._y);
      line.setAttribute("class", "m2re-edge " + (c.tipo === "directa" ? "m2re-edge-directa" : "m2re-edge-indirecta"));
      edgesG.appendChild(line);
      [a.id, b.id].forEach((id) => {
        if (!edgesByNode.has(id)) edgesByNode.set(id, []);
        edgesByNode.get(id).push(line);
      });
      if (!vecinosPorNodo.has(a.id)) vecinosPorNodo.set(a.id, []);
      if (!vecinosPorNodo.has(b.id)) vecinosPorNodo.set(b.id, []);
      vecinosPorNodo.get(a.id).push(b.id);
      vecinosPorNodo.get(b.id).push(a.id);
    });

    const nodesG = document.createElementNS(SVG_NS, "g");
    nodesG.setAttribute("class", "m2re-nodes");
    viewportG.appendChild(nodesG);

    const edgesTopG = document.createElementNS(SVG_NS, "g");
    edgesTopG.setAttribute("class", "m2re-edges-top");
    viewportG.appendChild(edgesTopG);
    const nodesTopG = document.createElementNS(SVG_NS, "g");
    nodesTopG.setAttribute("class", "m2re-nodes-top");
    viewportG.appendChild(nodesTopG);

    function enfocar(encendidas, gruposArriba) {
      edgesG.style.opacity = "0.09";
      nodesG.style.opacity = "0.22";
      encendidas.forEach((line) => { if (!line.dataset.filteredOut) edgesTopG.appendChild(line); });
      gruposArriba.forEach((g) => { if (g) nodesTopG.appendChild(g); });
    }
    function desenfocar() {
      edgesG.style.opacity = "";
      nodesG.style.opacity = "";
      while (edgesTopG.firstChild) edgesG.appendChild(edgesTopG.firstChild);
      while (nodesTopG.firstChild) nodesG.appendChild(nodesTopG.firstChild);
    }

    // dibuja primero los de menor grado y al final los hubs, para que los
    // más grandes/importantes queden siempre por encima visualmente.
    const ordenDibujo = [...state.elementos].sort((a, b) => (state.grado.get(a.id) || 0) - (state.grado.get(b.id) || 0));

    ordenDibujo.forEach((e) => {
      const estructura = CATEGORIA_A_ESTRUCTURA[e.categoria_id] || "e2";
      const style = ESTRUCTURA_STYLE[estructura];
      const color = style.color;
      const icon = style.icon;
      const r = e._r;

      const group = document.createElementNS(SVG_NS, "g");
      group.setAttribute("class", "m2re-node-group");
      group.dataset.id = e.id;

      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("class", "m2re-node-ring");
      circle.setAttribute("cx", e._x); circle.setAttribute("cy", e._y); circle.setAttribute("r", r);
      circle.setAttribute("fill", "#0a0a0a");
      circle.setAttribute("stroke", color);
      circle.setAttribute("stroke-width", Math.max(1.6, Math.min(3.2, 1.4 + r / 30)));
      circle.setAttribute("filter", "url(#m2re-glow-" + color.replace("#", "") + ")");

      const size = r * 1.8;
      const fo = document.createElementNS(SVG_NS, "foreignObject");
      fo.setAttribute("x", e._x - size / 2); fo.setAttribute("y", e._y - size / 2);
      fo.setAttribute("width", size); fo.setAttribute("height", size);

      const wrapper = document.createElementNS(XHTML_NS, "div");
      wrapper.setAttribute("style", "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;pointer-events:none;padding:2px;overflow:hidden;box-sizing:border-box;");

      const iconEl = document.createElementNS(XHTML_NS, "i");
      iconEl.setAttribute("class", "fa-solid " + icon);
      iconEl.setAttribute("style", "color:" + color + "; font-size:" + Math.max(9, r * 0.34) + "px; line-height:1;");

      const nameEl = document.createElementNS(XHTML_NS, "div");
      nameEl.setAttribute("style", "font-size:" + Math.max(5.5, r * 0.19) + "px; padding:0 1px; font-weight:700; color:#f2f3f6; line-height:1.08; text-align:center; font-family:'Inter',sans-serif; word-break:break-word; max-height:" + (r * 1.1) + "px; overflow:hidden;");
      nameEl.textContent = e.nombre;

      wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
      fo.appendChild(wrapper);
      group.appendChild(circle); group.appendChild(fo);

      const misAristas = edgesByNode.get(e.id) || [];
      group.addEventListener("pointerenter", () => {
        // se encienden SUS conexiones y se apaga el resto de la red: con
        // 2.198 líneas, resaltar sin apagar lo demás no se distingue
        const vecinos = (vecinosPorNodo.get(e.id) || []).map((vid) => state.byId.get(vid)?._group).filter(Boolean);
        misAristas.forEach((line) => {
          if (line.dataset.filteredOut) return;
          line.classList.add("m2re-edge-activa");
          line.setAttribute("stroke", color);
          line.style.strokeWidth = "2.2";
        });
        enfocar(misAristas, [group].concat(vecinos));
      });
      group.addEventListener("pointerleave", () => {
        misAristas.forEach((line) => {
          line.classList.remove("m2re-edge-activa");
          line.style.strokeWidth = "";
          line.removeAttribute("stroke");
        });
        desenfocar();
      });
      group.addEventListener("click", (ev) => {
        ev.stopPropagation();
        showTooltip(ev.clientX, ev.clientY, e);
      });

      nodesG.appendChild(group);
      e._node = circle;
      e._fo = fo;
      e._group = group;
    });
  }

  let tooltipEl = null;
  function showTooltip(clientX, clientY, e) {
    hideTooltip();
    const vecinos = state.conexiones
      .filter((c) => c.origen === e.id || c.destino === e.id)
      .map((c) => {
        const otherId = c.origen === e.id ? c.destino : c.origen;
        const other = state.byId.get(otherId);
        return other ? other.nombre : null;
      })
      .filter(Boolean);
    const grado = state.grado.get(e.id) || 0;
    tooltipEl = document.createElement("div");
    tooltipEl.className = "m2re-tooltip";
    let html = "<strong>" + escapeHtml(e.nombre) + "</strong>" + escapeHtml(e.localidad) +
      "<small>Grado: " + grado + (state.puentes.has(e.id) ? " · nodo puente" : "") + "</small>";
    if (vecinos.length) {
      html += "<small>Conectado con: " + vecinos.slice(0, 6).map(escapeHtml).join(", ") +
        (vecinos.length > 6 ? " y " + (vecinos.length - 6) + " más" : "") + "</small>";
    } else {
      html += "<small>Sin conexiones cercanas registradas</small>";
    }
    tooltipEl.innerHTML = html;
    document.body.appendChild(tooltipEl);
    const rect = tooltipEl.getBoundingClientRect();
    let left = clientX + 12, top = clientY + 12;
    if (left + rect.width > window.innerWidth) left = clientX - rect.width - 12;
    if (top + rect.height > window.innerHeight) top = clientY - rect.height - 12;
    tooltipEl.style.left = left + "px";
    tooltipEl.style.top = top + "px";
  }
  function hideTooltip() {
    if (tooltipEl) { tooltipEl.remove(); tooltipEl = null; }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  async function init() {
    const status = document.getElementById("m2CategoriasStatus");
    if (status) status.textContent = "Cargando base de datos…";
    try {
      const [categorias, elementos, conexiones] = await Promise.all([
        fetchTable("m2_categorias"), fetchTable("m2_elementos"), fetchTable("m2_conexiones"),
      ]);
      state.categorias = categorias;
      // de la malla vial solo se conservan los corredores que el POT nombra
      const viasTotales = elementos.filter(ES_VIA).length;
      state.elementos = elementos.filter((e) => {
        if (!ES_VIA(e)) return true;
        const v = viaDelPot(e.nombre);
        if (v) { e._viaPot = v; return true; }
        return false;
      });
      state.viasFiltradas = { total: viasTotales, conservadas: state.elementos.filter(ES_VIA).length };
      state.byId = new Map(state.elementos.map((e) => [e.id, e]));
      // las conexiones de las vías retiradas se van con ellas
      state.conexiones = conexiones.filter((c) => state.byId.has(c.origen) && state.byId.has(c.destino));
      if (status) status.textContent = "Calculando red (grados, puentes, disposición sin superposiciones)…";
      // deja pintar el mensaje antes del cálculo (puede tardar ~1s)
      await new Promise((r) => setTimeout(r, 30));
      buildLayer();
      if (status) status.textContent = state.elementos.length + " nodos · " + state.conexiones.length +
        " conexiones · " + state.puentes.size + " nodos puente · vías: solo las " + state.viasFiltradas.conservadas +
        " que el POT nombra (de " + state.viasFiltradas.total + ") — arrastrá para mover, rueda/botones para zoom, mouse sobre un nodo para ver sus conexiones";
    } catch (err) {
      if (status) status.textContent = "No se pudo cargar la base de datos.";
      console.error("[m2-red-externa]", err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
    document.getElementById("networkViz")?.addEventListener("click", hideTooltip);
  });
})();
