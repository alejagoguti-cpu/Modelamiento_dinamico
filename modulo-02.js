/* ==========================================================
   MÓDULO 02 — MEDIR LA RED — TENSIONES INTERNAS DEL POT
   (v2: misma red de nodos del Módulo 01 — 37 nodos, 4 estructuras
   con sus colores — pero cada línea es una tensión medida contra
   el texto del POT: incoherencia, contradicción, desconexión,
   jerarquía implícita o periférico discursivo.)

   Estructuras (colores de capa, iguales al Módulo 01):
   1. Estructura Ecológica Principal ................ VERDE  (#4ade80)
   2. Estructura Funcional y del Cuidado ............ AZUL   (#5b8def)
   3. Estructura Socioeconómica Creativa e Innovación NARANJA(#ef9552)
   4. Estructura Integradora de Patrimonio .......... MORADA (#a276f2)

   Convenciones de tensión:
       Incoherencia:          rojo      #ef4444  continua con flecha
       Contradicción:         rosa      #f76fb0  continua con flecha
       Desconexión:           azul      #5b8def  discontinua con flecha
       Jerarquía implícita:   morado    #a276f2  doble línea
       Periférico discursivo: amarillo  #f5c945  punteada con flecha
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";

/* -------- Nodos: los mismos 37 componentes de las 4 estructuras -------- */
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

/* -------- Estructuras: nombre y color de capa -------- */
const STRUCT_STYLE = {
  e1: { color: "#4ade80", label: "1. Ecológica Principal", tag: "ECOLÓGICA" },
  e2: { color: "#5b8def", label: "2. Funcional y del Cuidado", tag: "FUNCIONAL Y CUIDADO" },
  e3: { color: "#ef9552", label: "3. Socioeconómica Creativa", tag: "SOCIOECONÓMICA" },
  e4: { color: "#a276f2", label: "4. Integradora de Patrimonio", tag: "PATRIMONIO" },
};

/* -------- Tipos de tensión -------- */
const TYPE_STYLE = {
  incoherencia:  { color: "#ef4444", width: 2.6, label: "Incoherencia", dash: null },
  contradiccion: { color: "#f76fb0", width: 2.6, label: "Contradicción", dash: null },
  desconexion:   { color: "#5b8def", width: 2.4, label: "Desconexión",   dash: "6,5" },
  jerarquia:     { color: "#a276f2", width: 1.8, label: "Jerarquía implícita", dash: null, double: true },
  periferico:    { color: "#f5c945", width: 2.4, label: "Periférico discursivo", dash: "2,4" },
};

