/* =======================================================================
   RAPOT · MÓDULO 07 — Simulador de las 4 Estructuras del POT
   Base de datos: Red_4_Estructuras_POT_CORREGIDA.xlsx (hoja RELACIONES)
   32 relaciones · 58 conceptos · 4 sistemas
   No se inventan relaciones ni se alteran frases o páginas.
   ======================================================================= */

// GENERADO de Red_relaciones_POT_CORREGIDA_FRASES_EXACTAS.xlsx (45 internas)
// + tabla_relaciones_POT_frases_exactas.xlsx (31), sin duplicados = 67 relaciones.
// Frases, páginas y secciones son literales de los Excel. Posiciones precalculadas
// con layout de fuerzas por estructura, optimizado para minimizar cruces de líneas.
const POT_DATA = {
 "sistemas": {
  "EEP": {
   "nombre": "Estructura Ecológica Principal",
   "color": "#22b88a"
  },
  "EFC": {
   "nombre": "Estructura Funcional y del Cuidado",
   "color": "#3b82f6"
  },
  "ESECI": {
   "nombre": "Estructura Socioeconómica, Creativa y de Innovación",
   "color": "#d9a441"
  },
  "EIP": {
   "nombre": "Estructura Integradora de Patrimonios",
   "color": "#a855f7"
  }
 },
 "nodos": [
  {
   "id": "EEP::Bosques urbanos",
   "sys": "EEP",
   "label": "Bosques urbanos",
   "icon": "fa-tree-city",
   "x": -609.8,
   "y": -579.7,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EEP::Cerros Orientales",
   "sys": "EEP",
   "label": "Cerros Orientales",
   "icon": "fa-mountain",
   "x": -576.8,
   "y": -108.0,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EEP::Coberturas vegetales",
   "sys": "EEP",
   "label": "Coberturas vegetales",
   "icon": "fa-seedling",
   "x": -505.4,
   "y": -548.6,
   "r": 28.1,
   "deg": 5
  },
  {
   "id": "EEP::Complejos de páramos",
   "sys": "EEP",
   "label": "Complejos de páramos",
   "icon": "fa-cloud",
   "x": -255.9,
   "y": -631.7,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EEP::Conservación ambiental",
   "sys": "EEP",
   "label": "Conservación ambiental",
   "icon": "fa-shield-heart",
   "x": 73.6,
   "y": -368.1,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EEP::Corredores montañosos",
   "sys": "EEP",
   "label": "Corredores montañosos",
   "icon": "fa-mountain-sun",
   "x": -158.6,
   "y": -580.4,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EEP::Humedales",
   "sys": "EEP",
   "label": "Humedales",
   "icon": "fa-droplet",
   "x": -488.4,
   "y": -239.4,
   "r": 36.0,
   "deg": 8
  },
  {
   "id": "EEP::Paisajes sostenibles",
   "sys": "EEP",
   "label": "Paisajes sostenibles",
   "icon": "fa-image",
   "x": -361.4,
   "y": -643.6,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EEP::Parques de borde",
   "sys": "EEP",
   "label": "Parques de borde",
   "icon": "fa-leaf",
   "x": -468.7,
   "y": -664.0,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EEP::Parques ecológicos de montaña",
   "sys": "EEP",
   "label": "Parques ecológicos de montaña",
   "icon": "fa-mountain",
   "x": -649.5,
   "y": -458.3,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EEP::Quebradas",
   "sys": "EEP",
   "label": "Quebradas",
   "icon": "fa-tint",
   "x": -677.3,
   "y": -142.0,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EEP::Reservas forestales",
   "sys": "EEP",
   "label": "Reservas forestales",
   "icon": "fa-tree",
   "x": -676.9,
   "y": -248.5,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EEP::Ríos",
   "sys": "EEP",
   "label": "Ríos",
   "icon": "fa-water",
   "x": -322.1,
   "y": -472.1,
   "r": 22.9,
   "deg": 3
  },
  {
   "id": "EEP::Áreas de resiliencia climática",
   "sys": "EEP",
   "label": "Áreas de resiliencia climática",
   "icon": "fa-temperature-half",
   "x": -506.0,
   "y": -404.0,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EEP::Áreas protegidas",
   "sys": "EEP",
   "label": "Áreas protegidas",
   "icon": "fa-shield-halved",
   "x": -644.9,
   "y": -334.6,
   "r": 22.9,
   "deg": 3
  },
  {
   "id": "EFC::Ciclorutas",
   "sys": "EFC",
   "label": "Ciclorutas",
   "icon": "fa-bicycle",
   "x": -285.5,
   "y": 361.1,
   "r": 25.5,
   "deg": 4
  },
  {
   "id": "EFC::Corredores verdes",
   "sys": "EFC",
   "label": "Corredores verdes",
   "icon": "fa-road",
   "x": -448.6,
   "y": 481.8,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EFC::Equipamientos",
   "sys": "EFC",
   "label": "Equipamientos",
   "icon": "fa-building-columns",
   "x": 2.3,
   "y": 420.3,
   "r": 33.4,
   "deg": 7
  },
  {
   "id": "EFC::Espacio público",
   "sys": "EFC",
   "label": "Espacio público",
   "icon": "fa-umbrella-beach",
   "x": -575.3,
   "y": 72.0,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EFC::Manzanas del Cuidado",
   "sys": "EFC",
   "label": "Manzanas del Cuidado",
   "icon": "fa-hand-holding-heart",
   "x": -227.7,
   "y": 538.0,
   "r": 25.5,
   "deg": 4
  },
  {
   "id": "EFC::Parques",
   "sys": "EFC",
   "label": "Parques",
   "icon": "fa-tree",
   "x": -436.9,
   "y": 655.6,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EFC::Red vial",
   "sys": "EFC",
   "label": "Red vial",
   "icon": "fa-road-bridge",
   "x": -133.1,
   "y": 579.9,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EFC::Servicios de cuidado",
   "sys": "EFC",
   "label": "Servicios de cuidado",
   "icon": "fa-heart",
   "x": -51.9,
   "y": 664.0,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "EFC::Servicios públicos",
   "sys": "EFC",
   "label": "Servicios públicos",
   "icon": "fa-plug",
   "x": 128.8,
   "y": 170.1,
   "r": 30.8,
   "deg": 6
  },
  {
   "id": "EFC::Servicios sociales",
   "sys": "EFC",
   "label": "Servicios sociales",
   "icon": "fa-people-group",
   "x": -205.6,
   "y": 654.8,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EFC::Transporte público",
   "sys": "EFC",
   "label": "Transporte público",
   "icon": "fa-bus",
   "x": -217.8,
   "y": 422.4,
   "r": 28.1,
   "deg": 5
  },
  {
   "id": "EFC::Vivienda",
   "sys": "EFC",
   "label": "Vivienda",
   "icon": "fa-house",
   "x": -52.9,
   "y": 181.6,
   "r": 36.0,
   "deg": 8
  },
  {
   "id": "ESECI::Actividades económicas",
   "sys": "ESECI",
   "label": "Actividades económicas",
   "icon": "fa-chart-line",
   "x": 83.3,
   "y": 32.7,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "ESECI::Centros de abastecimiento",
   "sys": "ESECI",
   "label": "Centros de abastecimiento",
   "icon": "fa-truck",
   "x": 639.4,
   "y": -400.5,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "ESECI::Centros financieros",
   "sys": "ESECI",
   "label": "Centros financieros",
   "icon": "fa-building-columns",
   "x": 509.3,
   "y": -248.4,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "ESECI::Corazones productivos",
   "sys": "ESECI",
   "label": "Corazones productivos",
   "icon": "fa-heart-pulse",
   "x": -0.3,
   "y": -72.7,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "ESECI::Distrito Centro Tecnológico e Innovación",
   "sys": "ESECI",
   "label": "Distrito Centro Tecnológico e Innovación",
   "icon": "fa-microchip",
   "x": 292.3,
   "y": 5.8,
   "r": 25.5,
   "deg": 4
  },
  {
   "id": "ESECI::Economía",
   "sys": "ESECI",
   "label": "Economía",
   "icon": "fa-coins",
   "x": 180.5,
   "y": -115.1,
   "r": 22.9,
   "deg": 3
  },
  {
   "id": "ESECI::Empleo",
   "sys": "ESECI",
   "label": "Empleo",
   "icon": "fa-briefcase",
   "x": -29.1,
   "y": 289.9,
   "r": 30.8,
   "deg": 6
  },
  {
   "id": "ESECI::Plazas de mercado",
   "sys": "ESECI",
   "label": "Plazas de mercado",
   "icon": "fa-store",
   "x": 613.7,
   "y": -187.7,
   "r": 22.9,
   "deg": 3
  },
  {
   "id": "ESECI::Producción artesanal",
   "sys": "ESECI",
   "label": "Producción artesanal",
   "icon": "fa-gem",
   "x": 594.2,
   "y": 152.9,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "ESECI::Producción de alimentos",
   "sys": "ESECI",
   "label": "Producción de alimentos",
   "icon": "fa-wheat-awn",
   "x": -155.1,
   "y": -323.4,
   "r": 17.6,
   "deg": 1
  },
  {
   "id": "ESECI::Servicios empresariales",
   "sys": "ESECI",
   "label": "Servicios empresariales",
   "icon": "fa-handshake",
   "x": 372.5,
   "y": 35.7,
   "r": 28.1,
   "deg": 5
  },
  {
   "id": "ESECI::Sistema de educación",
   "sys": "ESECI",
   "label": "Sistema de educación",
   "icon": "fa-graduation-cap",
   "x": 248.0,
   "y": 146.0,
   "r": 22.9,
   "deg": 3
  },
  {
   "id": "ESECI::Zonas de interés turístico",
   "sys": "ESECI",
   "label": "Zonas de interés turístico",
   "icon": "fa-camera",
   "x": 672.3,
   "y": -3.2,
   "r": 22.9,
   "deg": 3
  },
  {
   "id": "ESECI::Zonas industriales",
   "sys": "ESECI",
   "label": "Zonas industriales",
   "icon": "fa-industry",
   "x": 407.9,
   "y": 131.2,
   "r": 28.1,
   "deg": 5
  },
  {
   "id": "EIP::Patrimonio arqueológico",
   "sys": "EIP",
   "label": "Patrimonio arqueológico",
   "icon": "fa-scroll",
   "x": 616.4,
   "y": 544.7,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EIP::Patrimonio cultural",
   "sys": "EIP",
   "label": "Patrimonio cultural",
   "icon": "fa-landmark",
   "x": 485.2,
   "y": -18.3,
   "r": 20.2,
   "deg": 2
  },
  {
   "id": "EIP::Patrimonio inmaterial",
   "sys": "EIP",
   "label": "Patrimonio inmaterial",
   "icon": "fa-masks-theater",
   "x": 578.0,
   "y": 420.5,
   "r": 25.5,
   "deg": 4
  },
  {
   "id": "EIP::Patrimonio material",
   "sys": "EIP",
   "label": "Patrimonio material",
   "icon": "fa-monument",
   "x": 677.3,
   "y": 476.9,
   "r": 22.9,
   "deg": 3
  },
  {
   "id": "EIP::Patrimonio natural",
   "sys": "EIP",
   "label": "Patrimonio natural",
   "icon": "fa-mountain-sun",
   "x": 670.9,
   "y": 324.3,
   "r": 25.5,
   "deg": 4
  },
  {
   "id": "EIP::Sistema de sitios sagrados",
   "sys": "EIP",
   "label": "Sistema de sitios sagrados",
   "icon": "fa-place-of-worship",
   "x": 491.2,
   "y": 622.1,
   "r": 17.6,
   "deg": 1
  }
 ],
 "relaciones": [
  {
   "sO": "EEP",
   "cO": "Corredores montañosos",
   "sD": "EEP",
   "cD": "Ríos",
   "sentido": "Corredores montañosos → Ríos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7",
   "frase": "corredores montañosos … ríos y humedales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 0
  },
  {
   "sO": "EEP",
   "cO": "Quebradas",
   "sD": "EEP",
   "cD": "Humedales",
   "sentido": "Quebradas → Humedales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 42 / 62",
   "frase": "ríos y quebradas … humedales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 1
  },
  {
   "sO": "EEP",
   "cO": "Cerros Orientales",
   "sD": "EEP",
   "cD": "Humedales",
   "sentido": "Cerros Orientales → Humedales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7",
   "frase": "cerros orientales … ríos y humedales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 2
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EEP",
   "cD": "Ríos",
   "sentido": "Humedales → Ríos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 42 / 62",
   "frase": "ríos y quebradas … humedales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 3
  },
  {
   "sO": "EEP",
   "cO": "Ríos",
   "sD": "EEP",
   "cD": "Complejos de páramos",
   "sentido": "Ríos → Complejos de páramos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7",
   "frase": "complejos de páramos … ríos y humedales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 4
  },
  {
   "sO": "EEP",
   "cO": "Bosques urbanos",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "sentido": "Bosques urbanos → Coberturas vegetales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "73",
   "seccion": "Art. 74",
   "frase": "cobertura vegetal … flora propia",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 5
  },
  {
   "sO": "EEP",
   "cO": "Áreas de resiliencia climática",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "sentido": "Áreas de resiliencia climática → Coberturas vegetales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "72",
   "seccion": "Art. 42",
   "frase": "territorio resiliente … cambio climático",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 6
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EEP",
   "cD": "Áreas de resiliencia climática",
   "sentido": "Humedales → Áreas de resiliencia climática",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 42",
   "frase": "amortiguación de los impactos ambientales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 7
  },
  {
   "sO": "EEP",
   "cO": "Áreas protegidas",
   "sD": "EEP",
   "cD": "Humedales",
   "sentido": "Áreas protegidas → Humedales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "71",
   "seccion": "Art. 41 / 51",
   "frase": "Reservas Distritales de Humedal",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 8
  },
  {
   "sO": "EEP",
   "cO": "Áreas protegidas",
   "sD": "EEP",
   "cD": "Parques ecológicos de montaña",
   "sentido": "Áreas protegidas → Parques ecológicos de montaña",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "71",
   "seccion": "Art. 51 / 54",
   "frase": "Parques Distritales Ecológicos de Montaña",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 9
  },
  {
   "sO": "EEP",
   "cO": "Áreas protegidas",
   "sD": "EEP",
   "cD": "Reservas forestales",
   "sentido": "Áreas protegidas → Reservas forestales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "71",
   "seccion": "Art. 41 / 45 / 48",
   "frase": "Reserva Forestal Protectora … Regional",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 10
  },
  {
   "sO": "EEP",
   "cO": "Reservas forestales",
   "sD": "EEP",
   "cD": "Humedales",
   "sentido": "Reservas forestales → Humedales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "72",
   "seccion": "Art. 42",
   "frase": "conectividad y complementariedad",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 11
  },
  {
   "sO": "EEP",
   "cO": "Parques ecológicos de montaña",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "sentido": "Parques ecológicos de montaña → Coberturas vegetales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 54",
   "frase": "restaurar y preservar … especies nativas",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 12
  },
  {
   "sO": "EEP",
   "cO": "Coberturas vegetales",
   "sD": "EEP",
   "cD": "Parques de borde",
   "sentido": "Coberturas vegetales → Parques de borde",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "136",
   "seccion": "Art. 121",
   "frase": "coberturas vegetales … parques de borde",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 13
  },
  {
   "sO": "EEP",
   "cO": "Coberturas vegetales",
   "sD": "EEP",
   "cD": "Paisajes sostenibles",
   "sentido": "Coberturas vegetales → Paisajes sostenibles",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 52 / 74",
   "frase": "funcionalidad ecosistémica … conectividad",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 14
  },
  {
   "sO": "EEP",
   "cO": "Complejos de páramos",
   "sD": "EEP",
   "cD": "Paisajes sostenibles",
   "sentido": "Complejos de páramos → Paisajes sostenibles",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7 / 52",
   "frase": "complejos de páramos … paisajes",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 15
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Servicios de cuidado",
   "sentido": "Equipamientos → Servicios de cuidado",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "117–118",
   "seccion": "Art. 94–95",
   "frase": "equipamientos y servicios de cuidado",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 16
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Servicios sociales",
   "sentido": "Equipamientos → Servicios sociales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "117–118",
   "seccion": "Art. 94–95",
   "frase": "equipamientos y servicios sociales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 17
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Vivienda",
   "sentido": "Equipamientos → Vivienda",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 94 / 95",
   "frase": "equipamientos … soluciones habitacionales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 18
  },
  {
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "EFC",
   "cD": "Vivienda",
   "sentido": "Servicios públicos → Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "179",
   "seccion": "Art. 179",
   "frase": "servicio público … actividades en la ciudad",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 19
  },
  {
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "EFC",
   "cD": "Vivienda",
   "sentido": "Ciclorutas → Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 88",
   "frase": "accesibilidad … conectividad",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 20
  },
  {
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "EFC",
   "cD": "Transporte público",
   "sentido": "—",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Resiliencia",
   "pag": "117 / 158–159",
   "seccion": "Art. 88 / 158–159",
   "frase": "cicloinfraestructura … corredores verdes",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 21
  },
  {
   "sO": "EFC",
   "cO": "Transporte público",
   "sD": "EFC",
   "cD": "Vivienda",
   "sentido": "Transporte público → Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 88",
   "frase": "accesibilidad … conectividad",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 22
  },
  {
   "sO": "EFC",
   "cO": "Red vial",
   "sD": "EFC",
   "cD": "Transporte público",
   "sentido": "Red vial → Transporte público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "158–159",
   "seccion": "Art. 158–159",
   "frase": "malla arterial … transporte público",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 23
  },
  {
   "sO": "EFC",
   "cO": "Red vial",
   "sD": "EFC",
   "cD": "Equipamientos",
   "sentido": "Red vial → Equipamientos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 88 / 95",
   "frase": "accesibilidad … equipamientos",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 24
  },
  {
   "sO": "EFC",
   "cO": "Corredores verdes",
   "sD": "EFC",
   "cD": "Ciclorutas",
   "sentido": "Corredores verdes → Ciclorutas",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Política de movilidad",
   "frase": "corredores verdes … cicloinfraestructura",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 25
  },
  {
   "sO": "EFC",
   "cO": "Corredores verdes",
   "sD": "EFC",
   "cD": "Transporte público",
   "sentido": "Corredores verdes → Transporte público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "158–159",
   "seccion": "Art. 158–159",
   "frase": "corredores verdes de transporte público",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 26
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Servicios sociales",
   "sentido": "Manzanas del Cuidado → Servicios sociales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117–118",
   "seccion": "Art. 94–95",
   "frase": "manzanas del cuidado … servicios sociales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 27
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Equipamientos",
   "sentido": "Manzanas del Cuidado → Equipamientos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117–118",
   "seccion": "Art. 94–95",
   "frase": "manzanas del cuidado … equipamientos",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 28
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Parques",
   "sentido": "Manzanas del Cuidado → Parques",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 94",
   "frase": "jardines infantiles, colegios, parques",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 29
  },
  {
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "sentido": "Distrito Centro Tecnológico e Innovación → Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Eje de servicios empresariales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 30
  },
  {
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "ESECI",
   "cD": "Sistema de educación",
   "sentido": "Distrito Centro Tecnológico e Innovación → Sistema de educación",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100–101",
   "frase": "formación del talento humano",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 31
  },
  {
   "sO": "ESECI",
   "cO": "Centros de abastecimiento",
   "sD": "ESECI",
   "cD": "Plazas de mercado",
   "sentido": "Centros de abastecimiento → Plazas de mercado",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100–101",
   "frase": "Centros de Abasto Mayorista … Plazas de Mercado",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 32
  },
  {
   "sO": "ESECI",
   "cO": "Plazas de mercado",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "sentido": "Plazas de mercado → Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Plazas de Mercado … infraestructuras",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 33
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "sentido": "Zonas industriales → Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Eje de servicios empresariales … zonas industriales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 34
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "ESECI",
   "cD": "Sistema de educación",
   "sentido": "Zonas industriales → Sistema de educación",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100–101",
   "frase": "formación del talento humano … empresas",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 35
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "ESECI",
   "cD": "Producción artesanal",
   "sentido": "Zonas industriales → Producción artesanal",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100–101",
   "frase": "producción tradicional … industrias creativas",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 36
  },
  {
   "sO": "ESECI",
   "cO": "Zonas de interés turístico",
   "sD": "ESECI",
   "cD": "Plazas de mercado",
   "sentido": "Zonas de interés turístico → Plazas de mercado",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Zonas de Interés Turístico … Plazas de Mercado",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 37
  },
  {
   "sO": "ESECI",
   "cO": "Centros financieros",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "sentido": "Centros financieros → Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100",
   "frase": "centros financieros y de servicios empresariales",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 38
  },
  {
   "sO": "EIP",
   "cO": "Sistema de sitios sagrados",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "sentido": "Sistema de sitios sagrados → Patrimonio inmaterial",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "patrimonio cultural inmaterial … comunidades",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 39
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio arqueológico",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "sentido": "Patrimonio arqueológico → Patrimonio natural",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "Patrimonio Natural … Patrimonio Arqueológico",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 40
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio arqueológico",
   "sD": "EIP",
   "cD": "Patrimonio material",
   "sentido": "Patrimonio arqueológico → Patrimonio material",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "Patrimonio Cultural material … Patrimonio Arqueológico",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 41
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio natural",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "sentido": "Patrimonio natural → Patrimonio inmaterial",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "patrimonio cultural material, inmaterial y natural",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 42
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio material",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "sentido": "Patrimonio material → Patrimonio natural",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "integra … material, inmaterial y natural",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 43
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio material",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "sentido": "Patrimonio material → Patrimonio inmaterial",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "patrimonio cultural material, inmaterial y natural",
   "clase": "Interna",
   "fuente": "Excel 1",
   "id": 44
  },
  {
   "sO": "EFC",
   "cO": "Transporte público",
   "sD": "ESECI",
   "cD": "Empleo",
   "sentido": "Transporte público → Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "164",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Los tiempos de desplazamiento son el resultado de la eficiencia y calidad de los sistemas de transporte masivo y de sus modos y estructuración. Un buen sistema de transporte se nota en menores tiempos de viaje que suplen las necesidades de desplazamiento de la ciudadanía y facilitan la conexión entre las personas y el sector productivo.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 45
  },
  {
   "sO": "EFC",
   "cO": "Vivienda",
   "sD": "ESECI",
   "cD": "Empleo",
   "sentido": "Vivienda → Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“De esta manera, el Plan Maestro de Hábitat y Servicios Públicos se convierte en una herramienta eficaz para concretar la visión de mixtura, al acercar la vivienda a los grandes centros de productividad y, por consiguiente, mejorar las condiciones de acceso al empleo, consolidando así tejidos económicos continuos y complementarios entre el gran corazón productivo de escala urbana y las actividades económicas de soporte a la vida.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 46
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Empleo",
   "sentido": "Equipamientos → Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Esos equipamientos —que están pensados para ofrecer, de manera híbrida, la mayor cantidad de servicios sociales posibles— tienen un potencial de ser, en sí mismos, fuentes de generación de empleo de proximidad y de fomentar dinámicas económicas complementarias en sus zonas de influencia.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 47
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "ESECI",
   "cD": "Empleo",
   "sentido": "Manzanas del Cuidado → Empleo",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "118",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "frase": "“El sistema atiende tres tipos de poblaciones: a las personas cuidadoras, ofreciéndoles servicios de educación, respiro, formación y capitalización para el trabajo y el emprendimiento, y otras formas de generación de ingresos, con los que les devolvemos las oportunidades que han sacrificado por las cargas de cuidado.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 48
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "sentido": "Equipamientos → Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "165",
   "seccion": "Instrumentos del ordenamiento territorial que impactan la productividad y el empleo",
   "frase": "“Equipamiento como detonante de dinámicas económicas”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 49
  },
  {
   "sO": "EFC",
   "cO": "Vivienda",
   "sD": "ESECI",
   "cD": "Economía",
   "sentido": "Vivienda → Economía",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El Plan Maestro de Hábitat tiene la capacidad de robustecer las economías de proximidad, no solamente al propiciar la mixtura de usos del suelo en los proyectos de vivienda y en los instrumentos de los diferentes planes parciales, sino combinando sus usos al interior de las mismas edificaciones.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 50
  },
  {
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "ESECI",
   "cD": "Zonas industriales",
   "sentido": "Servicios públicos → Zonas industriales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 51
  },
  {
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "ESECI",
   "cD": "Distrito Centro Tecnológico e Innovación",
   "sentido": "Servicios públicos → Distrito Centro Tecnológico e Innovación",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 52
  },
  {
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "ESECI",
   "cD": "Empleo",
   "sentido": "Ciclorutas → Empleo",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Los cables eléctricos, rutas circulares y cicloinfraestructura permite a su vez interconectividad de proximidad dentro de las upl y conexión con los corredores de alta demanda, sean de metro o de TransMilenio. Esto mejorará significativamente la calidad de vida y la productividad de la población, que hará uso de estas infraestructuras; también, consolidará las dinámicas de aglomeración económica que concentran el tejido empresarial y, con ello, las fuentes de generación de empleo en el centro ampliado, pero también en las nuevas zonas más periféricas, mejor servidas y conectadas gracias a la red multimodal de transporte.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 53
  },
  {
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EFC",
   "cD": "Vivienda",
   "sentido": "Actividades económicas → Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El programa busca promover el dinamismo, la reactivación económica y la creación de empleos. Se apuesta por el impulso a proyectos que generen actividades económicas asociadas al emprendimiento, la creatividad, la innovación y la cultura, que se complementa con las áreas residenciales donde se interactúa a partir del sistema de movilidad.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 54
  },
  {
   "sO": "ESECI",
   "cO": "Corazones productivos",
   "sD": "EFC",
   "cD": "Vivienda",
   "sentido": "Corazones productivos → Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El nuevo modelo de ordenamiento del territorio a partir de la mixtura y la complementariedad que plantea el pot busca revertir esta tendencia promoviendo las áreas receptoras de actividad económica, las áreas de actividad receptoras de vivienda de interés social en cercanía de las aglomeraciones y el ecosistema productivo y la mixtura de usos en las áreas de proximidad (antiguas zonas de uso residencial neto).”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 55
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "sentido": "Zonas industriales → Servicios públicos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El Plan Maestro de Hábitat y Servicios Públicos debe garantizar las condiciones de prestación de los servicios públicos de las diferentes actividades económicas.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 56
  },
  {
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "sentido": "Distrito Centro Tecnológico e Innovación → Servicios públicos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 57
  },
  {
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "sentido": "Actividades económicas → Servicios públicos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El Plan Maestro de Hábitat y Servicios Públicos debe garantizar las condiciones de prestación de los servicios públicos de las diferentes actividades económicas.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 58
  },
  {
   "sO": "ESECI",
   "cO": "Sistema de educación",
   "sD": "ESECI",
   "cD": "Empleo",
   "sentido": "Sistema de educación → Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "30",
   "seccion": "Presentación del POT",
   "frase": "“La inversión y ejecución sostenida del pot, el pmss y la inversión en esa educación con calidad y pertinencia, desde la básica hasta la superior, lograrán en conjunto, en la próxima década, el mayor crecimiento en productividad, empleabilidad de calidad y competitividad que haya tenido Bogotá.”",
   "clase": "Intrasistema",
   "fuente": "Excel 2",
   "id": 59
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio cultural",
   "sD": "ESECI",
   "cD": "Zonas de interés turístico",
   "sentido": "Patrimonio cultural → Zonas de interés turístico",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "31",
   "seccion": "Presentación del POT",
   "frase": "“Por eso promovemos la ciudad como destino turístico inteligente, sostenible, de salud y de negocios que reconozca el patrimonio local, las dinámicas comunitarias, los sistemas cooperativos de producción sostenible como huertas productivas, bancos de semillas nativas y plantas de uso medicinal, entre otros.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 60
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio natural",
   "sD": "ESECI",
   "cD": "Zonas de interés turístico",
   "sentido": "Patrimonio natural → Zonas de interés turístico",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "31",
   "seccion": "Presentación del POT",
   "frase": "“En la ruralidad es urgente mejorar las condiciones habitacionales, desde los componentes de servicios públicos domiciliarios, accesibilidad y movilidad, con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 61
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio inmaterial",
   "sD": "ESECI",
   "cD": "Producción artesanal",
   "sentido": "Patrimonio inmaterial → Producción artesanal",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "200",
   "seccion": "Los reconocimientos y el plan para los patrimonios vitales",
   "frase": "“Esta producción artesanal corresponde entonces a las actividades creativas de producción de objetos, realizadas con predominio manual y auxiliadas en algunos casos con maquinarias simples, obteniendo un resultado final individualizado, determinado por los patrones culturales, el medio ambiente y su desarrollo histórico.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 62
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio cultural",
   "sD": "ESECI",
   "cD": "Economía",
   "sentido": "Patrimonio cultural → Economía",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "204",
   "seccion": "Los reconocimientos y el plan para los patrimonios vitales",
   "frase": "“Esta oferta y este movimiento económico y cultural hacen parte de una de las iniciativas primordiales que fija el pot para que la cultura, en ciertos barrios o sectores de Bogotá, se convierta en un polo de desarrollo económico y social: los Distritos Creativos.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 63
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EFC",
   "cD": "Espacio público",
   "sentido": "Humedales → Espacio público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "92",
   "seccion": "Transformaciones urbanas",
   "frase": "“Se debatió si podíamos considerar espacio público los elementos de nuestra Estructura Ecológica Principal (eep) adecuando humedales, bordes de ríos y quebradas, para el disfrute ciudadano.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 64
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "ESECI",
   "cD": "Producción de alimentos",
   "sentido": "Humedales → Producción de alimentos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "196",
   "seccion": "Nuestro territorio y nuestra identidad",
   "frase": "“Las huertas son entonces parte de un valor presente interesado en restablecer vínculos entre los ciclos de producción de alimentos y consumo en ámbitos domésticos. La existencia de estos lugares reconcilia distintas maneras de habitar la ciudad, de conocimientos y prácticas asociados a la preservación de especies y semillas nativas, la siembra, al manejo responsable del agua y de la comprensión del clima.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 65
  },
  {
   "sO": "EEP",
   "cO": "Conservación ambiental",
   "sD": "ESECI",
   "cD": "Economía",
   "sentido": "Conservación ambiental → Economía",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "31",
   "seccion": "Presentación del POT",
   "frase": "“En la ruralidad es urgente mejorar las condiciones habitacionales, desde los componentes de servicios públicos domiciliarios, accesibilidad y movilidad, con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”",
   "clase": "Intersistema",
   "fuente": "Excel 2",
   "id": 66
  }
 ],
 "vb": [
  -727,
  -714,
  1455,
  1446
 ]
};

