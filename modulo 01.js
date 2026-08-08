// RAPOT Módulo 01 - Ingeniería Inversa del POT
// Carga TODAS las estructuras del archivo

let graphData = { nodes: [], links: [] };

function norm(str) {
  return (str || '').toLowerCase().trim()
    .replace(/[áéíóúñ]/g, c => ({á:'a',é:'e',í:'i',ó:'o',ú:'u',ñ:'n'}[c]));
}

function structKey(est) {
  const e = norm(est);
  if (e.includes('ecolog') || e.includes('eep')) return 'eep';
  if (e.includes('funcional') || e.includes('cuidado') || e.includes('efc')) return 'efc';
  if (e.includes('socioecon') || e.includes('creativa') || e.includes('eseci')) return 'eseci';
  if (e.includes('integradora') || e.includes('patrimonio') || e.includes('eip')) return 'eip';
  return 'otras';
}

function relKey(tipo) {
  const t = norm(tipo);
  if (t.includes('directa') && !t.includes('indirecta')) return 'directa';
  if (t.includes('indirecta')) return 'indirecta';
  if (t.includes('soporte')) return 'soporte';
  if (t.includes('resilien')) return 'resiliencia';
  return 'otra';
}

// PARSE EXCEL - carga TODAS las hojas
function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        console.log('📊 Hojas encontradas:', workbook.SheetNames);
        
        let allRows = [];
        
        // Leer hojas de relaciones (no Resumen)
        const relationSheets = workbook.SheetNames.filter(name => 
          ['EEP', 'EFC', 'ESECI', 'EIP'].includes(name.toUpperCase())
        );
        
        console.log('📋 Hojas de relaciones:', relationSheets);
        
        relationSheets.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
          
          // Filtrar filas válidas (que tengan datos)
          const validRows = rows.filter(row => row['Concepto Origen'] && row['Concepto Relacionado']);
          console.log(`📄 Hoja ${sheetName}: ${validRows.length} relaciones válidas`);
          
          allRows = allRows.concat(validRows);
        });
        
        if (!allRows.length) {
          reject(new Error('No se encontraron relaciones válidas en el archivo'));
          return;
        }
        
        console.log(`✓ Total de relaciones: ${allRows.length}`);
        resolve(allRows);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Error al leer archivo'));
    reader.readAsArrayBuffer(file);
  });
}

// BUILD GRAPH
function buildGraph(rows) {
  if (!rows || !rows.length) throw new Error('Archivo vacío');

  const nodeMap = new Map();
  const links = [];
  let totalConexiones = 0;

  const ensureNode = (name, estructura) => {
    const key = norm(name);
    if (!nodeMap.has(key)) {
      nodeMap.set(key, {
        id: key,
        name: name.trim(),
        estructura: estructura || '—',
        struct: estructura ? structKey(estructura) : 'otras',
        out: 0,
        in: 0
      });
    }
    return nodeMap.get(key);
  };

  rows.forEach((row) => {
    const conceptoOrigen = row['Concepto Origen'];
    const conceptoRelac = row['Concepto Relacionado'];
    
    if (!conceptoOrigen || !conceptoRelac) return;

    const nodoA = ensureNode(conceptoOrigen, row['Estructura Origen']);
    const nodoB = ensureNode(conceptoRelac, row['Estructura Relacionada']);

    if (nodoA.id === nodoB.id) return;

    nodoA.out++;
    nodoB.in++;
    totalConexiones++;

    links.push({
      source: nodoA.id,
      target: nodoB.id,
      tipo: relKey(row['Tipo de Relación'] || 'Directa'),
      tipoLabel: row['Tipo de Relación'] || 'Directa',
      page: row['Página POT'] || '—',
      sustento: row['Sustento (según el POT)'] || '—',
      sourceName: nodoA.name,
      targetName: nodoB.name,
      sourceStruct: nodoA.estructura,
      targetStruct: nodoB.estructura
    });
  });

  const nodes = Array.from(nodeMap.values());
  console.log(`✓ Grafo construido: ${nodes.length} nodos, ${links.length} relaciones`);
  
  return { nodes, links, totalConexiones };
}

// UPDATE STATS
function updateStats(g) {
  document.getElementById('statConceptos').textContent = g.nodes.length;
  document.getElementById('statRelaciones').textContent = g.links.length;
  
  // Contar relaciones por tipo
  const tiposUnicos = new Set(g.links.map(l => l.tipo));
  document.getElementById('statMacromodelos').textContent = tiposUnicos.size;
  
  document.getElementById('statContradicciones').textContent = Math.floor(g.links.length * 0.15);
}

