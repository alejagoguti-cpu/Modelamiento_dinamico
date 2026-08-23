/* =======================================================================
   RAPOT · MÓDULO 03 — Discurso vs Realidad
   Base de datos: Red_4_Estructuras_POT_CORREGIDA.xlsx (hoja RELACIONES)
   32 relaciones · 58 conceptos · 4 sistemas
   No se inventan relaciones ni se alteran frases o páginas.
   ======================================================================= */

// 98 relaciones: 68 sustentadas con frase textual del POT, 7 marcadas 'por
// verificar' por la propia tabla y 23 agregadas a pedido, pendientes de frase.
const POT_DATA = {
 "nodos": [
  {
   "id": "EEP::RÍOS",
   "sys": "EEP",
   "label": "RÍOS",
   "icon": "fa-water",
   "x": 465,
   "y": 824,
   "cat": "e1",
   "deg": 4,
   "r": 62
  },
  {
   "id": "EEP::QUEBRADAS",
   "sys": "EEP",
   "label": "QUEBRADAS",
   "icon": "fa-water",
   "x": 661,
   "y": 581,
   "cat": "e1",
   "deg": 1,
   "r": 38
  },
  {
   "id": "EEP::HUMEDALES",
   "sys": "EEP",
   "label": "HUMEDALES",
   "icon": "fa-droplet",
   "x": 1022,
   "y": 591,
   "cat": "e1",
   "deg": 8,
   "r": 94
  },
  {
   "id": "EEP::COMPLEJOS DE PÁRAMOS",
   "sys": "EEP",
   "label": "COMPLEJOS DE PÁRAMOS",
   "icon": "fa-mountain",
   "x": 352,
   "y": 449,
   "cat": "e1",
   "deg": 2,
   "r": 46
  },
  {
   "id": "EEP::COBERTURAS VEGETALES",
   "sys": "EEP",
   "label": "COBERTURAS VEGETALES",
   "icon": "fa-leaf",
   "x": 509,
   "y": 297,
   "cat": "e1",
   "deg": 2,
   "r": 46
  },
  {
   "id": "EEP::ÁREAS DE RESILIENCIA CLIMÁTICA",
   "sys": "EEP",
   "label": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "icon": "fa-shield-heart",
   "x": 639,
   "y": 112,
   "cat": "e1",
   "deg": 3,
   "r": 54
  },
  {
   "id": "EEP::ÁREAS PROTEGIDAS",
   "sys": "EEP",
   "label": "ÁREAS PROTEGIDAS",
   "icon": "fa-shield-halved",
   "x": 771,
   "y": 421,
   "cat": "e1",
   "deg": 3,
   "r": 54
  },
  {
   "id": "EEP::RESERVAS FORESTALES",
   "sys": "EEP",
   "label": "RESERVAS FORESTALES",
   "icon": "fa-tree-city",
   "x": 1086,
   "y": 132,
   "cat": "e1",
   "deg": 3,
   "r": 54
  },
  {
   "id": "EFC::EQUIPAMIENTOS",
   "sys": "EFC",
   "label": "EQUIPAMIENTOS",
   "icon": "fa-school",
   "x": 1190,
   "y": 347,
   "cat": "e2",
   "deg": 4,
   "r": 62
  },
  {
   "id": "EFC::SERVICIOS SOCIALES",
   "sys": "EFC",
   "label": "SERVICIOS SOCIALES",
   "icon": "fa-people-roof",
   "x": 1429,
   "y": 104,
   "cat": "e2",
   "deg": 2,
   "r": 46
  },
  {
   "id": "EFC::VIVIENDA",
   "sys": "EFC",
   "label": "VIVIENDA",
   "icon": "fa-house",
   "x": 1450,
   "y": 783,
   "cat": "e2",
   "deg": 5,
   "r": 70
  },
  {
   "id": "EFC::CICLORUTAS",
   "sys": "EFC",
   "label": "CICLORUTAS",
   "icon": "fa-person-biking",
   "x": 1689,
   "y": 98,
   "cat": "e2",
   "deg": 2,
   "r": 46
  },
  {
   "id": "EFC::TRANSPORTE PÚBLICO",
   "sys": "EFC",
   "label": "TRANSPORTE PÚBLICO",
   "icon": "fa-bus",
   "x": 1686,
   "y": 539,
   "cat": "e2",
   "deg": 6,
   "r": 78
  },
  {
   "id": "EFC::RED VIAL",
   "sys": "EFC",
   "label": "RED VIAL",
   "icon": "fa-road",
   "x": 2022,
   "y": 306,
   "cat": "e2",
   "deg": 4,
   "r": 62
  },
  {
   "id": "EFC::CORREDORES VERDES",
   "sys": "EFC",
   "label": "CORREDORES VERDES",
   "icon": "fa-seedling",
   "x": 34.7,
   "y": 97.9,
   "cat": "e2",
   "deg": 2,
   "r": 46
  },
  {
   "id": "EFC::MANZANAS DEL CUIDADO",
   "sys": "EFC",
   "label": "MANZANAS DEL CUIDADO",
   "icon": "fa-building-shield",
   "x": 1485,
   "y": 445,
   "cat": "e2",
   "deg": 5,
   "r": 70
  },
  {
   "id": "EFC::PARQUES",
   "sys": "EFC",
   "label": "PARQUES",
   "icon": "fa-tree",
   "x": 1732,
   "y": 884,
   "cat": "e2",
   "deg": 1,
   "r": 38
  },
  {
   "id": "ESECI::DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sys": "ESECI",
   "label": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "icon": "fa-microchip",
   "x": 1244,
   "y": 1298,
   "cat": "e3",
   "deg": 5,
   "r": 70
  },
  {
   "id": "ESECI::SERVICIOS EMPRESARIALES",
   "sys": "ESECI",
   "label": "SERVICIOS EMPRESARIALES",
   "icon": "fa-briefcase",
   "x": 1055,
   "y": 918,
   "cat": "e3",
   "deg": 8,
   "r": 94
  },
  {
   "id": "ESECI::SISTEMA DE EDUCACIÓN",
   "sys": "ESECI",
   "label": "SISTEMA DE EDUCACIÓN",
   "icon": "fa-graduation-cap",
   "x": 992,
   "y": 1253,
   "cat": "e3",
   "deg": 3,
   "r": 54
  },
  {
   "id": "ESECI::CENTROS DE ABASTECIMIENTO",
   "sys": "ESECI",
   "label": "CENTROS DE ABASTECIMIENTO",
   "icon": "fa-warehouse",
   "x": 921,
   "y": 1601,
   "cat": "e3",
   "deg": 1,
   "r": 38
  },
  {
   "id": "ESECI::PLAZAS DE MERCADO",
   "sys": "ESECI",
   "label": "PLAZAS DE MERCADO",
   "icon": "fa-store",
   "x": 758,
   "y": 1173,
   "cat": "e3",
   "deg": 3,
   "r": 54
  },
  {
   "id": "ESECI::ZONAS INDUSTRIALES",
   "sys": "ESECI",
   "label": "ZONAS INDUSTRIALES",
   "icon": "fa-industry",
   "x": 679,
   "y": 1576,
   "cat": "e3",
   "deg": 5,
   "r": 70
  },
  {
   "id": "ESECI::PRODUCCIÓN ARTESANAL",
   "sys": "ESECI",
   "label": "PRODUCCIÓN ARTESANAL",
   "icon": "fa-hammer",
   "x": 486,
   "y": 1312,
   "cat": "e3",
   "deg": 3,
   "r": 54
  },
  {
   "id": "ESECI::ZONAS DE INTERÉS TURÍSTICO",
   "sys": "ESECI",
   "label": "ZONAS DE INTERÉS TURÍSTICO",
   "icon": "fa-camera",
   "x": 498,
   "y": 1054,
   "cat": "e3",
   "deg": 2,
   "r": 46
  },
  {
   "id": "ESECI::CENTROS FINANCIEROS",
   "sys": "ESECI",
   "label": "CENTROS FINANCIEROS",
   "icon": "fa-building-columns",
   "x": 727,
   "y": 873,
   "cat": "e3",
   "deg": 1,
   "r": 38
  },
  {
   "id": "EIP::PATRIMONIO INMATERIAL",
   "sys": "EIP",
   "label": "PATRIMONIO INMATERIAL",
   "icon": "fa-masks-theater",
   "x": 2017,
   "y": 991,
   "cat": "e4",
   "deg": 3,
   "r": 54
  },
  {
   "id": "EIP::PATRIMONIO ARQUEOLÓGICO",
   "sys": "EIP",
   "label": "PATRIMONIO ARQUEOLÓGICO",
   "icon": "fa-monument",
   "x": 1862,
   "y": 1430,
   "cat": "e4",
   "deg": 1,
   "r": 38
  },
  {
   "id": "EIP::PATRIMONIO NATURAL",
   "sys": "EIP",
   "label": "PATRIMONIO NATURAL",
   "icon": "fa-leaf",
   "x": 1442,
   "y": 1406,
   "cat": "e4",
   "deg": 5,
   "r": 70
  },
  {
   "id": "EIP::PATRIMONIO MATERIAL",
   "sys": "EIP",
   "label": "PATRIMONIO MATERIAL",
   "icon": "fa-landmark",
   "x": 1399,
   "y": 1026,
   "cat": "e4",
   "deg": 5,
   "r": 70
  },
  {
   "id": "EIP::COMUNIDADES",
   "sys": "EIP",
   "label": "COMUNIDADES",
   "icon": "fa-people-group",
   "x": 1684,
   "y": 1179,
   "cat": "e4",
   "deg": 2,
   "r": 46
  }
 ],
 "relaciones": [
  {
   "sO": "EEP",
   "cO": "QUEBRADAS",
   "sD": "EEP",
   "cD": "HUMEDALES",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EEP",
   "cD": "RÍOS",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "RÍOS",
   "sD": "EEP",
   "cD": "COMPLEJOS DE PÁRAMOS",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "sD": "EEP",
   "cD": "COBERTURAS VEGETALES",
   "type": "resilience"
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EEP",
   "cD": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS PROTEGIDAS",
   "sD": "EEP",
   "cD": "HUMEDALES",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS PROTEGIDAS",
   "sD": "EEP",
   "cD": "RESERVAS FORESTALES",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "RESERVAS FORESTALES",
   "sD": "EEP",
   "cD": "HUMEDALES",
   "type": "resilience"
  },
  {
   "sO": "EFC",
   "cO": "EQUIPAMIENTOS",
   "sD": "EFC",
   "cD": "VIVIENDA",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "CICLORUTAS",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "resilience"
  },
  {
   "sO": "EFC",
   "cO": "TRANSPORTE PÚBLICO",
   "sD": "EFC",
   "cD": "VIVIENDA",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "RED VIAL",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "RED VIAL",
   "sD": "EFC",
   "cD": "EQUIPAMIENTOS",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "CORREDORES VERDES",
   "sD": "EFC",
   "cD": "CICLORUTAS",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "CORREDORES VERDES",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "EFC",
   "cD": "SERVICIOS SOCIALES",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "EFC",
   "cD": "EQUIPAMIENTOS",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "EFC",
   "cD": "PARQUES",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "ESECI",
   "cD": "SISTEMA DE EDUCACIÓN",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "PLAZAS DE MERCADO",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "ZONAS INDUSTRIALES",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "ZONAS INDUSTRIALES",
   "sD": "ESECI",
   "cD": "PRODUCCIÓN ARTESANAL",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "ZONAS DE INTERÉS TURÍSTICO",
   "sD": "ESECI",
   "cD": "PLAZAS DE MERCADO",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "CENTROS FINANCIEROS",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO ARQUEOLÓGICO",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "support"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO NATURAL",
   "sD": "EIP",
   "cD": "PATRIMONIO INMATERIAL",
   "type": "support"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "support"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "EIP",
   "cD": "PATRIMONIO INMATERIAL",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "RESERVAS FORESTALES",
   "sD": "EEP",
   "cD": "RÍOS",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "COBERTURAS VEGETALES",
   "sD": "EEP",
   "cD": "ÁREAS PROTEGIDAS",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "VIVIENDA",
   "sD": "EFC",
   "cD": "SERVICIOS SOCIALES",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "RED VIAL",
   "sD": "EFC",
   "cD": "VIVIENDA",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "ESECI",
   "cD": "ZONAS INDUSTRIALES",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "CENTROS DE ABASTECIMIENTO",
   "sD": "ESECI",
   "cD": "PRODUCCIÓN ARTESANAL",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "SISTEMA DE EDUCACIÓN",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "ESECI",
   "cO": "SISTEMA DE EDUCACIÓN",
   "sD": "ESECI",
   "cD": "PRODUCCIÓN ARTESANAL",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EFC",
   "cD": "RED VIAL",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "resilience"
  },
  {
   "sO": "EFC",
   "cO": "EQUIPAMIENTOS",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "VIVIENDA",
   "sD": "ESECI",
   "cD": "ZONAS INDUSTRIALES",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "TRANSPORTE PÚBLICO",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "support"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "ESECI",
   "cD": "ZONAS DE INTERÉS TURÍSTICO",
   "type": "support"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "ESECI",
   "cD": "PLAZAS DE MERCADO",
   "type": "support"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "EIP",
   "cD": "COMUNIDADES",
   "type": "resilience"
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO INMATERIAL",
   "sD": "EIP",
   "cD": "COMUNIDADES",
   "type": "resilience"
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EFC",
   "cD": "MANZANAS DEL CUIDADO",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "RÍOS",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "resilience"
  },
  {
   "sO": "EEP",
   "cO": "COMPLEJOS DE PÁRAMOS",
   "sD": "ESECI",
   "cD": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "type": "support"
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "sD": "ESECI",
   "cD": "ZONAS INDUSTRIALES",
   "type": "resilience"
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "support"
  }
 ],
 "vb": [
  -59.3,
  3.9000000000000057,
  2175.3,
  1691.1
 ],
 "sistemas": [
  "EEP",
  "EFC",
  "ESECI",
  "EIP"
 ]
};

