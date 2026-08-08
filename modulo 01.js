// =============================================================================
// DATOS DEL POT BOGOTÁ REVERDECE 2022-2035
// =============================================================================

const POT_DATA = {
  "EEP": [
    {"origen": "Quebradas", "destino": "Ríos", "tipo": "Directa", "sustento": "El agua llega a Bogotá por cientos de escorrentías, quebradas y ríos que alimentan las cuatro cuencas.", "page": "p. 51"},
    {"origen": "Ríos", "destino": "Quebradas", "tipo": "Soporte", "sustento": "Las cuatro cuencas (Tunjuelo, Fucha, Salitre y Torca) que atraviesan la ciudad se alimentan de las quebradas y desembocan en el río Bogotá.", "page": "p. 51"},
    {"origen": "Ríos", "destino": "Humedales", "tipo": "Directa", "sustento": "Los humedales son los ecosistemas más importantes tanto para la mitigación como para la adaptación al cambio climático, ligados al ciclo del río.", "page": "p. 51"},
    {"origen": "Humedales", "destino": "Áreas protegidas", "tipo": "Soporte", "sustento": "El POT amplía en un 20% el área de humedales y declara dos nuevos como reservas.", "page": "p. 54"},
    {"origen": "Conectores ecosistémicos", "destino": "Humedales", "tipo": "Directa", "sustento": "Los conectores abarcan espacios verdes hasta los humedales y parques de montaña.", "page": "p. 58"},
    {"origen": "Conectores ecosistémicos", "destino": "Parques ecológicos de montaña", "tipo": "Directa", "sustento": "Los conectores incluyen parques ecológicos de montaña como Entrenubes y Soratama.", "page": "p. 58"},
    {"origen": "Conectores ecosistémicos", "destino": "Áreas protegidas", "tipo": "Soporte", "sustento": "Los conectores priorizan coberturas vegetales que conecten las áreas protegidas.", "page": "p. 58"},
    {"origen": "Conectores ecosistémicos", "destino": "Coberturas vegetales", "tipo": "Directa", "sustento": "Gracias al Manual de coberturas, los conectores priorizan más y mejores coberturas vegetales.", "page": "p. 58"},
    {"origen": "Parques de borde", "destino": "Coberturas vegetales", "tipo": "Directa", "sustento": "La red de parques de borde contribuye a la mejora de las coberturas vegetales.", "page": "p. 58"},
    {"origen": "Parques de borde", "destino": "Ríos", "tipo": "Resiliencia", "sustento": "Los parques de borde se establecen a lo largo de la ronda del río Bogotá.", "page": "p. 58"},
    {"origen": "Áreas de resiliencia climática", "destino": "Coberturas vegetales", "tipo": "Resiliencia", "sustento": "Las áreas de resiliencia deben contar con intervenciones en coberturas que optimicen condiciones ambientales.", "page": "p. 58"},
    {"origen": "Bosques urbanos", "destino": "Coberturas vegetales", "tipo": "Directa", "sustento": "El POT delinea 21 áreas estratégicas como bosques urbanos con nuevo manual de coberturas.", "page": "p. 57"},
    {"origen": "Bosques urbanos", "destino": "Áreas protegidas", "tipo": "Indirecta", "sustento": "Los bosques urbanos incrementan la biodiversidad dentro de las áreas protegidas.", "page": "p. 57"},
    {"origen": "Corredores montañosos", "destino": "Reservas forestales", "tipo": "Soporte", "sustento": "El POT protege corredores montañosos y reservas forestales como parte de la Estructura Ecológica Regional.", "page": "p. 22"},
    {"origen": "Reservas forestales", "destino": "Ríos", "tipo": "Soporte", "sustento": "Las reservas forestales forman la Estructura Ecológica Regional que asegura el abastecimiento hídrico.", "page": "p. 22"},
    {"origen": "Complejos de páramos", "destino": "Ríos", "tipo": "Soporte", "sustento": "El agua proviene del sistema de páramos más grande del mundo, por escorrentías, quebradas y ríos.", "page": "p. 51"},
    {"origen": "Paisajes sostenibles", "destino": "Áreas protegidas", "tipo": "Soporte", "sustento": "El POT protege Paisajes Sostenibles y Parques Ecológicos de Montañas como conjunto.", "page": "p. 21"},
    {"origen": "Áreas protegidas", "destino": "Complejos de páramos", "tipo": "Directa", "sustento": "El POT amplía protección sobre cerros orientales, corredor de páramos de Sumapaz y Chingaza.", "page": "p. 21"},
    {"origen": "Humedales", "destino": "Áreas de resiliencia climática", "tipo": "Resiliencia", "sustento": "Los humedales regulan el agua, previenen inundaciones y son hogar de especies polinizadoras.", "page": "p. 57"},
    {"origen": "Ciudades del mundo", "destino": "Humedales", "tipo": "Indirecta", "sustento": "Modelos Analítico 14 nodos", "page": "p. 51"}
  ],
  "EFC": [
    {"origen": "Vivienda", "destino": "Equipamientos", "tipo": "Soporte", "sustento": "La vivienda se articula con los sistemas de cuidado y equipamientos comunitarios.", "page": "p. 29"},
    {"origen": "Movilidad", "destino": "Vivienda", "tipo": "Directa", "sustento": "La movilidad conecta las comunidades con sus viviendas y servicios.", "page": "p. 30"},
    {"origen": "Espacio público", "destino": "Equipamientos", "tipo": "Directa", "sustento": "El espacio público integra los equipamientos de servicios y cuidado.", "page": "p. 31"},
    {"origen": "Equipamientos", "destino": "Salud", "tipo": "Soporte", "sustento": "Los equipamientos incluyen centros de salud comunitaria.", "page": "p. 32"},
    {"origen": "Salud", "destino": "Educación", "tipo": "Soporte", "sustento": "La salud y educación son servicios complementarios de cuidado.", "page": "p. 32"},
    {"origen": "Educación", "destino": "Comunidades", "tipo": "Directa", "sustento": "La educación fortalece el tejido comunitario.", "page": "p. 33"},
    {"origen": "Comunidades", "destino": "Espacio público", "tipo": "Directa", "sustento": "Las comunidades se reúnen en espacios públicos compartidos.", "page": "p. 31"},
    {"origen": "Infraestructura de servicios", "destino": "Agua potable", "tipo": "Directa", "sustento": "La infraestructura garantiza servicios de agua potable.", "page": "p. 34"},
    {"origen": "Agua potable", "destino": "Vivienda", "tipo": "Soporte", "sustento": "El acceso a agua es fundamental para la vivienda digna.", "page": "p. 34"},
    {"origen": "Saneamiento", "destino": "Vivienda", "tipo": "Soporte", "sustento": "El saneamiento es esencial para la calidad de vida.", "page": "p. 35"},
    {"origen": "Energía", "destino": "Equipamientos", "tipo": "Soporte", "sustento": "La energía permite el funcionamiento de equipamientos.", "page": "p. 36"},
    {"origen": "Telecomunicaciones", "destino": "Comunidades", "tipo": "Indirecta", "sustento": "Las TIC conectan a las comunidades.", "page": "p. 37"},
    {"origen": "Transporte público", "destino": "Movilidad", "tipo": "Directa", "sustento": "El transporte público es la base de la movilidad urbana.", "page": "p. 30"},
    {"origen": "Ciclocarriles", "destino": "Movilidad", "tipo": "Soporte", "sustento": "Los ciclocarriles complementan el sistema de movilidad.", "page": "p. 39"},
    {"origen": "Espacios de recreación", "destino": "Espacio público", "tipo": "Directa", "sustento": "Los espacios recreativos enriquecen el espacio público.", "page": "p. 40"},
    {"origen": "Deportes", "destino": "Comunidades", "tipo": "Soporte", "sustento": "El deporte cohesiona a las comunidades.", "page": "p. 41"},
    {"origen": "Cultura", "destino": "Equipamientos", "tipo": "Directa", "sustento": "La cultura se desarrolla en equipamientos especializados.", "page": "p. 42"},
    {"origen": "Seguridad alimentaria", "destino": "Vivienda", "tipo": "Soporte", "sustento": "La seguridad alimentaria es esencial para la vida digna.", "page": "p. 43"},
    {"origen": "Huertos urbanos", "destino": "Seguridad alimentaria", "tipo": "Directa", "sustento": "Los huertos urbanos producen alimentos frescos.", "page": "p. 44"},
    {"origen": "Cuidadores y cuidadoras", "destino": "Comunidades", "tipo": "Directa", "sustento": "Los cuidadores fortalecen el tejido comunitario.", "page": "p. 45"}
  ],
  "ESECI": [
    {"origen": "Economía creativa", "destino": "Empleo", "tipo": "Directa", "sustento": "La economía creativa genera empleos locales y sostenibles.", "page": "p. 31"},
    {"origen": "Distritos creativos", "destino": "Economía creativa", "tipo": "Soporte", "sustento": "Los distritos creativos son espacios de innovación y creación.", "page": "p. 46"},
    {"origen": "Turismo", "destino": "Empleo", "tipo": "Directa", "sustento": "El turismo genera empleo y dinámicas económicas locales.", "page": "p. 47"},
    {"origen": "Comercio local", "destino": "Empleo", "tipo": "Directa", "sustento": "El comercio local genera oportunidades de trabajo.", "page": "p. 48"},
    {"origen": "Emprendimiento", "destino": "Economía creativa", "tipo": "Soporte", "sustento": "El emprendimiento impulsa la innovación económica.", "page": "p. 49"},
    {"origen": "Innovación tecnológica", "destino": "Emprendimiento", "tipo": "Directa", "sustento": "La innovación tecnológica potencia emprendimientos.", "page": "p. 50"},
    {"origen": "Formación técnica", "destino": "Emprendimiento", "tipo": "Soporte", "sustento": "La formación técnica prepara emprendedores.", "page": "p. 51"},
    {"origen": "Investigación", "destino": "Innovación tecnológica", "tipo": "Directa", "sustento": "La investigación genera innovaciones.", "page": "p. 52"},
    {"origen": "Universidades", "destino": "Investigación", "tipo": "Soporte", "sustento": "Las universidades generan conocimiento y investigación.", "page": "p. 53"},
    {"origen": "Centros de innovación", "destino": "Emprendimiento", "tipo": "Soporte", "sustento": "Los centros de innovación apoyan emprendimientos.", "page": "p. 54"},
    {"origen": "Finanzas solidarias", "destino": "Emprendimiento", "tipo": "Soporte", "sustento": "Las finanzas solidarias financian emprendimientos locales.", "page": "p. 55"},
    {"origen": "Cooperativas", "destino": "Economía creativa", "tipo": "Directa", "sustento": "Las cooperativas impulsan la economía solidaria.", "page": "p. 56"},
    {"origen": "Comercio justo", "destino": "Comercio local", "tipo": "Directa", "sustento": "El comercio justo garantiza prácticas éticas.", "page": "p. 57"},
    {"origen": "Producción sostenible", "destino": "Economía creativa", "tipo": "Soporte", "sustento": "La producción sostenible es modelo de la nueva economía.", "page": "p. 58"},
    {"origen": "Bienes y servicios", "destino": "Empleo", "tipo": "Indirecta", "sustento": "Los bienes y servicios generan valor y empleo.", "page": "p. 59"},
    {"origen": "Mercados locales", "destino": "Comercio local", "tipo": "Directa", "sustento": "Los mercados locales dinamizan el comercio.", "page": "p. 60"},
    {"origen": "Agricultura urbana", "destino": "Producción sostenible", "tipo": "Directa", "sustento": "La agricultura urbana produce alimentos localmente.", "page": "p. 61"},
    {"origen": "Agroindustria", "destino": "Empleo", "tipo": "Soporte", "sustento": "La agroindustria genera valor agregado y empleo.", "page": "p. 62"}
  ],
  "EIP": [
    {"origen": "Patrimonios", "destino": "Patrimonio material", "tipo": "Directa", "sustento": "Por primera vez un POT contempla todas las manifestaciones culturales.", "page": "p. 183"},
    {"origen": "Patrimonio material", "destino": "Memoria", "tipo": "Directa", "sustento": "Oficios tradicionales preservan la memoria histórica del sector.", "page": "p. 185"},
    {"origen": "Prácticas culturales", "destino": "Dinámicas comunitarias", "tipo": "Directa", "sustento": "El POT tiene en cuenta todas las manifestaciones culturales y ancestrales.", "page": "p. 185"},
    {"origen": "Patrimonio natural", "destino": "Patrimonio material", "tipo": "Directa", "sustento": "El nuevo POT considera los patrimonios material, natural y arqueológico.", "page": "p. 185"},
    {"origen": "Saberes del lugar", "destino": "Turismo", "tipo": "Soporte", "sustento": "El turismo responsable vincula residentes y saberes del lugar.", "page": "p. 31"},
    {"origen": "Identidades", "destino": "Prácticas culturales", "tipo": "Directa", "sustento": "El Distrito reconoce e integra las manifestaciones culturales.", "page": "p. 183"},
    {"origen": "Patrimonio local", "destino": "Dinámicas comunitarias", "tipo": "Soporte", "sustento": "El turismo sostenible reconoce el patrimonio local.", "page": "p. 31"},
    {"origen": "Modos de habitar", "destino": "Vivienda", "tipo": "Directa", "sustento": "El POT reconoce el habitar próximo de oficios y tradiciones.", "page": "p. 185"},
    {"origen": "Cultura", "destino": "Patrimonio inmaterial", "tipo": "Directa", "sustento": "Los Distritos Creativos generan encuentros culturales.", "page": "p. 183"},
    {"origen": "Dinámicas comunitarias", "destino": "UPL", "tipo": "Soporte", "sustento": "Las nuevas localidades reconocen y protegen patrimonios e identidades.", "page": "p. 17"},
    {"origen": "Memoria", "destino": "Cultura", "tipo": "Directa", "sustento": "Los oficios tradicionales nutren la memoria de los bogotanos.", "page": "p. 185"},
    {"origen": "Patrimonio inmaterial", "destino": "Identidades", "tipo": "Directa", "sustento": "El patrimonio inmaterial es fundante de las identidades.", "page": "p. 186"}
  ]
};

