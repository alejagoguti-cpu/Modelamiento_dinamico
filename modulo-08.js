// DATOS CON 100 COMPONENTES
const potData = {
  structures: [
    {
      id: "eep",
      name: "Sistema Ambiental y EEP",
      color: "#2fd4c8",
      icon: "💧",
      components: [
        { id: 1, name: "Río Bogotá", icon: "💧" },
        { id: 2, name: "Río Tunjuelo", icon: "💧" },
        { id: 3, name: "Río Cauca", icon: "💧" },
        { id: 4, name: "Quebrada Chiguaza", icon: "💧" },
        { id: 5, name: "Quebrada Arzobispo", icon: "💧" },
        { id: 6, name: "Quebrada Piedra Negra", icon: "💧" },
        { id: 7, name: "Humedal Juan Amarillo", icon: "🌊" },
        { id: 8, name: "Humedal Córdoba", icon: "🌊" },
        { id: 9, name: "Humedal Torca", icon: "🌊" },
        { id: 10, name: "Humedal Santa María del Lago", icon: "🌊" },
        { id: 11, name: "Laguna Subachoque", icon: "🌊" },
        { id: 12, name: "Humedal Jaboque", icon: "🌊" },
        { id: 13, name: "Cerros Orientales", icon: "⛰️" },
        { id: 14, name: "Cerro Monserrate", icon: "⛰️" },
        { id: 15, name: "Páramo Sumapaz", icon: "⛰️" },
        { id: 16, name: "Páramo Cruz Verde", icon: "⛰️" },
        { id: 17, name: "Páramo Chingaza", icon: "⛰️" },
        { id: 18, name: "Serranía Usme", icon: "⛰️" },
        { id: 19, name: "Loma Coruña", icon: "⛰️" },
        { id: 20, name: "Loma Espolón", icon: "⛰️" },
        { id: 21, name: "Loma Mercedes", icon: "⛰️" },
        { id: 22, name: "Alto Misericordia", icon: "⛰️" },
        { id: 23, name: "Serranía Macarena", icon: "⛰️" },
        { id: 24, name: "Páramo Guasca", icon: "⛰️" },
        { id: 25, name: "Bosque Bolívar", icon: "🌲" },
        { id: 26, name: "Bosque Encenillo", icon: "🌲" },
        { id: 27, name: "Bosque Roble", icon: "🌲" },
        { id: 28, name: "Bosque Florida", icon: "🌲" },
        { id: 29, name: "Bosque Alférez", icon: "🌲" },
        { id: 30, name: "Bosque San Antonio", icon: "🌲" },
        { id: 31, name: "Frailejonales", icon: "🌿" },
        { id: 32, name: "Bosques riparios", icon: "🌿" },
        { id: 33, name: "Matorrales deciduos", icon: "🌿" },
        { id: 34, name: "Pastizales naturales", icon: "🌾" },
        { id: 35, name: "Arbustal denso", icon: "🌿" },
        { id: 36, name: "Herbazal húmedo", icon: "🌾" },
        { id: 37, name: "Reserva Bosque Oriental", icon: "🛡️" },
        { id: 38, name: "Parque Sumapaz", icon: "🛡️" },
        { id: 39, name: "Parque Chingaza", icon: "🛡️" },
        { id: 40, name: "Santuario Fauna Togüi", icon: "🛡️" }
      ]
    },
    {
      id: "patrimonio",
      name: "Estructura de Patrimonios",
      color: "#a276f2",
      icon: "🏛️",
      components: [
        { id: 101, name: "Catedral Metropolitana", icon: "⛪" },
        { id: 102, name: "Iglesia Candelaria", icon: "⛪" },
        { id: 103, name: "Iglesia Santa Clara", icon: "⛪" },
        { id: 104, name: "Monasterio Teusaquillo", icon: "⛪" },
        { id: 105, name: "Iglesia San Ignacio", icon: "⛪" },
        { id: 106, name: "Convento Santo Domingo", icon: "⛪" },
        { id: 107, name: "Capilla Sagrario", icon: "⛪" },
        { id: 108, name: "Basílica Voto Nacional", icon: "⛪" },
        { id: 109, name: "Iglesia Lourdes", icon: "⛪" },
        { id: 110, name: "Santuario Monserrate", icon: "⛪" },
        { id: 111, name: "Museo de Oro", icon: "🖼️" },
        { id: 112, name: "Museo Nacional", icon: "🖼️" },
        { id: 113, name: "Museo Botero", icon: "🖼️" },
        { id: 114, name: "Museo Arte Moderno", icon: "🖼️" },
        { id: 115, name: "Museo Histórico", icon: "🖼️" },
        { id: 116, name: "Museo Terracota", icon: "🖼️" },
        { id: 117, name: "Galería Arte Colonial", icon: "🖼️" },
        { id: 118, name: "Biblioteca Arango", icon: "📚" },
        { id: 119, name: "Archivo Bogotá", icon: "📚" },
        { id: 120, name: "Hemeroteca Distrital", icon: "📚" },
        { id: 121, name: "Sitio El Abra", icon: "🔍" },
        { id: 122, name: "Sitio Soacha", icon: "🔍" },
        { id: 123, name: "Sitio Zipaquirá", icon: "🔍" },
        { id: 124, name: "Sitio Usme", icon: "🔍" },
        { id: 125, name: "Plaza Bolívar", icon: "📍" },
        { id: 126, name: "Plaza Democracia", icon: "📍" },
        { id: 127, name: "Parque Berrío", icon: "🏞️" },
        { id: 128, name: "Parque Santander", icon: "🏞️" },
        { id: 129, name: "Centro Histórico", icon: "🏢" },
        { id: 130, name: "Palacio Nariño", icon: "🏛️" }
      ]
    },
    {
      id: "funcional",
      name: "Estructura Funcional y Cuidado",
      color: "#3b82f6",
      icon: "🏥",
      components: [
        { id: 201, name: "Colegio Flores", icon: "🎓" },
        { id: 202, name: "Colegio Nueva Colombia", icon: "🎓" },
        { id: 203, name: "Colegio Rural Sumapaz", icon: "🎓" },
        { id: 204, name: "Colegio Usaquén", icon: "🎓" },
        { id: 205, name: "Colegio Fontdecaba", icon: "🎓" },
        { id: 206, name: "Universidad Nacional", icon: "🎓" },
        { id: 207, name: "Universidad Andes", icon: "🎓" },
        { id: 208, name: "Universidad Javeriana", icon: "🎓" },
        { id: 209, name: "Universidad Rosario", icon: "🎓" },
        { id: 210, name: "SENA Bogotá", icon: "🎓" },
        { id: 211, name: "Hospital Nacional", icon: "🏥" },
        { id: 212, name: "Hospital San Ignacio", icon: "🏥" },
        { id: 213, name: "Hospital Misericordia", icon: "🏥" },
        { id: 214, name: "Hospital Tunal", icon: "🏥" },
        { id: 215, name: "Hospital Simón Bolívar", icon: "🏥" },
        { id: 216, name: "Clínica Palermo", icon: "🏥" },
        { id: 217, name: "Clínica Reina Sofía", icon: "🏥" },
        { id: 218, name: "Centro Salud Chapinero", icon: "🏥" },
        { id: 219, name: "Centro Salud Usaquén", icon: "🏥" },
        { id: 220, name: "Instituto Salud", icon: "🏥" },
        { id: 221, name: "Jardín Infantil Auxiliadora", icon: "👶" },
        { id: 222, name: "Jardín Mundo Mágico", icon: "👶" },
        { id: 223, name: "Guardería Refugio", icon: "👶" },
        { id: 224, name: "Centro Desarrollo Crecer", icon: "👶" },
        { id: 225, name: "Hogar Infantil Arcoíris", icon: "👶" },
        { id: 226, name: "Parque Piecitos Felices", icon: "🎡" },
        { id: 227, name: "Parque Colina Feliz", icon: "🎡" },
        { id: 228, name: "Ludoteca Barrio Nuevo", icon: "🎮" },
        { id: 229, name: "Comedor San Bosco", icon: "🍽️" },
        { id: 230, name: "Biblioteca Felicidad", icon: "📚" }
      ]
    },
    {
      id: "socioeconomica",
      name: "Estructura Socioeconómica, Creativa e Innovación",
      color: "#f59e0b",
      icon: "💼",
      components: [
        { id: 301, name: "Tiendas Barrio Localidad 1", icon: "🏪" },
        { id: 302, name: "Tiendas Barrio Localidad 3", icon: "🏪" },
        { id: 303, name: "Comercio Informal Centro", icon: "🏪" },
        { id: 304, name: "Pequeño Comercio Paseo", icon: "🏪" },
        { id: 305, name: "Mercado Flores", icon: "🛒" },
        { id: 306, name: "Centro Abastos Corabastos", icon: "🛒" },
        { id: 307, name: "Mercado Samper Mendoza", icon: "🛒" },
        { id: 308, name: "Plaza Minorista", icon: "🛒" },
        { id: 309, name: "Centro Comercial Carrefour", icon: "🏬" },
        { id: 310, name: "Centro Comercial Éxito", icon: "🏬" },
        { id: 311, name: "Talleres Confecciones", icon: "🧵" },
        { id: 312, name: "Talleres Zapatería", icon: "👞" },
        { id: 313, name: "Talleres Carpintería", icon: "🔨" },
        { id: 314, name: "Talleres Ebanistería", icon: "🪑" },
        { id: 315, name: "Taller Cerámica", icon: "🏺" },
        { id: 316, name: "Taller Textiles", icon: "🧶" },
        { id: 317, name: "Taller Joyería", icon: "💍" },
        { id: 318, name: "Taller Restauración", icon: "🎨" },
        { id: 319, name: "Taller Artes Gráficas", icon: "🖨️" },
        { id: 320, name: "Taller Estampación", icon: "🎨" },
        { id: 321, name: "Centro Innovación Hub", icon: "💡" },
        { id: 322, name: "Parque Tecnológico", icon: "🔬" },
        { id: 323, name: "Incubadora Negocios", icon: "🚀" },
        { id: 324, name: "Laboratorio Innovación", icon: "🔬" },
        { id: 325, name: "Centro Desarrollo Empresarial", icon: "📊" },
        { id: 326, name: "Espacio Creativo Huerta", icon: "🌱" },
        { id: 327, name: "Estudio Diseño Industrial", icon: "🎨" },
        { id: 328, name: "Agencia Publicidad", icon: "📢" },
        { id: 329, name: "Productora Audiovisual", icon: "🎬" },
        { id: 330, name: "Estudio Música Digital", icon: "🎵" }
      ]
    }
  ],
  
  relationsBetweenStructures: [
    { source: "eep", target: "patrimonio", type: "integra" },
    { source: "eep", target: "funcional", type: "condiciona" },
    { source: "eep", target: "socioeconomica", type: "sostiene" },
    { source: "patrimonio", target: "funcional", type: "vincula" },
    { source: "patrimonio", target: "socioeconomica", type: "genera" },
    { source: "funcional", target: "socioeconomica", type: "integra" }
  ],
  
  relationsWithin: []
};

