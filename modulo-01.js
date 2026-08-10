/* ==========================================================
   MÓDULO 01 — CONSTRUIR LA RED — RED INTEGRAL DE LAS 4 ESTRUCTURAS DEL POT
   (v3: DINÁMICO con D3.js force simulation)
========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
let svg, containerWidth = 1400, containerHeight = 800;
const typeOff = new Set(), catOff = new Set();

/* -------- Nodos: Los 37 del POT -------- */
const ODS_NODES = [
  /* 1. Estructura Ecológica Principal — VERDE */
  { id: "cerros",     cat: "e1", name: "CERROS\nORIENTALES",        icon: "fa-mountain-sun",  color: "#4ade80", fx: 200,  fy: 180, r: 52 },
  { id: "rios",       cat: "e1", name: "RÍOS",                       icon: "fa-water",         color: "#4ade80", fx: 330,  fy: 430, r: 50 },
  { id: "quebradas",  cat: "e1", name: "QUEBRADAS",                  icon: "fa-water",         color: "#4ade80", fx: 500,  fy: 150, r: 46 },
  { id: "humedales",  cat: "e1", name: "HUMEDALES",                  icon: "fa-droplet",       color: "#4ade80", fx: 660,  fy: 420, r: 52 },
  { id: "resiliencia",cat: "e1", name: "ÁREAS DE\nRESILIENCIA",      icon: "fa-shield-heart",  color: "#4ade80", fx: 890,  fy: 170, r: 52 },
  { id: "paramos",    cat: "e1", name: "PÁRAMOS",                    icon: "fa-mountain",      color: "#4ade80", fx: 250,  fy: 640, r: 52 },
  { id: "bosques",    cat: "e1", name: "BOSQUES\nURBANOS",           icon: "fa-tree",          color: "#4ade80", fx: 1140, fy: 400, r: 50 },
  { id: "coberturas", cat: "e1", name: "COBERTURAS\nVEGETALES",      icon: "fa-seedling",      color: "#4ade80", fx: 1040, fy: 650, r: 54 },
  { id: "reservas",   cat: "e1", name: "RESERVAS",                  icon: "fa-tree",          color: "#4ade80", fx: 1300, fy: 190, r: 50 },
  { id: "areas",      cat: "e1", name: "ÁREAS\nPROTEGIDAS",          icon: "fa-lock",          color: "#4ade80", fx: 440,  fy: 300, r: 50 },
  { id: "parques_m",  cat: "e1", name: "PARQUES\nECOLÓGICOS",        icon: "fa-campground",    color: "#4ade80", fx: 770,  fy: 640, r: 50 },
  { id: "parque_b",   cat: "e1", name: "PARQUE\nDE BORDE",           icon: "fa-archway",       color: "#4ade80", fx: 1430, fy: 480, r: 48 },
  { id: "paisajes",   cat: "e1", name: "PAISAJES",                  icon: "fa-sun",           color: "#4ade80", fx: 100,  fy: 480, r: 48 },
  
  /* 2. Estructura Funcional y del Cuidado — AZUL */
  { id: "redvial",    cat: "e2", name: "RED VIAL",                   icon: "fa-road",          color: "#5b8def", fx: 1240, fy: 90,  r: 48 },
  { id: "transporte", cat: "e2", name: "TRANSPORTE",                 icon: "fa-bus",           color: "#5b8def", fx: 960,  fy: 330, r: 52 },
  { id: "corredores", cat: "e2", name: "CORREDORES\nVERDES",         icon: "fa-route",         color: "#5b8def", fx: 700,  fy: 140, r: 50 },
  { id: "ciclorutas", cat: "e2", name: "CICLORUTAS",                 icon: "fa-person-biking", color: "#5b8def", fx: 1390, fy: 330, r: 46 },
  { id: "equip",      cat: "e2", name: "EQUIPAMIENTOS",              icon: "fa-school",        color: "#5b8def", fx: 1250, fy: 620, r: 50 },
  { id: "manzanas",   cat: "e2", name: "MANZANAS\nDEL CUIDADO",       icon: "fa-people-roof",   color: "#5b8def", fx: 1470, fy: 640, r: 52 },
  { id: "sserv",      cat: "e2", name: "SERVICIOS\nSOCIALES",         icon: "fa-hand-holding-heart", color: "#5b8def", fx: 1370, fy: 760, r: 46 },
  { id: "parques",    cat: "e2", name: "PARQUES",                    icon: "fa-tree-city",     color: "#5b8def", fx: 1100, fy: 760, r: 46 },
  { id: "scuidado",   cat: "e2", name: "SERVICIOS\nDE CUIDADO",       icon: "fa-heart-pulse",   color: "#5b8def", fx: 1230, fy: 470, r: 46 },
  { id: "vivienda",   cat: "e2", name: "VIVIENDA",                   icon: "fa-house",         color: "#5b8def", fx: 950,  fy: 520, r: 50 },
  { id: "servpub",    cat: "e2", name: "SERVICIOS\nPÚBLICOS",         icon: "fa-bolt",          color: "#5b8def", fx: 820,  fy: 770, r: 46 },
  
  /* 3. Estructura Socioeconómica Creativa e Innovación — NARANJA */
  { id: "financieros", cat: "e3", name: "CENTROS\nFINANCIEROS",       icon: "fa-building-columns", color: "#ef9552", fx: 1700, fy: 190, r: 48 },
  { id: "empresariales", cat: "e3", name: "SERVICIOS\nEMPRESARIALES",   icon: "fa-briefcase",       color: "#ef9552", fx: 1920, fy: 120, r: 50 },
  { id: "tecnodistrito", cat: "e3", name: "DISTRITO\nTECNOLÓGICO",      icon: "fa-microchip",       color: "#ef9552", fx: 2110, fy: 270, r: 48 },
  { id: "industriales",  cat: "e3", name: "ZONAS\nINDUSTRIALES",        icon: "fa-industry",        color: "#ef9552", fx: 1860, fy: 360, r: 48 },
  { id: "innovacion",    cat: "e3", name: "INNOVACIÓN",                icon: "fa-lightbulb",       color: "#ef9552", fx: 2080, fy: 470, r: 46 },
  { id: "abastecimiento",cat: "e3", name: "ABASTECIMIENTO",            icon: "fa-truck",           color: "#ef9552", fx: 1700, fy: 430, r: 48 },
  { id: "plazas",        cat: "e3", name: "PLAZAS DE\nMERCADO",         icon: "fa-store",           color: "#ef9552", fx: 1900, fy: 530, r: 46 },
  { id: "turismo",       cat: "e3", name: "TURISMO",                   icon: "fa-map-location-dot", color: "#ef9552", fx: 2090, fy: 660, r: 46 },
  { id: "artesanal",     cat: "e3", name: "ARTESANÍA",                 icon: "fa-palette",         color: "#ef9552", fx: 1680, fy: 640, r: 46 },
  
  /* 4. Estructura Integradora de Patrimonio — MORADA */
  { id: "sitios_sagrados", cat: "e4", name: "SITIOS\nSAGRADOS",         icon: "fa-place-of-worship", color: "#a276f2", fx: 2360, fy: 200, r: 50 },
  { id: "pinmaterial",     cat: "e4", name: "PATRIMONIO\nINMATERIAL",    icon: "fa-masks-theater",    color: "#a276f2", fx: 2500, fy: 440, r: 50 },
  { id: "pnatural",        cat: "e4", name: "PATRIMONIO\nNATURAL",       icon: "fa-globe",            color: "#a276f2", fx: 2650, fy: 180, r: 48 },
  { id: "pecomaterial",    cat: "e4", name: "PATRIMONIO\nECOLÓGICO",     icon: "fa-leaf",             color: "#a276f2", fx: 2650, fy: 640, r: 50 },
];