const SYS = ['EEP', 'EFC', 'EIP', 'ESECI'];

// Estado del simulador: true = sistema activo
const state = { EEP: true, EFC: true, EIP: true, ESECI: true };
// Conceptos apagados individualmente (escenario "¿qué pasaría si no existiera X?")
const offNodes = new Set();
let lastToggledOff = null;
let selectedRel = null;

// ---------------------------------------------------------------------
// 1. MODELO: nodos (sistemas + conceptos) y aristas
// ---------------------------------------------------------------------
const conceptId = (sis, con) => sis + '::' + con;

const model = { systems: {}, concepts: {}, relations: [] };
const layout = {};
const nodeR = {};

function buildModel() {
  model.systems = {}; model.concepts = {}; model.relations = [];

  SYS.forEach(s => {
    model.systems[s] = Object.assign({ code: s, concepts: [] }, POT_DATA.sistemas[s]);
  });

  POT_DATA.nodos.forEach(n => {
    model.concepts[n.id] = { id: n.id, sys: n.sys, label: n.label, icon: n.icon, deg: n.deg, rels: [] };
    model.systems[n.sys].concepts.push(n.id);
    layout[n.id] = { x: n.x, y: n.y };
    nodeR[n.id] = n.r;
  });

  POT_DATA.relaciones.forEach(r => {
    const from = conceptId(r.sO, r.cO);
    const to = conceptId(r.sD, r.cD);
    const rel = Object.assign({}, r, { from, to });
    model.relations.push(rel);
    model.concepts[from].rels.push(rel);
    model.concepts[to].rels.push(rel);
  });
}

