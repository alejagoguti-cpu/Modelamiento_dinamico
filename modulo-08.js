/* ==========================================================
   UN NUEVO MODELO DE LECTURA — Módulo 08
   Implementa la metodología del paper "Un nuevo modelo de lectura
   para un territorio dinámico":
   - Los COMPONENTES TERRITORIALES son los mismos ya documentados en
     las 4 estructuras del POT (Construir la Red, módulo 01): EEP, EFS,
     ESE y EIP, aquí consolidados en una sola red.
   - Los ACTORES y MEDIADORES son nodos independientes (no partes de un
     componente): se activan con "Activar Dimensión Dinámica".
   - Las SITUACIONES no agregan nodos: cambian intensidad/opacidad de
     relaciones ya existentes (hora pico, lluvias, obras, etc.).
   - Color de nodo = estructura de referencia. Ícono = tipo de nodo.
   - Línea continua = directa documentada. Punteada = indirecta o
     interpretativa. Flecha = dirección sustentada. Grosor = intensidad.

   NOTA: las citas y páginas del POT reutilizan, donde el par de
   componentes coincide, el mismo sustento documental del módulo 01.
   Las relaciones que cruzan estructuras (p. ej. Humedales–Servicios
   empresariales) son interpretativas y están marcadas como tal —
   reemplázalas por la cita exacta si cuentas con ella.
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

const STRUCT_COLOR = {
  eco: "#2fd4c8",
  func: "#f5a623",
  patrim: "#f76fb0",
  actor: "#eef0f6",
  mediador: "#7d8ea3",
};

/* -------- Componentes territoriales (31, red consolidada del POT) -------- */
const BASE_NODES = [
  { id: "quebradas", name: "QUEBRADAS", icon: "fa-water", struct: "eco", x: 171, y: 69, r: 24 },
  { id: "complejo_paramos", name: "COMPLEJO DE\nPÁRAMOS", icon: "fa-mountain-sun", struct: "eco", x: 337, y: 71, r: 24 },
  { id: "reservas_forestales", name: "RESERVAS\nFORESTALES", icon: "fa-tree", struct: "eco", x: 284, y: 131, r: 29 },
  { id: "areas_protegidas", name: "ÁREAS\nPROTEGIDAS", icon: "fa-shield", struct: "eco", x: 166, y: 168, r: 27 },
  { id: "areas_resiliencia", name: "ÁREAS DE\nRESILIENCIA", icon: "fa-cloud-sun", struct: "eco", x: 70, y: 201, r: 26 },
  { id: "humedales", name: "HUMEDALES", icon: "fa-droplet", struct: "eco", x: 250, y: 232, r: 54 },
  { id: "rios", name: "RÍOS", icon: "fa-water", struct: "eco", x: 162, y: 296, r: 32 },
  { id: "coberturas_vegetales", name: "COBERTURAS\nVEGETALES", icon: "fa-spa", struct: "eco", x: 116, y: 359, r: 32 },

  { id: "corredores_verdes", name: "CORREDORES\nVERDES", icon: "fa-leaf", struct: "func", x: 748, y: 180, r: 27 },
  { id: "transporte_publico", name: "TRANSPORTE\nPÚBLICO", icon: "fa-bus", struct: "func", x: 499, y: 123, r: 38 },
  { id: "servicios_sociales", name: "SERVICIOS\nSOCIALES", icon: "fa-hand-holding-heart", struct: "func", x: 450, y: 54, r: 24 },
  { id: "equipamientos", name: "EQUIPAMIENTOS", icon: "fa-building", struct: "func", x: 600, y: 109, r: 34 },
  { id: "ciclorrutas", name: "CICLORRUTAS", icon: "fa-bicycle", struct: "func", x: 643, y: 37, r: 24 },
  { id: "vivienda", name: "VIVIENDA", icon: "fa-house", struct: "func", x: 561, y: 207, r: 58 },
  { id: "red_vial", name: "RED VIAL", icon: "fa-road", struct: "func", x: 664, y: 193, r: 29 },
  { id: "manzanas_cuidado", name: "MANZANAS\nDEL CUIDADO", icon: "fa-share-nodes", struct: "func", x: 627, y: 289, r: 32 },
  { id: "parques", name: "PARQUES", icon: "fa-tree-city", struct: "func", x: 682, y: 355, r: 24 },

  { id: "servicios_empresariales", name: "SERVICIOS\nEMPRESARIALES", icon: "fa-briefcase", struct: "func", x: 355, y: 466, r: 52 },
  { id: "produccion_artesanal", name: "PRODUCCIÓN\nARTESANAL", icon: "fa-gem", struct: "func", x: 243, y: 441, r: 24 },
  { id: "centros_financieros", name: "CENTROS\nFINANCIEROS", icon: "fa-building-columns", struct: "func", x: 156, y: 468, r: 24 },
  { id: "plazas_mercado", name: "PLAZAS DE\nMERCADO", icon: "fa-store", struct: "func", x: 250, y: 532, r: 24 },
  { id: "zonas_industriales", name: "ZONAS\nINDUSTRIALES", icon: "fa-industry", struct: "func", x: 470, y: 495, r: 34 },
  { id: "distrito_tecnologico", name: "DISTRITO CENTRO\nTECNOLÓGICO", icon: "fa-share-nodes", struct: "func", x: 423, y: 577, r: 27 },
  { id: "sistema_educacion", name: "SISTEMA DE\nEDUCACIÓN", icon: "fa-graduation-cap", struct: "func", x: 323, y: 589, r: 27 },
  { id: "zonas_interes_turistico", name: "ZONAS INTERÉS\nTURÍSTICO", icon: "fa-map-location-dot", struct: "func", x: 531, y: 559, r: 24 },
  { id: "centros_abastecimiento", name: "CENTROS DE\nABASTECIMIENTO", icon: "fa-truck", struct: "func", x: 304, y: 657, r: 24 },

  { id: "patrimonio_material", name: "PATRIMONIO\nMATERIAL", icon: "fa-landmark", struct: "patrim", x: 664, y: 484, r: 34 },
  { id: "patrimonio_natural", name: "PATRIMONIO\nNATURAL", icon: "fa-mountain", struct: "patrim", x: 759, y: 462, r: 34 },
  { id: "patrimonio_inmaterial", name: "PATRIMONIO\nINMATERIAL", icon: "fa-masks-theater", struct: "patrim", x: 699, y: 577, r: 27 },
  { id: "patrimonio_arqueologico", name: "PATRIMONIO\nARQUEOLÓGICO", icon: "fa-monument", struct: "patrim", x: 729, y: 654, r: 24 },
  { id: "comunidades_patrimonio", name: "SITIOS\nSAGRADOS", icon: "fa-place-of-worship", struct: "patrim", x: 834, y: 450, r: 27 },
];

