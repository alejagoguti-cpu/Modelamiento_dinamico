/* ==========================================================
   MÓDULO 02 — MEDIR LA RED — ANÁLISIS CRÍTICO DE TENSIONES
   
   Mismas 38 relaciones del Módulo 01, pero clasificadas según
   el tipo de TENSIÓN (contradicción, incoherencia, etc.) que
   cada una expone en el POT Bogotá Reverdece 2022-2035.
   
   5 tipos de tensión:
   - incoherence:    rojo     #ef4444 (declaración vs. realidad)
   - contradiction:  rosa     #f472b6 (dos objetivos opuestos)
   - disconnection:  azul     #60a5fa (sin articulación real)
   - hierarchy:      morado   #c084fc (subordinada pese a central)
   - peripheral:     amarillo #fbbf24 (mencionado sin rol)
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";

/* Nodos: los mismos 37 del Módulo 01 */
const ODS_NODES = [
  /* 1. Estructura Ecológica Principal — VERDE */
  { id: "cerros",     cat: "e1", name: "CERROS\nORIENTALES",        icon: "fa-mountain-sun",  color: "#4ade80", x: 200,  y: 180, r: 52 },
  { id: "rios",       cat: "e1", name: "RÍOS",                       icon: "fa-water",         color: "#4ade80", x: 330,  y: 430, r: 50 },
  { id: "quebradas",  cat: "e1", name: "QUEBRADAS",                  icon: "fa-water",         color: "#4ade80", x: 500,  y: 150, r: 46 },
  { id: "humedales",  cat: "e1", name: "HUMEDALES",                  icon: "fa-droplet",       color: "#4ade80", x: 660,  y: 420, r: 52 },
  { id: "resiliencia",cat: "e1", name: "ÁREAS DE\nRESILIENCIA\nCLIMÁTICA",   icon: "fa-shield-heart",  color: "#4ade80", x: 890,  y: 170, r: 52 },
  { id: "paramos",    cat: "e1", name: "COMPLEJOS\nDE PÁRAMOS",      icon: "fa-mountain",      color: "#4ade80", x: 250,  y: 640, r: 52 },
  { id: "bosques",    cat: "e1", name: "BOSQUES\nURBANOS",           icon: "fa-tree",          color: "#4ade80", x: 1140, y: 400, r: 50 },
  { id: "coberturas", cat: "e1", name: "COBERTURAS\nVEGETALES",      icon: "fa-seedling",      color: "#4ade80", x: 1040, y: 650, r: 54 },
  { id: "reservas",   cat: "e1", name: "RESERVAS\nFORESTALES",       icon: "fa-tree",          color: "#4ade80", x: 1300, y: 190, r: 50 },
  { id: "areas",      cat: "e1", name: "ÁREAS\nPROTEGIDAS",          icon: "fa-lock",          color: "#4ade80", x: 440,  y: 300, r: 50 },
  { id: "parques_m",  cat: "e1", name: "PARQUES ECOLÓGICOS\nDE MONTAÑA",   icon: "fa-campground",      color: "#4ade80", x: 770,  y: 640, r: 50 },
  { id: "parque_b",   cat: "e1", name: "PARQUE\nDE BORDE",           icon: "fa-archway",       color: "#4ade80", x: 1430, y: 480, r: 48 },
  { id: "paisajes",   cat: "e1", name: "PAISAJES\nSOSTENIBLES",      icon: "fa-sun",           color: "#4ade80", x: 100,  y: 480, r: 48 },

  /* 2. Estructura Funcional y del Cuidado — AZUL */
  { id: "redvial",    cat: "e2", name: "RED\nVIAL",                  icon: "fa-road",          color: "#5b8def", x: 1240, y: 90,  r: 48 },
  { id: "transporte", cat: "e2", name: "TRANSPORTE\nPÚBLICO",        icon: "fa-bus",           color: "#5b8def", x: 960,  y: 330, r: 52 },
  { id: "corredores", cat: "e2", name: "CORREDORES\nVERDES",         icon: "fa-route",         color: "#5b8def", x: 700,  y: 140, r: 50 },
  { id: "ciclorutas", cat: "e2", name: "CICLORRUTAS",                icon: "fa-person-biking", color: "#5b8def", x: 1390, y: 330, r: 46 },
  { id: "equip",      cat: "e2", name: "EQUIPAMIENTOS",              icon: "fa-school",        color: "#5b8def", x: 1250, y: 620, r: 50 },
  { id: "manzanas",   cat: "e2", name: "MANZANAS\nDEL CUIDADO",      icon: "fa-people-roof",   color: "#5b8def", x: 1470, y: 640, r: 52 },
  { id: "sserv",      cat: "e2", name: "SERVICIOS\nSOCIALES",        icon: "fa-hand-holding-heart", color: "#5b8def", x: 1370, y: 760, r: 46 },
  { id: "parques",    cat: "e2", name: "PARQUES",                    icon: "fa-tree-city",     color: "#5b8def", x: 1100, y: 760, r: 46 },
  { id: "scuidado",   cat: "e2", name: "SERVICIOS\nDE CUIDADO",      icon: "fa-heart-pulse",   color: "#5b8def", x: 1230, y: 470, r: 46 },
  { id: "vivienda",   cat: "e2", name: "VIVIENDA",                   icon: "fa-house",         color: "#5b8def", x: 950,  y: 520, r: 50 },
  { id: "servpub",    cat: "e2", name: "SERVICIOS\nPÚBLICOS",        icon: "fa-bolt",          color: "#5b8def", x: 820,  y: 770, r: 46 },

  /* 3. Estructura Socioeconómica Creativa e Innovación — NARANJA */
  { id: "financieros", cat: "e3", name: "CENTROS\nFINANCIEROS",      icon: "fa-building-columns", color: "#ef9552", x: 1700, y: 190, r: 48 },
  { id: "empresariales", cat: "e3", name: "SERVICIOS\nEMPRESARIALES", icon: "fa-briefcase",      color: "#ef9552", x: 1920, y: 120, r: 50 },
  { id: "tecnodistrito", cat: "e3", name: "DISTRITO\nTECNOLÓGICO",   icon: "fa-microchip",      color: "#ef9552", x: 2110, y: 270, r: 48 },
  { id: "industriales",  cat: "e3", name: "ZONAS\nINDUSTRIALES",     icon: "fa-industry",       color: "#ef9552", x: 1860, y: 360, r: 48 },
  { id: "innovacion",    cat: "e3", name: "INNOVACIÓN",              icon: "fa-lightbulb",      color: "#ef9552", x: 2080, y: 470, r: 46 },
  { id: "abastecimiento",cat: "e3", name: "CENTROS DE\nABASTECIMIENTO", icon: "fa-truck",      color: "#ef9552", x: 1700, y: 430, r: 48 },
  { id: "plazas",        cat: "e3", name: "PLAZAS\nDE MERCADO",      icon: "fa-store",          color: "#ef9552", x: 1900, y: 530, r: 46 },
  { id: "turismo",       cat: "e3", name: "ZONAS DE\nINTERÉS\nTURÍSTICO", icon: "fa-map-location-dot", color: "#ef9552", x: 2090, y: 660, r: 46 },
  { id: "artesanal",     cat: "e3", name: "PRODUCCIÓN\nARTESANAL",   icon: "fa-palette",        color: "#ef9552", x: 1680, y: 640, r: 46 },

  /* 4. Estructura Integradora de Patrimonio — MORADA */
  { id: "sitios_sagrados", cat: "e4", name: "SISTEMA DE\nSITIOS\nSAGRADOS", icon: "fa-place-of-worship", color: "#a276f2", x: 2360, y: 200, r: 50 },
  { id: "pinmaterial",     cat: "e4", name: "PATRIMONIO\nINMATERIAL",    icon: "fa-masks-theater",    color: "#a276f2", x: 2500, y: 440, r: 50 },
  { id: "pnatural",        cat: "e4", name: "PATRIMONIO\nNATURAL",       icon: "fa-globe",              color: "#a276f2", x: 2650, y: 180, r: 48 },
  { id: "pecomaterial",    cat: "e4", name: "PATRIMONIO ECOLÓGICO\nMATERIAL", icon: "fa-leaf",          color: "#a276f2", x: 2650, y: 640, r: 50 },
];

ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* Estructuras */
const STRUCT_STYLE = {
  e1: { color: "#4ade80", label: "1. Ecológica Principal", tag: "ECOLÓGICA" },
  e2: { color: "#5b8def", label: "2. Funcional y del Cuidado", tag: "FUNCIONAL Y CUIDADO" },
  e3: { color: "#ef9552", label: "3. Socioeconómica Creativa", tag: "SOCIOECONÓMICA" },
  e4: { color: "#a276f2", label: "4. Integradora de Patrimonio", tag: "PATRIMONIO" },
};