// Una relación está activa solo si AMBOS sistemas están ON y ninguno de sus
// dos conceptos fue apagado individualmente
const nodeOn = id => !offNodes.has(id);
const relActive = r => state[r.sO] && state[r.sD] && nodeOn(r.from) && nodeOn(r.to);

// Las posiciones vienen precalculadas en POT_DATA (layout de fuerzas por
// clúster, optimizado para minimizar cruces de líneas).
function computeLayout() { /* nada: layout ya cargado en buildModel */ }

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

// Trayectoria curva entre dos puntos, recortada en los bordes de los nodos
function curvePath(a, b, rA, rB) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const p1 = { x: a.x + ux * (rA + 2), y: a.y + uy * (rA + 2) };
  const p2 = { x: b.x - ux * (rB + 8), y: b.y - uy * (rB + 8) };
  const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
  const bow = Math.min(46, len * 0.11);
  const cx = mx - uy * bow, cy = my + ux * bow;
  return `M${p1.x.toFixed(1)},${p1.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
}

function render() {
  const gGuides = document.getElementById('gGuides');
  const gMembers = document.getElementById('gMembers');
  const gRels = document.getElementById('gRels');
  const gNodes = document.getElementById('gNodes');
  [gGuides, gMembers, gRels, gNodes].forEach(g => (g.innerHTML = ''));

  // -- relaciones activas (las inactivas NO se dibujan: desaparecen de verdad)
  model.relations.forEach(r => {
    if (!relActive(r)) return;
    const a = layout[r.from], b = layout[r.to];
    const rA = nodeR[r.from];
    const rB = nodeR[r.to];
    const d = curvePath(a, b, rA, rB);
    const kind = r.tipo === 'Soporte' ? 'soporte' : 'resiliencia';
    const cls = ['rel', kind];
    if (r.linea === 'Punteada') cls.push('punteada');
    if (selectedRel === r.id) cls.push('sel');

    const path = el('path', {
      class: cls.join(' '),
      d,
      'marker-end': `url(#ar-${kind})`,
      'data-rel': r.id
    });
    const hit = el('path', { class: 'rel-hit', d, 'data-rel': r.id });

    [path, hit].forEach(node => {
      node.addEventListener('click', ev => { ev.stopPropagation(); selectRelation(r.id); });
      node.addEventListener('mouseenter', ev => showTooltip(ev,
        `<div class="tt-sys" style="color:${model.systems[r.sO].color}">${r.sO} → ${r.sD}</div>` +
        `${esc(r.cO)} → ${esc(r.cD)}<br><span style="color:#8891a5">${r.tipo} · ${r.evid} · p. ${r.pag}</span>`));
      node.addEventListener('mousemove', moveTooltip);
      node.addEventListener('mouseleave', hideTooltip);
    });

    gRels.appendChild(path);
    gRels.appendChild(hit);
  });

  // -- conceptos
  SYS.forEach(s => {
    if (!state[s]) return;
    model.systems[s].concepts.forEach(id => {
      const c = model.concepts[id];
      const p = layout[id];
      const activeRels = c.rels.filter(relActive).length;
      const isolated = activeRels === 0;
      const off = offNodes.has(id);
      const R = nodeR[id];
      const iconSize = Math.max(9, Math.round(R * 0.52));
      const fontSize = R >= 30 ? 8.9 : R >= 22 ? 8.5 : 8.1;
      // nivel de brillo por conectividad (solo estético)
      const glow = R >= 30 ? 'high' : R >= 22 ? 'mid' : 'low';

      const cls = ['concept', 'node-appear', 'deg-' + glow];
      if (isolated && !off) cls.push('isolated');
      if (off) cls.push('node-off');

      const g = el('g', {
        class: cls.join(' '),
        transform: `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`,
        style: `--sys:${model.systems[s].color}`,
        'data-id': id
      });

      g.appendChild(el('circle', { class: 'node-fill', r: R }));

      // icono dentro del nodo
      const fo = el('foreignObject', { x: -R, y: -R, width: R * 2, height: R * 2 });
      const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      div.setAttribute('class', 'node-icon');
      div.innerHTML = `<i class="fa-solid ${c.icon}" style="font-size:${iconSize}px"></i>`;
      fo.appendChild(div);
      g.appendChild(fo);

      const lines = wrapLabel(c.label);
      lines.forEach((ln, i) => {
        const t = el('text', { y: R + 11 + i * 8.6, style: `font-size:${fontSize}px` });
        t.textContent = ln;
        g.appendChild(t);
      });

      g.addEventListener('mouseenter', ev => showTooltip(ev,
        `<div class="tt-sys" style="color:${model.systems[s].color}">${s}</div>${esc(c.label)}<br>` +
        `<span style="color:#8891a5">${c.rels.length} relación(es) en el POT · ${activeRels} activa(s)` +
        `${off ? ' · APAGADO' : isolated ? ' · AISLADO' : ''}</span>`));
      g.addEventListener('mousemove', moveTooltip);
      g.addEventListener('mouseleave', hideTooltip);
      g.addEventListener('click', ev => { ev.stopPropagation(); focusConcept(id); });

      gNodes.appendChild(g);
    });
  });

}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------------
// 4. MÉTRICAS
// ---------------------------------------------------------------------
const outgoing = s => model.relations.filter(r => r.sO === s && relActive(r)).length;
const incoming = s => model.relations.filter(r => r.sD === s && relActive(r)).length;
// relaciones que desaparecerían si ese sistema se apagara (desde red completa)
const incident = s => model.relations.filter(r => r.sO === s || r.sD === s).length;

