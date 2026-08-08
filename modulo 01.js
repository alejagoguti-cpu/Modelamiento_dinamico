// ============================================================
// RAPOT · Módulo 01 — Construir la Red (MEJORADO)
// Carga automática desde API o datos del sistema
// Muestra vista de 4 estructuras primero
// ============================================================

const STRUCT_COLORS = {
  eep: '#2fd4c8', efs: '#3b82f6', ese: '#f59e0b', eag: '#b06bf7', otras: '#6b7284'
};
const REL_TYPES = ['directa', 'indirecta', 'soporte', 'resiliencia', 'otra'];
const REL_COLORS = { directa:'#34d399', indirecta:'#3b82f6', soporte:'#ef9552', resiliencia:'#b06bf7', otra:'#6b7284' };

let graphData = { nodes: [], links: [] };
let currentView = 'estructuras'; // 'estructuras' | 'expandida'

// ============================================================
// FUNCIONES HELPER
// ============================================================

function norm(str){
  return (str || '').toString().trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function findCol(headers, candidates){
  const normed = headers.map(norm);
  for(const c of candidates){
    const idx = normed.indexOf(norm(c));
    if(idx !== -1) return headers[idx];
  }
  return null;
}

function structKey(estructura){
  const s = norm(estructura);
  if(s.startsWith('eep') || s.includes('ecolog')) return 'eep';
  if(s.startsWith('efs') || s.includes('funcional')) return 'efs';
  if(s.startsWith('ese') || s.includes('socioecon')) return 'ese';
  if(s.startsWith('eag') || s.includes('administrat')) return 'eag';
  return 'otras';
}

function relKey(tipo){
  const t = norm(tipo);
  if(t.includes('directa') && !t.includes('indirecta')) return 'directa';
  if(t.includes('indirecta')) return 'indirecta';
  if(t.includes('soporte')) return 'soporte';
  if(t.includes('resilien')) return 'resiliencia';
  return 'otra';
}

// ============================================================
// PARSEAR ARCHIVO
// ============================================================

function parseFile(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.onload = (e) => {
      try{
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        resolve(rows);
      }catch(err){ reject(err); }
    };
    reader.readAsArrayBuffer(file);
  });
}

// ============================================================
// CONSTRUIR GRAFO
// ============================================================

function buildGraph(rows){
  if(!rows.length) throw new Error('El archivo está vacío');

  const headers = Object.keys(rows[0]);
  const colConcepto   = findCol(headers, ['Concepto']);
  const colEstructura = findCol(headers, ['Estructura']);
  const colFuente      = findCol(headers, ['Fuente']);
  const colRelacionado = findCol(headers, ['Concepto relacionado', 'Concepto Relacionado']);
  const colTipo         = findCol(headers, ['Tipo de relación', 'Tipo de relacion', 'Tipo']);
  const colJustif        = findCol(headers, ['Justificación', 'Justificacion']);

  if(!colConcepto || !colRelacionado){
    throw new Error('No se encontraron las columnas "Concepto" y "Concepto relacionado".');
  }

  const nodeMap = new Map();
  const links = [];
  const fuentesSet = new Set();
  const tiposSet = new Set();

  function ensureNode(name, estructura){
    const key = norm(name);
    if(!key) return null;
    if(!nodeMap.has(key)){
      nodeMap.set(key, {
        id: key, name: name.toString().trim(),
        estructura: estructura || '', struct: structKey(estructura),
        fuentes: new Set(), outDeg: 0, inDeg: 0
      });
    } else if(estructura && !nodeMap.get(key).estructura){
      nodeMap.get(key).estructura = estructura;
      nodeMap.get(key).struct = structKey(estructura);
    }
    return nodeMap.get(key);
  }

  rows.forEach(row => {
    const conceptoName = row[colConcepto];
    const relacionadoName = row[colRelacionado];
    if(!conceptoName || !relacionadoName) return;

    const a = ensureNode(conceptoName, colEstructura ? row[colEstructura] : '');
    const b = ensureNode(relacionadoName, '');
    if(!a || !b || a.id === b.id) return;

    const tipo = colTipo ? row[colTipo] : 'Directa';
    const fuente = colFuente ? row[colFuente] : '';
    const justificacion = colJustif ? row[colJustif] : '';

    if(fuente){ fuentesSet.add(fuente.toString().trim()); a.fuentes.add(fuente.toString().trim()); }
    tiposSet.add(relKey(tipo));

    a.outDeg++; b.inDeg++;

    links.push({
      source: a.id, target: b.id,
      tipo: relKey(tipo), tipoLabel: (tipo || 'Directa').toString(),
      fuente: fuente || '', justificacion: justificacion || ''
    });
  });

  const nodes = Array.from(nodeMap.values());
  return { nodes, links, fuentesCount: fuentesSet.size, tiposCount: tiposSet.size };
}

