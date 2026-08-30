/* ==========================================================================
   MAPA DE RUIDO Y TRÁFICO — módulo 8
   ==========================================================================
   Dibuja, sobre un mapa Leaflet real, las vías de Kennedy coloreadas según
   un índice de ruido relativo (calculado a partir del flujo vehicular y la
   velocidad promedio de la simulación de tráfico en SUMO).

   Espera encontrar ./assets/kennedy_noise.json — ya generado a partir de
   osm.net.xml + datos_vias.xml (edgedata de SUMO), recortado a Kennedy.
   ========================================================================== */
(() => {
  "use strict";

  const NOISE_URL = "./assets/kennedy_noise.json";

  function noiseColor(score) {
    if (score < 12) return "#2e7d5b";
    if (score < 18) return "#8bc34a";
    if (score < 24) return "#f1c40f";
    if (score < 32) return "#e67e22";
    return "#e5484d";
  }
  function noiseWeight(score) {
    if (score < 12) return 1.5;
    if (score < 18) return 2;
    if (score < 24) return 2.5;
    if (score < 32) return 3;
    return 3.5;
  }

  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  start(() => {
    const mapEl = document.getElementById("noiseMap");
    const statusEl = document.getElementById("noiseMapStatus");
    if (!mapEl || typeof L === "undefined") return; // esta página no tiene el panel, o Leaflet no cargó

    const map = L.map(mapEl, { zoomControl: true }).setView([4.629, -74.158], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    fetch(NOISE_URL)
      .then((r) => { if (!r.ok) throw new Error("no se pudo cargar " + NOISE_URL); return r.json(); })
      .then((edges) => {
        edges.forEach((edge) => {
          const latlngs = edge.shape.map((p) => [p[1], p[0]]); // [lon,lat] -> [lat,lon]
          const color = noiseColor(edge.noise);
          const line = L.polyline(latlngs, { color, weight: noiseWeight(edge.noise), opacity: 0.85 }).addTo(map);
          line.bindPopup(
            `<div class="noise-popup-title">Vía ${edge.id}</div>` +
            `<div class="noise-popup-row"><span>Índice de ruido</span><b>${edge.noise.toFixed(1)}</b></div>` +
            `<div class="noise-popup-row"><span>Velocidad</span><b>${(edge.speed * 3.6).toFixed(1)} km/h</b></div>` +
            `<div class="noise-popup-row"><span>Flujo</span><b>${edge.flow.toFixed(0)} veh/h</b></div>` +
            `<div class="noise-popup-row"><span>Ocupación</span><b>${edge.occupancy.toFixed(1)}%</b></div>`
          );
        });
        if (statusEl) {
          statusEl.textContent = `${edges.length} vías cargadas`;
          setTimeout(() => statusEl.classList.add("hidden"), 2200);
        }
      })
      .catch((err) => {
        console.error(err);
        if (statusEl) statusEl.textContent = "No se pudo cargar el mapa de ruido (revisa assets/kennedy_noise.json).";
      });

    // Si el mapa nace dentro de un contenedor que todavía no tiene su
    // tamaño final (por ejemplo, si esta sección está más abajo en la
    // página), Leaflet necesita que le avisen cuando el tamaño ya es real.
    window.addEventListener("resize", () => map.invalidateSize());
    setTimeout(() => map.invalidateSize(), 300);
  });
})();
