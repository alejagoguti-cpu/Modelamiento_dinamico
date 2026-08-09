const potData = {
  structures: [
    {
      id: "eep",
      name: "Sistema Ambiental y EEP",
      color: "#2fd4c8",
      icon: "fa-leaf",
      components: [
        { id: 1, name: "Ríos", icon: "fa-water" },
        { id: 2, name: "Quebradas", icon: "fa-water" },
        { id: 3, name: "Humedales", icon: "fa-water" },
        { id: 4, name: "Cerros Orientales", icon: "fa-mountain" },
        { id: 5, name: "Páramos", icon: "fa-mountain" }
      ]
    },
    {
      id: "patrimonio",
      name: "Estructura de Patrimonios",
      color: "#a276f2",
      icon: "fa-landmark",
      components: [
        { id: 11, name: "Iglesias", icon: "fa-gopuram" },
        { id: 12, name: "Museos", icon: "fa-image" },
        { id: 13, name: "Sitios Arqueológicos", icon: "fa-person-digging" },
        { id: 14, name: "Plazas Históricas", icon: "fa-square" }
      ]
    },
    {
      id: "funcional",
      name: "Estructura Funcional y Cuidado",
      color: "#3b82f6",
      icon: "fa-hospital",
      components: [
        { id: 21, name: "Colegios", icon: "fa-school" },
        { id: 22, name: "Hospitales", icon: "fa-hospital" },
        { id: 23, name: "Jardines Infantiles", icon: "fa-child" },
        { id: 24, name: "Parques Infantiles", icon: "fa-child" }
      ]
    },
    {
      id: "socioeconomica",
      name: "Estructura Socioeconómica",
      color: "#f59e0b",
      icon: "fa-briefcase",
      components: [
        { id: 31, name: "Comercio Local", icon: "fa-shop" },
        { id: 32, name: "Manufacturas", icon: "fa-hammer" },
        { id: 33, name: "Innovación", icon: "fa-lightbulb" },
        { id: 34, name: "Mercados", icon: "fa-basket-shopping" }
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
    { source: 4, target: 5, type: "condiciona" },
    { source: 11, target: 12, type: "integra" },
    { source: 21, target: 22, type: "integra" },
    { source: 31, target: 32, type: "integra" }
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
  "fa-leaf": "\uf06c",
  "fa-water": "\uf773",
  "fa-mountain": "\ue3d6",
  "fa-gopuram": "\uf664",
  "fa-image": "\uf03e",
  "fa-person-digging": "\ue4fb",
  "fa-square": "\uf0c8",
  "fa-school": "\uf549",
  "fa-hospital": "\uf0f8",
  "fa-child": "\ue4e7",
  "fa-shop": "\uf54f",
  "fa-hammer": "\uf6e3",
  "fa-lightbulb": "\uf0eb",
  "fa-basket-shopping": "\uf291",
  "fa-landmark": "\uf66f",
  "fa-briefcase": "\uf0b1"
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
      size: 100  // AUMENTADO DE 70
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
          size: 75,  // AUMENTADO DE 55
          parent: structId
        });
      });
  });
  
  allLinks = potData.relationsBetweenStructures
    .filter(l => selectedStructIds.includes(l.source) && selectedStructIds.includes(l.target))
    .map(l => ({ 
      source: l.source, 
      target: l.target, 
      type: l.type, 
      isStructure: true 
    }));
  
  const internalLinks = potData.relationsWithin
    .filter(l => selectedCompIds.includes(l.source) && selectedCompIds.includes(l.target))
    .map(l => ({ 
      source: l.source, 
      target: l.target, 
      type: l.type, 
      isStructure: false 
    }));
  
  allLinks = [...allLinks, ...internalLinks];
  
  const svg = d3.select("#networkSvg");
  const container = svg.node().parentElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  
  svg.attr('width', width).attr('height', height);
  svg.selectAll("*").remove();
  
  const g = svg.append("g");
  
  // FILTERS PARA GLOW
  const defs = svg.append("defs");
  
  // Filtro de glow general
  const filter = defs.append("filter")
    .attr("id", "glow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");
  
  filter.append("feGaussianBlur")
    .attr("stdDeviation", "8")
    .attr("result", "coloredBlur");
  
  filter.append("feMerge")
    .append("feMergeNode")
    .attr("in", "coloredBlur");
  
  // Crear glows individuales por color con más intensidad
  ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"].forEach((color, idx) => {
    const glowFilter = defs.append("filter")
      .attr("id", `glow-${idx}`)
      .attr("x", "-150%")
      .attr("y", "-150%")
      .attr("width", "400%")
      .attr("height", "400%");
    
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "12")  // AUMENTADO DE 6
      .attr("result", "coloredBlur");
    
    glowFilter.append("feFlood")
      .attr("flood-color", color)
      .attr("flood-opacity", "0.7")  // AUMENTADO DE 0.5
      .attr("result", "coloredFlood");
    
    glowFilter.append("feComposite")
      .attr("in", "coloredFlood")
      .attr("in2", "coloredBlur")
      .attr("operator", "in")
      .attr("result", "coloredBlur");
    
    glowFilter.append("feMerge")
      .append("feMergeNode")
      .attr("in", "coloredBlur");
    
    glowFilter.append("feMergeNode")
      .attr("in", "SourceGraphic");
  });
  
  // MARKERS
  defs.selectAll("marker")
    .data([
      {id: "m-teal", color: "#2fd4c8"},
      {id: "m-green", color: "#4ade80"},
      {id: "m-pink", color: "#f76fb0"}
    ])
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
    .force('link', d3.forceLink(allLinks)
      .id(d => d.id)
      .distance(d => d.isStructure ? 250 : 150)  // AUMENTADO
      .strength(0.3))
    .force('charge', d3.forceManyBody()
      .strength(-700)  // AUMENTADO DE -500
      .distanceMax(700))  // AUMENTADO DE 500
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide()
      .radius(d => d.size + 40)  // AUMENTADO DE 25
      .strength(0.85))
    .alphaDecay(0.02)
    .velocityDecay(0.5);
  
  // ENLACES
  const link = g.selectAll("line.link")
    .data(allLinks)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", d => {
      if (d.type === "flujo") return "#2fd4c8";
      if (d.type === "conflicto") return "#f76fb0";
      return "#4ade80";
    })
    .attr("stroke-width", d => d.isStructure ? 2.5 : 1.5)
    .attr("stroke-dasharray", d => {
      if (d.isStructure) return "6,3";
      if (d.type === "conflicto") return "3,3";
      return "0";
    })
    .attr("opacity", d => d.isStructure ? 0.6 : 0.4)
    .attr("marker-end", d => {
      if (d.type === "flujo") return "url(#m-teal)";
      if (d.type === "conflicto") return "url(#m-pink)";
      return "url(#m-green)";
    })
    .attr("cursor", "pointer")
    .style("pointer-events", "stroke")
    .on("click", function(event, d) {
      const sourceName = typeof d.source === 'object' ? d.source.label : d.source;
      const targetName = typeof d.target === 'object' ? d.target.label : d.target;
      alert(`Conexión: ${sourceName} → ${targetName}\nTipo: ${d.type}`);
    });
  
  // NODOS CON GLOW
  const nodeGroup = g.selectAll("g.node-group")
    .data(allNodes)
    .enter()
    .append("g")
    .attr("class", "node-group")
    .style("cursor", "pointer")
    .on("click", function(event, d) {
      selectNodeForConnection(d.id);
      d3.select(this).select("circle.node").transition().duration(300)
        .attr("r", d => d.size * 1.3)
        .transition().duration(300)
        .attr("r", d => d.size);
    })
    .call(drag(simulation));
  
  // Círculo de glow (fondo)
  nodeGroup.append("circle")
    .attr("class", "node-glow")
    .attr("r", d => d.size + 30)  // AUMENTADO DE 15
    .attr("fill", d => d.color)
    .attr("opacity", 0.25)  // AUMENTADO DE 0.2
    .attr("filter", (d, i) => {
      const colors = ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"];
      const idx = colors.indexOf(d.color);
      return `url(#glow-${idx})`;
    });
  
  // Círculo principal
  nodeGroup.append("circle")
    .attr("class", "node")
    .attr("r", d => d.size)
    .attr("fill", d => d.color)
    .attr("opacity", 0.9)
    .attr("stroke", d => d.color)
    .attr("stroke-width", 3)
    .attr("filter", (d, i) => {
      const colors = ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"];
      const idx = colors.indexOf(d.color);
      return `url(#glow-${idx})`;
    })
    .style("cursor", "move");
  
  // ICONOS
  nodeGroup.append("text")
    .attr("class", "node-icon")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("dy", "-15")
    .attr("font-size", d => d.size * 1.4)  // AUMENTADO DE 1.2
    .attr("font-family", "'Font Awesome 6 Free'")
    .attr("font-weight", "400")
    .attr("fill", "#fff")
    .attr("pointer-events", "none")
    .text(d => iconMap[d.icon] || "●");
  
  // ETIQUETAS
  nodeGroup.append("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("dy", d => d.size + 30)  // AUMENTADO DE 20
    .attr("font-size", d => d.type === "structure" ? 14 : 12)  // AUMENTADO DE 12/11
    .attr("font-weight", 700)
    .attr("fill", "#fff")
    .attr("pointer-events", "none")
    .text(d => d.label)
    .style("text-shadow", "0 2px 8px rgba(0,0,0,0.8)");
  
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    nodeGroup
      .attr('transform', d => `translate(${Math.max(100, Math.min(width - 100, d.x))},${Math.max(100, Math.min(height - 100, d.y))})`);
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

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}

