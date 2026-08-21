/* ==========================================================
   MÓDULO 05 — LAS ESCALAS — Bogotá Viva
   Zoom de Eames: Macro (región) → Meso (33 UPL) → Micro (30 min)

   Capas de la red:
   - macro   → línea TEAL, nodos teal (región, MOT)
   - meso    → línea AZUL, nodos azules (33 UPL, localidades, centralidad, empleo, cuidado)
   - micro   → línea MORADA punteada, nodos morados (30 minutos, DOT, manzana)

   Interacción:
   - Clic en línea → panel con la relación, tipo y sustento (página del POT)
   - Doble clic en nodo → apagarlo
   - Triple clic en nodo → aislar su flujo
   - Tarjetas de insight: filtros por escala
   - Tabla dinámica de las 33 UPL (Art. 9)
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";

/* -------- Nodos -------- */
const ODS_NODES = [
  /* MACRO */
  { id: "region",      cat: "macro", name: "REGIÓN\nMETROPOLITANA",  sub: "MOT art. 6",            icon: "fa-globe",              color: "#2fd4c8", x: 170,  y: 280, r: 56 },
  { id: "mot",         cat: "macro", name: "MOT\nMULTIESCALAR",      sub: "regional-distrital-local",icon: "fa-diagram-project",  color: "#2fd4c8", x: 430,  y: 280, r: 54 },
  /* MESO */
  { id: "upl",         cat: "meso",  name: "33 UPL",                 sub: "art. 9 — proximidad",   icon: "fa-layer-group",        color: "#5b8def", x: 700,  y: 280, r: 64 },
  { id: "localidades", cat: "meso",  name: "20\nLOCALIDADES",        sub: "límites = UPL",         icon: "fa-map",                color: "#5b8def", x: 970,  y: 280, r: 52 },
  { id: "centralidad", cat: "meso",  name: "CENTRALIDAD\nADMINISTRATIVA",sub: "por UPL",            icon: "fa-building-columns",   color: "#5b8def", x: 1250, y: 200, r: 50 },
  { id: "empleo",      cat: "meso",  name: "CENTROS DE\nEMPLEO",     sub: "especialización",       icon: "fa-briefcase",          color: "#5b8def", x: 1420, y: 330, r: 50 },
  { id: "cuidado",     cat: "meso",  name: "MANZANAS\nDEL CUIDADO",  sub: "ámbitos integrales",    icon: "fa-people-roof",        color: "#5b8def", x: 1250, y: 440, r: 52 },
  /* MICRO */
  { id: "proximidad",  cat: "micro", name: "CIUDAD DE LOS\n30 MINUTOS", sub: "15-30 min recorrido",icon: "fa-stopwatch",         color: "#a276f2", x: 970,  y: 440, r: 54 },
  { id: "dot",         cat: "micro", name: "DOT +\nCORREDORES VERDES",sub: "transporte",            icon: "fa-bus",                color: "#a276f2", x: 1420, y: 480, r: 48 },
  { id: "manzana",     cat: "micro", name: "MANZANA /\nBARRIO",      sub: "vida cotidiana",        icon: "fa-person-walking",     color: "#a276f2", x: 700,  y: 460, r: 52 },
];

ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* -------- Tipos de arista -------- */
const TYPE_STYLE = {
  macro: { color: "#2fd4c8", width: 2.8, label: "Macro — región metropolitana", arrow: true,  dash: null },
  meso:  { color: "#5b8def", width: 2.6, label: "Meso — 33 UPL",                arrow: true,  dash: null },
  micro: { color: "#a276f2", width: 2.4, label: "Micro — barrio / manzana",     arrow: true,  dash: "6 5" },
};

