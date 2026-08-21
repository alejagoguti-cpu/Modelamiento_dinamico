/* ============ Módulo 04 — Macromodelos ============ */
(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";

  /* ---------- datos ---------- */
  const ODS_NODES = [
    { id: "tecnocratico",    name: "TECNOCRÁTICO",        sub: "índices, mapas, IC/ESECI",   type: "operativo",   x: 250, y: 150 },
    { id: "productivista",   name: "PRODUCTIVISTA /\nDESARROLLISTA", sub: "\"competitividad\"", type: "operativo",   x: 500, y: 110 },
    { id: "economicista",    name: "ECONOMICISTA /\nMERCANTILISTA", sub: "suelo como activo",  type: "operativo",   x: 760, y: 150 },
    { id: "ambientalista",   name: "AMBIENTALISTA",       sub: "emergencia climática",         type: "subordinado", x: 1010, y: 150 },
    { id: "comunitario",     name: "COMUNITARIO /\nDEL CUIDADO",     sub: "Manzanas del Cuidado", type: "subordinado", x: 1230, y: 110 },
    { id: "estatista",       name: "JURÍDICO-ESTATISTA",  sub: "decreto, plazos T13/T15/T16",  type: "declarado",   x: 250, y: 420 },
    { id: "neoliberal",      name: "NEOLIBERAL\n(residuo)",           sub: "mercado de vivienda",    type: "residual",  x: 500, y: 460 },
    { id: "colectivista",    name: "COLECTIVISTA /\nCOMUNAL",         sub: "acción comunal residual", type: "residual", x: 760, y: 460 },
    { id: "participativo",   name: "PARTICIPATIVO",       sub: "cabildo abierto 2021",         type: "declarado",   x: 1010, y: 420 },
    { id: "modelovivo",      name: "MODELO PROPIO:\nCIUDAD VIVA",     sub: "agentes + emergencia",   type: "declarado",   x: 1230, y: 420 },
  ];

  /* Tipos de arista:
     declarada   = lo que el discurso afirma (verde, sólida)
     subordinada = declarado pero estructuralmente débil (amarillo, discontinua)
     operativa   = inferida por ingeniería inversa (rojo, sólida, flecha)
     residual    = presente pero lateral (gris, discontinua) */
  const RAW_EDGES = [
    { s: "estatista",    t: "tecnocratico",   type: "operativa",
      quote: "El seguimiento y evaluación (Libro I) convierte el cumplimiento normativo en el criterio rector del plan: el Estado ordena, el índice gobierna.",
      page: "Referencia: Decreto 555, Libro I — seguimiento y evaluación; Art. 304 (escalera IC)." },
    { s: "tecnocratico", t: "economicista",   type: "operativa",
      quote: "Los instrumentos técnicos (IC, CESI, ESECI, TDR, cesiones) convierten el suelo en un activo financiero que la norma debe \"capturar\": la arquitectura normativa es una máquina de valor.",
      page: "Referencia: Decreto 555, Art. 283–292 (TDR) y Art. 304 (cesiones por englobe, esquina, totalidad)." },
    { s: "economicista", t: "productivista",  type: "operativa",
      quote: "\"La ciudad compacta, articulada y sostenible... es la plataforma productiva para una mayor competitividad\" (Art. 11, Parágrafo 1): la sostenibilidad se declara como medio, la productividad como fin.",
      page: "Referencia: Decreto 555, Art. 11 Parágrafo 1, p. 642 aprox." },
    { s: "productivista",t: "ambientalista",  type: "subordinada",
      quote: "La Estrategia de Estructuración Ecológica y Paisajística se declara estructura principal, pero en la red sus conectores son mayoritariamente discontinuos, indirectos o de resiliencia: no ancla operativamente el sistema.",
      page: "Referencia: Decreto 555, Art. 11 — EEP (p. 539) y red del Módulo 01." },
    { s: "comunitario",  t: "productivista",  type: "subordinada",
      quote: "Las Manzanas del Cuidado se insertan como \"anclas\" sobre equipamientos existentes: el cuidado se apoya en la estructura funcional sin transformar su lógica.",
      page: "Referencia: Decreto 555, Art. 11 Parágrafo 1 (\"equipamientos existentes como anclas\")." },
    { s: "ambientalista",t: "economicista",   type: "subordinada",
      quote: "\"La emergencia climática exige un plan que la enfrente\" (p. 18), pero las actuaciones ecológicas operan \"en coordinación con\" la estructura funcional: la naturaleza queda subordinada a la infraestructura.",
      page: "Referencia: Bogotá Reverdece, p. 18; Decreto 555, Art. 11." },
    { s: "estatista",    t: "participativo",  type: "declarada",
      quote: "El POT surge de un cabildo abierto en pandemia (2021) y el Art. 9 Parágrafo 1 ordena la planeación participativa por UPL: el discurso democrático es explícito.",
      page: "Referencia: Decreto 555, Art. 9 Parágrafo 1." },
    { s: "participativo",t: "estatista",      type: "residual",
      quote: "La participación se institucionaliza como mecanismo de consulta en plazos definidos: se canaliza dentro de la jerarquía jurídica, no la disputa.",
      page: "Referencia: Decreto 555, Art. 9 y proceso de cabildo abierto 2021." },
    { s: "neoliberal",   t: "economicista",   type: "residual",
      quote: "La vivienda sigue produciéndose por el mercado con subsidios de demanda y oferta; la especulación del suelo (Capellanía: 27,03 → 29,32 ha) sigue siendo la fuerza que la norma captura, no elimina.",
      page: "Referencia: Decreto 555, Capellanía (Art. 20 aprox.) y política de vivienda VIS/VIP." },
    { s: "colectivista", t: "estatista",      type: "residual",
      quote: "Las organizaciones comunales y comunitarias aparecen como actores de consulta y veeduría: presentes en el texto, periféricos en la estructura.",
      page: "Referencia: Decreto 555 — participación comunitaria (artículos de participación)." },
    { s: "modelovivo",   t: "tecnocratico",   type: "declarada",
      quote: "Nuestro modelo propio parte de agentes dinámicos que se autoorganizan: la ingeniería inversa de los macromodelos es el punto de partida del Módulo 09.",
      page: "Referencia: Módulo 09 — Modelo Propio (Bogotá Viva)." },
    { s: "ambientalista",t: "estatista",      type: "declarada",
      quote: "El Estado se declara garante de la EEP y de los objetivos de carbono: la voluntad jurídica es explícita y fuerte.",
      page: "Referencia: Decreto 555, Art. 11 — Objetivos EEP (p. 539–546)." },
  ];

  const NODE_COLORS = {
    operativo:   "#ef4444",
    declarado:   "#4ade80",
    subordinado: "#f5c945",
    residual:    "#94a3b8",
  };
  const EDGE_COLORS = {
    operativa:   "#ef4444",
    subordinada: "#f5c945",
    declarada:   "#4ade80",
    residual:    "#94a3b8",
  };
  const EDGE_STYLE = {
    operativa:   { dash: [],   arrow: true,  width: 2.4 },
    subordinada: { dash: [6,4], arrow: true, width: 1.8 },
    declarada:   { dash: [],   arrow: false, width: 1.8 },
    residual:    { dash: [4,4], arrow: false, width: 1.3 },
  };

  const NODE_INSIGHTS = {
    operativo:   ["tecnocratico", "productivista", "economicista"],
    declarado:   ["estatista", "participativo", "modelovivo"],
    subordinado: ["ambientalista", "comunitario"],
    residual:    ["neoliberal", "colectivista"],
    todos:       ODS_NODES.map(n => n.id),
  };

  /* ---------- DOM ---------- */
  const svg = document.getElementById("networkViz");
  let svgRect;
  function refreshRect() { svgRect = svg.getBoundingClientRect(); }

  let rawW, rawH;
  (function () {
    const m = svg.getAttribute("viewBox").split(" ").map(Number);
    rawW = m[2]; rawH = m[3];
  })();

  const typeOff = new Set();
  const nodeOff = new Set();
  let spotlight = null;

  /* ---------- render ---------- */
  function mk(tag, attrs = {}) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function renderNetwork() {
    svg.innerHTML = "";
    svgRect = svg.getBoundingClientRect();

    const defs = mk("defs");
    RAW_EDGES.forEach((edge, i) => {
      const marker = mk("marker", {
        id: `arrow-${i}`, markerWidth: "10", markerHeight: "8", refX: "9", refY: "4",
        orient: "auto", markerUnits: "strokeWidth"
      });
      const path = mk("path", {
        d: "M0,0 L10,4 L0,8 Z",
        fill: EDGE_COLORS[edge.type] || "#fff",
        opacity: "0.9"
      });
      marker.appendChild(path);
      defs.appendChild(marker);
    });
    svg.appendChild(defs);

    // aristas (hit)
    RAW_EDGES.forEach((edge, i) => {
      const sNode = ODS_NODES.find(n => n.id === edge.s);
      const tNode = ODS_NODES.find(n => n.id === edge.t);
      const style = EDGE_STYLE[edge.type] || EDGE_STYLE.operativa;
      const curv = 0.18;
      const mx = (sNode.x + tNode.x) / 2;
      const my = (sNode.y + tNode.y) / 2 - Math.abs(tNode.x - sNode.x) * curv;
      const d = `M${sNode.x},${sNode.y} Q${mx},${my} ${tNode.x},${tNode.y}`;

      const g = mk("g", { class: "edge-group", "data-index": i });

      const visual = mk("path", {
        class: "ods-edge edge-visual",
        d: d,
        stroke: EDGE_COLORS[edge.type] || "#fff",
        "stroke-width": style.width,
        fill: "none",
        opacity: "0.85",
        "stroke-dasharray": style.dash.join(" ") || undefined,
        "marker-end": style.arrow ? `url(#arrow-${i})` : undefined,
      });
      const hit = mk("path", {
        class: "ods-edge edge-hit",
        d: d,
      });
      g.appendChild(visual);
      g.appendChild(hit);
      svg.appendChild(g);

      hit.addEventListener("click", (ev) => {
        ev.stopPropagation();
        showEdgeInfo(i);
      });
    });

    // nodos
    ODS_NODES.forEach((node, i) => {
      const g = mk("g", {
        class: "ods-node ods-node-" + node.type,
        "data-id": node.id,
        "data-node-index": i,
        transform: `translate(${node.x},${node.y})`,
      });

      const isMultiline = node.name.includes("\n");
      const labelH = isMultiline ? 52 : 34;
      const totalH = 34 + labelH;

      const ring = mk("circle", {
        class: "node-ring",
        r: 17,
        stroke: NODE_COLORS[node.type],
        "stroke-width": "2",
      });
      const inner = mk("g", { class: "node-inner" });
      const dot = mk("circle", { cx: 0, cy: -17, r: 4.2, fill: NODE_COLORS[node.type] });
      const name = mk("text", { class: "node-num", y: isMultiline ? "-6" : "-8", "text-anchor": "middle" });
      node.name.split("\n").forEach((line, li) => {
        const tspan = mk("tspan", { x: "0", dy: li === 0 ? "0" : "11" });
        tspan.textContent = line;
        name.appendChild(tspan);
      });
      const sub = mk("text", {
        class: "node-name",
        y: isMultiline ? "13" : "8",
        "text-anchor": "middle",
      });
      sub.textContent = node.sub;

      inner.appendChild(dot);
      inner.appendChild(name);
      inner.appendChild(sub);
      g.appendChild(ring);
      g.appendChild(inner);
      svg.appendChild(g);

      // interacciones
      let lastClick = 0, clicks = 0, timer = null;
      g.addEventListener("click", (ev) => {
        ev.stopPropagation();
        clicks++;
        if (clicks === 1) {
          timer = setTimeout(() => { toggleNodeOnOff(node.id); clicks = 0; }, 260);
        } else if (clicks === 3) {
          clearTimeout(timer);
          clicks = 0;
          toggleNodeFlow(node.id);
        }
      });

      g.addEventListener("mousedown", (ev) => {
        ev.preventDefault();
        startDrag(node.id, ev.clientX, ev.clientY);
      });
      g.addEventListener("touchstart", (ev) => {
        const t = ev.touches[0];
        startDrag(node.id, t.clientX, t.clientY);
      }, { passive: true });
    });
  }

  /* ---------- drag ---------- */
  let dragId = null, dragOffX = 0, dragOffY = 0;
  function startDrag(id, cx, cy) {
    const node = ODS_NODES.find(n => n.id === id);
    const p = toSVG(cx, cy);
    dragId = id;
    dragOffX = p.x - node.x;
    dragOffY = p.y - node.y;
  }
  function toSVG(cx, cy) {
    return {
      x: ((cx - svgRect.left) / svgRect.width) * rawW,
      y: ((cy - svgRect.top) / svgRect.height) * rawH,
    };
  }
  window.addEventListener("mousemove", (ev) => {
    if (!dragId) return;
    const node = ODS_NODES.find(n => n.id === dragId);
    const p = toSVG(ev.clientX, ev.clientY);
    node.x = Math.min(Math.max(40, p.x - dragOffX), rawW - 40);
    node.y = Math.min(Math.max(30, p.y - dragOffY), rawH - 30);
    redrawNode(node.id);
    redrawEdgesOf(node.id);
  });
  window.addEventListener("touchmove", (ev) => {
    if (!dragId) return;
    const t = ev.touches[0];
    const node = ODS_NODES.find(n => n.id === dragId);
    const p = toSVG(t.clientX, t.clientY);
    node.x = Math.min(Math.max(40, p.x - dragOffX), rawW - 40);
    node.y = Math.min(Math.max(30, p.y - dragOffY), rawH - 30);
    redrawNode(node.id);
    redrawEdgesOf(node.id);
  }, { passive: true });
  window.addEventListener("mouseup", () => { dragId = null; });
  window.addEventListener("touchend", () => { dragId = null; });

  function redrawNode(id) {
    const node = ODS_NODES.find(n => n.id === id);
    const el = svg.querySelector(`.ods-node[data-id="${id}"]`);
    if (el) el.setAttribute("transform", `translate(${node.x},${node.y})`);
  }
  function redrawEdgesOf(nodeId) {
    RAW_EDGES.forEach((edge, i) => {
      if (edge.s !== nodeId && edge.t !== nodeId) return;
      const sNode = ODS_NODES.find(n => n.id === edge.s);
      const tNode = ODS_NODES.find(n => n.id === edge.t);
      const g = svg.querySelector(`.edge-group[data-index="${i}"]`);
      if (!g) return;
      const style = EDGE_STYLE[edge.type] || EDGE_STYLE.operativa;
      const curv = 0.18;
      const mx = (sNode.x + tNode.x) / 2;
      const my = (sNode.y + tNode.y) / 2 - Math.abs(tNode.x - sNode.x) * curv;
      const d = `M${sNode.x},${sNode.y} Q${mx},${my} ${tNode.x},${tNode.y}`;
      g.querySelectorAll(".ods-edge").forEach(p => p.setAttribute("d", d));
    });
  }

  /* ---------- panel de sustento ---------- */
  const panel = document.getElementById("edgeInfoPanel");
  const infoTitle = document.getElementById("edgeInfoTitle");
  const infoType = document.getElementById("edgeInfoType");
  const infoQuote = document.getElementById("edgeInfoQuote");
  const infoPage = document.getElementById("edgeInfoPage");
  const closeBtn = document.getElementById("edgeInfoClose");

  function showEdgeInfo(idx) {
    const edge = RAW_EDGES[idx];
    const sNode = ODS_NODES.find(n => n.id === edge.s);
    const tNode = ODS_NODES.find(n => n.id === edge.t);
    infoTitle.textContent = `${sNode.name.replace(/\n/g, " ")} → ${tNode.name.replace(/\n/g, " ")}`;
    infoType.textContent = edge.type.toUpperCase();
    infoType.style.background = (EDGE_COLORS[edge.type] || "#fff") + "26";
    infoType.style.color = EDGE_COLORS[edge.type] || "#fff";
    infoQuote.textContent = edge.quote;
    infoPage.textContent = edge.page;

    svg.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
    const g = svg.querySelector(`.edge-group[data-index="${idx}"]`);
    if (g) g.classList.add("edge-selected");

    panel.classList.add("visible");
    requestAnimationFrame(() => {
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
  function hideEdgeInfo() {
    panel.classList.remove("visible");
    svg.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  }
  closeBtn.addEventListener("click", hideEdgeInfo);
  svg.addEventListener("click", () => { if (panel.classList.contains("visible")) hideEdgeInfo(); });

  /* ---------- spotlight / filtros ---------- */
  function clearSpotlight() {
    spotlight = null;
    document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
    applySpotlightState();
  }
  function setSpotlightNodes(nodeIds, expand) {
    spotlight = { mode: "nodes", nodes: new Set(nodeIds), expand: !!expand };
    document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
    applySpotlightState();
  }
  function applySpotlightState() {
    let visibleNodes = null;
    let visibleEdges = null;

    if (spotlight && spotlight.mode === "nodes") {
      visibleNodes = new Set(spotlight.nodes);
      visibleEdges = new Set();
      RAW_EDGES.forEach((edge, i) => {
        const sIn = spotlight.nodes.has(edge.s);
        const tIn = spotlight.nodes.has(edge.t);
        if (spotlight.expand) {
          if (sIn || tIn) {
            visibleEdges.add(i);
            visibleNodes.add(edge.s);
            visibleNodes.add(edge.t);
          }
        } else {
          if (sIn && tIn) visibleEdges.add(i);
        }
      });
    } else {
      visibleNodes = new Set(ODS_NODES.map(n => n.id));
      visibleEdges = new Set(RAW_EDGES.map((_, i) => i));
    }

    document.querySelectorAll(".ods-node").forEach(el => {
      const id = el.dataset.id;
      const dim = visibleNodes ? !visibleNodes.has(id) : false;
      el.classList.toggle("node-focus-dim", dim);
      el.classList.toggle("node-focus-active", !!(spotlight && spotlight.mode === "nodes" && spotlight.nodes.has(id)));
    });

    document.querySelectorAll(".edge-group").forEach(el => {
      const idx = Number(el.dataset.index);
      const dim = visibleEdges ? !visibleEdges.has(idx) : false;
      el.classList.toggle("edge-focus-dim", dim);
    });
  }

  function toggleNodeFlow(id) {
    const already = spotlight && spotlight.mode === "nodes" && spotlight.expand &&
                    spotlight.nodes.size === 1 && spotlight.nodes.has(id);
    if (already) {
      clearSpotlight();
    } else {
      setSpotlightNodes([id], true);
    }
  }

  function toggleInsight(key) {
    const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
    if (!card) return;

    if (card.classList.contains("active")) {
      clearSpotlight();
      return;
    }

    if (NODE_INSIGHTS[key] && NODE_INSIGHTS[key].length) {
      setSpotlightNodes(NODE_INSIGHTS[key], true);
    } else {
      setSpotlightNodes(ODS_NODES.map(n => n.id), false);
    }

    card.classList.add("active");
  }
  window.toggleInsight = toggleInsight;

  /* ---------- leyenda ---------- */
  document.querySelectorAll(".network-legend .legend-item").forEach(item => {
    const input = item.querySelector("input");
    item.addEventListener("click", (ev) => {
      ev.preventDefault();
      const type = item.dataset.type;
      input.checked = !input.checked;
      item.classList.toggle("off", !input.checked);
      if (input.checked) typeOff.delete(type); else typeOff.add(type);
      refreshEdgeVisibility();
    });
  });

  function refreshEdgeVisibility() {
    RAW_EDGES.forEach((edge, i) => {
      const g = svg.querySelector(`.edge-group[data-index="${i}"]`);
      if (!g) return;
      const typeOff2 = typeOff.has(edge.type);
      const sOff = nodeOff.has(edge.s);
      const tOff = nodeOff.has(edge.t);
      const hide = typeOff2 || sOff || tOff;
      g.classList.toggle("hidden-edge", hide);
    });
  }

  function toggleNodeOnOff(id) {
    const nodeOffNow = nodeOff.has(id);
    if (nodeOffNow) nodeOff.delete(id); else nodeOff.add(id);
    const el = svg.querySelector(`.ods-node[data-id="${id}"]`);
    if (el) el.classList.toggle("node-off", !nodeOffNow);
    refreshEdgeVisibility();
  }

  /* ---------- filtros de control ---------- */
  function filterNetwork(mode) {
    document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
    const btn = [...document.querySelectorAll(".network-controls .control-btn")].find(b => b.textContent.trim() === ({ all: "Todos", operativo: "Operativos", declarado: "Declarados", subordinado: "Subordinados", residual: "Residuales" }[mode]));
    (btn || document.querySelector(".network-controls .control-btn")).classList.add("active");

    const groups = {
      all: ["operativo", "declarado", "subordinado", "residual"],
      operativo: ["operativo"],
      declarado: ["declarado"],
      subordinado: ["subordinado"],
      residual: ["residual"],
    };
    const activeTypes = groups[mode] || groups.all;

    document.querySelectorAll(".network-legend .legend-item[data-type]").forEach(item => {
      const type = item.dataset.type;
      const input = item.querySelector("input");
      const show = activeTypes.includes(type);
      input.checked = show;
      item.classList.toggle("off", !show);
      if (show) typeOff.delete(type); else typeOff.add(type);
    });
    refreshEdgeVisibility();

    if (mode !== "all") {
      setSpotlightNodes(NODE_INSIGHTS[mode] || ODS_NODES.map(n => n.id), true);
      const card = document.querySelector(`.insight-card[data-insight="${mode}"]`);
      if (card) card.classList.add("active");
    } else {
      clearSpotlight();
    }
  }
  window.showEdgeInfo = showEdgeInfo;
  window.filterNetwork = filterNetwork;
  window.hideEdgeInfo = hideEdgeInfo;
  window.toggleNodeOnOff = toggleNodeOnOff;
  window.toggleNodeFlow = toggleNodeFlow;

  /* ---------- init ---------- */
  window.addEventListener("resize", () => { refreshRect(); });
  renderNetwork();
})();
