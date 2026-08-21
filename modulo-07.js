/* ==========================================================
   RAPOT — MÓDULO 07: POSTURA CRÍTICA — Bogotá Viva
   Red argumentativa: los tres hallazgos contra el texto del POT.

   Nodos:
   - hallazgo (teal): los tres hallazgos de la ingeniería inversa
   - evidencia (morado): casos y artículos del POT que los sostienen
   - consecuencia (rojo): lo que el POT no puede ver

   Tipos de arista:
   - hallazgo_1  → verde  continua, con flecha
   - hallazgo_2  → amarillo punteada, con flecha
   - hallazgo_3  → rosa   continua, con flecha
   - consecuencia→ azul   discontinua, sin flecha
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";

/* -------- Nodos -------- */
const ODS_NODES = [
  /* hallazgos */
  { id: "h1",        cat: "hallazgo",  name: "HALLAZGO 1\nOBJETOS,\nNO FLUJOS",            icon: "fa-cubes",           color: "#4ade80", x: 420,  y: 380, r: 58 },
  { id: "h2",        cat: "hallazgo",  name: "HALLAZGO 2\nMUNDO\nPEQUEÑO",                 icon: "fa-diagram-project", color: "#f5c945", x: 735,  y: 260, r: 56 },
  { id: "h3",        cat: "hallazgo",  name: "HALLAZGO 3\nREGLAS SIN\nSIMULACIÓN",         icon: "fa-forward",         color: "#f76fb0", x: 1050, y: 380, r: 58 },
  /* evidencias */
  { id: "ar11",      cat: "evidencia", name: "ART. 11,\nPAR. 1\nCONECTORES",               icon: "fa-link-slash",      color: "#a276f2", x: 250,  y: 200, r: 50 },
  { id: "art50",     cat: "evidencia", name: "ART. 50\nVAN DER\nHAMMEN",                   icon: "fa-mountain-sun",    color: "#a276f2", x: 230,  y: 470, r: 50 },
  { id: "capellania",cat: "evidencia", name: "CAPELLANÍA\n27,03 → 29,32 HA",               icon: "fa-water",           color: "#a276f2", x: 470,  y: 620, r: 54 },
  { id: "art100",    cat: "evidencia", name: "ART. 100\nESECI\n\"DINÁMICA\"",              icon: "fa-city",            color: "#a276f2", x: 640,  y: 90,  r: 52 },
  { id: "metro",     cat: "evidencia", name: "METRO:\nKENNEDY /\nSUBA",                    icon: "fa-train-subway",    color: "#a276f2", x: 830,  y: 110, r: 54 },
  { id: "art304",    cat: "evidencia", name: "ART. 304\nIC 5.0 / 6.0\n/ 7.0",              icon: "fa-stairs",          color: "#a276f2", x: 1240, y: 240, r: 54 },
  /* consecuencias */
  { id: "noflujos",  cat: "consecuencia", name: "NO VE\nTiempos, flujos,\nintensidades",  icon: "fa-wave-square",     color: "#ef4444", x: 160,  y: 340, r: 52 },
  { id: "noconex",   cat: "consecuencia", name: "NO ARTICULA\nEstructuras aisladas\nentre sí",                       icon: "fa-unlink",          color: "#ef4444", x: 735,  y: 470, r: 54 },
  { id: "noanticipa",cat: "consecuencia", name: "NO ANTICIPA\nResultados emergentes\nde miles de agentes",           icon: "fa-hourglass-end",   color: "#ef4444", x: 1330, y: 430, r: 56 },
  { id: "reloj",     cat: "consecuencia", name: "RELOJ\nPrograma, no\nreacciona",           icon: "fa-clock",           color: "#5b8def", x: 1330, y: 620, r: 50 },
];

ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* -------- Tipos de arista -------- */
const TYPE_STYLE = {
  hallazgo_1:  { color: "#4ade80", width: 2.6, label: "Hallazgo 1 — objetos localizados, no flujos", arrow: true,  dash: null },
  hallazgo_2:  { color: "#f5c945", width: 2.6, label: "Hallazgo 2 — red de mundo pequeño entre estructuras", arrow: true,  dash: "5 4" },
  hallazgo_3:  { color: "#f76fb0", width: 2.6, label: "Hallazgo 3 — reglas generativas sin simulación", arrow: true,  dash: null },
  consecuencia:{ color: "#5b8def", width: 2.2, label: "Consecuencia — lo que el POT no puede ver", arrow: false, dash: "6 5" },
};

