/* ==========================================================
   RED POT ↔ ODS — diagrama con física de nodos
   - Los nodos parten de una posición fija, pero ahora se pueden
     ARRASTRAR: al mover una bola, las que están conectadas a ella
     la "siguen" (fuerza de resorte a lo largo de cada línea), y
     todo el conjunto tiende a volver a su posición original con
     un resorte suave de anclaje (para que no quede desordenado).
   - Conexiones tomadas 1 a 1 de la tabla de sustento documental.
   - Clic en una línea -> panel con Conexión / Tipo / Sustento / Página.
   - Doble clic en una bola -> la apaga (opacidad) y oculta sus líneas.
   - Triple clic en una bola -> aísla su flujo (solo se ven los nodos
     y líneas con los que se conecta directamente).
   - El punteado de una línea indica si la relación es "no directa"
     (inferida); las relaciones directas se dibujan con línea sólida.
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- Nodos: posición fija, nombres oficiales exactos -------- */
const ODS_NODES = [
  { id: "ods5",  num: 5,  name: "IGUALDAD DE GÉNERO",                      icon: "fa-venus-mars",     color: "#FF3A21", x: 183,  y: 64,  r: 40 },
  { id: "ods1",  num: 1,  name: "FIN DE LA POBREZA",                       icon: "fa-people-group",   color: "#E5243B", x: 610,  y: 78,  r: 60 },
  { id: "ods12", num: 12, name: "PRODUCCIÓN Y CONSUMO RESPONSABLES",       icon: "fa-recycle",        color: "#BF8B2E", x: 886,  y: 76,  r: 40 },
  { id: "ods2",  num: 2,  name: "HAMBRE CERO",                             icon: "fa-bowl-food",      color: "#DDA63A", x: 313,  y: 215, r: 60 },
  { id: "ods8",  num: 8,  name: "TRABAJO DECENTE Y CRECIMIENTO ECONÓMICO", icon: "fa-chart-line",     color: "#A21942", x: 562,  y: 242, r: 40 },
  { id: "ods3",  num: 3,  name: "SALUD Y BIENESTAR",                       icon: "fa-heart-pulse",    color: "#4C9F38", x: 836,  y: 270, r: 40 },
  { id: "ods10", num: 10, name: "REDUCCIÓN DE LAS DESIGUALDADES",          icon: "fa-scale-balanced", color: "#DD1367", x: 1049, y: 185, r: 40 },
  { id: "ods6",  num: 6,  name: "AGUA LIMPIA Y SANEAMIENTO",               icon: "fa-droplet",        color: "#26BDE2", x: 72,   y: 342, r: 40 },
  { id: "ods15", num: 15, name: "VIDA DE ECOSISTEMAS TERRESTRES",          icon: "fa-tree",           color: "#56C02B", x: 284,  y: 424, r: 40 },
  { id: "ods13", num: 13, name: "ACCIÓN POR EL CLIMA",                     icon: "fa-globe",          color: "#3F7E44", x: 706,  y: 406, r: 60 },
  { id: "ods7",  num: 7,  name: "ENERGÍA ASEQUIBLE Y NO CONTAMINANTE",     icon: "fa-bolt",           color: "#FCC30B", x: 930,  y: 434, r: 40 },
  { id: "ods16", num: 16, name: "PAZ, JUSTICIA E INSTITUCIONES SÓLIDAS",   icon: "fa-gavel",          color: "#00689D", x: 994,  y: 354, r: 40 },
  { id: "ods4",  num: 4,  name: "EDUCACIÓN DE CALIDAD",                    icon: "fa-book",           color: "#C5192D", x: 183,  y: 654, r: 40 },
  { id: "ods9",  num: 9,  name: "INDUSTRIA, INNOVACIÓN E INFRAESTRUCTURA", icon: "fa-industry",       color: "#FD6925", x: 447,  y: 657, r: 40 },
  { id: "ods11", num: 11, name: "CIUDADES Y COMUNIDADES SOSTENIBLES",      icon: "fa-city",           color: "#FD9D24", x: 639,  y: 692, r: 40 },
  { id: "ods14", num: 14, name: "VIDA SUBMARINA",                         icon: "fa-fish",           color: "#0A97D9", x: 789,  y: 689, r: 40 },
  { id: "ods17", num: 17, name: "ALIANZAS PARA LOGRAR LOS OBJETIVOS",      icon: "fa-handshake",      color: "#19486A", x: 1350, y: 470, r: 40 },
];

