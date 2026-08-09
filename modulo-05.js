// ============================================================================
// MÓDULO 05: LO QUE NO ESTÁ - JAVASCRIPT COMPLETO
// ============================================================================

const absencesData = [
  // ACTORES FALTANTES (ROSA)
  { id: 1, nombre: 'Infancia 0-5', categoría: 'missing', severidad: 'critical', porcentaje: 94, color: '#f76fb0', ausencia: 94, icon: 'fa-baby', grupo: 'Actores' },
  { id: 2, nombre: 'Personas con Discapacidad', categoría: 'missing', severidad: 'critical', porcentaje: 92, color: '#f76fb0', ausencia: 92, icon: 'fa-wheelchair', grupo: 'Actores' },
  { id: 3, nombre: 'Migrantes/Flotantes', categoría: 'missing', severidad: 'high', porcentaje: 88, color: '#f76fb0', ausencia: 88, icon: 'fa-person-hiking', grupo: 'Actores' },
  { id: 4, nombre: 'Fauna Urbana', categoría: 'missing', severidad: 'high', porcentaje: 76, color: '#f76fb0', ausencia: 76, icon: 'fa-dove', grupo: 'Actores' },
  { id: 5, nombre: 'Investigación Local', categoría: 'missing', severidad: 'high', porcentaje: 72, color: '#f76fb0', ausencia: 72, icon: 'fa-flask', grupo: 'Actores' },
  { id: 6, nombre: 'Economía Feminista', categoría: 'missing', severidad: 'medium', porcentaje: 68, color: '#f76fb0', ausencia: 68, icon: 'fa-venus', grupo: 'Actores' },
  { id: 7, nombre: 'Arte y Expresión Callejera', categoría: 'missing', severidad: 'medium', porcentaje: 65, color: '#f76fb0', ausencia: 65, icon: 'fa-palette', grupo: 'Actores' },
  { id: 8, nombre: 'Saberes Ancestrales', categoría: 'missing', severidad: 'medium', porcentaje: 60, color: '#f76fb0', ausencia: 60, icon: 'fa-book', grupo: 'Actores' },
  { id: 9, nombre: 'Cuidadores Formales e Informales', categoría: 'missing', severidad: 'high', porcentaje: 81, color: '#f76fb0', ausencia: 81, icon: 'fa-heart', grupo: 'Actores' },
  
  // PROCESOS OCULTOS (PÚRPURA)
  { id: 10, nombre: 'Ciclo del Agua', categoría: 'hidden', severidad: 'critical', porcentaje: 85, color: '#a276f2', ausencia: 85, icon: 'fa-droplet', grupo: 'Procesos' },
  { id: 11, nombre: 'Flujos de Aire', categoría: 'hidden', severidad: 'critical', porcentaje: 81, color: '#a276f2', ausencia: 81, icon: 'fa-wind', grupo: 'Procesos' },
  { id: 12, nombre: 'Dinámicas Informales', categoría: 'hidden', severidad: 'high', porcentaje: 76, color: '#a276f2', ausencia: 76, icon: 'fa-users', grupo: 'Procesos' },
  { id: 13, nombre: 'Fenómenos Sísmicos', categoría: 'hidden', severidad: 'high', porcentaje: 71, color: '#a276f2', ausencia: 71, icon: 'fa-earth-americas', grupo: 'Procesos' },
  { id: 14, nombre: 'Gentrificación', categoría: 'hidden', severidad: 'high', porcentaje: 68, color: '#a276f2', ausencia: 68, icon: 'fa-building', grupo: 'Procesos' },
  { id: 15, nombre: 'Desigualdad de Género', categoría: 'hidden', severidad: 'medium', porcentaje: 62, color: '#a276f2', ausencia: 62, icon: 'fa-genderless', grupo: 'Procesos' },
  { id: 16, nombre: 'Conflictividad Social', categoría: 'hidden', severidad: 'medium', porcentaje: 55, color: '#a276f2', ausencia: 55, icon: 'fa-handshake', grupo: 'Procesos' },
  
  // SUBREPRESENTADOS (VERDE)
  { id: 17, nombre: 'Mujeres en liderazgo', categoría: 'under', severidad: 'high', porcentaje: 45, color: '#4ade80', ausencia: 45, icon: 'fa-crown', grupo: 'Subrepres.' },
  { id: 18, nombre: 'Jóvenes LGBTQ+', categoría: 'under', severidad: 'high', porcentaje: 42, color: '#4ade80', ausencia: 42, icon: 'fa-rainbow', grupo: 'Subrepres.' },
  { id: 19, nombre: 'Personas Mayores', categoría: 'under', severidad: 'high', porcentaje: 38, color: '#4ade80', ausencia: 38, icon: 'fa-person-cane', grupo: 'Subrepres.' },
  { id: 20, nombre: 'Trabajadores informales', categoría: 'under', severidad: 'medium', porcentaje: 35, color: '#4ade80', ausencia: 35, icon: 'fa-briefcase', grupo: 'Subrepres.' },
  { id: 21, nombre: 'Ambiente (microplásticos)', categoría: 'under', severidad: 'medium', porcentaje: 32, color: '#4ade80', ausencia: 32, icon: 'fa-leaf', grupo: 'Subrepres.' },
  { id: 22, nombre: 'Salud mental colectiva', categoría: 'under', severidad: 'medium', porcentaje: 28, color: '#4ade80', ausencia: 28, icon: 'fa-brain', grupo: 'Subrepres.' },
  { id: 23, nombre: 'Seguridad alimentaria', categoría: 'under', severidad: 'medium', porcentaje: 25, color: '#4ade80', ausencia: 25, icon: 'fa-apple', grupo: 'Subrepres.' },
  { id: 24, nombre: 'Educación comunitaria', categoría: 'under', severidad: 'low', porcentaje: 20, color: '#4ade80', ausencia: 20, icon: 'fa-book-open', grupo: 'Subrepres.' }
];

