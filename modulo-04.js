/* ==========================================================
   RED DE MACROMODELOS DE CIUDAD — Módulo 04
   Interpretación propia de las visiones de ciudad que atraviesan
   el POT de Bogotá, NO las 4 estructuras oficiales del POT.

   6 macromodelos (subredes) que se superponen:
     AMBIENTALISTA · HUMANISTA · FUNCIONALISTA
     SOCIOECONÓMICO · CULTURAL/PATRIMONIAL · GOBERNANZA

   - Los conceptos compartidos (vivienda, transporte público,
     patrimonio, accesibilidad, corredores ecológicos, gestión
     ambiental) aparecen UNA sola vez y se conectan a varios
     sistemas: son los puentes de la red.
   - El tamaño de cada bola se calcula a partir de su número real
     de conexiones (grado): los HUB emergen del cálculo, no se
     fuerzan de antemano.
   - Las tensiones/contradicciones y las articulaciones (sinergias)
     se dibujan con estilos de línea distintos (ver leyenda).
   - Todas las bolas se pueden arrastrar (con física de resorte).
   - Clic en una línea -> panel con el tipo de relación y su lectura.
   - Doble clic en una bola -> apagarla. Triple clic -> aislar su flujo.

   IMPORTANTE — HONESTIDAD DE FUENTES:
   Esta red es una interpretación propia para analizar el POT, no
   una transcripción del documento. No se incluyen citas textuales
   ni números de página inventados: el campo "sustento" de cada
   relación describe la lectura interpretativa, y el panel lo marca
   explícitamente como interpretación propia pendiente de vincular
   a artículo/página/cita exacta si se aporta el texto del POT.
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- geometría auxiliar -------- */
function polar(cx, cy, angleDeg, r) {
  const a = angleDeg * Math.PI / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function spreadAngles(centerAngle, count, spreadDeg) {
  if (count <= 1) return [centerAngle];
  const start = centerAngle - spreadDeg / 2;
  const step = spreadDeg / (count - 1);
  const out = [];
  for (let i = 0; i < count; i++) out.push(start + i * step);
  return out;
}

/* -------- centro de la red -------- */
const CENTER = { x: 820, y: 560 };
const SYS_RADIUS = 380;
const SUB_RADIUS = 200;
const SHARED_RADIUS = 280;

/* -------- 6 macromodelos (subredes) -------- */
const SYSTEMS = [
  { id: "amb", name: "SISTEMA\nAMBIENTALISTA",              color: "#22c55e", icon: "fa-leaf",        angle: 270 },
  { id: "hum", name: "SISTEMA\nHUMANISTA",                  color: "#ff8a5c", icon: "fa-people-roof",  angle: 330 },
  { id: "soc", name: "SISTEMA\nSOCIOECONÓMICO",             color: "#f5c945", icon: "fa-coins",        angle: 30  },
  { id: "cul", name: "SISTEMA CULTURAL\n/ PATRIMONIAL",     color: "#c74fb0", icon: "fa-landmark",     angle: 90  },
  { id: "gob", name: "SISTEMA DE\nGOBERNANZA",               color: "#9aa3b2", icon: "fa-gavel",        angle: 150 },
  { id: "fun", name: "SISTEMA\nFUNCIONALISTA",              color: "#5b8def", icon: "fa-road",         angle: 210 },
];

/* -------- conceptos exclusivos de cada sistema -------- */
const CONCEPTS = {
  amb: [
    { id: "amb_humedales",   name: "Humedales" },
    { id: "amb_rios",        name: "Ríos" },
    { id: "amb_quebradas",   name: "Quebradas" },
    { id: "amb_cerros",      name: "Cerros" },
    { id: "amb_areas",       name: "Áreas\nprotegidas" },
    { id: "amb_coberturas",  name: "Coberturas\nvegetales" },
    { id: "amb_resiliencia", name: "Resiliencia\nclimática" },
  ],
  hum: [
    { id: "hum_cuidado",       name: "Servicios\nde cuidado" },
    { id: "hum_sociales",      name: "Servicios\nsociales" },
    { id: "hum_equipamientos", name: "Equipamientos" },
    { id: "hum_seguridad",     name: "Seguridad" },
    { id: "hum_calidad",       name: "Calidad\nde vida" },
  ],
  fun: [
    { id: "fun_vial",            name: "Red vial" },
    { id: "fun_ciclorutas",      name: "Ciclorutas" },
    { id: "fun_serviciospub",    name: "Servicios\npúblicos" },
    { id: "fun_infraestructura", name: "Infraestructura" },
    { id: "fun_integracion",     name: "Integración\nmultimodal" },
  ],
  soc: [
    { id: "soc_empleo",        name: "Empleo" },
    { id: "soc_empresariales", name: "Servicios\nempresariales" },
    { id: "soc_industria",     name: "Industria" },
    { id: "soc_comercio",      name: "Comercio" },
    { id: "soc_mercados",      name: "Mercados" },
    { id: "soc_turismo",       name: "Turismo" },
    { id: "soc_innovacion",    name: "Innovación" },
    { id: "soc_actividades",   name: "Actividades\nproductivas" },
  ],
  cul: [
    { id: "cul_inmaterial",     name: "Patrimonio\ninmaterial" },
    { id: "cul_paisaje",        name: "Paisaje" },
    { id: "cul_memoria",        name: "Memoria" },
    { id: "cul_identidad",      name: "Identidad" },
    { id: "cul_turismocult",    name: "Turismo\ncultural" },
  ],
  gob: [
    { id: "gob_participacion", name: "Participación" },
    { id: "gob_publica",       name: "Gestión\npública" },
    { id: "gob_coordinacion",  name: "Coordinación\ninstitucional" },
    { id: "gob_instrumentos",  name: "Instrumentos de\nplanificación" },
    { id: "gob_actorespub",    name: "Actores\npúblicos" },
    { id: "gob_actorespriv",   name: "Actores\nprivados" },
    { id: "gob_comunidad",     name: "Comunidad" },
  ],
};

/* -------- conceptos COMPARTIDOS: pertenecen a un sistema primario
   pero se conectan a varios más — son los puentes de la red -------- */
const SHARED = [
  { id: "shared_vivienda",      name: "Vivienda",                 icon: "fa-house",              primary: "hum", angle: 355 },
  { id: "shared_transporte",    name: "Transporte\npúblico",       icon: "fa-bus",                primary: "fun", angle: 225 },
  { id: "shared_corredores",    name: "Corredores\necológicos/verdes", icon: "fa-tree",           primary: "amb", angle: 250 },
  { id: "shared_accesibilidad", name: "Accesibilidad",             icon: "fa-universal-access",   primary: "hum", angle: 310 },
  { id: "shared_patrimonio",    name: "Patrimonio\n(natural/material)", icon: "fa-monument",       primary: "cul", angle: 90  },
  { id: "shared_gestionamb",    name: "Gestión\nambiental",         icon: "fa-seedling",           primary: "gob", angle: 170 },
];

/* -------- construir todos los nodos con posición -------- */
const ODS_NODES = [];

ODS_NODES.push({ id: "centro", name: "MODELO\nDE CIUDAD", icon: "fa-city", color: "#e7eaf2",
  x: CENTER.x, y: CENTER.y, r: 56, kind: "centro" });

SYSTEMS.forEach(sys => {
  const p = polar(CENTER.x, CENTER.y, sys.angle, SYS_RADIUS);
  ODS_NODES.push({ id: sys.id, name: sys.name, icon: sys.icon, color: sys.color, x: p.x, y: p.y, r: 66, kind: "sistema" });

  const list = CONCEPTS[sys.id];
  const angles = spreadAngles(sys.angle, list.length, 150);
  list.forEach((c, i) => {
    const cp = polar(p.x, p.y, angles[i], SUB_RADIUS);
    ODS_NODES.push({ id: c.id, name: c.name, icon: null, color: sys.color, x: cp.x, y: cp.y, r: 30, kind: "concepto", system: sys.id });
  });
});

SHARED.forEach(sh => {
  const p = polar(CENTER.x, CENTER.y, sh.angle, SHARED_RADIUS);
  const sysColor = SYSTEMS.find(s => s.id === sh.primary).color;
  ODS_NODES.push({ id: sh.id, name: sh.name, icon: sh.icon, color: sysColor, x: p.x, y: p.y, r: 38, kind: "compartido", system: sh.primary });
});

/* -------- física: posición de reposo -------- */
ODS_NODES.forEach(n => { n.homeX = n.x; n.homeY = n.y; n.vx = 0; n.vy = 0; n.fixed = false; });

/* -------- estilos por tipo de relación -------- */
const TYPE_STYLE = {
  sistema:      { color: "#8aa0c8", width: 2.0, dash: false, arrow: false, label: "Relación entre macromodelos" },
  interno:      { color: "#5b6b85", width: 1.0, dash: false, arrow: false, label: "Pertenencia al sistema" },
  pertenencia:  { color: "#cbd5e1", width: 1.3, dash: true,  arrow: false, label: "Nodo compartido → sistema de origen" },
  compartido:   { color: "#2fd4c8", width: 2.0, dash: true,  arrow: true,  label: "Conexión de concepto compartido (puente)" },
  tension:      { color: "#ef4444", width: 2.6, dash: false, arrow: true,  label: "Tensión / contradicción" },
  articulacion: { color: "#4ade80", width: 2.4, dash: false, arrow: true,  label: "Articulación (sinergia)" },
  tension_art:  { color: "#f76fb0", width: 2.4, dash: false, arrow: true,  label: "Tensión y articulación simultánea" },
  centro:       { color: "#a276f2", width: 1.4, dash: false, arrow: false, label: "Vínculo con el modelo de ciudad" },
};

const NOTA_FUENTE = "Interpretación propia del equipo — pendiente de vincular a artículo/página/cita exacta del POT si se aporta el texto fuente. No se afirma que el POT declare esta conexión literalmente.";

/* -------- aristas -------- */
const RAW_EDGES = [];
function addEdge(s, t, type, sustento) {
  RAW_EDGES.push({ s, t, type, directa: !!TYPE_STYLE[type].arrow, sustento, paginaTexto: null });
}

/* centro -> cada sistema */
SYSTEMS.forEach(sys => addEdge("centro", sys.id, "centro", `${sys.name.replace(/\n/g," ")} es una de las seis lecturas que nuestro equipo construyó a partir del POT.`));

/* 15 relaciones entre macromodelos (grafo completo) */
const SYSTEM_RELATIONS = [
  ["amb","hum","Naturaleza y estructura ecológica ↔ calidad de vida, espacio público y bienestar."],
  ["amb","fun","Corredores ecológicos ↔ corredores verdes y movilidad."],
  ["amb","soc","Recursos naturales ↔ soporte de actividades humanas y económicas."],
  ["amb","cul","Patrimonio natural ↔ identidad y paisaje."],
  ["amb","gob","Gestión ambiental ↔ gestión pública y participación."],
  ["hum","fun","Vivienda y equipamientos ↔ transporte y accesibilidad."],
  ["hum","soc","Vivienda ↔ empleo."],
  ["hum","cul","Patrimonio ↔ apropiación y vida cotidiana."],
  ["hum","gob","Servicios de cuidado ↔ gestión y participación."],
  ["fun","soc","Transporte ↔ empleo, empresas y actividades productivas."],
  ["fun","cul","Accesibilidad ↔ patrimonio y turismo."],
  ["fun","gob","Infraestructura ↔ gestión pública."],
  ["soc","cul","Patrimonio ↔ turismo y actividades culturales."],
  ["soc","gob","Actividad económica ↔ regulación, gestión y planificación."],
  ["cul","gob","Patrimonio ↔ gestión y participación."],
];
SYSTEM_RELATIONS.forEach(([a,b,txt]) => addEdge(a, b, "sistema", txt));

/* pertenencia interna: cada concepto exclusivo -> su sistema */
Object.entries(CONCEPTS).forEach(([sysId, list]) => {
  list.forEach(c => addEdge(c.id, sysId, "interno", `${c.name.replace(/\n/g," ")} es un subnodo propio del sistema.`));
});

/* nodos compartidos -> su sistema primario */
SHARED.forEach(sh => addEdge(sh.id, sh.primary, "pertenencia", `${sh.name.replace(/\n/g," ")} pertenece principalmente a este sistema, pero opera como puente hacia otros.`));

/* -------- puentes concretos entre conceptos compartidos y otros sistemas -------- */
addEdge("shared_vivienda", "soc_empleo", "articulacion", "ARTICULACIÓN: vivienda ↔ empleo. No se lee como contradicción sino como dependencia funcional entre hábitat y sustento económico.");
addEdge("shared_vivienda", "shared_transporte", "compartido", "Vivienda ↔ transporte público: el acceso a la vivienda depende de su conexión con la red de movilidad.");
addEdge("shared_vivienda", "amb_resiliencia", "compartido", "Vivienda ↔ resiliencia climática: la localización de la vivienda se relaciona con la estructura ecológica y la exposición a riesgos.");

addEdge("shared_transporte", "hum_calidad", "compartido", "Transporte público ↔ calidad de vida: la movilidad condiciona el acceso a servicios y oportunidades.");
addEdge("shared_transporte", "soc_actividades", "compartido", "Transporte público ↔ actividades productivas: la movilidad conecta con el empleo y la actividad económica.");
addEdge("shared_transporte", "shared_corredores", "compartido", "Transporte público ↔ corredores ecológicos/verdes: la movilidad sostenible se apoya en la red verde.");

addEdge("shared_corredores", "fun_infraestructura", "tension", "TENSIÓN: infraestructura ↔ continuidad ecológica. El POT plantea infraestructura y movilidad, pero también corredores verdes y conectividad ecológica: dos lógicas que compiten por el mismo suelo.");

addEdge("shared_accesibilidad", "fun_integracion", "compartido", "Accesibilidad ↔ integración multimodal: ambas describen la facilidad de moverse por la ciudad.");
addEdge("shared_accesibilidad", "shared_patrimonio", "compartido", "Accesibilidad ↔ patrimonio: llegar físicamente a los sitios patrimoniales condiciona su uso y disfrute.");

addEdge("shared_patrimonio", "amb_areas", "compartido", "Patrimonio ↔ áreas protegidas: el patrimonio natural se apoya en la estructura ecológica protegida.");
addEdge("shared_patrimonio", "soc_turismo", "tension_art", "TENSIÓN / ARTICULACIÓN: conservación ↔ activación económica. El patrimonio se declara valor a conservar, pero también se incorpora como activo turístico y económico.");
addEdge("shared_patrimonio", "hum_calidad", "compartido", "Patrimonio ↔ calidad de vida: la apropiación social del patrimonio incide en el bienestar cotidiano.");

addEdge("shared_gestionamb", "amb_areas", "compartido", "Gestión ambiental ↔ áreas protegidas: la gobernanza del territorio natural depende de instrumentos de gestión ambiental.");

addEdge("amb_areas", "soc_turismo", "tension", "TENSIÓN: conservación ↔ aprovechamiento. La estructura ambiental se presenta como soporte del desarrollo, pero algunos elementos naturales se incorporan a actividades turísticas y económicas.");

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- tamaño de cada bola según su grado real de conexión (los HUB emergen del cálculo) -------- */
(function sizeByDegree() {
  const degree = {};
  RAW_EDGES.forEach(e => { degree[e.s] = (degree[e.s]||0)+1; degree[e.t] = (degree[e.t]||0)+1; });
  ODS_NODES.forEach(n => {
    const d = degree[n.id] || 0;
    n.degree = d;
    let base = n.kind === "centro" ? 52 : n.kind === "sistema" ? 58 : n.kind === "compartido" ? 30 : 22;
    let perDeg = n.kind === "sistema" ? 1.6 : n.kind === "compartido" ? 3.2 : 2.6;
    let maxR = n.kind === "sistema" ? 78 : n.kind === "compartido" ? 48 : 38;
    n.r = Math.min(maxR, base + d * perDeg);
    n.homeX = n.x; n.homeY = n.y;
  });
})();

/* -------- física: longitud de reposo de cada resorte -------- */
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
  return `M${x1},${y1} L${x2},${y2}`;
}

