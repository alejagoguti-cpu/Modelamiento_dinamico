/**
 * RAPOT MODULE 01 - INTERACTIVE CONCEPTUAL NETWORK
 * Advanced SVG network visualization with physics simulation, drag interactions,
 * and multi-click logic (single/double/triple click).
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const XHTML_NS = 'http://www.w3.org/1999/xhtml';

// ============================================================================
// DATA STRUCTURES
// ============================================================================

const NODES = [
    {
        id: 'pcm',
        name: 'PATRIMONIO\nCULTURAL\nMATERIAL',
        icon: 'fa-gem',
        color: '#2fd4c8',
        cx: 735,
        cy: 110,
        r: 64,
    },
    {
        id: 'pcim',
        name: 'PATRIMONIO\nCULTURAL\nINMATERIAL',
        icon: 'fa-music',
        color: '#a276f2',
        cx: 320,
        cy: 340,
        r: 60,
    },
    {
        id: 'pn',
        name: 'PATRIMONIO\nNATURAL',
        icon: 'fa-leaf',
        color: '#4ade80',
        cx: 1100,
        cy: 340,
        r: 60,
    },
    {
        id: 'pa',
        name: 'PATRIMONIO\nARQUEOLÓGICO',
        icon: 'fa-landmark',
        color: '#ef9552',
        cx: 580,
        cy: 610,
        r: 56,
    },
    {
        id: 'sss',
        name: 'SISTEMA DE\nSITIOS\nSAGRADOS',
        icon: 'fa-om',
        color: '#f5c945',
        cx: 150,
        cy: 620,
        r: 56,
    },
    {
        id: 'eip',
        name: 'EIP —\nESTRUCTURA\nECOLÓGICA\nPRINCIPAL',
        icon: 'fa-tree',
        color: '#5b8def',
        cx: 1330,
        cy: 130,
        r: 60,
    },
];

const EDGES = [
    // Soporte edges (green)
    { source: 'pcm', target: 'pcim', type: 'soporte', directa: true, esEip: false, description: 'El patrimonio material articula con el inmaterial', page: 'p. 177', text: 'La cultura se expresa en formas tangibles e intangibles' },
    { source: 'pcm', target: 'pn', type: 'soporte', directa: true, esEip: false, description: 'El patrimonio cultural se relaciona con el natural', page: 'p. 177', text: 'Ambos patrimonios coexisten en el territorio' },
    { source: 'pcm', target: 'pa', type: 'soporte', directa: true, esEip: false, description: 'El patrimonio material incluye lo arqueológico', page: 'p. 169', text: 'Lo arqueológico es parte del patrimonio material' },
    { source: 'pcim', target: 'sss', type: 'soporte', directa: true, esEip: false, description: 'La cultura inmaterial vincula con sitios sagrados', page: 'p. 171', text: 'Los sitios sagrados son expresión de cultura inmaterial' },
    { source: 'pn', target: 'eip', type: 'soporte', directa: true, esEip: true, description: 'El patrimonio natural articula con la EIP', page: 'p. 169', text: 'La EIP es el soporte ecológico del patrimonio natural' },
    { source: 'pa', target: 'sss', type: 'soporte', directa: true, esEip: false, description: 'Lo arqueológico conecta con sitios sagrados', page: 'p. 171', text: 'Los sitios arqueológicos tienen valor sagrado' },
    { source: 'sss', target: 'eip', type: 'soporte', directa: true, esEip: true, description: 'Los sitios sagrados dependen de la EIP', page: 'p. 169', text: 'La naturaleza es el contexto de lo sagrado' },
    // Resiliencia edges (pink)
    { source: 'pcm', target: 'eip', type: 'resiliencia', directa: true, esEip: true, description: 'El patrimonio material requiere resiliencia ecológica', page: 'p. 177', text: 'La conservación material depende del ecosistema' },
    { source: 'pcim', target: 'pn', type: 'resiliencia', directa: true, esEip: false, description: 'La cultura inmaterial necesita naturaleza resiliente', page: 'p. 177', text: 'La biodiversidad sostiene prácticas culturales' },
];

// ============================================================================
// GLOBAL STATE
// ============================================================================

let svg = null;
let svgDefs = null;
let edgesLayer = null;
let nodesLayer = null;

let nodeStates = {};
let edgeStates = {};
let spotlightState = null;
let filterMode = 'todos';
let selectedEdgeIndex = null;

// Physics simulation
const PHYSICS = {
    spring: 0.045,
    anchor: 0.02,
    damping: 0.82,
};

let nodePositions = {};
let nodeVelocities = {};

// Click timer for multi-click detection
let clickTimers = {};
const CLICK_THRESHOLD = 320;

// ============================================================================
// INITIALIZATION
// ============================================================================

function renderNetwork() {
    svg = document.getElementById('network-svg');
    svgDefs = document.getElementById('svg-defs');
    edgesLayer = document.getElementById('edges-layer');
    nodesLayer = document.getElementById('nodes-layer');

    // Initialize node states
    NODES.forEach(node => {
        nodeStates[node.id] = { off: false, focusDim: false, focusActive: false };
        nodePositions[node.id] = { x: node.cx, y: node.cy };
        nodeVelocities[node.id] = { x: 0, y: 0 };
    });

    // Initialize edge states
    EDGES.forEach((edge, idx) => {
        edgeStates[idx] = { off: false, focusDim: false, selected: false };
    });

    // Build SVG infrastructure
    buildDefs();
    drawEdges();
    drawNodes();
    populateRelationsTable();

    // Attach event handlers
    attachFilterHandlers();
    attachInsightHandlers();
    attachEdgeInfoHandlers();
    attachTableHandlers();

    // Start physics simulation
    startPhysicsLoop();
}

// ============================================================================
// SVG DEFS - FILTERS & MARKERS
// ============================================================================

function buildDefs() {
    // Clear existing defs
    svgDefs.innerHTML = '';

    // Create glow filters for each unique node color
    const uniqueColors = new Set(NODES.map(n => n.color));
    uniqueColors.forEach(color => {
        const filterId = `glow-${color.replace('#', '')}`;
        const filter = document.createElementNS(SVG_NS, 'filter');
        filter.setAttribute('id', filterId);
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');

        const feGaussianBlur = document.createElementNS(SVG_NS, 'feGaussianBlur');
        feGaussianBlur.setAttribute('in', 'SourceGraphic');
        feGaussianBlur.setAttribute('stdDeviation', '4.5');

        const feMerge = document.createElementNS(SVG_NS, 'feMerge');
        const feMergeNode1 = document.createElementNS(SVG_NS, 'feMergeNode');
        feMergeNode1.setAttribute('in', 'SourceGraphic');
        const feMergeNode2 = document.createElementNS(SVG_NS, 'feMergeNode');
        feMergeNode2.setAttribute('in', 'SourceGraphic');

        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);

        filter.appendChild(feGaussianBlur);
        filter.appendChild(feMerge);
        svgDefs.appendChild(filter);
    });

    // Create arrow markers for edge types
    const edgeTypes = ['soporte', 'resiliencia'];
    const edgeColors = { soporte: '#4ade80', resiliencia: '#f76fb0' };

    edgeTypes.forEach(type => {
        const markerId = `arrow-${type}`;
        const color = edgeColors[type];

        const marker = document.createElementNS(SVG_NS, 'marker');
        marker.setAttribute('id', markerId);
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '10');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3');
        marker.setAttribute('orient', 'auto-start-reverse');

        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', 'M0,0 L0,6 L9,3 z');
        path.setAttribute('fill', color);

        marker.appendChild(path);
        svgDefs.appendChild(marker);
    });
}

// ============================================================================
// DRAW EDGES
// ============================================================================

function drawEdges() {
    edgesLayer.innerHTML = '';

    EDGES.forEach((edge, idx) => {
        const sourceNode = NODES.find(n => n.id === edge.source);
        const targetNode = NODES.find(n => n.id === edge.target);

        const edgeColor = edge.type === 'soporte' ? '#4ade80' : '#f76fb0';
        const baseWidth = edge.type === 'soporte' ? 2.2 : 1.5;
        const finalWidth = edge.esEip ? baseWidth * 0.8 : baseWidth;
        const finalOpacity = edge.esEip ? 0.45 : 0.9;

        // Calculate arrow padding
        const startPad = sourceNode.r + 2;
        const endPad = targetNode.r + 8;

        // Calculate direction vector
        const dx = targetNode.cx - sourceNode.cx;
        const dy = targetNode.cy - sourceNode.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / dist;
        const uy = dy / dist;

        // Calculate start and end points
        const x1 = sourceNode.cx + ux * startPad;
        const y1 = sourceNode.cy + uy * startPad;
        const x2 = targetNode.cx - ux * endPad;
        const y2 = targetNode.cy - uy * endPad;

        const pathData = `M${x1},${y1} L${x2},${y2}`;

        // Create edge group
        const edgeGroup = document.createElementNS(SVG_NS, 'g');
        edgeGroup.classList.add('edge-group');
        edgeGroup.setAttribute('data-edge-index', idx);
        edgeGroup.setAttribute('data-edge-type', edge.type);
        edgeGroup.style.setProperty('--edge-color', edgeColor);
        edgeGroup.style.setProperty('--edge-base-width', `${baseWidth}px`);

        // Visual path (visible)
        const visualPath = document.createElementNS(SVG_NS, 'path');
        visualPath.classList.add('ods-edge', 'edge-visual');
        visualPath.setAttribute('d', pathData);
        visualPath.setAttribute('stroke', edgeColor);
        visualPath.setAttribute('stroke-width', finalWidth);
        visualPath.setAttribute('marker-end', `url(#arrow-${edge.type})`);
        visualPath.setAttribute('opacity', finalOpacity);

        // Hit path (invisible, wide for clicking)
        const hitPath = document.createElementNS(SVG_NS, 'path');
        hitPath.classList.add('ods-edge', 'edge-hit');
        hitPath.setAttribute('d', pathData);

        edgeGroup.appendChild(hitPath);
        edgeGroup.appendChild(visualPath);

        // Attach click handler
        edgeGroup.addEventListener('click', (e) => {
            e.stopPropagation();
            showEdgeInfo(idx);
        });

        edgesLayer.appendChild(edgeGroup);
    });
}

// ============================================================================
// DRAW NODES
// ============================================================================

function drawNodes() {
    nodesLayer.innerHTML = '';

    NODES.forEach(node => {
        const nodeGroup = document.createElementNS(SVG_NS, 'g');
        nodeGroup.classList.add('ods-node');
        nodeGroup.setAttribute('data-node-id', node.id);

        // Node ring (circle background)
        const ring = document.createElementNS(SVG_NS, 'circle');
        ring.classList.add('node-ring');
        ring.setAttribute('cx', node.cx);
        ring.setAttribute('cy', node.cy);
        ring.setAttribute('r', node.r);
        ring.setAttribute('fill', 'rgba(8, 11, 18, 0.75)');
        ring.setAttribute('stroke', node.color);
        ring.setAttribute('stroke-width', '2.5');
        ring.setAttribute('filter', `url(#glow-${node.color.replace('#', '')})`);

        // Node inner content (foreignObject with icon + text)
        const innerSize = node.r * 2.2;
        const innerX = node.cx - innerSize / 2;
        const innerY = node.cy - innerSize / 2;

        const foreignObject = document.createElementNS(SVG_NS, 'foreignObject');
        foreignObject.classList.add('node-inner');
        foreignObject.setAttribute('x', innerX);
        foreignObject.setAttribute('y', innerY);
        foreignObject.setAttribute('width', innerSize);
        foreignObject.setAttribute('height', innerSize);
        foreignObject.setAttribute('overflow', 'visible');

        // Create HTML container for icon + text
        const container = document.createElement('div');
        container.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            gap: 4px;
        `;

        // Icon
        const iconSize = node.r * 0.4;
        const icon = document.createElement('i');
        icon.className = `fas ${node.icon}`;
        icon.style.cssText = `
            font-size: ${iconSize}px;
            color: ${node.color};
            line-height: 1;
        `;

        // Text
        const textSize = node.r * 0.15;
        const text = document.createElement('div');
        text.textContent = node.name;
        text.style.cssText = `
            font-family: 'Space Grotesk', sans-serif;
            font-size: ${Math.max(textSize, 8)}px;
            font-weight: 600;
            color: #e7eaf2;
            text-align: center;
            line-height: 1.15;
            white-space: pre-line;
            word-wrap: break-word;
        `;

        container.appendChild(icon);
        container.appendChild(text);
        foreignObject.appendChild(container);

        nodeGroup.appendChild(ring);
        nodeGroup.appendChild(foreignObject);

        // Attach event handlers
        attachNodeDragHandler(nodeGroup, node);
        attachNodeClickHandler(nodeGroup, node);

        nodesLayer.appendChild(nodeGroup);
    });
}

// ============================================================================
// NODE INTERACTIONS - DRAG
// ============================================================================

function attachNodeDragHandler(nodeGroup, node) {
    let isDragging = false;
    let startX, startY;

    nodeGroup.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        nodeGroup.classList.add('dragging');
        nodeGroup.style.cursor = 'grabbing';

        const onPointerMove = (moveEvent) => {
            if (!isDragging) return;

            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            nodePositions[node.id].x += deltaX;
            nodePositions[node.id].y += deltaY;

            startX = moveEvent.clientX;
            startY = moveEvent.clientY;

            updateNodePosition(nodeGroup, node);
            updateEdgesForNode(node);
        };

        const onPointerUp = () => {
            isDragging = false;
            nodeGroup.classList.remove('dragging');
            nodeGroup.style.cursor = 'grab';
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
        };

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    });
}

function updateNodePosition(nodeGroup, node) {
    const pos = nodePositions[node.id];
    const ring = nodeGroup.querySelector('.node-ring');
    const inner = nodeGroup.querySelector('.node-inner');

    ring.setAttribute('cx', pos.x);
    ring.setAttribute('cy', pos.y);

    const innerSize = node.r * 2.2;
    inner.setAttribute('x', pos.x - innerSize / 2);
    inner.setAttribute('y', pos.y - innerSize / 2);
}

function updateEdgesForNode(node) {
    EDGES.forEach((edge, idx) => {
        if (edge.source === node.id || edge.target === node.id) {
            const edgeGroup = edgesLayer.querySelector(`[data-edge-index="${idx}"]`);
            if (edgeGroup) {
                updateEdgePath(edgeGroup, edge);
            }
        }
    });
}

function updateEdgePath(edgeGroup, edge) {
    const sourceNode = NODES.find(n => n.id === edge.source);
    const targetNode = NODES.find(n => n.id === edge.target);
    const sourcePos = nodePositions[edge.source];
    const targetPos = nodePositions[edge.target];

    const dx = targetPos.x - sourcePos.x;
    const dy = targetPos.y - sourcePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / dist;
    const uy = dy / dist;

    const startPad = sourceNode.r + 2;
    const endPad = targetNode.r + 8;

    const x1 = sourcePos.x + ux * startPad;
    const y1 = sourcePos.y + uy * startPad;
    const x2 = targetPos.x - ux * endPad;
    const y2 = targetPos.y - uy * endPad;

    const pathData = `M${x1},${y1} L${x2},${y2}`;

    const visualPath = edgeGroup.querySelector('.edge-visual');
    const hitPath = edgeGroup.querySelector('.edge-hit');

    visualPath.setAttribute('d', pathData);
    hitPath.setAttribute('d', pathData);
}

// ============================================================================
// NODE INTERACTIONS - CLICK
// ============================================================================

function attachNodeClickHandler(nodeGroup, node) {
    nodeGroup.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!clickTimers[node.id]) {
            clickTimers[node.id] = { count: 0, timeout: null };
        }

        const timer = clickTimers[node.id];
        timer.count++;

        clearTimeout(timer.timeout);

        if (timer.count === 1) {
            timer.timeout = setTimeout(() => {
                // Single click - do nothing or show tooltip
                timer.count = 0;
            }, CLICK_THRESHOLD);
        } else if (timer.count === 2) {
            // Double click - toggle node visibility
            toggleNodeVisibility(node);
            timer.count = 0;
        } else if (timer.count === 3) {
            // Triple click - isolate flow
            isolateNodeFlow(node);
            timer.count = 0;
        }
    });
}

function toggleNodeVisibility(node) {
    nodeStates[node.id].off = !nodeStates[node.id].off;
    const nodeGroup = nodesLayer.querySelector(`[data-node-id="${node.id}"]`);

    if (nodeStates[node.id].off) {
        nodeGroup.classList.add('node-off');
    } else {
        nodeGroup.classList.remove('node-off');
    }

    updateEdgeVisibility();
}

function isolateNodeFlow(node) {
    // Reset all states
    NODES.forEach(n => {
        nodeStates[n.id].focusDim = false;
        nodeStates[n.id].focusActive = false;
    });

    EDGES.forEach((_, idx) => {
        edgeStates[idx].focusDim = false;
    });

    // Set focus on selected node and its connected edges
    nodeStates[node.id].focusActive = true;

    const connectedEdges = EDGES.map((edge, idx) => {
        if (edge.source === node.id || edge.target === node.id) {
            return idx;
        }
        return null;
    }).filter(idx => idx !== null);

    connectedEdges.forEach(idx => {
        edgeStates[idx].focusDim = false;
    });

    // Dim all other edges
    EDGES.forEach((_, idx) => {
        if (!connectedEdges.includes(idx)) {
            edgeStates[idx].focusDim = true;
        }
    });

    applySpotlightState();
}

// ============================================================================
// SPOTLIGHT & FOCUS STATES
// ============================================================================

function applySpotlightState() {
    NODES.forEach(node => {
        const nodeGroup = nodesLayer.querySelector(`[data-node-id="${node.id}"]`);
        if (!nodeGroup) return;

        nodeGroup.classList.remove('node-focus-dim', 'node-focus-active');

        if (nodeStates[node.id].focusActive) {
            nodeGroup.classList.add('node-focus-active');
        } else if (nodeStates[node.id].focusDim) {
            nodeGroup.classList.add('node-focus-dim');
        }
    });

    EDGES.forEach((_, idx) => {
        const edgeGroup = edgesLayer.querySelector(`[data-edge-index="${idx}"]`);
        if (!edgeGroup) return;

        edgeGroup.classList.remove('edge-focus-dim');

        if (edgeStates[idx].focusDim) {
            edgeGroup.classList.add('edge-focus-dim');
        }
    });
}

// ============================================================================
// EDGE VISIBILITY & FILTERING
// ============================================================================

function updateEdgeVisibility() {
    EDGES.forEach((edge, idx) => {
        const edgeGroup = edgesLayer.querySelector(`[data-edge-index="${idx}"]`);
        if (!edgeGroup) return;

        const sourceOff = nodeStates[edge.source].off;
        const targetOff = nodeStates[edge.target].off;
        const typeOff = filterMode !== 'todos' && edge.type !== filterMode;

        if (sourceOff || targetOff || typeOff) {
            edgeGroup.classList.add('hidden-edge');
        } else {
            edgeGroup.classList.remove('hidden-edge');
        }
    });
}

// ============================================================================
// EDGE INFO PANEL
// ============================================================================

function showEdgeInfo(idx) {
    selectedEdgeIndex = idx;
    const edge = EDGES[idx];
    const panel = document.getElementById('edge-info-panel');

    const title = edge.source.toUpperCase() + ' → ' + edge.target.toUpperCase();
    const badge = edge.type === 'soporte' ? 'Soporte' : 'Resiliencia';
    const badgeColor = edge.type === 'soporte' ? '#4ade80' : '#f76fb0';

    document.getElementById('edge-title').textContent = title;
    document.getElementById('edge-description').textContent = edge.description;
    document.getElementById('edge-page').textContent = edge.page;
    document.getElementById('edge-text').textContent = `"${edge.text}"`;

    const badgeEl = document.getElementById('edge-type-badge');
    badgeEl.textContent = badge;
    badgeEl.style.color = badgeColor;
    badgeEl.style.borderColor = badgeColor;

    panel.classList.add('active');

    // Highlight edge
    edgeStates[idx].selected = true;
    const edgeGroup = edgesLayer.querySelector(`[data-edge-index="${idx}"]`);
    if (edgeGroup) {
        edgeGroup.classList.add('edge-selected');
    }

    // Highlight table row
    const tableRows = document.querySelectorAll('.matrix-table tbody tr');
    tableRows.forEach(row => row.classList.remove('highlight'));
    if (tableRows[idx]) {
        tableRows[idx].classList.add('highlight');
    }
}

function hideEdgeInfo() {
    const panel = document.getElementById('edge-info-panel');
    panel.classList.remove('active');

    if (selectedEdgeIndex !== null) {
        edgeStates[selectedEdgeIndex].selected = false;
        const edgeGroup = edgesLayer.querySelector(`[data-edge-index="${selectedEdgeIndex}"]`);
        if (edgeGroup) {
            edgeGroup.classList.remove('edge-selected');
        }
        selectedEdgeIndex = null;
    }

    const tableRows = document.querySelectorAll('.matrix-table tbody tr');
    tableRows.forEach(row => row.classList.remove('highlight'));
}

// ============================================================================
// FILTER BUTTONS
// ============================================================================

function attachFilterHandlers() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterMode = btn.getAttribute('data-filter');
            updateEdgeVisibility();
        });
    });
}

// ============================================================================
// INSIGHT CARDS
// ============================================================================

function attachInsightHandlers() {
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach(card => {
        card.addEventListener('click', () => {
            const insight = card.getAttribute('data-insight');
            toggleInsight(insight);
        });
    });
}

function toggleInsight(key) {
    // Reset all states
    NODES.forEach(n => {
        nodeStates[n.id].focusDim = false;
        nodeStates[n.id].focusActive = false;
    });

    EDGES.forEach((_, idx) => {
        edgeStates[idx].focusDim = false;
    });

    if (key === 'all') {
        // Show all - no spotlight
        applySpotlightState();
        return;
    }

    if (key === 'soporte') {
        // Highlight soporte edges
        EDGES.forEach((edge, idx) => {
            if (edge.type !== 'soporte') {
                edgeStates[idx].focusDim = true;
            }
        });
    } else if (key === 'resiliencia') {
        // Highlight resiliencia edges
        EDGES.forEach((edge, idx) => {
            if (edge.type !== 'resiliencia') {
                edgeStates[idx].focusDim = true;
            }
        });
    } else if (key === 'hubs') {
        // Highlight hub nodes (most connected)
        const connectionCount = {};
        NODES.forEach(n => {
            connectionCount[n.id] = EDGES.filter(e => e.source === n.id || e.target === n.id).length;
        });

        const maxConnections = Math.max(...Object.values(connectionCount));
        const hubs = Object.keys(connectionCount).filter(id => connectionCount[id] === maxConnections);

        NODES.forEach(n => {
            if (!hubs.includes(n.id)) {
                nodeStates[n.id].focusDim = true;
            }
        });

        EDGES.forEach((edge, idx) => {
            if (!hubs.includes(edge.source) && !hubs.includes(edge.target)) {
                edgeStates[idx].focusDim = true;
            }
        });
    } else if (key === 'directas') {
        // All edges are directa, so no special filtering
        // Just show all edges normally
    }

    applySpotlightState();
}

// ============================================================================
// RELATIONS TABLE
// ============================================================================

function populateRelationsTable() {
    const tbody = document.getElementById('matrix-tbody');
    tbody.innerHTML = '';

    EDGES.forEach((edge, idx) => {
        const row = document.createElement('tr');
        row.setAttribute('data-edge-index', idx);

        const sourceNode = NODES.find(n => n.id === edge.source);
        const targetNode = NODES.find(n => n.id === edge.target);

        const swatchClass = edge.type === 'soporte' ? 'swatch-soporte' : 'swatch-resiliencia';

        row.innerHTML = `
            <td>${sourceNode.name.replace(/\n/g, ' ')}</td>
            <td>${targetNode.name.replace(/\n/g, ' ')}</td>
            <td><span class="${swatchClass}"></span>${edge.type}</td>
            <td>${edge.description}</td>
        `;

        row.addEventListener('click', () => {
            showEdgeInfo(idx);
        });

        tbody.appendChild(row);
    });
}

function attachTableHandlers() {
    const toggleBtn = document.getElementById('toggle-table-btn');
    const tableContent = document.getElementById('table-content');

    toggleBtn.addEventListener('click', () => {
        tableContent.classList.toggle('hidden');
        toggleBtn.classList.toggle('collapsed');
    });
}

// ============================================================================
// EDGE INFO PANEL HANDLERS
// ============================================================================

function attachEdgeInfoHandlers() {
    const closeBtn = document.getElementById('close-edge-info');
    closeBtn.addEventListener('click', hideEdgeInfo);
}

// ============================================================================
// PHYSICS SIMULATION
// ============================================================================

function startPhysicsLoop() {
    function simulate() {
        // Apply spring forces between connected nodes
        EDGES.forEach(edge => {
            const sourcePos = nodePositions[edge.source];
            const targetPos = nodePositions[edge.target];
            const sourceVel = nodeVelocities[edge.source];
            const targetVel = nodeVelocities[edge.target];

            const dx = targetPos.x - sourcePos.x;
            const dy = targetPos.y - sourcePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0) {
                const force = PHYSICS.spring * (dist - 200);
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;

                sourceVel.x += fx;
                sourceVel.y += fy;
                targetVel.x -= fx;
                targetVel.y -= fy;
            }
        });

        // Apply anchor forces (keep nodes near original positions)
        NODES.forEach(node => {
            const pos = nodePositions[node.id];
            const vel = nodeVelocities[node.id];

            const dx = node.cx - pos.x;
            const dy = node.cy - pos.y;

            vel.x += dx * PHYSICS.anchor;
            vel.y += dy * PHYSICS.anchor;
        });

        // Apply damping and update positions
        NODES.forEach(node => {
            const pos = nodePositions[node.id];
            const vel = nodeVelocities[node.id];

            vel.x *= PHYSICS.damping;
            vel.y *= PHYSICS.damping;

            pos.x += vel.x;
            pos.y += vel.y;

            // Update SVG
            const nodeGroup = nodesLayer.querySelector(`[data-node-id="${node.id}"]`);
            if (nodeGroup) {
                updateNodePosition(nodeGroup, node);
                updateEdgesForNode(node);
            }
        });

        requestAnimationFrame(simulate);
    }

    simulate();
}

// ============================================================================
// ENTRY POINT
// ============================================================================

document.addEventListener('DOMContentLoaded', renderNetwork);
