/* =============================================================================
   MÓDULO 04 · responsive-fixes.js  (v3)
   <script src="responsive-fixes.js" defer></script>  (ya enlazado en el HTML)

   Hace tres cosas:
   1) --sidebar-w : mide el ANCHO EXACTO del rail lateral fijo y lo publica,
      para que .main reserve ese espacio en vertical (Opción A) y el contenido
      NO quede debajo del sidebar. Si el rail NO es fijo/absoluto, publica 0
      (no hace falta offset) — así nunca duplica el margen.
   2) Altura del iframe de la animación: escritorio → vista amplia fija;
      portrait/móvil → ajustada al alto de su contenido (srcdoc = mismo origen),
      sin scroll anidado ni colapso.
   3) --app-vh : fallback de altura real de viewport (navegadores sin dvh).
   ============================================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const supportsDvh = window.CSS && CSS.supports && CSS.supports('height', '1dvh');

  /* ---------- 1) Ancho exacto del rail lateral → --sidebar-w ---------- */
  const sidebar = document.querySelector('.sidebar, .sidebar.sidebar-icons-only');
  function setSidebarVar() {
    if (!sidebar) return;
    const pos = getComputedStyle(sidebar).position;
    const fixedRail = (pos === 'fixed' || pos === 'absolute');
    const w = fixedRail ? Math.round(sidebar.getBoundingClientRect().width) : 0;
    root.style.setProperty('--sidebar-w', (w > 0 ? w : 0) + 'px');
  }

  /* ---------- 3) Fallback --app-vh ---------- */
  const setVh = () => root.style.setProperty('--app-vh', (window.innerHeight * 0.01) + 'px');

  /* ---------- 2) Altura del iframe de la animación ---------- */
  const iframe = document.querySelector('.workspace iframe, .workspace > .panel > iframe');
  const small = window.matchMedia('(orientation: portrait), (max-width: 900px)');
  const setH = (v) => iframe && iframe.style.setProperty('height', v, 'important');

  function fitIframe() {
    if (!iframe) return;
    if (small.matches) {
      try {
        const doc = iframe.contentDocument;   // srcdoc = mismo origen
        if (doc) {
          const h = Math.max(
            doc.documentElement ? doc.documentElement.scrollHeight : 0,
            doc.body ? doc.body.scrollHeight : 0
          );
          if (h > 0) { setH(h + 'px'); iframe.style.setProperty('min-height', '0', 'important'); return; }
        }
      } catch (_) { /* fallback abajo */ }
      setH('140vh'); iframe.style.setProperty('min-height', '440px', 'important');
    } else {
      setH(supportsDvh ? '82dvh' : 'calc(var(--app-vh) * 82)');
      iframe.style.setProperty('min-height', '560px', 'important');
    }
  }

  let ro = null;
  function observeInner() {
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument;
      if (doc && doc.documentElement && 'ResizeObserver' in window) {
        if (ro) ro.disconnect();
        ro = new ResizeObserver(() => { if (small.matches) fitIframe(); });
        ro.observe(doc.documentElement);
      }
    } catch (_) {}
  }

  /* ---------- ejecución + eventos ---------- */
  function runAll() { if (!supportsDvh) setVh(); setSidebarVar(); fitIframe(); }

  if (iframe) iframe.addEventListener('load', () => { runAll(); observeInner(); });

  const boot = () => { runAll(); observeInner(); };
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);

  let t;
  const schedule = () => { clearTimeout(t); t = setTimeout(runAll, 150); };
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(runAll, 300), { passive: true });
  if (small.addEventListener) small.addEventListener('change', runAll);
})();
