:root {
  --bg: #0a0e17;
  --sidebar: #0c1120;
  --panel: #121828;
  --panel-alt: #0f1522;
  --border: rgba(255,255,255,0.07);
  --border-soft: rgba(255,255,255,0.04);
  --text: #e7eaf2;
  --text-dim: #8891a5;
  --text-faint: #5a6274;
  --teal: #2fd4c8;
  --teal-dim: rgba(47,212,200,0.12);
  --blue: #5b8def;
  --purple: #a276f2;
  --green: #4ade80;
  --yellow: #f5c945;
  --pink: #f76fb0;
  --orange: #ef9552;
  --red: #ef4444;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

.app { display: flex; min-height: 100vh; }

/* SIDEBAR */
.sidebar {
  width: 230px;
  flex-shrink: 0;
  background: var(--sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 20px 14px;
}

.brand {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 6px 22px 6px;
}

.brand .mark {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, var(--teal), #1a9d94);
  display: flex; align-items: center; justify-content: center;
  color: #06110f; font-size: 15px;
}

.brand span {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700; font-size: 16px; letter-spacing: 0.5px;
}

.nav-group { margin-bottom: 20px; }

.nav-label {
  font-size: 10.5px; font-weight: 700; letter-spacing: 1px;
  color: var(--text-faint);
  padding: 0 10px; margin-bottom: 8px;
}

.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: 8px;
  color: var(--text-dim);
  font-size: 13px; font-weight: 500;
  cursor: pointer;
  transition: background .15s, color .15s;
  white-space: nowrap;
  text-decoration: none;
}

.nav-item i { width: 16px; text-align: center; font-size: 13px; }

.nav-item .num {
  font-size: 11px; font-weight: 700; width: 16px; text-align: center; color: var(--text-faint);
}

.nav-item:hover { background: rgba(255,255,255,0.04); color: var(--text); }

.nav-item.active {
  background: var(--teal-dim);
  color: var(--teal);
}

.nav-item.active .num { color: var(--teal); }

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding-top: 12px;
  display: flex; align-items: center; gap: 10px;
}

.avatar-sm {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--panel);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: var(--text-dim);
  flex-shrink: 0;
}

.user-meta { line-height: 1.3; flex: 1; min-width: 0; }

.user-meta .name { font-size: 12.5px; font-weight: 600; color: var(--text); }

.user-meta .role { font-size: 11px; color: var(--text-faint); }

.logout-btn {
  background: none; border: none; color: var(--text-faint);
  font-size: 13px; cursor: pointer; padding: 4px;
  text-decoration: none;
}

.logout-btn:hover { color: var(--pink); }

/* MAIN */
.main { flex: 1; padding: 22px 34px 50px; min-width: 0; overflow-y: auto; }

.topbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 26px;
}

.topbar h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 19px; font-weight: 600;
}

.topbar-actions { display: flex; align-items: center; gap: 14px; }

.search-box {
  display: flex; align-items: center; gap: 8px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 14px;
  color: var(--text-faint);
  font-size: 13px;
  width: 230px;
}

.search-box i { font-size: 12px; }

.icon-btn {
  width: 34px; height: 34px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  background: var(--panel);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-size: 13px;
  position: relative;
}

.icon-btn .dot {
  position: absolute; top: 6px; right: 7px;
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--pink);
}

.welcome { margin-bottom: 28px; }

.welcome h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px; font-weight: 700; margin-bottom: 6px;
}

.welcome p { color: var(--text-dim); font-size: 14px; }

/* ODS INSIGHTS (reemplaza alignment-stats): 5 cuadros icono + título, clicables */
.ods-insight-stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

.insight-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: border-color .2s, background-color .2s, transform .15s;
}

.insight-card:hover {
  border-color: var(--insight-color, var(--teal));
  transform: translateY(-1px);
}

.insight-card.active {
  border-color: var(--insight-color, var(--teal));
  background: color-mix(in srgb, var(--insight-color, var(--teal)) 14%, var(--panel));
  box-shadow: 0 0 0 1px var(--insight-color, var(--teal)) inset;
}

.insight-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
  background: color-mix(in srgb, var(--insight-color, var(--teal)) 22%, transparent);
  color: var(--insight-color, var(--teal));
}

.insight-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

/* NETWORK SECTION */
.network-section {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 28px;
}

.network-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.network-header h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
}

.network-header h3 i {
  color: var(--teal);
  font-size: 13px;
}

.network-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  background: var(--panel-alt);
  border: 1px solid var(--border-soft);
  color: var(--text-dim);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
}

