(() => {
  'use strict';
  const wrap = document.getElementById('sumoCanvasWrap');
  const img = document.getElementById('sumoReferenceImage');
  const surface = document.getElementById('sumoImageDragSurface');
  const file = document.getElementById('sumoReferenceFile');
  const scaleInput = document.getElementById('sumoReferenceScale');
  const opacityInput = document.getElementById('sumoReferenceOpacity');
  const freeDraw = document.getElementById('sumoFreeDrawCanvas');
  const output = document.getElementById('sumoImageOutput');
  if (!wrap || !img || !surface || !file) return;

  // Mapa de referencia de Kennedy (calles, humedales, parques) ya
  // acomodado con las coordenadas exactas que se dejaron la última vez,
  // para que cargue así desde el inicio en vez de en blanco.
  const DEFAULT_IMAGE_URL = './assets/modulo08-mapa-referencia-kennedy.png';
  const DEFAULT_STATE = { x: -102.8, y: -81.2, scale: 0.59, opacity: 0.82 };

  let state = { ...DEFAULT_STATE };
  let dragging = false, last = null;

  function apply() {
    img.style.left = `${state.x}px`;
    img.style.top = `${state.y}px`;
    img.style.transform = `scale(${state.scale})`;
    img.style.opacity = state.opacity;
    if (scaleInput) scaleInput.value = state.scale;
    if (opacityInput) opacityInput.value = state.opacity;
    exportImageState();
  }

  // Exporta las coordenadas EXACTAS de cómo quedó acomodada la imagen
  // (posición, escala, opacidad) para que se puedan copiar y pegar y así
  // dejar la misma imagen en el mismo lugar de forma permanente.
  function exportImageState() {
    if (!output) return;
    output.value = JSON.stringify({
      format: 'imagen-referencia-modulo-08',
      naturalWidth: img.naturalWidth || null,
      naturalHeight: img.naturalHeight || null,
      x: Math.round(state.x * 10) / 10,
      y: Math.round(state.y * 10) / 10,
      scale: Math.round(state.scale * 1000) / 1000,
      opacity: Math.round(state.opacity * 100) / 100,
    }, null, 2);
  }

  // Modo activo compartido con modulo-08-free-draw.js: "image" (mover la
  // imagen) o "draw" (dibujar con la pluma). Solo uno de los dos recibe
  // los clics a la vez — se decide con pointer-events, no solo con un
  // "if" adentro del handler, porque si el elemento de arriba en z-index
  // sigue con pointer-events:auto, INTERCEPTA el clic igual aunque su
  // propio código decida no hacer nada con él.
  function setMode(mode) {
    const move = mode === 'image';
    window.sumoActiveMode = move ? 'image' : 'draw';
    // clave del arreglo: la imagen deja de capturar clics cuando no es su turno,
    // así el lienzo de dibujo (que está debajo en z-index) sí puede recibirlos.
    img.style.pointerEvents = move ? 'auto' : 'none';
    surface.style.pointerEvents = 'none';
    if (freeDraw) freeDraw.style.pointerEvents = move ? 'none' : 'auto';
    document.getElementById('sumoImageMode')?.classList.toggle('active', move);
    document.getElementById('sumoPenToggle')?.classList.toggle('active', !move);
    const s = document.getElementById('sumoImageStatus');
    if (s) s.textContent = move ? 'Modo mover imagen: arrástrala sobre el plano.' : 'Modo pluma: ahora puedes dibujar encima (incluso sobre la imagen).';
  }
  window.sumoSetReferenceMode = setMode; // para que free-draw.js pueda usarlo también si hace falta

  function loadImage(f) {
    if (!f || !f.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.hidden = false;
      surface.hidden = false;
      state = { x: 30, y: 30, scale: 1, opacity: .55 };
      setMode('image');
      apply();
      const s = document.getElementById('sumoImageStatus');
      if (s) s.textContent = 'Imagen cargada. Acomódala (mover/escala/opacidad) y luego usa el botón de pluma para dibujar encima.';
    };
    reader.readAsDataURL(f);
  }
  file.addEventListener('change', () => loadImage(file.files?.[0]));
  document.addEventListener('paste', (event) => {
    const item = [...(event.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'));
    if (!item) return;
    event.preventDefault();
    loadImage(item.getAsFile());
  });

  img.addEventListener('pointerdown', (e) => {
    if (window.sumoActiveMode !== 'image') return;
    e.preventDefault();
    dragging = true;
    last = { x: e.clientX, y: e.clientY };
    img.setPointerCapture(e.pointerId);
    img.style.cursor = 'grabbing';
  });
  img.addEventListener('pointermove', (e) => {
    if (window.sumoActiveMode !== 'image' || !dragging || !last) return;
    e.preventDefault();
    state.x += e.clientX - last.x;
    state.y += e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    apply();
  });
  img.addEventListener('pointerup', () => { dragging = false; last = null; img.style.cursor = 'move'; });
  img.addEventListener('pointercancel', () => { dragging = false; last = null; img.style.cursor = 'move'; });

  scaleInput?.addEventListener('input', () => { state.scale = Number(scaleInput.value); apply(); });
  opacityInput?.addEventListener('input', () => { state.opacity = Number(opacityInput.value); apply(); });
  document.getElementById('sumoImageMode')?.addEventListener('click', () => setMode('image'));
  document.getElementById('sumoPenToggle')?.addEventListener('click', () => setMode('draw'));
  document.getElementById('sumoImageCopy')?.addEventListener('click', async () => {
    exportImageState();
    try { await navigator.clipboard.writeText(output?.value || ''); } catch (_) {}
    const s = document.getElementById('sumoImageStatus');
    if (s) s.textContent = 'Coordenadas de la imagen copiadas. Pégamelas en el chat junto con la misma imagen.';
  });
  document.getElementById('sumoReferenceClear')?.addEventListener('click', () => {
    img.hidden = true; surface.hidden = true; img.removeAttribute('src'); file.value = '';
    if (output) output.value = '';
  });

  apply();
  // Cargar automáticamente el mapa de referencia de Kennedy, ya ubicado
  // con las coordenadas dejadas la última vez, en vez de empezar en blanco.
  img.src = DEFAULT_IMAGE_URL;
  img.hidden = false;
  surface.hidden = false;
  apply();
  setMode('draw'); // arranca en modo pluma, listo para calcar sobre el mapa ya puesto
})();
