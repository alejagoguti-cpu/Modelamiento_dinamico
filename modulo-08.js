/* ==========================================================
   MÓDULO 08 — MI MODELO DE CIUDAD — CONSTRUCTOR INTERACTIVO
   (v2: permite crear, editar y conectar nodos propios)

   Inicio: Nodos del POT ya están presentes (37 nodos)
   Permitir:
   - Crear nuevos nodos (click en el vacío)
   - Editar nombre y estructura de nodos (doble click)
   - Crear conexiones entre nodos (arrastrar)
   - Eliminar nodos (botón derecho)
   - Guardar el modelo en localStorage
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
let svg, simulation, containerWidth = 1400, containerHeight = 800;
const typeOff = new Set(), catOff = new Set();

/* -------- Nodos: Los 37 del POT -------- */
const ODS_NODES = [
  /* 1. Estructura Ecológica Principal — VERDE */
  { id: "cerros",     cat: "e1", name: "CERROS\nORIENTALES",        icon: "fa-mountain-sun",  color: "#4ade80", x: 200,  y: 180, r: 52 },
  { id: "rios",       cat: "e1", name: "RÍOS",                       icon: "fa-water",         color: "#4ade80", x: 330,  y: 430, r: 50 },
  { id: "quebradas",  cat: "e1", name: "QUEBRADAS",                  icon: "fa-water",         color: "#4ade80", x: 500,  y: 150, r: 46 },
  { id: "humedales",  cat: "e1", name: "HUMEDALES",                  icon: "fa-droplet",       color: "#4ade80", x: 660,  y: 420, r: 52 },
  { id: "resiliencia",cat: "e1", name: "ÁREAS DE\nRESILIENCIA",      icon: "fa-shield-heart",  color: "#4ade80", x: 890,  y: 170, r: 52 },
  { id: "paramos",    cat: "e1", name: "PÁRAMOS",                    icon: "fa-mountain",      color: "#4ade80", x: 250,  y: 640, r: 52 },
  { id: "bosques",    cat: "e1", name: "BOSQUES\nURBANOS",           icon: "fa-tree",          color: "#4ade80", x: 1140, y: 400, r: 50 },
  { id: "coberturas", cat: "e1", name: "COBERTURAS\nVEGETALES",      icon: "fa-seedling",      color: "#4ade80", x: 1040, y: 650, r: 54 },
  { id: "reservas",   cat: "e1", name: "RESERVAS",                  icon: "fa-tree",          color: "#4ade80", x: 1300, y: 190, r: 50 },
  { id: "areas",      cat: "e1", name: "ÁREAS\nPROTEGIDAS",          icon: "fa-lock",          color: "#4ade80", x: 440,  y: 300, r: 50 },
  { id: "parques_m",  cat: "e1", name: "PARQUES\nECOLÓGICOS",        icon: "fa-campground",    color: "#4ade80", x: 770,  y: 640, r: 50 },
  { id: "parque_b",   cat: "e1", name: "PARQUE\nDE BORDE",           icon: "fa-archway",       color: "#4ade80", x: 1430, y: 480, r: 48 },
  { id: "paisajes",   cat: "e1", name: "PAISAJES",                  icon: "fa-sun",           color: "#4ade80", x: 100,  y: 480, r: 48 },
  
  /* 2. Estructura Funcional y del Cuidado — AZUL */
  { id: "redvial",    cat: "e2", name: "RED VIAL",                   icon: "fa-road",          color: "#5b8def", x: 1240, y: 90,  r: 48 },
  { id: "transporte", cat: "e2", name: "TRANSPORTE",                 icon: "fa-bus",           color: "#5b8def", x: 960,  y: 330, r: 52 },
  { id: "corredores", cat: "e2", name: "CORREDORES\nVERDES",         icon: "fa-route",         color: "#5b8def", x: 700,  y: 140, r: 50 },
  { id: "ciclorutas", cat: "e2", name: "CICLORUTAS",                 icon: "fa-person-biking", color: "#5b8def", x: 1390, y: 330, r: 46 },
  { id: "equip",      cat: "e2", name: "EQUIPAMIENTOS",              icon: "fa-school",        color: "#5b8def", x: 1250, y: 620, r: 50 },
  { id: "manzanas",   cat: "e2", name: "MANZANAS\nDEL CUIDADO",       icon: "fa-people-roof",   color: "#5b8def", x: 1470, y: 640, r: 52 },
  { id: "sserv",      cat: "e2", name: "SERVICIOS\nSOCIALES",         icon: "fa-hand-holding-heart", color: "#5b8def", x: 1370, y: 760, r: 46 },
  { id: "parques",    cat: "e2", name: "PARQUES",                    icon: "fa-tree-city",     color: "#5b8def", x: 1100, y: 760, r: 46 },
  { id: "scuidado",   cat: "e2", name: "SERVICIOS\nDE CUIDADO",       icon: "fa-heart-pulse",   color: "#5b8def", x: 1230, y: 470, r: 46 },
  { id: "vivienda",   cat: "e2", name: "VIVIENDA",                   icon: "fa-house",         color: "#5b8def", x: 950,  y: 520, r: 50 },
  { id: "servpub",    cat: "e2", name: "SERVICIOS\nPÚBLICOS",         icon: "fa-bolt",          color: "#5b8def", x: 820,  y: 770, r: 46 },
  
  /* 3. Estructura Socioeconómica Creativa e Innovación — NARANJA */
  { id: "financieros", cat: "e3", name: "CENTROS\nFINANCIEROS",       icon: "fa-building-columns", color: "#ef9552", x: 1700, y: 190, r: 48 },
  { id: "empresariales", cat: "e3", name: "SERVICIOS\nEMPRESARIALES",   icon: "fa-briefcase",       color: "#ef9552", x: 1920, y: 120, r: 50 },
  { id: "tecnodistrito", cat: "e3", name: "DISTRITO\nTECNOLÓGICO",      icon: "fa-microchip",       color: "#ef9552", x: 2110, y: 270, r: 48 },
  { id: "industriales",  cat: "e3", name: "ZONAS\nINDUSTRIALES",        icon: "fa-industry",        color: "#ef9552", x: 1860, y: 360, r: 48 },
  { id: "innovacion",    cat: "e3", name: "INNOVACIÓN",                icon: "fa-lightbulb",       color: "#ef9552", x: 2080, y: 470, r: 46 },
  { id: "abastecimiento",cat: "e3", name: "ABASTECIMIENTO",            icon: "fa-truck",           color: "#ef9552", x: 1700, y: 430, r: 48 },
  { id: "plazas",        cat: "e3", name: "PLAZAS DE\nMERCADO",         icon: "fa-store",           color: "#ef9552", x: 1900, y: 530, r: 46 },
  { id: "turismo",       cat: "e3", name: "TURISMO",                   icon: "fa-map-location-dot", color: "#ef9552", x: 2090, y: 660, r: 46 },
  { id: "artesanal",     cat: "e3", name: "ARTESANÍA",                 icon: "fa-palette",         color: "#ef9552", x: 1680, y: 640, r: 46 },
  
  /* 4. Estructura Integradora de Patrimonio — MORADA */
  { id: "sitios_sagrados", cat: "e4", name: "SITIOS\nSAGRADOS",         icon: "fa-place-of-worship", color: "#a276f2", x: 2360, y: 200, r: 50 },
  { id: "pinmaterial",     cat: "e4", name: "PATRIMONIO\nINMATERIAL",    icon: "fa-masks-theater",    color: "#a276f2", x: 2500, y: 440, r: 50 },
  { id: "pnatural",        cat: "e4", name: "PATRIMONIO\nNATURAL",       icon: "fa-globe",            color: "#a276f2", x: 2650, y: 180, r: 48 },
  { id: "pecomaterial",    cat: "e4", name: "PATRIMONIO\nECOLÓGICO",     icon: "fa-leaf",             color: "#a276f2", x: 2650, y: 640, r: 50 },
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

/* -------- Tipos de relación — Módulo 08: Constructor Interactivo -------- */
const TYPE_STYLE = {
  soporte:     { color: "#ef9552", width: 2.6, label: "Soporte" },
  alternativa: { color: "#2fd4c8", width: 2.6, label: "Alternativa" },
  custom:      { color: "#f5c945", width: 2.6, label: "Personalizada" },
  indirecta:   { color: "#8b93a8", width: 2.4, label: "Indirecta" },
};

/* -------- Aristas: empieza vacío, el usuario agrega -------- */
const RAW_EDGES = [];
let CUSTOM_EDGES = [];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- FUNCIONES DEL CONSTRUCTOR -------- */
function loadFromLocalStorage() {
  try {
    const savedNodes = JSON.parse(localStorage.getItem("RAPOT_M08_CUSTOM_NODES") || "[]");
    const savedEdges = JSON.parse(localStorage.getItem("RAPOT_M08_CUSTOM_EDGES") || "[]");
    
    savedNodes.forEach(node => {
      const colors = { e1: "#4ade80", e2: "#5b8def", e3: "#ef9552", e4: "#a276f2" };
      const newNode = {
        ...node,
        icon: "fa-circle-plus",
        color: colors[node.cat],
        r: 48,
        custom: true,
        homeX: node.x,
        homeY: node.y,
        vx: 0,
        vy: 0
      };
      ODS_NODES.push(newNode);
    });
    
    savedEdges.forEach(edge => {
      RAW_EDGES.push(edge);
    });
    
    CUSTOM_EDGES = savedEdges;
  } catch(e) {
    console.error("Error cargando datos:", e);
  }
}

function saveTolocalStorage() {
  try {
    localStorage.setItem("RAPOT_M08_CUSTOM_NODES", JSON.stringify(
      ODS_NODES.filter(n => n.custom).map(n => ({ id: n.id, name: n.name, cat: n.cat, x: n.x, y: n.y }))
    ));
    localStorage.setItem("RAPOT_M08_CUSTOM_EDGES", JSON.stringify(CUSTOM_EDGES));
  } catch(e) {
    console.error("Error guardando datos:", e);
  }
}

function downloadModel() {
  const data = {
    nodos: ODS_NODES.filter(n => n.custom),
    relaciones: CUSTOM_EDGES,
    fecha: new Date().toISOString()
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mi-modelo-ciudad.json";
  a.click();
  URL.revokeObjectURL(url);
}

function clearModel() {
  if (!confirm("¿Limpiar todos los nodos y relaciones personalizados?")) return;
  const customIds = new Set(ODS_NODES.filter(n => n.custom).map(n => n.id));
  ODS_NODES = ODS_NODES.filter(n => !n.custom);
  RAW_EDGES = RAW_EDGES.filter(e => !customIds.has(e.s) && !customIds.has(e.t));
  CUSTOM_EDGES = [];
  localStorage.removeItem("RAPOT_M08_CUSTOM_NODES");
  localStorage.removeItem("RAPOT_M08_CUSTOM_EDGES");
  render();
}

function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");

  const groups = {
    all: { types: ["soporte", "alternativa", "custom", "indirecta"], cats: ["e1", "e2", "e3", "e4", "e1-e2", "e2-e3", "e3-e4", "e1-e4"] },
    e1:  { types: ["soporte", "alternativa", "custom", "indirecta"], cats: ["e1"] },
    e2:  { types: ["soporte", "alternativa", "custom", "indirecta"], cats: ["e2"] },
    e3:  { types: ["soporte", "alternativa", "custom", "indirecta"], cats: ["e3"] },
    e4:  { types: ["soporte", "alternativa", "custom", "indirecta"], cats: ["e4"] },
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

function render() {
  const container = document.getElementById("network-visualization");
  container.innerHTML = "";
  renderNetwork();
}

function renderNetwork() {
  const container = document.getElementById("network-visualization");
  containerWidth = container.clientWidth || 1400;
  containerHeight = container.clientHeight || 800;

  svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${containerWidth} ${containerHeight}`);
  svg.setAttribute("style", "width: 100%; height: 100%; cursor: crosshair;");

  // Defs para arrows
  const defs = document.createElementNS(SVG_NS, "defs");
  Object.values(TYPE_STYLE).forEach(style => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", `arrow-${Object.keys(TYPE_STYLE).find(k => TYPE_STYLE[k].color === style.color)}`);
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

  // Layer edges
  const edgesLayer = document.createElementNS(SVG_NS, "g");
  edgesLayer.setAttribute("class", "edges-layer");
  
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];
    const dx = t.x - s.x, dy = t.y - s.y;
    const d = `M ${s.x} ${s.y} L ${t.x} ${t.y}`;

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-cat", edge.cat);

    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("d", d);
    visual.setAttribute("stroke", style.color);
    visual.setAttribute("stroke-width", style.width);
    if (!edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
    if (edge.directa) visual.setAttribute("marker-end", `url(#arrow-soporte)`);
    visual.setAttribute("opacity", "0.9");
    visual.setAttribute("class", "ods-edge");

    group.appendChild(visual);
    edgesLayer.appendChild(group);
  });
  svg.appendChild(edgesLayer);

  // Layer nodes
  const nodesLayer = document.createElementNS(SVG_NS, "g");
  nodesLayer.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "ods-node");
    g.setAttribute("data-id", node.id);
    g.setAttribute("data-cat", node.cat);
    g.style.cursor = "grab";

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
    text.setAttribute("font-size", "11");
    text.setAttribute("font-weight", "500");
    text.setAttribute("fill", "#0a0e17");
    text.textContent = node.name;

    g.appendChild(circle);
    g.appendChild(text);

    g.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const startX = e.clientX, startY = e.clientY;
      let dragging = true;

      const move = (me) => {
        if (!dragging) return;
        const dx = me.clientX - startX, dy = me.clientY - startY;
        node.x += dx / 2;
        node.y += dy / 2;
        render();
      };

      const stop = () => {
        dragging = false;
        saveTolocalStorage();
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stop);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", stop);
    });

    nodesLayer.appendChild(g);
  });

  svg.appendChild(nodesLayer);
  document.getElementById("network-visualization").appendChild(svg);
}

function setupLegendToggle() {
  document.querySelectorAll(".legend-item[data-mode='type'] input").forEach(input => {
    input.addEventListener("change", () => refreshEdgeVisibility());
  });
  document.querySelectorAll(".legend-item[data-mode='cat'] input").forEach(input => {
    input.addEventListener("change", () => refreshEdgeVisibility());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderNetwork();
  setupLegendToggle();
});
