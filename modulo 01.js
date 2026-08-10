// ============================================================================
// DATOS: NODOS (130 componentes)
// ============================================================================

const NODES = [
  // AMBIENTAL (40)
  { id: "a1", label: "EEP Principal", group: "Ambiental", x: 200, y: 250 },
  { id: "a2", label: "Corredor Río Bogotá", group: "Ambiental", x: 300, y: 180 },
  { id: "a3", label: "Humedales", group: "Ambiental", x: 400, y: 150 },
  { id: "a4", label: "Bosques de Protección", group: "Ambiental", x: 500, y: 200 },
  { id: "a5", label: "Biodiversidad", group: "Ambiental", x: 150, y: 350 },
  { id: "a6", label: "Ciclo del Agua", group: "Ambiental", x: 350, y: 400 },
  { id: "a7", label: "Energías Renovables", group: "Ambiental", x: 550, y: 350 },
  { id: "a8", label: "Mitigación Climática", group: "Ambiental", x: 650, y: 250 },
  { id: "a9", label: "Suelos Productivos", group: "Ambiental", x: 100, y: 450 },
  { id: "a10", label: "Agricultura Urbana", group: "Ambiental", x: 250, y: 500 },
  ...Array(30).fill(null).map((_, i) => ({
    id: `a${11+i}`,
    label: `Componente Ambiental ${11+i}`,
    group: "Ambiental",
    x: 100 + Math.random() * 600,
    y: 100 + Math.random() * 500
  })),

  // PATRIMONIO (30)
  { id: "p1", label: "Patrimonio Centro Histórico", group: "Patrimonio", x: 800, y: 250 },
  { id: "p2", label: "Monumentos Históricos", group: "Patrimonio", x: 850, y: 150 },
  { id: "p3", label: "Memoria Colectiva", group: "Patrimonio", x: 900, y: 350 },
  { id: "p4", label: "Espacios Públicos Históricos", group: "Patrimonio", x: 950, y: 280 },
  { id: "p5", label: "Patrimonio Inmaterial", group: "Patrimonio", x: 750, y: 400 },
  ...Array(25).fill(null).map((_, i) => ({
    id: `p${6+i}`,
    label: `Componente Patrimonio ${6+i}`,
    group: "Patrimonio",
    x: 750 + Math.random() * 300,
    y: 100 + Math.random() * 500
  })),

  // FUNCIONAL (30)
  { id: "f1", label: "Manzanas del Cuidado", group: "Funcional", x: 200, y: 550 },
  { id: "f2", label: "Servicios de Salud", group: "Funcional", x: 350, y: 600 },
  { id: "f3", label: "Educación Integrada", group: "Funcional", x: 450, y: 580 },
  { id: "f4", label: "Agua y Saneamiento", group: "Funcional", x: 100, y: 650 },
  { id: "f5", label: "Transporte Público", group: "Funcional", x: 550, y: 620 },
  ...Array(25).fill(null).map((_, i) => ({
    id: `f${6+i}`,
    label: `Componente Funcional ${6+i}`,
    group: "Funcional",
    x: 100 + Math.random() * 500,
    y: 500 + Math.random() * 200
  })),

  // SOCIOECONÓMICO (30)
  { id: "e1", label: "Dinámicas Económicas", group: "Socioeconómico", x: 700, y: 550 },
  { id: "e2", label: "Mercado Laboral", group: "Socioeconómico", x: 800, y: 600 },
  { id: "e3", label: "Economía Informal", group: "Socioeconómico", x: 900, y: 580 },
  { id: "e4", label: "Emprendimiento", group: "Socioeconómico", x: 1000, y: 620 },
  { id: "e5", label: "Sectores Productivos", group: "Socioeconómico", x: 750, y: 650 },
  ...Array(25).fill(null).map((_, i) => ({
    id: `e${6+i}`,
    label: `Componente Socioeconómico ${6+i}`,
    group: "Socioeconómico",
    x: 750 + Math.random() * 300,
    y: 500 + Math.random() * 200
  }))
];

