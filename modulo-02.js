/* ============================================================
   RAPOT · Módulo 02 — Movilidad y Humedales
   ============================================================ */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";
const CANVAS = { w: 1400, h: 780 };

/* ---------- ESTILOS DE RELACIÓN ---------- */
const RELACION_STYLE = {
  Soporte:    { color: "#ef9552", label: "Soporte" },
  Resiliencia:{ color: "#5b8def", label: "Resiliencia" },
};
const TYPE_STYLE = {
  directa:   { label: "Directa" },
  indirecta: { label: "Indirecta" },
  vacio:     { label: "Vacío" },
};
const STRUCT_STYLE = {
  e1: { label: "Ecológica Principal",        articulos: 39, color: "#5cd6d1" },
  e2: { label: "Funcional y del Cuidado",    articulos: 12, color: "#ef9f54" },
  e3: { label: "Socioeconómica, Creativa",   articulos:  8, color: "#fac47b" },
  e4: { label: "Integradora de Patrimonio",  articulos:  2, color: "#fb8d84" },
};
const FUENTE_STYLE = {
  cita_literal:       { color: "#2fd4c8", label: "Cita literal verificada (Nivel A)", icon: "fa-quote-right" },
  indice_oficial:     { color: "#5b8def", label: "Índice oficial (título confirmado)", icon: "fa-list-check" },
  fuente_secundaria:  { color: "#f5c945", label: "Fuente secundaria (ABC POT / prensa oficial)", icon: "fa-newspaper" },
  inferencia:         { color: "#ef9552", label: "Inferencia razonada del equipo", icon: "fa-lightbulb" },
  inventario_pendiente:{ color: "#8b93a8", label: "Inventario previo (Nivel B/C — cita sin validar)", icon: "fa-hourglass-half" },
};

/* ---------- NODOS ---------- */
const ODS_NODES = [
  /* E1 - Ecológica Principal */
  { id:"sistema_ambiental", cat:"e1", name:"SISTEMA\nAMBIENTAL", icon:"fa-globe-americas", fuente:"cita_literal", isMainHub:true },
  { id:"estructura_ecologica", cat:"e1", name:"EEP", icon:"fa-leaf", fuente:"cita_literal", isMainHub:true },
  { id:"humedales", cat:"e1", name:"HUMEDALES", icon:"fa-droplet", fuente:"cita_literal" },
  { id:"ríos", cat:"e1", name:"RÍOS", icon:"fa-water", fuente:"inventario_pendiente" },
  { id:"quebradas", cat:"e1", name:"QUEBRADAS", icon:"fa-water", fuente:"inventario_pendiente" },
  { id:"complejos_de_paramos", cat:"e1", name:"COMPLEJOS\nDE PÁRAMOS", icon:"fa-mountain", fuente:"inventario_pendiente" },
  { id:"coberturas_vegetales", cat:"e1", name:"COBERTURAS\nVEGETALES", icon:"fa-leaf", fuente:"inventario_pendiente" },
  { id:"areas_de_resiliencia_climatica", cat:"e1", name:"ÁREAS DE\nRESILIENCIA CLIMÁTICA", icon:"fa-shield-heart", fuente:"cita_literal" },
  { id:"areas_protegidas", cat:"e1", name:"ÁREAS\nPROTEGIDAS", icon:"fa-shield-halved", fuente:"inventario_pendiente" },
  { id:"reservas_forestales", cat:"e1", name:"RESERVAS\nFORESTALES", icon:"fa-tree-city", fuente:"inventario_pendiente" },

  /* E2 - Funcional y del Cuidado */
  { id:"estructura_funcional", cat:"e2", name:"EFC", icon:"fa-bus", fuente:"cita_literal", isMainHub:true },
  { id:"movilidad", cat:"e2", name:"MOVILIDAD", icon:"fa-route", fuente:"cita_literal" },
  { id:"metro", cat:"e2", name:"METRO", icon:"fa-train-subway", fuente:"cita_literal" },
  { id:"regiotram", cat:"e2", name:"REGIOTRAM", icon:"fa-train", fuente:"cita_literal" },
  { id:"ciclorutas", cat:"e2", name:"CICLORUTAS", icon:"fa-person-biking", fuente:"cita_literal" },
  { id:"transporte_publico", cat:"e2", name:"TRANSPORTE\nPÚBLICO", icon:"fa-bus", fuente:"cita_literal" },
  { id:"red_vial", cat:"e2", name:"RED VIAL", icon:"fa-road", fuente:"cita_literal" },
  { id:"corredores_verdes", cat:"e2", name:"CORREDORES\nVERDES", icon:"fa-seedling", fuente:"cita_literal" },
  { id:"manzanas_del_cuidado", cat:"e2", name:"MANZANAS\nDEL CUIDADO", icon:"fa-building-shield", fuente:"cita_literal" },
  { id:"equipamientos", cat:"e2", name:"EQUIPAMIENTOS", icon:"fa-school", fuente:"cita_literal" },
  { id:"servicios_sociales", cat:"e2", name:"SERVICIOS\nSOCIALES", icon:"fa-people-roof", fuente:"cita_literal" },
  { id:"vivienda", cat:"e2", name:"VIVIENDA", icon:"fa-house", fuente:"cita_literal" },
  { id:"parques", cat:"e2", name:"PARQUES", icon:"fa-tree", fuente:"inventario_pendiente" },

  /* E3 - Socioeconómica, Creativa */
  { id:"estructura_socioeconomica", cat:"e3", name:"ESECI", icon:"fa-briefcase", fuente:"cita_literal", isMainHub:true },
  { id:"economia_creativa", cat:"e3", name:"ECONOMÍA\nCREATIVA", icon:"fa-lightbulb", fuente:"cita_literal" },
  { id:"innovacion", cat:"e3", name:"INNOVACIÓN", icon:"fa-rocket", fuente:"inferencia" },
  { id:"empleo", cat:"e3", name:"EMPLEO", icon:"fa-briefcase", fuente:"cita_literal" },
  { id:"vivienda_interes_social", cat:"e3", name:"VIVIENDA DE\nINTERÉS SOCIAL", icon:"fa-house-chimney", fuente:"cita_literal" },

  /* E4 - Integradora de Patrimonio */
  { id:"estructura_patrimonio", cat:"e4", name:"EIP", icon:"fa-landmark", fuente:"cita_literal", isMainHub:true },
  { id:"patrimonio_cultural", cat:"e4", name:"PATRIMONIO\nCULTURAL", icon:"fa-landmark-dome", fuente:"cita_literal" },
  { id:"centro_historico", cat:"e4", name:"CENTRO\nHISTÓRICO", icon:"fa-chess-rook", fuente:"cita_literal" },
];

