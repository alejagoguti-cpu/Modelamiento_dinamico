// ============================================================================
// MÓDULO 01: CONSTRUIR LA RED - CÓDIGO FUNCIONAL
// 130 nodos + 70+ relaciones de 4 estructuras POT
// ============================================================================

// DATOS: Nodos (130 total)
const NODES = [
  // AMBIENTAL (40)
  { id: "eep-1", name: "EEP", group: "amb", category: "hub", icon: "leaf", color: "#2fd4c8" },
  { id: "eep-2", name: "Corredor Rio Bogotá", group: "amb", category: "main", icon: "water", color: "#2fd4c8" },
  { id: "eep-3", name: "Humedales", group: "amb", category: "main", icon: "water", color: "#2fd4c8" },
  { id: "eep-4", name: "Bosques", group: "amb", category: "secondary", icon: "tree", color: "#2fd4c8" },
  { id: "eep-5", name: "Biodiversidad", group: "amb", category: "secondary", icon: "bug", color: "#2fd4c8" },
  { id: "eep-6", name: "Calidad Aire", group: "amb", category: "secondary", icon: "wind", color: "#2fd4c8" },
  { id: "eep-7", name: "Ciclo Agua", group: "amb", category: "secondary", icon: "droplet", color: "#2fd4c8" },
  { id: "eep-8", name: "Mitigación Climática", group: "amb", category: "secondary", icon: "globe", color: "#2fd4c8" },
  { id: "eep-9", name: "Suelos Productivos", group: "amb", category: "secondary", icon: "sprout", color: "#2fd4c8" },
  { id: "eep-10", name: "Energías Renovables", group: "amb", category: "secondary", icon: "bolt", color: "#2fd4c8" },
  ...Array(30).fill(null).map((_, i) => ({ 
    id: `eep-${11+i}`, name: `Componente Amb ${11+i}`, group: "amb", category: "secondary", icon: "circle", color: "#2fd4c8"
  })),

  // PATRIMONIOS (30)
  { id: "pat-1", name: "Patrimonio Centro Histórico", group: "patri", category: "hub", icon: "landmark", color: "#a276f2" },
  { id: "pat-2", name: "Monumentos", group: "patri", category: "main", icon: "building", color: "#a276f2" },
  { id: "pat-3", name: "Memoria Colectiva", group: "patri", category: "main", icon: "book", color: "#a276f2" },
  { id: "pat-4", name: "Espacios Históricos", group: "patri", category: "secondary", icon: "compass", color: "#a276f2" },
  { id: "pat-5", name: "Patrimonio Inmaterial", group: "patri", category: "secondary", icon: "music", color: "#a276f2" },
  ...Array(25).fill(null).map((_, i) => ({ 
    id: `pat-${6+i}`, name: `Componente Pat ${6+i}`, group: "patri", category: "secondary", icon: "circle", color: "#a276f2"
  })),

  // FUNCIONAL (30)
  { id: "func-1", name: "Manzanas del Cuidado", group: "func", category: "hub", icon: "heart", color: "#5b8def" },
  { id: "func-2", name: "Servicios Salud", group: "func", category: "main", icon: "hospital", color: "#5b8def" },
  { id: "func-3", name: "Educación", group: "func", category: "main", icon: "graduation", color: "#5b8def" },
  { id: "func-4", name: "Agua y Saneamiento", group: "func", category: "secondary", icon: "faucet", color: "#5b8def" },
  { id: "func-5", name: "Transporte Público", group: "func", category: "secondary", icon: "bus", color: "#5b8def" },
  { id: "func-6", name: "Infraestructura Social", group: "func", category: "secondary", icon: "building", color: "#5b8def" },
  ...Array(24).fill(null).map((_, i) => ({ 
    id: `func-${7+i}`, name: `Componente Func ${7+i}`, group: "func", category: "secondary", icon: "circle", color: "#5b8def"
  })),

  // SOCIOECONÓMICO (30)
  { id: "econ-1", name: "Dinámicas Económicas", group: "econ", category: "hub", icon: "chart-bar", color: "#ef9552" },
  { id: "econ-2", name: "Mercado Laboral", group: "econ", category: "main", icon: "briefcase", color: "#ef9552" },
  { id: "econ-3", name: "Economía Informal", group: "econ", category: "main", icon: "shop", color: "#ef9552" },
  { id: "econ-4", name: "Emprendimiento", group: "econ", category: "secondary", icon: "rocket", color: "#ef9552" },
  { id: "econ-5", name: "Sectores Productivos", group: "econ", category: "secondary", icon: "factory", color: "#ef9552" },
  { id: "econ-6", name: "Turismo Urbano", group: "econ", category: "secondary", icon: "camera", color: "#ef9552" },
  ...Array(24).fill(null).map((_, i) => ({ 
    id: `econ-${7+i}`, name: `Componente Econ ${7+i}`, group: "econ", category: "secondary", icon: "circle", color: "#ef9552"
  }))
];