function edgePathDataDouble(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const px = -uy, py = ux;
  const off = 3;
  const startPad = s.r + 2;
  const endPad = t.r + 2;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad,   y2 = t.y - uy * endPad;
  return [
    `M${x1 + px * off},${y1 + py * off} L${x2 + px * off},${y2 + py * off}`,
    `M${x1 - px * off},${y1 - py * off} L${x2 - px * off},${y2 - py * off}`,
  ];
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

    let visualEl = null;
    if (edge.type === "tension_art") {
      const [d1, d2] = edgePathDataDouble(edge, s, t);
      const sub = document.createElementNS(SVG_NS, "g");
      sub.setAttribute("class", "ods-edge edge-visual");
      const v1 = document.createElementNS(SVG_NS, "path");
      v1.setAttribute("d", d1);
      const v2 = document.createElementNS(SVG_NS, "path");
      v2.setAttribute("d", d2);
      [v1, v2].forEach(v => {
        v.setAttribute("stroke", style.color);
        v.setAttribute("stroke-width", style.width * 0.6);
      });
      sub.appendChild(v1); sub.appendChild(v2);
      visualEl = sub;
      edge._el = { visual: sub, d1, d2, hit };
    } else {
      const visual = document.createElementNS(SVG_NS, "path");
      visual.setAttribute("d", d);
      visual.setAttribute("class", "ods-edge edge-visual");
      visual.setAttribute("stroke", style.color);
      visual.setAttribute("stroke-width", style.width);
      if (style.dash) visual.setAttribute("stroke-dasharray", "6,5");
      if (style.arrow) visual.setAttribute("marker-end", `url(#arrow-${edge.type})`);
      visual.setAttribute("opacity", edge.type === "interno" ? "0.45" : "0.9");
      visualEl = visual;
      edge._el = { visual, hit };
    }

    group.appendChild(visualEl);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(i));
    g.appendChild(group);
  });

  svg.appendChild(g);
}

