const potData = {
  structures: [
    { id: "eep", name: "Sistema Ambiental y EEP", color: "#2fd4c8", components: [
      { id: 1, name: "Río Bogotá" }, { id: 2, name: "Río Tunjuelo" }, { id: 3, name: "Río Cauca" }, { id: 4, name: "Quebrada Chiguaza" }, { id: 5, name: "Quebrada Arzobispo" },
      { id: 6, name: "Quebrada Piedra Negra" }, { id: 7, name: "Humedal Juan Amarillo" }, { id: 8, name: "Humedal Córdoba" }, { id: 9, name: "Humedal Torca" }, { id: 10, name: "Humedal Santa María del Lago" },
      { id: 11, name: "Laguna Subachoque" }, { id: 12, name: "Humedal Jaboque" }, { id: 13, name: "Cerros Orientales" }, { id: 14, name: "Cerro Monserrate" }, { id: 15, name: "Páramo Sumapaz" },
      { id: 16, name: "Páramo Cruz Verde" }, { id: 17, name: "Páramo Chingaza" }, { id: 18, name: "Serranía Usme" }, { id: 19, name: "Loma Coruña" }, { id: 20, name: "Loma Espolón" },
      { id: 21, name: "Loma Mercedes" }, { id: 22, name: "Alto Misericordia" }, { id: 23, name: "Serranía Macarena" }, { id: 24, name: "Páramo Guasca" }, { id: 25, name: "Bosque Bolívar" },
      { id: 26, name: "Bosque Encenillo" }, { id: 27, name: "Bosque Roble" }, { id: 28, name: "Bosque Florida" }, { id: 29, name: "Bosque Alférez" }, { id: 30, name: "Bosque San Antonio" },
      { id: 31, name: "Frailejonales" }, { id: 32, name: "Bosques riparios" }, { id: 33, name: "Matorrales deciduos" }, { id: 34, name: "Pastizales naturales" }, { id: 35, name: "Arbustal denso" },
      { id: 36, name: "Herbazal húmedo" }, { id: 37, name: "Reserva Bosque Oriental" }, { id: 38, name: "Parque Sumapaz" }, { id: 39, name: "Parque Chingaza" }, { id: 40, name: "Santuario Fauna Togüi" }
    ]},
    { id: "patrimonio", name: "Estructura de Patrimonios", color: "#a276f2", components: [
      { id: 101, name: "Catedral Metropolitana" }, { id: 102, name: "Iglesia Candelaria" }, { id: 103, name: "Iglesia Santa Clara" }, { id: 104, name: "Monasterio Teusaquillo" }, { id: 105, name: "Iglesia San Ignacio" },
      { id: 106, name: "Convento Santo Domingo" }, { id: 107, name: "Capilla Sagrario" }, { id: 108, name: "Basílica Voto Nacional" }, { id: 109, name: "Iglesia Lourdes" }, { id: 110, name: "Santuario Monserrate" },
      { id: 111, name: "Museo de Oro" }, { id: 112, name: "Museo Nacional" }, { id: 113, name: "Museo Botero" }, { id: 114, name: "Museo Arte Moderno" }, { id: 115, name: "Museo Histórico" },
      { id: 116, name: "Museo Terracota" }, { id: 117, name: "Galería Arte Colonial" }, { id: 118, name: "Biblioteca Arango" }, { id: 119, name: "Archivo Bogotá" }, { id: 120, name: "Hemeroteca Distrital" },
      { id: 121, name: "Sitio El Abra" }, { id: 122, name: "Sitio Soacha" }, { id: 123, name: "Sitio Zipaquirá" }, { id: 124, name: "Sitio Usme" }, { id: 125, name: "Plaza Bolívar" },
      { id: 126, name: "Plaza Democracia" }, { id: 127, name: "Parque Berrío" }, { id: 128, name: "Parque Santander" }, { id: 129, name: "Centro Histórico" }, { id: 130, name: "Palacio Nariño" }
    ]},
    { id: "funcional", name: "Estructura Funcional y Cuidado", color: "#3b82f6", components: [
      { id: 201, name: "Colegio Flores" }, { id: 202, name: "Colegio Nueva Colombia" }, { id: 203, name: "Colegio Rural Sumapaz" }, { id: 204, name: "Colegio Usaquén" }, { id: 205, name: "Colegio Fontdecaba" },
      { id: 206, name: "Universidad Nacional" }, { id: 207, name: "Universidad Andes" }, { id: 208, name: "Universidad Javeriana" }, { id: 209, name: "Universidad Rosario" }, { id: 210, name: "SENA Bogotá" },
      { id: 211, name: "Hospital Nacional" }, { id: 212, name: "Hospital San Ignacio" }, { id: 213, name: "Hospital Misericordia" }, { id: 214, name: "Hospital Tunal" }, { id: 215, name: "Hospital Simón Bolívar" },
      { id: 216, name: "Clínica Palermo" }, { id: 217, name: "Clínica Reina Sofía" }, { id: 218, name: "Centro Salud Chapinero" }, { id: 219, name: "Centro Salud Usaquén" }, { id: 220, name: "Instituto Salud" },
      { id: 221, name: "Jardín Infantil Auxiliadora" }, { id: 222, name: "Jardín Mundo Mágico" }, { id: 223, name: "Guardería Refugio" }, { id: 224, name: "Centro Desarrollo Crecer" }, { id: 225, name: "Hogar Infantil Arcoíris" },
      { id: 226, name: "Parque Piecitos Felices" }, { id: 227, name: "Parque Colina Feliz" }, { id: 228, name: "Ludoteca Barrio Nuevo" }, { id: 229, name: "Comedor San Bosco" }, { id: 230, name: "Biblioteca Felicidad" }
    ]},
    { id: "socioeconomica", name: "Estructura Socioeconómica", color: "#f59e0b", components: [
      { id: 301, name: "Tiendas Barrio Localidad 1" }, { id: 302, name: "Tiendas Barrio Localidad 3" }, { id: 303, name: "Comercio Informal Centro" }, { id: 304, name: "Pequeño Comercio Paseo" }, { id: 305, name: "Mercado Flores" },
      { id: 306, name: "Centro Abastos Corabastos" }, { id: 307, name: "Mercado Samper Mendoza" }, { id: 308, name: "Plaza Minorista" }, { id: 309, name: "Centro Comercial Carrefour" }, { id: 310, name: "Centro Comercial Éxito" },
      { id: 311, name: "Talleres Confecciones" }, { id: 312, name: "Talleres Zapatería" }, { id: 313, name: "Talleres Carpintería" }, { id: 314, name: "Talleres Ebanistería" }, { id: 315, name: "Taller Cerámica" },
      { id: 316, name: "Taller Textiles" }, { id: 317, name: "Taller Joyería" }, { id: 318, name: "Taller Restauración" }, { id: 319, name: "Taller Artes Gráficas" }, { id: 320, name: "Taller Estampación" },
      { id: 321, name: "Centro Innovación Hub" }, { id: 322, name: "Parque Tecnológico" }, { id: 323, name: "Incubadora Negocios" }, { id: 324, name: "Laboratorio Innovación" }, { id: 325, name: "Centro Desarrollo Empresarial" },
      { id: 326, name: "Espacio Creativo Huerta" }, { id: 327, name: "Estudio Diseño Industrial" }, { id: 328, name: "Agencia Publicidad" }, { id: 329, name: "Productora Audiovisual" }, { id: 330, name: "Estudio Música Digital" }
    ]}
  ]
};