// ============================================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================================

function updateStats(g){
  document.getElementById('statConceptos').textContent = g.nodes.length;
  document.getElementById('statConceptosSub').textContent = `${g.nodes.length} conceptos identificados`;
  document.getElementById('statRelaciones').textContent = g.links.length;
  document.getElementById('statRelacionesSub').textContent = `${g.links.length} relaciones cargadas`;
  document.getElementById('statFuentes').textContent = g.fuentesCount;
  document.getElementById('statFuentesSub').textContent = g.fuentesCount ? `${g.fuentesCount} fuentes distintas` : 'Sin columna de fuente';
  document.getElementById('statTipos').textContent = g.tiposCount;

  const structCounts = { eep:0, efs:0, ese:0, eag:0, otras:0 };
  g.nodes.forEach(n => structCounts[n.struct]++);
  document.getElementById('cnt-eep').textContent = structCounts.eep;
  document.getElementById('cnt-efs').textContent = structCounts.efs;
  document.getElementById('cnt-ese').textContent = structCounts.ese;
  document.getElementById('cnt-eag').textContent = structCounts.eag;
  document.getElementById('cnt-otras').textContent = structCounts.otras;

  // Densidad
  const n = g.nodes.length;
  const density = n > 1 ? (g.links.length / (n * (n - 1))) : 0;
  document.getElementById('densityVal').textContent = density.toFixed(2);
  const lbl = density > 0.3 ? 'Alta' : density > 0.1 ? 'Media' : 'Baja';
  document.getElementById('densityLbl').textContent = lbl;
  document.getElementById('densityDesc').textContent =
    density > 0.3 ? 'La red tiene una conectividad alta entre sus conceptos.' :
    density > 0.1 ? 'La red tiene una conectividad moderada.' :
    'La red tiene una conectividad baja; hay pocos vínculos entre conceptos.';

  // Donut
  const relCounts = { directa:0, indirecta:0, soporte:0, resiliencia:0, otra:0 };
  g.links.forEach(l => relCounts[l.tipo]++);
  drawDonut(relCounts, g.links.length);

  // Centralidad
  const maxDeg = Math.max(1, ...g.nodes.map(n => n.inDeg + n.outDeg));
  const ranked = [...g.nodes].sort((a,b) => (b.inDeg+b.outDeg) - (a.inDeg+a.outDeg)).slice(0, 6);
  const list = document.getElementById('centralityList');
  list.innerHTML = '';
  ranked.forEach(n => {
    const deg = n.inDeg + n.outDeg;
    const score = (deg / maxDeg);
    const row = document.createElement('div');
    row.className = 'centrality-item';
    row.innerHTML = `
      <span class="centrality-name" title="${n.name}">${n.name}</span>
      <div class="centrality-bar-track"><div class="centrality-bar-fill" style="width:${(score*100).toFixed(0)}%"></div></div>
      <span class="centrality-val">${score.toFixed(2)}</span>`;
    list.appendChild(row);
  });

  document.getElementById('aiTipText').textContent =
    `Consejo IA: revisa las ${g.links.filter(l=>l.tipo==='indirecta'||!l.justificacion).length} relaciones indirectas o sin justificación para fortalecer la coherencia de la red.`;

  document.getElementById('bottomRow').style.display = 'grid';
}

