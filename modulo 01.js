console.log('✓ Módulo 01 inicializando...');

let graphData = { nodes: [], links: [], structures: {} };
let currentView = 'overview';
let selectedStructure = null;

const structures = {
  EEP: { id: 'EEP', name: 'Estructura Ecológica\nPrincipal', color: '#34d399', icon: 'fa-leaf', fullName: 'EEP - Ecológica' },
  EFC: { id: 'EFC', name: 'Estructura Funcional\ny del Cuidado', color: '#3b82f6', icon: 'fa-home', fullName: 'EFC - Funcional' },
  ESECI: { id: 'ESECI', name: 'Estructura\nSocioeconómica', color: '#ef9552', icon: 'fa-briefcase', fullName: 'ESECI - Socioeconómica' },
  EIP: { id: 'EIP', name: 'Estructura Integradora\nde Patrimonios', color: '#b06bf7', icon: 'fa-landmark', fullName: 'EIP - Patrimonio' }
};

function loadGraphFromExcel() {
  try {
    const files = JSON.parse(localStorage.getItem('rapot_fuentes') || '[]');
    const excelFiles = files.filter(f => f.name.endsWith('.xlsx') || f.name.endsWith('.xls'));
    
    if (excelFiles.length === 0) {
      console.log('⚠ Sin Excel, cargando ejemplo...');
      loadExample();
      return;
    }

    const file = excelFiles[0];
    const array = new Uint8Array(file.data);
    const workbook = XLSX.read(array, { type: 'array' });
    
    let allRows = [];
    for (const sheetName of ['EEP', 'EFC', 'ESECI', 'EIP']) {
      if (workbook.SheetNames.includes(sheetName)) {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        const validRows = rows.filter(r => r['Concepto Origen'] && r['Concepto Relacionado']);
        allRows = allRows.concat(validRows);
      }
    }

    if (allRows.length > 0) {
      buildGraph(allRows);
    } else {
      loadExample();
    }
  } catch (error) {
    console.error('Error:', error);
    loadExample();
  }
}

function loadExample() {
  const example = [
    { 'Concepto Origen': 'Humedales', 'Estructura Origen': 'EEP', 'Concepto Relacionado': 'Vivienda', 'Estructura Relacionada': 'EFC', 'Tipo de Relación': 'Soporte', 'Sustento (según el POT)': 'Los humedales soportan sistemas de vivienda.' },
    { 'Concepto Origen': 'Áreas protegidas', 'Estructura Origen': 'EEP', 'Concepto Relacionado': 'Turismo', 'Estructura Relacionada': 'ESECI', 'Tipo de Relación': 'Directa', 'Sustento (según el POT)': 'El turismo depende de áreas protegidas.' },
    { 'Concepto Origen': 'Patrimonio cultural', 'Estructura Origen': 'EIP', 'Concepto Relacionado': 'Identidades', 'Estructura Relacionada': 'EIP', 'Tipo de Relación': 'Directa', 'Sustento (según el POT)': 'El patrimonio forma identidades.' },
    { 'Concepto Origen': 'Movilidad', 'Estructura Origen': 'EFC', 'Concepto Relacionado': 'Empleo', 'Estructura Relacionada': 'ESECI', 'Tipo de Relación': 'Soporte', 'Sustento (según el POT)': 'La movilidad soporta acceso a empleo.' }
  ];
  buildGraph(example);
}

function buildGraph(rows) {
  const structData = {};
  ['EEP', 'EFC', 'ESECI', 'EIP'].forEach(s => structData[s] = { nodes: new Map(), links: [] });

  const globalLinks = [];

  rows.forEach(row => {
    const origen = row['Concepto Origen'];
    const dest = row['Concepto Relacionado'];
    const estructOrigen = row['Estructura Origen'];
    const estructDest = row['Estructura Relacionada'];

    if (!estructOrigen || !estructDest) return;

    let eOrigen = 'EEP', eDest = 'EEP';
    if (estructOrigen.includes('Funcional')) eOrigen = 'EFC';
    else if (estructOrigen.includes('Socioeconómica') || estructOrigen.includes('Creativa')) eOrigen = 'ESECI';
    else if (estructOrigen.includes('Integradora') || estructOrigen.includes('Patrimonio')) eOrigen = 'EIP';

    if (estructDest.includes('Funcional')) eDest = 'EFC';
    else if (estructDest.includes('Socioeconómica') || estructDest.includes('Creativa')) eDest = 'ESECI';
    else if (estructDest.includes('Integradora') || estructDest.includes('Patrimonio')) eDest = 'EIP';

    if (!structData[eOrigen].nodes.has(origen)) {
      structData[eOrigen].nodes.set(origen, { name: origen, estructura: eOrigen });
    }
    if (!structData[eDest].nodes.has(dest)) {
      structData[eDest].nodes.set(dest, { name: dest, estructura: eDest });
    }

    if (eOrigen !== eDest) {
      globalLinks.push({
        source: eOrigen,
        target: eDest,
        tipo: (row['Tipo de Relación'] || 'Directa').toLowerCase(),
        sustento: row['Sustento (según el POT)'] || '—'
      });
    }

    // Links dentro de la estructura
    structData[eOrigen].links.push({
      source: structData[eOrigen].nodes.get(origen),
      target: structData[eOrigen].nodes.get(origen), // placeholder
      tipo: (row['Tipo de Relación'] || 'Directa').toLowerCase(),
      sustento: row['Sustento (según el POT)'] || '—'
    });
  });

  graphData.structures = structData;
  graphData.globalLinks = globalLinks;

  const totalNodes = Object.values(structData).reduce((sum, s) => sum + s.nodes.size, 0);
  document.getElementById('statConceptos').textContent = totalNodes;
  document.getElementById('statRelaciones').textContent = rows.length;
  document.getElementById('statFuentes').textContent = 4;
  document.getElementById('statTipos').textContent = new Set(rows.map(r => r['Tipo de Relación'])).size;

  renderOverview();
}