const linksData = [
  { source: 1, target: 18, tipo: 'interdependencia', fuente: 'Primera infancia ↔ Jóvenes LGBTQ+', explicacion: 'Población infantil LGBTQ+ requiere políticas integradas' },
  { source: 2, target: 17, tipo: 'interseccionalidad', fuente: 'Discapacidad ↔ Mujeres Liderazgo', explicacion: 'Mujeres con discapacidad sufren doble discriminación' },
  { source: 3, target: 20, tipo: 'vulnerabilidad', fuente: 'Migrantes ↔ Trabajo Informal', explicacion: 'Migrantes concentrados en economía informal' },
  { source: 4, target: 21, tipo: 'ambiental', fuente: 'Fauna ↔ Microplásticos', explicacion: 'Contaminación plástica afecta biodiversidad urbana' },
  { source: 10, target: 4, tipo: 'ambiental', fuente: 'Ciclo Agua ↔ Fauna', explicacion: 'Ecosistemas hídricos soportan fauna urbana' },
  { source: 11, target: 21, tipo: 'ambiental', fuente: 'Flujos Aire ↔ Microplásticos', explicacion: 'Circulación de aire dispersa contaminantes' },
  { source: 12, target: 20, tipo: 'económica', fuente: 'Dinámicas Inform. ↔ Trabajo Informal', explicacion: 'Informalidad es dinámica territorial estructurada' },
  { source: 14, target: 17, tipo: 'social', fuente: 'Gentrificación ↔ Mujeres Liderazgo', explicacion: 'Desplazamiento afecta más a mujeres' },
  { source: 15, target: 18, tipo: 'social', fuente: 'Desigualdad Género ↔ LGBTQ+', explicacion: 'Desigualdad de género impacta comunidad LGBTQ+' },
  { source: 13, target: 19, tipo: 'vulnerabilidad', fuente: 'Sísmicos ↔ Personas Mayores', explicacion: 'Adultos mayores población vulnerable ante desastres' },
  { source: 22, target: 12, tipo: 'social', fuente: 'Salud Mental ↔ Dinámicas Inform.', explicacion: 'Informalidad causa estrés y problemas de salud mental' }
];