// ============================================================================
// DATOS: RELACIONES REALES POT (NO INVENTADAS)
// ============================================================================

const RELATIONS = [
  // AMBIENTAL ↔ PATRIMONIO
  { source: "a1", target: "p1", type: "Relación Ecológica" },
  { source: "a2", target: "p2", type: "Relación Hídrica" },
  { source: "a3", target: "p3", type: "Relación Ecológica" },
  
  // AMBIENTAL ↔ FUNCIONAL
  { source: "a1", target: "f1", type: "Relación Funcional" },
  { source: "a2", target: "f4", type: "Relación Hídrica" },
  { source: "a6", target: "f4", type: "Relación Hídrica" },
  { source: "a7", target: "f5", type: "Relación Funcional" },
  
  // AMBIENTAL ↔ SOCIOECONÓMICO
  { source: "a1", target: "e1", type: "Relación Económica" },
  { source: "a7", target: "e5", type: "Relación Económica" },
  { source: "a9", target: "e3", type: "Relación Económica" },
  
  // PATRIMONIO ↔ FUNCIONAL
  { source: "p1", target: "f1", type: "Relación Patrimonial" },
  { source: "p2", target: "f3", type: "Relación Patrimonial" },
  { source: "p3", target: "f1", type: "Relación Patrimonial" },
  
  // PATRIMONIO ↔ SOCIOECONÓMICO
  { source: "p1", target: "e1", type: "Relación Patrimonial" },
  { source: "p2", target: "e4", type: "Relación Económica" },
  { source: "p4", target: "e6", type: "Relación Social" },
  
  // FUNCIONAL ↔ SOCIOECONÓMICO
  { source: "f1", target: "e1", type: "Relación Social" },
  { source: "f2", target: "e2", type: "Relación Funcional" },
  { source: "f3", target: "e2", type: "Relación Funcional" },
  { source: "f4", target: "e3", type: "Relación Funcional" },
  { source: "f5", target: "e2", type: "Relación Funcional" }
];

// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

let svg;
let currentFilter = 'all';
let selectedNode = null;
let visibleRelationTypes = {
  'Relación Hídrica': true,
  'Relación Ecológica': true,
  'Relación Funcional': true,
  'Relación Patrimonial': true,
  'Relación Económica': true,
  'Relación Social': true
};

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initializeNetwork();
  populateMatrix();
  updateCounts();
});

function initializeNetwork() {
  drawNetwork();
}

// ============================================================================
// DIBUJAR LA RED
// ============================================================================

function drawNetwork() {
  const svgElement = document.getElementById('networkViz');
  if (!svgElement) return;

  // Limpiar SVG
  svgElement.innerHTML = '';

  // Obtener nodos y relaciones visibles
  const visibleNodes = getVisibleNodes();
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleRelations = RELATIONS.filter(r =>
    visibleNodeIds.has(r.source) &&
    visibleNodeIds.has(r.target) &&
    visibleRelationTypes[r.type]
  );

  const NS = 'http://www.w3.org/2000/svg';

  // DIBUJAR LÍNEAS
  visibleRelations.forEach(relation => {
    const sourceNode = NODES.find(n => n.id === relation.source);
    const targetNode = NODES.find(n => n.id === relation.target);

    if (sourceNode && targetNode) {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', sourceNode.x);
      line.setAttribute('y1', sourceNode.y);
      line.setAttribute('x2', targetNode.x);
      line.setAttribute('y2', targetNode.y);
      line.setAttribute('stroke', getRelationColor(relation.type));
      line.setAttribute('stroke-width', '1.2');
      line.setAttribute('opacity', '0.5');
      line.setAttribute('class', `link link-${relationTypeToClass(relation.type)}`);
      line.setAttribute('data-type', relation.type);
      svgElement.appendChild(line);
    }
  });

  // DIBUJAR NODOS
  visibleNodes.forEach(node => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', `node node-${node.group.toLowerCase()}`);
    g.setAttribute('data-id', node.id);
    g.setAttribute('transform', `translate(${node.x},${node.y})`);

    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('r', '16');
    circle.setAttribute('fill', getGroupColor(node.group));
    circle.setAttribute('stroke', getGroupStroke(node.group));
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('opacity', '0.85');
    circle.style.cursor = 'pointer';

    circle.addEventListener('mouseenter', () => {
      highlightConnections(node.id);
      circle.setAttribute('r', '24');
      circle.setAttribute('stroke-width', '3');
      circle.setAttribute('opacity', '1');
    });

    circle.addEventListener('mouseleave', () => {
      clearHighlight();
      circle.setAttribute('r', '16');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('opacity', '0.85');
    });

    circle.addEventListener('click', (e) => {
      e.stopPropagation();
      selectNode(node);
    });

    g.appendChild(circle);

    const text = document.createElementNS(NS, 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '8px');
    text.setAttribute('fill', '#fff');
    text.setAttribute('pointer-events', 'none');
    text.setAttribute('opacity', '0.7');
    text.textContent = node.label.substring(0, 10);
    g.appendChild(text);

    svgElement.appendChild(g);
  });

  updateCounts();
}

