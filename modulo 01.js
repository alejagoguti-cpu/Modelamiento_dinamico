// ============================================================================
// DATOS: 130 NODOS + 20 RELACIONES POT REALES
// ============================================================================

const NODOS = [
  // AMBIENTAL (40)
  { id: "a1", name: "EEP Principal", group: "amb", x: 200, y: 250 },
  { id: "a2", name: "Corredor Río Bogotá", group: "amb", x: 300, y: 180 },
  { id: "a3", name: "Humedales", group: "amb", x: 400, y: 150 },
  { id: "a4", name: "Bosques", group: "amb", x: 500, y: 200 },
  { id: "a5", name: "Biodiversidad", group: "amb", x: 150, y: 350 },
  { id: "a6", name: "Ciclo Agua", group: "amb", x: 350, y: 400 },
  { id: "a7", name: "Energías Renovables", group: "amb", x: 550, y: 350 },
  { id: "a8", name: "Mitigación Climática", group: "amb", x: 650, y: 250 },
  { id: "a9", name: "Suelos Productivos", group: "amb", x: 100, y: 450 },
  { id: "a10", name: "Agricultura Urbana", group: "amb", x: 250, y: 500 },
  ...Array(30).fill(null).map((_, i) => ({ 
    id: `a${11+i}`, name: `Componente Amb ${11+i}`, group: "amb",
    x: 100 + Math.random() * 600, y: 100 + Math.random() * 500
  })),

  // PATRIMONIO (30)
  { id: "p1", name: "Patrimonio Centro Histórico", group: "patri", x: 800, y: 250 },
  { id: "p2", name: "Monumentos", group: "patri", x: 850, y: 150 },
  { id: "p3", name: "Memoria Colectiva", group: "patri", x: 900, y: 350 },
  { id: "p4", name: "Espacios Históricos", group: "patri", x: 950, y: 280 },
  { id: "p5", name: "Patrimonio Inmaterial", group: "patri", x: 750, y: 400 },
  ...Array(25).fill(null).map((_, i) => ({ 
    id: `p${6+i}`, name: `Componente Pat ${6+i}`, group: "patri",
    x: 750 + Math.random() * 300, y: 100 + Math.random() * 500
  })),

  // FUNCIONAL (30)
  { id: "f1", name: "Manzanas del Cuidado", group: "func", x: 200, y: 550 },
  { id: "f2", name: "Servicios de Salud", group: "func", x: 350, y: 600 },
  { id: "f3", name: "Educación", group: "func", x: 450, y: 580 },
  { id: "f4", name: "Agua y Saneamiento", group: "func", x: 100, y: 650 },
  { id: "f5", name: "Transporte Público", group: "func", x: 550, y: 620 },
  ...Array(25).fill(null).map((_, i) => ({ 
    id: `f${6+i}`, name: `Componente Func ${6+i}`, group: "func",
    x: 100 + Math.random() * 500, y: 500 + Math.random() * 200
  })),

  // SOCIOECONÓMICO (30)
  { id: "e1", name: "Dinámicas Económicas", group: "econ", x: 700, y: 550 },
  { id: "e2", name: "Mercado Laboral", group: "econ", x: 800, y: 600 },
  { id: "e3", name: "Economía Informal", group: "econ", x: 900, y: 580 },
  { id: "e4", name: "Emprendimiento", group: "econ", x: 1000, y: 620 },
  { id: "e5", name: "Sectores Productivos", group: "econ", x: 750, y: 650 },
  ...Array(25).fill(null).map((_, i) => ({ 
    id: `e${6+i}`, name: `Componente Econ ${6+i}`, group: "econ",
    x: 750 + Math.random() * 300, y: 500 + Math.random() * 200
  }))
];

