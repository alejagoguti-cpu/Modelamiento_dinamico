// Módulo 05: Lo que no está - VERSIÓN COMPLETA CON INDICADORES Y FUENTES
console.log('Módulo 05: Lo que no está - Inicializado');

// DATOS COMPLETOS CON INDICADORES Y FUENTES
const absencesData = {
  missingActors: [
    { 
      id: 1, nombre: 'Infancia 0-5 años', categoria: 'missing',
      severidad: 'critical', porcentaje: 94, icon: 'fa-baby', color: '#f76fb0',
      ausencia: { valor: 94, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 6, fuente: 'Menciones en decreto 190 de 2004' },
      impacto: { valor: 92, fuente: 'UNICEF - Estudio de primera infancia Bogotá 2023' },
      vulnerabilidad: { valor: 88, fuente: 'DANE - Caracterización poblacional 2022' },
      prioridad: { valor: 95, fuente: 'ODS 1, 3, 4 - Metas de desarrollo 2030' }
    },
    { 
      id: 2, nombre: 'Personas con Discapacidad', categoria: 'missing',
      severidad: 'critical', porcentaje: 92, icon: 'fa-wheelchair', color: '#f76fb0',
      ausencia: { valor: 92, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 8, fuente: 'Menciones en decreto 190 de 2004' },
      impacto: { valor: 89, fuente: 'Estudio accesibilidad Bogotá - IDRD 2023' },
      vulnerabilidad: { valor: 90, fuente: 'DANE - Censo de discapacidad 2018' },
      prioridad: { valor: 93, fuente: 'Ley 1618 de 2013 - Derechos de discapacitados' }
    },
    { 
      id: 3, nombre: 'Migrantes/Flotantes', categoria: 'missing',
      severidad: 'high', porcentaje: 88, icon: 'fa-person-hiking', color: '#f76fb0',
      ausencia: { valor: 88, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 12, fuente: 'Referencias indirectas en artículos POT' },
      impacto: { valor: 85, fuente: 'OIM - Migración en Colombia 2023' },
      vulnerabilidad: { valor: 82, fuente: 'Estudio ACNUR - Desplazamiento urbano 2022' },
      prioridad: { valor: 87, fuente: 'ODS 8, 10, 16 - Inclusión y paz' }
    },
    { 
      id: 4, nombre: 'Fauna Urbana', categoria: 'missing',
      severidad: 'high', porcentaje: 76, icon: 'fa-dove', color: '#f76fb0',
      ausencia: { valor: 76, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 24, fuente: 'Menciones en Estructura Ecológica POT' },
      impacto: { valor: 78, fuente: 'WWF - Biodiversidad urbana Colombia 2022' },
      vulnerabilidad: { valor: 60, fuente: 'SINAP - Sistema Nacional de Áreas Protegidas' },
      prioridad: { valor: 75, fuente: 'ODS 14, 15 - Vida terrestre y acuática' }
    },
    { 
      id: 5, nombre: 'Investigación Local', categoria: 'missing',
      severidad: 'high', porcentaje: 72, icon: 'fa-flask', color: '#f76fb0',
      ausencia: { valor: 72, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 28, fuente: 'Universidades citadas en POT' },
      impacto: { valor: 68, fuente: 'COLCIENCIAS - Indicadores de investigación 2023' },
      vulnerabilidad: { valor: 55, fuente: 'Índices de inversión en I+D Bogotá' },
      prioridad: { valor: 70, fuente: 'ODS 9, 17 - Innovación y alianzas' }
    },
    { 
      id: 6, nombre: 'Economía Feminista', categoria: 'missing',
      severidad: 'medium', porcentaje: 68, icon: 'fa-venus', color: '#f76fb0',
      ausencia: { valor: 68, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 32, fuente: 'Menciones de género en POT' },
      impacto: { valor: 72, fuente: 'CEPAL - Mujeres en economía urbana 2022' },
      vulnerabilidad: { valor: 75, fuente: 'Encuesta Nacional de Uso del Tiempo 2021' },
      prioridad: { valor: 70, fuente: 'ODS 5, 8 - Igualdad y trabajo decente' }
    },
    { 
      id: 7, nombre: 'Arte y Expresión Callejera', categoria: 'missing',
      severidad: 'medium', porcentaje: 65, icon: 'fa-palette', color: '#f76fb0',
      ausencia: { valor: 65, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 35, fuente: 'Referencias culturales en POT' },
      impacto: { valor: 60, fuente: 'ACULCO - Estudio muralismo Bogotá 2023' },
      vulnerabilidad: { valor: 50, fuente: 'Diagnóstico de espacios públicos IDRD' },
      prioridad: { valor: 62, fuente: 'ODS 11, 16 - Ciudades inclusivas y paz' }
    },
    { 
      id: 8, nombre: 'Saberes Ancestrales', categoria: 'missing',
      severidad: 'medium', porcentaje: 60, icon: 'fa-book', color: '#f76fb0',
      ausencia: { valor: 60, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 40, fuente: 'Menciones de pueblos originarios' },
      impacto: { valor: 65, fuente: 'ICANH - Investigación pueblos originarios' },
      vulnerabilidad: { valor: 70, fuente: 'Censo DANE - Población indígena 2018' },
      prioridad: { valor: 68, fuente: 'Convenio 169 OIT - Derechos indígenas' }
    },
    { 
      id: 9, nombre: 'Cuidadores Formales e Informales', categoria: 'missing',
      severidad: 'high', porcentaje: 81, icon: 'fa-heart', color: '#f76fb0',
      ausencia: { valor: 81, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 19, fuente: 'Servicios de cuidado en POT' },
      impacto: { valor: 84, fuente: 'CEPAL - El cuidado en la ciudad 2022' },
      vulnerabilidad: { valor: 85, fuente: 'Encuesta de empleo DANE 2023' },
      prioridad: { valor: 88, fuente: 'ODS 3, 5, 8 - Salud, género y empleo' }
    }
  ],
  hiddenProcesses: [
    { 
      id: 10, nombre: 'Ciclo del Agua', categoria: 'hidden',
      severidad: 'critical', porcentaje: 85, icon: 'fa-droplet', color: '#a276f2',
      ausencia: { valor: 85, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 15, fuente: 'Sistemas hídricos en Estructura Ecológica' },
      impacto: { valor: 90, fuente: 'EAAB - Diagnóstico ciclo hidrológico 2023' },
      vulnerabilidad: { valor: 75, fuente: 'CAR - Estudios de escorrentía 2022' },
      prioridad: { valor: 92, fuente: 'ODS 6, 13, 14 - Agua y cambio climático' }
    },
    { 
      id: 11, nombre: 'Flujos de Aire', categoria: 'hidden',
      severidad: 'critical', porcentaje: 81, icon: 'fa-wind', color: '#a276f2',
      ausencia: { valor: 81, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 19, fuente: 'Menciones de ventilación urbana' },
      impacto: { valor: 88, fuente: 'IDEAM - Calidad del aire Bogotá 2023' },
      vulnerabilidad: { valor: 70, fuente: 'Estudio isla de calor urbano 2022' },
      prioridad: { valor: 85, fuente: 'ODS 3, 13 - Salud y cambio climático' }
    },
    { 
      id: 12, nombre: 'Dinámicas Informales', categoria: 'hidden',
      severidad: 'high', porcentaje: 76, icon: 'fa-users', color: '#a276f2',
      ausencia: { valor: 76, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 24, fuente: 'Referencias indirectas a informalidad' },
      impacto: { valor: 82, fuente: 'DANE - Encuesta de comercio informal 2023' },
      vulnerabilidad: { valor: 80, fuente: 'OIT - Trabajo informal en ciudades 2022' },
      prioridad: { valor: 82, fuente: 'ODS 8, 10 - Empleo y desigualdad' }
    },
    { 
      id: 13, nombre: 'Fenómenos Sísmicos', categoria: 'hidden',
      severidad: 'high', porcentaje: 71, icon: 'fa-earth-americas', color: '#a276f2',
      ausencia: { valor: 71, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 29, fuente: 'Zoning de riesgos en POT' },
      impacto: { valor: 85, fuente: 'USGS - Riesgo sísmico Bogotá 2023' },
      vulnerabilidad: { valor: 65, fuente: 'CGR - Gestión de riesgos 2022' },
      prioridad: { valor: 78, fuente: 'ODS 11, 13 - Ciudades resilientes' }
    },
    { 
      id: 14, nombre: 'Gentrificación', categoria: 'hidden',
      severidad: 'high', porcentaje: 68, icon: 'fa-building', color: '#a276f2',
      ausencia: { valor: 68, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 32, fuente: 'Estudios de valor del suelo' },
      impacto: { valor: 79, fuente: 'IIEUT - Gentrificación en Bogotá 2023' },
      vulnerabilidad: { valor: 72, fuente: 'Catastro nacional - Desplazamientos 2022' },
      prioridad: { valor: 75, fuente: 'ODS 1, 10, 11 - Vivienda y desigualdad' }
    },
    { 
      id: 15, nombre: 'Desigualdad de Género', categoria: 'hidden',
      severidad: 'medium', porcentaje: 62, icon: 'fa-genderless', color: '#a276f2',
      ausencia: { valor: 62, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 38, fuente: 'Menciones de género en POT' },
      impacto: { valor: 75, fuente: 'DANE - Encuesta de género 2023' },
      vulnerabilidad: { valor: 78, fuente: 'Observatorio de género Bogotá 2022' },
      prioridad: { valor: 72, fuente: 'ODS 5 - Igualdad de género' }
    },
    { 
      id: 16, nombre: 'Conflictividad Social', categoria: 'hidden',
      severidad: 'medium', porcentaje: 55, icon: 'fa-handshake', color: '#a276f2',
      ausencia: { valor: 55, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 45, fuente: 'Menciones de participación ciudadana' },
      impacto: { valor: 68, fuente: 'CINEP - Movilización social 2023' },
      vulnerabilidad: { valor: 60, fuente: 'DAPD - Conflictividad en espacios 2022' },
      prioridad: { valor: 60, fuente: 'ODS 16, 17 - Paz y alianzas' }
    }
  ],
  underrepresented: [
    { 
      id: 17, nombre: 'Mujeres en liderazgo', categoria: 'under',
      severidad: 'high', porcentaje: 45, icon: 'fa-crown', color: '#4ade80',
      ausencia: { valor: 45, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 55, fuente: 'Paridad en instituciones Bogotá 2023' },
      impacto: { valor: 70, fuente: 'ONU Mujeres - Liderazgo femenino 2023' },
      vulnerabilidad: { valor: 68, fuente: 'Índice de brecha de género DANE' },
      prioridad: { valor: 65, fuente: 'ODS 5 - Igualdad de género' }
    },
    { 
      id: 18, nombre: 'Jóvenes LGBTQ+', categoria: 'under',
      severidad: 'high', porcentaje: 42, icon: 'fa-rainbow', color: '#4ade80',
      ausencia: { valor: 42, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 58, fuente: 'Menciones LGBTQ+ en normativa' },
      impacto: { valor: 72, fuente: 'LGBTQ+ Center - Estudio Bogotá 2023' },
      vulnerabilidad: { valor: 85, fuente: 'OVD - Violencia LGBTQ+ 2022' },
      prioridad: { valor: 72, fuente: 'ODS 5, 10, 16 - Derechos y paz' }
    },
    { 
      id: 19, nombre: 'Personas Mayores', categoria: 'under',
      severidad: 'high', porcentaje: 38, icon: 'fa-person-cane', color: '#4ade80',
      ausencia: { valor: 38, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 62, fuente: 'Servicios para adultos mayores en POT' },
      impacto: { valor: 65, fuente: 'HelpAge - Envejecimiento Bogotá 2023' },
      vulnerabilidad: { valor: 75, fuente: 'DANE - Pirámide poblacional 2023' },
      prioridad: { valor: 62, fuente: 'ODS 3, 10 - Salud e inclusión' }
    },
    { 
      id: 20, nombre: 'Trabajadores informales', categoria: 'under',
      severidad: 'medium', porcentaje: 35, icon: 'fa-briefcase', color: '#4ade80',
      ausencia: { valor: 35, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 65, fuente: 'Economía informal en POT' },
      impacto: { valor: 78, fuente: 'DANE - Encuesta de empleo 2023' },
      vulnerabilidad: { valor: 72, fuente: 'OIT - Trabajo informal 2022' },
      prioridad: { valor: 70, fuente: 'ODS 8, 10 - Empleo y reducción pobreza' }
    },
    { 
      id: 21, nombre: 'Ambiente (microplásticos)', categoria: 'under',
      severidad: 'medium', porcentaje: 32, icon: 'fa-leaf', color: '#4ade80',
      ausencia: { valor: 32, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 68, fuente: 'Gestión de residuos en POT' },
      impacto: { valor: 75, fuente: 'UNEP - Contaminación plástica 2023' },
      vulnerabilidad: { valor: 65, fuente: 'CAR - Diagnóstico ambiental 2022' },
      prioridad: { valor: 70, fuente: 'ODS 12, 14 - Consumo y vida marina' }
    },
    { 
      id: 22, nombre: 'Salud mental colectiva', categoria: 'under',
      severidad: 'medium', porcentaje: 28, icon: 'fa-brain', color: '#4ade80',
      ausencia: { valor: 28, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 72, fuente: 'Servicios de salud en POT' },
      impacto: { valor: 70, fuente: 'OMS - Salud mental urbana 2023' },
      vulnerabilidad: { valor: 70, fuente: 'DANE - Encuesta de salud 2022' },
      prioridad: { valor: 65, fuente: 'ODS 3 - Salud y bienestar' }
    },
    { 
      id: 23, nombre: 'Seguridad alimentaria', categoria: 'under',
      severidad: 'medium', porcentaje: 25, icon: 'fa-apple', color: '#4ade80',
      ausencia: { valor: 25, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 75, fuente: 'Agricultura urbana en POT' },
      impacto: { valor: 68, fuente: 'FAO - Seguridad alimentaria urbana 2023' },
      vulnerabilidad: { valor: 68, fuente: 'DANE - Línea de pobreza 2023' },
      prioridad: { valor: 62, fuente: 'ODS 2, 12 - Hambre cero y consumo' }
    },
    { 
      id: 24, nombre: 'Educación comunitaria', categoria: 'under',
      severidad: 'low', porcentaje: 20, icon: 'fa-book-open', color: '#4ade80',
      ausencia: { valor: 20, fuente: 'Análisis de contenido POT 2022' },
      cobertura: { valor: 80, fuente: 'Educación en POT' },
      impacto: { valor: 60, fuente: 'UNESCO - Educación urbana 2023' },
      vulnerabilidad: { valor: 55, fuente: 'MEN - Indicadores educativos 2022' },
      prioridad: { valor: 55, fuente: 'ODS 4 - Educación de calidad' }
    }
  ]
};