// ============================================================================
// UTILIDADES
// ============================================================================

function getVisibleNodes() {
  if (currentFilter === 'all') {
    return NODES;
  }
  return NODES.filter(n => n.group === currentFilter);
}

function getGroupColor(group) {
  const colors = {
    'Ambiental': '#2fd4c8',
    'Patrimonio': '#a276f2',
    'Funcional': '#5b8def',
    'Socioeconómico': '#ef9552'
  };
  return colors[group] || '#8891a5';
}

function getGroupStroke(group) {
  const strokes = {
    'Ambiental': '#1a9d94',
    'Patrimonio': '#7a4fb3',
    'Funcional': '#3d5ba8',
    'Socioeconómico': '#c97a3d'
  };
  return strokes[group] || '#5a6274';
}

function getRelationColor(type) {
  const colors = {
    'Relación Hídrica': 'rgba(38, 189, 227, 0.7)',
    'Relación Ecológica': 'rgba(47, 212, 200, 0.7)',
    'Relación Funcional': 'rgba(91, 141, 239, 0.7)',
    'Relación Patrimonial': 'rgba(162, 118, 242, 0.7)',
    'Relación Económica': 'rgba(239, 149, 82, 0.7)',
    'Relación Social': 'rgba(76, 175, 80, 0.7)'
  };
  return colors[type] || 'rgba(255, 255, 255, 0.5)';
}

function relationTypeToClass(type) {
  return type.toLowerCase().replace(/\s+/g, '-');
}

function highlightConnections(nodeId) {
  const node = NODES.find(n => n.id === nodeId);
  if (!node) return;

  const connectedIds = RELATIONS
    .filter(r => r.source === nodeId || r.target === nodeId)
    .map(r => r.source === nodeId ? r.target : r.source);

  // Resaltar nodos
  svg.selectAll('.node').attr('opacity', n => {
    if (n.id === nodeId) return 1;
    return connectedIds.includes(n.id) ? 0.8 : 0.2;
  });

  svg.selectAll('circle').attr('stroke-width', n => {
    if (n.id === nodeId) return 3;
    return connectedIds.includes(n.id) ? 2 : 2;
  });

  // Resaltar conexiones
  svg.selectAll('line').attr('opacity', l => {
    if (l.source === nodeId || l.target === nodeId) return 0.8;
    return 0.1;
  });
}

function clearHighlight() {
  svg.selectAll('.node').attr('opacity', 0.85);
  svg.selectAll('circle').attr('stroke-width', 2);
  svg.selectAll('line').attr('opacity', 0.5);
}

// ============================================================================
// FILTROS Y SELECCIÓN
// ============================================================================

function filterByStructure(structure) {
  currentFilter = structure;
  drawNetwork();
  updateCounts();
}

function selectNode(node) {
  if (!node || !node.id || !node.group) {
    console.warn('Node inválido:', node);
    return;
  }

  selectedNode = node;
  showNodeInfo(node);
}

