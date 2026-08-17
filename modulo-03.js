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
   "color": "#58d68d"
  },
  "EFC": {
   "nombre": "Estructura Funcional y del Cuidado",
   "color": "#ef8b3c"
  },
  "ESECI": {
   "nombre": "Estructura Socioeconómica, Creativa y de Innovación",
   "color": "#eab04c"
  },
  "EIP": {
   "nombre": "Estructura Integradora de Patrimonios",
   "color": "#ef6f6f"
  }
 },
 "nodos": [
  {
   "id": "EEP::Bosques urbanos",
   "sys": "EEP",
   "label": "Bosques urbanos",
   "icon": "fa-tree-city",
   "x": -614.4,
   "y": 1387.4,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EEP::Cerros Orientales",
   "sys": "EEP",
   "label": "Cerros Orientales",
   "icon": "fa-mountain",
   "x": 1688.7,
   "y": 157.4,
   "r": 43.5,
   "deg": 1
  },
  {
   "id": "EEP::Coberturas vegetales",
   "sys": "EEP",
   "label": "Coberturas vegetales",
   "icon": "fa-seedling",
   "x": -280.3,
   "y": 935.3,
   "r": 88.3,
   "deg": 7
  },
  {
   "id": "EEP::Complejos de páramos",
   "sys": "EEP",
   "label": "Complejos de páramos",
   "icon": "fa-cloud",
   "x": 868.2,
   "y": 1593.6,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EEP::Conservación ambiental",
   "sys": "EEP",
   "label": "Conservación ambiental",
   "icon": "fa-shield-heart",
   "x": 1299.2,
   "y": -1049.2,
   "r": 43.5,
   "deg": 1
  },
  {
   "id": "EEP::Corredores montañosos",
   "sys": "EEP",
   "label": "Corredores montañosos",
   "icon": "fa-mountain-sun",
   "x": 1525.3,
   "y": 1167.5,
   "r": 43.5,
   "deg": 1
  },
  {
   "id": "EEP::Humedales",
   "sys": "EEP",
   "label": "Humedales",
   "icon": "fa-droplet",
   "x": 753.3,
   "y": -42.4,
   "r": 140.0,
   "deg": 12
  },
  {
   "id": "EEP::Paisajes sostenibles",
   "sys": "EEP",
   "label": "Paisajes sostenibles",
   "icon": "fa-image",
   "x": 226.4,
   "y": 1661.8,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EEP::Parques de borde",
   "sys": "EEP",
   "label": "Parques de borde",
   "icon": "fa-leaf",
   "x": 360.1,
   "y": 1365.0,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EEP::Parques ecológicos de montaña",
   "sys": "EEP",
   "label": "Parques ecológicos de montaña",
   "icon": "fa-mountain",
   "x": 620.2,
   "y": 991.3,
   "r": 62.7,
   "deg": 4
  },
  {
   "id": "EEP::Quebradas",
   "sys": "EEP",
   "label": "Quebradas",
   "icon": "fa-tint",
   "x": 1525.4,
   "y": -455.3,
   "r": 43.5,
   "deg": 1
  },
  {
   "id": "EEP::Reservas forestales",
   "sys": "EEP",
   "label": "Reservas forestales",
   "icon": "fa-tree",
   "x": 1517.4,
   "y": -13.4,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EEP::Ríos",
   "sys": "EEP",
   "label": "Ríos",
   "icon": "fa-water",
   "x": 1011.5,
   "y": 972.3,
   "r": 70.7,
   "deg": 5
  },
  {
   "id": "EEP::Áreas de resiliencia climática",
   "sys": "EEP",
   "label": "Áreas de resiliencia climática",
   "icon": "fa-temperature-half",
   "x": -279.9,
   "y": 231.1,
   "r": 70.7,
   "deg": 5
  },
  {
   "id": "EEP::Áreas protegidas",
   "sys": "EEP",
   "label": "Áreas protegidas",
   "icon": "fa-shield-halved",
   "x": 1379.7,
   "y": 488.8,
   "r": 55.4,
   "deg": 3
  },
  {
   "id": "EFC::Ciclorutas",
   "sys": "EFC",
   "label": "Ciclorutas",
   "icon": "fa-bicycle",
   "x": 250.4,
   "y": -921.5,
   "r": 70.7,
   "deg": 5
  },
  {
   "id": "EFC::Corredores verdes",
   "sys": "EFC",
   "label": "Corredores verdes",
   "icon": "fa-road",
   "x": 319.3,
   "y": -1425.4,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EFC::Equipamientos",
   "sys": "EFC",
   "label": "Equipamientos",
   "icon": "fa-building-columns",
   "x": -1102.4,
   "y": -519.5,
   "r": 118.2,
   "deg": 10
  },
  {
   "id": "EFC::Espacio público",
   "sys": "EFC",
   "label": "Espacio público",
   "icon": "fa-umbrella-beach",
   "x": 699.0,
   "y": 401.0,
   "r": 55.4,
   "deg": 3
  },
  {
   "id": "EFC::Manzanas del Cuidado",
   "sys": "EFC",
   "label": "Manzanas del Cuidado",
   "icon": "fa-hand-holding-heart",
   "x": -1149.9,
   "y": -987.4,
   "r": 70.7,
   "deg": 5
  },
  {
   "id": "EFC::Parques",
   "sys": "EFC",
   "label": "Parques",
   "icon": "fa-tree",
   "x": -1023.6,
   "y": -1661.8,
   "r": 43.5,
   "deg": 1
  },
  {
   "id": "EFC::Red vial",
   "sys": "EFC",
   "label": "Red vial",
   "icon": "fa-road-bridge",
   "x": -728.6,
   "y": -1205.4,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EFC::Servicios de cuidado",
   "sys": "EFC",
   "label": "Servicios de cuidado",
   "icon": "fa-heart",
   "x": -1688.7,
   "y": -844.9,
   "r": 43.5,
   "deg": 1
  },
  {
   "id": "EFC::Servicios públicos",
   "sys": "EFC",
   "label": "Servicios públicos",
   "icon": "fa-plug",
   "x": -1214.2,
   "y": -307.1,
   "r": 79.2,
   "deg": 6
  },
  {
   "id": "EFC::Servicios sociales",
   "sys": "EFC",
   "label": "Servicios sociales",
   "icon": "fa-people-group",
   "x": -1407.2,
   "y": -1216.9,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EFC::Transporte público",
   "sys": "EFC",
   "label": "Transporte público",
   "icon": "fa-bus",
   "x": -101.7,
   "y": -570.6,
   "r": 97.8,
   "deg": 8
  },
  {
   "id": "EFC::Vivienda",
   "sys": "EFC",
   "label": "Vivienda",
   "icon": "fa-house",
   "x": -242.0,
   "y": -742.2,
   "r": 107.8,
   "deg": 9
  },
  {
   "id": "ESECI::Actividades económicas",
   "sys": "ESECI",
   "label": "Actividades económicas",
   "icon": "fa-chart-line",
   "x": -698.3,
   "y": 30.2,
   "r": 62.7,
   "deg": 4
  },
  {
   "id": "ESECI::Centros de abastecimiento",
   "sys": "ESECI",
   "label": "Centros de abastecimiento",
   "icon": "fa-truck",
   "x": -191.6,
   "y": 574.2,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "ESECI::Centros financieros",
   "sys": "ESECI",
   "label": "Centros financieros",
   "icon": "fa-building-columns",
   "x": -1162.6,
   "y": 1179.0,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "ESECI::Corazones productivos",
   "sys": "ESECI",
   "label": "Corazones productivos",
   "icon": "fa-heart-pulse",
   "x": -312.2,
   "y": -1456.1,
   "r": 43.5,
   "deg": 1
  },
  {
   "id": "ESECI::Distrito Centro Tecnológico e Innovación",
   "sys": "ESECI",
   "label": "Distrito Centro Tecnológico e Innovación",
   "icon": "fa-microchip",
   "x": -1455.0,
   "y": 395.8,
   "r": 70.7,
   "deg": 5
  },
  {
   "id": "ESECI::Economía",
   "sys": "ESECI",
   "label": "Economía",
   "icon": "fa-coins",
   "x": 749.1,
   "y": -879.3,
   "r": 55.4,
   "deg": 3
  },
  {
   "id": "ESECI::Empleo",
   "sys": "ESECI",
   "label": "Empleo",
   "icon": "fa-briefcase",
   "x": -600.3,
   "y": -630.4,
   "r": 97.8,
   "deg": 8
  },
  {
   "id": "ESECI::Plazas de mercado",
   "sys": "ESECI",
   "label": "Plazas de mercado",
   "icon": "fa-store",
   "x": 82.1,
   "y": 939.6,
   "r": 79.2,
   "deg": 6
  },
  {
   "id": "ESECI::Producción artesanal",
   "sys": "ESECI",
   "label": "Producción artesanal",
   "icon": "fa-gem",
   "x": -1484.4,
   "y": -98.2,
   "r": 55.4,
   "deg": 3
  },
  {
   "id": "ESECI::Producción de alimentos",
   "sys": "ESECI",
   "label": "Producción de alimentos",
   "icon": "fa-wheat-awn",
   "x": 1126.8,
   "y": 549.7,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "ESECI::Servicios empresariales",
   "sys": "ESECI",
   "label": "Servicios empresariales",
   "icon": "fa-handshake",
   "x": -981.5,
   "y": 721.0,
   "r": 88.3,
   "deg": 7
  },
  {
   "id": "ESECI::Sistema de educación",
   "sys": "ESECI",
   "label": "Sistema de educación",
   "icon": "fa-graduation-cap",
   "x": -1049.5,
   "y": -68.4,
   "r": 88.3,
   "deg": 7
  },
  {
   "id": "ESECI::Zonas de interés turístico",
   "sys": "ESECI",
   "label": "Zonas de interés turístico",
   "icon": "fa-camera",
   "x": 650.6,
   "y": 677.8,
   "r": 79.2,
   "deg": 6
  },
  {
   "id": "ESECI::Zonas industriales",
   "sys": "ESECI",
   "label": "Zonas industriales",
   "icon": "fa-industry",
   "x": -980.8,
   "y": 150.4,
   "r": 97.8,
   "deg": 8
  },
  {
   "id": "EIP::Patrimonio arqueológico",
   "sys": "EIP",
   "label": "Patrimonio arqueológico",
   "icon": "fa-scroll",
   "x": -845.0,
   "y": 342.2,
   "r": 62.7,
   "deg": 4
  },
  {
   "id": "EIP::Patrimonio cultural",
   "sys": "EIP",
   "label": "Patrimonio cultural",
   "icon": "fa-landmark",
   "x": 1157.5,
   "y": -322.5,
   "r": 48.9,
   "deg": 2
  },
  {
   "id": "EIP::Patrimonio inmaterial",
   "sys": "EIP",
   "label": "Patrimonio inmaterial",
   "icon": "fa-masks-theater",
   "x": -606.8,
   "y": -280.2,
   "r": 88.3,
   "deg": 7
  },
  {
   "id": "EIP::Patrimonio material",
   "sys": "EIP",
   "label": "Patrimonio material",
   "icon": "fa-monument",
   "x": -616.5,
   "y": 630.7,
   "r": 88.3,
   "deg": 7
  },
  {
   "id": "EIP::Patrimonio natural",
   "sys": "EIP",
   "label": "Patrimonio natural",
   "icon": "fa-mountain-sun",
   "x": 62.3,
   "y": 430.7,
   "r": 88.3,
   "deg": 7
  },
  {
   "id": "EIP::Sistema de sitios sagrados",
   "sys": "EIP",
   "label": "Sistema de sitios sagrados",
   "icon": "fa-place-of-worship",
   "x": -96.6,
   "y": -1276.6,
   "r": 43.5,
   "deg": 1
  }
 ],
 "relaciones": [
  {
   "sO": "EFC",
   "cO": "Transporte público",
   "sD": "ESECI",
   "cD": "Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "164",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Los tiempos de desplazamiento son el resultado de la eficiencia y calidad de los sistemas de transporte masivo y de sus modos y estructuración. Un buen sistema de transporte se nota en menores tiempos de viaje que suplen las necesidades de desplazamiento de la ciudadanía y facilitan la conexión entre las personas y el sector productivo.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 0,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Vivienda",
   "sD": "ESECI",
   "cD": "Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“De esta manera, el Plan Maestro de Hábitat y Servicios Públicos se convierte en una herramienta eficaz para concretar la visión de mixtura, al acercar la vivienda a los grandes centros de productividad y, por consiguiente, mejorar las condiciones de acceso al empleo, consolidando así tejidos económicos continuos y complementarios entre el gran corazón productivo de escala urbana y las actividades económicas de soporte a la vida.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 1,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Esos equipamientos —que están pensados para ofrecer, de manera híbrida, la mayor cantidad de servicios sociales posibles— tienen un potencial de ser, en sí mismos, fuentes de generación de empleo de proximidad y de fomentar dinámicas económicas complementarias en sus zonas de influencia.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 2,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "ESECI",
   "cD": "Empleo",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "118",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "frase": "“El sistema atiende tres tipos de poblaciones: a las personas cuidadoras, ofreciéndoles servicios de educación, respiro, formación y capitalización para el trabajo y el emprendimiento, y otras formas de generación de ingresos, con los que les devolvemos las oportunidades que han sacrificado por las cargas de cuidado.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 3,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "165",
   "seccion": "Instrumentos del ordenamiento territorial que impactan la productividad y el empleo",
   "frase": "“Equipamiento como detonante de dinámicas económicas”",
   "clase": "Intersistema",
   "completa": true,
   "id": 4,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Vivienda",
   "sD": "ESECI",
   "cD": "Economía",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El Plan Maestro de Hábitat tiene la capacidad de robustecer las economías de proximidad, no solamente al propiciar la mixtura de usos del suelo en los proyectos de vivienda y en los instrumentos de los diferentes planes parciales, sino combinando sus usos al interior de las mismas edificaciones.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 5,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "ESECI",
   "cD": "Zonas industriales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”",
   "clase": "Intersistema",
   "completa": true,
   "id": 6,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "ESECI",
   "cD": "Distrito Centro Tecnológico e Innovación",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”",
   "clase": "Intersistema",
   "completa": true,
   "id": 7,
   "porVerificar": false,
   "sinFrase": false,
   "explicacion": "Los servicios públicos sostienen el funcionamiento del Distrito Centro Tecnológico e Innovación mediante energía, telecomunicaciones e internet. La relación es indirecta porque la infraestructura habilita la actividad, pero no constituye por sí misma el distrito.",
   "ejemplo": "Sin energía estable y conectividad digital, un campus de ciencia, tecnología e innovación no podría operar de forma continua.",
  },
  {
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "ESECI",
   "cD": "Empleo",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Los cables eléctricos, rutas circulares y cicloinfraestructura permite a su vez interconectividad de proximidad dentro de las upl y conexión con los corredores de alta demanda, sean de metro o de TransMilenio. Esto mejorará significativamente la calidad de vida y la productividad de la población, que hará uso de estas infraestructuras; también, consolidará las dinámicas de aglomeración económica que concentran el tejido empresarial y, con ello, las fuentes de generación de empleo en el centro ampliado, pero también en las nuevas zonas más periféricas, mejor servidas y conectadas gracias a la red multimodal de transporte.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 8,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EFC",
   "cD": "Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El programa busca promover el dinamismo, la reactivación económica y la creación de empleos. Se apuesta por el impulso a proyectos que generen actividades económicas asociadas al emprendimiento, la creatividad, la innovación y la cultura, que se complementa con las áreas residenciales donde se interactúa a partir del sistema de movilidad.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 9,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Corazones productivos",
   "sD": "EFC",
   "cD": "Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El nuevo modelo de ordenamiento del territorio a partir de la mixtura y la complementariedad que plantea el pot busca revertir esta tendencia promoviendo las áreas receptoras de actividad económica, las áreas de actividad receptoras de vivienda de interés social en cercanía de las aglomeraciones y el ecosistema productivo y la mixtura de usos en las áreas de proximidad (antiguas zonas de uso residencial neto).”",
   "clase": "Intersistema",
   "completa": true,
   "id": 10,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El Plan Maestro de Hábitat y Servicios Públicos debe garantizar las condiciones de prestación de los servicios públicos de las diferentes actividades económicas.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 11,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”",
   "clase": "Intersistema",
   "completa": true,
   "id": 12,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "frase": "“El Plan Maestro de Hábitat y Servicios Públicos debe garantizar las condiciones de prestación de los servicios públicos de las diferentes actividades económicas.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 13,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Sistema de educación",
   "sD": "ESECI",
   "cD": "Empleo",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "30",
   "seccion": "Presentación del POT",
   "frase": "“La inversión y ejecución sostenida del pot, el pmss y la inversión en esa educación con calidad y pertinencia, desde la básica hasta la superior, lograrán en conjunto, en la próxima década, el mayor crecimiento en productividad, empleabilidad de calidad y competitividad que haya tenido Bogotá.”",
   "clase": "Intrasistema",
   "completa": true,
   "id": 14,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "ESECI",
   "cD": "Producción artesanal",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "30",
   "seccion": "Presentación del POT",
   "frase": "“Por eso el pot promueve la permanencia de las industrias tradicionales en el tejido urbano y promueve nuevas implantaciones económicas generadoras de empleo formal, articuladas a los entornos urbanos donde se aglomeran saberes y talentos, y en particular aquellos que dan lugar a aglomeraciones especializadas de producción tradicional e industrias creativas, culturales, verdes, digitales y tecnológicas.”",
   "clase": "Intrasistema",
   "completa": true,
   "id": 15,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio cultural",
   "sD": "ESECI",
   "cD": "Zonas de interés turístico",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "31",
   "seccion": "Presentación del POT",
   "frase": "“Por eso promovemos la ciudad como destino turístico inteligente, sostenible, de salud y de negocios que reconozca el patrimonio local, las dinámicas comunitarias, los sistemas cooperativos de producción sostenible como huertas productivas, bancos de semillas nativas y plantas de uso medicinal, entre otros.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 16,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio natural",
   "sD": "ESECI",
   "cD": "Zonas de interés turístico",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "31",
   "seccion": "Presentación del POT",
   "frase": "“En la ruralidad es urgente mejorar las condiciones habitacionales, desde los componentes de servicios públicos domiciliarios, accesibilidad y movilidad, con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 17,
   "porVerificar": false,
   "sinFrase": false,
   "explicacion": "El patrimonio natural puede apoyar el turismo responsable cuando se combina con conservación, accesibilidad, equipamientos y saberes locales. La relación es indirecta porque el POT no convierte todo patrimonio natural en zona turística.",
   "ejemplo": "Un recorrido de naturaleza alrededor de un ecosistema protegido puede generar turismo responsable sin transformar el ecosistema en una infraestructura turística.",
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio inmaterial",
   "sD": "ESECI",
   "cD": "Producción artesanal",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "200",
   "seccion": "Los reconocimientos y el plan para los patrimonios vitales",
   "frase": "“Esta producción artesanal corresponde entonces a las actividades creativas de producción de objetos, realizadas con predominio manual y auxiliadas en algunos casos con maquinarias simples, obteniendo un resultado final individualizado, determinado por los patrones culturales, el medio ambiente y su desarrollo histórico.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 18,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio cultural",
   "sD": "ESECI",
   "cD": "Economía",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "204",
   "seccion": "Los reconocimientos y el plan para los patrimonios vitales",
   "frase": "“Esta oferta y este movimiento económico y cultural hacen parte de una de las iniciativas primordiales que fija el pot para que la cultura, en ciertos barrios o sectores de Bogotá, se convierta en un polo de desarrollo económico y social: los Distritos Creativos.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 19,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EFC",
   "cD": "Espacio público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "92",
   "seccion": "Transformaciones urbanas",
   "frase": "“Se debatió si podíamos considerar espacio público los elementos de nuestra Estructura Ecológica Principal (eep) adecuando humedales, bordes de ríos y quebradas, para el disfrute ciudadano.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 20,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "ESECI",
   "cD": "Producción de alimentos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "196",
   "seccion": "Nuestro territorio y nuestra identidad",
   "frase": "“Las huertas son entonces parte de un valor presente interesado en restablecer vínculos entre los ciclos de producción de alimentos y consumo en ámbitos domésticos. La existencia de estos lugares reconcilia distintas maneras de habitar la ciudad, de conocimientos y prácticas asociados a la preservación de especies y semillas nativas, la siembra, al manejo responsable del agua y de la comprensión del clima.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 21,
   "evid": "Indirecta",
   "porVerificar": false,
   "sinFrase": false,
   "explicacion": "Los humedales aportan agua, biodiversidad, semillas y regulación ambiental, condiciones que pueden apoyar prácticas de huerta y producción de alimentos. La relación es indirecta porque el humedal no es una unidad productiva de alimentos.",
   "ejemplo": "Una huerta urbana cercana puede beneficiarse del conocimiento sobre agua y semillas asociado al ecosistema, pero no debe instalarse dentro del humedal protegido.",
  },
  {
   "sO": "EEP",
   "cO": "Conservación ambiental",
   "sD": "ESECI",
   "cD": "Economía",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "31",
   "seccion": "Presentación del POT",
   "frase": "“En la ruralidad es urgente mejorar las condiciones habitacionales, desde los componentes de servicios públicos domiciliarios, accesibilidad y movilidad, con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”",
   "clase": "Intersistema",
   "completa": true,
   "id": 22,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Servicios sociales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "frase": "“Dotar a los barrios de esta infraestructura social hace que los servicios de educación, salud, cultura y cuidado estén próximos y accesibles para garantizar los derechos y satisfacer las necesidades básicas de las personas.”",
   "clase": "Interna",
   "completa": true,
   "id": 23,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Vivienda",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "40",
   "seccion": "Presentación del POT",
   "frase": "“Que sea en suelo de desarrollo o en suelo de renovación urbana, los constructores y desarrolladores inmobiliarios siempre tengan que garantizar diversos tipos de vivienda de interés social y soportes urbanos y equipamientos sociales de calidad para familias de diferentes tamaños y niveles de ingreso que comparten un mismo trozo de ciudad.”",
   "clase": "Interna",
   "completa": true,
   "id": 24,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Servicios sociales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "118",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "frase": "“El sistema articula servicios existentes y crea otros nuevos para atender las altas demandas de cuidado de una manera corresponsable entre el gobierno distrital, las comunidades, el sector privado y los demás miembros de los hogares para redistribuir la sobrecarga que llevaban solas las mujeres y balancear la provisión del cuidado, con el fin de devolverles tiempo a las mujeres y a las personas cuidadoras para su desarrollo personal, autocuidado, bienestar, generación de ingresos o participación política.”",
   "clase": "Interna",
   "completa": true,
   "id": 25,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Equipamientos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "118",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "frase": "“El tejido que se forma entre las Manzanas del Cuidado y la infraestructura nueva y existente de salud, educación, cultura, cuidado y recreación convierte cada una de las upl —que son las nuevas localidades en las que el pot proyecta la ciudad— en una Red del Cuidado.”",
   "clase": "Interna",
   "completa": true,
   "id": 26,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Corredores verdes",
   "sD": "EFC",
   "cD": "Ciclorutas",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "30",
   "seccion": "Presentación del POT",
   "frase": "“Y que, en todo caso, las diversas zonas de la ciudad estén conectadas por un sistema multimodal de transporte público, colectivo, de energías limpias y renovables basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorrutas.”",
   "clase": "Interna",
   "completa": true,
   "id": 27,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Corredores verdes",
   "sD": "EFC",
   "cD": "Transporte público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "30",
   "seccion": "Presentación del POT",
   "frase": "“Y que, en todo caso, las diversas zonas de la ciudad estén conectadas por un sistema multimodal de transporte público, colectivo, de energías limpias y renovables basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorrutas.”",
   "clase": "Interna",
   "completa": true,
   "id": 28,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Reservas forestales",
   "sD": "EEP",
   "cD": "Humedales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "72",
   "seccion": "Art. 42",
   "frase": "“La Estructura Ecológica Principal es un sistema de áreas y corredores que sostienen la biodiversidad y los servicios ecosistémicos, y su conectividad y complementariedad son fundamentales para garantizar su funcionalidad.”",
   "clase": "Interna",
   "completa": true,
   "id": 29,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Parques ecológicos de montaña",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 54",
   "frase": "“Los Parques Distritales Ecológicos de Montaña tienen como objetivo restaurar y preservar las especies nativas y garantizar la conectividad ecológica.”",
   "clase": "Interna",
   "completa": true,
   "id": 30,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Corredores montañosos",
   "sD": "EEP",
   "cD": "Ríos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7",
   "frase": "corredores montañosos … ríos y humedales",
   "clase": "Interna",
   "completa": false,
   "id": 31,
   "porVerificar": true,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Quebradas",
   "sD": "EEP",
   "cD": "Humedales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 42 / 62",
   "frase": "ríos y quebradas … humedales",
   "clase": "Interna",
   "completa": false,
   "id": 32,
   "porVerificar": true,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Cerros Orientales",
   "sD": "EEP",
   "cD": "Humedales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7",
   "frase": "cerros orientales … ríos y humedales",
   "clase": "Interna",
   "completa": false,
   "id": 33,
   "porVerificar": true,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EEP",
   "cD": "Ríos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 42 / 62",
   "frase": "ríos y quebradas … humedales",
   "clase": "Interna",
   "completa": false,
   "id": 34,
   "porVerificar": true,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Ríos",
   "sD": "EEP",
   "cD": "Complejos de páramos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7",
   "frase": "complejos de páramos … ríos y humedales",
   "clase": "Interna",
   "completa": false,
   "id": 35,
   "porVerificar": true,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Bosques urbanos",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "73",
   "seccion": "Art. 74",
   "frase": "cobertura vegetal … flora propia",
   "clase": "Interna",
   "completa": false,
   "id": 36,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Áreas de resiliencia climática",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "72",
   "seccion": "Art. 42",
   "frase": "territorio resiliente … cambio climático",
   "clase": "Interna",
   "completa": false,
   "id": 37,
   "porVerificar": true,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EEP",
   "cD": "Áreas de resiliencia climática",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 42",
   "frase": "amortiguación de los impactos ambientales",
   "clase": "Interna",
   "completa": false,
   "id": 38,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Áreas protegidas",
   "sD": "EEP",
   "cD": "Humedales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "71",
   "seccion": "Art. 41 / 51",
   "frase": "Reservas Distritales de Humedal",
   "clase": "Interna",
   "completa": false,
   "id": 39,
   "porVerificar": true,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Áreas protegidas",
   "sD": "EEP",
   "cD": "Parques ecológicos de montaña",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "71",
   "seccion": "Art. 51 / 54",
   "frase": "Parques Distritales Ecológicos de Montaña",
   "clase": "Interna",
   "completa": false,
   "id": 40,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Áreas protegidas",
   "sD": "EEP",
   "cD": "Reservas forestales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "71",
   "seccion": "Art. 41 / 45 / 48",
   "frase": "Reserva Forestal Protectora … Regional",
   "clase": "Interna",
   "completa": false,
   "id": 41,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Coberturas vegetales",
   "sD": "EEP",
   "cD": "Parques de borde",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "136",
   "seccion": "Art. 121",
   "frase": "coberturas vegetales … parques de borde",
   "clase": "Interna",
   "completa": false,
   "id": 42,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Coberturas vegetales",
   "sD": "EEP",
   "cD": "Paisajes sostenibles",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "72",
   "seccion": "Art. 52 / 74",
   "frase": "funcionalidad ecosistémica … conectividad",
   "clase": "Interna",
   "completa": false,
   "id": 43,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Complejos de páramos",
   "sD": "EEP",
   "cD": "Paisajes sostenibles",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "70",
   "seccion": "Art. 7 / 52",
   "frase": "complejos de páramos … paisajes",
   "clase": "Interna",
   "completa": false,
   "id": 44,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Servicios de cuidado",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "117–118",
   "seccion": "Art. 94–95",
   "frase": "equipamientos y servicios de cuidado",
   "clase": "Interna",
   "completa": false,
   "id": 45,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "EFC",
   "cD": "Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "179",
   "seccion": "Art. 179",
   "frase": "servicio público … actividades en la ciudad",
   "clase": "Interna",
   "completa": false,
   "id": 46,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "EFC",
   "cD": "Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 88",
   "frase": "accesibilidad … conectividad",
   "clase": "Interna",
   "completa": false,
   "id": 47,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "EFC",
   "cD": "Transporte público",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Resiliencia",
   "pag": "117 / 158–159",
   "seccion": "Art. 88 / 158–159",
   "frase": "cicloinfraestructura … corredores verdes",
   "clase": "Interna",
   "completa": false,
   "id": 48,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Transporte público",
   "sD": "EFC",
   "cD": "Vivienda",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 88",
   "frase": "accesibilidad … conectividad",
   "clase": "Interna",
   "completa": false,
   "id": 49,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Red vial",
   "sD": "EFC",
   "cD": "Transporte público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "158–159",
   "seccion": "Art. 158–159",
   "frase": "malla arterial … transporte público",
   "clase": "Interna",
   "completa": false,
   "id": 50,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Red vial",
   "sD": "EFC",
   "cD": "Equipamientos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 88 / 95",
   "frase": "accesibilidad … equipamientos",
   "clase": "Interna",
   "completa": false,
   "id": 51,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Parques",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "117",
   "seccion": "Art. 94",
   "frase": "jardines infantiles, colegios, parques",
   "clase": "Interna",
   "completa": false,
   "id": 52,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Eje de servicios empresariales",
   "clase": "Interna",
   "completa": false,
   "id": 53,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "ESECI",
   "cD": "Sistema de educación",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100–101",
   "frase": "formación del talento humano",
   "clase": "Interna",
   "completa": false,
   "id": 54,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Centros de abastecimiento",
   "sD": "ESECI",
   "cD": "Plazas de mercado",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100–101",
   "frase": "Centros de Abasto Mayorista … Plazas de Mercado",
   "clase": "Interna",
   "completa": false,
   "id": 55,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Plazas de mercado",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Plazas de Mercado … infraestructuras",
   "clase": "Interna",
   "completa": false,
   "id": 56,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Eje de servicios empresariales … zonas industriales",
   "clase": "Interna",
   "completa": false,
   "id": 57,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "ESECI",
   "cD": "Sistema de educación",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100–101",
   "frase": "formación del talento humano … empresas",
   "clase": "Interna",
   "completa": false,
   "id": 58,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Zonas de interés turístico",
   "sD": "ESECI",
   "cD": "Plazas de mercado",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 101",
   "frase": "Zonas de Interés Turístico … Plazas de Mercado",
   "clase": "Interna",
   "completa": false,
   "id": 59,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "ESECI",
   "cO": "Centros financieros",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "122",
   "seccion": "Art. 100",
   "frase": "centros financieros y de servicios empresariales",
   "clase": "Interna",
   "completa": false,
   "id": 60,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Sistema de sitios sagrados",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "patrimonio cultural inmaterial … comunidades",
   "clase": "Interna",
   "completa": false,
   "id": 61,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio arqueológico",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "Patrimonio Natural … Patrimonio Arqueológico",
   "clase": "Interna",
   "completa": false,
   "id": 62,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio arqueológico",
   "sD": "EIP",
   "cD": "Patrimonio material",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Resiliencia",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "Patrimonio Cultural material … Patrimonio Arqueológico",
   "clase": "Interna",
   "completa": false,
   "id": 63,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio natural",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "patrimonio cultural material, inmaterial y natural",
   "clase": "Interna",
   "completa": false,
   "id": 64,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio material",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "integra … material, inmaterial y natural",
   "clase": "Interna",
   "completa": false,
   "id": 65,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio material",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "103–104",
   "seccion": "Art. 80",
   "frase": "patrimonio cultural material, inmaterial y natural",
   "clase": "Interna",
   "completa": false,
   "id": 66,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "195–196",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "En ese sentido, la eip inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio.",
   "clase": "Intersistema",
   "completa": true,
   "id": 67,
   "porVerificar": false,
   "sinFrase": false,
   "explicacion": "La protección de los humedales contribuye a conservar valores naturales que el POT integra dentro del patrimonio natural. La relación es indirecta porque conecta dos estructuras territoriales mediante una función de conservación.",
   "ejemplo": "Conservar un humedal mantiene un valor natural que luego puede reconocerse dentro del sistema de patrimonio natural, aunque ambos nodos tengan funciones distintas.",
  },
  {
   "sO": "EIP",
   "cO": "Patrimonio arqueológico",
   "sD": "EFC",
   "cD": "Equipamientos",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "200",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "para la Secretaría Distrital de Planeación (sdp), en el proceso de implementación del pot, fue la oportunidad de incorporarlos como nodo de equipamientos próximos y de proyectos a escala local.",
   "clase": "Intersistema",
   "completa": true,
   "id": 68,
   "evid": "Indirecta",
   "porVerificar": false,
   "sinFrase": false,
   "explicacion": "El patrimonio arqueológico puede incorporarse a proyectos y equipamientos próximos mediante su reconocimiento, protección y puesta en valor. La relación es indirecta porque el patrimonio no es un equipamiento por sí mismo.",
   "ejemplo": "Un equipamiento cultural o educativo puede incluir la interpretación de un sitio arqueológico cercano sin convertir el sitio en un equipamiento.",
  },
  {
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "ESECI",
   "cD": "Sistema de educación",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "126",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "Con los nuevos colegios y jardines infantiles anclados en las Manzanas del Cuidado, lograremos que las mujeres, las niñas y los niños puedan garantizar su derecho a la educación en lugares cercanos a sus hogares.",
   "clase": "Intersistema",
   "completa": true,
   "id": 69,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Sistema de educación",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "126",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "Bajo la nueva visión del pot, la infraestructura social es compatible con otros usos y equipamientos, como centros deportivos, culturales y de recreación, entre otros.",
   "clase": "Intersistema",
   "completa": true,
   "id": 70,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Transporte público",
   "sD": "ESECI",
   "cD": "Zonas industriales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "31",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "Y que, en todo caso, las diversas zonas de la ciudad estén conectadas por un sistema multimodal de transporte público, colectivo, de energías limpias y renovables basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorrutas.",
   "clase": "Intersistema",
   "completa": true,
   "id": 71,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Parques ecológicos de montaña",
   "sD": "ESECI",
   "cD": "Zonas de interés turístico",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "54",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "Sostenible: Ecoturismo, viverismo, agricultura urbana y periurbana y puntos de la tierra.",
   "clase": "Intersistema",
   "completa": true,
   "id": 72,
   "porVerificar": false,
   "sinFrase": false,
   "explicacion": "Los parques ecológicos de montaña pueden sostener ecoturismo y educación ambiental compatibles con la conservación. La relación es indirecta porque el POT menciona actividades sostenibles asociadas, no una equivalencia entre parque y zona turística.",
   "ejemplo": "Un sendero de ecoturismo con control de visitantes puede acercar a la ciudadanía al parque sin cambiar su función ecológica.",
  },
  {
   "sO": "EEP",
   "cO": "Parques ecológicos de montaña",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "54",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "Son áreas de alta pendiente en suelo urbano y rural, caracterizadas por contar con remanentes de bosques altoandinos dispersos y ecosistemas subxerofíticos de gran importancia ecosistémica entre otros que, por su estructura y función ecosistémica, aportan a la conservación de la biodiversidad y los servicios ecosistémicos, la conectividad ecológica y a la resiliencia climática de los entornos urbanos,ruralesydetransiciónaescalalocalyregional.",
   "clase": "Intersistema",
   "completa": true,
   "id": 73,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EEP",
   "cO": "Áreas de resiliencia climática",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Resiliencia",
   "pag": "72",
   "seccion": "Relación entre estructuras (documento del POT)",
   "frase": "Así mismo, creamos las Áreas de Resiliencia Climática y Protección por Riesgo…",
   "clase": "Intersistema",
   "completa": true,
   "id": 74,
   "porVerificar": false,
   "sinFrase": false
  },
  {
   "sO": "EFC",
   "cO": "Vivienda",
   "sD": "EEP",
   "cD": "Humedales",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 75
  },
  {
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EFC",
   "cD": "Transporte público",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 76
  },
  {
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "EEP",
   "cD": "Humedales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 77
  },
  {
   "sO": "ESECI",
   "cO": "Zonas de interés turístico",
   "sD": "EEP",
   "cD": "Parques de borde",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 78
  },
  {
   "sO": "ESECI",
   "cO": "Producción de alimentos",
   "sD": "EEP",
   "cD": "Ríos",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 79
  },
  {
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 80
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "EEP",
   "cD": "Áreas de resiliencia climática",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Resiliencia",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 81
  },
  {
   "sO": "ESECI",
   "cO": "Plazas de mercado",
   "sD": "EIP",
   "cD": "Patrimonio material",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 82
  },
  {
   "sO": "ESECI",
   "cO": "Centros financieros",
   "sD": "EIP",
   "cD": "Patrimonio material",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 83
  },
  {
   "sO": "ESECI",
   "cO": "Sistema de educación",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 84
  },
  {
   "sO": "ESECI",
   "cO": "Centros de abastecimiento",
   "sD": "EFC",
   "cD": "Transporte público",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 85
  },
  {
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "EIP",
   "cD": "Patrimonio material",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 86
  },
  {
   "sO": "ESECI",
   "cO": "Sistema de educación",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 87
  },
  {
   "sO": "ESECI",
   "cO": "Zonas de interés turístico",
   "sD": "EFC",
   "cD": "Espacio público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 88
  },
  {
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 89
  },
  {
   "sO": "ESECI",
   "cO": "Empleo",
   "sD": "EEP",
   "cD": "Áreas de resiliencia climática",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Resiliencia",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 90
  },
  {
   "sO": "ESECI",
   "cO": "Empleo",
   "sD": "EIP",
   "cD": "Patrimonio inmaterial",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 91
  },
  {
   "sO": "ESECI",
   "cO": "Servicios empresariales",
   "sD": "EIP",
   "cD": "Patrimonio material",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 92
  },
  {
   "sO": "ESECI",
   "cO": "Servicios empresariales",
   "sD": "EEP",
   "cD": "Bosques urbanos",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Resiliencia",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 93
  },
  {
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "EIP",
   "cD": "Patrimonio arqueológico",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 94
  },
  {
   "sO": "ESECI",
   "cO": "Plazas de mercado",
   "sD": "EFC",
   "cD": "Espacio público",
   "linea": "Sólida",
   "evid": "Directa",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 95
  },
  {
   "sO": "ESECI",
   "cO": "Plazas de mercado",
   "sD": "EEP",
   "cD": "Ríos",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 96
  },
  {
   "sO": "ESECI",
   "cO": "Producción artesanal",
   "sD": "EFC",
   "cD": "Equipamientos",
   "linea": "Punteada",
   "evid": "Indirecta",
   "tipo": "Soporte",
   "pag": "—",
   "seccion": "Pendiente de referencia en el POT",
   "frase": null,
   "clase": "Intersistema",
   "completa": false,
   "porVerificar": true,
   "sinFrase": true,
   "id": 97
  }
 ],
 "vb": [
  -1964,
  -1937,
  3927,
  3910
 ]
};

