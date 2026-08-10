// ============================================================================
// MÓDULO 01: CONSTRUIR LA RED
// Red interactiva de 130 nodos y 70+ relaciones de las 4 estructuras POT
// ============================================================================

// DATOS: 130 nodos distribuidos en 4 sistemas
const NODES_DATA = [
  // SISTEMA AMBIENTAL Y EEP (40 nodos)
  { id: "eep-1", name: "Estructura Ecológica Principal", group: "amb", category: "hub" },
  { id: "eep-2", name: "Corredor Ecológico Rio Bogotá", group: "amb", category: "main" },
  { id: "eep-3", name: "Parques Metropolitanos", group: "amb", category: "main" },
  { id: "eep-4", name: "Humedales Protegidos", group: "amb", category: "main" },
  { id: "eep-5", name: "Bosques de Protección", group: "amb", category: "main" },
  { id: "eep-6", name: "Zonas de Reserva", group: "amb", category: "secondary" },
  { id: "eep-7", name: "Conectores Ecológicos", group: "amb", category: "secondary" },
  { id: "eep-8", name: "Áreas de Amortiguamiento", group: "amb", category: "secondary" },
  { id: "eep-9", name: "Ciclo del Agua Urbana", group: "amb", category: "secondary" },
  { id: "eep-10", name: "Biodiversidad Local", group: "amb", category: "secondary" },
  { id: "eep-11", name: "Calidad del Aire", group: "amb", category: "secondary" },
  { id: "eep-12", name: "Mitigación Climática", group: "amb", category: "secondary" },
  { id: "eep-13", name: "Suelos Productivos", group: "amb", category: "secondary" },
  { id: "eep-14", name: "Agricultura Urbana", group: "amb", category: "secondary" },
  { id: "eep-15", name: "Energías Renovables", group: "amb", category: "secondary" },
  { id: "eep-16", name: "Gestión de Residuos", group: "amb", category: "secondary" },
  { id: "eep-17", name: "Espacios Verdes Locales", group: "amb", category: "secondary" },
  { id: "eep-18", name: "Zonas de Transición", group: "amb", category: "secondary" },
  { id: "eep-19", name: "Protección de Rondas Hídricas", group: "amb", category: "secondary" },
  { id: "eep-20", name: "Monitoreo Ambiental", group: "amb", category: "secondary" },
  { id: "eep-21", name: "Restauración Ecológica", group: "amb", category: "secondary" },
  { id: "eep-22", name: "Flora Nativa", group: "amb", category: "secondary" },
  { id: "eep-23", name: "Fauna Urbana", group: "amb", category: "secondary" },
  { id: "eep-24", name: "Drenaje Natural", group: "amb", category: "secondary" },
  { id: "eep-25", name: "Infiltración de Agua", group: "amb", category: "secondary" },
  { id: "eep-26", name: "Reducción de Isla de Calor", group: "amb", category: "secondary" },
  { id: "eep-27", name: "Permeabilidad del Suelo", group: "amb", category: "secondary" },
  { id: "eep-28", name: "Seguridad Hídrica", group: "amb", category: "secondary" },
  { id: "eep-29", name: "Gestión de Escorrentía", group: "amb", category: "secondary" },
  { id: "eep-30", name: "Ecoturismo", group: "amb", category: "secondary" },
  { id: "eep-31", name: "Educación Ambiental", group: "amb", category: "secondary" },
  { id: "eep-32", name: "Investigación Ecológica", group: "amb", category: "secondary" },
  { id: "eep-33", name: "Gobernanza Ambiental", group: "amb", category: "secondary" },
  { id: "eep-34", name: "Normatividad Verde", group: "amb", category: "secondary" },
  { id: "eep-35", name: "Financiamiento Verde", group: "amb", category: "secondary" },
  { id: "eep-36", name: "Certificación Ambiental", group: "amb", category: "secondary" },
  { id: "eep-37", name: "Sistemas de Información Ambiental", group: "amb", category: "secondary" },
  { id: "eep-38", name: "Adaptación al Cambio Climático", group: "amb", category: "secondary" },
  { id: "eep-39", name: "Resiliencia Ecológica", group: "amb", category: "secondary" },
  { id: "eep-40", name: "Planificación Ecorregional", group: "amb", category: "secondary" },

  // ESTRUCTURA DE PATRIMONIOS (30 nodos)
  { id: "pat-1", name: "Patrimonio Cultural Centro Histórico", group: "patri", category: "hub" },
  { id: "pat-2", name: "Zonas de Influencia Patrimonial", group: "patri", category: "main" },
  { id: "pat-3", name: "Monumentos y Sitios Arqueológicos", group: "patri", category: "main" },
  { id: "pat-4", name: "Espacios Públicos Históricos", group: "patri", category: "main" },
  { id: "pat-5", name: "Memoria Colectiva y Narrativas", group: "patri", category: "secondary" },
  { id: "pat-6", name: "Archivos y Documentación", group: "patri", category: "secondary" },
  { id: "pat-7", name: "Museos y Centros Culturales", group: "patri", category: "secondary" },
  { id: "pat-8", name: "Expresiones Artísticas Locales", group: "patri", category: "secondary" },
  { id: "pat-9", name: "Patrimonio Inmaterial", group: "patri", category: "secondary" },
  { id: "pat-10", name: "Conocimientos Tradicionales", group: "patri", category: "secondary" },
  { id: "pat-11", name: "Identidad Territorial", group: "patri", category: "secondary" },
  { id: "pat-12", name: "Lenguajes Locales y Dialectos", group: "patri", category: "secondary" },
  { id: "pat-13", name: "Culinaria Tradicional", group: "patri", category: "secondary" },
  { id: "pat-14", name: "Artesanía Local", group: "patri", category: "secondary" },
  { id: "pat-15", name: "Fiestas y Festivales", group: "patri", category: "secondary" },
  { id: "pat-16", name: "Ritualidades Comunitarias", group: "patri", category: "secondary" },
  { id: "pat-17", name: "Conservación y Restauración", group: "patri", category: "secondary" },
  { id: "pat-18", name: "Gestión Patrimonial", group: "patri", category: "secondary" },
  { id: "pat-19", name: "Financiamiento Cultural", group: "patri", category: "secondary" },
  { id: "pat-20", name: "Regulaciones para Protección", group: "patri", category: "secondary" },
  { id: "pat-21", name: "Participación Comunitaria", group: "patri", category: "secondary" },
  { id: "pat-22", name: "Investigación Histórica", group: "patri", category: "secondary" },
  { id: "pat-23", name: "Educación Patrimonial", group: "patri", category: "secondary" },
  { id: "pat-24", name: "Turismo Cultural", group: "patri", category: "secondary" },
  { id: "pat-25", name: "Emprendimiento Cultural", group: "patri", category: "secondary" },
  { id: "pat-26", name: "Economía Creativa", group: "patri", category: "secondary" },
  { id: "pat-27", name: "Infraestructura Cultural", group: "patri", category: "secondary" },
  { id: "pat-28", name: "Digitalización Patrimonial", group: "patri", category: "secondary" },
  { id: "pat-29", name: "Redes Culturales", group: "patri", category: "secondary" },
  { id: "pat-30", name: "Patrimonio en Riesgo", group: "patri", category: "secondary" },

  // ESTRUCTURA FUNCIONAL Y CUIDADO (30 nodos)
  { id: "func-1", name: "Manzanas del Cuidado", group: "func", category: "hub" },
  { id: "func-2", name: "Servicios de Salud Integrados", group: "func", category: "main" },
  { id: "func-3", name: "Educación y Formación", group: "func", category: "main" },
  { id: "func-4", name: "Infraestructura Social", group: "func", category: "main" },
  { id: "func-5", name: "Cuidado de la Infancia", group: "func", category: "secondary" },
  { id: "func-6", name: "Atención a Personas Mayores", group: "func", category: "secondary" },
  { id: "func-7", name: "Apoyo a Personas con Discapacidad", group: "func", category: "secondary" },
  { id: "func-8", name: "Servicios de Agua y Saneamiento", group: "func", category: "secondary" },
  { id: "func-9", name: "Infraestructura de Energía", group: "func", category: "secondary" },
  { id: "func-10", name: "Telecomunicaciones", group: "func", category: "secondary" },
  { id: "func-11", name: "Transporte Público Equitativo", group: "func", category: "secondary" },
  { id: "func-12", name: "Seguridad Alimentaria", group: "func", category: "secondary" },
  { id: "func-13", name: "Espacios Públicos Seguros", group: "func", category: "secondary" },
  { id: "func-14", name: "Accesibilidad Universal", group: "func", category: "secondary" },
  { id: "func-15", name: "Inclusión Social", group: "func", category: "secondary" },
  { id: "func-16", name: "Atención Psicosocial", group: "func", category: "secondary" },
  { id: "func-17", name: "Redes Comunitarias de Cuidado", group: "func", category: "secondary" },
  { id: "func-18", name: "Gobernanza del Cuidado", group: "func", category: "secondary" },
  { id: "func-19", name: "Financiamiento Social", group: "func", category: "secondary" },
  { id: "func-20", name: "Indicadores de Bienestar", group: "func", category: "secondary" },
  { id: "func-21", name: "Monitoreo de Cobertura", group: "func", category: "secondary" },
  { id: "func-22", name: "Equidad de Género en Servicios", group: "func", category: "secondary" },
  { id: "func-23", name: "Prevención de Violencias", group: "func", category: "secondary" },
  { id: "func-24", name: "Salud Mental Comunitaria", group: "func", category: "secondary" },
  { id: "func-25", name: "Nutrición y Alimentación", group: "func", category: "secondary" },
  { id: "func-26", name: "Actividad Física y Recreación", group: "func", category: "secondary" },
  { id: "func-27", name: "Espacios Lúdicos Infantiles", group: "func", category: "secondary" },
  { id: "func-28", name: "Bibliotecas y Centros de Aprendizaje", group: "func", category: "secondary" },
  { id: "func-29", name: "Asesoramiento Jurídico", group: "func", category: "secondary" },
  { id: "func-30", name: "Gestión Integrada del Cuidado", group: "func", category: "secondary" },

  // ESTRUCTURA SOCIOECONÓMICA (30 nodos)
  { id: "econ-1", name: "Dinámicas Económicas Integradas", group: "econ", category: "hub" },
  { id: "econ-2", name: "Mercado Laboral Formal", group: "econ", category: "main" },
  { id: "econ-3", name: "Economía Informal y Ambulante", group: "econ", category: "main" },
  { id: "econ-4", name: "Emprendimiento y PYMES", group: "econ", category: "main" },
  { id: "econ-5", name: "Sectores Productivos Estratégicos", group: "econ", category: "secondary" },
  { id: "econ-6", name: "Tecnología e Innovación", group: "econ", category: "secondary" },
  { id: "econ-7", name: "Industria Creativa", group: "econ", category: "secondary" },
  { id: "econ-8", name: "Turismo Urbano", group: "econ", category: "secondary" },
  { id: "econ-9", name: "Comercio de Proximidad", group: "econ", category: "secondary" },
  { id: "econ-10", name: "Economía del Cuidado", group: "econ", category: "secondary" },
  { id: "econ-11", name: "Cooperativismo y Asociacionismo", group: "econ", category: "secondary" },
  { id: "econ-12", name: "Inclusión Económica de Mujeres", group: "econ", category: "secondary" },
  { id: "econ-13", name: "Jóvenes en Empleabilidad", group: "econ", category: "secondary" },
  { id: "econ-14", name: "Poblaciones Vulnerables", group: "econ", category: "secondary" },
  { id: "econ-15", name: "Migración Laboral", group: "econ", category: "secondary" },
  { id: "econ-16", name: "Formación Laboral Continua", group: "econ", category: "secondary" },
  { id: "econ-17", name: "Seguridad Social Integral", group: "econ", category: "secondary" },
  { id: "econ-18", name: "Finanzas Inclusivas", group: "econ", category: "secondary" },
  { id: "econ-19", name: "Acceso al Crédito", group: "econ", category: "secondary" },
  { id: "econ-20", name: "Tributación Justa", group: "econ", category: "secondary" },
  { id: "econ-21", name: "Presupuestos Participativos", group: "econ", category: "secondary" },
  { id: "econ-22", name: "Incentivos Económicos", group: "econ", category: "secondary" },
  { id: "econ-23", name: "Infraestructura Productiva", group: "econ", category: "secondary" },
  { id: "econ-24", name: "Espacios de Trabajo Compartido", group: "econ", category: "secondary" },
  { id: "econ-25", name: "Cadenas de Suministro Locales", group: "econ", category: "secondary" },
  { id: "econ-26", name: "Comercio Justo y Ético", group: "econ", category: "secondary" },
  { id: "econ-27", name: "Economía Circular", group: "econ", category: "secondary" },
  { id: "econ-28", name: "Sostenibilidad Financiera", group: "econ", category: "secondary" },
  { id: "econ-29", name: "Inversión Social", group: "econ", category: "secondary" },
  { id: "econ-30", name: "Gobernanza Económica", group: "econ", category: "secondary" }
];

