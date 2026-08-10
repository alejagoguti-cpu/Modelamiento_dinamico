// =============================================================================
// RAPOT · Módulo 01 — Construir la Red
// Datos y lógica de la vista de red por estructura (EEP / EFS / ESE / EIP)
// =============================================================================

console.log('✓ Módulo 01 iniciando...');

// -----------------------------------------------------------------------
// 1. DATOS POR ESTRUCTURA
// -----------------------------------------------------------------------
// Cada estructura tiene su propia lista de relaciones {origen, destino, tipo, sustento, page}.
// EIP se deja intencionalmente vacía: la red de Patrimonios todavía no está
// construida y no debe inventarse información.
// -----------------------------------------------------------------------

const POT_DATA = {
  EEP: [
    { origen: "Quebradas", destino: "Ríos", tipo: "Directa", sustento: "El agua llega a Bogotá por cientos de escorrentías, quebradas y ríos que alimentan las cuatro cuencas.", page: "p. 51" },
    { origen: "Ríos", destino: "Quebradas", tipo: "Soporte", sustento: "Las cuatro cuencas (Tunjuelo, Fucha, Salitre y Torca) se alimentan de las quebradas y desembocan en el río Bogotá.", page: "p. 51" },
    { origen: "Ríos", destino: "Humedales", tipo: "Directa", sustento: "Los humedales son ecosistemas clave para la mitigación y adaptación al cambio climático, ligados al ciclo del río.", page: "p. 51" },
    { origen: "Humedales", destino: "Áreas protegidas", tipo: "Soporte", sustento: "El POT amplía en un 20% el área de humedales y declara dos nuevos como reservas.", page: "p. 54" },
    { origen: "Cerros Orientales", destino: "Humedales", tipo: "Directa", sustento: "Los Cerros Orientales conectan espacios verdes hasta los humedales y parques de montaña.", page: "p. 58" },
    { origen: "Cerros Orientales", destino: "Parques ecológicos de montaña", tipo: "Directa", sustento: "Los Cerros Orientales incluyen parques ecológicos de montaña como Entrenubes y Soratama.", page: "p. 58" },
    { origen: "Cerros Orientales", destino: "Áreas protegidas", tipo: "Soporte", sustento: "Los Cerros Orientales priorizan coberturas vegetales que conecten las áreas protegidas.", page: "p. 58" },
    { origen: "Cerros Orientales", destino: "Coberturas vegetales", tipo: "Directa", sustento: "Gracias al Manual de coberturas, los Cerros Orientales priorizan más y mejores coberturas vegetales.", page: "p. 58" },
    { origen: "Parques de borde", destino: "Coberturas vegetales", tipo: "Directa", sustento: "La red de parques de borde contribuye a la mejora de las coberturas vegetales.", page: "p. 58" },
    { origen: "Parques de borde", destino: "Ríos", tipo: "Resiliencia", sustento: "Los parques de borde se establecen a lo largo de la ronda del río Bogotá.", page: "p. 58" },
    { origen: "Áreas de resiliencia climática", destino: "Coberturas vegetales", tipo: "Resiliencia", sustento: "Las áreas de resiliencia deben contar con coberturas que optimicen condiciones ambientales.", page: "p. 58" },
    { origen: "Bosques urbanos", destino: "Coberturas vegetales", tipo: "Directa", sustento: "El POT delinea 21 áreas estratégicas como bosques urbanos con nuevo manual de coberturas.", page: "p. 57" },
    { origen: "Bosques urbanos", destino: "Áreas protegidas", tipo: "Indirecta", sustento: "Los bosques urbanos incrementan la biodiversidad dentro de las áreas protegidas.", page: "p. 57" },
    { origen: "Corredores montañosos", destino: "Reservas forestales", tipo: "Soporte", sustento: "El POT protege corredores montañosos y reservas forestales como parte de la Estructura Ecológica Regional.", page: "p. 22" },
    { origen: "Reservas forestales", destino: "Ríos", tipo: "Soporte", sustento: "Las reservas forestales forman la Estructura Ecológica Regional que asegura el abastecimiento hídrico.", page: "p. 22" },
    { origen: "Complejos de páramos", destino: "Ríos", tipo: "Soporte", sustento: "El agua proviene del sistema de páramos más grande del mundo, por escorrentías, quebradas y ríos.", page: "p. 51" },
    { origen: "Paisajes sostenibles", destino: "Áreas protegidas", tipo: "Soporte", sustento: "El POT protege Paisajes Sostenibles y Parques Ecológicos de Montaña como conjunto.", page: "p. 21" },
    { origen: "Áreas protegidas", destino: "Complejos de páramos", tipo: "Directa", sustento: "El POT amplía protección sobre cerros orientales, corredor de páramos de Sumapaz y Chingaza.", page: "p. 21" },
    { origen: "Humedales", destino: "Áreas de resiliencia climática", tipo: "Resiliencia", sustento: "Los humedales regulan el agua, previenen inundaciones y son hogar de especies polinizadoras.", page: "p. 57" }
  ],
  EFS: [
    { origen: "Servicios de cuidado", destino: "Equipamientos", tipo: "Indirecta", sustento: "Los servicios de cuidado se apoyan en la red de equipamientos comunitarios.", page: "p. 29" },
    { origen: "Ciclorrutas", destino: "Vivienda", tipo: "Indirecta", sustento: "Las ciclorrutas amplían el acceso de las viviendas a la red de movilidad.", page: "p. 39" },
    { origen: "Servicios públicos", destino: "Vivienda", tipo: "Indirecta", sustento: "Los servicios públicos condicionan la habitabilidad de la vivienda.", page: "p. 34" },
    { origen: "Transporte público", destino: "Vivienda", tipo: "Indirecta", sustento: "El transporte público facilita el acceso de las comunidades a la vivienda.", page: "p. 30" },
    { origen: "Vivienda", destino: "Servicios sociales", tipo: "Soporte", sustento: "La vivienda se articula con los servicios sociales de cuidado.", page: "p. 29" },
    { origen: "Servicios sociales", destino: "Equipamientos", tipo: "Indirecta", sustento: "Los servicios sociales se prestan a través de los equipamientos existentes.", page: "p. 32" },
    { origen: "Corredores verdes", destino: "Ciclorrutas", tipo: "Soporte", sustento: "Los corredores verdes conectan la red de ciclorrutas de la ciudad.", page: "p. 39" },
    { origen: "Corredores verdes", destino: "Transporte público", tipo: "Soporte", sustento: "Los corredores verdes se integran con los puntos de transporte público.", page: "p. 30" },
    { origen: "Red vial", destino: "Transporte público", tipo: "Soporte", sustento: "La red vial es la base física del transporte público urbano.", page: "p. 30" },
    { origen: "Manzanas del Cuidado", destino: "Equipamientos", tipo: "Soporte", sustento: "Las Manzanas del Cuidado concentran equipamientos de servicios y cuidado.", page: "p. 32" },
    { origen: "Parques", destino: "Manzanas del Cuidado", tipo: "Soporte", sustento: "Los parques hacen parte del sistema de Manzanas del Cuidado.", page: "p. 40" },
    { origen: "Red vial", destino: "Equipamientos", tipo: "Soporte", sustento: "La red vial articula el acceso a los equipamientos de la ciudad.", page: "p. 36" },
    { origen: "Vivienda", destino: "Equipamientos", tipo: "Soporte", sustento: "La vivienda se articula con los sistemas de cuidado y equipamientos comunitarios.", page: "p. 29" },
    { origen: "Servicios públicos", destino: "Equipamientos", tipo: "Directa", sustento: "Los servicios públicos son prestados directamente en los equipamientos.", page: "p. 34" },
    { origen: "Manzanas del Cuidado", destino: "Vivienda", tipo: "Soporte", sustento: "Las Manzanas del Cuidado se organizan alrededor de la vivienda cercana.", page: "p. 32" }
  ],
  ESE: [
    { origen: "Servicios empresariales", destino: "Distrito Centro Tecnológico e Innovación", tipo: "Soporte", sustento: "Los servicios empresariales se apoyan en el Distrito Centro Tecnológico e Innovación.", page: "p. 46" },
    { origen: "Distrito Centro Tecnológico e Innovación", destino: "Sistema de educación educación", tipo: "Soporte", sustento: "El Distrito Centro Tecnológico e Innovación se articula con el sistema de educación.", page: "p. 51" },
    { origen: "Distrito Centro Tecnológico e Innovación", destino: "Zonas industriales", tipo: "Indirecta", sustento: "El Distrito Centro Tecnológico e Innovación incrementa la productividad de las zonas industriales.", page: "p. 50" },
    { origen: "Zonas industriales", destino: "Servicios empresariales", tipo: "Soporte", sustento: "Las zonas industriales generan demanda de servicios empresariales.", page: "p. 48" },
    { origen: "Zonas industriales", destino: "Plazas de mercado", tipo: "Soporte", sustento: "Las zonas industriales abastecen las plazas de mercado locales.", page: "p. 60" },
    { origen: "Sistema de educación educación", destino: "Servicios empresariales", tipo: "Soporte", sustento: "El sistema de educación forma el talento humano de los servicios empresariales.", page: "p. 53" },
    { origen: "Servicios empresariales", destino: "Centros financieros", tipo: "Soporte", sustento: "Los servicios empresariales dependen del respaldo de los centros financieros.", page: "p. 55" },
    { origen: "Zonas industriales", destino: "Producción artesanal", tipo: "Soporte", sustento: "Las zonas industriales complementan la producción artesanal local.", page: "p. 61" }
  ],
  // Estructura de Patrimonios: todavía en construcción.
  // No se agregan nodos ni relaciones hasta que exista información real.
  EIP: [
    { origen: "Patrimonio material", destino: "Patrimonio inmaterial", tipo: "Soporte", sustento: "La EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio.", page: "p. 196" },
    { origen: "Patrimonio material", destino: "Patrimonio natural", tipo: "Soporte", sustento: "La EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio.", page: "p. 196" },
    { origen: "Patrimonio inmaterial", destino: "Patrimonio natural", tipo: "Soporte", sustento: "La EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio.", page: "p. 196" },
    { origen: "Patrimonio arqueológico", destino: "Patrimonio natural", tipo: "Soporte", sustento: "Hoy pueden ser referentes de procesos adaptativos y que revelan prácticas de integralidad de la cultura con la naturaleza.", page: "p. 198" },
    { origen: "Patrimonio arqueológico", destino: "Patrimonio material", tipo: "Resiliencia", sustento: "Este patrimonio cultural se convirtió en un referente de movilización.", page: "p. 198" },
    { origen: "Sistema de Sitios Sagrados", destino: "Patrimonio inmaterial", tipo: "Resiliencia", sustento: "Son el testimonio de complejas estrategias de cómo interpretamos y valoramos las huellas del territorio que…", page: "p. 186" }
  ]
};