function components() {
  // La red visible son los conceptos y las relaciones documentadas.
  // Un concepto sin ninguna relación activa cuenta como componente propio.
  const adj = {};
  const nodes = [];
  Object.values(model.concepts).forEach(c => {
    if (!state[c.sys]) return;
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

function updateMetrics() {
  const total = model.relations.length;
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

  const bar = document.getElementById('mBar');
  bar.style.width = pct + '%';
  bar.style.background = pct === 100 ? 'var(--eep)' : pct >= 60 ? 'var(--eseci)' : 'var(--danger)';

  // ---- centralidad saliente (calculada, nunca fija) ----
  const rank = SYS.map(s => ({ s, out: outgoing(s), inc: incoming(s), on: state[s] }))
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
    ? '<span class="badge-top">Sin relaciones salientes activas</span>'
    : `<span class="badge-top" style="color:${model.systems[top.s].color};border-color:${model.systems[top.s].color}66;background:${model.systems[top.s].color}1f">
         ${tie.length > 1 ? tie.map(t => t.s).join(' / ') : top.s} · Mayor centralidad
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

  updateSimPanel(active, total, rank);
}

const set = (id, html) => { document.getElementById(id).innerHTML = html; };

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
      <p class="note" style="border:0;padding-top:9px">Al desactivar ${off.join(' + ')}, la red pierde ${loss}% de sus relaciones.</p>`;
  }

  // ---- hallazgo dinámico ----
  const top = rank[0];
  const f = document.getElementById('finding');
  if (!off.length) {
    f.innerHTML = top.out === 0
      ? 'Sin relaciones activas para analizar.'
      : `La red está completa: <b>${active} de ${total}</b> relaciones activas.
         Según las relaciones construidas a partir del POT, <b>${top.s}</b> concentra la mayor
         centralidad saliente (<b>${top.out}</b> relaciones), por lo que opera como
         <b>principal articulador de esta red</b>.`;
  } else {
    const removed = total - active;
    const loss = total ? Math.round((removed / total) * 100) : 0;
    const worst = SYS.map(s => ({ s, n: incident(s) })).sort((a, b) => b.n - a.n)[0];
    f.innerHTML = `Al desactivar <b>${off.join(' + ')}</b>, la red pierde <b>${removed}</b> de sus
      <b>${total}</b> relaciones (<b>${loss}%</b>) y queda con <b>${components().count}</b>
      componente(s) conectado(s).
      ${top.out > 0
        ? `Con la red así, <b>${top.s}</b> pasa a tener la mayor centralidad saliente (<b>${top.out}</b> relaciones).`
        : 'No quedan relaciones salientes activas.'}
      En la red completa, el sistema que genera mayor dependencia es <b>${worst.s}</b>
      (${worst.n} relaciones incidentes).`;
  }
}

// ---------------------------------------------------------------------
// 5. INTERACCIÓN
// ---------------------------------------------------------------------
function toggleSystem(s) {
  state[s] = !state[s];
  lastToggledOff = state[s] ? null : s;
  if (selectedRel !== null) {
    const r = model.relations.find(x => x.id === selectedRel);
    if (r && !relActive(r)) clearEvidence();
  }
  updateSwitches();
  render();
  updateMetrics();
}

function updateSwitches() {
  SYS.forEach(s => {
    const b = document.querySelector('.scenario-btn[data-sys="' + s + '"]');
    if (!b) return;
    const off = !state[s];
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

function selectRelation(id) {
  selectedRel = id;
  const r = model.relations.find(x => x.id === id);
  if (!r) return;
  const kind = r.tipo === 'Soporte' ? 'soporte' : 'resiliencia';

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
      <div><div class="k">Línea</div><div class="v">${r.linea}</div></div>
      <div><div class="k">Página POT</div><div class="v">${r.pag}</div></div>
      <div style="grid-column:1/-1"><div class="k">Clase de relación</div><div class="v">${r.clase}</div></div>
      <div style="grid-column:1/-1"><div class="k">Sección / referencia</div><div class="v" style="font-size:10.5px;line-height:1.4">${esc(r.seccion)}</div></div>
    </div>
    <div class="ev-quote ${kind}">${esc(r.frase)}</div>`;

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
  box.innerHTML = `Este concepto participa en <b>${c.rels.length}</b> de las <b>${total}</b>
    relaciones documentadas (<b>${pct}%</b>). Al apagarlo, esas relaciones desaparecen de la red.`;
}
const tip = () => document.getElementById('tooltip');

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

function hideTooltip() { tip().classList.remove('show'); }

// ---------------------------------------------------------------------
// 7. ZOOM Y DESPLAZAMIENTO
// ---------------------------------------------------------------------
const VB = POT_DATA.vb;
const BASE_VB = { x: VB[0], y: VB[1], w: VB[2], h: VB[3] };
let vb = Object.assign({}, BASE_VB);

function applyVB() {
  document.getElementById('svg').setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
}

function zoom(f, cx, cy) {
  const nw = Math.max(320, Math.min(3200, vb.w / f));
  const nh = nw * (BASE_VB.h / BASE_VB.w);
  if (cx === undefined) { cx = vb.x + vb.w / 2; cy = vb.y + vb.h / 2; }
  vb.x = cx - (cx - vb.x) * (nw / vb.w);
  vb.y = cy - (cy - vb.y) * (nh / vb.h);
  vb.w = nw; vb.h = nh;
  applyVB();
}

function resetView() { vb = Object.assign({}, BASE_VB); applyVB(); }

function initPanZoom() {
  const stage = document.getElementById('stage');
  const svg = document.getElementById('svg');

  stage.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const cx = vb.x + ((e.clientX - rect.left) / rect.width) * vb.w;
    const cy = vb.y + ((e.clientY - rect.top) / rect.height) * vb.h;
    zoom(e.deltaY < 0 ? 1.16 : 1 / 1.16, cx, cy);
  }, { passive: false });

  let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
  stage.addEventListener('pointerdown', e => {
    dragging = true; sx = e.clientX; sy = e.clientY; ox = vb.x; oy = vb.y;
    stage.classList.add('panning');
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    const rect = svg.getBoundingClientRect();
    vb.x = ox - ((e.clientX - sx) / rect.width) * vb.w;
    vb.y = oy - ((e.clientY - sy) / rect.height) * vb.h;
    applyVB();
  });
  const end = () => { dragging = false; stage.classList.remove('panning'); };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);

  svg.addEventListener('click', () => { clearFocus(); });
}

// ---------------------------------------------------------------------
// 8. ARRANQUE
// ---------------------------------------------------------------------
let initialized = false;

document.addEventListener('DOMContentLoaded', () => {
  if (initialized) return;
  initialized = true;

  buildModel();
  computeLayout();

  // interruptores = los botones de escenario del módulo
  document.querySelectorAll('.scenario-btn[data-sys]').forEach(b =>
    b.addEventListener('click', () => toggleSystem(b.getAttribute('data-sys'))));
  updateSwitches();

  document.getElementById('btnReset').addEventListener('click', resetAll);
  document.getElementById('btnIn').addEventListener('click', () => zoom(1.25));
  document.getElementById('btnOut').addEventListener('click', () => zoom(0.8));
  document.getElementById('btnFit').addEventListener('click', resetView);

  clearEvidence();
  initNodeScenario();
  initPanZoom();
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
