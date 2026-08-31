/* ==========================================================================
   SIMULACIÓN DE MOVILIDAD (SUMO) — módulo 8
   ==========================================================================
   Renderiza en 2D, sobre <canvas>, la red vial exportada de SUMO
   (osm.net.xml) y las trayectorias vehiculares de una simulación
   (trazado.xml), con controles de reproducción/pausa, línea de tiempo y
   velocidad.

   ARCHIVOS QUE ESTE SCRIPT ESPERA ENCONTRAR (rutas relativas a esta página):

   1) ./assets/kennedy_net.json
      Ya generado a partir de tu osm.net.xml: es una versión recortada
      (solo la zona de Kennedy, sin veredas/ciclovías) y convertida a JSON
      para que cargue rápido en el navegador. Si vuelves a exportar la red
      desde SUMO y quieres actualizarla, dímelo y la vuelvo a generar.

      Formato:
      { "offset": [offX, offY], "bbox": [0,0,w,h],
        "edges": [ ["major"|"mid"|"local", [[x,y], [x,y], ...]], ... ] }

   2) ./assets/kennedy_vehiculos.json  (preferido)
      Ya generado a partir de tu vehiculos.json: filtrado a la zona de
      Kennedy y con las mismas coordenadas locales que la red (mismo
      "offset" ya restado). Formato compacto:
      [ [tiempo, [[id, x, y], [id, x, y], ...]], ... ]
      No trae ángulo — se calcula solo, mirando hacia dónde se mueve cada
      auto entre un instante y el siguiente.

   3) ./assets/trazado.xml  (alternativa, si no existe el JSON de arriba)
      Tu archivo de trayectorias, tal como lo exporta SUMO en modo
      "FCD output" (--fcd-output). Súbelo tú mismo a la carpeta /assets
      de tu repositorio en GitHub (por eso no lo pude cargar yo).
      Formato esperado (el que genera SUMO por defecto):

        <fcd-export>
          <timestep time="0.00">
            <vehicle id="veh0" x="12345.6" y="7890.1" angle="90.0" .../>
            ...
          </timestep>
          ...
        </fcd-export>

      Los x,y de este archivo deben estar en las MISMAS coordenadas locales
      que tu osm.net.xml original (las que trae "netconvert" antes de
      cualquier recorte) — este script les resta automáticamente el mismo
      "offset" que se usó al recortar la red, para que ambos coincidan.
   ========================================================================== */
