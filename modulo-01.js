/* ==========================================================
   RED CONCEPTUAL DE PATRIMONIO + EFC — diagrama con física de nodos
   - Los nodos parten de una posición fija, pero se pueden ARRASTRAR:
     al mover una bola, las conectadas la "siguen" (fuerza de resorte),
     y el conjunto tiende a volver a su posición original.
   - Conexiones tomadas 1 a 1 de la tabla de relaciones del POT
     (páginas 186, 196, 198 + páginas 30, 43, 122, 125, 126, 239–241 para EFC).
   - Clic en una línea -> panel con Conexión / Tipo / Frase exacta / Página.
   - Doble clic en una bola -> la apaga (opacidad) y oculta sus líneas.
   - Triple clic en una bola -> aísla su flujo (solo se ven los nodos
     y líneas con los que se conecta directamente).
   - Todas las relaciones son "Directa — continua": línea sólida.
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- Nodos: conceptos de patrimonio + EFC con posición fija -------- */
const ODS_NODES = [
  /* PATRIMONIO */
  { id: "pcm",    num: "", name: "PATRIMONIO CULTURAL\nMATERIAL",                               icon: "fa-landmark",        color: "#2fd4c8", x: 735,  y: 110, r: 64 },
  { id: "pcim",   num: "", name: "PATRIMONIO CULTURAL\nINMATERIAL",                           icon: "fa-masks-theater",   color: "#a276f2", x: 320,  y: 340, r: 60 },
  { id: "pn",     num: "", name: "PATRIMONIO NATURAL",                                        icon: "fa-leaf",            color: "#4ade80", x: 1100, y: 340, r: 60 },
  { id: "pa",     num: "", name: "PATRIMONIO ARQUEOLÓGICO",                                   icon: "fa-trowel",          color: "#ef9552", x: 580,  y: 610, r: 56 },
  { id: "sss",    num: "", name: "SISTEMA DE SITIOS\nSAGRADOS",                               icon: "fa-mountain-sun",    color: "#f5c945", x: 150,  y: 620, r: 56 },
  { id: "eip",    num: "", name: "EIP — ESTRUCTURA\nECOLÓGICA PRINCIPAL",               icon: "fa-diagram-project", color: "#5b8def", x: 1330, y: 130, r: 60 },
  
  /* EFC */
  { id: "rv",     num: "", name: "RED VIAL",                                                   icon: "fa-road",            color: "#f97316", x: 200,  y: 150, r: 50 },
  { id: "cv",     num: "", name: "CORREDORES\nVERDES",                                         icon: "fa-tree",            color: "#22c55e", x: 400,  y: 200, r: 50 },
  { id: "cr",     num: "", name: "CICLORUTAS",                                                 icon: "fa-person-biking",   color: "#06b6d4", x: 500,  y: 100, r: 48 },
  { id: "tp",     num: "", name: "TRANSPORTE\nPÚBLICO",                                       icon: "fa-bus",             color: "#8b5cf6", x: 350,  y: 30,  r: 52 },
  { id: "eq",     num: "", name: "EQUIPAMIENTOS",                                             icon: "fa-building",        color: "#ec4899", x: 900,  y: 600, r: 50 },
  { id: "vi",     num: "", name: "VIVIENDA",                                                   icon: "fa-house",           color: "#3b82f6", x: 1050, y: 630, r: 48 },
  { id: "mdc",    num: "", name: "MANZANAS DEL\nCUIDADO",                                     icon: "fa-heart",           color: "#f43f5e", x: 1200, y: 580, r: 56 },
  { id: "ss",     num: "", name: "SERVICIOS\nSOCIALES",                                       icon: "fa-hands-helping",   color: "#d946ef", x: 1320, y: 650, r: 50 },
  { id: "sc",     num: "", name: "SERVICIOS DE\nCUIDADO",                                     icon: "fa-hospital",        color: "#06b6d4", x: 1050, y: 720, r: 50 },
];

