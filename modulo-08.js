/* ==========================================================
   MÓDULO 08 — SIMULADOR — POT Bogotá
   "Polígono estático vs agente dinámico".
   Canvas 2D: escena fija (predios, andén, equipamiento,
   vendedor, poste, franja verde) + agentes cuidadoras que
   se mueven con las 3 fuerzas (Helbing).
   ========================================================== */

const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");
const W = canvas.width, H = canvas.height;

/* ---------- estado ---------- */
let agencyOn = false;
let paused = false;
let rafId = null;
let t = 0;
let stats = { metas: 0, colisiones: 0, distancias: [], nTrayectos: 0 };
let disturb = null;   /* { tipo, t0, duracion } */
let agents = [];

/* ---------- escena ---------- */
/* Franja superior: predios (polígonos del POT). Andén: banda media. Franja verde abajo */
const PREDIOS = [
  { x: 60,   y: 70,  w: 220, h: 150, zona: "Residencial",   ic: "IC 5.0" },
  { x: 310,  y: 70,  w: 190, h: 150, zona: "Comercial",     ic: "IC 6.0" },
  { x: 530,  y: 70,  w: 210, h: 150, zona: "Residencial",   ic: "IC 5.0" },
  { x: 770,  y: 70,  w: 180, h: 150, zona: "Equipamiento",  ic: "E" },
  { x: 980,  y: 70,  w: 150, h: 150, zona: "Residencial",   ic: "IC 7.0" },
];
const EQUIPO = { x: 860, y: 145, r: 34, label: "ANCLA CUIDADO\n15 min" };
const VENDEDOR = { x: 560, y: 305, r: 14 };
const POSTE = { x: 780, y: 305, r: 9 };
const FRANJA = { x: 140, y: 340, w: 360, h: 34 };
const CALLE = { y: 288, h: 34 };
const ANDEN_TOP = 268;   /* alto andén = CALLE.y - predios fin */
const SUDS = { x: 1060, y: 305, r: 22 };  /* aparece en inundación: SUDS absorbe */

/* ---------- agentes ---------- */
function spawnAgent() {
  const x = 100 + Math.random() * 120;
  const y = ANDEN_TOP + 12 + Math.random() * (CALLE.y - ANDEN_TOP - 28);
  return {
    x, y,
    vx: 0, vy: 0,
    fatiga: 0,
    dist: 0,
    meta: false,
    hue: Math.random() > 0.5 ? "#f76fb0" : "#ffb8d9",
    r: 8 + Math.random() * 2,
    seed: Math.random() * 1000,
  };
}

function resetAgents() {
  agents = [];
  for (let i = 0; i < 14; i++) agents.push(spawnAgent());
  stats = { metas: 0, colisiones: 0, distancias: [], nTrayectos: 0 };
  t = 0; disturb = null;
}