/* -------- Aristas -------- */
const RAW_EDGES = [
  { s: "region",     t: "mot",         type: "macro", directa: true, paginaTexto: "Decreto 555, Art. 6 — Modelo de Ocupación Territorial multiescalar", sustento: "Bogotá será un territorio articulado desde las escalas regional, distrital y local que se ordena a través de las áreas de importancia ambiental y de los patrimonios culturales; que responde a la emergencia climática y propicia la revitalización sobre áreas consolidadas." },
  { s: "mot",        t: "upl",         type: "macro", directa: true, paginaTexto: "Decreto 555, Arts. 6 y 9 — del MOT a la escala local", sustento: "El MOT define los componentes regionales y distritales; la escala local los concreta en unidades de proximidad con soportes territoriales mínimos." },
  { s: "upl",        t: "localidades", type: "meso", directa: true, paginaTexto: "Decreto 555, Art. 10 — Delimitación de localidades", sustento: "Los límites de las localidades corresponderán con los límites de las Unidades de Planeamiento Local que se identifican en el Mapa n.° CG-2.2 \u201CUnidades de Planeamiento Local\u201D." },
  { s: "upl",        t: "centralidad", type: "meso", directa: true, paginaTexto: "Decreto 555, Art. 9, estrategia 2", sustento: "La consolidación de la centralidad administrativa existente, o a crear, dentro de cada UPL." },
  { s: "upl",        t: "empleo",      type: "meso", directa: true, paginaTexto: "Decreto 555, Art. 9, estrategia 3", sustento: "La organización y activación de nuevos centros de empleo que contribuyan a la especialización inteligente del territorio." },
  { s: "upl",        t: "cuidado",     type: "meso", directa: true, paginaTexto: "Decreto 555, Art. 9, estrategia 5 y Parágrafo 2", sustento: "La localización e implementación de manzanas de cuidado y el aumento de la oferta educativa, cultural y de salud; en las UPL con déficit de soportes urbanos se determinarán ámbitos integrales de cuidado para focalizar la inversión del Distrito." },
  { s: "upl",        t: "proximidad",  type: "meso", directa: true, paginaTexto: "Decreto 555, Art. 9 — recorrido de entre 15 y 30 minutos", sustento: "Al interior de cada UPL se garanticen condiciones mínimas de proximidad, disponibilidad y diversidad de soportes territoriales, servicios del cuidado y sociales y acceso a empleo, en desplazamientos a través de medios no motorizados o en transporte público con recorridos de entre 15 y 30 minutos." },
  { s: "cuidado",    t: "proximidad",  type: "micro", directa: true, paginaTexto: "Decreto 555, Art. 9 — proximidad y cuidado", sustento: "Las Manzanas del Cuidado son áreas acotadas que agrupan infraestructuras para brindar servicios de manera simultánea y articulada: la unidad operativa de la ciudad de los 30 minutos." },
  { s: "proximidad", t: "dot",         type: "micro", directa: true, paginaTexto: "Decreto 555, Art. 9, estrategia 6 y Política de Movilidad Sostenible", sustento: "El desarrollo orientado por el transporte y la movilidad sostenible: corredores verdes de alta y media capacidad que cambien el modelo de movilidad y soporten una ciudad de proximidad, cuidadora e incluyente." },
  { s: "manzana",    t: "proximidad",  type: "micro", directa: true, paginaTexto: "Decreto 555, Art. 9, estrategia 9", sustento: "La gestión local del hábitat que involucre a la vivienda con su entorno a través de la participación comunitaria: la vida cotidiana se juega a escala de manzana y barrio." },
  { s: "localidades",t: "cuidado",     type: "meso", directa: true, paginaTexto: "Decreto 555, Art. 9, Parágrafo 2", sustento: "Los ámbitos integrales de cuidado serán una medida para focalizar la inversión y actuación de los sectores del Distrito a nivel local." },
];

RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- defs -------- */
function buildDefs(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");
  const uniqueColors = [...new Set(ODS_NODES.map(n => n.color))];
  uniqueColors.forEach(color => {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "glow-" + color.replace("#", ""));
    filter.setAttribute("x", "-60%"); filter.setAttribute("y", "-60%");
    filter.setAttribute("width", "220%"); filter.setAttribute("height", "220%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3.2"); blur.setAttribute("result", "blur");
    const merge = document.createElementNS(SVG_NS, "feMerge");
    ["blur", "SourceGraphic"].forEach(ref => {
      const m = document.createElementNS(SVG_NS, "feMergeNode");
      m.setAttribute("in", ref);
      merge.appendChild(m);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });

  Object.entries(TYPE_STYLE).forEach(([type, style]) => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", "arrow-" + type);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8"); marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "7"); marker.setAttribute("markerHeight", "7");
    marker.setAttribute("orient", "auto-start-reverse");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", "M0,0 L10,5 L0,10 z");
    path.setAttribute("fill", style.color);
    marker.appendChild(path);
    defs.appendChild(marker);
  });

  svg.appendChild(defs);
}