const RELACIONES = [
  // AMBIENTAL ↔ PATRIMONIO
  { source: "a1", target: "p1", type: "ecol" },
  { source: "a2", target: "p2", type: "hidrica" },
  { source: "a3", target: "p3", type: "ecol" },
  
  // AMBIENTAL ↔ FUNCIONAL
  { source: "a1", target: "f1", type: "func-rel" },
  { source: "a2", target: "f4", type: "hidrica" },
  { source: "a6", target: "f4", type: "hidrica" },
  { source: "a7", target: "f5", type: "func-rel" },
  
  // AMBIENTAL ↔ SOCIOECONÓMICO
  { source: "a1", target: "e1", type: "func-rel" },
  { source: "a7", target: "e5", type: "func-rel" },
  { source: "a9", target: "e3", type: "func-rel" },
  
  // PATRIMONIO ↔ FUNCIONAL
  { source: "p1", target: "f1", type: "func-rel" },
  { source: "p2", target: "f3", type: "func-rel" },
  { source: "p3", target: "f1", type: "ecol" },
  
  // PATRIMONIO ↔ SOCIOECONÓMICO
  { source: "p1", target: "e1", type: "func-rel" },
  { source: "p2", target: "e4", type: "func-rel" },
  
  // FUNCIONAL ↔ SOCIOECONÓMICO
  { source: "f1", target: "e1", type: "func-rel" },
  { source: "f2", target: "e2", type: "func-rel" },
  { source: "f3", target: "e2", type: "func-rel" },
  { source: "f4", target: "e3", type: "hidrica" },
  { source: "f5", target: "e2", type: "func-rel" }
];

// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

let currentFilter = 'all';
let visibleTypes = { amb: true, patri: true, func: true, econ: true };
let visibleRelations = { hidrica: true, ecol: true, 'func-rel': true };

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  drawNetwork();
  populateMatrix();
  setupLegendListeners();
  document.getElementById('edgeInfoClose').onclick = closeInfo;
});

// ============================================================================
// DIBUJAR RED
// ============================================================================

function drawNetwork() {
  const svgEl = document.getElementById('networkViz');
  if (!svgEl) return;

  svgEl.innerHTML = '';

  const visibleNodos = NODOS.filter(n => visibleTypes[n.group]);
  const visibleNodeIds = new Set(visibleNodos.map(n => n.id));
  
  const visibleRels = RELACIONES.filter(r =>
    visibleNodeIds.has(r.source) &&
    visibleNodeIds.has(r.target) &&
    visibleRelations[r.type]
  );

  const NS = 'http://www.w3.org/2000/svg';

  // Dibujar líneas
  visibleRels.forEach(rel => {
    const src = NODOS.find(n => n.id === rel.source);
    const tgt = NODOS.find(n => n.id === rel.target);
    if (!src || !tgt) return;

    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', src.x);
    line.setAttribute('y1', src.y);
    line.setAttribute('x2', tgt.x);
    line.setAttribute('y2', tgt.y);
    line.setAttribute('stroke', getRelColor(rel.type));
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('opacity', '0.4');
    line.setAttribute('class', `link link-${rel.type}`);
    svgEl.appendChild(line);
  });

  // Dibujar nodos
  visibleNodos.forEach(node => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', `translate(${node.x},${node.y})`);
    g.setAttribute('class', `node node-${node.group}`);
    g.setAttribute('data-id', node.id);

    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('r', '18');
    circle.setAttribute('fill', getNodeColor(node.group));
    circle.setAttribute('stroke', getNodeStroke(node.group));
    circle.setAttribute('stroke-width', '2.5');
    circle.setAttribute('opacity', '0.85');
    circle.style.cursor = 'pointer';

    circle.addEventListener('mouseenter', () => {
      highlightNode(node.id);
      circle.setAttribute('r', '26');
      circle.setAttribute('stroke-width', '3');
    });

    circle.addEventListener('mouseleave', () => {
      clearHighlight();
      circle.setAttribute('r', '18');
      circle.setAttribute('stroke-width', '2.5');
    });

    circle.addEventListener('click', () => showNodeInfo(node));

    g.appendChild(circle);

    const text = document.createElementNS(NS, 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '9px');
    text.setAttribute('fill', '#fff');
    text.setAttribute('pointer-events', 'none');
    text.setAttribute('opacity', '0.8');
    text.textContent = node.name.substring(0, 12);
    g.appendChild(text);

    svgEl.appendChild(g);
  });
}

// ============================================================================
// UTILIDADES DE COLOR
// ============================================================================

function getNodeColor(group) {
  const colors = { amb: '#2fd4c8', patri: '#a276f2', func: '#5b8def', econ: '#ef9552' };
  return colors[group] || '#8891a5';
}

function getNodeStroke(group) {
  const strokes = { amb: '#1a9d94', patri: '#7a4fb3', func: '#3d5ba8', econ: '#c97a3d' };
  return strokes[group] || '#5a6274';
}