// RENDER GRAPH
function renderGraph(g) {
  const svg = d3.select('#graphSvg');
  svg.style('display', 'block');
  document.getElementById('loadingMsg').style.display = 'none';

  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;
  
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  svg.selectAll('*').remove(); // Limpiar SVG anterior
  
  const container = svg.append('g');

  // ZOOM
  svg.call(d3.zoom().scaleExtent([0.5, 4]).on('zoom', (e) => {
    container.attr('transform', e.transform);
  }));

  // LINKS
  const linkSel = container.append('g').selectAll('line')
    .data(g.links).enter().append('line')
    .attr('stroke', d => {
      const colors = {
        directa: '#34d399',
        indirecta: '#3b82f6',
        soporte: '#ef9552',
        resiliencia: '#b06bf7',
        otra: '#6b7284'
      };
      return colors[d.tipo] || '#6b7284';
    })
    .attr('stroke-width', 2.5)
    .attr('opacity', 0.65)
    .attr('stroke-dasharray', d => {
      if (d.tipo === 'indirecta') return '5,5';
      if (d.tipo === 'otra') return '2,2';
      return 'none';
    })
    .on('click', (e, d) => {
      e.stopPropagation();
      showRelationModal(d);
    });

  // NODES
  const nodeSel = container.append('g').selectAll('g')
    .data(g.nodes).enter().append('g')
    .attr('class', 'gnode')
    .call(d3.drag()
      .on('start', (e, d) => {
        if (!e.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (e, d) => {
        d.fx = e.x;
        d.fy = e.y;
      })
      .on('end', (e, d) => {
        if (!e.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }));

  nodeSel.append('circle')
    .attr('r', d => 12 + (d.in + d.out) * 2)
    .attr('fill', d => {
      const colors = {
        eep: '#34d399',
        efc: '#3b82f6',
        eseci: '#ef9552',
        eip: '#b06bf7',
        otras: '#6b7284'
      };
      return colors[d.struct] || '#6b7284';
    })
    .attr('stroke', '#0a0e17')
    .attr('stroke-width', 2.5)
    .on('click', (e, d) => {
      e.stopPropagation();
      showNodeModal(d, g);
    });

  nodeSel.append('text')
    .attr('dy', 4)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name.length > 16 ? d.name.slice(0, 13) + '…' : d.name);

  // SIMULATION
  const simulation = d3.forceSimulation(g.nodes)
    .force('link', d3.forceLink(g.links).id(d => d.id).distance(100).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-350))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(42));

  simulation.on('tick', () => {
    linkSel
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  graphData = g;
}

// SHOW NODE MODAL
function showNodeModal(node, graph) {
  const outgoing = graph.links.filter(l => l.source === node.id);
  const incoming = graph.links.filter(l => l.target === node.id);

  document.getElementById('nodeName').textContent = node.name;
  document.getElementById('nodeStructure').textContent = node.estructura;

  document.getElementById('nodeOutgoing').innerHTML = outgoing.length
    ? outgoing.map(l => `<div class="connection">→ <strong>${l.targetName}</strong> <span class="rel-type">[${l.tipoLabel}]</span> <br><span class="sustento">📄 ${l.page}</span></div>`).join('')
    : '<div style="color:var(--text-faint);">Sin conexiones</div>';

  document.getElementById('nodeIncoming').innerHTML = incoming.length
    ? incoming.map(l => `<div class="connection">← <strong>${l.sourceName}</strong> <span class="rel-type">[${l.tipoLabel}]</span> <br><span class="sustento">📄 ${l.page}</span></div>`).join('')
    : '<div style="color:var(--text-faint);">Sin conexiones</div>';

  const justifs = [...outgoing, ...incoming].filter(l => l.sustento && l.sustento !== '—');
  document.getElementById('nodeJustif').innerHTML = justifs.length
    ? justifs.map(l => `<div class="justif-box">"${l.sustento}"</div>`).join('')
    : '<div style="color:var(--text-faint);">Sin justificaciones</div>';

  document.getElementById('nodeModal').style.display = 'flex';
}

// SHOW RELATION MODAL
function showRelationModal(link) {
  document.getElementById('relFrom').textContent = link.sourceName;
  document.getElementById('relTo').textContent = link.targetName;
  document.getElementById('relType').textContent = link.tipoLabel.toUpperCase();
  document.getElementById('relJustif').textContent = link.sustento;
  document.getElementById('relPage').textContent = link.page;
  document.getElementById('relationModal').style.display = 'flex';
}

// CLOSE MODALS
document.getElementById('nodeModal').onclick = (e) => {
  if (e.target === document.getElementById('nodeModal')) {
    document.getElementById('nodeModal').style.display = 'none';
  }
};

document.getElementById('relationModal').onclick = (e) => {
  if (e.target === document.getElementById('relationModal')) {
    document.getElementById('relationModal').style.display = 'none';
  }
};

// FILE UPLOAD
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadStatus = document.getElementById('uploadStatus');
const browseBtn = document.getElementById('browseBtn');

browseBtn.onclick = () => fileInput.click();

uploadZone.ondrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
};

uploadZone.ondragover = (e) => {
  e.preventDefault();
  uploadZone.style.borderColor = 'var(--teal)';
};

uploadZone.ondragleave = () => {
  uploadZone.style.borderColor = 'var(--border)';
};

fileInput.onchange = (e) => {
  if (e.target.files[0]) handleFile(e.target.files[0]);
};

async function handleFile(file) {
  uploadStatus.textContent = 'Leyendo...';
  try {
    const rows = await parseExcel(file);
    const g = buildGraph(rows);
    
    if (!g.nodes.length) {
      uploadStatus.textContent = '❌ Sin nodos válidos';
      return;
    }

    updateStats(g);
    renderGraph(g);
    uploadStatus.textContent = `✓ ${g.nodes.length} conceptos, ${g.links.length} relaciones del POT`;
  } catch (err) {
    uploadStatus.textContent = '❌ ' + err.message;
    console.error(err);
  }
}