function edgePathData(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const startPad = s.r + 2;
  const endPad = t.r + 8;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad,   y2 = t.y - uy * endPad;
  return `M${x1},${y1} L${x2},${y2}`;
}

/* -------- física -------- */
let rafId = null;
let dragging = null;
let dragOffsetX = 0, dragOffsetY = 0;
let moved = false;

function wakePhysics() {
  if (rafId) return;
  rafId = requestAnimationFrame(tick);
}

function tick() {
  rafId = null;
  let active = false;
  const k = 0.012;
  const homeK = 0.006;
  const damp = 0.82;

  RAW_EDGES.forEach(edge => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const dx = t.x - s.x, dy = t.y - s.y;
    const dist = Math.hypot(dx, dy) || 1;
    const force = (dist - edge.restLength) * k;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    s.vx += fx; s.vy += fy;
    t.vx -= fx; t.vy -= fy;
  });

  ODS_NODES.forEach(n => {
    if (n.fixed) return;
    n.vx += (n.homeX - n.x) * homeK;
    n.vy += (n.homeY - n.y) * homeK;
    n.vx *= damp; n.vy *= damp;
    n.x += n.vx; n.y += n.vy;
    if (Math.abs(n.vx) > 0.02 || Math.abs(n.vy) > 0.02) active = true;
  });

  updatePositions();

  if (active) wakePhysics();
}

function updatePositions() {
  ODS_NODES.forEach(n => {
    const group = document.querySelector(`.ods-node[data-id="${n.id}"]`);
    if (group) group.setAttribute("transform", `translate(${n.x},${n.y})`);
  });
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const line = document.querySelector(`.edge-hit[data-index="${i}"]`);
    const vis = document.querySelector(`.edge-vis[data-index="${i}"]`);
    if (!line) return;
    const d = edgePathData(edge, s, t);
    line.setAttribute("d", d);
    if (vis) vis.setAttribute("d", d);
  });
}

/* -------- dibujar -------- */
function renderNetwork() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg);
  drawEdges(svg);
  drawNodes(svg);
}

function drawEdges(svg) {
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("class", "edge-hit");
    hit.setAttribute("data-index", i);
    hit.setAttribute("fill", "none");
    hit.setAttribute("stroke", "transparent");
    hit.setAttribute("stroke-width", "14");
    hit.style.cursor = "pointer";

    const vis = document.createElementNS(SVG_NS, "path");
    vis.setAttribute("class", "edge-vis");
    vis.setAttribute("data-index", i);
    vis.setAttribute("fill", "none");
    vis.setAttribute("stroke", style.color);
    vis.setAttribute("stroke-width", style.width);
    vis.setAttribute("opacity", "0.75");
    if (style.dash) vis.setAttribute("stroke-dasharray", style.dash);
    if (style.arrow) vis.setAttribute("marker-end", `url(#arrow-${edge.type})`);

    group.appendChild(hit);
    group.appendChild(vis);
    svg.appendChild(group);

    hit.addEventListener("click", () => showEdgeInfo(i));
  });
  updatePositions();
}

