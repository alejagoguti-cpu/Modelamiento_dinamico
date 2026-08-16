/* ==========================================================
   RED DE LAS 4 ESTRUCTURAS DEL POT — Módulo 01 (Construir la Red)

   Este archivo reemplaza una versión anterior (diagrama "hero" +
   popups modales por estructura) que ya no correspondía al HTML
   actual: la página cambió a un solo lienzo SVG (#networkViz) con
   tarjetas de insight, filtros y panel de sustento — la misma
   arquitectura del Módulo 04 — pero el JS seguía buscando
   #network-svg, #redes-modal-overlay, etc., que ya no existen.
   Por eso la red no se dibujaba: el script no encontraba nada
   donde pintar y se detenía en silencio.

   Los 38 nodos y las 38 relaciones de abajo son exactamente los
   que ya estaban documentados en la tabla de sustento del HTML
   (misma etiqueta, mismo tipo, misma página, misma cita), solo que
   ahora también alimentan el diagrama en vez de vivir nada más en
   la tabla.
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- geometría auxiliar -------- */
function polar(cx, cy, angleDeg, r) {
  const a = angleDeg * Math.PI / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/* -------- 4 estructuras del POT, en clústeres a lo ancho del lienzo -------- */
const CATEGORIES = {
  e1: { name: "Estructura Ecológica Principal",             color: "#4ade80", cx: 380,  cy: 460, radius: 260 },
  e2: { name: "Estructura Funcional y del Cuidado",         color: "#5b8def", cx: 1080, cy: 460, radius: 250 },
  e3: { name: "Estructura Socioeconómica Creativa",         color: "#ef9552", cx: 1780, cy: 460, radius: 230 },
  e4: { name: "Estructura Integradora de Patrimonio",       color: "#a276f2", cx: 2380, cy: 460, radius: 160 },
};

/* -------- nodos por estructura -------- */
const CONCEPTS = {
  e1: [
    { id: "e1_cerros",      name: "Cerros\norientales",         icon: "fa-mountain" },
    { id: "e1_rios",        name: "Ríos",                        icon: "fa-water" },
    { id: "e1_quebradas",   name: "Quebradas",                   icon: "fa-water" },
    { id: "e1_humedales",   name: "Humedales",                   icon: "fa-droplet" },
    { id: "e1_resiliencia", name: "Áreas de\nresiliencia\nclimática", icon: "fa-temperature-half" },
    { id: "e1_paramos",     name: "Complejos de\npáramos",       icon: "fa-mountain" },
    { id: "e1_bosques",     name: "Bosques\nurbanos",            icon: "fa-tree" },
    { id: "e1_coberturas",  name: "Coberturas\nvegetales",       icon: "fa-seedling" },
    { id: "e1_reservas",    name: "Reservas\nforestales",        icon: "fa-tree" },
    { id: "e1_protegidas",  name: "Áreas\nprotegidas",           icon: "fa-shield-halved" },
    { id: "e1_parquesmnt",  name: "Parques\necológicos\nde montaña", icon: "fa-mountain" },
    { id: "e1_parqueborde", name: "Parque\nde borde",            icon: "fa-house-chimney" },
    { id: "e1_paisajes",    name: "Paisajes\nsostenibles",       icon: "fa-hands-holding-circle" },
  ],
  e2: [
    { id: "e2_vial",        name: "Red vial",                   icon: "fa-road" },
    { id: "e2_transporte",  name: "Transporte\npúblico",         icon: "fa-bus" },
    { id: "e2_equipamient", name: "Equipamientos",               icon: "fa-building" },
    { id: "e2_corredoresv", name: "Corredores\nverdes",          icon: "fa-leaf" },
    { id: "e2_ciclorutas",  name: "Ciclorrutas",                 icon: "fa-bicycle" },
    { id: "e2_manzanas",    name: "Manzanas del\ncuidado",       icon: "fa-border-all" },
    { id: "e2_sersociales", name: "Servicios\nsociales",         icon: "fa-hand-holding-heart" },
    { id: "e2_parques",     name: "Parques",                     icon: "fa-tree" },
    { id: "e2_sercuidado",  name: "Servicios de\ncuidado",       icon: "fa-heart" },
    { id: "e2_vivienda",    name: "Vivienda",                    icon: "fa-house" },
    { id: "e2_serpublicos", name: "Servicios\npúblicos",         icon: "fa-plug" },
  ],
  e3: [
    { id: "e3_financieros",     name: "Centros\nfinancieros",        icon: "fa-landmark" },
    { id: "e3_empresariales",   name: "Servicios\nempresariales",    icon: "fa-briefcase" },
    { id: "e3_distrito",        name: "Distrito\ntecnológico",       icon: "fa-diagram-project" },
    { id: "e3_industriales",    name: "Zonas\nindustriales",         icon: "fa-industry" },
    { id: "e3_innovacion",      name: "Innovación",                  icon: "fa-lightbulb" },
    { id: "e3_abastecimiento",  name: "Centros de\nabastecimiento",  icon: "fa-truck" },
    { id: "e3_plazas",          name: "Plazas de\nmercado",          icon: "fa-store" },
    { id: "e3_turistico",       name: "Zonas interés\nturístico",    icon: "fa-map" },
    { id: "e3_artesanal",       name: "Producción\nartesanal",       icon: "fa-gem" },
  ],
  e4: [
    { id: "e4_sagrados",    name: "Sistema de\nsitios sagrados",   icon: "fa-place-of-worship" },
    { id: "e4_inmaterial",  name: "Patrimonio\ninmaterial",        icon: "fa-masks-theater" },
    { id: "e4_natural",     name: "Patrimonio\nnatural",           icon: "fa-tree" },
    { id: "e4_ecomaterial", name: "Patrimonio\necológico material", icon: "fa-landmark" },
  ],
};

/* -------- construir nodos con posición en abanico dentro de su clúster -------- */
const ODS_NODES = [];
Object.entries(CONCEPTS).forEach(([catId, list]) => {
  const cat = CATEGORIES[catId];
  list.forEach((c, i) => {
    const angle = (360 / list.length) * i - 90;
    const p = polar(cat.cx, cat.cy, angle, cat.radius);
    ODS_NODES.push({ id: c.id, name: c.name, icon: c.icon, color: cat.color, cat: catId, x: p.x, y: p.y, r: 28 });
  });
});

ODS_NODES.forEach(n => { n.homeX = n.x; n.homeY = n.y; n.vx = 0; n.vy = 0; n.fixed = false; });

/* -------- estilos por tipo de tensión (color) -------- */
const TYPE_STYLE = {
  soporte:    { color: "#ef9552", width: 2.2, label: "Soporte" },
  resiliencia:{ color: "#5b8def", width: 2.2, label: "Resiliencia" },
  indirecta:  { color: "#8b93a6", width: 2.0, label: "Indirecta" },
};

/* -------- 38 relaciones, idénticas a la tabla de sustento del HTML -------- */
function E(s, t, cat, type, directa, page, label, quote) {
  return { s, t, cat, type, directa, page, label, sustento: quote };
}
const RAW_EDGES = [
  E("e1_cerros","e1_rios","e1","soporte",false,"p. 186","Cerros orientales ➞ Ríos (corredores montañosos)","Los cerros orientales son los corredores montañosos de la estructura ecológica: contienen y alimentan los ríos que descienden al valle."),
  E("e1_quebradas","e1_humedales","e1","soporte",true,"p. 186","Quebradas ➞ Humedales","Las quebradas de la Sabana alimentan los humedales: su caudal mantiene la lámina de agua y la vida del ecosistema."),
  E("e1_humedales","e1_rios","e1","soporte",true,"p. 186","Humedales ➞ Ríos","Los humedales regulan los ríos de la Sabana: amortiguan crecientes, sedimentan y depuran el agua que circula por la cuenca."),
  E("e1_humedales","e1_resiliencia","e1","soporte",true,"p. 186","Humedales ➞ Áreas de resiliencia climática","Los humedales son parte de las áreas de resiliencia climática: absorben el exceso hídrico y reducen el riesgo de inundación."),
  E("e1_rios","e1_paramos","e1","soporte",true,"p. 186","Ríos ➞ Complejos de páramos","Los ríos de la Sabana nacen en los complejos de páramos: el agua que llega a la ciudad depende de esos ecosistemas altoandinos."),
  E("e1_bosques","e1_coberturas","e1","soporte",true,"p. 186","Bosques urbanos ➞ Coberturas vegetales","Los bosques urbanos integran y sostienen las coberturas vegetales de la ciudad."),
  E("e1_resiliencia","e1_coberturas","e1","resiliencia",true,"p. 186","Áreas de resiliencia climática ➞ Coberturas vegetales","Las áreas de resiliencia climática dependen de las coberturas vegetales para su funcionamiento: sin vegetación no hay regulación térmica ni hídrica."),
  E("e1_reservas","e1_coberturas","e1","resiliencia",true,"p. 186","Reservas forestales ➞ Coberturas vegetales","Las reservas forestales sostienen las coberturas vegetales: garantizan suelo protegido y continuidad de la vegetación."),
  E("e1_cerros","e1_protegidas","e1","indirecta",false,"p. 186","Cerros orientales ➞ Áreas protegidas","Los cerros orientales se vinculan con las áreas protegidas de manera indirecta: no toda su extensión está bajo régimen de protección, aunque la protege parcialmente."),
  E("e1_protegidas","e1_parquesmnt","e1","soporte",false,"p. 186","Áreas protegidas ➞ Parques ecológicos de montaña","Las áreas protegidas contienen a los parques ecológicos de montaña: el régimen de protección habilita su existencia."),
  E("e1_protegidas","e1_reservas","e1","soporte",false,"p. 186","Áreas protegidas ➞ Reservas forestales","Las áreas protegidas dan origen a las reservas forestales: la protección jurídica habilita la reserva como figura de conservación."),
  E("e1_parquesmnt","e1_coberturas","e1","soporte",false,"p. 186","Parque ecológico de montaña ➞ Coberturas vegetales","Los parques ecológicos de montaña aportan sus coberturas vegetales al sistema ecológico urbano."),
  E("e1_humedales","e1_coberturas","e1","soporte",false,"p. 186","Humedales ➞ Coberturas vegetales","Los humedales contribuyen a las coberturas vegetales del sistema ecológico: su vegetación palustre es cobertura viva."),
  E("e1_coberturas","e1_parqueborde","e1","soporte",true,"p. 186","Coberturas vegetales ➞ Parque de borde","Las coberturas vegetales sostienen el parque de borde: la franja verde que separa la ciudad del campo depende de ellas."),
  E("e1_paramos","e1_paisajes","e1","soporte",false,"p. 186","Complejos de páramos ➞ Paisajes sostenibles","Los complejos de páramos sustentan los paisajes sostenibles de la región: su conservación es condición de la sostenibilidad del territorio."),

  E("e2_vial","e2_transporte","e2","soporte",true,"p. 43","Red vial ➞ Transporte público","La red vial es la infraestructura que hace posible el transporte público: sin corredores viales no hay sistema de buses ni Metro."),
  E("e2_vial","e2_equipamient","e2","soporte",true,"p. 43","Red vial ➞ Equipamientos","La red vial conecta y da acceso a los equipamientos educativos, de salud y comunitarios de la ciudad."),
  E("e2_corredoresv","e2_transporte","e2","soporte",true,"p. 43","Corredores verdes ➞ Transporte público","Los corredores verdes alimentan y complementan el transporte público: alojan buses eléctricos e integran movilidad y ecosistema."),
  E("e2_corredoresv","e2_ciclorutas","e2","soporte",true,"p. 43","Corredores verdes ➞ Ciclorrutas","Los corredores verdes contienen ciclorrutas seguras: la cicloinfraestructura se integra a su diseño."),
  E("e2_manzanas","e2_sersociales","e2","soporte",true,"p. 43","Manzanas del cuidado ➞ Servicios sociales","Las Manzanas del Cuidado cualifican los servicios sociales del Distrito y hacen efectiva la articulación interinstitucional."),
  E("e2_manzanas","e2_parques","e2","soporte",true,"p. 43","Manzanas del cuidado ➞ Parques","Las Manzanas del Cuidado aprovechan los parques como infraestructura de encuentro y cuidado comunitario."),
  E("e2_equipamient","e2_sercuidado","e2","soporte",false,"p. 43","Equipamientos ➞ Servicios de cuidado","Los equipamientos existen como anclas de los servicios de cuidado: la relación es inferida de la política de anclaje en equipamientos preexistentes."),
  E("e2_equipamient","e2_sersociales","e2","soporte",false,"p. 43","Equipamientos ➞ Servicios sociales","Los equipamientos se vinculan con los servicios sociales: la articulación de entidades del Distrito opera a través de ellos."),
  E("e2_equipamient","e2_vivienda","e2","soporte",true,"p. 43","Equipamientos ➞ Vivienda","Los equipamientos educativos deben estar cerca de la vivienda: la proximidad es prioridad de la estructura funcional."),
  E("e2_vivienda","e2_serpublicos","e2","soporte",false,"p. 43","Vivienda ➞ Servicios públicos","La vivienda depende de los servicios públicos: la relación es inferida de la condición básica de habitabilidad."),
  E("e2_vivienda","e2_ciclorutas","e2","soporte",false,"p. 43","Vivienda ➞ Ciclorrutas","La vivienda se vincula con las ciclorrutas: el acceso ciclista desde el barrio es condición de movilidad cotidiana."),
  E("e2_vivienda","e2_transporte","e2","soporte",false,"p. 43","Vivienda ➞ Transporte público","La vivienda se conecta con el transporte público: la accesibilidad determina la calidad de vida de los hogares."),

  E("e3_financieros","e3_empresariales","e3","soporte",true,"p. 239-241","Centros financieros ➞ Servicios empresariales","Los centros financieros sostienen los servicios empresariales: el capital y la banca financian la economía del conocimiento."),
  E("e3_empresariales","e3_distrito","e3","soporte",true,"p. 239-241","Servicios empresariales ➞ Distrito tecnológico","Los servicios empresariales alimentan el distrito tecnológico: proveen demanda, clientes y profesionalización."),
  E("e3_empresariales","e3_industriales","e3","soporte",true,"p. 239-241","Servicios empresariales ➞ Zonas industriales","Los servicios empresariales sirven a las zonas industriales: logística, diseño, comercio y gestión."),
  E("e3_distrito","e3_innovacion","e3","soporte",true,"p. 239-241","Distrito tecnológico ➞ Innovación","El distrito tecnológico genera innovación: es el nodo que concentra emprendimiento y economía creativa."),
  E("e3_abastecimiento","e3_plazas","e3","soporte",false,"p. 239-241","Centros de abastecimiento ➞ Plazas de mercado","Los centros de abastecimiento abastecen las plazas de mercado: la relación logística es inferida de la cadena de distribución de alimentos."),
  E("e3_plazas","e3_empresariales","e3","soporte",false,"p. 239-241","Plazas de mercado ➞ Servicios empresariales","Las plazas de mercado se vinculan con los servicios empresariales: el comercio local se integra a la economía formal de servicios."),
  E("e3_industriales","e3_turistico","e3","soporte",false,"p. 239-241","Zonas industriales ➞ Zonas de interés turístico","Las zonas industriales se relacionan con las zonas de interés turístico: la reconversión y el turismo industrial son vías de interés económico."),
  E("e3_artesanal","e3_turistico","e3","soporte",false,"p. 239-241","Producción artesanal ➞ Zonas de interés turístico","La producción artesanal alimenta las zonas de interés turístico: la cultura material local atrae y sostiene el turismo cultural."),

  E("e4_sagrados","e4_inmaterial","e4","resiliencia",true,"p. 126","Sistema de sitios sagrados ➞ Patrimonio inmaterial","El sistema de sitios sagrados sostiene el patrimonio inmaterial: las prácticas, rituales y memorias se arraigan en esos lugares."),
  E("e4_inmaterial","e4_natural","e4","resiliencia",true,"p. 126","Patrimonio inmaterial ➞ Patrimonio natural","El patrimonio inmaterial se entrelaza con el patrimonio natural: los saberes y usos tradicionales dependen de los ecosistemas."),
  E("e4_natural","e4_ecomaterial","e4","resiliencia",true,"p. 126","Patrimonio natural ➞ Patrimonio ecológico material","El patrimonio natural integra el patrimonio ecológico material: la conservación de la naturaleza es parte del patrimonio colectivo."),
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- tamaño por grado real de conexión (nodos "principales" emergen del cálculo) -------- */
(function sizeByDegree() {
  const deg = {};
  RAW_EDGES.forEach(e => { deg[e.s] = (deg[e.s]||0)+1; deg[e.t] = (deg[e.t]||0)+1; });
  ODS_NODES.forEach(n => {
    const d = deg[n.id] || 0;
    n.degree = d;
    n.r = Math.min(46, 22 + d * 3.6);
    n.homeX = n.x; n.homeY = n.y;
  });
})();

RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

/* -------- defs: glow por color + flechas por tipo -------- */
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

function edgePathData(s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const startPad = s.r + 2, endPad = t.r + 8;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad,   y2 = t.y - uy * endPad;
  return `M${x1},${y1} L${x2},${y2}`;
}

function drawEdges(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edges-layer");

  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];
    const d = edgePathData(s, t);

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-cat", edge.cat);
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
    visual.setAttribute("stroke-width", style.width);
    if (!edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
    if (edge.directa) visual.setAttribute("marker-end", `url(#arrow-${edge.type})`);
    visual.setAttribute("opacity", "0.9");
    edge._el = { visual, hit };

    group.appendChild(visual);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(i));
    g.appendChild(group);
  });

  svg.appendChild(g);
}

