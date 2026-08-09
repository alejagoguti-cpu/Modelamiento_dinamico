console.log('Módulo 05: Lo que no está');

// DATOS SIMPLIFICADOS CON FUENTES
const absencesData = [
  { id: 1, nombre: 'Infancia 0-5 años', categoria: 'missing', severidad: 'critical', porcentaje: 94, icon: 'fa-baby', color: '#f76fb0', ausencia: { valor: 94, fuente: 'Análisis POT 2022' }, cobertura: { valor: 6, fuente: 'Decreto 190/2004' }, impacto: { valor: 92, fuente: 'UNICEF Bogotá 2023' }, vulnerabilidad: { valor: 88, fuente: 'DANE 2022' }, prioridad: { valor: 95, fuente: 'ODS 1,3,4' } },
  { id: 2, nombre: 'Personas con Discapacidad', categoria: 'missing', severidad: 'critical', porcentaje: 92, icon: 'fa-wheelchair', color: '#f76fb0', ausencia: { valor: 92, fuente: 'Análisis POT 2022' }, cobertura: { valor: 8, fuente: 'Decreto 190/2004' }, impacto: { valor: 89, fuente: 'IDRD Accesibilidad 2023' }, vulnerabilidad: { valor: 90, fuente: 'DANE Censo 2018' }, prioridad: { valor: 93, fuente: 'Ley 1618/2013' } },
  { id: 3, nombre: 'Migrantes/Flotantes', categoria: 'missing', severidad: 'high', porcentaje: 88, icon: 'fa-person-hiking', color: '#f76fb0', ausencia: { valor: 88, fuente: 'Análisis POT 2022' }, cobertura: { valor: 12, fuente: 'POT Referencias' }, impacto: { valor: 85, fuente: 'OIM Colombia 2023' }, vulnerabilidad: { valor: 82, fuente: 'ACNUR 2022' }, prioridad: { valor: 87, fuente: 'ODS 8,10,16' } },
  { id: 4, nombre: 'Fauna Urbana', categoria: 'missing', severidad: 'high', porcentaje: 76, icon: 'fa-dove', color: '#f76fb0', ausencia: { valor: 76, fuente: 'Análisis POT 2022' }, cobertura: { valor: 24, fuente: 'Estructura Ecológica' }, impacto: { valor: 78, fuente: 'WWF Colombia 2022' }, vulnerabilidad: { valor: 60, fuente: 'SINAP' }, prioridad: { valor: 75, fuente: 'ODS 14,15' } },
  { id: 5, nombre: 'Investigación Local', categoria: 'missing', severidad: 'high', porcentaje: 72, icon: 'fa-flask', color: '#f76fb0', ausencia: { valor: 72, fuente: 'Análisis POT 2022' }, cobertura: { valor: 28, fuente: 'Universidades POT' }, impacto: { valor: 68, fuente: 'COLCIENCIAS 2023' }, vulnerabilidad: { valor: 55, fuente: 'Inversión I+D' }, prioridad: { valor: 70, fuente: 'ODS 9,17' } },
  { id: 6, nombre: 'Economía Feminista', categoria: 'missing', severidad: 'medium', porcentaje: 68, icon: 'fa-venus', color: '#f76fb0', ausencia: { valor: 68, fuente: 'Análisis POT 2022' }, cobertura: { valor: 32, fuente: 'Género en POT' }, impacto: { valor: 72, fuente: 'CEPAL 2022' }, vulnerabilidad: { valor: 75, fuente: 'ENUT 2021' }, prioridad: { valor: 70, fuente: 'ODS 5,8' } },
  { id: 7, nombre: 'Arte y Expresión Callejera', categoria: 'missing', severidad: 'medium', porcentaje: 65, icon: 'fa-palette', color: '#f76fb0', ausencia: { valor: 65, fuente: 'Análisis POT 2022' }, cobertura: { valor: 35, fuente: 'Cultura en POT' }, impacto: { valor: 60, fuente: 'ACULCO 2023' }, vulnerabilidad: { valor: 50, fuente: 'IDRD Espacios' }, prioridad: { valor: 62, fuente: 'ODS 11,16' } },
  { id: 8, nombre: 'Saberes Ancestrales', categoria: 'missing', severidad: 'medium', porcentaje: 60, icon: 'fa-book', color: '#f76fb0', ausencia: { valor: 60, fuente: 'Análisis POT 2022' }, cobertura: { valor: 40, fuente: 'Pueblos originarios' }, impacto: { valor: 65, fuente: 'ICANH 2022' }, vulnerabilidad: { valor: 70, fuente: 'DANE 2018' }, prioridad: { valor: 68, fuente: 'Convenio 169 OIT' } },
  { id: 9, nombre: 'Cuidadores Formales e Informales', categoria: 'missing', severidad: 'high', porcentaje: 81, icon: 'fa-heart', color: '#f76fb0', ausencia: { valor: 81, fuente: 'Análisis POT 2022' }, cobertura: { valor: 19, fuente: 'Servicios cuidado' }, impacto: { valor: 84, fuente: 'CEPAL 2022' }, vulnerabilidad: { valor: 85, fuente: 'DANE 2023' }, prioridad: { valor: 88, fuente: 'ODS 3,5,8' } },
  { id: 10, nombre: 'Ciclo del Agua', categoria: 'hidden', severidad: 'critical', porcentaje: 85, icon: 'fa-droplet', color: '#a276f2', ausencia: { valor: 85, fuente: 'Análisis POT 2022' }, cobertura: { valor: 15, fuente: 'Sistemas hídricos' }, impacto: { valor: 90, fuente: 'EAAB 2023' }, vulnerabilidad: { valor: 75, fuente: 'CAR 2022' }, prioridad: { valor: 92, fuente: 'ODS 6,13,14' } },
  { id: 11, nombre: 'Flujos de Aire', categoria: 'hidden', severidad: 'critical', porcentaje: 81, icon: 'fa-wind', color: '#a276f2', ausencia: { valor: 81, fuente: 'Análisis POT 2022' }, cobertura: { valor: 19, fuente: 'Ventilación urbana' }, impacto: { valor: 88, fuente: 'IDEAM 2023' }, vulnerabilidad: { valor: 70, fuente: 'Isla de calor 2022' }, prioridad: { valor: 85, fuente: 'ODS 3,13' } },
  { id: 12, nombre: 'Dinámicas Informales', categoria: 'hidden', severidad: 'high', porcentaje: 76, icon: 'fa-users', color: '#a276f2', ausencia: { valor: 76, fuente: 'Análisis POT 2022' }, cobertura: { valor: 24, fuente: 'Informalidad POT' }, impacto: { valor: 82, fuente: 'DANE 2023' }, vulnerabilidad: { valor: 80, fuente: 'OIT 2022' }, prioridad: { valor: 82, fuente: 'ODS 8,10' } },
  { id: 13, nombre: 'Fenómenos Sísmicos', categoria: 'hidden', severidad: 'high', porcentaje: 71, icon: 'fa-earth-americas', color: '#a276f2', ausencia: { valor: 71, fuente: 'Análisis POT 2022' }, cobertura: { valor: 29, fuente: 'Zoning riesgos' }, impacto: { valor: 85, fuente: 'USGS 2023' }, vulnerabilidad: { valor: 65, fuente: 'CGR 2022' }, prioridad: { valor: 78, fuente: 'ODS 11,13' } },
  { id: 14, nombre: 'Gentrificación', categoria: 'hidden', severidad: 'high', porcentaje: 68, icon: 'fa-building', color: '#a276f2', ausencia: { valor: 68, fuente: 'Análisis POT 2022' }, cobertura: { valor: 32, fuente: 'Valor del suelo' }, impacto: { valor: 79, fuente: 'IIEUT 2023' }, vulnerabilidad: { valor: 72, fuente: 'Catastro 2022' }, prioridad: { valor: 75, fuente: 'ODS 1,10,11' } },
  { id: 15, nombre: 'Desigualdad de Género', categoria: 'hidden', severidad: 'medium', porcentaje: 62, icon: 'fa-genderless', color: '#a276f2', ausencia: { valor: 62, fuente: 'Análisis POT 2022' }, cobertura: { valor: 38, fuente: 'Género en POT' }, impacto: { valor: 75, fuente: 'DANE 2023' }, vulnerabilidad: { valor: 78, fuente: 'Obs. Género 2022' }, prioridad: { valor: 72, fuente: 'ODS 5' } },
  { id: 16, nombre: 'Conflictividad Social', categoria: 'hidden', severidad: 'medium', porcentaje: 55, icon: 'fa-handshake', color: '#a276f2', ausencia: { valor: 55, fuente: 'Análisis POT 2022' }, cobertura: { valor: 45, fuente: 'Participación POT' }, impacto: { valor: 68, fuente: 'CINEP 2023' }, vulnerabilidad: { valor: 60, fuente: 'DAPD 2022' }, prioridad: { valor: 60, fuente: 'ODS 16,17' } },
  { id: 17, nombre: 'Mujeres en liderazgo', categoria: 'under', severidad: 'high', porcentaje: 45, icon: 'fa-crown', color: '#4ade80', ausencia: { valor: 45, fuente: 'Análisis POT 2022' }, cobertura: { valor: 55, fuente: 'Paridad 2023' }, impacto: { valor: 70, fuente: 'ONU Mujeres 2023' }, vulnerabilidad: { valor: 68, fuente: 'Brecha género' }, prioridad: { valor: 65, fuente: 'ODS 5' } },
  { id: 18, nombre: 'Jóvenes LGBTQ+', categoria: 'under', severidad: 'high', porcentaje: 42, icon: 'fa-rainbow', color: '#4ade80', ausencia: { valor: 42, fuente: 'Análisis POT 2022' }, cobertura: { valor: 58, fuente: 'Normativa LGBTQ+' }, impacto: { valor: 72, fuente: 'LGBTQ+ Center 2023' }, vulnerabilidad: { valor: 85, fuente: 'OVD 2022' }, prioridad: { valor: 72, fuente: 'ODS 5,10,16' } },
  { id: 19, nombre: 'Personas Mayores', categoria: 'under', severidad: 'high', porcentaje: 38, icon: 'fa-person-cane', color: '#4ade80', ausencia: { valor: 38, fuente: 'Análisis POT 2022' }, cobertura: { valor: 62, fuente: 'Servicios adultos' }, impacto: { valor: 65, fuente: 'HelpAge 2023' }, vulnerabilidad: { valor: 75, fuente: 'DANE 2023' }, prioridad: { valor: 62, fuente: 'ODS 3,10' } },
  { id: 20, nombre: 'Trabajadores informales', categoria: 'under', severidad: 'medium', porcentaje: 35, icon: 'fa-briefcase', color: '#4ade80', ausencia: { valor: 35, fuente: 'Análisis POT 2022' }, cobertura: { valor: 65, fuente: 'Economía informal' }, impacto: { valor: 78, fuente: 'DANE 2023' }, vulnerabilidad: { valor: 72, fuente: 'OIT 2022' }, prioridad: { valor: 70, fuente: 'ODS 8,10' } },
  { id: 21, nombre: 'Ambiente (microplásticos)', categoria: 'under', severidad: 'medium', porcentaje: 32, icon: 'fa-leaf', color: '#4ade80', ausencia: { valor: 32, fuente: 'Análisis POT 2022' }, cobertura: { valor: 68, fuente: 'Residuos en POT' }, impacto: { valor: 75, fuente: 'UNEP 2023' }, vulnerabilidad: { valor: 65, fuente: 'CAR 2022' }, prioridad: { valor: 70, fuente: 'ODS 12,14' } },
  { id: 22, nombre: 'Salud mental colectiva', categoria: 'under', severidad: 'medium', porcentaje: 28, icon: 'fa-brain', color: '#4ade80', ausencia: { valor: 28, fuente: 'Análisis POT 2022' }, cobertura: { valor: 72, fuente: 'Servicios salud' }, impacto: { valor: 70, fuente: 'OMS 2023' }, vulnerabilidad: { valor: 70, fuente: 'DANE 2022' }, prioridad: { valor: 65, fuente: 'ODS 3' } },
  { id: 23, nombre: 'Seguridad alimentaria', categoria: 'under', severidad: 'medium', porcentaje: 25, icon: 'fa-apple', color: '#4ade80', ausencia: { valor: 25, fuente: 'Análisis POT 2022' }, cobertura: { valor: 75, fuente: 'Agricultura urbana' }, impacto: { valor: 68, fuente: 'FAO 2023' }, vulnerabilidad: { valor: 68, fuente: 'DANE 2023' }, prioridad: { valor: 62, fuente: 'ODS 2,12' } },
  { id: 24, nombre: 'Educación comunitaria', categoria: 'under', severidad: 'low', porcentaje: 20, icon: 'fa-book-open', color: '#4ade80', ausencia: { valor: 20, fuente: 'Análisis POT 2022' }, cobertura: { valor: 80, fuente: 'Educación en POT' }, impacto: { valor: 60, fuente: 'UNESCO 2023' }, vulnerabilidad: { valor: 55, fuente: 'MEN 2022' }, prioridad: { valor: 55, fuente: 'ODS 4' } }
];