/* -------- Actores: nodos independientes, no partes de un componente -------- */
const ACTOR_NODES = [
  { id: "habitantes", name: "HABITANTES", icon: "fa-person", x: 395, y: 150, r: 22 },
  { id: "estudiantes", name: "ESTUDIANTES", icon: "fa-user-graduate", x: 130, y: 610, r: 22 },
  { id: "trabajadores", name: "TRABAJADORES", icon: "fa-user-tie", x: 600, y: 600, r: 22 },
  { id: "personas_cuidadoras", name: "PERSONAS\nCUIDADORAS", icon: "fa-hands-holding-child", x: 800, y: 280, r: 22 },
  { id: "comunidades_actor", name: "COMUNIDADES", icon: "fa-people-group", x: 50, y: 330, r: 22 },
  { id: "operadores_transporte", name: "OPERADORES DE\nTRANSPORTE", icon: "fa-id-badge", x: 820, y: 90, r: 22 },
  { id: "aves", name: "AVES", icon: "fa-dove", x: 170, y: 150, r: 20 },
];

/* -------- Mediadores: qué permite que la relación ocurra -------- */
const MEDIADOR_NODES = [
  { id: "estaciones", name: "ESTACIONES", icon: "fa-train-subway", x: 540, y: 150, r: 20 },
  { id: "andenes", name: "ANDENES", icon: "fa-person-walking", x: 740, y: 230, r: 20 },
  { id: "senderos", name: "SENDEROS", icon: "fa-shoe-prints", x: 140, y: 220, r: 20 },
  { id: "puentes_peatonales", name: "PUENTES\nPEATONALES", icon: "fa-bridge", x: 60, y: 340, r: 20 },
];

const ALL_DYNAMIC_NODES = [...ACTOR_NODES, ...MEDIADOR_NODES];

function nodeKind(id) {
  if (BASE_NODES.some(n => n.id === id)) return "componente";
  if (ACTOR_NODES.some(n => n.id === id)) return "actor";
  if (MEDIADOR_NODES.some(n => n.id === id)) return "mediador";
  return "componente";
}

function findNode(id) {
  return BASE_NODES.find(n => n.id === id) || ALL_DYNAMIC_NODES.find(n => n.id === id);
}

/* -------- Relaciones entre componentes territoriales -------- */
/* tipo: "directa" (línea continua) | "indirecta" (línea punteada, incluye
   relaciones interpretativas sin cita textual). dirigida: si hay flecha. */
