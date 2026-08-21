/* ==========================================================
   MÓDULO 09 — MODELO PROPIO — POT Bogotá
   "El modelo que el POT no corre": la tríada Personas →
   Viviendas → Ecosistemas como sistema complejo.

   Pilar de nodo:
   - persona      → rosa   (agentes de cuidado)
   - vivienda     → amarillo (soporte de habitabilidad)
   - ecosistema   → verde  (matriz ordenadora)

   Tipos de arista:
   - causal        → rosa continuo, con flecha
   - funcional     → morado continuo, con flecha
   - dependencia   → azul continuo, con flecha
   - retro         → amarillo punteado, doble flecha

   Interacción:
   - Clic en línea → panel con la relación, el tipo y el sustento
   - Doble clic en nodo → apagarlo
   - Triple clic en nodo → aislar su flujo
   - Tarjetas de insight: filtros por pilar y por retroalimentaciones
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";

/* -------- Nodos: los tres pilares -------- */
const TRI_NODES = [
  /* pilar personas */
  { id: "cuidadora",   cat: "persona", name: "CUIDADORAS\n(SIDICU)",        icon: "fa-people-group",    color: "#f76fb0", x: 735,  y: 600, r: 56 },
  { id: "informal",    cat: "persona", name: "ECONOMÍA\nINFORMAL",          icon: "fa-cart-shopping",   color: "#f76fb0", x: 330,  y: 430, r: 48 },
  { id: "peaton",      cat: "persona", name: "AGENTES\nPEATONES",           icon: "fa-person-walking",  color: "#f76fb0", x: 1120, y: 560, r: 48 },
  /* pilar viviendas */
  { id: "vivienda",    cat: "vivienda", name: "VIVIENDA\nVIS / VIP",        icon: "fa-house-chimney",   color: "#f5c945", x: 735,  y: 340, r: 56 },
  { id: "manzana",     cat: "vivienda", name: "LA MANZANA\n(Arts. 283/304)", icon: "fa-table-cells",   color: "#f5c945", x: 380,  y: 220, r: 48 },
  { id: "primerospisos", cat: "vivienda", name: "PRIMEROS PISOS\nACTIVOS (Art. 316)", icon: "fa-store", color: "#f5c945", x: 1090, y: 250, r: 48 },
  /* pilar ecosistemas */
  { id: "eep",         cat: "ecosistema", name: "EEP /\nECOSISTEMAS",       icon: "fa-leaf",            color: "#4ade80", x: 735,  y: 90,  r: 56 },
  { id: "andenes",     cat: "ecosistema", name: "ANDENES ARBORIZADOS\n(Art. 155)",      icon: "fa-tree",      color: "#4ade80", x: 380,  y: 90,  r: 48 },
  { id: "suds",        cat: "ecosistema", name: "SUDS +\nHUMEDALES (Art. 186)", icon: "fa-droplet",    color: "#4ade80", x: 1090, y: 90,  r: 48 },
];

TRI_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* -------- Tipos de arista -------- */
const TYPE_STYLE = {
  causal:      { color: "#f76fb0", width: 2.8, label: "Causal — produce o condiciona un resultado", arrow: true,  dash: null },
  funcional:   { color: "#a276f2", width: 2.6, label: "Funcional — opera y sostiene al otro", arrow: true,  dash: null },
  dependencia: { color: "#5b8def", width: 2.6, label: "Dependencia — no funciona sin el otro", arrow: true,  dash: null },
  retro:       { color: "#f5c945", width: 3.0, label: "Retroalimentación — el efecto vuelve a la causa", arrow: true,  dash: "5 5" },
};

