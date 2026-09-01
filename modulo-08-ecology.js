/* MÓDULO 08 · CAPAS ECOLÓGICAS SOBRE SUMO
   Activo derivado de los shapefiles originales: cobertura vegetal como polígonos
   y arbolado como celdas de densidad de 60 m. No representa rutas reales de aves. */
(() => {
  'use strict';
  const DATA_URL = './assets/kennedy_ecology.json';
  const GEO_W = 10682.66, GEO_H = 6323.80;
  const CENTER_X = 6730, CENTER_Y = 3350, EXTRA_ZOOM = 1.62;
  const ROTATE_DEG = 0;
  const canvas = document.getElementById('sumoEcologyCanvas');
  const toggle = document.getElementById('sumoEcologyToggle');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let data = null, visible = true, view = { scale: 1, offX: 0, offY: 0 };
  const saved = JSON.parse(localStorage.getItem('sumoModule8EcologyCalibration') || 'null') || { dx: 0, dy: 0, scale: 1, rotation: 0 };
  let dragging = false, lastPointer = null;

  function toScreen(x, y) {
    const rad = ((ROTATE_DEG + (saved.rotation || 0)) * Math.PI) / 180, c = Math.cos(rad), s = Math.sin(rad);
    x = CENTER_X + (x - CENTER_X) * (saved.scale || 1) + (saved.dx || 0);
    y = CENTER_Y + (y - CENTER_Y) * (saved.scale || 1) + (saved.dy || 0);
    const dx = x - CENTER_X, dy = y - CENTER_Y;
    const rx = dx * c - dy * s + CENTER_X, ry = dx * s + dy * c + CENTER_Y;
    return [rx * view.scale + view.offX, -ry * view.scale + view.offY];
  }
  function resize() {
    const wrap = canvas.parentElement, w = wrap.clientWidth, h = wrap.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(w * dpr)); canvas.height = Math.max(1, Math.round(h * dpr));
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scale = Math.min((w - 12) / GEO_W, (h - 12) / GEO_H) * EXTRA_ZOOM;
    view = { scale, offX: w / 2 - CENTER_X * scale, offY: h / 2 + CENTER_Y * scale };
    draw();
  }
  function draw() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    if (!visible || !data) return;
    ctx.save();
    ctx.globalAlpha = .58;
    ctx.fillStyle = '#3c9565'; ctx.strokeStyle = 'rgba(138,224,164,.38)'; ctx.lineWidth = .8;
    for (const feature of data.coverage || []) for (const ring of feature) {
      if (!ring.length) continue;
      ctx.beginPath(); const first = toScreen(ring[0][0], ring[0][1]); ctx.moveTo(first[0], first[1]);
      for (let i = 1; i < ring.length; i++) { const p = toScreen(ring[i][0], ring[i][1]); ctx.lineTo(p[0], p[1]); }
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    ctx.globalAlpha = .72;
    const max = Math.max(1, ...(data.treeCells || []).map(c => c.count));
    for (const cell of data.treeCells || []) {
      const p = toScreen(cell.x, cell.y), t = Math.min(1, Math.log1p(cell.count) / Math.log1p(max));
      const r = Math.max(1.1, Math.min(4.2, 1.1 + t * 3.1));
      ctx.fillStyle = `rgba(196,231,93,${.24 + t * .62})`;
      ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
  function updateReadout() {
    const readout = document.getElementById('sumoCalibReadout');
    if (readout) readout.textContent = `Desplazamiento actual: ΔX = ${Number(saved.dx).toFixed(1)} m · ΔY = ${Number(saved.dy).toFixed(1)} m`;
  }
  canvas.addEventListener('pointerdown', event => { if (!visible) return; dragging = true; lastPointer = { x: event.clientX, y: event.clientY }; canvas.setPointerCapture(event.pointerId); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('pointermove', event => {
    if (!dragging || !lastPointer || !view.scale) return;
    saved.dx += (event.clientX - lastPointer.x) / view.scale;
    saved.dy -= (event.clientY - lastPointer.y) / view.scale;
    lastPointer = { x: event.clientX, y: event.clientY }; updateReadout(); draw();
  });
  function stopDrag(event) { if (!dragging) return; dragging = false; lastPointer = null; canvas.style.cursor = 'grab'; try { canvas.releasePointerCapture(event.pointerId); } catch (_) {} }
  canvas.addEventListener('pointerup', stopDrag); canvas.addEventListener('pointercancel', stopDrag); canvas.addEventListener('pointerleave', event => { if (dragging) stopDrag(event); });
  toggle?.addEventListener('change', () => { visible = !!toggle.checked; draw(); });
  const ids = ['sumoCalibDx', 'sumoCalibDy', 'sumoCalibScale', 'sumoCalibRotation'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = saved[id.replace('sumoCalib', '').toLowerCase()] ?? (id.includes('Scale') ? 1 : 0); });
  document.getElementById('sumoCalibApply')?.addEventListener('click', () => {
    saved.dx = Number(document.getElementById('sumoCalibDx')?.value || 0);
    saved.dy = Number(document.getElementById('sumoCalibDy')?.value || 0);
    saved.scale = Math.max(.5, Math.min(1.5, Number(document.getElementById('sumoCalibScale')?.value || 1)));
    saved.rotation = Number(document.getElementById('sumoCalibRotation')?.value || 0);
    localStorage.setItem('sumoModule8EcologyCalibration', JSON.stringify(saved)); updateReadout(); draw();
    const status = document.getElementById('sumoCalibStatus'); if (status) status.textContent = 'Ajuste guardado en este navegador.';
  });
  document.getElementById('sumoCalibReset')?.addEventListener('click', () => { Object.assign(saved, { dx: 0, dy: 0, scale: 1, rotation: 0 }); ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = id.includes('Scale') ? 1 : 0; });     localStorage.setItem('sumoModule8EcologyCalibration', JSON.stringify(saved)); updateReadout(); draw(); });
  document.getElementById('sumoCalibCopy')?.addEventListener('click', async () => {
    const text = `ΔX = ${Number(saved.dx).toFixed(1)} m; ΔY = ${Number(saved.dy).toFixed(1)} m; escala = ${Number(saved.scale).toFixed(3)}; rotación = ${Number(saved.rotation).toFixed(1)}°`;
    try { await navigator.clipboard.writeText(text); } catch (_) {}
    const status = document.getElementById('sumoCalibStatus'); if (status) status.textContent = `Copiado: ${text}`;
  });
  updateReadout();
  window.addEventListener('resize', resize);
  fetch(DATA_URL).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(json => { data = json; resize(); const status = document.getElementById('sumoStatus'); if (status) status.textContent = `SUMO + capas ecológicas (${json.treeSourceCount.toLocaleString('es-CO')} árboles agregados)`; })
    .catch(err => console.warn('No se pudo cargar la capa ecológica del módulo 8', err));
})();