/* Tipos de TENSIÓN (no relación) */
const TENSION_STYLE = {
  incoherence: { color: "#ef4444", label: "Incoherencia", icon: "fa-triangle-exclamation" },
  contradiction: { color: "#f472b6", label: "Contradicción", icon: "fa-arrows-cross" },
  disconnection: { color: "#60a5fa", label: "Desconexión", icon: "fa-link-slash" },
  hierarchy: { color: "#c084fc", label: "Jerarquía implícita", icon: "fa-arrow-down" },
  peripheral: { color: "#fbbf24", label: "Periférico discursivo", icon: "fa-comment-dots" },
};

/* 38 TENSIONES - Análisis crítico de las relaciones del POT */
const RAW_TENSIONS = [
  /* === 1. Estructura Ecológica Principal — 9 tensiones === */
  { s: "cerros",     t: "rios",       tension: "incoherence",   directa: true,  cat: "e1", pagina: "92", sustento: "Declara EEP como 'primera ordenante' y 'rectora' (p. 92) pero invierte más en autopistas que en protección ecológica; cerros orientales amenazados por presión urbanizadora." },
  { s: "quebradas",  t: "humedales",  tension: "hierarchy",     directa: true,  cat: "e1", pagina: "186", sustento: "Humedales mencionados como vitales (p. 186) pero ocupan solo 3 páginas del documento; subordinados a proyectos de drenaje urbano y vialidad." },
  { s: "humedales",  t: "resiliencia",tension: "disconnection", directa: true,  cat: "e1", pagina: "186", sustento: "Relación entre humedales y resiliencia climática afirmada (p. 186) pero sin mecanismos claros de protección operacional; contradicción con ALO (vía que atraviesa Capellanía)." },
  { s: "rios",       t: "paramos",    tension: "peripheral",    directa: true,  cat: "e1", pagina: "186", sustento: "Páramos como origen del agua (p. 186) pero fuera del territorio distrital; su protección depende de otras jurisdicciones sin pacto claro." },
  { s: "bosques",    t: "coberturas", tension: "incoherence",   directa: true,  cat: "e1", pagina: "186", sustento: "'100+ hectáreas de bosques urbanos' prometidas (p. 92) pero sin presupuesto específico ni fechas; competencia con densificación urbana." },
  { s: "resiliencia",t: "coberturas", tension: "contradiction",  directa: true,  cat: "e1", pagina: "186", sustento: "Resiliencia climática exige coberturas vegetales (p. 186) pero ciudad propone densificación de vivienda en zonas de vegetación." },
  { s: "reservas",   t: "coberturas", tension: "hierarchy",     directa: true,  cat: "e1", pagina: "186", sustento: "Reservas forestales como garantía de sostenibilidad (p. 186) pero su expansión es periférica respecto a inversiones de cuidado y movilidad." },
  { s: "areas",      t: "parques_m",  tension: "disconnection",  directa: false, cat: "e1", pagina: "186", sustento: "Áreas protegidas y parques de montaña desconectados en operación: conservación vs. uso público sin claridad sobre límites." },
  { s: "parque_b",   t: "paisajes",   tension: "incoherence",   directa: true,  cat: "e1", pagina: "186", sustento: "Parque de borde como protección del paisaje (p. 186) pero amenazado por proyectos de infraestructura; 'Reserva Forestal Thomas van der Hammen' bajo presión permanente." },

  /* === 2. Estructura Funcional y del Cuidado — 8 tensiones === */
  { s: "redvial",    t: "transporte", tension: "contradiction",  directa: true,  cat: "e2", pagina: "43", sustento: "Red vial dedicada a autos pero POT propone 'transporte público prioritario' (p. 43); inversiones reales enfocadas en autopistas (ALO, Caracas, Suba-Cota)." },
  { s: "corredores", t: "ciclorutas", tension: "incoherence",   directa: true,  cat: "e2", pagina: "43", sustento: "Corredores verdes y ciclorrutas como 'ejes de proximidad' (p. 43) pero diseño basado en automóvil; limitadas a ciclovías fragmentadas." },
  { s: "manzanas",   t: "sserv",      tension: "disconnection", directa: true,  cat: "e2", pagina: "43", sustento: "Manzanas del Cuidado articularían servicios sociales (p. 43) pero sin conexión clara con red de movilidad que determina acceso real; 30 minutos a pie es frontera invisible." },
  { s: "equip",      t: "scuidado",   tension: "disconnection", directa: false, cat: "e2", pagina: "43", sustento: "Equipamientos son anclas de servicios de cuidado (p. 43) pero distribuidos de forma fragmentada; 'acceso a 30 minutos' es promesa sin verificación." },
  { s: "vivienda",   t: "servpub",    tension: "hierarchy",     directa: false, cat: "e2", pagina: "43", sustento: "Servicios públicos como derecho básico pero subordinados a lógica de expansión periférica; miles de hogares aún sin conexión de agua potable." },
  { s: "equip",      t: "vivienda",   tension: "peripheral",    directa: true,  cat: "e2", pagina: "43", sustento: "Proximidad entre equipamientos y vivienda mencionada (p. 43) pero sin mecanismos; densificación y desplazamiento contradicen esta intención." },
  { s: "vivienda",   t: "ciclorutas", tension: "incoherence",   directa: false, cat: "e2", pagina: "43", sustento: "Ciclorutas como movilidad cotidiana desde vivienda (p. 43) pero solo 231 km programados para ciudad de 2770 km²; cobertura insuficiente." },
  { s: "parques",    t: "manzanas",   tension: "hierarchy",     directa: true,  cat: "e2", pagina: "43", sustento: "Parques como infraestructura de cuidado comunitario (p. 43) pero déficit de 6 m²/hab.; espacio público realmente para movilidad, no encuentro." },

  /* === 3. Estructura Socioeconómica Creativa e Innovación — 7 tensiones === */
  { s: "financieros",t: "empresariales", tension: "hierarchy",  directa: true,  cat: "e3", pagina: "239-241", sustento: "Centros financieros como base del crecimiento (p. 239-241) pero concentrados en norte; estructura subordinada a lógica de aglomeración capitalista vs. 'economía popular'." },
  { s: "tecnodistrito", t: "innovacion", tension: "incoherence", directa: true,  cat: "e3", pagina: "239-241", sustento: "Distrito tecnológico como nodo de innovación (p. 239-241) pero ubicado en zona de conflictividad ambiental (CTIB en reserva); contradice EEP." },
  { s: "industriales", t: "turismo", tension: "disconnection", directa: false, cat: "e3", pagina: "239-241", sustento: "Reconversión industrial a turismo (p. 239-241) sin claridad operacional; Restrepo (cueros) vs. destino turístico: son lógicas opuestas sin puente." },
  { s: "plazas",     t: "empresariales", tension: "contradiction", directa: false, cat: "e3", pagina: "239-241", sustento: "Plazas de mercado como 'economía local' (p. 43) pero POT favorece formalización y servicios empresariales; ambas demandan espacio público incompatible." },
  { s: "artesanal",  t: "turismo",      tension: "peripheral",   directa: false, cat: "e3", pagina: "239-241", sustento: "Producción artesanal mencionada (p. 239-241) pero sin instrumentos de protección; amenazada por renovación urbana y gentrificación." },
  { s: "abastecimiento", t: "plazas",  tension: "incoherence",  directa: false, cat: "e3", pagina: "239-241", sustento: "Cadena logística de alimentos (p. 239-241) pero inversiones en modernización corporativa vs. sistemas tradicionales de distribución." },
  { s: "empresariales", t: "tecnodistrito", tension: "hierarchy", directa: true, cat: "e3", pagina: "239-241", sustento: "Servicios empresariales sustentan innovación (p. 239-241) pero subordinados a inversión extranjera; economía local como periférica." },

  /* === 4. Estructura Integradora de Patrimonio — 3 tensiones === */
  { s: "sitios_sagrados", t: "pinmaterial", tension: "peripheral", directa: true, cat: "e4", pagina: "126", sustento: "Sitios sagrados como base del patrimonio (p. 126) pero mencionados una sola vez; Cabildo Muisca solicita reconocimiento sin claridad operacional." },
  { s: "pinmaterial",  t: "pnatural",    tension: "disconnection", directa: true, cat: "e4", pagina: "126", sustento: "Patrimonio inmaterial entrelazado con natural (p. 126) pero sin mecanismos de co-gestión con comunidades; apenas párrafos sobre operación." },
  { s: "pnatural",     t: "pecomaterial",tension: "hierarchy", directa: true, cat: "e4", pagina: "126", sustento: "Patrimonio natural como conservación de naturaleza (p. 126) pero subordinado a proyectos de infraestructura y densificación." },

  /* === CONEXIONES ENTRE ESTRUCTURAS === */
  /* EEP ↔ EFC */
  { s: "coberturas", t: "corredores", tension: "incoherence", directa: true, cat: "e1-e2", pagina: "92", sustento: "Corredores verdes como 'diseño ecosistémico' (p. 92) pero implementados como vías verdes sin protección real de coberturas; presión por densificación." },
  { s: "humedales", t: "manzanas", tension: "disconnection", directa: false, cat: "e1-e2", pagina: "43", sustento: "Manzanas del Cuidado rodean humedales en teoría (p. 43) pero sin conexión operacional; servicios de cuidado sin articulación con espacios verdes." },
  { s: "rios", t: "transporte", tension: "contradiction", directa: false, cat: "e1-e2", pagina: "43", sustento: "Ríos como ordenantes ecológicos (p. 92) pero transporte público prioriza vías arteriales que vulneran riberas; ALO versus Bogotá Reverdece." },
  
  /* EFC ↔ ESECI */
  { s: "redvial", t: "financieros", tension: "hierarchy", directa: false, cat: "e2-e3", pagina: "170", sustento: "Red vial conecta centros financieros (p. 170) pero infraestructura funcional subordinada a lógica económica capitalista; cuidado es periférico." },
  { s: "manzanas", t: "plazas", tension: "contradiction", directa: false, cat: "e2-e3", pagina: "43", sustento: "Manzanas integran plazas de mercado (p. 43) pero 'modernización' y formalización las desplazan; dos visiones incompatibles de economía urbana." },
  { s: "equip", t: "tecnodistrito", tension: "disconnection", directa: false, cat: "e2-e3", pagina: "170", sustento: "Equipamientos educativos albergan innovación (p. 170) pero sin claridad sobre dónde se ubicará CTIB; conflicto de usos del suelo." },

  /* ESECI ↔ Patrimonio */
  { s: "turismo", t: "pinmaterial", tension: "contradiction", directa: false, cat: "e3-e4", pagina: "239-241", sustento: "Turismo cultural reconoce patrimonio (p. 239-241) pero 'destino turístico inteligente' y mercantilización amenazan autenticidad del patrimonio inmaterial." },
  { s: "artesanal", t: "pnatural", tension: "incoherence", directa: false, cat: "e3-e4", pagina: "239-241", sustento: "Producción artesanal depende de naturaleza (p. 239-241) pero sin protección; renovación urbana desplaza áreas artesanales hacia periferia." },

  /* EEP ↔ Patrimonio */
  { s: "coberturas", t: "pecomaterial", tension: "hierarchy", directa: false, cat: "e1-e4", pagina: "126", sustento: "Coberturas son patrimonio ecológico material (p. 126) pero estructura de patrimonio apenas ocupa 3 páginas vs. 40 de movilidad; subordinación clara." },
  { s: "paisajes", t: "pinmaterial", tension: "peripheral", directa: false, cat: "e1-e4", pagina: "126", sustento: "Paisajes sostenibles integran patrimonio inmaterial (p. 126) pero sin mecanismos operacionales; conocimiento local mencionado sin protección." },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* Física: longitud de reposo */
RAW_TENSIONS.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

/* Defs: arrows + glow */
function buildDefs(svg) {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  
  const tensionTypes = Object.keys(TENSION_STYLE);
  tensionTypes.forEach(type => {
    const color = TENSION_STYLE[type].color;
    
    // Glow filter
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", `glow-${type}`);
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
    
    const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    feGaussianBlur.setAttribute("stdDeviation", "2");
    feGaussianBlur.setAttribute("result", "coloredBlur");
    filter.appendChild(feGaussianBlur);
    
    const feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
    const feMergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
    feMergeNode1.setAttribute("in", "coloredBlur");
    const feMergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
    feMergeNode2.setAttribute("in", "SourceGraphic");
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    
    // Arrow marker
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", `arrow-${type}`);
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "9");
    marker.setAttribute("refY", "3");
    marker.setAttribute("orient", "auto-start-reverse");
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0,0 L0,6 L9,3 z");
    path.setAttribute("fill", color);
    marker.appendChild(path);
    defs.appendChild(marker);
  });
  
  svg.appendChild(defs);
}