function updateStats() {
  document.getElementById('countStructures').textContent = state.selectedStructures.size;
  document.getElementById('countComponents').textContent = state.selectedComponents.size;
  
  const subtitle = state.selectedStructures.size === 0 
    ? 'Selecciona estructuras →'
    : `${state.selectedStructures.size} estructura(s) | ${state.selectedComponents.size} componentes`;
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

// FUNCIONES PARA PANEL DE CONEXIÓN
let selectedNode1 = null;
let selectedNode2 = null;

function selectNodeForConnection(nodeId) {
  if (!selectedNode1) {
    selectedNode1 = nodeId;
    console.log('Nodo 1 seleccionado:', nodeId);
  } else if (!selectedNode2 && nodeId !== selectedNode1) {
    selectedNode2 = nodeId;
    console.log('Nodo 2 seleccionado:', nodeId);
    showConnectionPanel(selectedNode1, selectedNode2);
  }
}

function showConnectionPanel(node1Id, node2Id) {
  const node1 = allNodes.find(n => n.id === node1Id);
  const node2 = allNodes.find(n => n.id === node2Id);
  
  if (node1 && node2) {
    const info = document.getElementById('connectionInfo');
    info.textContent = `Conectando: "${node1.label}" → "${node2.label}"`;
    
    document.getElementById('connectionPanel').style.display = 'block';
    document.querySelector('input[name="convention"]').checked = false;
  }
}

function updatePreview() {
  const selected = document.querySelector('input[name="convention"]:checked');
  if (selected) {
    console.log('Convención seleccionada:', selected.value);
  }
}

function confirmConnection() {
  const selected = document.querySelector('input[name="convention"]:checked');
  if (!selected) {
    alert('⚠️ Selecciona una convención');
    return;
  }
  
  if (!selectedNode1 || !selectedNode2) {
    alert('⚠️ Error: nodos no seleccionados');
    return;
  }
  
  const typeMap = {
    'dirigida': 'flujo',
    'nodirigida': 'bidirectional',
    'fuerte': 'fuerte',
    'conflicto': 'conflicto'
  };
  
  const node1 = allNodes.find(n => n.id === selectedNode1);
  const node2 = allNodes.find(n => n.id === selectedNode2);
  
  const newLink = {
    source: selectedNode1,
    target: selectedNode2,
    type: typeMap[selected.value],
    isStructure: false,
    isManual: true
  };
  
  allLinks.push(newLink);
  console.log('✅ Conexión creada:', newLink);
  
  const msg = `✅ Conexión creada:\n"${node1.label}" → "${node2.label}"\n\nTipo: ${selected.value}`;
  alert(msg);
  
  closeConnection();
  initNetwork();
}

function closeConnection() {
  document.getElementById('connectionPanel').style.display = 'none';
  selectedNode1 = null;
  selectedNode2 = null;
  const radios = document.querySelectorAll('input[name="convention"]');
  radios.forEach(r => r.checked = false);
}
