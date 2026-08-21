/* ==========================================================
   RAPOT — MÓDULO 06: EL TIEMPO AUSENTE — Bogotá Viva
   La escalera de incentivos del Art. 304 (IC 5.0 / 6.0 / 7.0)
   y "lo que la norma no ve" (propagación, cascadas, emergencia).
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";

const N_NODES = [
  /* reglas / incentivos (verde) */
  { id: "base",   cat: "regla",    name: "PROYECTO SIN ENGLOBE",   sub: "IC máx. 5.0",    icon: "fa-house-flag",   color: "#4ade80", x: 300, y: 300, r: 62 },
  { id: "esquina",cat: "regla",    name: "ENGLOBE DE ESQUINA + CESIÓN", sub: "IC máx. 6.0", icon: "fa-arrows-to-dot",color: "#4ade80", x: 590, y: 300, r: 62 },
  { id: "manzana",cat: "regla",    name: "TOTALIDAD DE LOS PREDIOS",  sub: "IC máx. 7.0",  icon: "fa-stairs",        color: "#4ade80", x: 880, y: 300, r: 66 },
  { id: "inducir",cat: "regla",    name: "COMPÓRTAMIENTO COLECTIVO",  sub: "inducido",      icon: "fa-users-gear",    color: "#4ade80", x: 1170,y: 300, r: 58 },
  /* lo ausente (rosa) */
  { id: "noanticipa",cat:"ausente", name: "NO ANTICIPA",        sub: "miles de propietarios", icon: "fa-hourglass-end",color: "#f76fb0", x: 1170,y: 110, r: 56 },
  { id: "propaga", cat: "ausente",  name: "SIN PROPAGACIÓN",  sub: "nada viaja por la red", icon: "fa-wave-square", color: "#f76fb0", x: 880, y: 110, r: 54 },
  { id: "cascada", cat: "ausente",  name: "SIN CASCADAS",     sub: "subestación / vía",     icon: "fa-link-slash",  color: "#f76fb0", x: 590, y: 110, r: 54 },
  { id: "emergencia",cat:"ausente", name: "SIN EMERGENCIA",   sub: "no hay agentes",        icon: "fa-people-group",color: "#f76fb0", x: 300, y: 110, r: 56 },
  /* puente (naranja) */
  { id: "diaadia",   cat: "puente", name: "EL DÍA A DÍA",     sub: "año 13 vs. cotidiano",  icon: "fa-sun",          color: "#ef9552", x: 590, y: 500, r: 58 },
  { id: "termostato",cat: "puente", name: "TERMOSTATO",       sub: "la plataforma lo corre",icon: "fa-temperature-half", color: "#ef9552", x: 940, y: 500, r: 56 },
];

N_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

const N_TYPE_STYLE = {
  escalera: { color: "#4ade80", width: 3, arrow: true, dash: null,  label: "Escalera de incentivos — regla declarada" },
  ausente:  { color: "#f76fb0", width: 2.4, arrow: false, dash: "6 5", label: "Lo que la norma no modela" },
  puente:   { color: "#ef9552", width: 2.4, arrow: true, dash: null, label: "De la regla escrita a la simulación corrida" },
};