/* ---------- fuerzas (Helbing) ---------- */
function stepAgent(a, dt) {
  if (a.meta) return;

  /* F1 atracción hacia el equipamiento */
  let tx = EQUIPO.x - a.x, ty = (EQUIPO.y + 10) - a.y;
  const d = Math.hypot(tx, ty) || 1;
  const kAtrac = 0.85;
  a.vx += (tx / d) * kAtrac;
  a.vy += (ty / d) * kAtrac;

  /* F2 repulsión: vendedor y poste */
  [VENDEDOR, POSTE].forEach(ob => {
    const ox = a.x - ob.x, oy = a.y - ob.y;
    const od = Math.hypot(ox, oy) || 1;
    const reach = ob.r + 34;
    if (od < reach) {
      const f = ((reach - od) / reach) * 1.1;
      a.vx += (ox / od) * f;
      a.vy += (oy / od) * f;
      stats.colisiones++;
    }
  });

  /* F2b perturbación sismo: repulsión desde el epicentro hacia parque seguro */
  if (disturb && disturb.tipo === "sismo") {
    const ex = 640 - a.x, ey = 90 - a.y;
    const ed = Math.hypot(ex, ey) || 1;
    if (ed < 220) {
      /* huir del centro, dirigirse al borde superior izq (parque seguro) */
      const px = 200 - a.x, py = 120 - a.y;
      const pd = Math.hypot(px, py) || 1;
      a.vx += (px / pd) * 0.5;
      a.vy += (py / pd) * 0.5;
    }
  }

  /* F3 fricción: velocidad base según posición vertical */
  const yMid = ANDEN_TOP + (CALLE.y - ANDEN_TOP) / 2;
  let vMax = 1.6;
  if (a.y < yMid) vMax = 1.15;               /* mitad norte: andén estrecho */
  const onGreen = a.x >= FRANJA.x && a.x <= FRANJA.x + FRANJA.w &&
                  a.y >= FRANJA.y - 6 && a.y <= FRANJA.y + FRANJA.h + 20;
  if (onGreen) {                             /* franja de paisajismo mitiga fatiga */
    a.fatiga = Math.max(0, a.fatiga - 0.12);
    vMax *= 1.08;
  } else {
    a.fatiga += 0.008;
  }
  if (disturb && disturb.tipo === "inundacion" && a.y > 320) vMax *= 0.55; /* agua frena */
  if (a.fatiga > 4) vMax *= 0.6;             /* fatiga acumulada reduce velocidad */

  /* amortiguación */
  a.vx *= 0.90; a.vy *= 0.90;
  const spd = Math.hypot(a.vx, a.vy) || 1;
  if (spd > vMax) { a.vx = (a.vx / spd) * vMax; a.vy = (a.vy / spd) * vMax; }

  a.x += a.vx * dt; a.y += a.vy * dt;
  a.dist += spd * dt * 2.4;

  /* límites del andén */
  if (a.x < 40) a.x = 40;

  /* meta alcanzada: el agente cruza la línea de fachada bajo el equipamiento,
     solo si ha caminado una distancia mínima (evita contar el respawneo) */
  const md = Math.hypot(EQUIPO.x - a.x, EQUIPO.y - a.y);
  if (!a.meta && (md < EQUIPO.r || a.y < ANDEN_TOP + 40)) {
    stats.metas++;
    stats.distancias.push(a.dist);
    stats.nTrayectos++;
    a.dist = 0;                                    /* reinicia distancia del nuevo trayecto */
    a.meta = false;                                /* permite repetir el ciclo */
    a.y = ANDEN_TOP + 12 + Math.random() * 10;   /* regresa al andén tras el trayecto */
  }
}