/* Render edges (tensiones) */
function drawEdges(svg) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", "edges-layer");

  RAW_TENSIONS.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", `edge-group`);
    group.setAttribute("data-index", i);
    group.setAttribute("data-tension", edge.tension);
    group.setAttribute("data-cat", edge.cat);
    group.setAttribute("data-source", s.id);
    group.setAttribute("data-target", t.id);

    const style = TENSION_STYLE[edge.tension];

    const d = `M ${s.x} ${s.y} L ${t.x} ${t.y}`;

    const hit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hit.setAttribute("d", d);
    hit.setAttribute("class", "ods-edge edge-hit");

    const visual = document.createElementNS("http://www.w3.org/2000/svg", "path");
    visual.setAttribute("d", d);
    visual.setAttribute("class", "ods-edge edge-visual");
    visual.setAttribute("stroke", style.color);
    visual.setAttribute("stroke-width", "2.8");
    if (!edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
    if (edge.directa) visual.setAttribute("marker-end", `url(#arrow-${edge.tension})`);
    visual.setAttribute("opacity", "0.85");

    group.appendChild(visual);
    group.appendChild(hit);
    group.addEventListener("click", () => showTensionInfo(i));
    g.appendChild(group);

    edge._el = { visual, hit, d };
  });

  svg.appendChild(g);
}

