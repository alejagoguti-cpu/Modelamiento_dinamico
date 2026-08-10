/* ========================================================
   RED POT BOGOTÁ: 4 ESTRUCTURAS INTERACTIVAS CON ANIMACIONES
   - EEP: Estructura Ecológica Principal (Teal #2fd4c8)
   - EFC: Estructura Funcional y del Cuidado (Azul #5b8def)
   - ESECI: Estructura Socioeconómica, Creativa e Innovación (Naranja #ef9552)
   - EIP: Estructura Integradora de Patrimonios (Púrpura #a276f2)
   ======================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";

const STRUCTURES = {
  EEP: { name: "Ecológica Principal", color: "#2fd4c8", icon: "fa-leaf" },
  EFC: { name: "Funcional y del Cuidado", color: "#5b8def", icon: "fa-home" },
  ESECI: { name: "Socioeconómica, Creativa e Innovación", color: "#ef9552", icon: "fa-handshake" },
  EIP: { name: "Integradora de Patrimonios", color: "#a276f2", icon: "fa-crown" }
};

let allData = null;
let activeStructures = { EEP: true, EFC: true, ESECI: true, EIP: true };
let viewMode = "single";
let currentStructure = "EEP";
let simulation = null;
let selectedEdge = null;
let typeOff = new Set();
let isAnimating = false;

const RELATION_STYLE = {
  "Directa": { color: "#ffffff", width: 2, dash: "" },
  "Soporte": { color: "#ef9552", width: 1.8, dash: "" },
  "Resiliencia": { color: "#4ade80", width: 1.8, dash: "" }
};

// ========== CARGAR DATA ==========
async function loadData() {
  allData = {
    EEP: {
      name: "Estructura Ecológica Principal",
      color: "#2fd4c8",
      icon: "fa-leaf",
      conceptos: [
        { id: "rios", name: "Ríos", icon: "fa-water", x: 330, y: 360 },
        { id: "quebradas", name: "Quebradas", icon: "fa-water", x: 290, y: 280 },
        { id: "humedales", name: "Humedales", icon: "fa-droplet", x: 520, y: 450 },
        { id: "bosques", name: "Bosques Urbanos", icon: "fa-tree", x: 300, y: 440 },
        { id: "vegetacion", name: "Coberturas vegetales", icon: "fa-leaf", x: 360, y: 560 },
        { id: "parques_montaña", name: "Parques ecológicos", icon: "fa-mountain", x: 660, y: 270 },
        { id: "cerros", name: "Cerros Orientales", icon: "fa-mountain", x: 680, y: 200 },
        { id: "areas_protegidas", name: "Áreas protegidas", icon: "fa-shield", x: 610, y: 360 },
        { id: "resiliencia", name: "Áreas resiliencia climática", icon: "fa-leaf", x: 620, y: 420 },
        { id: "complejos_paramos", name: "Complejos páramos", icon: "fa-mountain", x: 730, y: 360 },
        { id: "conectores", name: "Conectores ecosistémicos", icon: "fa-arrows-spin", x: 430, y: 300 }
      ],
      relaciones: [
        { source: "quebradas", target: "rios", type: "Directa", sustento: "Las quebradas alimentan los ríos principales" },
        { source: "rios", target: "humedales", type: "Directa", sustento: "Los ríos conectan con humedales" },
        { source: "humedales", target: "resiliencia", type: "Resiliencia", sustento: "Humedales para mitigación climática" },
        { source: "conectores", target: "bosques", type: "Directa", sustento: "Conectores articulan bosques urbanos" },
        { source: "conectores", target: "parques_montaña", type: "Directa", sustento: "Conectores hacia parques de montaña" },
        { source: "conectores", target: "vegetacion", type: "Soporte", sustento: "Conectores requieren coberturas vegetales" }
      ]
    },
    EFC: {
      name: "Estructura Funcional y del Cuidado",
      color: "#5b8def",
      icon: "fa-home",
      conceptos: [
        { id: "vivienda", name: "Vivienda", icon: "fa-home", x: 520, y: 450 },
        { id: "ciclorrutas", name: "Ciclorrutas", icon: "fa-person-biking", x: 290, y: 360 },
        { id: "transporte", name: "Transporte público", icon: "fa-bus", x: 340, y: 480 },
        { id: "servicios_cuidado", name: "Servicios de cuidado", icon: "fa-heart", x: 520, y: 300 },
        { id: "equipamientos", name: "Equipamientos", icon: "fa-building", x: 700, y: 310 },
        { id: "manzanas_cuidado", name: "Manzanas del Cuidado", icon: "fa-cubes", x: 520, y: 550 },
        { id: "parques", name: "Parques", icon: "fa-tree", x: 410, y: 580 },
        { id: "conectores_verdes", name: "Conectores verdes", icon: "fa-arrows-spin", x: 370, y: 380 },
        { id: "espacios_publicos", name: "Espacios públicos", icon: "fa-square", x: 560, y: 380 }
      ],
      relaciones: [
        { source: "vivienda", target: "equipamientos", type: "Directa", sustento: "Vivienda articulada con equipamientos" },
        { source: "manzanas_cuidado", target: "servicios_cuidado", type: "Directa", sustento: "Manzanas del cuidado integran servicios" },
        { source: "transporte", target: "ciclorrutas", type: "Soporte", sustento: "Transporte complementado con ciclorrutas" },
        { source: "conectores_verdes", target: "parques", type: "Directa", sustento: "Conectores articulan parques" }
      ]
    },
    ESECI: {
      name: "Estructura Socioeconómica, Creativa y de Innovación",
      color: "#ef9552",
      icon: "fa-handshake",
      conceptos: [
        { id: "servicios_emp", name: "Servicios empresariales", icon: "fa-briefcase", x: 240, y: 360 },
        { id: "plazas_mercado", name: "Plazas de mercado", icon: "fa-store", x: 410, y: 480 },
        { id: "educacion", name: "Sistema de educación", icon: "fa-book", x: 520, y: 550 },
        { id: "centros_financieros", name: "Centros financieros", icon: "fa-landmark", x: 440, y: 320 },
        { id: "centros_especialistas", name: "Centros de especialistas", icon: "fa-building", x: 680, y: 320 },
        { id: "zonas_turisticas", name: "Zonas turísticas", icon: "fa-map", x: 680, y: 560 },
        { id: "produccion_artesanal", name: "Producción artesanal", icon: "fa-gem", x: 380, y: 650 },
        { id: "industrias", name: "Industrias", icon: "fa-industry", x: 640, y: 450 }
      ],
      relaciones: [
        { source: "servicios_emp", target: "centros_financieros", type: "Directa", sustento: "Servicios en centros financieros" },
        { source: "plazas_mercado", target: "educacion", type: "Directa", sustento: "Plazas y espacios educativos integrados" },
        { source: "centros_especialistas", target: "industrias", type: "Directa", sustento: "Especialistas conectados con industrias" }
      ]
    },
    EIP: {
      name: "Estructura Integradora de Patrimonios",
      color: "#a276f2",
      icon: "fa-crown",
      conceptos: [
        { id: "patrimonio_natural", name: "Patrimonio Natural", icon: "fa-leaf", x: 350, y: 520 },
        { id: "patrimonio_arqueologico", name: "Patrimonio arqueológico", icon: "fa-gem", x: 310, y: 410 },
        { id: "patrimonio_inmaterial", name: "Patrimonio inmaterial", icon: "fa-book", x: 630, y: 360 },
        { id: "patrimonio_material", name: "Patrimonio material", icon: "fa-landmark", x: 540, y: 520 },
        { id: "sitios_sagrados", name: "Sitios sagrados", icon: "fa-church", x: 320, y: 390 },
        { id: "identidades", name: "Identidades", icon: "fa-people-group", x: 450, y: 330 }
      ],
      relaciones: [
        { source: "patrimonio_natural", target: "patrimonio_arqueologico", type: "Directa", sustento: "Patrimonio natural y arqueológico integrados" },
        { source: "patrimonio_arqueologico", target: "sitios_sagrados", type: "Soporte", sustento: "Sitios arqueológicos con significancia sagrada" },
        { source: "patrimonio_inmaterial", target: "identidades", type: "Directa", sustento: "Patrimonio inmaterial define identidades" }
      ]
    }
  };
  
  console.log("✓ Data cargada");
  renderNetwork();
}

// ========== RENDER NETWORK CON ANIMACIONES ==========
function renderNetwork() {
  if (isAnimating) return;
  isAnimating = true;

  const svg = d3.select("#networkViz");
  
  // FADE OUT de elementos existentes
  svg.selectAll("g.edge-group, g.pot-node")
    .transition()
    .duration(300)
    .style("opacity", 0)
    .on("end", () => {
      svg.selectAll("*").remove();
      buildNetwork(svg);
    });
    
  // Si no hay nada, simplemente construir
  if (svg.selectAll("g.pot-node").size() === 0) {
    buildNetwork(svg);
  }
}

function buildNetwork(svg) {
  const nodes = [];
  const edges = [];
  const nodeMap = new Map();

  const visibleStructures = Object.keys(activeStructures).filter(k => activeStructures[k]);

  if (viewMode === "single") {
    const struct = currentStructure;
    const data = allData[struct];
    
    if (data && data.conceptos) {
      data.conceptos.forEach(concept => {
        const id = `${struct}:${concept.id}`;
        const node = {
          id,
          label: concept.name,
          icon: concept.icon,
          x: concept.x || Math.random() * 800,
          y: concept.y || Math.random() * 600,
          structure: struct,
          color: STRUCTURES[struct].color
        };
        nodes.push(node);
        nodeMap.set(id, node);
      });

      if (data.relaciones) {
        data.relaciones.forEach(edge => {
          const source = `${struct}:${edge.source}`;
          const target = `${struct}:${edge.target}`;
          if (nodeMap.has(source) && nodeMap.has(target)) {
            edges.push({
              source: nodeMap.get(source),
              target: nodeMap.get(target),
              type: edge.type,
              sustento: edge.sustento
            });
          }
        });
      }
    }
  } else {
    visibleStructures.forEach(struct => {
      const data = allData[struct];
      if (!data || !data.conceptos) return;

      data.conceptos.forEach(concept => {
        const id = `${struct}:${concept.id}`;
        const node = {
          id,
          label: concept.name,
          icon: concept.icon,
          x: concept.x || Math.random() * 800,
          y: concept.y || Math.random() * 600,
          structure: struct,
          color: STRUCTURES[struct].color
        };
        nodes.push(node);
        nodeMap.set(id, node);
      });

      if (data.relaciones) {
        data.relaciones.forEach(edge => {
          const source = `${struct}:${edge.source}`;
          const target = `${struct}:${edge.target}`;
          if (nodeMap.has(source) && nodeMap.has(target)) {
            edges.push({
              source: nodeMap.get(source),
              target: nodeMap.get(target),
              type: edge.type,
              sustento: edge.sustento,
              structure: struct
            });
          }
        });
      }
    });
  }

  // Crear simulación
  simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(edges)
      .distance(120)
      .strength(0.2))
    .force("charge", d3.forceManyBody().strength(-250).distanceMax(300))
    .force("center", d3.forceCenter(700, 400))
    .force("collision", d3.forceCollide(50))
    .alphaDecay(0.05);

  // Dibujar aristas (inicialmente ocultas)
  const edgeGroups = svg.selectAll("g.edge-group")
    .data(edges, (d, i) => i)
    .join("g")
    .attr("class", "edge-group")
    .attr("data-index", (d, i) => i)
    .style("--edge-color", d => d.source.color)
    .style("opacity", 0);

  edgeGroups.append("line")
    .attr("class", "pot-edge")
    .attr("stroke", d => RELATION_STYLE[d.type]?.color || "#ffffff")
    .attr("stroke-width", d => RELATION_STYLE[d.type]?.width || 2)
    .attr("stroke-dasharray", d => RELATION_STYLE[d.type]?.dash ? "4,4" : "none")
    .attr("opacity", 0.6);

  edgeGroups.append("line")
    .attr("class", "pot-edge-hit")
    .on("click", (event, d) => showEdgeInfo(d));

  // Dibujar nodos (inicialmente ocultos)
  const nodeGroups = svg.selectAll("g.pot-node")
    .data(nodes, d => d.id)
    .join("g")
    .attr("class", "pot-node")
    .style("opacity", 0)
    .call(drag(simulation));

  nodeGroups.append("circle")
    .attr("class", "node-circle")
    .attr("r", 35)
    .attr("fill", d => d.color)
    .attr("opacity", 0.15)
    .attr("stroke", d => d.color)
    .attr("stroke-width", 1.5)
    .on("dblclick", (event, d) => toggleNode(d.id))
    .on("click", (event, d) => {
      event.stopPropagation();
      if (event.detail === 3) isolateNodeFlow(d.id);
    });

  nodeGroups.append("text")
    .attr("class", "node-icon")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.8em")
    .attr("font-size", "18px")
    .attr("pointer-events", "none")
    .attr("color", d => d.color)
    .html(d => `<i class="fas ${d.icon}"></i>`);

  nodeGroups.append("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dy", "0.4em")
    .attr("pointer-events", "none")
    .text(d => d.label);

  // Actualizar posiciones durante simulación
  simulation.on("tick", () => {
    edgeGroups.select("line.pot-edge")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    edgeGroups.select("line.pot-edge-hit")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    nodeGroups.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  // FADE IN suave (animación de entrada)
  edgeGroups
    .transition()
    .duration(500)
    .delay(200)
    .style("opacity", 1);

  nodeGroups
    .transition()
    .duration(500)
    .style("opacity", 1);

  setTimeout(() => { isAnimating = false; }, 700);
}

// ========== CONTROLES ==========
function setViewMode(mode) {
  viewMode = mode;
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");
  renderNetwork();
}

function toggleStructure(structure) {
  activeStructures[structure] = !activeStructures[structure];
  const input = document.getElementById(`toggle-${structure.toLowerCase()}`);
  if (input) input.checked = activeStructures[structure];
  
  const card = document.querySelector(`.structure-card[data-structure="${structure}"]`);
  if (card) {
    card.style.transition = "all 0.3s ease";
    card.style.opacity = activeStructures[structure] ? "1" : "0.5";
    card.style.transform = activeStructures[structure] ? "scale(1)" : "scale(0.95)";
  }
  
  if (viewMode === "unified") {
    renderNetwork();
  } else if (currentStructure === structure && !activeStructures[structure]) {
    const available = Object.keys(activeStructures).find(s => activeStructures[s]);
    if (available) {
      currentStructure = available;
      renderNetwork();
    }
  }
}

function showEdgeInfo(edge) {
  selectedEdge = edge;
  const panel = document.getElementById("edgeInfoPanel");
  const title = document.getElementById("edgeInfoTitle");
  const type = document.getElementById("edgeInfoType");
  const quote = document.getElementById("edgeInfoQuote");

  title.textContent = `${edge.source.label} → ${edge.target.label}`;
  type.textContent = edge.type;
  quote.textContent = `"${edge.sustento}"`;

  panel.classList.add("visible");
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  selectedEdge = null;
}

function toggleNode(nodeId) {
  const nodes = d3.selectAll(".pot-node");
  nodes.each(function(d) {
    if (d.id === nodeId) {
      d3.select(this).classed("node-off", !d3.select(this).classed("node-off"));
    }
  });
}

function isolateNodeFlow(nodeId) {
  console.log("Aislando flujo de:", nodeId);
}

// ========== DRAG BEHAVIOR ==========
function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

// ========== EVENT LISTENERS ==========
document.addEventListener("DOMContentLoaded", () => {
  loadData();

  document.querySelectorAll(".structure-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const struct = e.target.id.replace("toggle-", "").toUpperCase();
      toggleStructure(struct);
    });
  });

  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);

  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const type = e.target.closest(".legend-item").dataset.type;
      if (e.target.checked) {
        typeOff.delete(type);
      } else {
        typeOff.add(type);
      }
      d3.selectAll(".edge-group").style("display", (d) => {
        return typeOff.has(d.type) ? "none" : "block";
      });
    });
  });
});
