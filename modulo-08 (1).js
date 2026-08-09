const eepData = {
  nodes: [
    { id: 1, label: "Ríos", icon: "fa-water", layer: "principal" },
    { id: 2, label: "Quebradas", icon: "fa-water", layer: "principal" },
    { id: 3, label: "Humedales", icon: "fa-water", layer: "principal" },
    { id: 4, label: "Corredores\nmontañosos", icon: "fa-mountain", layer: "principal" },
    { id: 5, label: "Cerros\nOrientales", icon: "fa-mountain", layer: "principal" },
    { id: 6, label: "Áreas\nprotegidas", icon: "fa-shield", layer: "secundaria" },
    { id: 7, label: "Bosques\nurbanos", icon: "fa-tree", layer: "secundaria" },
    { id: 8, label: "Resiliencia\nclimática", icon: "fa-cloud", layer: "secundaria" },
    { id: 9, label: "Complejos de\npáramos", icon: "fa-mountain", layer: "secundaria" },
    { id: 10, label: "Coberturas\nvegetales", icon: "fa-leaf", layer: "secundaria" },
    { id: 11, label: "Parques\nde borde", icon: "fa-tree", layer: "conexion" },
    { id: 12, label: "Parques\necológicos", icon: "fa-mountain", layer: "conexion" },
    { id: 13, label: "Paisajes\nsostenibles", icon: "fa-leaf", layer: "conexion" },
    { id: 14, label: "Reservas\nforestales", icon: "fa-tree", layer: "conexion" }
  ],
  
  links: [
    { source: 1, target: 3, type: "flujo" },
    { source: 2, target: 3, type: "flujo" },
    { source: 1, target: 4, type: "condiciona" },
    { source: 2, target: 4, type: "condiciona" },
    { source: 4, target: 5, type: "condiciona" },
    { source: 5, target: 6, type: "contiene" },
    { source: 3, target: 7, type: "sostiene" },
    { source: 6, target: 8, type: "regula" },
    { source: 4, target: 9, type: "conecta" },
    { source: 1, target: 10, type: "genera" },
    { source: 3, target: 10, type: "genera" },
    { source: 5, target: 10, type: "genera" },
    { source: 6, target: 11, type: "integra" },
    { source: 7, target: 11, type: "integra" },
    { source: 8, target: 12, type: "conecta" },
    { source: 9, target: 12, type: "conecta" },
    { source: 10, target: 13, type: "integra" },
    { source: 7, target: 14, type: "integra" },
    { source: 9, target: 14, type: "integra" }
  ]
};

const state = {
  visibleLayers: { principal: true, secundaria: true, conexion: true },
  simulation: null,
  svg: null,
  width: 0,
  height: 0
};

window.addEventListener('load', () => {
  renderApp();
  setTimeout(initNetwork, 100);
  setupEventListeners();
});

