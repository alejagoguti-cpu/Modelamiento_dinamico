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

  function toScreen(x, y) {
    const rad = ROTATE_DEG * Math.PI / 180, c = Math.cos(rad), s = Math.sin(rad);
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
  toggle?.addEventListener('change', () => { visible = !!toggle.checked; draw(); });
  window.addEventListener('resize', resize);
  fetch(DATA_URL).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(json => { data = json; resize(); const status = document.getElementById('sumoStatus'); if (status) status.textContent = `SUMO + capas ecológicas (${json.treeSourceCount.toLocaleString('es-CO')} árboles agregados)`; })
    .catch(err => console.warn('No se pudo cargar la capa ecológica del módulo 8', err));
})();
