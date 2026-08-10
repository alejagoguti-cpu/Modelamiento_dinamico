// ===================== DATOS DE LAS RELACIONES (tabla del POT) =====================
const relations = {
  e1: {
    label: "EEP → ESECI",
    quote: "la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.",
    page: "p. 31"
  },
  e2: {
    label: "EIP → EEP",
    quote: "Por eso promovemos la ciudad a que reconozca el patrimonio local, las dinámicas comunitarias, los sistemas cooperativos de producción sostenible como huertas productivas, bancos de semillas nativas y plantas de uso medicinal, entre otros.",
    page: "p. 31"
  },
  e3: {
    label: "EFC → EEP",
    quote: "En la ruralidad es urgente mejorar las condiciones habitacionales, desde los componentes de servicios públicos domiciliarios, accesibilidad y movilidad, con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.",
    page: "p. 31"
  },
  e4: {
    label: "EFC → ESECI",
    quote: "Bajo la nueva visión del POT, la infraestructura social es compatible con otros usos y equipamientos, como centros deportivos, culturales y de recreación, entre otros. Esto propicia infraestructuras compartidas y multifuncionales que contribuyen a la interculturalidad, que estimulan la permanencia de los estudiantes en el sistema educativo y que promueven la generación de conocimiento.",
    page: "p. 126"
  },
  e5: {
    label: "EIP → EFC",
    quote: "El POT busca intervenir estratégicamente, vinculando las dinámicas patrimoniales, ambientales, sociales y culturales para proteger y garantizar la permanencia y calidad de vida de los pobladores originales de las zonas de renovación urbana y actuaciones estratégicas.",
    page: "p. 30"
  },
  e6: {
    label: "EIP → ESECI",
    quote: "El mismo planteamiento vincula patrimonio local, dinámicas comunitarias y producción sostenible, permitiendo analizar su relación con la dimensión socioeconómica.",
    page: "p. 35"
  }
};

// ===================== POPUP DE RELACIONES =====================
(function initRelationPopups(){
  const links = document.querySelectorAll(".link[data-relation]");

  function closePopup(){
    const existing = document.querySelector(".pot-popup");
    if (existing) existing.remove();
    document.removeEventListener("click", onOutsideClick, true);
  }

  function onOutsideClick(e){
    const popup = document.querySelector(".pot-popup");
    if (popup && !popup.contains(e.target) && !e.target.closest(".link")) {
      closePopup();
    }
  }

  function openPopup(relationId, x, y){
    closePopup();
    const data = relations[relationId];
    if (!data) return;

    const popup = document.createElement("div");
    popup.className = "pot-popup";
    popup.innerHTML = `
      <button class="pot-popup-close" aria-label="Cerrar">✕</button>
      <div class="pot-relation">${data.label}</div>
      <div class="pot-quote">&ldquo;${data.quote}&rdquo;</div>
      <div class="pot-page">${data.page}</div>
    `;

    document.body.appendChild(popup);

    // posicionar y ajustar para que no se salga de la pantalla
    const rect = popup.getBoundingClientRect();
    const margin = 16;
    let left = x + 16;
    let top = y + 16;

    if (left + rect.width + margin > window.innerWidth) {
      left = x - rect.width - 16;
    }
    if (top + rect.height + margin > window.innerHeight) {
      top = window.innerHeight - rect.height - margin;
    }
    if (left < margin) left = margin;
    if (top < margin) top = margin;

    popup.style.left = left + "px";
    popup.style.top = top + "px";

    popup.querySelector(".pot-popup-close").addEventListener("click", (ev) => {
      ev.stopPropagation();
      closePopup();
    });

    setTimeout(() => document.addEventListener("click", onOutsideClick, true), 0);
  }

  links.forEach((link) => {
    const relationId = link.getAttribute("data-relation");

    link.addEventListener("click", (e) => {
      e.stopPropagation();
      links.forEach((l) => l.classList.remove("link-active"));
      link.classList.add("link-active");
      openPopup(relationId, e.clientX, e.clientY);
    });

    // accesibilidad: abrir con teclado (Enter / espacio)
    link.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const box = link.getBoundingClientRect();
        links.forEach((l) => l.classList.remove("link-active"));
        link.classList.add("link-active");
        openPopup(relationId, box.left + box.width / 2, box.top + box.height / 2);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });
})();