const N_EDGES = [
  /* escalera: regla escrita */
  { s: "base", t: "esquina", type: "escalera", directa: true, paginaTexto: "Decreto 555, Art. 304", sustento: "\u201C...los proyectos que no incluyan toda la manzana pueden alcanzar un índice de construcción efectivo máximo de cinco (5.0); con englobe de esquina y cesión, seis (6.0); y los que incluyan la totalidad de los predios de una manzana podrán alcanzar un índice de construcción efectivo máximo de siete (7.0).\u201D" },
  { s: "esquina", t: "manzana", type: "escalera", directa: true, paginaTexto: "Decreto 555, Art. 304", sustento: "Cada peldaño de la escalera premia progresivamente englobar más predios: la cesión del área común desbloquea 6.0 y la manzana completa desbloquea 7.0." },
  { s: "manzana", t: "inducir", type: "escalera", directa: true, paginaTexto: "Decreto 555, Art. 304 — lógica del incentivo", sustento: "La escalera está escrita para producir un comportamiento colectivo: empujar a los propietarios a juntarse y construir más denso. El Plan sabe que ese incentivo va a empujar a englobar manzanas enteras." },
  /* ausencias */
  { s: "inducir", t: "noanticipa", type: "ausente", directa: true, paginaTexto: "Consecuencia — Art. 304 sin simulación", sustento: "El Plan sabe que el incentivo empuja a englobar, pero no tiene ningún dispositivo para anticipar qué ciudad resulta cuando miles de propietarios responden a ese incentivo al mismo tiempo." },
  { s: "emergencia", t: "propaga", type: "ausente", directa: true, paginaTexto: "Ausencia transversal — tiempo dinámico", sustento: "No hay propagación: nada viaja por la red. El riesgo son mapas estáticos de amenaza sobre una superficie, nunca un proceso que baje por una cuenca o avance por un corredor." },
  { s: "propaga", t: "cascada", type: "ausente", directa: true, paginaTexto: "Ausencia transversal — fallo en cadena", sustento: "No hay cascadas ni fallo en cadena: la caída de una subestación o de un tramo vial no tiene consecuencias modelables dentro del propio plan." },
  { s: "cascada", t: "noanticipa", type: "ausente", directa: true, paginaTexto: "Ausencia transversal — resultados emergentes", sustento: "No hay agentes ni emergencia: no hay hogares, firmas, cuidadoras ni caminantes cuyo comportamiento agregado produzca un resultado. Todo se declara como meta, no como comportamiento." },
  /* puente a la propuesta */
  { s: "noanticipa", t: "diaadia", type: "puente", directa: true, paginaTexto: "El puente — programático vs. cotidiano", sustento: "El POT no ignora el tiempo: lo programa, pero no lo simula. Sabe qué debe pasar en el año 13; no sabe qué pasa en el día a día." },
  { s: "diaadia", t: "termostato", type: "puente", directa: true, paginaTexto: "El puente — la propuesta", sustento: "Tiene la regla. No corre la simulación. La plataforma RAPOT es precisamente el artefacto que permite correr la simulación que el Plan escribe pero nunca ejecuta." },
];