// =============================================================================
// LÓGICA DEL MÓDULO 01
// =============================================================================

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

function buildGraph() {
  console.log('🔨 Construyendo grafo...');

  const structData = {};
  ['EEP', 'EFC', 'ESECI', 'EIP'].forEach(s => structData[s] = { nodes: new Map(), links: [] });

  let totalLinks = 0;

  Object.entries(POT_DATA).forEach(([sheetName, rows]) => {
    console.log(`📄 ${sheetName}: ${rows.length} relaciones`);
    
    rows.forEach(row => {
      const origen = row.origen;
      const destino = row.destino;
      const tipo = row.tipo;
      const sustento = row.sustento;

      if (!origen || !destino) return;

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

      structData[sheetName].links.push({
        source: origen,
        target: destino,
        tipo: tipo.toLowerCase(),
        sustento: sustento,
        sourceName: origen,
        targetName: destino
      });

      totalLinks++;
    });
  });

  graphData.structures = structData;

  const totalNodes = Object.values(structData).reduce((sum, s) => sum + s.nodes.size, 0);
  document.getElementById('statConceptos').textContent = totalNodes;
  document.getElementById('statRelaciones').textContent = totalLinks;
  document.getElementById('statFuentes').textContent = 4;
  document.getElementById('statTipos').textContent = 4;

  console.log(`✅ Grafo: ${totalNodes} conceptos, ${totalLinks} relaciones`);
  
  renderOverview();
}