/* Asignar posiciones y radios iniciales */
ODS_NODES.forEach((n, i) => {
  const angle = (i / ODS_NODES.length) * Math.PI * 2;
  const radius = n.isMainHub ? 0 : 280;
  n.x = CANVAS.w / 2 + Math.cos(angle) * radius;
  n.y = CANVAS.h / 2 + Math.sin(angle) * radius;
  n.r = n.isMainHub ? 42 : 18 + Math.random() * 8;
  n.color = STRUCT_STYLE[n.cat].color;
});

/* ---------- ARISTAS ---------- */
const RAW_EDGES = [
  { s:"sistema_ambiental", t:"estructura_ecologica", tipo:"directa", cat:"e1", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 100", pagina:"56", cita:"El Sistema Ambiental y de Estructura Ecológica Principal es la base del modelo territorial.", analisis:"Relación fundacional del POT." },
  { s:"estructura_ecologica", t:"humedales", tipo:"directa", cat:"e1", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 101", pagina:"57", cita:"Los humedales son componentes estratégicos de la EEP.", analisis:"Hub de mayor grado real (6 conexiones)." },
  { s:"humedales", t:"ríos", tipo:"indirecta", cat:"e1", relacion:"Resiliencia", fuente:"inferencia", cita:"Los humedales regulan el ciclo hídrico de los ríos.", analisis:"Relación funcional intermedia." },
  { s:"estructura_funcional", t:"movilidad", tipo:"directa", cat:"e2", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 200", pagina:"120", cita:"La EFC organiza el sistema de movilidad multimodal.", analisis:"Eje central del módulo." },
  { s:"movilidad", t:"metro", tipo:"directa", cat:"e2", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 201", pagina:"121", cita:"El Metro de Bogotá es el proyecto estructurante de la movilidad.", analisis:"Primera línea del metro: troncal del sistema." },
  { s:"movilidad", t:"regiotram", tipo:"directa", cat:"e2", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 202", pagina:"122", cita:"Los Regiotram conectan la región con el sistema metro.", analisis:"Segunda línea: se conecta con la primera." },
  { s:"movilidad", t:"ciclorutas", tipo:"indirecta", cat:"e2", relacion:"Resiliencia", fuente:"cita_literal", articulo:"Art. 203", pagina:"123", cita:"Las ciclorutas complementan el sistema multimodal.", analisis:"Red de movilidad activa." },
  { s:"estructura_socioeconomica", t:"economia_creativa", tipo:"directa", cat:"e3", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 300", pagina:"200", cita:"La ESECI impulsa la economía creativa y la innovación.", analisis:"Eje de desarrollo económico." },
  { s:"estructura_patrimonio", t:"patrimonio_cultural", tipo:"directa", cat:"e4", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 400", pagina:"300", cita:"La EIP protege el patrimonio cultural de Bogotá.", analisis:"Eje de memoria y identidad." },
];

/* ---------- HUMEDALES CASOS ---------- */
const HUMEDALES_CASOS = {
  torca_guaymaral: { nombre:"Humedal Torca-Guaymaral", label:"Humedal\nTorca-\nGuaymaral", x:15.1, y:27.6, diam:3.8, color:"#2fd4c8", cita:"La Reserva Forestal Thomas van der Hammen incluye los Humedales de La Conejera y Torca-Guaymaral.", pagina:"56" },
  la_conejera: { nombre:"Humedal La Conejera", label:"Humedal\nLa Conejera", x:26.5, y:50.6, diam:3.5, color:"#2fd4c8", cita:"El Humedal La Conejera es uno de los más representativos del norte de Bogotá.", pagina:"58" },
  jaboque: { nombre:"Humedal El Jaboque", label:"Humedal\nEl Jaboque", x:12.3, y:65.2, diam:3.2, color:"#2fd4c8", cita:"El Jaboque es el humedal más grande de Bogotá, ubicado en Engativá.", pagina:"62" },
  santa_maria_del_lago: { nombre:"Humedal Santa María del Lago", label:"Humedal\nSanta María\ndel Lago", x:48.6, y:40.6, diam:3.3, color:"#2fd4c8", cita:"La transferencia de derechos de construcción y desarrollo de predios ubicados en suelo de protección nos permite asegurar mejores condiciones para la preservación de ecosistemas como el humedal Santa María del Lago, en la localidad de Engativá.", pagina:"221–222" },
  la_vaca: { nombre:"Humedal La Vaca", label:"Humedal\nLa Vaca", x:67.4, y:72.4, diam:3.4, color:"#2fd4c8", cita:"El Humedal La Vaca, en Patio Bonito, parte de una antigua laguna muisca gobernada por el cacique Techovita, es un reservorio de agua, plantas y animales protegido por la comunidad.", pagina:"103" },
  fauna_y_flora: { nombre:"Fauna y flora asociada al sistema de humedales", label:"Fauna y\nflora", x:62.2, y:38.8, diam:4.8, color:"#7d92b3", cita:"El sistema de humedales alberga una biodiversidad única en el altiplano cundiboyacense.", pagina:"70" },
};

const HUMEDAL_LINEAS = [
  { a:{x:15.1, y:27.6}, b:{x:26.5, y:50.6}, cita:"La Reserva Forestal Thomas van der Hammen incluye los Humedales de La Conejera y Torca-Guaymaral.", pagina:"56" },
  { a:{x:15.5, y:25.9}, b:{x:53.3, y:47.3} },
  { a:{x:27.7, y:50.7}, b:{x:52, y:50.5} },
];

/* ---------- MOVILIDAD ---------- */
const MOVILIDAD_ASPECT = 16/9;
const MOVILIDAD_VIEWBOX_H = 56.25;

const MOVILIDAD_CIRCULOS = {
  metro_1: { x:35, y:45, diam:4.5, label:"Metro\nLínea 1" },
  metro_2: { x:55, y:50, diam:4, label:"Metro\nLínea 2" },
  regiotram: { x:70, y:40, diam:4, label:"Regio-\ntram" },
  empleo: { x:45, y:30, diam:3.5, label:"Empleos" },
  vivienda: { x:60, y:65, diam:3.5, label:"Vivienda" },
};

const MOVILIDAD_CORREDORES_NEON = [
  { id:"metro_1", color:"#ff9d2e", img:"", titulo:"Primera Línea del Metro", cita:"El Metro de Bogotá es el proyecto estructurante de la movilidad.", pagina:"Art. 201", anchor:[35, 45], hitPuntos:[[20,45],[50,45]] },
  { id:"metro_2", color:"#39ff6a", img:"", titulo:"Segunda Línea del Metro", cita:"La segunda línea se conecta con la primera.", pagina:"Art. 202", anchor:[55, 50], hitPuntos:[[35,45],[70,55]] },
  { id:"regiotram", color:"#5b8def", img:"", titulo:"Regiotram", cita:"Los Regiotram conectan la región.", pagina:"Art. 203", anchor:[70, 40], hitPuntos:[[55,50],[85,35]] },
];

const MOVILIDAD_LINEAS_ROSA = [
  { id:"linea_rosa_1", color:"#e9695c", rel:"corredor_verde", puntos:[[20,45],[35,45],[50,45]] },
  { id:"linea_rosa_2", color:"#f76fb0", rel:"cicloruta", puntos:[[35,45],[55,50],[70,55]] },
];

/* ---------- FUNCIONES AUXILIARES ---------- */
function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

function computeDegrees() {
  const deg = {};
  ODS_NODES.forEach(n => deg[n.id] = 0);
  RAW_EDGES.forEach(e => { deg[e.s] = (deg[e.s]||0)+1; deg[e.t] = (deg[e.t]||0)+1; });
  return deg;
}

function fuenteBadgeHTML(fuente) {
  const st = FUENTE_STYLE[fuente] || FUENTE_STYLE.inferencia;
  return `<span class="fuente-badge" style="color:${st.color};background:${st.color}22;border:1px solid ${st.color}55;"><i class="fa-solid ${st.icon}"></i> ${st.label}</span>`;
}

function relacionBadgeHTML(relacion) {
  if (!relacion || !RELACION_STYLE[relacion]) return "";
  const st = RELACION_STYLE[relacion];
  return `<span class="fuente-badge" style="color:${st.color};background:${st.color}22;border:1px solid ${st.color}55;"><i class="fa-solid fa-arrow-right-arrow-left"></i> ${st.label}</span>`;
}

/* ---------- DIBUJAR RED ---------- */
function buildDefs(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");

  // Glows por color
  const colors = [...new Set(ODS_NODES.map(n => n.color))];
  colors.forEach(color => {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "glow-" + color.replace("#", ""));
    filter.setAttribute("x", "-50%"); filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%"); filter.setAttribute("height", "200%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3"); blur.setAttribute("result", "blur");
    const merge = document.createElementNS(SVG_NS, "feMerge");
    ["blur", "SourceGraphic"].forEach(ref => {
      const m = document.createElementNS(SVG_NS, "feMergeNode");
      m.setAttribute("in", ref); merge.appendChild(m);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });

  // Flechas
  const arrowColors = { "Soporte": RELACION_STYLE.Soporte.color, "Resiliencia": RELACION_STYLE.Resiliencia.color };
  Object.entries(arrowColors).forEach(([key, color]) => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", "arrow-" + key);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8"); marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6"); marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto-start-reverse");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", "M 0 1 L 10 5 L 0 9 z");
    path.setAttribute("fill", color);
    marker.appendChild(path);
    defs.appendChild(marker);
  });

  svg.appendChild(defs);
}

function buildAmbientMesh(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "ambient-mesh-layer");
  g.setAttribute("opacity", "0.5");
  const seedPts = [];
  const cols = 14, rows = 16;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const baseX = (i + 0.5) / cols * CANVAS.w;
      const baseY = (j + 0.5) / rows * CANVAS.h;
      const jitterX = (((i * 37 + j * 19) % 23) - 11) * 6;
      const jitterY = (((i * 17 + j * 41) % 29) - 14) * 6;
      seedPts.push({ x: baseX + jitterX, y: baseY + jitterY, idx: i * rows + j });
    }
  }
  const palette = ["#5cd6d1", "#ef9f54", "#fac47b", "#fb8d84"];
  const THRESH = 230;
  for (let i = 0; i < seedPts.length; i++) {
    for (let j = i + 1; j < seedPts.length; j++) {
      const dx = seedPts[i].x - seedPts[j].x;
      const dy = seedPts[i].y - seedPts[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < THRESH) {
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", seedPts[i].x); line.setAttribute("y1", seedPts[i].y);
        line.setAttribute("x2", seedPts[j].x); line.setAttribute("y2", seedPts[j].y);
        line.setAttribute("stroke", palette[seedPts[i].idx % 4]);
        line.setAttribute("stroke-width", "0.5");
        line.setAttribute("opacity", "0.15");
        g.appendChild(line);
      }
    }
  }
  seedPts.forEach(p => {
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y);
    dot.setAttribute("r", (p.idx % 5 === 0) ? 3.2 : 1.8);
    dot.setAttribute("fill", palette[p.idx % 4]);
    dot.setAttribute("opacity", (p.idx % 5 === 0) ? "0.55" : "0.4");
    g.appendChild(dot);
  });
  svg.appendChild(g);
}

function edgeColor(edge) {
  return (edge.relacion && RELACION_STYLE[edge.relacion]) ? RELACION_STYLE[edge.relacion].color : RELACION_STYLE.Soporte.color;
}

function edgePathData(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx*dx + dy*dy) || 1;
  const ux = dx/dist, uy = dy/dist;
  const startPad = (s.collR || s.r) + 2;
  const endPad = (t.collR || t.r) + 6;
  const x1 = s.x + ux*startPad, y1 = s.y + uy*startPad;
  const x2 = t.x - ux*endPad, y2 = t.y - uy*endPad;
  return `M${x1},${y1} L${x2},${y2}`;
}