N_EDGES.forEach(edge => {
  const s = nById(edge.s), t = nById(edge.t);
  if (s && t) edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

function nById(id) { return N_NODES.find(n => n.id === id); }

function buildDefs(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");
  const unique = [...new Set(N_NODES.map(n => n.color))];
  unique.forEach(color => {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "m06-glow-" + color.replace("#", ""));
    filter.setAttribute("x", "-60%"); filter.setAttribute("y", "-60%");
    filter.setAttribute("width", "220%"); filter.setAttribute("height", "220%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3"); blur.setAttribute("result", "blur");
    const merge = document.createElementNS(SVG_NS, "feMerge");
    ["blur", "SourceGraphic"].forEach(ref => {
      const m = document.createElementNS(SVG_NS, "feMergeNode");
      m.setAttribute("in", ref);
      merge.appendChild(m);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });
  Object.entries(N_TYPE_STYLE).forEach(([type, style]) => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", "m06-arrow-" + type);
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

function nEdgePath(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const x1 = s.x + ux * (s.r + 2), y1 = s.y + uy * (s.r + 2);
  const x2 = t.x - ux * (t.r + 8), y2 = t.y - uy * (t.r + 8);
  return `M${x1},${y1} L${x2},${y2}`;
}

/* física simple */
let m06Raf = null;
let m06Drag = null;
let m06DragOff = { x: 0, y: 0 };
let m06Moved = false;
const K_SPRING = 0.012;
const K_HOME = 0.006;
const DAMP = 0.82;

function m06Tick() {
  m06Raf = null;
  let active = false;
  N_EDGES.forEach(edge => {
    const s = nById(edge.s), t = nById(edge.t);
    if (!s || !t) return;
    const dx = t.x - s.x, dy = t.y - s.y;
    const dist = Math.hypot(dx, dy) || 1;
    const f = (dist - edge.restLength) * K_SPRING;
    const fx = (dx / dist) * f, fy = (dy / dist) * f;
    s.vx += fx; s.vy += fy;
    t.vx -= fx; t.vy -= fy;
  });
  N_NODES.forEach(n => {
    if (n.fixed) return;
    n.vx += (n.homeX - n.x) * K_HOME;
    n.vy += (n.homeY - n.y) * K_HOME;
    n.vx *= DAMP; n.vy *= DAMP;
    n.x += n.vx; n.y += n.vy;
    if (Math.abs(n.vx) > 0.02 || Math.abs(n.vy) > 0.02) active = true;
  });
  m06UpdatePositions();
  if (active) m06Wake();
}

function m06Wake() {
  if (m06Raf) return;
  m06Raf = requestAnimationFrame(m06Tick);
}

function m06UpdatePositions() {
  N_NODES.forEach(n => {
    const g = document.querySelector(`.ods-node[data-id="${n.id}"]`);
    if (g) g.setAttribute("transform", `translate(${n.x},${n.y})`);
  });
  N_EDGES.forEach((edge, i) => {
    const s = nById(edge.s), t = nById(edge.t);
    if (!s || !t) return;
    const d = nEdgePath(edge, s, t);
    const hit = document.querySelector(`.edge-hit[data-index="${i}"]`);
    const vis = document.querySelector(`.edge-vis[data-index="${i}"]`);
    if (hit) hit.setAttribute("d", d);
    if (vis) vis.setAttribute("d", d);
  });
}

function m06Render() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg);

  N_EDGES.forEach((edge, i) => {
    const s = nById(edge.s), t = nById(edge.t);
    if (!s || !t) return;
    const style = N_TYPE_STYLE[edge.type];
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.style.setProperty("--edge-color", style.color);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("class", "ods-edge edge-hit");
    hit.setAttribute("data-index", i);

    const vis = document.createElementNS(SVG_NS, "path");
    vis.setAttribute("class", "ods-edge edge-visual");
    vis.setAttribute("data-index", i);
    vis.setAttribute("stroke", style.color);
    vis.setAttribute("stroke-width", style.width);
    vis.setAttribute("opacity", "0.75");
    if (style.dash) vis.setAttribute("stroke-dasharray", style.dash);
    if (style.arrow) vis.setAttribute("marker-end", `url(#m06-arrow-${edge.type})`);

    group.appendChild(hit);
    group.appendChild(vis);
    svg.appendChild(group);

    hit.addEventListener("click", () => m06ShowEdge(i));
  });

  const catLabel = { regla: "REGLA", ausente: "AUSENTE", puente: "PUENTE" };
  N_NODES.forEach(n => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node ods-node-" + n.cat);
    group.setAttribute("data-id", n.id);
    group.setAttribute("data-cat", n.cat);
    group.setAttribute("transform", `translate(${n.x},${n.y})`);

    const ring = document.createElementNS(SVG_NS, "circle");
    ring.setAttribute("class", "node-ring");
    ring.setAttribute("r", n.r);
    ring.setAttribute("fill", "#141b2d");
    ring.setAttribute("stroke", n.color);
    ring.setAttribute("stroke-width", "3");
    ring.setAttribute("filter", `url(#m06-glow-${n.color.replace("#", "")})`);
    group.appendChild(ring);

    const inner = document.createElementNS(SVG_NS, "g");
    inner.setAttribute("class", "node-inner");
    const icon = document.createElementNS(SVG_NS, "text");
    icon.setAttribute("class", "fa " + n.icon);
    icon.setAttribute("fill", n.color);
    icon.setAttribute("font-size", "22");
    icon.setAttribute("text-anchor", "middle");
    icon.setAttribute("y", "-12");
    inner.appendChild(icon);

    const nameLines = n.name.split("\n");
    nameLines.forEach((line, li) => {
      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("class", "node-name");
      text.setAttribute("y", 6 + li * 13);
      text.setAttribute("fill", "#e7eaf2");
      text.setAttribute("font-size", "10");
      text.setAttribute("font-weight", "700");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-family", "Space Grotesk, sans-serif");
      text.textContent = line;
      inner.appendChild(text);
    });

    const sub = document.createElementNS(SVG_NS, "text");
    sub.setAttribute("class", "node-num");
    sub.setAttribute("y", 6 + nameLines.length * 13 + 4);
    sub.setAttribute("fill", n.color);
    sub.setAttribute("font-size", "11");
    sub.setAttribute("text-anchor", "middle");
    sub.textContent = n.sub;
    inner.appendChild(sub);

    const tag = document.createElementNS(SVG_NS, "text");
    tag.setAttribute("y", 6 + nameLines.length * 13 + 18);
    tag.setAttribute("fill", n.color);
    tag.setAttribute("font-size", "8.5");
    tag.setAttribute("font-weight", "600");
    tag.setAttribute("text-anchor", "middle");
    tag.textContent = catLabel[n.cat];
    inner.appendChild(tag);

    group.appendChild(ring);
    group.appendChild(inner);
    svg.appendChild(group);

    m06AttachDrag(group, n);
    m06AttachClick(group, n.id);
  });

  m06UpdatePositions();
}

function m06AttachDrag(group, node) {
  group.style.cursor = "grab";
  function start(e) {
    if (e.button && e.button !== 0) return;
    e.preventDefault();
    const pt = svgPoint(e);
    m06Drag = node;
    m06DragOff.x = pt.x - node.x;
    m06DragOff.y = pt.y - node.y;
    node.fixed = true;
    m06Moved = false;
    group.classList.add("dragging");
    group.setPointerCapture(e.pointerId);
  }
  function move(e) {
    if (m06Drag !== node) return;
    const pt = svgPoint(e);
    const nx = pt.x - m06DragOff.x, ny = pt.y - m06DragOff.y;
    if (Math.hypot(nx - node.x, ny - node.y) > 2) m06Moved = true;
    node.x = nx; node.y = ny;
    m06UpdatePositions();
  }
  function end(e) {
    if (m06Drag !== node) return;
    m06Drag = null;
    node.fixed = false;
    group.classList.remove("dragging");
    try { group.releasePointerCapture(e.pointerId); } catch (err) {}
    m06Wake();
    if (m06Moved) {
      group.dataset.suppressClick = "1";
      setTimeout(() => { delete group.dataset.suppressClick; }, 0);
    }
  }
  group.addEventListener("pointerdown", start);
  group.addEventListener("pointermove", move);
  group.addEventListener("pointerup", end);
  group.addEventListener("pointercancel", end);
}

function svgPoint(e) {
  const svg = document.getElementById("networkViz");
  const pt = svg.createSVGPoint();
  pt.x = e.clientX; pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function m06AttachClick(group, id) {
  let count = 0, timer = null;
  group.addEventListener("click", () => {
    if (group.dataset.suppressClick) return;
    count++;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (count === 2) m06ToggleNode(id);
      else if (count >= 3) m06ToggleFlow(id);
      count = 0;
    }, 320);
  });
}

/* panel */
function m06ShowEdge(index) {
  const edge = N_EDGES[index];
  const s = nById(edge.s), t = nById(edge.t);
  const style = N_TYPE_STYLE[edge.type];

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

function m06HideEdge() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
}

/* visibilidad leyenda */
const nTypeOff = new Set();
const nNodeOff = new Set();

function m06RefreshEdges() {
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type;
    const s = group.querySelector ? null : null; /* se usa dataset */
    const sId = N_EDGES[Number(group.dataset.index)].s;
    const tId = N_EDGES[Number(group.dataset.index)].t;
    const hidden = nTypeOff.has(type) || nNodeOff.has(sId) || nNodeOff.has(tId);
    group.classList.toggle("hidden-edge", hidden);
  });
}

