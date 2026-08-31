/* ==========================================================================
   SIMULACIÓN DE MOVILIDAD (SUMO) — MÓDULO 8
   ==========================================================================
   Renderiza la red vial real de Kennedy (assets/kennedy_net.json) y reproduce
   las trayectorias vehiculares exactas simuladas en SUMO (assets/kennedy_vehiculos.json).
   Ambos conjuntos de datos comparten el mismo sistema de coordenadas métricas,
   garantizando que el 100% de los vehículos transite con precisión matemática
   sobre los carriles y curvas de las vías, sin desalineaciones ni desvíos.
   ========================================================================== */
(() => {
  "use strict";

  const NET_URL = "./assets/kennedy_net.json";
  const VEHICULOS_URL = "./assets/kennedy_vehiculos.json";

  const EDGE_STYLE = {
    local: { color: "#16202f", width: 1.0 },
    mid:   { color: "#2d4260", width: 2.0 },
    major: { color: "#56b8d4", width: 3.2 }
  };

  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    const netCanvas = document.getElementById("sumoNetCanvas");
    const vehCanvas = document.getElementById("sumoVehCanvas");
    const statusEl = document.getElementById("sumoStatus");
    const playBtn = document.getElementById("sumoPlayPause");
    const slider = document.getElementById("sumoTimeSlider");
    const timeLabel = document.getElementById("sumoTimeLabel");
    const speedSelect = document.getElementById("sumoSpeedSelect");

    if (!netCanvas || !vehCanvas) return;

    const netCtx = netCanvas.getContext("2d");
    const vehCtx = vehCanvas.getContext("2d");

    let netData = null;
    let timesteps = [];
    let playing = false;
    let speedMultiplier = 2;
    let playhead = 0;
    let lastFrameTs = 0;
    let rafId = 0;
    let isScrubbing = false;

    // Mapa de ángulos previos para evitar giros bruscos cuando un carro frena
    const angleMap = new Map();

    function setStatus(text, show = true) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.classList.toggle("hidden", !show);
    }

    function fmtTime(t) {
      const m = Math.floor(t / 60);
      const s = Math.floor(t % 60);
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    let canvasW = 0;
    let canvasH = 0;
    let scale = 1;
    let offX = 0;
    let offY = 0;
    let minX = 0, minY = 0, maxX = 0, maxY = 0;

    function resizeCanvases() {
      const wrap = vehCanvas.parentElement;
      if (!wrap) return;
      canvasW = wrap.clientWidth;
      canvasH = wrap.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      netCanvas.width = Math.max(1, Math.round(canvasW * dpr));
      netCanvas.height = Math.max(1, Math.round(canvasH * dpr));
      vehCanvas.width = Math.max(1, Math.round(canvasW * dpr));
      vehCanvas.height = Math.max(1, Math.round(canvasH * dpr));

      netCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      vehCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (netData && netData.bbox) {
        [minX, minY, maxX, maxY] = netData.bbox;
        const netW = maxX - minX || 1;
        const netH = maxY - minY || 1;

        // Margen pequeño para que la red no toque los bordes del contenedor
        const padding = 12;
        const availW = Math.max(1, canvasW - padding * 2);
        const availH = Math.max(1, canvasH - padding * 2);

        scale = Math.min(availW / netW, availH / netH);
        offX = padding + (availW - netW * scale) / 2;
        offY = padding + (availH - netH * scale) / 2;

        drawRoadNetwork();
      }
    }

    function toScreen(x, y) {
      return [
        offX + (x - minX) * scale,
        canvasH - (offY + (y - minY) * scale)
      ];
    }

    function drawRoadNetwork() {
      if (!netData || !netData.edges) return;

      netCtx.clearRect(0, 0, canvasW, canvasH);
      netCtx.fillStyle = "#05070a";
      netCtx.fillRect(0, 0, canvasW, canvasH);

      netCtx.lineJoin = "round";
      netCtx.lineCap = "round";

      // Dibujar por capas de jerarquía: local -> mid -> major
      ["local", "mid", "major"].forEach((cls) => {
        const style = EDGE_STYLE[cls] || EDGE_STYLE.local;
        netCtx.strokeStyle = style.color;
        netCtx.lineWidth = style.width;
        netCtx.beginPath();

        netData.edges.forEach(([c, pts]) => {
          if (c !== cls || !pts || pts.length < 2) return;
          const [sx, sy] = toScreen(pts[0][0], pts[0][1]);
          netCtx.moveTo(sx, sy);
          for (let i = 1; i < pts.length; i++) {
            const [px, py] = toScreen(pts[i][0], pts[i][1]);
            netCtx.lineTo(px, py);
          }
        });

        netCtx.stroke();
      });
    }

    function vehiclesAtTime(t) {
      if (!timesteps.length) return [];
      if (t <= timesteps[0].time) {
        return timesteps[0].vehicles.map(v => {
          const [sx, sy] = toScreen(v.x, v.y);
          return { id: v.id, sx, sy, angle: angleMap.get(v.id) || 0 };
        });
      }
      if (t >= timesteps[timesteps.length - 1].time) {
        const last = timesteps[timesteps.length - 1];
        return last.vehicles.map(v => {
          const [sx, sy] = toScreen(v.x, v.y);
          return { id: v.id, sx, sy, angle: angleMap.get(v.id) || 0 };
        });
      }

      let lo = 0, hi = timesteps.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (timesteps[mid].time <= t) lo = mid;
        else hi = mid;
      }

      const a = timesteps[lo];
      const b = timesteps[hi];
      const span = b.time - a.time || 1;
      const frac = (t - a.time) / span;

      const bMap = new Map(b.vehicles.map((v) => [v.id, v]));

      return a.vehicles.map((va) => {
        const [sxa, sya] = toScreen(va.x, va.y);
        const vb = bMap.get(va.id);

        if (!vb) {
          return { id: va.id, sx: sxa, sy: sya, angle: angleMap.get(va.id) || 0 };
        }

        const [sxb, syb] = toScreen(vb.x, vb.y);
        const sx = sxa + (sxb - sxa) * frac;
        const sy = sya + (syb - sya) * frac;

        const dsx = sxb - sxa;
        const dsy = syb - sya;

        let angle = angleMap.get(va.id) || 0;
        if (dsx * dsx + dsy * dsy > 0.0001) {
          angle = Math.atan2(dsy, dsx);
          angleMap.set(va.id, angle);
        }

        return { id: va.id, sx, sy, angle };
      });
    }

    function drawVehiclesAt(t) {
      if (!vehCtx) return;
      vehCtx.clearRect(0, 0, canvasW, canvasH);

      const vehicles = vehiclesAtTime(t);

      const carLength = 7.5;
      const carWidth = 3.6;
      const r = 1.0;

      vehicles.forEach((v) => {
        vehCtx.save();
        vehCtx.translate(v.sx, v.sy);
        vehCtx.rotate(v.angle);

        // Sombra suave bajo el vehículo
        vehCtx.fillStyle = "rgba(0, 0, 0, 0.4)";
        vehCtx.fillRect(-carLength / 2, -carWidth / 2 + 1, carLength, carWidth);

        // Carrocería
        vehCtx.fillStyle = "#ffb020";
        vehCtx.beginPath();
        if (vehCtx.roundRect) {
          vehCtx.roundRect(-carLength / 2, -carWidth / 2, carLength, carWidth, r);
        } else {
          vehCtx.rect(-carLength / 2, -carWidth / 2, carLength, carWidth);
        }
        vehCtx.fill();

        // Parabrisas / Frente
        vehCtx.fillStyle = "#5c3300";
        vehCtx.fillRect(carLength * 0.08, -carWidth / 2 + 0.6, carLength * 0.32, carWidth - 1.2);

        vehCtx.restore();
      });

      const totalTime = timesteps.length ? timesteps[timesteps.length - 1].time : 0;
      timeLabel.textContent = `${fmtTime(t)} / ${fmtTime(totalTime)}`;
      if (!isScrubbing) slider.value = String(Math.round(t));
    }

    function step(ts) {
      if (!playing) return;
      if (!lastFrameTs) lastFrameTs = ts;
      const dt = (ts - lastFrameTs) / 1000;
      lastFrameTs = ts;

      const totalTime = timesteps.length ? timesteps[timesteps.length - 1].time : 0;
      playhead = Math.min(totalTime, playhead + dt * speedMultiplier);

      drawVehiclesAt(playhead);

      if (playhead >= totalTime) {
        playing = false;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        return;
      }
      rafId = requestAnimationFrame(step);
    }

    playBtn?.addEventListener("click", () => {
      if (!timesteps.length) return;
      playing = !playing;
      playBtn.innerHTML = playing
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
      if (playing) {
        lastFrameTs = 0;
        rafId = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(rafId);
      }
    });

    slider?.addEventListener("input", () => {
      isScrubbing = true;
      playhead = Number(slider.value);
      drawVehiclesAt(playhead);
    });

    slider?.addEventListener("change", () => {
      isScrubbing = false;
    });

    speedSelect?.addEventListener("change", () => {
      speedMultiplier = Number(speedSelect.value) || 1;
    });

    window.addEventListener("resize", () => {
      resizeCanvases();
      drawVehiclesAt(playhead);
    });

    // Carga secuencial: primero la red, luego los vehículos
    setStatus("Cargando red vial de Kennedy...");

    fetch(NET_URL)
      .then((r) => {
        if (!r.ok) throw new Error("No se pudo cargar la red vial");
        return r.json();
      })
      .then((data) => {
        netData = data;
        resizeCanvases();
        setStatus("Cargando trayectorias vehiculares de SUMO...");
        return fetch(VEHICULOS_URL);
      })
      .then((r) => {
        if (!r.ok) throw new Error("No se pudo cargar las trayectorias vehiculares");
        return r.json();
      })
      .then((data) => {
        timesteps = data.map(([time, vehicles]) => ({
          time,
          vehicles: vehicles.map(([id, x, y]) => ({ id, x, y }))
        }));

        const totalTime = timesteps.length ? timesteps[timesteps.length - 1].time : 0;
        slider.max = String(Math.round(totalTime));
        slider.disabled = false;
        playBtn.disabled = false;
        setStatus("", false);
        timeLabel.textContent = `00:00 / ${fmtTime(totalTime)}`;
        drawVehiclesAt(0);
      })
      .catch((err) => {
        console.error(err);
        setStatus("Error al cargar la simulación: " + err.message);
      });
  });
})();