/* -------- nodos -------- */
function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node kind-" + node.kind);
    group.setAttribute("data-id", node.id);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring");
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("stroke", node.color);
    circle.setAttribute("stroke-width", node.kind === "sistema" ? 3.5 : 2.5);
    if (node.kind === "compartido") circle.setAttribute("stroke-dasharray", "5,3");
    circle.setAttribute("filter", "url(#glow-" + node.color.replace("#", "") + ")");

    const fo = document.createElementNS(SVG_NS, "foreignObject");
    const size = node.r * 2.3;
    fo.setAttribute("x", node.x - size / 2); fo.setAttribute("y", node.y - size / 2);
    fo.setAttribute("width", size); fo.setAttribute("height", size);

    const wrapper = document.createElementNS(XHTML_NS, "div");
    wrapper.setAttribute("class", "node-inner");
    wrapper.setAttribute("style",
      "width:100%;height:100%;display:flex;flex-direction:column;" +
      "align-items:center;justify-content:center;gap:1px;pointer-events:none;"
    );

    if (node.icon) {
      const iconEl = document.createElementNS(XHTML_NS, "i");
      iconEl.setAttribute("class", "fa-solid " + node.icon + " node-icon");
      iconEl.setAttribute("style", `color:${node.color}; font-size:${node.r * 0.4}px; margin:1px 0;`);
      wrapper.appendChild(iconEl);
    }

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("class", "node-name");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.185, 7.5)}px; padding:0 3px; font-weight:700; color:#e7eaf2; line-height:1.15; white-space:pre-line;`);
    nameEl.textContent = node.name;

    wrapper.appendChild(nameEl);
    fo.appendChild(wrapper);

    group.appendChild(circle);
    group.appendChild(fo);
    attachNodeClickHandler(group, node.id);
    attachNodeDragHandler(group, node);
    g.appendChild(group);

    node._el = { group, circle, fo };
  });

  svg.appendChild(g);
}

