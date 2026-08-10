/* RED POT - VERSIÓN FUNCIONAL SIMPLIFICADA */

const STRUCTURES = {
  EEP: { name: "Ecológica Principal", color: "#2fd4c8" },
  EFC: { name: "Funcional y del Cuidado", color: "#5b8def" },
  ESECI: { name: "Socioeconómica, Creativa e Innovación", color: "#ef9552" },
  EIP: { name: "Integradora de Patrimonios", color: "#a276f2" }
};

let allData = null;
let activeStructures = { EEP: true, EFC: true, ESECI: true, EIP: true };
let viewMode = "single";
let currentStructure = "EEP";
let simulation = null;

// ========== DATA ==========
function initData() {
  allData = {
    EEP: {
      conceptos: [
        { id: "rios", name: "Ríos", x: 330, y: 360 },
        { id: "quebradas", name: "Quebradas", x: 290, y: 280 },
        { id: "humedales", name: "Humedales", x: 520, y: 450 },
        { id: "bosques", name: "Bosques Urbanos", x: 300, y: 440 },
        { id: "vegetacion", name: "Coberturas vegetales", x: 360, y: 560 },
        { id: "parques", name: "Parques ecológicos", x: 660, y: 270 },
        { id: "cerros", name: "Cerros Orientales", x: 680, y: 200 },
        { id: "areas_protegidas", name: "Áreas protegidas", x: 610, y: 360 },
        { id: "resiliencia", name: "Áreas resiliencia", x: 620, y: 420 },
        { id: "paramos", name: "Complejos páramos", x: 730, y: 360 },
        { id: "conectores", name: "Conectores", x: 430, y: 300 }
      ],
      relaciones: [
        { source: "quebradas", target: "rios", type: "Directa" },
        { source: "rios", target: "humedales", type: "Directa" },
        { source: "humedales", target: "resiliencia", type: "Resiliencia" },
        { source: "conectores", target: "bosques", type: "Directa" },
        { source: "conectores", target: "parques", type: "Directa" },
        { source: "conectores", target: "vegetacion", type: "Soporte" }
      ]
    },
    EFC: {
      conceptos: [
        { id: "vivienda", name: "Vivienda", x: 520, y: 450 },
        { id: "ciclorrutas", name: "Ciclorrutas", x: 290, y: 360 },
        { id: "transporte", name: "Transporte público", x: 340, y: 480 },
        { id: "servicios", name: "Servicios de cuidado", x: 520, y: 300 },
        { id: "equipamientos", name: "Equipamientos", x: 700, y: 310 },
        { id: "manzanas", name: "Manzanas del Cuidado", x: 520, y: 550 },
        { id: "parques2", name: "Parques", x: 410, y: 580 },
        { id: "conectores2", name: "Conectores verdes", x: 370, y: 380 }
      ],
      relaciones: [
        { source: "vivienda", target: "equipamientos", type: "Directa" },
        { source: "manzanas", target: "servicios", type: "Directa" },
        { source: "transporte", target: "ciclorrutas", type: "Soporte" },
        { source: "conectores2", target: "parques2", type: "Directa" }
      ]
    },
    ESECI: {
      conceptos: [
        { id: "distrito", name: "Distrito Centro Tecnológico", x: 200, y: 350 },
        { id: "servicios", name: "Servicios empresariales", x: 400, y: 300 },
        { id: "educacion", name: "Sistema de educación", x: 400, y: 450 },
        { id: "industrias", name: "Zonas industriales", x: 600, y: 400 },
        { id: "plazas", name: "Plazas de mercado", x: 600, y: 500 },
        { id: "abastecimiento", name: "Centros abastecimiento", x: 500, y: 550 },
        { id: "turistico", name: "Zonas turísticas", x: 300, y: 550 },
        { id: "financieros", name: "Centros financieros", x: 700, y: 350 }
      ],
      relaciones: [
        { source: "distrito", target: "servicios", type: "Directa" },
        { source: "distrito", target: "educacion", type: "Directa" },
        { source: "educacion", target: "servicios", type: "Directa" },
        { source: "educacion", target: "industrias", type: "Directa" },
        { source: "industrias", target: "servicios", type: "Directa" },
        { source: "industrias", target: "plazas", type: "Directa" },
        { source: "plazas", target: "abastecimiento", type: "Directa" },
        { source: "turistico", target: "plazas", type: "Directa" },
        { source: "financieros", target: "servicios", type: "Directa" }
      ]
    },
    EIP: {
      conceptos: [
        { id: "patrimonio_material", name: "Patrimonio material", x: 350, y: 400 },
        { id: "patrimonio_inmaterial", name: "Patrimonio inmaterial", x: 550, y: 350 },
        { id: "patrimonio_natural", name: "Patrimonio natural", x: 450, y: 500 },
        { id: "patrimonio_arqueologico", name: "Patrimonio arqueológico", x: 250, y: 450 },
        { id: "sitios_sagrados", name: "Sitios Sagrados", x: 650, y: 450 }
      ],
      relaciones: [
        { source: "patrimonio_material", target: "patrimonio_inmaterial", type: "Soporte" },
        { source: "patrimonio_material", target: "patrimonio_natural", type: "Soporte" },
        { source: "patrimonio_inmaterial", target: "patrimonio_natural", type: "Soporte" },
        { source: "patrimonio_arqueologico", target: "patrimonio_natural", type: "Resiliencia" },
        { source: "patrimonio_arqueologico", target: "patrimonio_material", type: "Soporte" },
        { source: "sitios_sagrados", target: "patrimonio_inmaterial", type: "Soporte" }
      ]
    }
  };
}