/* Render nodes */
function drawNodes(svg) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", `ods-node ods-node-${node.cat}`);
    group.setAttribute("data-id", node.id);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", node.r);
    circle.setAttribute("fill", node.color);
    circle.setAttribute("opacity", "0.92");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "central");
    text.setAttribute("font-size", "9px");
    text.setAttribute("font-weight", "700");
    text.setAttribute("fill", "#0a0e17");
    text.setAttribute("pointer-events", "none");
    text.textContent = node.name;

    group.appendChild(circle);
    group.appendChild(text);
    g.appendChild(group);

    node._el = { circle, text, group };
  });

  svg.appendChild(g);
}

/* Initialize */
function init() {
  const svg = document.getElementById("networkViz");
  buildDefs(svg);
  drawEdges(svg);
  drawNodes(svg);

  updateMetrics();
  populateTable();

  // Legend listeners
  document.querySelectorAll(".legend-item").forEach(item => {
    item.querySelector("input").addEventListener("change", refreshEdgeVisibility);
  });

  // Close panel
  document.getElementById("edgeInfoClose").addEventListener("click", hideTensionInfo);
}

/* Show tension info panel */
function showTensionInfo(index) {
  const edge = RAW_TENSIONS[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TENSION_STYLE[edge.tension];
  const struct = STRUCT_STYLE[edge.cat] || { label: "Conexión entre estructuras", color: "#fff" };

  document.getElementById("edgeInfoTitle").textContent = `${s.name.replace(/\n/g, " ")} → ${t.name.replace(/\n/g, " ")}`;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + " · " + struct.label + (edge.directa ? " · Directa" : " · Inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent = `Análisis crítico: p. ${edge.pagina}`;
  document.getElementById("edgeInfoPanel").classList.add("visible");

  // Highlight row
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => {
    row.classList.toggle("row-highlight", Number(row.dataset.edge) === index);
  });
}

function hideTensionInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.remove("row-highlight"));
}