/* -------- Aristas: tensiones de las 4 estructuras -------- */
const RAW_EDGES = [
  /* === 1. Estructura Ecológica Principal (verde): tensiones === */
  { s: "cerros",     t: "rios",       type: "contradiccion", directa: true,  cat: "e1", pagina: "186", sustento: "La estructura ecológica se declara principal y rectora del ordenamiento, pero el texto la describe como soporte del crecimiento urbano y no como condición límite que detiene la urbanización." },
  { s: "quebradas",  t: "humedales",  type: "desconexion",   directa: true,  cat: "e1", pagina: "186", sustento: "Las quebradas de la Sabana se tratan como canales a entubar; el humedal receptor queda fuera de la medición de caudal y de la gestión de fuente." },
  { s: "humedales",  t: "rios",       type: "incoherencia",  directa: true,  cat: "e1", pagina: "186", sustento: "Se reconoce que los humedales regulan los ríos, pero la EEP no prioriza el mantenimiento de sus láminas de agua como tarea estructural." },
  { s: "humedales",  t: "resiliencia",type: "desconexion",   directa: true,  cat: "e1", pagina: "186", sustento: "Los humedales se declaran áreas de resiliencia climática, pero el POT no asigna acciones específicas de restauración hídrica para cumplir esa función." },
  { s: "rios",       t: "paramos",    type: "contradiccion", directa: true,  cat: "e1", pagina: "186", sustento: "Los ríos de la Sabana nacen en los complejos de páramos, pero la planificación urbana del POT no coordina con la ordenación de la cuenca alta." },
  { s: "bosques",    t: "coberturas", type: "periferico",    directa: true,  cat: "e1", pagina: "186", sustento: "Los bosques urbanos aparecen en el diagnóstico como cobertura y pierden protagonismo en las decisiones de suelo urbano." },
  { s: "resiliencia",t: "coberturas", type: "incoherencia",  directa: true,  cat: "e1", pagina: "186", sustento: "La resiliencia climática depende de las coberturas vegetales, pero el POT urbaniza sobre suelos de cobertura priorizando la edificabilidad." },
  { s: "reservas",   t: "coberturas", type: "jerarquia",     directa: true,  cat: "e1", pagina: "186", sustento: "Las reservas forestales quedan subordinadas al esquema de crecimiento: el suelo protegido se convierte en reserva para 'desarrollo futuro'." },
  { s: "cerros",     t: "areas",      type: "desconexion",   directa: false, cat: "e1", pagina: "186", sustento: "No toda la extensión de los cerros orientales está bajo régimen de protección: la EEP no cierra el anillo de conservación." },
  { s: "areas",      t: "parques_m",  type: "jerarquia",     directa: false, cat: "e1", pagina: "186", sustento: "Los parques ecológicos de montaña dependen de la figura de área protegida, cuyo instrumento de gestión pertenece a otras entidades." },
  { s: "areas",      t: "reservas",   type: "jerarquia",     directa: false, cat: "e1", pagina: "186", sustento: "Las reservas forestales heredan la fragilidad jurídica de las áreas protegidas: su protección resulta condicional." },
  { s: "parques_m",  t: "coberturas", type: "periferico",    directa: false, cat: "e1", pagina: "186", sustento: "Los parques de montaña aportan cobertura al sistema ecológico, pero quedan fuera de las metas de arborización urbana." },
  { s: "humedales",  t: "coberturas", type: "incoherencia",  directa: false, cat: "e1", pagina: "186", sustento: "La vegetación palustre se declara cobertura viva, pero los humedales se gestionan como inventario estático y no como vegetación dinámica." },
  { s: "coberturas", t: "parque_b",   type: "desconexion",   directa: true,  cat: "e1", pagina: "186", sustento: "El parque de borde depende de las coberturas vegetales, pero su delimitación se negocia frente a la expansión urbana." },
  { s: "paramos",    t: "paisajes",   type: "periferico",    directa: false, cat: "e1", pagina: "186", sustento: "Los complejos de páramos sustentan los paisajes sostenibles, pero su tratamiento queda en el discurso regional y no en decisiones de suelo." },

  /* === 2. Estructura Funcional y del Cuidado (azul): tensiones === */
  { s: "redvial",    t: "transporte", type: "incoherencia",  directa: true,  cat: "e2", pagina: "43",   sustento: "El POT propone movilidad sostenible y transporte público de calidad, pero las inversiones prioritarias siguen centradas en la infraestructura vial para el automóvil." },
  { s: "redvial",    t: "equip",      type: "periferico",    directa: true,  cat: "e2", pagina: "43",   sustento: "El acceso vial a los equipamientos se declara como prioridad, pero los equipamientos del cuidado quedan en la periferia de la malla de transporte." },
  { s: "corredores", t: "transporte", type: "contradiccion", directa: true,  cat: "e2", pagina: "30-241", sustento: "Se declara un sistema multimodal de transporte público, pero los corredores verdes se definen por su función de alimentar y complementar al Metro." },
  { s: "corredores", t: "ciclorutas", type: "periferico",    directa: true,  cat: "e2", pagina: "239-241", sustento: "Las ciclorrutas aparecen como componente de los corredores verdes, pero sin metas independientes de red ciclística." },
  { s: "manzanas",   t: "sserv",      type: "desconexion",   directa: true,  cat: "e2", pagina: "126",  sustento: "La cualificación de los servicios sociales se declara sin ninguna conexión con la red de movilidad que determina el acceso físico a esos servicios." },
  { s: "manzanas",   t: "parques",    type: "desconexion",   directa: true,  cat: "e2", pagina: "125",  sustento: "Las Manzanas del Cuidado aprovechan los parques como anclas, pero el parque no es agente de cuidado en el modelo relacional." },
  { s: "equip",      t: "scuidado",   type: "incoherencia",  directa: false, cat: "e2", pagina: "122",  sustento: "Los equipamientos se declaran anclas de los servicios de cuidado, pero la cobertura de los servicios no se territorializa junto con los equipamientos." },
  { s: "equip",      t: "sserv",      type: "jerarquia",     directa: false, cat: "e2", pagina: "126",  sustento: "Los servicios sociales dependen de los equipamientos: el equipamiento ordena el servicio, no la necesidad social." },
  { s: "equip",      t: "vivienda",   type: "desconexion",   directa: true,  cat: "e2", pagina: "126",  sustento: "Se prioriza que los colegios estén cerca de la vivienda, pero el POT expande la vivienda VIS sobre suelo donde los equipamientos llegan después." },
  { s: "vivienda",   t: "servpub",    type: "incoherencia",  directa: false, cat: "e2", pagina: "126",  sustento: "La vivienda se declara conectada a servicios públicos, pero el suelo nuevo de expansión llega antes que las redes de servicios." },
  { s: "vivienda",   t: "ciclorutas", type: "periferico",    directa: false, cat: "e2", pagina: "43",   sustento: "La vivienda se vincula con las ciclorrutas en el discurso, pero la cicloinfraestructura no es condición de la localización de la vivienda." },
  { s: "vivienda",   t: "transporte", type: "contradiccion", directa: false, cat: "e2", pagina: "43",   sustento: "La accesibilidad determina la calidad de vida, pero la vivienda nueva se localiza en la periferia desconectada del sistema de transporte." },

  /* === 3. Estructura Socioeconómica Creativa e Innovación (naranja): tensiones === */
  { s: "financieros",t: "empresariales", type: "jerarquia",  directa: true,  cat: "e3", pagina: "239-241", sustento: "Los centros financieros sostienen los servicios empresariales: la economía creativa queda subordinada al capital financiero consolidado." },
  { s: "empresariales", t: "tecnodistrito", type: "incoherencia", directa: true, cat: "e3", pagina: "239-241", sustento: "El distrito tecnológico se declara motor de innovación, pero sus insumos dependen de los servicios empresariales ya consolidados." },
  { s: "empresariales", t: "industriales", type: "desconexion", directa: true,  cat: "e3", pagina: "239-241", sustento: "Los servicios empresariales sirven a las zonas industriales, pero la reconversión industrial no tiene hoja de ruta en el POT." },
  { s: "tecnodistrito", t: "innovacion", type: "periferico",  directa: true,  cat: "e3", pagina: "239-241", sustento: "La innovación se concentra en el distrito tecnológico: el resto del territorio queda fuera del ecosistema de innovación." },
  { s: "abastecimiento", t: "plazas", type: "desconexion",    directa: false, cat: "e3", pagina: "239-241", sustento: "La relación logística entre centros de abastecimiento y plazas de mercado se infiere: el POT no la hace operativa." },
  { s: "plazas",     t: "empresariales", type: "jerarquia",  directa: false, cat: "e3", pagina: "239-241", sustento: "El comercio local de las plazas de mercado queda subordinado a la economía formal de servicios empresariales." },
  { s: "industriales", t: "turismo", type: "periferico",      directa: false, cat: "e3", pagina: "239-241", sustento: "El turismo industrial aparece como interés económico, pero sin instrumento de ordenamiento específico." },
  { s: "artesanal",  t: "turismo",      type: "periferico",   directa: false, cat: "e3", pagina: "239-241", sustento: "La producción artesanal alimenta el turismo cultural, pero la artesanía no tiene zona de protección productiva." },

  /* === 4. Estructura Integradora de Patrimonio (morada): tensiones === */
  { s: "sitios_sagrados", t: "pinmaterial", type: "contradiccion", directa: true, cat: "e4", pagina: "196", sustento: "El sistema de sitios sagrados sostiene el patrimonio inmaterial, pero el POT inscribe el patrimonio dentro de la EIP y no al revés: la dirección de la relación queda invertida." },
  { s: "pinmaterial",     t: "pnatural",    type: "jerarquia",    directa: true, cat: "e4", pagina: "196", sustento: "El patrimonio inmaterial queda subordinado al patrimonio natural en la jerarquía de la EIP dentro de la EEP." },
  { s: "pnatural",        t: "pecomaterial",type: "incoherencia", directa: true, cat: "e4", pagina: "196", sustento: "El patrimonio natural y el patrimonio ecológico material se declaran integrados, pero sus instrumentos de gestión son distintos y no se articulan." },
];