function renderOverview() {
  console.log('📊 Renderizando OVERVIEW...');
  currentView = 'overview';
  document.getElementById('detailPanel').style.display = 'none';

  const svg = d3.select('#graphSvg');
  document.getElementById('graphLoading').style.display = 'none';
  svg.selectAll('*').remove();

  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;
  svg.attr('viewBox', `0 0 ${width} ${height}`);

  const container = svg.append('g');
  svg.call(d3.zoom().scaleExtent([0.8, 2]).on('zoom', e => container.attr('transform', e.transform)));

  const nodes = Object.values(structures).map(s => ({
    id: s.id,
    ...s,
    x: width / 2,
    y: height / 2
  }));

  const links = graphData.globalLinks.map(l => ({
    source: l.source,
    target: l.target,
    tipo: l.tipo
  }));

  const linkSel = container.append('g').selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 2)
    .attr('opacity', 0.3)
    .attr('stroke-dasharray', d => d.tipo === 'indirecta' ? '5,5' : 'none');

  const nodeSel = container.append('g').selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => renderStructure(d.id));

  nodeSel.append('circle')
    .attr('r', 70)
    .attr('fill', 'rgba(10,14,23,0.8)')
    .attr('stroke', d => d.color)
    .attr('stroke-width', 3)
    .attr('filter', d => `drop-shadow(0 0 20px ${d.color})`)
    .attr('opacity', 0.9);

  nodeSel.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-18')
    .attr('font-size', '24px')
    .attr('font-weight', '700')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .html(d => `<tspan class="fa-solid ${d.icon}"></tspan>`);

  nodeSel.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '8')
    .attr('font-size', '11.5px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name);

  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(220).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-800))
    .force('center', d3.forceCenter(width / 2, height / 2));

  sim.on('tick', () => {
    linkSel
      .attr('x1', d => nodes.find(n => n.id === d.source).x)
      .attr('y1', d => nodes.find(n => n.id === d.source).y)
      .attr('x2', d => nodes.find(n => n.id === d.target).x)
      .attr('y2', d => nodes.find(n => n.id === d.target).y);

    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

function renderStructure(structId) {
  console.log('📊 Renderizando estructura:', structId);
  currentView = 'structure';
  selectedStructure = structId;

  const struct = structures[structId];
  const nodes = Array.from(graphData.structures[structId].nodes.values());
  const links = [];

  // Crear links entre nodos de la misma estructura
  for (const node of nodes) {
    for (const link of graphData.globalLinks) {
      if ((link.source === structId || link.target === structId) && nodes.some(n => n.name.includes(node.name))) {
        // Conectar conceptos relacionados
      }
    }
  }

  const svg = d3.select('#graphSvg');
  svg.selectAll('*').remove();

  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;
  svg.attr('viewBox', `0 0 ${width} ${height}`);

  const container = svg.append('g');
  svg.call(d3.zoom().scaleExtent([0.8, 3]).on('zoom', e => container.attr('transform', e.transform)));

  const linkSel = container.append('g').selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', d => {
      if (d.tipo === 'directa') return '#34d399';
      if (d.tipo === 'indirecta') return '#3b82f6';
      if (d.tipo === 'soporte') return '#ef9552';
      return '#b06bf7';
    })
    .attr('stroke-width', 2)
    .attr('opacity', 0.6)
    .attr('stroke-dasharray', d => d.tipo === 'indirecta' ? '5,5' : 'none');

  const nodeSel = container.append('g').selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => showDetail(d));

  nodeSel.append('circle')
    .attr('r', 45)
    .attr('fill', 'rgba(10,14,23,0.8)')
    .attr('stroke', struct.color)
    .attr('stroke-width', 2.5)
    .attr('filter', `drop-shadow(0 0 12px ${struct.color})`)
    .attr('opacity', 0.95);

  nodeSel.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    .attr('font-size', '10px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name.length > 15 ? d.name.slice(0, 12) + '…' : d.name);

  const sim = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(50));

  sim.on('tick', () => {
    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

function showDetail(node) {
  document.getElementById('detailPanel').style.display = 'flex';
  document.getElementById('detailName').textContent = node.name;
  document.getElementById('detailStruct').textContent = structures[selectedStructure].fullName;
  document.getElementById('detailOut').innerHTML = '<span class="detail-empty">Conexiones salientes...</span>';
  document.getElementById('detailIn').innerHTML = '<span class="detail-empty">Conexiones entrantes...</span>';
}

window.addEventListener('load', () => {
  loadGraphFromExcel();
});