function drawEdges(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edges-layer");
  RAW_EDGES.forEach((edge, i) => {
    if (edge.tipo === "vacio") return;
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const color = edgeColor(edge);
    const d = edgePathData(edge, s, t);
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group edge-" + edge.tipo);
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.tipo);
    group.setAttribute("data-cat", edge.cat);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);
    group.style.setProperty("--edge-color", color);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("d", d); hit.setAttribute("class", "ods-edge edge-hit");

    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("d", d); visual.setAttribute("class", "ods-edge edge-visual");
    visual.setAttribute("stroke", color);
    visual.setAttribute("stroke-width", edge.tipo === "vacio" ? 2.6 : edge.tipo === "directa" ? 2.2 : 1.4);
    if (edge.tipo !== "directa") visual.setAttribute("stroke-dasharray", edge.tipo === "vacio" ? "2,7" : "5,4");
    if (edge.relacion) visual.setAttribute("marker-end", `url(#arrow-${edge.relacion})`);
    visual.setAttribute("opacity", edge.tipo === "indirecta" ? "0.55" : edge.tipo === "vacio" ? "0.8" : "0.95");

    group.appendChild(visual); group.appendChild(hit);
    group.addEventListener("click", (ev) => { ev.stopPropagation(); showEdgeInfo(i); });
    g.appendChild(group);
    edge._el = { visual, hit, d };
  });
  svg.appendChild(g);
}

