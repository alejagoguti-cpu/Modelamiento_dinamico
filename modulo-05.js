/*
 * Bogotá Viva · Navegador Multiescalar
 * Mapa base real con OSM/MapLibre + consultas públicas bajo demanda.
 * El modo procedural funciona como respaldo cuando un servicio no responde.
 */
(() => {
  "use strict";

  const BOGOTA = [-74.10, 4.66];
  const OVERPASS_ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
  ];
  const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
  const OSRM_ENDPOINT = "https://router.project-osrm.org/route/v1/driving";
  const OSM_ATTRIBUTION = "© OpenStreetMap contributors";
  const LOCAL_PMTILES_PATH = "./tiles/bogota-roads.pmtiles";
  const CACHE = new Map();
  const CACHE_MAX_ENTRIES = 16;
  const VIEWPORT_DEBOUNCE_MS = 420;
  const OVERPASS_ENDPOINT_TIMEOUT_MS = 18000;
  const state = {
    map: null,
    mapReady: false,
    selectedUpl: null,
    selectedScale: "natural",
    dataMode: "real",
    streetSource: "local-geojson",
    localRoadFeatures: [],
    localRoadCount: 0,
    pmtilesArchive: null,
    pmtilesProtocol: null,
    currentView: "barrio",
    placeMarkers: [],
    uplMarker: null,
    uplLabelMarker: null,
    routeLayerReady: false,
    routeStart: null,
    routeEnd: null,
    queryToken: 0,
    activeQueryKey: "",
    overpassController: null,
    viewportDebounceTimer: null,
    proceduralMarkers: [],
    favorite: false,
    apiLayers: {
      /* Las 28 categorías se cargan automáticamente; cada consulta conserva timeout y fallback. */
      // Arranque ligero: mantiene las 28 categorías disponibles, pero consulta
      // primero las capas que dan una lectura útil y rápida. “Activar todo”
      // conserva el acceso explícito a las 28 categorías.
      roads: true, walking: false, transport: true, rail: false, aerial: false,
      natural: true, water: false, green: false,
      amenities: true, education: false, health: false, care: false, civic: false, services: false,
      commerce: true, food: false, industrial: false,
      residential: false, buildings: false, landuse: false,
      parks: true, sports: false,
      culture: true, tourism: false, memorial: false,
      boundaries: false, utilities: false, street: false,
    },
    apiLayerStatus: {},
    apiLayerElements: {},
  };

  const UPLS = [
    [1,"Sumapaz","Sumapaz","Borde rural — conectividad ecosistémica, no proximidad de servicios",-74.32,4.27],
    [2,"Cuenca del Tunjuelo","Usme–Ciudad Bolívar","Déficit de soportes — ámbito integral de cuidado",-74.15,4.45],
    [3,"Arborizadora","Ciudad Bolívar","Déficit de soportes — ámbito integral de cuidado",-74.16,4.53],
    [4,"Lucero","Ciudad Bolívar","Déficit de soportes — ámbito integral de cuidado",-74.16,4.56],
    [5,"Usme–Entrenubes","Usme–San Cristóbal","UPL transfronteriza — la vida cotidiana cruza el límite",-74.10,4.52],
    [6,"Cerros Orientales","Usme–San Cristóbal–Santa Fé–Chapinero–Usaquén","Conectividad ecosistémica — no aplica lógica de proximidad",-74.06,4.67],
    [7,"Torca","Suba–Usaquén","Borde rural — conectividad ecosistémica",-74.03,4.80],
    [8,"Britalia","Suba","Proximidad viable — equipamientos barriales",-74.08,4.74],
    [9,"Suba","Suba","Eje corredores verdes — DOT alrededor del Metro",-74.10,4.75],
    [10,"Tibabuyes","Suba","Proximidad viable — equipamientos barriales",-74.14,4.75],
    [11,"Engativá","Engativá","Proximidad viable — mixtura de usos",-74.13,4.70],
    [12,"Fontibón","Fontibón","Eje corredores verdes — DOT alrededor del Metro",-74.15,4.68],
    [13,"Tintal","Kennedy","Alta viabilidad — Línea 1 del Metro, Manzana del Cuidado, velódromo y parque metropolitano",-74.15,4.64],
    [14,"Patio Bonito","Kennedy","Proximidad viable — equipamientos barriales",-74.16,4.62],
    [15,"Porvenir","Bosa–Kennedy","Déficit de soportes — ámbito integral de cuidado",-74.18,4.61],
    [16,"Edén","Bosa–Kennedy","Déficit de soportes — ámbito integral de cuidado",-74.18,4.59],
    [17,"Bosa","Bosa–Kennedy","Proximidad viable — centralidad existente",-74.19,4.60],
    [18,"Kennedy","Kennedy–Bosa","Alta viabilidad — Línea 1 del Metro, nueva Manzana del Cuidado",-74.15,4.63],
    [19,"Tunjuelito","Tunjuelito","Proximidad viable — equipamientos barriales",-74.14,4.58],
    [20,"Rafael Uribe","Rafael Uribe–Usme","UPL transfronteriza — la vida cotidiana cruza el límite",-74.12,4.56],
    [21,"San Cristóbal","San Cristóbal","Proximidad viable — equipamientos barriales",-74.08,4.56],
    [22,"Restrepo","Antonio Nariño–Rafael Uribe","UPL transfronteriza — la vida cotidiana cruza el límite",-74.10,4.58],
    [23,"Centro Histórico","La Candelaria–Mártires–Santa Fé","Alta viabilidad — densa y mixta, proximidad a escala de caminata",-74.073,4.60],
    [24,"Chapinero","Chapinero","Alta viabilidad — densa y mixta",-74.06,4.65],
    [25,"Usaquén","Usaquén","Eje corredores verdes — DOT alrededor del Metro",-74.03,4.70],
    [26,"Toberín","Usaquén","Proximidad viable — equipamientos barriales",-74.04,4.74],
    [27,"Niza","Suba","Proximidad viable — equipamientos barriales",-74.08,4.71],
    [28,"Rincón de Suba","Suba","Proximidad viable — equipamientos barriales",-74.11,4.72],
    [29,"Tabora","Engativá","Proximidad viable — equipamientos barriales",-74.11,4.70],
    [30,"Salitre","Fontibón–Engativá","Eje corredores verdes — DOT",-74.11,4.67],
    [31,"Puente Aranda","Puente Aranda","Proximidad viable — equipamientos barriales",-74.11,4.62],
    [32,"Teusaquillo","Teusaquillo","Alta viabilidad — densa y mixta",-74.08,4.64],
    [33,"Barrios Unidos","Barrios Unidos","Alta viabilidad — densa y mixta",-74.08,4.68],
  ].map(([num,name,localidad,tag,lon,lat]) => ({num,name,localidad,tag,lon,lat}));

  const SCALE_DATA = {
    natural: {
      label: "Natural", icon: "fa-droplet", color: "#24d5c6",
      subtitle: "Agua, humedales y estructura ecológica",
      reading: "La escala natural hace visibles el agua, los humedales y la estructura ecológica como sistemas vivos que atraviesan el límite administrativo.",
      overpass: (b) => `\n        (way["waterway"](${b});node["waterway"](${b});way["natural"~"water|wetland|wood|scrub"](${b});node["natural"~"water|wetland|wood|scrub"](${b});way["leisure"="park"](${b}););\n      `,
      fallback: ["Humedal / área de agua", "Parque ecológico", "Corredor verde", "Cobertura vegetal"],
    },
    cultural: {
      label: "Cultural", icon: "fa-landmark", color: "#e59461",
      subtitle: "Patrimonio, barrios y memoria urbana",
      reading: "La escala cultural superpone patrimonio, prácticas barriales y lugares de memoria sobre la red cotidiana: el territorio no es solo soporte físico.",
      overpass: (b) => `\n        (node["historic"](${b});way["historic"](${b});node["tourism"](${b});node["amenity"="place_of_worship"](${b}););\n      `,
      fallback: ["Lugar patrimonial", "Plaza de barrio", "Equipamiento cultural", "Sitio de memoria"],
    },
    tecnologico: {
      label: "Tecnológico", icon: "fa-microchip", color: "#4eb5ed",
      subtitle: "Datos, redes y movilidad inteligente",
      reading: "La escala tecnológica permite leer las calles como una red de conectividad: movilidad, transporte público, equipamientos y datos se co-producen.",
      overpass: (b) => `\n        (way["highway"]["name"](${b});node["public_transport"](${b});node["amenity"](${b});node["office"](${b}););\n      `,
      fallback: ["Parada de transporte", "Equipamiento", "Conector vial", "Nodo de datos"],
    },
    metaverso: {
      label: "Metaverso", icon: "fa-cubes", color: "#b682ee",
      subtitle: "Modelo digital y escenarios inmersivos",
      reading: "El metaverso no reemplaza el territorio: añade una capa de escenarios para probar cómo cambiaría la experiencia urbana si se modifican sus relaciones.",
      overpass: (b) => `\n        (node["amenity"~"school|library|community_centre|social_facility"](${b});node["shop"](${b}););\n      `,
      fallback: ["Punto de interacción", "Escenario inmersivo", "Nodo comunitario", "Lugar simulado"],
    },
  };

  const API_LAYERS = {
    roads: { label: "Calles", group: "Movilidad", icon: "fa-road", color: "#2baaa0", defaultActive: true, query: (b) => `way["highway"](${b});`, match: (t) => Boolean(t.highway) },
    walking: { label: "Peatonal y bici", group: "Movilidad", icon: "fa-person-walking", color: "#72d6b5", defaultActive: false, query: (b) => `way["highway"~"^(footway|path|pedestrian|cycleway|steps|bridleway)$"](${b});`, match: (t) => /^(footway|path|pedestrian|cycleway|steps|bridleway)$/.test(t.highway || "") },
    transport: { label: "Transporte público", group: "Movilidad", icon: "fa-bus", color: "#4eb5ed", defaultActive: true, query: (b) => `nwr["public_transport"](${b});node["highway"="bus_stop"](${b});`, match: (t) => Boolean(t.public_transport || t.highway === "bus_stop") },
    rail: { label: "Ferrocarril y metro", group: "Movilidad", icon: "fa-train-subway", color: "#7c9cff", defaultActive: false, query: (b) => `nwr["railway"](${b});`, match: (t) => Boolean(t.railway) },
    aerial: { label: "Cables y aéreo", group: "Movilidad", icon: "fa-cable-car", color: "#9b8cff", defaultActive: false, query: (b) => `nwr["aerialway"](${b});nwr["aeroway"](${b});`, match: (t) => Boolean(t.aerialway || t.aeroway) },
    natural: { label: "Naturaleza", group: "Ambiente", icon: "fa-leaf", color: "#24d5c6", defaultActive: true, query: (b) => `nwr["natural"](${b});nwr["waterway"](${b});`, match: (t) => Boolean(t.natural || t.waterway) },
    water: { label: "Agua y humedales", group: "Ambiente", icon: "fa-water", color: "#56b9e9", defaultActive: false, query: (b) => `nwr["waterway"](${b});nwr["natural"~"^(water|wetland|bay|spring|hot_spring)$"](${b});`, match: (t) => Boolean(t.waterway || /^(water|wetland|bay|spring|hot_spring)$/.test(t.natural || "")) },
    green: { label: "Bosques y cobertura", group: "Ambiente", icon: "fa-tree", color: "#6dd48c", defaultActive: false, query: (b) => `nwr["natural"~"^(tree|wood|scrub|heath|grassland)$"](${b});nwr["landuse"~"^(forest|orchard|vineyard|allotments)$"](${b});`, match: (t) => /^(tree|wood|scrub|heath|grassland)$/.test(t.natural || "") || /^(forest|orchard|vineyard|allotments)$/.test(t.landuse || "") },
    amenities: { label: "Equipamientos", group: "Servicios", icon: "fa-building-columns", color: "#e59461", defaultActive: true, query: (b) => `nwr["amenity"](${b});`, match: (t) => Boolean(t.amenity) },
    education: { label: "Educación", group: "Servicios", icon: "fa-graduation-cap", color: "#f0c36e", defaultActive: false, query: (b) => `nwr["amenity"~"^(school|kindergarten|college|university|library|music_school)$"](${b});`, match: (t) => /^(school|kindergarten|college|university|library|music_school)$/.test(t.amenity || "") },
    health: { label: "Salud", group: "Servicios", icon: "fa-heart-pulse", color: "#f08383", defaultActive: false, query: (b) => `nwr["amenity"~"^(hospital|clinic|doctors|dentist|pharmacy|veterinary)$"](${b});`, match: (t) => /^(hospital|clinic|doctors|dentist|pharmacy|veterinary)$/.test(t.amenity || "") },
    care: { label: "Cuidado y comunidad", group: "Servicios", icon: "fa-hands-holding-child", color: "#f4a6c2", defaultActive: false, query: (b) => `nwr["amenity"~"^(social_facility|community_centre|childcare|nursing_home|shelter)$"](${b});`, match: (t) => /^(social_facility|community_centre|childcare|nursing_home|shelter)$/.test(t.amenity || "") },
    civic: { label: "Cívico y público", group: "Servicios", icon: "fa-landmark-dome", color: "#d9b5ff", defaultActive: false, query: (b) => `nwr["amenity"~"^(townhall|public_building|courthouse|post_office|police|fire_station|prison)$"](${b});`, match: (t) => /^(townhall|public_building|courthouse|post_office|police|fire_station|prison)$/.test(t.amenity || "") },
    services: { label: "Servicios urbanos", group: "Servicios", icon: "fa-droplet", color: "#72b8d8", defaultActive: false, query: (b) => `nwr["amenity"~"^(bank|atm|fuel|parking|toilets|waste_basket|recycling|drinking_water)$"](${b});`, match: (t) => /^(bank|atm|fuel|parking|toilets|waste_basket|recycling|drinking_water)$/.test(t.amenity || "") },
    commerce: { label: "Comercio y empleo", group: "Economía", icon: "fa-store", color: "#f1bd61", defaultActive: true, query: (b) => `nwr["shop"](${b});nwr["office"](${b});`, match: (t) => Boolean(t.shop || t.office) },
    food: { label: "Alimentos y mercados", group: "Economía", icon: "fa-utensils", color: "#ff9d62", defaultActive: false, query: (b) => `nwr["amenity"~"^(restaurant|cafe|fast_food|bar|food_court|marketplace)$"](${b});`, match: (t) => /^(restaurant|cafe|fast_food|bar|food_court|marketplace)$/.test(t.amenity || "") },
    industrial: { label: "Industria y producción", group: "Economía", icon: "fa-industry", color: "#cf9b72", defaultActive: false, query: (b) => `nwr["landuse"~"^(industrial|commercial|retail)$"](${b});nwr["man_made"](${b});`, match: (t) => /^(industrial|commercial|retail)$/.test(t.landuse || "") || Boolean(t.man_made) },
    residential: { label: "Vivienda", group: "Territorio", icon: "fa-house", color: "#d7a4e8", defaultActive: false, query: (b) => `nwr["landuse"="residential"](${b});nwr["building"~"^(apartments|residential|house|detached|semidetached_house|terrace)$"](${b});`, match: (t) => t.landuse === "residential" || /^(apartments|residential|house|detached|semidetached_house|terrace)$/.test(t.building || "") },
    buildings: { label: "Edificaciones", group: "Territorio", icon: "fa-building", color: "#c2a7b8", defaultActive: false, query: (b) => `nwr["building"](${b});`, match: (t) => Boolean(t.building) },
    landuse: { label: "Usos del suelo", group: "Territorio", icon: "fa-layer-group", color: "#b8a477", defaultActive: false, query: (b) => `nwr["landuse"](${b});nwr["landcover"](${b});`, match: (t) => Boolean(t.landuse || t.landcover) },
    parks: { label: "Parques y recreación", group: "Ambiente", icon: "fa-tree-city", color: "#b682ee", defaultActive: true, query: (b) => `nwr["leisure"](${b});`, match: (t) => Boolean(t.leisure) },
    sports: { label: "Deporte", group: "Ambiente", icon: "fa-futbol", color: "#a985ec", defaultActive: false, query: (b) => `nwr["leisure"~"^(sports_centre|pitch|stadium|track|swimming_pool|fitness_centre)$"](${b});`, match: (t) => /^(sports_centre|pitch|stadium|track|swimming_pool|fitness_centre)$/.test(t.leisure || "") },
    culture: { label: "Patrimonio y cultura", group: "Cultura", icon: "fa-landmark", color: "#e59461", defaultActive: true, query: (b) => `nwr["historic"](${b});nwr["amenity"~"^(place_of_worship|arts_centre|theatre|cinema|museum)$"](${b});`, match: (t) => Boolean(t.historic) || /^(place_of_worship|arts_centre|theatre|cinema|museum)$/.test(t.amenity || "") },
    tourism: { label: "Turismo y atracciones", group: "Cultura", icon: "fa-camera-retro", color: "#ed9ac2", defaultActive: false, query: (b) => `nwr["tourism"](${b});`, match: (t) => Boolean(t.tourism) },
    memorial: { label: "Memoria y monumentos", group: "Cultura", icon: "fa-monument", color: "#dd8e7f", defaultActive: false, query: (b) => `nwr["historic"~"^(memorial|monument|wayside_shrine|ruins)$"](${b});`, match: (t) => /^(memorial|monument|wayside_shrine|ruins)$/.test(t.historic || "") },
    boundaries: { label: "Límites y barrios", group: "Territorio", icon: "fa-draw-polygon", color: "#b8c5cc", defaultActive: true, query: (b) => `relation["boundary"](${b});nwr["place"](${b});`, match: (t) => Boolean(t.boundary || t.place) },
    utilities: { label: "Infraestructura técnica", group: "Infraestructura", icon: "fa-tower-broadcast", color: "#89c8dc", defaultActive: false, query: (b) => `nwr["power"](${b});nwr["man_made"~"^(water_tower|wastewater_plant|communications_tower|silo)$"](${b});`, match: (t) => Boolean(t.power) || /^(water_tower|wastewater_plant|communications_tower|silo)$/.test(t.man_made || "") },
    street: { label: "Mobiliario vial", group: "Infraestructura", icon: "fa-traffic-light", color: "#d8d08b", defaultActive: false, query: (b) => `nwr["highway"~"^(street_lamp|traffic_signals|crossing|bus_stop)$"](${b});nwr["amenity"~"^(bench|bicycle_parking|shelter)$"](${b});`, match: (t) => /^(street_lamp|traffic_signals|crossing|bus_stop)$/.test(t.highway || "") || /^(bench|bicycle_parking|shelter)$/.test(t.amenity || "") },
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
  }

  function setText(selector, value) {
    const el = $(selector);
    if (el) el.textContent = value;
  }

  function rememberCache(key, value) {
    if (CACHE.has(key)) CACHE.delete(key);
    CACHE.set(key, value);
    while (CACHE.size > CACHE_MAX_ENTRIES) CACHE.delete(CACHE.keys().next().value);
  }

  function getViewportBBox() {
    if (!state.map) return null;
    const bounds = state.map.getBounds();
    const west = bounds.getWest();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const north = bounds.getNorth();
    const lonPad = Math.max((east - west) * 0.08, 0.003);
    const latPad = Math.max((north - south) * 0.08, 0.003);
    return {
      west: Math.max(-74.6, west - lonPad),
      south: Math.max(3.8, south - latPad),
      east: Math.min(-73.5, east + lonPad),
      north: Math.min(5.2, north + latPad),
    };
  }

  function bboxString(bbox) {
    return [bbox.south, bbox.west, bbox.north, bbox.east].map((value) => Number(value).toFixed(5)).join(",");
  }

  function viewportLevel() {
    const zoom = state.map?.getZoom?.() ?? 13;
    if (zoom < 12) return "macro";
    if (zoom < 14.5) return "meso";
    return "micro";
  }

  function roadClassesForLevel(level) {
    if (level === "macro") return ["motorway", "trunk", "primary", "secondary"];
    if (level === "meso") return ["motorway", "trunk", "primary", "secondary", "tertiary"];
    return ["motorway", "trunk", "primary", "secondary", "tertiary", "residential", "living_street", "service", "unclassified"];
  }

  function roadRegexForLevel(level) {
    return `^(${roadClassesForLevel(level).join("|")})$`;
  }

  function applyRoadZoomFilter() {
    if (!state.map) return;
    const classes = roadClassesForLevel(viewportLevel());
    const filter = ["in", ["get", "highway"], ["literal", classes]];
    ["osm-streets", "osm-streets-casing"].forEach((id) => {
      if (state.map.getLayer(id)) state.map.setFilter(id, filter);
    });
    setText("#roadLevel", `Nivel ${viewportLevel()} · ${classes.length} jerarquías visibles`);
  }

  function localPmtilesUrl() {
    return new URL(LOCAL_PMTILES_PATH, window.location.href).href;
  }

  function updateLocalTilesButton(active, pending = false) {
    const button = $("#localTilesBtn");
    if (!button) return;
    button.classList.toggle("is-active", active);
    button.disabled = pending;
    button.innerHTML = pending
      ? '<i class="fa-solid fa-spinner fa-spin"></i> Cargando PMTiles…'
      : active
        ? '<i class="fa-solid fa-hard-drive"></i> PMTiles local activo'
        : '<i class="fa-solid fa-hard-drive"></i> Usar PMTiles local';
  }

  function removeLocalRoadLayers() {
    if (!state.map) return;
    ["local-roads-casing", "local-roads"].forEach((id) => {
      if (state.map.getLayer(id)) state.map.removeLayer(id);
    });
    if (state.map.getSource("local-roads-source")) state.map.removeSource("local-roads-source");
    state.pmtilesArchive = null;
  }

  async function enableLocalPmtiles() {
    if (!state.mapReady || !window.pmtiles) throw new Error("pmtiles.js no está cargado");
    updateLocalTilesButton(false, true);
    const url = localPmtilesUrl();
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (!response.ok) throw new Error("No existe tiles/bogota-roads.pmtiles todavía");
    if (!state.pmtilesProtocol) {
      state.pmtilesProtocol = new pmtiles.Protocol();
      maplibregl.addProtocol("pmtiles", state.pmtilesProtocol.tile);
    }
    const archive = new pmtiles.PMTiles(url);
    state.pmtilesProtocol.add(archive);
    state.pmtilesArchive = archive;
    if (!state.map.getSource("local-roads-source")) {
      state.map.addSource("local-roads-source", { type: "vector", url: `pmtiles://${url}`, attribution: OSM_ATTRIBUTION });
      state.map.addLayer({ id: "local-roads-casing", type: "line", source: "local-roads-source", "source-layer": "roads", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#ffffff", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.6, 13, 3.2, 16, 6], "line-opacity": .8 } }, "upl-focus-fill");
      state.map.addLayer({ id: "local-roads", type: "line", source: "local-roads-source", "source-layer": "roads", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": ["match", ["get", "highway"], "motorway", "#d56c75", "trunk", "#df8e5a", "primary", "#e6a95a", "secondary", "#4cb2a9", "tertiary", "#58a9a4", "residential", "#2d9790", "living_street", "#50aaa2", "service", "#74bab2", "#4a9f99"], "line-width": ["interpolate", ["linear"], ["zoom"], 10, .55, 13, 1.15, 16, 2.5], "line-opacity": .95 } }, "upl-focus-fill");
    }
    state.streetSource = "pmtiles";
    updateLocalTilesButton(true);
    setText("#modeDetail", "PMTiles local · sin consulta vial externa");
    setText("#metricRoads", "MVT");
    setText("#connectionLabel", "Red vial local conectada");
    showToast("PMTiles local activo: la red vial ya no depende de Overpass.");
    applyRoadZoomFilter();
  }

  function disableLocalPmtiles() {
    removeLocalRoadLayers();
    state.streetSource = state.localRoadFeatures.length ? "local-geojson" : "overpass";
    if (state.streetSource === "local-geojson") updateStreetLayer(state.localRoadFeatures);
    updateLocalTilesButton(false);
    setText("#modeDetail", "OpenStreetMap · consulta bajo demanda");
    setText("#connectionLabel", "Mapa real conectado");
    loadScaleData();
  }

  async function toggleLocalPmtiles() {
    try {
      if (state.streetSource === "pmtiles") disableLocalPmtiles();
      else await enableLocalPmtiles();
    } catch (error) {
      updateLocalTilesButton(false);
      showToast(`${error.message}. Genera el archivo con tools/build-bogota-roads-pmtiles.sh.`, "error");
    }
  }

  function scheduleViewportLoad(immediate = false) {
    if (!state.mapReady || state.dataMode !== "real") return;
    window.clearTimeout(state.viewportDebounceTimer);
    const run = () => loadScaleData({ fromViewport: true });
    if (immediate) run();
    else state.viewportDebounceTimer = window.setTimeout(run, VIEWPORT_DEBOUNCE_MS);
  }

  function showToast(message, kind = "info") {
    const toast = $("#mapToast");
    if (!toast) return;
    toast.classList.toggle("is-error", kind === "error");
    toast.innerHTML = `<i class="fa-solid ${kind === "error" ? "fa-triangle-exclamation" : "fa-circle-info"}"></i><span>${escapeHtml(message)}</span>`;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
  }

  function getDeficit(upl) {
    if (/Déficit/i.test(upl.tag)) return "46%";
    if (/Alta viabilidad/i.test(upl.tag)) return "18%";
    if (/Borde rural|Conectividad/i.test(upl.tag)) return "—";
    return "32%";
  }

  function getStrategy(upl) {
    if (/Déficit/i.test(upl.tag)) return "Priorizar un ámbito integral de cuidado y llevar servicios a la vida cotidiana.";
    if (/Borde rural|Conectividad/i.test(upl.tag)) return "Proteger la conectividad ecosistémica sin forzar una lógica urbana de proximidad.";
    if (/Metro|DOT|corredores/i.test(upl.tag)) return "Conectar soporte urbano, cuidado y transporte alrededor de la proximidad.";
    return "Conectar soporte urbano, cuidado y ecosistemas en la unidad cotidiana.";
  }

  function makeBounds(upl, view = "barrio") {
    if (view === "region") return [[-74.38, 4.40], [-73.88, 4.90]];
    const width = view === "barrio" ? .022 : .035;
    const height = view === "barrio" ? .018 : .028;
    return [[upl.lon - width, upl.lat - height], [upl.lon + width, upl.lat + height]];
  }

  function updateUplPanel(upl) {
    state.selectedUpl = upl;
    setText("#selectedUplName", `${upl.num} · ${upl.name.toUpperCase()}`);
    setText("#selectedUplDescription", `${upl.tag}. Localidades relacionadas: ${upl.localidad}.`);
    setText("#strategyText", getStrategy(upl));
    setText("#metricDeficit", getDeficit(upl));
    setText("#mapTitle", `UPL ${upl.num} · ${upl.name}`);
    setText("#mapSubtitle", `${upl.localidad} · calles, equipamientos y estructura natural`);
    setText("#uplTag", `UPL ${upl.num} · ${upl.name}: ${upl.tag}`);
    const select = $("#uplSelect");
    if (select) select.value = String(upl.num);
    state.favorite = localStorage.getItem(`bogota-viva-fav-${upl.num}`) === "1";
    refreshFavorite();
  }

  function refreshFavorite() {
    const button = $("#favoriteBtn");
    if (!button) return;
    button.classList.toggle("is-favorite", state.favorite);
    button.innerHTML = `<i class="fa-${state.favorite ? "solid" : "regular"} fa-star"></i>`;
    button.setAttribute("aria-label", state.favorite ? "Quitar de favoritas" : "Marcar como favorita");
  }

  function renderUplSelect() {
    const select = $("#uplSelect");
    if (!select) return;
    select.innerHTML = UPLS.map((upl) => `<option value="${upl.num}">${String(upl.num).padStart(2,"0")} · ${escapeHtml(upl.name)} · ${escapeHtml(upl.localidad)}</option>`).join("");
  }

  function renderApiLayerToggles() {
    const wrap = $("#apiLayerToggles");
    if (!wrap) return;
    const groups = new Map();
    Object.entries(API_LAYERS).forEach(([key, layer]) => {
      if (!groups.has(layer.group)) groups.set(layer.group, []);
      groups.get(layer.group).push([key, layer]);
    });
    wrap.innerHTML = [...groups.entries()].map(([group, entries]) => `<section class="api-layer-group"><div class="api-layer-group-label">${group}</div><div class="api-layer-group-grid">${entries.map(([key, layer]) => `<button type="button" class="api-layer-toggle${state.apiLayers[key] ? " is-active" : ""}" data-api-layer="${key}" aria-pressed="${state.apiLayers[key]}" style="--layer-color:${layer.color}"><i class="fa-solid ${layer.icon}"></i><span>${layer.label}</span></button>`).join("")}</div></section>`).join("");
    $$(".api-layer-toggle").forEach((button) => button.addEventListener("click", () => {
      const key = button.dataset.apiLayer;
      state.apiLayers[key] = !state.apiLayers[key];
      button.classList.toggle("is-active", state.apiLayers[key]);
      button.setAttribute("aria-pressed", String(state.apiLayers[key]));
      state.activeQueryKey = "";
      if (state.mapReady) loadScaleData();
    }));
  }

  function renderApiSummary(elements) {
    const summary = $("#apiSummary");
    if (!summary) return;
    summary.innerHTML = Object.entries(API_LAYERS).filter(([key]) => state.apiLayers[key]).map(([key, layer]) => {
      const status = state.apiLayerStatus[key] || "idle";
      const sourceElements = Array.isArray(state.apiLayerElements[key]) ? state.apiLayerElements[key] : [];
      const uniqueCount = new Set(sourceElements.map((element) => `${element.type}/${element.id}`)).size;
      const label = status === "loading" || status === "pending" ? "consultando" : status === "ok" && uniqueCount ? "lista" : status === "ok" ? "sin resultados" : status === "error" ? "reintentar" : "apagada";
      const count = status === "pending" || status === "loading" ? "…" : uniqueCount;
      return `<span class="api-summary-item is-${status}"><i class="fa-solid ${layer.icon}" style="color:${layer.color}"></i><strong>${layer.label}</strong><b>${count}</b><em>${label}</em></span>`;
    }).join("") || "<span>Ninguna capa activa.</span>";
  }

  function renderScaleCards() {
    const wrap = $("#scaleCards");
    if (!wrap) return;
    wrap.innerHTML = Object.entries(SCALE_DATA).map(([key, scale]) => `<button class="scale-card${key === state.selectedScale ? " is-active" : ""}" data-scale="${key}"><span class="card-icon"><i class="fa-solid ${scale.icon}"></i></span><span><strong>${scale.label}</strong><small>${scale.subtitle}</small></span></button>`).join("");
    $$(".scale-card").forEach((button) => button.addEventListener("click", () => setScale(button.dataset.scale)));
  }

  function setScale(scaleKey, shouldQuery = true) {
    if (!SCALE_DATA[scaleKey]) return;
    state.selectedScale = scaleKey;
    $$(".scale-btn").forEach((button) => {
      const active = button.dataset.scale === scaleKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    renderScaleCards();
    setText("#scaleReading", SCALE_DATA[scaleKey].reading);
    if (shouldQuery && state.mapReady) loadScaleData();
    openScaleNetworkModal(scaleKey);
  }

  function initializeMap() {
    if (!window.maplibregl) {
      useProceduralFallback("MapLibre no pudo cargarse; se activó la lectura procedural.");
      return;
    }
    const style = {
      version: 8,
      sources: {
        "bogota-gray-local": {
          type: "image",
          url: "assets/bogota-osm-detail-gray.jpg",
          coordinates: [[-74.25, 4.82], [-73.95, 4.82], [-73.95, 4.50], [-74.25, 4.50]],
        },
        "carto-gray-fallback": {
          type: "raster",
          tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: "© OpenStreetMap © CARTO",
        },
        "osm-gray-fallback": {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          minzoom: 0,
          maxzoom: 19,
          attribution: OSM_ATTRIBUTION,
        },
      },
      layers: [
        { id: "map-background", type: "background", paint: { "background-color": "#05070a" } },
        { id: "bogota-gray-local-layer", type: "raster", source: "bogota-gray-local", paint: { "raster-saturation": -1, "raster-contrast": 0.34, "raster-brightness-min": 0.00, "raster-brightness-max": 0.22, "raster-opacity": 0.96 } },
        { id: "carto-gray-fallback-layer", type: "raster", source: "carto-gray-fallback", paint: { "raster-saturation": -1, "raster-contrast": 0.22, "raster-brightness-min": 0.00, "raster-brightness-max": 0.46, "raster-opacity": 0.94 } },
        { id: "osm-gray-fallback-layer", type: "raster", source: "osm-gray-fallback", paint: { "raster-saturation": -1, "raster-contrast": 0.28, "raster-brightness-min": 0.00, "raster-brightness-max": 0.24, "raster-opacity": 0.58 } },
      ],
    };
    const synthesisStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
    try {
      state.map = new maplibregl.Map({ container: "map", style: synthesisStyle, center: BOGOTA, zoom: 11.3, minZoom: 9, maxZoom: 19, attributionControl: true, maxBounds: [[-74.45, 4.35], [-73.75, 4.95]] });
      state.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
      state.map.on("zoom", applyRoadZoomFilter);
      state.map.on("moveend", () => {
        applyRoadZoomFilter();
        scheduleViewportLoad();
      });
      state.map.on("load", () => {
        state.mapReady = true;
        addMapLayers();
        updateUplPanel(state.selectedUpl);
        focusSelectedUpl(false);
        setText("#connectionLabel", "Cargando OSM · respaldo visible");
        renderProceduralMarkers();
        showToast("Mapa monocromático listo. Se muestran las calles locales mientras llegan los datos OSM.");
        applyRoadZoomFilter();
        loadLocalRoadFallback();
        loadScaleData();
      });
      state.map.on("error", (event) => {
        if (event?.error?.status === 404) showToast("Una tesela no respondió; el mapa continuará con caché del navegador.", "error");
      });
    } catch (error) {
      console.warn("No se pudo inicializar MapLibre", error);
      useProceduralFallback("No se pudo inicializar el mapa real; se activó el respaldo procedural.");
    }
  }

  function addMapLayers() {
    if (!state.map || state.map.getSource("upl-focus")) return;
    state.map.addSource("osm-streets", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    state.map.addLayer({ id: "osm-streets-casing", type: "line", source: "osm-streets", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#ffffff", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1.6, 13, 3.2, 16, 6], "line-opacity": .78 } });
    state.map.addLayer({ id: "osm-streets", type: "line", source: "osm-streets", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": ["match", ["get", "highway"], "motorway", "#d56c75", "trunk", "#df8e5a", "primary", "#e6a95a", "secondary", "#4cb2a9", "tertiary", "#58a9a4", "residential", "#2d9790", "living_street", "#50aaa2", "service", "#74bab2", "#4a9f99"], "line-width": ["interpolate", ["linear"], ["zoom"], 10, .55, 13, 1.15, 16, 2.5], "line-opacity": .93 } });
    state.map.addSource("osm-places", { type: "geojson", data: { type: "FeatureCollection", features: [] }, cluster: true, clusterMaxZoom: 14, clusterRadius: 34 });
    state.map.addLayer({ id: "osm-place-clusters", type: "circle", source: "osm-places", filter: ["has", "point_count"], paint: { "circle-radius": ["step", ["get", "point_count"], 9, 20, 12, 100, 16, 500, 21, 2000, 27], "circle-color": ["step", ["get", "point_count"], "#24d5c6", 100, "#e6b85c", 500, "#e8925c", 2000, "#d86b84"], "circle-opacity": .94, "circle-stroke-color": "#0d1718", "circle-stroke-width": 2, "circle-stroke-opacity": .9 } });
    state.map.addLayer({ id: "osm-place-cluster-count", type: "symbol", source: "osm-places", filter: ["has", "point_count"], layout: { "text-field": ["to-string", ["get", "point_count_abbreviated"]], "text-size": 10, "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"] }, paint: { "text-color": "#07100f", "text-halo-color": "#f2eee7", "text-halo-width": 1 } });
    state.map.addLayer({ id: "osm-places", type: "circle", source: "osm-places", filter: ["!", ["has", "point_count"]], paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 9, 3.5, 12, 5.5, 15, 8], "circle-color": ["coalesce", ["get", "color"], "#e8925c"], "circle-opacity": .96, "circle-stroke-color": "#ffffff", "circle-stroke-width": 1.4, "circle-stroke-opacity": .95 } });
    state.map.addSource("upl-focus", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    state.map.addLayer({ id: "upl-focus-fill", type: "fill", source: "upl-focus", paint: { "fill-color": "#24d5c6", "fill-opacity": .10 } });
    state.map.addLayer({ id: "upl-focus-line", type: "line", source: "upl-focus", paint: { "line-color": "#149e96", "line-width": 2, "line-dasharray": [2, 2], "line-opacity": .9 } });
    state.map.addSource("route", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    state.map.addLayer({ id: "route-casing", type: "line", source: "route", paint: { "line-color": "#ffffff", "line-width": 7, "line-opacity": .75 } });
    state.map.addLayer({ id: "route-line", type: "line", source: "route", paint: { "line-color": "#24bdb3", "line-width": 4, "line-opacity": .95 } });
  }

  function updateFocusLayer() {
    if (!state.map || !state.map.getSource("upl-focus") || !state.selectedUpl) return;
    const [[west, south], [east, north]] = makeBounds(state.selectedUpl, state.currentView);
    state.map.getSource("upl-focus").setData({ type: "FeatureCollection", features: [{ type: "Feature", properties: { label: "radio exploratorio" }, geometry: { type: "Polygon", coordinates: [[[west,south],[east,south],[east,north],[west,north],[west,south]]] } }] });
  }

  function clearUplMarkers() {
    [state.uplMarker, state.uplLabelMarker].forEach((marker) => { if (marker) marker.remove(); });
    state.uplMarker = null;
    state.uplLabelMarker = null;
  }

  function renderUplMarkers() {
    if (!state.map || !state.selectedUpl || !window.maplibregl) return;
    clearUplMarkers();
    const markerEl = document.createElement("div");
    markerEl.className = "upl-marker";
    markerEl.title = `UPL ${state.selectedUpl.num} · ${state.selectedUpl.name}`;
    markerEl.addEventListener("click", () => showToast(`UPL ${state.selectedUpl.num}: el recuadro es un radio exploratorio, no un límite legal.`));
    state.uplMarker = new maplibregl.Marker({ element: markerEl, anchor: "center" }).setLngLat([state.selectedUpl.lon, state.selectedUpl.lat]).addTo(state.map);
    const labelEl = document.createElement("div");
    labelEl.className = "upl-label";
    labelEl.textContent = `UPL ${state.selectedUpl.num} · ${state.selectedUpl.name}`;
    state.uplLabelMarker = new maplibregl.Marker({ element: labelEl, anchor: "bottom-left" }).setLngLat([state.selectedUpl.lon + .005, state.selectedUpl.lat + .008]).addTo(state.map);
  }

  function focusSelectedUpl(animate = true) {
    if (!state.map || !state.selectedUpl) return;
    updateFocusLayer();
    renderUplMarkers();
    state.map.fitBounds(makeBounds(state.selectedUpl, state.currentView), { padding: 44, duration: animate ? 700 : 0, maxZoom: state.currentView === "barrio" ? 15.2 : 12.4 });
  }

  function switchView(view) {
    state.currentView = view;
    $$(".view-card").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
    if (view === "region") {
      setText("#mapTitle", "Región Metropolitana");
      setText("#mapSubtitle", "20 municipios conectados · escala macro");
      if (state.map) state.map.fitBounds(makeBounds(state.selectedUpl, "region"), { padding: 38, duration: 700, maxZoom: 11.2 });
      showToast("Vista macro: el mapa se abre a la región; la UPL permanece como referencia.");
    } else {
      updateUplPanel(state.selectedUpl);
      focusSelectedUpl(true);
      showToast("Vista barrio vital: lectura de proximidad alrededor de la UPL seleccionada.");
    }
    updateFocusLayer();
  }

  function clearPlaceMarkers() {
    state.placeMarkers.forEach((marker) => marker.remove());
    state.placeMarkers = [];
    state.proceduralMarkers.forEach((marker) => marker.remove());
    state.proceduralMarkers = [];
    updatePlaceLayer([]);
  }

  function featurePoint(element) {
    if (element.type === "node" && element.lat != null && element.lon != null) return [Number(element.lon), Number(element.lat)];
    if (element.center && element.center.lat != null && element.center.lon != null) return [Number(element.center.lon), Number(element.center.lat)];
    if (Array.isArray(element.geometry) && element.geometry[0]?.lat != null && element.geometry[0]?.lon != null) return [Number(element.geometry[0].lon), Number(element.geometry[0].lat)];
    return null;
  }

  function streetFeature(element) {
    if (element.type !== "way" || !element.tags?.highway || !Array.isArray(element.geometry) || element.geometry.length < 2) return null;
    const coordinates = element.geometry.map((point) => [Number(point.lon), Number(point.lat)]).filter((point) => Number.isFinite(point[0]) && Number.isFinite(point[1]));
    if (coordinates.length < 2) return null;
    return { type: "Feature", properties: { highway: element.tags.highway, name: element.tags.name || "Calle sin nombre", osmId: element.id }, geometry: { type: "LineString", coordinates } };
  }

  function updateStreetLayer(features) {
    if (!state.map || !state.map.getSource("osm-streets")) return;
    state.map.getSource("osm-streets").setData({ type: "FeatureCollection", features });
  }

  async function loadLocalRoadFallback() {
    if (!state.map || !state.mapReady) return;
    try {
      const response = await fetch("./vias.geojson", { cache: "force-cache" });
      if (!response.ok) throw new Error(`GeoJSON vial HTTP ${response.status}`);
      const json = await response.json();
      const features = (json.features || []).filter((feature) => feature.geometry && ["LineString", "MultiLineString"].includes(feature.geometry.type)).map((feature) => ({
        ...feature,
        properties: { ...(feature.properties || {}), highway: feature.properties?.highway || feature.properties?.fclass || "residential", source: "GeoJSON local" },
      }));
      state.localRoadFeatures = features;
      state.localRoadCount = features.length;
      if (state.streetSource !== "pmtiles") {
        state.streetSource = "local-geojson";
        updateStreetLayer(features);
        setText("#metricRoads", features.length.toLocaleString("es-CO"));
        setText("#modeDetail", "GeoJSON vial local · OSM bajo demanda");
        setText("#connectionLabel", "Mapa OSM monocromático listo · 16.962 calles locales");
      }
    } catch (error) {
      console.warn("No se pudo cargar el respaldo vial local", error);
      if (state.streetSource === "local-geojson") state.streetSource = "overpass";
    }
  }

  function updatePlaceLayer(features) {
    if (!state.map || !state.map.getSource("osm-places")) return;
    state.map.getSource("osm-places").setData({ type: "FeatureCollection", features });
  }

  function featureName(element) {
    const tags = element.tags || {};
    return tags.name || tags["name:es"] || tags.amenity || tags.shop || tags.office || tags.leisure || tags.natural || tags.waterway || tags.landuse || tags.building || tags.railway || tags.tourism || tags.historic || tags.place || tags.man_made || tags.highway || "Lugar OSM";
  }

  function featureType(element) {
    const tags = element.tags || {};
    if (tags.highway) return tags.highway === "bus_stop" ? "parada de transporte" : "calle";
    return tags.amenity || tags.shop || tags.office || tags.leisure || tags.natural || tags.waterway || tags.landuse || tags.building || tags.railway || tags.tourism || tags.historic || tags.place || tags.man_made || "lugar";
  }

  function featureLayer(element) {
    const tags = element.tags || {};
    return Object.entries(API_LAYERS).find(([, layer]) => layer.match?.(tags, element)) || null;
  }

  function renderPlaces(elements) {
    clearPlaceMarkers();
    if (!state.map || !window.maplibregl) return;
    const seen = new Set();
    const streetFeatures = [];
    const placeFeatures = [];
    let placeCount = 0;
    let roadCount = 0;
    elements.forEach((element) => {
      const street = streetFeature(element);
      if (street) {
        streetFeatures.push(street);
        roadCount += 1;
      }
    });
    if (state.streetSource === "overpass" && streetFeatures.length) updateStreetLayer(streetFeatures);
    else if (!streetFeatures.length && state.localRoadFeatures.length) updateStreetLayer(state.localRoadFeatures);
    elements.forEach((element) => {
      const point = featurePoint(element);
      const tags = element.tags || {};
      if (!point || tags.highway) return;
      const matchedLayer = featureLayer(element);
      placeFeatures.push({ type: "Feature", properties: { color: matchedLayer?.[1].color || "#e8925c", osmId: element.id, label: featureName(element) }, geometry: { type: "Point", coordinates: point } });
    });
    updatePlaceLayer(placeFeatures);
    placeCount = placeFeatures.length;
    /* Los círculos vectoriales son la capa principal; los marcadores HTML quedan
       limitados a una muestra para no ocultar las pepitas bajo una telaraña. */
    elements.slice(0, 36).forEach((element) => {
      const point = featurePoint(element);
      if (!point) return;
      const tags = element.tags || {};
      const key = `${point[0].toFixed(5)},${point[1].toFixed(5)}`;
      if (tags.highway || seen.has(key)) return;
      seen.add(key);
      const markerEl = document.createElement("div");
      markerEl.className = "place-marker";
      const matchedLayer = featureLayer(element);
      if (matchedLayer) {
        markerEl.style.background = matchedLayer[1].color;
        markerEl.title = matchedLayer[1].label;
      }
      const marker = new maplibregl.Marker({ element: markerEl, anchor: "center" }).setLngLat(point).setPopup(new maplibregl.Popup({ offset: 9, className: "place-popup" }).setHTML(`<strong>${escapeHtml(featureName(element))}</strong><span>${escapeHtml(featureType(element))} · OpenStreetMap${matchedLayer ? ` · ${escapeHtml(matchedLayer[1].label)}` : ""}</span>`)).addTo(state.map);
      state.placeMarkers.push(marker);
    });
    setText("#metricPlaces", placeCount ? String(placeCount) : "0");
    setText("#metricRoads", state.streetSource === "pmtiles" ? "MVT" : (state.streetSource === "local-geojson" && state.localRoadCount ? state.localRoadCount.toLocaleString("es-CO") : (roadCount ? roadCount.toLocaleString("es-CO") : "—")));
    renderApiSummary(elements);
  }

  function buildOverpassQuery(upl, scaleKey, bbox = null, layerKey = null) {
    const fallback = { west: upl.lon - .03, south: upl.lat - .025, east: upl.lon + .03, north: upl.lat + .025 };
    const b = bboxString(bbox || fallback);
    const roadLevel = state.map ? viewportLevel() : "meso";
    const keys = layerKey ? [layerKey] : Object.keys(API_LAYERS).filter((key) => state.apiLayers[key] && key !== "roads");
    const clauses = keys.flatMap((key) => {
      if (!state.apiLayers[key]) return [];
      if (key === "roads") return [`way["highway"~"${roadRegexForLevel(roadLevel)}"](${b});`];
      return [API_LAYERS[key].query(b)];
    });
    /* La consulta combinada prioriza conteos y puntos; la geometría vial pesada se consulta aparte. */
    const output = layerKey === "roads" ? "out geom tags;" : "out center tags;";
    return `[out:json][timeout:18];(${clauses.join("")});${output}`;
  }

  async function fetchOverpass(upl, scaleKey, bbox, signal, layerKey) {
    const key = `overpass:${upl.num}:${scaleKey}:${layerKey}:${bboxString(bbox)}`;
    if (CACHE.has(key)) return CACHE.get(key);
    const query = buildOverpassQuery(upl, scaleKey, bbox, layerKey);
    let lastError = null;
    for (const endpoint of OVERPASS_ENDPOINTS) {
      const endpointController = new AbortController();
      const endpointTimer = window.setTimeout(() => endpointController.abort(), OVERPASS_ENDPOINT_TIMEOUT_MS);
      const requestSignal = AbortSignal.any ? AbortSignal.any([signal, endpointController.signal]) : signal;
      try {
        const queryParam = `?data=${encodeURIComponent(query)}`;
        let response = await fetch(`${endpoint}${queryParam}`, { method: "GET", signal: requestSignal, headers: { Accept: "application/json" } });
        /* Algunos relays aceptan POST pero no GET; se conserva un segundo intento. */
        if (!response.ok) {
          response = await fetch(endpoint, {
            method: "POST",
            signal: requestSignal,
            headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
            body: `data=${encodeURIComponent(query)}`,
          });
        }
        if (!response.ok) throw new Error(`Overpass HTTP ${response.status}`);
        const json = await response.json();
        const elements = Array.isArray(json.elements) ? json.elements : [];
        rememberCache(key, elements);
        return elements;
      } catch (error) {
        if (signal.aborted) throw error;
        lastError = error;
      } finally {
        window.clearTimeout(endpointTimer);
      }
    }
    throw lastError || new Error("Ningún servidor Overpass respondió");
  }

  async function fetchVisibleApiLayers(upl, scaleKey, bbox, signal) {
    const priority = ["natural", "amenities", "transport", "water", "green", "parks", "culture", "commerce", "education", "health", "care", "boundaries", "roads"];
    const activeKeys = Object.keys(API_LAYERS).filter((key) => state.apiLayers[key]).sort((a, b) => priority.indexOf(a) - priority.indexOf(b));
    if (!activeKeys.length) return [];
    activeKeys.forEach((key) => { state.apiLayerStatus[key] = "pending"; state.apiLayerElements[key] = []; });
    renderApiSummary([]);
    setText("#connectionLabel", `Consultando OSM · 0/${activeKeys.length} categorías`);

    /* Una sola petición evita que Overpass bloquee el navegador por 28 solicitudes
       simultáneas. La respuesta se reparte localmente por las etiquetas de cada capa. */
    const queryKeys = activeKeys.filter((key) => key !== "roads");
    const combined = await fetchOverpass(upl, scaleKey, bbox, signal, null);
    const unique = new Map();
    combined.forEach((element) => unique.set(`${element.type}/${element.id}`, element));
    const allElements = [...unique.values()];
    activeKeys.forEach((key) => {
      if (key === "roads") {
        state.apiLayerStatus[key] = state.localRoadCount ? "ok" : "pending";
        state.apiLayerElements[key] = state.localRoadFeatures;
        return;
      }
      const layer = API_LAYERS[key];
      state.apiLayerElements[key] = allElements.filter((element) => layer.match?.(element.tags || {}, element));
      state.apiLayerStatus[key] = "ok";
    });
    renderPlaces(allElements);
    renderApiSummary(allElements);
    setText("#connectionLabel", `Datos OSM listos · ${allElements.length.toLocaleString("es-CO")} elementos · ${queryKeys.length} categorías clasificadas`);
    return allElements;
  }

  function renderProceduralMarkers() {
    if (!state.map || !state.selectedUpl || !window.maplibregl) return;
    clearPlaceMarkers();
    updateStreetLayer(state.streetSource === "local-geojson" ? state.localRoadFeatures : []);
    const scale = SCALE_DATA[state.selectedScale];
    const offsets = [[-.012,.008],[.010,.010],[-.007,-.009],[.014,-.006],[-.017,-.003],[.002,.017]];
    offsets.forEach(([dx,dy], index) => {
      const markerEl = document.createElement("div");
      markerEl.className = "place-marker";
      markerEl.style.background = scale.color;
      const label = scale.fallback[index % scale.fallback.length];
      const marker = new maplibregl.Marker({ element: markerEl, anchor: "center" }).setLngLat([state.selectedUpl.lon + dx, state.selectedUpl.lat + dy]).setPopup(new maplibregl.Popup({ offset: 9, className: "place-popup" }).setHTML(`<strong>${escapeHtml(label)}</strong><span>capa procedural de respaldo · no es un dato OSM</span>`)).addTo(state.map);
      state.proceduralMarkers.push(marker);
    });
    setText("#metricPlaces", String(offsets.length));
    setText("#metricRoads", "6");
    renderApiSummary([]);
  }

  async function loadScaleData({ fromViewport = false } = {}) {
    if (!state.mapReady || !state.selectedUpl) return;
    const rawBbox = getViewportBBox();
    if (!rawBbox) return;
    /* En móvil el viewport puede cubrir demasiada ciudad; acotamos cada consulta para que Overpass responda. */
    const centerLon = (rawBbox.west + rawBbox.east) / 2;
    const centerLat = (rawBbox.south + rawBbox.north) / 2;
    const halfWidth = Math.min((rawBbox.east - rawBbox.west) / 2, 0.035);
    const halfHeight = Math.min((rawBbox.north - rawBbox.south) / 2, 0.028);
    const bbox = { west: centerLon - halfWidth, south: centerLat - halfHeight, east: centerLon + halfWidth, north: centerLat + halfHeight };
    const layerKey = Object.entries(state.apiLayers).filter(([, enabled]) => enabled).map(([key]) => key).join("|");
    const queryKey = `${state.selectedUpl.num}:${state.selectedScale}:${layerKey}:${bboxString(bbox)}`;
    if (queryKey === state.activeQueryKey && fromViewport) return;
    state.activeQueryKey = queryKey;
    const token = ++state.queryToken;
    if (state.overpassController) state.overpassController.abort();
    const controller = new AbortController();
    state.overpassController = controller;
    const timeout = window.setTimeout(() => controller.abort(), 90000);
    const scale = SCALE_DATA[state.selectedScale];
    if (state.dataMode !== "real") {
      window.clearTimeout(timeout);
      renderProceduralMarkers();
      setText("#connectionLabel", "Modo procedural de respaldo");
      return;
    }
    clearPlaceMarkers();
    renderProceduralMarkers();
    setText("#metricPlaces", "6");
    setText("#metricRoads", "6");
    Object.keys(API_LAYERS).forEach((key) => { state.apiLayerStatus[key] = state.apiLayers[key] ? "pending" : "idle"; });
    renderApiSummary([]);
    setText("#connectionLabel", "Respaldo visible · consultando OSM…");
    showToast(`Consultando todas las capas API de ${scale.label.toLowerCase()} en el área visible…`);
    try {
      const elements = await fetchVisibleApiLayers(state.selectedUpl, state.selectedScale, bbox, controller.signal);
      if (token !== state.queryToken || controller.signal.aborted) return;
      renderPlaces(elements);
      setText("#connectionLabel", "Mapa real conectado");
      showToast(`${elements.length} elementos OSM recibidos en el área visible.`);
    } catch (error) {
      /* Un timeout propio no debe dejar las tarjetas congeladas en “cargando”. */
      if (token !== state.queryToken) return;
      console.warn("Overpass no respondió o excedió el tiempo límite", error);
      useProceduralFallback("Overpass tardó demasiado; se muestran los datos de respaldo y puedes reintentar las capas API.");
    } finally {
      window.clearTimeout(timeout);
      if (state.overpassController === controller) state.overpassController = null;
    }
  }

  function useProceduralFallback(message) {
    state.dataMode = "procedural";
    Object.keys(API_LAYERS).forEach((key) => { state.apiLayerStatus[key] = state.apiLayers[key] ? "error" : "idle"; });
    const toggle = $("#modeToggle");
    if (toggle) { toggle.classList.remove("is-on"); toggle.setAttribute("aria-checked", "false"); }
    const dot = $("#modeDot");
    if (dot) dot.style.background = "#f1bd61";
    setText("#modeTitle", "Simulación procedural");
    setText("#modeDetail", "respaldo local · sin consultas externas");
    setText("#connectionLabel", "Modo procedural de respaldo");
    if (state.mapReady) renderProceduralMarkers();
    showToast(message, "error");
  }

  function updateRouteSource(geojson) {
    if (!state.map || !state.map.getSource("route")) return;
    state.map.getSource("route").setData(geojson || { type: "FeatureCollection", features: [] });
  }

  function clearRoute() {
    state.routeStart = null;
    state.routeEnd = null;
    updateRouteSource({ type: "FeatureCollection", features: [] });
    setText("#metricRoute", "—");
    setText("#routeStatus", "Nominatim geocodifica y OSRM calcula la ruta. Las consultas se hacen solo al solicitarla.");
  }

  async function geocode(query) {
    const clean = `${query}, Bogotá, Colombia`;
    const url = `${NOMINATIM_ENDPOINT}?format=jsonv2&limit=1&addressdetails=1&accept-language=es&q=${encodeURIComponent(clean)}`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Nominatim HTTP ${response.status}`);
    const results = await response.json();
    if (!results.length) throw new Error(`No encontré: ${query}`);
    return { lon: Number(results[0].lon), lat: Number(results[0].lat), label: results[0].display_name };
  }

  async function calculateRoute() {
    const startQuery = $("#routeStart")?.value.trim();
    const endQuery = $("#routeEnd")?.value.trim();
    if (!startQuery || !endQuery) { setText("#routeStatus", "Escribe un origen y un destino para calcular la ruta."); return; }
    const button = $("#routeBtn");
    if (button) { button.disabled = true; button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Consultando…`; }
    setText("#routeStatus", "Buscando origen y destino en Nominatim…");
    try {
      const [start, end] = await Promise.all([geocode(startQuery), geocode(endQuery)]);
      setText("#routeStatus", "Calculando recorrido vial real con OSRM…");
      const routeUrl = `${OSRM_ENDPOINT}/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson&steps=false`;
      const response = await fetch(routeUrl, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`OSRM HTTP ${response.status}`);
      const json = await response.json();
      if (json.code !== "Ok" || !json.routes?.length) throw new Error("OSRM no encontró una ruta vial.");
      const route = json.routes[0];
      state.routeStart = start;
      state.routeEnd = end;
      updateRouteSource({ type: "FeatureCollection", features: [{ type: "Feature", properties: { distance: route.distance, duration: route.duration }, geometry: route.geometry }] });
      setText("#metricRoute", `${(route.distance / 1000).toFixed(1)} km`);
      setText("#routeStatus", `${start.label.split(",")[0]} → ${end.label.split(",")[0]} · ${(route.duration / 60).toFixed(0)} min estimados sobre la red vial.`);
      state.map.fitBounds([[start.lon,start.lat],[end.lon,end.lat]], { padding:80, duration:700, maxZoom:15 });
      showToast("Ruta real calculada sobre la red vial de OSRM.");
    } catch (error) {
      console.warn("No se pudo calcular la ruta", error);
      setText("#routeStatus", `No fue posible calcularla: ${error.message}. Puedes seguir explorando el mapa real o activar el respaldo procedural.`);
      showToast("La ruta pública no respondió. El mapa real continúa disponible.", "error");
    } finally {
      if (button) { button.disabled = false; button.innerHTML = `<i class="fa-solid fa-route"></i> Calcular ruta`; }
    }
  }

  function setAllApiLayers(enabled) {
    Object.keys(API_LAYERS).forEach((key) => { state.apiLayers[key] = enabled; });
    state.activeQueryKey = "";
    renderApiLayerToggles();
    if (state.mapReady) loadScaleData();
  }

  function bindEvents() {
    $("#apiSelectAll")?.addEventListener("click", () => setAllApiLayers(true));
    $("#apiClearAll")?.addEventListener("click", () => setAllApiLayers(false));
    $("#uplSelect")?.addEventListener("change", (event) => {
      const upl = UPLS.find((item) => String(item.num) === event.target.value);
      if (!upl) return;
      updateUplPanel(upl);
      state.currentView = "barrio";
      $$(".view-card").forEach((button) => button.classList.toggle("is-active", button.dataset.view === "barrio"));
      /* Evita que el select conserve el foco y capture el siguiente gesto de scroll. */
      event.target.blur();
      focusSelectedUpl(true);
      loadScaleData();
    });
    $$(".scale-btn").forEach((button) => button.addEventListener("click", () => setScale(button.dataset.scale)));
    $$(".view-card").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
    $("#locateBtn")?.addEventListener("click", () => { state.currentView = "barrio"; updateUplPanel(state.selectedUpl); focusSelectedUpl(true); });
    $("#fullScreenBtn")?.addEventListener("click", () => { const element = $(".map-panel"); if (!document.fullscreenElement) element?.requestFullscreen?.(); else document.exitFullscreen?.(); });
    $("#routeBtn")?.addEventListener("click", calculateRoute);
    $("#clearRouteBtn")?.addEventListener("click", clearRoute);
    $("#routeStart")?.addEventListener("keydown", (event) => { if (event.key === "Enter") calculateRoute(); });
    $("#routeEnd")?.addEventListener("keydown", (event) => { if (event.key === "Enter") calculateRoute(); });
    $("#favoriteBtn")?.addEventListener("click", () => {
      state.favorite = !state.favorite;
      localStorage.setItem(`bogota-viva-fav-${state.selectedUpl.num}`, state.favorite ? "1" : "0");
      refreshFavorite();
      showToast(state.favorite ? "UPL guardada en favoritas." : "UPL retirada de favoritas.");
    });
    $("#localTilesBtn")?.addEventListener("click", toggleLocalPmtiles);
    $("#modeToggle")?.addEventListener("click", () => {
      state.dataMode = state.dataMode === "real" ? "procedural" : "real";
      const real = state.dataMode === "real";
      const toggle = $("#modeToggle");
      toggle.classList.toggle("is-on", real);
      toggle.setAttribute("aria-checked", String(real));
      const dot = $("#modeDot");
      if (dot) dot.style.background = real ? "var(--teal)" : "#f1bd61";
      setText("#modeTitle", real ? "Calles reales" : "Simulación procedural");
      setText("#modeDetail", real ? "OpenStreetMap · consulta bajo demanda" : "respaldo local · sin consultas externas");
      loadScaleData();
    });
  }

const scaleNetworks = {
  natural: {
    title: 'Red Natural',
    accent: '#46d6d0',
    nodes: [
      { id: 'humedales', label: 'HUMEDALES', lat: 4.630, lng: -74.150, hub: true },
      { id: 'rios', label: 'RÍOS', lat: 4.665, lng: -74.165 },
      { id: 'quebradas', label: 'QUEBRADAS', lat: 4.612, lng: -74.182 },
      { id: 'areas_protegidas', label: 'ÁREAS PROTEGIDAS', lat: 4.662, lng: -74.120 },
      { id: 'reservas_forestales', label: 'RESERVAS FORESTALES', lat: 4.690, lng: -74.150 },
      { id: 'cobertura_vegetal', label: 'COBERTURA VEGETAL', lat: 4.650, lng: -74.205 },
      { id: 'parques', label: 'PARQUES', lat: 4.620, lng: -74.105 },
      { id: 'rondas_hidricas', label: 'RONDAS HÍDRICAS', lat: 4.595, lng: -74.195 },
      { id: 'bosques_urbanos', label: 'BOSQUES URBANOS', lat: 4.585, lng: -74.115 },
      { id: 'paramos', label: 'COMPLEJO DE PÁRAMOS', lat: 4.715, lng: -74.185 }
    ],
    edges: [
      ['humedales', 'rios', 'directa'],
      ['humedales', 'areas_protegidas', 'directa'],
      ['humedales', 'quebradas', 'indirecta'],
      ['humedales', 'reservas_forestales', 'directa'],
      ['rios', 'rondas_hidricas', 'directa'],
      ['quebradas', 'rondas_hidricas', 'indirecta'],
      ['areas_protegidas', 'cobertura_vegetal', 'directa'],
      ['reservas_forestales', 'paramos', 'indirecta'],
      ['areas_protegidas', 'parques', 'indirecta'],
      ['cobertura_vegetal', 'bosques_urbanos', 'directa'],
      ['parques', 'bosques_urbanos', 'indirecta']
    ]
  },
  cultural: {
    title: 'Red Cultural',
    accent: '#e89a6c',
    nodes: [
      { id: 'patrimonio_material', label: 'PATRIMONIO MATERIAL', lat: 4.615, lng: -74.075, hub: true },
      { id: 'patrimonio_inmaterial', label: 'PATRIMONIO INMATERIAL', lat: 4.635, lng: -74.045, hub: true },
      { id: 'museos', label: 'MUSEOS', lat: 4.640, lng: -74.085 },
      { id: 'bibliotecas', label: 'BIBLIOTECAS', lat: 4.595, lng: -74.105 },
      { id: 'plazas_mercado', label: 'PLAZAS DE MERCADO', lat: 4.605, lng: -74.120 },
      { id: 'barrios', label: 'BARRIOS', lat: 4.650, lng: -74.115 },
      { id: 'centros_historicos', label: 'CENTROS HISTÓRICOS', lat: 4.625, lng: -74.100 },
      { id: 'zonas_turisticas', label: 'ZONAS DE INTERÉS TURÍSTICO', lat: 4.675, lng: -74.070 },
      { id: 'equipamientos_culturales', label: 'EQUIPAMIENTOS CULTURALES', lat: 4.570, lng: -74.080 },
      { id: 'artesanias', label: 'PRODUCCIÓN ARTESANAL', lat: 4.585, lng: -74.055 }
    ],
    edges: [
      ['patrimonio_material', 'museos', 'directa'],
      ['patrimonio_material', 'centros_historicos', 'directa'],
      ['patrimonio_material', 'patrimonio_inmaterial', 'indirecta'],
      ['patrimonio_inmaterial', 'zonas_turisticas', 'directa'],
      ['patrimonio_inmaterial', 'artesanias', 'directa'],
      ['museos', 'bibliotecas', 'indirecta'],
      ['centros_historicos', 'barrios', 'directa'],
      ['barrios', 'plazas_mercado', 'indirecta'],
      ['bibliotecas', 'equipamientos_culturales', 'directa'],
      ['plazas_mercado', 'artesanias', 'indirecta']
    ]
  },
  tecnologico: {
    title: 'Red Tecnológica',
    accent: '#e89a6c',
    nodes: [
      { id: 'red_vial', label: 'RED VIAL', lat: 4.635, lng: -74.100, hub: true },
      { id: 'transporte_publico', label: 'TRANSPORTE PÚBLICO', lat: 4.605, lng: -74.070, hub: true },
      { id: 'red_ferrrea', label: 'RED FÉRREA', lat: 4.665, lng: -74.095 },
      { id: 'ciclorutas', label: 'CICLORRUTAS', lat: 4.655, lng: -74.135 },
      { id: 'nodos_digitales', label: 'NODOS DIGITALES', lat: 4.680, lng: -74.145 },
      { id: 'internet_publico', label: 'INTERNET PÚBLICO', lat: 4.585, lng: -74.135 },
      { id: 'datos_abiertos', label: 'DATOS ABIERTOS', lat: 4.575, lng: -74.080 },
      { id: 'centro_tecnologico', label: 'CENTRO TECNOLÓGICO', lat: 4.625, lng: -74.045 },
      { id: 'recarga_electrica', label: 'RECARGA ELÉCTRICA', lat: 4.685, lng: -74.055 },
      { id: 'semaforizacion', label: 'SEMAFORIZACIÓN', lat: 4.550, lng: -74.105 }
    ],
    edges: [
      ['red_vial', 'transporte_publico', 'directa'],
      ['red_vial', 'red_ferrrea', 'directa'],
      ['red_vial', 'ciclorutas', 'indirecta'],
      ['transporte_publico', 'nodos_digitales', 'directa'],
      ['transporte_publico', 'internet_publico', 'indirecta'],
      ['red_ferrrea', 'recarga_electrica', 'directa'],
      ['nodos_digitales', 'centro_tecnologico', 'directa'],
      ['internet_publico', 'datos_abiertos', 'indirecta'],
      ['datos_abiertos', 'centro_tecnologico', 'directa'],
      ['ciclorutas', 'semaforizacion', 'indirecta'],
      ['red_vial', 'semaforizacion', 'directa']
    ]
  },
  metaverso: {
    title: 'Red Metaverso',
    accent: '#46d6d0',
    nodes: [
      { id: 'gemelo_digital', label: 'GEMELO DIGITAL', lat: 4.630, lng: -74.100, hub: true },
      { id: 'modelos_3d', label: 'MODELOS 3D', lat: 4.665, lng: -74.130, hub: true },
      { id: 'capas_gis', label: 'CAPAS GIS', lat: 4.680, lng: -74.085 },
      { id: 'plataformas_bim', label: 'PLATAFORMAS BIM', lat: 4.650, lng: -74.055 },
      { id: 'nodos_iot', label: 'NODOS IoT', lat: 4.605, lng: -74.045 },
      { id: 'visualizacion_vr', label: 'VISUALIZACIÓN VR', lat: 4.575, lng: -74.065 },
      { id: 'laboratorios_urbanos', label: 'LABORATORIOS URBANOS', lat: 4.565, lng: -74.115 },
      { id: 'datos_territoriales', label: 'DATOS TERRITORIALES', lat: 4.600, lng: -74.150 },
      { id: 'escenarios_simulados', label: 'ESCENARIOS SIMULADOS', lat: 4.700, lng: -74.115 },
      { id: 'sensores_urbanos', label: 'SENSORES URBANOS', lat: 4.640, lng: -74.180 }
    ],
    edges: [
      ['gemelo_digital', 'modelos_3d', 'directa'],
      ['gemelo_digital', 'capas_gis', 'directa'],
      ['gemelo_digital', 'datos_territoriales', 'directa'],
      ['modelos_3d', 'plataformas_bim', 'directa'],
      ['modelos_3d', 'escenarios_simulados', 'indirecta'],
      ['capas_gis', 'sensores_urbanos', 'indirecta'],
      ['plataformas_bim', 'nodos_iot', 'directa'],
      ['nodos_iot', 'sensores_urbanos', 'directa'],
      ['datos_territoriales', 'laboratorios_urbanos', 'indirecta'],
      ['laboratorios_urbanos', 'visualizacion_vr', 'directa'],
      ['escenarios_simulados', 'visualizacion_vr', 'indirecta']
    ]
  }
};
/* ========================================================================
   POP-UP DE RED · la red vive aquí, no sobre el mapa principal
   ======================================================================== */
const scaleNetworkDescriptions = {
  natural: 'Sistemas hídricos, estructura ecológica y cobertura vegetal conectados.',
  cultural: 'Patrimonio, memoria urbana, barrios y prácticas culturales relacionadas.',
  tecnologico: 'Movilidad, datos, infraestructura y conectividad territorial.',
  metaverso: 'Capas digitales, modelos urbanos y escenarios de exploración virtual.'
};

let scalePopupSelectedNode = null;
const scaleNetworkViewState = { scale: 1, x: 0, y: 0 };

function updateScaleNetworkViewport() {
  const viewport = document.getElementById('scaleNetworkViewport');
  if (!viewport) return;
  viewport.style.transform = `translate(${scaleNetworkViewState.x}px, ${scaleNetworkViewState.y}px) scale(${scaleNetworkViewState.scale})`;
  const zoomValue = document.getElementById('scaleNetworkZoomReset');
  if (zoomValue) zoomValue.textContent = `${Math.round(scaleNetworkViewState.scale * 100)}%`;
}

function setScaleNetworkZoom(nextScale, resetPosition = false) {
  scaleNetworkViewState.scale = Math.max(.72, Math.min(2.4, nextScale));
  if (resetPosition) {
    scaleNetworkViewState.x = 0;
    scaleNetworkViewState.y = 0;
  }
  updateScaleNetworkViewport();
}

function resetScaleNetworkView() {
  scaleNetworkViewState.scale = 1;
  scaleNetworkViewState.x = 0;
  scaleNetworkViewState.y = 0;
  updateScaleNetworkViewport();
}

function setupScaleNetworkViewport() {
  const canvas = document.getElementById('scaleNetworkCanvas');
  const viewport = document.getElementById('scaleNetworkViewport');
  if (!canvas || !viewport || canvas.dataset.interactive === 'true') return;
  canvas.dataset.interactive = 'true';
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  canvas.addEventListener('wheel', event => {
    event.preventDefault();
    setScaleNetworkZoom(scaleNetworkViewState.scale + (event.deltaY < 0 ? .12 : -.12));
  }, { passive: false });

  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0 && event.pointerType !== 'touch') return;
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    originX = scaleNetworkViewState.x;
    originY = scaleNetworkViewState.y;
    canvas.classList.add('is-dragging');
    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener('pointermove', event => {
    if (!dragging) return;
    scaleNetworkViewState.x = originX + event.clientX - startX;
    scaleNetworkViewState.y = originY + event.clientY - startY;
    updateScaleNetworkViewport();
  });

  const stopDragging = event => {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove('is-dragging');
    canvas.releasePointerCapture?.(event.pointerId);
  };
  canvas.addEventListener('pointerup', stopDragging);
  canvas.addEventListener('pointercancel', stopDragging);
  canvas.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') stopDragging(event);
  });
}

function splitPopupLabel(label) {
  const words = label.split(' ');
  const lines = [];
  let line = '';
  words.forEach(word => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > 15 && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function popupNetworkPositions(definition) {
  const lats = definition.nodes.map(node => node.lat);
  const lngs = definition.nodes.map(node => node.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = Math.max(maxLat - minLat, 0.001);
  const lngRange = Math.max(maxLng - minLng, 0.001);
  return Object.fromEntries(definition.nodes.map(node => [node.id, {
    ...node,
    x: 72 + ((node.lng - minLng) / lngRange) * 856,
    y: 62 + ((maxLat - node.lat) / latRange) * 420
  }]));
}

function renderScaleNetworkPopup(mode) {
  const canvas = document.getElementById('scaleNetworkCanvas');
  const definition = scaleNetworks[mode];
  if (!canvas || !definition) return;
  const nodes = popupNetworkPositions(definition);
  const edgeMarkup = definition.edges.map(([fromId, toId, type]) => {
    const from = nodes[fromId];
    const to = nodes[toId];
    if (!from || !to) return '';
    const color = type === 'indirecta' ? '#e89a6c' : '#46d6d0';
    const className = type === 'indirecta' ? 'popup-edge indirect' : 'popup-edge direct';
    return `<line class="${className}" x1="${from.x.toFixed(1)}" y1="${from.y.toFixed(1)}" x2="${to.x.toFixed(1)}" y2="${to.y.toFixed(1)}" stroke="${color}" marker-end="url(#arrow-${type})" />`;
  }).join('');

  const nodeMarkup = definition.nodes.map(node => {
    const p = nodes[node.id];
    const radius = node.hub ? 42 : 29;
    const lines = splitPopupLabel(node.label);
    const firstY = p.y - ((lines.length - 1) * 7);
    const labelMarkup = lines.map((line, index) => `<tspan x="${p.x.toFixed(1)}" dy="${index === 0 ? 0 : 14}">${line}</tspan>`).join('');
    return `<g class="popup-node ${node.hub ? 'hub' : ''}" data-node-id="${node.id}" tabindex="0" role="button" aria-label="${node.label}">
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${radius}" />
      <text x="${p.x.toFixed(1)}" y="${firstY.toFixed(1)}">${labelMarkup}</text>
    </g>`;
  }).join('');

  canvas.innerHTML = `<div id="scaleNetworkViewport" class="popup-network-viewport"><svg class="popup-network-svg" viewBox="0 0 1000 544" role="img" aria-label="${definition.title}">
    <defs>
      <filter id="popupGlowTeal" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="popupGlowCopper" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#46d6d0" /></marker>
      <marker id="arrow-indirecta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#e89a6c" /></marker>
    </defs>
    <g class="popup-edges">${edgeMarkup}</g>
    <g class="popup-nodes">${nodeMarkup}</g>
  </svg></div>`;

  resetScaleNetworkView();
  setupScaleNetworkViewport();
  canvas.querySelectorAll('.popup-node').forEach(nodeElement => {
    const selectNode = () => {
      canvas.querySelectorAll('.popup-node').forEach(item => item.classList.remove('selected'));
      nodeElement.classList.add('selected');
      const node = nodes[nodeElement.dataset.nodeId];
      scalePopupSelectedNode = node;
      const description = document.getElementById('scaleNetworkDescription');
      if (description && node) description.textContent = `${node.label} · ${definition.title}`;
    };
    nodeElement.addEventListener('click', selectNode);
    nodeElement.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectNode();
      }
    });
  });
}

function openScaleNetworkModal(mode) {
  const modal = document.getElementById('scaleNetworkModal');
  const definition = scaleNetworks[mode];
  if (!modal || !definition) return;
  scalePopupSelectedNode = null;
  document.getElementById('scaleNetworkTitle').textContent = definition.title;
  document.getElementById('scaleNetworkDescription').textContent = scaleNetworkDescriptions[mode];
  renderScaleNetworkPopup(mode);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('scale-modal-open');
  document.getElementById('scaleNetworkClose')?.focus();
}

function closeScaleNetworkModal() {
  const modal = document.getElementById('scaleNetworkModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('scale-modal-open');
}

document.getElementById('scaleNetworkClose')?.addEventListener('click', closeScaleNetworkModal);
document.getElementById('scaleNetworkModal')?.addEventListener('click', event => {
  if (event.target.id === 'scaleNetworkModal') closeScaleNetworkModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeScaleNetworkModal();
});

// Controles de zoom del diagrama, compartidos por las cuatro redes.
document.getElementById('scaleNetworkZoomIn')?.addEventListener('click', event => {
  event.stopPropagation();
  setScaleNetworkZoom(scaleNetworkViewState.scale + .18);
});
document.getElementById('scaleNetworkZoomOut')?.addEventListener('click', event => {
  event.stopPropagation();
  setScaleNetworkZoom(scaleNetworkViewState.scale - .18);
});
document.getElementById('scaleNetworkZoomReset')?.addEventListener('click', event => {
  event.stopPropagation();
  resetScaleNetworkView();
});
  function boot() {
    const defaultUpl = UPLS.find((upl) => upl.num === 13) || UPLS[0];
    state.selectedUpl = defaultUpl;
    renderUplSelect();
    renderScaleCards();
    renderApiLayerToggles();
    updateUplPanel(defaultUpl);
    bindEvents();
    if (window.maplibregl) initializeMap();
    else {
      window.addEventListener("maplibre-ready", initializeMap, { once: true });
      window.setTimeout(() => {
        if (!state.mapReady && !window.maplibregl) useProceduralFallback("MapLibre no respondió a tiempo; se activó la lectura procedural.");
      }, 9000);
    }
    window.BogotaVivaNavigator = { state, UPLS, SCALE_DATA, setScale, focusSelectedUpl, loadScaleData, calculateRoute, useProceduralFallback, toggleLocalPmtiles };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
