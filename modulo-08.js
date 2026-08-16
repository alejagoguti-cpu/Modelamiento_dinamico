/* ==========================================================
   RED — MI MODELO DE CIUDAD — Módulo 08
   diagrama con física de nodos, construido a partir de:
   modelo_propio_ciudad_40_relaciones.xlsx
   - VIVIENDA está fija en el centro: es el componente con más
     conexiones (20) y por eso el nodo más grande de la red.
   - El tamaño de cada bola es proporcional a su número de conexiones.
   - Los nodos parten de una posición fija, pero se pueden ARRASTRAR:
     al mover una bola, las conectadas la "siguen" (fuerza de resorte),
     y el conjunto tiende a volver a su posición original.
   - Cada línea es una relación tomada de la hoja "Relaciones":
     Soporte, Conectividad, Dependencia o Transformación.
   - Clic en una línea -> panel con el sistema origen/destino y la relación.
   - Clic en una bola -> la apaga (opacidad) y oculta sus líneas conectadas;
     clic de nuevo la enciende.
   - Convenciones (tomadas de la hoja "4 convenciones"):
       Soporte:        verde   #4ade80  continua con flecha
       Conectividad:   azul    #5b8def  continua con flecha en ambos extremos
       Dependencia:    rosado  #f76fb0  punteada con flecha
       Transformación: morado  #a276f2  doble línea con flecha
   - Colores de sistema (hoja "Sistemas y colores"):
       Ambiental y ecológico:      verde   #4ade80
       Hábitat y espacio urbano:   naranja #ef9552
       Movilidad y conectividad:   azul    #5b8def
       Económico y productivo:     amarillo #f5c945
       Social, cultural y cuidado: rosado  #f76fb0
       Gobernanza:                 morado  #a276f2
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- Sistemas: color e icono (hoja "Sistemas y colores") -------- */
const SISTEMAS = {
  eco:        { label: "Ambiental y ecológico",      color: "#4ade80", icon: "fa-leaf" },
  habitat:    { label: "Hábitat y espacio urbano",   color: "#ef9552", icon: "fa-house" },
  movilidad:  { label: "Movilidad y conectividad",   color: "#5b8def", icon: "fa-road" },
  economico:  { label: "Económico y productivo",     color: "#f5c945", icon: "fa-coins" },
  social:     { label: "Social, cultural y cuidado",  color: "#f76fb0", icon: "fa-people-roof" },
  gobernanza: { label: "Gobernanza",                  color: "#a276f2", icon: "fa-landmark" },
};

/* -------- Nodos: 32 componentes tomados de la hoja "Relaciones" -------- */
/* tamaño (r) proporcional al número de conexiones (grado) de cada componente */
/* plazo: "corto" (accion rápida/bajo costo), "largo" (obra estructural/años),
   "ambos" (vigente y prioritario en los dos horizontes) */
