/* ==========================================================
   Módulo 02 · Red externa (base de datos cargada desde Excel → Supabase)

   Este archivo es independiente de modulo-02.js: agrega, sobre la misma
   red SVG (#networkViz), una capa con TODOS los elementos cargados desde
   la base de datos (m2_elementos) y sus conexiones (m2_conexiones).

   Cada elemento se dibuja con el mismo lenguaje visual de los nodos
   originales de la red (ver ODS_NODES / drawNodes en modulo-02.js):
   círculo con anillo de color + glow, ícono flat y el nombre como texto
   adentro del círculo.

   LAYOUT: las posiciones geográficas (lat/lon aproximado por localidad)
   se usan solo como "ancla" inicial. Encima se corre una relajación por
   fuerzas (repulsión entre todos los nodos + resorte a lo largo de cada
   conexión + resorte suave hacia el ancla geográfica) para que:
     (1) NINGÚN nodo quede encima de otro (repulsión con distancia mínima
         garantizada = 2×radio + margen), y
     (2) los nodos conectados terminen visualmente cerca entre sí, para
         que las líneas de conexión se lean con sentido.
   ========================================================== */
(function () {
  const SUPABASE_URL = "https://mcitahjecaqsshzeamnj.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaXRhaGplY2Fxc3NoemVhbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDYwNjQsImV4cCI6MjEwNDAyMjA2NH0.xx63t4EZcdqZqf4onHsU1EcIFdCQS04VigGgyDbLxHQ";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const XHTML_NS = "http://www.w3.org/1999/xhtml";
  const RECT = { x0: 90, y0: 90, x1: 2410, y1: 1720 };
  const NODE_R = 24;
  const MIN_SEP = NODE_R * 2 + 10; // separación mínima garantizada entre centros

  // Solo se usan los 4 colores/íconos oficiales de las estructuras del POT
  // (ver leyenda "Categorías del POT" / STRUCT en modulo-02.js y modulo-02.html),
  // no un color distinto por cada una de las 11 categorías del Excel.
  // Clasificación de cada categoría dentro de su estructura, en línea con cómo
  // ya clasifica el resto de la red (ODS_NODES): ciclorutas/red_vial/parques/
  // manzanas_del_cuidado → e2; sistema_de_educacion/plazas_de_mercado → e3;
  // patrimonio_* → e4; ríos/quebradas/humedales → e1. Salud y Deporte no tienen
  // nodo propio en la red original; se agrupan en e2 (Funcional y del Cuidado)
  // siguiendo la cita literal del POT sobre Manzanas del Cuidado ("salud,
  // educación, cultura, cuidado y recreación").
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

  const state = {
    categorias: [],
    elementos: [],
    conexiones: [],
    byId: new Map(),
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

  /* -------- relajación por corrección posicional directa --------
     En vez de fuerzas+velocidad (que puede oscilar y no converger a
     tiempo), cada iteración corrige directamente la posición: separa
     de a pares que se solapan exactamente lo necesario, acerca un poco
     los nodos conectados, y tira suave hacia el ancla geográfica. Esto
     converge de forma monótona y predecible en pocas iteraciones. */
  function relaxLayout(elementos, conexiones) {
    const n = elementos.length;
    elementos.forEach((e) => {
      const p = project(e.lon_jitter, e.lat_jitter);
      e._x = p.x + (Math.random() - 0.5) * 4;
      e._y = p.y + (Math.random() - 0.5) * 4;
      e._ax = p.x; e._ay = p.y;
    });

    const cellSize = MIN_SEP;
    const gridKey = (cx, cy) => (cx + 8192) * 32768 + (cy + 8192);
    const EDGE_LEN = MIN_SEP * 1.5;
    const ITER = 90;

    for (let iter = 0; iter < ITER; iter++) {
      const grid = new Map();
      for (let i = 0; i < n; i++) {
        const e = elementos[i];
        const key = gridKey(Math.floor(e._x / cellSize), Math.floor(e._y / cellSize));
        let arr = grid.get(key);
        if (!arr) { arr = []; grid.set(key, arr); }
        arr.push(e);
      }

      // 1) separar pares solapados (corrección directa, sin velocidad)
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
              if (dist < MIN_SEP) {
                const overlap = (MIN_SEP - dist) / dist * 0.5;
                const mx = dx * overlap, my = dy * overlap;
                e._x += mx; e._y += my;
                o._x -= mx; o._y -= my;
              }
            }
          }
        }
      }

      // 2) acercar un poco los nodos conectados (para que las líneas se lean con sentido)
      for (const c of conexiones) {
        const a = state.byId.get(c.origen), b = state.byId.get(c.destino);
        if (!a || !b) continue;
        const dx = b._x - a._x, dy = b._y - a._y;
        const dist = Math.hypot(dx, dy) || 0.01;
        if (dist > EDGE_LEN) {
          const f = (dist - EDGE_LEN) / dist * 0.06;
          a._x += dx * f; a._y += dy * f;
          b._x -= dx * f; b._y -= dy * f;
        }
      }

      // 3) tirar suave hacia el ancla geográfica
      for (let i = 0; i < n; i++) {
        const e = elementos[i];
        e._x += (e._ax - e._x) * 0.015;
        e._y += (e._ay - e._y) * 0.015;
        e._x = Math.max(RECT.x0 + NODE_R, Math.min(RECT.x1 - NODE_R, e._x));
        e._y = Math.max(RECT.y0 + NODE_R, Math.min(RECT.y1 - NODE_R, e._y));
      }
    }

    // pasada final de solo-separación, sin resortes, para garantizar 0 solapes
    for (let pass = 0; pass < 600; pass++) {
      const grid = new Map();
      for (let i = 0; i < n; i++) {
        const e = elementos[i];
        const key = gridKey(Math.floor(e._x / cellSize), Math.floor(e._y / cellSize));
        let arr = grid.get(key);
        if (!arr) { arr = []; grid.set(key, arr); }
        arr.push(e);
      }
      let anyOverlap = false;
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
              if (dist < MIN_SEP - 0.01) {
                anyOverlap = true;
                const overlap = (MIN_SEP - dist) / dist * 0.5;
                const mx = dx * overlap, my = dy * overlap;
                e._x += mx; e._y += my;
                o._x -= mx; o._y -= my;
                e._x = Math.max(RECT.x0 + NODE_R, Math.min(RECT.x1 - NODE_R, e._x));
                e._y = Math.max(RECT.y0 + NODE_R, Math.min(RECT.y1 - NODE_R, e._y));
                o._x = Math.max(RECT.x0 + NODE_R, Math.min(RECT.x1 - NODE_R, o._x));
                o._y = Math.max(RECT.y0 + NODE_R, Math.min(RECT.y1 - NODE_R, o._y));
              }
            }
          }
        }
      }
      if (!anyOverlap) break;
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

  function buildLayer() {
    const svg = document.getElementById("networkViz");
    if (!svg) return;
    const parent = svg.querySelector("#zoom-pan-group") || svg;
    const old = svg.querySelector("#m2-red-externa");
    if (old) old.remove();
    const oldDefs = svg.querySelector("#m2re-defs");
    if (oldDefs) oldDefs.remove();

    buildDefs(svg, Object.values(ESTRUCTURA_STYLE).map((s) => s.color));

    relaxLayout(state.elementos, state.conexiones);

    const layer = document.createElementNS(SVG_NS, "g");
    layer.setAttribute("id", "m2-red-externa");
    parent.appendChild(layer);

    const edgesG = document.createElementNS(SVG_NS, "g");
    edgesG.setAttribute("class", "m2re-edges");
    layer.appendChild(edgesG);
    state.conexiones.forEach((c) => {
      const a = state.byId.get(c.origen), b = state.byId.get(c.destino);
      if (!a || !b) return;
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", a._x); line.setAttribute("y1", a._y);
      line.setAttribute("x2", b._x); line.setAttribute("y2", b._y);
      line.setAttribute("class", "m2re-edge");
      edgesG.appendChild(line);
    });

    const nodesG = document.createElementNS(SVG_NS, "g");
    nodesG.setAttribute("class", "m2re-nodes");
    layer.appendChild(nodesG);

    state.elementos.forEach((e) => {
      const estructura = CATEGORIA_A_ESTRUCTURA[e.categoria_id] || "e2";
      const style = ESTRUCTURA_STYLE[estructura];
      const color = style.color;
      const icon = style.icon;

      const group = document.createElementNS(SVG_NS, "g");
      group.setAttribute("class", "m2re-node-group");
      group.dataset.id = e.id;

      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("class", "m2re-node-ring");
      circle.setAttribute("cx", e._x); circle.setAttribute("cy", e._y); circle.setAttribute("r", NODE_R);
      circle.setAttribute("fill", "#0a0a0a");
      circle.setAttribute("stroke", color);
      circle.setAttribute("stroke-width", 2);
      circle.setAttribute("filter", "url(#m2re-glow-" + color.replace("#", "") + ")");

      const size = NODE_R * 1.85;
      const fo = document.createElementNS(SVG_NS, "foreignObject");
      fo.setAttribute("x", e._x - size / 2); fo.setAttribute("y", e._y - size / 2);
      fo.setAttribute("width", size); fo.setAttribute("height", size);

      const wrapper = document.createElementNS(XHTML_NS, "div");
      wrapper.setAttribute("style", "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none;padding:1px;overflow:hidden;box-sizing:border-box;");

      const iconEl = document.createElementNS(XHTML_NS, "i");
      iconEl.setAttribute("class", "fa-solid " + icon);
      iconEl.setAttribute("style", "color:" + color + "; font-size:9px; line-height:1;");

      const nameEl = document.createElementNS(XHTML_NS, "div");
      nameEl.setAttribute("style", "font-size:5.2px; padding:0 1px; font-weight:700; color:#f2f3f6; line-height:1.05; text-align:center; font-family:'Inter',sans-serif; word-break:break-word; max-height:22px; overflow:hidden;");
      nameEl.textContent = e.nombre;

      wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
      fo.appendChild(wrapper);
      group.appendChild(circle); group.appendChild(fo);

      group.addEventListener("click", (ev) => {
        ev.stopPropagation();
        showTooltip(ev.clientX, ev.clientY, e);
      });

      nodesG.appendChild(group);
      e._node = circle;
      e._fo = fo;
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
    tooltipEl = document.createElement("div");
    tooltipEl.className = "m2re-tooltip";
    let html = "<strong>" + escapeHtml(e.nombre) + "</strong>" + escapeHtml(e.localidad);
    if (vecinos.length) {
      html += "<small>Conectado con: " + vecinos.slice(0, 5).map(escapeHtml).join(", ") +
        (vecinos.length > 5 ? " y " + (vecinos.length - 5) + " más" : "") + "</small>";
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
      state.elementos = elementos;
      state.conexiones = conexiones;
      state.byId = new Map(elementos.map((e) => [e.id, e]));
      if (status) status.textContent = "Calculando disposición sin superposiciones…";
      // deja pintar el mensaje antes de la relajación (puede tardar ~1s)
      await new Promise((r) => setTimeout(r, 30));
      buildLayer();
      if (status) status.textContent = elementos.length + " elementos · " + conexiones.length + " conexiones (inferidas por cercanía de localidad) — hacé zoom para leer los nombres";
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