// ===================== DIAGRAMA INTERACTIVO (arrastrar nodos, tipo imán) =====================
(function initDraggableDiagram(){
  const svg = document.getElementById("network-svg");
  if (!svg) return;

  // posiciones y radios base de cada nodo (deben coincidir con el transform inicial del HTML)
  const nodeDefs = {
    green:  { cx: 330, cy: 110, r: 62 },
    purple: { cx: 140, cy: 300, r: 58 },
    blue:   { cx: 500, cy: 300, r: 58 },
    yellow: { cx: 330, cy: 480, r: 64 }
  };

  // vector de "curvatura" fijo de cada relación (control - punto medio), tomado del diseño original
  const edgeDefs = [
    { id: "e1", from: "green",  to: "yellow", bow: { x: 30.1,  y: 1      } },
    { id: "e2", from: "purple", to: "green",  bow: { x: -25.6, y: -29.35 } },
    { id: "e3", from: "blue",   to: "green",  bow: { x: 24.1,  y: -29.5  } },
    { id: "e4", from: "blue",   to: "yellow", bow: { x: 23.05, y: 28.85  } },
    { id: "e5", from: "purple", to: "blue",   bow: { x: 0,     y: 67.9   } },
    { id: "e6", from: "purple", to: "yellow", bow: { x: -24.65,y: 28.8   } }
  ];

  const ids = Object.keys(nodeDefs);

  // estado físico: posición absoluta actual, velocidad, si se está arrastrando
  const state = {};
  ids.forEach((id) => {
    const n = nodeDefs[id];
    state[id] = { x: n.cx, y: n.cy, vx: 0, vy: 0, dragging: false };
  });

  // todos los pares de nodos (grafo completo) con su distancia original "de reposo".
  // esto es lo que hace el efecto imán: cada par intenta mantener su separación original.
  const pairs = [];
  for (let i = 0; i < ids.length; i++){
    for (let j = i + 1; j < ids.length; j++){
      const a = nodeDefs[ids[i]], b = nodeDefs[ids[j]];
      const rest = Math.hypot(b.cx - a.cx, b.cy - a.cy);
      pairs.push({ a: ids[i], b: ids[j], rest });
    }
  }

  const K_HOME = 16;   // qué tanto "recuerda" cada bolita su lugar original
  const K_EDGE = 42;   // fuerza del "imán" entre bolitas conectadas
  const DAMPING = 12;  // fricción, evita que oscile para siempre
  const SETTLE_EPS = 0.05;

  let rafId = null;
  let lastFrame = null;

  function toSvgPoint(evt){
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const ctm = svg.getScreenCTM();
    return pt.matrixTransform(ctm.inverse());
  }

  function updateNodeTransform(id){
    const g = svg.querySelector(`[data-node="${id}"]`);
    if (!g) return;
    const s = state[id];
    g.setAttribute("transform", `translate(${s.x.toFixed(2)},${s.y.toFixed(2)})`);
  }

  function updateEdge(edge){
    const g = svg.querySelector(`.link[data-relation="${edge.id}"]`);
    if (!g) return;

    const nA = nodeDefs[edge.from], nB = nodeDefs[edge.to];
    const A = state[edge.from], B = state[edge.to];

    let ux = B.x - A.x, uy = B.y - A.y;
    const dist = Math.hypot(ux, uy) || 1;
    ux /= dist; uy /= dist;

    const P0 = { x: A.x + ux * nA.r, y: A.y + uy * nA.r };
    const P1 = { x: B.x - ux * nB.r, y: B.y - uy * nB.r };
    const mid = { x: (P0.x + P1.x) / 2, y: (P0.y + P1.y) / 2 };
    const C = { x: mid.x + edge.bow.x, y: mid.y + edge.bow.y };

    const d = `M${P0.x.toFixed(1)},${P0.y.toFixed(1)} Q${C.x.toFixed(1)},${C.y.toFixed(1)} ${P1.x.toFixed(1)},${P1.y.toFixed(1)}`;

    const line = g.querySelector(".link-line");
    const hit = g.querySelector(".link-hit");
    const arrow = g.querySelector(".link-arrow");
    if (line) line.setAttribute("d", d);
    if (hit) hit.setAttribute("d", d);

    if (arrow){
      const dx2 = 2 * (P1.x - C.x), dy2 = 2 * (P1.y - C.y);
      const angle = Math.atan2(dy2, dx2) * 180 / Math.PI;
      arrow.setAttribute("transform", `translate(${P1.x.toFixed(1)},${P1.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
    }
  }

  function updateAllEdges(){
    edgeDefs.forEach(updateEdge);
  }

  function stepPhysics(dt){
    // fuerza acumulada sobre cada nodo este fotograma
    const forces = {};
    ids.forEach((id) => { forces[id] = { fx: 0, fy: 0 }; });

    // 1) resorte débil hacia la posición original de cada nodo
    ids.forEach((id) => {
      const n = nodeDefs[id], s = state[id];
      forces[id].fx += K_HOME * (n.cx - s.x);
      forces[id].fy += K_HOME * (n.cy - s.y);
    });

    // 2) "imán": cada par conectado intenta mantener su distancia original,
    //    así que si arrastras uno, jala a los demás detrás de él
    pairs.forEach(({ a, b, rest }) => {
      const sa = state[a], sb = state[b];
      const dx = sb.x - sa.x, dy = sb.y - sa.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist, uy = dy / dist;
      const stretch = dist - rest;
      const fx = K_EDGE * stretch * ux;
      const fy = K_EDGE * stretch * uy;
      forces[a].fx += fx; forces[a].fy += fy;
      forces[b].fx -= fx; forces[b].fy -= fy;
    });

    let anyMoving = false;

    ids.forEach((id) => {
      const s = state[id];
      if (s.dragging){ anyMoving = true; return; }

      const f = forces[id];
      const ax = f.fx - DAMPING * s.vx;
      const ay = f.fy - DAMPING * s.vy;
      s.vx += ax * dt;
      s.vy += ay * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      const n = nodeDefs[id];
      const atHome = Math.abs(s.x - n.cx) < SETTLE_EPS && Math.abs(s.y - n.cy) < SETTLE_EPS;
      const atRest = Math.abs(s.vx) < SETTLE_EPS && Math.abs(s.vy) < SETTLE_EPS;
      if (atHome && atRest){
        s.x = n.cx; s.y = n.cy; s.vx = 0; s.vy = 0;
      } else {
        anyMoving = true;
      }
      updateNodeTransform(id);
    });

    updateAllEdges();
    return anyMoving;
  }

  function loop(ts){
    if (lastFrame === null) lastFrame = ts;
    const dt = Math.min((ts - lastFrame) / 1000, 0.032);
    lastFrame = ts;

    const draggingAny = ids.some((id) => state[id].dragging);
    const moving = stepPhysics(dt);

    if (moving || draggingAny){
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
      lastFrame = null;
    }
  }

  function ensureLoop(){
    if (rafId === null){
      lastFrame = null;
      rafId = requestAnimationFrame(loop);
    }
  }

  function attachDrag(id){
    const g = svg.querySelector(`[data-node="${id}"]`);
    if (!g) return;
    const s = state[id];

    let startPoint = null;
    let startPos = null;
    let lastPoint = null;
    let lastTime = null;

    g.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      g.setPointerCapture(e.pointerId);
      g.classList.add("dragging");
      s.dragging = true;
      s.vx = 0; s.vy = 0;

      startPoint = toSvgPoint(e);
      startPos = { x: s.x, y: s.y };
      lastPoint = startPoint;
      lastTime = performance.now();
      ensureLoop();
    });

    g.addEventListener("pointermove", (e) => {
      if (!s.dragging) return;
      const p = toSvgPoint(e);
      s.x = startPos.x + (p.x - startPoint.x);
      s.y = startPos.y + (p.y - startPoint.y);

      const now = performance.now();
      const dt = Math.max(now - lastTime, 1) / 1000;
      s.vx = (p.x - lastPoint.x) / dt;
      s.vy = (p.y - lastPoint.y) / dt;
      lastPoint = p; lastTime = now;

      updateNodeTransform(id);
      ensureLoop();
    });

    function endDrag(e){
      if (!s.dragging) return;
      s.dragging = false;
      g.classList.remove("dragging");
      try { g.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
      ensureLoop();
    }

    g.addEventListener("pointerup", endDrag);
    g.addEventListener("pointercancel", endDrag);
  }

  ids.forEach(attachDrag);
  updateAllEdges();
})();
