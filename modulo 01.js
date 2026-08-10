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
  svg = d3.select('#networkViz');
  drawNetwork();
}

// ============================================================================
// DIBUJAR LA RED
// ============================================================================

function drawNetwork() {
  // Limpiar SVG
  svg.selectAll('*').remove();

  // Obtener nodos y relaciones visibles
  const visibleNodes = getVisibleNodes();
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleRelations = RELATIONS.filter(r =>
    visibleNodeIds.has(r.source) &&
    visibleNodeIds.has(r.target) &&
    visibleRelationTypes[r.type]
  );

  // DIBUJAR LÍNEAS (antes que nodos para que queden atrás)
  const lines = svg.append('g').attr('class', 'links');
  
  visibleRelations.forEach(relation => {
    const sourceNode = NODES.find(n => n.id === relation.source);
    const targetNode = NODES.find(n => n.id === relation.target);

    if (sourceNode && targetNode) {
      lines.append('line')
        .attr('class', `link link-${relationTypeToClass(relation.type)}`)
        .attr('x1', sourceNode.x)
        .attr('y1', sourceNode.y)
        .attr('x2', targetNode.x)
        .attr('y2', targetNode.y)
        .attr('stroke', getRelationColor(relation.type))
        .attr('stroke-width', 1.2)
        .attr('opacity', 0.5)
        .attr('data-type', relation.type);
    }
  });

  // DIBUJAR NODOS
  const nodesGroup = svg.append('g').attr('class', 'nodes');

  visibleNodes.forEach(node => {
    const g = nodesGroup.append('g')
      .attr('class', `node node-${node.group.toLowerCase()}`)
      .attr('data-id', node.id)
      .attr('transform', `translate(${node.x},${node.y})`);

    // Círculo
    g.append('circle')
      .attr('r', 16)
      .attr('fill', getGroupColor(node.group))
      .attr('stroke', getGroupStroke(node.group))
      .attr('stroke-width', 2)
      .attr('opacity', 0.85)
      .on('mouseenter', function() {
        highlightConnections(node.id);
        d3.select(this).transition().duration(200)
          .attr('r', 24)
          .attr('stroke-width', 3)
          .attr('opacity', 1);
      })
      .on('mouseleave', function() {
        clearHighlight();
        d3.select(this).transition().duration(200)
          .attr('r', 16)
          .attr('stroke-width', 2)
          .attr('opacity', 0.85);
      })
      .on('click', function(event) {
        event.stopPropagation();
        selectNode(node);
      });

    // Texto
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '8px')
      .attr('fill', '#fff')
      .attr('pointer-events', 'none')
      .attr('opacity', 0.7)
      .text(node.label.substring(0, 10));
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