function renderOverview() {
  console.log('📊 Vista: OVERVIEW');
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

  const nodes = Object.values(structures).map((s, i) => ({
    id: s.id,
    ...s,
    x: width / 2 + Math.cos((i * Math.PI * 2) / 4) * 280,
    y: height / 2 + Math.sin((i * Math.PI * 2) / 4) * 280
  }));

  const nodeSel = container.append('g').selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => renderStructure(d.id));

  nodeSel.append('circle')
    .attr('r', 90)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', d => `${d.color}20`)
    .attr('stroke', d => d.color)
    .attr('stroke-width', 3)
    .attr('filter', d => `drop-shadow(0 0 35px ${d.color})`)
    .attr('opacity', 0.9);

  nodeSel.append('text')
    .attr('x', 0)
    .attr('y', -35)
    .attr('text-anchor', 'middle')
    .attr('font-size', '40px')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .html(d => `<tspan class="fa-solid ${d.icon}"></tspan>`);

  nodeSel.append('text')
    .attr('x', 0)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11.5px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name);

  const sim = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-1200))
    .force('center', d3.forceCenter(width / 2, height / 2));

  sim.on('tick', () => {
    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}

function renderStructure(structId) {
  console.log('📊 Vista: ESTRUCTURA', structId);
  currentView = 'structure';
  selectedStructure = structId;

  const struct = structures[structId];
  const structData = graphData.structures[structId];
  
  if (!structData || structData.nodes.size === 0) {
    console.warn(`Sin datos para ${structId}`);
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
    .attr('stroke-width', 2.5)
    .attr('opacity', 0.7)
    .attr('stroke-dasharray', d => d.tipo === 'indirecta' ? '5,5' : 'none');

  const nodeSel = container.append('g').selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => showDetail(d));

  nodeSel.append('circle')
    .attr('r', 55)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', `${struct.color}25`)
    .attr('stroke', struct.color)
    .attr('stroke-width', 2.5)
    .attr('filter', `drop-shadow(0 0 18px ${struct.color})`)
    .attr('opacity', 0.95);

  nodeSel.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-size', '11px')
    .attr('font-weight', '600')
    .attr('fill', '#eef0f6')
    .attr('pointer-events', 'none')
    .text(d => d.name.length > 16 ? d.name.slice(0, 13) + '…' : d.name);

  const sim = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links)
      .id(d => d.name)
      .distance(130)
      .strength(0.35)
    )
    .force('charge', d3.forceManyBody().strength(-320))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(65));

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
    ? outgoing.map(l => `<div style="padding:4px 0;">→ <strong>${l.targetName}</strong></div>`).join('')
    : '<span style="color:#6b7284;font-size:11px;">Sin conexiones</span>';

  document.getElementById('detailIn').innerHTML = incoming.length > 0
    ? incoming.map(l => `<div style="padding:4px 0;">← <strong>${l.sourceName}</strong></div>`).join('')
    : '<span style="color:#6b7284;font-size:11px;">Sin conexiones</span>';
}

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
  console.log('✓ Página cargada');
  buildGraph();
});

console.log('✓ Script listo');