function m06ToggleNode(id) {
  const group = document.querySelector(`.ods-node[data-id="${id}"]`);
  if (!group) return;
  if (nNodeOff.has(id)) {
    nNodeOff.delete(id);
    group.classList.remove("node-off");
  } else {
    nNodeOff.add(id);
    group.classList.add("node-off");
  }
  m06RefreshEdges();
}

/* spotlight */
let nSpot = null;

function nClearSpot() {
  nSpot = null;
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  nApplySpot();
}

function nSetNodes(nodeIds, expand) {
  nSpot = { mode: "nodes", nodes: new Set(nodeIds), expand: !!expand };
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  nApplySpot();
}

function nApplySpot() {
  if (!nSpot || nSpot.mode !== "nodes") {
    document.querySelectorAll(".ods-node").forEach(el => {
      el.classList.remove("node-focus-dim", "node-focus-active");
    });
    document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-focus-dim"));
    return;
  }
  const visibleNodes = new Set(nSpot.nodes);
  const visibleEdges = new Set();
  N_EDGES.forEach((edge, i) => {
    const sIn = nSpot.nodes.has(edge.s), tIn = nSpot.nodes.has(edge.t);
    if (nSpot.expand) {
      if (sIn || tIn) { visibleEdges.add(i); visibleNodes.add(edge.s); visibleNodes.add(edge.t); }
    } else {
      if (sIn && tIn) visibleEdges.add(i);
    }
  });
  document.querySelectorAll(".ods-node").forEach(el => {
    const id = el.dataset.id;
    el.classList.toggle("node-focus-dim", !visibleNodes.has(id));
    el.classList.toggle("node-focus-active", nSpot.nodes.has(id));
  });
  document.querySelectorAll(".edge-group").forEach(el => {
    el.classList.toggle("edge-focus-dim", !visibleEdges.has(Number(el.dataset.index)));
  });
}