let expandedCard = null;

// INIT
document.addEventListener('DOMContentLoaded', function() {
  renderCards();
  initNetworkVisualization();
});

// RENDER CARDS
function renderCards() {
  const container = document.getElementById('cardsContainer');
  
  container.innerHTML = absencesData.map(item => `
    <div class="element-card" onclick="toggleCard(${item.id})" data-id="${item.id}">
      <div class="card-top">
        <div class="card-icon" style="background: ${item.color}20; color: ${item.color};">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div class="card-title-section">
          <div class="card-name">${item.nombre}</div>
          <div class="card-meta">${item.porcentaje}% ausente</div>
        </div>
        <div class="card-badge badge-${item.severidad}">${item.severidad}</div>
      </div>
      
      <div class="card-indicators" id="indicators-${item.id}">
        <div class="indicator">
          <div class="indicator-label">Ausencia</div>
          <div class="indicator-bar"><div class="indicator-fill" style="width: ${item.ausencia.valor}%; background: #f76fb0;"></div></div>
          <div class="indicator-value">${item.ausencia.valor}%</div>
          <div class="indicator-source" title="${item.ausencia.fuente}"><i class="fa-solid fa-circle-info"></i></div>
        </div>
        
        <div class="indicator">
          <div class="indicator-label">Cobertura</div>
          <div class="indicator-bar"><div class="indicator-fill" style="width: ${item.cobertura.valor}%; background: #4ade80;"></div></div>
          <div class="indicator-value">${item.cobertura.valor}%</div>
          <div class="indicator-source" title="${item.cobertura.fuente}"><i class="fa-solid fa-circle-info"></i></div>
        </div>
        
        <div class="indicator">
          <div class="indicator-label">Impacto</div>
          <div class="indicator-bar"><div class="indicator-fill" style="width: ${item.impacto.valor}%; background: #5b8def;"></div></div>
          <div class="indicator-value">${item.impacto.valor}%</div>
          <div class="indicator-source" title="${item.impacto.fuente}"><i class="fa-solid fa-circle-info"></i></div>
        </div>
        
        <div class="indicator">
          <div class="indicator-label">Vulnerabilidad</div>
          <div class="indicator-bar"><div class="indicator-fill" style="width: ${item.vulnerabilidad.valor}%; background: #f5c945;"></div></div>
          <div class="indicator-value">${item.vulnerabilidad.valor}%</div>
          <div class="indicator-source" title="${item.vulnerabilidad.fuente}"><i class="fa-solid fa-circle-info"></i></div>
        </div>
        
        <div class="indicator">
          <div class="indicator-label">Prioridad</div>
          <div class="indicator-bar"><div class="indicator-fill" style="width: ${item.prioridad.valor}%; background: #2fd4c8;"></div></div>
          <div class="indicator-value">${item.prioridad.valor}%</div>
          <div class="indicator-source" title="${item.prioridad.fuente}"><i class="fa-solid fa-circle-info"></i></div>
        </div>
      </div>
    </div>
  `).join('');
  
  // Tooltips
  document.querySelectorAll('.indicator-source').forEach(el => {
    el.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip-popup';
      tooltip.textContent = title;
      this.appendChild(tooltip);
    });
    el.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.tooltip-popup');
      if (tooltip) tooltip.remove();
    });
  });
}