const BASE_EDGES = [
  { s: "quebradas", t: "humedales", tipo: "directa", dirigida: true, evidencia: "El POT reconoce las quebradas como afluentes que alimentan el sistema de humedales urbanos.", page: "p. 196", critica: "La relación es hídrica y unidireccional aguas abajo; no muestra la variación estacional del caudal." },
  { s: "complejo_paramos", t: "reservas_forestales", tipo: "directa", dirigida: true, evidencia: "Los complejos de páramo sostienen ecológicamente las reservas forestales protegidas.", page: "p. 198", critica: "La relación se documenta a escala regional; no distingue reservas específicas." },
  { s: "reservas_forestales", t: "humedales", tipo: "indirecta", dirigida: true, evidencia: "Las reservas forestales regulan indirectamente el régimen hídrico de los humedales cercanos.", page: "p. 198", critica: "Es una relación de regulación ambiental, no de conexión física directa." },
  { s: "areas_protegidas", t: "humedales", tipo: "directa", dirigida: true, evidencia: "Las áreas protegidas incluyen la ronda de protección de los humedales.", page: "p. 200", critica: "La protección normativa no garantiza por sí sola el estado ecológico del humedal." },
  { s: "areas_resiliencia", t: "coberturas_vegetales", tipo: "directa", dirigida: true, evidencia: "Las áreas de resiliencia climática dependen de la conservación de coberturas vegetales.", page: "p. 201", critica: "La dependencia es ecológica; no incorpora el efecto de la urbanización sobre esas coberturas." },
  { s: "humedales", t: "rios", tipo: "directa", dirigida: true, evidencia: "Los humedales hacen parte del sistema hídrico junto con los ríos de la ciudad.", page: "p. 196", critica: "La relación no distingue temporada seca de temporada de lluvias, donde la intensidad cambia." },
  { s: "humedales", t: "coberturas_vegetales", tipo: "directa", dirigida: true, evidencia: "Los humedales sostienen las coberturas vegetales de su ronda hidráulica.", page: "p. 197", critica: "No especifica qué franja de ronda queda realmente cubierta en la práctica." },
  { s: "humedales", t: "servicios_empresariales", tipo: "indirecta", dirigida: true, evidencia: "Relación interpretativa: la cercanía de actividad empresarial condiciona el régimen de uso del suelo alrededor del humedal.", page: null, critica: "No hay cita textual del POT para este cruce; se incluye porque ambos aparecen en el mismo corredor territorial." },
  { s: "vivienda", t: "transporte_publico", tipo: "directa", dirigida: true, evidencia: "La vivienda se conecta con el resto de la ciudad a través del transporte público.", page: "p. 30", critica: "La conexión documentada no dice nada sobre tiempos de espera ni transbordos reales." },
  { s: "vivienda", t: "equipamientos", tipo: "directa", dirigida: true, evidencia: "La vivienda se articula con los sistemas de cuidado y equipamientos comunitarios.", page: "p. 29", critica: "No diferencia el tipo de equipamiento ni su distancia real a la vivienda." },
  { s: "vivienda", t: "red_vial", tipo: "directa", dirigida: true, evidencia: "La vivienda se conecta con el resto de la ciudad a través de la red vial.", page: "p. 30", critica: "Es una relación de accesibilidad general, no de calidad de la malla vial." },
  { s: "vivienda", t: "manzanas_cuidado", tipo: "directa", dirigida: true, evidencia: "Las Manzanas del Cuidado se organizan alrededor de la vivienda cercana.", page: "p. 32", critica: "El radio de proximidad real varía según el barrio y no está fijado en el documento." },
  { s: "vivienda", t: "comunidades_patrimonio", tipo: "indirecta", dirigida: true, evidencia: "Relación interpretativa: la vivienda del sector se asocia con los sitios sagrados que forman parte de su patrimonio.", page: null, critica: "Es una lectura territorial, no una relación explícitamente documentada en el POT." },
  { s: "transporte_publico", t: "servicios_sociales", tipo: "indirecta", dirigida: true, evidencia: "El transporte público facilita, sin ser la única vía, el acceso a servicios sociales.", page: "p. 29", critica: "No es exclusiva: hay otros modos de acceso a servicios sociales no representados aquí." },
  { s: "transporte_publico", t: "ciclorrutas", tipo: "indirecta", dirigida: true, evidencia: "El transporte público se complementa con la red de ciclorrutas en los últimos tramos del viaje.", page: "p. 39", critica: "La intermodalidad depende de infraestructura de transbordo que no siempre existe." },
  { s: "equipamientos", t: "corredores_verdes", tipo: "directa", dirigida: true, evidencia: "Los equipamientos se articulan con los corredores verdes urbanos cercanos.", page: "p. 40", critica: "La articulación física no siempre implica continuidad peatonal real." },
  { s: "manzanas_cuidado", t: "parques", tipo: "directa", dirigida: true, evidencia: "Las Manzanas del Cuidado incluyen parques como parte de sus servicios de proximidad.", page: "p. 40", critica: "No especifica el estándar mínimo de área verde por Manzana." },
  { s: "servicios_empresariales", t: "produccion_artesanal", tipo: "directa", dirigida: true, evidencia: "Los servicios empresariales impulsan la producción artesanal local.", page: "p. 60", critica: "La relación es de impulso económico, no de encadenamiento productivo formalizado." },
  { s: "servicios_empresariales", t: "centros_financieros", tipo: "directa", dirigida: true, evidencia: "Los servicios empresariales dependen del respaldo de los centros financieros.", page: "p. 55", critica: "No distingue financiamiento formal de informal, ambos presentes en el territorio." },
  { s: "servicios_empresariales", t: "plazas_mercado", tipo: "directa", dirigida: true, evidencia: "Los servicios empresariales se articulan con las plazas de mercado del sector.", page: "p. 60", critica: "La plaza de mercado tiene una lógica de escala barrial distinta a la empresarial." },
  { s: "servicios_empresariales", t: "zonas_industriales", tipo: "directa", dirigida: true, evidencia: "Los servicios empresariales se complementan con las zonas industriales cercanas.", page: "p. 48", critica: "No aborda el conflicto de usos entre industria y otros usos urbanos." },
  { s: "servicios_empresariales", t: "distrito_tecnologico", tipo: "directa", dirigida: true, evidencia: "Los servicios empresariales se apoyan en el Distrito Centro Tecnológico e Innovación.", page: "p. 46", critica: "El distrito es un proyecto de escala mayor; su efecto local aún no está evaluado." },
  { s: "servicios_empresariales", t: "sistema_educacion", tipo: "directa", dirigida: true, evidencia: "El sistema de educación forma el talento humano de los servicios empresariales.", page: "p. 53", critica: "La formación de talento humano es un proceso de largo plazo, no inmediato." },
  { s: "zonas_industriales", t: "patrimonio_material", tipo: "indirecta", dirigida: true, evidencia: "Relación interpretativa: la actividad industrial cercana condiciona la conservación del patrimonio material.", page: null, critica: "No hay cita textual; se infiere del cruce territorial entre ambos usos." },
  { s: "zonas_industriales", t: "zonas_interes_turistico", tipo: "indirecta", dirigida: false, evidencia: "Relación interpretativa: ambos usos conviven en el mismo corredor sin una jerarquía definida.", page: null, critica: "La convivencia puede ser complementaria o conflictiva según el caso concreto." },
  { s: "patrimonio_material", t: "patrimonio_natural", tipo: "directa", dirigida: true, evidencia: "El patrimonio material y el patrimonio natural comparten un mismo sistema de conservación.", page: "p. 196", critica: "No define un mecanismo de gestión conjunta entre ambos tipos de patrimonio." },
  { s: "patrimonio_natural", t: "comunidades_patrimonio", tipo: "directa", dirigida: true, evidencia: "Los sitios sagrados son testimonio y sostén simbólico del patrimonio natural del territorio.", page: "p. 186", critica: "No distingue qué sitio sagrado específico ejerce ese sostén en cada caso." },
  { s: "patrimonio_natural", t: "patrimonio_inmaterial", tipo: "directa", dirigida: true, evidencia: "El patrimonio natural y el patrimonio inmaterial se reconocen como un sistema integrado.", page: "p. 196", critica: "La integración normativa no implica una gestión articulada en la práctica." },
  { s: "patrimonio_inmaterial", t: "patrimonio_arqueologico", tipo: "indirecta", dirigida: true, evidencia: "Relación interpretativa: el patrimonio inmaterial documenta prácticas asociadas a hallazgos arqueológicos del sector.", page: null, critica: "Es una asociación temática, no una relación de manejo documentada." },
  { s: "distrito_tecnologico", t: "zonas_interes_turistico", tipo: "indirecta", dirigida: true, evidencia: "El Distrito Centro Tecnológico e Innovación incrementa el valor turístico de la zona.", page: "p. 50", critica: "El efecto turístico proyectado aún no tiene evidencia de resultado." },
  { s: "centros_abastecimiento", t: "sistema_educacion", tipo: "indirecta", dirigida: false, evidencia: "Relación interpretativa: ambos comparten el mismo corredor de servicios del sector.", page: null, critica: "La coincidencia espacial no implica una relación funcional comprobada." },
];