/* -------- utilidades -------- */
const nodeById = (id) => ODS_NODES.find(n => n.id === id);

/* -------- SVG -------- */
const svg = document.getElementById("networkViz");
svg.setAttribute("viewBox", "0 0 2770 860");

/* -------- crear nodos -------- */
const nodeEls = {};
ODS_NODES.forEach(n => {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "ods-node");
  g.setAttribute("data-id", n.id);
  g.setAttribute("transform", `translate(${n.x}, ${n.y})`);

  const cat = STRUCT_STYLE[n.cat];
  const outer = document.createElementNS(SVG_NS, "circle");
  outer.setAttribute("class", "node-ring");
  outer.setAttribute("r", n.r + 8);
  outer.setAttribute("fill", "none");
  outer.setAttribute("stroke", cat.color);
  outer.setAttribute("stroke-width", "1.5");
  outer.setAttribute("opacity", "0.5");
  g.appendChild(outer);

  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("r", n.r);
  circle.setAttribute("fill", "#121828");
  circle.setAttribute("stroke", cat.color);
  circle.setAttribute("stroke-width", "2");
  g.appendChild(circle);

  const icon = document.createElementNS(SVG_NS, "text");
  icon.setAttribute("class", "node-icon");
  icon.setAttribute("y", -6);
  icon.setAttribute("text-anchor", "middle");
  icon.setAttribute("font-size", "18");
  icon.setAttribute("font-family", "Font Awesome 6 Pro, 'Font Awesome 6 Free', sans-serif");
  icon.setAttribute("fill", cat.color);
  g.appendChild(icon);

  const name = document.createElementNS(SVG_NS, "text");
  name.setAttribute("class", "node-name");
  name.setAttribute("y", n.r + 18);
  name.setAttribute("text-anchor", "middle");
  name.setAttribute("font-size", "11");
  name.setAttribute("fill", cat.color);
  const nameLines = n.name.split("\n");
  nameLines.forEach((line, i) => {
    const tspan = document.createElementNS(SVG_NS, "tspan");
    tspan.setAttribute("x", 0);
    tspan.setAttribute("dy", i === 0 ? 0 : 13);
    tspan.textContent = line;
    name.appendChild(tspan);
  });
  g.appendChild(name);

  svg.appendChild(g);
  nodeEls[n.id] = g;
  attachNodeClickHandler(g, n.id);
  makeDraggable(g, n);
});