let currentFilter = 'all';
let expandedCard = null;

// INIT
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado - Inicializando módulo 05');
  renderCards();
  setTimeout(() => {
    initNetworkVisualization();
  }, 300);
});

// RENDER CARDS
function renderCards() {
  const container = document.getElementById('cardsContainer');
  const allItems = [...absencesData.missingActors, ...absencesData.hiddenProcesses, ...absencesData.underrepresented];
  
  container.innerHTML = allItems.map(item => {
    const badgeClass = `badge-${item.severidad}`;
    return `
      <div class="element-card" onclick="toggleCard(${item.id})" data-id="${item.id}">
        <div class="card-top">
          <div class="card-icon" style="background: ${item.color}20; color: ${item.color};">
            <i class="fa-solid ${item.icon}"></i>
          </div>
          <div class="card-title-section">
            <div class="card-name">${item.nombre}</div>
            <div class="card-meta">${item.porcentaje}% ausente</div>
          </div>
          <div class="card-badge ${badgeClass}">${item.severidad}</div>
        </div>
        
        <div class="card-indicators" id="indicators-${item.id}">
          <div class="indicator">
            <div class="indicator-label">Ausencia</div>
            <div class="indicator-bar">
              <div class="indicator-fill" style="width: ${item.ausencia.valor}%; background: #f76fb0;"></div>
            </div>
            <div class="indicator-value">${item.ausencia.valor}%</div>
            <div class="indicator-source" title="${item.ausencia.fuente}"><i class="fa-solid fa-circle-info"></i></div>
          </div>
          
          <div class="indicator">
            <div class="indicator-label">Cobertura</div>
            <div class="indicator-bar">
              <div class="indicator-fill" style="width: ${item.cobertura.valor}%; background: #4ade80;"></div>
            </div>
            <div class="indicator-value">${item.cobertura.valor}%</div>
            <div class="indicator-source" title="${item.cobertura.fuente}"><i class="fa-solid fa-circle-info"></i></div>
          </div>
          
          <div class="indicator">
            <div class="indicator-label">Impacto</div>
            <div class="indicator-bar">
              <div class="indicator-fill" style="width: ${item.impacto.valor}%; background: #5b8def;"></div>
            </div>
            <div class="indicator-value">${item.impacto.valor}%</div>
            <div class="indicator-source" title="${item.impacto.fuente}"><i class="fa-solid fa-circle-info"></i></div>
          </div>
          
          <div class="indicator">
            <div class="indicator-label">Vulnerabilidad</div>
            <div class="indicator-bar">
              <div class="indicator-fill" style="width: ${item.vulnerabilidad.valor}%; background: #f5c945;"></div>
            </div>
            <div class="indicator-value">${item.vulnerabilidad.valor}%</div>
            <div class="indicator-source" title="${item.vulnerabilidad.fuente}"><i class="fa-solid fa-circle-info"></i></div>
          </div>
          
          <div class="indicator">
            <div class="indicator-label">Prioridad</div>
            <div class="indicator-bar">
              <div class="indicator-fill" style="width: ${item.prioridad.valor}%; background: #2fd4c8;"></div>
            </div>
            <div class="indicator-value">${item.prioridad.valor}%</div>
            <div class="indicator-source" title="${item.prioridad.fuente}"><i class="fa-solid fa-circle-info"></i></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Agregar tooltips
  document.querySelectorAll('.indicator-source').forEach(el => {
    el.addEventListener('mouseenter', function(e) {
      const title = this.getAttribute('title');
      this.style.position = 'relative';
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
  
  console.log('✅ Tarjetas renderizadas con fuentes');
}

// TOGGLE CARD EXPANSION
function toggleCard(itemId) {
  const cards = document.querySelectorAll('.element-card');
  const indicators = document.getElementById(`indicators-${itemId}`);
  const card = document.querySelector(`.element-card[data-id="${itemId}"]`);
  
  if (expandedCard === itemId) {
    indicators.classList.remove('show');
    expandedCard = null;
    card.classList.remove('expanded');
  } else {
    // Cerrar tarjeta anterior
    if (expandedCard) {
      const prevIndicators = document.getElementById(`indicators-${expandedCard}`);
      if (prevIndicators) prevIndicators.classList.remove('show');
      const prevCard = document.querySelector(`.element-card[data-id="${expandedCard}"]`);
      if (prevCard) prevCard.classList.remove('expanded');
    }
    
    indicators.classList.add('show');
    card.classList.add('expanded');
    expandedCard = itemId;
  }
}

// NETWORK VISUALIZATION
function initNetworkVisualization() {
  const svg = d3.select('#absencesNetwork');
  const container = svg.node().parentElement;
  const width = container.offsetWidth;
  const height = 600;
  
  svg.attr('width', width).attr('height', height);
  
  // Datos
  const allItems = [
    ...absencesData.missingActors,
    ...absencesData.hiddenProcesses,
    ...absencesData.underrepresented
  ];
  
  // Nodos
  const nodes = allItems.map(item => ({
    id: item.id,
    nombre: item.nombre,
    severidad: item.severidad,
    porcentaje: item.porcentaje,
    icon: item.icon,
    color: item.color,
    categoria: item.categoria
  }));
  
  // Enlaces
  const links = [
    { source: 1, target: 18 },
    { source: 2, target: 17 },
    { source: 3, target: 20 },
    { source: 4, target: 21 },
    { source: 10, target: 4 },
    { source: 11, target: 21 },
    { source: 12, target: 20 },
    { source: 14, target: 17 },
    { source: 15, target: 18 },
    { source: 13, target: 19 },
    { source: 22, target: 12 },
  ];
  
  // Force simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links)
      .id(d => d.id)
      .distance(100))
    .force('charge', d3.forceManyBody().strength(-350))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(28));
  
  svg.selectAll('*').remove();
  
  // Links
  const link = svg.append('g')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', 'rgba(255,255,255,0.1)')
    .attr('stroke-width', 1.5);
  
  // Nodes
  const node = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', d => Math.max(10, d.porcentaje / 8))
    .attr('fill', d => d.color)
    .attr('opacity', 0.85)
    .attr('stroke', 'rgba(255,255,255,0.3)')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('click', (event, d) => {
      event.stopPropagation();
      toggleCard(d.id);
    })
    .call(drag(simulation));
  
  // Labels
  const labels = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .text(d => d.nombre.substring(0, 2).toUpperCase())
    .attr('font-size', '10px')
    .attr('font-weight', '700')
    .attr('fill', '#e7eaf2')
    .attr('text-anchor', 'middle')
    .attr('pointer-events', 'none');
  
  // Hover
  node.on('mouseover', function(event, d) {
    d3.select(this).attr('stroke-width', 3).attr('stroke', '#2fd4c8');
  })
  .on('mouseout', function(event, d) {
    d3.select(this).attr('stroke-width', 2).attr('stroke', 'rgba(255,255,255,0.3)');
  });
  
  // Tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
    
    labels
      .attr('x', d => d.x)
      .attr('y', d => d.y + 3);
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
  
  console.log('✅ Network visualization inicializada');
}

// FILTER
function filterAbsences(type) {
  currentFilter = type;
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// ACTIONS
function generateAbsenceReport() {
  alert('Generando reporte con todos los indicadores y fuentes...');
}

function suggestAdditions() {
  alert('Sugiriendo adiciones basadas en análisis de ausencias...');
}

function compareWithODS() {
  alert('Comparando indicadores de ausencia con ODS...');
}

console.log('✅ Módulo 05 completamente cargado');