function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");
  ODS_NODES.forEach(node => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node ods-node-" + node.cat + (node.isMainHub ? " ods-hub" : " ods-satellite"));
    group.setAttribute("data-id", node.id);
    group.setAttribute("data-cat", node.cat);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring" + (node.isMainHub ? " node-ring-hub" : ""));
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("fill", "#0a0a0a");
    circle.setAttribute("stroke", node.color);
    circle.setAttribute("stroke-width", node.isMainHub ? 2.5 : 1.6);
    circle.setAttribute("filter", "url(#glow-" + node.color.replace("#", "") + ")");

    const fo = document.createElementNS(SVG_NS, "foreignObject");
    const size = node.r * 1.8;
    fo.setAttribute("x", node.x - size/2); fo.setAttribute("y", node.y - size/2);
    fo.setAttribute("width", size); fo.setAttribute("height", size);

    const wrapper = document.createElementNS(XHTML_NS, "div");
    wrapper.setAttribute("style", "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;pointer-events:none;padding:2px;");

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon);
    iconEl.setAttribute("style", `color:${node.color}; font-size:${Math.max(node.r*(node.isMainHub?0.42:0.34), 15)}px;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r*0.16, 15)}px; padding:0 3px; font-weight:700; color:#f2f3f6; line-height:1.15; white-space:pre-line; text-align:center; font-family:'Inter',sans-serif;`);
    nameEl.textContent = node.name;

    wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
    fo.appendChild(wrapper);
    group.appendChild(circle); group.appendChild(fo);
    attachNodeClickHandler(group, node.id);
    attachNodeDragHandler(group, node);
    g.appendChild(group);
    node._el = { group, circle, fo };
  });
  svg.appendChild(g);
}

function renderNetwork() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg); buildAmbientMesh(svg); drawEdges(svg); drawNodes(svg);
}

/* ---------- INTERACCIÓN NODOS ---------- */
function attachNodeClickHandler(group, nodeId) {
  group.addEventListener("click", (ev) => {
    if (group.dataset.suppressClick === "1") return;
    ev.stopPropagation();
    showNodeInfo(nodeId);
  });
}

function attachNodeDragHandler(group, node) {
  let dragging = false, startX=0, startY=0, origX=0, origY=0, moved=false;
  group.addEventListener("pointerdown", (ev) => {
    dragging = true; moved = false;
    startX = ev.clientX; startY = ev.clientY;
    origX = node.x; origY = node.y;
    group.setPointerCapture(ev.pointerId);
    group.classList.add("dragging");
  });
  group.addEventListener("pointermove", (ev) => {
    if (!dragging) return;
    const dx = ev.clientX - startX, dy = ev.clientY - startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
    node.x = origX + dx; node.y = origY + dy;
    updateNodePosition(node);
  });
  function endDrag(ev) {
    if (!dragging) return;
    dragging = false;
    group.classList.remove("dragging");
    if (moved) { group.dataset.suppressClick = "1"; setTimeout(() => { delete group.dataset.suppressClick; }, 0); }
  }
  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
}

function updateNodePosition(node) {
  if (!node._el) return;
  node._el.circle.setAttribute("cx", node.x); node._el.circle.setAttribute("cy", node.y);
  const size = node.r * 1.8;
  node._el.fo.setAttribute("x", node.x - size/2); node._el.fo.setAttribute("y", node.y - size/2);
}

/* ---------- PANELES DE INFO ---------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));

  const label = (n) => n.name.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = `${label(s)} → ${label(t)}`;
  const typeEl = document.getElementById("edgeInfoType");
  const color = edgeColor(edge);
  typeEl.innerHTML = TYPE_STYLE[edge.tipo].label + (edge.cat ? " · " + edge.cat.toUpperCase() : "");
  typeEl.style.color = color; typeEl.style.background = color + "26";
  document.getElementById("edgeInfoFuente").innerHTML = fuenteBadgeHTML(edge.fuente) + " " + relacionBadgeHTML(edge.relacion);
  document.getElementById("edgeInfoQuote").textContent = edge.cita ? edge.cita : "(No hay cita literal disponible para esta relación — ver análisis abajo.)";
  document.getElementById("edgeInfoAnalisis").textContent = edge.analisis || "";
  document.getElementById("edgeInfoPage").textContent = (edge.articulo ? edge.articulo : "") + (edge.pagina ? " · p." + edge.pagina : "");
  document.getElementById("edgeInfoPanel").classList.add("visible");
}

function showNodeInfo(id) {
  const node = nodeById(id);
  if (!node) return;
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
  document.querySelector(`.ods-node[data-id="${id}"]`)?.classList.add("node-selected");
  const deg = computeDegrees()[id] || 0;
  document.getElementById("nodeInfoTitle").textContent = node.name.replace(/\n/g, " ") + (node.suplementario ? " (suplementario)" : "");
  document.getElementById("nodeInfoStruct").innerHTML = `<span class="swatch-tag" style="background:${node.color}"></span> ${STRUCT_STYLE[node.cat].label} · grado real: ${deg}`;
  document.getElementById("nodeInfoFuente").innerHTML = fuenteBadgeHTML(node.fuente);
  document.getElementById("nodeInfoPanel").classList.add("visible");
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
}
function hideNodeInfo() {
  document.getElementById("nodeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
}

/* ---------- MÉTRICAS ---------- */
function computeMetrics() {
  const deg = computeDegrees();
  const nodeCount = ODS_NODES.length;
  const edgeCount = RAW_EDGES.length;
  const vacios = RAW_EDGES.filter(e => e.tipo === "vacio").length;
  const directas = RAW_EDGES.filter(e => e.tipo === "directa").length;
  const indirectas = RAW_EDGES.filter(e => e.tipo === "indirecta").length;
  const porFuente = {};
  RAW_EDGES.forEach(e => { porFuente[e.fuente] = (porFuente[e.fuente]||0)+1; });
  let maxId = null, maxDeg = 0;
  Object.entries(deg).forEach(([id, d]) => { if (d > maxDeg) { maxDeg = d; maxId = id; } });
  return { nodeCount, edgeCount, vacios, directas, indirectas, porFuente, maxId, maxDeg };
}