let simulation = null;
let allNodes = [];
let allLinks = [];
let selectedNode1 = null;
let selectedNode2 = null;

const state = { selectedStructures: new Set(), selectedComponents: new Set() };

window.addEventListener('load', () => {
  renderStructureSelector();
  renderComponentSelector();
  setupListeners();
  setTimeout(() => initNetwork(), 100);
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
  if (state.selectedStructures.size === 0) {
    container.innerHTML = '<p style="color: var(--text-dim); font-size: 0.8rem;">Selecciona una estructura primero</p>';
    return;
  }
  let html = '';
  state.selectedStructures.forEach(structId => {
    const struct = potData.structures.find(s => s.id === structId);
    if (struct) {
      struct.components.forEach(comp => {
        html += `
          <div class="comp-item">
            <input type="checkbox" id="comp-${comp.id}" data-id="${comp.id}">
            <label for="comp-${comp.id}">
              <span style="font-size: 1.2em;">${comp.icon}</span>
              <span>${comp.name}</span>
            </label>
          </div>
        `;
      });
    }
  });
  container.innerHTML = html;
  document.querySelectorAll('#componentsSelector input').forEach(cb => {
    cb.addEventListener('change', function() {
      const id = parseInt(this.dataset.id);
      if (this.checked) { state.selectedComponents.add(id); } 
      else { state.selectedComponents.delete(id); }
      initNetwork();
    });
  });
}

function initNetwork() {
  const selectedStructIds = Array.from(state.selectedStructures);
  const selectedCompIds = Array.from(state.selectedComponents);
  
  allNodes = potData.structures
    .filter(s => selectedStructIds.includes(s.id))
    .map(s => ({ id: s.id, label: s.name.split(' ')[0], type: "structure", color: s.color, icon: s.icon, size: 60 }));
  
  selectedStructIds.forEach(structId => {
    const struct = potData.structures.find(s => s.id === structId);
    struct.components.filter(c => selectedCompIds.includes(c.id)).forEach(comp => {
      allNodes.push({ id: comp.id, label: comp.name, type: "component", color: struct.color, icon: comp.icon, size: 45, parent: structId });
    });
  });
  
  allLinks = potData.relationsBetweenStructures
    .filter(l => selectedStructIds.includes(l.source) && selectedStructIds.includes(l.target))
    .map(l => ({ source: l.source, target: l.target, type: l.type, isStructure: true }));
  
  const internalLinks = potData.relationsWithin
    .filter(l => selectedCompIds.includes(l.source) && selectedCompIds.includes(l.target))
    .map(l => ({ source: l.source, target: l.target, type: l.type, isStructure: false }));
  
  allLinks = [...allLinks, ...internalLinks];
  
  const svg = d3.select("#networkSvg");
  const container = svg.node().parentElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  
  svg.attr('width', width).attr('height', height);
  svg.selectAll("*").remove();
  
  const g = svg.append("g");
  const defs = svg.append("defs");
  
  ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"].forEach((color, idx) => {
    const glowFilter = defs.append("filter").attr("id", `glow-${idx}`).attr("x", "-150%").attr("y", "-150%").attr("width", "400%").attr("height", "400%");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "12").attr("result", "coloredBlur");
    glowFilter.append("feFlood").attr("flood-color", color).attr("flood-opacity", "0.7").attr("result", "coloredFlood");
    glowFilter.append("feComposite").attr("in", "coloredFlood").attr("in2", "coloredBlur").attr("operator", "in").attr("result", "coloredBlur");
    glowFilter.append("feMerge").append("feMergeNode").attr("in", "coloredBlur");
    glowFilter.append("feMergeNode").attr("in", "SourceGraphic");
  });
  
  defs.selectAll("marker").data([{id: "m-teal", color: "#2fd4c8"}, {id: "m-green", color: "#4ade80"}, {id: "m-pink", color: "#f76fb0"}])
    .enter().append("marker").attr("id", d => d.id).attr("markerWidth", 10).attr("markerHeight", 10).attr("refX", 28).attr("refY", 3).attr("orient", "auto")
    .append("polygon").attr("points", "0 0, 10 3, 0 6").attr("fill", d => d.color);
  
  if (simulation) simulation.stop();
  
  simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(allLinks).id(d => d.id).distance(d => d.isStructure ? 200 : 120).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-500).distanceMax(600))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(d => d.size + 25).strength(0.85))
    .alphaDecay(0.02).velocityDecay(0.5);
  
  const link = g.selectAll("line.link").data(allLinks).enter().append("line").attr("class", "link")
    .attr("stroke", d => d.type === "flujo" ? "#2fd4c8" : d.type === "conflicto" ? "#f76fb0" : "#4ade80")
    .attr("stroke-width", d => d.isStructure ? 2.5 : 1.5)
    .attr("stroke-dasharray", d => d.isStructure ? "6,3" : d.type === "conflicto" ? "3,3" : "0")
    .attr("opacity", d => d.isStructure ? 0.6 : 0.4)
    .attr("marker-end", d => d.type === "flujo" ? "url(#m-teal)" : d.type === "conflicto" ? "url(#m-pink)" : "url(#m-green)")
    .attr("cursor", "pointer").style("pointer-events", "stroke")
    .on("click", function(event, d) {
      const sName = typeof d.source === 'object' ? d.source.label : d.source;
      const tName = typeof d.target === 'object' ? d.target.label : d.target;
      alert(`📍 Conexión: ${sName} → ${tName}\n🔗 Tipo: ${d.type}`);
    });
  
  const nodeGroup = g.selectAll("g.node-group").data(allNodes).enter().append("g").attr("class", "node-group").style("cursor", "pointer")
    .on("click", function(event, d) { selectNodeForConnection(d.id); })
    .call(drag(simulation));
  
  nodeGroup.append("circle").attr("class", "node-glow").attr("r", d => d.size + 20).attr("fill", d => d.color).attr("opacity", 0.35)
    .attr("filter", (d) => { const colors = ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"]; const idx = colors.indexOf(d.color); return `url(#glow-${idx})`; });
  
  nodeGroup.append("circle").attr("class", "node").attr("r", d => d.size).attr("fill", d => d.color).attr("opacity", 1).attr("stroke", "none").style("cursor", "move");
  
  nodeGroup.append("text").attr("class", "node-icon").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("dy", d => -d.size * 0.15)
    .attr("font-size", d => d.size * 0.9).attr("fill", "#fff").attr("pointer-events", "none").text(d => d.icon);
  
  nodeGroup.append("text").attr("class", "node-label").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("dy", d => d.size * 0.2)
    .attr("font-size", d => d.type === "structure" ? 9 : 7).attr("font-weight", 700).attr("fill", "#fff").attr("pointer-events", "none").text(d => d.label)
    .style("text-shadow", "0 1px 3px rgba(0,0,0,0.5)");
  
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    nodeGroup.attr('transform', d => `translate(${Math.max(120, Math.min(width - 120, d.x))},${Math.max(120, Math.min(height - 120, d.y))})`);
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
  document.getElementById('countStructures').textContent = state.selectedStructures.size;
  document.getElementById('countComponents').textContent = state.selectedComponents.size;
  const subtitle = state.selectedStructures.size === 0 ? 'Selecciona estructuras →' : `${state.selectedStructures.size} estructura(s) | ${state.selectedComponents.size} componentes`;
  document.getElementById('networkSubtitle').textContent = subtitle;
}

function setupListeners() {
  document.querySelectorAll('.structure-checkbox').forEach(cb => {
    cb.addEventListener('change', function() {
      const id = this.dataset.id;
      if (this.checked) { state.selectedStructures.add(id); state.selectedComponents.clear(); } 
      else { state.selectedStructures.delete(id); state.selectedComponents.clear(); }
      renderComponentSelector();
      initNetwork();
    });
  });
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.selectedStructures.clear();
      state.selectedComponents.clear();
      document.querySelectorAll('.structure-checkbox').forEach(cb => cb.checked = false);
      renderComponentSelector();
      initNetwork();
    });
  }
}