/* -------- crear aristas -------- */
const edgeEls = [];
RAW_EDGES.forEach((edge, i) => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];
  const cat = STRUCT_STYLE[edge.cat];

  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edge-group");
  g.setAttribute("data-index", i);
  g.setAttribute("data-type", edge.type);
  g.setAttribute("data-cat", edge.cat);
  g.setAttribute("data-source", edge.s);
  g.setAttribute("data-target", edge.t);
  g.style.setProperty("--edge-color", style.color);

  /* geometría: del borde del nodo fuente al borde del destino */
  const dx = t.x - s.x, dy = t.y - s.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const x1 = s.x + ux * (s.r + 2);
  const y1 = s.y + uy * (s.r + 2);
  const x2 = t.x - ux * (t.r + 2);
  const y2 = t.y - uy * (t.r + 2);
  const px = -uy, py = ux;

  if (style.double) {
    /* doble línea paralela para jerarquías implícitas */
    const off = 3;
    [off, -off].forEach(o => {
      const p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", `M ${x1 + px * o} ${y1 + py * o} L ${x2 + px * o} ${y2 + py * o}`);
      p.setAttribute("class", "ods-edge edge-visual");
      p.setAttribute("stroke", style.color);
      p.setAttribute("stroke-width", style.width);
      p.setAttribute("opacity", "0.85");
      g.appendChild(p);
    });
  } else {
    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("d", `M ${x1} ${y1} L ${x2} ${y2}`);
    visual.setAttribute("class", "ods-edge edge-visual");
    visual.setAttribute("stroke", style.color);
    visual.setAttribute("stroke-width", style.width);
    visual.setAttribute("opacity", "0.8");
    if (style.dash) visual.setAttribute("stroke-dasharray", style.dash);
    g.appendChild(visual);
  }

  /* flecha al borde del nodo destino */
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  const ax = s.x + ux * (len - (t.r + 12));
  const ay = s.y + uy * (len - (t.r + 12));
  const marker = document.createElementNS(SVG_NS, "path");
  marker.setAttribute("d", "M 0 0 L -10 -5 L -10 5 Z");
  marker.setAttribute("transform", `translate(${ax}, ${ay}) rotate(${ang})`);
  marker.setAttribute("fill", style.color);
  marker.setAttribute("opacity", "0.9");
  g.appendChild(marker);

  const hit = document.createElementNS(SVG_NS, "path");
  hit.setAttribute("class", "ods-edge edge-hit");
  hit.setAttribute("d", `M ${s.x} ${s.y} L ${t.x} ${t.y}`);
  hit.addEventListener("click", () => showEdgeInfo(i));
  g.appendChild(hit);

  svg.appendChild(g);
  edgeEls.push(g);
});