function updateMetrics() {
  const m = computeMetrics();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("metricNodes", m.nodeCount);
  set("metricEdges", m.edgeCount);
  set("metricVacios", m.vacios);
  set("metricDirectas", m.directas);
  set("metricCitaLiteral", m.porFuente.cita_literal || 0);
  set("metricIndiceOficial", m.porFuente.inventario_pendiente || 0);
  set("metricInferencia", m.porFuente.inferencia || 0);
  const hubNode = nodeById(m.maxId);
  set("metricHub", hubNode ? hubNode.name.replace(/\n/g," ") + ` (grado ${m.maxDeg})` : "—");
  Object.keys(STRUCT_STYLE).forEach(cat => {
    const el = document.getElementById("struct-" + cat);
    const nCount = ODS_NODES.filter(n => n.cat === cat).length;
    if (el) el.textContent = String(nCount);
  });
}

/* ---------- MATRIZ ---------- */
function renderMatrix() {
  const container = document.getElementById("matrixRows");
  if (!container) return;
  container.innerHTML = "";
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const row = document.createElement("div");
    row.className = "matrix-row"; row.dataset.edge = i;
    const color = edgeColor(edge);
    row.innerHTML = `
      <div class="matrix-cell"><span class="swatch-tag" style="background:${s.color}"></span> ${edge.cat.toUpperCase()}</div>
      <div class="matrix-cell">${s.name.replace(/\n/g," ")} → ${t.name.replace(/\n/g," ")}</div>
      <div class="matrix-cell"><span class="alignment-tag" style="background:${color}26;color:${color}">${TYPE_STYLE[edge.tipo].label}</span></div>
      <div class="matrix-cell">${fuenteBadgeHTML(edge.fuente)}</div>
      <div class="matrix-cell">${edge.articulo||"—"}${edge.pagina ? " · p."+edge.pagina : ""}</div>
      <div class="matrix-cell quote-cell">${edge.analisis||""}</div>`;
    container.appendChild(row);
  });
}

/* ---------- VISIBILIDAD / LEYENDA ---------- */
const typeOff = new Set(), nodeOff = new Set(), catOff = new Set();
function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(el => {
    const type = el.dataset.type, cat = el.dataset.cat;
    const hide = typeOff.has(type) || catOff.has(cat);
    el.classList.toggle("hidden-edge", hide);
  });
  document.querySelectorAll(".ods-node").forEach(el => {
    const cat = el.dataset.cat;
    const hide = catOff.has(cat);
    el.classList.toggle("node-off", hide);
  });
}

/* ---------- OVERLAY HUMEDALES ---------- */
function showHumedalesOverlay(opts) {
  const animateIn = !!(opts && opts.animateIn);
  hideNodeInfo(); hideEdgeInfo();
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
  document.querySelector('.ods-node[data-id="humedales"]')?.classList.add("node-selected");

  const legend = document.getElementById("networkLegend");
  if (legend) legend.style.display = "none";
  const ramsar = document.getElementById("humedalRamsarFloat");
  if (ramsar) ramsar.style.display = "";
  const acts = document.getElementById("networkSidebarActions");
  if (acts) acts.style.display = "none";

  const body = document.getElementById("humedalesOverlayBody");
  const hotspotsHTML = Object.entries(HUMEDALES_CASOS).map(([key, c]) =>
    `<button type="button" class="humedal-hotspot" data-key="${key}"
      style="left:${c.x}%; top:${c.y}%; width:${c.diam}%; height:${c.diam*(16/9)}%; --hotspot-color:${c.color||"#2fd4c8"};"
      title="${c.nombre}">
      <span class="humedal-hotspot-label">${c.label}</span>
    </button>`
  ).join("");

  const linesHTML = HUMEDAL_LINEAS.map((conn, idx) => {
    const a = conn.a, b = conn.b;
    const y1 = a.y * 0.5625, y2 = b.y * 0.5625;
    const clickable = !!conn.cita;
    return `<g class="${clickable ? "humedal-line-group clickable" : "humedal-line-group"}">
      <line class="humedal-line-visible" x1="${a.x}" y1="${y1}" x2="${b.x}" y2="${y2}" />
      ${clickable ? `<line class="humedal-line-hit" data-conn="${idx}" x1="${a.x}" y1="${y1}" x2="${b.x}" y2="${y2}" />` : ""}
    </g>`;
  }).join("");

  body.innerHTML = `
    <div class="humedales-overlay-image-wrap" id="humedalesImageWrap">
      <div class="humedales-overlay-image-frame" id="humedalesImageFrame">
        <svg class="humedales-overlay-lines" viewBox="0 0 100 56.25" preserveAspectRatio="none">${linesHTML}</svg>
        ${hotspotsHTML}
      </div>
      <div class="humedal-popup" id="humedalPopup" style="display:none;"></div>
    </div>`;

  document.querySelector(".network-canvas").style.display = "none";
  const overlayEl = document.getElementById("humedalesOverlay");
  overlayEl.style.display = "flex";
  if (animateIn) {
    overlayEl.classList.remove("overlay-entering");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlayEl.classList.add("overlay-entering");
        const clear = () => overlayEl.classList.remove("overlay-entering");
        overlayEl.addEventListener("animationend", clear, { once: true });
        setTimeout(clear, 700);
      });
    });
  }
  fitImageFrame();
  setupHumedalesZoom();
  wireHumedalHotspots();
}

function hideHumedalesOverlay() {
  const legend = document.getElementById("networkLegend");
  if (legend) legend.style.display = "";
  const ramsar = document.getElementById("humedalRamsarFloat");
  if (ramsar) ramsar.style.display = "none";
  const acts = document.getElementById("networkSidebarActions");
  if (acts) acts.style.display = "";
  document.getElementById("humedalesOverlay").style.display = "none";
  document.querySelector(".network-canvas").style.display = "";
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
  resetHumedalesZoom();
}