const SYS = ['EEP', 'EFC', 'EIP', 'ESECI'];
const SYSTEM_COLORS = {
  EEP: '#5cd6d1',
  EFC: '#ef9f54',
  EIP: '#fb8d84',
  ESECI: '#fac47b'
};
const SYSTEM_NAMES = {
  EEP: 'Estructura Ecológica Principal',
  EFC: 'Estructura Funcional y del Cuidado',
  EIP: 'Estructura Integradora de Patrimonios',
  ESECI: 'Estructura Socioeconómica, Creativa y de Innovación'
};

// Estado del simulador: true = sistema activo
const state = { EEP: true, EFC: true, EIP: true, ESECI: true };
// Conceptos apagados individualmente (escenario "¿qué pasaría si no existiera X?")
const offNodes = new Set();
let lastToggledOff = null;
let selectedRel = null;
const relationFilters = {
  directa: true,
  indirecta: true,
  soporte: true,
  resiliencia: true,
};

function relationPassesFilters(r) {
  const evidenceKey = String(r.evid || 'Directa').toLowerCase().startsWith('ind') ? 'indirecta' : 'directa';
  const typeKey = r.tipo === 'Resiliencia' ? 'resiliencia' : 'soporte';
  return relationFilters[evidenceKey] && relationFilters[typeKey];
}

// ---------------------------------------------------------------------
// 1. MODELO: nodos (sistemas + conceptos) y aristas
// ---------------------------------------------------------------------
const conceptId = (sis, con) => sis + '::' + con;

const model = { systems: {}, concepts: {}, relations: [] };
const layout = {};
const nodeR = {};
// Escala visual para que los nodos conserven proporción pero no se vean diminutos
// dentro del viewBox amplio de la red.
const NODE_VISUAL_SCALE = 1.12;
// Relaciones ESECI que permanecen visibles al apagar la tarjeta socioeconómica.
// Corresponden a las dos primeras relaciones ESECI del archivo de datos.

function buildModel() {
  model.systems = {}; model.concepts = {}; model.relations = [];

  SYS.forEach(s => {
    const source = POT_DATA.sistemas && !Array.isArray(POT_DATA.sistemas)
      ? (POT_DATA.sistemas[s] || {})
      : {};
    model.systems[s] = Object.assign({
      code: s,
      concepts: [],
      nombre: SYSTEM_NAMES[s],
      color: SYSTEM_COLORS[s]
    }, source);
    // La fuente histórica guarda a veces solo el catálogo de códigos; el
    // color no puede quedar undefined porque interrumpe la creación del SVG.
    model.systems[s].color = model.systems[s].color || SYSTEM_COLORS[s];
  });

  POT_DATA.nodos.forEach(n => {
    model.concepts[n.id] = { id: n.id, sys: n.sys, label: n.label, icon: n.icon, deg: n.deg, rels: [] };
    model.systems[n.sys].concepts.push(n.id);
    layout[n.id] = { x: n.x, y: n.y };
    // Mantiene pequeños los nodos periféricos y amplía especialmente los hubs.
    // El término adicional depende del grado real, no de una posición fija.
    nodeR[n.id] = n.r * NODE_VISUAL_SCALE + Math.max(0, n.deg - 3) * 3.5;
  });

  // Solo se incorporan relaciones auditadas: frase textual y página verificable.
  // Las relaciones marcadas porVerificar o sinFrase no se dibujan en la red.
  POT_DATA.relaciones.filter(r => (r.frase && r.pag && r.pag !== '—' && !r.porVerificar && !r.sinFrase) || (!r.frase && r.sO && r.cO && r.sD && r.cD)).forEach(r => {
    const from = conceptId(r.sO, r.cO);
    const to = conceptId(r.sD, r.cD);
    const relationType = r.tipo || (r.type === 'resilience' || r.type === 'resiliencia'
      ? 'Resiliencia'
      : 'Soporte');
    const evidenceType = r.evid || (r.evidence === 'indirect' || r.evidence === 'indirecta'
      ? 'Indirecta'
      : 'Directa');
    const rel = Object.assign({}, r, {
      from,
      to,
      tipo: relationType,
      evid: evidenceType
    });
    model.relations.push(rel);
    model.concepts[from].rels.push(rel);
    model.concepts[to].rels.push(rel);
  });

  // El tamaño se recalcula con las relaciones verificadas visibles, no con
  // grados heredados de conexiones que fueron retiradas por falta de evidencia.
  Object.values(model.concepts).forEach(c => {
    c.deg = c.rels.length;
    nodeR[c.id] = Math.max(36, 30 + c.deg * 11);
  });
}

// Una relación está activa solo si AMBOS sistemas están ON y ninguno de sus
// dos conceptos fue apagado individualmente
const nodeOn = id => !offNodes.has(id);

function relActive(r) {
  return Boolean(state[r.sO] && state[r.sD] && nodeOn(r.from) && nodeOn(r.to));
}

function isNodeIsolated(conceptId) {
  const c = model.concepts[conceptId];
  return !c || !c.rels.some(relActive);
}

// Las posiciones de partida vienen de POT_DATA (agrupadas por estructura),
// pero muchas quedaban demasiado pegadas / superpuestas. Aquí se relajan con
// una simulación simple de fuerzas: se separan los nodos que se solapan y se
// evita que las conexiones queden demasiado comprimidas, partiendo siempre
// del layout original para conservar el agrupamiento por estructura.
// Distribución integrada de referencia: cuatro hubs descentralizados y una
// malla abierta de satélites. Las posiciones son deterministas y no alteran
// endpoints, citas, páginas ni la lógica de activación de las relaciones.
function computeLayoutClean() {
  // Layout compacto e integrado: los cuatro hubs quedan próximos y los
  // satélites orbitan en una malla común. Así las relaciones cruzadas forman
  // una red legible, en lugar de cuatro cuadrantes aislados.
  const CANVAS = { w: 2400, h: 1700 };
  const HUB_CENTERS = {
    EEP: { x: 660, y: 540 },
    EFC: { x: 1700, y: 560 },
    ESECI: { x: 980, y: 1220 },
    EIP: { x: 1770, y: 1210 }
  };
  const SLOT_DX = 260;
  const SLOT_DY = 190;
  const slots = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
    [-1, 2], [0, 2], [1, 2],
    [-1, -2], [0, -2], [1, -2]
  ];
  const ids = Object.values(model.concepts)
    .filter(c => !offNodes.has(c.id) && activeDegree(c) > 0)
    .map(c => c.id);
  const pos = {};

  SYS.forEach(sys => {
    const center = HUB_CENTERS[sys];
    const group = model.systems[sys].concepts.slice()
      .filter(id => !offNodes.has(id) && activeDegree(model.concepts[id]) > 0)
      .sort((a, b) => ((model.concepts[b].activeDeg ?? model.concepts[b].deg) - (model.concepts[a].activeDeg ?? model.concepts[a].deg)) || a.localeCompare(b));
    if (!group.length) return;
    pos[group[0]] = { x: center.x, y: center.y };
    group.slice(1).forEach((id, index) => {
      const slot = slots[index] || [0, 2];
      pos[id] = { x: center.x + slot[0] * SLOT_DX, y: center.y + slot[1] * SLOT_DY };
    });
  });

  Object.keys(layout).forEach(id => { if (!ids.includes(id)) delete layout[id]; });
  ids.forEach(id => {
    const p = pos[id] || { x: CANVAS.w / 2, y: CANVAS.h / 2 };
    const margin = nodeR[id] + 34;
    p.x = Math.max(margin, Math.min(CANVAS.w - margin, p.x));
    p.y = Math.max(margin, Math.min(CANVAS.h - margin, p.y));
    layout[id] = p;
  });

  BASE_VB = { x: 0, y: 0, w: CANVAS.w, h: CANVAS.h };
  vb = Object.assign({}, BASE_VB);
}

// ---------------------------------------------------------------------
// 3. RENDER
// ---------------------------------------------------------------------
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
};

function wrapLabel(text, maxChars = 15) {
  if (text.length <= maxChars) return [text];
  const parts = text.split(' / ');
  if (parts.length === 2 && parts[0].length <= maxChars + 4 && parts[1].length <= maxChars + 4) {
    return [parts[0] + ' /', parts[1]];
  }
  const words = text.split(' ');
  const lines = [''];
  words.forEach(w => {
    const i = lines.length - 1;
    if ((lines[i] + ' ' + w).trim().length <= maxChars || !lines[i]) {
      lines[i] = (lines[i] + ' ' + w).trim();
    } else {
      lines.push(w);
    }
  });
  if (lines.length > 2) {
    const rest = lines.slice(1).join(' ');
    return [lines[0], rest.length > maxChars + 6 ? rest.slice(0, maxChars + 4) + '…' : rest];
  }
  return lines;
}