function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach((node, index) => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node");
    group.style.setProperty("--float-delay", `${((index * 0.17) % 2.4).toFixed(2)}s`);
    group.setAttribute("data-id", node.id);
    group.setAttribute("data-cat", node.cat);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring");
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("stroke", node.color);
    circle.style.stroke = node.color;
    circle.style.color = node.color;
    circle.setAttribute("stroke-width", 2.5);
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
      iconEl.setAttribute("style", `color:${node.color}; font-size:${node.r * 0.42}px; margin:1px 0;`);
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

/* -------- física de resorte (arrastrar bolas) -------- */
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
    const d = edgePathData(s, t);
    edge._el.visual.setAttribute("d", d);
    edge._el.hit.setAttribute("d", d);
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
  if (moving || ODS_NODES.some(n => n.fixed)) requestAnimationFrame(physicsStep);
  else physicsRunning = false;
}
function wakePhysics() {
  if (!physicsRunning) { physicsRunning = true; requestAnimationFrame(physicsStep); }
}

function attachNodeDragHandler(group, node) {
  const svg = document.getElementById("networkViz");
  let dragging = false, moved = false, startClientX = 0, startClientY = 0;
  function toSvgPoint(clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const m = svg.getScreenCTM().inverse();
    return pt.matrixTransform(m);
  }
  group.addEventListener("pointerdown", (e) => {
    dragging = true; moved = false;
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
  updateStructCounts();
}

function updateStructCounts() {
  Object.keys(CATEGORIES).forEach(catId => {
    const el = document.getElementById("struct-" + catId);
    if (!el) return;
    const nNodes = ODS_NODES.filter(n => n.cat === catId).length;
    const nEdges = RAW_EDGES.filter(e => e.cat === catId).length;
    el.textContent = `${CATEGORIES[catId].name}: ${nNodes} nodos · ${nEdges} relaciones`;
  });
}

/* -------- panel de sustento (clic en línea) -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const style = TYPE_STYLE[edge.type];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  document.getElementById("edgeInfoTitle").textContent = edge.label;
  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + (edge.directa ? " · Directa — continua" : " · Discontinua — inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";
  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent = `Página POT: ${edge.page}`;
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

/* -------- visibilidad: por tipo, por categoría (leyenda) y por nodo (doble clic) -------- */
const typeOff = new Set();
const catOff = new Set();
const nodeOff = new Set();

function refreshEdgeVisibility() {
  document.querySelectorAll(".ods-node").forEach(el => {
    el.classList.toggle("hidden-node", catOff.has(el.dataset.cat) && !nodeOff.has(el.dataset.id) ? true : catOff.has(el.dataset.cat));
  });
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type, cat = group.dataset.cat;
    const s = group.dataset.source, t = group.dataset.target;
    const hidden = typeOff.has(type) || catOff.has(cat) || nodeOff.has(s) || nodeOff.has(t);
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

function attachNodeClickHandler(group, id) {
  let count = 0, timer = null;
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

/* -------- spotlight (tarjetas de insight) -------- */
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
  let visibleNodes = null, visibleEdges = null;
  if (spotlight && spotlight.mode === "nodes") {
    visibleNodes = new Set(spotlight.nodes);
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      const sIn = spotlight.nodes.has(edge.s), tIn = spotlight.nodes.has(edge.t);
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
  e1: ODS_NODES.filter(n => n.cat === "e1").map(n => n.id),
  e2: ODS_NODES.filter(n => n.cat === "e2").map(n => n.id),
  e3: ODS_NODES.filter(n => n.cat === "e3").map(n => n.id),
  e4: ODS_NODES.filter(n => n.cat === "e4").map(n => n.id),
};
const TYPE_KEY = { soporte: "soporte", resiliencia: "resiliencia", indirecta: "indirecta" };

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

/* -------- panel de convenciones: dos grupos independientes (tipo / estructura) -------- */
function setupLegendToggle() {
  document.querySelectorAll('.legend-item[data-mode="type"] input').forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const type = item.dataset.type;
      if (e.target.checked) typeOff.delete(type); else typeOff.add(type);
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });
  document.querySelectorAll('.legend-item[data-mode="cat"] input').forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const cat = item.dataset.cat;
      if (e.target.checked) catOff.delete(cat); else catOff.add(cat);
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });
  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
}