function drawDonut(counts, total){
  const svg = document.getElementById('donutSvg');
  const legend = document.getElementById('donutLegend');
  svg.innerHTML = '';
  legend.innerHTML = '';
  if(total === 0) return;

  const cx = 90, cy = 90, r = 65, stroke = 22;
  let angleStart = -90;
  const circumference = 2 * Math.PI * r;

  REL_TYPES.forEach(key => {
    const val = counts[key];
    if(!val) return;
    const frac = val / total;
    const dash = frac * circumference;
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', cx); circle.setAttribute('cy', cy); circle.setAttribute('r', r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', REL_COLORS[key]);
    circle.setAttribute('stroke-width', stroke);
    circle.setAttribute('stroke-dasharray', `${dash} ${circumference - dash}`);
    circle.setAttribute('transform', `rotate(${angleStart} ${cx} ${cy})`);
    svg.appendChild(circle);
    angleStart += frac * 360;

    const row = document.createElement('div');
    row.className = 'dl-row';
    row.innerHTML = `<span class="dl-dot" style="background:${REL_COLORS[key]}"></span>${key.charAt(0).toUpperCase()+key.slice(1)} <b>${val} (${Math.round(frac*100)}%)</b>`;
    legend.appendChild(row);
  });

  const label = document.createElementNS('http://www.w3.org/2000/svg','text');
  label.setAttribute('x', cx); label.setAttribute('y', cy - 4);
  label.setAttribute('text-anchor','middle');
  label.setAttribute('fill', '#eef0f6'); label.setAttribute('font-size','20'); label.setAttribute('font-weight','800');
  label.textContent = total;
  svg.appendChild(label);
  const label2 = document.createElementNS('http://www.w3.org/2000/svg','text');
  label2.setAttribute('x', cx); label2.setAttribute('y', cy + 14);
  label2.setAttribute('text-anchor','middle');
  label2.setAttribute('fill', '#6b7284'); label2.setAttribute('font-size','9');
  label2.textContent = 'Total';
  svg.appendChild(label2);
}

// ============================================================
// RENDER: VISTA DE 4 ESTRUCTURAS
// ============================================================