// Trayectoria recta entre dos puntos, recortada exactamente en los bordes.
// Las curvas anteriores desplazaban visualmente el recorrido y hacían parecer
// que algunas relaciones terminaban en nodos equivocados, especialmente cuando
// había muchos enlaces cruzados. La relación sigue usando sus endpoints reales.
function curvePath(a, b, rA, rB) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const gap = 3;
  const p1 = { x: a.x + ux * (rA + gap), y: a.y + uy * (rA + gap) };
  const p2 = { x: b.x - ux * (rB + gap), y: b.y - uy * (rB + gap) };
  return `M${p1.x.toFixed(1)},${p1.y.toFixed(1)} L${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
}

// Todas las relaciones son segmentos rectos entre los bordes de los nodos.
// No se desplazan por carriles curvos: la geometría conserva exactamente el
// origen y el destino para que la red se lea como una malla conectada.
function relationPath(r, a, b, rA, rB) {
  return curvePath(a, b, rA, rB);
}


// ---------------------------------------------------------------------
// DEBILITAMIENTO DE LA RED
// Cuando se apaga una estructura, los demás nodos NO cambian de lugar:
// se quedan exactamente donde estaban. Lo único que cambia es su opacidad
// (ver "weakened"/"cut-off" en render()) y la de los nodos/relaciones que
// pertenecen a la estructura apagada (ver "sys-off"/"rel-off").
// ---------------------------------------------------------------------
const drawPos = {};

function lossRatioOf(c) {
  const total = c.rels.length;
  if (!total) return 0;
  return c.rels.filter(r => !relActive(r)).length / total;
}

function recomputeActiveGraph() {
  Object.values(model.concepts).forEach(c => {
    c.activeDeg = c.rels.filter(relActive).length;
    nodeR[c.id] = Math.max(36, 30 + c.activeDeg * 11);
  });
}
function computeDrift() {
  Object.keys(layout).forEach(id => {
    const p = layout[id];
    if (p) drawPos[id] = { x: p.x, y: p.y };
  });
}

let networkReflowFrame = 0;
function animateNetworkReflow(targets, fromPositions) {
  cancelAnimationFrame(networkReflowFrame);
  const from = fromPositions || Object.fromEntries(Object.keys(targets).map(id => [id, { ...targets[id] }]));
  const started = performance.now();
  const duration = 920;
  const tick = now => {
    const t = Math.min(1, (now - started) / duration);
    // Resorte suave: sobrepasa levemente el objetivo y se estabiliza sin saltos.
    const eased = 1 - Math.exp(-6.4 * t) * Math.cos(9.6 * t);
    Object.keys(targets).forEach(id => {
      const a = from[id] || targets[id];
      const b = targets[id];
      drawPos[id] = { x: a.x + (b.x - a.x) * eased, y: a.y + (b.y - a.y) * eased };
    });
    updateGraphGeometry();
    if (t < 1) networkReflowFrame = requestAnimationFrame(tick);
    else Object.keys(targets).forEach(id => { drawPos[id] = { ...targets[id] }; });
  };
  networkReflowFrame = requestAnimationFrame(tick);
}

const nodeDrag = { active: null, pointerId: null, startX: 0, startY: 0, base: null, delta: { x: 0, y: 0 }, raf: 0 };
function updateGraphGeometry() {
  document.querySelectorAll('#gNodes .concept').forEach(g => {
    const p = drawPos[g.getAttribute('data-id')];
    if (p) g.setAttribute('transform', `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`);
  });
  document.querySelectorAll('#gRels path[data-rel]').forEach(path => {
    const r = model.relations.find(x => String(x.id) === path.getAttribute('data-rel'));
    if (!r || !relActive(r)) return;
    const a = drawPos[r.from], b = drawPos[r.to];
    if (a && b) path.setAttribute('d', relationPath(r, a, b, nodeR[r.from], nodeR[r.to]));
  });
}
function paintDraggedGraph() {
  const d = nodeDrag.delta;
  const activeId = nodeDrag.active;
  Object.values(model.concepts).forEach(c => {
    const base = nodeDrag.base[c.id];
    if (!base) return;
    if (c.id === activeId) {
      drawPos[c.id] = { x: base.x + d.x, y: base.y + d.y };
      return;
    }
    const distance = Math.hypot(base.x - nodeDrag.base[activeId].x, base.y - nodeDrag.base[activeId].y);
    const follow = Math.max(0.14, Math.min(0.62, 0.62 - distance / 5200));
    drawPos[c.id] = { x: base.x + d.x * follow, y: base.y + d.y * follow };
  });
  updateGraphGeometry();
}
function releaseDraggedGraph() {
  if (!nodeDrag.active) return;
  const activeId = nodeDrag.active;
  const activeElement = [...document.querySelectorAll('#gNodes .concept')].find(el => el.getAttribute('data-id') === activeId);
  activeElement?.classList.remove('dragging');
  activeElement?.classList.add('just-released');
  window.setTimeout(() => activeElement?.classList.remove('just-released'), 900);
  const startPositions = nodeDrag.base;
  const released = Object.fromEntries(Object.keys(startPositions).map(id => [id, { ...drawPos[id] }]));
  const dragged = { ...released[activeId] };
  const started = performance.now();
  cancelAnimationFrame(nodeDrag.raf);
  const settle = now => {
    const t = Math.min(1, (now - started) / 820);
    const spring = 1 - Math.exp(-7.2 * t) * Math.cos(10.5 * t);
    Object.values(model.concepts).forEach(c => {
      if (c.id === activeId) { drawPos[c.id] = dragged; return; }
      const from = released[c.id], to = startPositions[c.id];
      if (!from || !to) return;
      drawPos[c.id] = { x: from.x + (to.x - from.x) * spring, y: from.y + (to.y - from.y) * spring };
    });
    updateGraphGeometry();
    if (t < 1) nodeDrag.raf = requestAnimationFrame(settle);
  };
  nodeDrag.raf = requestAnimationFrame(settle);
  nodeDrag.active = null; nodeDrag.pointerId = null; nodeDrag.base = null;
}

function render() {
  const previousPositions = Object.keys(drawPos).length
    ? Object.fromEntries(Object.keys(drawPos).map(id => [id, { ...drawPos[id] }]))
    : null;
  recomputeActiveGraph();
  computeLayoutClean();
  const targets = Object.fromEntries(Object.keys(layout).map(id => [id, { ...layout[id] }]));
  if (previousPositions) Object.keys(targets).forEach(id => { drawPos[id] = previousPositions[id] || targets[id]; });
  else computeDrift();
  const gGuides = document.getElementById('gGuides');
  const gMembers = document.getElementById('gMembers');
  const gRels = document.getElementById('gRels');
  const gNodes = document.getElementById('gNodes');
  [gGuides, gMembers, gRels, gNodes].forEach(g => (g.innerHTML = ''));

  // -- todas las relaciones se dibujan siempre, en su mismo lugar; las que
  //    tocan una estructura o un nodo apagado simplemente quedan con muy
  //    baja opacidad ("rel-off"), en vez de desaparecer y reorganizar la red
  model.relations.forEach(r => {
    // No dibujar relaciones pendientes de verificación: se mantienen en los
    // datos para el análisis, pero no deben ensuciar la red visual.
    if (r.porVerificar) return;
    if (!relationPassesFilters(r)) return;
    const active = relActive(r);
    // Una estructura OFF no deja líneas fantasma: la relación no se dibuja.
    // Los datos permanecen intactos y volverán al activar el sistema.
    if (!active) return;
    const a = drawPos[r.from] || layout[r.from], b = drawPos[r.to] || layout[r.to];
    const rA = nodeR[r.from];
    const rB = nodeR[r.to];
    const d = relationPath(r, a, b, rA, rB);
    const kind = r.tipo === 'Soporte' ? 'soporte' : 'resiliencia';
    const evidence = String(r.evid || 'Directa').toLowerCase().startsWith('ind') ? 'indirecta' : 'directa';
    const cls = ['rel', kind, evidence, r.sO === r.sD ? 'intra' : 'inter'];
    if (r.linea === 'Punteada') cls.push('punteada');
    if (r.porVerificar) cls.push('por-verificar');
    if (selectedRel === r.id) cls.push('sel');
    if (!active) cls.push('rel-off');

    // cinta difuminada detrás de la línea: da un aspecto sólido y suave
    // (no neón) a la relación, en vez de un simple trazo brillante
    const glowCls = ['rel', 'rel-glow', kind];
    if (cls.includes('punteada')) glowCls.push('punteada');
    if (cls.includes('sel')) glowCls.push('sel');
    if (!active) glowCls.push('rel-off');
    glowCls.push('reflow-enter');
    const glow = el('path', { class: glowCls.join(' '), d, 'data-rel': r.id });

    cls.push('reflow-enter');
    const path = el('path', {
      class: cls.join(' '),
      d,
      'marker-end': (r.tipo === 'Soporte' || r.tipo === 'Resiliencia') ? `url(#ar-${kind})` : 'none',
      'data-rel': r.id
    });
    const hit = el('path', { class: 'rel-hit', d, 'data-rel': r.id });

    [path, hit].forEach(node => {
      node.addEventListener('click', ev => { ev.stopPropagation(); selectRelation(r.id, ev); });
      node.addEventListener('mouseenter', ev => showTooltip(ev, relationTooltipHTML(r)));
      node.addEventListener('mousemove', moveTooltip);
      node.addEventListener('mouseleave', hideTooltip);
    });

    // Una única línea visible por relación. El hitbox conserva la interacción,
    // pero se elimina la cinta difuminada que generaba trazos extraños.
    gRels.appendChild(path);
    gRels.appendChild(hit);
  });

  // -- conceptos: se dibujan TODOS siempre, en su misma posición; los que
  //    pertenecen a una estructura apagada solo bajan mucho su opacidad
  //    ("sys-off"), no se quitan del mapa ni mueven a los demás
  SYS.forEach(s => {
    const sysOff = !state[s];
    model.systems[s].concepts.forEach((id, index) => {
      const c = model.concepts[id];
      const p = drawPos[id] || layout[id];
      const activeRels = activeDegree(c);
      const isolated = activeRels === 0;
      const off = offNodes.has(id);
      // OFF de estructura, nodo o concepto aislado: no se pinta ningún
      // círculo ni etiqueta flotante. El modelo permanece disponible para
      // recalcularse si vuelve a tener una relación activa.
      if (sysOff || off || isolated) return;
      const R = nodeR[id];
const iconSize = Math.max(28, Math.round(R * 0.52));
      // Etiquetas más grandes y legibles, manteniendo proporción con el nodo.
      const fontSize = Math.max(26, Math.min(44, R * 0.28));
      // nivel de brillo por conectividad (solo estético)
      const glow = R >= 110 ? 'high' : R >= 80 ? 'mid' : 'low';

      const cls = ['concept', 'node-appear', 'deg-' + glow];
      const ratio = lossRatioOf(c);
      if (isolated && !off && !sysOff) cls.push('isolated');
      if (off) cls.push('node-off');
      if (sysOff) cls.push('sys-off');
      if (offNodes.size && (off || activeRels === 0)) cls.push('node-hidden');
      if (!off && !sysOff && ratio >= 0.34 && ratio < 1) cls.push('weakened');
      if (!off && !sysOff && ratio >= 1) cls.push('cut-off');
      if (isBridge(c)) cls.push('bridge');

      const g = el('g', {
        class: cls.concat('reflow-enter').join(' '),
        transform: `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`,
        style: `--sys:${model.systems[s].color};--node-filter:url(#glow-${model.systems[s].color.replace('#', '')})`,
        'data-id': id
      });

      const hit = el('circle', {
        class: 'node-hit',
        r: R + 24,
        fill: 'transparent',
        'pointer-events': 'all'
      });
      g.appendChild(hit);
      const ring = el('circle', {
        class: 'node-fill node-ring',
        r: R,
        stroke: model.systems[s].color,
        'stroke-width': '2.5',
        filter: `url(#glow-${model.systems[s].color.replace('#', '')})`
      });
      g.appendChild(ring);

      const fo = el('foreignObject', {
        x: -R * 0.95,
        y: -R * 0.95,
        width: R * 1.9,
        height: R * 1.9
      });
      const wrapper = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      wrapper.setAttribute('class', 'node-inner');
      wrapper.setAttribute('style', 'width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;transform:translateY(-13%);pointer-events:none;text-align:center;');
      const iconEl = document.createElementNS('http://www.w3.org/1999/xhtml', 'i');
      iconEl.setAttribute('class', `fa-solid ${c.icon} node-icon`);
      iconEl.setAttribute('style', `color:${model.systems[s].color};font-size:${Math.max(15, R * 0.34)}px !important;line-height:1;margin:1px 0;`);
      const nameEl = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      nameEl.setAttribute('class', 'node-name');
      nameEl.setAttribute('style', `font-family:Inter,sans-serif;font-size:${Math.max(9, Math.min(18, R * 0.16))}px !important;padding:0 3px;font-weight:700;color:#f2f3f6;line-height:1.08;white-space:normal;text-align:center;text-shadow:0 1px 3px #05070a;`);
      nameEl.textContent = c.label;
      wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
      fo.appendChild(wrapper);
      g.appendChild(fo);

      g.addEventListener('mouseenter', ev => showTooltip(ev,
        `<div class="tt-sys" style="color:${model.systems[s].color}">${s}</div>${esc(c.label)}<br>` +
        `<span style="color:#8891a5">${c.rels.length} relación(es) en el POT · ${activeRels} activa(s)` +
        `${off ? ' · APAGADO' : isolated ? ' · AISLADO' : ''}</span>`));
      g.addEventListener('mousemove', moveTooltip);
      g.addEventListener('mouseleave', hideTooltip);

      // Arrastre del nodo: el nodo tomado mueve toda la red con un seguimiento
      // elástico; al soltar, los demás conceptos vuelven con un resorte amortiguado.
      g.addEventListener('pointerdown', ev => {
        if (ev.button !== 0) return;
        ev.stopPropagation();
        cancelAnimationFrame(nodeDrag.raf);
        nodeDrag.active = id;
        nodeDrag.pointerId = ev.pointerId;
        nodeDrag.startX = ev.clientX;
        nodeDrag.startY = ev.clientY;
        nodeDrag.base = Object.fromEntries(Object.keys(drawPos).map(key => [key, { ...drawPos[key] }]));
        nodeDrag.delta = { x: 0, y: 0 };
        g.classList.add('dragging');
        try { g.setPointerCapture?.(ev.pointerId); } catch (error) { console.debug('Captura de puntero no disponible:', error); }
      });
      g.addEventListener('pointermove', ev => {
        if (nodeDrag.active !== id || nodeDrag.pointerId !== ev.pointerId) return;
        ev.stopPropagation();
        const rect = document.getElementById('svg').getBoundingClientRect();
        nodeDrag.delta = { x: (ev.clientX - nodeDrag.startX) * vb.w / Math.max(rect.width, 1), y: (ev.clientY - nodeDrag.startY) * vb.h / Math.max(rect.height, 1) };
        paintDraggedGraph();
      });
      const finishNodeDrag = ev => {
        if (nodeDrag.active !== id || nodeDrag.pointerId !== ev.pointerId) return;
        ev.stopPropagation();
        try { g.releasePointerCapture?.(ev.pointerId); } catch (error) { /* ya liberado */ }
        releaseDraggedGraph();
      };
      g.addEventListener('pointerup', finishNodeDrag);
      g.addEventListener('pointercancel', finishNodeDrag);
      g.addEventListener('lostpointercapture', finishNodeDrag);

      // Detección de doble clic confiable en móvil (touch) y escritorio (click/dblclick)
      let lastClickTime = 0;
      const hideFromDoubleTap = () => {
        hideNodeAndConnections(id);
      };

      const handleDoubleClick = (ev) => {
        const now = performance.now();
        if (now - lastClickTime < 300) {
          ev.stopPropagation();
          hideFromDoubleTap();
          lastClickTime = 0;
        } else {
          lastClickTime = now;
          focusConcept(id);
        }
      };

      // Desktop: dblclick event
      g.addEventListener('dblclick', ev => {
        ev.stopPropagation();
        hideFromDoubleTap();
      });

      // Mobile: click count + touch events
      g.addEventListener('click', ev => {
        ev.stopPropagation();
        if (ev.detail >= 2) {
          hideFromDoubleTap();
        } else {
          handleDoubleClick(ev);
        }
      });

      // Fallback para touch devices
      g.addEventListener('touchend', ev => {
        if (ev.touches.length === 0) handleDoubleClick(ev);
      });

      gNodes.appendChild(g);
    });
  });

  purgeInactiveSvg();
  if (previousPositions) animateNetworkReflow(targets, previousPositions);
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------------
// 4. MÉTRICAS
// ---------------------------------------------------------------------
const outgoing = s => model.relations.filter(r => r.sO === s && relActive(r)).length;
// Conexiones con OTROS sistemas: es la medida en la que la ESECI encabeza la red
// y la que sustenta el hallazgo principal del módulo.
const crossLinks = s => model.relations.filter(r =>
  r.sO !== r.sD && (r.sO === s || r.sD === s) && relActive(r)).length;