(() => {
  "use strict";

  const NET_URL = "./assets/kennedy_net.json";
  const VEHICULOS_JSON_URL = "./assets/kennedy_vehiculos.json";
  const TRAZADO_URL = "./assets/trazado.xml";

  const EDGE_STYLE = {
    major: { color: "rgba(255,255,255,0.55)", width: 2.4 },
    mid:   { color: "rgba(255,255,255,0.38)", width: 1.6 },
    local: { color: "rgba(255,255,255,0.22)", width: 1 },
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
    if (!netCanvas || !vehCanvas) return; // esta página no tiene el panel

    const netCtx = netCanvas.getContext("2d");
    const vehCtx = vehCanvas.getContext("2d");

    let netData = null;      // { offset, bbox, edges }
    let timesteps = [];      // [{ time, vehicles:[{id,x,y,angle}] }]
    let view = { scale: 1, offX: 0, offY: 0 }; // mundo -> pantalla
    let playing = false;
    let speedMultiplier = 2;
    let playhead = 0;        // segundos de simulación transcurridos
    let lastFrameTs = 0;
    let rafId = 0;

    function setStatus(text, show = true) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.classList.toggle("hidden", !show);
    }

    function fmtTime(t) {
      const m = Math.floor(t / 60), s = Math.floor(t % 60);
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    // ---------- tamaño de los canvas (con devicePixelRatio) ----------
    function resizeCanvases() {
      const wrap = netCanvas.parentElement;
      const w = wrap.clientWidth, h = wrap.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      [netCanvas, vehCanvas].forEach((c) => {
        c.width = Math.max(1, Math.round(w * dpr));
        c.height = Math.max(1, Math.round(h * dpr));
      });
      netCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      vehCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (netData) {
        computeView(w, h);
        drawNetwork(w, h);
      }
    }

    // Calcula escala/offset para que la red quepa completa en el canvas,
    // conservando proporción (como "background-size: contain").
    function computeView(w, h) {
      const [, , bw, bh] = netData.bbox;
      const pad = 6;
      const scale = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
      const offX = (w - bw * scale) / 2;
      const offY = (h - bh * scale) / 2;
      view = { scale, offX, offY };
    }

    // Coordenadas del mundo SUMO (ya con el offset del recorte aplicado)
    // a coordenadas de pantalla dentro del canvas.
    function toScreen(x, y) {
      return [x * view.scale + view.offX, y * view.scale + view.offY];
    }

    function drawNetwork(w, h) {
      netCtx.clearRect(0, 0, w, h);
      netCtx.lineJoin = "round";
      netCtx.lineCap = "round";
      // se dibuja primero lo local (más numeroso y fino) y encima lo
      // principal (más grueso), para que las vías grandes no queden tapadas
      ["local", "mid", "major"].forEach((cls) => {
        const style = EDGE_STYLE[cls];
        netCtx.strokeStyle = style.color;
        netCtx.lineWidth = style.width;
        netCtx.beginPath();
        netData.edges.forEach(([c, pts]) => {
          if (c !== cls || pts.length < 2) return;
          const [sx, sy] = toScreen(pts[0][0], pts[0][1]);
          netCtx.moveTo(sx, sy);
          for (let i = 1; i < pts.length; i++) {
            const [px, py] = toScreen(pts[i][0], pts[i][1]);
            netCtx.lineTo(px, py);
          }
        });
        netCtx.stroke();
      });
      drawWaterMarkers(w, h);
    }

    // La red de SUMO (osm.net.xml) solo modela vías, no trae geometría de
    // cuerpos de agua — por eso se marcan aquí los humedales y el río
    // conocidos, en azul, como referencia (no son el polígono real del
    // cuerpo de agua, solo su ubicación aproximada).
    const WATER_POINTS = [
      { label: "Humedal El Burro", x: 6063.8, y: 2006.4 },
      { label: "Humedal La Vaca", x: 4932.4, y: 1430.0 },
      { label: "Humedal Techo", x: 6811.5, y: 2158.0 },
      { label: "Río Tunjuelo", x: 3934.3, y: 249.7 },
      { label: "Canal San Francisco", x: 5616.8, y: 1684.1 },
    ];
    function drawWaterMarkers(w, h) {
      netCtx.font = "11px Inter, sans-serif";
      WATER_POINTS.forEach((p) => {
        const [sx, sy] = toScreen(p.x, p.y);
        netCtx.fillStyle = "rgba(90,170,230,0.85)";
        netCtx.beginPath();
        netCtx.arc(sx, sy, 7, 0, Math.PI * 2);
        netCtx.fill();
        netCtx.strokeStyle = "rgba(200,230,255,0.9)";
        netCtx.lineWidth = 1.5;
        netCtx.stroke();
        netCtx.fillStyle = "#cfe8ff";
        netCtx.textAlign = "left";
        netCtx.fillText(p.label, sx + 10, sy + 4);
      });
    }

    // ---------- cargar la red (JSON ya recortado) ----------
    fetch(NET_URL)
      .then((r) => { if (!r.ok) throw new Error("no se pudo cargar " + NET_URL); return r.json(); })
      .then((data) => {
        netData = data;
        resizeCanvases();
        setStatus("Red cargada. Cargando trazado.xml…");
        return loadTrazado();
      })
      .catch((err) => {
        console.error(err);
        setStatus("No se pudo cargar la red vial (assets/kennedy_net.json). Revisa que el archivo esté subido en tu repositorio.");
      });

    // ---------- cargar el trazado: primero intenta el JSON compacto, si no
    // existe cae al FCD-export XML de SUMO ----------
    function loadTrazado() {
      return fetch(VEHICULOS_JSON_URL)
        .then((r) => { if (!r.ok) throw new Error("no encontrado"); return r.json(); })
        .then((data) => {
          // Formato: [ [tiempo, [[id,x,y], ...]], ... ] — ya viene con el
          // mismo offset restado que la red, y sin ángulo (se calcula solo).
          timesteps = data.map(([time, vehicles]) => ({
            time,
            vehicles: vehicles.map(([id, x, y]) => ({ id, x, y })),
          }));
          finishLoadingTimesteps();
        })
        .catch(() => loadTrazadoXml());
    }
    function loadTrazadoXml() {
      return fetch(TRAZADO_URL)
        .then((r) => { if (!r.ok) throw new Error("no encontrado"); return r.text(); })
        .then((xmlText) => {
          const xml = new DOMParser().parseFromString(xmlText, "application/xml");
          if (xml.querySelector("parsererror")) throw new Error("trazado.xml no es un XML válido");
          const stepNodes = xml.getElementsByTagName("timestep");
          if (!stepNodes.length) throw new Error("trazado.xml no tiene <timestep> (¿es un FCD-export de SUMO?)");
          const [offX, offY] = netData.offset;
          timesteps = Array.from(stepNodes).map((step) => {
            const time = parseFloat(step.getAttribute("time")) || 0;
            const vehicles = Array.from(step.getElementsByTagName("vehicle")).map((v) => ({
              id: v.getAttribute("id"),
              x: parseFloat(v.getAttribute("x")) - offX,
              y: parseFloat(v.getAttribute("y")) - offY,
              angle: parseFloat(v.getAttribute("angle")) || 0,
            }));
            return { time, vehicles };
          });
          finishLoadingTimesteps();
        })
        .catch((err) => {
          console.warn(err);
          setStatus("La red vial ya está lista. Falta subir el archivo de trayectorias (assets/kennedy_vehiculos.json o assets/trazado.xml) para ver los vehículos en movimiento.");
        });
    }
    function finishLoadingTimesteps() {
      const totalTime = timesteps.length ? timesteps[timesteps.length - 1].time : 0;
      slider.max = String(Math.round(totalTime));
      slider.disabled = false;
      playBtn.disabled = false;
      setStatus("", false);
      timeLabel.textContent = `00:00 / ${fmtTime(totalTime)}`;
      drawVehiclesAt(0);
    }

    // Busca los dos timesteps que rodean "t" e interpola posiciones entre
    // ellos, para que el movimiento se vea fluido aunque el archivo tenga
    // pocos pasos por segundo.
    function vehiclesAtTime(t) {
      if (!timesteps.length) return [];
      if (t <= timesteps[0].time) return timesteps[0].vehicles;
      if (t >= timesteps[timesteps.length - 1].time) return timesteps[timesteps.length - 1].vehicles;
      let lo = 0, hi = timesteps.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (timesteps[mid].time <= t) lo = mid; else hi = mid;
      }
      const a = timesteps[lo], b = timesteps[hi];
      const span = b.time - a.time || 1;
      const frac = (t - a.time) / span;
      const bMap = new Map(b.vehicles.map((v) => [v.id, v]));
      return a.vehicles.map((va) => {
        const vb = bMap.get(va.id);
        if (!vb) return va;
        const x = va.x + (vb.x - va.x) * frac;
        const y = va.y + (vb.y - va.y) * frac;
        // Si el dato trae ángulo (viene del FCD-export de SUMO), se
        // interpola normal. Si no (viene del JSON de posiciones), se
        // calcula solo mirando hacia dónde se mueve el auto.
        const angle = (va.angle != null && vb.angle != null)
          ? va.angle + (vb.angle - va.angle) * frac
          : (Math.atan2(vb.x - va.x, -(vb.y - va.y)) * 180) / Math.PI;
        return { id: va.id, x, y, angle };
      });
    }

    function drawVehiclesAt(t) {
      const w = vehCanvas.parentElement.clientWidth, h = vehCanvas.parentElement.clientHeight;
      vehCtx.clearRect(0, 0, w, h);
      const vehicles = vehiclesAtTime(t);
      vehicles.forEach((v) => {
        const [sx, sy] = toScreen(v.x, v.y);
        const rad = ((v.angle - 90) * Math.PI) / 180; // SUMO: 0° = norte
        vehCtx.save();
        vehCtx.translate(sx, sy);
        vehCtx.rotate(rad);
        // Carrito (rectángulo redondeado, como en SUMO), no un triángulo:
        // el "morro" queda del lado +x, hacia donde apunta el vehículo.
        const carLength = 6, carWidth = 3, r = 1;
        vehCtx.fillStyle = "#ffb020";
        vehCtx.beginPath();
        if (vehCtx.roundRect) {
          vehCtx.roundRect(-carLength / 2, -carWidth / 2, carLength, carWidth, r);
        } else {
          vehCtx.rect(-carLength / 2, -carWidth / 2, carLength, carWidth); // respaldo para navegadores viejos
        }
        vehCtx.fill();
        // Parabrisas: un rectángulo más oscuro hacia el frente, para que
        // se note de un vistazo hacia dónde mira el carro.
        vehCtx.fillStyle = "#7a4a06";
        vehCtx.fillRect(carLength * 0.05, -carWidth / 2 + 0.5, carLength * 0.32, carWidth - 1);
        vehCtx.restore();
      });
      timeLabel.textContent = `${fmtTime(t)} / ${slider.max ? fmtTime(Number(slider.max)) : "00:00"}`;
      if (!isScrubbing) slider.value = String(Math.round(t));
    }

    // ---------- reproducción ----------
    let isScrubbing = false;
    function step(ts) {
      if (!playing) return;
      if (!lastFrameTs) lastFrameTs = ts;
      const dt = (ts - lastFrameTs) / 1000;
      lastFrameTs = ts;
      const totalTime = timesteps.length ? timesteps[timesteps.length - 1].time : 0;
      playhead = Math.min(totalTime, playhead + dt * speedMultiplier);
      drawVehiclesAt(playhead);
      if (playhead >= totalTime) { playing = false; playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; return; }
      rafId = requestAnimationFrame(step);
    }

    playBtn?.addEventListener("click", () => {
      if (!timesteps.length) return;
      playing = !playing;
      playBtn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
      if (playing) { lastFrameTs = 0; rafId = requestAnimationFrame(step); }
      else cancelAnimationFrame(rafId);
    });
    slider?.addEventListener("input", () => {
      isScrubbing = true;
      playhead = Number(slider.value);
      drawVehiclesAt(playhead);
    });
    slider?.addEventListener("change", () => { isScrubbing = false; });
    speedSelect?.addEventListener("change", () => { speedMultiplier = Number(speedSelect.value) || 1; });

    window.addEventListener("resize", () => {
      resizeCanvases();
      drawVehiclesAt(playhead);
    });
  });
})();