function getRelColor(type) {
  const colors = {
    hidrica: 'rgba(38, 189, 227, 0.7)',
    ecol: 'rgba(47, 212, 200, 0.7)',
    'func-rel': 'rgba(91, 141, 239, 0.7)'
  };
  return colors[type] || 'rgba(255, 255, 255, 0.5)';
}

// ============================================================================
// INTERACTIVIDAD
// ============================================================================

function filterNetwork(filter) {
  currentFilter = filter;
  
  if (filter === 'all') {
    visibleTypes = { amb: true, patri: true, func: true, econ: true };
  } else {
    visibleTypes = { amb: false, patri: false, func: false, econ: false };
    visibleTypes[filter] = true;
  }

  document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  drawNetwork();
  populateMatrix();
}

function updateNetwork() {
  const checkboxes = document.querySelectorAll('.legend-item input[type="checkbox"]');
  checkboxes.forEach(cb => {
    const type = cb.parentElement.dataset.type;
    if (['amb', 'patri', 'func', 'econ'].includes(type)) {
      visibleTypes[type] = cb.checked;
    } else if (['hidrica', 'ecol', 'func-rel'].includes(type)) {
      visibleRelations[type] = cb.checked;
    }
  });

  drawNetwork();
  populateMatrix();
}

function highlightNode(nodeId) {
  const connectedIds = RELACIONES
    .filter(r => r.source === nodeId || r.target === nodeId)
    .map(r => r.source === nodeId ? r.target : r.source);

  const svgEl = document.getElementById('networkViz');
  svgEl.querySelectorAll('.node').forEach(n => {
    if (n.dataset.id === nodeId || connectedIds.includes(n.dataset.id)) {
      n.style.opacity = '1';
    } else {
      n.style.opacity = '0.2';
    }
  });

  svgEl.querySelectorAll('line').forEach(l => {
    l.style.opacity = '0.15';
  });

  svgEl.querySelectorAll(`.link-hidrica, .link-ecol, .link-func-rel`).forEach(l => {
    if (l.style.opacity !== '0.15') l.style.opacity = '0.6';
  });
}

function clearHighlight() {
  const svgEl = document.getElementById('networkViz');
  svgEl.querySelectorAll('.node').forEach(n => n.style.opacity = '0.85');
  svgEl.querySelectorAll('line').forEach(l => l.style.opacity = '0.4');
}

function showNodeInfo(node) {
  const rels = RELACIONES.filter(r => r.source === node.id || r.target === node.id).length;
  
  document.getElementById('edgeInfoTitle').textContent = node.name;
  document.getElementById('edgeInfoType').textContent = `Estructura: ${node.group.toUpperCase()}`;
  document.getElementById('edgeInfoQuote').textContent = `${rels} conexiones en la red`;

  document.getElementById('edgeInfoPanel').style.display = 'block';
}

function closeInfo() {
  document.getElementById('edgeInfoPanel').style.display = 'none';
}

function setupLegendListeners() {
  // Ya está manejado en updateNetwork()
}

// ============================================================================
// MATRIZ
// ============================================================================

function populateMatrix() {
  const bodyEl = document.getElementById('matrixBody');
  if (!bodyEl) return;

  bodyEl.innerHTML = '';

  const visibleNodeIds = new Set(NODOS.filter(n => visibleTypes[n.group]).map(n => n.id));
  const visibleRels = RELACIONES.filter(r =>
    visibleNodeIds.has(r.source) &&
    visibleNodeIds.has(r.target) &&
    visibleRelations[r.type]
  );

  visibleRels.forEach(rel => {
    const src = NODOS.find(n => n.id === rel.source);
    const tgt = NODOS.find(n => n.id === rel.target);
    if (!src || !tgt) return;

    const row = document.createElement('div');
    row.className = 'matrix-row';
    row.innerHTML = `
      <div class="matrix-cell"><span class="alignment-tag">${src.group}</span></div>
      <div class="matrix-cell">${src.name}</div>
      <div class="matrix-cell"><span class="alignment-tag">${tgt.group}</span></div>
      <div class="matrix-cell">${tgt.name}</div>
      <div class="matrix-cell">${rel.type}</div>
    `;
    bodyEl.appendChild(row);
  });
}