const SYS = ['EEP', 'EFC', 'EIP', 'ESECI'];

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
const ESECI_RETAINED_REL_IDS = new Set([9, 10]);

function buildModel() {
  model.systems = {}; model.concepts = {}; model.relations = [];

  SYS.forEach(s => {
    model.systems[s] = Object.assign({ code: s, concepts: [] }, POT_DATA.sistemas[s]);
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
  POT_DATA.relaciones.filter(r => r.frase && r.pag && r.pag !== '—' && !r.porVerificar && !r.sinFrase).forEach(r => {
    const from = conceptId(r.sO, r.cO);
    const to = conceptId(r.sD, r.cD);
    const rel = Object.assign({}, r, { from, to });
    model.relations.push(rel);
    model.concepts[from].rels.push(rel);
    model.concepts[to].rels.push(rel);
  });

  // El tamaño se recalcula con las relaciones verificadas visibles, no con
  // grados heredados de conexiones que fueron retiradas por falta de evidencia.
  Object.values(model.concepts).forEach(c => {
    c.deg = c.rels.length;
    nodeR[c.id] = Math.max(38, 34 + c.deg * 13);
  });
}

// Una relación está activa solo si AMBOS sistemas están ON y ninguno de sus
// dos conceptos fue apagado individualmente
const nodeOn = id => !offNodes.has(id);

function relActive(r) {
  // Al apagar ESECI, se conservan únicamente las relaciones 9 y 10.
  // El sistema del otro extremo sí debe continuar encendido.
  if ((r.sO === 'ESECI' || r.sD === 'ESECI') && ESECI_RETAINED_REL_IDS.has(r.id)) {
    const otherSystem = r.sO === 'ESECI' ? r.sD : r.sO;
    return state[otherSystem] && nodeOn(r.from) && nodeOn(r.to);
  }
  return state[r.sO] && state[r.sD] && nodeOn(r.from) && nodeOn(r.to);
}

// Las posiciones de partida vienen de POT_DATA (agrupadas por estructura),
// pero muchas quedaban demasiado pegadas / superpuestas. Aquí se relajan con
// una simulación simple de fuerzas: se separan los nodos que se solapan y se
// evita que las conexiones queden demasiado comprimidas, partiendo siempre
// del layout original para conservar el agrupamiento por estructura.
function computeLayout() {
  // Distribución panorámica tipo Módulo 02: cuatro hubs separados,
  // satélites en anillos amplios y sin simulación de fuerzas que compacte
  // toda la red en un bloque. Las relaciones y sus extremos no cambian.
  const HUB_CENTERS = {
    EEP: { x: 800, y: 650 },
    EFC: { x: 1840, y: 650 },
    ESECI: { x: 800, y: 1640 },
    EIP: { x: 1840, y: 1640 }
  };
  const CANVAS = { w: 2644, h: 2294 };
  const ids = Object.keys(model.concepts);
  const pos = {};
  const GAP = 72;

  SYS.forEach(sys => {
    const center = HUB_CENTERS[sys];
    const group = model.systems[sys].concepts.slice().sort((a, b) =>
      (model.concepts[b].deg - model.concepts[a].deg) || a.localeCompare(b));
    if (!group.length) return;

    const hub = group[0];
    pos[hub] = { x: center.x, y: center.y };
    const rest = group.slice(1);
    const innerCount = Math.min(6, Math.ceil(rest.length / 2));
    const rings = [rest.slice(0, innerCount), rest.slice(innerCount)];
    const ringBases = [380, 650];

    rings.forEach((ring, ringIndex) => {
      if (!ring.length) return;
      const rotation = ({ EEP: -3 * Math.PI / 4, EFC: -Math.PI / 4, ESECI: 3 * Math.PI / 4, EIP: Math.PI / 4 })[sys];
      const span = Math.PI * 1.25;
      const circumference = ring.reduce((sum, id) => sum + 2 * nodeR[id] + GAP, 0);
      const radius = Math.max(ringBases[ringIndex], circumference / span);
      ring.forEach((id, i) => {
        const angle = rotation - span / 2 + ((i + 0.5) / ring.length) * span;
        pos[id] = {
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius
        };
      });
    });
  });

  // Desbloqueo final de colisiones: los hubs se mantienen fijos y solo se
  // desplazan satélites, preservando la simetría general de la plantilla.
  const hubIds = new Set(SYS.map(sys => model.systems[sys].concepts.slice().sort((a, b) =>
    (model.concepts[b].deg - model.concepts[a].deg) || a.localeCompare(b))[0]));
  for (let pass = 0; pass < 180; pass++) {
    let moved = false;
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const aId = ids[i], bId = ids[j];
        const a = pos[aId], b = pos[bId];
        let dx = a.x - b.x, dy = a.y - b.y;
        let d = Math.hypot(dx, dy) || 0.001;
        const required = nodeR[aId] + nodeR[bId] + 54;
        if (d >= required) continue;
        dx /= d; dy /= d;
        const push = (required - d) * 0.56;
        if (hubIds.has(aId) && !hubIds.has(bId)) { b.x -= dx * push * 1.8; b.y -= dy * push * 1.8; }
        else if (hubIds.has(bId) && !hubIds.has(aId)) { a.x += dx * push * 1.8; a.y += dy * push * 1.8; }
        else if (!hubIds.has(aId) && !hubIds.has(bId)) { a.x += dx * push; a.y += dy * push; b.x -= dx * push; b.y -= dy * push; }
        moved = true;
      }
    }
    if (!moved) break;
  }

  // Seguridad de límites, preservando el aire entre grupos.
  ids.forEach(id => {
    const p = pos[id] || { x: CANVAS.w / 2, y: CANVAS.h / 2 };
    const margin = nodeR[id] + 96;
    p.x = Math.max(margin, Math.min(CANVAS.w - margin, p.x));
    p.y = Math.max(margin, Math.min(CANVAS.h - margin, p.y));
    layout[id] = p;
  });

  // Microajustes simétricos para evitar que los nodos de borde queden
  // comprimidos contra el límite del canvas en estructuras con muchos enlaces.
  const edgeOffsets = {
    'EFC::Servicios sociales': { x: 260, y: 544 },
    'ESECI::Producción artesanal': { x: -110, y: -70 },
    'ESECI::Sistema de educación': { x: 30, y: -80 }
  };
  Object.entries(edgeOffsets).forEach(([id, delta]) => {
    if (layout[id]) { layout[id].x += delta.x; layout[id].y += delta.y; }
  });

  // ViewBox estable, panorámico y equivalente al encuadre de referencia.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  ids.forEach(id => {
    const p = layout[id], r = nodeR[id] + 112;
    minX = Math.min(minX, p.x - r); maxX = Math.max(maxX, p.x + r);
    minY = Math.min(minY, p.y - r); maxY = Math.max(maxY, p.y + r);
  });
  BASE_VB = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  vb = Object.assign({}, BASE_VB);
}

