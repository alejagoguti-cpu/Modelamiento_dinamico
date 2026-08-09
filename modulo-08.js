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
    { id: "socioeconomica", name: "Estructura Socioeconómica, Creativa e Innovación", color: "#f59e0b", components: [
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
let selectedNode1 = null;
let selectedNode2 = null;
let selectedLinkIndex = null;
const state = { selectedComponents: new Set() };

window.addEventListener('load', () => {
  renderStructureSelector();
  setupListeners();
  initNetwork();
});

function renderStructureSelector() {
  const container = document.getElementById('structuresSelector');
  if (!container) return;
  container.innerHTML = potData.structures.map(struct => `
    <div class="struct-item" style="border-left: 3px solid ${struct.color};">
      <input type="checkbox" id="struct-${struct.id}" data-id="${struct.id}" class="structure-checkbox">
      <label for="struct-${struct.id}">
        <div class="struct-name">${struct.name}</div>
        <div class="struct-count">${struct.components.length} componentes</div>
      </label>
    </div>
  `).join('');
}

function renderComponentSelector() {
  const container = document.getElementById('componentsSelector');
  if (!container) return;
  
  const selectedStructs = Array.from(document.querySelectorAll('.structure-checkbox:checked')).map(el => el.dataset.id);
  
  if (selectedStructs.length === 0) {
    container.innerHTML = '<p style="color: var(--text-dim); font-size: 0.8rem;">Selecciona una estructura primero</p>';
    return;
  }
  
  let html = '';
  selectedStructs.forEach(structId => {
    const struct = potData.structures.find(s => s.id === structId);
    if (struct) {
      struct.components.forEach(comp => {
        html += `<div class="comp-item"><input type="checkbox" id="comp-${comp.id}" data-id="${comp.id}" class="comp-checkbox"><label for="comp-${comp.id}"><span>${comp.name}</span></label></div>`;
      });
    }
  });
  
  container.innerHTML = html;
  
  document.querySelectorAll('.comp-checkbox').forEach(cb => {
    if (state.selectedComponents.has(parseInt(cb.dataset.id))) {
      cb.checked = true;
    }
    cb.addEventListener('change', function() {
      const id = parseInt(this.dataset.id);
      this.checked ? state.selectedComponents.add(id) : state.selectedComponents.delete(id);
      initNetwork();
    });
  });
}

function initNetwork() {
  const selectedCompIds = Array.from(state.selectedComponents);
  
  allNodes = [];
  allLinks = [];
  
  const structureMap = {};
  
  selectedCompIds.forEach(compId => {
    const struct = potData.structures.find(s => s.components.some(c => c.id === compId));
    const comp = struct?.components.find(c => c.id === compId);
    
    if (struct && comp) {
      allNodes.push({ id: comp.id, label: comp.name, type: "component", color: struct.color, size: 40 });
      
      if (!structureMap[struct.id]) {
        structureMap[struct.id] = struct;
      }
      
      allLinks.push({ source: struct.id, target: comp.id, type: "flujo", isStructure: false, isAuto: true });
    }
  });
  
  // Agregar relaciones entre componentes de diferentes estructuras
  Object.values(structureMap).forEach((struct1, idx) => {
    Object.values(structureMap).forEach((struct2, idx2) => {
      if (idx < idx2) {
        const comps1 = selectedCompIds.filter(id => struct1.components.some(c => c.id === id));
        const comps2 = selectedCompIds.filter(id => struct2.components.some(c => c.id === id));
        if (comps1.length > 0 && comps2.length > 0) {
          allLinks.push({ source: comps1[0], target: comps2[0], type: "flujo", isStructure: false, isManual: false });
        }
      }
    });
  });
  
  const svg = d3.select("#networkSvg");
  const container = svg.node()?.parentElement;
  if (!container) return;
  
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  
  svg.attr('width', width).attr('height', height);
  svg.selectAll("*").remove();
  
  const g = svg.append("g");
  const defs = svg.append("defs");
  
  defs.selectAll("marker").data([{id: "m-teal", color: "#2fd4c8"}, {id: "m-green", color: "#4ade80"}, {id: "m-pink", color: "#f76fb0"}])
    .enter().append("marker").attr("id", d => d.id).attr("markerWidth", 10).attr("markerHeight", 10).attr("refX", 28).attr("refY", 3).attr("orient", "auto")
    .append("polygon").attr("points", "0 0, 10 3, 0 6").attr("fill", d => d.color);
  
  if (simulation) simulation.stop();
  
  simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(allLinks).id(d => d.id).distance(100).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-500).distanceMax(600))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(d => d.size + 20).strength(0.85))
    .alphaDecay(0.02).velocityDecay(0.5);
  
  const link = g.selectAll("line.link").data(allLinks).enter().append("line").attr("class", "link")
    .attr("stroke", d => d.type === "flujo" ? "#2fd4c8" : d.type === "conflicto" ? "#f76fb0" : "#4ade80")
    .attr("stroke-width", 1.5)
    .attr("stroke-dasharray", d => d.type === "conflicto" ? "3,3" : "0")
    .attr("opacity", 0.4)
    .attr("marker-end", d => d.type === "flujo" ? "url(#m-teal)" : d.type === "conflicto" ? "url(#m-pink)" : "url(#m-green)")
    .attr("cursor", "pointer").style("pointer-events", "stroke")
    .on("click", function(event, d) {
      selectedLinkIndex = allLinks.indexOf(d);
      console.log('📍 Línea seleccionada:', d);
      showConnectionPanel(null, null, d);
    });
  
  const nodeGroup = g.selectAll("g.node-group").data(allNodes).enter().append("g").attr("class", "node-group").style("cursor", "pointer")
    .on("click", function(event, d) { selectNodeForConnection(d.id); })
    .call(drag(simulation));
  
  nodeGroup.append("circle").attr("r", d => d.size + 12).attr("fill", d => d.color).attr("opacity", 0.2);
  
  nodeGroup.append("circle").attr("r", d => d.size).attr("fill", "#3b82f6").attr("opacity", 1).attr("stroke", "none").style("cursor", "move");
  
  nodeGroup.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("dy", 0)
    .attr("font-size", "18px").attr("fill", "#fff").attr("pointer-events", "none").text("●");
  
  nodeGroup.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("dy", d => d.size * 0.25)
    .attr("font-size", 9).attr("font-weight", 700).attr("fill", "#fff").attr("pointer-events", "none").text(d => d.label)
    .style("text-shadow", "0 1px 3px rgba(0,0,0,0.7)");
  
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    nodeGroup.attr('transform', d => `translate(${Math.max(60, Math.min(width - 60, d.x))},${Math.max(60, Math.min(height - 60, d.y))})`);
  });
  
  updateStats();
}