.control-btn:hover,
.control-btn.active {
  border-color: var(--teal);
  color: var(--teal);
  background: rgba(47,212,200,0.05);
}

/* -------- BARRA COMPACTA: Hallazgos + Contradicción (arriba del lienzo) -------- */
.fc-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  background: var(--panel-alt);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  padding: 9px 12px;
  margin-bottom: 12px;
}

.fc-group {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}

.fc-divider {
  width: 1px;
  align-self: stretch;
  background: var(--border-soft);
}

.fc-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: var(--teal);
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.fc-contradictions .fc-label { color: var(--red); }

.fc-chip {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  padding: 4px 11px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-dim);
  cursor: pointer;
  transition: background-color .15s, border-color .15s, color .15s;
  white-space: nowrap;
}

.fc-chip:hover {
  border-color: var(--teal);
  color: var(--text);
}

.fc-chip.active {
  background: color-mix(in srgb, var(--teal) 18%, transparent);
  border-color: var(--teal);
  color: var(--text);
}

.fc-chip-red:hover { border-color: var(--red); }
.fc-chip-red.active {
  background: color-mix(in srgb, var(--red) 18%, transparent);
  border-color: var(--red);
  color: var(--text);
}

/* NETWORK DIAGRAM + LEGEND */
.network-viz-wrap {
  display: flex;
  gap: 16px;
  align-items: stretch;
}

.network-canvas {
  position: relative;
  flex: 1;
  min-width: 0;
}

#networkViz {
  width: 100%;
  height: 560px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: block;
}

/* -------- POPUP DE HALLAZGOS (triple clic en ODS con insight / relación destacada) -------- */
.finding-popup {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 270px;
  max-width: calc(100% - 28px);
  background: var(--panel-alt);
  border: 1px solid var(--finding-color, var(--teal));
  box-shadow: 0 10px 28px rgba(0,0,0,0.4), 0 0 16px color-mix(in srgb, var(--finding-color, var(--teal)) 30%, transparent);
  border-radius: 10px;
  padding: 14px 30px 14px 16px;
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity .25s ease, transform .25s ease;
  z-index: 5;
}

.finding-popup.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* variante roja para contradicciones (misma caja, distinto acento) */
.finding-popup.contradiction {
  border-color: var(--red);
  box-shadow: 0 10px 28px rgba(0,0,0,0.4), 0 0 16px rgba(239,68,68,0.3);
}
.finding-popup.contradiction .finding-popup-badge { color: var(--red); }

.finding-popup-close {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-faint);
  font-size: 17px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.finding-popup-close:hover { color: var(--pink); }

.finding-popup-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--finding-color, var(--teal));
  margin-bottom: 8px;
}

.finding-popup-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
  line-height: 1.35;
}

.finding-popup-text {
  font-size: 11.5px;
  color: var(--text-dim);
  line-height: 1.55;
}

/* indicador visual sobre los nodos/relaciones que tienen un hallazgo asociado */
@keyframes findingPulse {
  0%, 100% { stroke-opacity: 1; }
  50% { stroke-opacity: 0.35; }
}

.ods-node.has-finding .node-ring {
  stroke-width: 3.5;
  animation: findingPulse 2.2s ease-in-out infinite;
}

.edge-group.has-finding .edge-visual {
  stroke-width: 3;
  filter: drop-shadow(0 0 3px var(--edge-color));
}

.network-sidebar {
  width: 205px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.network-legend {
  width: 100%;
  background: var(--panel-alt);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: flex-start;
}

.network-legend.compact {
  padding: 10px 12px;
  gap: 7px;
}

.network-legend.compact .legend-title { font-size: 9.5px; }
.network-legend.compact .legend-item { font-size: 10.5px; gap: 6px; }
.network-legend.compact .legend-divider { margin: 1px 0; }
.network-legend.compact .legend-hint { font-size: 9.5px; line-height: 1.4; }
.network-legend.compact .legend-swatch { width: 12px; height: 12px; }

.legend-hint {
  font-size: 10.5px;
  color: var(--text-faint);
  line-height: 1.5;
}

/* (paneles laterales de hallazgos/contradicciones migrados a .fc-bar, ver arriba) */

/* EDGE INFO PANEL (sustento documental) */
.edge-info-panel {
  display: none;
  width: 100%;
  background: var(--panel-alt);
  border: 1px solid var(--teal);
  box-shadow: 0 0 14px rgba(47,212,200,0.15);
  border-radius: 8px;
  padding: 14px;
}

.edge-info-panel.visible { display: block; }

.edge-info-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

#edgeInfoTitle {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--teal);
  line-height: 1.3;
}