/* -------- física de simulación -------- */
let simRunning = true;
function simulate() {
  if (!simRunning) { requestAnimationFrame(simulate); return; }
  ODS_NODES.forEach(a => {
    if (a.fixed) return;
    let fx = 0, fy = 0;
    /* repulsión */
    ODS_NODES.forEach(b => {
      if (a === b) return;
      let dx = a.x - b.x, dy = a.y - b.y;
      let dist = Math.hypot(dx, dy) || 1;
      if (dist < 600) {
        const f = (4500 / (dist * dist));
        fx += (dx / dist) * f; fy += (dy / dist) * f;
      }
    });
    /* atracción de aristas visibles */
    RAW_EDGES.forEach((edge, i) => {
      if (edgeEls[i].classList.contains("hidden-edge")) return;
      let other = null;
      if (edge.s === a.id) other = nodeById(edge.t);
      else if (edge.t === a.id) other = nodeById(edge.s);
      if (other) {
        let dx = other.x - a.x, dy = other.y - a.y;
        let dist = Math.hypot(dx, dy) || 1;
        const rest = 210;
        const f = (dist - rest) * 0.0009;
        fx += (dx / dist) * f; fy += (dy / dist) * f;
      }
    });
    /* centro */
    fx += (1385 - a.x) * 0.0002;
    fy += (430 - a.y) * 0.0002;
    a.vx = (a.vx + fx) * 0.82;
    a.vy = (a.vy + fy) * 0.82;
    a.x += a.vx; a.y += a.vy;
    a.x = Math.max(60, Math.min(2710, a.x));
    a.y = Math.max(60, Math.min(800, a.y));
  });
  render();
  requestAnimationFrame(simulate);
}
function render() {
  ODS_NODES.forEach(n => {
    const el = nodeEls[n.id];
    if (!el) return;
    el.setAttribute("transform", `translate(${n.x.toFixed(1)}, ${n.y.toFixed(1)})`);
  });
  edgeEls.forEach((g, i) => {
    const edge = RAW_EDGES[i];
    const s = nodeById(edge.s), t = nodeById(edge.t);
    const style = TYPE_STYLE[edge.type];
    const dx = t.x - s.x, dy = t.y - s.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const px = -uy, py = ux;
    const x1 = s.x + ux * (s.r + 2);
    const y1 = s.y + uy * (s.r + 2);
    const x2 = t.x - ux * (t.r + 2);
    const y2 = t.y - uy * (t.r + 2);
    const visual = g.querySelector(".edge-visual");
    if (style.double) {
      const off = 3;
      [off, -off].forEach((o, j) => {
        const p = g.querySelectorAll(".edge-visual path, .edge-visual")[j];
        if (p) p.setAttribute("d", `M ${x1 + px * o} ${y1 + py * o} L ${x2 + px * o} ${y2 + py * o}`);
      });
      g.querySelectorAll(".edge-visual path").forEach(p => {
        /* noop: ya se actualizó arriba */
      });
    } else if (visual) {
      visual.setAttribute("d", `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
    const hit = g.querySelector(".edge-hit");
    hit.setAttribute("d", `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} L ${t.x.toFixed(1)} ${t.y.toFixed(1)}`);
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    const ax = s.x + ux * (len - (t.r + 12));
    const ay = s.y + uy * (len - (t.r + 12));
    const marker = g.querySelectorAll("path").item(g.querySelectorAll("path").length - 2);
    if (marker) marker.setAttribute("transform", `translate(${ax.toFixed(1)}, ${ay.toFixed(1)}) rotate(${ang.toFixed(1)})`);
  });
}
requestAnimationFrame(simulate);

/* -------- arrastre -------- */
function makeDraggable(g, node) {
  let dragging = false, startX = 0, startY = 0;
  const pt = svg.createSVGPoint();
  g.addEventListener("pointerdown", (e) => {
    dragging = true;
    g.classList.add("dragging");
    pt.x = e.clientX; pt.y = e.clientY;
    const ctm = svg.getScreenCTM().inverse();
    const p = pt.matrixTransform(ctm);
    startX = p.x - node.x; startY = p.y - node.y;
    node.fixed = true;
    node.vx = 0; node.vy = 0;
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    pt.x = e.clientX; pt.y = e.clientY;
    const ctm = svg.getScreenCTM().inverse();
    const p = pt.matrixTransform(ctm);
    node.x = Math.max(60, Math.min(2710, p.x - startX));
    node.y = Math.max(60, Math.min(800, p.y - startY));
  });
  window.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;
    g.classList.remove("dragging");
    node.fixed = false;
  });
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
  typeEl.textContent = "Tensión: " + style.label + " · " + struct.label;
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
const TENSION_INSIGHTS = {
  incoherencias:   ["incoherencia"],
  contradicciones: ["contradiccion"],
  desconexiones:   ["desconexion"],
  jerarquias:      ["jerarquia"],
  perifericos:     ["periferico"],
};
const STRUCT_INSIGHTS = {
  ecologica:      ODS_NODES.filter(n => n.cat === "e1").map(n => n.id),
  funcional:      ODS_NODES.filter(n => n.cat === "e2").map(n => n.id),
  socioeconomica: ODS_NODES.filter(n => n.cat === "e3").map(n => n.id),
  patrimonio:     ODS_NODES.filter(n => n.cat === "e4").map(n => n.id),
};
function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;
  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }
  if (TENSION_INSIGHTS[key]) {
    setSpotlightTypes(TENSION_INSIGHTS[key]);
  } else if (STRUCT_INSIGHTS[key] && STRUCT_INSIGHTS[key].length) {
    setSpotlightCats(STRUCT_INSIGHTS[key].map(id => nodeById(id).cat), true);
    STRUCT_INSIGHTS[key].forEach(id => {
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
  if (window.event && window.event.currentTarget) window.event.currentTarget.classList.add("active");
  const groups = {
    all:          { types: ["incoherencia", "contradiccion", "desconexion", "jerarquia", "periferico"], cats: ["e1", "e2", "e3", "e4"] },
    incoherencia: { types: ["incoherencia"],  cats: ["e1", "e2", "e3", "e4"] },
    contradiccion:{ types: ["contradiccion"], cats: ["e1", "e2", "e3", "e4"] },
    desconexion:  { types: ["desconexion"],   cats: ["e1", "e2", "e3", "e4"] },
    jerarquia:    { types: ["jerarquia"],     cats: ["e1", "e2", "e3", "e4"] },
    periferico:   { types: ["periferico"],    cats: ["e1", "e2", "e3", "e4"] },
    e1:           { types: ["incoherencia", "contradiccion", "desconexion", "jerarquia", "periferico"], cats: ["e1"] },
    e2:           { types: ["incoherencia", "contradiccion", "desconexion", "jerarquia", "periferico"], cats: ["e2"] },
    e3:           { types: ["incoherencia", "contradiccion", "desconexion", "jerarquia", "periferico"], cats: ["e3"] },
    e4:           { types: ["incoherencia", "contradiccion", "desconexion", "jerarquia", "periferico"], cats: ["e4"] },
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
  const degrees = {};
  ODS_NODES.forEach(n => { degrees[n.id] = 0; });
  RAW_EDGES.forEach(e => { degrees[e.s]++; degrees[e.t]++; });
  const sorted = Object.entries(degrees).sort((a, b) => b[1] - a[1]);
  const hubs = sorted.filter(([, d]) => d >= 4);
  let cont = 0, disc = 0;
  const byType = {}, byCat = { e1: 0, e2: 0, e3: 0, e4: 0 };
  RAW_EDGES.forEach(e => {
    if (e.directa) cont++; else disc++;
    byType[e.type] = (byType[e.type] || 0) + 1;
    byCat[e.cat]++;
  });
  const n = ODS_NODES.length, k = RAW_EDGES.length;
  const dens = (2 * k) / (n * (n - 1));
  return {
    nodes: n, edges: k,
    avgDeg: (2 * k / n).toFixed(2),
    density: (dens * 100).toFixed(1) + "%",
    hub: nodeById(sorted[0][0]).name.replace(/\n/g, " "),
    hubDeg: sorted[0][1],
    hubs: hubs.length,
    cont, disc,
    byType, byCat,
  };
}
function renderMetrics() {
  const m = computeMetrics();
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set("metricNodes", m.nodes);
  set("metricEdges", m.edges);
  set("metricAvgDegree", m.avgDeg);
  set("metricDensity", m.density);
  set("metricHubNode", m.hub);
  set("metricHubDegree", m.hubDeg);
  set("metricHubs", m.hubs);
  set("metricCont", m.cont);
  set("metricDisc", m.disc);
  set("metricInco", m.byType.incoherencia || 0);
  set("metricContr", m.byType.contradiccion || 0);
  set("metricDesc", m.byType.desconexion || 0);
  set("metricJer", m.byType.jerarquia || 0);
  set("metricPeri", m.byType.periferico || 0);
  set("struct-e1", `1. Ecológica Principal: ${ODS_NODES.filter(x => x.cat === "e1").length} nodos · ${m.byCat.e1} tensiones`);
  set("struct-e2", `2. Funcional y del Cuidado: ${ODS_NODES.filter(x => x.cat === "e2").length} nodos · ${m.byCat.e2} tensiones`);
  set("struct-e3", `3. Socioeconómica Creativa: ${ODS_NODES.filter(x => x.cat === "e3").length} nodos · ${m.byCat.e3} tensiones`);
  set("struct-e4", `4. Integradora de Patrimonio: ${ODS_NODES.filter(x => x.cat === "e4").length} nodos · ${m.byCat.e4} tensiones`);
}

/* -------- inicio -------- */
document.addEventListener("DOMContentLoaded", () => {
  simulate();
  setupLegendToggle();
  renderMetrics();
});