let simulation = null;
let allNodes = [];
let allLinks = [];
let manualLinks = [];
let selectedNode1 = null;
let selectedNode2 = null;
let selectedLinkIndex = null;
const state = { selectedComponents: new Set() };

document.addEventListener('DOMContentLoaded', () => {
  renderStructures();
  renderComponents();
  setupListeners();
  initNetwork();
});

function renderStructures() {
  const container = document.getElementById('structuresSelector');
  container.innerHTML = potData.structures.map(s => `
    <div class="struct-item" style="border-left: 3px solid ${s.color};">
      <label>
        <input type="checkbox" class="struct-checkbox" data-id="${s.id}">
        <div>
          <div class="struct-name">${s.name}</div>
          <div class="struct-count">${s.components.length} componentes</div>
        </div>
      </label>
    </div>
  `).join('');
}

function renderComponents() {
  const container = document.getElementById('componentsSelector');
  const selectedStructs = Array.from(document.querySelectorAll('.struct-checkbox:checked')).map(el => el.dataset.id);
  
  if (selectedStructs.length === 0) {
    container.innerHTML = '<p style="color: var(--text-dim); font-size: 0.8rem;">Selecciona una estructura</p>';
    return;
  }

  let html = '';
  selectedStructs.forEach(structId => {
    const struct = potData.structures.find(s => s.id === structId);
    struct.components.forEach(comp => {
      const checked = state.selectedComponents.has(comp.id) ? 'checked' : '';
      html += `<div class="comp-item"><label><input type="checkbox" class="comp-checkbox" data-id="${comp.id}" ${checked}> ${comp.name}</label></div>`;
    });
  });

  container.innerHTML = html;
  
  document.querySelectorAll('.comp-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      e.target.checked ? state.selectedComponents.add(id) : state.selectedComponents.delete(id);
      initNetwork();
    });
  });
}