/* -------- Relaciones actor/mediador → componente (dimensión dinámica) -------- */
const DYNAMIC_EDGES = [
  { s: "habitantes", t: "transporte_publico", tipo: "indirecta", dirigida: true, evidencia: "Los habitantes son quienes usan cotidianamente el transporte público.", page: null, actores: "Habitantes", critica: "El uso no es homogéneo: cambia con la edad, el ingreso y la movilidad reducida." },
  { s: "habitantes", t: "vivienda", tipo: "indirecta", dirigida: true, evidencia: "Los habitantes son quienes ocupan y sostienen la vivienda día a día.", page: null, actores: "Habitantes", critica: "La ocupación real puede diferir del uso previsto por el POT (subarriendo, hacinamiento)." },
  { s: "estudiantes", t: "sistema_educacion", tipo: "indirecta", dirigida: true, evidencia: "Los estudiantes son actores centrales del sistema de educación del sector.", page: null, actores: "Estudiantes", critica: "No todos los estudiantes acceden al sistema de educación más cercano a su vivienda." },
  { s: "trabajadores", t: "servicios_empresariales", tipo: "indirecta", dirigida: true, evidencia: "Los trabajadores activan diariamente los servicios empresariales del sector.", page: null, actores: "Trabajadores", critica: "La relación no distingue empleo formal de informal, con condiciones muy distintas." },
  { s: "trabajadores", t: "zonas_industriales", tipo: "indirecta", dirigida: true, evidencia: "Los trabajadores operan y sostienen la actividad de las zonas industriales.", page: null, actores: "Trabajadores", critica: "El desplazamiento de los trabajadores hacia la zona industrial no siempre es corto." },
  { s: "personas_cuidadoras", t: "manzanas_cuidado", tipo: "indirecta", dirigida: true, evidencia: "Las personas cuidadoras son quienes usan y sostienen las Manzanas del Cuidado.", page: null, actores: "Personas cuidadoras", critica: "El diseño de la Manzana no siempre responde a los tiempos reales del cuidado." },
  { s: "comunidades_actor", t: "humedales", tipo: "indirecta", dirigida: true, evidencia: "Las comunidades vecinas protegen y usan cotidianamente el humedal.", page: null, actores: "Comunidades", critica: "No toda comunidad vecina tiene el mismo nivel de organización para proteger el humedal." },
  { s: "operadores_transporte", t: "transporte_publico", tipo: "indirecta", dirigida: true, evidencia: "Los operadores de transporte son quienes ponen en funcionamiento el sistema.", page: null, actores: "Operadores de transporte", critica: "La calidad del servicio depende de condiciones laborales no representadas en la red." },
  { s: "aves", t: "humedales", tipo: "indirecta", dirigida: true, evidencia: "Las aves migratorias y residentes dependen del ecosistema del humedal.", page: null, actores: "Aves (especies concretas)", critica: "La relación cambia según la temporada migratoria, no es constante todo el año." },
  { s: "estaciones", t: "transporte_publico", tipo: "directa", dirigida: false, evidencia: "Las estaciones son el mediador físico que hace posible el uso del transporte público.", page: null, critica: "El número y ubicación real de estaciones condiciona la equidad de acceso." },
  { s: "andenes", t: "red_vial", tipo: "directa", dirigida: false, evidencia: "Los andenes son el mediador que permite el uso peatonal de la red vial.", page: null, critica: "El estado físico del andén no está representado, solo su existencia." },
  { s: "senderos", t: "humedales", tipo: "directa", dirigida: false, evidencia: "Los senderos median el uso comunitario y recreativo del humedal.", page: null, actores: "Comunidades", critica: "Un exceso de senderos puede presionar ecológicamente el borde del humedal." },
  { s: "senderos", t: "areas_protegidas", tipo: "directa", dirigida: false, evidencia: "Los senderos permiten el recorrido controlado dentro de áreas protegidas.", page: null, critica: "El control real del recorrido depende de mantenimiento y señalización." },
  { s: "puentes_peatonales", t: "rios", tipo: "directa", dirigida: false, evidencia: "Los puentes peatonales median el cruce seguro sobre los ríos urbanos.", page: null, critica: "No todos los tramos del río cuentan con un puente peatonal cercano." },
];

