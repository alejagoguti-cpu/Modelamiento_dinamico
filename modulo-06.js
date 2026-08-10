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

/* SCENARIO SELECTOR */
.scenario-selector {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 28px;
}

.selector-header h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.selector-header h3 i {
  color: var(--teal);
}

.scenario-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.scenario-btn {
  background: var(--panel-alt);
  border: 2px solid var(--border-soft);
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all .2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  min-height: 96px;
}

.scenario-btn:hover {
  border-color: var(--teal);
  background: rgba(47,212,200,0.05);
}

.scenario-btn.active {
  border-color: var(--teal);
  background: rgba(47,212,200,0.08);
}

.scenario-btn i {
  font-size: 18px;
  color: var(--teal);
}

.btn-title {
  font-weight: 700;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text);
  display: block;
}

/* STATIC IMPACT NETWORK */
.network-static-section {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 28px;
}

.network-static-section h4 {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.network-static-section h4 i {
  color: var(--teal);
  font-size: 12px;
}

.network-static-wrap {
  width: 100%;
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  background: #05070d;
  overflow: hidden;
}

.network-static-wrap svg {
  width: 100%;
  height: auto;
  display: block;
}

.node-fill {
  stroke-width: 1.5;
  fill-opacity: 1;
}

.node-hub .node-fill {
  stroke-width: 2;
}

.node-main .node-fill {
  stroke-width: 2.5;
}

.node-label {
  font-size: 8.5px;
  fill: var(--text-dim);
  text-anchor: middle;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.node-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* categoría: ecológica */
.n-eco .node-fill { fill: #0d2b28; stroke: var(--teal); }
.n-eco .node-icon i { color: var(--teal); }

/* categoría: económica / creativa */
.n-econ .node-fill { fill: #2c1f14; stroke: var(--orange); }
.n-econ .node-icon i { color: var(--orange); }

/* categoría: funcional y del cuidado */
.n-func .node-fill { fill: #101c30; stroke: var(--blue); }
.n-func .node-icon i { color: var(--blue); }

/* categoría: integradora de patrimonios */
.n-patri .node-fill { fill: #221731; stroke: var(--purple); }
.n-patri .node-icon i { color: var(--purple); }

/* links */
.link-solid { stroke-width: 1.3; fill: none; }
.link-dashed { stroke-width: 1; stroke-dasharray: 4 3; fill: none; }
.link-thick { stroke-width: 2.2; }

.link-eco { stroke: rgba(47,212,200,0.5); }
.link-econ { stroke: rgba(239,149,82,0.5); }
.link-func { stroke: rgba(91,141,239,0.5); }
.link-patri { stroke: rgba(162,118,242,0.5); }
.link-cross { stroke: rgba(255,255,255,0.18); }

/* RESPONSIVE */
@media (max-width: 1400px) {
  .scenario-buttons { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { padding: 16px 20px 40px; }
  .scenario-buttons { grid-template-columns: 1fr; }
}
