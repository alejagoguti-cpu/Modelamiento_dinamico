/* =======================================================================
   RAPOT · MÓDULO 07 — Simulador de las 4 Estructuras del POT
   Base de datos: Red_4_Estructuras_POT_CORREGIDA.xlsx (hoja RELACIONES)
   32 relaciones · 58 conceptos · 4 sistemas
   No se inventan relaciones ni se alteran frases o páginas.
   ======================================================================= */

// GENERADO AUTOMÁTICAMENTE DESDE Red_4_Estructuras_POT_CORREGIDA.xlsx (hoja RELACIONES)
// NO editar a mano: frases y páginas son literales del Excel.
const POT_DATA = {
 "sistemas": {
  "EEP": {
   "nombre": "Estructura Ecológica Principal",
   "color": "#22B88A",
   "funcion": "Base ecológica / resiliencia"
  },
  "EFC": {
   "nombre": "Estructura Funcional y del Cuidado",
   "color": "#3B82F6",
   "funcion": "Soporte funcional / articulación"
  },
  "EIP": {
   "nombre": "Estructura Integradora de Patrimonios",
   "color": "#A855F7",
   "funcion": "Integración social y territorial"
  },
  "ESECI": {
   "nombre": "Estructura Socioeconómica, Creativa y de Innovación",
   "color": "#D9A441",
   "funcion": "Resultado económico / productivo"
  }
 },
 "conceptos": {
  "EEP": [
   "Agua / ecosistemas",
   "Agua / equilibrio ecosistémico",
   "Ambiente",
   "Ambiente / resiliencia",
   "Calidad del aire / ambiente",
   "Ecosistemas",
   "Ecosistemas / recursos naturales",
   "Función ambiental",
   "Recursos naturales / agua",
   "Recursos naturales / ecosistemas",
   "Áreas de importancia ambiental",
   "Áreas naturales / biodiversidad"
  ],
  "EFC": [
   "Cuidado / infraestructura",
   "Cultura / equipamientos",
   "Equipamientos",
   "Equipamientos / cuidado",
   "Espacio público",
   "Espacio público / cuidado",
   "Espacio público / movilidad",
   "Movilidad / infraestructura",
   "Movilidad limpia / corredores verdes",
   "Movilidad multimodal",
   "Movilidad sostenible",
   "Plan Maestro de Cuidado",
   "Plan Maestro de Hábitat y Servicios Públicos",
   "Plan Maestro de Movilidad",
   "Sistema de movilidad",
   "Soporte territorial / ciudad",
   "Transporte / estaciones"
  ],
  "EIP": [
   "Cultura / equipamientos",
   "Cultura / prácticas",
   "Patrimonio",
   "Patrimonio / cultura",
   "Patrimonio / dinámicas sociales",
   "Patrimonio / identidad territorial",
   "Patrimonio / memoria",
   "Patrimonio cultural / natural",
   "Patrimonio local / dinámicas comunitarias",
   "Patrimonio natural"
  ],
  "ESECI": [
   "Actividades productivas",
   "Aglomeraciones económicas",
   "Aglomeración económica / empleo",
   "Desarrollo socioeconómico",
   "Dinámicas económicas",
   "Economía / productividad",
   "Economía / turismo",
   "Economía circular",
   "Empresas / actividades productivas",
   "Mezcla de usos / aglomeración económica",
   "Producción / actividades productivas",
   "Producción / consumo de alimentos",
   "Producción sostenible",
   "Productividad / aglomeración",
   "Productividad / empleo",
   "Reactivación económica",
   "Tejido económico local",
   "Tejidos productivos / empleo",
   "Vida productiva"
  ]
 },
 "relaciones": [
  {
   "id": 0,
   "sO": "EEP",
   "cO": "Agua / equilibrio ecosistémico",
   "sD": "ESECI",
   "cD": "Desarrollo socioeconómico",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "21",
   "frase": "“La eep es la integración de las áreas de origen natural y antrópico que tienen una oferta ambiental significativa, es ordenadora del territorio y garante de los equilibrios ecosistémicos, del agua y la riqueza hídrica, que es la primera ordenante del territorio, para una ocupación y manejo sostenible de los recursos naturales renovables, base del desarrollo socioeconómico de la población.”"
  },
  {
   "id": 1,
   "sO": "ESECI",
   "cO": "Producción / consumo de alimentos",
   "sD": "EEP",
   "cD": "Ecosistemas / recursos naturales",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#2563EB",
   "pag": "21",
   "frase": "“Nuestro pot promueve actividades como el viverismo, las huertas, la agricultura urbana y familiar, y las actividades agroecológicas dentro de un modelo de producción, comercialización y consumo de alimentos que contribuyan a la soberanía alimentaria en comunidades organizadas que aprovechen los residuos, optimicen los recursos y no afecten los ecosistemas.”"
  },
  {
   "id": 2,
   "sO": "ESECI",
   "cO": "Producción / actividades productivas",
   "sD": "EEP",
   "cD": "Ecosistemas",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#2563EB",
   "pag": "31",
   "frase": "“con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”"
  },
  {
   "id": 3,
   "sO": "EEP",
   "cO": "Recursos naturales / agua",
   "sD": "ESECI",
   "cD": "Economía / productividad",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "31",
   "frase": "“la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”"
  },
  {
   "id": 4,
   "sO": "EFC",
   "cO": "Movilidad sostenible",
   "sD": "EEP",
   "cD": "Calidad del aire / ambiente",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#2563EB",
   "pag": "22",
   "frase": "“En Bogotá cada año registramos 2.300 muertes prematuras atribuibles a la contaminación del aire, causada en un 60 % por la movilidad basada en el uso de combustibles fósiles. Para cambiar esa tendencia es indispensable cambiar nuestros hábitos de movilidad, incrementar la caminata y el transporte en modos públicos y colectivos que usen energías limpias y renovables, la descarbonización de la movilidad, el drenaje sostenible, el tratamiento de los residuos domiciliarios, el manejo técnico del sistema de saneamiento básico y el reverdecimiento y renaturalización del espacio público.”"
  },
  {
   "id": 5,
   "sO": "EFC",
   "cO": "Espacio público / movilidad",
   "sD": "EEP",
   "cD": "Función ambiental",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#2563EB",
   "pag": "22",
   "frase": "“Para reverdecer a Bogotá vamos a implementar el arbolado, la jardinería, las huertas y toda la agroecología urbana como un elemento fundamental que contribuya a consolidar la función ambiental de los elementos de espacio público.”"
  },
  {
   "id": 6,
   "sO": "EEP",
   "cO": "Agua / ecosistemas",
   "sD": "EFC",
   "cD": "Espacio público / movilidad",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "#2563EB",
   "pag": "22",
   "frase": "“Las cinco transformaciones urbanas que iniciamos protegen el agua y consolidan el sistema hídrico mediante estrategias de conectividad y complementariedad de los ecosistemas como articuladores con su entorno regional...”"
  },
  {
   "id": 7,
   "sO": "EFC",
   "cO": "Movilidad limpia / corredores verdes",
   "sD": "EEP",
   "cD": "Ambiente / resiliencia",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#2563EB",
   "pag": "22",
   "frase": "“El pot y el pmss ponen como eje estructurador de la movilidad al peatón y privilegian el espacio público para la movilidad y los desplazamientos en modos de transporte activos, de cero y bajas emisiones, el desarrollo de corredores verdes...”"
  },
  {
   "id": 8,
   "sO": "EIP",
   "cO": "Patrimonio cultural / natural",
   "sD": "EEP",
   "cD": "Ambiente",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#2563EB",
   "pag": "30",
   "frase": "“El pot busca intervenir estratégicamente, vinculando las dinámicas patrimoniales, ambientales, sociales y culturales para proteger y garantizar la permanencia y calidad de vida de los pobladores originales de las zonas de renovación urbana y actuaciones estratégicas.”"
  },
  {
   "id": 9,
   "sO": "EEP",
   "cO": "Áreas naturales / biodiversidad",
   "sD": "EIP",
   "cD": "Patrimonio natural",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#2563EB",
   "pag": "196",
   "frase": "“la eip inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio.”"
  },
  {
   "id": 10,
   "sO": "EIP",
   "cO": "Patrimonio / identidad territorial",
   "sD": "EEP",
   "cD": "Áreas de importancia ambiental",
   "dir": "→",
   "tipo": "Resiliencia",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "#2563EB",
   "pag": "200",
   "frase": "“La insistencia en exaltar las distintas maneras de interpretar el modo en que nos hemos adaptado al territorio está dada por un presente que nos exige mayores esfuerzos en la valoración de las áreas de importancia ambiental y de los patrimonios culturales como respuesta, fuente y medio para aportar al imperativo de detener el deterioro del hábitat global...”"
  },
  {
   "id": 11,
   "sO": "EIP",
   "cO": "Patrimonio / dinámicas sociales",
   "sD": "EFC",
   "cD": "Espacio público / cuidado",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "30",
   "frase": "“Buscamos la revitalización de las áreas consolidadas para mejorar la calidad ambiental y paisajística de los barrios, la seguridad en el espacio público, aumentar la oferta de espacios de encuentro y los servicios sociales del cuidado y aportar a la reactivación económica.”"
  },
  {
   "id": 12,
   "sO": "EFC",
   "cO": "Movilidad / infraestructura",
   "sD": "EIP",
   "cD": "Patrimonio / cultura",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "121",
   "frase": "“Con el Plan de Ordenamiento Territorial (pot) damos un salto histórico para ordenar la ciudad integrando criterios ambientales, patrimoniales, de movilidad, seguridad y productividad, y sumamos el cuidado como un eje estructural en la planeación urbana.”"
  },
  {
   "id": 13,
   "sO": "EIP",
   "cO": "Patrimonio / memoria",
   "sD": "EFC",
   "cD": "Espacio público",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "196",
   "frase": "“espacios públicos para la itinerancia próxima y segura, lugares que animen la memoria y expresen los valores identitarios”"
  },
  {
   "id": 14,
   "sO": "EFC",
   "cO": "Cultura / equipamientos",
   "sD": "EIP",
   "cD": "Patrimonio / cultura",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "128",
   "frase": "“26 equipamientos culturales y 14 infraestructuras para atender a niñas y niños, personas mayores y personas con discapacidad.”"
  },
  {
   "id": 15,
   "sO": "EFC",
   "cO": "Movilidad multimodal",
   "sD": "ESECI",
   "cD": "Empresas / actividades productivas",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "30",
   "frase": "“para que se instalen empresas y actividades productivas generadoras de trabajo. Y que, en todo caso, las diversas zonas de la ciudad estén conectadas por un sistema multimodal de transporte público, colectivo, de energías limpias y renovables basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorrutas.”"
  },
  {
   "id": 16,
   "sO": "ESECI",
   "cO": "Mezcla de usos / aglomeración económica",
   "sD": "EFC",
   "cD": "Soporte territorial / ciudad",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "30",
   "frase": "“La mezcla de usos del suelo es la garantía de soporte territorial para la aglomeración económica productiva especializada y diversificada y la inclusión de todas las actividades y oportunidades en el territorio.”"
  },
  {
   "id": 17,
   "sO": "EFC",
   "cO": "Equipamientos / cuidado",
   "sD": "ESECI",
   "cD": "Reactivación económica",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "30",
   "frase": "“Buscamos la revitalización de las áreas consolidadas para mejorar la calidad ambiental y paisajística de los barrios, la seguridad en el espacio público, aumentar la oferta de espacios de encuentro y los servicios sociales del cuidado y aportar a la reactivación económica.”"
  },
  {
   "id": 18,
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Dinámicas económicas",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "122",
   "frase": "“Garantizar equipamientos y servicios de cuidado en cada upl al nivel más próximo a la ciudadanía fue el reto y el logro, que se suman a los equipamientos de seguridad y justicia, a la malla vial local e intermedia, a un espacio público funcional por habitante y también a la dinámica comercial local.”"
  },
  {
   "id": 19,
   "sO": "EFC",
   "cO": "Plan Maestro de Movilidad",
   "sD": "ESECI",
   "cD": "Productividad / empleo",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "165",
   "frase": "“a) Impacto en la productividad por tiempos de viaje”"
  },
  {
   "id": 20,
   "sO": "EFC",
   "cO": "Plan Maestro de Movilidad",
   "sD": "ESECI",
   "cD": "Aglomeraciones económicas",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "165",
   "frase": "“b) Consolidación de aglomeraciones por conectividad”"
  },
  {
   "id": 21,
   "sO": "EFC",
   "cO": "Plan Maestro de Hábitat y Servicios Públicos",
   "sD": "ESECI",
   "cD": "Tejido económico local",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "165",
   "frase": "“c) Promover la consolidación de tejido económico local”"
  },
  {
   "id": 22,
   "sO": "EFC",
   "cO": "Plan Maestro de Cuidado",
   "sD": "ESECI",
   "cD": "Dinámicas económicas",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "165",
   "frase": "“a) Equipamiento como detonante de dinámicas económicas”"
  },
  {
   "id": 23,
   "sO": "EFC",
   "cO": "Transporte / estaciones",
   "sD": "ESECI",
   "cD": "Tejidos productivos / empleo",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "167",
   "frase": "“La inversión en infraestructura para la movilidad es la principal apuesta por la productividad futura de la ciudad.”"
  },
  {
   "id": 24,
   "sO": "EFC",
   "cO": "Sistema de movilidad",
   "sD": "ESECI",
   "cD": "Aglomeración económica / empleo",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "167",
   "frase": "“Los mismos ejes de transporte masivo y los orígenes-destino definidos por las estaciones benefician de manera particular ciertos flujos e interdependencias en el territorio, lo que consolidará y potenciará ciertas zonas de la ciudad.”"
  },
  {
   "id": 25,
   "sO": "EFC",
   "cO": "Sistema de movilidad",
   "sD": "ESECI",
   "cD": "Productividad / aglomeración",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "167",
   "frase": "“Esto mejorará significativamente la calidad de vida y la productividad de la población, que hará uso de estas infraestructuras; también, consolidará las dinámicas de aglomeración económica que concentran el tejido empresarial, y con ello, las fuentes de generación de empleo...”"
  },
  {
   "id": 26,
   "sO": "EIP",
   "cO": "Patrimonio local / dinámicas comunitarias",
   "sD": "ESECI",
   "cD": "Producción sostenible",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "31",
   "frase": "“Por eso promovemos la ciudad como destino turístico inteligente, sostenible, de salud y de negocios que reconozca el patrimonio local, las dinámicas comunitarias, los sistemas cooperativos de producción sostenible como huertas productivas, bancos de semillas nativas y plantas de uso medicinal, entre otros.”"
  },
  {
   "id": 27,
   "sO": "EIP",
   "cO": "Patrimonio",
   "sD": "ESECI",
   "cD": "Vida productiva",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "196",
   "frase": "“Esta estructura persigue la gestión integral de los patrimonios, lo que al cabo fortalece los vínculos sociales y la vida productiva de los grupos poblacionales que habitan, se relacionan y les dan sentido a los territorios urbanos y rurales del Distrito Capital.”"
  },
  {
   "id": 28,
   "sO": "ESECI",
   "cO": "Economía / turismo",
   "sD": "EIP",
   "cD": "Patrimonio",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "205",
   "frase": "“Para los sectores de cultura, economía y turismo es una escuela de formación de líderes y lideresas sustentada en la presencia de patrimonios que cuentan el origen de sus pobladores...”"
  },
  {
   "id": 29,
   "sO": "EIP",
   "cO": "Cultura / prácticas",
   "sD": "ESECI",
   "cD": "Actividades productivas",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "#F59E0B",
   "pag": "30",
   "frase": "“las dinámicas patrimoniales, ambientales, sociales y culturales”"
  },
  {
   "id": 30,
   "sO": "EFC",
   "cO": "Cuidado / infraestructura",
   "sD": "EIP",
   "cD": "Cultura / equipamientos",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "#F59E0B",
   "pag": "121",
   "frase": "“...integrando criterios ambientales, patrimoniales, de movilidad, seguridad y productividad, y sumamos el cuidado como un eje estructural en la planeación urbana.”"
  },
  {
   "id": 31,
   "sO": "EEP",
   "cO": "Recursos naturales / ecosistemas",
   "sD": "ESECI",
   "cD": "Economía circular",
   "dir": "→",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "#F59E0B",
   "pag": "21",
   "frase": "“el nuevo pot pone fin a ese absurdo y crea en Doña Juana un parque tecnológico para que con diversas tecnologías transformemos los residuos en materiales reutilizables que regresen a la tierra en forma de abonos y fertilizantes, y a la industria y los hogares en diversos materiales reutilizables en una economía circular.”"
  }
 ]
};