// Distribución integrada de referencia: cuatro hubs descentralizados y una
// malla abierta de satélites. Las posiciones son deterministas y no alteran
// endpoints, citas, páginas ni la lógica de activación de las relaciones.
function computeLayoutClean() {
  const centers = {
    EEP: { x: 520, y: 470 }, EFC: { x: 1540, y: 470 },
    ESECI: { x: 560, y: 1190 }, EIP: { x: 1570, y: 1160 }
  };
  const slots = [
    [-350,-220],[-175,-330],[20,-350],[215,-285],[360,-150],
    [-390,20],[-220,120],[-25,65],[170,125],[360,50],
    [-330,245],[-150,340],[45,275],[220,345],[370,220]
  ];
  const ids = Object.keys(model.concepts);
  const hubIds = new Set();
  SYS.forEach(sys => {
    const center = centers[sys];
    const group = model.systems[sys].concepts.slice().sort((a,b) =>
      (model.concepts[b].deg - model.concepts[a].deg) || a.localeCompare(b));
    if (!group.length) return;
    const hub = group[0];
    hubIds.add(hub);
    layout[hub] = { x:center.x, y:center.y };
    group.slice(1).forEach((id, i) => {
      const s = slots[i % slots.length];
      const cycle = Math.floor(i / slots.length);
      layout[id] = { x:center.x + s[0] + cycle * 42, y:center.y + s[1] + cycle * 30 };
    });
  });
  ids.forEach(id => {
    const c = model.concepts[id];
    const p = layout[id] || { x:1320, y:1140 };
    const margin = nodeR[id] + 70;
    p.x = Math.max(margin, Math.min(2220 - margin, p.x));
    p.y = Math.max(margin, Math.min(1530 - margin, p.y));
    layout[id] = p;
  });
  for (let pass = 0; pass < 3; pass++) {
    ids.forEach((aId, i) => ids.slice(i + 1).forEach(bId => {
      const a = layout[aId], b = layout[bId];
      const min = nodeR[aId] + nodeR[bId] + 28;
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d >= min) return;
      if (!d) { dx = 1; dy = 0; d = 1; }
      const push = (min - d) / d * 0.5;
      if (!hubIds.has(aId)) { a.x -= dx * push; a.y -= dy * push; }
      if (!hubIds.has(bId)) { b.x += dx * push; b.y += dy * push; }
    }));
  }
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  ids.forEach(id => { const p=layout[id], r=nodeR[id]+100;
    minX=Math.min(minX,p.x-r); maxX=Math.max(maxX,p.x+r);
    minY=Math.min(minY,p.y-r); maxY=Math.max(maxY,p.y+r);
  });
  // El viewBox se ajusta al área real ocupada por la red para eliminar
  // franjas vacías y hacer que los 47 conceptos llenen el canvas.
  BASE_VB = { x:minX, y:minY, w:maxX-minX, h:maxY-minY };
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