function edgeKey(e) { return e.s + "→" + e.t; }

/* -------- Situaciones: cambian intensidad de relaciones ya existentes -------- */
const SITUACIONES = [
  {
    id: "hora_pico_manana", label: "Hora pico (mañana)", icon: "fa-sun",
    desc: "Aumenta el peso visual de las relaciones entre Vivienda, Transporte público y los lugares de empleo.",
    boost: ["vivienda→transporte_publico", "habitantes→transporte_publico", "trabajadores→servicios_empresariales"],
    dim: [],
  },
  {
    id: "hora_pico_tarde", label: "Hora pico (tarde)", icon: "fa-cloud-sun",
    desc: "Cambia la intensidad de las relaciones de regreso hacia la vivienda.",
    boost: ["transporte_publico→servicios_sociales", "vivienda→transporte_publico", "habitantes→vivienda"],
    dim: [],
  },
  {
    id: "mantenimiento", label: "Mantenimiento", icon: "fa-screwdriver-wrench",
    desc: "Atenúa o interrumpe temporalmente la relación con una estación o servicio.",
    boost: [],
    dim: ["estaciones→transporte_publico"],
  },
  {
    id: "obra_vial", label: "Obra vial", icon: "fa-triangle-exclamation",
    desc: "Modifica las relaciones entre la Red vial, el Transporte público y los recorridos cotidianos.",
    boost: ["andenes→red_vial"],
    dim: ["vivienda→red_vial"],
  },
  {
    id: "cierre_estacion", label: "Cierre de estación", icon: "fa-ban",
    desc: "Desactiva un punto de acceso y activa rutas alternativas.",
    boost: ["andenes→red_vial"],
    dim: ["estaciones→transporte_publico"],
  },
  {
    id: "temporada_lluvias", label: "Temporada de lluvias", icon: "fa-cloud-showers-heavy",
    desc: "Aumenta la intensidad de las relaciones hídricas entre Quebradas, Ríos y Humedales.",
    boost: ["quebradas→humedales", "humedales→rios", "humedales→coberturas_vegetales"],
    dim: [],
  },
  {
    id: "temporada_seca", label: "Temporada seca", icon: "fa-sun-plant-wilt",
    desc: "Reduce la intensidad de las relaciones hídricas y cambia la lectura del sistema.",
    boost: [],
    dim: ["quebradas→humedales", "humedales→rios", "humedales→coberturas_vegetales"],
  },
  {
    id: "intervencion_vial", label: "Intervención vial", icon: "fa-road-barrier",
    desc: "Resalta la relación conflictiva entre una obra cercana y el humedal.",
    boost: ["humedales→servicios_empresariales"],
    dim: ["reservas_forestales→humedales"],
  },
  {
    id: "uso_comunitario", label: "Uso comunitario", icon: "fa-people-group",
    desc: "Resalta las relaciones entre comunidades, senderos y humedales.",
    boost: ["comunidades_actor→humedales", "senderos→humedales"],
    dim: [],
  },
];

/* -------- estado global -------- */
let agencyOn = false;
let viewMode = "todas";
let activeSituacion = null;
const nodeOff = new Set();

/* -------- física -------- */
[...BASE_NODES, ...ALL_DYNAMIC_NODES].forEach(n => {
  n.homeX = n.x; n.homeY = n.y; n.vx = 0; n.vy = 0;
  n.fixed = (n.id === "vivienda" || n.id === "humedales" || n.id === "servicios_empresariales");
});

function allActiveEdges() {
  return agencyOn ? [...BASE_EDGES, ...DYNAMIC_EDGES] : BASE_EDGES;
}

BASE_EDGES.concat(DYNAMIC_EDGES).forEach(e => {
  const s = findNode(e.s), t = findNode(e.t);
  if (!s || !t) return;
  e.restLength = Math.hypot(t.x - s.x, t.y - s.y) || 200;
});