// -----------------------------------------------------------------------
// 2. CONFIGURACIÓN VISUAL DE LAS ESTRUCTURAS
// -----------------------------------------------------------------------
const STRUCTURES = {
  EEP: {
    id: 'EEP',
    shortName: 'EEP',
    label: 'EEP - Ecológica',
    fullName: 'Estructura Ecológica Principal',
    color: '#34d399',
    icon: 'fa-leaf',
    status: 'ready'
  },
  EFS: {
    id: 'EFS',
    shortName: 'EFS',
    label: 'EFS - Funcional',
    fullName: 'Estructura Funcional y del Cuidado',
    color: '#3b82f6',
    icon: 'fa-route',
    status: 'ready'
  },
  ESE: {
    id: 'ESE',
    shortName: 'ESE',
    label: 'ESE - Socioeconómica',
    fullName: 'Estructura Socioeconómica, Creativa y de Innovación',
    color: '#ef9552',
    icon: 'fa-briefcase',
    status: 'ready'
  },
  EIP: {
    id: 'EIP',
    shortName: 'EIP',
    label: 'EIP - Patrimonios',
    fullName: 'Estructura Integradora de Patrimonios',
    color: '#b06bf7',
    icon: 'fa-landmark',
    status: 'ready'
  }
};

const STRUCT_ORDER = ['EEP', 'EFS', 'ESE', 'EIP'];

