/* ==========================================================================
   BOGOTÁ VIVA · MÓDULO 05: NAVEGADOR MULTIESCALAR (JAVASCRIPT)
   Lógica integral para las 4 Escalas: Natural, Cultural, Tecnológico y Metaverso
   ========================================================================== */

(() => {
  "use strict";

  const BOGOTA_CENTER = [-74.10, 4.65];
  const BOGOTA_DEFAULT_ZOOM = 11.8;

  // Las 33 UPLs oficiales de Bogotá con datos territoriales y coordenadas
  const UPLS_DATA = [
    { num: 1, name: "Sumapaz", localidad: "Sumapaz", tag: "Borde rural — Conectividad ecosistémica y cuenca del Río Blanco", lon: -74.32, lat: 4.27, zoom: 10.5 },
    { num: 2, name: "Cuenca del Tunjuelo", localidad: "Usme – Ciudad Bolívar", tag: "Déficit de soportes — Ámbito integral del cuidado y cuenca media", lon: -74.15, lat: 4.45, zoom: 12.5 },
    { num: 3, name: "Arborizadora", localidad: "Ciudad Bolívar", tag: "Alta densidad en ladera — Mitigación de riesgos y Manzana del Cuidado", lon: -74.16, lat: 4.53, zoom: 13.5 },
    { num: 4, name: "Lucero", localidad: "Ciudad Bolívar", tag: "Articulación con TransMiCable y servicios de proximidad barrial", lon: -74.16, lat: 4.56, zoom: 13.5 },
    { num: 5, name: "Usme – Entrenubes", localidad: "Usme – San Cristóbal", tag: "UPL transfronteriza — Límite de expansión y parque Entrenubes", lon: -74.10, lat: 4.52, zoom: 13 },
    { num: 6, name: "Cerros Orientales", localidad: "Borde Oriental", tag: "Matriz biofísica fundamental — Conectividad y senderos ancestrales", lon: -74.06, lat: 4.67, zoom: 12 },
    { num: 7, name: "Torca", localidad: "Suba – Usaquén", tag: "Humedal Torca-Guaymaral — Borde norte y reserva Thomas van der Hammen", lon: -74.03, lat: 4.80, zoom: 12.5 },
    { num: 8, name: "Britalia", localidad: "Suba", tag: "Proximidad barrial — Red secundaria de equipamientos y ciclorrutas", lon: -74.08, lat: 4.74, zoom: 13.5 },
    { num: 9, name: "Suba", localidad: "Suba", tag: "Centralidad consolidada — Eje de Corredores Verdes y DOT Metro L2", lon: -74.10, lat: 4.75, zoom: 13 },
    { num: 10, name: "Tibabuyes", localidad: "Suba", tag: "Humedal Juan Amarillo — Densidad habitacional y demanda de servicios", lon: -74.14, lat: 4.75, zoom: 13.5 },
    { num: 11, name: "Engativá", localidad: "Engativá", tag: "Mixtura residencial y productiva — Humedal Jaboque y Río Bogotá", lon: -74.13, lat: 4.70, zoom: 13 },
    { num: 12, name: "Fontibón", localidad: "Fontibón", tag: "Intermodalidad — Regiotram de Occidente, Aeropuerto y zona industrial", lon: -74.15, lat: 4.68, zoom: 13 },
    { num: 13, name: "Tintal", localidad: "Kennedy", tag: "Alta viabilidad — Línea 1 del Metro, Manzana del Cuidado y Parque Tintal", lon: -74.15, lat: 4.64, zoom: 13.5 },
    { num: 14, name: "Patio Bonito", localidad: "Kennedy", tag: "Humedal La Vaca — Proximidad peatonal y alta vulnerabilidad", lon: -74.16, lat: 4.62, zoom: 13.5 },
    { num: 15, name: "Porvenir", localidad: "Bosa – Kennedy", tag: "Déficit de soporte urbano — Manzana del Cuidado El Porvenir", lon: -74.18, lat: 4.61, zoom: 13.5 },
    { num: 16, name: "Edén", localidad: "Bosa – Kennedy", tag: "Borde sur-occidental — Conectores ecosistémicos del Río Tunjuelo", lon: -74.18, lat: 4.59, zoom: 13.5 },
    { num: 17, name: "Bosa", localidad: "Bosa", tag: "Centralidad histórica de Bosa — Transformación DOT Línea 1 Metro", lon: -74.19, lat: 4.60, zoom: 13.5 },
    { num: 18, name: "Kennedy", localidad: "Kennedy – Bosa", tag: "Gran nodo metropolitano — Hospital de Kennedy y comercio mixto", lon: -74.15, lat: 4.63, zoom: 13 },
    { num: 19, name: "Tunjuelito", localidad: "Tunjuelito", tag: "Área de amortiguación hidráulica — Parque El Tunal y servicios", lon: -74.14, lat: 4.58, zoom: 13.5 },
    { num: 20, name: "Rafael Uribe", localidad: "Rafael Uribe Uribe", tag: "Tejido de ladera consolidado — Manzana del Cuidado Diana Turbay", lon: -74.12, lat: 4.56, zoom: 13.5 },
    { num: 21, name: "San Cristóbal", localidad: "San Cristóbal", tag: "Borde ecológico oriental — Cuenca del Río Fucha y cable aéreo", lon: -74.08, lat: 4.56, zoom: 13 },
    { num: 22, name: "Restrepo", localidad: "Antonio Nariño", tag: "Tradición productiva del calzado — Mixtura de usos y centralidad", lon: -74.10, lat: 4.58, zoom: 14 },
    { num: 23, name: "Centro Histórico", localidad: "La Candelaria – Santa Fe", tag: "Patrimonio fundacional — Alta densidad institucional y cultural", lon: -74.073, lat: 4.60, zoom: 14 },
    { num: 24, name: "Chapinero", localidad: "Chapinero", tag: "Diversidad y centralidad ampliada — Corredor Verde Séptima y Metro L1", lon: -74.06, lat: 4.65, zoom: 13.5 },
    { num: 25, name: "Usaquén", localidad: "Usaquén", tag: "Núcleo patrimonial y financiero — Borde cerros orientales", lon: -74.03, lat: 4.70, zoom: 13.5 },
    { num: 26, name: "Toberín", localidad: "Usaquén", tag: "Servicios de proximidad norte — Regiotram del Norte y Manzana Cuidado", lon: -74.04, lat: 4.74, zoom: 13.5 },
    { num: 27, name: "Niza", localidad: "Suba", tag: "Humedal Córdoba — Ecosistemas urbanos y morfología residencial", lon: -74.08, lat: 4.71, zoom: 13.5 },
    { num: 28, name: "Rincón de Suba", localidad: "Suba", tag: "Alta densidad poblacional — Manzana del Cuidado y cerros de Suba", lon: -74.11, lat: 4.72, zoom: 13.5 },
    { num: 29, name: "Tabora", localidad: "Engativá", tag: "Red de equipamientos — Humedal Santa María del Lago y Calle 80", lon: -74.11, lat: 4.70, zoom: 13.5 },
    { num: 30, name: "Salitre", localidad: "Fontibón – Engativá", tag: "Gran centro metropolitano — Parque Simón Bolívar y CAN", lon: -74.11, lat: 4.67, zoom: 13 },
    { num: 31, name: "Puente Aranda", localidad: "Puente Aranda", tag: "Transformación industrial a mixta — Renovación urbana e infraestructura", lon: -74.11, lat: 4.62, zoom: 13.5 },
    { num: 32, name: "Teusaquillo", localidad: "Teusaquillo", tag: "Sectores de interés cultural — Campus Universidad Nacional y Parkway", lon: -74.08, lat: 4.64, zoom: 14 },
    { num: 33, name: "Barrios Unidos", localidad: "Barrios Unidos", tag: "Talleres, comercio activo y proximidad al nodo Calle 72 Metro L1", lon: -74.08, lat: 4.68, zoom: 13.5 }
  ];

  // Configuración de las 4 escalas
  const SCALES_CONFIG = {
    natural: {
      id: "natural",
      name: "Natural",
      icon: "fa-droplet",
      color: "#2fd4c8",
      kicker: "ESCALA NATURAL · AGUA Y ECOSISTEMAS",
      subtitle: "Estructura Ecológica Principal, humedales, rondas hídricas y cerros",
      reading: "La escala natural hace visibles el agua, los humedales y la estructura ecológica como sistemas vivos continuos que trascienden las fronteras administrativas.",
      critique: "El POT fija polígonos estáticos de protección, pero omite los flujos estacionales de cuenca, las presiones de impermeabilización y la fragmentación biótica.",
      themeClass: "scale-natural-theme",
      placesLabel: "Humedales y Reservas",
      hotspots: [
        { name: "Humedal La Vaca", coords: [-74.158, 4.628], role: "Regulación hídrica local", connections: 12 },
        { name: "Humedal Tibabuyes (Juan Amarillo)", coords: [-74.125, 4.735], role: "Mayor cuerpo de agua urbano", connections: 24 },
        { name: "Humedal Córdoba", coords: [-74.075, 4.705], role: "Conector cerros-humedales", connections: 18 },
        { name: "Humedal Jaboque", coords: [-74.145, 4.715], role: "Amortiguación Río Bogotá", connections: 16 },
        { name: "Humedal El Burro", coords: [-74.152, 4.642], role: "Fragmentación por Av. Ciudad de Cali", connections: 14 },
        { name: "Humedal Capellanía", coords: [-74.135, 4.675], role: "Aislamiento por zona franca", connections: 10 },
        { name: "Cerros Orientales (Guadalupe/Monserrate)", coords: [-74.055, 4.605], role: "Matriz ecosistémica mayor", connections: 32 },
        { name: "Río Fucha (Eje Ambiental)", coords: [-74.110, 4.580], role: "Corredor hídrico transversal", connections: 20 },
        { name: "Río Tunjuelo", coords: [-74.140, 4.490], role: "Cuenca sur y riesgo de inundación", connections: 22 }
      ]
    },
    cultural: {
      id: "cultural",
      name: "Cultural",
      icon: "fa-landmark",
      color: "#fb8d84",
      kicker: "ESCALA CULTURAL · PATRIMONIO Y MEMORIA",
      subtitle: "Bienes de interés cultural, núcleos fundacionales y memorias vivas",
      reading: "La escala cultural superpone patrimonio material, prácticas barriales y lugares de memoria viva sobre la red cotidiana.",
      critique: "El POT reduce el patrimonio a inmuebles y monumentos aislados, desprotegiendo los modos de vida comunitarios frente a la gentrificación y renovación.",
      themeClass: "scale-cultural-theme",
      placesLabel: "Hitos y Centros Históricos",
      hotspots: [
        { name: "Centro Histórico La Candelaria", coords: [-74.073, 4.597], role: "Núcleo fundacional y BIC Nacional", connections: 28 },
        { name: "Barrio Teusaquillo (Parkway)", coords: [-74.078, 4.636], role: "Arquitectura moderna y vida barrial", connections: 19 },
        { name: "Núcleo Fundacional de Usaquén", coords: [-74.032, 4.696], role: "Patrimonio colonial y centralidad", connections: 15 },
        { name: "Centro Fundacional de Bosa", coords: [-74.188, 4.608], role: "Memoria muisca y plaza mayor", connections: 17 },
        { name: "Plaza del 20 de Julio", coords: [-74.088, 4.572], role: "Patrimonio religioso y popular", connections: 21 },
        { name: "Plaza de Mercado de Paloquemao", coords: [-74.088, 4.618], role: "Patrimonio inmaterial y soberanía", connections: 25 },
        { name: "Campus Universidad Nacional", coords: [-74.084, 4.638], role: "Hito educativo y arquitectónico", connections: 22 }
      ]
    },
    tecnologico: {
      id: "tecnologico",
      name: "Tecnológico",
      icon: "fa-microchip",
      color: "#4eb5ed",
      kicker: "ESCALA TECNOLÓGICA · MOVILIDAD Y REDES",
      subtitle: "Metro L1/L2, Regiotram, Corredores Verdes y jerarquía vial",
      reading: "La escala tecnológica lee la ciudad como un sistema integrado de infraestructuras, conectividad multimodal y flujos de transporte masivo.",
      critique: "El POT formula trazados e infraestructura en planos bidimensionales, pero no modela la congestión en horas pico, la saturación ni los transbordos reales.",
      themeClass: "scale-tecnologico-theme",
      placesLabel: "Nodos de Transporte e Intercambio",
      hotspots: [
        { name: "Patio Taller Metro L1 (Bosa)", coords: [-74.195, 4.625], role: "Inicio Línea 1 Metro", connections: 30 },
        { name: "Estación Metro Calle 72", coords: [-74.062, 4.658], role: "Nodo intermodal L1 y Corredor Verde", connections: 34 },
        { name: "Regiotram de Occidente (Fontibón)", coords: [-74.142, 4.672], role: "Conectividad regional Sabana", connections: 26 },
        { name: "Portal Américas (TransMilenio)", coords: [-74.168, 4.628], role: "Nodo masivo suroccidente", connections: 28 },
        { name: "TransMiCable Manitas", coords: [-74.148, 4.542], role: "Transporte vertical en ladera", connections: 18 },
        { name: "Terminal Salitre", coords: [-74.112, 4.652], role: "Intercambiador nacional y regional", connections: 29 }
      ]
    },
    metaverso: {
      id: "metaverso",
      name: "Metaverso",
      icon: "fa-cubes",
      color: "#b682ee",
      kicker: "ESCALA METAVERSO · SIMULACIÓN DINÁMICA",
      subtitle: "Modelo digital inmersivo, gemelo urbano y Bogotá Infinite Drive",
      reading: "La escala Metaverso permite interactuar con la ciudad digitalizada en tiempo real, evaluando dinámicas de velocidad, trayectorias y comportamiento urbano.",
      critique: "A diferencia del POT estático, la simulación virtual revela el impacto de la fricción espacial, colisiones y tiempos de respuesta sobre las vías reales.",
      themeClass: "scale-metaverso-theme",
      placesLabel: "Nodos de Simulación",
      hotspots: [
        { name: "Simulación Kennedy Central", coords: [-74.150, 4.630], role: "Gemelo digital de tráfico", connections: 35 },
        { name: "Simulación Corredor Séptima", coords: [-74.060, 4.650], role: "Flujo continuo multimodal", connections: 31 },
        { name: "Simulación Autopista Sur", coords: [-74.160, 4.590], role: "Eje logístico y congestión", connections: 28 }
      ]
    }
  };

  // Bridge para soportar modulo-05-drive.js con MapLibre GL
window.L = window.L || {
  latLng: (lat, lng) => ({ lat, lng })
};

function setupMapLibreDriveBridge() {
  window.bogotaLeafletMap = {
    latLngToContainerPoint(ll) {
      if (state.map) {
        const lng = ll.lng !== undefined ? ll.lng : ll[0];
        const lat = ll.lat !== undefined ? ll.lat : ll[1];
        const p = state.map.project([lng, lat]);
        return { x: p.x, y: p.y };
      }
      return { x: 0, y: 0 };
    },
    setView(coords, zoom, opts) {
      if (state.map) {
        const lng = coords.lng !== undefined ? coords.lng : (Array.isArray(coords) ? coords[1] : coords[0]);
        const lat = coords.lat !== undefined ? coords.lat : (Array.isArray(coords) ? coords[0] : coords[1]);
        state.map.jumpTo({ center: [lng, lat], zoom: zoom || state.map.getZoom() });
      }
    },
    getZoom() {
      return state.map ? state.map.getZoom() : 16;
    },
    on(event, fn) {
      if (state.map) {
        state.map.on("move", fn);
        state.map.on("zoom", fn);
        state.map.on("resize", fn);
      }
    }
  };
}

  const state = {
    map: null,
    mapReady: false,
    activeScale: "natural",
    selectedUpl: UPLS_DATA.find(u => u.num === 13) || UPLS_DATA[0],
    markers: [],
    uplMarker: null,
    layers: {
      roads: true,
      places: true,
      boundary: true,
      transit: true
    }
  };

  // Inicialización del DOM
  document.addEventListener("DOMContentLoaded", () => {
    initUplSelect();
    initScaleSwitcher();
    initLayerToggles();
    initExportButtons();
    initModalEvents();
    waitForMapLibreAndBoot();
  });

  // Espera a MapLibre GL
  function waitForMapLibreAndBoot() {
    if (window.maplibregl) {
      bootMap();
    } else {
      window.addEventListener("maplibre-ready", () => bootMap(), { once: true });
      setTimeout(() => {
        if (!state.mapReady && window.maplibregl) bootMap();
      }, 500);
    }
  }

  // Inicializar mapa MapLibre GL con estilo Dark Matter
  function bootMap() {
    const container = document.getElementById("map");
    if (!container || state.map) return;

    try {
      const mapStyle = {
        version: 8,
        sources: {
          "carto-dark": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
              "https://b.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
              "https://c.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        },
        layers: [
          {
            id: "carto-dark-layer",
            type: "raster",
            source: "carto-dark",
            minzoom: 0,
            maxzoom: 20
          }
        ]
      };

      state.map = new window.maplibregl.Map({
        container: "map",
        style: mapStyle,
        center: [state.selectedUpl.lon, state.selectedUpl.lat],
        zoom: state.selectedUpl.zoom,
        pitch: 20,
        bearing: 0
      });

      state.map.addControl(new window.maplibregl.NavigationControl({ showCompass: true }), "top-right");

      setupMapLibreDriveBridge();
      state.map.on("load", () => {
        state.mapReady = true;
        const toast = document.getElementById("mapToast");
        if (toast) {
          document.getElementById("mapToastText").textContent = "Cartografía en vivo lista";
          setTimeout(() => { toast.style.opacity = "0"; }, 2000);
        }
        renderScaleHotspots();
        renderUplMarker();
      });

    } catch (e) {
      console.warn("Error al inicializar MapLibre:", e);
    }
  }

  // Llenar el selector de 33 UPLs
  function initUplSelect() {
    const select = document.getElementById("uplSelect");
    if (!select) return;

    select.innerHTML = UPLS_DATA.map(u => `
      <option value="${u.num}" ${u.num === state.selectedUpl.num ? "selected" : ""}>
        UPL ${u.num < 10 ? '0' + u.num : u.num} · ${u.name} (${u.localidad})
      </option>
    `).join("");

    select.addEventListener("change", (e) => {
      const num = parseInt(e.target.value, 10);
      const upl = UPLS_DATA.find(u => u.num === num);
      if (upl) {
        selectUpl(upl);
      }
    });

    updateUplInfoCard();
  }

  // Seleccionar UPL con animación flyTo
  function selectUpl(upl) {
    state.selectedUpl = upl;
    updateUplInfoCard();

    // Actualizar encabezados
    document.getElementById("mapTitle").textContent = `UPL ${upl.num} · ${upl.name}`;
    document.getElementById("mapSubtitle").textContent = `${upl.localidad} · ${upl.tag}`;

    // Mostrar indicador de zoom
    const indicator = document.getElementById("uplZoomIndicator");
    if (indicator) {
      document.getElementById("uplZoomIndicatorLabel").textContent = `Enfocando UPL ${upl.num} · ${upl.name}`;
      document.getElementById("uplZoomIndicatorHint").textContent = upl.localidad;
      indicator.hidden = false;
      setTimeout(() => { indicator.hidden = true; }, 1800);
    }

    if (state.map && state.mapReady) {
      state.map.flyTo({
        center: [upl.lon, upl.lat],
        zoom: upl.zoom || 13.5,
        speed: 1.2,
        curve: 1.4,
        essential: true
      });
      renderUplMarker();
    }
  }

  // Actualizar tarjeta lateral de UPL
  function updateUplInfoCard() {
    const upl = state.selectedUpl;
    const pill = document.getElementById("uplPill");
    const loc = document.getElementById("uplLocalidad");
    const tag = document.getElementById("uplTag");

    if (pill) pill.textContent = `UPL ${upl.num}`;
    if (loc) loc.textContent = upl.localidad;
    if (tag) tag.textContent = upl.tag;
  }

  // Selector de las 4 escalas (Natural, Cultural, Tecnológico, Metaverso)
  function initScaleSwitcher() {
    const cards = document.querySelectorAll(".scale-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const scaleKey = card.getAttribute("data-scale");
        if (scaleKey && SCALES_CONFIG[scaleKey]) {
          setScale(scaleKey);
        }
      });
    });
  }

  // Cambiar escala activa
  function setScale(scaleKey) {
    const cfg = SCALES_CONFIG[scaleKey];
    if (!cfg) return;

    state.activeScale = scaleKey;

    // Actualizar clases activas en botones
    document.querySelectorAll(".scale-card").forEach(c => {
      const active = c.getAttribute("data-scale") === scaleKey;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-selected", String(active));
    });

    // Actualizar tema del body
    document.body.className = cfg.themeClass;

    // Actualizar Topbar badge
    const badge = document.getElementById("currentScaleBadge");
    if (badge) {
      badge.innerHTML = `<i class="fa-solid ${cfg.icon}"></i> Escala ${cfg.name}`;
    }

    // Actualizar Map Headline Kicker
    const kicker = document.getElementById("mapScaleKicker");
    if (kicker) {
      kicker.innerHTML = `<i class="fa-solid ${cfg.icon}"></i> ${cfg.kicker}`;
    }

    // Actualizar Diagnóstico y Crítica POT
    const diagTitle = document.getElementById("diagScaleTitle");
    const diagReading = document.getElementById("diagScaleReading");
    const diagCritique = document.getElementById("diagScaleCritique");

    if (diagTitle) diagTitle.textContent = `Dimensión ${cfg.name}`;
    if (diagReading) diagReading.textContent = cfg.reading;
    if (diagCritique) diagCritique.textContent = cfg.critique;

    // Actualizar etiqueta de capa de nodos
    const placesLabel = document.getElementById("layerPlacesLabel");
    if (placesLabel) {
      placesLabel.innerHTML = `<i class="fa-solid fa-circle-dot"></i> ${cfg.placesLabel}`;
    }

    // Manejar Metaverso Drive Overlay
    const driveOverlay = document.getElementById("driveOverlay");
    if (driveOverlay) {
      if (scaleKey === "metaverso") {
        driveOverlay.style.display = "block";
        if (window.bogotaDriveFocus) window.bogotaDriveFocus();
      } else {
        driveOverlay.style.display = "none";
      }
    }

    renderScaleHotspots();
  }

  // Renderizar marcadores/hotspots de la escala activa
  function renderScaleHotspots() {
    if (!state.map || !state.mapReady) return;

    // Limpiar marcadores anteriores
    state.markers.forEach(m => m.remove());
    state.markers = [];

    const cfg = SCALES_CONFIG[state.activeScale];
    if (!cfg || !cfg.hotspots || !state.layers.places) return;

    cfg.hotspots.forEach(h => {
      const el = document.createElement("div");
      el.className = "map-scale-hotspot";
      el.style.width = "18px";
      el.style.height = "18px";
      el.style.borderRadius = "50%";
      el.style.background = cfg.color;
      el.style.border = "2px solid #ffffff";
      el.style.boxShadow = `0 0 12px ${cfg.color}, 0 0 20px ${cfg.color}`;
      el.style.cursor = "pointer";
      el.style.transition = "transform 0.2s ease";

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.4)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
      });
      el.addEventListener("click", () => {
        openNodeDetailModal(h, cfg);
      });

      const marker = new window.maplibregl.Marker({ element: el })
        .setLngLat(h.coords)
        .addTo(state.map);

      state.markers.push(marker);
    });
  }

  // Marcador de UPL seleccionada
  function renderUplMarker() {
    if (!state.map || !state.mapReady) return;

    if (state.uplMarker) {
      state.uplMarker.remove();
      state.uplMarker = null;
    }

    const upl = state.selectedUpl;
    const el = document.createElement("div");
    el.className = "map-upl-center-marker";
    el.innerHTML = `
      <div style="background:rgba(9,14,23,0.9); border:1.5px solid var(--active-scale-color); color:#fff; font-size:11px; font-weight:700; padding:3px 8px; border-radius:12px; box-shadow:0 0 12px var(--active-scale-glow); white-space:nowrap;">
        <i class="fa-solid fa-location-dot" style="color:var(--active-scale-color);"></i> UPL ${upl.num} · ${upl.name}
      </div>
    `;

    state.uplMarker = new window.maplibregl.Marker({ element: el })
      .setLngLat([upl.lon, upl.lat])
      .addTo(state.map);
  }

  // Toggles de Capas
  function initLayerToggles() {
    const toggleRoads = document.getElementById("layerToggleRoads");
    const togglePlaces = document.getElementById("layerTogglePlaces");
    const toggleBoundary = document.getElementById("layerToggleUplBoundary");

    togglePlaces?.addEventListener("change", (e) => {
      state.layers.places = e.target.checked;
      renderScaleHotspots();
    });

    toggleBoundary?.addEventListener("change", (e) => {
      state.layers.boundary = e.target.checked;
      if (state.uplMarker) {
        state.uplMarker.getElement().style.display = e.target.checked ? "" : "none";
      }
    });
  }

  // Botones de exportación y centrado
  function initExportButtons() {
    document.getElementById("btnCenterBogota")?.addEventListener("click", () => {
      if (state.map) {
        state.map.flyTo({
          center: BOGOTA_CENTER,
          zoom: BOGOTA_DEFAULT_ZOOM,
          speed: 1.2
        });
      }
    });

    document.getElementById("locateBtn")?.addEventListener("click", () => {
      selectUpl(state.selectedUpl);
    });

    document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
      const elem = document.querySelector(".map-panel");
      if (!document.fullscreenElement) {
        elem?.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    document.getElementById("exportVisibleGeojson")?.addEventListener("click", () => {
      const cfg = SCALES_CONFIG[state.activeScale];
      const geojson = {
        type: "FeatureCollection",
        scale: cfg.name,
        upl: state.selectedUpl,
        features: (cfg.hotspots || []).map(h => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: h.coords },
          properties: { name: h.name, role: h.role, connections: h.connections, scale: cfg.name }
        }))
      };
      downloadFile(JSON.stringify(geojson, null, 2), `bogota_multiescalar_${state.activeScale}.geojson`, "application/json");
    });

    document.getElementById("exportVisibleCsv")?.addEventListener("click", () => {
      const cfg = SCALES_CONFIG[state.activeScale];
      let csv = "Nombre,Rol,Conexiones,Longitud,Latitud,Escala\n";
      (cfg.hotspots || []).forEach(h => {
        csv += `"${h.name}","${h.role}",${h.connections},${h.coords[0]},${h.coords[1]},"${cfg.name}"\n`;
      });
      downloadFile(csv, `bogota_multiescalar_${state.activeScale}.csv`, "text/csv");
    });
  }

  function downloadFile(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // Modal de Detalle
  function initModalEvents() {
    const modal = document.getElementById("nodeDetailModal");
    const closeBtn = document.getElementById("nodeDetailClose");
    const closeBtn2 = document.getElementById("nodeDetailCloseBtn");

    const closeModal = () => modal?.classList.remove("active");
    closeBtn?.addEventListener("click", closeModal);
    closeBtn2?.addEventListener("click", closeModal);

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function openNodeDetailModal(hotspot, scaleConfig) {
    const modal = document.getElementById("nodeDetailModal");
    if (!modal) return;

    document.getElementById("nodeDetailKicker").textContent = `DETALLE · ESCALA ${scaleConfig.name.toUpperCase()}`;
    document.getElementById("nodeDetailTitle").textContent = hotspot.name;
    document.getElementById("nodeDetailRole").textContent = hotspot.role;
    document.getElementById("nodeDetailSummary").textContent = `Elemento territorial clave de la dimensión ${scaleConfig.name}. Articula dinámicas de ${scaleConfig.subtitle.toLowerCase()}.`;
    document.getElementById("nodeDetailDegree").textContent = hotspot.connections;
    document.getElementById("nodeDetailDirect").textContent = Math.floor(hotspot.connections * 0.6);
    document.getElementById("nodeDetailIndirect").textContent = Math.ceil(hotspot.connections * 0.4);
    document.getElementById("nodeDetailHub").textContent = hotspot.connections > 20 ? "Hub Principal" : "Conector Secundario";

    const outgoing = document.getElementById("nodeDetailOutgoing");
    const incoming = document.getElementById("nodeDetailIncoming");

    if (outgoing) {
      outgoing.innerHTML = `
        <li>Conexión con la red arterial circundante</li>
        <li>Flujo hacia centralidad de UPL ${state.selectedUpl.name}</li>
      `;
    }
    if (incoming) {
      incoming.innerHTML = `
        <li>Articulación con sistema regional Sabana</li>
        <li>Presión de soporte cotidiano barrial</li>
      `;
    }

    modal.classList.add("active");
  }

})();