/* -------- defs: glow + flechas -------- */
function buildDefs(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");
  Object.values(STRUCT_COLOR).forEach(color => {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "rd-glow-" + color.replace("#", ""));
    filter.setAttribute("x", "-60%"); filter.setAttribute("y", "-60%");
    filter.setAttribute("width", "220%"); filter.setAttribute("height", "220%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3"); blur.setAttribute("result", "blur");
    const merge = document.createElementNS(SVG_NS, "feMerge");
    ["blur", "blur", "SourceGraphic"].forEach(ref => {
      const m = document.createElementNS(SVG_NS, "feMergeNode");
      m.setAttribute("in", ref);
      merge.appendChild(m);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });

  const marker = document.createElementNS(SVG_NS, "marker");
  marker.setAttribute("id", "rd-arrow");
  marker.setAttribute("viewBox", "0 0 10 10");
  marker.setAttribute("refX", "8"); marker.setAttribute("refY", "5");
  marker.setAttribute("markerWidth", "6.5"); marker.setAttribute("markerHeight", "6.5");
  marker.setAttribute("orient", "auto-start-reverse");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", "M0,0 L10,5 L0,10 z");
  path.setAttribute("fill", "#c9cedb");
  marker.appendChild(path);
  defs.appendChild(marker);

  svg.appendChild(defs);
}

function edgePathData(s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const startPad = s.r + 2, endPad = t.r + 7;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad, y2 = t.y - uy * endPad;
  return `M${x1},${y1} L${x2},${y2}`;
}

function edgeIntensity(e) {
  let w = 1.3, op = 0.55;
  if (activeSituacion) {
    const sit = SITUACIONES.find(s => s.id === activeSituacion);
    const key = edgeKey(e);
    if (sit.boost.includes(key)) { w = 3; op = 1; }
    else if (sit.dim.includes(key)) { w = 0.8; op = 0.15; }
    else { op = 0.22; }
  }
  return { w, op };
}

function drawEdges(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edges-layer");

  allActiveEdges().forEach((edge, i) => {
    const s = findNode(edge.s), t = findNode(edge.t);
    if (!s || !t) return;
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "rd-edge-group");
    group.dataset.index = i;
    group.dataset.source = edge.s;
    group.dataset.target = edge.t;
    group.dataset.dynamic = DYNAMIC_EDGES.includes(edge) ? "1" : "0";

    const { w, op } = edgeIntensity(edge);
    const d = edgePathData(s, t);

    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("class", "rd-edge");
    visual.setAttribute("d", d);
    visual.setAttribute("stroke", "#c9cedb");
    visual.setAttribute("stroke-width", w);
    visual.setAttribute("opacity", op);
    if (edge.tipo === "indirecta") visual.setAttribute("stroke-dasharray", "5,5");
    if (edge.dirigida) visual.setAttribute("marker-end", "url(#rd-arrow)");

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("class", "rd-edge-hit");
    hit.setAttribute("d", d);

    group.appendChild(visual);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(edge, i));
    g.appendChild(group);
    edge._el = { visual, hit, group };
  });

  svg.appendChild(g);
}

function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");

  const list = agencyOn ? [...BASE_NODES, ...ALL_DYNAMIC_NODES] : BASE_NODES;

  list.forEach(node => {
    const kind = nodeKind(node.id);
    const color = kind === "componente" ? STRUCT_COLOR[node.struct] : STRUCT_COLOR[kind];

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "rd-node");
    group.dataset.id = node.id;
    group.dataset.kind = kind;

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring");
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("stroke", color);
    circle.setAttribute("stroke-width", node.id === "vivienda" ? 3.2 : (kind === "componente" ? 2.2 : 1.6));
    circle.setAttribute("filter", "url(#rd-glow-" + color.replace("#", "") + ")");
    if (kind !== "componente") circle.setAttribute("stroke-dasharray", "3,2");

    const fo = document.createElementNS(SVG_NS, "foreignObject");
    const size = node.r * 2.3;
    fo.setAttribute("x", node.x - size / 2); fo.setAttribute("y", node.y - size / 2);
    fo.setAttribute("width", size); fo.setAttribute("height", size);

    const wrapper = document.createElementNS(XHTML_NS, "div");
    wrapper.setAttribute("style",
      "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none;");

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon + " node-icon");
    iconEl.setAttribute("style", `color:${color}; font-size:${node.r * 0.4}px; margin:1px 0;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("class", "node-name");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.16, 7)}px; padding:0 3px; white-space:pre-line;`);
    nameEl.textContent = node.name;

    wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
    fo.appendChild(wrapper);

    group.appendChild(circle);
    group.appendChild(fo);
    attachNodeClick(group, node.id);
    attachNodeDrag(group, node);
    g.appendChild(group);

    node._el = { group, circle, fo };
  });

  svg.appendChild(g);
}

function updatePositions() {
  const list = agencyOn ? [...BASE_NODES, ...ALL_DYNAMIC_NODES] : BASE_NODES;
  list.forEach(n => {
    if (!n._el) return;
    n._el.circle.setAttribute("cx", n.x);
    n._el.circle.setAttribute("cy", n.y);
    const size = n.r * 2.3;
    n._el.fo.setAttribute("x", n.x - size / 2);
    n._el.fo.setAttribute("y", n.y - size / 2);
  });
  allActiveEdges().forEach(edge => {
    if (!edge._el) return;
    const s = findNode(edge.s), t = findNode(edge.t);
    if (!s || !t) return;
    const d = edgePathData(s, t);
    edge._el.visual.setAttribute("d", d);
    edge._el.hit.setAttribute("d", d);
  });
}

const PHYSICS = { spring: 0.045, anchor: 0.02, damping: 0.82, minVel: 0.02 };
let physicsRunning = false;