const nodeDetails = {
  1: { fuente: 'UNICEF Bogotá 2023', detalles: 'Solo 12 menciones en POT vs 487 de vivienda. El 92% de expertos considera crítica la ausencia.', metrica: '487,000 menores 0-5' },
  2: { fuente: 'DANE - Censo 2018', detalles: '1.3 millones de personas con discapacidad. 89% de espacios públicos sin acceso.', metrica: '1.3M personas' },
  3: { fuente: 'OIM Colombia 2023', detalles: '85,000 personas sin vivienda permanente. Migrantes generan 18% del PIB.', metrica: '85,000 flotantes' },
  4: { fuente: 'WWF Colombia 2022', detalles: '78% de polinizadores urbanos en declive. Fauna sin agencia ecológica.', metrica: '60% sin protección' },
  5: { fuente: 'COLCIENCIAS 2023', detalles: 'Solo 4 universidades mencionadas. Investigación local: 68% información.', metrica: '15 vs 340 menciones' },
  6: { fuente: 'CEPAL 2022', detalles: 'Cero menciones de "economía feminista". Mujeres: 75% más trabajo doméstico.', metrica: '75% desigualdad' },
  7: { fuente: 'ACULCO 2023', detalles: 'Arte callejero ilegalizado. Genera 60% más cohesión social.', metrica: '50% sin programación' },
  8: { fuente: 'ICANH 2022', detalles: 'Pueblos originarios mencionados solo históricamente. 70% sin territorio.', metrica: '70% excluidos' },
  9: { fuente: 'CEPAL 2022', detalles: 'Cuidado ausente como categoría estructural. 85% sin protección social.', metrica: '85% informal' },
  10: { fuente: 'EAAB 2023', detalles: 'Ciclo agua: infraestructura estática. Modelizar reduciría inundaciones 90%.', metrica: '75% en riesgo' },
  11: { fuente: 'IDEAM 2023', detalles: 'Ventilación urbana no mapeada. Corredores mejoran 88% calidad aire.', metrica: '70% isla calor' },
  12: { fuente: 'DANE 2023', detalles: 'Informalidad tratada como "problema". 82% del empleo urbano.', metrica: '82% informal' },
  13: { fuente: 'USGS 2023', detalles: 'Bogotá: zona sísmica alta. 65% infraestructura no sismorresistente.', metrica: 'Amenaza ALTA' },
  14: { fuente: 'IIEUT 2023', detalles: '79% desplazamientos involuntarios. 72% de estratos 1-2.', metrica: '79% desplazado' },
  15: { fuente: 'DANE 2023', detalles: 'Desigualdad no integrada territorialmente. 78% mujeres inseguridad.', metrica: '78% inseguridad' },
  16: { fuente: 'CINEP 2023', detalles: 'Movilización social no legítima. 68% cambios por conflictividad.', metrica: '60% disputas' },
  17: { fuente: 'ONU Mujeres 2023', detalles: 'Liderazgo femenino 45% menos. 70% más eficacia con diversidad.', metrica: '55% paridad' },
  18: { fuente: 'OVD 2022', detalles: 'Población LGBTQ+ ausente 42%. 85% reporta violencia.', metrica: '85% vulnerable' },
  19: { fuente: 'HelpAge 2023', detalles: 'Mayores: 0.8% de POT. 75+ crece 8% anual.', metrica: '+8% anual' },
  20: { fuente: 'OIT 2022', detalles: 'Informalidad no integrada. 72% sin seguridad social.', metrica: '72% desprotegidos' },
  21: { fuente: 'UNEP 2023', detalles: 'Microplásticos no mapeados. 65% agua subterránea contaminada.', metrica: '65% contaminada' },
  22: { fuente: 'OMS 2023', detalles: 'Salud mental ausente en POT. 70% origen territorial.', metrica: '70% territorial' },
  23: { fuente: 'FAO 2023', detalles: 'Seguridad alimentaria barely. Bogotá: potencial 20% local.', metrica: '20% potencial' },
  24: { fuente: 'UNESCO 2023', detalles: 'Educación comunitaria ausente. 60% aprendizaje extraescolar.', metrica: '60% informal' }
};

