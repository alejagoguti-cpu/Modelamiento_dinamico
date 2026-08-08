// ============================================================
// RAPOT · Módulo 01 — Ingeniería Inversa del POT
// Análisis crítico: contradicciones, macromodelos, estructura real
// ============================================================

const STRUCT_COLORS = {
  eep: '#34d399', efs: '#3b82f6', ese: '#ef9552', eag: '#b06bf7', otras: '#6b7284'
};
const REL_COLORS = {
  directa: '#34d399', indirecta: '#3b82f6', soporte: '#ef9552', 
  resiliencia: '#b06bf7', otra: '#6b7284'
};

let graphData = { nodes: [], links: [] };
let allRows = [];

// ============ HELPERS ============
function norm(str) {
  return (str || '').toString().trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function findCol(headers, candidates) {
  const normed = headers.map(norm);
  for (const c of candidates) {
    const idx = normed.indexOf(norm(c));
    if (idx !== -1) return headers[idx];
  }
  return null;
}

function structKey(estructura) {
  const s = norm(estructura);
  if (s.startsWith('eep') || s.includes('ecolog')) return 'eep';
  if (s.startsWith('efs') || s.includes('funcional')) return 'efs';
  if (s.startsWith('ese') || s.includes('socioecon')) return 'ese';
  if (s.startsWith('eag') || s.includes('administrat')) return 'eag';
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

// ============ PARSE FILE ============
function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

// ============ BUILD GRAPH ============
function buildGraph(rows) {
  if (!rows.length) throw new Error('El archivo está vacío');

  allRows = rows;
  const headers = Object.keys(rows[0]);

  const colConcepto = findCol(headers, ['Concepto']);
  const colEstructura = findCol(headers, ['Estructura']);
  const colRelacionado = findCol(headers, ['Concepto relacionado', 'Concepto Relacionado']);
  const colTipo = findCol(headers, ['Tipo de relación', 'Tipo de relacion', 'Tipo']);
  const colJustif = findCol(headers, ['Justificación', 'Justificacion']);
  const colDiscurso = findCol(headers, ['Discurso', 'Discurso Vs Realidad', 'Discurso vs Realidad']);

  if (!colConcepto || !colRelacionado) {
    throw new Error('Faltan columnas: "Concepto" y "Concepto relacionado"');
  }

  const nodeMap = new Map();
  const links = [];
  const fuentesSet = new Set();
  const macromodelsSet = new Set();
  let contradictions = 0;

  function ensureNode(name, estructura) {
    const key = norm(name);
    if (!key) return null;
    if (!nodeMap.has(key)) {
      nodeMap.set(key, {
        id: key,
        name: name.toString().trim(),
        estructura: estructura || '',
        struct: structKey(estructura),
        fuentes: new Set(),
        outDeg: 0,
        inDeg: 0,
        discursiveImportance: 'normal',
        isContradictory: false
      });
    }
    return nodeMap.get(key);
  }

  rows.forEach(row => {
    const conceptoName = row[colConcepto];
    const relacionadoName = row[colRelacionado];
    if (!conceptoName || !relacionadoName) return;

    const a = ensureNode(conceptoName, colEstructura ? row[colEstructura] : '');
    const b = ensureNode(relacionadoName, '');
    if (!a || !b || a.id === b.id) return;

    const tipo = colTipo ? row[colTipo] : 'Directa';
    const fuente = colFuente ? row[colFuente] : '';
    const justif = colJustif ? row[colJustif] : '';
    const discursoVsRealidad = colDiscurso ? row[colDiscurso] : '';

    if (fuente) {
      fuentesSet.add(fuente.toString().trim());
      a.fuentes.add(fuente.toString().trim());
    }

    // Detectar contradicciones
    if (discursoVsRealidad && (discursoVsRealidad.includes('contradict') || 
        discursoVsRealidad.includes('perifér') || 
        discursoVsRealidad.includes('hipocres'))) {
      a.isContradictory = true;
      contradictions++;
    }

    a.outDeg++;
    b.inDeg++;

    links.push({
      source: a.id,
      target: b.id,
      tipo: relKey(tipo),
      tipoLabel: tipo,
      fuente: fuente || '',
      justificacion: justif || '',
      discursoVsRealidad: discursoVsRealidad || '',
      sourceNode: a,
      targetNode: b
    });
  });

  const nodes = Array.from(nodeMap.values());
  
  // Detectar macromodelos basados en conexiones
  nodes.forEach(node => {
    const connectedLinks = links.filter(l => l.source === node.id || l.target === node.id);
    connectedLinks.forEach(link => {
      if (link.justificacion.includes('económic') || link.fuente.includes('económic')) macromodelsSet.add('Economicismo');
      if (link.justificacion.includes('ambiental') || link.fuente.includes('ecológic')) macromodelsSet.add('Ambientalismo');
      if (link.justificacion.includes('mercado') || link.justificacion.includes('privado')) macromodelsSet.add('Neoliberalismo');
      if (link.justificacion.includes('social') || link.justificacion.includes('comunidad')) macromodelsSet.add('Comunitarismo');
    });
  });

  return {
    nodes,
    links,
    fuentesCount: fuentesSet.size,
    macromodels: Array.from(macromodelsSet),
    contradictions
  };
}

// ============ UPDATE STATS ============
function updateStats(g) {
  document.getElementById('statConceptos').textContent = g.nodes.length;
  document.getElementById('statConceptosSub').textContent = `${g.nodes.length} nodos identificados`;
  document.getElementById('statRelaciones').textContent = g.links.length;
  document.getElementById('statRelacionesSub').textContent = `${g.links.length} conexiones`;
  document.getElementById('statContradicciones').textContent = g.contradictions;
  document.getElementById('statMacromodelos').textContent = g.macromodels.length;
}

// ============ RENDER GRAPH ============
function renderGraph(g) {
  const area = document.getElementById('graphArea');
  const loadingMsg = document.getElementById('loadingMsg');
  const svgEl = d3.select('#graphSvg');

  svgEl.selectAll('*').remove();
  svgEl.style('display', 'block');
  loadingMsg.style.display = 'none';

  const width = area.clientWidth || 900;
  const height = area.clientHeight || 450;
  svgEl.attr('viewBox', `0 0 ${width} ${height}`);

  const container = svgEl.append('g');

  // ZOOM
  svgEl.call(d3.zoom().scaleExtent([0.5, 3]).on('zoom', (event) => {
    container.attr('transform', event.transform);
  }));

  // LINKS
  const linkSel = container.append('g').selectAll('path')
    .data(g.links).enter().append('path')
    .attr('class', d => `glink ${d.tipo}`)
    .attr('stroke-dasharray', d => {
      if (d.tipo === 'indirecta') return '5,5';
      if (d.tipo === 'otra') return '2,2';
      return 'none';
    })
    .on('click', (event, d) => showRelationModal(d));

  // NODES
  const nodeSel = container.append('g').selectAll('g')
    .data(g.nodes).enter().append('g')
    .attr('class', 'gnode')
    .call(d3.drag()
      .on('start', (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

  nodeSel.append('circle')
    .attr('r', d => 12 + Math.min(16, (d.inDeg + d.outDeg) * 1.5))
    .attr('fill', 'rgba(10,14,23,0.95)')
    .attr('stroke', d => STRUCT_COLORS[d.struct])
    .attr('stroke-width', d => d.isContradictory ? 3 : 2.5);

  nodeSel.append('text')
    .attr('dy', d => 12 + Math.min(16, (d.inDeg + d.outDeg) * 1.5) + 14)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .text(d => d.name.length > 18 ? d.name.slice(0, 15) + '…' : d.name);

  nodeSel.on('click', (event, d) => showNodeDetail(d, g));

  // SIMULATION
  const sim = d3.forceSimulation(g.nodes)
    .force('link', d3.forceLink(g.links).id(d => d.id).distance(120).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(40));

  sim.on('tick', () => {
    linkSel.attr('d', d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`);
    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

// ============ SHOW NODE DETAIL ============
function showNodeDetail(node, graph) {
  const detail = document.getElementById('nodeDetail');
  const outgoing = graph.links.filter(l => l.source.id === node.id);
  const incoming = graph.links.filter(l => l.target.id === node.id);

  document.getElementById('detailName').textContent = node.name;
  document.getElementById('detailStructure').textContent = node.estructura || 'No clasificada';

  // Discrepancia
  const centralidad = (node.inDeg + node.outDeg) / graph.nodes.length;
  const discrepancyEl = document.getElementById('detailDiscrepancy');
  if (centralidad < 0.1 && node.isContradictory) {
    discrepancyEl.className = 'discrepancy-badge high-discrepancy';
    discrepancyEl.textContent = '⚠ Periférica pero importante en discurso';
  } else if (centralidad > 0.3) {
    discrepancyEl.className = 'discrepancy-badge low-discrepancy';
    discrepancyEl.textContent = '✓ Central en estructura';
  } else {
    discrepancyEl.textContent = 'Normal';
  }

  // Conexiones salientes
  document.getElementById('detailOutgoing').innerHTML = outgoing.length
    ? outgoing.map(l => `<div class="connection-item">→ ${l.targetNode.name} <strong style="color:#34d399;">[${l.tipo}]</strong></div>`).join('')
    : '<div style="color:var(--text-faint);">Sin conexiones salientes</div>';

  // Conexiones entrantes
  document.getElementById('detailIncoming').innerHTML = incoming.length
    ? incoming.map(l => `<div class="connection-item">← ${l.sourceNode.name} <strong style="color:#3b82f6;">[${l.tipo}]</strong></div>`).join('')
    : '<div style="color:var(--text-faint);">Sin conexiones entrantes</div>';

  // Justificaciones
  const allJustifs = [...outgoing, ...incoming].filter(l => l.justificacion);
  document.getElementById('detailJustification').innerHTML = allJustifs.length
    ? allJustifs.map(l => `<div style="margin-bottom:8px;padding:6px;background:rgba(255,255,255,0.02);border-left:2px solid var(--teal);border-radius:4px;font-size:11px;">"${l.justificacion.substring(0, 80)}..."</div>`).join('')
    : '<div style="color:var(--text-faint);">Sin justificaciones disponibles</div>';

  detail.style.display = 'block';
}

// ============ SHOW RELATION MODAL ============
function showRelationModal(link) {
  const modal = document.getElementById('relationModal');
  const source = link.sourceNode || link.source;
  const target = link.targetNode || link.target;

  document.getElementById('relationFrom').textContent = (source.name || source);
  document.getElementById('relationTo').textContent = (target.name || target);
  document.getElementById('relationTypeBadge').textContent = link.tipo.toUpperCase();
  document.getElementById('relationJustification').textContent = link.justificacion || 'Sin justificación especificada';
  document.getElementById('relationNatureType').textContent = link.tipoLabel;
  document.getElementById('relationDirection').textContent = 'Unidireccional →';
  document.getElementById('relationIntensity').textContent = link.justificacion ? 'Alta' : 'Media';

  // Detectar si contradice
  const contradicts = link.discursoVsRealidad || '';
  document.getElementById('relationContradicts').innerHTML = contradicts
    ? `<strong style="color:var(--pink);">⚠ SÍ CONTRADICE:</strong> ${contradicts}`
    : '<strong style="color:var(--green);">✓ Coherente con discurso</strong>';

  modal.style.display = 'flex';
}

// ============ CLOSE HANDLERS ============
document.getElementById('closeDetail').addEventListener('click', () => {
  document.getElementById('nodeDetail').style.display = 'none';
});

document.getElementById('closeRelation').addEventListener('click', () => {
  document.getElementById('relationModal').style.display = 'none';
});

document.getElementById('relationModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('relationModal')) {
    document.getElementById('relationModal').style.display = 'none';
  }
});

// ============ FILE UPLOAD ============
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadStatus = document.getElementById('uploadStatus');

uploadZone.addEventListener('click', () => fileInput.click());
document.getElementById('browseBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  fileInput.click();
});

['dragover', 'dragenter'].forEach(evt => uploadZone.addEventListener(evt, (e) => {
  e.preventDefault();
  uploadZone.style.borderColor = 'var(--teal)';
}));

['dragleave', 'drop'].forEach(evt => uploadZone.addEventListener(evt, (e) => {
  e.preventDefault();
  uploadZone.style.borderColor = 'var(--border)';
}));

uploadZone.addEventListener('drop', (e) => {
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) handleFile(file);
});

async function handleFile(file) {
  uploadStatus.textContent = 'Leyendo archivo...';
  try {
    const rows = await parseFile(file);
    const g = buildGraph(rows);

    if (!g.nodes.length) {
      uploadStatus.textContent = 'No se encontraron nodos válidos';
      return;
    }

    graphData = g;
    updateStats(g);
    renderGraph(g);
    uploadStatus.textContent = `✓ ${g.nodes.length} conceptos, ${g.links.length} relaciones`;

    // Mostrar hallazgos
    if (g.contradictions > 0) {
      const contradictionsEl = document.getElementById('contradictionsSummary');
      const listEl = document.getElementById('contradictionsList');
      const contradictoryNodes = g.nodes.filter(n => n.isContradictory);
      listEl.innerHTML = contradictoryNodes.map(n =>
        `<div class="finding-item"><strong>${n.name}</strong><br><span style="font-size:10px;color:var(--text-faint);">Periférica en estructura pero importante en discurso</span></div>`
      ).join('');
      contradictionsEl.style.display = 'block';
    }

    if (g.macromodels.length > 0) {
      const macroEl = document.getElementById('macromodelsSummary');
      const listEl = document.getElementById('macromodelsList');
      listEl.innerHTML = g.macromodels.map(m =>
        `<div class="finding-item">📊 <strong>${m}</strong></div>`
      ).join('');
      macroEl.style.display = 'block';
    }

  } catch (err) {
    uploadStatus.textContent = '❌ Error: ' + err.message;
  }
}

// Window resize
window.addEventListener('resize', () => {
  if (graphData.nodes.length) renderGraph(graphData);
});