function computeDrift() {
  Object.values(model.concepts).forEach(c => {
    const p = layout[c.id];
    drawPos[c.id] = { x: p.x, y: p.y };
  });
}

function render() {
  computeDrift();
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
    const a = drawPos[r.from] || layout[r.from], b = drawPos[r.to] || layout[r.to];
    const rA = nodeR[r.from];
    const rB = nodeR[r.to];
    const d = curvePath(a, b, rA, rB);
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
    const glow = el('path', { class: glowCls.join(' '), d, 'data-rel': r.id });

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
      const activeRels = c.rels.filter(relActive).length;
      const isolated = activeRels === 0;
      const off = offNodes.has(id);
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
        class: cls.join(' '),
        transform: `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`,
        style: `--sys:${model.systems[s].color};--node-filter:url(#glow-${model.systems[s].color.replace('#', '')})`,
        'data-id': id
      });

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

      // Ciclo de interacción robusto: 1 clic = enfocar; 2 = deseleccionar;
      // 3 clics = ocultar el nodo y su cascada de conexiones. Se usa
      // event.detail para no depender de una ventana artificial de 320 ms.
      let fallbackCount = 0;
      let fallbackTimer = null;
      g.addEventListener('click', ev => {
        ev.stopPropagation();
        const count = Number(ev.detail) || 0;
        if (count >= 3) {
          fallbackCount = 0;
          if (fallbackTimer) clearTimeout(fallbackTimer);
          hideNodeAndConnections(id);
          return;
        }
        if (count === 2) {
          fallbackCount = 0;
          if (fallbackTimer) clearTimeout(fallbackTimer);
          deselectLocal(id);
          clearFocus();
          return;
        }
        if (count === 1) {
          focusConcept(id);
          return;
        }
        // Fallback para eventos sintéticos o navegadores que no entreguen detail.
        fallbackCount += 1;
        if (fallbackTimer) clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(() => {
          if (fallbackCount >= 3) hideNodeAndConnections(id);
          else if (fallbackCount === 2) { deselectLocal(id); clearFocus(); }
          else focusConcept(id);
          fallbackCount = 0;
        }, 650);
      });

      gNodes.appendChild(g);
    });
  });

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