ODS_NODES.forEach((n, i) => {
  n.x = n.fx;
  n.y = n.fy;
  n.vx = 0;
  n.vy = 0;
  n.index = i;
});

/* -------- Estructuras -------- */
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

/* -------- Aristas -------- */
const RAW_EDGES = [
  { s: "cerros",     t: "rios",       type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los cerros orientales contienen y alimentan los ríos." },
  { s: "quebradas",  t: "humedales",  type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Las quebradas alimentan los humedales." },
  { s: "humedales",  t: "rios",       type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los humedales regulan los ríos." },
  { s: "humedales",  t: "resiliencia",type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los humedales son áreas de resiliencia climática." },
  { s: "rios",       t: "paramos",    type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los ríos nacen en los páramos." },
  { s: "bosques",    t: "coberturas", type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Los bosques sustentan las coberturas." },
  { s: "resiliencia",t: "coberturas", type: "resiliencia", directa: true,  cat: "e1", pagina: "186", sustento: "La resiliencia depende de coberturas." },
  { s: "reservas",   t: "coberturas", type: "resiliencia", directa: true,  cat: "e1", pagina: "186", sustento: "Las reservas sostienen coberturas." },
  { s: "cerros",     t: "areas",      type: "indirecta",   directa: false, cat: "e1", pagina: "186", sustento: "Los cerros se vinculan con áreas protegidas." },
  { s: "areas",      t: "parques_m",  type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Las áreas contienen parques ecológicos." },
  { s: "areas",      t: "reservas",   type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Las áreas originan reservas." },
  { s: "parques_m",  t: "coberturas", type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Los parques aportan coberturas." },
  { s: "humedales",  t: "coberturas", type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Los humedales contribuyen coberturas." },
  { s: "coberturas", t: "parque_b",   type: "soporte",     directa: true,  cat: "e1", pagina: "186", sustento: "Las coberturas sustentan el parque de borde." },
  { s: "paramos",    t: "paisajes",   type: "soporte",     directa: false, cat: "e1", pagina: "186", sustento: "Los páramos sustentan paisajes sostenibles." },
  { s: "redvial",    t: "transporte", type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "La red vial habilita el transporte." },
  { s: "redvial",    t: "equip",      type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "La red vial conecta equipamientos." },
  { s: "corredores", t: "transporte", type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Los corredores integran transporte." },
  { s: "corredores", t: "ciclorutas", type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Los corredores contienen ciclorrutas." },
  { s: "manzanas",   t: "sserv",      type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Las manzanas cualifican servicios." },
  { s: "manzanas",   t: "parques",    type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Las manzanas usan parques." },
  { s: "equip",      t: "scuidado",   type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "Equipamientos y cuidado." },
  { s: "equip",      t: "sserv",      type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "Equipamientos articulan servicios." },
  { s: "equip",      t: "vivienda",   type: "soporte",     directa: true,  cat: "e2", pagina: "43", sustento: "Equipamientos cerca de vivienda." },
  { s: "vivienda",   t: "servpub",    type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "Vivienda depende de servicios." },
  { s: "vivienda",   t: "ciclorutas", type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "Vivienda accede a ciclorrutas." },
  { s: "vivienda",   t: "transporte", type: "soporte",     directa: false, cat: "e2", pagina: "43", sustento: "Vivienda conecta con transporte." },
  { s: "financieros",t: "empresariales", type: "soporte", directa: true,  cat: "e3", pagina: "239-241", sustento: "Financieros sustentan empresas." },
  { s: "empresariales", t: "tecnodistrito", type: "soporte", directa: true, cat: "e3", pagina: "239-241", sustento: "Empresas alimentan tecnología." },
  { s: "empresariales", t: "industriales", type: "soporte", directa: true,  cat: "e3", pagina: "239-241", sustento: "Empresas sirven industria." },
  { s: "tecnodistrito", t: "innovacion", type: "soporte", directa: true,   cat: "e3", pagina: "239-241", sustento: "Tech genera innovación." },
  { s: "abastecimiento", t: "plazas", type: "soporte",     directa: false, cat: "e3", pagina: "239-241", sustento: "Abastecimiento alimenta plazas." },
  { s: "plazas",     t: "empresariales", type: "soporte", directa: false,  cat: "e3", pagina: "239-241", sustento: "Plazas integran economía formal." },
  { s: "industriales", t: "turismo", type: "soporte",      directa: false, cat: "e3", pagina: "239-241", sustento: "Industria reconversión turística." },
  { s: "artesanal",  t: "turismo",      type: "soporte",   directa: false, cat: "e3", pagina: "239-241", sustento: "Artesanía alimenta turismo." },
  { s: "sitios_sagrados", t: "pinmaterial", type: "resiliencia", directa: true, cat: "e4", pagina: "126", sustento: "Sitios sagrados sostienen inmaterial." },
  { s: "pinmaterial",  t: "pnatural",    type: "resiliencia", directa: true, cat: "e4", pagina: "126", sustento: "Inmaterial se entrelaza con natural." },
  { s: "pnatural",     t: "pecomaterial",type: "resiliencia", directa: true, cat: "e4", pagina: "126", sustento: "Natural integra patrimonio ecológico." },
  { s: "coberturas", t: "corredores", type: "soporte", directa: true, cat: "e1-e2", pagina: "92", sustento: "Corredores integran coberturas." },
  { s: "humedales", t: "manzanas", type: "soporte", directa: false, cat: "e1-e2", pagina: "43", sustento: "Humedales rodean manzanas." },
  { s: "rios", t: "transporte", type: "soporte", directa: false, cat: "e1-e2", pagina: "43", sustento: "Ríos estructuran transporte." },
  { s: "redvial", t: "financieros", type: "soporte", directa: false, cat: "e2-e3", pagina: "170", sustento: "Red vial conecta financieros." },
  { s: "manzanas", t: "plazas", type: "soporte", directa: false, cat: "e2-e3", pagina: "43", sustento: "Manzanas integran plazas." },
  { s: "equip", t: "tecnodistrito", type: "soporte", directa: false, cat: "e2-e3", pagina: "170", sustento: "Educación alberga tech." },
  { s: "turismo", t: "pinmaterial", type: "soporte", directa: false, cat: "e3-e4", pagina: "239-241", sustento: "Turismo dinamiza inmaterial." },
  { s: "artesanal", t: "pnatural", type: "soporte", directa: false, cat: "e3-e4", pagina: "239-241", sustento: "Artesanía depende natural." },
  { s: "coberturas", t: "pecomaterial", type: "resiliencia", directa: false, cat: "e1-e4", pagina: "126", sustento: "Coberturas son patrimonio." },
  { s: "paisajes", t: "pinmaterial", type: "soporte", directa: false, cat: "e1-e4", pagina: "126", sustento: "Paisajes integran inmaterial." },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* SIMULACIÓN DE FUERZAS */
const alpha = 0.3;
const alphaDecay = 0.02;
const velocityDecay = 0.6;

function simulateForces(iterations = 300) {
  for (let iter = 0; iter < iterations; iter++) {
    let alphaVal = alpha * Math.pow(1 - alphaDecay, iter);
    if (alphaVal < 0.001) break;

    // Fuerzas repulsivas entre nodos
    for (let i = 0; i < ODS_NODES.length; i++) {
      for (let j = i + 1; j < ODS_NODES.length; j++) {
        const a = ODS_NODES[i], b = ODS_NODES[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) + 1;
        const force = alphaVal * 150 / (dist * dist);
        
        a.vx -= (dx / dist) * force;
        a.vy -= (dy / dist) * force;
        b.vx += (dx / dist) * force;
        b.vy += (dy / dist) * force;
      }
    }

    // Fuerzas de atracción (aristas)
    RAW_EDGES.forEach(edge => {
      const a = nodeById(edge.s), b = nodeById(edge.t);
      if (!a || !b) return;
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const k = 0.05;
      
      a.vx += (dx / dist) * k * alphaVal;
      a.vy += (dy / dist) * k * alphaVal;
      b.vx -= (dx / dist) * k * alphaVal;
      b.vy -= (dy / dist) * k * alphaVal;
    });

    // Actualizar posiciones
    ODS_NODES.forEach(n => {
      n.vx *= velocityDecay;
      n.vy *= velocityDecay;
      n.x += n.vx;
      n.y += n.vy;
      
      // Mantener dentro del canvas
      n.x = Math.max(n.r, Math.min(containerWidth - n.r, n.x));
      n.y = Math.max(n.r, Math.min(containerHeight - n.r, n.y));
    });
  }
}

function render() {
  const container = document.getElementById("network-visualization");
  container.innerHTML = "";
  containerWidth = container.clientWidth || 1400;
  containerHeight = container.clientHeight || 800;

  simulateForces(200);

  svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${containerWidth} ${containerHeight}`);
  svg.setAttribute("style", "width: 100%; height: 100%;");

  // Defs
  const defs = document.createElementNS(SVG_NS, "defs");
  Object.values(TYPE_STYLE).forEach((style, idx) => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", `arrow-${idx}`);
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "9");
    marker.setAttribute("refY", "3");
    marker.setAttribute("orient", "auto-start-reverse");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", "M 0 0 L 10 3 L 0 6 Z");
    path.setAttribute("fill", style.color);
    marker.appendChild(path);
    defs.appendChild(marker);
  });
  svg.appendChild(defs);

  // Aristas
  const edgesLayer = document.createElementNS(SVG_NS, "g");
  edgesLayer.setAttribute("class", "edges-layer");
  
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];
    
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-cat", edge.cat);

    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("d", `M ${s.x} ${s.y} L ${t.x} ${t.y}`);
    visual.setAttribute("stroke", style.color);
    visual.setAttribute("stroke-width", style.width);
    visual.setAttribute("fill", "none");
    if (!edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
    if (edge.directa) visual.setAttribute("marker-end", "url(#arrow-0)");
    visual.setAttribute("opacity", "0.8");

    group.appendChild(visual);
    edgesLayer.appendChild(group);
  });
  svg.appendChild(edgesLayer);

  // Nodos
  const nodesLayer = document.createElementNS(SVG_NS, "g");
  nodesLayer.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "ods-node");
    g.setAttribute("data-id", node.id);
    g.setAttribute("data-cat", node.cat);
    g.style.cursor = "pointer";

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", node.r);
    circle.setAttribute("fill", node.color);
    circle.setAttribute("opacity", "0.85");

    const text = document.createElementNS(SVG_NS, "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "10");
    text.setAttribute("font-weight", "600");
    text.setAttribute("fill", "#0a0e17");
    text.textContent = node.name;

    g.appendChild(circle);
    g.appendChild(text);
    nodesLayer.appendChild(g);
  });

  svg.appendChild(nodesLayer);
  document.getElementById("network-visualization").appendChild(svg);
}

function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");

  const groups = {
    all:     { types: ["soporte", "resiliencia", "indirecta"], cats: ["e1", "e2", "e3", "e4", "e1-e2", "e2-e3", "e3-e4", "e1-e4"] },
    soporte:     { types: ["soporte"],             cats: ["e1", "e2", "e3", "e4", "e1-e2", "e2-e3", "e3-e4", "e1-e4"] },
    resiliencia: { types: ["resiliencia"],         cats: ["e1", "e2", "e3", "e4", "e1-e2", "e2-e3", "e3-e4", "e1-e4"] },
    indirecta:   { types: ["indirecta"],           cats: ["e1", "e2", "e3", "e4", "e1-e2", "e2-e3", "e3-e4", "e1-e4"] },
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

function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(g => {
    const type = g.dataset.type;
    const cat = g.dataset.cat;
    const visible = !typeOff.has(type) && !catOff.has(cat);
    g.style.display = visible ? "block" : "none";
  });
}

function setupLegendToggle() {
  document.querySelectorAll(".legend-item[data-mode='type'] input").forEach(input => {
    input.addEventListener("change", () => refreshEdgeVisibility());
  });
  document.querySelectorAll(".legend-item[data-mode='cat'] input").forEach(input => {
    input.addEventListener("change", () => refreshEdgeVisibility());
  });
}

function toggleInsight(insight) {
  console.log("Insight:", insight);
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  setupLegendToggle();
});