/* -------- física: mover nodos y recalcular líneas cada frame -------- */
const PHYSICS = { spring: 0.045, anchor: 0.02, damping: 0.82, minVel: 0.02 };

function updatePositions() {
  ODS_NODES.forEach(n => {
    if (!n._el) return;
    n._el.circle.setAttribute("cx", n.x);
    n._el.circle.setAttribute("cy", n.y);
    const size = n.r * 2.3;
    n._el.fo.setAttribute("x", n.x - size / 2);
    n._el.fo.setAttribute("y", n.y - size / 2);
  });
  RAW_EDGES.forEach(edge => {
    if (!edge._el) return;
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    if (edge.type === "tension_art" && edge._el.d1) {
      const [d1, d2] = edgePathDataDouble(edge, s, t);
      edge._el.visual.childNodes[0].setAttribute("d", d1);
      edge._el.visual.childNodes[1].setAttribute("d", d2);
    } else {
      edge._el.visual.setAttribute("d", edgePathData(edge, s, t));
    }
    edge._el.hit.setAttribute("d", edgePathData(edge, s, t));
  });
}

let physicsRunning = false;
function physicsStep() {
  let moving = false;

  RAW_EDGES.forEach(edge => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const dx = t.x - s.x, dy = t.y - s.y;
    const dist = Math.hypot(dx, dy) || 1;
    const diff = (dist - edge.restLength) * PHYSICS.spring;
    const fx = (dx / dist) * diff, fy = (dy / dist) * diff;
    if (!s.fixed) { s.vx += fx; s.vy += fy; }
    if (!t.fixed) { t.vx -= fx; t.vy -= fy; }
  });

  ODS_NODES.forEach(n => {
    if (n.fixed) { n.vx = 0; n.vy = 0; return; }
    n.vx += (n.homeX - n.x) * PHYSICS.anchor;
    n.vy += (n.homeY - n.y) * PHYSICS.anchor;
    n.vx *= PHYSICS.damping;
    n.vy *= PHYSICS.damping;
    n.x += n.vx;
    n.y += n.vy;
    if (Math.abs(n.vx) > PHYSICS.minVel || Math.abs(n.vy) > PHYSICS.minVel) moving = true;
  });

  updatePositions();

  if (moving || ODS_NODES.some(n => n.fixed)) {
    requestAnimationFrame(physicsStep);
  } else {
    physicsRunning = false;
  }
}

