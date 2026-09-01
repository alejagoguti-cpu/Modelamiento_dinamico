(() => {
  'use strict';
  const canvas = document.getElementById('sumoFreeDrawCanvas');
  if (!canvas) return;
  const output = document.getElementById('sumoPenOutput');
  const status = document.getElementById('sumoPenStatus');
  const ctx = canvas.getContext('2d');
  window.sumoActiveMode = window.sumoActiveMode || 'draw';
  let drawing = false, points = [], allShapes = [];

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
  function redraw() {
    const w = canvas.clientWidth, h = canvas.clientHeight; ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 1.4; ctx.strokeStyle = '#ffd166'; ctx.fillStyle = 'rgba(255,209,102,.18)';
    for (const shape of [...allShapes, points]) { if (!shape.length) continue; ctx.beginPath(); ctx.moveTo(shape[0][0], shape[0][1]); for (let i = 1; i < shape.length; i++) ctx.lineTo(shape[i][0], shape[i][1]); if (shape !== points && shape.length > 2) { ctx.closePath(); ctx.fill(); } ctx.stroke(); }
  }
  function exportShapes() { if (output) output.value = JSON.stringify({ format: 'plano-SUMO', canvas: { width: canvas.clientWidth, height: canvas.clientHeight }, shapes: allShapes.map(shape => shape.map(([x, y]) => ({ x, y }))) }, null, 2); }

  // ¿el punto (px,py) cae dentro del polígono `shape`? (ray casting, para
  // saber a cuál figura le hicieron doble clic)
  function pointInPolygon(px, py, shape) {
    let inside = false;
    for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
      const [xi, yi] = shape[i], [xj, yj] = shape[j];
      const intersect = (yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  canvas.addEventListener('pointerdown', e => { if (window.sumoActiveMode !== 'draw') return; e.preventDefault(); drawing = true; points = [point(e)]; canvas.setPointerCapture(e.pointerId); redraw(); if (status) status.textContent = 'Dibujando… suelta el mouse cuando termines.'; });
  canvas.addEventListener('pointermove', e => { if (window.sumoActiveMode !== 'draw' || !drawing) return; e.preventDefault(); const p = point(e), last = points[points.length - 1]; if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) > 2) { points.push(p); redraw(); } });
  function end(e) { if (!drawing) return; drawing = false; if (points.length > 2) allShapes.push(points.slice()); points = []; exportShapes(); redraw(); if (status) status.textContent = 'Figura guardada. Puedes dibujar otra, borrar una con doble clic, o copiarla abajo.'; try { canvas.releasePointerCapture(e.pointerId); } catch (_) {} }
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);

  // Doble clic sobre un polígono ya dibujado: borra SOLO ese polígono.
  canvas.addEventListener('dblclick', e => {
    if (window.sumoActiveMode !== 'draw') return;
    e.preventDefault();
    const [px, py] = point(e);
    for (let i = allShapes.length - 1; i >= 0; i--) { // el de encima (más reciente) primero
      if (pointInPolygon(px, py, allShapes[i])) {
        allShapes.splice(i, 1);
        exportShapes(); redraw();
        if (status) status.textContent = 'Se borró ese polígono.';
        return;
      }
    }
  });

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
