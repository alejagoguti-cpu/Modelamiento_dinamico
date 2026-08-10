/* ==========================================================
   MÓDULO 01 — CONSTRUIR LA RED — RED INTEGRAL DE LAS 4 ESTRUCTURAS DEL POT
   (v2: estructura visual del Módulo 02 — red interactiva + métricas)

   Las 4 estructuras del POT como capas de una sola red:
   1. Estructura Ecológica Principal ......... VERDE  (#4ade80)
   2. Estructura Funcional y del Cuidado ..... AZUL   (#5b8def)
   3. Estructura Socioeconómica Creativa e Innovación .. NARANJA (#ef9552)
   4. Estructura Integradora de Patrimonio ... MORADA (#a276f2)

   Tipos de relación:
   - soporte:    naranja #ef9552
   - resiliencia: azul    #5b8def
   - indirecta:  gris     #8b93a8 (discontinua, sin flecha)

   Líneas: continua (directa, con flecha) / discontinua (inferida o indirecta)
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- Nodos: los componentes de las 4 estructuras -------- */
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
  { id: "redvial",    cat: "e2", pagina: "43", name: "RED\nVIAL",                  icon: "fa-road",          color: "#5b8def", x: 1240, y: 90,  r: 48 },
  { id: "transporte", cat: "e2", pagina: "43", name: "TRANSPORTE\nPÚBLICO",        icon: "fa-bus",           color: "#5b8def", x: 960,  y: 330, r: 52 },
  { id: "corredores", cat: "e2", pagina: "43", name: "CORREDORES\nVERDES",         icon: "fa-route",         color: "#5b8def", x: 700,  y: 140, r: 50 },
  { id: "ciclorutas", cat: "e2", pagina: "43", name: "CICLORRUTAS",                icon: "fa-person-biking", color: "#5b8def", x: 1390, y: 330, r: 46 },
  { id: "equip",      cat: "e2", pagina: "43", name: "EQUIPAMIENTOS",              icon: "fa-school",        color: "#5b8def", x: 1250, y: 620, r: 50 },
  { id: "manzanas",   cat: "e2", pagina: "43", name: "MANZANAS\nDEL CUIDADO",      icon: "fa-people-roof",   color: "#5b8def", x: 1470, y: 640, r: 52 },
  { id: "sserv",      cat: "e2", pagina: "43", name: "SERVICIOS\nSOCIALES",        icon: "fa-hand-holding-heart", color: "#5b8def", x: 1370, y: 760, r: 46 },
  { id: "parques",    cat: "e2", pagina: "43", name: "PARQUES",                    icon: "fa-tree-city",     color: "#5b8def", x: 1100, y: 760, r: 46 },
  { id: "scuidado",   cat: "e2", pagina: "43", name: "SERVICIOS\nDE CUIDADO",      icon: "fa-heart-pulse",   color: "#5b8def", x: 1230, y: 470, r: 46 },
  { id: "vivienda",   cat: "e2", pagina: "43", name: "VIVIENDA",                   icon: "fa-house",         color: "#5b8def", x: 950,  y: 520, r: 50 },
  { id: "servpub",    cat: "e2", pagina: "43", name: "SERVICIOS\nPÚBLICOS",        icon: "fa-bolt",          color: "#5b8def", x: 820,  y: 770, r: 46 },

  /* 3. Estructura Socioeconómica Creativa e Innovación — NARANJA */
  { id: "financieros", cat: "e3", pagina: "239-241", name: "CENTROS\nFINANCIEROS",      icon: "fa-building-columns", color: "#ef9552", x: 1700, y: 190, r: 48 },
  { id: "empresariales", cat: "e3", pagina: "239-241", name: "SERVICIOS\nEMPRESARIALES", icon: "fa-briefcase",      color: "#ef9552", x: 1920, y: 120, r: 50 },
  { id: "tecnodistrito", cat: "e3", pagina: "239-241", name: "DISTRITO\nTECNOLÓGICO",   icon: "fa-microchip",      color: "#ef9552", x: 2110, y: 270, r: 48 },
  { id: "industriales",  cat: "e3", pagina: "239-241", name: "ZONAS\nINDUSTRIALES",     icon: "fa-industry",       color: "#ef9552", x: 1860, y: 360, r: 48 },
  { id: "innovacion",    cat: "e3", pagina: "239-241", name: "INNOVACIÓN",              icon: "fa-lightbulb",      color: "#ef9552", x: 2080, y: 470, r: 46 },
  { id: "abastecimiento",cat: "e3", pagina: "239-241", name: "CENTROS DE\nABASTECIMIENTO", icon: "fa-truck",      color: "#ef9552", x: 1700, y: 430, r: 48 },
  { id: "plazas",        cat: "e3", pagina: "239-241", name: "PLAZAS\nDE MERCADO",      icon: "fa-store",          color: "#ef9552", x: 1900, y: 530, r: 46 },
  { id: "turismo",       cat: "e3", pagina: "239-241", name: "ZONAS DE\nINTERÉS\nTURÍSTICO", icon: "fa-map-location-dot", color: "#ef9552", x: 2090, y: 660, r: 46 },
  { id: "artesanal",     cat: "e3", pagina: "239-241", name: "PRODUCCIÓN\nARTESANAL",   icon: "fa-palette",        color: "#ef9552", x: 1680, y: 640, r: 46 },

  /* 4. Estructura Integradora de Patrimonio — MORADA */
  { id: "sitios_sagrados", cat: "e4", pagina: "126", name: "SISTEMA DE\nSITIOS\nSAGRADOS", icon: "fa-place-of-worship", color: "#a276f2", x: 2360, y: 200, r: 50 },
  { id: "pinmaterial",     cat: "e4", pagina: "126", name: "PATRIMONIO\nINMATERIAL",    icon: "fa-masks-theater",    color: "#a276f2", x: 2500, y: 440, r: 50 },
  { id: "pnatural",        cat: "e4", pagina: "126", name: "PATRIMONIO\nNATURAL",       icon: "fa-globe",              color: "#a276f2", x: 2650, y: 180, r: 48 },
  { id: "pecomaterial",    cat: "e4", pagina: "126", name: "PATRIMONIO ECOLÓGICO\nMATERIAL", icon: "fa-leaf",          color: "#a276f2", x: 2650, y: 640, r: 50 },
];

ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* -------- Estructuras: nombre y color de capa -------- */
const STRUCT_STYLE = {
  e1: { color: "#4ade80", label: "1. Ecológica Principal", tag: "ECOLÓGICA" },
  e2: { color: "#5b8def", label: "2. Funcional y del Cuidado", tag: "FUNCIONAL Y CUIDADO" },
  e3: { color: "#ef9552", label: "3. Socioeconómica Creativa", tag: "SOCIOECONÓMICA" },
  e4: { color: "#a276f2", label: "4. Integradora de Patrimonio", tag: "PATRIMONIO" },
};