/* -------- Aristas -------- */
const RAW_EDGES = [
  /* --- Hallazgo 1: objetos localizados, no flujos --- */
  { s: "h1",         t: "ar11",       type: "hallazgo_1", directa: true, pagina: 11, paginaTexto: "Decreto 555, Art. 11, Parágrafo 1", sustento: "\u201C...los conectores ecosistémicos no hacen parte de la Estructura Ecológica Principal, ni constituyen afectación o suelo de protección, salvo cuando se traslapen con la EEP.\u201D — el POT reconoce la conexión ecológica pero jurídicamente la deja fuera de la estructura que protege: el flujo existe, el objeto no." },
  { s: "h1",         t: "art50",      type: "hallazgo_1", directa: true, pagina: 50, paginaTexto: "Decreto 555, Art. 50", sustento: "El Art. 50 reconoce a la Reserva Van der Hammen únicamente \u201Ccomo área de conservación in situ\u201D, remitiendo su régimen de usos al Plan de Manejo Ambiental de 2014 de la CAR. El decreto la nombra, pero no describe su comportamiento ecológico." },
  { s: "h1",         t: "capellania", type: "hallazgo_1", directa: true, paginaTexto: "\u201CBogotá Reverdece\u201D — documento oficial de balance", sustento: "\u201C...amplía en otros puntos del humedal las áreas que se sustraerán para la vía; así, Capellanía pasa de tener 27,03 ha a tener 29,32 ha.\u201D — el límite de protección se mueve para darle paso a la infraestructura, no al revés: el objeto protege la obra, no el ecosistema." },

  /* --- Hallazgo 2: red de mundo pequeño --- */
  { s: "h2",         t: "art100",     type: "hallazgo_2", directa: true, pagina: 100, paginaTexto: "Decreto 555, Art. 100", sustento: "El Art. 100 define la Estructura Socioeconómica, Creativa y de Innovación como \u201Cuna estructura dinámica, que modela y transforma constantemente el territorio urbano y rural\u201D. El propio texto usa la palabra \u201Cdinámica\u201D — pero la representa con un mapa fijo y una tabla de áreas de actividad, no con ningún proceso que pueda transformarse." },
  { s: "h2",         t: "metro",      type: "hallazgo_2", directa: true, paginaTexto: "\u201CBogotá Reverdece\u201D — capítulo del Metro", sustento: "\u201C...con el Metro no solo llegan trenes eléctricos y estaciones, también llega más progreso social...\u201D — Kennedy: Manzana del Cuidado, centro deportivo, velódromo, parque metropolitano; Suba: colegios, universidad, biblioteca, centro cultural, ~15.000 VIS. El POT dice qué debe conectarse, pero no muestra cómo esas relaciones cambian, con qué intensidad y bajo qué desigualdad de acceso." },

  /* --- Hallazgo 3: reglas generativas sin simulación --- */
  { s: "h3",         t: "art304",     type: "hallazgo_3", directa: true, pagina: 304, paginaTexto: "Decreto 555, Art. 304 (Libro III)", sustento: "La escalera de incentivos: proyectos sin englobe \u201Cpueden alcanzar un índice de construcción efectivo máximo de cinco (5.0)\u201D; con englobe de esquina y cesión, \u201Cseis (6.0)\u201D; y los que incluyan \u201Cla totalidad de los predios de una manzana podrán alcanzar un índice de construcción efectivo máximo de siete (7.0)\u201D. Una escalera escrita para producir un comportamiento colectivo — englobar manzanas enteras." },

  /* --- Consecuencias: lo que el POT no puede ver --- */
  { s: "h1",         t: "noflujos",   type: "consecuencia", directa: true, paginaTexto: "Consecuencia del Hallazgo 1", sustento: "Porque el plan modela objetos y no flujos, los tiempos, flujos, intensidades, dependencias, conflictos e intercambios de la ciudad real quedan fuera del modelo declarado: el POT dice qué debe conectarse, pero no muestra con qué precisión cómo esas relaciones cambian." },
  { s: "h2",         t: "noconex",    type: "consecuencia", directa: true, paginaTexto: "Consecuencia del Hallazgo 2", sustento: "La arquitectura \u201Cmundo pequeño\u201D produce estructuras densas hacia adentro y prácticamente aisladas entre sí. El propio texto no lo evidencia porque solo se lee de manera lineal, artículo por artículo: hace falta la ingeniería inversa relacional para verlo." },
  { s: "h3",         t: "noanticipa", type: "consecuencia", directa: true, paginaTexto: "Consecuencia del Hallazgo 3", sustento: "El POT sí escribe reglas generativas (Art. 304), pero no tiene ningún dispositivo para anticipar qué ciudad resulta cuando miles de propietarios responden a ese incentivo al mismo tiempo. Tiene la regla. No corre la simulación." },
  { s: "h3",         t: "reloj",      type: "consecuencia", directa: true, paginaTexto: "Consecuencia transversal — tiempo programático", sustento: "El POT tiene tiempo, pero solo un tipo de tiempo: programático (plazos, vigencias, seguimiento y evaluación). No tiene tiempo dinámico: nada viaja por la red, no hay cascadas ni fallo en cadena, no hay agentes cuya conducta agregada produzca resultados." },
  { s: "noflujos",   t: "noanticipa", type: "consecuencia", directa: true, paginaTexto: "Los tres hallazgos son un mismo argumento", sustento: "Los tres hallazgos convergen: un modelo de objetos (H1) que se organiza como red aislada (H2) y que declara reglas sin correrlas (H3) no puede representar la dinámica, la emergencia y la autoorganización del territorio real." },
  { s: "noanticipa", t: "reloj",      type: "consecuencia", directa: true, paginaTexto: "El puente a la propuesta", sustento: "De aquí nace la postura: el POT es un instrumento necesario (su función jurídica la cumple bien), pero no suficiente. Necesita ser complementado —no sustituido— por modelos capaces de representar la dinámica, la emergencia y la autoorganización." },
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
    ["blur", "blur", "SourceGraphic"].forEach(ref => {
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

  if (edge.curve) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const px = -uy, py = ux;
    const cx = mx + px * edge.curve, cy = my + py * edge.curve;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  }
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
  const k = 0.012;          /* resorte */
  const homeK = 0.006;      /* ancla */
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
    hit.setAttribute("stroke-width", "16");
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
  const catLabel = { hallazgo: "HALLAZGO", evidencia: "EVIDENCIA", consecuencia: "CONSECUENCIA" };
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

    if (n.cat !== "hallazgo") {
      const ring = document.createElementNS(SVG_NS, "circle");
      ring.setAttribute("r", n.r + 6);
      ring.setAttribute("fill", "none");
      ring.setAttribute("stroke", n.color);
      ring.setAttribute("stroke-width", "1.5");
      ring.setAttribute("stroke-dasharray", "4 4");
      ring.setAttribute("opacity", "0.6");
      group.appendChild(ring);
    }

    const iconG = document.createElementNS(SVG_NS, "g");
    iconG.setAttribute("transform", "translate(-14,-30)");
    const icon = document.createElementNS(SVG_NS, "text");
    icon.setAttribute("class", "fa " + n.icon);
    icon.setAttribute("fill", n.color);
    icon.setAttribute("font-size", "24");
    icon.setAttribute("text-anchor", "middle");
    iconG.appendChild(icon);
    group.appendChild(iconG);

    const nameLines = n.name.split("\n");
    nameLines.forEach((line, li) => {
      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("y", 8 + li * 16);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#e8ecf4");
      text.setAttribute("font-size", "11");
      text.setAttribute("font-weight", "700");
      text.setAttribute("font-family", "Space Grotesk, sans-serif");
      text.textContent = line;
      group.appendChild(text);
    });

    const catTag = document.createElementNS(SVG_NS, "text");
    catTag.setAttribute("y", 8 + nameLines.length * 16);
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
    edge.paginaTexto ? `Referencia: ${edge.paginaTexto}` : (edge.pagina != null ? `Página POT: p. ${edge.pagina}` : "Referencia: por confirmar");

  document.getElementById("edgeInfoPanel").classList.add("visible");

  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => {
    row.classList.toggle("row-highlight", Number(row.dataset.edge) === index);
  });
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.remove("row-highlight"));
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
  applySpotlightState();
}