/* -------- Aristas -------- */
const RAW_EDGES = [
  /* --- ciclo mayor: ecosistemas → viviendas → personas → ecosistemas --- */
  { s: "eep",       t: "vivienda",  type: "causal", directa: true, paginaTexto: "Art. 186 y Estructura Ecológica Principal (Arts. 58–82)", sustento: "El ecosistema produce los servicios de los que depende la vivienda: los Sistemas Urbanos de Drenaje Sostenible (SUDS) y los humedales absorben la escorrentía y evitan que el agua inunde los barrios. Sin ese servicio, la habitabilidad declarada del Art. 384 se vuelve inestable ante cada lluvia." },
  { s: "vivienda",  t: "cuidadora", type: "causal", directa: true, paginaTexto: "Art. 384 (36 m² VIS/VIP; 42 m² Par. 1) y Arts. 231–232 (SIDICU)", sustento: "La vivienda VIS/VIP sostiene el espacio de cuidado: un hogar con el estándar mínimo del Art. 384 condiciona directamente el tiempo de respiro, la fatiga y las trayectorias cotidianas de la persona cuidadora. El SIDICU se define por a quién sirve, y en el POT esa persona no tiene nodo: en este modelo, sí." },
  { s: "cuidadora", t: "eep",       type: "retro", directa: true, paginaTexto: "Retroalimentación: corresponsabilidad del cuidado y las áreas verdes", sustento: "Las personas cuidan el ecosistema: regulan el riesgo, mantienen las áreas verdes, apropian los parques y reportan su degradación. El efecto de la vivienda y las personas vuelve al ecosistema y lo reordena — un bucle que el POT declara (corresponsabilidad) pero nunca modela como proceso." },

  /* --- subciclos funcionales --- */
  { s: "andenes",   t: "peaton",   type: "causal", directa: true, paginaTexto: "Art. 155 (perfiles de andén y franjas) · Art. 154", sustento: "Los andenes con franjas de paisajismo arborizado reducen la fatiga y el estrés del peatón cuidador: el diseño del espacio público causa bienestar directamente sobre los agentes. Es el ejemplo más claro de cómo una norma física (perfil L-7/L-8, franja de paisajismo) se traduce en un efecto humano medible." },
  { s: "suds",      t: "vivienda", type: "causal", directa: true, paginaTexto: "Art. 186 (SUDS) y Anexo 3 (inventario de espacio público)", sustento: "Los SUDS protegen las viviendas de borde: drenaje sostenible en serie que intercepta la escorrentía antes de que alcance las casas. Sin los SUDS funcionando como red, la protección declarada a la vivienda se desactiva con la primera tormenta fuerte." },
  { s: "suds",      t: "peaton",   type: "causal", directa: true, paginaTexto: "Art. 186 · Anexo 3 (parques seguros de contingencia)", sustento: "Los humedales y los SUDS mantienen seguras las rutas peatonales durante eventos hídricos: cuando el drenaje absorbe el agua, el andén no se convierte en canal. La movilidad de las cuidadoras depende de un ecosistema que trabaja sin aparecer en su descripción." },
  { s: "peaton",    t: "vivienda", type: "retro", directa: true, paginaTexto: "Retroalimentación: habitar, caminar y cuidar en proximidad", sustento: "Los agentes peatonales habitan, caminan y cuidan en proximidad: sus decisiones de residencia, su presencia en el andén y su uso de los equipamientos retroalimentan la vivienda (seguridad, comercio, mantenimiento). La ciudad social sostiene la ciudad física y viceversa." },

  /* --- dependencias normativas --- */
  { s: "manzana",   t: "vivienda", type: "dependencia", directa: true, paginaTexto: "Arts. 283, 304 y 315 (reglas de manzana: IC 5.0/6.0/7.0, ≤1000 m², >70% antejardín)", sustento: "La vivienda no funciona sin la regla de la manzana: el índice de construcción 5.0/6.0/7.0 del Art. 304, el límite de 1000 m² del Art. 283 y los umbrales del Art. 315 son la maquinaria que produce (o bloquea) la forma urbana. Son reglas generativas, no categorías." },
  { s: "manzana",   t: "peaton",   type: "dependencia", directa: true, paginaTexto: "Arts. 283 y 304 (IC y norma de manzana) · Art. 316", sustento: "La manzana condiciona la vida peatonal: la escala, el perímetro y los índices deciden cuánto se camina, cuánto se ve y cuánto se tarda en llegar al equipamiento. Los 15 minutos de proximidad se juegan, en gran parte, en la geometría de la manzana." },
  { s: "primerospisos", t: "cuidadora", type: "dependencia", directa: true, paginaTexto: "Art. 316 (primeros pisos activos)", sustento: "Los primeros pisos activos reducen la necesidad de viajes metropolitanos de las cuidadoras: comercio y servicios de proximidad en el primer piso acortan las trayectorias y multiplican los paraderos del día. Sin ese uso, la ciudad de 30 minutos exige más desplazamientos que los que la norma declara." },
  { s: "primerospisos", t: "informal", type: "funcional", directa: true, paginaTexto: "Art. 316 · Arts. 499–505 (legalización de asentamientos)", sustento: "El primer piso activo comparte suelo con la economía informal: el vendedor informal y el comercio formal coexisten en la misma franja del andén (Arts. 146–147 regulan la conducta, pero cero menciones al 'vendedor' como actor). El modelo propio debe contarlos a ambos." },
  { s: "informal",  t: "peaton",   type: "funcional", directa: true, paginaTexto: "Arts. 146–147 · Art. 153 (postes no soterrados) · Art. 155", sustento: "La economía informal es a la vez motor de proximidad y obstáculo físico de la marcha: vendedores, andenes estrechos y postes no soterrados (Art. 153) aparecen en las ecuaciones del peatón como fuerzas de repulsión. El POT regula la conducta sin modelar el efecto." },

  /* --- retroalimentaciones ecosistémicas --- */
  { s: "eep",       t: "andenes",  type: "funcional", directa: true, paginaTexto: "Art. 155 (franjas de paisajismo arborizado)", sustento: "La EEP alimenta los andenes arborizados: los árboles urbanos (>1 millón en el SIGAU) no aparecen en el POT como nodos, solo como cobertura vegetal; en el modelo propio son agentes no humanos que mitigan fatiga y estrés peatonal." },
  { s: "eep",       t: "suds",     type: "funcional", directa: true, paginaTexto: "Art. 186 (SUDS en serie) · Arts. 60–65 (sistema hídrico)", sustento: "Los humedales y cauces de la EEP son la infraestructura natural de los SUDS: la escorrentía que el drenaje intercepta termina, tarde o temprano, en el humedal y en la cuenca. Ecosistema y drenaje son una sola red hídrica que el plan administra por separado." },
  { s: "andenes",   t: "suds",     type: "funcional", directa: true, paginaTexto: "Art. 186 · Anexo 3 (inventario de espacio público peatonal)", sustento: "El andén bien diseñado canaliza la escorrentía hacia los SUDS y los parques de recarga del Anexo 3: el espacio peatonal no es solo circulación, es parte del sistema de drenaje y seguridad ante inundaciones." },
];

RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

function nodeById(id) { return TRI_NODES.find(n => n.id === id); }

/* -------- defs -------- */
function buildDefs(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");
  const uniqueColors = [...new Set(TRI_NODES.map(n => n.color))];
  uniqueColors.forEach(color => {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "glow-" + color.replace("#", ""));
    filter.setAttribute("x", "-60%"); filter.setAttribute("y", "-60%");
    filter.setAttribute("width", "220%"); filter.setAttribute("height", "220%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3.2"); blur.setAttribute("result", "blur");
    const merge = document.createElementNS(SVG_NS, "feMerge");
    ["blur", "blur", "SourceGraphic"].forEach(ref => {
      const m = document.createElementNS(SVG_NS, "feMergeNode");
      m.setAttribute("in", ref);
      merge.appendChild(m);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });

  Object.entries(TYPE_STYLE).forEach(([type, style]) => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", "arrow-" + type);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8"); marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "7"); marker.setAttribute("markerHeight", "7");
    marker.setAttribute("orient", "auto-start-reverse");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", "M0,0 L10,5 L0,10 z");
    path.setAttribute("fill", style.color);
    marker.appendChild(path);
    defs.appendChild(marker);
  });

  svg.appendChild(defs);
}

function edgePathData(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const startPad = s.r + 2;
  const endPad = t.r + 8;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad,   y2 = t.y - uy * endPad;

  if (edge.curve) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const px = -uy, py = ux;
    const cx = mx + px * edge.curve, cy = my + py * edge.curve;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  }
  return `M${x1},${y1} L${x2},${y2}`;
}