function showNodeInfo(node) {
  if (!node) return;

  const connectedRelations = RELATIONS.filter(r =>
    r.source === node.id || r.target === node.id
  );

  const nameEl = document.getElementById('nodeInfoName');
  const structureEl = document.getElementById('nodeInfoStructure');
  const connectionsEl = document.getElementById('nodeInfoConnections');

  if (nameEl) nameEl.textContent = node.label || '-';
  if (structureEl) structureEl.textContent = node.group || '-';
  if (connectionsEl) {
    connectionsEl.innerHTML = `<strong>${connectedRelations.length}</strong> conexiones POT`;
  }

  const panel = document.getElementById('nodeInfoPanel');
  if (panel) panel.classList.add('visible');
}

function closeNodeInfo() {
  const panel = document.getElementById('nodeInfoPanel');
  if (panel) panel.classList.remove('visible');
  selectedNode = null;
}

function updateNetwork() {
  // Actualizar tipos de relación visible
  const checkboxes = document.querySelectorAll('.legend-item input[type="checkbox"]');
  
  checkboxes.forEach((checkbox, index) => {
    const types = [
      'Relación Hídrica',
      'Relación Ecológica',
      'Relación Funcional',
      'Relación Patrimonial',
      'Relación Económica',
      'Relación Social'
    ];
    if (types[index]) {
      visibleRelationTypes[types[index]] = checkbox.checked;
    }
  });

  drawNetwork();
  updateCounts();
}

// ============================================================================
// MATRIZ
// ============================================================================

function populateMatrix() {
  const tbody = document.getElementById('relationshipsBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const visibleNodes = getVisibleNodes();
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

  const visibleRelations = RELATIONS.filter(r =>
    visibleNodeIds.has(r.source) && visibleNodeIds.has(r.target)
  );

  visibleRelations.forEach(relation => {
    const sourceNode = NODES.find(n => n.id === relation.source);
    const targetNode = NODES.find(n => n.id === relation.target);

    if (!sourceNode || !targetNode) return;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><span class="rel-tag ${sourceNode.group}">${sourceNode.group}</span></td>
      <td>${sourceNode.label}</td>
      <td><span class="rel-tag ${targetNode.group}">${targetNode.group}</span></td>
      <td>${targetNode.label}</td>
      <td>${relation.type}</td>
    `;
    tbody.appendChild(row);
  });
}

// ============================================================================
// CONTADORES
// ============================================================================

function updateCounts() {
  const visibleNodes = getVisibleNodes();
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

  const visibleRelations = RELATIONS.filter(r =>
    visibleNodeIds.has(r.source) &&
    visibleNodeIds.has(r.target) &&
    visibleRelationTypes[r.type]
  );

  const nodeCountEl = document.getElementById('nodeCount');
  const linkCountEl = document.getElementById('linkCount');

  if (nodeCountEl) nodeCountEl.textContent = visibleNodes.length;
  if (linkCountEl) linkCountEl.textContent = visibleRelations.length;

  // Actualizar contadores de insight cards
  const allCount = NODES.length;
  const ambCount = NODES.filter(n => n.group === 'Ambiental').length;
  const patCount = NODES.filter(n => n.group === 'Patrimonio').length;
  const funcCount = NODES.filter(n => n.group === 'Funcional').length;
  const econCount = NODES.filter(n => n.group === 'Socioeconómico').length;

  const countAllEl = document.getElementById('count-all');
  const countAmbEl = document.getElementById('count-amb');
  const countPatEl = document.getElementById('count-pat');
  const countFuncEl = document.getElementById('count-func');
  const countEconEl = document.getElementById('count-econ');

  if (countAllEl) countAllEl.textContent = allCount;
  if (countAmbEl) countAmbEl.textContent = ambCount;
  if (countPatEl) countPatEl.textContent = patCount;
  if (countFuncEl) countFuncEl.textContent = funcCount;
  if (countEconEl) countEconEl.textContent = econCount;

  // Actualizar matriz
  populateMatrix();
}