function updateHiddenNodesIndicator() {
  const indicator = document.getElementById('hiddenNodesIndicator');
  const text = document.getElementById('hiddenNodesText');
  if (!indicator || !text) return;
  const count = offNodes.size;
  indicator.classList.toggle('is-clear', count === 0);
  indicator.classList.toggle('has-hidden', count > 0);
  text.textContent = count ? `${count} nodo${count === 1 ? '' : 's'} oculto${count === 1 ? '' : 's'}` : 'Sin nodos ocultos';
  indicator.title = count ? 'Nodos ocultados con triple clic' : 'Todos los nodos visibles';
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
  set('metricRelations', total);
  set('metricNodes', comp.totalNodes);
  set('metricNodesSub', `de ${totalNodes} conceptos activos`);
  set('metricConnectivity', pct + '%');
  set('metricConnectivityValue', `${active} activas`);
  const metricRing = document.querySelector('.metric-ring');
  if (metricRing) metricRing.style.setProperty('--connectivity', pct + '%');
  updateHiddenNodesIndicator();

  const bar = document.getElementById('mBar');
  bar.style.width = pct + '%';
  bar.style.background = pct === 100 ? 'var(--eep)' : pct >= 60 ? 'var(--eseci)' : 'var(--danger)';

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
function structuresTouched(c) {
  const set = new Set();
  c.rels.forEach(r => {
    const otro = r.from === c.id ? r.sD : r.sO;
    if (otro !== c.sys) set.add(otro);
  });
  return set;
}
const isBridge = c => structuresTouched(c).size >= 3;

function updateBridgePanel() {
  const box = document.getElementById('bridgeList');
  if (!box) return;
  const lista = Object.values(model.concepts)
    .filter(isBridge)
    .map(c => ({ c, deg: c.rels.length }))
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

  if (!off.length) {
    title.textContent = 'ESECI articula más conexiones';
    summary.textContent = 'La ESECI tiene más conexiones porque el POT usa el ordenamiento territorial para impulsar la economía, el empleo y la productividad. Por eso relaciona cosas como la movilidad, la vivienda, los equipamientos y la conectividad con las actividades económicas. En cambio, la EEP cumple principalmente una función ambiental: ordenar y proteger el territorio a través del agua, los ecosistemas y la biodiversidad.';
    animateFindingElement(document.getElementById('networkFinding'));
    return;
  }

  if (off.length === 1 && findings[off[0]]) {
    title.textContent = findings[off[0]].title;
    summary.textContent = findings[off[0]].text + ` En esta simulación desaparecen ${total - active} relaciones.`;
    animateFindingElement(document.getElementById('networkFinding'));
    return;
  }

  title.textContent = 'Escenario combinado';
  summary.textContent = `Al apagar ${off.join(' + ')}, desaparecen ${total - active} relaciones y quedan ${active} activas. La red muestra la dependencia interna de este modelo.`;
  animateFindingElement(document.getElementById('networkFinding'));
}

// ---------------------------------------------------------------------
// 5. INTERACCIÓN
// ---------------------------------------------------------------------
function showStructureInsight() {
  // El hallazgo superior (#networkFinding) es el único hallazgo contextual.
  // El popup lateral anterior duplicaba la información y tapaba el escenario.
  const popup = document.getElementById('eseCIInsight');
  if (popup) popup.classList.add('is-hidden');
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

function initPanZoom() {
  const stage = document.getElementById('stage');
  const svg = document.getElementById('svg');

  let dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0;
  stage.addEventListener('pointerdown', e => {
    dragging = true;
    moved = false;
    sx = e.clientX; sy = e.clientY; ox = vb.x; oy = vb.y;
    // No capturamos el puntero todavía: así un clic sobre un nodo llega al SVG.
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
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
    dragging = false;
    moved = false;
    stage.classList.remove('panning');
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