function m06ToggleFlow(id) {
  const already = nSpot && nSpot.mode === "nodes" && nSpot.expand &&
                  nSpot.nodes.size === 1 && nSpot.nodes.has(id);
  if (already) { nClearSpot(); return; }
  nSetNodes([id], true);
}

/* insights */
const N_INSIGHTS = {
  programatico: ["base", "esquina", "manzana", "inducir", "noanticipa"],
  propagacion:  ["propaga"],
  cascadas:     ["cascada"],
  emergencia:   ["emergencia"],
  todos:        N_NODES.map(n => n.id),
};

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;
  if (card.classList.contains("active")) { nClearSpot(); return; }
  nSetNodes(N_INSIGHTS[key] || N_NODES.map(n => n.id), true);
  card.classList.add("active");
}

/* filtros */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  const labels = { all: "todos", escalera: "escalera ic", ausente: "lo ausente" };
  const btnLabelsReal = { all: "Todos", escalera: "Escalera IC", ausente: "Lo ausente" };
  const btn = [...document.querySelectorAll(".network-controls .control-btn")].find(b => b.textContent.trim() === btnLabelsReal[mode]);
  (btn || document.querySelector(".network-controls .control-btn")).classList.add("active");

  const groups = { all: ["escalera", "ausente", "puente"], escalera: ["escalera"], ausente: ["ausente", "puente"] };
  const activeTypes = groups[mode] || groups.all;

  document.querySelectorAll(".legend-item[data-type]").forEach(item => {
    const type = item.dataset.type;
    const input = item.querySelector("input");
    const show = activeTypes.includes(type);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) nTypeOff.delete(type); else nTypeOff.add(type);
  });
  m06RefreshEdges();

  nClearSpot();
  const insightMap = { escalera: "programatico", ausente: "emergencia" };
  if (mode !== "all" && insightMap[mode]) {
    const card = document.querySelector(`.insight-card[data-insight="${insightMap[mode]}"]`);
    if (card) card.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  m06Render();

  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const type = item.dataset.type;
      if (e.target.checked) nTypeOff.delete(type); else nTypeOff.add(type);
      item.classList.toggle("off", !e.target.checked);
      m06RefreshEdges();
    });
  });

  document.getElementById("edgeInfoClose")?.addEventListener("click", m06HideEdge);
});