// TOGGLE CARD
function toggleCard(itemId) {
  const indicators = document.getElementById(`indicators-${itemId}`);
  const card = document.querySelector(`.element-card[data-id="${itemId}"]`);
  
  if (expandedCard === itemId) {
    indicators.classList.remove('show');
    card.classList.remove('expanded');
    expandedCard = null;
  } else {
    if (expandedCard) {
      document.getElementById(`indicators-${expandedCard}`).classList.remove('show');
      document.querySelector(`.element-card[data-id="${expandedCard}"]`).classList.remove('expanded');
    }
    indicators.classList.add('show');
    card.classList.add('expanded');
    expandedCard = itemId;
  }
}

// NETWORK
function initNetworkVisualization() {
  const svg = d3.select('#absencesNetwork');
  const container = svg.node().parentElement;
  const width = container.offsetWidth;
  const height = 600;
  
  svg.attr('width', width).attr('height', height);
  
  const nodes = absencesData.map(item => ({
    id: item.id,
    nombre: item.nombre,
    color: item.color,
    porcentaje: item.porcentaje
  }));
  
  const links = [
    {source: 1, target: 18}, {source: 2, target: 17}, {source: 3, target: 20},
    {source: 4, target: 21}, {source: 10, target: 4}, {source: 11, target: 21},
    {source: 12, target: 20}, {source: 14, target: 17}, {source: 15, target: 18},
    {source: 13, target: 19}, {source: 22, target: 12}
  ];
  
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-350))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(28));
  
  svg.selectAll('*').remove();
  
  const link = svg.append('g').selectAll('line').data(links).enter().append('line')
    .attr('stroke', 'rgba(255,255,255,0.1)').attr('stroke-width', 1.5);
  
  const node = svg.append('g').selectAll('circle').data(nodes).enter().append('circle')
    .attr('r', d => Math.max(10, d.porcentaje / 8))
    .attr('fill', d => d.color).attr('opacity', 0.85)
    .attr('stroke', 'rgba(255,255,255,0.3)').attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('click', (event, d) => {
      event.stopPropagation();
      toggleCard(d.id);
    })
    .call(drag(simulation));
  
  const labels = svg.append('g').selectAll('text').data(nodes).enter().append('text')
    .text(d => d.nombre.substring(0, 2).toUpperCase())
    .attr('font-size', '10px').attr('font-weight', '700').attr('fill', '#e7eaf2')
    .attr('text-anchor', 'middle').attr('pointer-events', 'none');
  
  node.on('mouseover', function() {
    d3.select(this).attr('stroke-width', 3).attr('stroke', '#2fd4c8');
  }).on('mouseout', function() {
    d3.select(this).attr('stroke-width', 2).attr('stroke', 'rgba(255,255,255,0.3)');
  });
  
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('cx', d => d.x).attr('cy', d => d.y);
    labels.attr('x', d => d.x).attr('y', d => d.y + 3);
  });
  
  function drag(simulation) {
    return d3.drag()
      .on('start', dragstarted).on('drag', dragged).on('end', dragended);
    
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x; d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x; d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null; d.fy = null;
    }
  }
}

// FILTER
function filterAbsences(type) {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// ACTIONS
function generateAbsenceReport() { alert('Generando reporte con indicadores y fuentes...'); }
function suggestAdditions() { alert('Sugiriendo adiciones al POT...'); }
function compareWithODS() { alert('Comparando con ODS...'); }

console.log('✅ Módulo 05 cargado');