/* ---------- dibujo ---------- */
function drawBackground() {
  /* suelo */
  ctx.fillStyle = "#101526";
  ctx.fillRect(0, 0, W, H);

  /* predios (polígonos del POT) */
  PREDIOS.forEach(p => {
    ctx.fillStyle = agencyOn ? "rgba(91,141,239,0.12)" : "rgba(91,141,239,0.18)";
    ctx.strokeStyle = "rgba(91,141,239,0.55)";
    ctx.lineWidth = 1.5;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.strokeRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = "rgba(139,147,168,0.85)";
    ctx.font = "600 10px 'Space Grotesk', sans-serif";
    ctx.fillText(p.zona, p.x + 8, p.y + 16);
    ctx.font = "600 9px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "rgba(245,201,69,0.9)";
    ctx.fillText(p.ic, p.x + 8, p.y + 29);
  });

  /* andén banda central */
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(20, ANDEN_TOP, W - 40, CALLE.y - ANDEN_TOP);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.strokeRect(20, ANDEN_TOP, W - 40, CALLE.y - ANDEN_TOP);

  /* franja de paisajismo (Art. 155) */
  ctx.fillStyle = "rgba(74,222,128,0.16)";
  ctx.fillRect(FRANJA.x, FRANJA.y, FRANJA.w, FRANJA.h);
  ctx.strokeStyle = "rgba(74,222,128,0.6)";
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(FRANJA.x, FRANJA.y, FRANJA.w, FRANJA.h);
  ctx.setLineDash([]);
  /* árboles */
  for (let tx = FRANJA.x + 20; tx < FRANJA.x + FRANJA.w - 10; tx += 44) {
    ctx.fillStyle = "rgba(74,222,128,0.85)";
    ctx.beginPath(); ctx.arc(tx, FRANJA.y + FRANJA.h / 2, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(20,90,50,0.9)";
    ctx.beginPath(); ctx.arc(tx - 3, FRANJA.y + FRANJA.h / 2 - 2, 4, 0, Math.PI * 2); ctx.fill();
  }

  /* calle inferior */
  ctx.fillStyle = "rgba(239,68,68,0.08)";
  ctx.fillRect(20, CALLE.y, W - 40, 30);

  /* agua de inundación */
  if (disturb && disturb.tipo === "inundacion") {
    const fade = Math.min(1, (t - disturb.t0) / 60);
    ctx.fillStyle = `rgba(91,141,239,${0.22 * fade})`;
    ctx.fillRect(20, 318, W - 40, H - 340);
    /* SUDS activos: círculos que absorben */
    ctx.strokeStyle = `rgba(74,222,128,${0.9 * fade})`;
    ctx.lineWidth = 2;
    [SUDS, { x: 300, y: 345, r: 22 }, { x: 700, y: 335, r: 22 }].forEach(s => {
      const pulse = 1 + Math.sin(t * 0.08 + s.x) * 0.25;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * pulse, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = "rgba(74,222,128,0.9)";
    ctx.font = "600 9px 'Space Grotesk', sans-serif";
    ctx.fillText("SUDS Art.186 absorbiendo", SUDS.x - 55, SUDS.y - 32);
  }

  /* vendedor informal */
  const vPulse = disturb && disturb.tipo === "sismo" ? 0.4 : 1;
  ctx.fillStyle = `rgba(245,201,69,${0.85 * vPulse})`;
  ctx.beginPath(); ctx.arc(VENDEDOR.x, VENDEDOR.y, VENDEDOR.r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0a0e17";
  ctx.font = "700 9px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("V", VENDEDOR.x, VENDEDOR.y + 3);
  ctx.textAlign = "left";

  /* poste no soterrado */
  ctx.fillStyle = "rgba(139,147,168,0.9)";
  ctx.beginPath(); ctx.arc(POSTE.x, POSTE.y, POSTE.r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0a0e17";
  ctx.font = "700 8px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("P", POSTE.x, POSTE.y + 3);
  ctx.textAlign = "left";

  /* equipamiento ancla */
  ctx.fillStyle = "rgba(245,201,69,0.20)";
  ctx.beginPath(); ctx.arc(EQUIPO.x, EQUIPO.y, EQUIPO.r + 10 + Math.sin(t * 0.05) * 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(245,201,69,0.9)";
  ctx.beginPath(); ctx.arc(EQUIPO.x, EQUIPO.y, EQUIPO.r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#0a0e17";
  ctx.font = "700 10px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ANCLA", EQUIPO.x, EQUIPO.y - 2);
  ctx.fillText("15 min", EQUIPO.x, EQUIPO.y + 10);
  ctx.textAlign = "left";

  /* etiqueta modo */
  ctx.fillStyle = agencyOn ? "rgba(74,222,128,0.9)" : "rgba(139,147,168,0.8)";
  ctx.font = "700 11px 'Space Grotesk', sans-serif";
  ctx.fillText(agencyOn ? "MODO AGENCIA — agentes activos" : "MODO POT — polígonos con atributos", 30, 30);

  /* perturbación activa */
  if (disturb) {
    const labels = { sismo: "PERTURBACIÓN: SISMO — evacuación al parque seguro (Anexo 3)",
                     inundacion: "PERTURBACIÓN: INUNDACIÓN — SUDS y humedales en carga (Art. 186)",
                     informalidad: "PERTURBACIÓN: INFORMALIDAD — nuevos agentes entran por la ladera (Arts. 499–505)" };
    ctx.fillStyle = "rgba(239,68,68,0.9)";
    ctx.fillText(labels[disturb.tipo] || "", 30, H - 16);
  }
}

function drawAgents() {
  if (!agencyOn) return;
  agents.forEach(a => {
    /* sombra/estela */
    ctx.fillStyle = "rgba(247,111,176,0.18)";
    ctx.beginPath(); ctx.arc(a.x - a.vx * 2, a.y - a.vy * 2, a.r * 0.7, 0, Math.PI * 2); ctx.fill();
    /* agente */
    ctx.fillStyle = a.meta ? "rgba(74,222,128,0.85)" : a.hue;
    ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    /* fatiga: anillo */
    if (!a.meta && a.fatiga > 1.5) {
      ctx.strokeStyle = `rgba(239,68,68,${Math.min(0.9, a.fatiga / 6)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r + 4, 0, Math.PI * 2); ctx.stroke();
    }
    /* trayectoria: línea hacia la meta */
    if (!a.meta) {
      ctx.strokeStyle = "rgba(247,111,176,0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(EQUIPO.x, EQUIPO.y); ctx.stroke();
      ctx.setLineDash([]);
    }
  });
}

function loop() {
  rafId = null;
  if (!paused) {
    t++;
    /* perturbación con duración */
    if (disturb && t - disturb.t0 > disturb.dur) {
      disturb = null;
      VENDEDOR.y = 305;
    }
    if (agencyOn) {
      const dt = 1;
      agents.forEach(a => stepAgent(a, dt));
      /* re-spawn: los que llegan a la meta vuelven a empezar */
      agents.forEach(a => {
        if (a.meta && Math.random() < 0.02) {
          Object.assign(a, { x: 100 + Math.random() * 120, y: ANDEN_TOP + 12 + Math.random() * 18, vx: 0, vy: 0, fatiga: 0, dist: 0, meta: false });
        }
      });
    }
    drawBackground();
    drawAgents();
    updateMetrics();
  }
  rafId = requestAnimationFrame(loop);
}

/* ---------- métricas ---------- */
function updateMetrics() {
  const active = agents.filter(a => !a.meta).length;
  document.getElementById("mAgents").textContent = agencyOn ? active : "—";
  document.getElementById("mMeta").textContent = stats.metas || "—";
  document.getElementById("mCol").textContent = agencyOn ? stats.colisiones : "—";
  if (stats.distancias.length) {
    const avg = Math.round(stats.distancias.reduce((s, d) => s + d, 0) / stats.nTrayectos);
    document.getElementById("mDist").textContent = avg + " m";
  }
  let estado = "Modo POT";
  if (agencyOn) estado = disturb ? "Agencia + perturbación" : "Agencia activa";
  if (paused) estado += " · pausa";
  document.getElementById("mState").textContent = estado;
}

/* ---------- controles ---------- */
function setAgency(on) {
  agencyOn = on;
  document.getElementById("agencyInput").checked = on;
  document.getElementById("switchIcon").className = on ? "fa-solid fa-toggle-on" : "fa-solid fa-toggle-off";
  document.getElementById("switchLabel").textContent = on ? "Agencia ACTIVADA" : "Activar Agencia";
  document.getElementById("switchIcon").style.color = on ? "#4ade80" : "#8b93a8";
  const card = document.getElementById("switchLabel").closest(".switch-card");
  if (on) {
    document.querySelector(".switch-content h3").textContent = "Modo AGENCIA — la manzana como sistema de agentes";
    document.querySelector(".switch-content p").innerHTML = "Las cuidadoras caminan por el andén respondiendo a las reglas del POT: atracción al equipamiento a 15 minutos, evitación de vendedores y postes, fricción del diseño del andén y fatiga. Observa el trayecto real, las colisiones evitadas y el efecto de las perturbaciones.";
  } else {
    document.querySelector(".switch-content h3").textContent = "Modo POT — la manzana como polígono";
    document.querySelector(".switch-content p").innerHTML = "Por defecto, el lienzo muestra lo que el decreto representa: polígonos con atributos (zona, IC, clasificación), equipamientos como símbolos estáticos y obstáculos como líneas. Sin personas, sin tiempo, sin perturbaciones.";
  }
}

document.getElementById("agencyInput").addEventListener("change", (e) => {
  setAgency(e.target.checked);
  if (e.target.checked && !agents.length) resetAgents();
  if (e.target.checked && !rafId) loop();
});

function togglePause() {
  paused = !paused;
  const btn = document.getElementById("btnPause");
  btn.innerHTML = paused ? '<i class="fa-solid fa-play"></i> Continuar' : '<i class="fa-solid fa-pause"></i> Pausa';
  btn.classList.toggle("active", !paused);
}

function triggerDisturb(tipo) {
  disturb = { tipo, t0: t, dur: 600 };
  if (tipo === "sismo") VENDEDOR.y = 420;            /* el vendedor abandona su puesto */
  if (tipo === "informalidad") {
    /* 6 nuevos agentes entran desde la ladera (esquina inferior) */
    for (let i = 0; i < 6; i++) {
      const a = spawnAgent();
      a.x = W - 80 + Math.random() * 40;
      a.y = ANDEN_TOP + Math.random() * 20;
      agents.push(a);
    }
  }
  if (!agencyOn) setAgency(true);
  if (!rafId) loop();
}

function resetSim() {
  resetAgents();
  setAgency(false);
}

/* ---------- inicio ---------- */
resetAgents();
drawBackground();
updateMetrics();
loop();
paused = false;   /* el lienzo se pinta; los agentes se mueven al activar Agencia */
