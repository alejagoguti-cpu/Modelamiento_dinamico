/* ==========================================================
   Módulo 02 · Red externa (base de datos cargada desde Excel → Supabase)

   Este archivo es independiente de modulo-02.js: agrega, sobre la misma
   red SVG (#networkViz), una capa con TODOS los elementos cargados desde
   la base de datos (m2_elementos) y sus conexiones (m2_conexiones).

   Cada elemento se dibuja con el mismo lenguaje visual de los nodos
   originales de la red (ver ODS_NODES / drawNodes en modulo-02.js):
   círculo con anillo de color + glow, ícono flat y el nombre como texto
   adentro del círculo. Sin toolbar de categorías (se retiró a pedido).

   Las conexiones son una INFERENCIA (no un dato oficial del POT): se
   calcularon por cercanía geográfica aproximada (localidad + variación
   determinística dentro de ella), no por coordenadas catastrales reales.
   ========================================================== */
(function () {
  const SUPABASE_URL = "https://mcitahjecaqsshzeamnj.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaXRhaGplY2Fxc3NoemVhbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDYwNjQsImV4cCI6MjEwNDAyMjA2NH0.xx63t4EZcdqZqf4onHsU1EcIFdCQS04VigGgyDbLxHQ";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const XHTML_NS = "http://www.w3.org/1999/xhtml";
  const RECT = { x0: 130, y0: 120, x1: 2370, y1: 1680 };
  const NODE_R = 17;

  // Ícono flat (Font Awesome, ya cargado en la página) por categoría.
  const CATEGORY_ICONS = {
    sistema_hidrico: "fa-water",
    humedales: "fa-leaf",
    vias_arteriales: "fa-road",
    ciclorutas: "fa-bicycle",
    educacion: "fa-graduation-cap",
    salud: "fa-hospital",
    cultura: "fa-masks-theater",
    deporte: "fa-futbol",
    comercio: "fa-shop",
    cuidado: "fa-hand-holding-heart",
    parques: "fa-tree",
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

    const catColor = new Map(state.categorias.map((c) => [c.id, c.color]));
    buildDefs(svg, [...new Set(state.categorias.map((c) => c.color))]);

    const layer = document.createElementNS(SVG_NS, "g");
    layer.setAttribute("id", "m2-red-externa");
    parent.appendChild(layer);

    state.elementos.forEach((e) => {
      const p = project(e.lon_jitter, e.lat_jitter);
      e._x = p.x; e._y = p.y;
    });

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
      const color = catColor.get(e.categoria_id) || "#8891a5";
      const icon = CATEGORY_ICONS[e.categoria_id] || "fa-circle";

      const group = document.createElementNS(SVG_NS, "g");
      group.setAttribute("class", "m2re-node-group");
      group.dataset.id = e.id;

      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("class", "m2re-node-ring");
      circle.setAttribute("cx", e._x); circle.setAttribute("cy", e._y); circle.setAttribute("r", NODE_R);
      circle.setAttribute("fill", "#0a0a0a");
      circle.setAttribute("stroke", color);
      circle.setAttribute("stroke-width", 1.6);
      circle.setAttribute("filter", "url(#m2re-glow-" + color.replace("#", "") + ")");

      const size = NODE_R * 1.9;
      const fo = document.createElementNS(SVG_NS, "foreignObject");
      fo.setAttribute("x", e._x - size / 2); fo.setAttribute("y", e._y - size / 2);
      fo.setAttribute("width", size); fo.setAttribute("height", size);

      const wrapper = document.createElementNS(XHTML_NS, "div");
      wrapper.setAttribute("style", "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none;padding:1px;overflow:hidden;");

      const iconEl = document.createElementNS(XHTML_NS, "i");
      iconEl.setAttribute("class", "fa-solid " + icon);
      iconEl.setAttribute("style", "color:" + color + "; font-size:6px;");

      const nameEl = document.createElementNS(XHTML_NS, "div");
      nameEl.setAttribute("style", "font-size:3.4px; padding:0 1px; font-weight:700; color:#f2f3f6; line-height:1.05; text-align:center; font-family:'Inter',sans-serif; word-break:break-word;");
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
    });
  }

  let tooltipEl = null;
  function showTooltip(clientX, clientY, e) {
    hideTooltip();
    const grados = state.conexiones.filter((c) => c.origen === e.id || c.destino === e.id).length;
    tooltipEl = document.createElement("div");
    tooltipEl.className = "m2re-tooltip";
    tooltipEl.innerHTML =
      "<strong>" + escapeHtml(e.nombre) + "</strong>" +
      escapeHtml(e.localidad) +
      "<small>" + grados + " conexión(es) por cercanía inferida</small>";
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
      buildLayer();
      if (status) status.textContent = elementos.length + " elementos · " + conexiones.length + " conexiones (inferidas por cercanía de localidad)";
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