// RELACIONES (70+)
const LINKS = [
  // Ambiental ↔ Patrimonios
  { source: "eep-1", target: "pat-1", type: "complementary" },
  { source: "eep-2", target: "pat-2", type: "functional" },
  { source: "eep-3", target: "pat-3", type: "complementary" },
  // Ambiental ↔ Funcional
  { source: "eep-1", target: "func-1", type: "causal" },
  { source: "eep-2", target: "func-5", type: "functional" },
  { source: "eep-4", target: "func-2", type: "complementary" },
  { source: "eep-7", target: "func-4", type: "causal" },
  // Ambiental ↔ Socioeconómico
  { source: "eep-1", target: "econ-1", type: "complementary" },
  { source: "eep-9", target: "econ-2", type: "functional" },
  { source: "eep-10", target: "econ-5", type: "functional" },
  // Patrimonios ↔ Funcional
  { source: "pat-1", target: "func-1", type: "complementary" },
  { source: "pat-2", target: "func-3", type: "functional" },
  { source: "pat-3", target: "func-6", type: "functional" },
  // Patrimonios ↔ Socioeconómico
  { source: "pat-1", target: "econ-1", type: "functional" },
  { source: "pat-2", target: "econ-4", type: "functional" },
  { source: "pat-3", target: "econ-6", type: "functional" },
  // Funcional ↔ Socioeconómico
  { source: "func-1", target: "econ-1", type: "causal" },
  { source: "func-2", target: "econ-2", type: "functional" },
  { source: "func-3", target: "econ-2", type: "functional" },
  { source: "func-4", target: "econ-3", type: "complementary" },
  { source: "func-5", target: "econ-2", type: "functional" },
  // Cruzadas adicionales
  { source: "eep-6", target: "func-2", type: "causal" },
  { source: "eep-8", target: "econ-5", type: "functional" },
  { source: "pat-5", target: "func-6", type: "functional" },
  { source: "econ-4", target: "eep-10", type: "functional" },
  ...Array(45).fill(null).map((_, i) => {
    const sourceNode = NODES[Math.floor(Math.random() * NODES.length)];
    const targetNode = NODES[Math.floor(Math.random() * NODES.length)];
    return {
      source: sourceNode.id,
      target: targetNode.id,
      type: ["complementary", "functional", "causal"][Math.floor(Math.random() * 3)]
    };
  }).filter(link => link.source !== link.target)
];

let svg, simulation, selectedNode = null, currentFilter = 'all';

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initNetwork();
    setupLegendListeners();
    populateMatrix();
  }, 150);
});

function initNetwork() {
  const container = document.getElementById('networkViz');
  if (!container) return;

  const width = 1000;
  const height = 680;

  // Limpiar SVG anterior
  svg = d3.select('#networkViz');
  svg.selectAll("*").remove();

  // Simulación D3
  simulation = d3.forceSimulation(NODES)
    .force('link', d3.forceLink(LINKS)
      .id(d => d.id)
      .distance(80)
      .strength(0.4))
    .force('charge', d3.forceManyBody().strength(-120).distanceMax(200))
    .force('collision', d3.forceCollide(25))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .alphaDecay(0.04);

  // ARISTAS
  const links = svg.append('g')
    .selectAll('line')
    .data(LINKS)
    .enter()
    .append('line')
    .attr('class', d => `link link-${d.type}`)
    .attr('stroke', d => getLinkColor(d.type))
    .attr('stroke-width', 1.2)
    .attr('opacity', 0.4);

  // NODOS
  const nodes = svg.append('g')
    .selectAll('circle')
    .data(NODES)
    .enter()
    .append('circle')
    .attr('class', d => `node node-${d.group} node-${d.category}`)
    .attr('r', d => getNodeRadius(d))
    .attr('fill', d => d.color)
    .attr('stroke', d => getNodeStroke(d))
    .attr('stroke-width', d => getStrokeWidth(d))
    .attr('opacity', 0.85)
    .on('mouseenter', function(event, d) {
      d3.select(this)
        .transition().duration(200)
        .attr('r', getNodeRadius(d) * 1.6)
        .attr('stroke-width', 3)
        .attr('opacity', 1);
      
      svg.selectAll('line').attr('opacity', link =>
        (link.source.id === d.id || link.target.id === d.id) ? 0.8 : 0.1
      );
      
      svg.selectAll('circle').attr('opacity', node =>
        (node.id === d.id || LINKS.some(l => (l.source.id === d.id && l.target.id === node.id) || (l.target.id === d.id && l.source.id === node.id))) ? 1 : 0.3
      );
    })
    .on('mouseleave', function(event, d) {
      d3.select(this)
        .transition().duration(200)
        .attr('r', getNodeRadius(d))
        .attr('stroke-width', getStrokeWidth(d))
        .attr('opacity', 0.85);
      
      svg.selectAll('line').attr('opacity', 0.4);
      svg.selectAll('circle').attr('opacity', 0.85);
    })
    .on('click', function(event, d) {
      showNodeInfo(d);
    })
    .call(d3.drag()
      .on('start', dragStart)
      .on('drag', dragged)
      .on('end', dragEnd));

  // TICK
  simulation.on('tick', () => {
    links
      .attr('x1', d => Math.max(0, Math.min(width, d.source.x)))
      .attr('y1', d => Math.max(0, Math.min(height, d.source.y)))
      .attr('x2', d => Math.max(0, Math.min(width, d.target.x)))
      .attr('y2', d => Math.max(0, Math.min(height, d.target.y)));

    nodes
      .attr('cx', d => d.x = Math.max(0, Math.min(width, d.x)))
      .attr('cy', d => d.y = Math.max(0, Math.min(height, d.y)));
  });

  // ZOOM
  const zoom = d3.zoom().on('zoom', (event) => {
    svg.select('g').attr('transform', event.transform);
  });
  svg.call(zoom);
}

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

