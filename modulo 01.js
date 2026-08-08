console.log('✓ Módulo 01 JS iniciando...');

let graphData = { nodes: [], links: [], structures: {} };
let currentView = 'overview';
let selectedStructure = null;

const structures = {
  EEP: { id: 'EEP', name: 'Sistema Ambiental y de\nEstructura Ecológica Principal', color: '#34d399', icon: 'fa-leaf', fullName: 'EEP - Ecológica' },
  EFC: { id: 'EFC', name: 'Sistema Funcional\ny del Cuidado', color: '#3b82f6', icon: 'fa-home', fullName: 'EFC - Funcional' },
  ESECI: { id: 'ESECI', name: 'Sistema de Actividades\nSocioeconómicas', color: '#ef9552', icon: 'fa-briefcase', fullName: 'ESECI - Socioeconómica' },
  EIP: { id: 'EIP', name: 'Sistema Integrador\nde Patrimonios', color: '#b06bf7', icon: 'fa-landmark', fullName: 'EIP - Patrimonio' }
};

function loadGraph() {
  try {
    const files = JSON.parse(localStorage.getItem('rapot_fuentes') || '[]');
    const excelFiles = files.filter(f => f.name.endsWith('.xlsx') || f.name.endsWith('.xls'));
    
    if (excelFiles.length === 0) {
      console.log('Sin Excel, mostrando ejemplo...');
      loadExample();
      return;
    }

    const file = excelFiles[0];
    const array = new Uint8Array(file.data);
    const workbook = XLSX.read(array, { type: 'array' });
    
    console.log('Hojas encontradas:', workbook.SheetNames);
    
    let allRows = [];
    const structData = {};
    ['EEP', 'EFC', 'ESECI', 'EIP'].forEach(s => structData[s] = { nodes: new Map(), links: [] });

    // Leer cada hoja
    for (const sheetName of ['EEP', 'EFC', 'ESECI', 'EIP']) {
      if (!workbook.SheetNames.includes(sheetName)) continue;
      
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      
      console.log(`📄 Hoja ${sheetName}: ${rows.length} filas`);
      
      rows.forEach(row => {
        if (!row['Concepto Origen'] || !row['Concepto Relacionado']) return;
        
        const origen = row['Concepto Origen'];
        const destino = row['Concepto Relacionado'];
        const tipo = row['Tipo de Relación'] || 'Directa';
        const sustento = row['Sustento (según el POT)'] || '—';
        const page = row['Página POT'] || '—';

        // Agregar nodos a la estructura
        if (!structData[sheetName].nodes.has(origen)) {
          structData[sheetName].nodes.set(origen, { 
            name: origen, 
            estructura: sheetName,
            in: 0,
            out: 0
          });
        }
        if (!structData[sheetName].nodes.has(destino)) {
          structData[sheetName].nodes.set(destino, { 
            name: destino,
            estructura: sheetName,
            in: 0,
            out: 0
          });
        }

        const nodoOrigen = structData[sheetName].nodes.get(origen);
        const nodoDestino = structData[sheetName].nodes.get(destino);
        nodoOrigen.out++;
        nodoDestino.in++;

        // Links dentro de la estructura
        structData[sheetName].links.push({
          source: origen,
          target: destino,
          tipo: tipo.toLowerCase(),
          sustento: sustento,
          page: page,
          sourceName: origen,
          targetName: destino
        });

        allRows.push(row);
      });
    }

    graphData.structures = structData;

    // Stats
    const totalNodes = Object.values(structData).reduce((sum, s) => sum + s.nodes.size, 0);
    document.getElementById('statConceptos').textContent = totalNodes;
    document.getElementById('statRelaciones').textContent = allRows.length;
    document.getElementById('statFuentes').textContent = 4;
    document.getElementById('statTipos').textContent = new Set(allRows.map(r => r['Tipo de Relación'])).size;

    renderOverview();

  } catch (error) {
    console.error('Error:', error);
    loadExample();
  }
}