function renderEstructurasView(g){
  const area = document.getElementById('graphArea');
  const svgEl = d3.select('#graphSvg');
  svgEl.selectAll('*').remove();
  svgEl.style('display', 'block');
  document.getElementById('uploadZone').style.display = 'none';

  const width = area.clientWidth || 700;
  const height = area.clientHeight || 420;
  svgEl.attr('viewBox', `0 0 ${width} ${height}`);
  svgEl.attr('style', 'background: var(--panel-alt);');

  const container = svgEl.append('g');

  // Reset zoom
  svgEl.call(d3.zoom().transform, d3.zoomIdentity);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) * 0.35;

  // Posiciones de las 4 estructuras
  const positions = {
    'eep': { x: centerX, y: centerY - radius, label: 'Sistema Ambiental y de\nEstructura Ecológica\nPrincipal' },
    'efs': { x: centerX + radius, y: centerY, label: 'Estructura Funcional\ny del Cuidado' },
    'ese': { x: centerX, y: centerY + radius, label: 'Estructura\nSocioeconómica,\nCreativa y de\nInnovación' },
    'eag': { x: centerX - radius, y: centerY, label: 'Estructura\nAdministrativa\ny de Gestión' }
  };

  // Líneas conectoras con flechas
  container.append('defs').append('marker')
    .attr('id', 'arrowhead')
    .attr('markerWidth', 10)
    .attr('markerHeight', 10)
    .attr('refX', 9)
    .attr('refY', 3)
    .attr('orient', 'auto')
    .append('polygon')
    .attr('points', '0 0, 10 3, 0 6')
    .attr('fill', 'rgba(255,255,255,0.3)');

  const orden = ['eep', 'efs', 'ese', 'eag'];
  for(let i = 0; i < orden.length; i++){
    const current = orden[i];
    const next = orden[(i + 1) % orden.length];
    const from = positions[current];
    const to = positions[next];

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    const ratio = 55 / dist;

    const startX = from.x + dx * ratio;
    const startY = from.y + dy * ratio;
    const endX = to.x - dx * ratio;
    const endY = to.y - dy * ratio;

    container.append('line')
      .attr('x1', startX).attr('y1', startY)
      .attr('x2', endX).attr('y2', endY)
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('marker-end', 'url(#arrowhead)');
  }

  // Nodos (círculos grandes con glow)
  const structKeys = ['eep', 'efs', 'ese', 'eag'];
  structKeys.forEach(key => {
    const pos = positions[key];
    const count = g.nodes.filter(n => n.struct === key).length;
    const color = STRUCT_COLORS[key];

    // Glow filter
    const defs = container.append('defs');
    defs.append('filter').attr('id', `glow-${key}`)
      .html(`<feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>`);

    // Círculo exterior (glow)
    container.append('circle')
      .attr('cx', pos.x).attr('cy', pos.y).attr('r', 80)
      .attr('fill', color).attr('opacity', 0.1)
      .attr('filter', `url(#glow-${key})`);

    // Círculo principal
    container.append('circle')
      .attr('cx', pos.x).attr('cy', pos.y).attr('r', 70)
      .attr('fill', 'rgba(10,14,23,0.8)')
      .attr('stroke', color)
      .attr('stroke-width', 3)
      .attr('cursor', 'pointer')
      .on('click', () => showEstructuraExpandida(key, g))
      .on('mouseover', function(){ d3.select(this).attr('stroke-width', 4); })
      .on('mouseout', function(){ d3.select(this).attr('stroke-width', 3); });

    // Texto - Nombre
    container.append('text')
      .attr('x', pos.x).attr('y', pos.y - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .attr('pointer-events', 'none')
      .text(key.toUpperCase());

    // Texto - Cantidad
    container.append('text')
      .attr('x', pos.x).attr('y', pos.y + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', color)
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none')
      .text(`${count} conceptos`);
  });

  currentView = 'estructuras';
}

// ============================================================
// RENDER: VISTA EXPANDIDA (ESTRUCTURA SELECCIONADA)
// ============================================================

function showEstructuraExpandida(estructura, g){
  const area = document.getElementById('graphArea');
  const svgEl = d3.select('#graphSvg');
  svgEl.selectAll('*').remove();

  const width = area.clientWidth || 700;
  const height = area.clientHeight || 420;
  svgEl.attr('viewBox', `0 0 ${width} ${height}`);

  const container = svgEl.append('g');

  svgEl.call(d3.zoom().scaleExtent([0.4, 3]).on('zoom', (event) => {
    container.attr('transform', event.transform);
  }));

  const nodosEstructura = g.nodes.filter(n => n.struct === estructura);

  const linkSel = container.append('g').selectAll('path')
    .data(g.links.filter(l => {
      const from = g.nodes.find(n => n.id === l.source);
      return from && from.struct === estructura;
    }))
    .enter()
    .append('path')
    .attr('class', d => `glink ${d.tipo}`);

  const nodeSel = container.append('g').selectAll('g')
    .data(nodosEstructura)
    .enter()
    .append('g')
    .attr('class', 'gnode')
    .call(d3.drag()
      .on('start', (event, d) => { if(!event.active) sim.alphaTarget(0.2).restart(); d.fx=d.x; d.fy=d.y; })
      .on('drag', (event, d) => { d.fx=event.x; d.fy=event.y; })
      .on('end', (event, d) => { if(!event.active) sim.alphaTarget(0); d.fx=null; d.fy=null; }));

  nodeSel.append('circle')
    .attr('r', d => 10 + Math.min(14, (d.inDeg + d.outDeg)))
    .attr('fill', 'rgba(10,14,23,0.9)')
    .attr('stroke', d => STRUCT_COLORS[d.struct])
    .on('click', (event, d) => showDetail(d, g));

  nodeSel.append('text')
    .attr('dy', d => 10 + Math.min(14, (d.inDeg + d.outDeg)) + 12)
    .text(d => d.name.length > 16 ? d.name.slice(0,15)+'…' : d.name);

  const sim = d3.forceSimulation(nodosEstructura)
    .force('link', d3.forceLink(g.links.filter(l => {
      const from = g.nodes.find(n => n.id === l.source);
      return from && from.struct === estructura;
    })).id(d => d.id).distance(90).strength(0.5))
    .force('charge', d3.forceManyBody().strength(-220))
    .force('center', d3.forceCenter(width/2, height/2))
    .force('collide', d3.forceCollide().radius(34));

  sim.on('tick', () => {
    linkSel.attr('d', d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`);
    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  document.getElementById('resetZoom').onclick = () => {
    svgEl.transition().duration(400).call(d3.zoom().transform, d3.zoomIdentity);
  };

  currentView = 'expandida';
}

// ============================================================
// PANEL DE DETALLES
// ============================================================

function showDetail(node, g){
  const panel = document.getElementById('detailPanel');
  panel.style.display = 'block';
  document.getElementById('detailName').textContent = node.name;
  document.getElementById('detailTag').textContent = node.estructura ? `${node.struct.toUpperCase()} · ${node.estructura}` : node.struct.toUpperCase();
  document.getElementById('detailOut').textContent = node.outDeg;
  document.getElementById('detailIn').textContent = node.inDeg;
  document.getElementById('detailTotal').textContent = node.outDeg + node.inDeg;
  const icon = document.getElementById('detailIcon');
  icon.style.background = `${STRUCT_COLORS[node.struct]}22`;
  icon.style.color = STRUCT_COLORS[node.struct];

  const fuentesDiv = document.getElementById('detailFuentes');
  if(node.fuentes.size){
    fuentesDiv.innerHTML = Array.from(node.fuentes).map(f => `<div>• ${f}</div>`).join('');
  } else {
    fuentesDiv.textContent = 'Sin fuentes registradas para este concepto.';
  }
}

document.getElementById('closeDetail').addEventListener('click', () => {
  document.getElementById('detailPanel').style.display = 'none';
});

// ============================================================
// CARGAR DATOS AUTOMÁTICAMENTE DESDE FUENTES Y DOCUMENTOS
// ============================================================

async function loadAutomaticData(){
  try{
    // Buscar archivos en localStorage o indexedDB
    const savedData = localStorage.getItem('rapot_data_modulo01');
    if(savedData){
      const g = JSON.parse(savedData);
      if(g.nodes && g.links){
        // Reconstruir Set de fuentes
        g.nodes.forEach(n => { n.fuentes = new Set(n.fuentes || []); });
        graphData = g;
        updateStats(g);
        renderEstructurasView(g);
        document.getElementById('uploadZone').style.display = 'none';
        document.getElementById('graphSvg').style.display = 'block';
        return true;
      }
    }
  }catch(err){
    console.log('No hay datos guardados:', err);
  }
  return false;
}

// Cargar al iniciar página
window.addEventListener('load', async () => {
  const loaded = await loadAutomaticData();
  if(loaded){
    console.log('Datos cargados automáticamente desde Fuentes y Documentos');
  }
});

// ============================================================
// MANEJO DE UPLOAD (alternativa para cambiar archivo)
// ============================================================

const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadStatus = document.getElementById('uploadStatus');

uploadZone.addEventListener('click', () => fileInput.click());
document.getElementById('browseBtn').addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });

['dragover','dragenter'].forEach(evt => uploadZone.addEventListener(evt, (e) => {
  e.preventDefault(); uploadZone.classList.add('dragover');
}));
['dragleave','drop'].forEach(evt => uploadZone.addEventListener(evt, (e) => {
  e.preventDefault(); uploadZone.classList.remove('dragover');
}));
uploadZone.addEventListener('drop', (e) => {
  const file = e.dataTransfer.files[0];
  if(file) handleFile(file);
});
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if(file) handleFile(file);
});

async function handleFile(file){
  uploadStatus.textContent = 'Leyendo archivo...';
  try{
    const rows = await parseFile(file);
    const g = buildGraph(rows);
    if(!g.nodes.length){
      uploadStatus.textContent = 'No se encontraron conceptos válidos en el archivo.';
      return;
    }
    
    // GUARDAR EN LOCALSTORAGE para próximas cargas
    const dataToSave = {
      nodes: g.nodes.map(n => ({
        id: n.id, name: n.name, estructura: n.estructura, struct: n.struct,
        fuentes: Array.from(n.fuentes), outDeg: n.outDeg, inDeg: n.inDeg
      })),
      links: g.links,
      fuentesCount: g.fuentesCount,
      tiposCount: g.tiposCount
    };
    localStorage.setItem('rapot_data_modulo01', JSON.stringify(dataToSave));
    
    graphData = g;
    updateStats(g);
    renderEstructurasView(g);
    document.getElementById('uploadZone').style.display = 'none';
    document.getElementById('graphSvg').style.display = 'block';
    document.querySelectorAll('.step')[0].classList.remove('active');
    document.querySelectorAll('.step')[3].classList.add('active');
    uploadStatus.textContent = '';
  }catch(err){
    uploadStatus.textContent = 'Error: ' + err.message;
  }
}

// ============================================================
// DESCARGAR PLANTILLA
// ============================================================

document.getElementById('downloadTemplate').addEventListener('click', () => {
  const headers = ['Concepto','Estructura','Fuente','Fragmento documental','Concepto relacionado','Tipo de relación','Justificación'];
  const example = [
    ['Humedal La Conejera','EEP - Ecológica','POT Bogotá 2022-2035','El humedal regula el ciclo hídrico...','Gestión del agua','Directa','El humedal aporta directamente a la regulación hídrica.'],
    ['Humedal La Conejera','EEP - Ecológica','POT Bogotá 2022-2035','...','Biodiversidad','Directa','Sostiene especies nativas del territorio.'],
    ['Movilidad sostenible','EFS - Funcional','POT Bogotá 2022-2035','...','Espacio público','Indirecta','La movilidad activa depende de espacio público adecuado.']
  ];
  const ws = XLSX.utils.aoa_to_sheet([headers, ...example]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Plantilla');
  XLSX.writeFile(wb, 'plantilla_rapot.xlsx');
});

// ============================================================
// TABS (visual only)
// ============================================================

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

window.addEventListener('resize', () => {
  if(graphData.nodes.length){
    if(currentView === 'estructuras') renderEstructurasView(graphData);
  }
});