// ========== RENDER ==========
function renderNetwork() {
  const svg = d3.select("#networkViz");
  svg.selectAll("*").remove();

  const struct = currentStructure;
  const data = allData[struct];
  
  if (!data) return;

  // Preparar nodos y aristas
  const nodes = data.conceptos.map(c => ({
    id: c.id,
    name: c.name,
    x: c.x,
    y: c.y,
    vx: 0,
    vy: 0
  }));

  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  
  const edges = data.relaciones.map(r => ({
    source: nodeMap.get(r.source),
    target: nodeMap.get(r.target),
    type: r.type
  })).filter(e => e.source && e.target);

  // Crear simulación
  simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(edges).distance(120).strength(0.2))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(700, 400))
    .force("collision", d3.forceCollide(50));

  // Aristas
  const links = svg.append("g")
    .selectAll("line")
    .data(edges)
    .join("line")
    .attr("stroke", d => d.type === "Directa" ? "#ffffff" : d.type === "Soporte" ? "#ef9552" : "#4ade80")
    .attr("stroke-width", 2)
    .attr("opacity", 0.6);

  // Nodos
  const nodeGroups = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .call(drag(simulation));

  nodeGroups.append("circle")
    .attr("r", 35)
    .attr("fill", STRUCTURES[struct].color)
    .attr("opacity", 0.15)
    .attr("stroke", STRUCTURES[struct].color)
    .attr("stroke-width", 1.5);

  nodeGroups.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.3em")
    .attr("fill", "#e7eaf2")
    .attr("font-size", "10px")
    .attr("pointer-events", "none")
    .text(d => d.name)
    .style("word-wrap", "break-word");

  // Actualizar en cada tick
  simulation.on("tick", () => {
    links
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    nodeGroups
      .attr("transform", d => `translate(${d.x},${d.y})`);
  });

  console.log(`✓ Renderizado ${struct}: ${nodes.length} nodos, ${edges.length} aristas`);
}

// ========== DRAG ==========
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

// ========== CONTROLES ==========
function setViewMode(mode) {
  viewMode = mode;
  document.querySelectorAll(".control-btn").forEach(b => b.classList.remove("active"));
  event.currentTarget.classList.add("active");
  renderNetwork();
}

function toggleStructure(struct) {
  activeStructures[struct] = !activeStructures[struct];
  const input = document.getElementById(`toggle-${struct.toLowerCase()}`);
  if (input) input.checked = activeStructures[struct];
  
  if (currentStructure === struct && !activeStructures[struct]) {
    const next = Object.keys(activeStructures).find(s => activeStructures[s]);
    if (next) {
      currentStructure = next;
      renderNetwork();
    }
  } else if (activeStructures[struct]) {
    currentStructure = struct;
    renderNetwork();
  }
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  initData();
  renderNetwork();

  // Toggle listeners
  document.querySelectorAll(".structure-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const struct = e.target.id.replace("toggle-", "").toUpperCase();
      toggleStructure(struct);
    });
  });

  // Close panel
  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);

  // Legend
  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const type = e.target.closest(".legend-item").dataset.type;
      const display = e.target.checked ? "block" : "none";
      d3.selectAll("line").style("display", d => 
        (d.type === type) ? display : null
      );
    });
  });
});