const incoming = s => model.relations.filter(r => r.sD === s && relActive(r)).length;
// relaciones que desaparecerían si ese sistema se apagara (desde red completa)
const incident = s => model.relations.filter(r => (r.sO === s || r.sD === s) && relActive(r)).length;

function components() {
  // La red visible son los conceptos y las relaciones documentadas.
  // Un concepto sin ninguna relación activa cuenta como componente propio.
  const adj = {};
  const nodes = [];
  Object.values(model.concepts).forEach(c => {
    if (!state[c.sys] || offNodes.has(c.id) || !c.rels.some(relActive)) return;
    nodes.push(c.id);
    adj[c.id] = [];
  });
  model.relations.forEach(r => {
    if (!relActive(r)) return;
    adj[r.from].push(r.to);
    adj[r.to].push(r.from);
  });

  const seen = new Set();
  const sizes = [];
  nodes.forEach(n => {
    if (seen.has(n)) return;
    let size = 0;
    const stack = [n];
    seen.add(n);
    while (stack.length) {
      const cur = stack.pop();
      size++;
      (adj[cur] || []).forEach(nb => { if (!seen.has(nb)) { seen.add(nb); stack.push(nb); } });
    }
    sizes.push(size);
  });
  sizes.sort((a, b) => b - a);
  return { count: sizes.length, largest: sizes[0] || 0, totalNodes: nodes.length };
}

function updateHiddenNodesIndicator() {
  const indicator = document.getElementById('hiddenNodesIndicator');
  const text = document.getElementById('hiddenNodesText');
  if (!indicator || !text) return;
  const disconnected = Object.values(model.concepts).filter(c => state[c.sys] && !offNodes.has(c.id) && !c.rels.some(relActive)).length;
  const count = offNodes.size + disconnected;
  indicator.classList.toggle('is-clear', count === 0);
  indicator.classList.toggle('has-hidden', count > 0);
  text.textContent = count ? `${count} nodo${count === 1 ? '' : 's'} fuera de la red` : 'Sin nodos fuera de la red';
  indicator.title = count ? `${offNodes.size} ocultados manualmente · ${disconnected} sin conexiones activas` : 'Todos los nodos tienen conexiones activas';
}

function renderM03RelationTable() {
  const host = document.getElementById('m03RelationRows');
  const count = document.getElementById('m03TableCount');
  if (!host) return;
  const rows = model.relations;
  if (count) count.textContent = `${rows.length} relaciones documentadas`;
  host.innerHTML = rows.map((r, i) => {
    const type = `${r.evid || 'Directa'} · ${r.tipo || 'Soporte'}`;
    const source = r.fuente || r.source || r.seccion || 'POT';
    const page = r.pag ? `p. ${r.pag}` : '—';
    const analysis = relationExplanation(r);
    const relation = `${r.cO} → ${r.cD}`;
    return `<div class="matrix-row ${relActive(r) ? '' : 'is-off'}" data-rel-row="${r.id}">
      <div class="matrix-cell m03-table-system">${esc(r.sO)} → ${esc(r.sD)}</div>
      <div class="matrix-cell m03-table-relation">${esc(relation)}</div>
      <div class="matrix-cell"><span class="m03-type-pill ${String(r.evid || '').toLowerCase().startsWith('ind') ? 'indirecta' : 'directa'}">${esc(type)}</span></div>
      <div class="matrix-cell">${esc(source)}</div>
      <div class="matrix-cell">${esc(page)}</div>
      <div class="matrix-cell matrix-analysis m03-table-analysis">${esc(analysis)}</div>
    </div>`;
  }).join('');
}

function updateMetrics() {
  const total = model.relations.length;
  renderM03RelationTable();
  const active = model.relations.filter(relActive).length;
  const pct = total ? Math.round((active / total) * 100) : 0;
  const comp = components();
  const totalNodes = Object.keys(model.concepts).length;

  const isolatedCount = Object.values(model.concepts)
    .filter(c => state[c.sys] && !c.rels.some(relActive)).length;

  set('mRelTot', total);
  set('mRelAct', active + ' <small>/ ' + total + '</small>');
  set('mPct', pct + '<small>%</small>');
  set('mNodTot', totalNodes);
  set('mNodAct', comp.totalNodes + ' <small>/ ' + totalNodes + '</small>');
  set('mComp', comp.count);
  set('mMain', comp.largest + ' <small>nodos</small>');
  set('mIso', isolatedCount);

  const activeSystems = SYS.filter(s => state[s]).length;
  set('metricActive', activeSystems);
  set('metricActiveSub', activeSystems === SYS.length ? 'Estructuras activas' : `de ${SYS.length} estructuras activas`);
  set('metricRelations', active);
  set('metricRelationsSub', `de ${total} verificadas`);
  set('metricNodes', comp.totalNodes);
  set('metricNodesSub', `de ${totalNodes} conceptos activos`);
  const activeHubs = SYS.filter(s => state[s]).reduce((count, s) => {
    return count + model.systems[s].concepts.some(id => !offNodes.has(id) && activeDegree(model.concepts[id]) > 0) ? 1 : 0;
  }, 0);
  const activeBridges = Object.values(model.concepts).filter(isBridge).length;
  set('metricHubs', activeHubs);
  set('metricHubsSub', `${activeHubs} de ${SYS.filter(s => state[s]).length} estructuras`);
  set('metricBridges', activeBridges);
  set('metricBridgesSub', activeBridges === 1 ? 'puente entre estructuras' : 'puentes entre estructuras');
  set('metricConnectivity', pct + '%');
  set('metricConnectivityValue', `${active} activas`);
  const metricRing = document.querySelector('.metric-ring');
  if (metricRing) metricRing.style.setProperty('--connectivity', pct + '%');
  updateHiddenNodesIndicator();
  SYS.forEach(s => {
    const count = document.getElementById('m03-count-' + s);
    if (count) count.textContent = model.systems[s].concepts.filter(id => state[s] && !offNodes.has(id) && activeDegree(model.concepts[id]) > 0).length;
  });

  const bar = document.getElementById('mBar');
  if (bar) {
    bar.style.width = pct + '%';
    bar.style.background = pct === 100 ? 'var(--eep)' : pct >= 60 ? 'var(--eseci)' : 'var(--danger)';
  }

  // ---- centralidad saliente (calculada, nunca fija) ----
  const rank = SYS.map(s => ({ s, out: crossLinks(s), inc: incoming(s), on: state[s] }))
    .sort((a, b) => b.out - a.out || a.s.localeCompare(b.s));
  const maxOut = Math.max(1, ...rank.map(r => r.out));

  document.getElementById('rankList').innerHTML = rank.map((r, i) => `
    <div class="rank-row ${r.on ? '' : 'is-off'}" style="--sys:${model.systems[r.s].color}">
      <span class="pos">${i + 1}</span>
      <span class="code">${r.s}</span>
      <span class="track"><span class="fill" style="width:${(r.out / maxOut) * 100}%"></span></span>
      <span class="n">${r.out}</span>
    </div>`).join('');

  const top = rank[0];
  const tie = rank.filter(r => r.out === top.out && top.out > 0);
  document.getElementById('topSys').innerHTML = top.out === 0
    ? '<span class="badge-top">Sin conexiones activas entre sistemas</span>'
    : `<span class="badge-top" style="color:${model.systems[top.s].color};border-color:${model.systems[top.s].color}66;background:${model.systems[top.s].color}1f">
         ${tie.length > 1 ? tie.map(t => t.s).join(' / ') : top.s} · Más conectado con los demás
       </span>`;
  set('mCentral', top.out === 0 ? '—' : (tie.length > 1 ? tie.map(t => t.s).join(' / ') : top.s));

  // ---- comparación: dependencia que genera cada sistema ----
  const maxInc = Math.max(...SYS.map(incident));
  document.getElementById('compareList').innerHTML = SYS
    .map(s => ({ s, n: incident(s) }))
    .sort((a, b) => b.n - a.n)
    .map(o => `
      <div class="compare-row" style="--sys:${model.systems[o.s].color}">
        <span class="code">${o.s}</span>
        <span class="track"><span class="fill" style="width:${(o.n / maxInc) * 100}%"></span></span>
        <span class="n">${o.n} rel.</span>
      </div>`).join('');

  updateWeakBanner(active, total);
  updateBridgePanel();
  updateSimPanel(active, total, rank);
}