/* -------- física: cada nodo guarda su posición "casa" (ancla) y velocidad -------- */
ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* Tipos de relación de la tabla: soporte (verde) y resiliencia (rosa) */
const TYPE_STYLE = {
  soporte:     { color: "#4ade80", width: 2.2, label: "Soporte" },
  resiliencia: { color: "#f76fb0", width: 1.5, label: "Resiliencia" },
};

/* -------- Aristas: tabla de relaciones del POT, 1 a 1 -------- */
const RAW_EDGES = [
  /* PATRIMONIO (relaciones originales) */
  { s: "pcm",  t: "pcim", type: "soporte",     directa: true, pagina: 196, sustento: ""la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio."" },
  { s: "pcm",  t: "pn",   type: "soporte",     directa: true, pagina: 196, sustento: ""la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio."" },
  { s: "pcim", t: "pn",   type: "soporte",     directa: true, pagina: 196, sustento: ""la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio."" },
  { s: "pa",   t: "pn",   type: "resiliencia", directa: true, pagina: 198, sustento: ""hoy pueden ser referentes de procesos adaptativos y que revelan prácticas de integralidad de la cultura con la naturaleza."" },
  { s: "pa",   t: "pcm",  type: "soporte",     directa: true, pagina: 198, sustento: ""Este patrimonio cultural se convirtió en un referente de movilización"" },
  { s: "sss",  t: "pcim", type: "soporte",     directa: true, pagina: 186, sustento: ""son el testimonio de complejas estrategias de cómo interpretamos y valoramos las huellas del territorio que"" },
  /* EIP articula el sistema de relaciones (pág. 196): enlace conceptual con el nodo EIP */
  { s: "eip",  t: "pcm",  type: "soporte",     directa: true, pagina: 196, sustento: ""la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio."", esEip: true },
  { s: "eip",  t: "pcim", type: "soporte",     directa: true, pagina: 196, sustento: ""la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio."", esEip: true },
  { s: "eip",  t: "pn",   type: "soporte",     directa: true, pagina: 196, sustento: ""la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio."", esEip: true },
  
  /* EFC (relaciones nuevas) */
  { s: "rv",   t: "tp",   type: "soporte",     directa: true, pagina: 43,  sustento: ""Además del Metro, Bogotá necesita con urgencia ampliar sus entradas y salidas, tapar más huecos, hacer más vías, ciclorutas, cables y corredores verdes con buses eléctricos para que el transporte público de calidad llegue a todas partes, conecte a la gente, la saque del tránsito y la contaminación."" },
  { s: "cv",   t: "tp",   type: "soporte",     directa: true, pagina: 30,  sustento: ""que, en todo caso, las diversas zonas de la ciudad estén conectadas por un sistema multimodal de transporte público, colectivo, de energías limpias y renovables basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorutas."" },
  { s: "cr",   t: "tp",   type: "soporte",     directa: true, pagina: 239, sustento: ""Por eso, además del Metro, y para alimentarlo y complementarlo, están los corredores verdes, con diseño ecosistémico, transporte público eléctrico, ciclorutas seguras y andenes, plazas y espacios de encuentro..."" },
  { s: "eq",   t: "vi",   type: "soporte",     directa: true, pagina: 126, sustento: ""Por un lado, priorizamos que los colegios o equipamientos educativos estén cerca de la vivienda o incluso cerca del trabajo de los padres."" },
  { s: "mdc",  t: "vi",   type: "soporte",     directa: true, pagina: 125, sustento: ""Aprovechar los equipamientos existentes como anclas de las Manzanas del Cuidado, para que en esos diferentes espacios del Distrito cuiden a quienes nos cuidan, fue el cuello de botella que se resolvió con el pot."" },
  { s: "mdc",  t: "ss",   type: "soporte",     directa: true, pagina: 126, sustento: ""cuantifica los servicios sociales del Distrito y hace efectiva la articulación interinstitucional."" },
  { s: "mdc",  t: "sc",   type: "soporte",     directa: true, pagina: 122, sustento: ""Las Manzanas del Cuidado son áreas acotadas que agrupan diversas infraestructuras para brindar servicios de manera simultánea y articulada a las personas cuidadoras, a quienes ellas cuidan y a sus familias."" },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- física: longitud de reposo de cada resorte (arista) -------- */
RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

/* -------- defs: glow por color de nodo + flechas por tipo -------- */
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

/* -------- aristas: grupo con línea visual + línea invisible más ancha para clic -------- */
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

function drawEdges(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edges-layer");

  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s);
    const t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];
    const d = edgePathData(edge, s, t);

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);
    group.style.setProperty("--edge-color", style.color);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("d", d);
    hit.setAttribute("class", "ods-edge edge-hit");

    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("d", d);
    visual.setAttribute("class", "ods-edge edge-visual");
    visual.setAttribute("stroke", style.color);
    visual.setAttribute("stroke-width", edge.esEip ? style.width * 0.8 : style.width);
    if (!edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
    visual.setAttribute("marker-end", `url(#arrow-${edge.type})`);
    visual.setAttribute("opacity", edge.esEip ? "0.45" : "0.9");

    group.appendChild(visual);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(i));
    g.appendChild(group);

    edge._el = { visual, hit };
  });

  svg.appendChild(g);
}

