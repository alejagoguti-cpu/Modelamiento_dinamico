const potData = {
  structures: [
    {
      id: "eep",
      name: "Sistema Ambiental y EEP",
      color: "#2fd4c8",
      icon: "fa-leaf",
      components: [
        { id: 1, name: "Río Bogotá", icon: "fa-water" },
        { id: 2, name: "Río Tunjuelo", icon: "fa-water" },
        { id: 3, name: "Río Cauca", icon: "fa-water" },
        { id: 4, name: "Quebrada Chiguaza", icon: "fa-water" },
        { id: 5, name: "Quebrada Arzobispo", icon: "fa-water" },
        { id: 6, name: "Quebrada Piedra Negra", icon: "fa-water" },
        { id: 7, name: "Humedal Juan Amarillo", icon: "fa-water" },
        { id: 8, name: "Humedal Córdoba", icon: "fa-water" },
        { id: 9, name: "Humedal Torca", icon: "fa-water" },
        { id: 10, name: "Humedal Santa María del Lago", icon: "fa-water" },
        { id: 11, name: "Laguna Subachoque", icon: "fa-water" },
        { id: 12, name: "Humedal Jaboque", icon: "fa-water" },
        { id: 13, name: "Cerros Orientales", icon: "fa-mountain" },
        { id: 14, name: "Cerro Monserrate", icon: "fa-mountain" },
        { id: 15, name: "Páramo Sumapaz", icon: "fa-mountain" },
        { id: 16, name: "Páramo Cruz Verde", icon: "fa-mountain" },
        { id: 17, name: "Páramo Chingaza", icon: "fa-mountain" },
        { id: 18, name: "Serranía Usme", icon: "fa-mountain" },
        { id: 19, name: "Loma Coruña", icon: "fa-mountain" },
        { id: 20, name: "Loma Espolón", icon: "fa-mountain" },
        { id: 21, name: "Loma Mercedes", icon: "fa-mountain" },
        { id: 22, name: "Alto Misericordia", icon: "fa-mountain" },
        { id: 23, name: "Serranía Macarena", icon: "fa-mountain" },
        { id: 24, name: "Páramo Guasca", icon: "fa-mountain" },
        { id: 25, name: "Bosque Bolívar", icon: "fa-tree" },
        { id: 26, name: "Bosque Encenillo", icon: "fa-tree" },
        { id: 27, name: "Bosque Roble", icon: "fa-tree" },
        { id: 28, name: "Bosque Florida", icon: "fa-tree" },
        { id: 29, name: "Bosque Alférez", icon: "fa-tree" },
        { id: 30, name: "Bosque San Antonio", icon: "fa-tree" },
        { id: 31, name: "Frailejonales", icon: "fa-leaf" },
        { id: 32, name: "Bosques riparios", icon: "fa-tree" },
        { id: 33, name: "Matorrales deciduos", icon: "fa-leaf" },
        { id: 34, name: "Pastizales naturales", icon: "fa-leaf" },
        { id: 35, name: "Arbustal denso", icon: "fa-tree" },
        { id: 36, name: "Herbazal húmedo", icon: "fa-leaf" },
        { id: 37, name: "Reserva Bosque Oriental", icon: "fa-shield" },
        { id: 38, name: "Parque Sumapaz", icon: "fa-shield" },
        { id: 39, name: "Parque Chingaza", icon: "fa-shield" },
        { id: 40, name: "Santuario Fauna Togüi", icon: "fa-shield" }
      ]
    },
    {
      id: "patrimonio",
      name: "Estructura de Patrimonios",
      color: "#a276f2",
      icon: "fa-landmark",
      components: [
        { id: 101, name: "Catedral Metropolitana", icon: "fa-gopuram" },
        { id: 102, name: "Iglesia Candelaria", icon: "fa-gopuram" },
        { id: 103, name: "Iglesia Santa Clara", icon: "fa-gopuram" },
        { id: 104, name: "Monasterio Teusaquillo", icon: "fa-gopuram" },
        { id: 105, name: "Iglesia San Ignacio", icon: "fa-gopuram" },
        { id: 106, name: "Convento Santo Domingo", icon: "fa-gopuram" },
        { id: 107, name: "Capilla Sagrario", icon: "fa-gopuram" },
        { id: 108, name: "Basílica Voto Nacional", icon: "fa-gopuram" },
        { id: 109, name: "Iglesia Lourdes", icon: "fa-gopuram" },
        { id: 110, name: "Santuario Monserrate", icon: "fa-gopuram" },
        { id: 111, name: "Museo de Oro", icon: "fa-image" },
        { id: 112, name: "Museo Nacional", icon: "fa-image" },
        { id: 113, name: "Museo Botero", icon: "fa-image" },
        { id: 114, name: "Museo Arte Moderno", icon: "fa-image" },
        { id: 115, name: "Museo Histórico", icon: "fa-image" },
        { id: 116, name: "Museo Terracota", icon: "fa-image" },
        { id: 117, name: "Galería Arte Colonial", icon: "fa-image" },
        { id: 118, name: "Biblioteca Arango", icon: "fa-book" },
        { id: 119, name: "Archivo Bogotá", icon: "fa-book" },
        { id: 120, name: "Hemeroteca Distrital", icon: "fa-book" },
        { id: 121, name: "Sitio El Abra", icon: "fa-person-digging" },
        { id: 122, name: "Sitio Soacha", icon: "fa-person-digging" },
        { id: 123, name: "Sitio Zipaquirá", icon: "fa-person-digging" },
        { id: 124, name: "Sitio Usme", icon: "fa-person-digging" },
        { id: 125, name: "Plaza Bolívar", icon: "fa-square" },
        { id: 126, name: "Plaza Democracia", icon: "fa-square" },
        { id: 127, name: "Parque Berrío", icon: "fa-square" },
        { id: 128, name: "Parque Santander", icon: "fa-square" },
        { id: 129, name: "Centro Histórico", icon: "fa-building" },
        { id: 130, name: "Palacio Nariño", icon: "fa-building" }
      ]
    },
    {
      id: "funcional",
      name: "Estructura Funcional y Cuidado",
      color: "#3b82f6",
      icon: "fa-hospital",
      components: [
        { id: 201, name: "Colegio Flores", icon: "fa-school" },
        { id: 202, name: "Colegio Nueva Colombia", icon: "fa-school" },
        { id: 203, name: "Colegio Rural Sumapaz", icon: "fa-school" },
        { id: 204, name: "Colegio Usaquén", icon: "fa-school" },
        { id: 205, name: "Colegio Fontdecaba", icon: "fa-school" },
        { id: 206, name: "Universidad Nacional", icon: "fa-school" },
        { id: 207, name: "Universidad Andes", icon: "fa-school" },
        { id: 208, name: "Universidad Javeriana", icon: "fa-school" },
        { id: 209, name: "Universidad Rosario", icon: "fa-school" },
        { id: 210, name: "SENA Bogotá", icon: "fa-school" },
        { id: 211, name: "Hospital Nacional", icon: "fa-hospital" },
        { id: 212, name: "Hospital San Ignacio", icon: "fa-hospital" },
        { id: 213, name: "Hospital Misericordia", icon: "fa-hospital" },
        { id: 214, name: "Hospital Tunal", icon: "fa-hospital" },
        { id: 215, name: "Hospital Simón Bolívar", icon: "fa-hospital" },
        { id: 216, name: "Clínica Palermo", icon: "fa-hospital" },
        { id: 217, name: "Clínica Reina Sofía", icon: "fa-hospital" },
        { id: 218, name: "Centro Salud Chapinero", icon: "fa-hospital" },
        { id: 219, name: "Centro Salud Usaquén", icon: "fa-hospital" },
        { id: 220, name: "Instituto Salud", icon: "fa-hospital" },
        { id: 221, name: "Jardín Infantil Auxiliadora", icon: "fa-child" },
        { id: 222, name: "Jardín Mundo Mágico", icon: "fa-child" },
        { id: 223, name: "Guardería Refugio", icon: "fa-child" },
        { id: 224, name: "Centro Desarrollo Crecer", icon: "fa-child" },
        { id: 225, name: "Hogar Infantil Arcoíris", icon: "fa-child" },
        { id: 226, name: "Parque Piecitos Felices", icon: "fa-tree" },
        { id: 227, name: "Parque Colina Feliz", icon: "fa-tree" },
        { id: 228, name: "Ludoteca Barrio Nuevo", icon: "fa-child" },
        { id: 229, name: "Comedor San Bosco", icon: "fa-utensils" },
        { id: 230, name: "Biblioteca Felicidad", icon: "fa-book" }
      ]
    },
    {
      id: "socioeconomica",
      name: "Estructura Socioeconómica, Creativa e Innovación",
      color: "#f59e0b",
      icon: "fa-briefcase",
      components: [
        { id: 301, name: "Tiendas Barrio Localidad 1", icon: "fa-shop" },
        { id: 302, name: "Tiendas Barrio Localidad 3", icon: "fa-shop" },
        { id: 303, name: "Comercio Informal Centro", icon: "fa-shop" },
        { id: 304, name: "Pequeño Comercio Paseo", icon: "fa-shop" },
        { id: 305, name: "Mercado Flores", icon: "fa-basket-shopping" },
        { id: 306, name: "Centro Abastos Corabastos", icon: "fa-basket-shopping" },
        { id: 307, name: "Mercado Samper Mendoza", icon: "fa-basket-shopping" },
        { id: 308, name: "Plaza Minorista", icon: "fa-basket-shopping" },
        { id: 309, name: "Centro Comercial Carrefour", icon: "fa-shop" },
        { id: 310, name: "Centro Comercial Éxito", icon: "fa-shop" },
        { id: 311, name: "Talleres Confecciones", icon: "fa-hammer" },
        { id: 312, name: "Talleres Zapatería", icon: "fa-hammer" },
        { id: 313, name: "Talleres Carpintería", icon: "fa-hammer" },
        { id: 314, name: "Talleres Ebanistería", icon: "fa-hammer" },
        { id: 315, name: "Taller Cerámica", icon: "fa-hammer" },
        { id: 316, name: "Taller Textiles", icon: "fa-hammer" },
        { id: 317, name: "Taller Joyería", icon: "fa-hammer" },
        { id: 318, name: "Taller Restauración", icon: "fa-hammer" },
        { id: 319, name: "Taller Artes Gráficas", icon: "fa-hammer" },
        { id: 320, name: "Taller Estampación", icon: "fa-hammer" },
        { id: 321, name: "Centro Innovación Hub", icon: "fa-lightbulb" },
        { id: 322, name: "Parque Tecnológico", icon: "fa-lightbulb" },
        { id: 323, name: "Incubadora Negocios", icon: "fa-lightbulb" },
        { id: 324, name: "Laboratorio Innovación", icon: "fa-lightbulb" },
        { id: 325, name: "Centro Desarrollo Empresarial", icon: "fa-lightbulb" },
        { id: 326, name: "Espacio Creativo Huerta", icon: "fa-lightbulb" },
        { id: 327, name: "Estudio Diseño Industrial", icon: "fa-palette" },
        { id: 328, name: "Agencia Publicidad", icon: "fa-palette" },
        { id: 329, name: "Productora Audiovisual", icon: "fa-video" },
        { id: 330, name: "Estudio Música Digital", icon: "fa-music" }
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
  
  relationsWithin: [
    { source: 1, target: 2, type: "flujo" },
    { source: 2, target: 3, type: "flujo" },
    { source: 101, target: 102, type: "integra" },
    { source: 201, target: 202, type: "integra" },
    { source: 301, target: 302, type: "integra" }
  ]
};

let simulation = null;
let allNodes = [];
let allLinks = [];

const state = {
  selectedStructures: new Set(),
  selectedComponents: new Set()
};

const iconMap = {
  "fa-leaf": "\uf06c", "fa-water": "\uf773", "fa-mountain": "\ue3d6",
  "fa-tree": "\uf1bb", "fa-shield": "\uf132", "fa-landmark": "\uf66f",
  "fa-gopuram": "\uf664", "fa-image": "\uf03e", "fa-person-digging": "\ue4fb",
  "fa-square": "\uf0c8", "fa-hospital": "\uf0f8", "fa-school": "\uf549",
  "fa-child": "\ue4e7", "fa-book": "\uf02d", "fa-briefcase": "\uf0b1",
  "fa-shop": "\uf54f", "fa-hammer": "\uf6e3", "fa-lightbulb": "\uf0eb",
  "fa-basket-shopping": "\uf291", "fa-palette": "\uf53f", "fa-video": "\uf03d",
  "fa-music": "\uf001", "fa-building": "\uf1ad", "fa-utensils": "\uf2e7"
};

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
              <i class="fa-solid ${comp.icon}" style="color: ${struct.color};"></i>
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
      if (this.checked) {
        state.selectedComponents.add(id);
      } else {
        state.selectedComponents.delete(id);
      }
      initNetwork();
    });
  });
}