/* ODS 1, 2 y 13 son intencionalmente un poco más grandes (r 60) que el resto (r 40, todos iguales) */

/* -------- física: cada nodo guarda su posición "casa" (ancla) y velocidad -------- */
ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false; // true mientras el usuario lo está arrastrando
});

/* El punteado depende de si la relación es "no directa" (inferida): las relaciones
   directas se dibujan con línea sólida y las inferidas con línea punteada.
   El color SIEMPRE es el de su tipo (comp verde, func azul, causal rosa, cond naranja),
   verificado contra la leyenda de la imagen de referencia. */
const TYPE_STYLE = {
  comp:   { color: "#4ade80", width: 2,   label: "Complementaria" },
  func:   { color: "#5b8def", width: 2,   label: "Funcional" },
  causal: { color: "#f76fb0", width: 1.1, label: "Causal" },
  cond:   { color: "#ef9552", width: 1.6, label: "Condicionamiento" },
};

/* -------- Aristas: tabla de sustento documental (Excel) tal cual, + ajustes puntuales indicados -------- */
const RAW_EDGES = [
  { s: "ods6",  t: "ods5",  type: "comp",   directa: true, pagina: 35, sustento: "De aquí a 2030, lograr el acceso a servicios de saneamiento e higiene adecuados y equitativos para todos y poner fin a la defecación al aire libre, prestando especial atención a las necesidades de las mujeres y las niñas y las personas en situaciones de vulnerabilidad." },
  { s: "ods5",  t: "ods1",  type: "comp",   directa: true, pagina: 18, sustento: "Crear marcos normativos sólidos en los planos nacional, regional e internacional, sobre la base de estrategias de desarrollo en favor de los pobres que tengan en cuenta las cuestiones de género, a fin de apoyar la inversión acelerada en medidas para erradicar la pobreza." },
  { s: "ods5",  t: "ods4",  type: "comp",   directa: true, pagina: 32, sustento: "Si se facilita a las mujeres y niñas igualdad en el acceso a la educación, atención médica, un trabajo decente y representación en los procesos de adopción de decisiones políticas y económicas, se impulsarán las economías sostenibles y se beneficiará a las sociedades y a la humanidad en su conjunto." },
  { s: "ods5",  t: "ods8",  type: "causal", directa: true, pagina: 32, sustento: "Si se facilita a las mujeres y niñas igualdad en el acceso a la educación, atención médica, un trabajo decente y representación en los procesos de adopción de decisiones políticas y económicas, se impulsarán las economías sostenibles y se beneficiará a las sociedades y a la humanidad en su conjunto." },
  { s: "ods1",  t: "ods2",  type: "cond",   directa: true, pagina: 16, sustento: "Entre sus manifestaciones se incluyen el hambre y la malnutrición, el acceso limitado a la educación y a otros servicios básicos, la discriminación y la exclusión sociales y la falta de participación en la adopción de decisiones." },
  { s: "ods1",  t: "ods3",  type: "func",   directa: true, pagina: 18, sustento: "Proporción del gasto público total que se dedica a servicios esenciales (educación, salud y protección social)." },
  { s: "ods1",  t: "ods4",  type: "cond",   directa: true, pagina: 16, sustento: "Entre sus manifestaciones se incluyen el hambre y la malnutrición, el acceso limitado a la educación y a otros servicios básicos..." },
  { s: "ods1",  t: "ods8",  type: "causal", directa: true, pagina: 16, sustento: "El crecimiento económico debe ser inclusivo con el fin de crear empleos sostenibles y promover la igualdad." },
  { s: "ods1",  t: "ods13", type: "cond",   directa: true, pagina: 18, sustento: "De aquí a 2030, fomentar la resiliencia de los pobres y las personas que se encuentran en situaciones de vulnerabilidad y reducir su exposición y vulnerabilidad a los fenómenos extremos relacionados con el clima..." },
  { s: "ods2",  t: "ods1",  type: "cond",   directa: true, pagina: 20, sustento: "El sector alimentario y el sector agrícola ofrecen soluciones claves para el desarrollo y son vitales para la eliminación del hambre y la pobreza." },
  { s: "ods2",  t: "ods8",  type: "causal", directa: true, pagina: 20, sustento: "Si se hace bien, la agricultura, la silvicultura y las piscifactorías pueden suministrarnos comida nutritiva para todos y generar ingresos decentes..." },
  { s: "ods2",  t: "ods13", type: "cond",   directa: true, pagina: 20, sustento: "El cambio climático está poniendo mayor presión sobre los recursos de los que dependemos y aumentan los riesgos asociados a desastres tales como sequías e inundaciones." },
  { s: "ods2",  t: "ods15", type: "cond",   directa: true, pagina: 20, sustento: "Pero ahora mismo, nuestros suelos, agua, océanos, bosques y nuestra biodiversidad están siendo rápidamente degradados." },
  { s: "ods6",  t: "ods2",  type: "causal", directa: true, pagina: 35, sustento: "La escasez de recursos hídricos, la mala calidad del agua y el saneamiento inadecuado influyen negativamente en la seguridad alimentaria..." },
  { s: "ods6",  t: "ods4",  type: "causal", directa: true, pagina: 35, sustento: "La escasez de recursos hídricos, la mala calidad del agua y el saneamiento inadecuado influyen negativamente en [...] las oportunidades de educación para las familias pobres..." },
  { s: "ods8",  t: "ods1",  type: "causal", directa: true, pagina: 16, sustento: "El crecimiento económico debe ser inclusivo con el fin de crear empleos sostenibles y promover la igualdad." },
  { s: "ods8",  t: "ods12", type: "causal", directa: true, pagina: 41, sustento: "Mejorar progresivamente, de aquí a 2030, la producción y el consumo eficientes de los recursos mundiales y procurar desvincular el crecimiento económico de la degradación del medio ambiente..." },
  { s: "ods9",  t: "ods3",  type: "causal", directa: true, pagina: 44, sustento: "Desde hace tiempo se reconoce que, para conseguir un incremento de la productividad y de los ingresos y mejoras en los resultados sanitarios y educativos, se necesitan inversiones en infraestructura." },
  { s: "ods9",  t: "ods4",  type: "causal", directa: true, pagina: 44, sustento: "Desde hace tiempo se reconoce que, para conseguir un incremento de la productividad y de los ingresos y mejoras en los resultados sanitarios y educativos, se necesitan inversiones en infraestructura." },
  { s: "ods9",  t: "ods11", type: "func",   directa: true, pagina: 44, sustento: "El ritmo de crecimiento y urbanización también está generando la necesidad de contar con nuevas inversiones en infraestructuras sostenibles que permitirán a las ciudades ser más resistentes al cambio climático..." },
  { s: "ods9",  t: "ods13", type: "func",   directa: true, pagina: 44, sustento: "...nuevas inversiones en infraestructuras sostenibles que permitirán a las ciudades ser más resistentes al cambio climático...", curve: -12 },
  { s: "ods11", t: "ods7",  type: "func",   directa: true, pagina: 52, sustento: "El futuro que queremos incluye a ciudades de oportunidades, con acceso a servicios básicos, energía, vivienda, transporte y más facilidades para todos." },
  { s: "ods11", t: "ods13", type: "comp",   directa: true, pagina: 53, sustento: "De aquí a 2020, aumentar considerablemente el número de ciudades y asentamientos humanos que adoptan e implementan políticas y planes integrados para promover la inclusión, el uso eficiente de los recursos, la mitigación del cambio climático y la adaptación a él y la resiliencia ante los desastres..." },
  { s: "ods12", t: "ods3",  type: "causal", directa: true, pagina: 56, sustento: "...reducir significativamente su liberación a la atmósfera, el agua y el suelo a fin de minimizar sus efectos adversos en la salud humana y el medio ambiente." },
  { s: "ods13", t: "ods1",  type: "cond",   directa: true, pagina: 18, sustento: "De aquí a 2030, fomentar la resiliencia de los pobres y las personas que se encuentran en situaciones de vulnerabilidad y reducir su exposición y vulnerabilidad a los fenómenos extremos relacionados con el clima..." },
  { s: "ods13", t: "ods2",  type: "cond",   directa: true, pagina: 20, sustento: "El cambio climático está poniendo mayor presión sobre los recursos de los que dependemos y aumentan los riesgos asociados a desastres tales como sequías e inundaciones." },
  { s: "ods13", t: "ods14", type: "comp",   directa: true, pagina: 63, sustento: "Nuestras precipitaciones, el agua potable, el clima, el tiempo, las costas, gran parte de nuestros alimentos e incluso el oxígeno del aire que respiramos provienen, en última instancia del mar y son regulados por este." },
  /* 14 → 2: corregida según lo indicado — es causal (morada) y punteada, no complementaria/verde */
  { s: "ods14", t: "ods2",  type: "causal", directa: false, pagina: 63, sustento: "Nuestras precipitaciones, el agua potable, el clima, el tiempo, las costas, gran parte de nuestros alimentos e incluso el oxígeno del aire que respiramos provienen, en última instancia del mar y son regulados por este." },
  { s: "ods15", t: "ods1",  type: "comp",   directa: true, pagina: 70, sustento: "De aquí a 2020, integrar los valores de los ecosistemas y la biodiversidad en la planificación, los procesos de desarrollo, las estrategias de reducción de la pobreza..." },
  { s: "ods15", t: "ods11", type: "comp",   directa: false, pagina: 52, sustento: "Redoblar los esfuerzos para proteger y salvaguardar el patrimonio cultural y natural del mundo." },
  { s: "ods16", t: "ods10", type: "comp",   directa: false, pagina: 71, sustento: "Promover sociedades pacíficas e inclusivas para el desarrollo sostenible, facilitar el acceso a la justicia para todos y construir a todos los niveles instituciones eficaces e inclusivas que rindan cuentas." },
  { s: "ods17", t: "ods9",  type: "func",   directa: true, pagina: 76, sustento: "Entre estos sectores figuran la energía sostenible, la infraestructura y el transporte, así como las tecnologías de la información y las comunicaciones." },
  /* 7 → 9: agregada según lo indicado (funcional / azul) */
  { s: "ods7",  t: "ods9",  type: "func",   directa: true, pagina: null, sustento: "Conexión ODS 7 – ODS 9 (funcional), añadida según lo indicado. Pendiente de completar con la cita y página exactas del documento de sustento." },
  /* 1 → 10: agregada según lo indicado */
  { s: "ods1",  t: "ods10", type: "comp",   directa: true, pagina: null, sustento: "Conexión ODS 1 – ODS 10 (complementaria), añadida según lo indicado. Pendiente de completar con la cita y página exactas del documento de sustento." },
];

