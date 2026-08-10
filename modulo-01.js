// Módulo 01: Construir la Red - Sistema Integrado RAPOT (EEP + EFS + ESE + EIP + Integración)
// Visualizador dinámico de las 4 estructuras y su articulación sistémica

const STRUCTURES = {
    eep: {
        id: "eep",
        name: "Estructura Ecológica Principal",
        color: "#2fd4c8",
        icon: "fa-mountain",
        nodes: [
            { id: "cerros", name: "Cerros\nOrientales", icon: "fa-mountain", color: "#2fd4c8", x: 200, y: 150, r: 52 },
            { id: "rios", name: "Ríos y\nQuebradas", icon: "fa-water", color: "#2fd4c8", x: 400, y: 150, r: 52 },
            { id: "humedales", name: "Humedales", icon: "fa-feather", color: "#2fd4c8", x: 300, y: 280, r: 48 },
            { id: "resiliencia", name: "Áreas Resiliencia\nClimática", icon: "fa-shield-alt", color: "#2fd4c8", x: 150, y: 350, r: 50 },
            { id: "paramos", name: "Complejos\nde Páramos", icon: "fa-snowflake", color: "#2fd4c8", x: 550, y: 100, r: 48 },
            { id: "vegetal", name: "Coberturas\nVegetales", icon: "fa-tree", color: "#2fd4c8", x: 450, y: 380, r: 50 },
            { id: "bosques", name: "Bosques\nUrbanos", icon: "fa-tree", color: "#2fd4c8", x: 600, y: 300, r: 48 },
            { id: "reservas", name: "Reservas\nForestales", icon: "fa-leaf", color: "#2fd4c8", x: 250, y: 500, r: 48 },
            { id: "parques_mont", name: "Parques\nEcológicos", icon: "fa-park", color: "#2fd4c8", x: 500, y: 500, r: 48 },
            { id: "areas_prot", name: "Áreas\nProtegidas", icon: "fa-shield", color: "#2fd4c8", x: 350, y: 600, r: 48 },
            { id: "paisajes", name: "Paisajes\nSostenibles", icon: "fa-globe", color: "#2fd4c8", x: 650, y: 600, r: 48 },
            { id: "parques_borde", name: "Parques de\nBorde", icon: "fa-tree", color: "#2fd4c8", x: 100, y: 450, r: 48 },
            { id: "rondas", name: "Rondas\nHídricas", icon: "fa-water", color: "#2fd4c8", x: 750, y: 450, r: 48 },
            { id: "conectores", name: "Conectores\nEcológicos", icon: "fa-link", color: "#2fd4c8", x: 400, y: 650, r: 48 }
        ],
        edges: [
            { source: "cerros", target: "rios", type: "soporte", page: "ART. 34" },
            { source: "rios", target: "humedales", type: "soporte", page: "ART. 35" },
            { source: "humedales", target: "resiliencia", type: "resiliencia", page: "ART. 38" },
            { source: "rios", target: "paramos", type: "soporte", page: "ART. 32" },
            { source: "vegetal", target: "resiliencia", type: "resiliencia", page: "ART. 40" },
            { source: "cerros", target: "vegetal", type: "indirecta", page: "ART. 42" },
            { source: "humedales", target: "vegetal", type: "indirecta", page: "ART. 45" },
            { source: "bosques", target: "vegetal", type: "soporte", page: "ART. 46" },
            { source: "reservas", target: "vegetal", type: "soporte", page: "ART. 47" },
            { source: "areas_prot", target: "parques_mont", type: "indirecta", page: "ART. 48" },
            { source: "paisajes", target: "conectores", type: "soporte", page: "ART. 50" },
            { source: "parques_borde", target: "rondas", type: "soporte", page: "ART. 52" },
            { source: "rios", target: "rondas", type: "soporte", page: "ART. 53" }
        ]
    },
    efs: {
        id: "efs",
        name: "Estructura Funcional y del Cuidado",
        color: "#f76fb0",
        icon: "fa-network-wired",
        nodes: [
            { id: "red_vial", name: "Red Vial\nEstructurante", icon: "fa-road", color: "#f76fb0", x: 400, y: 150, r: 56 },
            { id: "transporte", name: "Transporte\nPúblico", icon: "fa-bus", color: "#f76fb0", x: 650, y: 150, r: 52 },
            { id: "corredores", name: "Corredores\nVerdes", icon: "fa-leaf", color: "#f76fb0", x: 400, y: 350, r: 52 },
            { id: "ciclorrutas", name: "Red de\nCiclorrutas", icon: "fa-bicycle", color: "#f76fb0", x: 650, y: 350, r: 48 },
            { id: "manzanas", name: "Manzanas del\nCuidado", icon: "fa-hands-helping", color: "#f76fb0", x: 850, y: 450, r: 60 },
            { id: "servicios", name: "Servicios del\nCuidado", icon: "fa-heartbeat", color: "#f76fb0", x: 1050, y: 450, r: 52 },
            { id: "equipamientos", name: "Equipamientos\nSociales", icon: "fa-building", color: "#f76fb0", x: 850, y: 200, r: 54 },
            { id: "vivienda", name: "Vivienda y\nHábitat", icon: "fa-home", color: "#f76fb0", x: 1100, y: 250, r: 50 },
            { id: "servicios_publicos", name: "Servicios\nPúblicos", icon: "fa-bolt", color: "#f76fb0", x: 1200, y: 450, r: 48 },
            { id: "educacion", name: "Equipamientos\nEducativos", icon: "fa-graduation-cap", color: "#f76fb0", x: 300, y: 500, r: 48 },
            { id: "salud", name: "Equipamientos\nde Salud", icon: "fa-hospital", color: "#f76fb0", x: 600, y: 600, r: 48 },
            { id: "recreacion", name: "Espacios de\nRecreación", icon: "fa-child", color: "#f76fb0", x: 950, y: 600, r: 48 },
            { id: "mercados", name: "Plazas de\nMercado", icon: "fa-store", color: "#f76fb0", x: 200, y: 650, r: 48 },
            { id: "parques", name: "Parques\nUrbanos", icon: "fa-tree", color: "#f76fb0", x: 1100, y: 650, r: 48 }
        ],
        edges: [
            { source: "red_vial", target: "transporte", type: "soporte", page: "ART. 78" },
            { source: "red_vial", target: "equipamientos", type: "soporte", page: "ART. 79" },
            { source: "corredores", target: "transporte", type: "soporte", page: "ART. 85" },
            { source: "corredores", target: "ciclorrutas", type: "soporte", page: "ART. 86" },
            { source: "manzanas", target: "servicios", type: "soporte", page: "ART. 220" },
            { source: "manzanas", target: "equipamientos", type: "soporte", page: "ART. 221" },
            { source: "equipamientos", target: "vivienda", type: "soporte", page: "ART. 230" },
            { source: "vivienda", target: "servicios_publicos", type: "indirecta", page: "ART. 240" },
            { source: "vivienda", target: "ciclorrutas", type: "indirecta", page: "ART. 245" },
            { source: "vivienda", target: "transporte", type: "indirecta", page: "ART. 246" },
            { source: "educacion", target: "equipamientos", type: "soporte", page: "ART. 250" },
            { source: "salud", target: "manzanas", type: "soporte", page: "ART. 255" },
            { source: "recreacion", target: "parques", type: "soporte", page: "ART. 260" }
        ]
    },
    ese: {
        id: "ese",
        name: "Estructura Socioeconómica, Creativa y de Innovación",
        color: "#f5c945",
        icon: "fa-chart-line",
        nodes: [
            { id: "financiero", name: "Centros\nFinancieros", icon: "fa-chart-line", color: "#f5c945", x: 250, y: 150, r: 50 },
            { id: "empresarial", name: "Servicios\nEmpresariales", icon: "fa-briefcase", color: "#f5c945", x: 450, y: 200, r: 50 },
            { id: "tecnologia", name: "Distrito Centro\nTecnológico", icon: "fa-microchip", color: "#f5c945", x: 650, y: 150, r: 52 },
            { id: "abastecimiento", name: "Centros de\nAbastecimiento", icon: "fa-warehouse", color: "#f5c945", x: 350, y: 350, r: 48 },
            { id: "mercados_prod", name: "Plazas de\nMercado", icon: "fa-store", color: "#f5c945", x: 550, y: 400, r: 48 },
            { id: "industriales", name: "Zonas\nIndustriales", icon: "fa-industry", color: "#f5c945", x: 800, y: 300, r: 50 },
            { id: "artesanal", name: "Producción\nArtesanal", icon: "fa-hammer", color: "#f5c945", x: 950, y: 200, r: 48 },
            { id: "turismo", name: "Zonas de\nInterés Turístico", icon: "fa-camera", color: "#f5c945", x: 1050, y: 400, r: 50 },
            { id: "educacion_sup", name: "Sistema de\nEducación Superior", icon: "fa-graduation-cap", color: "#f5c945", x: 650, y: 500, r: 50 },
            { id: "investigacion", name: "Centros de\nInvestigación", icon: "fa-flask", color: "#f5c945", x: 450, y: 600, r: 48 }
        ],
        edges: [
            { source: "financiero", target: "empresarial", type: "soporte", page: "ART. 120" },
            { source: "empresarial", target: "tecnologia", type: "indirecta", page: "ART. 124" },
            { source: "abastecimiento", target: "mercados_prod", type: "soporte", page: "ART. 128" },
            { source: "mercados_prod", target: "empresarial", type: "soporte", page: "ART. 130" },
            { source: "industriales", target: "educacion_sup", type: "indirecta", page: "ART. 135" },
            { source: "industriales", target: "turismo", type: "soporte", page: "ART. 140" },
            { source: "artesanal", target: "turismo", type: "soporte", page: "ART. 145" },
            { source: "tecnologia", target: "investigacion", type: "soporte", page: "ART. 150" },
            { source: "educacion_sup", target: "investigacion", type: "soporte", page: "ART. 155" }
        ]
    },
    eip: {
        id: "eip",
        name: "Estructura Integradora de Patrimonios",
        color: "#a276f2",
        icon: "fa-landmark",
        nodes: [
            { id: "patrimonio_inmaterial", name: "Patrimonio\nInmaterial", icon: "fa-theater-masks", color: "#a276f2", x: 400, y: 150, r: 50 },
            { id: "patrimonio_material", name: "Patrimonio\nMaterial", icon: "fa-monument", color: "#a276f2", x: 650, y: 150, r: 50 },
            { id: "patrimonio_natural", name: "Patrimonio\nNatural", icon: "fa-leaf", color: "#a276f2", x: 525, y: 350, r: 48 },
            { id: "sitios_sagrados", name: "Sitios Sagrados\ny Arqueología", icon: "fa-landmark", color: "#a276f2", x: 300, y: 350, r: 48 },
            { id: "memoria_colectiva", name: "Memoria\nColectiva", icon: "fa-book", color: "#a276f2", x: 750, y: 350, r: 48 },
            { id: "expresiones_culturales", name: "Expresiones\nCulturales", icon: "fa-music", color: "#a276f2", x: 200, y: 500, r: 48 },
            { id: "saberes_ancestrales", name: "Saberes\nAnchestrales", icon: "fa-scroll", color: "#a276f2", x: 450, y: 550, r: 48 },
            { id: "espacios_identidad", name: "Espacios de\nIdentidad", icon: "fa-home", color: "#a276f2", x: 700, y: 500, r: 48 },
            { id: "biocultural", name: "Patrimonio\nBiocultural", icon: "fa-globe", color: "#a276f2", x: 850, y: 350, r: 48 },
            { id: "archivos_historicos", name: "Archivos\nHistóricos", icon: "fa-archive", color: "#a276f2", x: 550, y: 650, r: 48 }
        ],
        edges: [
            { source: "sitios_sagrados", target: "patrimonio_inmaterial", type: "resiliencia", page: "ART. 165" },
            { source: "patrimonio_material", target: "patrimonio_inmaterial", type: "soporte", page: "ART. 170" },
            { source: "patrimonio_natural", target: "patrimonio_inmaterial", type: "soporte", page: "ART. 175" },
            { source: "memoria_colectiva", target: "expresiones_culturales", type: "soporte", page: "ART. 180" },
            { source: "saberes_ancestrales", target: "patrimonio_inmaterial", type: "soporte", page: "ART. 185" },
            { source: "espacios_identidad", target: "patrimonio_material", type: "soporte", page: "ART. 190" },
            { source: "biocultural", target: "patrimonio_natural", type: "soporte", page: "ART. 195" },
            { source: "archivos_historicos", target: "memoria_colectiva", type: "soporte", page: "ART. 200" }
        ]
    },
    integracion: {
        id: "integracion",
        name: "Integración Sistémica de Estructuras",
        color: "#38bdf8",
        icon: "fa-project-diagram",
        nodes: [
            // EEP Hub
            { id: "hub_eep", name: "EEP", icon: "fa-mountain", color: "#2fd4c8", x: 200, y: 300, r: 70 },
            // EFS Hub
            { id: "hub_efs", name: "EFS", icon: "fa-network-wired", color: "#f76fb0", x: 600, y: 200, r: 70 },
            // ESE Hub
            { id: "hub_ese", name: "ESE", icon: "fa-chart-line", color: "#f5c945", x: 600, y: 600, r: 70 },
            // EIP Hub
            { id: "hub_eip", name: "EIP", icon: "fa-landmark", color: "#a276f2", x: 1000, y: 400, r: 70 },
            // Nodos de articulación
            { id: "conectividad", name: "Conectividad\nTerritorial", icon: "fa-link", color: "#38bdf8", x: 400, y: 450, r: 50 },
            { id: "sostenibilidad", name: "Sostenibilidad\nIntegral", icon: "fa-leaf", color: "#38bdf8", x: 700, y: 400, r: 50 },
            { id: "equidad", name: "Equidad\nTerritorial", icon: "fa-balance-scale", color: "#38bdf8", x: 800, y: 300, r: 50 },
            { id: "resiliencia_sistema", name: "Resiliencia\nSistémica", icon: "fa-shield-alt", color: "#38bdf8", x: 900, y: 550, r: 50 }
        ],
        edges: [
            { source: "hub_eep", target: "conectividad", type: "soporte", page: "INT. 01" },
            { source: "hub_efs", target: "conectividad", type: "soporte", page: "INT. 02" },
            { source: "hub_ese", target: "sostenibilidad", type: "soporte", page: "INT. 03" },
            { source: "hub_eip", target: "sostenibilidad", type: "soporte", page: "INT. 04" },
            { source: "conectividad", target: "sostenibilidad", type: "soporte", page: "INT. 05" },
            { source: "sostenibilidad", target: "equidad", type: "soporte", page: "INT. 06" },
            { source: "equidad", target: "resiliencia_sistema", type: "soporte", page: "INT. 07" },
            { source: "hub_eep", target: "hub_efs", type: "indirecta", page: "INT. 08" },
            { source: "hub_efs", target: "hub_ese", type: "indirecta", page: "INT. 09" },
            { source: "hub_ese", target: "hub_eip", type: "indirecta", page: "INT. 10" },
            { source: "hub_eip", target: "hub_eep", type: "indirecta", page: "INT. 11" }
        ]
    }
};

