(() => {
  'use strict';
  const canvas = document.getElementById('sumoFreeDrawCanvas');
  if (!canvas) return;
  const output = document.getElementById('sumoPenOutput');
  const status = document.getElementById('sumoPenStatus');
  const lineModeBtn = document.getElementById('sumoPenLineMode');
  const pointModeBtn = document.getElementById('sumoPenPointMode');
  const lineWidthInput = document.getElementById('sumoPenLineWidth');
  const ctx = canvas.getContext('2d');
  window.sumoActiveMode = window.sumoActiveMode || 'draw';

  // Tres tipos de figura:
  // "polygon" — se cierra y se rellena (humedales, zonas cerradas)
  // "line"    — queda abierta, con el grosor que se elija (ríos/canales)
  // "point"   — un solo clic pone un puntito (árbol en planta), con el
  //             diámetro que se elija con la misma barrita de grosor.
  let shapeMode = 'polygon';
  let currentWidth = Number(lineWidthInput?.value || 3);
  let drawing = false, points = [], allShapes = []; // allShapes: [{type, points, width}]

  function resize() {
    const box = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(box.width * dpr));
    canvas.height = Math.max(1, Math.round(box.height * dpr));
    canvas.style.width = `${box.width}px`; canvas.style.height = `${box.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }
  function point(e) { const r = canvas.getBoundingClientRect(); return [Number((e.clientX - r.left).toFixed(1)), Number((e.clientY - r.top).toFixed(1))]; }

  function strokeShape(shape) {
    const pts = shape.points;
    if (!pts.length) return;
    if (shape.type === 'point') {
      const [px, py] = pts[0];
      const r = (shape.width || 6) / 2;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96,200,96,.55)';
      ctx.strokeStyle = 'rgba(96,200,96,.95)';
      ctx.lineWidth = 1.2;
      ctx.fill(); ctx.stroke();
      return;
    }
    ctx.strokeStyle = '#ffd166'; ctx.fillStyle = 'rgba(255,209,102,.18)';
    ctx.lineWidth = shape.width || 1.4;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    if (shape.type === 'polygon' && pts.length > 2) { ctx.closePath(); ctx.fill(); }
    ctx.stroke();
  }
  function redraw() {
    const w = canvas.clientWidth, h = canvas.clientHeight; ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    allShapes.forEach(strokeShape);
    if (points.length) strokeShape({ type: shapeMode, points, width: currentWidth });
  }
  function exportShapes() {
    if (!output) return;
    output.value = JSON.stringify({
      format: 'plano-SUMO',
      canvas: { width: canvas.clientWidth, height: canvas.clientHeight },
      shapes: allShapes.map((shape) => ({
        type: shape.type,
        width: shape.width,
        points: shape.points.map(([x, y]) => ({ x, y })),
      })),
    }, null, 2);
  }

  // ¿el punto (px,py) cae dentro del polígono `pts`? (ray casting, para
  // saber a cuál figura le hicieron doble clic) — solo aplica a polígonos.
  function pointInPolygon(px, py, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      const intersect = (yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  // Distancia de un punto a una línea abierta (para doble clic sobre ríos).
  function distToPolyline(px, py, pts) {
    let best = Infinity;
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
      const dx = bx - ax, dy = by - ay, lenSq = dx * dx + dy * dy;
      let t = lenSq > 0 ? ((px - ax) * dx + (py - ay) * dy) / lenSq : 0;
      t = Math.max(0, Math.min(1, t));
      const d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
      if (d < best) best = d;
    }
    return best;
  }

  canvas.addEventListener('pointerdown', e => {
    if (window.sumoActiveMode !== 'draw') return;
    e.preventDefault();
    drawing = true;
    points = [point(e)];
    canvas.setPointerCapture(e.pointerId);
    redraw();
    if (status) status.textContent = shapeMode === 'line' ? 'Dibujando línea… suelta el mouse cuando termines.' : shapeMode === 'point' ? 'Clic para poner el árbol.' : 'Dibujando polígono… suelta el mouse cuando termines.';
  });
  canvas.addEventListener('pointermove', e => {
    if (window.sumoActiveMode !== 'draw' || !drawing || shapeMode === 'point') return; // el árbol no se "arrastra", es un solo clic
    e.preventDefault();
    const p = point(e), last = points[points.length - 1];
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) > 2) { points.push(p); redraw(); }
  });
  function end(e) {
    if (!drawing) return;
    drawing = false;
    if (shapeMode === 'point') {
      allShapes.push({ type: 'point', points: [points[0]], width: currentWidth }); // un solo punto = el centro del árbol
    } else {
      const minPts = shapeMode === 'line' ? 2 : 3;
      if (points.length >= minPts) allShapes.push({ type: shapeMode, points: points.slice(), width: currentWidth });
    }
    points = [];
    exportShapes(); redraw();
    if (status) status.textContent = 'Figura guardada. Puedes seguir dibujando, borrar una con doble clic, o copiarla abajo.';
    try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
  }
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);

  // Doble clic sobre una figura ya dibujada: borra SOLO esa figura
  // (polígono: si el punto cae dentro; línea: si el punto queda cerca;
  // árbol: si el clic queda dentro de su círculo).
  canvas.addEventListener('dblclick', e => {
    if (window.sumoActiveMode !== 'draw') return;
    e.preventDefault();
    const [px, py] = point(e);
    for (let i = allShapes.length - 1; i >= 0; i--) {
      const shape = allShapes[i];
      let hit;
      if (shape.type === 'polygon') hit = pointInPolygon(px, py, shape.points);
      else if (shape.type === 'point') hit = Math.hypot(px - shape.points[0][0], py - shape.points[0][1]) < Math.max(8, (shape.width || 6) / 2);
      else hit = distToPolyline(px, py, shape.points) < Math.max(8, shape.width);
      if (hit) {
        allShapes.splice(i, 1);
        exportShapes(); redraw();
        if (status) status.textContent = 'Se borró esa figura.';
        return;
      }
    }
  });

  // Modo polígono/línea/árbol y grosor (o diámetro, según el modo).
  function setShapeMode(mode) {
    shapeMode = mode;
    lineModeBtn?.classList.toggle('active', mode === 'line');
    pointModeBtn?.classList.toggle('active', mode === 'point');
    if (status) status.textContent = mode === 'line' ? 'Modo línea: bueno para ríos y canales. Ajusta el grosor con la barrita.'
      : mode === 'point' ? 'Modo árbol: haz clic para poner un punto. Ajusta el diámetro con la barrita.'
      : 'Modo polígono: bueno para humedales y zonas cerradas.';
  }
  lineModeBtn?.addEventListener('click', () => setShapeMode(shapeMode === 'line' ? 'polygon' : 'line'));
  pointModeBtn?.addEventListener('click', () => setShapeMode(shapeMode === 'point' ? 'polygon' : 'point'));
  lineWidthInput?.addEventListener('input', () => { currentWidth = Number(lineWidthInput.value); redraw(); });

  document.getElementById('sumoPenClear')?.addEventListener('click', () => { allShapes = []; points = []; exportShapes(); redraw(); });
  document.getElementById('sumoPenUndo')?.addEventListener('click', () => {
    if (points.length) points.pop(); // si se está dibujando: quita el último punto puesto
    else allShapes.pop(); // si no: quita la última figura ya cerrada
    exportShapes(); redraw();
    if (status) status.textContent = 'Se deshizo el último punto/figura.';
  });
  document.getElementById('sumoPenCopy')?.addEventListener('click', async () => { exportShapes(); try { await navigator.clipboard.writeText(output?.value || ''); } catch (_) {} if (status) status.textContent = 'Forma copiada. Pégamela en el chat.'; });
  window.addEventListener('resize', resize); resize();
})();