const ODS_NODES = [
  { id: "vivienda", name: "VIVIENDA", icon: "fa-house", color: "#ef9552", sistema: "habitat", x: 735, y: 390, r: 88, plazo: "ambos" },
  { id: "plazas", name: "PLAZAS", icon: "fa-chess-board", color: "#ef9552", sistema: "habitat", x: 890, y: 446, r: 33, plazo: "corto" },
  { id: "alcantarillado", name: "ALCANTARILLADO", icon: "fa-faucet-drip", color: "#ef9552", sistema: "habitat", x: 706, y: 552, r: 29, plazo: "largo" },
  { id: "espacio_publico", name: "ESPACIO\nPÚBLICO", icon: "fa-people-group", color: "#ef9552", sistema: "habitat", x: 580, y: 446, r: 46, plazo: "corto" },
  { id: "redes_de_energia", name: "REDES DE\nENERGÍA", icon: "fa-bolt", color: "#ef9552", sistema: "habitat", x: 652, y: 247, r: 29, plazo: "largo" },
  { id: "alumbrado_publico", name: "ALUMBRADO\nPÚBLICO", icon: "fa-lightbulb", color: "#ef9552", sistema: "habitat", x: 817, y: 247, r: 29, plazo: "corto" },
  { id: "barrios", name: "BARRIOS", icon: "fa-city", color: "#ef9552", sistema: "habitat", x: 500, y: 560, r: 43, plazo: "ambos" },
  { id: "centralidades", name: "CENTRALIDADES", icon: "fa-building", color: "#ef9552", sistema: "habitat", x: 860, y: 560, r: 36, plazo: "largo" },
  { id: "lotes", name: "LOTES", icon: "fa-vector-square", color: "#ef9552", sistema: "habitat", x: 470, y: 240, r: 29, plazo: "largo" },

  { id: "humedales", name: "HUMEDALES", icon: "fa-water", color: "#4ade80", sistema: "eco", x: 330, y: 200, r: 62, plazo: "largo" },
  { id: "rios", name: "RÍOS", icon: "fa-droplet", color: "#4ade80", sistema: "eco", x: 205, y: 300, r: 46, plazo: "largo" },
  { id: "corredores_verdes", name: "CORREDORES\nVERDES", icon: "fa-seedling", color: "#4ade80", sistema: "eco", x: 420, y: 330, r: 54, plazo: "largo" },
  { id: "parques_urbanos", name: "PARQUES\nURBANOS", icon: "fa-tree", color: "#4ade80", sistema: "eco", x: 155, y: 120, r: 39, plazo: "corto" },
  { id: "corredores_ecologicos", name: "CORREDORES\nECOLÓGICOS", icon: "fa-leaf", color: "#4ade80", sistema: "eco", x: 120, y: 390, r: 39, plazo: "largo" },
  { id: "cerros", name: "CERROS", icon: "fa-mountain", color: "#4ade80", sistema: "eco", x: 55, y: 420, r: 35, plazo: "largo" },
  { id: "arbolado_urbano", name: "ARBOLADO\nURBANO", icon: "fa-tree-city", color: "#4ade80", sistema: "eco", x: 235, y: 420, r: 35, plazo: "corto" },
  { id: "coberturas_vegetales", name: "COBERTURAS\nVEGETALES", icon: "fa-spa", color: "#4ade80", sistema: "eco", x: 335, y: 80, r: 42, plazo: "largo" },
  { id: "fuentes_hidricas", name: "FUENTES\nHÍDRICAS", icon: "fa-faucet", color: "#4ade80", sistema: "eco", x: 110, y: 230, r: 35, plazo: "largo" },
  { id: "quebradas", name: "QUEBRADAS", icon: "fa-water", color: "#4ade80", sistema: "eco", x: 85, y: 290, r: 35, plazo: "largo" },

  { id: "educacion", name: "EDUCACIÓN", icon: "fa-graduation-cap", color: "#f76fb0", sistema: "social", x: 1005, y: 175, r: 36, plazo: "largo" },
  { id: "equipamientos", name: "EQUIPAMIENTOS", icon: "fa-building-columns", color: "#f76fb0", sistema: "social", x: 1130, y: 80, r: 33, plazo: "largo" },
  { id: "salud", name: "SALUD", icon: "fa-heart-pulse", color: "#f76fb0", sistema: "social", x: 895, y: 145, r: 29, plazo: "largo" },
  { id: "manzanas_del_cuidado", name: "MANZANAS\nDEL CUIDADO", icon: "fa-people-roof", color: "#f76fb0", sistema: "social", x: 995, y: 300, r: 29, plazo: "corto" },
  { id: "recreacion", name: "RECREACIÓN", icon: "fa-futbol", color: "#f76fb0", sistema: "social", x: 1255, y: 175, r: 33, plazo: "corto" },
  { id: "patrimonio", name: "PATRIMONIO", icon: "fa-landmark", color: "#f76fb0", sistema: "social", x: 1360, y: 320, r: 33, plazo: "largo" },
  { id: "centros_comunitarios", name: "CENTROS\nCOMUNITARIOS", icon: "fa-people-roof", color: "#f76fb0", sistema: "social", x: 330, y: 545, r: 33, plazo: "corto" },
  { id: "espacios_culturales", name: "ESPACIOS\nCULTURALES", icon: "fa-masks-theater", color: "#f76fb0", sistema: "social", x: 1010, y: 435, r: 29, plazo: "corto" },
  { id: "bibliotecas", name: "BIBLIOTECAS", icon: "fa-book", color: "#f76fb0", sistema: "social", x: 390, y: 500, r: 29, plazo: "corto" },
  { id: "centros_deportivos", name: "CENTROS\nDEPORTIVOS", icon: "fa-dumbbell", color: "#f76fb0", sistema: "social", x: 650, y: 375, r: 29, plazo: "corto" },

  { id: "comercio", name: "COMERCIO", icon: "fa-shop", color: "#f5c945", sistema: "economico", x: 995, y: 525, r: 40, plazo: "corto" },
  { id: "empleo", name: "EMPLEO", icon: "fa-briefcase", color: "#f5c945", sistema: "economico", x: 1155, y: 565, r: 40, plazo: "largo" },
  { id: "produccion_artesanal", name: "PRODUCCIÓN\nARTESANAL", icon: "fa-hands", color: "#f5c945", sistema: "economico", x: 1305, y: 465, r: 29, plazo: "corto" },
  { id: "turismo", name: "TURISMO", icon: "fa-camera-retro", color: "#f5c945", sistema: "economico", x: 1305, y: 625, r: 29, plazo: "largo" },
  { id: "economia_popular", name: "ECONOMÍA\nPOPULAR", icon: "fa-store", color: "#f5c945", sistema: "economico", x: 760, y: 470, r: 29, plazo: "corto" },
  { id: "plazas_de_mercado", name: "PLAZAS DE\nMERCADO", icon: "fa-basket-shopping", color: "#f5c945", sistema: "economico", x: 650, y: 510, r: 29, plazo: "corto" },
  { id: "agricultura_urbana", name: "AGRICULTURA\nURBANA", icon: "fa-carrot", color: "#f5c945", sistema: "economico", x: 495, y: 140, r: 29, plazo: "corto" },

  { id: "transporte_publico", name: "TRANSPORTE\nPÚBLICO", icon: "fa-bus", color: "#5b8def", sistema: "movilidad", x: 600, y: 655, r: 56, plazo: "largo" },
  { id: "red_vial", name: "RED VIAL", icon: "fa-road", color: "#5b8def", sistema: "movilidad", x: 425, y: 705, r: 33, plazo: "largo" },
  { id: "ciclorrutas", name: "CICLORRUTAS", icon: "fa-bicycle", color: "#5b8def", sistema: "movilidad", x: 765, y: 705, r: 48, plazo: "corto" },
  { id: "andenes", name: "ANDENES", icon: "fa-person-walking", color: "#5b8def", sistema: "movilidad", x: 480, y: 610, r: 29, plazo: "corto" },
  { id: "metro", name: "METRO", icon: "fa-train-subway", color: "#5b8def", sistema: "movilidad", x: 905, y: 650, r: 29, plazo: "largo" },
  { id: "regiotram", name: "REGIOTRAM", icon: "fa-train", color: "#5b8def", sistema: "movilidad", x: 1290, y: 650, r: 29, plazo: "largo" },

  { id: "planeacion_urbana", name: "PLANEACIÓN\nURBANA", icon: "fa-compass-drafting", color: "#a276f2", sistema: "gobernanza", x: 160, y: 555, r: 29, plazo: "ambos" },
  { id: "organizaciones_comunitarias", name: "ORGANIZACIONES\nCOMUNITARIAS", icon: "fa-people-arrows", color: "#a276f2", sistema: "gobernanza", x: 95, y: 650, r: 29, plazo: "corto" },
  { id: "entidades_publicas", name: "ENTIDADES\nPÚBLICAS", icon: "fa-building-flag", color: "#a276f2", sistema: "gobernanza", x: 255, y: 525, r: 29, plazo: "ambos" },
  { id: "juntas_de_accion_comunal", name: "JUNTAS DE\nACCIÓN COMUNAL", icon: "fa-people-group", color: "#a276f2", sistema: "gobernanza", x: 210, y: 460, r: 29, plazo: "corto" },
];