function drawNodes(svg) {
  const catLabel = { macro: "MACRO", meso: "MESO", micro: "MICRO" };
  ODS_NODES.forEach(n => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node ods-node-" + n.cat);
    group.setAttribute("data-id", n.id);
    group.setAttribute("data-cat", n.cat);
    group.setAttribute("transform", `translate(${n.x},${n.y})`);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("r", n.r);
    circle.setAttribute("fill", "#141b2d");
    circle.setAttribute("stroke", n.color);
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("filter", `url(#glow-${n.color.replace("#", "")})`);
    group.appendChild(circle);

    const iconG = document.createElementNS(SVG_NS, "g");
    iconG.setAttribute("transform", "translate(-16,-34)");
    const icon = document.createElementNS(SVG_NS, "text");
    icon.setAttribute("class", "fa " + n.icon);
    icon.setAttribute("fill", n.color);
    icon.setAttribute("font-size", "22");
    icon.setAttribute("text-anchor", "middle");
    iconG.appendChild(icon);
    group.appendChild(iconG);

    const nameLines = n.name.split("\n");
    nameLines.forEach((line, li) => {
      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("y", -10 + li * 15);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#e8ecf4");
      text.setAttribute("font-size", "10.5");
      text.setAttribute("font-weight", "700");
      text.setAttribute("font-family", "Space Grotesk, sans-serif");
      text.textContent = line;
      group.appendChild(text);
    });

    const subTag = document.createElementNS(SVG_NS, "text");
    subTag.setAttribute("y", -10 + nameLines.length * 15 + 4);
    subTag.setAttribute("text-anchor", "middle");
    subTag.setAttribute("fill", n.color);
    subTag.setAttribute("font-size", "10");
    subTag.setAttribute("font-weight", "500");
    subTag.textContent = n.sub;
    group.appendChild(subTag);

    const catTag = document.createElementNS(SVG_NS, "text");
    catTag.setAttribute("y", -10 + nameLines.length * 15 + 18);
    catTag.setAttribute("text-anchor", "middle");
    catTag.setAttribute("fill", n.color);
    catTag.setAttribute("font-size", "9");
    catTag.setAttribute("font-weight", "600");
    catTag.textContent = catLabel[n.cat];
    group.appendChild(catTag);

    attachDragHandlers(group, n);
    attachNodeClickHandler(group, n.id);
    svg.appendChild(group);
  });
}

/* -------- arrastre -------- */
function attachDragHandlers(group, node) {
  group.style.cursor = "grab";
  function startDrag(e) {
    if (e.button && e.button !== 0) return;
    e.preventDefault();
    const pt = svgPoint(e);
    dragging = node;
    dragOffsetX = pt.x - node.x;
    dragOffsetY = pt.y - node.y;
    node.fixed = true;
    moved = false;
    group.classList.add("dragging");
    group.setPointerCapture(e.pointerId);
  }
  function onDrag(e) {
    if (dragging !== node) return;
    const pt = svgPoint(e);
    const newX = pt.x - dragOffsetX;
    const newY = pt.y - dragOffsetY;
    if (Math.hypot(newX - node.x, newY - node.y) > 2) moved = true;
    node.x = newX; node.y = newY;
    updatePositions();
  }
  function endDrag(e) {
    if (dragging !== node) return;
    dragging = null;
    node.fixed = false;
    group.classList.remove("dragging");
    try { group.releasePointerCapture(e.pointerId); } catch (err) {}
    wakePhysics();
    if (moved) {
      group.dataset.suppressClick = "1";
      setTimeout(() => { delete group.dataset.suppressClick; }, 0);
    }
  }
  group.addEventListener("pointerdown", startDrag);
  group.addEventListener("pointermove", onDrag);
  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
}

function svgPoint(e) {
  const svg = document.getElementById("networkViz");
  const pt = svg.createSVGPoint();
  pt.x = e.clientX; pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

/* -------- panel de sustento -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  const label = (n) => n.name.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = `${label(s)} → ${label(t)}`;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + (edge.directa ? " · Directa" : " · Inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent =
    edge.paginaTexto ? `Referencia: ${edge.paginaTexto}` : "Referencia: por confirmar";

  document.getElementById("edgeInfoPanel").classList.add("visible");
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
}

/* -------- visibilidad -------- */
const typeOff = new Set();
const nodeOff = new Set();

function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type;
    const s = group.dataset.source;
    const t = group.dataset.target;
    const hidden = typeOff.has(type) || nodeOff.has(s) || nodeOff.has(t);
    group.classList.toggle("hidden-edge", hidden);
  });
}

function toggleNode(id) {
  const group = document.querySelector(`.ods-node[data-id="${id}"]`);
  if (!group) return;
  if (nodeOff.has(id)) {
    nodeOff.delete(id);
    group.classList.remove("node-off");
  } else {
    nodeOff.add(id);
    group.classList.add("node-off");
  }
  refreshEdgeVisibility();
}

function attachNodeClickHandler(group, id) {
  let count = 0;
  let timer = null;
  group.addEventListener("click", () => {
    if (group.dataset.suppressClick) return;
    count++;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (count === 2) {
        toggleNode(id);
      } else if (count >= 3) {
        toggleNodeFlow(id);
      }
      count = 0;
    }, 320);
  });
}

/* -------- spotlight -------- */
let spotlight = null;