/* -------- Tipos de relación -------- */
const TYPE_STYLE = {
  soporte:     { color: "#ef9552", width: 2.6, label: "Soporte" },
  resiliencia: { color: "#5b8def", width: 2.6, label: "Resiliencia" },
  indirecta:   { color: "#8b93a8", width: 2.4, label: "Indirecta" },
};

/* -------- Aristas: relaciones de las 4 estructuras -------- */
const RAW_EDGES = [
  /* === 1. Estructura Ecológica Principal (verde) === */
  { s: "cerros",     t: "rios",       type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los cerros orientales son los corredores montañosos de la estructura ecológica: contienen y alimentan los ríos que descienden al valle." },
  { s: "quebradas",  t: "humedales",  type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Las quebradas de la Sabana alimentan los humedales: su caudal mantiene la lámina de agua y la vida del ecosistema." },
  { s: "humedales",  t: "rios",       type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los humedales regulan los ríos de la Sabana: amortiguan crecientes, sedimentan y depuran el agua que circula por la cuenca." },
  { s: "humedales",  t: "resiliencia",type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los humedales son parte de las áreas de resiliencia climática: absorben el exceso hídrico y reducen el riesgo de inundación." },
  { s: "rios",       t: "paramos",    type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los ríos de la Sabana nacen en los complejos de páramos: la agua que llega a la ciudad depende de esos ecosistemas altoandinos." },
  { s: "bosques",    t: "coberturas", type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los bosques urbanos integran y sostienen las coberturas vegetales de la ciudad." },
  { s: "resiliencia",t: "coberturas", type: "resiliencia", directa: true,  cat: "e1", pagina: "186", sustento: "Las áreas de resiliencia climática dependen de las coberturas vegetales para su funcionamiento: sin vegetación no hay regulación térmica ni hídrica." },
  { s: "reservas",   t: "coberturas", type: "resiliencia", directa: true,  cat: "e1", pagina: "186", sustento: "Las reservas forestales sostienen las coberturas vegetales: garantizan suelo protegido y continuidad de la vegetación." },
  { s: "cerros",     t: "areas",      type: "indirecta",   directa: false, cat: "e1", pagina: "186", sustento: "Los cerros orientales se vinculan con las áreas protegidas de manera indirecta: no toda su extensión está bajo régimen de protección, aunque la protege parcialmente." },
  { s: "areas",      t: "parques_m",  type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Las áreas protegidas contienen a los parques ecológicos de montaña: el régimen de protección habilita su existencia." },
  { s: "areas",      t: "reservas",   type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Las áreas protegidas dan origen a las reservas forestales: la protección jurídica habilita la reserva como figura de conservación." },
  { s: "parques_m",  t: "coberturas", type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Los parques ecológicos de montaña aportan sus coberturas vegetales al sistema ecológico urbano." },
  { s: "humedales",  t: "coberturas", type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Los humedales contribuyen a las coberturas vegetales del sistema ecológico: su vegetación palustre es cobertura viva." },
  { s: "coberturas", t: "parque_b",   type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Las coberturas vegetales sostienen el parque de borde: la franja verde que separa la ciudad del campo depende de ellas." },
  { s: "paramos",    t: "paisajes",   type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Los complejos de páramos sustentan los paisajes sostenibles de la región: su conservación es condición de la sostenibilidad del territorio." },

  /* === 2. Estructura Funcional y del Cuidado (azul) === */
  { s: "redvial",    t: "transporte", type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "La red vial es la infraestructura que hace posible el transporte público: sin corredores viales no hay sistema de buses ni Metro." },
  { s: "redvial",    t: "equip",      type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "La red vial conecta y da acceso a los equipamientos educativos, de salud y comunitarios de la ciudad." },
  { s: "corredores", t: "transporte", type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Los corredores verdes alimentan y complementan el transporte público: alojan buses eléctricos e integran movilidad y ecosistema." },
  { s: "corredores", t: "ciclorutas", type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Los corredores verdes contienen ciclorrutas seguras: la cicloinfraestructura se integra a su diseño." },
  { s: "manzanas",   t: "sserv",      type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Las Manzanas del Cuidado cualifican los servicios sociales del Distrito y hacen efectiva la articulación interinstitucional." },
  { s: "manzanas",   t: "parques",    type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Las Manzanas del Cuidado aprovechan los parques como infraestructura de encuentro y cuidado comunitario." },
  { s: "equip",      t: "scuidado",   type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "Los equipamientos existen como anclas de los servicios de cuidado: la relación es inferida de la política de anclaje en equipamientos preexistentes." },
  { s: "equip",      t: "sserv",      type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "Los equipamientos se vinculan con los servicios sociales: la articulación de entidades del Distrito opera a través de ellos." },
  { s: "equip",      t: "vivienda",   type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Los equipamientos educativos deben estar cerca de la vivienda: la proximidad es prioridad de la estructura funcional." },
  { s: "vivienda",   t: "servpub",    type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "La vivienda depende de los servicios públicos: la relación es inferida de la condición básica de habitabilidad." },
  { s: "vivienda",   t: "ciclorutas", type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "La vivienda se vincula con las ciclorrutas: el acceso ciclistas desde el barrio es condición de movilidad cotidiana." },
  { s: "vivienda",   t: "transporte", type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "La vivienda se conecta con el transporte público: la accesibilidad determina la calidad de vida de los hogares." },

  /* === 3. Estructura Socioeconómica Creativa e Innovación (naranja) === */
  { s: "financieros",t: "empresariales", type: "soporte", directa: true,  cat: "e3", pagina: "239-241", sustento: "Los centros financieros sostienen los servicios empresariales: el capital y la banca financian la economía del conocimiento." },
  { s: "empresariales", t: "tecnodistrito", type: "soporte", directa: true, cat: "e3", pagina: "239-241", sustento: "Los servicios empresariales alimentan el distrito tecnológico: proveen demanda, clientes y profesionalización." },
  { s: "empresariales", t: "industriales", type: "soporte", directa: true,  cat: "e3", pagina: "239-241", sustento: "Los servicios empresariales sirven a las zonas industriales: logística, diseño, comercio y gestión." },
  { s: "tecnodistrito", t: "innovacion", type: "soporte", directa: true,   cat: "e3", pagina: "239-241", sustento: "El distrito tecnológico genera innovación: es el nodo que concentra emprendimiento y economía creativa." },
  { s: "abastecimiento", t: "plazas", type: "soporte",     directa: false, cat: "e3", pagina: "239-241", sustento: "Los centros de abastecimiento abastecen las plazas de mercado: la relación logística es inferida de la cadena de distribución de alimentos." },
  { s: "plazas",     t: "empresariales", type: "soporte", directa: false,  cat: "e3", pagina: "239-241", sustento: "Las plazas de mercado se vinculan con los servicios empresariales: el comercio local se integra a la economía formal de servicios." },
  { s: "industriales", t: "turismo", type: "soporte",      directa: false, cat: "e3", pagina: "239-241", sustento: "Las zonas industriales se relacionan con las zonas de interés turístico: la reconversión y el turismo industrial son vías de interés económico." },
  { s: "artesanal",  t: "turismo",      type: "soporte",   directa: false, cat: "e3", pagina: "239-241", sustento: "La producción artesanal alimenta las zonas de interés turístico: la cultura material local atrae y sostiene el turismo cultural." },

  /* === 4. Estructura Integradora de Patrimonio (morada) === */
  { s: "sitios_sagrados", t: "pinmaterial", type: "resiliencia", directa: true, cat: "e4", pagina: "126", sustento: "El sistema de sitios sagrados sostiene el patrimonio inmaterial: las prácticas, rituales y memorias se arraigan en esos lugares." },
  { s: "pinmaterial",  t: "pnatural",    type: "resiliencia", directa: true, cat: "e4", pagina: "126", sustento: "El patrimonio inmaterial se entrelaza con el patrimonio natural: los saberes y usos tradicionales dependen de los ecosistemas." },
  { s: "pnatural",     t: "pecomaterial",type: "resiliencia", directa: true, cat: "e4", pagina: "126", sustento: "El patrimonio natural integra el patrimonio ecológico material: la conservación de la naturaleza es parte del patrimonio colectivo." },

  /* === CONEXIONES ENTRE ESTRUCTURAS === */
  /* EEP ↔ EFC */
  { s: "coberturas", t: "corredores", type: "soporte", directa: true, cat: "e1-e2", pagina: "92", sustento: "Los corredores verdes tienen diseño ecosistémico integrado a las coberturas vegetales: el espacio público para movilidad sostiene la conectividad de la estructura ecológica." },
  { s: "humedales", t: "manzanas", type: "soporte", directa: false, cat: "e1-e2", pagina: "43", sustento: "Los humedales y áreas de resiliencia climática rodean y sustentam las Manzanas del Cuidado: la infraestructura de servicios de cuidado se integra a espacios verdes." },
  { s: "rios", t: "transporte", type: "soporte", directa: false, cat: "e1-e2", pagina: "43", sustento: "Los ríos estructuran los corredores de transporte público: el drenaje sostenible y el trasporte se articulan en el mismo espacio." },
  
  /* EFC ↔ ESECI */
  { s: "redvial", t: "financieros", type: "soporte", directa: false, cat: "e2-e3", pagina: "170", sustento: "La red vial conecta los centros financieros con las aglomeraciones económicas de la ciudad: la infraestructura funcional habilita la concentración de servicios empresariales." },
  { s: "manzanas", t: "plazas", type: "soporte", directa: false, cat: "e2-e3", pagina: "43", sustento: "Las Manzanas del Cuidado integran a las plazas de mercado como infraestructura de economía local y distribución: el comercio tradicional es sostén de la vida cotidiana." },
  { s: "equip", t: "tecnodistrito", type: "soporte", directa: false, cat: "e2-e3", pagina: "170", sustento: "Los equipamientos de educación superior albergan nodos del distrito tecnológico: la investigación y la innovación se localizan en infraestructura de formación." },

  /* ESECI ↔ Patrimonio */
  { s: "turismo", t: "pinmaterial", type: "soporte", directa: false, cat: "e3-e4", pagina: "239-241", sustento: "Las zonas de interés turístico se articulan con el patrimonio inmaterial: el turismo cultural reconoce y dinamiza los saberes y prácticas locales de la ciudad." },
  { s: "artesanal", t: "pnatural", type: "soporte", directa: false, cat: "e3-e4", pagina: "239-241", sustento: "La producción artesanal depende del patrimonio natural: los saberes artesanales de materiales locales se arraigan en los ecosistemas." },

  /* EEP ↔ Patrimonio */
  { s: "coberturas", t: "pecomaterial", type: "resiliencia", directa: false, cat: "e1-e4", pagina: "126", sustento: "Las coberturas vegetales son patrimonio ecológico material: la continuidad de los ecosistemas urbanos sostiene la herencia natural de la ciudad." },
  { s: "paisajes", t: "pinmaterial", type: "soporte", directa: false, cat: "e1-e4", pagina: "126", sustento: "Los paisajes sostenibles integran el patrimonio inmaterial: el conocimiento local sobre territorio y ambiente se enraiza en el paisaje vivido." },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- física: longitud de reposo -------- */
RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

/* -------- defs: glow + flechas -------- */
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

/* -------- aristas -------- */
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

    group.appendChild(visual);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(i));
    g.appendChild(group);

    edge._el = { visual, hit, d };
  });

  svg.appendChild(g);
}

/* -------- nodos -------- */
function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node ods-node-" + node.cat);
    group.setAttribute("data-id", node.id);
    group.setAttribute("data-cat", node.cat);

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

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon + " node-icon");
    iconEl.setAttribute("style", `color:${node.color}; font-size:${node.r * 0.42}px; margin:1px 0;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("class", "node-name");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.155, 7.5)}px; padding:0 3px; font-weight:700; color:#e7eaf2; line-height:1.15; white-space:pre-line;`);
    nameEl.textContent = node.name;

    const tagEl = document.createElementNS(XHTML_NS, "div");
    tagEl.setAttribute("class", "node-cat-tag");
    tagEl.setAttribute("style", `font-size:${Math.max(node.r * 0.135, 6.5)}px; margin-top:1px; font-weight:700; letter-spacing:0.3px; color:${node.color}; white-space:nowrap;`);
    tagEl.textContent = STRUCT_STYLE[node.cat].tag;

    wrapper.appendChild(iconEl); wrapper.appendChild(nameEl); wrapper.appendChild(tagEl);
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

/* -------- física -------- */
const PHYSICS = {
  spring: 0.045,
  anchor: 0.02,
  damping: 0.82,
  minVel: 0.02,
};

function updatePositions() {
  ODS_NODES.forEach(n => {
    if (!n._el) return;
    n._el.circle.setAttribute("cx", n.x);
    n._el.circle.setAttribute("cy", n.y);
    const size = n.r * 2.2;
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

/* -------- arrastre -------- */
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

/* -------- panel de información -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];
  const struct = STRUCT_STYLE[edge.cat];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  const label = (n) => n.name.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = `${label(s)} → ${label(t)}`;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + " · " + struct.label + (edge.directa ? " · Directa — continua" : " · Indirecta / inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

    document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent =
    (edge.pagina ? `Página POT: p. ${edge.pagina} · ` : "") + "Estructura POT: " + struct.label;
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
const catOff = new Set();

function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type;
    const cat = group.dataset.cat;
    const s = group.dataset.source;
    const t = group.dataset.target;
    const hidden = typeOff.has(type) || nodeOff.has(s) || nodeOff.has(t) || catOff.has(cat);
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

/* -------- clic simple / doble / triple -------- */
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

function setSpotlightCats(cats, keepAllNodes) {
  spotlight = { mode: "cats", cats, keepAllNodes: !!keepAllNodes };
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
  } else if (spotlight && spotlight.mode === "cats") {
    visibleNodes = new Set();
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      if (spotlight.cats.includes(edge.cat)) {
        visibleEdges.add(i);
        visibleNodes.add(edge.s);
        visibleNodes.add(edge.t);
      }
    });
    if (spotlight.keepAllNodes) {
      ODS_NODES.forEach(n => visibleNodes.add(n.id));
    }
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
  ecologica:     ODS_NODES.filter(n => n.cat === "e1").map(n => n.id),
  funcional:     ODS_NODES.filter(n => n.cat === "e2").map(n => n.id),
  socioeconomica:ODS_NODES.filter(n => n.cat === "e3").map(n => n.id),
  patrimonio:    ODS_NODES.filter(n => n.cat === "e4").map(n => n.id),
};

const TYPE_KEY = {
  soporte:     "soporte",
  resiliencia: "resiliencia",
  indirecta:   "indirecta",
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
  } else if (NODE_INSIGHTS[key] && NODE_INSIGHTS[key].length) {
    setSpotlightCats(NODE_INSIGHTS[key].map(id => nodeById(id).cat), true);
    NODE_INSIGHTS[key].forEach(id => {
      const el = document.querySelector(`.ods-node[data-id="${id}"]`);
      if (el) el.classList.add("node-focus-active");
    });
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
      const mode = item.dataset.mode;
      const val = item.dataset.type || item.dataset.cat;
      if (e.target.checked) {
        if (mode === "type") typeOff.delete(val); else catOff.delete(val);
      } else {
        if (mode === "type") typeOff.add(val); else catOff.add(val);
      }
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });

  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
}

/* -------- filtros -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");

  const groups = {
    all:     { types: ["soporte", "resiliencia", "indirecta"], cats: ["e1", "e2", "e3", "e4"] },
    soporte:     { types: ["soporte"],             cats: ["e1", "e2", "e3", "e4"] },
    resiliencia: { types: ["resiliencia"],         cats: ["e1", "e2", "e3", "e4"] },
    indirecta:   { types: ["indirecta"],           cats: ["e1", "e2", "e3", "e4"] },
    e1:          { types: ["soporte", "resiliencia", "indirecta"], cats: ["e1"] },
    e2:          { types: ["soporte", "resiliencia", "indirecta"], cats: ["e2"] },
    e3:          { types: ["soporte", "resiliencia", "indirecta"], cats: ["e3"] },
    e4:          { types: ["soporte", "resiliencia", "indirecta"], cats: ["e4"] },
  };
  const active = groups[mode] || groups.all;

  document.querySelectorAll(".legend-item[data-mode='type']").forEach(item => {
    const type = item.dataset.type;
    const input = item.querySelector("input");
    const show = active.types.includes(type);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) typeOff.delete(type); else typeOff.add(type);
  });

  document.querySelectorAll(".legend-item[data-mode='cat']").forEach(item => {
    const cat = item.dataset.cat;
    const input = item.querySelector("input");
    const show = active.cats.includes(cat);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) catOff.delete(cat); else catOff.add(cat);
  });

  refreshEdgeVisibility();
}

/* -------- métricas de red -------- */
function computeMetrics() {
  const nodeCount = ODS_NODES.length;
  const edgeCount = RAW_EDGES.length;

  const degrees = {};
  ODS_NODES.forEach(n => { degrees[n.id] = 0; });
  RAW_EDGES.forEach(e => { degrees[e.s] = (degrees[e.s] || 0) + 1; degrees[e.t] = (degrees[e.t] || 0) + 1; });

  const avgDegree = (2 * edgeCount) / nodeCount;
  const density = (2 * edgeCount) / (nodeCount * (nodeCount - 1));

  /* grado máximo y nodo más conectado */
  let maxId = null, maxDeg = 0;
  ODS_NODES.forEach(n => { if (degrees[n.id] > maxDeg) { maxDeg = degrees[n.id]; maxId = n.id; } });

  /* por estructura */
  const byStruct = {};
  Object.keys(STRUCT_STYLE).forEach(cat => {
    byStruct[cat] = {
      nodes: ODS_NODES.filter(n => n.cat === cat).length,
      edges: RAW_EDGES.filter(e => e.cat === cat).length,
    };
  });

  /* centralidad: hubs (grado >= 4) */
  const hubs = ODS_NODES.filter(n => degrees[n.id] >= 4);

  /* tipo de línea */
  const cont = RAW_EDGES.filter(e => e.directa).length;
  const disc = RAW_EDGES.filter(e => !e.directa).length;

  return { nodeCount, edgeCount, avgDegree, density, maxId, maxDeg, byStruct, hubs, cont, disc, degrees };
}

function renderMetrics() {
  const m = computeMetrics();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set("metricNodes", m.nodeCount);
  set("metricEdges", m.edgeCount);
  set("metricAvgDegree", m.avgDegree.toFixed(2));
  set("metricDensity", (m.density * 100).toFixed(1) + "%");

  const maxNode = nodeById(m.maxId);
  set("metricHubNode", maxNode ? maxNode.name.replace(/\n/g, " ") : "—");
  set("metricHubDegree", m.maxDeg);
  set("metricHubs", m.hubs.length);
  set("metricCont", m.cont);
  set("metricDisc", m.disc);

  /* leyenda de contadores por estructura */
  Object.keys(STRUCT_STYLE).forEach(cat => {
    const el = document.getElementById("struct-" + cat);
    if (el) el.textContent = `${byStructLabel(m, cat)}: ${m.byStruct[cat].nodes} nodos · ${m.byStruct[cat].edges} relaciones`;
  });
}

function byStructLabel(m, cat) { return STRUCT_STYLE[cat].label; }

/* -------- botones de acción -------- */
function generateODSReport() { console.log("Generando reporte de red..."); }
function downloadAlignment() { console.log("Descargando tabla de relaciones..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
  renderMetrics();
});