/* -------- física: cada nodo guarda su posición "casa" (ancla) y velocidad -------- */
ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = (n.id === "vivienda");
});

/* Tipos de relación (hoja "4 convenciones") */
const TYPE_STYLE = {
  soporte:        { color: "#4ade80", width: 1.3, label: "Soporte", desc: "El elemento aporta condiciones, recursos o servicios para que otro funcione.", dash: false, doubleEnd: false, double: false },
  conectividad:   { color: "#5b8def", width: 1.3, label: "Conectividad", desc: "El elemento conecta lugares, personas, actividades o sistemas.", dash: false, doubleEnd: true, double: false },
  dependencia:    { color: "#f76fb0", width: 1.2, label: "Dependencia", desc: "El funcionamiento de un elemento depende de otro.", dash: true, doubleEnd: false, double: false },
  transformacion: { color: "#a276f2", width: 1.1, label: "Transformación", desc: "Un elemento modifica o transforma otro.", dash: false, doubleEnd: false, double: false },
};

/* -------- Aristas: 40 relaciones tomadas 1 a 1 de la hoja "Relaciones" -------- */
let RAW_EDGES = [
  { s: "vivienda", t: "equipamientos", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene la operación de los Equipamientos sociales del sector.", paginaTexto: "Hábitat y espacio urbano → Social, cultural y cuidado" },
  { s: "vivienda", t: "red_vial", type: "conectividad", sustento: "La Vivienda se conecta con el resto de la ciudad a través de la Red vial.", paginaTexto: "Hábitat y espacio urbano → Movilidad y conectividad" },
  { s: "vivienda", t: "ciclorrutas", type: "conectividad", sustento: "La Vivienda se conecta con el resto de la ciudad a través de las Ciclorrutas.", paginaTexto: "Hábitat y espacio urbano → Movilidad y conectividad" },
  { s: "vivienda", t: "transporte_publico", type: "conectividad", sustento: "La Vivienda se conecta con el resto de la ciudad a través del Transporte público.", paginaTexto: "Hábitat y espacio urbano → Movilidad y conectividad" },
  { s: "vivienda", t: "comercio", type: "dependencia", sustento: "El acceso al Comercio cercano condiciona la calidad de vida de la Vivienda.", paginaTexto: "Hábitat y espacio urbano → Económico y productivo" },
  { s: "vivienda", t: "empleo", type: "dependencia", sustento: "El acceso al Empleo cercano condiciona la sostenibilidad de la Vivienda.", paginaTexto: "Hábitat y espacio urbano → Económico y productivo" },
  { s: "vivienda", t: "educacion", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene la Educación del sector.", paginaTexto: "Hábitat y espacio urbano → Social, cultural y cuidado" },
  { s: "vivienda", t: "salud", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene el acceso a Salud del sector.", paginaTexto: "Hábitat y espacio urbano → Social, cultural y cuidado" },
  { s: "vivienda", t: "manzanas_del_cuidado", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene las Manzanas del Cuidado.", paginaTexto: "Hábitat y espacio urbano → Social, cultural y cuidado" },
  { s: "vivienda", t: "parques_urbanos", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene el uso de los Parques urbanos.", paginaTexto: "Hábitat y espacio urbano → Ambiental y ecológico" },
  { s: "vivienda", t: "corredores_verdes", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene los Corredores verdes cercanos.", paginaTexto: "Hábitat y espacio urbano → Ambiental y ecológico" },
  { s: "vivienda", t: "humedales", type: "soporte", sustento: "Vivienda aporta condiciones de borde que sostienen la relación con los Humedales.", paginaTexto: "Hábitat y espacio urbano → Ambiental y ecológico" },
  { s: "vivienda", t: "rios", type: "soporte", sustento: "Vivienda aporta condiciones de borde que sostienen la relación con los Ríos.", paginaTexto: "Hábitat y espacio urbano → Ambiental y ecológico" },
  { s: "vivienda", t: "espacio_publico", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene el Espacio público circundante.", paginaTexto: "Hábitat y espacio urbano → Hábitat y espacio urbano" },
  { s: "humedales", t: "rios", type: "soporte", sustento: "Los Humedales sostienen la regulación hídrica de los Ríos cercanos.", paginaTexto: "Ambiental y ecológico → Ambiental y ecológico" },
  { s: "rios", t: "quebradas", type: "conectividad", sustento: "Los Ríos conectan el sistema hídrico con las Quebradas.", paginaTexto: "Ambiental y ecológico → Ambiental y ecológico" },
  { s: "cerros", t: "corredores_ecologicos", type: "conectividad", sustento: "Los Cerros conectan con los Corredores ecológicos de la ciudad.", paginaTexto: "Ambiental y ecológico → Ambiental y ecológico" },
  { s: "corredores_ecologicos", t: "corredores_verdes", type: "conectividad", sustento: "Los Corredores ecológicos conectan con los Corredores verdes urbanos.", paginaTexto: "Ambiental y ecológico → Ambiental y ecológico" },
  { s: "arbolado_urbano", t: "corredores_verdes", type: "soporte", sustento: "El Arbolado urbano sostiene la estructura de los Corredores verdes.", paginaTexto: "Ambiental y ecológico → Ambiental y ecológico" },
  { s: "humedales", t: "educacion", type: "soporte", sustento: "Los Humedales sostienen procesos de Educación ambiental del sector.", paginaTexto: "Ambiental y ecológico → Social, cultural y cuidado" },
  { s: "parques_urbanos", t: "recreacion", type: "soporte", sustento: "Los Parques urbanos sostienen las actividades de Recreación.", paginaTexto: "Ambiental y ecológico → Social, cultural y cuidado" },
  { s: "transporte_publico", t: "empleo", type: "conectividad", sustento: "El Transporte público conecta a la población con las fuentes de Empleo.", paginaTexto: "Movilidad y conectividad → Económico y productivo" },
  { s: "red_vial", t: "comercio", type: "conectividad", sustento: "La Red vial conecta a la población con el Comercio.", paginaTexto: "Movilidad y conectividad → Económico y productivo" },
  { s: "ciclorrutas", t: "recreacion", type: "conectividad", sustento: "Las Ciclorrutas conectan a la población con espacios de Recreación.", paginaTexto: "Movilidad y conectividad → Social, cultural y cuidado" },
  { s: "produccion_artesanal", t: "patrimonio", type: "transformacion", sustento: "La Producción artesanal transforma saberes locales en Patrimonio cultural.", paginaTexto: "Económico y productivo → Social, cultural y cuidado" },
  { s: "educacion", t: "empleo", type: "dependencia", sustento: "El acceso al Empleo depende del nivel de Educación alcanzado.", paginaTexto: "Social, cultural y cuidado → Económico y productivo" },
  { s: "patrimonio", t: "turismo", type: "transformacion", sustento: "El Patrimonio se transforma en un activo para el Turismo.", paginaTexto: "Social, cultural y cuidado → Económico y productivo" },
  { s: "planeacion_urbana", t: "vivienda", type: "soporte", sustento: "La Planeación urbana sostiene y ordena el desarrollo de la Vivienda.", paginaTexto: "Gobernanza → Hábitat y espacio urbano" },
  { s: "organizaciones_comunitarias", t: "espacio_publico", type: "transformacion", sustento: "Las Organizaciones comunitarias transforman y activan el Espacio público.", paginaTexto: "Gobernanza → Hábitat y espacio urbano" },
  { s: "entidades_publicas", t: "humedales", type: "soporte", sustento: "Las Entidades públicas sostienen la protección de los Humedales.", paginaTexto: "Gobernanza → Ambiental y ecológico" },
  { s: "vivienda", t: "alumbrado_publico", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene el Alumbrado público del sector.", paginaTexto: "Hábitat y espacio urbano → Hábitat y espacio urbano" },
  { s: "vivienda", t: "redes_de_energia", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene las Redes de energía.", paginaTexto: "Hábitat y espacio urbano → Hábitat y espacio urbano" },
  { s: "vivienda", t: "alcantarillado", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene el Alcantarillado del sector.", paginaTexto: "Hábitat y espacio urbano → Hábitat y espacio urbano" },
  { s: "vivienda", t: "plazas", type: "soporte", sustento: "Vivienda aporta la base habitacional que sostiene las Plazas cercanas.", paginaTexto: "Hábitat y espacio urbano → Hábitat y espacio urbano" },
  { s: "humedales", t: "coberturas_vegetales", type: "soporte", sustento: "Los Humedales sostienen las Coberturas vegetales asociadas.", paginaTexto: "Ambiental y ecológico → Ambiental y ecológico" },
  { s: "rios", t: "fuentes_hidricas", type: "soporte", sustento: "Los Ríos sostienen el sistema de Fuentes hídricas de la ciudad.", paginaTexto: "Ambiental y ecológico → Ambiental y ecológico" },
  { s: "corredores_verdes", t: "ciclorrutas", type: "conectividad", sustento: "Los Corredores verdes conectan con la red de Ciclorrutas.", paginaTexto: "Ambiental y ecológico → Movilidad y conectividad" },
  { s: "equipamientos", t: "transporte_publico", type: "conectividad", sustento: "Los Equipamientos se conectan con la ciudad a través del Transporte público.", paginaTexto: "Social, cultural y cuidado → Movilidad y conectividad" },
  { s: "comercio", t: "transporte_publico", type: "conectividad", sustento: "El Comercio se conecta con la ciudad a través del Transporte público.", paginaTexto: "Económico y productivo → Movilidad y conectividad" },

  /* -------- 15 relaciones nuevas -------- */
  { s: "barrios", t: "espacio_publico", type: "soporte", sustento: "Los Barrios aportan la base habitacional que sostiene el Espacio público.", paginaTexto: "Hábitat y espacio urbano → Hábitat y espacio urbano" },
  { s: "barrios", t: "centros_comunitarios", type: "soporte", sustento: "Los Barrios sostienen la existencia de los Centros comunitarios.", paginaTexto: "Hábitat y espacio urbano → Social, cultural y cuidado" },
  { s: "barrios", t: "economia_popular", type: "soporte", sustento: "Los Barrios sostienen las dinámicas de la Economía popular.", paginaTexto: "Hábitat y espacio urbano → Económico y productivo" },
  { s: "centralidades", t: "comercio", type: "soporte", sustento: "Las Centralidades sostienen la concentración de Comercio.", paginaTexto: "Hábitat y espacio urbano → Económico y productivo" },
  { s: "centralidades", t: "transporte_publico", type: "conectividad", sustento: "Las Centralidades se conectan con la ciudad a través del Transporte público.", paginaTexto: "Hábitat y espacio urbano → Movilidad y conectividad" },
  { s: "lotes", t: "coberturas_vegetales", type: "transformacion", sustento: "Los Lotes se transforman al modificar las Coberturas vegetales existentes.", paginaTexto: "Hábitat y espacio urbano → Ambiental y ecológico" },
  { s: "plazas", t: "espacios_culturales", type: "soporte", sustento: "Las Plazas sostienen la existencia de Espacios culturales.", paginaTexto: "Hábitat y espacio urbano → Social, cultural y cuidado" },
  { s: "andenes", t: "espacio_publico", type: "conectividad", sustento: "Los Andenes conectan a las personas con el Espacio público.", paginaTexto: "Movilidad y conectividad → Hábitat y espacio urbano" },
  { s: "metro", t: "centralidades", type: "conectividad", sustento: "El Metro conecta a la ciudad con las Centralidades.", paginaTexto: "Movilidad y conectividad → Hábitat y espacio urbano" },
  { s: "regiotram", t: "empleo", type: "conectividad", sustento: "El Regiotram conecta a la población con las fuentes de Empleo.", paginaTexto: "Movilidad y conectividad → Económico y productivo" },
  { s: "plazas_de_mercado", t: "barrios", type: "soporte", sustento: "Las Plazas de mercado sostienen la vida cotidiana de los Barrios.", paginaTexto: "Económico y productivo → Hábitat y espacio urbano" },
  { s: "agricultura_urbana", t: "coberturas_vegetales", type: "soporte", sustento: "La Agricultura urbana sostiene y amplía las Coberturas vegetales.", paginaTexto: "Económico y productivo → Ambiental y ecológico" },
  { s: "bibliotecas", t: "barrios", type: "soporte", sustento: "Las Bibliotecas sostienen la vida cultural de los Barrios.", paginaTexto: "Social, cultural y cuidado → Hábitat y espacio urbano" },
  { s: "centros_deportivos", t: "espacio_publico", type: "soporte", sustento: "Los Centros deportivos sostienen el uso activo del Espacio público.", paginaTexto: "Social, cultural y cuidado → Hábitat y espacio urbano" },
  { s: "juntas_de_accion_comunal", t: "centros_comunitarios", type: "conectividad", sustento: "Las Juntas de Acción Comunal conectan a la comunidad con los Centros comunitarios.", paginaTexto: "Gobernanza → Social, cultural y cuidado" },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- física: longitud de reposo de cada resorte (arista) -------- */
RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  const dist = Math.hypot(t.x - s.x, t.y - s.y);
  edge.restLength = dist;
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
    ["end", "start"].forEach(pos => {
      const marker = document.createElementNS(SVG_NS, "marker");
      marker.setAttribute("id", `arrow-${type}-${pos}`);
      marker.setAttribute("viewBox", "0 0 10 10");
      marker.setAttribute("refX", "8"); marker.setAttribute("refY", "5");
      marker.setAttribute("markerWidth", "7"); marker.setAttribute("markerHeight", "7");
      marker.setAttribute("orient", pos === "end" ? "auto-start-reverse" : "auto");
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", "M0,0 L10,5 L0,10 z");
      path.setAttribute("fill", style.color);
      marker.appendChild(path);
      defs.appendChild(marker);
    });
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

/* doble línea paralela para relaciones de transformación */
function edgePathDataDouble(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const px = -uy, py = ux;
  const off = 2.2;
  const startPad = s.r + 2;
  const endPad = t.r + 8;
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

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);
    group.style.setProperty("--edge-color", style.color);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("class", "ods-edge edge-hit");

    let visual;
    if (style.double) {
      visual = document.createElementNS(SVG_NS, "g");
      visual.setAttribute("class", "ods-edge edge-visual edge-visual-double");
      const [d1, d2] = edgePathDataDouble(edge, s, t);
      [d1, d2].forEach((d, idx) => {
        const p = document.createElementNS(SVG_NS, "path");
        p.setAttribute("d", d);
        p.setAttribute("stroke", style.color);
        p.setAttribute("stroke-width", style.width);
        p.setAttribute("fill", "none");
        if (idx === 1) p.setAttribute("marker-end", `url(#arrow-${edge.type}-end)`);
        visual.appendChild(p);
      });
      hit.setAttribute("d", edgePathData(edge, s, t));
    } else {
      visual = document.createElementNS(SVG_NS, "path");
      visual.setAttribute("class", "ods-edge edge-visual");
      visual.setAttribute("stroke", style.color);
      visual.setAttribute("stroke-width", style.width);
      visual.setAttribute("fill", "none");
      const d = edgePathData(edge, s, t);
      visual.setAttribute("d", d);
      hit.setAttribute("d", d);
      if (style.dash) visual.setAttribute("stroke-dasharray", "6,5");
      visual.setAttribute("marker-end", `url(#arrow-${edge.type}-end)`);
      if (style.doubleEnd) visual.setAttribute("marker-start", `url(#arrow-${edge.type}-start)`);
    }
    visual.setAttribute("opacity", "0.35");
    edge._el = { visual, hit };

    group.appendChild(visual);
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

  ODS_NODES.forEach((node, index) => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node floating-node");
    group.style.setProperty("--float-delay", `${((index * 0.17) % 2.4).toFixed(2)}s`);
    group.setAttribute("data-id", node.id);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring");
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("stroke", node.color);
    circle.style.stroke = node.color;
    circle.style.color = node.color;
    circle.setAttribute("stroke-width", node.id === "vivienda" ? 3.5 : 2.5);
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

    const numEl = document.createElementNS(XHTML_NS, "div");
    numEl.setAttribute("class", "node-num");
    numEl.setAttribute("style", `color:${node.color};font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:${Math.max(node.r * 0.24, 9)}px;line-height:1;`);
    numEl.textContent = index + 1;

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon + " node-icon");
    iconEl.setAttribute("style", `color:${node.color}; font-size:${node.r * 0.42}px; margin:1px 0;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("class", "node-name");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.155, 7.5)}px; padding:0 3px; font-weight:700; color:#e7eaf2; line-height:1.15; white-space:pre-line;`);
    nameEl.textContent = node.name;

    wrapper.appendChild(numEl); wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
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
    const style = TYPE_STYLE[edge.type];
    if (style.double) {
      const [d1, d2] = edgePathDataDouble(edge, s, t);
      edge._el.visual.childNodes[0].setAttribute("d", d1);
      edge._el.visual.childNodes[1].setAttribute("d", d2);
      edge._el.hit.setAttribute("d", edgePathData(edge, s, t));
    } else {
      const d = edgePathData(edge, s, t);
      edge._el.visual.setAttribute("d", d);
      edge._el.hit.setAttribute("d", d);
    }
  });
}

let physicsRunning = false;
function physicsStep() {
  let moving = false;

  // Repulsión para que los nodos no se toquen
  for (let i = 0; i < ODS_NODES.length; i++) {
    for (let j = i + 1; j < ODS_NODES.length; j++) {
      const ni = ODS_NODES[i], nj = ODS_NODES[j];
      const dx = nj.x - ni.x, dy = nj.y - ni.y;
      const dist = Math.hypot(dx, dy) || 1;
      const minDist = ni.r + nj.r + 30; // Margen de separación
      if (dist < minDist) {
        const force = (minDist - dist) * 0.08;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        if (!ni.fixed) { ni.vx -= fx; ni.vy -= fy; }
        if (!nj.fixed) { nj.vx += fx; nj.vy += fy; }
      }
    }
  }

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
    /* vivienda tiene un ancla más fuerte para permanecer en el centro de la red */
    const anchorStrength = n.id === "vivienda" ? PHYSICS.anchor * 2.4 : PHYSICS.anchor;
    n.vx += (n.homeX - n.x) * anchorStrength;
    n.vy += (n.homeY - n.y) * anchorStrength;
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

/* -------- panel de sustento documental (clic en línea) -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  const title = `${s.name} → ${t.name}`.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = title;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label;
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent =
    edge.paginaTexto ? `Sistemas: ${edge.paginaTexto}` : "";

  document.getElementById("edgeInfoPanel").classList.add("visible");

  /* resaltar la fila correspondiente de la tabla */
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => {
    row.classList.toggle("row-highlight", Number(row.dataset.edge) === index);
  });
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.remove("row-highlight"));
}

/* -------- estado de visibilidad: por tipo (leyenda) + por nodo (clic) -------- */
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

/* clic en una bola: la apaga junto con sus líneas conectadas; clic de nuevo la enciende */
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
  group.addEventListener("click", () => {
    if (group.dataset.suppressClick) return;
    toggleNode(id);
  });
}

/* -------- spotlight (usado por las tarjetas de sistema) -------- */
let spotlight = null;

function clearSpotlight() {
  spotlight = null;
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  setActivePlazoButton("todos");
  document.getElementById("plazoDesc").textContent =
    "Viendo el modelo completo: los 6 sistemas y sus componentes, sin filtrar por plazo.";
  renderPlazoHow("todos");
  applySpotlightState();
}

function setSpotlightNodes(nodeIds, expand) {
  spotlight = { mode: "nodes", nodes: new Set(nodeIds), expand: !!expand };
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

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;

  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  if (key === "todos") {
    setSpotlightNodes(ODS_NODES.map(n => n.id), false);
  } else {
    const ids = ODS_NODES.filter(n => n.sistema === key).map(n => n.id);
    setSpotlightNodes(ids, true);
  }

  setActivePlazoButton("todos");
  document.getElementById("plazoDesc").textContent =
    "Viendo el modelo completo: los 6 sistemas y sus componentes, sin filtrar por plazo.";
  renderPlazoHow("todos");
  card.classList.add("active");
}

/* -------- selector grande: Corto plazo / Largo plazo / Modelo completo -------- */
const PLAZO_LABEL = { corto: "Corto plazo", largo: "Largo plazo" };
const PLAZO_DESC = {
  corto: "Corto plazo: se apagan los componentes que requieren obra estructural o procesos largos. Quedan encendidas las acciones rápidas y de bajo costo — lo que tu modelo plantea hacer ya.",
  largo: "Largo plazo: se apagan las acciones rápidas y de bajo costo. Quedan encendidos los componentes que requieren obra estructural, inversión mayor o procesos de varios años.",
};

/* Cómo se logrará cada plazo: mecanismo concreto + qué componentes de TU modelo cubre */
const PLAZO_HOW = {
  corto: [
    {
      icon: "fa-broom", color: "#f5c945",
      title: "Obra menor y mantenimiento urbano",
      text: "Contratos de obra menor, sin licitación mayor: adecuar, iluminar y señalizar lo que ya existe.",
      comps: "Espacio público · Plazas · Andenes · Alumbrado público",
    },
    {
      icon: "fa-hand-holding-dollar", color: "#4ade80",
      title: "Presupuesto participativo",
      text: "La comunidad decide y ejecuta directamente los recursos, a través de sus propias organizaciones.",
      comps: "Centros comunitarios · Bibliotecas · JAC · Organizaciones comunitarias",
    },
    {
      icon: "fa-store", color: "#ef9552",
      title: "Formalización y créditos blandos",
      text: "Ferias, formalización de vendedores y microcrédito: se activa la economía existente, sin obra nueva.",
      comps: "Comercio · Economía popular · Plazas de mercado · Producción artesanal",
    },
    {
      icon: "fa-bicycle", color: "#5b8def",
      title: "Señalización, no construcción",
      text: "Pintar y señalizar corredores ya existentes en la malla vial, sin obra civil mayor.",
      comps: "Ciclorrutas",
    },
    {
      icon: "fa-seedling", color: "#4ade80",
      title: "Jornadas de siembra y mantenimiento",
      text: "Programas replicables de arborización y cuidado de zonas verdes ya delimitadas.",
      comps: "Parques urbanos · Arbolado urbano",
    },
    {
      icon: "fa-people-roof", color: "#f76fb0",
      title: "Uso de infraestructura existente",
      text: "Programación y operación de espacios que ya están construidos, sin ampliar la planta física.",
      comps: "Manzanas del Cuidado · Espacios culturales · Centros deportivos · Recreación",
    },
  ],
  largo: [
    {
      icon: "fa-train-subway", color: "#5b8def",
      title: "Macroproyectos de movilidad",
      text: "Estudios de factibilidad, financiamiento con banca multilateral o Nación, y varios periodos de gobierno para construirse.",
      comps: "Metro · Regiotram · Red vial · Transporte público",
    },
    {
      icon: "fa-bolt", color: "#ef9552",
      title: "Planes maestros de servicios públicos",
      text: "Inversión plurianual ejecutada por las empresas de servicios públicos, con redes que se construyen por etapas.",
      comps: "Redes de energía · Alcantarillado",
    },
    {
      icon: "fa-water", color: "#4ade80",
      title: "Planes de manejo ambiental",
      text: "Compra de predios y restauración ecológica de largo aliento, coordinada con la autoridad ambiental.",
      comps: "Humedales · Ríos · Quebradas · Cerros · Corredores ecológicos · Corredores verdes",
    },
    {
      icon: "fa-building-columns", color: "#f76fb0",
      title: "Planes maestros de equipamientos",
      text: "Construcción o rehabilitación con inversión de capital y convocatorias de infraestructura social.",
      comps: "Educación · Salud · Equipamientos · Patrimonio",
    },
    {
      icon: "fa-city", color: "#f5c945",
      title: "Instrumentos de gestión del suelo",
      text: "Planes parciales, macroproyectos y atracción de inversión privada para transformar el uso del suelo.",
      comps: "Empleo · Turismo · Centralidades · Lotes",
    },
  ],
};

function setActivePlazoButton(mode) {
  document.querySelectorAll(".plazo-btn").forEach(b => b.classList.toggle("active", b.dataset.plazo === mode));
}

function renderPlazoHow(mode) {
  const container = document.getElementById("plazoHow");
  if (!container) return;
  const items = PLAZO_HOW[mode];
  if (!items) {
    container.innerHTML = `<div class="plazo-how-empty">Elige "Corto plazo" o "Largo plazo" para ver cómo se logra cada uno con los componentes de tu modelo.</div>`;
    return;
  }
  container.innerHTML = items.map(it => `
    <div class="plazo-how-card" style="--how-color:${it.color};">
      <div class="plazo-how-icon"><i class="fa-solid ${it.icon}"></i></div>
      <div class="plazo-how-content">
        <h5>${it.title}</h5>
        <p>${it.text}</p>
        <span class="plazo-how-components">${it.comps}</span>
      </div>
    </div>
  `).join("");
}

function setPlazo(mode) {
  setActivePlazoButton(mode);
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));

  if (mode === "todos") {
    spotlight = null;
    document.getElementById("plazoDesc").textContent =
      "Viendo el modelo completo: los 6 sistemas y sus componentes, sin filtrar por plazo.";
    renderPlazoHow("todos");
    applySpotlightState();
    return;
  }

  const ids = ODS_NODES.filter(n => n.plazo === mode || n.plazo === "ambos").map(n => n.id);
  spotlight = { mode: "nodes", nodes: new Set(ids), expand: false };
  document.getElementById("plazoDesc").textContent = PLAZO_DESC[mode];
  renderPlazoHow(mode);
  applySpotlightState();
}

/* -------- panel de convenciones (leyenda de tipos de relación) -------- */
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

/* -------- controles Todos / por tipo de relación -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");

  const groups = {
    all: ["soporte", "conectividad", "dependencia", "transformacion"],
    soporte: ["soporte"],
    conectividad: ["conectividad"],
    dependencia: ["dependencia"],
    transformacion: ["transformacion"],
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

/* -------- CONSTRUCTOR: añadir componentes y relaciones -------- */
const ICON_BY_SISTEMA = {
  eco: "fa-tree",
  habitat: "fa-house",
  movilidad: "fa-road",
  economico: "fa-coins",
  social: "fa-people-roof",
  gobernanza: "fa-landmark",
};

function populateEdgeSelects() {
  const fromSel = document.getElementById("edgeFrom");
  const toSel = document.getElementById("edgeTo");
  if (!fromSel || !toSel) return;
  const currentFrom = fromSel.value;
  const currentTo = toSel.value;
  fromSel.innerHTML = "<option value=\"\">De…</option>" + ODS_NODES.map(n =>
    `<option value="${n.id}"${n.id === currentFrom ? " selected" : ""}>${n.name.replace(/\n/g, " ")}</option>`).join("");
  toSel.innerHTML = "<option value=\"\">Hacia…</option>" + ODS_NODES.map(n =>
    `<option value="${n.id}"${n.id === currentTo ? " selected" : ""}>${n.name.replace(/\n/g, " ")}</option>`).join("");
}

function addNode() {
  const input = document.getElementById("nodeName");
  const sel = document.getElementById("nodeCat");
  const name = (input.value || "").trim().toUpperCase();
  const sistema = sel.value;
  if (!name) { flashButton(input.closest(".builder-form").querySelector(".btn-builder")); return; }
  if (ODS_NODES.some(n => n.id === slugify(name))) {
    alert("Ya existe un componente con ese nombre.");
    return;
  }
  const node = {
    id: slugify(name),
    name: name,
    icon: ICON_BY_SISTEMA[sistema],
    color: SISTEMAS[sistema].color,
    sistema: sistema,
    x: 500 + Math.random() * 300,
    y: 120 + Math.random() * 300,
    r: 29,
    plazo: "ambos",
  };
  node.homeX = node.x; node.homeY = node.y;
  node.vx = 0; node.vy = 0; node.fixed = false;
  ODS_NODES.push(node);
  input.value = "";
  refreshAfterBuilder();
}

function addEdge() {
  const from = document.getElementById("edgeFrom").value;
  const to = document.getElementById("edgeTo").value;
  const type = document.getElementById("edgeType").value;
  const just = document.getElementById("edgeJust").value.trim();
  const btn = document.getElementById("edgeJust").closest(".builder-form").querySelector(".btn-builder");
  if (!from || !to || from === to) { flashButton(btn); return; }
  const s = nodeById(from), t = nodeById(to);
  if (!s || !t) return;
  RAW_EDGES.push({
    s: from,
    t: to,
    type,
    sustento: just || "Supuesto por definir.",
    paginaTexto: `${SISTEMAS[s.sistema].label} → ${SISTEMAS[t.sistema].label}`,
  });
  const last = RAW_EDGES[RAW_EDGES.length - 1];
  last.restLength = Math.hypot(t.x - s.x, t.y - s.y) || 300;
  document.getElementById("edgeJust").value = "";
  flashButton(btn);
  refreshAfterBuilder();
}

function refreshAfterBuilder() {
  populateEdgeSelects();
  renderTable();
  renderNetwork();
}

function flashButton(btn) {
  if (!btn) return;
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 700);
}

function slugify(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

const TYPE_TAG_CLASS = {
  soporte: "sop", conectividad: "con", dependencia: "dep", transformacion: "trans",
};
const TYPE_LINE_DESC = {
  soporte: "Continua",
  conectividad: "Continua (doble flecha)",
  dependencia: "Punteada",
  transformacion: "Doble línea",
};
const TYPE_COLOR_NAME = {
  soporte: "Verde", conectividad: "Azul", dependencia: "Rosado", transformacion: "Morado",
};

/* -------- tabla del modelo: generada dinámicamente -------- */
function renderTable() {
  const container = document.getElementById("modelTable");
  if (!container) return;
  const header = container.querySelector(".matrix-row.header");
  container.innerHTML = "";
  container.appendChild(header);

  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];
    const row = document.createElement("div");
    row.className = "matrix-row";
    row.dataset.edge = i;
    row.innerHTML = `
      <div class="matrix-cell">${i + 1}</div>
      <div class="matrix-cell">${s.name.replace(/\n/g, " ")} → ${t.name.replace(/\n/g, " ")}</div>
      <div class="matrix-cell">${TYPE_LINE_DESC[edge.type]}</div>
      <div class="matrix-cell"><span class="legend-swatch legend-swatch-line" style="border-color:${style.color};${style.dash ? "border-top-style:dashed;" : ""}"></span><span style="color:${style.color};font-weight:700;">${TYPE_COLOR_NAME[edge.type]}</span></div>
      <div class="matrix-cell"><span class="alignment-tag ${TYPE_TAG_CLASS[edge.type]}">${style.label}</span></div>
      <div class="matrix-cell quote-cell">“${edge.sustento}”</div>
    `;
    row.addEventListener("click", () => showEdgeInfo(i));
    container.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
  populateEdgeSelects();
  renderTable();
  renderPlazoHow("todos");
});

/* acceso público para extensiones y pruebas */
if (typeof window !== "undefined") {
  window.__odsNodes = ODS_NODES;
  window.__odsEdges = RAW_EDGES;
}


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