function renderApp() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="icon"><i class="fa-solid fa-diagram-project"></i></div>
        <span>RAPOT</span>
      </div>
      
      <div class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-item">
            <i class="fa-solid fa-home"></i> Dashboard
          </div>
        </div>
        
        <div class="nav-section">
          <div class="nav-label">MÓDULOS</div>
          <div class="nav-item"><span style="font-size: 0.6rem; width: 14px;">01</span> Análisis</div>
          <div class="nav-item"><span style="font-size: 0.6rem; width: 14px;">02</span> Red</div>
          <div class="nav-item"><span style="font-size: 0.6rem; width: 14px;">03</span> Contradicciones</div>
          <div class="nav-item"><span style="font-size: 0.6rem; width: 14px;">04</span> Macromodelos</div>
          <div class="nav-item"><span style="font-size: 0.6rem; width: 14px;">05</span> Ausencias</div>
          <div class="nav-item"><span style="font-size: 0.6rem; width: 14px;">06</span> POT vs ODS</div>
          <div class="nav-item"><span style="font-size: 0.6rem; width: 14px;">07</span> Simulador</div>
          <div class="nav-item active"><span style="font-size: 0.6rem; width: 14px;">08</span> Mi Modelo</div>
        </div>
      </div>
      
      <div class="sidebar-footer">
        © RAPOT 2026
      </div>
    </aside>
    
    <div class="main-container">
      <div class="topbar">
        <h1>EEP: Estructura Ecológica Principal</h1>
        <div>Análisis Crítico // Nodos = 14</div>
      </div>
      
      <div class="content">
        <div class="control-panel">
          <div class="control-section">
            <h3><i class="fa-solid fa-sliders"></i> Opciones</h3>
            <div class="input-field">
              <label>Filtro de búsqueda</label>
              <input type="text" id="searchInput" placeholder="Buscar componente...">
            </div>
            <button class="btn btn-secondary" id="resetBtn" style="width: 100%;">
              <i class="fa-solid fa-rotate-left"></i> Resetear Vista
            </button>
          </div>
          
          <div class="control-section">
            <h3><i class="fa-solid fa-chart-bar"></i> Estadísticas</h3>
            <div class="stats">
              <div class="stat-row">
                <span class="stat-label">Nodos Totales:</span>
                <span class="stat-value">14</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Relaciones:</span>
                <span class="stat-value">19</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Visibles:</span>
                <span class="stat-value" id="visibleCount">14</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Conectividad:</span>
                <span class="stat-value">Máxima</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="network-container">
          <div class="network-title">
            <i class="fa-solid fa-sitemap"></i> Red Analítica (Modo Analítico)
          </div>
          <div class="network-svg-wrapper">
            <svg id="networkSvg"></svg>
          </div>
        </div>
        
        <div class="legend-panel">
          <div class="legend-title">
            <i class="fa-solid fa-layer-group"></i> Capas
          </div>
          
          <div class="legend-items">
            <div class="legend-item">
              <div class="legend-indicator" style="background: #2fd4c8;"></div>
              <div class="legend-item-content">
                <div class="legend-item-label">Nodos Principales</div>
                <div class="legend-item-desc">Determinantes</div>
              </div>
              <div class="toggle-switch active" data-layer="principal">
                <div class="toggle-circle"></div>
              </div>
            </div>
            
            <div class="legend-item">
              <div class="legend-indicator" style="background: #4ade80;"></div>
              <div class="legend-item-content">
                <div class="legend-item-label">Nodos Secundarios</div>
                <div class="legend-item-desc">Complementarios</div>
              </div>
              <div class="toggle-switch active" data-layer="secundaria">
                <div class="toggle-circle"></div>
              </div>
            </div>
            
            <div class="legend-item">
              <div class="legend-indicator" style="background: #a276f2;"></div>
              <div class="legend-item-content">
                <div class="legend-item-label">Conexiones</div>
                <div class="legend-item-desc">Espacios vinculantes</div>
              </div>
              <div class="toggle-switch active" data-layer="conexion">
                <div class="toggle-circle"></div>
              </div>
            </div>
          </div>
          
          <div class="relations-section">
            <div class="relations-title">Convenciones</div>
            
            <div class="relation-item">
              <svg class="relation-svg" width="50" height="15">
                <defs>
                  <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#2fd4c8" />
                  </marker>
                </defs>
                <line x1="0" y1="7" x2="40" y2="7" stroke="#2fd4c8" stroke-width="2" marker-end="url(#arrow1)" />
              </svg>
              <span class="relation-label">Redes dirigidas</span>
            </div>
            
            <div class="relation-item">
              <svg class="relation-svg" width="50" height="15">
                <line x1="0" y1="7" x2="50" y2="7" stroke="#4ade80" stroke-width="2" />
                <polygon points="0,5 4,7 0,9" fill="#4ade80" />
                <polygon points="50,5 46,7 50,9" fill="#4ade80" />
              </svg>
              <span class="relation-label">Redes no dirigidas</span>
            </div>
            
            <div class="relation-item">
              <svg class="relation-svg" width="50" height="15">
                <defs>
                  <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#4ade80" />
                  </marker>
                </defs>
                <line x1="0" y1="7" x2="40" y2="7" stroke="#4ade80" stroke-width="3" marker-end="url(#arrow2)" />
              </svg>
              <span class="relation-label">Enlace fuerte</span>
            </div>
            
            <div class="relation-item">
              <svg class="relation-svg" width="50" height="15">
                <defs>
                  <marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#f76fb0" />
                  </marker>
                </defs>
                <line x1="0" y1="7" x2="40" y2="7" stroke="#f76fb0" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow3)" />
              </svg>
              <span class="relation-label">Enlace conflictivo</span>
            </div>
          </div>
        </div>
      </div>
      
      <footer>
        Análisis Crítico EEP - POT Bogotá Reverdece 2022-2035 | Ingeniería Inversa de la Ciudad
      </footer>
    </div>
  `;
}

function initNetwork() {
  const svg = d3.select("#networkSvg");
  const wrapper = document.querySelector(".network-svg-wrapper");
  
  if (!wrapper) return;
  
  const width = wrapper.offsetWidth;
  const height = wrapper.offsetHeight;
  
  state.width = width;
  state.height = height;
  state.svg = svg;
  
  const visibleNodes = eepData.nodes.filter(n => state.visibleLayers[n.layer]);
  const nodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleLinks = eepData.links.filter(l => nodeIds.has(l.source) && nodeIds.has(l.target));
  
  const simulation = d3.forceSimulation(visibleNodes)
    .force('link', d3.forceLink(visibleLinks).id(d => d.id).distance(120).strength(0.4))
    .force('charge', d3.forceManyBody().strength(-400).distanceMax(400))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(50).strength(0.8))
    .alphaDecay(0.02);
  
  state.simulation = simulation;
  
  svg.selectAll("*").remove();
  
  const g = svg.append("g");
  
  svg.append("defs").selectAll("marker")
    .data([
      {id: "arrowTeal", color: "#2fd4c8"},
      {id: "arrowGreen", color: "#4ade80"},
      {id: "arrowPink", color: "#f76fb0"}
    ])
    .enter()
    .append("marker")
    .attr("id", d => d.id)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("refX", 25)
    .attr("refY", 3)
    .attr("orient", "auto")
    .append("polygon")
    .attr("points", "0 0, 10 3, 0 6")
    .attr("fill", d => d.color);
  
  const link = g.selectAll("line.link-line")
    .data(visibleLinks)
    .enter()
    .append("line")
    .attr("class", "link-line")
    .attr("stroke", d => {
      if (d.type === "conflicto") return "#f76fb0";
      if (d.type === "flujo") return "#2fd4c8";
      return "#4ade80";
    })
    .attr("stroke-width", d => {
      if (d.type === "flujo") return 2.5;
      return 1.5;
    })
    .attr("stroke-dasharray", d => d.type === "conflicto" ? "5,5" : "0")
    .attr("marker-end", d => {
      if (d.type === "conflicto") return "url(#arrowPink)";
      if (d.type === "flujo") return "url(#arrowTeal)";
      return "url(#arrowGreen)";
    });
  
  const node = g.selectAll("circle.node-circle")
    .data(visibleNodes)
    .enter()
    .append("circle")
    .attr("class", "node-circle")
    .attr("r", d => {
      if (d.layer === 'principal') return 40;
      if (d.layer === 'secundaria') return 32;
      return 28;
    })
    .attr("fill", d => {
      if (d.layer === 'principal') return '#2fd4c8';
      if (d.layer === 'secundaria') return '#4ade80';
      return '#a276f2';
    })
    .attr("opacity", 0.85)
    .call(drag(simulation));
  
  const label = g.selectAll("text.node-label")
    .data(visibleNodes)
    .enter()
    .append("text")
    .attr("class", "node-label")
    .text(d => d.label);
  
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    node
      .attr('cx', d => Math.max(50, Math.min(width - 50, d.x)))
      .attr('cy', d => Math.max(50, Math.min(height - 50, d.y)));
    
    label
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  });
  
  updateStats(visibleNodes.length);
}

function drag(simulation) {
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

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}

function updateStats(visibleCount) {
  const el = document.getElementById('visibleCount');
  if (el) el.textContent = visibleCount;
}

function setupEventListeners() {
  document.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const layer = this.dataset.layer;
      state.visibleLayers[layer] = !state.visibleLayers[layer];
      this.classList.toggle('active');
      initNetwork();
    });
  });
  
  document.getElementById('resetBtn').addEventListener('click', () => {
    state.visibleLayers = { principal: true, secundaria: true, conexion: true };
    document.querySelectorAll('.toggle-switch').forEach(t => t.classList.add('active'));
    initNetwork();
  });
  
  document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    d3.selectAll('.node-circle').each(function() {
      const parent = d3.select(this.parentNode);
      const label = parent.select('.node-label').text().toLowerCase();
      d3.select(this).style('opacity', label.includes(query) || query === '' ? 0.85 : 0.2);
    });
  });
}