/* Update metrics */
function updateMetrics() {
  document.getElementById("metricNodes").textContent = ODS_NODES.length;
  document.getElementById("metricTensions").textContent = RAW_TENSIONS.length;

  const counts = {};
  Object.keys(TENSION_STYLE).forEach(t => counts[t] = 0);
  RAW_TENSIONS.forEach(e => counts[e.tension]++);

  document.getElementById("metricIncoherence").textContent = counts.incoherence;
  document.getElementById("metricContradiction").textContent = counts.contradiction;
  document.getElementById("metricDisconnection").textContent = counts.disconnection;
  document.getElementById("metricHierarchy").textContent = counts.hierarchy;
  document.getElementById("metricPeripheral").textContent = counts.peripheral;

  const maxTension = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const maxNode = RAW_TENSIONS.filter(e => e.tension === maxTension).reduce((a, b) => {
    const aCount = RAW_TENSIONS.filter(t => t.s === a.s || t.t === a.s).length;
    const bCount = RAW_TENSIONS.filter(t => t.s === b.s || t.t === b.s).length;
    return aCount >= bCount ? a : b;
  });
  document.getElementById("metricIncTension").textContent = nodeById(maxNode.s).name.replace(/\n/g, " ");

  const density = ((RAW_TENSIONS.length * 2) / (ODS_NODES.length * (ODS_NODES.length - 1))) * 100;
  document.getElementById("metricTensionDensity").textContent = density.toFixed(1) + "%";
}