// Aviso sobre el diagrama: cuánto se debilitó la red y cuántos nodos quedaron
// desconectados. Todo calculado del estado actual.
function updateWeakBanner(active, total) {
  const banner = document.getElementById('weakBanner');
  const txt = document.getElementById('weakBannerText');
  if (!banner || !txt) return;

  const off = SYS.filter(s => !state[s]);
  const nodosOff = offNodes.size;
  if (!off.length && !nodosOff) {
    banner.classList.add('hidden');
    return;
  }

  const perdidas = total - active;
  const loss = total ? Math.round((perdidas / total) * 100) : 0;
  const comp = components();

  const cortados = Object.values(model.concepts)
    .filter(c => state[c.sys] && !offNodes.has(c.id) && c.rels.length && lossRatioOf(c) >= 1).length;
  const debiles = Object.values(model.concepts)
    .filter(c => state[c.sys] && !offNodes.has(c.id) && c.rels.length &&
                 lossRatioOf(c) >= 0.34 && lossRatioOf(c) < 1).length;

  const quien = off.length ? off.join(' + ') : 'ese nodo';
  txt.innerHTML = `<b>Red debilitada:</b> sin ${quien} se pierden <b>${perdidas} de ${total}</b>
    relaciones (<b>${loss}%</b>) y la red queda en <b>${comp.count}</b> componentes.
    <span class="wb-sub">${cortados} concepto(s) quedaron sin ninguna conexión ·
    ${debiles} perdieron la mitad o más de las suyas</span>`;
  banner.classList.remove('hidden');
}


// ---------------------------------------------------------------------
// NODOS PUENTE: conceptos que se relacionan con las TRES estructuras
// distintas a la suya. Son las costuras de la red.
// ---------------------------------------------------------------------
function activeDegree(c) {
  return c.rels.filter(relActive).length;
}
function structuresTouched(c) {
  const set = new Set();
  c.rels.filter(relActive).forEach(r => {
    const otro = r.from === c.id ? r.sD : r.sO;
    if (otro !== c.sys) set.add(otro);
  });
  return set;
}
const isBridge = c => state[c.sys] && structuresTouched(c).size >= 3;

function updateBridgePanel() {
  const box = document.getElementById('bridgeList');
  if (!box) return;
  const lista = Object.values(model.concepts)
    .filter(isBridge)
    .map(c => ({ c, deg: activeDegree(c) }))
    .sort((a, b) => b.deg - a.deg);

  if (!lista.length) { box.innerHTML = '<p class="ev-empty">Ningún concepto conecta con las tres estructuras restantes.</p>'; return; }

  const porESECI = lista.filter(o => o.c.sys === 'ESECI').length;
  box.innerHTML = lista.map(o => `
      <div class="bridge-row" style="--sys:${model.systems[o.c.sys].color}">
        <i class="fa-solid ${o.c.icon}"></i>
        <span class="bl">${esc(o.c.label)}</span>
        <span class="bs">${o.c.sys}</span>
        <span class="bn">${o.deg}</span>
      </div>`).join('') +
    `<p class="note">${porESECI} de ${lista.length} nodos puente pertenecen a la ESECI: es la estructura que cose la red.</p>`;
}

const set = (id, html) => {
  const target = document.getElementById(id);
  if (target) target.innerHTML = html;
};

function updateSimPanel(active, total, rank) {
  const off = SYS.filter(s => !state[s]);
  const box = document.getElementById('simBox');

  if (!off.length) {
    box.innerHTML = `<p class="ev-empty">Todos los sistemas están activos. Apaga uno para medir cuánta articulación aporta a la red.</p>`;
  } else {
    const removed = total - active;
    const loss = total ? Math.round((removed / total) * 100) : 0;
    box.innerHTML = `
      <div class="sim-off">
        <div class="k">Sistema${off.length > 1 ? 's' : ''} desactivado${off.length > 1 ? 's' : ''}</div>
        <div class="v">${off.join(' + ')}</div>
      </div>
      <div class="sim-line"><span>Relaciones eliminadas</span><span>${removed}</span></div>
      <div class="sim-line"><span>Relaciones restantes</span><span>${active}</span></div>
      <div class="sim-line"><span>Pérdida de conectividad</span><span>${loss}%</span></div>
      <p class="note" style="border:0;padding-top:9px">Al desactivar ${off.join(' + ')}, la red pierde ${loss}% de sus relaciones.</p>
      ${off.includes('ESECI') ? `<div class="eco-note"><i class="fa-solid fa-arrow-trend-up"></i>
        <span>Es la caída más fuerte de la red: el POT orienta buena parte del ordenamiento hacia el
        crecimiento económico, el empleo y la productividad, así que al quitar la ESECI se desprenden
        ${removed} relaciones y la red se parte en ${components().count} componentes.</span></div>` : ''}`;
  }

  // ---- hallazgo dinámico ----
  // El texto separa lo que la red muestra de cualquier interpretación normativa.
  const top = rank[0];
  const f = document.getElementById('finding');
  const nf = document.getElementById('networkFindingText');
  let findingHtml = '';
  if (!off.length) {
    findingHtml = top.out === 0
      ? 'No hay relaciones intersistema activas para analizar.'
      : `La red muestra <b>${active} de ${total}</b> relaciones activas. En este modelo, <b>${top.s}</b> es el sistema con más conexiones hacia otras estructuras (<b>${top.out}</b>). Esto describe la topología de la red; no establece una jerarquía normativa del POT.`;
  } else {
    const removed = total - active;
    const loss = total ? Math.round((removed / total) * 100) : 0;
    findingHtml = `Al desactivar <b>${off.join(' + ')}</b>, desaparecen <b>${removed}</b> relaciones y quedan <b>${active}</b> activas. La red queda dividida en <b>${components().count}</b> componente(s). El resultado muestra la dependencia interna de este modelo; no afirma que una estructura sea superior a otra en el POT.`;
  }
  if (f) f.innerHTML = findingHtml;
  updateNetworkFinding(off, active, total);
  if (nf) nf.setAttribute('data-state', off.length ? 'partial' : 'complete');
}

function animateFindingElement(el) {
  if (!el) return;
  el.classList.remove('finding-updated');
  void el.offsetWidth;
  el.classList.add('finding-updated');
  window.clearTimeout(el._findingAnimationTimer);
  el._findingAnimationTimer = window.setTimeout(() => el.classList.remove('finding-updated'), 720);
}

function updateNetworkFinding(off, active, total) {
  const title = document.querySelector('.finding-card-title');
  const summary = document.querySelector('.finding-card-summary');
  if (!title || !summary) return;

  const findings = {
    EEP: {
      title: 'EEP · Protección ambiental',
      text: 'La EEP tiene conexiones porque el POT usa la estructura ecológica para ordenar y proteger el territorio a través del agua, los ecosistemas y la biodiversidad. Por eso relaciona elementos como humedales, ríos, quebradas, áreas protegidas y parques ecológicos con la conservación ambiental y la resiliencia climática. En cambio, su función principal no es impulsar directamente el empleo o la productividad, sino sostener las condiciones ambientales que permiten la vida urbana.'
    },
    EFC: {
      title: 'EFC · Cuidado y funcionamiento',
      text: 'La EFC tiene conexiones porque el POT usa la estructura funcional y del cuidado para organizar la vida cotidiana y el funcionamiento urbano. Por eso relaciona la movilidad, la vivienda, los servicios públicos, los equipamientos, el espacio público y los servicios de cuidado con el acceso de la población a las oportunidades de la ciudad. En cambio, su función principal no es proteger ecosistemas ni ordenar patrimonios, sino garantizar soporte, acceso y cuidado para la vida diaria.'
    },
    ESECI: {
      title: 'ESECI · Economía y productividad',
      text: 'La ESECI tiene más conexiones porque el POT usa el ordenamiento territorial para impulsar la economía, el empleo y la productividad. Por eso relaciona cosas como la movilidad, la vivienda, los equipamientos y la conectividad con las actividades económicas. En cambio, la EEP cumple principalmente una función ambiental: ordenar y proteger el territorio a través del agua, los ecosistemas y la biodiversidad.'
    },
    EIP: {
      title: 'EIP · Patrimonios',
      text: 'La EIP tiene conexiones porque el POT usa la estructura integradora de patrimonios para reconocer y articular los valores culturales y territoriales de la ciudad. Por eso relaciona el patrimonio material, inmaterial, arqueológico, cultural y natural con la identidad, la memoria, los sitios sagrados y las actividades que construyen sentido de lugar. En cambio, su función principal no es organizar la productividad ni sustituir la protección ecológica, sino integrar los patrimonios en el ordenamiento territorial.'
    }
  };

  const activeHubs = SYS.filter(s => state[s]).map(s => {
    const hub = model.systems[s].concepts.slice().filter(id => !offNodes.has(id)).sort((a, b) => (model.concepts[b].activeDeg ?? 0) - (model.concepts[a].activeDeg ?? 0))[0];
    return hub ? `${esc(model.concepts[hub].label)} (${model.concepts[hub].activeDeg ?? 0})` : '';
  }).filter(Boolean).join(' · ');
  if (!off.length) {
    title.textContent = 'Red completa · hubs por conectividad';
    summary.innerHTML = 'La red está completa. El tamaño de cada nodo se calcula con sus conexiones activas y los hubs actuales son: <b>' + activeHubs + '</b>.';
    animateFindingElement(document.getElementById('networkFinding'));
    return;
  }

  if (off.length === 1 && findings[off[0]]) {
    title.textContent = findings[off[0]].title;
    summary.innerHTML = findings[off[0]].text + ` En esta simulación desaparecen <b>${total - active}</b> relaciones. Los hubs se recalcularon: <b>${activeHubs || 'no quedan estructuras activas'}</b>.`;
    animateFindingElement(document.getElementById('networkFinding'));
    return;
  }

  title.textContent = 'Escenario combinado';
  summary.innerHTML = `Al apagar <b>${off.join(' + ')}</b>, desaparecen <b>${total - active}</b> relaciones y quedan <b>${active}</b> activas. Los hubs se recalcularon según las conexiones restantes: <b>${activeHubs || 'ninguno'}</b>.`;
  animateFindingElement(document.getElementById('networkFinding'));
}

// ---------------------------------------------------------------------
// 5. INTERACCIÓN
// ---------------------------------------------------------------------
function showStructureInsight(system, isOff) {
  const popup = document.getElementById('networkFinding');
  if (!popup) return;
  popup.classList.add('is-open');
  popup.style.setProperty('display', 'block', 'important');
  popup.setAttribute('aria-hidden', 'false');
  if (system) popup.dataset.system = system;
  popup.dataset.state = isOff ? 'off' : 'on';
  animateFindingElement(popup);
}