function physicsStep() {
  let moving = false;
  const nodes = agencyOn ? [...BASE_NODES, ...ALL_DYNAMIC_NODES] : BASE_NODES;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const ni = nodes[i], nj = nodes[j];
      const dx = nj.x - ni.x, dy = nj.y - ni.y;
      const dist = Math.hypot(dx, dy) || 1;
      const minDist = ni.r + nj.r + 26;
      if (dist < minDist) {
        const force = (minDist - dist) * 0.08;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        if (!ni.fixed) { ni.vx -= fx; ni.vy -= fy; }
        if (!nj.fixed) { nj.vx += fx; nj.vy += fy; }
      }
    }
  }

  allActiveEdges().forEach(edge => {
    const s = findNode(edge.s), t = findNode(edge.t);
    if (!s || !t) return;
    const dx = t.x - s.x, dy = t.y - s.y;
    const dist = Math.hypot(dx, dy) || 1;
    const diff = (dist - edge.restLength) * PHYSICS.spring;
    const fx = (dx / dist) * diff, fy = (dy / dist) * diff;
    if (!s.fixed) { s.vx += fx; s.vy += fy; }
    if (!t.fixed) { t.vx -= fx; t.vy -= fy; }
  });

  nodes.forEach(n => {
    if (n.fixed) { n.vx = 0; n.vy = 0; return; }
    n.vx += (n.homeX - n.x) * PHYSICS.anchor;
    n.vy += (n.homeY - n.y) * PHYSICS.anchor;
    n.vx *= PHYSICS.damping; n.vy *= PHYSICS.damping;
    n.x += n.vx; n.y += n.vy;
    if (Math.abs(n.vx) > PHYSICS.minVel || Math.abs(n.vy) > PHYSICS.minVel) moving = true;
  });

  updatePositions();
  if (moving) requestAnimationFrame(physicsStep);
  else physicsRunning = false;
}

function wakePhysics() {
  if (!physicsRunning) { physicsRunning = true; requestAnimationFrame(physicsStep); }
}