/* Populate table */
function populateTable() {
  const container = document.querySelector(".matrix-container");
  const header = container.querySelector(".matrix-row.header");

  RAW_TENSIONS.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    const style = TENSION_STYLE[edge.tension];
    const struct = STRUCT_STYLE[edge.cat] || { label: "Inter-estructuras" };

    const row = document.createElement("div");
    row.className = "matrix-row";
    row.dataset.edge = i;

    row.innerHTML = `
      <div class="matrix-cell"><span class="swatch-tag" style="background-color: ${struct.color}20; border-left: 3px solid ${struct.color};"></span> ${struct.label}</div>
      <div class="matrix-cell">${s.name.replace(/\n/g, " ")} ➞ ${t.name.replace(/\n/g, " ")}</div>
      <div class="matrix-cell">${edge.directa ? "Continua" : "Discontinua"}</div>
      <div class="matrix-cell"><span class="legend-swatch" style="border-color: ${style.color};"></span> ${style.label}</div>
      <div class="matrix-cell">p. ${edge.pagina}</div>
      <div class="matrix-cell quote-cell">${edge.sustento}</div>
    `;

    row.addEventListener("click", () => showTensionInfo(i));
    container.appendChild(row);
  });
}

/* Filter network */
const tensionOff = new Set();
const nodeOff = new Set();
const catOff = new Set();