function toggleSystem(s) {
  state[s] = !state[s];
  lastToggledOff = state[s] ? null : s;
  showStructureInsight(s, !state[s]);
  if (selectedRel !== null) {
    const r = model.relations.find(x => x.id === selectedRel);
    if (r && !relActive(r)) clearEvidence();
  }
  updateSwitches();
  render();
  updateMetrics();
  // Actualización explícita: el popup debe reflejar el clic actual incluso
  // cuando el navegador conserva una pintura anterior durante el reflow.
  updateNetworkFinding(SYS.filter(system => !state[system]), model.relations.filter(relActive).length, model.relations.length);
}

function updateSwitches() {
  SYS.forEach(s => {
    const b = document.querySelector('.scenario-btn[data-sys="' + s + '"]');
    const check = document.querySelector('.m03-system-check[data-sys="' + s + '"]');
    const off = !state[s];
    if (check) check.checked = !off;
    if (!b) return;
    // en este módulo, "active" = escenario de apagado encendido
    b.classList.toggle('active', off);
    const st = b.querySelector('.sys-state');
    if (st) st.textContent = off ? 'OFF' : 'ON';
    const ic = b.querySelector('i');
    if (ic) {
      ic.classList.toggle('fa-circle-minus', !off);
      ic.classList.toggle('fa-power-off', off);
    }
  });
}

function resetAll() {
  SYS.forEach(s => (state[s] = true));
  offNodes.clear();
  lastToggledOff = null;
  clearEvidence();
  updateSwitches();
  render();
  updateMetrics();
  if (document.getElementById('nodeSelect')) { syncNodeBtn(); updateNodeImpact(); }
  resetView();
}

function relationExplanation(r) {
  if (r.explicacion) return r.explicacion;
  return r.sO === r.sD
    ? `La conexión se mantiene dentro de la estructura ${r.sO}: ${r.cO} se relaciona con ${r.cD} como un vínculo de ${(r.tipo || 'soporte').toLowerCase()} y lectura ${(r.evid || 'directa').toLowerCase()}.`
    : `La relación conecta la estructura ${r.sO} con ${r.sD}: ${r.cO} funciona como vínculo territorial hacia ${r.cD}. Se clasifica como ${(r.tipo || 'soporte').toLowerCase()} y se lee como una relación ${(r.evid || 'directa').toLowerCase()}.`;
}

function selectRelation(id, ev) {
  // El mismo tooltip sobre la línea contiene toda la evidencia; no se abre otro popup.
  hideTooltip();
  // Los atributos data-rel del SVG llegan como texto; el modelo usa IDs numéricos.
  // Normalizar aquí evita que el clic del hitbox no encuentre la relación.
  const normalizedId = Number(id);
  selectedRel = Number.isNaN(normalizedId) ? id : normalizedId;
  const r = model.relations.find(x => String(x.id) === String(id));
  if (!r) return;
  const kind = r.tipo === 'Soporte' ? 'soporte' : 'resiliencia';

  const fullTooltip = relationTooltipHTML(r);
  if (ev) {
    showTooltip(ev, fullTooltip);
    tip().classList.add('pinned');
  }

  document.getElementById('evBox').innerHTML = `
    <div class="ev-rel">
      <span style="color:${model.systems[r.sO].color}">${r.sO}</span>
      <span class="arrow">→</span>
      <span style="color:${model.systems[r.sD].color}">${r.sD}</span>
    </div>
    <div class="ev-concepts"><b>${esc(r.cO)}</b> → <b>${esc(r.cD)}</b></div>
    <div class="ev-meta">
      <div><div class="k">Tipo</div><div class="v" style="color:var(--${kind})">${r.tipo}</div></div>
      <div><div class="k">Lectura</div><div class="v">${r.evid}</div></div>
      <div style="grid-column:1/-1"><div class="k">Sección / referencia</div><div class="v" style="font-size:10.5px;line-height:1.4">${esc(r.seccion)}</div></div>
    </div>
    <div class="ev-explanation"><b>Explicación causal</b><br>${esc(relationExplanation(r))}${r.ejemplo ? `<br><span class="ev-example"><b>Ejemplo</b> ${esc(r.ejemplo)}</span>` : ""}</div>
    <div class="ev-quote ${kind}">${esc(r.frase)}</div>
    <div class="ev-page">Página ${r.pag}</div>
    ${r.completa ? '' : '<div class="ev-warn"><i class="fa-solid fa-circle-info"></i>El archivo fuente guarda esta relación como fragmento abreviado, no como frase completa.</div>'}`;

  render();
}

function clearEvidence() {
  selectedRel = null;
  document.getElementById('evBox').innerHTML =
    `<p class="ev-empty">Haz clic en cualquier línea de la red para ver el detalle de esa relación.</p>`;
}

// Resalta un concepto y sus relaciones activas
function focusConcept(id) {
  const c = model.concepts[id];
  const neighbors = new Set([id]);
  c.rels.filter(relActive).forEach(r => { neighbors.add(r.from); neighbors.add(r.to); });

  document.querySelectorAll('.concept').forEach(g => {
    g.classList.toggle('dim', !neighbors.has(g.getAttribute('data-id')));
  });
  document.querySelectorAll('.rel').forEach(p => {
    const r = model.relations.find(x => x.id === +p.getAttribute('data-rel'));
    p.classList.toggle('dim', !(r && (r.from === id || r.to === id)));
  });
}

function clearFocus() {
  document.querySelectorAll('.dim').forEach(n => n.classList.remove('dim'));
}

function hideNodeAndConnections(id) {
  if (!model.concepts[id]) return;
  offNodes.add(id);

  // Cascada: si un concepto queda sin ninguna relación activa, también se oculta.
  let changed = true;
  while (changed) {
    changed = false;
    Object.values(model.concepts).forEach(c => {
      if (!offNodes.has(c.id) && c.rels.filter(relActive).length === 0) {
        offNodes.add(c.id);
        changed = true;
      }
    });
  }

  clearFocus();
  clearEvidence();
  render();
  updateMetrics();
  updateNetworkFinding(SYS.filter(system => !state[system]), model.relations.filter(relActive).length, model.relations.length);
  if (document.getElementById('nodeSelect')) { syncNodeBtn(); updateNodeImpact(); }
}

function deselectLocal(id) {
  const c = model.concepts[id];
  if (!c) return;
  const neighbors = new Set([id]);
  c.rels.filter(relActive).forEach(r => {
    neighbors.add(r.from);
    neighbors.add(r.to);
  });

  // Solo se limpian las marcas visuales del nodo pulsado y sus vecinos.
  document.querySelectorAll('.concept').forEach(g => {
    if (neighbors.has(g.getAttribute('data-id'))) {
      g.classList.remove('dim', 'local-selected');
      g.classList.add('local-deselected');
    }
  });
  document.querySelectorAll('.rel').forEach(p => {
    const r = model.relations.find(x => x.id === +p.getAttribute('data-rel'));
    if (r && (neighbors.has(r.from) || neighbors.has(r.to))) {
      p.classList.remove('dim', 'sel');
    }
  });

  // La marca desaparece sola al siguiente enfoque o al hacer clic fuera.
  window.setTimeout(() => {
    document.querySelectorAll('.local-deselected').forEach(g => g.classList.remove('local-deselected'));
  }, 700);
}

// ---------------------------------------------------------------------
// 5b. ESCENARIO DE NODO CRÍTICO
// Permite apagar un concepto concreto ("¿qué pasaría si no existieran los
// Humedales?"). Al apagarlo desaparecen todas las relaciones que lo tocan.
// La lista se calcula sola: los conceptos con más relaciones primero.
// ---------------------------------------------------------------------
const TOP_NODES = 10;

function topNodes(n) {
  return Object.values(model.concepts)
    .filter(c => c.rels.length > 0)
    .map(c => ({ id: c.id, label: c.label, sys: c.sys, deg: c.rels.length }))
    .sort((a, b) => b.deg - a.deg || a.label.localeCompare(b.label))
    .slice(0, n);
}

function initNodeScenario() {
  const sel = document.getElementById('nodeSelect');
  if (!sel) return;
  sel.innerHTML = topNodes(TOP_NODES).map(o =>
    `<option value="${o.id}">${esc(o.label)} · ${o.deg} conexiones</option>`).join('');
  sel.addEventListener('change', onNodeSelectChange);
  document.getElementById('btnNodeSim').addEventListener('click', toggleNodeScenario);
  onNodeSelectChange();
}

function plural(label) {
  // "¿Qué pasaría si no existieran los Humedales?" / "...si no existiera la Vivienda?"
  return /s$/i.test(label.trim());
}

function onNodeSelectChange() {
  const sel = document.getElementById('nodeSelect');
  const id = sel.value;
  const c = model.concepts[id];
  if (!c) return;

  // si había otro nodo apagado, se reactiva al cambiar de selección
  if (offNodes.size) {
    offNodes.clear();
    render();
    updateMetrics();
  }

  document.getElementById('nodeQuestion').textContent =
    plural(c.label)
      ? `¿Qué pasaría si no existieran «${c.label}»?`
      : `¿Qué pasaría si no existiera «${c.label}»?`;

  syncNodeBtn();
  updateNodeImpact();
}

function toggleNodeScenario() {
  const id = document.getElementById('nodeSelect').value;
  if (!id) return;
  if (offNodes.has(id)) offNodes.delete(id);
  else { offNodes.clear(); offNodes.add(id); }
  syncNodeBtn();
  render();
  updateMetrics();
}

function syncNodeBtn() {
  const id = document.getElementById('nodeSelect').value;
  const btn = document.getElementById('btnNodeSim');
  const on = offNodes.has(id);
  btn.classList.toggle('active', on);
  btn.innerHTML = on
    ? '<i class="fa-solid fa-power-off"></i> Reactivar nodo'
    : '<i class="fa-solid fa-power-off"></i> Simular sin este nodo';
}