/* ---------- OVERLAY MOVILIDAD ---------- */
function showMovilidadOverlay(opts) {
  const animateIn = !!(opts && opts.animateIn);
  hideNodeInfo(); hideEdgeInfo();

  const body = document.getElementById("movilidadOverlayBody");
  const highlightRingsHTML = Object.entries(MOVILIDAD_CIRCULOS).map(([key, c]) =>
    `<div class="movilidad-bola" data-key="${key}"
      style="left:${c.x}%; top:${c.y}%; width:${c.diam}%; height:${(c.diam*MOVILIDAD_ASPECT).toFixed(3)}%;">
      <span>${(c.label||"").replace(/\n/g, "<br>")}</span>
    </div>`
  ).join("");

  const lineasHTML = MOVILIDAD_CORREDORES_NEON.map(l =>
    `<img class="movilidad-neon-line-img" data-corredor="${l.id}" src="${l.img}"
      style="--neon-color:${l.color};" alt="" />`
  ).join("");

  const trazoRosaHTML = `<svg class="movilidad-trazo-rosa" viewBox="0 0 100 ${MOVILIDAD_VIEWBOX_H}" preserveAspectRatio="none">
    ${MOVILIDAD_LINEAS_ROSA.map(l => {
      const pts = l.puntos.map(p => p[0] + "," + (p[1]*MOVILIDAD_VIEWBOX_H/100)).join(" ");
      return `<polyline data-linea="${l.id}" style="--linea-color:${l.color}" points="${pts}" />
              <polyline class="movilidad-trazo-hit" data-linea="${l.id}" points="${pts}" />`;
    }).join("")}
  </svg>`;

  body.innerHTML = `
    <div class="movilidad-overlay-image-wrap" id="movilidadImageWrap">
      <div class="movilidad-overlay-image-frame" id="movilidadImageFrame">
        ${lineasHTML}
        ${trazoRosaHTML}
        ${highlightRingsHTML}
      </div>
      <div class="movilidad-popup" id="movilidadPopup" style="display:none;"></div>
    </div>
    <div class="movilidad-nota-naranja">
      <p><strong>Hallazgo principal:</strong> El POT proyecta el sistema de movilidad como un conjunto de trazados y equipamientos, pero no mide cómo se mueve realmente la ciudad. Las líneas y los círculos del plano indican dónde llegará la infraestructura, no los tiempos de viaje, los transbordos, los desplazamientos de cuidado ni los recorridos que la gente ya hace todos los días.</p>
    </div>`;

  document.querySelector(".network-canvas").style.display = "none";
  const overlayEl = document.getElementById("movilidadOverlay");
  overlayEl.style.display = "flex";
  if (animateIn) {
    overlayEl.classList.remove("overlay-entering");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlayEl.classList.add("overlay-entering");
        const clear = () => overlayEl.classList.remove("overlay-entering");
        overlayEl.addEventListener("animationend", clear, { once: true });
        setTimeout(clear, 700);
      });
    });
  }
  fitMovilidadFrame();
  wireMovilidadHotspots();
}

function hideMovilidadOverlay() {
  document.getElementById("movilidadOverlay").style.display = "none";
  document.querySelector(".network-canvas").style.display = "";
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
}

/* ---------- ZOOM HUMEDALES ---------- */
const humedalesZoomState = { scale:1, tx:0, ty:0 };
const HUMEDALES_ZOOM_MIN = 1, HUMEDALES_ZOOM_MAX = 6;

function applyHumedalesZoom() {
  const frame = document.getElementById("humedalesImageFrame");
  if (!frame) return;
  const { scale, tx, ty } = humedalesZoomState;
  frame.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
}
function clampHumedalesPan() {
  const wrap = document.querySelector(".humedales-overlay-image-wrap");
  const frame = document.getElementById("humedalesImageFrame");
  if (!wrap || !frame) return;
  const { scale } = humedalesZoomState;
  const extraW = (frame.offsetWidth*scale - frame.offsetWidth)/2;
  const extraH = (frame.offsetHeight*scale - frame.offsetHeight)/2;
  const maxTx = Math.max(0, extraW), maxTy = Math.max(0, extraH);
  humedalesZoomState.tx = Math.max(-maxTx, Math.min(maxTx, humedalesZoomState.tx));
  humedalesZoomState.ty = Math.max(-maxTy, Math.min(maxTy, humedalesZoomState.ty));
}
function setHumedalesZoom(newScale, cx, cy) {
  const wrap = document.querySelector(".humedales-overlay-image-wrap");
  if (!wrap) return;
  const clamped = Math.max(HUMEDALES_ZOOM_MIN, Math.min(HUMEDALES_ZOOM_MAX, newScale));
  const rect = wrap.getBoundingClientRect();
  const px = (cx !== undefined ? cx : rect.width/2) - rect.width/2;
  const py = (cy !== undefined ? cy : rect.height/2) - rect.height/2;
  const prevScale = humedalesZoomState.scale;
  const ratio = clamped/prevScale;
  humedalesZoomState.tx = px - (px - humedalesZoomState.tx)*ratio;
  humedalesZoomState.ty = py - (py - humedalesZoomState.ty)*ratio;
  humedalesZoomState.scale = clamped;
  clampHumedalesPan();
  applyHumedalesZoom();
}
function resetHumedalesZoom() {
  humedalesZoomState.scale = 1; humedalesZoomState.tx = 0; humedalesZoomState.ty = 0;
  applyHumedalesZoom();
}