function filterNetwork(filter) {
  tensionOff.clear();
  nodeOff.clear();
  catOff.clear();

  if (filter !== "all") {
    if (Object.keys(TENSION_STYLE).includes(filter)) {
      Object.keys(TENSION_STYLE).forEach(t => {
        if (t !== filter) tensionOff.add(t);
      });
    } else if (filter.startsWith("e")) {
      Object.keys(STRUCT_STYLE).forEach(c => {
        if (c !== filter) catOff.add(c);
      });
    }
  }

  refreshEdgeVisibility();
  document.querySelectorAll(".control-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(group => {
    const tension = group.dataset.tension;
    const cat = group.dataset.cat;
    const s = group.dataset.source;
    const t = group.dataset.target;
    const hidden = tensionOff.has(tension) || nodeOff.has(s) || nodeOff.has(t) || catOff.has(cat);
    group.classList.toggle("hidden-edge", hidden);
  });
}

function toggleInsight(insight) {
  if (insight === "todas") {
    tensionOff.clear();
    nodeOff.clear();
    catOff.clear();
  } else {
    const isActive = tensionOff.has(insight);
    if (isActive) {
      tensionOff.delete(insight);
    } else {
      Object.keys(TENSION_STYLE).forEach(t => {
        if (t !== insight) tensionOff.add(t);
      });
    }
  }
  refreshEdgeVisibility();
}

/* Actions */
function generateTensionReport() {
  alert("Generando reporte de tensiones...");
}

function downloadTensionTable() {
  alert("Descargando tabla...");
}

function shareAnalysis() {
  alert("Compartiendo análisis...");
}

/* Start */
document.addEventListener("DOMContentLoaded", init);