/* "17 → todos": el ODS 17 se conecta con el resto (excepto ODS 9, ya listado arriba) */
const TODOS_SUSTENTO = "...a fin de apoyar el logro de los Objetivos de Desarrollo Sostenible en todos los países, particularmente los países en desarrollo.";
const TODOS_PAGINA = 79;
ODS_NODES.forEach(n => {
  if (n.id === "ods17" || n.id === "ods9") return;
  RAW_EDGES.push({ s: "ods17", t: n.id, type: "func", directa: true, pagina: TODOS_PAGINA, sustento: TODOS_SUSTENTO, esTodos: true });
});

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
    const px = -uy, py = ux; // perpendicular unitario
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
    visual.setAttribute("stroke-width", edge.esTodos ? style.width * 0.7 : style.width);
    if (!edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
    visual.setAttribute("marker-end", `url(#arrow-${edge.type})`);
    visual.setAttribute("opacity", edge.esTodos ? "0.35" : "0.85");

    group.appendChild(visual);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(i));
    g.appendChild(group);

    /* referencias para poder recalcular el trazo en cada frame de física */
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
    const size = node.r * 1.9;
    fo.setAttribute("x", node.x - size / 2); fo.setAttribute("y", node.y - size / 2);
    fo.setAttribute("width", size); fo.setAttribute("height", size);

    const wrapper = document.createElementNS(XHTML_NS, "div");
    wrapper.setAttribute("class", "node-inner");
    wrapper.setAttribute("style",
      "width:100%;height:100%;display:flex;flex-direction:column;" +
      "align-items:center;justify-content:center;gap:1px;pointer-events:none;"
    );

    const numEl = document.createElementNS(XHTML_NS, "div");
    numEl.setAttribute("class", "node-num");
    numEl.setAttribute("style", `color:${node.color}; font-size:${Math.max(node.r * 0.24, 9)}px;`);
    numEl.textContent = node.num;

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon + " node-icon");
    iconEl.setAttribute("style", `color:${node.color}; font-size:${node.r * 0.44}px; margin:1px 0;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("class", "node-name");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.145, 6)}px; padding:0 3px;`);
    nameEl.textContent = node.name;

    wrapper.appendChild(numEl); wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
    fo.appendChild(wrapper);

    group.appendChild(circle);
    group.appendChild(fo);
    attachNodeClickHandler(group, node.id);
    attachNodeDragHandler(group, node);
    g.appendChild(group);

    /* referencias para poder mover el nodo en cada frame de física */
    node._el = { group, circle, fo };
  });

  svg.appendChild(g);
}