/* -------- nodos -------- */
function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node");
    group.setAttribute("data-id", node.id);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring");
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("stroke", node.color);
    circle.setAttribute("stroke-width", 2.5);
    circle.setAttribute("filter", "url(#glow-" + node.color.replace("#", "") + ")");

    const fo = document.createElementNS(SVG_NS, "foreignObject");
    const size = node.r * 2.2;
    fo.setAttribute("x", node.x - size / 2); fo.setAttribute("y", node.y - size / 2);
    fo.setAttribute("width", size); fo.setAttribute("height", size);

    const wrapper = document.createElementNS(XHTML_NS, "div");
    wrapper.setAttribute("class", "node-inner");
    wrapper.setAttribute("style",
      "width:100%;height:100%;display:flex;flex-direction:column;" +
      "align-items:center;justify-content:center;gap:1px;pointer-events:none;"
    );

    const icon = document.createElementNS(XHTML_NS, "i");
    icon.setAttribute("class", `fa-solid ${node.icon}`);
    icon.setAttribute("style", `font-size:${node.r * 0.7}px;color:${node.color};`);
    wrapper.appendChild(icon);

    const label = document.createElementNS(XHTML_NS, "text");
    label.setAttribute("style",
      `font-size:${Math.min(node.r * 0.35, 13)}px;font-weight:600;text-align:center;` +
      `color:#fff;line-height:1.1;white-space:pre-wrap;pointer-events:none;`
    );
    label.textContent = node.name;
    wrapper.appendChild(label);

    fo.appendChild(wrapper);
    group.appendChild(circle);
    group.appendChild(fo);

    attachNodeClickHandler(group, node.id);
    g.appendChild(group);
  });

  svg.appendChild(g);
}

/* -------- interactividad: drag + physics -------- */
let dragNode = null;

function renderNetwork() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg);
  drawEdges(svg);
  drawNodes(svg);

  svg.addEventListener("mousedown", (e) => {
    const el = e.target.closest(".ods-node");
    if (!el) return;
    dragNode = nodeById(el.dataset.id);
    if (dragNode) dragNode.fixed = true;
  });

  svg.addEventListener("mousemove", (e) => {
    if (!dragNode) return;
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (1470 / rect.width);
    const y = (e.clientY - rect.top) * (780 / rect.height);
    dragNode.x = x;
    dragNode.y = y;
    dragNode.homeX = x;
    dragNode.homeY = y;
    updateRender();
  });

  svg.addEventListener("mouseup", () => {
    if (dragNode) dragNode.fixed = false;
    dragNode = null;
  });

  requestAnimationFrame(animateNetwork);
}