function initNetwork() {
  allNodes = [];
  allLinks = [];
  const structureMap = {};

  state.selectedComponents.forEach(compId => {
    const struct = potData.structures.find(s => s.components.some(c => c.id === compId));
    const comp = struct.components.find(c => c.id === compId);
    
    if (comp && struct) {
      allNodes.push({ id: comp.id, label: comp.name, color: struct.color, size: 32 });
      
      if (!structureMap[struct.id]) {
        structureMap[struct.id] = { ...struct, comps: [] };
      }
      structureMap[struct.id].comps.push(comp.id);
    }
  });

  const structureIds = Object.keys(structureMap);
  let autoConnectionCount = 0;
  
  for (let i = 0; i < structureIds.length; i++) {
    for (let j = i + 1; j < structureIds.length; j++) {
      const struct1 = structureMap[structureIds[i]];
      const struct2 = structureMap[structureIds[j]];
      
      if (struct1.comps.length > 0 && struct2.comps.length > 0) {
        struct1.comps.forEach(comp1 => {
          struct2.comps.forEach(comp2 => {
            const link = { source: comp1, target: comp2, type: 'flujo', isAuto: true };
            allLinks.push(link);
            autoConnectionCount++;
          });
        });
      }
    }
  }

  allLinks = allLinks.concat(manualLinks);

  drawNetwork();
}

