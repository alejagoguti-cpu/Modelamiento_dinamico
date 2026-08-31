/* ==========================================================================
   SIMULACIÓN DE MOVILIDAD (SUMO) — módulo 8
   ==========================================================================
   Usa el MISMO mapa base que el módulo 5 (estilo "dark-matter" de CARTO,
   vía MapLibre GL) — así las calles que se ven son el mapa real, no un
   dibujo simplificado hecho a mano. Los vehículos se dibujan en un canvas
   transparente puesto ENCIMA del mapa, y su posición en pantalla se
   recalcula con map.project() cada vez que el mapa se mueve/hace zoom o
   cuando avanza la animación — así siempre quedan pegados a la calle real.

   ARCHIVO QUE ESTE SCRIPT ESPERA ENCONTRAR (ruta relativa a esta página):

   ./assets/kennedy_vehiculos.json
      [ [tiempo, [[id, lon, lat], [id, lon, lat], ...]], ... ]
      Ya en coordenadas geográficas reales (no las locales de SUMO) para
      que se puedan proyectar directo sobre el mapa real.
   ========================================================================== */
(() => {
  "use strict";

  const VEHICULOS_URL = "./assets/kennedy_vehiculos.json";
  const KENNEDY_CENTER = [-74.16, 4.635];
  const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    const mapContainer = document.getElementById("sumoMap");
    const vehCanvas = document.getElementById("sumoVehCanvas");
    const statusEl = document.getElementById("sumoStatus");
    const playBtn = document.getElementById("sumoPlayPause");
    const slider = document.getElementById("sumoTimeSlider");
    const timeLabel = document.getElementById("sumoTimeLabel");
    const speedSelect = document.getElementById("sumoSpeedSelect");
    if (!mapContainer || !vehCanvas) return; // esta página no tiene el panel

    const vehCtx = vehCanvas.getContext("2d");

    let map = null;
    let timesteps = []; // [{ time, vehicles:[{id,lon,lat}] }]
    let playing = false;
    let speedMultiplier = 2;
    let playhead = 0;
    let lastFrameTs = 0;
    let rafId = 0;
    let isScrubbing = false;

    function setStatus(text, show = true) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.classList.toggle("hidden", !show);
    }
    function fmtTime(t) {
      const m = Math.floor(t / 60), s = Math.floor(t % 60);
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    function resizeVehCanvas() {
      const wrap = vehCanvas.parentElement;
      const w = wrap.clientWidth, h = wrap.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      vehCanvas.width = Math.max(1, Math.round(w * dpr));
      vehCanvas.height = Math.max(1, Math.round(h * dpr));
      vehCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    if (window.maplibregl) {
      initMap();
    } else {
      // "maplibregl" se carga como modulo ES (igual que el modulo 5), y los
      // scripts de modulo se ejecutan DESPUES que los scripts normales —
      // por eso no se puede asumir que ya existe en este punto, hay que
      // esperar a que dispare este evento.
      setStatus("Cargando MapLibre…");
      window.addEventListener("maplibre-ready", initMap, { once: true });
    }

    function initMap() {
      if (!window.maplibregl) {
        setStatus("MapLibre no pudo cargarse.");
        return;
      }
      map = new maplibregl.Map({
        container: "sumoMap",
        style: MAP_STYLE,
        center: KENNEDY_CENTER,
        zoom: 14.6,
        minZoom: 10,
        maxZoom: 18,
        attributionControl: true,
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

      map.on("load", () => {
        resizeVehCanvas();
        setStatus("Mapa cargado. Cargando trayectorias de vehículos…");
        loadVehiculos();
      });
      map.on("move", () => drawVehiclesAt(playhead));
      map.on("resize", () => { resizeVehCanvas(); drawVehiclesAt(playhead); });
      window.addEventListener("resize", () => { resizeVehCanvas(); drawVehiclesAt(playhead); });
    }

    function loadVehiculos() {
      fetch(VEHICULOS_URL)
        .then((r) => { if (!r.ok) throw new Error("no encontrado"); return r.json(); })
        .then((data) => {
          timesteps = data.map(([time, vehicles]) => ({
            time,
            vehicles: vehicles.map(([id, lon, lat]) => ({ id, lon, lat })),
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
          console.warn(err);
          setStatus("El mapa ya está listo. Falta subir assets/kennedy_vehiculos.json para ver los vehículos en movimiento.");
        });
    }

    // Busca los dos timesteps que rodean "t" e interpola posiciones entre
    // ellos, para que el movimiento se vea fluido.
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
        const lon = va.lon + (vb.lon - va.lon) * frac;
        const lat = va.lat + (vb.lat - va.lat) * frac;
        const angle = (Math.atan2(vb.lon - va.lon, vb.lat - va.lat) * 180) / Math.PI;
        return { id: va.id, lon, lat, angle };
      });
    }

    function drawVehiclesAt(t) {
      if (!map) return;
      const wrap = vehCanvas.parentElement;
      const w = wrap.clientWidth, h = wrap.clientHeight;
      vehCtx.clearRect(0, 0, w, h);
      const vehicles = vehiclesAtTime(t);
      // Tamaño real del carro (~4.3m x 1.8m) convertido a píxeles según el
      // zoom actual del mapa — así el carro siempre se ve a su tamaño de
      // verdad, ni gigante ni minúsculo, sin importar qué tanto zoom tenga.
      const metersPerPixel = (156543.03392 * Math.cos((map.getCenter().lat * Math.PI) / 180)) / Math.pow(2, map.getZoom());
      const carLength = Math.max(2, 4.3 / metersPerPixel);
      const carWidth = Math.max(1, 1.8 / metersPerPixel);
      const r = carWidth * 0.35;
      vehicles.forEach((v) => {
        const p = map.project([v.lon, v.lat]);
        if (p.x < -20 || p.y < -20 || p.x > w + 20 || p.y > h + 20) return; // fuera de pantalla
        const rad = (((v.angle || 0) - 90) * Math.PI) / 180;
        vehCtx.save();
        vehCtx.translate(p.x, p.y);
        vehCtx.rotate(rad);
        vehCtx.fillStyle = "#ffb020";
        vehCtx.beginPath();
        if (vehCtx.roundRect) vehCtx.roundRect(-carLength / 2, -carWidth / 2, carLength, carWidth, r);
        else vehCtx.rect(-carLength / 2, -carWidth / 2, carLength, carWidth);
        vehCtx.fill();
        vehCtx.fillStyle = "#7a4a06";
        vehCtx.fillRect(carLength * 0.05, -carWidth / 2 + carWidth * 0.18, carLength * 0.32, carWidth * 0.64);
        vehCtx.restore();
      });
      timeLabel.textContent = `${fmtTime(t)} / ${slider.max ? fmtTime(Number(slider.max)) : "00:00"}`;
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
  });
})();