/* -------- física -------- */
let rafId = null;
let dragging = null;
let dragOffsetX = 0, dragOffsetY = 0;
let moved = false;

function wakePhysics() {
  if (rafId) return;
  rafId = requestAnimationFrame(tick);
}

function tick() {
  rafId = null;
  let active = false;
  const k = 0.012;          /* resorte */
  const homeK = 0.006;      /* ancla */
  const damp = 0.82;

  RAW_EDGES.forEach(edge => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const dx = t.x - s.x, dy = t.y - s.y;
    const dist = Math.hypot(dx, dy) || 1;
    const force = (dist - edge.restLength) * k;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    s.vx += fx; s.vy += fy;
    t.vx -= fx; t.vy -= fy;
  });

  TRI_NODES.forEach(n => {
    if (n.fixed) return;
    n.vx += (n.homeX - n.x) * homeK;
    n.vy += (n.homeY - n.y) * homeK;
    n.vx *= damp; n.vy *= damp;
    n.x += n.vx; n.y += n.vy;
    if (Math.abs(n.vx) > 0.02 || Math.abs(n.vy) > 0.02) active = true;
  });

  updatePositions();

  if (active) wakePhysics();
}

function updatePositions() {
  TRI_NODES.forEach(n => {
    const group = document.querySelector(`.ods-node[data-id="${n.id}"]`);
    if (group) group.setAttribute("transform", `translate(${n.x},${n.y})`);
  });
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const line = document.querySelector(`.edge-hit[data-index="${i}"]`);
    const vis = document.querySelector(`.edge-vis[data-index="${i}"]`);
    if (!line) return;
    const d = edgePathData(edge, s, t);
    line.setAttribute("d", d);
    if (vis) vis.setAttribute("d", d);
  });
}

/* -------- dibujar -------- */
function renderNetwork() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg);
  drawEdges(svg);
  drawNodes(svg);
}

function drawEdges(svg) {
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("class", "edge-hit");
    hit.setAttribute("data-index", i);
    hit.setAttribute("fill", "none");
    hit.setAttribute("stroke", "transparent");
    hit.setAttribute("stroke-width", "14");
    hit.style.cursor = "pointer";

    const vis = document.createElementNS(SVG_NS, "path");
    vis.setAttribute("class", "edge-vis");
    vis.setAttribute("data-index", i);
    vis.setAttribute("fill", "none");
    vis.setAttribute("stroke", style.color);
    vis.setAttribute("stroke-width", style.width);
    vis.setAttribute("opacity", "0.75");
    if (style.dash) vis.setAttribute("stroke-dasharray", style.dash);
    if (style.arrow) vis.setAttribute("marker-end", `url(#arrow-${edge.type})`);

    group.appendChild(hit);
    group.appendChild(vis);
    svg.appendChild(group);

    hit.addEventListener("click", () => showEdgeInfo(i));
  });
  updatePositions();
}

