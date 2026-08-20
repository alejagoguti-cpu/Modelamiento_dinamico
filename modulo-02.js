<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RAPOT · Una ciudad que no cabe en el POT</title>
  <link rel="stylesheet" href="modulo-02.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="app">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="brand">
        <div class="mark"><i class="fa-solid fa-city"></i></div>
        <span>RAPOT</span>
      </div>

      <nav class="nav-group">
        <div class="nav-label">Módulos</div>
        <a href="#" class="nav-item"><i class="fa-solid fa-diagram-project"></i><span class="num">01</span> Estructura</a>
        <a href="#" class="nav-item active"><i class="fa-solid fa-route"></i><span class="num">02</span> Movilidad</a>
        <a href="#" class="nav-item"><i class="fa-solid fa-droplet"></i><span class="num">03</span> Humedales</a>
        <a href="#" class="nav-item"><i class="fa-solid fa-scale-balanced"></i><span class="num">04</span> Contradicciones</a>
        <a href="#" class="nav-item"><i class="fa-solid fa-chart-network"></i><span class="num">05</span> Métricas</a>
        <a href="#" class="nav-item"><i class="fa-solid fa-flask"></i><span class="num">06</span> Simulación</a>
        <a href="#" class="nav-item"><i class="fa-solid fa-globe"></i><span class="num">07</span> ODS</a>
        <a href="#" class="nav-item"><i class="fa-solid fa-pen-ruler"></i><span class="num">08</span> Modelo alternativo</a>
      </nav>

      <div class="sidebar-footer">
        <div class="avatar-sm">AG</div>
        <div class="user-meta">
          <div class="name">Alejandro Guti</div>
          <div class="role">Equipo RAPOT</div>
        </div>
        <a href="#" class="logout-btn"><i class="fa-solid fa-right-from-bracket"></i></a>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="main">
      <!-- TOPBAR -->
      <div class="topbar">
        <div class="topbar-brand">
          <i class="fa-solid fa-route"></i>
          <h1>Bogotá Viva: Simulación Urbana</h1>
        </div>
        <div class="topbar-actions">
          <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i> Buscar componente...</div>
          <button class="icon-btn"><i class="fa-regular fa-bell"></i><span class="dot"></span></button>
          <button class="icon-btn"><i class="fa-solid fa-gear"></i></button>
        </div>
      </div>

      <!-- WELCOME -->
      <section class="welcome-with-quote">
        <div class="welcome-main">
          <div class="welcome-eyebrow">INGENIERÍA INVERSA</div>
          <h2>
            <span class="h2-plain">Una ciudad que</span><br />
            <span class="h2-accent">no cabe en el POT</span>
          </h2>
          <p class="welcome-sub">
            Ingeniería inversa al Modelo de Ordenamiento Territorial (MOT). Desarmamos el decreto para ver cómo interactúan realmente sus partes en el territorio.
          </p>
        </div>
        <div class="quote-card welcome-quote-card">
          <div class="quote-mark">"</div>
          <p>Realizamos una ingeniería inversa al Modelo de Ordenamiento Territorial (MOT). Desarmamos el decreto para ver cómo interactúan realmente sus partes en el territorio.</p>
          <div class="quote-attr">— Equipo POT Reverse Engineering</div>
        </div>
      </section>

      <!-- NOTA METODOLÓGICA -->
      <div class="method-note">
        <div class="method-note-header"><i class="fa-solid fa-circle-info"></i> Nota metodológica</div>
        <p>
          El POT formula un modelo concreto, propone un sistema multimodal, una ciudad de proximidad y grandes proyectos como el Metro, los Regiotram, los cables y las ciclorrutas. Sin embargo, esa relación aparece representada principalmente mediante infraestructuras, localizaciones, líneas, estaciones y metas de tiempo.
        </p>
        <p class="method-note-foot">
          Y muestra qué componentes deben conectarse y qué proyectos deberían producir esa conexión, pero representa de manera mucho más limitada el funcionamiento cotidiano de la movilidad.
        </p>
      </div>

      <!-- MÉTRICAS -->
      <div class="metrics-row">
        <div class="metric-box"><div class="metric-value" id="metricNodes">0</div><div class="metric-label">Componentes reales</div></div>
        <div class="metric-box"><div class="metric-value" id="metricEdges">0</div><div class="metric-label">Relaciones documentadas</div></div>
        <div class="metric-box highlight-bad"><div class="metric-value" id="metricVacios">0</div><div class="metric-label">Vacíos de articulación</div></div>
        <div class="metric-box"><div class="metric-value" id="metricDirectas">0</div><div class="metric-label">Relaciones directas</div></div>
        <div class="metric-box highlight-good"><div class="metric-value" id="metricCitaLiteral">0</div><div class="metric-label">Citas literales (Nivel A)</div></div>
        <div class="metric-box"><div class="metric-value" id="metricIndiceOficial">0</div><div class="metric-label">Índice oficial</div></div>
        <div class="metric-box"><div class="metric-value" id="metricHub">—</div><div class="metric-label">Hub de mayor grado</div></div>
      </div>

      <!-- RED PRINCIPAL -->
      <section class="network-section">
        <div class="network-body">
          <div class="network-canvas">
            <svg id="networkViz" viewBox="0 0 1400 780" preserveAspectRatio="xMidYMid meet"></svg>
            <div class="map-scale" title="Escala esquemática de referencia">
              <i class="fa-solid fa-location-arrow"></i>
              <div class="map-scale-bar"><span>0</span><span>5</span><span>10</span><span>15 km</span></div>
            </div>
          </div>

          <aside class="network-sidebar">
            <div class="legend-section">
              <div class="legend-label">Convenciones</div>
              <label class="legend-item"><input type="checkbox" checked data-mode="type" data-type="directa" /><span class="legend-swatch swatch-directa"></span><div class="legend-text"><strong>Directa</strong><small>Respaldo explícito del POT</small></div></label>
              <label class="legend-item"><input type="checkbox" checked data-mode="type" data-type="indirecta" /><span class="legend-swatch swatch-indirecta"></span><div class="legend-text"><strong>Indirecta</strong><small>Relación funcional intermedia</small></div></label>
              <label class="legend-item"><input type="checkbox" checked data-mode="type" data-type="vacio" /><span class="legend-swatch swatch-vacio"></span><div class="legend-text"><strong>Vacío</strong><small>Ausencia documentada</small></div></label>
            </div>

            <div class="legend-divider"></div>

            <div class="legend-section">
              <div class="legend-label">Categorías del POT</div>
              <label class="legend-item cat-item"><input type="checkbox" checked data-mode="cat" data-cat="e1" /><span class="cat-icon" style="border-color:#5cd6d1;color:#5cd6d1"><i class="fa-solid fa-leaf"></i></span><span class="cat-name">Ecológica Principal</span><span class="cat-count" id="struct-e1">0</span></label>
              <label class="legend-item cat-item"><input type="checkbox" checked data-mode="cat" data-cat="e2" /><span class="cat-icon" style="border-color:#ef9f54;color:#ef9f54"><i class="fa-solid fa-bus"></i></span><span class="cat-name">Funcional y del Cuidado</span><span class="cat-count" id="struct-e2">0</span></label>
              <label class="legend-item cat-item"><input type="checkbox" checked data-mode="cat" data-cat="e3" /><span class="cat-icon" style="border-color:#fac47b;color:#fac47b"><i class="fa-solid fa-briefcase"></i></span><span class="cat-name">Socioeconómica, Creativa</span><span class="cat-count" id="struct-e3">0</span></label>
              <label class="legend-item cat-item"><input type="checkbox" checked data-mode="cat" data-cat="e4" /><span class="cat-icon" style="border-color:#fb8d84;color:#fb8d84"><i class="fa-solid fa-landmark"></i></span><span class="cat-name">Integradora de Patrimonio</span><span class="cat-count" id="struct-e4">0</span></label>
            </div>

            <div class="legend-divider"></div>

            <div class="legend-section">
              <div class="legend-label">Tipo de relación</div>
              <div class="legend-static-item"><span class="legend-swatch swatch-directa-neutral"></span><span>Soporte (sostiene / habilita)</span></div>
              <div class="legend-static-item"><span class="legend-swatch swatch-indirecta-neutral"></span><span>Resiliencia</span></div>
            </div>

            <div class="network-sidebar-actions" id="networkSidebarActions">
              <button class="btn-primary" id="btnExplorarRelaciones"><i class="fa-solid fa-magnifying-glass-chart"></i> Explorar relaciones en detalle</button>
              <button class="btn-secondary" id="btnVerHallazgos"><i class="fa-solid fa-lightbulb"></i> Ver hallazgos clave</button>
            </div>
          </aside>
        </div>
      </section>

      <!-- OVERLAY HUMEDALES -->
      <section class="humedales-overlay" id="humedalesOverlay" style="display:none;">
        <div class="humedales-overlay-header">
          <div class="humedales-overlay-title">Vista ampliada · Red de humedales</div>
          <div class="humedales-zoom-controls">
            <button class="humedales-zoom-btn" id="humedalesZoomOut" title="Alejar"><i class="fa-solid fa-minus"></i></button>
            <button class="humedales-zoom-btn" id="humedalesZoomReset" title="Restablecer"><i class="fa-solid fa-compress"></i></button>
            <button class="humedales-zoom-btn" id="humedalesZoomIn" title="Acercar"><i class="fa-solid fa-plus"></i></button>
            <button class="humedales-overlay-close" id="humedalesOverlayClose" title="Cerrar"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
        <div class="humedales-overlay-body" id="humedalesOverlayBody"></div>
      </section>

      <!-- OVERLAY MOVILIDAD -->
      <section class="movilidad-overlay" id="movilidadOverlay" style="display:none;">
        <div class="movilidad-overlay-header">
          <div class="movilidad-overlay-title">Plano de movilidad · Hallazgos clave</div>
          <button class="humedales-overlay-close" id="movilidadOverlayClose" title="Cerrar"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="movilidad-overlay-body" id="movilidadOverlayBody"></div>
      </section>

      <!-- ANÁLISIS / MATRIZ -->
      <section class="analysis-container">
        <div class="analysis-card full-width">
          <div class="card-header">
            <h3><i class="fa-solid fa-table"></i> Matriz de relaciones</h3>
          </div>
          <div class="matrix-header">
            <div class="matrix-cell">Estructura</div>
            <div class="matrix-cell">Relación</div>
            <div class="matrix-cell">Tipo</div>
            <div class="matrix-cell">Fuente</div>
            <div class="matrix-cell">Referencia</div>
            <div class="matrix-cell">Análisis</div>
          </div>
          <div id="matrixRows"></div>
        </div>
      </section>

      <!-- SINERGIAS -->
      <section class="synergies-section">
        <div class="synergies-grid">
          <div class="synergy-card success">
            <div class="synergy-icon" style="background:rgba(74,222,128,0.15);color:#4ade80"><i class="fa-solid fa-check"></i></div>
            <div class="synergy-content">
              <h3>Sinergias documentadas</h3>
              <ul>
                <li>El POT reconoce quince humedales, pero no desarrolla todos con el mismo nivel de detalle.</li>
                <li>La cartografía puede fijar un polígono de protección, pero no muestra por sí sola los cambios del agua.</li>
              </ul>
            </div>
          </div>
          <div class="synergy-card conflict">
            <div class="synergy-icon" style="background:rgba(247,111,176,0.15);color:#f76fb0"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <div class="synergy-content">
              <h3>Contradicciones críticas</h3>
              <ul>
                <li>Sobre las 45 relaciones documentadas, 0 son puentes reales entre estructuras.</li>
                <li>Cada estructura es densa hacia adentro y prácticamente aislada hacia afuera.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>RAPOT · <span>Ingeniería inversa al POT de Bogotá</span> · 2026</p>
      </footer>
    </main>
  </div>

  <!-- PANELES DE INFO -->
  <div class="edge-info-panel" id="edgeInfoPanel">
    <div class="edge-info-header">
      <div id="edgeInfoTitle"></div>
      <button class="edge-info-close" id="edgeInfoClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div id="edgeInfoType" class="edge-info-type"></div>
    <div id="edgeInfoFuente"></div>
    <div id="edgeInfoQuote" class="edge-info-quote"></div>
    <div id="edgeInfoAnalisis" class="edge-info-analisis"></div>
    <div id="edgeInfoPage" class="edge-info-page"></div>
  </div>

  <div class="edge-info-panel node-info-panel" id="nodeInfoPanel">
    <div class="edge-info-header">
      <div id="nodeInfoTitle"></div>
      <button class="edge-info-close" id="nodeInfoClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div id="nodeInfoStruct" class="edge-info-type"></div>
    <div id="nodeInfoFuente"></div>
    <div class="node-info-mapa">
      <a href="#" target="_blank"><i class="fa-solid fa-map-location-dot"></i> Ver cartografía / geoportal oficial</a>
    </div>
  </div>

  <script src="modulo-02.js"></script>
</body>
</html>