/* -------- física: mover nodos y recalcular líneas cada frame -------- */
const PHYSICS = {
  spring: 0.045,   // qué tanto "sigue" un nodo a los que están conectados a él
  anchor: 0.02,    // qué tanto tira cada nodo de vuelta a su posición original
  damping: 0.82,   // fricción (evita que oscile para siempre)
  minVel: 0.02,
};

function updatePositions() {
  ODS_NODES.forEach(n => {
    if (!n._el) return;
    n._el.circle.setAttribute("cx", n.x);
    n._el.circle.setAttribute("cy", n.y);
    const size = n.r * 1.9;
    n._el.fo.setAttribute("x", n.x - size / 2);
    n._el.fo.setAttribute("y", n.y - size / 2);
  });
  RAW_EDGES.forEach(edge => {
    if (!edge._el) return;
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const d = edgePathData(edge, s, t);
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

/* -------- arrastrar una bola: los nodos conectados la "siguen" -------- */
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
      /* evita que el "click" que sigue al arrastre dispare doble/triple clic */
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

/* -------- panel de sustento documental (clic en línea) -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  document.getElementById("edgeInfoTitle").textContent =
    `ODS ${s.num} → ODS ${t.num}  ·  ${s.name} → ${t.name}`;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + (edge.directa ? " · Directa" : " · Inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

  document.getElementById("edgeInfoQuote").textContent = `"${edge.sustento}"`;
  document.getElementById("edgeInfoPage").textContent =
    edge.pagina != null ? `Página: ${edge.pagina}` : "Página: por confirmar";

  document.getElementById("edgeInfoPanel").classList.add("visible");
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
}

/* -------- estado de visibilidad: por tipo (leyenda) + por nodo (doble clic) -------- */
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

/* -------- clic simple / doble / triple sobre una bola --------
   1 clic  -> no hace nada especial
   2 clics -> apaga/enciende el nodo (comportamiento existente)
   3 clics -> aísla el flujo: solo se ven los nodos y líneas que
              se tocan directamente con el nodo elegido
   Se cuentan los clics manualmente (en vez de usar "dblclick")
   para poder distinguir el triple clic de forma confiable. */
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

/* -------- spotlight: aísla nodos/líneas (triple clic en una bola O clic en una tarjeta de arriba) --------
   spotlight = null                                   -> todo visible, normal
   spotlight = { mode:"nodes", nodes:Set, expand }     -> solo esos nodos (y si expand=true, también
                                                          sus vecinos directos) quedan visibles
   spotlight = { mode:"types", types:[...] }           -> solo se ven las líneas de esos tipos */
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
  let visibleNodes = null; // null = todos visibles
  let visibleEdges = null;

  if (spotlight && spotlight.mode === "nodes") {
    visibleNodes = new Set(spotlight.nodes);
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      const sIn = spotlight.nodes.has(edge.s);
      const tIn = spotlight.nodes.has(edge.t);
      if (spotlight.expand) {
        /* triple clic: además de la bola elegida, se muestran sus vecinos directos */
        if (sIn || tIn) {
          visibleEdges.add(i);
          visibleNodes.add(edge.s);
          visibleNodes.add(edge.t);
        }
      } else {
        /* tarjeta de insight: solo se muestran los ODS exactos de la lista */
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

/* -------- tarjetas de insights (arriba de la red) -------- */
const NODE_INSIGHTS = {
  conectados:   [1, 2, 4, 5, 8, 9, 13],
  hubs:         [1, 2, 13],
  puentes:      [9, 8],
  perifericos:  [16, 7, 10],
};

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;

  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  if (key === "predominantes") {
    setSpotlightTypes(["causal", "func"]);
  } else {
    const ids = (NODE_INSIGHTS[key] || []).map(n => "ods" + n);
    setSpotlightNodes(ids, false);
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

/* -------- controles Todos / Alineados / Conflictos -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  const groups = {
    all: ["comp", "func", "causal", "cond"],
    aligned: ["comp", "func"],
    conflicts: ["causal", "cond"],
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

/* -------- botones de acción (placeholders existentes) -------- */
function generateODSReport() { console.log("Generando reporte POT-ODS..."); }
function downloadAlignment() { console.log("Descargando matriz de alineación..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
});