function drawNetwork() {
  const svg = d3.select('#networkSvg');
  const container = svg.node().parentElement;
  const width = container.clientWidth;
  const height = container.clientHeight;

  svg.attr('width', width).attr('height', height);
  svg.selectAll('*').remove();

  const g = svg.append('g');
  const defs = svg.append('defs');

  ['#2fd4c8', '#f76fb0', '#4ade80'].forEach((color, i) => {
    defs.append('marker')
      .attr('id', `m-${i}`)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('refX', 24)
      .attr('refY', 2)
      .attr('orient', 'auto')
      .append('polygon')
      .attr('points', '0 0, 8 2, 0 4')
      .attr('fill', color);
  });

  if (simulation) simulation.stop();

  simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(allLinks).id(d => d.id).distance(100).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-250))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(45));

  const link = g.selectAll('line')
    .data(allLinks)
    .enter()
    .append('line')
    .attr('stroke', d => d.type === 'flujo' ? '#2fd4c8' : d.type === 'conflicto' ? '#f76fb0' : '#4ade80')
    .attr('stroke-width', 1.5)
    .attr('stroke-dasharray', d => d.type === 'conflicto' ? '3,3' : '0')
    .attr('opacity', 0.5)
    .attr('marker-end', d => d.type === 'conflicto' ? 'url(#m-1)' : 'url(#m-0)')
    .attr('cursor', 'pointer')
    .on('click', (e, d) => {
      selectedLinkIndex = allLinks.indexOf(d);
      const n1 = allNodes.find(n => n.id === d.source);
      const n2 = allNodes.find(n => n.id === d.target);
      document.getElementById('connectionInfo').innerHTML = `<strong>${n1.label}</strong><br>↔ ${d.type}<br><strong>${n2.label}</strong>`;
      document.getElementById('connectionPanel').style.display = 'block';
    });

  const nodeGroup = g.selectAll('g')
    .data(allNodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', (e, d) => selectNode(d.id))
    .call(d3.drag()
      .on('start', (e, d) => { simulation.alphaTarget(0.3).restart(); d.fx = e.x; d.fy = e.y; })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end', (e, d) => { simulation.alphaTarget(0); d.fx = null; d.fy = null; })
    );

  nodeGroup.append('circle')
    .attr('r', d => d.size + 12)
    .attr('fill', d => d.color)
    .attr('opacity', 0.2);
  
  nodeGroup.append('circle')
    .attr('r', d => d.size)
    .attr('fill', '#3b82f6')
    .attr('opacity', 1);
  
  nodeGroup.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 6)
    .attr('fill', 'none')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1);
  
  nodeGroup.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', d => d.size + 18)
    .attr('font-size', '8px')
    .attr('fill', '#fff')
    .attr('pointer-events', 'none')
    .attr('font-weight', 600)
    .text(d => d.label);

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  updateStats();
}

function updateStats() {
  document.getElementById('countComponents').textContent = state.selectedComponents.size;
  document.getElementById('countLinks').textContent = allLinks.length;
}

function setupListeners() {
  document.querySelectorAll('.struct-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      renderComponents();
      initNetwork();
    });
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    state.selectedComponents.clear();
    manualLinks = [];
    document.querySelectorAll('.comp-checkbox').forEach(cb => cb.checked = false);
    initNetwork();
  });
}

function selectNode(nodeId) {
  if (!selectedNode1) {
    selectedNode1 = nodeId;
  } else if (selectedNode1 !== nodeId && !selectedNode2) {
    selectedNode2 = nodeId;
    const n1 = allNodes.find(n => n.id === selectedNode1);
    const n2 = allNodes.find(n => n.id === selectedNode2);
    document.getElementById('connectionInfo').innerHTML = `<strong>${n1.label}</strong><br>→<br><strong>${n2.label}</strong>`;
    document.getElementById('connectionPanel').style.display = 'block';
  }
}

function confirmConnection() {
  const type = document.querySelector('input[name="convention"]:checked')?.value;
  if (!type) { alert('⚠️ Selecciona tipo'); return; }
  
  if (selectedLinkIndex !== null) {
    const link = allLinks[selectedLinkIndex];
    link.type = type;
    if (link.isAuto) {
      link.isAuto = false;
      if (!manualLinks.find(l => l.source === link.source && l.target === link.target)) {
        manualLinks.push(link);
      }
    }
  } else if (selectedNode1 && selectedNode2) {
    const newLink = { source: selectedNode1, target: selectedNode2, type: type, isAuto: false };
    manualLinks.push(newLink);
  }
  
  closeConnection();
  initNetwork();
}

function closeConnection() {
  document.getElementById('connectionPanel').style.display = 'none';
  selectedNode1 = null;
  selectedNode2 = null;
  selectedLinkIndex = null;
  document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
}

window.confirmConnection = confirmConnection;
window.closeConnection = closeConnection;