// Tipos de relación → estilo de línea DENTRO DEL LIENZO.
// Estos colores son independientes de los de la leyenda (--rel-*, que van en blanco
// para Directa/Indirecta): dentro del grafo, Directa/Indirecta/Soporte se ven en
// naranja (igual que las capturas de referencia) y solo Resiliencia va en azul.
const REL_STYLE = {
  Directa:     { color: 'var(--line-directa)',     hex: '#ff9a3d', dashed: false },
  Indirecta:   { color: 'var(--line-indirecta)',    hex: '#ff9a3d', dashed: true  },
  Soporte:     { color: 'var(--line-soporte)',      hex: '#ff9a3d', dashed: false },
  Resiliencia: { color: 'var(--line-resiliencia)',  hex: '#4d8dff', dashed: false }
};

// -----------------------------------------------------------------------
// 2.1 LAYOUT FIJO (posiciones exactas por estructura, igual que el diseño)
// -----------------------------------------------------------------------
// Coordenadas como fracción (0–1) del tamaño del canvas + radio en px.
// Si una estructura tiene layout fijo, el grafo NO usa simulación de fuerzas:
// se dibuja siempre en las mismas posiciones, ordenado, igual que el mockup.
// "Cerros Orientales" ocupa la posición superior derecha del diseño
// (el nodo hub que conecta Humedales, Áreas protegidas, Parques ecológicos
// de montaña y Coberturas vegetales).
const FIXED_LAYOUTS = {
  EEP: {
    'Ríos':                           { x: 0.146, y: 0.273, r: 39 },
    'Corredores montañosos':          { x: 0.556, y: 0.102, r: 24 },
    'Cerros Orientales':       { x: 0.778, y: 0.089, r: 24 },
    'Quebradas':                      { x: 0.390, y: 0.258, r: 24 },
    'Áreas protegidas':               { x: 0.727, y: 0.265, r: 29 },
    'Parques ecológicos de montaña':  { x: 0.855, y: 0.415, r: 29 },
    'Humedales':                      { x: 0.528, y: 0.449, r: 49 },
    'Bosques urbanos':                { x: 0.150, y: 0.474, r: 27 },
    'Áreas de resiliencia climática': { x: 0.295, y: 0.468, r: 29 },
    'Reservas forestales':            { x: 0.727, y: 0.642, r: 29 },
    'Coberturas vegetales':           { x: 0.241, y: 0.701, r: 44 },
    'Complejos de páramos':           { x: 0.069, y: 0.753, r: 25 },
    'Parques de borde':               { x: 0.428, y: 0.784, r: 24 },
    'Paisajes sostenibles':           { x: 0.253, y: 0.900, r: 24 }
  },
  // Posiciones calculadas directamente sobre la captura de referencia
  // "Estructura Funcional y del Cuidado" (11 nodos, igual que la imagen).
  EFS: {
    'Servicios de cuidado':  { x: 0.531, y: 0.151, r: 28 },
    'Equipamientos':         { x: 0.891, y: 0.169, r: 40 },
    'Servicios públicos':    { x: 0.328, y: 0.265, r: 30 },
    'Ciclorrutas':           { x: 0.073, y: 0.319, r: 32 },
    'Servicios sociales':    { x: 0.727, y: 0.359, r: 29 },
    'Vivienda':              { x: 0.531, y: 0.491, r: 54 },
    'Transporte público':    { x: 0.205, y: 0.560, r: 31 },
    'Red vial':              { x: 0.883, y: 0.648, r: 31 },
    'Parques':               { x: 0.331, y: 0.711, r: 27 },
    'Manzanas del Cuidado':  { x: 0.487, y: 0.805, r: 37 },
    'Corredores verdes':     { x: 0.172, y: 0.846, r: 34 }
  },
  // Posiciones calculadas directamente sobre la captura de referencia
  // "Estructura Socioeconómica, Creativa y de Innovación" (9 nodos, igual que la imagen).
  ESE: {
    'Servicios empresariales':                  { x: 0.093, y: 0.301, r: 48 },
    'Distrito Centro Tecnológico e Innovación': { x: 0.423, y: 0.176, r: 34 },
    'Centros de abastecimiento':                { x: 0.718, y: 0.156, r: 25 },
    'Zonas industriales':                       { x: 0.859, y: 0.392, r: 49 },
    'Plazas de mercado':                        { x: 0.327, y: 0.418, r: 31 },
    'Sistema de educación educación':           { x: 0.457, y: 0.574, r: 47 },
    'Zonas interés turístico':                  { x: 0.854, y: 0.623, r: 25 },
    'Centros financieros':                      { x: 0.103, y: 0.708, r: 28 },
    'Producción artesanal':                     { x: 0.286, y: 0.869, r: 28 }
  },
  // Posiciones calculadas directamente sobre la captura de referencia
  // "Estructura Integradora de Patrimonios" (5 nodos, igual que la imagen).
  EIP: {
    'Sistema de Sitios Sagrados': { x: 0.164, y: 0.404, r: 32 },
    'Patrimonio arqueológico':    { x: 0.531, y: 0.295, r: 31 },
    'Patrimonio inmaterial':      { x: 0.811, y: 0.384, r: 32 },
    'Patrimonio material':        { x: 0.633, y: 0.653, r: 29 },
    'Patrimonio natural':         { x: 0.211, y: 0.760, r: 52 }
  }
};

// Umbral de grado para considerar un nodo "principal" (hub) dentro de la red visible
const PRINCIPAL_DEGREE_THRESHOLD = 4;