const EDGE_TYPES = {
    soporte: { label: "Relación de Soporte", color: "#4ade80", width: 2.5, arrow: true },
    resiliencia: { label: "Resiliencia Climática", color: "#2fd4c8", width: 2.5, arrow: true },
    indirecta: { label: "Relación Indirecta", color: "#a276f2", width: 1.8, arrow: false, dash: "6,4" }
};

let currentStructure = "eep";
let state = {
    nodes: [],
    edges: [],
    selectedEdge: null,
    disabledNodes: new Set(),
    activeTypes: new Set(Object.keys(EDGE_TYPES)),
    spotlightNodes: null
};

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    loadStructure("eep");
    setupStructureButtons();
    renderNetwork();
    updateStats();
}

function setupStructureButtons() {
    const buttons = document.querySelectorAll(".structure-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const structId = btn.getAttribute("data-structure");
            loadStructure(structId);
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

function loadStructure(structId) {
    currentStructure = structId;
    const struct = STRUCTURES[structId];
    state.nodes = JSON.parse(JSON.stringify(struct.nodes));
    state.edges = JSON.parse(JSON.stringify(struct.edges));
    state.disabledNodes.clear();
    state.spotlightNodes = null;
    renderNetwork();
    updateStats();
}

function updateStats() {
    const struct = STRUCTURES[currentStructure];
    const conceptCount = state.nodes.length;
    const relationCount = state.edges.length;
    const typeCount = new Set(state.edges.map(e => e.type)).size;
    
    document.getElementById("stat-concepts").textContent = conceptCount;
    document.getElementById("stat-relations").textContent = relationCount;
    document.getElementById("stat-sources").textContent = "POT";
    document.getElementById("stat-types").textContent = typeCount;
    document.getElementById("structure-title").textContent = struct.name;
    document.getElementById("structure-subtitle").textContent = `Nodos: ${conceptCount} // Relaciones: ${relationCount}`;
}

function renderNetwork() {
    const container = document.getElementById("network-container");
    if (!container) return;

    container.innerHTML = `
        <svg id="network-svg" viewBox="0 0 1470 780" preserveAspectRatio="xMidYMid meet">
            <defs>
                <marker id="arrow-soporte" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 10 5 L 0 8 z" fill="#4ade80"></path>
                </marker>
                <marker id="arrow-resiliencia" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 10 5 L 0 8 z" fill="#2fd4c8"></path>
                </marker>
                <marker id="arrow-indirecta" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 10 5 L 0 8 z" fill="#a276f2"></path>
                </marker>
            </defs>
            <g id="edges-layer"></g>
            <g id="nodes-layer"></g>
        </svg>
    `;

    drawEdges();
    drawNodes();
}

function drawEdges() {
    const layer = document.getElementById("edges-layer");
    if (!layer) return;
    layer.innerHTML = "";

    state.edges.forEach((edge, idx) => {
        const sourceNode = state.nodes.find(n => n.id === edge.source);
        const targetNode = state.nodes.find(n => n.id === edge.target);
        if (!sourceNode || !targetNode) return;

        const typeInfo = EDGE_TYPES[edge.type];
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "edge-group");
        g.setAttribute("data-type", edge.type);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", sourceNode.x);
        line.setAttribute("y1", sourceNode.y);
        line.setAttribute("x2", targetNode.x);
        line.setAttribute("y2", targetNode.y);
        line.setAttribute("stroke", typeInfo.color);
        line.setAttribute("stroke-width", typeInfo.width);
        if (typeInfo.dash) line.setAttribute("stroke-dasharray", typeInfo.dash);
        if (typeInfo.arrow) line.setAttribute("marker-end", `url(#arrow-${edge.type})`);

        g.appendChild(line);
        layer.appendChild(g);
    });
}

function drawNodes() {
    const layer = document.getElementById("nodes-layer");
    if (!layer) return;
    layer.innerHTML = "";

    state.nodes.forEach(node => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("id", `node-${node.id}`);
        g.setAttribute("class", "ods-node");
        g.setAttribute("transform", `translate(${node.x}, ${node.y})`);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", node.r);
        circle.setAttribute("fill", "#141b2d");
        circle.setAttribute("stroke", node.color);
        circle.setAttribute("stroke-width", "3");

        const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreign.setAttribute("x", -node.r);
        foreign.setAttribute("y", -node.r);
        foreign.setAttribute("width", node.r * 2);
        foreign.setAttribute("height", node.r * 2);
        foreign.style.pointerEvents = "none";

        const div = document.createElement("div");
        div.className = "node-content";
        div.innerHTML = `<i class="fas ${node.icon}" style="color: ${node.color};"></i><span>${node.name.replace(/\n/g, '<br>')}</span>`;
        foreign.appendChild(div);

        g.appendChild(circle);
        g.appendChild(foreign);
        layer.appendChild(g);
    });
}