function setupHumedalesZoom() {
  const wrap = document.querySelector(".humedales-overlay-image-wrap");
  document.getElementById("humedalesZoomIn")?.addEventListener("click", () => setHumedalesZoom(humedalesZoomState.scale*1.4));
  document.getElementById("humedalesZoomOut")?.addEventListener("click", () => setHumedalesZoom(humedalesZoomState.scale/1.4));
  document.getElementById("humedalesZoomReset")?.addEventListener("click", resetHumedalesZoom);
  document.getElementById("humedalesOverlayBody")?.addEventListener("wheel", (ev) => {
    const w = document.querySelector(".humedales-overlay-image-wrap");
    if (!w || !w.contains(ev.target)) return;
    ev.preventDefault();
    const rect = w.getBoundingClientRect();
    const cx = ev.clientX - rect.left, cy = ev.clientY - rect.top;
    const delta = ev.deltaY < 0 ? 1.15 : 1/1.15;
    setHumedalesZoom(humedalesZoomState.scale*delta, cx, cy);
  }, { passive:false });

  let panning=false, startX=0, startY=0, startTx=0, startTy=0, moved=false;
  document.getElementById("humedalesOverlayBody")?.addEventListener("pointerdown", (ev) => {
    const w = document.querySelector(".humedales-overlay-image-wrap");
    if (!w || !w.contains(ev.target)) return;
    if (humedalesZoomState.scale <= 1) return;
    panning=true; moved=false;
    startX=ev.clientX; startY=ev.clientY;
    startTx=humedalesZoomState.tx; startTy=humedalesZoomState.ty;
    w.classList.add("panning");
    w.setPointerCapture?.(ev.pointerId);
  });
  document.getElementById("humedalesOverlayBody")?.addEventListener("pointermove", (ev) => {
    if (!panning) return;
    const dx=ev.clientX-startX, dy=ev.clientY-startY;
    if (Math.abs(dx)>3 || Math.abs(dy)>3) moved=true;
    humedalesZoomState.tx = startTx+dx;
    humedalesZoomState.ty = startTy+dy;
    clampHumedalesPan();
    applyHumedalesZoom();
  });
  function endPan(ev) {
    if (!panning) { moved=false; return; }
    panning=false;
    document.querySelector(".humedales-overlay-image-wrap")?.classList.remove("panning");
    if (moved) setTimeout(() => { moved=false; }, 0);
  }
  document.getElementById("humedalesOverlayBody")?.addEventListener("pointerup", endPan);
  document.getElementById("humedalesOverlayBody")?.addEventListener("pointercancel", endPan);
  document.getElementById("humedalesOverlayBody")?.addEventListener("click", (ev) => {
    if (moved) { ev.stopPropagation(); ev.preventDefault(); moved=false; return; }
    if (!ev.target.closest(".humedal-hotspot") && !ev.target.closest(".humedal-line-hit") && !ev.target.closest("#humedalPopup")) {
      hideHumedalPopup();
    }
  }, true);
}

/* ---------- FIT FRAMES ---------- */
function fitImageFrame() {
  const wrap = document.getElementById("humedalesImageWrap");
  const frame = document.getElementById("humedalesImageFrame");
  if (!wrap || !frame) return;
  const wrapW=wrap.clientWidth, wrapH=wrap.clientHeight;
  if (!wrapW || !wrapH) return;
  const ratio = 16/9;
  let w=wrapW, h=w/ratio;
  if (h>wrapH) { h=wrapH; w=h*ratio; }
  frame.style.width=w+"px"; frame.style.height=h+"px";
}
function fitMovilidadFrame() {
  const wrap = document.getElementById("movilidadImageWrap");
  const frame = document.getElementById("movilidadImageFrame");
  if (!wrap || !frame) return;
  const wrapW=wrap.clientWidth, wrapH=wrap.clientHeight;
  if (!wrapW || !wrapH) return;
  const ratio = 16/9;
  let w=wrapW, h=w/ratio;
  if (h>wrapH) { h=wrapH; w=h*ratio; }
  frame.style.width=w+"px"; frame.style.height=h+"px";
}

/* ---------- POPUPS HUMEDAL ---------- */
let humedalPopupAnchor = null;
function showHumedalPopup(innerHTML, xPct, yPct) {
  const popup = document.getElementById("humedalPopup");
  const wrap = document.getElementById("humedalesImageWrap");
  const frame = document.getElementById("humedalesImageFrame");
  if (!popup || !wrap || !frame) return;
  humedalPopupAnchor = { x:xPct, y:yPct };
  document.getElementById("humedalRamsarFloat")?.classList.add("humedal-ramsar-float-hidden");
  popup.innerHTML = innerHTML;
  popup.style.display = "block";

  const wrapRect = wrap.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  const absX = frameRect.left + (xPct/100)*frameRect.width - wrapRect.left;
  const absY = frameRect.top + (yPct/100)*frameRect.height - wrapRect.top;

  const popupW = 260, popupH = 150;
  let left = absX + 12, top = absY - popupH/2;
  let flip = false;
  if (left + popupW > wrapRect.width) { left = absX - popupW - 12; flip = true; }
  if (top < 0) top = 10;
  if (top + popupH > wrapRect.height) top = wrapRect.height - popupH - 10;

  popup.style.left = left+"px"; popup.style.top = top+"px";
  popup.classList.toggle("humedal-popup-flip", flip);
  document.getElementById("humedalPopupCloseBtn")?.addEventListener("click", hideHumedalPopup);
}
function hideHumedalPopup() {
  const popup = document.getElementById("humedalPopup");
  if (popup) { popup.style.display="none"; popup.innerHTML=""; }
  humedalPopupAnchor = null;
  document.querySelectorAll(".humedal-hotspot").forEach(b => b.classList.remove("active"));
  document.getElementById("humedalRamsarFloat")?.classList.remove("humedal-ramsar-float-hidden");
}

function showHumedalCasoDetalle(key) {
  const c = HUMEDALES_CASOS[key];
  if (!c) return;
  const html = `
    <div class="humedal-caso humedal-caso-detalle">
      <div class="humedal-caso-nombre">${c.nombre}</div>
      <div class="humedal-caso-cita">"${c.cita}"</div>
      <div class="humedal-caso-pagina">POT${c.pagina ? ", p. "+c.pagina : ""}</div>
    </div>
    <button type="button" class="humedal-back-btn" id="humedalPopupCloseBtn">Cerrar</button>`;
  showHumedalPopup(html, c.x, c.y);
}

function showHumedalConexionDetalle(conn, lineEl) {
  const [aKey, bKey] = conn.par;
  const a = HUMEDALES_CASOS[aKey], b = HUMEDALES_CASOS[bKey];
  const html = `
    <div class="humedal-caso humedal-caso-detalle">
      <div class="humedal-caso-nombre">${a?.nombre||aKey} ↔ ${b?.nombre||bKey}</div>
      <div class="humedal-caso-cita">"${conn.cita}"</div>
      <div class="humedal-caso-pagina">POT${conn.pagina ? ", p. "+conn.pagina : ""}</div>
    </div>
    <button type="button" class="humedal-back-btn" id="humedalPopupCloseBtn">Cerrar</button>`;
  const midX = a && b ? (a.x+b.x)/2 : 50;
  const midY = a && b ? (a.y+b.y)/2 : 50;
  showHumedalPopup(html, midX, midY);
}