function updateRender() {
  ODS_NODES.forEach(node => {
    const el = document.querySelector(`.ods-node[data-id="${node.id}"]`);
    if (!el) return;
    const circle = el.querySelector(".node-ring");
    const fo = el.querySelector("foreignObject");
    if (circle) { circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); }
    if (fo) { fo.setAttribute("x", node.x - (node.r * 1.1)); fo.setAttribute("y", node.y - (node.r * 1.1)); }
  });

  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s);
    const t = nodeById(edge.t);
    if (!s || !t || !edge._el) return;
    const d = edgePathData(edge, s, t);
    edge._el.visual.setAttribute("d", d);
    edge._el.hit.setAttribute("d", d);
  });
}

function animateNetwork() {
  const dt = 0.016; // ~60fps
  const gravity = 0.08;
  const damping = 0.85;

  ODS_NODES.forEach(node => {
    if (node.fixed) return;

    let fx = 0, fy = 0;

    // Resorte hacia la posición home
    const dx = node.homeX - node.x, dy = node.homeY - node.y;
    fx += dx * gravity;
    fy += dy * gravity;

    // Repulsión entre nodos
    ODS_NODES.forEach(other => {
      if (other === node) return;
      const dx = node.x - other.x, dy = node.y - other.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = 50 / (dist * dist);
      fx += (dx / dist) * force;
      fy += (dy / dist) * force;
    });

    // Aceleración y velocidad
    node.vx = (node.vx + fx * dt) * damping;
    node.vy = (node.vy + fy * dt) * damping;
    node.x += node.vx * dt;
    node.y += node.vy * dt;
  });

  updateRender();
  requestAnimationFrame(animateNetwork);
}

/* -------- panel de información de arista -------- */
function showEdgeInfo(i) {
  const edge = RAW_EDGES[i];
  if (!edge) return;

  document.getElementById("edgeInfoTitle").textContent = `${edge.s} → ${edge.t}`;
  document.getElementById("edgeInfoType").textContent = TYPE_STYLE[edge.type].label;
  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent = `Página ${edge.pagina}`;

  const panel = document.getElementById("edgeInfoPanel");
  panel.classList.add("visible");
  document.querySelector(".edge-group")?.classList.remove("highlighted");
  document.querySelector(`.edge-group[data-index="${i}"]`)?.classList.add("highlighted");
}

function hideEdgeInfo() {
  const panel = document.getElementById("edgeInfoPanel");
  panel.classList.remove("visible");
  document.querySelector(".edge-group.highlighted")?.classList.remove("highlighted");
}

/* -------- filtros de visibilidad -------- */
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

/* -------- clic simple / doble / triple sobre una bola -------- */
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

function setSpotlightTypes(types) {
  spotlight = { mode: "types", types };
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

/* -------- tarjetas de insights -------- */
const NODE_INSIGHTS = {
  soporte:     ["pcm", "pcim", "pn", "pa", "sss", "rv", "cv", "cr", "tp", "eq", "vi", "mdc", "ss", "sc"],
  resiliencia: ["pa", "pn"],
  hubs:        ["pn", "pcm", "tp", "mdc"],
  directas:    [],
};

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;

  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  if (key === "soporte" || key === "resiliencia") {
    setSpotlightTypes([key]);
  } else if (key === "directas") {
    const directIds = RAW_EDGES.filter(e => e.directa).flatMap(e => [e.s, e.t]);
    setSpotlightNodes(directIds, true);
  } else if (key === "todos") {
    const allIds = ODS_NODES.map(n => n.id);
    setSpotlightNodes(allIds, false);
  } else {
    const ids = NODE_INSIGHTS[key] || [];
    setSpotlightNodes(ids, true);
  }

  card.classList.add("active");
}

/* -------- panel de convenciones -------- */
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

/* -------- controles Todos / Soporte / Resiliencia -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  const groups = {
    all: ["soporte", "resiliencia"],
    soporte: ["soporte"],
    resiliencia: ["resiliencia"],
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
}

/* -------- botones de acción (placeholders) -------- */
function generateODSReport() { console.log("Generando reporte de red..."); }
function downloadAlignment() { console.log("Descargando tabla de relaciones..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
});