const SYS = ['EEP', 'EFC', 'EIP', 'ESECI'];

// Estado del simulador: true = sistema activo
const state = { EEP: true, EFC: true, EIP: true, ESECI: true };
let lastToggledOff = null;
let selectedRel = null;

// ---------------------------------------------------------------------
// 1. MODELO: nodos (sistemas + conceptos) y aristas
// ---------------------------------------------------------------------
const conceptId = (sis, con) => sis + '::' + con;

const model = { systems: {}, concepts: {}, relations: [] };

function buildModel() {
  // idempotente: reconstruye desde cero para no duplicar relaciones si se
  // vuelve a invocar la inicialización
  model.systems = {};
  model.concepts = {};
  model.relations = [];

  SYS.forEach(s => {
    model.systems[s] = Object.assign({ code: s, concepts: [] }, POT_DATA.sistemas[s]);
  });

  SYS.forEach(s => {
    (POT_DATA.conceptos[s] || []).forEach(c => {
      const id = conceptId(s, c);
      model.concepts[id] = { id, sys: s, label: c, rels: [] };
      model.systems[s].concepts.push(id);
    });
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

// Una relación está activa solo si AMBOS sistemas (origen y destino) están ON
const relActive = r => state[r.sO] && state[r.sD];

// ---------------------------------------------------------------------
// 2. LAYOUT: UNA SOLA RED CIRCULAR.
//    Los 4 sistemas van en un círculo pequeño al centro; sus conceptos se
//    reparten en dos anillos, cada sistema dentro de su propio sector
//    angular. Así la red se lee integrada (no como 4 grupos sueltos) y
//    todos los conceptos quedan visibles y bien separados.
// ---------------------------------------------------------------------
const SYS_ORDER = ['EEP', 'EFC', 'ESECI', 'EIP']; // EFC y ESECI juntos: concentran el flujo más pesado
const R1 = 310;      // anillo interior de conceptos
const R2 = 425;      // anillo exterior de conceptos

const CON_R = 12;    // radio del nodo de concepto

const layout = {};
const sectors = {};  // sistema -> {a0, a1, mid}

function computeLayout() {
  const total = SYS.reduce((n, s) => n + model.systems[s].concepts.length, 0);

  let acc = -Math.PI / 2;
  SYS_ORDER.forEach(s => {
    const span = (2 * Math.PI * model.systems[s].concepts.length) / total;
    sectors[s] = { a0: acc, a1: acc + span, mid: acc + span / 2 };
    acc += span;
  });

  SYS_ORDER.forEach(s => {
    const sec = sectors[s];
    const ids = model.systems[s].concepts;
    const n = ids.length;

    // reparto entre los dos anillos proporcional al radio, para que la
    // separación entre conceptos vecinos sea pareja en ambos
    const n1 = Math.max(1, Math.round((n * R1) / (R1 + R2)));
    const n2 = n - n1;

    // ordenar por "hacia dónde apunta" cada concepto reduce cruces
    const pref = {};
    ids.forEach(id => {
      const c = model.concepts[id];
      let v = 0, k = 0;
      c.rels.forEach(r => {
        const other = r.sO === s ? r.sD : r.sO;
        if (other === s || !sectors[other]) return;
        let d = sectors[other].mid - sec.mid;
        while (d > Math.PI) d -= 2 * Math.PI;
        while (d < -Math.PI) d += 2 * Math.PI;
        v += d; k++;
      });
      pref[id] = k ? v / k : 0;
    });
    const sorted = ids.slice().sort((a, b) => pref[a] - pref[b] || a.localeCompare(b));

    // los más conectados al anillo interior (quedan más cerca del centro)
    const byDeg = sorted.slice().sort((a, b) =>
      model.concepts[b].rels.length - model.concepts[a].rels.length);
    const inner = new Set(byDeg.slice(0, n1));

    const ring1 = sorted.filter(id => inner.has(id));
    const ring2 = sorted.filter(id => !inner.has(id));

    const place = (arr, R) => {
      const k = arr.length;
      arr.forEach((id, i) => {
        const ang = sec.a0 + (sec.a1 - sec.a0) * ((i + 0.5) / k);
        layout[id] = { x: R * Math.cos(ang), y: R * Math.sin(ang) };
      });
    };
    place(ring1, R1);
    place(ring2, R2);
  });
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
    const d = curvePath(a, b, CON_R, CON_R);
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
      const isolated = !c.rels.some(relActive);
      const g = el('g', {
        class: 'concept node-appear' + (isolated ? ' isolated' : ''),
        transform: `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`,
        style: `--sys:${model.systems[s].color}`,
        'data-id': id
      });
      g.appendChild(el('circle', { r: CON_R }));

      const lines = wrapLabel(c.label);
      lines.forEach((ln, i) => {
        const t = el('text', { y: CON_R + 10 + i * 8.6 });
        t.textContent = ln;
        g.appendChild(t);
      });

      g.addEventListener('mouseenter', ev => showTooltip(ev,
        `<div class="tt-sys" style="color:${model.systems[s].color}">${s}</div>${esc(c.label)}<br>` +
        `<span style="color:#8891a5">${c.rels.filter(relActive).length} relación(es) activa(s)${isolated ? ' · AISLADO' : ''}</span>`));
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
  lastToggledOff = null;
  clearEvidence();
  updateSwitches();
  render();
  updateMetrics();
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
    <div class="ev-concepts"><b>${esc(r.cO)}</b> ${r.dir} <b>${esc(r.cD)}</b></div>
    <div class="ev-meta">
      <div><div class="k">Tipo</div><div class="v" style="color:var(--${kind})">${r.tipo}</div></div>
      <div><div class="k">Línea</div><div class="v">${r.evid}</div></div>
      <div><div class="k">Trazo</div><div class="v">${r.linea}</div></div>
      <div><div class="k">Página impresa</div><div class="v">${r.pag}</div></div>
    </div>
    <div class="ev-quote ${kind}">${esc(r.frase)}</div>
    <div class="ev-src">Frase literal del POT Bogotá Reverdece 2022–2035 · página impresa ${r.pag}</div>`;

  render();
}

function clearEvidence() {
  selectedRel = null;
  document.getElementById('evBox').innerHTML =
    `<p class="ev-empty">Haz clic en cualquier línea de la red para ver la frase exacta del POT que sustenta esa relación, con su página impresa.</p>`;
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
// 6. TOOLTIP
// ---------------------------------------------------------------------
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
const BASE_VB = { x: -500, y: -500, w: 1000, h: 1000 };
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