// RELACIONES (70+ enlaces entre estructuras)
const LINKS_DATA = [
  // AMBIENTAL → PATRIMONIOS
  { source: "eep-1", target: "pat-1", type: "complementary" },
  { source: "eep-2", target: "pat-2", type: "complementary" },
  { source: "eep-3", target: "pat-4", type: "functional" },
  { source: "eep-4", target: "pat-11", type: "causal" },
  { source: "eep-5", target: "pat-3", type: "complementary" },
  { source: "eep-22", target: "pat-9", type: "functional" },
  { source: "eep-23", target: "pat-16", type: "functional" },
  { source: "eep-31", target: "pat-23", type: "functional" },

  // AMBIENTAL → FUNCIONAL
  { source: "eep-1", target: "func-1", type: "causal" },
  { source: "eep-2", target: "func-11", type: "functional" },
  { source: "eep-4", target: "func-8", type: "functional" },
  { source: "eep-9", target: "func-8", type: "causal" },
  { source: "eep-11", target: "func-2", type: "causal" },
  { source: "eep-12", target: "func-1", type: "complementary" },
  { source: "eep-13", target: "func-12", type: "causal" },
  { source: "eep-14", target: "func-12", type: "functional" },
  { source: "eep-17", target: "func-13", type: "complementary" },
  { source: "eep-26", target: "func-24", type: "causal" },
  { source: "eep-28", target: "func-8", type: "causal" },

  // AMBIENTAL → SOCIOECONÓMICO
  { source: "eep-1", target: "econ-1", type: "complementary" },
  { source: "eep-13", target: "econ-5", type: "functional" },
  { source: "eep-14", target: "econ-5", type: "functional" },
  { source: "eep-15", target: "econ-5", type: "functional" },
  { source: "eep-16", target: "econ-5", type: "functional" },
  { source: "eep-30", target: "econ-8", type: "functional" },
  { source: "eep-31", target: "econ-16", type: "functional" },
  { source: "eep-32", target: "econ-6", type: "functional" },

  // PATRIMONIOS → FUNCIONAL
  { source: "pat-1", target: "func-1", type: "complementary" },
  { source: "pat-5", target: "func-15", type: "functional" },
  { source: "pat-7", target: "func-3", type: "functional" },
  { source: "pat-8", target: "func-26", type: "functional" },
  { source: "pat-9", target: "func-5", type: "complementary" },
  { source: "pat-10", target: "func-3", type: "functional" },
  { source: "pat-12", target: "func-3", type: "functional" },
  { source: "pat-13", target: "func-12", type: "functional" },
  { source: "pat-14", target: "func-26", type: "functional" },

  // PATRIMONIOS → SOCIOECONÓMICO
  { source: "pat-1", target: "econ-1", type: "complementary" },
  { source: "pat-7", target: "econ-7", type: "functional" },
  { source: "pat-8", target: "econ-7", type: "functional" },
  { source: "pat-14", target: "econ-7", type: "functional" },
  { source: "pat-24", target: "econ-8", type: "functional" },
  { source: "pat-25", target: "econ-4", type: "functional" },
  { source: "pat-26", target: "econ-7", type: "functional" },
  { source: "pat-29", target: "econ-11", type: "functional" },

  // FUNCIONAL → SOCIOECONÓMICO
  { source: "func-1", target: "econ-1", type: "causal" },
  { source: "func-2", target: "econ-16", type: "functional" },
  { source: "func-3", target: "econ-16", type: "causal" },
  { source: "func-5", target: "econ-13", type: "functional" },
  { source: "func-6", target: "econ-14", type: "functional" },
  { source: "func-10", target: "econ-6", type: "functional" },
  { source: "func-11", target: "econ-2", type: "functional" },
  { source: "func-12", target: "econ-2", type: "functional" },
  { source: "func-14", target: "econ-2", type: "functional" },
  { source: "func-15", target: "econ-14", type: "functional" },
  { source: "func-17", target: "econ-11", type: "functional" },
  { source: "func-22", target: "econ-12", type: "functional" },
  { source: "func-24", target: "econ-16", type: "functional" },
  { source: "func-28", target: "econ-16", type: "functional" },

  // INTERESTRUCTURALES COMPLEJAS (Hub convergencias)
  { source: "eep-1", target: "pat-1", type: "complementary" },
  { source: "pat-1", target: "func-1", type: "complementary" },
  { source: "func-1", target: "econ-1", type: "causal" },
  { source: "eep-2", target: "func-11", type: "functional" },
  { source: "eep-12", target: "func-24", type: "causal" },
  { source: "eep-31", target: "pat-23", type: "functional" },
  { source: "pat-23", target: "econ-16", type: "functional" }
];