.edge-info-close {
  background: none;
  border: none;
  color: var(--text-faint);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 0 0 0 6px;
  flex-shrink: 0;
}

.edge-info-close:hover { color: var(--pink); }

.edge-info-type {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.edge-info-quote {
  font-size: 11.5px;
  color: var(--text-dim);
  line-height: 1.55;
  font-style: italic;
  border-left: 2px solid var(--border);
  padding-left: 10px;
  margin-bottom: 10px;
}

.edge-info-page {
  font-size: 11px;
  color: var(--text-faint);
  font-weight: 600;
}

.legend-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-faint);
  text-transform: uppercase;
  margin-bottom: 2px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-dim);
  cursor: pointer;
  user-select: none;
  transition: color .15s, opacity .15s;
}

.legend-item:hover { color: var(--text); }

.legend-item.off { opacity: 0.4; }

.legend-item input {
  appearance: none;
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--panel);
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

.legend-item input:checked {
  background: var(--teal);
  border-color: var(--teal);
}

.legend-item input:checked::after {
  content: "";
  position: absolute;
  left: 4px; top: 1px;
  width: 4px; height: 8px;
  border: solid #06110f;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.legend-swatch {
  width: 22px;
  height: 0;
  border-top-width: 2px;
  border-top-style: solid;
  flex-shrink: 0;
}