// -----------------------------------------------------------------------
// 3. ICONOGRAFÍA POR PALABRA CLAVE (Font Awesome — sin emojis)
// -----------------------------------------------------------------------
const ICON_RULES = [
  [/quebrad|río|ríos|humedal|agua|cuenca/i, 'fa-water'],
  [/bosque|árbol|cobertura|vegetal|páramo/i, 'fa-tree'],
  [/parque|recreaci[oó]n|espacio p[uú]blico/i, 'fa-tree-city'],
  [/vivienda|habitar|hogar/i, 'fa-house'],
  [/transporte|movilidad|ciclorruta|ciclocarril|red vial|vial/i, 'fa-route'],
  [/deporte/i, 'fa-futbol'],
  [/educaci[oó]n|formaci[oó]n|universidad/i, 'fa-graduation-cap'],
  [/salud/i, 'fa-heart-pulse'],
  [/cuidad/i, 'fa-hand-holding-heart'],
  [/equipamiento/i, 'fa-building-columns'],
  [/comunidad/i, 'fa-people-group'],
  [/energ[ií]a/i, 'fa-bolt'],
  [/telecomunicaci/i, 'fa-tower-broadcast'],
  [/saneamiento|potable|infraestructura de servicios/i, 'fa-droplet'],
  [/seguridad alimentaria|huerto|agricultura/i, 'fa-seedling'],
  [/patrimon|memoria|identidad|pr[aá]ctica cultural|saber/i, 'fa-landmark'],
  [/cultura/i, 'fa-masks-theater'],
  [/empleo|comercio|mercado|bien(es)? y servicio/i, 'fa-store'],
  [/econom[ií]a|distrito creativo|cooperativa/i, 'fa-briefcase'],
  [/innovaci[oó]n|tecnol[oó]gic|investigaci[oó]n|centro de innovaci[oó]n/i, 'fa-lightbulb'],
  [/finanza/i, 'fa-coins'],
  [/turismo/i, 'fa-umbrella-beach'],
  [/industria|producci[oó]n|agroindustria/i, 'fa-industry'],
  [/reserva forestal|corredor montañoso|área protegida|cerro/i, 'fa-mountain-sun'],
  [/resiliencia clim[aá]tica|paisaje sostenible/i, 'fa-cloud-sun'],
  [/emprendimiento/i, 'fa-rocket']
];

// Íconos exactos por nodo (tienen prioridad sobre las reglas por palabra clave).
// Se usan para los nodos de EFS y ESE, cuyos íconos en la captura de referencia
// no coinciden con la regla genérica por palabra clave.
const ICON_OVERRIDES = {
  // EFS — Estructura Funcional y del Cuidado
  'Servicios de cuidado': 'fa-heart',
  'Equipamientos': 'fa-building',
  'Servicios públicos': 'fa-faucet',
  'Ciclorrutas': 'fa-bicycle',
  'Servicios sociales': 'fa-hand-holding-heart',
  'Transporte público': 'fa-bus',
  'Red vial': 'fa-road',
  'Manzanas del Cuidado': 'fa-share-nodes',
  'Corredores verdes': 'fa-leaf',
  // ESE — Estructura Socioeconómica, Creativa y de Innovación
  'Servicios empresariales': 'fa-briefcase',
  'Distrito Centro Tecnológico e Innovación': 'fa-share-nodes',
  'Centros de abastecimiento': 'fa-truck',
  'Sistema de educación educación': 'fa-graduation-cap',
  'Zonas interés turístico': 'fa-map-location-dot',
  'Centros financieros': 'fa-building-columns',
  'Producción artesanal': 'fa-gem',
  // EIP — Estructura Integradora de Patrimonios
  'Sistema de Sitios Sagrados': 'fa-place-of-worship',
  'Patrimonio arqueológico': 'fa-monument',
  'Patrimonio inmaterial': 'fa-masks-theater',
  'Patrimonio material': 'fa-landmark',
  'Patrimonio natural': 'fa-mountain'
};

function getNodeIcon(label, fallback) {
  if (ICON_OVERRIDES[label]) return ICON_OVERRIDES[label];
  for (const [regex, icon] of ICON_RULES) {
    if (regex.test(label)) return icon;
  }
  return fallback;
}

// -----------------------------------------------------------------------
// 4. ESTADO GLOBAL
// -----------------------------------------------------------------------
let activeStructureId = 'EEP';
let structureGraphs = {};     // { EEP: { nodes:[...], links:[...] }, ... }
let nodes = [];
let links = [];
let simulation = null;
let selectedNodeId = null;
let activeTypes = new Set(Object.keys(REL_STYLE));

// Persisten entre cambios de estructura (requisito §21-§23)
let showPrincipalNodes = true;
let showEdges = true;

// -----------------------------------------------------------------------
// 5. CONSTRUCCIÓN DE LOS GRAFOS (una vez, al cargar)
// -----------------------------------------------------------------------
function buildAllGraphs() {
  STRUCT_ORDER.forEach(structId => {
    const rows = POT_DATA[structId] || [];
    const nodeMap = new Map();
    const structLinks = [];
    const cfg = STRUCTURES[structId];

    rows.forEach(rel => {
      [rel.origen, rel.destino].forEach(name => {
        if (!nodeMap.has(name)) {
          nodeMap.set(name, {
            id: name,
            label: name,
            struct: structId,
            color: cfg.color,
            icon: getNodeIcon(name, cfg.icon),
            degree: 0
          });
        }
      });
      nodeMap.get(rel.origen).degree++;
      nodeMap.get(rel.destino).degree++;
      structLinks.push({
        source: rel.origen,
        target: rel.destino,
        tipo: rel.tipo,
        sustento: rel.sustento,
        page: rel.page
      });
    });

    // Nodos sin relaciones pero presentes en el layout fijo de referencia
    // (p. ej. "Centros de abastecimiento" y "Zonas interés turístico" en ESE):
    // deben verse en el lienzo igual que en la captura, aunque no tengan flechas.
    const fixedForStruct = FIXED_LAYOUTS[structId];
    if (fixedForStruct) {
      Object.keys(fixedForStruct).forEach(name => {
        if (!nodeMap.has(name)) {
          nodeMap.set(name, {
            id: name,
            label: name,
            struct: structId,
            color: cfg.color,
            icon: getNodeIcon(name, cfg.icon),
            degree: 0
          });
        }
      });
    }

    const structNodes = Array.from(nodeMap.values());
    const fixedLayout = FIXED_LAYOUTS[structId];
    structNodes.forEach(n => {
      const fixed = fixedLayout && fixedLayout[n.id];
      n.r = fixed ? fixed.r : Math.max(26, Math.min(54, 24 + n.degree * 4));
      n.kind = n.degree >= PRINCIPAL_DEGREE_THRESHOLD ? 'principal' : 'secondary';
      n.fixedPos = fixed ? { x: fixed.x, y: fixed.y } : null;
    });

    structureGraphs[structId] = { nodes: structNodes, links: structLinks };
  });

  console.log('✅ Grafos construidos:', STRUCT_ORDER.map(s => `${s}:${structureGraphs[s].nodes.length}n/${structureGraphs[s].links.length}r`).join(' · '));
}

