const baselineScenario = {
  name: 'Escenario Base',
  density: 42,
  connectivity: 156,
  resilience: 68,
  ods: 71,
  inclusion: 52,
  employment: 64,
  nodes: 12,
  links: 18
};

const scenarios = {
  baseline: { name: 'Escenario Base', density: 42, connectivity: 156, resilience: 68, ods: 71, inclusion: 52, employment: 64, nodes: 12, links: 18 },
  inclusive: { name: 'Bogotá Inclusiva', density: 55, connectivity: 189, resilience: 76, ods: 85, inclusion: 80, employment: 71, nodes: 16, links: 24 },
  green: { name: 'Bogotá Verde', density: 62, connectivity: 198, resilience: 82, ods: 89, inclusion: 65, employment: 68, nodes: 18, links: 28 },
  economic: { name: 'Bogotá Productiva', density: 58, connectivity: 192, resilience: 78, ods: 86, inclusion: 60, employment: 79, nodes: 15, links: 23 },
  integrated: { name: 'Bogotá Integrada', density: 72, connectivity: 218, resilience: 88, ods: 95, inclusion: 85, employment: 82, nodes: 22, links: 35 }
};

let currentScenario = 'baseline';

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  initEventListeners();
  updateSliderValues();
  selectScenario('baseline');
  setTimeout(() => drawNetwork(scenarios.baseline), 100);
});

// ============================================================
// EVENT LISTENERS
// ============================================================

function initEventListeners() {
  // Scenario buttons
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const scenario = this.dataset.scenario;
      selectScenario(scenario);
    });
  });

  // Sliders
  document.getElementById('yearSlider').addEventListener('input', updateSliderValues);
  document.getElementById('investSlider').addEventListener('input', updateSliderValues);
  document.getElementById('capacitySlider').addEventListener('input', updateSliderValues);

  // Buttons
  document.getElementById('btnSimulate').addEventListener('click', runSimulation);
  document.getElementById('btnReset').addEventListener('click', resetSimulation);
  document.getElementById('btnExport').addEventListener('click', exportScenario);
  document.getElementById('btnCompare').addEventListener('click', compareScenarios);
  document.getElementById('btnSave').addEventListener('click', saveScenario);
}

// ============================================================
// SCENARIO SELECTION
// ============================================================

