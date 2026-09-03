/* ==========================================================
   Módulo 02 · Red externa (base de datos cargada desde Excel → Supabase)

   Este archivo es independiente de modulo-02.js: agrega, sobre la misma
   red SVG (#networkViz), una capa con TODOS los elementos cargados desde
   la base de datos (m2_elementos) y sus conexiones (m2_conexiones).

   Las conexiones son una INFERENCIA (no un dato oficial del POT): se
   calcularon por cercanía geográfica aproximada (localidad + variación
   determinística dentro de ella), no por coordenadas catastrales reales.
   El toolbar de categorías permite mostrar/ocultar cada categoría.
   ========================================================== */
(function () {
  const SUPABASE_URL = "https://mcitahjecaqsshzeamnj.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaXRhaGplY2Fxc3NoemVhbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDYwNjQsImV4cCI6MjEwNDAyMjA2NH0.xx63t4EZcdqZqf4onHsU1EcIFdCQS04VigGgyDbLxHQ";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const RECT = { x0: 130, y0: 120, x1: 2370, y1: 1680 };

  const state = {
    categorias: [],
    elementos: [],
    conexiones: [],
    byId: new Map(),
    activeCats: new Set(),
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

  function countFor(catId) {
    return state.elementos.filter((e) => e.categoria_id === catId).length;
  }

  function buildLayer() {
    const svg = document.getElementById("networkViz");
    if (!svg) return;
    const parent = svg.querySelector("#zoom-pan-group") || svg;
    const old = svg.querySelector("#m2-red-externa");
    if (old) old.remove();

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
      line.dataset.catA = a.categoria_id; line.dataset.catB = b.categoria_id;
      edgesG.appendChild(line);
    });

    const catColor = new Map(state.categorias.map((c) => [c.id, c.color]));
    const catLayers = new Map();
    state.categorias.forEach((cat) => {
      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "m2re-cat-layer");
      g.dataset.cat = cat.id;
      layer.appendChild(g);
      catLayers.set(cat.id, g);
    });
    state.elementos.forEach((e) => {
      const g = catLayers.get(e.categoria_id);
      if (!g) return;
      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("cx", e._x); circle.setAttribute("cy", e._y);
      circle.setAttribute("r", 5);
      circle.setAttribute("class", "m2re-node");
      circle.setAttribute("fill", catColor.get(e.categoria_id) || "#ccc");
      circle.dataset.id = e.id;
      circle.addEventListener("click", (ev) => {
        ev.stopPropagation();
        showTooltip(ev.clientX, ev.clientY, e);
      });
      g.appendChild(circle);
      e._node = circle;
    });

    applyVisibility();
  }

  function applyVisibility() {
    document.querySelectorAll(".m2re-cat-layer").forEach((g) => {
      g.style.display = state.activeCats.has(g.dataset.cat) ? "" : "none";
    });
    document.querySelectorAll(".m2re-edge").forEach((line) => {
      const visible = state.activeCats.has(line.dataset.catA) && state.activeCats.has(line.dataset.catB);
      line.style.display = visible ? "" : "none";
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

  function pulseNode(elemento) {
    if (!elemento || !elemento._node) return;
    elemento._node.classList.remove("pulse");
    void elemento._node.getBoundingClientRect();
    elemento._node.classList.add("pulse");
  }

  let openDropdown = null;
  function closeDropdown() {
    if (openDropdown) { openDropdown.remove(); openDropdown = null; }
  }

  function toggleDropdown(cat, anchorEl) {
    if (openDropdown && openDropdown.dataset.cat === cat.id) { closeDropdown(); return; }
    closeDropdown();
    const items = state.elementos.filter((e) => e.categoria_id === cat.id)
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    const dd = document.createElement("div");
    dd.className = "m2cat-dropdown";
    dd.dataset.cat = cat.id;
    items.forEach((e) => {
      const it = document.createElement("div");
      it.className = "m2cat-dropdown-item";
      it.textContent = e.nombre + " — " + e.localidad;
      it.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (!state.activeCats.has(cat.id)) { state.activeCats.add(cat.id); applyVisibility(); syncButtonState(cat.id); }
        pulseNode(e);
        const svgRect = document.getElementById("networkViz")?.getBoundingClientRect();
        if (svgRect && e._node) showTooltip(svgRect.left + svgRect.width / 2, svgRect.top + 20, e);
        closeDropdown();
      });
      dd.appendChild(it);
    });
    document.body.appendChild(dd);
    const r = anchorEl.getBoundingClientRect();
    dd.style.position = "fixed";
    dd.style.left = r.left + "px";
    dd.style.top = (r.bottom + 6) + "px";
    openDropdown = dd;
  }

  function syncButtonState(catId) {
    const btn = document.querySelector('.m2cat-btn[data-cat="' + catId + '"]');
    if (btn) btn.classList.toggle("active", state.activeCats.has(catId));
  }

  function toggleCategory(catId) {
    if (state.activeCats.has(catId)) state.activeCats.delete(catId); else state.activeCats.add(catId);
    applyVisibility();
    syncButtonState(catId);
  }

  function buildToolbar() {
    const bar = document.getElementById("m2CategoriasToolbar");
    if (!bar) return;
    bar.innerHTML = "";
    state.categorias.forEach((cat) => {
      const btn = document.createElement("div");
      btn.className = "m2cat-btn active";
      btn.dataset.cat = cat.id;
      btn.style.setProperty("--cat-color", cat.color);
      const dot = document.createElement("span"); dot.className = "m2cat-dot";
      const label = document.createElement("span"); label.className = "m2cat-label"; label.textContent = cat.nombre;
      const count = document.createElement("span"); count.className = "m2cat-count"; count.textContent = countFor(cat.id);
      const chevron = document.createElement("span"); chevron.className = "m2cat-chevron"; chevron.textContent = "▾";
      btn.append(dot, label, count, chevron);
      chevron.addEventListener("click", (ev) => { ev.stopPropagation(); toggleDropdown(cat, btn); });
      btn.addEventListener("click", () => toggleCategory(cat.id));
      bar.appendChild(btn);
    });
    document.addEventListener("click", closeDropdown);
  }

  async function init() {
    const bar = document.getElementById("m2CategoriasToolbar");
    const status = document.getElementById("m2CategoriasStatus");
    if (!bar) return;
    if (status) status.textContent = "Cargando base de datos…";
    try {
      const [categorias, elementos, conexiones] = await Promise.all([
        fetchTable("m2_categorias"), fetchTable("m2_elementos"), fetchTable("m2_conexiones"),
      ]);
      state.categorias = categorias;
      state.elementos = elementos;
      state.conexiones = conexiones;
      state.byId = new Map(elementos.map((e) => [e.id, e]));
      state.activeCats = new Set(categorias.map((c) => c.id));
      buildLayer();
      buildToolbar();
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