function drag(simulation) {
  function dragstarted(event, d) { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
  function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
  function dragended(event, d) { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }
  return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
}

function updateStats() {
  const countComponents = document.getElementById('countComponents');
  if (countComponents) countComponents.textContent = state.selectedComponents.size;
}

function setupListeners() {
  document.querySelectorAll('.structure-checkbox').forEach(cb => {
    cb.addEventListener('change', function() {
      renderComponentSelector();
      initNetwork();
    });
  });
  
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.selectedComponents.clear();
      document.querySelectorAll('.comp-checkbox').forEach(cb => cb.checked = false);
      initNetwork();
    });
  }
}

function selectNodeForConnection(nodeId) {
  if (!selectedNode1) { 
    selectedNode1 = nodeId;
    console.log('✅ NODO 1:', allNodes.find(n => n.id === nodeId)?.label);
  }
  else if (!selectedNode2 && nodeId !== selectedNode1) { 
    selectedNode2 = nodeId;
    console.log('✅ NODO 2:', allNodes.find(n => n.id === nodeId)?.label);
    showConnectionPanel(selectedNode1, selectedNode2);
  }
}

function showConnectionPanel(node1Id, node2Id, link = null) {
  const panel = document.getElementById('connectionPanel');
  if (!panel) return;
  
  let info = '';
  if (link) {
    const node1 = allNodes.find(n => n.id === link.source);
    const node2 = allNodes.find(n => n.id === link.target);
    info = `${node1?.label} ➜ ${node2?.label} (${link.type})`;
  } else {
    const node1 = allNodes.find(n => n.id === node1Id);
    const node2 = allNodes.find(n => n.id === node2Id);
    info = `${node1?.label} ➜ ${node2?.label}`;
  }
  
  document.getElementById('connectionInfo').textContent = info;
  panel.style.display = 'block';
  document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
}

function confirmConnection() {
  const selected = document.querySelector('input[name="convention"]:checked');
  if (!selected) { alert('⚠️ Selecciona convención'); return; }
  
  if (selectedLinkIndex !== null) {
    // MODIFICAR LÍNEA EXISTENTE
    const typeMap = { 'dirigida': 'flujo', 'nodirigida': 'bidirectional', 'fuerte': 'fuerte', 'conflicto': 'conflicto' };
    allLinks[selectedLinkIndex].type = typeMap[selected.value];
    console.log('✅ LÍNEA MODIFICADA:', allLinks[selectedLinkIndex]);
    alert('✅ Línea modificada');
  } else if (selectedNode1 && selectedNode2) {
    // CREAR NUEVA LÍNEA
    const typeMap = { 'dirigida': 'flujo', 'nodirigida': 'bidirectional', 'fuerte': 'fuerte', 'conflicto': 'conflicto' };
    const node1 = allNodes.find(n => n.id === selectedNode1);
    const node2 = allNodes.find(n => n.id === selectedNode2);
    allLinks.push({ source: selectedNode1, target: selectedNode2, type: typeMap[selected.value], isStructure: false });
    console.log('✅ CONEXIÓN CREADA');
    alert(`✅ Conexión creada: ${node1?.label} → ${node2?.label}`);
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

function updatePreview() {}
