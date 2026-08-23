/* =======================================================================
   RAPOT · MÓDULO 03 — Discurso vs Realidad
   Base de datos: Red_4_Estructuras_POT_CORREGIDA.xlsx (hoja RELACIONES)
   32 relaciones · 58 conceptos · 4 sistemas
   No se inventan relaciones ni se alteran frases o páginas.
   ======================================================================= */

// 98 relaciones: 68 sustentadas con frase textual del POT, 7 marcadas 'por
// verificar' por la propia tabla y 23 agregadas a pedido, pendientes de frase.
const POT_DATA = {
 "sistemas": {
  "EEP": {
   "nombre": "Estructura Ecológica Principal",
   "color": "#5cd6d1"
  },
  "EFC": {
   "nombre": "Estructura Funcional y del Cuidado",
   "color": "#ef9f54"
  },
  "ESECI": {
   "nombre": "Estructura Socioeconómica, Creativa y de Innovación",
   "color": "#fac47b"
  },
  "EIP": {
   "nombre": "Estructura Integradora de Patrimonios",
   "color": "#fb8d84"
  }
 },
 "nodos": [
  {
   "id": "EEP::RÍOS",
   "sys": "EEP",
   "label": "RÍOS",
   "icon": "fa-water",
   "x": 465.0,
   "y": 824.0,
   "r": 88.1,
   "deg": 5
  },
  {
   "id": "EEP::QUEBRADAS",
   "sys": "EEP",
   "label": "QUEBRADAS",
   "icon": "fa-water",
   "x": 661.0,
   "y": 581.0,
   "r": 39.5,
   "deg": 1
  },
  {
   "id": "EEP::HUMEDALES",
   "sys": "EEP",
   "label": "HUMEDALES",
   "icon": "fa-droplet",
   "x": 1022.0,
   "y": 591.0,
   "r": 132.9,
   "deg": 8
  },
  {
   "id": "EEP::COMPLEJOS DE PÁRAMOS",
   "sys": "EEP",
   "label": "COMPLEJOS DE PÁRAMOS",
   "icon": "fa-mountain",
   "x": 352.0,
   "y": 449.0,
   "r": 49.8,
   "deg": 2
  },
  {
   "id": "EEP::COBERTURAS VEGETALES",
   "sys": "EEP",
   "label": "COBERTURAS VEGETALES",
   "icon": "fa-leaf",
   "x": 509.0,
   "y": 297.0,
   "r": 49.8,
   "deg": 2
  },
  {
   "id": "EEP::ÁREAS DE RESILIENCIA CLIMÁTICA",
   "sys": "EEP",
   "label": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "icon": "fa-shield-heart",
   "x": 639.0,
   "y": 112.0,
   "r": 61.6,
   "deg": 3
  },
  {
   "id": "EEP::ÁREAS PROTEGIDAS",
   "sys": "EEP",
   "label": "ÁREAS PROTEGIDAS",
   "icon": "fa-shield-halved",
   "x": 771.0,
   "y": 421.0,
   "r": 61.6,
   "deg": 3
  },
  {
   "id": "EEP::RESERVAS FORESTALES",
   "sys": "EEP",
   "label": "RESERVAS FORESTALES",
   "icon": "fa-tree-city",
   "x": 1086.0,
   "y": 132.0,
   "r": 61.6,
   "deg": 3
  },
  {
   "id": "EFC::EQUIPAMIENTOS",
   "sys": "EFC",
   "label": "EQUIPAMIENTOS",
   "icon": "fa-school",
   "x": 1190.0,
   "y": 347.0,
   "r": 74.4,
   "deg": 4
  },
  {
   "id": "EFC::SERVICIOS SOCIALES",
   "sys": "EFC",
   "label": "SERVICIOS SOCIALES",
   "icon": "fa-people-roof",
   "x": 1429.0,
   "y": 104.0,
   "r": 49.8,
   "deg": 2
  },
  {
   "id": "EFC::VIVIENDA",
   "sys": "EFC",
   "label": "VIVIENDA",
   "icon": "fa-house",
   "x": 1450.0,
   "y": 783.0,
   "r": 88.1,
   "deg": 5
  },
  {
   "id": "EFC::CICLORUTAS",
   "sys": "EFC",
   "label": "CICLORUTAS",
   "icon": "fa-person-biking",
   "x": 1689.0,
   "y": 98.0,
   "r": 49.8,
   "deg": 2
  },
  {
   "id": "EFC::TRANSPORTE PÚBLICO",
   "sys": "EFC",
   "label": "TRANSPORTE PÚBLICO",
   "icon": "fa-bus",
   "x": 1686.0,
   "y": 539.0,
   "r": 102.4,
   "deg": 6
  },
  {
   "id": "EFC::RED VIAL",
   "sys": "EFC",
   "label": "RED VIAL",
   "icon": "fa-road",
   "x": 2022.0,
   "y": 306.0,
   "r": 74.4,
   "deg": 4
  },
  {
   "id": "EFC::CORREDORES VERDES",
   "sys": "EFC",
   "label": "CORREDORES VERDES",
   "icon": "fa-seedling",
   "x": 34.7,
   "y": 97.9,
   "r": 49.8,
   "deg": 2
  },
  {
   "id": "EFC::MANZANAS DEL CUIDADO",
   "sys": "EFC",
   "label": "MANZANAS DEL CUIDADO",
   "icon": "fa-building-shield",
   "x": 1485.0,
   "y": 445.0,
   "r": 88.1,
   "deg": 5
  },
  {
   "id": "EFC::PARQUES",
   "sys": "EFC",
   "label": "PARQUES",
   "icon": "fa-tree",
   "x": 1732.0,
   "y": 884.0,
   "r": 39.5,
   "deg": 1
  },
  {
   "id": "ESECI::DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sys": "ESECI",
   "label": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "icon": "fa-microchip",
   "x": 1244.0,
   "y": 1298.0,
   "r": 88.1,
   "deg": 5
  },
  {
   "id": "ESECI::SERVICIOS EMPRESARIALES",
   "sys": "ESECI",
   "label": "SERVICIOS EMPRESARIALES",
   "icon": "fa-briefcase",
   "x": 1055.0,
   "y": 918.0,
   "r": 132.9,
   "deg": 8
  },
  {
   "id": "ESECI::SISTEMA DE EDUCACIÓN",
   "sys": "ESECI",
   "label": "SISTEMA DE EDUCACIÓN",
   "icon": "fa-graduation-cap",
   "x": 992.0,
   "y": 1253.0,
   "r": 61.6,
   "deg": 3
  },
  {
   "id": "ESECI::CENTROS DE ABASTECIMIENTO",
   "sys": "ESECI",
   "label": "CENTROS DE ABASTECIMIENTO",
   "icon": "fa-warehouse",
   "x": 921.0,
   "y": 1601.0,
   "r": 39.5,
   "deg": 1
  },
  {
   "id": "ESECI::PLAZAS DE MERCADO",
   "sys": "ESECI",
   "label": "PLAZAS DE MERCADO",
   "icon": "fa-store",
   "x": 758.0,
   "y": 1173.0,
   "r": 61.6,
   "deg": 3
  },
  {
   "id": "ESECI::ZONAS INDUSTRIALES",
   "sys": "ESECI",
   "label": "ZONAS INDUSTRIALES",
   "icon": "fa-industry",
   "x": 679.0,
   "y": 1576.0,
   "r": 88.1,
   "deg": 5
  },
  {
   "id": "ESECI::PRODUCCIÓN ARTESANAL",
   "sys": "ESECI",
   "label": "PRODUCCIÓN ARTESANAL",
   "icon": "fa-hammer",
   "x": 486.0,
   "y": 1312.0,
   "r": 61.6,
   "deg": 3
  },
  {
   "id": "ESECI::ZONAS DE INTERÉS TURÍSTICO",
   "sys": "ESECI",
   "label": "ZONAS DE INTERÉS TURÍSTICO",
   "icon": "fa-camera",
   "x": 498.0,
   "y": 1054.0,
   "r": 49.8,
   "deg": 2
  },
  {
   "id": "ESECI::CENTROS FINANCIEROS",
   "sys": "ESECI",
   "label": "CENTROS FINANCIEROS",
   "icon": "fa-building-columns",
   "x": 727.0,
   "y": 873.0,
   "r": 39.5,
   "deg": 1
  },
  {
   "id": "EIP::PATRIMONIO INMATERIAL",
   "sys": "EIP",
   "label": "PATRIMONIO INMATERIAL",
   "icon": "fa-masks-theater",
   "x": 2017.0,
   "y": 991.0,
   "r": 61.6,
   "deg": 3
  },
  {
   "id": "EIP::PATRIMONIO ARQUEOLÓGICO",
   "sys": "EIP",
   "label": "PATRIMONIO ARQUEOLÓGICO",
   "icon": "fa-monument",
   "x": 1862.0,
   "y": 1430.0,
   "r": 39.5,
   "deg": 1
  },
  {
   "id": "EIP::PATRIMONIO NATURAL",
   "sys": "EIP",
   "label": "PATRIMONIO NATURAL",
   "icon": "fa-leaf",
   "x": 1442.0,
   "y": 1406.0,
   "r": 88.1,
   "deg": 5
  },
  {
   "id": "EIP::PATRIMONIO MATERIAL",
   "sys": "EIP",
   "label": "PATRIMONIO MATERIAL",
   "icon": "fa-landmark",
   "x": 1399.0,
   "y": 1026.0,
   "r": 88.1,
   "deg": 5
  },
  {
   "id": "EIP::COMUNIDADES",
   "sys": "EIP",
   "label": "COMUNIDADES",
   "icon": "fa-people-group",
   "x": 1684.0,
   "y": 1179.0,
   "r": 49.8,
   "deg": 2
  }
 ],
 "relaciones": [
  {
   "sO": "EEP",
   "cO": "QUEBRADAS",
   "sD": "EEP",
   "cD": "HUMEDALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 1",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EEP",
   "cD": "RÍOS",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 2",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "RÍOS",
   "sD": "EEP",
   "cD": "COMPLEJOS DE PÁRAMOS",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 3",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "sD": "EEP",
   "cD": "COBERTURAS VEGETALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 4",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EEP",
   "cD": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 5",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS PROTEGIDAS",
   "sD": "EEP",
   "cD": "HUMEDALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 6",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS PROTEGIDAS",
   "sD": "EEP",
   "cD": "RESERVAS FORESTALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 7",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "RESERVAS FORESTALES",
   "sD": "EEP",
   "cD": "HUMEDALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 8",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "EQUIPAMIENTOS",
   "sD": "EFC",
   "cD": "VIVIENDA",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 9",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "CICLORUTAS",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 10",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "TRANSPORTE PÚBLICO",
   "sD": "EFC",
   "cD": "VIVIENDA",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 11",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "RED VIAL",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 12",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "RED VIAL",
   "sD": "EFC",
   "cD": "EQUIPAMIENTOS",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 13",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "CORREDORES VERDES",
   "sD": "EFC",
   "cD": "CICLORUTAS",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 14",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "CORREDORES VERDES",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 15",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "EFC",
   "cD": "SERVICIOS SOCIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 16",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "EFC",
   "cD": "EQUIPAMIENTOS",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 17",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "EFC",
   "cD": "PARQUES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 18",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 19",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "ESECI",
   "cD": "SISTEMA DE EDUCACIÓN",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 20",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "PLAZAS DE MERCADO",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 21",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "ZONAS INDUSTRIALES",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 22",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "ZONAS INDUSTRIALES",
   "sD": "ESECI",
   "cD": "PRODUCCIÓN ARTESANAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 23",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "ZONAS DE INTERÉS TURÍSTICO",
   "sD": "ESECI",
   "cD": "PLAZAS DE MERCADO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 24",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "CENTROS FINANCIEROS",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 25",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO ARQUEOLÓGICO",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 26",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO NATURAL",
   "sD": "EIP",
   "cD": "PATRIMONIO INMATERIAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 27",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 28",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "EIP",
   "cD": "PATRIMONIO INMATERIAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 29",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "RESERVAS FORESTALES",
   "sD": "EEP",
   "cD": "RÍOS",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 30",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "COBERTURAS VEGETALES",
   "sD": "EEP",
   "cD": "ÁREAS PROTEGIDAS",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 31",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "VIVIENDA",
   "sD": "EFC",
   "cD": "SERVICIOS SOCIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 33",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "RED VIAL",
   "sD": "EFC",
   "cD": "VIVIENDA",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 34",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "ESECI",
   "cD": "ZONAS INDUSTRIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 35",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "CENTROS DE ABASTECIMIENTO",
   "sD": "ESECI",
   "cD": "PRODUCCIÓN ARTESANAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 36",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "SISTEMA DE EDUCACIÓN",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 37",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "SISTEMA DE EDUCACIÓN",
   "sD": "ESECI",
   "cD": "PRODUCCIÓN ARTESANAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 38",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EFC",
   "cD": "RED VIAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 39",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 40",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "EQUIPAMIENTOS",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 41",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "VIVIENDA",
   "sD": "ESECI",
   "cD": "ZONAS INDUSTRIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 42",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "TRANSPORTE PÚBLICO",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 43",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "MANZANAS DEL CUIDADO",
   "sD": "ESECI",
   "cD": "SERVICIOS EMPRESARIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 44",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "ESECI",
   "cD": "ZONAS DE INTERÉS TURÍSTICO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 45",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "ESECI",
   "cD": "PLAZAS DE MERCADO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 46",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO MATERIAL",
   "sD": "EIP",
   "cD": "COMUNIDADES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 47",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "PATRIMONIO INMATERIAL",
   "sD": "EIP",
   "cD": "COMUNIDADES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 48",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "HUMEDALES",
   "sD": "EFC",
   "cD": "MANZANAS DEL CUIDADO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 49",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "RÍOS",
   "sD": "EFC",
   "cD": "TRANSPORTE PÚBLICO",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 50",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "COMPLEJOS DE PÁRAMOS",
   "sD": "ESECI",
   "cD": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 51",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "ÁREAS DE RESILIENCIA CLIMÁTICA",
   "sD": "ESECI",
   "cD": "ZONAS INDUSTRIALES",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 52",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "DISTRITO CENTRO TECNOLÓGICO E INNOVACIÓN",
   "sD": "EIP",
   "cD": "PATRIMONIO NATURAL",
   "type": "directa",
   "relacion": "Soporte",
   "frase": "Relación 53",
   "pag": "1",
   "porVerificar": false,
   "sinFrase": false
  }
 ]
};
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