function drawNodes(svg) {
  const catLabel = { persona: "AGENTE", vivienda: "SOPORTE", ecosistema: "MATRIZ" };
  TRI_NODES.forEach(n => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node ods-node-" + n.cat);
    group.setAttribute("data-id", n.id);
    group.setAttribute("data-cat", n.cat);
    group.setAttribute("transform", `translate(${n.x},${n.y})`);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("r", n.r);
    circle.setAttribute("fill", "#141b2d");
    circle.setAttribute("stroke", n.color);
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("filter", `url(#glow-${n.color.replace("#", "")})`);
    group.appendChild(circle);

    const nameLines = n.name.split("\n");
    nameLines.forEach((line, li) => {
      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("y", 8 + li * 16);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#e8ecf4");
      text.setAttribute("font-size", "11");
      text.setAttribute("font-weight", "700");
      text.setAttribute("font-family", "Space Grotesk, sans-serif");
      text.textContent = line;
      group.appendChild(text);
    });

    const catTag = document.createElementNS(SVG_NS, "text");
    catTag.setAttribute("y", 8 + nameLines.length * 16);
    catTag.setAttribute("text-anchor", "middle");
    catTag.setAttribute("fill", n.color);
    catTag.setAttribute("font-size", "9");
    catTag.setAttribute("font-weight", "600");
    catTag.textContent = catLabel[n.cat];
    group.appendChild(catTag);

    attachDragHandlers(group, n);
    attachNodeClickHandler(group, n.id);
    svg.appendChild(group);
  });
}

/* -------- arrastre -------- */
function attachDragHandlers(group, node) {
  group.style.cursor = "grab";

  function startDrag(e) {
    if (e.button && e.button !== 0) return;
    e.preventDefault();
    const pt = svgPoint(e);
    dragging = node;
    dragOffsetX = pt.x - node.x;
    dragOffsetY = pt.y - node.y;
    node.fixed = true;
    moved = false;
    group.classList.add("dragging");
    try { group.setPointerCapture(e.pointerId); } catch (err) {}
  }

  function onDrag(e) {
    if (dragging !== node) return;
    const pt = svgPoint(e);
    const newX = pt.x - dragOffsetX;
    const newY = pt.y - dragOffsetY;
    if (Math.hypot(newX - node.x, newY - node.y) > 2) moved = true;
    node.x = newX; node.y = newY;
    updatePositions();
  }

  function endDrag(e) {
    if (dragging !== node) return;
    dragging = null;
    node.fixed = false;
    group.classList.remove("dragging");
    try { group.releasePointerCapture(e.pointerId); } catch (err) {}
    wakePhysics();
    if (moved) {
      group.dataset.suppressClick = "1";
      setTimeout(() => { delete group.dataset.suppressClick; }, 0);
    }
  }

  group.addEventListener("pointerdown", startDrag);
  group.addEventListener("pointermove", onDrag);
  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
}

function svgPoint(e) {
  const svg = document.getElementById("networkViz");
  const pt = svg.createSVGPoint();
  pt.x = e.clientX; pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

/* -------- panel de sustento -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  const label = (n) => n.name.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = `${label(s)} → ${label(t)}`;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + (edge.directa ? " · Directa" : " · Inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent =
    edge.paginaTexto ? `Referencia POT: ${edge.paginaTexto}` : "Referencia: por confirmar";

  document.getElementById("edgeInfoPanel").classList.add("visible");

  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => {
    row.classList.toggle("row-highlight", Number(row.dataset.edge) === index);
  });
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.remove("row-highlight"));
}

/* -------- visibilidad -------- */
const typeOff = new Set();
const nodeOff = new Set();

function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type;
    const s = group.dataset.source;
    const t = group.dataset.target;
    const hidden = typeOff.has(type) || nodeOff.has(s) || nodeOff.has(t);
    group.classList.toggle("hidden-edge", hidden);
  });
}

function toggleNode(id) {
  const group = document.querySelector(`.ods-node[data-id="${id}"]`);
  if (!group) return;
  if (nodeOff.has(id)) {
    nodeOff.delete(id);
    group.classList.remove("node-off");
  } else {
    nodeOff.add(id);
    group.classList.add("node-off");
  }
  refreshEdgeVisibility();
}