function wakePhysics() {
  if (!physicsRunning) {
    physicsRunning = true;
    requestAnimationFrame(physicsStep);
  }
}

/* -------- arrastrar una bola -------- */
function attachNodeDragHandler(group, node) {
  const svg = document.getElementById("networkViz");
  let dragging = false;
  let moved = false;
  let startClientX = 0, startClientY = 0;

  function toSvgPoint(clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const m = svg.getScreenCTM().inverse();
    return pt.matrixTransform(m);
  }

  group.addEventListener("pointerdown", (e) => {
    dragging = true;
    moved = false;
    startClientX = e.clientX; startClientY = e.clientY;
    node.fixed = true;
    group.classList.add("dragging");
    group.setPointerCapture(e.pointerId);
    wakePhysics();
  });

  group.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    if (Math.hypot(e.clientX - startClientX, e.clientY - startClientY) > 4) moved = true;
    const p = toSvgPoint(e.clientX, e.clientY);
    node.x = p.x; node.y = p.y;
    node.vx = 0; node.vy = 0;
    updatePositions();
    wakePhysics();
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    node.fixed = false;
    group.classList.remove("dragging");
    try { group.releasePointerCapture(e.pointerId); } catch (err) {}
    wakePhysics();
    if (moved) {
      group.dataset.suppressClick = "1";
      setTimeout(() => { delete group.dataset.suppressClick; }, 0);
    }
  }

  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
}