function clearSpotlight() {
  spotlight = null;
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function setSpotlightNodes(nodeIds, expand) {
  spotlight = { mode: "nodes", nodes: new Set(nodeIds), expand: !!expand };
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function applySpotlightState() {
  let visibleNodes = null;
  let visibleEdges = null;

  if (spotlight && spotlight.mode === "nodes") {
    visibleNodes = new Set(spotlight.nodes);
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      const sIn = spotlight.nodes.has(edge.s);
      const tIn = spotlight.nodes.has(edge.t);
      if (spotlight.expand) {
        if (sIn || tIn) {
          visibleEdges.add(i);
          visibleNodes.add(edge.s);
          visibleNodes.add(edge.t);
        }
      } else {
        if (sIn && tIn) visibleEdges.add(i);
      }
    });
  } else {
    visibleNodes = new Set(ODS_NODES.map(n => n.id));
    visibleEdges = new Set(RAW_EDGES.map((_, i) => i));
  }

  document.querySelectorAll(".ods-node").forEach(el => {
    const id = el.dataset.id;
    const dim = visibleNodes ? !visibleNodes.has(id) : false;
    el.classList.toggle("node-focus-dim", dim);
    el.classList.toggle("node-focus-active", !!(spotlight && spotlight.mode === "nodes" && spotlight.nodes.has(id)));
  });

  document.querySelectorAll(".edge-group").forEach(el => {
    const idx = Number(el.dataset.index);
    const dim = visibleEdges ? !visibleEdges.has(idx) : false;
    el.classList.toggle("edge-focus-dim", dim);
  });
}

function toggleNodeFlow(id) {
  const already = spotlight && spotlight.mode === "nodes" && spotlight.expand &&
                   spotlight.nodes.size === 1 && spotlight.nodes.has(id);
  if (already) {
    clearSpotlight();
  } else {
    setSpotlightNodes([id], true);
  }
}

/* -------- insights -------- */
const NODE_INSIGHTS = {
  macro:  ["region", "mot", "upl"],
  meso:   ["upl", "localidades", "centralidad", "empleo", "cuidado"],
  micro:  ["proximidad", "dot", "manzana", "cuidado"],
  todos:  ODS_NODES.map(n => n.id),
};

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;

  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  if (NODE_INSIGHTS[key] && NODE_INSIGHTS[key].length) {
    setSpotlightNodes(NODE_INSIGHTS[key], true);
  } else {
    setSpotlightNodes(ODS_NODES.map(n => n.id), false);
  }

  card.classList.add("active");
}

/* -------- leyenda -------- */
function setupLegendToggle() {
  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const type = item.dataset.type;
      if (e.target.checked) typeOff.delete(type); else typeOff.add(type);
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });
}