function attachNodeClickHandler(group, id) {
  let count = 0;
  let timer = null;
  group.addEventListener("click", () => {
    if (group.dataset.suppressClick) return;
    count++;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (count === 2) {
        toggleNode(id);
      } else if (count >= 3) {
        toggleNodeFlow(id);
      }
      count = 0;
    }, 320);
  });
}

function toggleNodeFlow(id) {
  const isOn = !nodeOff.has(id);
  TRI_NODES.forEach(n => {
    const group = document.querySelector(`.ods-node[data-id="${n.id}"]`);
    if (!group) return;
    const connected = RAW_EDGES.some(e => e.s === id && e.t === n.id) ||
                      RAW_EDGES.some(e => e.t === id && e.s === n.id);
    if (n.id === id) {
      if (isOn) { nodeOff.add(n.id); group.classList.add("node-off"); }
    } else if (isOn) {
      if (connected) { nodeOff.delete(n.id); group.classList.remove("node-off"); }
      else { nodeOff.add(n.id); group.classList.add("node-off"); }
    }
  });
  refreshEdgeVisibility();
}

/* -------- spotlight -------- */
let spotlight = null;

function clearSpotlight() {
  spotlight = null;
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function setSpotlightTypes(types) {
  spotlight = { mode: "types", types };
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function setSpotlightCats(cats, keepAllNodes) {
  spotlight = { mode: "cats", cats, keepAllNodes: !!keepAllNodes };
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function applySpotlightState() {
  if (!spotlight) {
    document.querySelectorAll(".edge-group").forEach(g => g.classList.remove("edge-focus-dim"));
    document.querySelectorAll(".ods-node").forEach(g => g.classList.remove("edge-focus-dim"));
    return;
  }

  if (spotlight.mode === "cats") {
    const visibleEdges = new Set();
    const visibleNodes = new Set();
    TRI_NODES.forEach(n => {
      if (spotlight.cats.has(n.cat)) visibleNodes.add(n.id);
    });
    RAW_EDGES.forEach((edge, i) => {
      const sCat = nodeById(edge.s)?.cat, tCat = nodeById(edge.t)?.cat;
      if (spotlight.cats.has(sCat) && spotlight.cats.has(tCat)) visibleEdges.add(i);
    });
    document.querySelectorAll(".edge-group").forEach((g, i) => {
      g.classList.toggle("edge-focus-dim", !visibleEdges.has(i));
    });
    if (spotlight.keepAllNodes) {
      document.querySelectorAll(".ods-node").forEach(g => g.classList.remove("edge-focus-dim"));
    } else {
      document.querySelectorAll(".ods-node").forEach(g => {
        g.classList.toggle("edge-focus-dim", !visibleNodes.has(g.dataset.id));
      });
    }
    return;
  }

  if (spotlight.mode === "types") {
    document.querySelectorAll(".edge-group").forEach(g => {
      g.classList.toggle("edge-focus-dim", !spotlight.types.includes(g.dataset.type));
    });
    document.querySelectorAll(".ods-node").forEach(g => g.classList.remove("edge-focus-dim"));
    return;
  }
}

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;
  if (spotlight && card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  const groups = {
    personas: { cats: new Set(["persona"]), keepAll: true },
    viviendas: { cats: new Set(["vivienda"]), keepAll: true },
    ecosistemas: { cats: new Set(["ecosistema"]), keepAll: true },
    retro: { types: ["retro"] },
    todos: null,
  };
  const g = groups[key];
  if (!g) {
    setSpotlightTypes(["causal", "funcional", "dependencia", "retro"]);
    setSpotlightCats(new Set(["persona", "vivienda", "ecosistema"]), true);
  } else if (g.cats) {
    setSpotlightCats(g.cats, g.keepAll);
  } else if (g.types) {
    setSpotlightTypes(g.types);
  }

  card.classList.add("active");
}

/* -------- leyenda -------- */
function setupLegendToggle() {
  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const type = item.dataset.type;
      if (e.target.checked) typeOff.delete(type); else typeOff.add(type);
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });

  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
}

/* -------- filtros -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  const btns = [...document.querySelectorAll(".network-controls .control-btn")];
  const btn = btns.find(b => b.textContent.trim().toLowerCase().startsWith(mode === "all" ? "todos" : TYPE_STYLE[mode].label.slice(0, 7).toLowerCase()));
  (btn || btns[0]).classList.add("active");

  const groups = {
    all: ["causal", "funcional", "dependencia", "retro"],
    causal: ["causal"],
    funcional: ["funcional"],
    dependencia: ["dependencia"],
    retro: ["retro"],
  };
  const activeTypes = groups[mode] || groups.all;

  document.querySelectorAll(".legend-item[data-type]").forEach(item => {
    const type = item.dataset.type;
    const input = item.querySelector("input");
    const show = activeTypes.includes(type);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) typeOff.delete(type); else typeOff.add(type);
  });
  refreshEdgeVisibility();
}

/* -------- las tres fuerzas -------- */
const FUERZAS = [
  { titulo: "F₁ — Atracción de proximidad", texto: "La cuidadora se dirige al nodo de cuidado o equipamiento ancla dentro de su radio de 15 minutos (Anexo 4: ámbitos integrales de cuidado). Es la fuerza que convierte el 'derecho a la ciudad de proximidad' en un vector físico de movimiento cotidiano.", icon: "fa-magnet" },
  { titulo: "F₂ — Evitación de colisiones", texto: "Repulsión respecto a otros peatones y a los obstáculos del andén: vendedores informales (Arts. 146–147) y postes de energía no soterrados (Art. 153). El POT regula las conductas pero nunca modela su efecto conjunto sobre la marcha.", icon: "fa-person-walking-dashed-line-arrow-right" },
  { titulo: "F₃ — Fricción del andén", texto: "Reducción de velocidad por anchos de circulación reducidos (Art. 154), y mitigación de fatiga cuando se transita por la franja de paisajismo arborizado (Art. 155). Cada norma de perfil de andén es, en el modelo, un coeficiente de fricción sobre el agente.", icon: "fa-person-walking-arrow-right" },
];

function renderFuerzas() {
  const wrap = document.getElementById("fuerzasGrid");
  if (!wrap) return;
  wrap.innerHTML = "";
  FUERZAS.forEach((f, i) => {
    const card = document.createElement("div");
    card.className = "multirrol-card";
    card.dataset.index = i;
    card.innerHTML = `<div class="multirrol-icon"><i class="fa-solid ${f.icon}"></i></div><h5>${f.titulo}</h5><p>${f.texto}</p>`;
    card.addEventListener("mouseenter", () => highlightRole(i));
    card.addEventListener("mouseleave", () => unhighlightRole());
    card.addEventListener("click", () => toggleRoleCard(card, i));
    wrap.appendChild(card);
  });
}

function highlightRole(i) {
  document.querySelectorAll(".multirrol-card").forEach((card, ci) => {
    card.classList.toggle("role-focus", ci === i);
  });
  const node = document.querySelector(`.ods-node[data-id="peaton"]`);
  if (node) node.classList.add("node-focus-active");
}

function unhighlightRole() {
  document.querySelectorAll(".multirrol-card").forEach(card => card.classList.remove("role-focus"));
  document.querySelectorAll(".ods-node").forEach(node => node.classList.remove("node-focus-active"));
}

function toggleRoleCard(card, i) {
  if (card.classList.contains("active")) {
    card.classList.remove("active");
  } else {
    document.querySelectorAll(".multirrol-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    highlightRole(i);
  }
}

/* -------- acciones -------- */
function generateModelReport() { console.log("Generando reporte del modelo propio..."); }
function downloadOntology() { console.log("Descargando ontología revisada..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
  renderFuerzas();
});
