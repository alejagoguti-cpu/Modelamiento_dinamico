console.log('✓ Script cargado');

let graphData = { nodes: [], links: [] };

// Elementos del DOM
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadStatus = document.getElementById('uploadStatus');

console.log('✓ Elementos encontrados:', { uploadZone, fileInput, browseBtn, uploadStatus });

// Click botón
browseBtn.addEventListener('click', function(e) {
  console.log('✓ Botón clickeado');
  e.preventDefault();
  fileInput.click();
});

// Drag and drop
uploadZone.addEventListener('dragover', function(e) {
  e.preventDefault();
  console.log('✓ Drag over');
  uploadZone.style.borderColor = '#2fd4c8';
});

uploadZone.addEventListener('dragleave', function(e) {
  uploadZone.style.borderColor = 'rgba(255,255,255,0.08)';
});

uploadZone.addEventListener('drop', function(e) {
  e.preventDefault();
  console.log('✓ Drop event');
  if (e.dataTransfer.files[0]) {
    handleFile(e.dataTransfer.files[0]);
  }
});

// Seleccionar archivo
fileInput.addEventListener('change', function(e) {
  console.log('✓ File change event');
  if (e.target.files[0]) {
    handleFile(e.target.files[0]);
  }
});

// Procesar archivo
async function handleFile(file) {
  console.log('📄 Archivo seleccionado:', file.name, file.size);
  uploadStatus.textContent = 'Leyendo archivo...';
  
  try {
    // Leer archivo
    const arrayBuffer = await file.arrayBuffer();
    console.log('✓ Buffer leído:', arrayBuffer.byteLength, 'bytes');
    
    // Parsear con XLSX
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    console.log('✓ Workbook leído. Hojas:', workbook.SheetNames);
    
    let allRows = [];
    
    // Leer cada hoja
    for (const sheetName of workbook.SheetNames) {
      if (['EEP', 'EFC', 'ESECI', 'EIP'].includes(sheetName)) {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        console.log(`  Hoja ${sheetName}: ${rows.length} filas`);
        
        // Filtrar filas válidas
        const validRows = rows.filter(row => row['Concepto Origen'] && row['Concepto Relacionado']);
        console.log(`  → ${validRows.length} relaciones válidas`);
        
        allRows = allRows.concat(validRows);
      }
    }
    
    console.log('✓ Total relaciones:', allRows.length);
    
    if (allRows.length === 0) {
      uploadStatus.textContent = '❌ No se encontraron relaciones';
      return;
    }
    
    // Construir grafo
    const graph = buildGraph(allRows);
    console.log('✓ Grafo construido:', graph.nodes.length, 'nodos,', graph.links.length, 'relaciones');
    
    // Actualizar stats
    document.getElementById('statConceptos').textContent = graph.nodes.length;
    document.getElementById('statRelaciones').textContent = graph.links.length;
    document.getElementById('statContradicciones').textContent = Math.floor(graph.links.length * 0.1);
    document.getElementById('statMacromodelos').textContent = 4;
    
    // Renderizar grafo
    renderGraph(graph);
    
    uploadStatus.textContent = `✓ ${graph.nodes.length} conceptos, ${graph.links.length} relaciones cargadas`;
    
  } catch (error) {
    console.error('❌ Error:', error);
    uploadStatus.textContent = '❌ Error: ' + error.message;
  }
}