/* -------- filtros -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  const btn = [...document.querySelectorAll(".network-controls .control-btn")].find(b => b.textContent.trim() === ({ all: "Todos", macro: "Macro", meso: "Meso", micro: "Micro" }[mode]));
  (btn || document.querySelector(".network-controls .control-btn")).classList.add("active");

  const groups = {
    all: ["macro", "meso", "micro"],
    macro: ["macro"],
    meso: ["meso"],
    micro: ["micro"],
  };
  const activeTypes = groups[mode] || groups.all;

  document.querySelectorAll(".legend-item[data-type]").forEach(item => {
    const type = item.dataset.type;
    const input = item.querySelector("input");
    const show = activeTypes.includes(type);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) typeOff.delete(type); else typeOff.add(type);
  });
  refreshEdgeVisibility();

  if (mode !== "all") {
    setSpotlightNodes(NODE_INSIGHTS[mode] || ODS_NODES.map(n => n.id), true);
    const card = document.querySelector(`.insight-card[data-insight="${mode}"]`);
    if (card) card.classList.add("active");
  } else {
    clearSpotlight();
  }
}

/* -------- tabla UPL -------- */
const UPLS = [
  [1,  "Sumapaz",           "Sumapaz",                    "Borde rural — conectividad ecosistémica, no proximidad de servicios"],
  [2,  "Cuenca del Tunjuelo", "Usme–Ciudad Bolívar",      "Déficit de soportes — ámbito integral de cuidado"],
  [3,  "Arborizadora",      "Ciudad Bolívar",             "Déficit de soportes — ámbito integral de cuidado"],
  [4,  "Lucero",            "Ciudad Bolívar",             "Déficit de soportes — ámbito integral de cuidado"],
  [5,  "Usme–Entrenubes",   "Usme–San Cristóbal",         "UPL transfronteriza — la vida cotidiana cruza el límite"],
  [6,  "Cerros Orientales", "Usme–San Cristóbal–Santa Fé–Chapinero–Usaquén", "Conectividad ecosistémica — no aplica lógica de proximidad"],
  [7,  "Torca",             "Suba–Usaquén",               "Borde rural — conectividad ecosistémica"],
  [8,  "Britalia",          "Suba",                       "Proximidad viable — equipamientos barriales"],
  [9,  "Suba",              "Suba",                       "Eje corredores verdes — DOT alrededor del Metro"],
  [10, "Tibabuyes",         "Suba",                       "Proximidad viable — equipamientos barriales"],
  [11, "Engativá",          "Engativá",                   "Proximidad viable — mixtura de usos"],
  [12, "Fontibón",          "Fontibón",                   "Eje corredores verdes — DOT alrededor del Metro"],
  [13, "Tintal",            "Kennedy",                    "Alta viabilidad — Línea 1 del Metro, Manzana del Cuidado, velódromo y parque metropolitano"],
  [14, "Patio Bonito",      "Kennedy",                    "Proximidad viable — equipamientos barriales"],
  [15, "Porvenir",          "Bosa–Kennedy",               "Déficit de soportes — ámbito integral de cuidado"],
  [16, "Edén",              "Bosa–Kennedy",               "Déficit de soportes — ámbito integral de cuidado"],
  [17, "Bosa",              "Bosa–Kennedy",               "Proximidad viable — centralidad existente"],
  [18, "Kennedy",           "Kennedy–Bosa",               "Alta viabilidad — Línea 1 del Metro, nueva Manzana del Cuidado"],
  [19, "Tunjuelito",        "Tunjuelito",                 "Proximidad viable — equipamientos barriales"],
  [20, "Rafael Uribe",      "Rafael Uribe–Usme",          "UPL transfronteriza — la vida cotidiana cruza el límite"],
  [21, "San Cristóbal",     "San Cristóbal",              "Proximidad viable — equipamientos barriales"],
  [22, "Restrepo",          "Antonio Nariño–Rafael Uribe","UPL transfronteriza — la vida cotidiana cruza el límite"],
  [23, "Centro Histórico",  "La Candelaria–Mártires–Santa Fé", "Alta viabilidad — densa y mixta, proximidad a escala de caminata"],
  [24, "Chapinero",         "Chapinero",                  "Alta viabilidad — densa y mixta"],
  [25, "Usaquén",           "Usaquén",                    "Eje corredores verdes — DOT alrededor del Metro"],
  [26, "Toberín",           "Usaquén",                    "Proximidad viable — equipamientos barriales"],
  [27, "Niza",              "Suba",                       "Proximidad viable — equipamientos barriales"],
  [28, "Rincón de Suba",    "Suba",                       "Proximidad viable — equipamientos barriales"],
  [29, "Tabora",            "Engativá",                   "Proximidad viable — equipamientos barriales"],
  [30, "Salitre",           "Fontibón–Engativá",          "Eje corredores verdes — DOT"],
  [31, "Puente Aranda",     "Puente Aranda",              "Proximidad viable — equipamientos barriales"],
  [32, "Teusaquillo",       "Teusaquillo",                "Alta viabilidad — densa y mixta"],
  [33, "Barrios Unidos",    "Barrios Unidos",             "Alta viabilidad — densa y mixta"],
];

function buildUplTable() {
  const container = document.querySelector(".matrix-container");
  if (!container) return;
  UPLS.forEach(([num, name, loc, tag]) => {
    const row = document.createElement("div");
    row.className = "matrix-row";
    row.innerHTML = `
      <div class="matrix-cell" style="flex:0.4;min-width:42px;font-weight:700;color:var(--text-dim);">${num}</div>
      <div class="matrix-cell" style="font-weight:700;">${name}</div>
      <div class="matrix-cell">${loc}</div>
      <div class="matrix-cell" style="flex:1.4;color:var(--text-dim);">${tag}</div>`;
    container.appendChild(row);
  });
}

/* -------- init -------- */
document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
  buildUplTable();
  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
});