.swatch-comp   { border-color: #4ade80; }
.swatch-func   { border-color: #5b8def; }
.swatch-causal { border-color: #f76fb0; border-top-width: 1.5px; }
.swatch-cond   { border-color: #ef9552; }

.swatch-directa   { border-color: #ffffff; }
.swatch-nodirecta { border-color: #ffffff; border-top-style: dashed; }

.legend-item.legend-static { cursor: default; }

.legend-divider {
  height: 1px;
  background: var(--border-soft);
  margin: 2px 0;
}

/* SVG node/edge styling */
.ods-node { cursor: grab; touch-action: none; }
.ods-node.dragging { cursor: grabbing; }
.ods-node .node-ring { fill: rgba(8,11,18,0.6); transition: opacity .2s; }
.ods-node .node-inner { font-family: 'Inter', sans-serif; color: var(--text); text-align: center; transition: opacity .2s; }
.ods-node .node-num { font-family: 'Space Grotesk', sans-serif; font-weight: 800; line-height: 1; }
.ods-node .node-icon { line-height: 1; }
.ods-node .node-name { color: var(--text-dim); font-weight: 600; line-height: 1.05; }

.ods-node.node-off .node-ring { opacity: 0.18; }
.ods-node.node-off .node-inner { opacity: 0.28; }

.ods-node { transition: opacity .2s; }
.ods-node.node-focus-dim { opacity: 0.12; }
.ods-node.node-focus-active .node-ring { filter: drop-shadow(0 0 8px #fff); }

.edge-group { cursor: pointer; }
.edge-group.hidden-edge { display: none; }
.edge-group { transition: opacity .2s; }
.edge-group.edge-focus-dim { opacity: 0.05; }

.ods-edge.edge-visual { fill: none; pointer-events: none; transition: opacity .15s, filter .15s; }
.ods-edge.edge-hit { fill: none; stroke: transparent; stroke-width: 12; pointer-events: stroke; }

.edge-group:hover .edge-visual {
  opacity: 1 !important;
  filter: drop-shadow(0 0 4px var(--edge-color));
}

.edge-group.edge-selected .edge-visual {
  opacity: 1 !important;
  filter: drop-shadow(0 0 6px var(--edge-color));
}

footer {
  text-align: center;
  margin-top: 34px;
  font-size: 12px;
  color: var(--text-faint);
}

footer span { color: var(--teal); }

/* RESPONSIVE */
@media (max-width: 1200px) {
  .ods-insight-stats { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .network-viz-wrap { flex-direction: column; }
  .network-legend { width: 100%; flex-direction: row; flex-wrap: wrap; align-self: stretch; }
  #networkViz { height: 460px; }
}

@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { padding: 16px 20px 40px; }
  .ods-insight-stats { grid-template-columns: 1fr; }
}

/* ==========================================================
   RED DE ESTRUCTURAS DEL POT (segunda red, estática)
   ========================================================== */
.pn-section {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-top: 28px;
  margin-bottom: 28px;
  opacity: 0.94;
}

.pn-wrap {
  display: flex;
  gap: 16px;
  align-items: stretch;
}

.pn-canvas {
  position: relative;
  flex: 1;
  min-width: 0;
}

#pnViz {
  width: 100%;
  height: 460px;
  background: var(--panel-alt);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: block;
  touch-action: none;
}

.pn-node .pn-node-ring { fill: rgba(8,11,18,0.65); }
.pn-node text, .pn-node div { font-family: 'Inter', sans-serif; }

.pn-edge-group { cursor: pointer; }
.pn-edge { fill: none; }
.pn-edge-hit { stroke: transparent; stroke-width: 10; pointer-events: stroke; }
.pn-edge-visual { pointer-events: none; transition: opacity .2s, stroke-width .2s, filter .2s; }

.pn-edge-group:hover .pn-edge-visual {
  opacity: 1 !important;
  filter: drop-shadow(0 0 4px var(--pn-edge-color));
}

.pn-edge-group.pn-edge-selected .pn-edge-visual {
  opacity: 1 !important;
  filter: drop-shadow(0 0 6px var(--pn-edge-color));
}

.pn-edge-group.pn-edge-dim .pn-edge-visual { opacity: 0.08 !important; }

.pn-edge-group.pn-edge-highlight .pn-edge-visual {
  opacity: 1 !important;
  stroke-width: 3 !important;
  filter: drop-shadow(0 0 6px var(--pn-edge-color));
}

.pn-ods-connector {
  fill: none;
  stroke: rgba(231,234,242,0.35);
  stroke-width: 1;
  stroke-dasharray: 3,3;
  opacity: 0;
  transition: opacity .2s;
}

.pn-node { transition: opacity .2s; }
.pn-node-dim { opacity: 0.12; }
.pn-node-active .pn-node-ring { filter: drop-shadow(0 0 6px #fff); stroke-width: 2.4; }

.pn-ods-link { fill: none; stroke-width: 1.6; }

.pn-ods-badge-group { opacity: 0; pointer-events: none; transition: opacity .2s; }
.pn-ods-badge-group.visible { opacity: 1; }
.pn-ods-badge-group.visible .pn-ods-connector { opacity: 1; }

.pn-ods-badge { stroke: #06110f; stroke-width: 1; }
.pn-ods-badge-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 800;
  fill: #06110f;
}

/* panel "Sustento" de la red de estructuras */
.pn-sustento-panel {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 280px;
  max-width: calc(100% - 28px);
  background: var(--panel-alt);
  border: 1px solid var(--teal);
  box-shadow: 0 10px 28px rgba(0,0,0,0.4), 0 0 14px rgba(47,212,200,0.18);
  border-radius: 10px;
  padding: 14px 30px 14px 16px;
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity .2s ease, transform .2s ease;
  z-index: 5;
  max-height: calc(100% - 28px);
  overflow-y: auto;
}

.pn-sustento-panel.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.pn-sustento-close {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-faint);
  font-size: 17px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.pn-sustento-close:hover { color: var(--pink); }

.pn-sustento-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 8px;
}

.pn-sustento-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
  line-height: 1.3;
}

.pn-sustento-type {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.pn-sustento-ods {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  font-size: 10.5px;
  color: var(--text-dim);
  margin-bottom: 8px;
}

.pn-ods-chip {
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
}

.pn-sustento-quote-block { margin-bottom: 8px; }
.pn-sustento-quote-block:last-child { margin-bottom: 0; }

.pn-sustento-quote {
  font-size: 11.5px;
  color: var(--text-dim);
  line-height: 1.5;
  font-style: italic;
  border-left: 2px solid var(--border);
  padding-left: 10px;
  margin-bottom: 4px;
}

.pn-sustento-page {
  font-size: 10.5px;
  color: var(--text-faint);
  font-weight: 600;
}

/* panel derecho: "1. Relaciones que favorecen los ODS" */
.pn-sidebar {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pn-findings-panel {
  background: var(--panel-alt);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pn-findings-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--green);
  margin-bottom: 4px;
}

.pn-finding-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  padding: 9px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-dim);
  text-align: left;
  cursor: pointer;
  transition: border-color .15s, color .15s, background-color .15s;
  display: flex;
  flex-direction: column;
  gap: 5px;
  line-height: 1.35;
}

.pn-finding-item:hover { border-color: var(--green); color: var(--text); }

.pn-finding-item.active {
  border-color: var(--green);
  color: var(--text);
  background: color-mix(in srgb, var(--green) 14%, transparent);
}

.pn-finding-ods {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--green);
  text-transform: uppercase;
}

.pn-legend-hint {
  font-size: 10px;
  color: var(--text-faint);
  line-height: 1.5;
  padding: 0 2px;
}

@media (max-width: 900px) {
  .pn-wrap { flex-direction: column; }
  .pn-sidebar { width: 100%; }
  #pnViz { height: 400px; }
}