/* -------- controles Todos / por tipo / por estructura -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  const allTypes = ["soporte", "resiliencia", "indirecta"];
  const allCats = ["e1", "e2", "e3", "e4"];
  let activeTypes = allTypes, activeCats = allCats;

  if (allTypes.includes(mode)) activeTypes = [mode];
  else if (allCats.includes(mode)) activeCats = [mode];

  document.querySelectorAll('.legend-item[data-mode="type"]').forEach(item => {
    const type = item.dataset.type;
    const input = item.querySelector("input");
    const show = activeTypes.includes(type);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) typeOff.delete(type); else typeOff.add(type);
  });
  document.querySelectorAll('.legend-item[data-mode="cat"]').forEach(item => {
    const cat = item.dataset.cat;
    const input = item.querySelector("input");
    const show = activeCats.includes(cat);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) catOff.delete(cat); else catOff.add(cat);
  });
  refreshEdgeVisibility();
}

/* -------- botones de acción (placeholders) -------- */
function generateODSReport() { console.log("Generando reporte de la red..."); }
function downloadAlignment() { console.log("Descargando tabla de relaciones..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
});


/* Zoom compatible con el lenguaje interactivo del Módulo 06. */
(() => {
  function setupModule06Zoom() {
    const svg = document.getElementById('networkViz');
    const wrap = svg?.parentElement;
    if (!svg || svg.dataset.module06ZoomReady === '1') return;
    svg.dataset.module06ZoomReady = '1';
    const initial = svg.getAttribute('viewBox').trim().split(/\s+/).map(Number);
    if (initial.length !== 4 || initial.some(Number.isNaN)) return;
    let scale = 1;
    const [x,y,w,h] = initial;
    const level = wrap?.querySelector('.network06-zoom-level');
    const update = () => {
      const nw=w/scale, nh=h/scale;
      svg.setAttribute('viewBox', `${x+(w-nw)/2} ${y+(h-nh)/2} ${nw} ${nh}`);
      if (level) level.textContent = `${Math.round(scale*100)}%`;
    };
    const change = delta => { scale=Math.min(2.25,Math.max(.75,+(scale+delta).toFixed(2))); update(); };
    wrap?.querySelector('.network06-zoom-in')?.addEventListener('click',()=>change(.25));
    wrap?.querySelector('.network06-zoom-out')?.addEventListener('click',()=>change(-.25));
    svg.addEventListener('wheel', e => { e.preventDefault(); change(e.deltaY<0?.10:-.10); }, {passive:false});
  }
  document.addEventListener('DOMContentLoaded', setupModule06Zoom);
})();