let simulation, svg, networkContainer, selectedNode = null, currentFilter = 'all';

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initNetwork();
    setupLegendListeners();
    populateRelationshipsTable();
  }, 100);
});

function initNetwork() {
  networkContainer = document.getElementById('networkViz');
  
  if (!networkContainer) {
    console.error('networkViz container not found');
    return;
  }

  const containerRect = networkContainer.parentElement.getBoundingClientRect();
  const width = 900;
  const height = 600;

  // LIMPIEZA
  d3.select('#networkViz').selectAll("*").remove();

  svg = d3.select('#networkViz')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  // SIMULACIÓN D3 FORCE
  simulation = d3.forceSimulation(NODES_DATA)
    .force('link', d3.forceLink(LINKS_DATA)
      .id(d => d.id)
      .distance(100)
      .strength(0.5))
    .force('charge', d3.forceManyBody().strength(-200).distanceMax(250))
    .force('collision', d3.forceCollide(35))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2).strength(0.05))
    .alphaDecay(0.05);

  // ARISTAS
  const links = svg.append('g')
    .selectAll('line')
    .data(LINKS_DATA)
    .enter()
    .append('line')
    .attr('class', d => `link link-${d.type}`)
    .attr('stroke', d => getLinkColor(d.type, d))
    .attr('stroke-width', 1.5)
    .attr('opacity', 0.5);

  // NODOS
  const nodes = svg.append('g')
    .selectAll('circle')
    .data(NODES_DATA)
    .enter()
    .append('g')
    .attr('class', d => `node node-${d.group}`)
    .attr('data-id', d => d.id);

  nodes.append('circle')
    .attr('r', d => getNodeRadius(d))
    .attr('fill', d => getNodeColor(d))
    .attr('stroke', d => getNodeStroke(d))
    .attr('stroke-width', d => d.category === 'hub' ? 3 : d.category === 'main' ? 2 : 1.5)
    .attr('opacity', 0.85);

  // LABELS
  nodes.append('text')
    .attr('class', 'node-label')
    .attr('font-size', d => d.category === 'hub' ? 9 : 7)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', d => getNodeColor(d))
    .text(d => d.name.substring(0, 15))
    .attr('pointer-events', 'none');

  // INTERACTIVIDAD
  nodes.on('mouseenter', function(event, d) {
    d3.select(this).select('circle')
      .attr('r', getNodeRadius(d) * 1.8)
      .attr('stroke-width', 3)
      .attr('opacity', 1);
    
    svg.selectAll('line').attr('opacity', link => 
      (link.source.id === d.id || link.target.id === d.id) ? 0.8 : 0.15
    );
  })
  .on('mouseleave', function(event, d) {
    d3.select(this).select('circle')
      .attr('r', getNodeRadius(d))
      .attr('stroke-width', d => d.category === 'hub' ? 3 : d.category === 'main' ? 2 : 1.5)
      .attr('opacity', 0.85);
    
    svg.selectAll('line').attr('opacity', 0.5);
  })
  .on('click', function(event, d) {
    event.stopPropagation();
    showNodeInfo(d);
  })
  .call(d3.drag()
    .on('start', dragStart)
    .on('drag', dragged)
    .on('end', dragEnd));

  // TICK
  simulation.on('tick', () => {
    links
      .attr('x1', d => Math.max(20, Math.min(width - 20, d.source.x)))
      .attr('y1', d => Math.max(20, Math.min(height - 20, d.source.y)))
      .attr('x2', d => Math.max(20, Math.min(width - 20, d.target.x)))
      .attr('y2', d => Math.max(20, Math.min(height - 20, d.target.y)));

    nodes.attr('transform', d => 
      `translate(${Math.max(20, Math.min(width - 20, d.x))},${Math.max(20, Math.min(height - 20, d.y))})`
    );
  });

  // ZOOM
  const zoom = d3.zoom().on('zoom', (event) => {
    svg.select('g').attr('transform', event.transform);
  });
  
  svg.call(zoom);
}

