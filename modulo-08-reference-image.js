(() => {
  'use strict';
  const wrap = document.getElementById('sumoCanvasWrap');
  const img = document.getElementById('sumoReferenceImage');
  const surface = document.getElementById('sumoImageDragSurface');
  const file = document.getElementById('sumoReferenceFile');
  const scaleInput = document.getElementById('sumoReferenceScale');
  const opacityInput = document.getElementById('sumoReferenceOpacity');
  const freeDraw = document.getElementById('sumoFreeDrawCanvas');
  if (!wrap || !img || !surface || !file) return;
  let state = { x: 30, y: 30, scale: 1, opacity: .55 };
  let dragging = false, last = null;
  function apply() { img.style.left = `${state.x}px`; img.style.top = `${state.y}px`; img.style.transform = `scale(${state.scale})`; img.style.opacity = state.opacity; if (scaleInput) scaleInput.value = state.scale; if (opacityInput) opacityInput.value = state.opacity; }
  function setMode(mode) { const move = mode === 'image'; window.sumoActiveMode = move ? 'image' : 'draw'; surface.style.pointerEvents = 'none'; if (freeDraw) freeDraw.style.pointerEvents = 'auto'; document.getElementById('sumoImageMode')?.classList.toggle('active', move); document.getElementById('sumoPenToggle')?.classList.toggle('active', !move); const s = document.getElementById('sumoImageStatus'); if (s) s.textContent = move ? 'Modo imagen: arrástrala sobre el plano.' : 'Modo dibujo: ahora puedes calcar el contorno.'; }
  function loadImage(f) { if (!f || !f.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = e => { img.src = e.target.result; img.hidden = false; surface.hidden = false; setMode('image'); apply(); const s = document.getElementById('sumoImageStatus'); if (s) s.textContent = 'Imagen pegada/cargada. Pulsa mover imagen y arrástrala.'; }; reader.readAsDataURL(f); }
  file.addEventListener('change', () => loadImage(file.files?.[0]));
  document.addEventListener('paste', event => { const item = [...(event.clipboardData?.items || [])].find(i => i.type.startsWith('image/')); if (!item) return; event.preventDefault(); loadImage(item.getAsFile()); });
  img.addEventListener('pointerdown', e => { if (window.sumoActiveMode !== 'image') return; e.preventDefault(); dragging = true; last = { x: e.clientX, y: e.clientY }; img.setPointerCapture(e.pointerId); img.style.cursor = 'grabbing'; });
  img.addEventListener('pointermove', e => { if (window.sumoActiveMode !== 'image' || !dragging || !last) return; e.preventDefault(); state.x += e.clientX - last.x; state.y += e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; apply(); });
  img.addEventListener('pointerup', () => { dragging = false; last = null; img.style.cursor = 'move'; }); img.addEventListener('pointercancel', () => { dragging = false; last = null; img.style.cursor = 'move'; });
  scaleInput?.addEventListener('input', () => { state.scale = Number(scaleInput.value); apply(); });
  opacityInput?.addEventListener('input', () => { state.opacity = Number(opacityInput.value); apply(); });
  document.getElementById('sumoImageMode')?.addEventListener('click', () => setMode('image'));
  document.getElementById('sumoPenToggle')?.addEventListener('click', () => setMode('draw'));
  document.getElementById('sumoReferenceClear')?.addEventListener('click', () => { img.hidden = true; surface.hidden = true; img.removeAttribute('src'); file.value = ''; });
  apply();
})();