function getNodeRadius(d) {
  if (d.category === 'hub') return 22;
  if (d.category === 'main') return 18;
  return 14;
}

function getNodeStroke(d) {
  const strokes = {
    'amb': '#1a9d94',
    'patri': '#7a4fb3',
    'func': '#3d5ba8',
    'econ': '#c97a3d'
  };
  return strokes[d.group] || '#5a6274';
}

function getStrokeWidth(d) {
  if (d.category === 'hub') return 2.5;
  if (d.category === 'main') return 2;
  return 1.5;
}

function getLinkColor(type) {
  const colors = {
    'complementary': 'rgba(47,212,200,0.5)',
    'functional': 'rgba(91,141,239,0.5)',
    'causal': 'rgba(162,118,242,0.5)'
  };
  return colors[type] || 'rgba(255,255,255,0.2)';
}

// ============================================================================
// INTERACTIVIDAD
// ============================================================================

function dragStart(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnd(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function filterNetwork(filter) {
  currentFilter = filter;
  
  document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

  svg.selectAll('circle').attr('opacity', d => {
    if (filter === 'all') return 0.85;
    return d.group === filter ? 0.85 : 0.15;
  });

  svg.selectAll('line').attr('opacity', d => {
    if (filter === 'all') return 0.4;
    const match = d.source.group === filter || d.target.group === filter;
    return match ? 0.6 : 0.05;
  });
}

function showNodeInfo(node) {
  selectedNode = node;
  const panel = document.getElementById('nodeInfoPanel');
  const name = document.getElementById('nodeInfoName');
  const structure = document.getElementById('nodeInfoStructure');
  const connections = document.getElementById('nodeInfoConnections');

  name.textContent = node.name;
  
  const structureMap = { 'amb': 'Ambiental y EEP', 'patri': 'Patrimonios', 'func': 'Funcional y Cuidado', 'econ': 'Socioeconómico' };
  structure.textContent = structureMap[node.group];
  
  const connectedLinks = LINKS.filter(l => l.source.id === node.id || l.target.id === node.id);
  connections.innerHTML = `<strong>${connectedLinks.length}</strong> conexiones en la red`;

  panel.classList.add('visible');

  document.getElementById('nodeInfoClose').onclick = () => {
    panel.classList.remove('visible');
    selectedNode = null;
  };
}

function setupLegendListeners() {
  document.querySelectorAll('.legend-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      const type = checkbox.parentElement.dataset.type;
      const isChecked = checkbox.checked;
      
      if (['amb', 'patri', 'func', 'econ'].includes(type)) {
        svg.selectAll('circle').attr('opacity', d => {
          if (type === d.group) {
            return isChecked ? 0.85 : 0.15;
          }
          return 0.85;
        });
      }
    });
  });
}

function toggleInsight(insight) {
  console.log('Insight:', insight);
  // Placeholder para futura funcionalidad
}

function populateMatrix() {
  const tbody = document.getElementById('relationshipsBody');
  const typeLabels = { 'complementary': 'Complementaria', 'functional': 'Funcional', 'causal': 'Causal' };
  const groupMap = { 'amb': 'Ambiental', 'patri': 'Patrimonio', 'func': 'Funcional', 'econ': 'Socioeconómico' };

  LINKS.slice(0, 25).forEach(link => {
    const sourceNode = NODES.find(n => n.id === link.source);
    const targetNode = NODES.find(n => n.id === link.target);

    if (sourceNode && targetNode) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><span class="rel-tag ${sourceNode.group}">${groupMap[sourceNode.group]}</span></td>
        <td>${sourceNode.name.substring(0, 30)}</td>
        <td><span class="rel-tag ${targetNode.group}">${groupMap[targetNode.group]}</span></td>
        <td>${targetNode.name.substring(0, 30)}</td>
        <td>${typeLabels[link.type]}</td>
      `;
      tbody.appendChild(row);
    }
  });
}