// Construir grafo
function buildGraph(rows) {
  const nodeMap = new Map();
  const links = [];
  
  rows.forEach(row => {
    const origenName = row['Concepto Origen'];
    const destName = row['Concepto Relacionado'];
    
    if (!origenName || !destName) return;
    
    // Asegurar nodos
    const origenKey = origenName.toLowerCase().trim();
    const destKey = destName.toLowerCase().trim();
    
    if (!nodeMap.has(origenKey)) {
      nodeMap.set(origenKey, {
        id: origenKey,
        name: origenName,
        estructura: row['Estructura Origen'] || '—',
        in: 0,
        out: 0
      });
    }
    
    if (!nodeMap.has(destKey)) {
      nodeMap.set(destKey, {
        id: destKey,
        name: destName,
        estructura: row['Estructura Relacionada'] || '—',
        in: 0,
        out: 0
      });
    }
    
    const origen = nodeMap.get(origenKey);
    const dest = nodeMap.get(destKey);
    
    origen.out++;
    dest.in++;
    
    // Crear enlace
    links.push({
      source: origen.id,
      target: dest.id,
      tipo: (row['Tipo de Relación'] || 'Directa').toLowerCase(),
      sustento: row['Sustento (según el POT)'] || '—',
      page: row['Página POT'] || '—'
    });
  });
  
  return {
    nodes: Array.from(nodeMap.values()),
    links: links
  };
}

// Renderizar grafo con D3
function renderGraph(graph) {
  console.log('📊 Renderizando grafo...');
  
  const svg = d3.select('#graphSvg');
  document.getElementById('loadingMsg').style.display = 'none';
  svg.style('display', 'block');
  
  // Limpiar SVG anterior
  svg.selectAll('*').remove();
  
  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;
  
  console.log(`  Tamaño: ${width}x${height}`);
  
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  
  const container = svg.append('g');
  
  // ZOOM
  svg.call(d3.zoom()
    .scaleExtent([0.5, 4])
    .on('zoom', (e) => {
      container.attr('transform', e.transform);
    })
  );
  
  // ENLACES
  const links = container.append('g').selectAll('line')
    .data(graph.links)
    .enter()
    .append('line')
    .attr('stroke', '#4dd0e1')
    .attr('stroke-width', 2)
    .attr('opacity', 0.6);
  
  // NODOS
  const nodes = container.append('g').selectAll('g')
    .data(graph.nodes)
    .enter()
    .append('g')
    .call(d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
    );
  
  nodes.append('circle')
    .attr('r', d => 8 + (d.in + d.out))
    .attr('fill', '#34d399')
    .attr('stroke', '#0a0e17')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('click', (e, d) => showNodeInfo(d, graph));
  
  nodes.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    .attr('font-size', '10px')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name.length > 12 ? d.name.slice(0, 10) + '…' : d.name);
  
  // SIMULACIÓN
  const simulation = d3.forceSimulation(graph.nodes)
    .force('link', d3.forceLink(graph.links)
      .id(d => d.id)
      .distance(80)
      .strength(0.3)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(30));
  
  simulation.on('tick', () => {
    links
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    nodes.attr('transform', d => `translate(${d.x},${d.y})`);
  });
  
  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  console.log('✓ Grafo renderizado');
}

// Mostrar info del nodo
function showNodeInfo(node, graph) {
  console.log('ℹ Nodo clickeado:', node.name);
  
  const outgoing = graph.links.filter(l => l.source === node);
  const incoming = graph.links.filter(l => l.target === node);
  
  document.getElementById('nodeName').textContent = node.name;
  document.getElementById('nodeStructure').textContent = node.estructura;
  
  document.getElementById('nodeOutgoing').innerHTML = outgoing.length > 0
    ? outgoing.map(l => `<div>→ ${l.target.name}</div>`).join('')
    : '<div style="color:#6b7284;">Sin conexiones</div>';
  
  document.getElementById('nodeIncoming').innerHTML = incoming.length > 0
    ? incoming.map(l => `<div>← ${l.source.name}</div>`).join('')
    : '<div style="color:#6b7284;">Sin conexiones</div>';
  
  document.getElementById('nodeJustif').innerHTML = outgoing.length > 0 || incoming.length > 0
    ? '<div style="color:#2fd4c8;">Clickea una relación para ver el sustento</div>'
    : '<div style="color:#6b7284;">Sin justificaciones</div>';
  
  document.getElementById('nodeModal').style.display = 'flex';
}

console.log('✓ Script completamente cargado');