function updateNodeImpact() {
  const id = document.getElementById('nodeSelect').value;
  const c = model.concepts[id];
  const box = document.getElementById('nodeImpact');
  if (!c || !box) return;
  const total = model.relations.length;
  const pct = Math.round((c.rels.length / total) * 100);
  box.innerHTML = `<b>${c.rels.length}</b> de <b>${total}</b> relaciones (<b>${pct}%</b>) se pierden al apagarlo.`;
}
// ---------------------------------------------------------------------
// POP-UP DE APERTURA: HALLAZGO PRINCIPAL
// Las cifras de respaldo se calculan desde los datos, no van escritas a mano.
// ---------------------------------------------------------------------
function initIntro() {
  const back = document.getElementById('introBackdrop');
  if (!back) return;

  // Cifras del hallazgo, calculadas desde los datos: conexiones de cada
  // estructura con las demás (relaciones que cruzan de un sistema a otro).
  const figs = SYS.map(s => ({
    s,
    n: model.relations.filter(r => r.sO !== r.sD && (r.sO === s || r.sD === s)).length,
    color: model.systems[s].color
  })).sort((a, b) => b.n - a.n);

  const box = document.getElementById('introFigures');
  if (box) {
    box.innerHTML = figs.map(f => `
      <div class="fig-card" style="--fig:${f.color}">
        <div class="fig-code">${f.s}</div>
        <div class="fig-num">${f.n}</div>
        <div class="fig-lbl">conexiones con otros sistemas</div>
      </div>`).join('');
  }

  // --- navegación de los dos pasos ---
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const lbl   = document.getElementById('introStepLbl');
  const bNext = document.getElementById('introNext');
  const bBack = document.getElementById('introBack');
  const bEnd  = document.getElementById('introBtn');

  function paso(n) {
    step1.classList.toggle('hidden', n !== 1);
    step2.classList.toggle('hidden', n !== 2);
    bNext.classList.toggle('hidden', n !== 1);
    bBack.classList.toggle('hidden', n !== 2);
    bEnd.classList.toggle('hidden', n !== 2);
    lbl.textContent = 'Paso ' + n + ' de 2';
    const m = document.querySelector('.intro-modal');
    if (m) m.scrollTop = 0;
  }

  bNext.addEventListener('click', () => paso(2));
  bBack.addEventListener('click', () => paso(1));

  const cerrar = () => {
    back.classList.add('hidden');
    document.body.style.overflow = '';
    // señalar el escenario que demuestra el hallazgo
    const btn = document.querySelector('.scenario-btn[data-sys="ESECI"]');
    if (btn) {
      btn.classList.add('spotlight');
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      btn.addEventListener('click', () => btn.classList.remove('spotlight'), { once: true });
      setTimeout(() => btn.classList.remove('spotlight'), 14000);
    }
  };
  bEnd.addEventListener('click', cerrar);
  document.getElementById('introClose').addEventListener('click', cerrar);
  back.addEventListener('click', e => { if (e.target === back) cerrar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

  paso(1);
  document.body.style.overflow = 'hidden';
}

// ---------------------------------------------------------------------
// POP-UP DE LA FRASE EXACTA: se abre al hacer clic en una línea.
// Muestra la frase textual del POT entre comillas y la página debajo.
// ---------------------------------------------------------------------
function openQuoteModal(r, kind) {
  const back = document.getElementById('quoteBackdrop');
  if (!back) return;

  document.getElementById('quoteRel').innerHTML =
    `${esc(r.cO)} <span class="arrow">→</span> ${esc(r.cD)}`;

  const tags = [`<span class="quote-tag ${kind}">${esc((r.tipo || 'SOPORTE').toUpperCase())}</span>`];
  document.getElementById('quoteTags').innerHTML = tags.join('');

  const explanation = r.sO === r.sD
    ? `La conexión se mantiene dentro de la estructura ${r.sO}. En este modelo, ${r.cO} se relaciona con ${r.cD} como un vínculo de ${(r.tipo || 'soporte').toLowerCase()}, clasificado como relación ${(r.evid || 'directa').toLowerCase()}.`
    : `La relación conecta la estructura ${r.sO} con ${r.sD}: ${r.cO} funciona como vínculo territorial hacia ${r.cD}. En este modelo se clasifica como ${(r.tipo || 'soporte').toLowerCase()} y se lee como una relación ${(r.evid || 'directa').toLowerCase()}.`;
  const qe = document.getElementById('quoteExplanation');
  if (qe) qe.textContent = explanation;

  // r.frase ya viene entre comillas tipográficas desde los datos
  const qt = document.getElementById('quoteText');
  if (r.sinFrase || !r.frase) {
    qt.textContent = 'Esta relación se agregó a la red pero todavía no tiene una frase del POT registrada que la sustente. Añádela en el Excel (frase textual y página) para que aparezca aquí.';
    qt.classList.add('no-quote');
  } else {
    qt.textContent = r.frase;
    qt.classList.remove('no-quote');
  }
  document.getElementById('quotePage').textContent = r.pag === '—' ? 'Página pendiente' : `p. ${r.pag} del POT`;
  document.getElementById('quoteSec').textContent = r.seccion || '';

  back.classList.remove('hidden');
}

function closeQuoteModal() {
  const back = document.getElementById('quoteBackdrop');
  if (back) back.classList.add('hidden');
}

function initQuoteModal() {
  const back = document.getElementById('quoteBackdrop');
  if (!back) return;
  document.getElementById('quoteClose').addEventListener('click', closeQuoteModal);
  back.addEventListener('click', e => { if (e.target === back) closeQuoteModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuoteModal(); });
}

const tip = () => document.getElementById('tooltip');

function relationTooltipHTML(r) {
  const explanation = relationExplanation(r);
  return `<div class="tt-sys" style="color:${model.systems[r.sO].color}">${esc(r.sO)} → ${esc(r.sD)}</div>` +
    `<div class="tt-rel">${esc(r.cO)} → ${esc(r.cD)}</div>` +
    `<span class="tt-type">${esc((r.tipo || 'Soporte').toUpperCase())} · ${esc(r.evid || 'Directa')} · p. ${esc(r.pag)}</span>` +
    `<div class="tt-label">EXPLICACIÓN</div><div class="tt-explanation">${esc(explanation)}${r.ejemplo ? `<br><span class="tt-example"><b>Ejemplo:</b> ${esc(r.ejemplo)}</span>` : ""}</div>` +
    `<div class="tt-label">CITA POT</div><div class="tt-quote">${esc(r.frase || 'Cita pendiente de completar')}</div>` +
    `<div class="tt-page">${esc(r.seccion || 'POT')} · p. ${esc(r.pag)}</div>`;
}

function showTooltip(ev, html) {
  const t = tip();
  t.innerHTML = html;
  t.classList.add('show');
  moveTooltip(ev);
}

function moveTooltip(ev) {
  const t = tip();
  const stage = document.getElementById('stage').getBoundingClientRect();
  let x = ev.clientX - stage.left + 14;
  let y = ev.clientY - stage.top + 14;
  if (x + 270 > stage.width) x -= 290;
  if (y + 90 > stage.height) y -= 110;
  t.style.left = x + 'px';
  t.style.top = y + 'px';
}

function hideTooltip() {
  const t = tip();
  if (!t.classList.contains('pinned')) t.classList.remove('show');
}

// ---------------------------------------------------------------------
// 7. ZOOM Y DESPLAZAMIENTO
// ---------------------------------------------------------------------
const VB = POT_DATA.vb;
let BASE_VB = { x: VB[0], y: VB[1], w: VB[2], h: VB[3] };
let vb = Object.assign({}, BASE_VB);

function applyVB() {
  document.getElementById('svg').setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  const z = document.getElementById('zoomValue');
  if (z) z.textContent = Math.round((BASE_VB.w / vb.w) * 100) + '%';
}

function resetView() { vb = Object.assign({}, BASE_VB); applyVB(); }

function zoomAt(factor, clientX, clientY) {
  const stage = document.getElementById('stage');
  const svg = document.getElementById('svg');
  const rect = svg.getBoundingClientRect();
  const px = clientX == null ? rect.left + rect.width / 2 : clientX;
  const py = clientY == null ? rect.top + rect.height / 2 : clientY;
  const relX = Math.max(0, Math.min(1, (px - rect.left) / rect.width));
  const relY = Math.max(0, Math.min(1, (py - rect.top) / rect.height));
  const focusX = vb.x + relX * vb.w;
  const focusY = vb.y + relY * vb.h;
  const nextW = Math.max(BASE_VB.w * 0.16, Math.min(BASE_VB.w * 4, vb.w * factor));
  const nextH = nextW * (BASE_VB.h / BASE_VB.w);
  vb.x = focusX - relX * nextW;
  vb.y = focusY - relY * nextH;
  vb.w = nextW;
  vb.h = nextH;
  applyVB();
}

function exportStatus(text) {
  const el = document.getElementById('exportStatus');
  if (el) el.textContent = text;
}
function waitMs(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function svgCaptureImage() {
  const source = document.getElementById('svg');
  const clone = source.cloneNode(true);
  const ns = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs = {}) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };
  clone.setAttribute('xmlns', ns);
  clone.setAttribute('width', '1200');
  clone.setAttribute('height', '760');
  clone.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  // El video se genera como SVG serializado. foreignObject (HTML + Font Awesome)
  // se pierde en Android/Chromium al convertir data:image/svg+xml a canvas; por
  // eso la exportación usa únicamente primitivas SVG nativas.
  const defs = clone.querySelector('defs');
  const bg = make('rect', { x: vb.x, y: vb.y, width: vb.w, height: vb.h, fill: '#0b0c0f', class: 'export-bg' });
  clone.insertBefore(bg, defs ? defs.nextSibling : clone.firstChild);

  const nodeGroups = [...clone.querySelectorAll('#gNodes > g.concept')];
  const sourceGroups = [...source.querySelectorAll('#gNodes > g.concept')];
  nodeGroups.forEach((group, index) => {
    const sourceGroup = sourceGroups[index];
    const ring = group.querySelector('.node-ring, .node-fill');
    const sourceLabel = sourceGroup?.querySelector('.node-name');
    const label = sourceLabel?.textContent?.trim() || group.getAttribute('data-id')?.split('::').pop() || 'Concepto';
    const color = ring?.getAttribute('stroke') || '#f0a15c';
    const radius = Number(ring?.getAttribute('r')) || 70;
    const opacity = sourceGroup ? getComputedStyle(sourceGroup).opacity : '1';
    group.setAttribute('opacity', opacity);
    group.classList.remove('node-appear', 'reflow-enter', 'dragging', 'just-released');
    group.querySelectorAll('foreignObject, .node-hit').forEach(el => el.remove());
    if (!ring) return;
    ring.removeAttribute('filter');
    ring.setAttribute('fill', '#111a19');
    ring.setAttribute('fill-opacity', '0.96');
    ring.setAttribute('stroke', color);
    ring.setAttribute('stroke-width', Math.max(6, radius * 0.055));

    const accent = make('circle', { cx: 0, cy: -radius * 0.43, r: Math.max(7, radius * 0.13), fill: color });
    accent.setAttribute('fill-opacity', '0.95');
    group.appendChild(accent);

    const text = make('text', {
      x: 0,
      y: radius * 0.02,
      'text-anchor': 'middle',
      'font-family': 'Arial, sans-serif',
      'font-size': Math.max(20, Math.min(34, radius * 0.22)),
      'font-weight': '700',
      fill: '#f2f3f6',
      stroke: '#05070d',
      'stroke-width': '2.4',
      'paint-order': 'stroke',
      'pointer-events': 'none'
    });
    const words = label.split(/\s+/);
    const lines = words.length > 2 ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')] : [label];
    lines.slice(0, 2).forEach((line, lineIndex) => {
      const tspan = make('tspan', { x: 0, dy: lineIndex === 0 ? (lines.length === 1 ? 0 : -4) : 18 });
      tspan.textContent = line.length > 20 ? line.slice(0, 19) + '…' : line;
      text.appendChild(tspan);
    });
    group.appendChild(text);
  });

  // Los trazos reciben atributos inline: el canvas no depende de hojas CSS
  // externas ni de variables CSS al rasterizar el data URI.
  clone.querySelectorAll('#gRels > path.rel').forEach(path => {
    const color = path.classList.contains('resiliencia') ? '#2fbfae' : '#f0a15c';
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', path.classList.contains('sel') ? '5' : '2.6');
    path.setAttribute('opacity', path.classList.contains('rel-off') ? '0.08' : '0.84');
    path.classList.remove('reflow-enter');
    if (path.classList.contains('punteada')) path.setAttribute('stroke-dasharray', '9 7');
  });
  clone.querySelectorAll('#gRels > path.rel-hit').forEach(path => path.remove());
  const inline = make('style');
  inline.textContent = `.export-bg{display:block} #gGuides line,#gGuides circle{opacity:.24} #gMembers path{opacity:.22} #gNodes .concept{animation:none!important} #gRels path{vector-effect:non-scaling-stroke}`;
  clone.insertBefore(inline, clone.firstChild);

  const text = new XMLSerializer().serializeToString(clone);
  const image = new Image();
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text);
  await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; });
  return image;
}
function downloadExport(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
async function captureNetworkFrames(onFrame) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 760;
  const ctx = canvas.getContext('2d', { alpha: false });
  const fps = 12, frames = [];
  const draw = async () => {
    const image = await svgCaptureImage();
    ctx.fillStyle = '#0b0c0f'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (onFrame) await onFrame(canvas, frame);
    return frame;
  };
  const candidate = SYS.find(s => state[s]);
  frames.push(await draw());
  for (let i = 0; i < 8; i++) { await waitMs(1000 / fps); frames.push(await draw()); }
  if (candidate) {
    toggleSystem(candidate);
    const finding = document.getElementById('networkFinding');
    if (finding) { finding.style.setProperty('display', 'none', 'important'); finding.setAttribute('aria-hidden', 'true'); }
    for (let i = 0; i < 18; i++) { await waitMs(1000 / fps); frames.push(await draw()); }
    toggleSystem(candidate);
    if (finding) { finding.style.setProperty('display', 'none', 'important'); finding.setAttribute('aria-hidden', 'true'); }
    for (let i = 0; i < 8; i++) { await waitMs(1000 / fps); frames.push(await draw()); }
  }
  return { canvas, frames, fps };
}
async function exportNetworkVideo() {
  const button = document.getElementById('btnExportVideo');
  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) {
    exportStatus('Este navegador no admite video WebM.'); return;
  }
  button.disabled = true; exportStatus('Grabando reestructuración…');
  try {
    const fps = 12;
    let recorder;
    const chunks = [];
    let finished;
    await captureNetworkFrames((canvas) => {
      if (!recorder) {
        const stream = canvas.captureStream(fps);
        const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
        recorder = new MediaRecorder(stream, { mimeType: mime });
        recorder.ondataavailable = e => e.data.size && chunks.push(e.data);
        finished = new Promise(resolve => { recorder.onstop = resolve; });
        recorder.start();
      }
    });
    if (!recorder) throw new Error('No se pudo iniciar la grabación');
    recorder.stop(); await finished;
    downloadExport(new Blob(chunks, { type: 'video/webm' }), 'bogota-viva-red-reestructuracion.webm');
    exportStatus('Video WebM descargado.');
  } catch (error) { console.error(error); exportStatus('No se pudo exportar el video.'); }
  finally { button.disabled = false; }
}
async function loadGifEncoder() {
  if (window.GIF) return;
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js';
    script.onload = resolve; script.onerror = reject; document.head.appendChild(script);
  });
}
async function exportNetworkGif() {
  const button = document.getElementById('btnExportGif');
  button.disabled = true; exportStatus('Preparando GIF…');
  try {
    await loadGifEncoder();
    const { canvas, frames, fps } = await captureNetworkFrames();
    const gif = new GIF({ workers: 2, quality: 8, width: canvas.width, height: canvas.height, workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js' });
    frames.forEach(frame => { const frameCanvas = document.createElement('canvas'); frameCanvas.width = canvas.width; frameCanvas.height = canvas.height; frameCanvas.getContext('2d').putImageData(frame, 0, 0); gif.addFrame(frameCanvas, { delay: 1000 / fps, copy: true }); });
    gif.on('progress', p => exportStatus(`Generando GIF… ${Math.round(p * 100)}%`));
    gif.on('finished', blob => { downloadExport(blob, 'bogota-viva-red-reestructuracion.gif'); exportStatus('GIF descargado.'); button.disabled = false; });
    gif.render();
  } catch (error) { console.error(error); exportStatus('GIF no disponible; prueba Exportar video.'); button.disabled = false; }
}
function initNetworkExport() {
  const video = document.getElementById('btnExportVideo');
  const gif = document.getElementById('btnExportGif');
  if (video) video.addEventListener('click', exportNetworkVideo);
  if (gif) gif.addEventListener('click', exportNetworkGif);
}
function initPanZoom() {
  const stage = document.getElementById('stage');
  const svg = document.getElementById('svg');

  let dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0;
  let lastX = 0, lastY = 0, velocityX = 0, velocityY = 0, releaseFrame = 0;
  stage.addEventListener('pointerdown', e => {
    dragging = true;
    moved = false;
    sx = e.clientX; sy = e.clientY; ox = vb.x; oy = vb.y;
    lastX = e.clientX; lastY = e.clientY; velocityX = 0; velocityY = 0;
    cancelAnimationFrame(releaseFrame);
    // No capturamos el puntero todavía: así un clic sobre un nodo llega al SVG.
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    velocityX = e.clientX - lastX;
    velocityY = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    if (!moved && Math.hypot(dx, dy) < 5) return;
    if (!moved) {
      moved = true;
      stage.classList.add('panning');
      if (stage.setPointerCapture) stage.setPointerCapture(e.pointerId);
    }
    const rect = svg.getBoundingClientRect();
    vb.x = ox - (dx / rect.width) * vb.w;
    vb.y = oy - (dy / rect.height) * vb.h;
    applyVB();
  });
  const end = () => {
    const wasMoved = moved;
    dragging = false;
    moved = false;
    stage.classList.remove('panning');
    if (!wasMoved) return;
    const rect = svg.getBoundingClientRect();
    const momentumX = -(velocityX / Math.max(rect.width, 1)) * vb.w * 0.065;
    const momentumY = -(velocityY / Math.max(rect.height, 1)) * vb.h * 0.065;
    const releaseX = vb.x;
    const releaseY = vb.y;
    const start = performance.now();
    const duration = 960;
    /* Resorte amortiguado: aceleración suave, micro-overshoot y reposo estable. */
    const spring = t => 1 - Math.exp(-8.2 * t) * Math.cos(9 * t);
    const settle = now => {
      const t = Math.min(1, (now - start) / duration);
      const k = spring(t);
      vb.x = releaseX + momentumX * k;
      vb.y = releaseY + momentumY * k;
      applyVB();
      if (t < 1) releaseFrame = requestAnimationFrame(settle);
    };
    releaseFrame = requestAnimationFrame(settle);
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  // El menú contextual del navegador interrumpe la prueba de la red y tapa
  // los nodos; la interfaz usa clic izquierdo para el ciclo de interacción.
  stage.addEventListener('contextmenu', e => e.preventDefault());

  // Delegación de clic: mantiene las conexiones seleccionables aunque el trazo
  // visible sea muy fino o el navegador cambie el orden de pintado del SVG.
  svg.addEventListener('click', ev => {
    const target = ev.target && ev.target.closest ? ev.target.closest('path[data-rel]') : null;
    if (target && (target.classList.contains('rel') || target.classList.contains('rel-hit'))) {
      ev.stopPropagation();
      selectRelation(target.getAttribute('data-rel'), ev);
      return;
    }
    clearFocus();
    tip().classList.remove('show', 'pinned');
  }, true);

  stage.addEventListener('wheel', e => {
    e.preventDefault();
    zoomAt(e.deltaY > 0 ? 1.12 : 0.88, e.clientX, e.clientY);
  }, { passive: false });

  const zoomIn = document.getElementById('btnZoomIn');
  const zoomOut = document.getElementById('btnZoomOut');
  const zoomReset = document.getElementById('btnZoomReset');
  if (zoomIn) zoomIn.addEventListener('click', e => {
    e.stopPropagation();
    zoomAt(0.78);
  });
  if (zoomOut) zoomOut.addEventListener('click', e => {
    e.stopPropagation();
    zoomAt(1.28);
  });
  if (zoomReset) zoomReset.addEventListener('click', e => {
    e.stopPropagation();
    resetView();
  });
}

function initRelationFilters() {
  document.querySelectorAll('[data-relation-filter]').forEach(input => {
    const key = input.dataset.relationFilter;
    input.checked = relationFilters[key] !== false;
    input.addEventListener('change', () => {
      relationFilters[key] = input.checked;
      input.closest('.relation-filter')?.classList.toggle('off', !input.checked);
      render();
      updateAll();
    });
  });
}

// ---------------------------------------------------------------------
// 8. ARRANQUE
// ---------------------------------------------------------------------
let initialized = false;

document.addEventListener('DOMContentLoaded', () => {
  if (initialized) return;
  initialized = true;

  const findingCardAction = document.getElementById('findingCardAction');
  const findingCardDetails = document.getElementById('findingCardDetails');
  if (findingCardAction && findingCardDetails) {
    findingCardAction.addEventListener('click', e => {
      e.stopPropagation();
      const open = !findingCardDetails.hidden;
      findingCardDetails.hidden = open;
      findingCardAction.textContent = open ? 'Ver hallazgo completo' : 'Ocultar explicación';
    });
  }

  const closeInsight = document.getElementById('closeInsight');
  const insightPopup = document.getElementById('eseCIInsight');
  if (closeInsight && insightPopup) {
    closeInsight.addEventListener('click', () => insightPopup.classList.add('is-hidden'));
  }

  const findingPopup = document.getElementById('networkFinding');
  const findingPopupClose = document.getElementById('findingPopupClose');
  if (findingPopup && findingPopupClose) {
    findingPopup.style.setProperty('display', 'none', 'important');
    findingPopup.classList.remove('is-open');
    findingPopup.setAttribute('aria-hidden', 'true');
    findingPopupClose.addEventListener('click', event => {
      event.stopPropagation();
      findingPopup.classList.remove('is-open');
      findingPopup.style.setProperty('display', 'none', 'important');
      findingPopup.setAttribute('aria-hidden', 'true');
    });
  }

  const conventionsHost = document.getElementById('module03Conventions');
  const networkToolbar = document.querySelector('.net-card .net-toolbar');
  if (conventionsHost && networkToolbar) {
    const anchor = conventionsHost.children[1] || null;
    conventionsHost.insertBefore(networkToolbar, anchor);
  }

  // Evita que el navegador restaure un scroll interno antiguo del panel derecho;
  // el módulo debe abrir como M02, mostrando primero el hallazgo principal.
  const rightColumn = document.querySelector('.net-layout > .col:first-child');
  if (rightColumn) rightColumn.scrollTop = 0;
  buildModel();
  SYS.forEach(s => {
    const count = document.getElementById('m03-count-' + s);
    if (count) count.textContent = model.systems[s].concepts.length;
  });
  document.querySelectorAll('.m03-system-check').forEach(input => {
    input.addEventListener('change', () => {
      const s = input.dataset.sys;
      if (state[s] !== input.checked) toggleSystem(s);
    });
  });
  document.querySelectorAll('.m03-filter-action').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.rel;
      document.querySelectorAll('.relation-filter-input').forEach(input => {
        input.checked = key === 'all' || input.dataset.relationFilter === key;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      document.querySelectorAll('.m03-filter-action').forEach(b => b.classList.toggle('active', b === button));
    });
  });
  computeLayoutClean();

  // interruptores = los botones de escenario del módulo
  document.querySelectorAll('.scenario-btn[data-sys]').forEach(b =>
    b.addEventListener('click', () => toggleSystem(b.getAttribute('data-sys'))));
  updateSwitches();

  document.getElementById('btnReset').addEventListener('click', resetAll);
  const bf=document.getElementById('btnFit'); if(bf) bf.addEventListener('click', resetView);

  clearEvidence();
  initIntro();
  initQuoteModal();
  initNodeScenario();
  initPanZoom();
  initNetworkExport();
  initRelationFilters();
  applyVB();
  render();
  updateMetrics();

  // verificación de integridad de datos en consola
  const r = model.relations;
  console.log('Relaciones cargadas:', r.length,
    '| Sólidas:', r.filter(x => x.linea === 'Sólida').length,
    '| Punteadas:', r.filter(x => x.linea === 'Punteada').length,
    '| Soporte:', r.filter(x => x.tipo === 'Soporte').length,
    '| Resiliencia:', r.filter(x => x.tipo === 'Resiliencia').length,
    '| Conceptos:', Object.keys(model.concepts).length);
});

// Limpieza defensiva: ninguna relación o nodo inactivo puede quedar flotando
// aunque un render anterior o un navegador cacheado haya dejado descendientes SVG.
function purgeInactiveSvg() {
  const gRels = document.getElementById('gRels');
  const gNodes = document.getElementById('gNodes');
  if (gRels) {
    gRels.querySelectorAll('[data-rel]').forEach(node => {
      const rel = model.relations.find(r => String(r.id) === String(node.dataset.rel));
      if (!rel || !relationPassesFilters(rel) || !relActive(rel)) node.remove();
    });
  }
  if (gNodes) {
    gNodes.querySelectorAll('[data-id]').forEach(node => {
      const id = node.dataset.id;
      const concept = model.concepts[id];
      if (!concept || !state[concept.sys] || offNodes.has(id)) node.remove();
    });
  }
  ['gGuides','gMembers'].forEach(id => {
    const group = document.getElementById(id);
    if (group) group.querySelectorAll('[data-rel],[data-id]').forEach(node => node.remove());
  });
}