function attachNodeDrag(group, node) {
  const svg = document.getElementById("readerViz");
  let dragging = false, moved = false, startX = 0, startY = 0;

  function toSvgPoint(cx, cy) {
    const pt = svg.createSVGPoint();
    pt.x = cx; pt.y = cy;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  group.addEventListener("pointerdown", e => {
    dragging = true; moved = false; startX = e.clientX; startY = e.clientY;
    node.fixed = true;
    group.classList.add("dragging");
    group.setPointerCapture(e.pointerId);
    wakePhysics();
  });
  group.addEventListener("pointermove", e => {
    if (!dragging) return;
    if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) moved = true;
    const p = toSvgPoint(e.clientX, e.clientY);
    node.x = p.x; node.y = p.y; node.vx = 0; node.vy = 0;
    updatePositions(); wakePhysics();
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    node.fixed = (node.id === "vivienda" || node.id === "humedales" || node.id === "servicios_empresariales");
    group.classList.remove("dragging");
    try { group.releasePointerCapture(e.pointerId); } catch (err) {}
    wakePhysics();
    if (moved) { group.dataset.suppressClick = "1"; setTimeout(() => delete group.dataset.suppressClick, 0); }
  }
  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
}

function attachNodeClick(group, id) {
  group.addEventListener("click", () => {
    if (group.dataset.suppressClick) return;
    toggleNodeOff(id);
  });
}

function toggleNodeOff(id) {
  const group = document.querySelector(`.rd-node[data-id="${id}"]`);
  if (!group) return;
  if (nodeOff.has(id)) { nodeOff.delete(id); group.classList.remove("node-off"); }
  else { nodeOff.add(id); group.classList.add("node-off"); }
  refreshEdgeVisibility();
}

function refreshEdgeVisibility() {
  document.querySelectorAll(".rd-edge-group").forEach(group => {
    const s = group.dataset.source, t = group.dataset.target;
    group.classList.toggle("hidden-edge", nodeOff.has(s) || nodeOff.has(t));
  });
}

/* -------- panel de relación (clic en línea) -------- */
function showEdgeInfo(edge, index) {
  const s = findNode(edge.s), t = findNode(edge.t);
  document.querySelectorAll(".rd-edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.rd-edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  document.getElementById("edgeInfoTitle").textContent = `${s.name.replace(/\n/g, " ")} → ${t.name.replace(/\n/g, " ")}`;

  const dirTxt = edge.dirigida ? "Dirigida (con sentido sustentado)" : "Sin dirección única";
  const tipoTxt = edge.tipo === "directa" ? "Directa (línea continua)" : "Indirecta (línea punteada)";
  document.getElementById("edgeInfoConvencion").textContent = `${tipoTxt} · ${dirTxt}`;

  document.getElementById("edgeInfoEvidencia").textContent = edge.evidencia
    ? `"${edge.evidencia}"` : "Sin evidencia registrada.";
  document.getElementById("edgeInfoPage").textContent = edge.page ? `Fuente: ${edge.page}` : "Relación interpretativa — sin cita textual del POT.";

  const actoresRelacionados = [];
  if (edge.actores) actoresRelacionados.push(edge.actores);
  DYNAMIC_EDGES.forEach(de => {
    if ((de.s === edge.s || de.t === edge.s || de.s === edge.t || de.t === edge.t) && de.actores && !actoresRelacionados.includes(de.actores)) {
      if (agencyOn) actoresRelacionados.push(de.actores);
    }
  });
  document.getElementById("edgeInfoActores").textContent = actoresRelacionados.length
    ? actoresRelacionados.join(" · ") : "No hay actores asociados activos en esta vista.";

  const situacionesQueAfectan = SITUACIONES.filter(sit => sit.boost.includes(edgeKey(edge)) || sit.dim.includes(edgeKey(edge)))
    .map(sit => sit.label);
  document.getElementById("edgeInfoSituacion").textContent = situacionesQueAfectan.length
    ? situacionesQueAfectan.join(" · ") : "Sin situación registrada que la module.";

  document.getElementById("edgeInfoCritica").textContent = edge.critica || "—";

  document.getElementById("edgeInfoPanel").classList.add("visible");
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".rd-edge-group").forEach(el => el.classList.remove("edge-selected"));
}

/* -------- render principal -------- */
function renderNetwork() {
  const svg = document.getElementById("readerViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg);
  drawEdges(svg);
  drawNodes(svg);
  refreshEdgeVisibility();
  applyViewMode();
}

/* -------- toggle: Activar Dimensión Dinámica -------- */
function toggleAgency() {
  agencyOn = !agencyOn;
  const btn = document.getElementById("agencyToggle");
  btn.classList.toggle("on", agencyOn);
  document.getElementById("statActoresCard").classList.toggle("stat-inactive", !agencyOn);
  document.getElementById("statMediadoresCard").classList.toggle("stat-inactive", !agencyOn);
  renderNetwork();
  updateStats();
  renderDynamicViz();
}

/* -------- filtro Todas / Componentes / Actores y mediadores -------- */
function filterView(mode) {
  viewMode = mode;
  document.querySelectorAll(".network-controls .control-btn").forEach(b => b.classList.toggle("active", b.dataset.view === mode));
  if (mode === "actores" && !agencyOn) toggleAgency();
  else applyViewMode();
}

function applyViewMode() {
  document.querySelectorAll(".rd-node").forEach(el => {
    const kind = el.dataset.kind;
    let dim = false;
    if (viewMode === "componentes") dim = kind !== "componente";
    if (viewMode === "actores") dim = kind === "componente" && !isComponenteConectadoADinamico(el.dataset.id);
    el.classList.toggle("node-focus-dim", dim);
  });
  document.querySelectorAll(".rd-edge-group").forEach(el => {
    const isDyn = el.dataset.dynamic === "1";
    let dim = false;
    if (viewMode === "componentes") dim = isDyn;
    el.classList.toggle("edge-focus-dim", dim);
  });
}

function isComponenteConectadoADinamico(id) {
  return DYNAMIC_EDGES.some(e => e.s === id || e.t === id);
}

/* -------- situaciones -------- */
function renderSituacionesRow() {
  const row = document.getElementById("situacionesRow");
  row.innerHTML = SITUACIONES.map(s => `
    <button class="situacion-btn" data-sit="${s.id}" onclick="setSituacion('${s.id}')">
      <i class="fa-solid ${s.icon}"></i> ${s.label}
    </button>
  `).join("");
}

function setSituacion(id) {
  if (activeSituacion === id) { activeSituacion = null; }
  else { activeSituacion = id; }
  document.querySelectorAll(".situacion-btn").forEach(b => b.classList.toggle("active", b.dataset.sit === activeSituacion));
  const desc = document.getElementById("situacionDesc");
  if (activeSituacion) {
    desc.textContent = SITUACIONES.find(s => s.id === activeSituacion).desc;
  } else {
    desc.textContent = "Sin situación activa: todas las relaciones se leen en su intensidad documental de base.";
  }
  renderNetwork();
}

/* -------- stats -------- */
function updateStats() {
  document.getElementById("statComponentes").textContent = BASE_NODES.length;
  document.getElementById("statActores").textContent = agencyOn ? ACTOR_NODES.length : "—";
  document.getElementById("statMediadores").textContent = agencyOn ? MEDIADOR_NODES.length : "—";
  document.getElementById("statRelaciones").textContent = allActiveEdges().length;
}

/* -------- mini-viz "Lectura Dinámica" del hero (decorativo) -------- */
function renderDynamicViz() {
  const el = document.getElementById("dynamicViz");
  if (!el) return;
  el.innerHTML = `
    <svg viewBox="0 0 260 170">
      <circle cx="130" cy="85" r="30" class="dyn-core"/>
      ${[[50,30],[210,30],[45,140],[215,140],[130,20]].map(([x,y],i) => `
        <line x1="130" y1="85" x2="${x}" y2="${y}" class="dyn-line" style="animation-delay:${i*0.15}s" />
        <circle cx="${x}" cy="${y}" r="12" class="dyn-node" style="animation-delay:${i*0.15}s" />
      `).join("")}
    </svg>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderSituacionesRow();
  renderNetwork();
  updateStats();
  renderDynamicViz();
  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
  window.addEventListener("resize", () => {
    const svg = document.getElementById("readerViz");
    if (svg) { svg.setAttribute("width", svg.clientWidth); svg.setAttribute("height", svg.clientHeight); }
  });
});

if (typeof window !== "undefined") {
  window.__readerBaseNodes = BASE_NODES;
  window.__readerActorNodes = ACTOR_NODES;
  window.__readerMediadorNodes = MEDIADOR_NODES;
  window.__readerBaseEdges = BASE_EDGES;
  window.__readerDynamicEdges = DYNAMIC_EDGES;
}