function initNetwork() {
  const selectedStructIds = Array.from(state.selectedStructures);
  const selectedCompIds = Array.from(state.selectedComponents);
  
  allNodes = potData.structures
    .filter(s => selectedStructIds.includes(s.id))
    .map(s => ({
      id: s.id,
      label: s.name.split(' ')[0],
      type: "structure",
      color: s.color,
      icon: s.icon,
      size: 60  // REDUCIDO DE 100
    }));
  
  selectedStructIds.forEach(structId => {
    const struct = potData.structures.find(s => s.id === structId);
    struct.components
      .filter(c => selectedCompIds.includes(c.id))
      .forEach(comp => {
        allNodes.push({
          id: comp.id,
          label: comp.name,
          type: "component",
          color: struct.color,
          icon: comp.icon,
          size: 45,  // REDUCIDO DE 75
          parent: structId
        });
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
    const glowFilter = defs.append("filter")
      .attr("id", `glow-${idx}`)
      .attr("x", "-150%")
      .attr("y", "-150%")
      .attr("width", "400%")
      .attr("height", "400%");
    
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "12")
      .attr("result", "coloredBlur");
    
    glowFilter.append("feFlood")
      .attr("flood-color", color)
      .attr("flood-opacity", "0.7")
      .attr("result", "coloredFlood");
    
    glowFilter.append("feComposite")
      .attr("in", "coloredFlood")
      .attr("in2", "coloredBlur")
      .attr("operator", "in")
      .attr("result", "coloredBlur");
    
    glowFilter.append("feMerge").append("feMergeNode").attr("in", "coloredBlur");
    glowFilter.append("feMergeNode").attr("in", "SourceGraphic");
  });
  
  defs.selectAll("marker")
    .data([{id: "m-teal", color: "#2fd4c8"}, {id: "m-green", color: "#4ade80"}, {id: "m-pink", color: "#f76fb0"}])
    .enter()
    .append("marker")
    .attr("id", d => d.id)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("refX", 28)
    .attr("refY", 3)
    .attr("orient", "auto")
    .append("polygon")
    .attr("points", "0 0, 10 3, 0 6")
    .attr("fill", d => d.color);
  
  if (simulation) simulation.stop();
  
  simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(allLinks).id(d => d.id).distance(d => d.isStructure ? 200 : 120).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-500).distanceMax(600))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(d => d.size + 25).strength(0.85))
    .alphaDecay(0.02)
    .velocityDecay(0.5);
  
  const link = g.selectAll("line.link")
    .data(allLinks)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", d => d.type === "flujo" ? "#2fd4c8" : d.type === "conflicto" ? "#f76fb0" : "#4ade80")
    .attr("stroke-width", d => d.isStructure ? 2.5 : 1.5)
    .attr("stroke-dasharray", d => d.isStructure ? "6,3" : d.type === "conflicto" ? "3,3" : "0")
    .attr("opacity", d => d.isStructure ? 0.6 : 0.4)
    .attr("marker-end", d => d.type === "flujo" ? "url(#m-teal)" : d.type === "conflicto" ? "url(#m-pink)" : "url(#m-green)")
    .attr("cursor", "pointer")
    .style("pointer-events", "stroke")
    .on("click", function(event, d) {
      const sName = typeof d.source === 'object' ? d.source.label : d.source;
      const tName = typeof d.target === 'object' ? d.target.label : d.target;
      alert(`Conexión: ${sName} → ${tName}\nTipo: ${d.type}`);
    });
  
  const nodeGroup = g.selectAll("g.node-group")
    .data(allNodes)
    .enter()
    .append("g")
    .attr("class", "node-group")
    .style("cursor", "pointer")
    .on("click", function(event, d) {
      selectNodeForConnection(d.id);
    })
    .call(drag(simulation));
  
  nodeGroup.append("circle")
    .attr("class", "node-glow")
    .attr("r", d => d.size + 20)  // REDUCIDO DE 30
    .attr("fill", d => d.color)
    .attr("opacity", 0.25)
    .attr("filter", (d) => {
      const colors = ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"];
      const idx = colors.indexOf(d.color);
      return `url(#glow-${idx})`;
    });
  
  nodeGroup.append("circle")
    .attr("class", "node")
    .attr("r", d => d.size)
    .attr("fill", d => d.color)
    .attr("opacity", 0.9)
    .attr("stroke", d => d.color)
    .attr("stroke-width", 3)
    .attr("filter", (d) => {
      const colors = ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"];
      const idx = colors.indexOf(d.color);
      return `url(#glow-${idx})`;
    })
    .style("cursor", "move");
  
  nodeGroup.append("text")
    .attr("class", "node-icon")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("dy", "0")
    .attr("font-size", d => d.size * 1.6)
    .attr("font-family", "'Font Awesome 6 Free'")
    .attr("font-weight", "900")
    .attr("fill", "#fff")
    .attr("pointer-events", "none")
    .attr("filter", (d) => {
      const colors = ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"];
      const idx = colors.indexOf(d.color);
      return `url(#glow-${idx})`;
    })
    .text(d => iconMap[d.icon] || "●");
  
  nodeGroup.append("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("dy", d => d.size + 30)
    .attr("font-size", d => d.type === "structure" ? 14 : 12)
    .attr("font-weight", 700)
    .attr("fill", "#fff")
    .attr("pointer-events", "none")
    .text(d => d.label)
    .style("text-shadow", "0 2px 8px rgba(0,0,0,0.8)");
  
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    nodeGroup.attr('transform', d => `translate(${Math.max(120, Math.min(width - 120, d.x))},${Math.max(120, Math.min(height - 120, d.y))})`);
  });
  
  updateStats();
}

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
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
      if (this.checked) {
        state.selectedStructures.add(id);
        state.selectedComponents.clear();
      } else {
        state.selectedStructures.delete(id);
        state.selectedComponents.clear();
      }
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

let selectedNode1 = null;
let selectedNode2 = null;

function selectNodeForConnection(nodeId) {
  if (!selectedNode1) {
    selectedNode1 = nodeId;
  } else if (!selectedNode2 && nodeId !== selectedNode1) {
    selectedNode2 = nodeId;
    showConnectionPanel(selectedNode1, selectedNode2);
  }
}

function showConnectionPanel(node1Id, node2Id) {
  const node1 = allNodes.find(n => n.id === node1Id);
  const node2 = allNodes.find(n => n.id === node2Id);
  
  if (node1 && node2) {
    document.getElementById('connectionInfo').textContent = `Conectando: "${node1.label}" → "${node2.label}"`;
    document.getElementById('connectionPanel').style.display = 'block';
    document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
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
  alert(`✅ Conexión creada:\n"${node1.label}" → "${node2.label}"\n\nTipo: ${selected.value}`);
  closeConnection();
  initNetwork();
}

function closeConnection() {
  document.getElementById('connectionPanel').style.display = 'none';
  selectedNode1 = null;
  selectedNode2 = null;
  document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
}