function selectNodeForConnection(nodeId) {
  if (!selectedNode1) { 
    selectedNode1 = nodeId;
    console.log('✅ Nodo 1 seleccionado:', allNodes.find(n => n.id === nodeId).label);
  }
  else if (!selectedNode2 && nodeId !== selectedNode1) { 
    selectedNode2 = nodeId;
    console.log('✅ Nodo 2 seleccionado:', allNodes.find(n => n.id === nodeId).label);
    showConnectionPanel(selectedNode1, selectedNode2);
  } else {
    console.log('⚠️ Selecciona 2 nodos diferentes');
  }
}

function showConnectionPanel(node1Id, node2Id) {
  const node1 = allNodes.find(n => n.id === node1Id);
  const node2 = allNodes.find(n => n.id === node2Id);
  if (node1 && node2) {
    document.getElementById('connectionInfo').textContent = `${node1.icon} ${node1.label} ➜ ${node2.icon} ${node2.label}`;
    document.getElementById('connectionPanel').style.display = 'block';
    document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
    console.log('📍 Panel abierto');
  }
}

function updatePreview() {}

function confirmConnection() {
  const selected = document.querySelector('input[name="convention"]:checked');
  if (!selected) { alert('⚠️ Selecciona una convención'); return; }
  if (!selectedNode1 || !selectedNode2) { alert('⚠️ Error: nodos no seleccionados'); return; }
  
  const typeMap = { 'dirigida': 'flujo', 'nodirigida': 'bidirectional', 'fuerte': 'fuerte', 'conflicto': 'conflicto' };
  const node1 = allNodes.find(n => n.id === selectedNode1);
  const node2 = allNodes.find(n => n.id === selectedNode2);
  
  allLinks.push({ source: selectedNode1, target: selectedNode2, type: typeMap[selected.value], isStructure: false, isManual: true });
  
  console.log('✅ CONEXIÓN CREADA', { from: node1.label, to: node2.label, type: typeMap[selected.value] });
  
  alert(`✅ CONEXIÓN CREADA\n\n${node1.icon} ${node1.label}\n        ⬇\n→  ${typeMap[selected.value]}\n        ⬇\n${node2.icon} ${node2.label}`);
  
  closeConnection();
  initNetwork();
}

function closeConnection() {
  document.getElementById('connectionPanel').style.display = 'none';
  selectedNode1 = null;
  selectedNode2 = null;
  document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
  console.log('❌ Panel cerrado');
}