// -----------------------------------------------------------------------
// 6. SIDEBAR DE ESTRUCTURAS (panel izquierdo del módulo)
// -----------------------------------------------------------------------
function renderStructureList() {
  const wrap = document.getElementById('structureList');
  if (!wrap) return;
  wrap.innerHTML = '';

  STRUCT_ORDER.forEach(structId => {
    const cfg = STRUCTURES[structId];
    const g = structureGraphs[structId];
    const count = cfg.status === 'construction' ? '–' : g.nodes.length;

    const item = document.createElement('div');
    item.className = 'structure-item' + (structId === activeStructureId ? ' active' : '');
    item.dataset.struct = structId;
    item.style.setProperty('--struct-color', cfg.color);
    item.style.setProperty('--struct-bg', hexToRgba(cfg.color, 0.14));
    item.style.setProperty('--struct-border', hexToRgba(cfg.color, 0.45));
    item.innerHTML = `
      <span class="filter-dot" style="background:${cfg.color};"></span>
      <span class="structure-name">${cfg.label}</span>
      <span class="structure-count">${count}</span>
    `;
    item.addEventListener('click', () => selectStructure(structId));
    wrap.appendChild(item);
  });
}

// -----------------------------------------------------------------------
// 7. SELECCIÓN DE ESTRUCTURA
// -----------------------------------------------------------------------
function selectStructure(structId) {
  activeStructureId = structId;
  selectedNodeId = null;
  document.getElementById('detailPanel').style.display = 'none';

  renderStructureList();
  updateTitleCard();
  updateStatsForActiveStructure();

  const cfg = STRUCTURES[structId];
  if (cfg.status === 'construction') {
    showConstructionState(cfg);
    return;
  }
  hideConstructionState();

  const g = structureGraphs[structId];
  nodes = g.nodes.map(n => Object.assign({}, n)); // copia fresca: posiciones deterministas por estructura
  applyFilters();

  const conceptsTabActive = document.querySelector('.graph-tab[data-tab="conceptos"]')?.classList.contains('active');
  if (conceptsTabActive) renderConceptsList();
}

function renderConceptsList() {
  const g = structureGraphs[activeStructureId];
  const cfg = STRUCTURES[activeStructureId];
  const listEl = document.getElementById('conceptsList');
  const titleEl = document.getElementById('conceptsListTitle');
  if (!listEl) return;

  titleEl.textContent = `Conceptos — ${cfg.fullName} (${g.nodes.length})`;
  listEl.innerHTML = '';

  g.nodes.forEach(n => {
    const li = document.createElement('li');
    li.style.setProperty('--concept-color', cfg.color);
    li.innerHTML = `<i class="fa-solid ${n.icon}"></i><span>${n.label}</span>`;
    li.addEventListener('click', () => showDetail(n));
    listEl.appendChild(li);
  });
}

function updateTitleCard() {
  const cfg = STRUCTURES[activeStructureId];
  const g = structureGraphs[activeStructureId];
  const title = document.getElementById('diagramTitle');
  const subtitle = document.getElementById('diagramSubtitle');
  if (!title || !subtitle) return;

  title.textContent = cfg.fullName;
  title.style.color = cfg.color;

  if (cfg.status === 'construction') {
    subtitle.textContent = 'Estructura en construcción';
  } else {
    subtitle.textContent = `Modo Analítico // Nodos = ${g.nodes.length}`;
  }
}

function updateStatsForActiveStructure() {
  const cfg = STRUCTURES[activeStructureId];
  const g = structureGraphs[activeStructureId];

  if (cfg.status === 'construction') {
    document.getElementById('statConceptos').textContent = '–';
    document.getElementById('statRelaciones').textContent = '–';
    document.getElementById('statFuentes').textContent = '–';
    document.getElementById('statTipos').textContent = '–';
    return;
  }

  const tiposPresentes = new Set(g.links.map(l => l.tipo));
  document.getElementById('statConceptos').textContent = g.nodes.length;
  document.getElementById('statRelaciones').textContent = g.links.length;
  document.getElementById('statFuentes').textContent = 1;
  document.getElementById('statTipos').textContent = tiposPresentes.size;
}

// -----------------------------------------------------------------------
// 8. ESTADO "EN CONSTRUCCIÓN" (EIP)
// -----------------------------------------------------------------------
function showConstructionState(cfg) {
  document.getElementById('graphSvgLayer').style.display = 'none';
  document.getElementById('nodeLayer').style.display = 'none';
  document.getElementById('layersCard').style.display = 'none';

  let el = document.getElementById('constructionState');
  if (!el) {
    el = document.createElement('div');
    el.id = 'constructionState';
    el.className = 'construction-state';
    document.getElementById('canvas-wrap').appendChild(el);
  }
  el.style.display = 'flex';
  el.style.setProperty('--construct-color', cfg.color);
  el.innerHTML = `
    <div class="construction-icon"><i class="fa-solid ${cfg.icon}"></i></div>
    <div class="construction-title">${cfg.fullName}</div>
    <div class="construction-badge"><i class="fa-solid fa-person-digging"></i> En construcción</div>
    <div class="construction-text">Todavía no se ha definido la red de conceptos y relaciones de esta estructura. Estará disponible cuando se incorpore la información oficial correspondiente.</div>
  `;
}

