console.log('✓ Módulo 01 iniciando...');

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
  console.log('📂 Buscando archivos en localStorage...');
  
  try {
    // Leer archivos de Fuentes y Documentos desde localStorage
    const files = JSON.parse(localStorage.getItem('rapot_fuentes') || '[]');
    console.log('Archivos encontrados:', files.length);
    
    // Buscar archivo Excel
    const excelFile = files.find(f => 
      f.name.includes('Red_Conceptos') && (f.name.endsWith('.xlsx') || f.name.endsWith('.xls'))
    );
    
    if (!excelFile) {
      console.log('⚠ No hay Excel "Red_Conceptos_POT_Bogota.xlsx" en Fuentes');
      showMessage('Sube el Excel a Fuentes y Documentos primero');
      return;
    }

    console.log('✓ Archivo encontrado:', excelFile.name);
    
    // Convertir data a Uint8Array
    const array = new Uint8Array(excelFile.data);
    const workbook = XLSX.read(array, { type: 'array' });
    
    console.log('✓ Hojas en Excel:', workbook.SheetNames);
    
    const structData = {};
    ['EEP', 'EFC', 'ESECI', 'EIP'].forEach(s => structData[s] = { nodes: new Map(), links: [] });

    let totalLinks = 0;

    // Leer cada hoja
    for (const sheetName of ['EEP', 'EFC', 'ESECI', 'EIP']) {
      if (!workbook.SheetNames.includes(sheetName)) {
        console.log(`⚠ Hoja ${sheetName} no encontrada`);
        continue;
      }
      
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      
      console.log(`📄 ${sheetName}: ${rows.length} filas`);
      
      rows.forEach(row => {
        // Validar que tenga los campos principales
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

        totalLinks++;
      });
    }

    graphData.structures = structData;

    // Actualizar stats
    const totalNodes = Object.values(structData).reduce((sum, s) => sum + s.nodes.size, 0);
    document.getElementById('statConceptos').textContent = totalNodes;
    document.getElementById('statRelaciones').textContent = totalLinks;
    document.getElementById('statFuentes').textContent = 4;
    document.getElementById('statTipos').textContent = 4;

    console.log(`✓ Grafo construido: ${totalNodes} conceptos, ${totalLinks} relaciones`);
    
    renderOverview();

  } catch (error) {
    console.error('❌ Error:', error);
    showMessage('Error al leer el Excel. Verifica que esté en Fuentes y Documentos');
  }
}

function showMessage(msg) {
  document.getElementById('graphLoading').innerHTML = `
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p>${msg}</p>
  `;
}

function renderOverview() {
  console.log('📊 Renderizando OVERVIEW (4 estructuras)...');
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

  // Posicionar 4 estructuras en círculo
  const nodes = Object.values(structures).map((s, i) => ({
    id: s.id,
    ...s,
    x: width / 2 + Math.cos((i * Math.PI * 2) / 4) * 250,
    y: height / 2 + Math.sin((i * Math.PI * 2) / 4) * 250
  }));

  const nodeSel = container.append('g').selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => renderStructure(d.id));

  // Círculo grande con glow
  nodeSel.append('circle')
    .attr('r', 85)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', d => `${d.color}25`)
    .attr('stroke', d => d.color)
    .attr('stroke-width', 3)
    .attr('filter', d => `drop-shadow(0 0 30px ${d.color})`)
    .attr('opacity', 0.9);

  // Ícono
  nodeSel.append('text')
    .attr('x', 0)
    .attr('y', -30)
    .attr('text-anchor', 'middle')
    .attr('font-size', '32px')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .html(d => `<tspan class="fa-solid ${d.icon}"></tspan>`);

  // Nombre
  nodeSel.append('text')
    .attr('x', 0)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name);

  const sim = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-1000))
    .force('center', d3.forceCenter(width / 2, height / 2));

  sim.on('tick', () => {
    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

function renderStructure(structId) {
  console.log('📊 Renderizando estructura:', structId);
  currentView = 'structure';
  selectedStructure = structId;

  const struct = structures[structId];
  const structData = graphData.structures[structId];
  
  if (!structData || structData.nodes.size === 0) {
    showMessage(`No hay datos para ${struct.fullName}`);
    return;
  }

  const nodes = Array.from(structData.nodes.values());
  const links = structData.links;

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
    .attr('cx', 0)
    .attr('cy', 0)
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
  
  const structData = graphData.structures[selectedStructure];
  const outgoing = structData.links.filter(l => l.source === node.name);
  const incoming = structData.links.filter(l => l.target === node.name);

  document.getElementById('detailOut').innerHTML = outgoing.length > 0
    ? outgoing.map(l => `<div>→ <strong>${l.targetName}</strong></div>`).join('')
    : '<span style="color:#6b7284;">Sin conexiones</span>';

  document.getElementById('detailIn').innerHTML = incoming.length > 0
    ? incoming.map(l => `<div>← <strong>${l.sourceName}</strong></div>`).join('')
    : '<span style="color:#6b7284;">Sin conexiones</span>';
}

// Cerrar detail panel
document.addEventListener('DOMContentLoaded', () => {
  const detailPanel = document.getElementById('detailPanel');
  if (detailPanel) {
    detailPanel.addEventListener('click', (e) => {
      if (e.target === detailPanel) {
        detailPanel.style.display = 'none';
      }
    });
  }
});

window.addEventListener('load', () => {
  console.log('✓ Página cargada, leyendo datos...');
  loadGraph();
});

console.log('✓ Script listo');