function setSpotlightTypes(types) {
  spotlight = { mode: "types", types };
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
  } else if (spotlight && spotlight.mode === "types") {
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      if (spotlight.types.includes(edge.type)) visibleEdges.add(i);
    });
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
  h1: ["h1", "ar11", "art50", "capellania", "noflujos"],
  h2: ["h2", "art100", "metro", "noconex"],
  h3: ["h3", "art304", "noanticipa", "reloj"],
  reloj: ["noflujos", "noanticipa", "reloj"],
};

const TYPE_KEY = {
  hallazgo_1: "hallazgo_1",
  hallazgo_2: "hallazgo_2",
  hallazgo_3: "hallazgo_3",
  consecuencia: "consecuencia",
};

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;

  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  if (TYPE_KEY[key]) {
    setSpotlightTypes([TYPE_KEY[key]]);
  } else if (key === "todos") {
    setSpotlightNodes(ODS_NODES.map(n => n.id), false);
  } else if (NODE_INSIGHTS[key] && NODE_INSIGHTS[key].length) {
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

  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
}

/* -------- filtros -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  const btnLabels = { all: "todos", hallazgo_1: "hallazgo 1", hallazgo_2: "hallazgo 2", hallazgo_3: "hallazgo 3", consecuencia: "consecuencia" };
  const btn = [...document.querySelectorAll(".network-controls .control-btn")].find(b => b.textContent.trim().toLowerCase() === btnLabels[mode]);
  (btn || document.querySelector(`.network-controls .control-btn`)).classList.add("active");

  const groups = {
    all: ["hallazgo_1", "hallazgo_2", "hallazgo_3", "consecuencia"],
    hallazgo_1: ["hallazgo_1"],
    hallazgo_2: ["hallazgo_2"],
    hallazgo_3: ["hallazgo_3"],
    consecuencia: ["consecuencia"],
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

  /* Mantener sincronizada la tarjeta de insight correspondiente */
  const insightMap = { hallazgo_1: "h1", hallazgo_2: "h2", hallazgo_3: "h3", consecuencia: "reloj" };
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  if (mode !== "all" && insightMap[mode]) {
    const card = document.querySelector(`.insight-card[data-insight="${insightMap[mode]}"]`);
    if (card) card.classList.add("active");
    setSpotlightTypes(activeTypes);
  } else {
    clearSpotlight();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
});