function hideConstructionState() {
  const el = document.getElementById('constructionState');
  if (el) el.style.display = 'none';
  document.getElementById('graphSvgLayer').style.display = 'block';
  document.getElementById('nodeLayer').style.display = 'block';
  document.getElementById('layersCard').style.display = 'flex';
}

// -----------------------------------------------------------------------
// 9. FILTROS (tipos de relación + capas)
// -----------------------------------------------------------------------
function applyFilters() {
  const cfg = STRUCTURES[activeStructureId];
  if (cfg.status === 'construction') return;

  const g = structureGraphs[activeStructureId];

  // Los nodos secundarios siempre se muestran; el switch "Nodos Principales"
  // controla específicamente los nodos principales (hubs) de la red.
  nodes = g.nodes.filter(n => n.kind !== 'principal' || showPrincipalNodes);

  const nodeIds = new Set(nodes.map(n => n.id));
  links = g.links.filter(l => nodeIds.has(l.source) && nodeIds.has(l.target) && activeTypes.has(l.tipo));

  renderGraph();
}

// -----------------------------------------------------------------------
// 10. RENDER DEL GRAFO (SVG para líneas + capa HTML para nodos)
// -----------------------------------------------------------------------
function renderGraph() {
  const wrap = document.getElementById('canvas-wrap');
  const width = wrap.clientWidth;
  const height = wrap.clientHeight;

  const svg = d3.select('#graphSvgLayer').attr('width', width).attr('height', height);
  ensureArrowMarkers(svg);

  const nodeLayer = document.getElementById('nodeLayer');
  const fixedLayout = FIXED_LAYOUTS[activeStructureId];

  if (fixedLayout) {
    // --- MODO LAYOUT FIJO: sin física, posiciones exactas (igual al diseño) ---
    if (simulation) { simulation.stop(); simulation = null; }
    nodes.forEach(n => {
      n.x = (n.fixedPos ? n.fixedPos.x : 0.5) * width;
      n.y = (n.fixedPos ? n.fixedPos.y : 0.5) * height;
    });
  } else {
    // --- MODO AUTOMÁTICO: preserva posiciones existentes al re-renderizar ---
    const prevPositions = new Map();
    if (simulation) {
      simulation.nodes().forEach(n => prevPositions.set(n.id, { x: n.x, y: n.y, vx: n.vx, vy: n.vy }));
    }
    nodes.forEach((n, i) => {
      const prev = prevPositions.get(n.id);
      if (prev) {
        Object.assign(n, prev);
      } else {
        // Posición inicial determinista (espiral áurea) — nunca aleatoria.
        const angle = i * 2.399963229728653;
        const radius = 40 + i * 9;
        n.x = width / 2 + Math.cos(angle) * Math.min(radius, width / 2.4);
        n.y = height / 2 + Math.sin(angle) * Math.min(radius, height / 2.4);
      }
    });
  }

  // --- Líneas (SVG) con flechas de dirección ---
  const linkSel = svg.select('#edgesGroup').selectAll('line.edge')
    .data(showEdges ? links : [], d => d.source + '→' + d.target + d.tipo);

  linkSel.exit().remove();

  const linkEnter = linkSel.enter()
    .append('line')
    .attr('class', 'edge')
    .attr('stroke', d => (REL_STYLE[d.tipo] || REL_STYLE.Directa).color)
    .attr('stroke-width', d => d.tipo === 'Resiliencia' ? 2.5 : 1.8)
    .attr('stroke-dasharray', d => (REL_STYLE[d.tipo] || {}).dashed ? '5,4' : 'none')
    .attr('marker-end', d => `url(#arrow-${d.tipo})`)
    .attr('opacity', 0);

  linkEnter.transition().duration(300).attr('opacity', 0.8);
  const allLinkSel = linkEnter.merge(linkSel);

  // --- Línea invisible más ancha sobre cada conexión, solo para poder
  //     hacer clic fácilmente y abrir el popup con la frase exacta del POT ---
  const hitSel = svg.select('#edgesGroup').selectAll('line.edge-hit')
    .data(showEdges ? links : [], d => d.source + '→' + d.target + d.tipo);

  hitSel.exit().remove();

  const hitEnter = hitSel.enter()
    .append('line')
    .attr('class', 'edge-hit')
    .attr('stroke', 'transparent')
    .attr('stroke-width', 14)
    .style('cursor', 'pointer')
    .style('pointer-events', 'auto')
    .on('click', (event, d) => openRelationPopup(d));

  const allHitSel = hitEnter.merge(hitSel);

  // --- Nodos (HTML, con íconos Font Awesome — sin emojis) ---
  const nodeSel = d3.select(nodeLayer).selectAll('div.node')
    .data(nodes, d => d.id);

  nodeSel.exit().transition().duration(250).style('opacity', 0).remove();

  const nodeEnter = nodeSel.enter()
    .append('div')
    .attr('class', d => `node ${d.kind}${d.id === selectedNodeId ? ' selected' : ''}`)
    .style('width', d => d.r * 2 + 'px')
    .style('height', d => d.r * 2 + 'px')
    .style('border-color', d => d.color)
    .style('box-shadow', d => nodeGlow(d.color))
    .style('opacity', 0)
    .html(d => `<div class="icon" style="color:${d.color};font-size:${Math.round(d.r * 0.5)}px;"><i class="fa-solid ${d.icon}"></i></div>
                <div class="label" style="font-size:${d.r >= 40 ? 11 : 9.5}px;">${d.label}</div>`);

  nodeEnter.transition().duration(300).style('opacity', 1);

  const allNodeSel = nodeEnter.merge(nodeSel)
    .attr('class', d => `node ${d.kind}${d.id === selectedNodeId ? ' selected' : ''}`)
    .style('border-color', d => d.color)
    .style('box-shadow', d => nodeGlow(d.color));

  function tickUpdate() {
    allLinkSel.each(function (d) {
      const s = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source);
      const t = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target);
      if (!s || !t) return;
      const pt = edgeEndpoint(s, t);
      d3.select(this).attr('x1', s.x).attr('y1', s.y).attr('x2', pt.x).attr('y2', pt.y);
    });

    allHitSel.each(function (d) {
      const s = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source);
      const t = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target);
      if (!s || !t) return;
      d3.select(this).attr('x1', s.x).attr('y1', s.y).attr('x2', t.x).attr('y2', t.y);
    });

    allNodeSel
      .style('left', d => (d.x - d.r) + 'px')
      .style('top', d => (d.y - d.r) + 'px');
  }

  if (fixedLayout) {
    // Dibujo inmediato, sin animación de "acomodo": aparece ya ordenado, como el diseño.
    tickUpdate();
    attachStaticDrag(allNodeSel);
    return;
  }

  attachDrag(allNodeSel);

  // --- Simulación de fuerzas (determinista: mismas posiciones iniciales → mismo resultado) ---
  if (simulation) simulation.stop();

  simulation = d3.forceSimulation(nodes)
    .velocityDecay(0.5)
    .force('link', d3.forceLink(links).id(d => d.id).distance(125).strength(0.25))
    .force('charge', d3.forceManyBody().strength(d => d.kind === 'principal' ? -420 : -220))
    .force('x', d3.forceX(width / 2).strength(d => d.kind === 'principal' ? 0.09 : 0.035))
    .force('y', d3.forceY(height / 2).strength(d => d.kind === 'principal' ? 0.09 : 0.035))
    .force('collide', d3.forceCollide(d => d.r + 16))
    .force('bound', () => {
      const pad = 14;
      nodes.forEach(n => {
        n.x = Math.max(n.r + pad, Math.min(width - n.r - pad, n.x));
        n.y = Math.max(n.r + pad, Math.min(height - n.r - pad, n.y));
      });
    })
    .stop();

  // Pre-asentar la red en silencio (sin pintar cada paso) para que se muestre
  // ya ordenada desde el primer instante, sin movimiento caótico visible.
  for (let i = 0; i < 260; i++) simulation.tick();
  tickUpdate();

  simulation.on('tick', tickUpdate);
  simulation.restart();
}