function renderNetwork() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg);
  drawEdges(svg);
  drawNodes(svg);
}

/* -------- panel de sustento (clic en línea) -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  const title = `${s.name} ↔ ${t.name}`.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = title;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label;
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent = NOTA_FUENTE;

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

/* -------- visibilidad: por tipo (leyenda) + por nodo (doble clic) -------- */
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
  if (nodeOff.has(id)) { nodeOff.delete(id); group.classList.remove("node-off"); }
  else { nodeOff.add(id); group.classList.add("node-off"); }
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
      if (count === 2) toggleNode(id);
      else if (count >= 3) toggleNodeFlow(id);
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
        if (sIn || tIn) { visibleEdges.add(i); visibleNodes.add(edge.s); visibleNodes.add(edge.t); }
      } else if (sIn && tIn) visibleEdges.add(i);
    });
  } else if (spotlight && spotlight.mode === "types") {
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => { if (spotlight.types.includes(edge.type)) visibleEdges.add(i); });
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
  if (already) clearSpotlight();
  else setSpotlightNodes([id], true);
}

/* -------- tarjetas de insight -------- */
const NODE_INSIGHTS = {
  hubs: ODS_NODES.filter(n => n.kind === "sistema" || (n.kind === "compartido" && n.degree >= 4)).map(n => n.id),
  puentes: SHARED.map(s => s.id),
  tensiones: ["amb_areas", "soc_turismo", "shared_corredores", "fun_infraestructura", "shared_patrimonio"],
  gobernanza: ["gob", ...CONCEPTS.gob.map(c => c.id), "shared_gestionamb"],
};

const TYPE_KEY = { sistema: "sistema", compartido: "compartido", tension: "tension", articulacion: "articulacion", tension_art: "tension_art" };

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;
  if (card.classList.contains("active")) { clearSpotlight(); return; }

  if (TYPE_KEY[key]) setSpotlightTypes([TYPE_KEY[key]]);
  else if (key === "todos") setSpotlightNodes(ODS_NODES.map(n => n.id), false);
  else if (NODE_INSIGHTS[key]) setSpotlightNodes(NODE_INSIGHTS[key], true);
  else setSpotlightNodes(ODS_NODES.map(n => n.id), false);

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

/* -------- controles Todos / por tipo -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  const groups = {
    all: ["sistema","interno","pertenencia","compartido","tension","articulacion","tension_art","centro"],
    sistema: ["sistema","centro"],
    compartido: ["compartido","pertenencia"],
    tension: ["tension","tension_art"],
    articulacion: ["articulacion"],
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
function generateODSReport() { console.log("Generando reporte de la red de macromodelos..."); }
function downloadAlignment() { console.log("Descargando tabla de relaciones..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
});