// ============================================================================
// UTILIDADES DE COLOR Y ESTILO
// ============================================================================

function getNodeColor(d) {
  const colors = {
    'amb': '#2fd4c8',
    'patri': '#a276f2',
    'func': '#5b8def',
    'econ': '#ef9552'
  };
  return colors[d.group] || '#8891a5';
}

function getNodeStroke(d) {
  const colors = {
    'amb': '#1a9d94',
    'patri': '#7a4fb3',
    'func': '#3d5ba8',
    'econ': '#c97a3d'
  };
  return colors[d.group] || '#5a6274';
}

function getNodeRadius(d) {
  if (d.category === 'hub') return 28;
  if (d.category === 'main') return 22;
  return 16;
}

function getLinkColor(type, link) {
  const typeColors = {
    'complementary': 'rgba(47,212,200,0.5)',
    'functional': 'rgba(91,141,239,0.5)',
    'causal': 'rgba(162,118,242,0.5)',
    'conditioning': 'rgba(239,149,82,0.5)'
  };
  return typeColors[type] || 'rgba(255,255,255,0.2)';
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
  
  document.querySelectorAll('.control-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Encontrar el botón correcto y marcarlo como activo
  document.querySelectorAll('.control-btn').forEach(btn => {
    if ((filter === 'all' && btn.textContent.trim() === 'Todos') ||
        (filter === 'amb' && btn.textContent.trim() === 'Ambiental') ||
        (filter === 'patri' && btn.textContent.trim() === 'Patrimonios') ||
        (filter === 'func' && btn.textContent.trim() === 'Funcional') ||
        (filter === 'econ' && btn.textContent.trim() === 'Socioeconómico')) {
      btn.classList.add('active');
    }
  });

  if (!svg) return;

  svg.selectAll('.node').attr('opacity', d => {
    if (filter === 'all') return 0.85;
    return d.group === filter ? 0.85 : 0.15;
  });

  svg.selectAll('line').attr('opacity', d => {
    if (filter === 'all') return 0.5;
    const matchSource = d.source.group === filter;
    const matchTarget = d.target.group === filter;
    return matchSource || matchTarget ? 0.7 : 0.1;
  });
}

function setupLegendListeners() {
  if (!svg) return;
  
  document.querySelectorAll('.legend-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      const type = checkbox.parentElement.dataset.type;
      const isChecked = checkbox.checked;
      
      // Filtrar nodos por grupo
      svg.selectAll('.node').attr('opacity', d => {
        if (type === d.group) {
          return isChecked ? 0.85 : 0.15;
        }
        return 0.85;
      });
      
      // Filtrar líneas
      svg.selectAll('line').attr('opacity', d => {
        const sourceMatch = d.source.group === type;
        const targetMatch = d.target.group === type;
        
        if (sourceMatch || targetMatch) {
          return isChecked ? 0.5 : 0.1;
        }
        return 0.5;
      });
    });
  });
}