function selectScenario(scenarioKey) {
  currentScenario = scenarioKey;
  const scenario = scenarios[scenarioKey];

  // Update button states
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-scenario="${scenarioKey}"]`).classList.add('active');

  // Update display
  updateIndicators(scenario);
  drawNetwork(scenario);
}

function updateIndicators(scenario) {
  const baseline = baselineScenario;

  // Update values
  document.getElementById('indDensity').textContent = scenario.density + '%';
  document.getElementById('indConnect').textContent = scenario.connectivity;
  document.getElementById('indResilient').textContent = scenario.resilience + '%';
  document.getElementById('indOds').textContent = scenario.ods + '%';
  document.getElementById('indInclusion').textContent = scenario.inclusion + '%';
  document.getElementById('indEmployment').textContent = scenario.employment + '%';

  // Update changes
  const densityDiff = scenario.density - baseline.density;
  const connectDiff = scenario.connectivity - baseline.connectivity;
  const resilDiff = scenario.resilience - baseline.resilience;
  const odsDiff = scenario.ods - baseline.ods;
  const inclDiff = scenario.inclusion - baseline.inclusion;
  const emplDiff = scenario.employment - baseline.employment;

  document.getElementById('chgDensity').textContent = (densityDiff >= 0 ? '+' : '') + densityDiff + '%';
  document.getElementById('chgConnect').textContent = (connectDiff >= 0 ? '+' : '') + connectDiff;
  document.getElementById('chgResilient').textContent = (resilDiff >= 0 ? '+' : '') + resilDiff + '%';
  document.getElementById('chgOds').textContent = (odsDiff >= 0 ? '+' : '') + odsDiff + '%';
  document.getElementById('chgInclusion').textContent = (inclDiff >= 0 ? '+' : '') + inclDiff + '%';
  document.getElementById('chgEmployment').textContent = (emplDiff >= 0 ? '+' : '') + emplDiff + '%';

  // Update analysis cards
  updateAnalysisCards(scenario);
}

function updateAnalysisCards(scenario) {
  const baseline = baselineScenario;

  // Ecológico
  document.getElementById('eco1').textContent = '+' + (scenario.resilience - baseline.resilience) + '%';
  document.getElementById('eco2').textContent = '+' + Math.round((scenario.resilience - baseline.resilience) * 0.7) + '%';
  document.getElementById('eco3').textContent = '+' + (scenario.resilience - baseline.resilience) + '%';

  // Social
  document.getElementById('soc1').textContent = '+' + (scenario.inclusion - baseline.inclusion) + '%';
  document.getElementById('soc2').textContent = '+' + Math.round((scenario.inclusion - baseline.inclusion) * 0.8) + '%';
  document.getElementById('soc3').textContent = '+' + Math.round((scenario.inclusion - baseline.inclusion) * 0.9) + '%';

  // Económico
  document.getElementById('econ1').textContent = '+' + (scenario.employment - baseline.employment) + '%';
  document.getElementById('econ2').textContent = '+' + Math.round((scenario.density - baseline.density) * 1.2) + '%';
  document.getElementById('econ3').textContent = '+' + Math.round((scenario.employment - baseline.employment) * 0.8) + '%';

  // ODS
  const odsAlignment = 11 + Math.floor((scenario.ods - baseline.ods) / 5);
  document.getElementById('ods1').textContent = odsAlignment + '/17';
  document.getElementById('ods2').textContent = '-' + Math.round((scenario.ods - baseline.ods) * 0.8) + '%';
  document.getElementById('ods3').textContent = Math.round((scenario.ods + 30) / 1.5) + '%';
}

// ============================================================
// SLIDERS
// ============================================================

function updateSliderValues() {
  const year = document.getElementById('yearSlider').value;
  const invest = document.getElementById('investSlider').value;
  const capacity = document.getElementById('capacitySlider').value;

  document.getElementById('yearValue').textContent = year;
  document.getElementById('investValue').textContent = invest + '%';
  document.getElementById('capacityValue').textContent = capacity + '%';
}

// ============================================================
// BUTTONS
// ============================================================

function runSimulation() {
  const year = document.getElementById('yearSlider').value;
  const invest = document.getElementById('investSlider').value;
  const capacity = document.getElementById('capacitySlider').value;
  const interventions = Array.from(document.querySelectorAll('.intervention-list input:checked')).length;

  alert(`✅ SIMULACIÓN EJECUTADA\n\nEscenario: ${scenarios[currentScenario].name}\nAño Meta: ${year}\nInversión: ${invest}%\nCapacidad: ${capacity}%\nIntervenciones: ${interventions}\n\nResultados actualizados arriba.`);
}

function resetSimulation() {
  document.getElementById('yearSlider').value = 2030;
  document.getElementById('investSlider').value = 50;
  document.getElementById('capacitySlider').value = 60;
  document.querySelectorAll('.intervention-list input').forEach(cb => cb.checked = false);
  updateSliderValues();
  selectScenario('baseline');
}

function exportScenario() {
  const scenario = scenarios[currentScenario];
  const data = {
    escenario: scenario.name,
    año: document.getElementById('yearSlider').value,
    inversion: document.getElementById('investSlider').value,
    capacidad: document.getElementById('capacitySlider').value,
    indicadores: {
      densidad: scenario.density + '%',
      conectividad: scenario.connectivity,
      resiliencia: scenario.resilience + '%',
      alineacion_ods: scenario.ods + '%',
      inclusion: scenario.inclusion + '%',
      empleo: scenario.employment + '%'
    }
  };

  alert(`📥 EXPORTANDO\n\nEscenario: ${scenario.name}\n\nDatos:\n${JSON.stringify(data, null, 2)}`);
}

function compareScenarios() {
  const baseline = scenarios.baseline;
  const current = scenarios[currentScenario];

  const comparison = `📊 COMPARACIÓN: ${current.name} vs ${baseline.name}\n\n` +
    `Densidad: ${baseline.density}% → ${current.density}% (${current.density - baseline.density > 0 ? '+' : ''}${current.density - baseline.density}%)\n` +
    `Conectividad: ${baseline.connectivity} → ${current.connectivity} (${current.connectivity - baseline.connectivity > 0 ? '+' : ''}${current.connectivity - baseline.connectivity})\n` +
    `Resiliencia: ${baseline.resilience}% → ${current.resilience}% (${current.resilience - baseline.resilience > 0 ? '+' : ''}${current.resilience - baseline.resilience}%)\n` +
    `Alineación ODS: ${baseline.ods}% → ${current.ods}% (${current.ods - baseline.ods > 0 ? '+' : ''}${current.ods - baseline.ods}%)\n` +
    `Inclusión: ${baseline.inclusion}% → ${current.inclusion}% (${current.inclusion - baseline.inclusion > 0 ? '+' : ''}${current.inclusion - baseline.inclusion}%)\n` +
    `Empleo: ${baseline.employment}% → ${current.employment}% (${current.employment - baseline.employment > 0 ? '+' : ''}${current.employment - baseline.employment}%)`;

  alert(comparison);
}

function saveScenario() {
  const scenario = scenarios[currentScenario];
  const name = prompt('Nombre del escenario personalizado:', scenario.name);
  
  if (name) {
    alert(`💾 GUARDADO\n\nEscenario: ${name}\nBase: ${scenario.name}\nAño: ${document.getElementById('yearSlider').value}\nInversión: ${document.getElementById('investSlider').value}%`);
  }
}

// ============================================================
// NETWORK D3
// ============================================================

function drawNetwork(scenario) {
  const svg = d3.select('#networkChart');
  const container = svg.node().parentElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Generate nodes
  const nodes = d3.range(scenario.nodes).map((d, i) => ({
    id: i,
    group: i % 3
  }));

  // Generate links
  const links = d3.range(scenario.links).map(() => ({
    source: Math.floor(Math.random() * scenario.nodes),
    target: Math.floor(Math.random() * scenario.nodes)
  }));

  // Clear previous
  svg.selectAll('*').remove();

  const g = svg.append('g');

  // Simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(80).strength(0.5))
    .force('charge', d3.forceManyBody().strength(-120).distanceMax(200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(18).strength(0.8))
    .alphaDecay(0.05);

  // Links
  const link = g.selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', '#4ade80')
    .attr('stroke-width', 1.5)
    .attr('opacity', 0.5);

  // Nodes
  const node = g.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('fill', d => d.group === 0 ? '#f76fb0' : d.group === 1 ? '#a276f2' : '#4ade80')
    .attr('opacity', 0.85)
    .attr('stroke', 'rgba(255,255,255,0.4)')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .call(drag(simulation));

  // Labels
  const labels = g.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .text(d => d.id + 1)
    .attr('font-size', '9px')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    .attr('pointer-events', 'none')
    .attr('font-weight', 'bold');

  // Simulation tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .attr('cx', d => d.x = Math.max(15, Math.min(width - 15, d.x)))
      .attr('cy', d => d.y = Math.max(15, Math.min(height - 15, d.y)));

    labels
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  });

  // Drag handler
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
}