// Calcula el punto donde la línea debe terminar (borde del nodo destino)
// para que la flecha quede visible y no atraviese el círculo.
function edgeEndpoint(source, target) {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const offset = target.r + 6;
  return {
    x: target.x - (dx / dist) * offset,
    y: target.y - (dy / dist) * offset
  };
}

function nodeGlow(hex) {
  return `0 0 16px -2px ${hexToRgba(hex, 0.5)}, inset 0 0 16px ${hexToRgba(hex, 0.06)}`;
}

function hexToRgba(hex, alpha) {
  const v = hex.replace('#', '');
  const r = parseInt(v.substring(0, 2), 16), g = parseInt(v.substring(2, 4), 16), b = parseInt(v.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Crea (una sola vez) las puntas de flecha SVG para cada tipo de relación
function ensureArrowMarkers(svg) {
  let defs = svg.select('defs');
  if (defs.empty()) defs = svg.append('defs');
  if (svg.select('#edgesGroup').empty()) svg.append('g').attr('id', 'edgesGroup');

  Object.entries(REL_STYLE).forEach(([tipo, style]) => {
    if (!defs.select(`#arrow-${tipo}`).empty()) return;
    defs.append('marker')
      .attr('id', `arrow-${tipo}`)
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 8)
      .attr('refY', 5)
      .attr('markerWidth', 7)
      .attr('markerHeight', 7)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', 'M0,0 L10,5 L0,10 Z')
      .attr('fill', style.hex);
  });
}

// -----------------------------------------------------------------------
// 11. ARRASTRE CON INERCIA
// -----------------------------------------------------------------------
function attachDrag(selection) {
  selection.on('pointerdown', function (event, d) {
    event.stopPropagation();
    const wrap = document.getElementById('canvas-wrap');
    const rect = wrap.getBoundingClientRect();
    let dragging = false;
    let last = { x: event.clientX, y: event.clientY, t: performance.now() };
    const startClient = { x: event.clientX, y: event.clientY };

    d3.select(this).classed('dragging', true).raise();
    simulation.alphaTarget(0.2).restart();
    d.fx = d.x; d.fy = d.y;

    function toLocal(cx, cy) {
      return { x: cx - rect.left, y: cy - rect.top };
    }

    function onMove(e) {
      const distMoved = Math.hypot(e.clientX - startClient.x, e.clientY - startClient.y);
      if (distMoved > 4) dragging = true;

      const p = toLocal(e.clientX, e.clientY);
      const now = performance.now();
      const dt = Math.max(now - last.t, 1);
      d.vx = (p.x - d.fx) / dt * 16 * 0.6;
      d.vy = (p.y - d.fy) / dt * 16 * 0.6;
      d.fx = p.x; d.fy = p.y;
      last = { x: e.clientX, y: e.clientY, t: now };
    }

    function onUp() {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      d3.select(this).classed('dragging', false);
      simulation.alphaTarget(0);
      d.fx = null; d.fy = null;
      if (!dragging) showDetail(d);
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp.bind(this));
  });
}

// Arrastre simple (sin simulación de fuerzas) para estructuras con layout fijo:
// el nodo se mueve exactamente donde lo suelta el usuario, sin rebotes.
function attachStaticDrag(nodeSel) {
  // Los nodos son fijos (igual que la captura de referencia): no se pueden
  // arrastrar. Solo el clic abre el panel de detalle del concepto.
  nodeSel.on('click', function (event, d) {
    event.stopPropagation();
    showDetail(d);
  });
}

// -----------------------------------------------------------------------
// 12. PANEL DE DETALLE
// -----------------------------------------------------------------------
function showDetail(node) {
  selectedNodeId = node.id;
  document.querySelectorAll('#nodeLayer .node').forEach(el => el.classList.remove('selected'));

  document.getElementById('detailPanel').style.display = 'flex';
  document.getElementById('detailName').textContent = node.label;
  document.getElementById('detailStruct').textContent = STRUCTURES[activeStructureId].fullName;

  const g = structureGraphs[activeStructureId];
  const outgoing = g.links.filter(l => l.source === node.id);
  const incoming = g.links.filter(l => l.target === node.id);

  document.getElementById('detailOut').innerHTML = outgoing.length
    ? outgoing.map(l => `<div style="padding:4px 0;">→ <strong>${l.target}</strong><span class="rel-tag">${l.tipo}</span></div>`).join('')
    : '<span style="color:var(--text-faint);font-size:11px;">Sin conexiones</span>';

  document.getElementById('detailIn').innerHTML = incoming.length
    ? incoming.map(l => `<div style="padding:4px 0;">← <strong>${l.source}</strong><span class="rel-tag">${l.tipo}</span></div>`).join('')
    : '<span style="color:var(--text-faint);font-size:11px;">Sin conexiones</span>';

  d3.select('#nodeLayer').selectAll('div.node').classed('selected', d => d.id === node.id);
}

// -----------------------------------------------------------------------
// 12.1 POPUP DE RELACIÓN — frase exacta del POT al hacer clic en una línea
// -----------------------------------------------------------------------
function ensureRelationPopup() {
  let overlay = document.getElementById('relationPopupOverlay');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = 'relationPopupOverlay';
  overlay.className = 'relation-popup-overlay';
  overlay.innerHTML = `
    <div class="relation-popup-card">
      <button class="relation-popup-close" id="relationPopupClose" aria-label="Cerrar">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="relation-popup-pair">
        <span id="relationPopupFrom">—</span>
        <i class="fa-solid fa-arrow-right"></i>
        <span id="relationPopupTo">—</span>
        <span class="rel-tag" id="relationPopupTipo">—</span>
      </div>
      <div class="relation-popup-label">Frase exacta del POT</div>
      <div class="relation-popup-quote" id="relationPopupQuote">—</div>
      <div class="relation-popup-page" id="relationPopupPage">—</div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeRelationPopup();
  });
  document.getElementById('relationPopupClose').addEventListener('click', closeRelationPopup);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeRelationPopup();
  });

  return overlay;
}

function openRelationPopup(rel) {
  const overlay = ensureRelationPopup();
  document.getElementById('relationPopupFrom').textContent = rel.source;
  document.getElementById('relationPopupTo').textContent = rel.target;
  document.getElementById('relationPopupTipo').textContent = rel.tipo;
  document.getElementById('relationPopupQuote').textContent = rel.sustento
    ? `"${rel.sustento}"`
    : 'Sin frase de sustento registrada.';
  document.getElementById('relationPopupPage').textContent = rel.page
    ? `Fuente: ${rel.page}`
    : '';
  overlay.style.display = 'flex';
}

function closeRelationPopup() {
  const overlay = document.getElementById('relationPopupOverlay');
  if (overlay) overlay.style.display = 'none';
}

// -----------------------------------------------------------------------
// 13. CONTROLES (filtros de tipo, capas, pestañas)
// -----------------------------------------------------------------------
function bindControls() {
  document.querySelectorAll('.filter-type').forEach(el => {
    el.addEventListener('change', () => {
      activeTypes = new Set(
        Array.from(document.querySelectorAll('.filter-type:checked')).map(i => i.value)
      );
      applyFilters();
    });
  });

  const togglePrincipal = document.getElementById('togglePrincipal');
  if (togglePrincipal) {
    togglePrincipal.addEventListener('change', e => {
      showPrincipalNodes = e.target.checked;
      applyFilters();
    });
  }

  const toggleEdges = document.getElementById('toggleEdges');
  if (toggleEdges) {
    toggleEdges.addEventListener('change', e => {
      showEdges = e.target.checked;
      renderGraph();
    });
  }

  document.querySelectorAll('.graph-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.graph-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.tab;
      const canvas = document.getElementById('canvas-wrap');
      canvas.classList.toggle('mode-concepts', mode === 'conceptos');
      canvas.classList.toggle('mode-relations', mode === 'relaciones');
      if (mode === 'conceptos') renderConceptsList();
    });
  });

  const detailPanel = document.getElementById('detailPanel');
  if (detailPanel) {
    detailPanel.addEventListener('click', e => {
      if (e.target === detailPanel) detailPanel.style.display = 'none';
    });
  }
}

// -----------------------------------------------------------------------
// 14. INICIO
// -----------------------------------------------------------------------
function init() {
  try {
    buildAllGraphs();
    renderStructureList();
    bindControls();
    if (typeof d3 === 'undefined') {
      console.error('RAPOT: d3.js no se cargó — revisa la conexión a cdnjs.cloudflare.com o incluye d3 localmente.');
      const wrap = document.getElementById('canvas-wrap');
      if (wrap) {
        const warn = document.createElement('div');
        warn.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#ff9a3d;font-size:13px;text-align:center;padding:30px;';
        warn.textContent = 'No se pudo cargar la librería d3.js (necesaria para dibujar la red). Verifica tu conexión a internet o incluye d3.min.js localmente.';
        wrap.appendChild(warn);
      }
      return;
    }
    selectStructure(activeStructureId);
  } catch (err) {
    console.error('RAPOT: error al iniciar el módulo 01:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('resize', () => {
  const wrap = document.getElementById('canvas-wrap');
  if (!wrap) return;
  d3.select('#graphSvgLayer').attr('width', wrap.clientWidth).attr('height', wrap.clientHeight);

  if (FIXED_LAYOUTS[activeStructureId]) {
    // Recalcular posiciones fijas según el nuevo tamaño del canvas.
    renderGraph();
    return;
  }

  if (simulation) {
    simulation.force('x', d3.forceX(wrap.clientWidth / 2).strength(d => d.kind === 'principal' ? 0.09 : 0.035));
    simulation.force('y', d3.forceY(wrap.clientHeight / 2).strength(d => d.kind === 'principal' ? 0.09 : 0.035));
    simulation.alpha(0.3).restart();
  }
});

console.log('✓ Script listo');