function wireHumedalHotspots() {
  document.querySelectorAll(".humedal-hotspot").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      document.querySelectorAll(".humedal-hotspot").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showHumedalCasoDetalle(btn.dataset.key);
    });
  });
  document.querySelectorAll(".humedal-line-hit").forEach(line => {
    line.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const idx = parseInt(line.dataset.conn);
      const conn = HUMEDAL_LINEAS[idx];
      if (conn) showHumedalConexionDetalle(conn, line);
    });
  });
}

/* ---------- POPUPS MOVILIDAD ---------- */
function showMovilidadPopup(innerHTML, xPct, yPct) {
  const popup = document.getElementById("movilidadPopup");
  const wrap = document.getElementById("movilidadImageWrap");
  const frame = document.getElementById("movilidadImageFrame");
  if (!popup || !wrap || !frame) return;
  popup.innerHTML = innerHTML;
  popup.style.display = "block";

  const wrapRect = wrap.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  const absX = frameRect.left + (xPct/100)*frameRect.width - wrapRect.left;
  const absY = frameRect.top + (yPct/100)*frameRect.height - wrapRect.top;

  const popupW = 270, popupH = 160;
  let left = absX + 12, top = absY - popupH/2;
  let flip = false;
  if (left + popupW > wrapRect.width) { left = absX - popupW - 12; flip = true; }
  if (top < 0) top = 10;
  if (top + popupH > wrapRect.height) top = wrapRect.height - popupH - 10;

  popup.style.left = left+"px"; popup.style.top = top+"px";
  popup.classList.toggle("movilidad-popup-flip", flip);
  document.getElementById("movilidadPopupCloseBtn")?.addEventListener("click", () => { popup.style.display="none"; popup.innerHTML=""; });
}

function showMovilidadCorredorDetalle(corredorId) {
  const corredor = MOVILIDAD_CORREDORES_NEON.find(l => l.id === corredorId);
  if (!corredor) return;
  const html = `
    <div class="movilidad-popup-titulo">${corredor.titulo}</div>
    <div class="movilidad-popup-cita">"${corredor.cita}"</div>
    ${corredor.pagina ? `<div class="humedal-caso-pagina">${corredor.pagina}</div>` : ""}
    <button type="button" class="movilidad-back-btn" id="movilidadPopupCloseBtn">Cerrar</button>`;
  showMovilidadPopup(html, corredor.anchor[0], corredor.anchor[1]);
}

function wireMovilidadHotspots() {
  document.querySelectorAll(".movilidad-trazo-hit").forEach(line => {
    line.addEventListener("click", (ev) => {
      ev.stopPropagation();
      showMovilidadCorredorDetalle(line.dataset.linea);
    });
  });
}

/* ---------- ANIMACIONES HALLAZGOS ---------- */
function verHallazgosConAnimacion() {
  document.querySelectorAll(".blackout-flicker").forEach(el => el.classList.remove("blackout-flicker"));
  document.querySelectorAll(".blackout-surviving").forEach(el => el.classList.remove("blackout-surviving"));

  setTimeout(() => {
    const svg = document.getElementById("networkViz");
    svg?.classList.add("zoom-into-humedales");
    const onDone = () => {
      svg?.removeEventListener("transitionend", onDone);
      showMovilidadOverlay({ animateIn:true });
      svg?.classList.remove("zoom-into-humedales");
      if (svg) svg.style.transformOrigin = "";
    };
    if (svg) {
      svg.style.transformOrigin = "50% 50%";
      svg.addEventListener("transitionend", onDone, { once:true });
      setTimeout(() => { if (svg.classList.contains("zoom-into-humedales")) onDone(); }, 3200);
    } else { showMovilidadOverlay({ animateIn:true }); }
  }, 650);
}

function explorarRelacionesConAnimacion() {
  const svg = document.getElementById("networkViz");
  const nodeEl = document.querySelector('.ods-node[data-id="humedales"]');
  if (!svg || !nodeEl) { showHumedalesOverlay(); return; }
  const humedal = nodeById("humedales");
  const vb = svg.viewBox.baseVal;
  const originXPct = ((humedal.x - vb.x)/vb.width)*100;
  const originYPct = ((humedal.y - vb.y)/vb.height)*100;
  svg.style.transformOrigin = `${originXPct}% ${originYPct}%`;
  svg.classList.add("zoom-into-humedales");
  const onDone = () => {
    svg.removeEventListener("transitionend", onDone);
    showHumedalesOverlay({ animateIn:true });
    svg.classList.remove("zoom-into-humedales");
    svg.style.transformOrigin = "";
  };
  svg.addEventListener("transitionend", onDone, { once:true });
  setTimeout(() => { if (svg.classList.contains("zoom-into-humedales") && document.getElementById("humedalesOverlay").style.display !== "flex") onDone(); }, 3200);
}

/* ---------- INICIALIZACIÓN ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  updateMetrics();
  renderMatrix();

  // Leyenda
  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const mode = item.dataset.mode, val = item.dataset.type || item.dataset.cat;
      if (e.target.checked) { if (mode==="type") typeOff.delete(val); else catOff.delete(val); }
      else { if (mode==="type") typeOff.add(val); else catOff.add(val); }
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });

  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
  document.getElementById("nodeInfoClose")?.addEventListener("click", hideNodeInfo);
  document.getElementById("humedalesOverlayClose")?.addEventListener("click", hideHumedalesOverlay);
  document.getElementById("movilidadOverlayClose")?.addEventListener("click", () => { hideMovilidadOverlay(); });
  document.getElementById("networkViz")?.addEventListener("click", () => { hideEdgeInfo(); hideNodeInfo(); });
  document.getElementById("btnVerHallazgos")?.addEventListener("click", verHallazgosConAnimacion);
  document.getElementById("btnExplorarRelaciones")?.addEventListener("click", explorarRelacionesConAnimacion);

  window.addEventListener("resize", () => {
    if (document.getElementById("humedalesOverlay")?.style.display === "flex") fitImageFrame();
    if (document.getElementById("movilidadOverlay")?.style.display === "flex") fitMovilidadFrame();
  });
});