function showNodeInfo(node) {
  selectedNode = node;
  const panel = document.getElementById('nodeInfoPanel');
  const title = document.getElementById('nodeInfoTitle');
  const type = document.getElementById('nodeInfoType');
  const count = document.getElementById('nodeInfoCount');

  title.textContent = node.name;
  type.textContent = node.group.toUpperCase();
  
  const connections = LINKS_DATA.filter(l => l.source.id === node.id || l.target.id === node.id);
  count.innerHTML = `<strong>${connections.length}</strong> conexiones en la red`;

  panel.classList.add('visible');

  document.getElementById('nodeInfoClose').onclick = () => {
    panel.classList.remove('visible');
    selectedNode = null;
  };
}

// ============================================================================
// TABLA DE RELACIONES
// ============================================================================

function populateRelationshipsTable() {
  const tbody = document.getElementById('relationshipsBody');
  const typeLabels = {
    'complementary': 'Complementaria',
    'functional': 'Funcional',
    'causal': 'Causal',
    'conditioning': 'Condicional'
  };

  const typeMap = {
    'amb': 'Ambiental',
    'patri': 'Patrimonio',
    'func': 'Funcional',
    'econ': 'Socioeconómico'
  };

  LINKS_DATA.slice(0, 30).forEach(link => {
    const sourceNode = NODES_DATA.find(n => n.id === link.source);
    const targetNode = NODES_DATA.find(n => n.id === link.target);

    if (sourceNode && targetNode) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><span class="rel-tag ${sourceNode.group}">${typeMap[sourceNode.group]}</span></td>
        <td>${sourceNode.name.substring(0, 25)}...</td>
        <td><span class="rel-tag ${targetNode.group}">${typeMap[targetNode.group]}</span></td>
        <td>${targetNode.name.substring(0, 25)}...</td>
        <td>${typeLabels[link.type]}</td>
      `;
      tbody.appendChild(row);
    }
  });
}