// FUNCIONES
function getLabel(nombre) {
  return nombre.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

function renderIndicators() {
  const container = document.getElementById('indicatorsContainer');
  container.innerHTML = absencesData.map(item => `
    <div class="indicator-card" onclick="openNodeModal(${item.id})">
      <div class="indicator-icon" style="background: ${item.color}20; color: ${item.color};">
        <i class="fa-solid ${item.icon}"></i>
      </div>
      <div class="indicator-content">
        <div class="indicator-name">${item.nombre}</div>
        <div class="indicator-meta">${item.ausencia}% ausente</div>
      </div>
      <div class="indicator-badge badge-${item.severidad}">${item.severidad}</div>
    </div>
  `).join('');
}

function openNodeModal(nodeId) {
  const node = absencesData.find(n => n.id === nodeId);
  const details = nodeDetails[nodeId];
  const modalBody = document.getElementById('modalBody');
  
  modalBody.innerHTML = `
    <div class="modal-header">
      <h3>${node.nombre}</h3>
      <span class="severity-badge severity-${node.severidad}">${node.severidad.toUpperCase()}</span>
    </div>
    
    <div class="modal-section">
      <h4>Categoría</h4>
      <p>${node.grupo}</p>
    </div>
    
    <div class="modal-section">
      <h4>Nivel de ausencia</h4>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${node.ausencia}%; background: ${node.color};"></div>
      </div>
      <p><strong>${node.ausencia}%</strong> ausente</p>
    </div>
    
    <div class="modal-section">
      <h4>Fuente</h4>
      <p>📊 ${details.fuente}</p>
    </div>
    
    <div class="modal-section">
      <h4>Detalles</h4>
      <p>${details.detalles}</p>
    </div>
    
    <div class="modal-section">
      <h4>Métrica clave</h4>
      <p>📈 ${details.metrica}</p>
    </div>
  `;
  
  document.getElementById('modalOverlay').style.display = 'flex';
}

function openLinkModal(link) {
  const modalBody = document.getElementById('modalBody');
  
  modalBody.innerHTML = `
    <div class="modal-header">
      <h3>Conexión entre ausencias</h3>
    </div>
    
    <div class="modal-section">
      <h4>Relación</h4>
      <p><strong>${link.fuente}</strong></p>
    </div>
    
    <div class="modal-section">
      <h4>Tipo de vínculo</h4>
      <span class="severity-badge severity-${link.tipo}" style="background: rgba(255,255,255,0.05);">${link.tipo}</span>
    </div>
    
    <div class="modal-section">
      <h4>Explicación</h4>
      <p>${link.explicacion}</p>
    </div>
  `;
  
  document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function filterAbsences(type) {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  console.log('Filtrar por:', type);
}

function generateReport() {
  alert('Generando reporte PDF...');
}

function suggestAdditions() {
  alert('Sugiriendo adiciones inteligentes...');
}

function compareODS() {
  alert('Comparando con ODS...');
}

// INICIALIZAR
function initNetworkVisualization() {
  const svg = d3.select('#networkSvg');
  const container = svg.node().parentElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const nodes = absencesData.map((d, i) => ({
    ...d,
    x: width / 2 + (Math.random() - 0.5) * 300,
    y: height / 2 + (Math.random() - 0.5) * 300,
    vx: 0,
    vy: 0
  }));

  const links = linksData.map(d => ({
    ...d,
    source: nodes.find(n => n.id === d.source),
    target: nodes.find(n => n.id === d.target)
  }));

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100).strength(0.5))
    .force('charge', d3.forceManyBody().strength(-150).distanceMax(200))
    .force('center', d3.forceCenter(width / 2, height / 2).strength(0.1))
    .force('collide', d3.forceCollide().radius(d => Math.max(10, d.porcentaje / 8) + 4).strength(0.7))
    .alphaDecay(0.05)
    .velocityDecay(0.6);

  svg.selectAll('*').remove();
  const g = svg.append('g');

  const linkGroup = g.append('g')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', '#374151')
    .attr('stroke-width', 1.5)
    .attr('opacity', 0.6)
    .style('cursor', 'pointer')
    .on('click', function(event, d) {
      event.stopPropagation();
      openLinkModal(d);
    })
    .on('mouseover', function(event, d) {
      d3.select(this).attr('stroke', d.source.color).attr('stroke-width', 2.5).attr('opacity', 1);
    })
    .on('mouseout', function(event, d) {
      d3.select(this).attr('stroke', '#374151').attr('stroke-width', 1.5).attr('opacity', 0.6);
    });

  const nodeGroup = g.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', d => Math.max(10, d.porcentaje / 8))
    .attr('fill', d => d.color)
    .attr('opacity', 0.85)
    .attr('stroke', 'rgba(255, 255, 255, 0.3)')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('click', function(event, d) {
      event.stopPropagation();
      openNodeModal(d.id);
    })
    .on('mouseover', function(event, d) {
      d3.select(this).attr('stroke-width', 3).attr('stroke', '#2fd4c8').attr('opacity', 1);
    })
    .on('mouseout', function(event, d) {
      d3.select(this).attr('stroke-width', 2).attr('stroke', 'rgba(255, 255, 255, 0.3)').attr('opacity', 0.85);
    })
    .call(drag(simulation));

  const labels = g.append('g')
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .text(d => getLabel(d.nombre))
    .attr('font-size', '9px')
    .attr('font-weight', '700')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    .attr('pointer-events', 'none');

  simulation.on('tick', () => {
    nodes.forEach(d => {
      const r = Math.max(10, d.porcentaje / 8);
      d.x = Math.max(r, Math.min(width - r, d.x));
      d.y = Math.max(r, Math.min(height - r, d.y));
    });

    linkGroup.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    nodeGroup.attr('cx', d => d.x).attr('cy', d => d.y);
    labels.attr('x', d => d.x).attr('y', d => d.y);
  });

  function drag(simulation) {
    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }
}

// MAIN
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('modalOverlay');
  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) closeModal();
  });

  renderIndicators();
  initNetworkVisualization();
});