function loadExample() {
  const exampleRows = [
    { 'Concepto Origen': 'Humedales', 'Estructura Origen': 'EEP', 'Concepto Relacionado': 'Ríos', 'Estructura Relacionada': 'EEP', 'Tipo de Relación': 'Directa', 'Página POT': 'p. 51', 'Sustento (según el POT)': 'El agua llega a Bogotá por escorrentías, quebradas y ríos.' },
    { 'Concepto Origen': 'Ríos', 'Estructura Origen': 'EEP', 'Concepto Relacionado': 'Áreas protegidas', 'Estructura Relacionada': 'EEP', 'Tipo de Relación': 'Soporte', 'Página POT': 'p. 51', 'Sustento (según el POT)': 'Los ríos alimentan áreas protegidas.' }
  ];

  const structData = {};
  ['EEP', 'EFC', 'ESECI', 'EIP'].forEach(s => structData[s] = { nodes: new Map(), links: [] });

  exampleRows.forEach(row => {
    const sheetName = 'EEP';
    const origen = row['Concepto Origen'];
    const destino = row['Concepto Relacionado'];

    if (!structData[sheetName].nodes.has(origen)) {
      structData[sheetName].nodes.set(origen, { name: origen, estructura: sheetName, in: 0, out: 0 });
    }
    if (!structData[sheetName].nodes.has(destino)) {
      structData[sheetName].nodes.set(destino, { name: destino, estructura: sheetName, in: 0, out: 0 });
    }

    structData[sheetName].links.push({
      source: origen,
      target: destino,
      tipo: row['Tipo de Relación'].toLowerCase(),
      sustento: row['Sustento (según el POT)'],
      page: row['Página POT'],
      sourceName: origen,
      targetName: destino
    });
  });

  graphData.structures = structData;

  document.getElementById('statConceptos').textContent = 2;
  document.getElementById('statRelaciones').textContent = 2;
  document.getElementById('statFuentes').textContent = 4;
  document.getElementById('statTipos').textContent = 2;

  renderOverview();
}

function renderOverview() {
  console.log('📊 Overview');
  currentView = 'overview';
  document.getElementById('detailPanel').style.display = 'none';

  const svg = d3.select('#graphSvg');
  document.getElementById('graphLoading').style.display = 'none';
  svg.style('display', 'block');
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

  const nodeSel = container.append('g').selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => renderStructure(d.id));

  nodeSel.append('circle')
    .attr('r', 80)
    .attr('fill', d => `${d.color}30`)
    .attr('stroke', d => d.color)
    .attr('stroke-width', 3)
    .attr('filter', d => `drop-shadow(0 0 25px ${d.color})`)
    .attr('opacity', 0.95);

  nodeSel.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-35')
    .attr('font-size', '28px')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .html(d => `<tspan class="fa-solid ${d.icon}"></tspan>`);

  nodeSel.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '8')
    .attr('font-size', '11px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name);

  const sim = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-800))
    .force('center', d3.forceCenter(width / 2, height / 2));

  sim.on('tick', () => {
    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

function renderStructure(structId) {
  console.log('📊 Estructura:', structId);
  currentView = 'structure';
  selectedStructure = structId;

  const struct = structures[structId];
  const nodes = Array.from(graphData.structures[structId].nodes.values());
  const links = graphData.structures[structId].links;

  const svg = d3.select('#graphSvg');
  svg.selectAll('*').remove();

  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;
  svg.attr('viewBox', `0 0 ${width} ${height}`);

  const container = svg.append('g');
  svg.call(d3.zoom().scaleExtent([0.8, 3]).on('zoom', e => container.attr('transform', e.transform)));

  // LINKS
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

  // NODES
  const nodeSel = container.append('g').selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => showDetail(d));

  nodeSel.append('circle')
    .attr('r', 50)
    .attr('fill', `${struct.color}30`)
    .attr('stroke', struct.color)
    .attr('stroke-width', 2.5)
    .attr('filter', `drop-shadow(0 0 15px ${struct.color})`)
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
    .force('link', d3.forceLink(links)
      .id(d => d.name)
      .distance(120)
      .strength(0.3)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(60));

  sim.on('tick', () => {
    linkSel
      .attr('x1', d => {
        const n = nodes.find(node => node.name === d.source);
        return n ? n.x : 0;
      })
      .attr('y1', d => {
        const n = nodes.find(node => node.name === d.source);
        return n ? n.y : 0;
      })
      .attr('x2', d => {
        const n = nodes.find(node => node.name === d.target);
        return n ? n.x : 0;
      })
      .attr('y2', d => {
        const n = nodes.find(node => node.name === d.target);
        return n ? n.y : 0;
      });

    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

function showDetail(node) {
  document.getElementById('detailPanel').style.display = 'flex';
  document.getElementById('detailName').textContent = node.name;
  document.getElementById('detailStruct').textContent = structures[selectedStructure].fullName;
  
  const outgoing = graphData.structures[selectedStructure].links.filter(l => l.source === node.name);
  const incoming = graphData.structures[selectedStructure].links.filter(l => l.target === node.name);

  document.getElementById('detailOut').innerHTML = outgoing.length > 0
    ? outgoing.map(l => `<div>→ <strong>${l.targetName}</strong></div>`).join('')
    : '<span style="color:#6b7284;">Sin conexiones</span>';

  document.getElementById('detailIn').innerHTML = incoming.length > 0
    ? incoming.map(l => `<div>← <strong>${l.sourceName}</strong></div>`).join('')
    : '<span style="color:#6b7284;">Sin conexiones</span>';
}

// Cerrar modal detail
document.getElementById('detailPanel').addEventListener('click', (e) => {
  if (e.target === document.getElementById('detailPanel')) {
    document.getElementById('detailPanel').style.display = 'none';
  }
});

window.addEventListener('load', () => {
  console.log('✓ Página cargada');
  loadGraph();
});

console.log('✓ Script listo');
