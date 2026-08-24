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
      { id: 'humedales', label: 'HUMEDALES', lat: 4.630, lng: -74.150, hub: true, icon: 'fa-droplet' },
      { id: 'rios', label: 'RÍOS', lat: 4.665, lng: -74.165, icon: 'fa-water' },
      { id: 'quebradas', label: 'QUEBRADAS', lat: 4.612, lng: -74.182, icon: 'fa-water' },
      { id: 'areas_protegidas', label: 'ÁREAS PROTEGIDAS', lat: 4.662, lng: -74.120, icon: 'fa-shield-halved' },
      { id: 'reservas_forestales', label: 'RESERVAS FORESTALES', lat: 4.690, lng: -74.150, hub: true, icon: 'fa-tree' },
      { id: 'cobertura_vegetal', label: 'COBERTURA VEGETAL', lat: 4.650, lng: -74.205, icon: 'fa-leaf' },
      { id: 'parques', label: 'PARQUES', lat: 4.620, lng: -74.105, icon: 'fa-tree' },
      { id: 'rondas_hidricas', label: 'RONDAS HÍDRICAS', lat: 4.595, lng: -74.195, icon: 'fa-water' },
      { id: 'bosques_urbanos', label: 'BOSQUES URBANOS', lat: 4.585, lng: -74.115, hub: true, icon: 'fa-tree' },
      { id: 'paramos', label: 'COMPLEJO DE PÁRAMOS', lat: 4.715, lng: -74.185, icon: 'fa-mountain' },
      { id: 'cerros_orientales', label: 'CERROS ORIENTALES', lat: 4.735, lng: -74.055, hub: true, icon: 'fa-mountain' },
      { id: 'paramos_andinos', label: 'PÁRAMOS ANDINOS', lat: 4.710, lng: -74.075, icon: 'fa-mountain' },
      { id: 'bosques_andinos', label: 'BOSQUES ANDINOS', lat: 4.690, lng: -74.090, icon: 'fa-tree' },
      { id: 'nacimientos_agua', label: 'NACIMIENTOS DE AGUA', lat: 4.680, lng: -74.120, icon: 'fa-droplet' },
      { id: 'quebradas_urbanas', label: 'QUEBRADAS URBANAS', lat: 4.610, lng: -74.210, icon: 'fa-water' },
      { id: 'rios_urbanos', label: 'RÍOS URBANOS', lat: 4.650, lng: -74.080, icon: 'fa-water' },
      { id: 'humedales_urbanos', label: 'HUMEDALES URBANOS', lat: 4.600, lng: -74.150, icon: 'fa-droplet' },
      { id: 'rondas_rio', label: 'RONDAS DE RÍO', lat: 4.625, lng: -74.080, icon: 'fa-water' },
      { id: 'recarga_hidrica', label: 'RECARGA HÍDRICA', lat: 4.670, lng: -74.065, icon: 'fa-droplet' },
      { id: 'infiltracion_agua', label: 'INFILTRACIÓN DE AGUA', lat: 4.640, lng: -74.090, icon: 'fa-droplet' },
      { id: 'corredores_ecologicos', label: 'CORREDORES ECOLÓGICOS', lat: 4.630, lng: -74.050, icon: 'fa-leaf' },
      { id: 'coberturas_vegetales', label: 'COBERTURAS VEGETALES', lat: 4.605, lng: -74.095, icon: 'fa-leaf' },
      { id: 'jardines_lluvia', label: 'JARDINES DE LLUVIA', lat: 4.585, lng: -74.150, icon: 'fa-leaf' },
      { id: 'arbolado_urbano', label: 'ARBOLADO URBANO', lat: 4.620, lng: -74.030, icon: 'fa-tree' },
      { id: 'parques_ecologicos', label: 'PARQUES ECOLÓGICOS', lat: 4.645, lng: -74.045, icon: 'fa-tree' },
      { id: 'fauna_urbana', label: 'FAUNA URBANA', lat: 4.675, lng: -74.035, icon: 'fa-eye' },
      { id: 'suelo_permeable', label: 'SUELO PERMEABLE', lat: 4.570, lng: -74.135, icon: 'fa-leaf' },
      { id: 'restauracion_ecologica', label: 'RESTAURACIÓN ECOLÓGICA', lat: 4.715, lng: -74.040, icon: 'fa-shield-halved' },
      { id: 'resiliencia_climatica', label: 'RESILIENCIA CLIMÁTICA', lat: 4.575, lng: -74.085, icon: 'fa-temperature-half' },
      { id: 'areas_conservacion', label: 'ÁREAS DE CONSERVACIÓN', lat: 4.700, lng: -74.030, icon: 'fa-shield-halved' }
    ],
    edges: [
      ['humedales', 'rios', 'directa'],
      ['humedales', 'areas_protegidas', 'directa'],
      ['humedales', 'quebradas', 'indirecta'],
      ['humedales', 'reservas_forestales', 'directa'],
      ['humedales', 'humedales_urbanos', 'directa'],
      ['humedales', 'resiliencia_climatica', 'indirecta'],
      ['rios', 'rondas_hidricas', 'directa'],
      ['rios', 'rios_urbanos', 'directa'],
      ['rios', 'nacimientos_agua', 'indirecta'],
      ['quebradas', 'rondas_hidricas', 'indirecta'],
      ['quebradas', 'quebradas_urbanas', 'directa'],
      ['areas_protegidas', 'cobertura_vegetal', 'directa'],
      ['areas_protegidas', 'cerros_orientales', 'directa'],
      ['areas_protegidas', 'parques', 'indirecta'],
      ['reservas_forestales', 'paramos', 'indirecta'],
      ['reservas_forestales', 'bosques_andinos', 'directa'],
      ['reservas_forestales', 'areas_conservacion', 'directa'],
      ['cerros_orientales', 'paramos_andinos', 'directa'],
      ['cerros_orientales', 'bosques_andinos', 'directa'],
      ['paramos_andinos', 'nacimientos_agua', 'directa'],
      ['paramos_andinos', 'recarga_hidrica', 'indirecta'],
      ['bosques_andinos', 'cobertura_vegetal', 'directa'],
      ['bosques_andinos', 'fauna_urbana', 'indirecta'],
      ['cobertura_vegetal', 'bosques_urbanos', 'directa'],
      ['cobertura_vegetal', 'coberturas_vegetales', 'directa'],
      ['coberturas_vegetales', 'arbolado_urbano', 'directa'],
      ['parques', 'parques_ecologicos', 'indirecta'],
      ['parques', 'jardines_lluvia', 'directa'],
      ['parques_ecologicos', 'corredores_ecologicos', 'directa'],
      ['corredores_ecologicos', 'fauna_urbana', 'indirecta'],
      ['rondas_hidricas', 'suelo_permeable', 'directa'],
      ['rios_urbanos', 'rondas_rio', 'directa'],
      ['rondas_rio', 'infiltracion_agua', 'directa'],
      ['humedales_urbanos', 'jardines_lluvia', 'indirecta'],
      ['humedales_urbanos', 'fauna_urbana', 'directa'],
      ['recarga_hidrica', 'infiltracion_agua', 'directa'],
      ['infiltracion_agua', 'suelo_permeable', 'directa'],
      ['suelo_permeable', 'resiliencia_climatica', 'directa'],
      ['resiliencia_climatica', 'restauracion_ecologica', 'directa'],
      ['restauracion_ecologica', 'areas_conservacion', 'indirecta'],
      ['arbolado_urbano', 'jardines_lluvia', 'indirecta'],
      ['areas_conservacion', 'corredores_ecologicos', 'directa']
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
      { id: 'artesanias', label: 'PRODUCCIÓN ARTESANAL', lat: 4.585, lng: -74.055 },
      { id: 'rutas_patrimoniales', label: 'RUTAS PATRIMONIALES', lat: 4.555, lng: -74.105 },
      { id: 'mercados_barriales', label: 'MERCADOS BARRIALES', lat: 4.565, lng: -74.135 },
      { id: 'centros_comunitarios', label: 'CENTROS COMUNITARIOS', lat: 4.545, lng: -74.075 },
      { id: 'escuelas_musica', label: 'ESCUELAS DE MÚSICA', lat: 4.555, lng: -74.045 }
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
      ['plazas_mercado', 'artesanias', 'indirecta'],
      ['artesanias', 'rutas_patrimoniales', 'directa'],
      ['rutas_patrimoniales', 'mercados_barriales', 'indirecta'],
      ['mercados_barriales', 'centros_comunitarios', 'directa'],
      ['centros_comunitarios', 'escuelas_musica', 'indirecta'],
      ['escuelas_musica', 'patrimonio_inmaterial', 'directa']
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
      { id: 'semaforizacion', label: 'SEMAFORIZACIÓN', lat: 4.550, lng: -74.105 },
      { id: 'electrolineras', label: 'ELECTROLINERAS', lat: 4.555, lng: -74.160 },
      { id: 'fibra_optica', label: 'FIBRA ÓPTICA', lat: 4.565, lng: -74.120 },
      { id: 'centros_datos', label: 'CENTROS DE DATOS', lat: 4.545, lng: -74.065 },
      { id: 'subestaciones', label: 'SUBESTACIONES', lat: 4.555, lng: -74.045 }
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
      ['red_vial', 'semaforizacion', 'directa'],
      ['semaforizacion', 'electrolineras', 'directa'],
      ['electrolineras', 'fibra_optica', 'indirecta'],
      ['fibra_optica', 'centros_datos', 'directa'],
      ['centros_datos', 'subestaciones', 'indirecta'],
      ['subestaciones', 'red_vial', 'directa']
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
      { id: 'sensores_urbanos', label: 'SENSORES URBANOS', lat: 4.640, lng: -74.180 },
      { id: 'escaneo_urbano', label: 'ESCANEO URBANO', lat: 4.555, lng: -74.165 },
      { id: 'nube_puntos', label: 'NUBE DE PUNTOS', lat: 4.565, lng: -74.120 },
      { id: 'simulador_movilidad', label: 'SIMULADOR DE MOVILIDAD', lat: 4.545, lng: -74.075 },
      { id: 'laboratorio_inmersivo', label: 'LABORATORIO INMERSIVO', lat: 4.555, lng: -74.045 }
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
      ['escenarios_simulados', 'visualizacion_vr', 'indirecta'],
      ['visualizacion_vr', 'escaneo_urbano', 'directa'],
      ['escaneo_urbano', 'nube_puntos', 'indirecta'],
      ['nube_puntos', 'simulador_movilidad', 'directa'],
      ['simulador_movilidad', 'laboratorio_inmersivo', 'indirecta'],
      ['laboratorio_inmersivo', 'gemelo_digital', 'directa']
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
let scalePopupMode = 'natural';
let nodeDetailState = { mode: 'natural', id: null };
const scalePopupHiddenNodes = new Set();
const scaleNetworkViewState = { scale: 1.12, x: 0, y: 0 };
let scaleNetworkReturnRafId = null;
const scaleNetworkFlowState = {
  running: true,
  rafId: null,
  ambientRafId: null,
  lastTime: 0,
  ambientStartedAt: 0,
  particles: [],
};
const popupNodeRadiusState = new Map();

function cancelScaleNetworkFlowLoop() {
  if (scaleNetworkFlowState.rafId !== null) {
    window.cancelAnimationFrame(scaleNetworkFlowState.rafId);
    scaleNetworkFlowState.rafId = null;
  }
  scaleNetworkFlowState.lastTime = 0;
}

function cancelScaleNetworkAmbientLoop() {
  if (scaleNetworkFlowState.ambientRafId !== null) {
    window.cancelAnimationFrame(scaleNetworkFlowState.ambientRafId);
    scaleNetworkFlowState.ambientRafId = null;
  }
  scaleNetworkFlowState.ambientStartedAt = 0;
  const scene = document.querySelector('#scaleNetworkCanvas .popup-network-scene');
  scene?.removeAttribute('transform');
}

function animateScaleNetworkAmbient(timestamp) {
  const scene = document.querySelector('#scaleNetworkCanvas .popup-network-scene');
  if (!scene) {
    scaleNetworkFlowState.ambientRafId = null;
    return;
  }
  if (!scaleNetworkFlowState.ambientStartedAt) scaleNetworkFlowState.ambientStartedAt = timestamp;
  const elapsed = timestamp - scaleNetworkFlowState.ambientStartedAt;
  const driftX = Math.sin(elapsed * .00034) * 2.8;
  const driftY = Math.cos(elapsed * .00027) * 1.8;
  const breath = 1 + Math.sin(elapsed * .00022) * .0025;
  scene.setAttribute('transform', `translate(500 272) scale(${breath.toFixed(5)}) translate(${(driftX - 500).toFixed(2)} ${(driftY - 272).toFixed(2)})`);
  scaleNetworkFlowState.ambientRafId = window.requestAnimationFrame(animateScaleNetworkAmbient);
}

function startScaleNetworkAmbientLoop() {
  if (scaleNetworkFlowState.ambientRafId !== null) return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  scaleNetworkFlowState.ambientRafId = window.requestAnimationFrame(animateScaleNetworkAmbient);
}

function updateScaleNetworkFlowStatus(edgeCount = document.querySelectorAll('#scaleNetworkCanvas .popup-edge').length) {
  const toggle = document.getElementById('scaleNetworkFlowToggle');
  const status = document.getElementById('scaleNetworkFlowStatus');
  const label = scaleNetworkFlowState.running ? 'Flujo hídrico activo' : 'Flujo hídrico pausado';
  if (toggle) {
    toggle.textContent = scaleNetworkFlowState.running ? 'Pausar flujo' : 'Reanudar flujo';
    toggle.setAttribute('aria-pressed', String(scaleNetworkFlowState.running));
  }
  if (status) {
    status.textContent = `${label} · ${edgeCount} conexiones`;
    status.classList.toggle('is-paused', !scaleNetworkFlowState.running);
  }
}

function animateScaleNetworkFlow(timestamp) {
  if (!scaleNetworkFlowState.running || !scaleNetworkFlowState.particles.length) {
    scaleNetworkFlowState.rafId = null;
    return;
  }
  const previous = scaleNetworkFlowState.lastTime || timestamp;
  const delta = Math.min(64, Math.max(0, timestamp - previous));
  scaleNetworkFlowState.lastTime = timestamp;
  scaleNetworkFlowState.particles.forEach(particle => {
    particle.progress = (particle.progress + delta * particle.speed) % 1;
    const x = particle.x1 + (particle.x2 - particle.x1) * particle.progress;
    const y = particle.y1 + (particle.y2 - particle.y1) * particle.progress;
    particle.element.setAttribute('cx', x.toFixed(2));
    particle.element.setAttribute('cy', y.toFixed(2));
  });
  scaleNetworkFlowState.rafId = window.requestAnimationFrame(animateScaleNetworkFlow);
}

function setScaleNetworkFlowRunning(running) {
  scaleNetworkFlowState.running = Boolean(running);
  cancelScaleNetworkFlowLoop();
  updateScaleNetworkFlowStatus();
  if (scaleNetworkFlowState.running && scaleNetworkFlowState.particles.length) {
    scaleNetworkFlowState.rafId = window.requestAnimationFrame(animateScaleNetworkFlow);
  }
}

function popupEdgeEndpoints(edge) {
  const attributes = ['x1', 'y1', 'x2', 'y2'].map(name => {
    const value = edge.getAttribute(name);
    return value === null ? NaN : Number(value);
  });
  if (attributes.every(Number.isFinite)) {
    const [x1, y1, x2, y2] = attributes;
    return { x1, y1, x2, y2 };
  }
  // Las conexiones del grafo orgánico son rutas rectas `M x y L x y`.
  // El flujo debe leer esa geometría; Number(null) devolvía 0 y ocultaba
  // todas las partículas en la esquina superior izquierda del SVG.
  const values = (edge.getAttribute('d') || '').match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
  if (values.length < 4 || !values.slice(0, 4).every(Number.isFinite)) return null;
  return {
    x1: values[0],
    y1: values[1],
    x2: values[values.length - 2],
    y2: values[values.length - 1]
  };
}

function buildScaleNetworkFlow(resetProgress = false) {
  cancelScaleNetworkFlowLoop();
  scaleNetworkFlowState.particles = [];
  const svg = document.querySelector('#scaleNetworkCanvas .popup-network-svg');
  const layer = svg?.querySelector('.popup-flow-layer');
  if (!svg || !layer) {
    updateScaleNetworkFlowStatus(0);
    return;
  }
  layer.replaceChildren();
  // La red se mantiene geométricamente estable mientras se arrastra: la escala
  // se controla solo desde la rueda y los botones explícitos del pop-up.
  cancelScaleNetworkAmbientLoop();
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const edges = [...svg.querySelectorAll('.popup-edge')];
  edges.forEach((edge, edgeIndex) => {
    const endpoints = popupEdgeEndpoints(edge);
    if (!endpoints) return;
    const { x1, y1, x2, y2 } = endpoints;
    const isIndirect = edge.classList.contains('indirect');
    const count = isIndirect ? 1 : 2;
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElementNS(svgNamespace, 'circle');
      particle.setAttribute('class', `water-particle${isIndirect ? ' indirect' : ''}${index === 0 ? ' core' : ''}`);
      particle.setAttribute('r', index === 0 ? '3.1' : '2.1');
      particle.setAttribute('aria-hidden', 'true');
      layer.appendChild(particle);
      const initialProgress = (index / count + edgeIndex * .037 + (resetProgress ? 0 : .08)) % 1;
      const initialX = x1 + (x2 - x1) * initialProgress;
      const initialY = y1 + (y2 - y1) * initialProgress;
      particle.setAttribute('cx', initialX.toFixed(2));
      particle.setAttribute('cy', initialY.toFixed(2));
      scaleNetworkFlowState.particles.push({
        element: particle,
        x1,
        y1,
        x2,
        y2,
        progress: initialProgress,
        speed: isIndirect ? .00016 : .00023 + (edgeIndex % 4) * .000012
      });
    }
  });
  updateScaleNetworkFlowStatus(edges.length);
  if (scaleNetworkFlowState.running && scaleNetworkFlowState.particles.length) {
    scaleNetworkFlowState.rafId = window.requestAnimationFrame(animateScaleNetworkFlow);
  }
}

function resetScaleNetworkFlow() {
  buildScaleNetworkFlow(true);
}

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
  cancelScaleNetworkReturnAnimation();
  scaleNetworkViewState.scale = 1.12;
  scaleNetworkViewState.x = 0;
  scaleNetworkViewState.y = 0;
  updateScaleNetworkViewport();
}

function cancelScaleNetworkReturnAnimation() {
  if (scaleNetworkReturnRafId !== null) {
    window.cancelAnimationFrame(scaleNetworkReturnRafId);
    scaleNetworkReturnRafId = null;
  }
  document.querySelector('#scaleNetworkCanvas .popup-network-viewport')?.classList.remove('is-bouncing');
}

function animateScaleNetworkReturn(originX, originY, deltaX, deltaY) {
  const viewport = document.querySelector('#scaleNetworkCanvas .popup-network-viewport');
  if (!viewport || (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1)) return;
  cancelScaleNetworkReturnAnimation();
  const startedAt = performance.now();
  const duration = 760;
  viewport.classList.add('is-bouncing');
  const frame = timestamp => {
    const progress = Math.min(1, (timestamp - startedAt) / duration);
    const spring = Math.pow(1 - progress, 2.1) * Math.cos(progress * Math.PI * 5.2);
    scaleNetworkViewState.x = originX + deltaX * spring;
    scaleNetworkViewState.y = originY + deltaY * spring;
    updateScaleNetworkViewport();
    if (progress < 1) {
      scaleNetworkReturnRafId = window.requestAnimationFrame(frame);
      return;
    }
    scaleNetworkViewState.x = originX;
    scaleNetworkViewState.y = originY;
    updateScaleNetworkViewport();
    viewport.classList.remove('is-bouncing');
    scaleNetworkReturnRafId = null;
  };
  scaleNetworkReturnRafId = window.requestAnimationFrame(frame);
}

function setupScaleNetworkViewport() {
  const canvas = document.getElementById('scaleNetworkCanvas');
  const viewport = document.getElementById('scaleNetworkViewport');
  if (!canvas || !viewport || canvas.dataset.interactive === 'true') return;
  canvas.dataset.interactive = 'true';
  let dragging = false;
  let activePointerId = null;
  let pointerMoved = false;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  canvas.addEventListener('wheel', event => {
    // El gesto de desplazamiento no puede convertirse en zoom; el pinch del
    // trackpad (ctrl+wheel) tampoco cambia la escala de la red.
    event.preventDefault();
    if (dragging || event.ctrlKey) return;
    cancelScaleNetworkReturnAnimation();
    setScaleNetworkZoom(scaleNetworkViewState.scale + (event.deltaY < 0 ? .12 : -.12));
  }, { passive: false });

  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault();
    cancelScaleNetworkReturnAnimation();
    dragging = true;
    pointerMoved = false;
    activePointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    originX = scaleNetworkViewState.x;
    originY = scaleNetworkViewState.y;
    canvas.classList.add('is-dragging');
    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener('pointermove', event => {
    if (!dragging || event.pointerId !== activePointerId) return;
    event.preventDefault();
    if (Math.hypot(event.clientX - startX, event.clientY - startY) > 6) pointerMoved = true;
    scaleNetworkViewState.x = originX + event.clientX - startX;
    scaleNetworkViewState.y = originY + event.clientY - startY;
    updateScaleNetworkViewport();
  });

  const stopDragging = event => {
    if (!dragging || (activePointerId !== null && event.pointerId !== activePointerId)) return;
    dragging = false;
    if (pointerMoved) canvas.dataset.suppressNodeClick = 'true';
    canvas.classList.remove('is-dragging');
    if (canvas.hasPointerCapture?.(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    activePointerId = null;
    const deltaX = scaleNetworkViewState.x - originX;
    const deltaY = scaleNetworkViewState.y - originY;
    if (Math.hypot(deltaX, deltaY) > 2) animateScaleNetworkReturn(originX, originY, deltaX, deltaY);
  };
  canvas.addEventListener('pointerup', stopDragging);
  canvas.addEventListener('pointercancel', stopDragging);
  canvas.addEventListener('lostpointercapture', stopDragging);
}

function splitPopupLabel(label, radius = 20) {
  const safeRadius = Math.max(14, Number(radius) || 20);
  const maxWidth = Math.max(18, safeRadius * 1.55);
  const fontSize = Number(Math.max(5.4, Math.min(9.2, safeRadius * 0.28)).toFixed(2));
  const lineHeight = Number(Math.max(6.2, Math.min(9.5, fontSize * 1.08)).toFixed(2));
  const maxChars = Math.max(6, Math.floor(maxWidth / (fontSize * 0.62)));
  const words = String(label || '').trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach(word => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return {
    lines: (lines.length ? lines : [String(label || '')]).slice(0, 3),
    fontSize,
    lineHeight,
    maxWidth
  };
}

const popupLayoutOverrides = {
  // Grafo orgánico: hubs separados, satélites alrededor y una continuidad
  // inferior reconocible. Las coordenadas son deliberadamente irregulares
  // para evitar tanto la telaraña radial como la lectura de mapa conceptual.
  natural: {
    humedales: [160, 235], rios: [300, 105], areas_protegidas: [445, 185], reservas_forestales: [610, 95], cerros_orientales: [790, 145], paramos: [900, 235],
    quebradas: [95, 335], cobertura_vegetal: [250, 285], parques: [405, 315], paramos_andinos: [610, 255], bosques_andinos: [755, 300], nacimientos_agua: [910, 360],
    rondas_hidricas: [75, 395], bosques_urbanos: [290, 390], quebradas_urbanas: [390, 430], rios_urbanos: [570, 370], recarga_hidrica: [725, 405], corredores_ecologicos: [830, 420],
    humedales_urbanos: [150, 430], rondas_rio: [285, 440], infiltracion_agua: [470, 465], coberturas_vegetales: [585, 435], jardines_lluvia: [740, 465], arbolado_urbano: [940, 460],
    parques_ecologicos: [190, 495], fauna_urbana: [350, 480], suelo_permeable: [530, 505], restauracion_ecologica: [670, 480], resiliencia_climatica: [820, 500], areas_conservacion: [975, 525]
  },
  cultural: {
    patrimonio_material: [260, 150], patrimonio_inmaterial: [720, 120], museos: [90, 270], centros_historicos: [330, 250], zonas_turisticas: [550, 220], artesanias: [840, 260],
    bibliotecas: [150, 380], barrios: [380, 345], plazas_mercado: [590, 370], equipamientos_culturales: [830, 380], rutas_patrimoniales: [190, 475], mercados_barriales: [390, 445], centros_comunitarios: [620, 485], escuelas_musica: [850, 455]
  },
  tecnologico: {
    red_vial: [300, 150], transporte_publico: [700, 120], red_ferrrea: [100, 270], ciclorutas: [280, 250], nodos_digitales: [480, 220], internet_publico: [690, 260], recarga_electrica: [900, 300],
    datos_abiertos: [170, 380], centro_tecnologico: [400, 350], semaforizacion: [620, 390], electrolineras: [840, 380], fibra_optica: [250, 475], centros_datos: [520, 450], subestaciones: [800, 485]
  },
  metaverso: {
    gemelo_digital: [300, 130], modelos_3d: [700, 110], capas_gis: [100, 250], plataformas_bim: [290, 230], nodos_iot: [490, 270], sensores_urbanos: [700, 235], escenarios_simulados: [900, 280],
    datos_territoriales: [170, 380], laboratorios_urbanos: [400, 350], visualizacion_vr: [620, 390], escaneo_urbano: [840, 360], nube_puntos: [260, 475], simulador_movilidad: [520, 450], laboratorio_inmersivo: [800, 485]
  }
};

function popupNetworkPositions(definition) {
  const mode = Object.keys(scaleNetworks).find(key => scaleNetworks[key] === definition);
  const override = popupLayoutOverrides[mode];
  if (override) {
    return Object.fromEntries(definition.nodes.map(node => {
      const [x, y] = override[node.id] || [500, 270];
      return [node.id, { ...node, x, y }];
    }));
  }
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
    x: 54 + ((node.lng - minLng) / lngRange) * 892,
    y: 48 + ((maxLat - node.lat) / latRange) * 452
  }]));
}

function popupEdgePath(from, to) {
  // Conexión recta: conserva la lectura de grafo del módulo de referencia
  // y evita las esquinas repetitivas de una estructura tipo organigrama.
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} L ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

const popupNodeContexts = {
  natural: {
    humedales: 'Ecosistema de regulación hídrica, hábitat y soporte para la resiliencia climática.',
    rios: 'Estructura azul que conecta nacimientos, rondas hídricas y cursos urbanos.',
    quebradas: 'Red de drenaje menor que articula agua, suelo y corredores ecológicos.',
    areas_protegidas: 'Ámbito de conservación que enlaza cobertura, cerros y parques.',
    reservas_forestales: 'Reserva de cobertura arbórea que conecta páramos y conservación.',
    cobertura_vegetal: 'Capa vegetal que articula bosques urbanos, coberturas y biodiversidad.',
    parques: 'Espacios verdes que conectan parques ecológicos y soluciones de lluvia.',
    rondas_hidricas: 'Franja de protección que vincula cuerpos de agua y suelo permeable.',
    bosques_urbanos: 'Infraestructura verde urbana para sombra, hábitat y conectividad.',
    paramos: 'Complejo altoandino que sostiene regulación hídrica y paisaje ecológico.',
    cerros_orientales: 'Sistema montañoso de protección, conectividad ecológica y paisaje.',
    paramos_andinos: 'Ecosistema de alta montaña asociado a nacimientos y recarga hídrica.',
    bosques_andinos: 'Cobertura de montaña que conecta vegetación y fauna urbana.',
    nacimientos_agua: 'Origen de flujos hídricos que alimentan la red azul.',
    quebradas_urbanas: 'Cursos de agua urbanos que traducen la estructura hídrica al territorio.',
    rios_urbanos: 'Tramos fluviales urbanos que llevan la red natural a la ciudad.',
    humedales_urbanos: 'Ámbitos urbanos de agua que combinan regulación, biodiversidad y uso público.',
    rondas_rio: 'Bordes fluviales que conectan agua, infiltración y espacio abierto.',
    recarga_hidrica: 'Zona de alimentación del sistema hídrico subterráneo y superficial.',
    infiltracion_agua: 'Proceso que permite que el agua ingrese al suelo y reduzca escorrentías.',
    corredores_ecologicos: 'Conectores territoriales para el movimiento de especies y flujos ecológicos.',
    coberturas_vegetales: 'Superficies vegetales que prolongan la conectividad de la estructura verde.',
    jardines_lluvia: 'Soluciones basadas en naturaleza para retener e infiltrar agua.',
    arbolado_urbano: 'Red de árboles urbanos que aporta sombra, hábitat y continuidad vegetal.',
    parques_ecologicos: 'Espacios protegidos de uso ecológico y conexión territorial.',
    fauna_urbana: 'Especies y comunidades que hacen visible la biodiversidad urbana.',
    suelo_permeable: 'Superficie que permite infiltración y soporte para la resiliencia climática.',
    restauracion_ecologica: 'Proceso de recuperación de funciones ecológicas y conectividad.',
    resiliencia_climatica: 'Capacidad territorial para absorber impactos y sostener funciones ambientales.',
    areas_conservacion: 'Ámbitos de protección que consolidan corredores y valores naturales.'
  }
};

function getPopupNodeContext(mode, node) {
  return popupNodeContexts[mode]?.[node.id] || `${node.label} participa en la red ${scaleNetworks[mode]?.title || 'territorial'} como componente relacionado con otros conceptos.`;
}

function setNodeDetailList(selector, edges, nodesById, direction) {
  const list = document.getElementById(selector);
  if (!list) return;
  list.replaceChildren();
  if (!edges.length) {
    const empty = document.createElement('li');
    empty.className = 'node-detail-empty';
    empty.textContent = direction === 'out' ? 'Sin conexiones de salida activas.' : 'Sin conexiones de entrada activas.';
    list.appendChild(empty);
    return;
  }
  edges.forEach(([fromId, toId, type]) => {
    const targetId = direction === 'out' ? toId : fromId;
    const target = nodesById[targetId];
    const item = document.createElement('li');
    item.append(target?.label || targetId);
    const relation = document.createElement('em');
    relation.textContent = ` · ${type}`;
    item.appendChild(relation);
    list.appendChild(item);
  });
}

function getActivePopupTopology(definition) {
  const activeNodeIds = new Set(definition.nodes.filter(node => !scalePopupHiddenNodes.has(node.id)).map(node => node.id));
  const activeEdges = definition.edges.filter(([fromId, toId]) => activeNodeIds.has(fromId) && activeNodeIds.has(toId));
  const activeDegrees = Object.fromEntries(definition.nodes.map(node => [node.id, 0]));
  activeEdges.forEach(([fromId, toId]) => {
    activeDegrees[fromId] += 1;
    activeDegrees[toId] += 1;
  });

  // La información estadística sí responde a los nodos apagados, pero la
  // escala visual no se recalcula: quitar un hub no debe encoger ni agrandar
  // todos los nodos restantes. Esta topología completa fija radios y hubs.
  const visualDegrees = Object.fromEntries(definition.nodes.map(node => [node.id, 0]));
  definition.edges.forEach(([fromId, toId]) => {
    visualDegrees[fromId] += 1;
    visualDegrees[toId] += 1;
  });
  const visualMaxDegree = Math.max(0, ...Object.values(visualDegrees));
  const visualHubThreshold = visualMaxDegree >= 2 ? Math.max(2, Math.ceil(visualMaxDegree * .72)) : Infinity;
  const visualHubIds = new Set(definition.nodes.filter(node => visualDegrees[node.id] >= visualHubThreshold).map(node => node.id));
  const maxDegree = Math.max(0, ...definition.nodes.filter(node => activeNodeIds.has(node.id)).map(node => activeDegrees[node.id]));
  const hubThreshold = maxDegree >= 2 ? Math.max(2, Math.ceil(maxDegree * .72)) : Infinity;
  const activeHubIds = new Set(definition.nodes.filter(node => activeNodeIds.has(node.id) && visualHubIds.has(node.id) && activeDegrees[node.id] >= hubThreshold).map(node => node.id));
  return { activeNodeIds, activeEdges, activeDegrees, activeHubIds, maxDegree, visualDegrees, visualHubIds, visualMaxDegree };
}

function updateScaleNetworkStats(definition = scaleNetworks[scalePopupMode]) {
  if (!definition) return;
  const { activeNodeIds, activeEdges, activeDegrees, activeHubIds } = getActivePopupTopology(definition);
  const setStat = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value);
  };
  setStat('scaleStatsActiveNodes', activeNodeIds.size);
  setStat('scaleStatsChangedNodes', scalePopupHiddenNodes.size);
  setStat('scaleStatsActiveHubs', activeHubIds.size);
  setStat('scaleStatsActiveEdges', activeEdges.length);
  const selectedId = scalePopupSelectedNode?.id;
  const selectedNode = definition.nodes.find(node => node.id === selectedId);
  const selectedDegree = selectedNode ? activeDegrees[selectedNode.id] || 0 : null;
  const selectedLabel = document.getElementById('scaleStatsSelectedNode');
  if (selectedLabel) selectedLabel.textContent = selectedNode ? `${selectedNode.label} · grado actual` : 'Selecciona un nodo';
  setStat('scaleStatsSelectedDegree', selectedDegree === null ? '—' : selectedDegree);
}

function animatePopupNodeSizes() {
  const circles = [...document.querySelectorAll('#scaleNetworkCanvas .popup-node circle[data-start-radius]')];
  const records = circles.map(circle => ({
    circle,
    start: Number(circle.dataset.startRadius),
    target: Number(circle.dataset.targetRadius)
  })).filter(record => Number.isFinite(record.start) && Number.isFinite(record.target) && record.start !== record.target);
  if (!records.length) return;
  const startedAt = performance.now();
  const duration = 360;
  const frame = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    records.forEach(({ circle, start, target }) => {
      circle.setAttribute('r', (start + (target - start) * eased).toFixed(2));
    });
    if (progress < 1) window.requestAnimationFrame(frame);
    else records.forEach(({ circle, target }) => circle.setAttribute('r', target.toFixed(2)));
  };
  window.requestAnimationFrame(frame);
}

function openNodeDetailModal(mode, nodeId) {
  const definition = scaleNetworks[mode];
  const node = definition?.nodes.find(item => item.id === nodeId);
  if (!definition || !node || scalePopupHiddenNodes.has(nodeId)) return;
  const { activeEdges, activeDegrees, activeHubIds } = getActivePopupTopology(definition);
  const activeDegree = activeDegrees[nodeId] || 0;
  const isActiveHub = activeHubIds.has(nodeId);
  const outgoing = activeEdges.filter(([fromId]) => fromId === nodeId);
  const incoming = activeEdges.filter(([, toId]) => toId === nodeId);
  const allConnections = [...outgoing, ...incoming];
  const nodesById = Object.fromEntries(definition.nodes.map(item => [item.id, item]));
  nodeDetailState = { mode, id: nodeId };
  document.getElementById('nodeDetailKicker').textContent = `${definition.title} · FICHA INTERACTIVA`;
  document.getElementById('nodeDetailTitle').textContent = node.label;
  document.getElementById('nodeDetailRole').textContent = isActiveHub ? `Hub activo · concentra ${activeDegree} conexiones` : activeDegree ? `Nodo activo · ${activeDegree} conexiones` : 'Nodo activo sin conexiones';
  document.getElementById('nodeDetailSummary').textContent = getPopupNodeContext(mode, node);
  document.getElementById('nodeDetailDegree').textContent = String(allConnections.length);
  document.getElementById('nodeDetailDirect').textContent = String(allConnections.filter(([, , type]) => type === 'directa').length);
  document.getElementById('nodeDetailIndirect').textContent = String(allConnections.filter(([, , type]) => type === 'indirecta').length);
  document.getElementById('nodeDetailHub').textContent = isActiveHub ? 'Hub activo' : activeDegree ? 'Nodo activo' : 'Aislado';
  setNodeDetailList('nodeDetailOutgoing', outgoing, nodesById, 'out');
  setNodeDetailList('nodeDetailIncoming', incoming, nodesById, 'in');
  const modal = document.getElementById('nodeDetailModal');
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('node-detail-open');
  document.getElementById('nodeDetailClose')?.focus();
}

function closeNodeDetailModal() {
  const modal = document.getElementById('nodeDetailModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('node-detail-open');
}

function focusNodeConnections() {
  const { mode, id } = nodeDetailState;
  closeNodeDetailModal();
  document.querySelectorAll('#scaleNetworkCanvas .popup-node').forEach(item => item.classList.toggle('selected', item.dataset.nodeId === id));
  document.querySelectorAll('#scaleNetworkCanvas .popup-edge').forEach(edge => {
    edge.classList.toggle('emphasis', edge.dataset.from === id || edge.dataset.to === id);
  });
  const description = document.getElementById('scaleNetworkDescription');
  const node = scaleNetworks[mode]?.nodes.find(item => item.id === id);
  if (description && node) description.textContent = `${node.label} · conexiones resaltadas`;
}

function renderScaleNetworkPopup(mode) {
  const canvas = document.getElementById('scaleNetworkCanvas');
  const definition = scaleNetworks[mode];
  if (!canvas || !definition) return;
  const nodes = popupNetworkPositions(definition);
  const { activeEdges, activeDegrees, visualHubIds, visualDegrees, visualMaxDegree } = getActivePopupTopology(definition);
  const edgeMarkup = activeEdges.map(([fromId, toId, type]) => {
    const from = nodes[fromId];
    const to = nodes[toId];
    if (!from || !to || scalePopupHiddenNodes.has(fromId) || scalePopupHiddenNodes.has(toId)) return '';
    const color = type === 'indirecta' ? '#e89a6c' : '#46d6d0';
    const isBridge = from.y > 285 && to.y > 285;
    const className = `${type === 'indirecta' ? 'popup-edge indirect' : 'popup-edge direct'}${isBridge ? ' bridge' : ''}`;
    return `<path class="${className}" data-from="${fromId}" data-to="${toId}" data-bridge="${isBridge}" d="${popupEdgePath(from, to)}" stroke="${color}" marker-end="url(#arrow-${type})" />`;
  }).join('');

  const popupIconSvg = {
    'fa-droplet': '<path d="M12 2.5C9 6.2 5.8 9.8 5.8 14.1a6.2 6.2 0 0 0 12.4 0C18.2 9.8 15 6.2 12 2.5Z"/>',
    'fa-water': '<g class="icon-stroke"><path d="M3 9.5h18M5 14h14M8 18.5h8"/></g>',
    'fa-shield-halved': '<path d="M12 2.8 19 5.5v5.4c0 4.6-2.7 8.1-7 10.3-4.3-2.2-7-5.7-7-10.3V5.5L12 2.8Z"/><path class="icon-cut" d="M12 3v17.9"/>',
    'fa-tree': '<path d="m12 2 7 9h-4l3 4h-5v6h-2v-6H6l3-4H5l7-9Z"/><path class="icon-stroke" d="M5 21h14"/>',
    'fa-leaf': '<path d="M20.5 3.5C11 3.5 4.5 7.8 4.5 13c0 3.8 3.3 6.5 7.2 6.5 4.8 0 8.8-5 8.8-16Z"/><path class="icon-stroke" d="M4.5 20.5c3.1-4.1 6.3-6.5 11.4-9.1"/>',
    'fa-mountain': '<path d="m3 20 6.1-9 3.2 4.3 2.4-3.3L21 20H3Z"/><path d="m7.3 8.2 2.2-3.2 2.1 3.2Z"/>',
    'fa-eye': '<g class="icon-stroke"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></g>',
    'fa-temperature-half': '<path d="M10 5a2 2 0 0 1 4 0v7.6a5 5 0 1 1-4 0V5Z"/><path class="icon-stroke" d="M12 7v8"/>'
  };
  const nodeMarkup = definition.nodes.filter(node => !scalePopupHiddenNodes.has(node.id)).map(node => {
    const p = nodes[node.id];
    const activeDegree = activeDegrees[node.id] || 0;
    const activeHub = visualHubIds.has(node.id);
    const normalizedDegree = visualMaxDegree ? (visualDegrees[node.id] || 0) / visualMaxDegree : 0;
    const radius = Number((16 + normalizedDegree * 17 + (activeHub ? 2 : 0)).toFixed(2));
    const radiusKey = `${mode}:${node.id}`;
    // El tamaño visual es determinista y estable: apagar un nodo no debe
    // animar ni recalcular los radios de los nodos restantes.
    const previousRadius = radius;
    popupNodeRadiusState.set(radiusKey, radius);
    const labelLayout = splitPopupLabel(node.label, radius);
    const lines = labelLayout.lines;
    const firstY = p.y - ((lines.length - 1) * labelLayout.lineHeight + labelLayout.fontSize) / 2 + labelLayout.fontSize * .82;
    const iconSvg = popupIconSvg[node.icon] || '';
    const iconX = p.x - 12;
    const iconY = p.y - radius * .48 - 12;
    const iconMarkup = iconSvg ? `<svg class="popup-node-icon" x="${iconX.toFixed(1)}" y="${iconY.toFixed(1)}" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">${iconSvg}</svg>` : '';
    const labelMarkup = lines.map((line, index) => {
      const estimatedWidth = line.length * labelLayout.fontSize * .62;
      const fit = estimatedWidth > labelLayout.maxWidth
        ? ` textLength="${labelLayout.maxWidth.toFixed(1)}" lengthAdjust="spacingAndGlyphs"`
        : '';
      const y = firstY + index * labelLayout.lineHeight;
      return `<tspan x="${p.x.toFixed(1)}" y="${y.toFixed(1)}"${fit}>${line}</tspan>`;
    }).join('');
    return `<g class="popup-node ${activeHub ? 'hub' : ''}" data-node-id="${node.id}" data-active-degree="${activeDegree}" data-active-hub="${activeHub}" tabindex="0" role="button" aria-label="${node.label}: ${activeDegree} conexiones activas">
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${previousRadius}" data-start-radius="${previousRadius}" data-target-radius="${radius}" />
      ${iconMarkup}
      <text x="${p.x.toFixed(1)}" y="${firstY.toFixed(1)}" style="font-size:${labelLayout.fontSize}px;line-height:${labelLayout.lineHeight}px;">${labelMarkup}</text>
    </g>`;
  }).join('');

  canvas.innerHTML = `<div id="scaleNetworkViewport" class="popup-network-viewport"><svg class="popup-network-svg" viewBox="0 0 1000 544" role="img" aria-label="${definition.title}">
    <defs>
      <filter id="popupGlowTeal" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="popupGlowCopper" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#46d6d0" /></marker>
      <marker id="arrow-indirecta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#e89a6c" /></marker>
    </defs>
    <g class="popup-network-scene">
      <g class="popup-edges">${edgeMarkup}</g>
      <g class="popup-flow-layer" aria-hidden="true"></g>
      <g class="popup-nodes">${nodeMarkup}</g>
    </g>
  </svg></div>`;

  resetScaleNetworkView();
  setupScaleNetworkViewport();
  buildScaleNetworkFlow();
  updateScaleNetworkStats(definition);
  canvas.querySelectorAll('.popup-node').forEach(nodeElement => {
    const node = nodes[nodeElement.dataset.nodeId];
    const selectNode = () => {
      canvas.querySelectorAll('.popup-node').forEach(item => item.classList.remove('selected'));
      nodeElement.classList.add('selected');
      scalePopupSelectedNode = node;
      updateScaleNetworkStats(definition);
      const description = document.getElementById('scaleNetworkDescription');
      if (description && node) description.textContent = `${node.label} · ${definition.title}`;
    };
    const openNodeInfo = () => {
      if (node?.id) {
        selectNode();
        openNodeDetailModal(mode, node.id);
      }
    };
    const openNodeDoubleAction = () => {
      if (!node?.id) return;
      selectNode();
      if (mode === 'natural' && node.id === 'humedales') openWetlandImageModal();
      else openNodeDetailModal(mode, node.id);
    };
    const togglePopupNode = () => {
      if (!node) return;
      closeNodeDetailModal();
      closeWetlandImageModal();
      scalePopupHiddenNodes.add(node.id);
      scalePopupSelectedNode = null;
      renderScaleNetworkPopup(mode);
      const description = document.getElementById('scaleNetworkDescription');
      if (description) description.textContent = `${node.label} apagado · se retiraron sus relaciones activas`;
    };
    let clickCount = 0;
    let clickTimer = null;
    let lastClickAt = 0;
    nodeElement.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if (canvas.dataset.suppressNodeClick === 'true') {
        canvas.dataset.suppressNodeClick = 'false';
        return;
      }
      const now = performance.now();
      if (now - lastClickAt > 620) clickCount = 0;
      lastClickAt = now;
      clickCount = Math.min(4, clickCount + 1);
      if (clickTimer) window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => {
        const sequence = clickCount;
        clickCount = 0;
        clickTimer = null;
        if (sequence >= 3) togglePopupNode();
        else if (sequence === 2) openNodeDoubleAction();
        else openNodeInfo();
      }, 260);
    });
    nodeElement.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectNode();
      }
    });
  });
}

let wetlandImagePromise = null;

function preloadWetlandImage() {
  const image = document.getElementById('wetlandImage');
  const fullSrc = image?.dataset.fullSrc;
  if (!fullSrc) return Promise.resolve(null);
  if (wetlandImagePromise) return wetlandImagePromise;
  wetlandImagePromise = new Promise(resolve => {
    const preloader = new Image();
    preloader.decoding = 'async';
    preloader.fetchPriority = 'low';
    preloader.onload = () => resolve(preloader);
    preloader.onerror = () => resolve(null);
    preloader.src = fullSrc;
  });
  return wetlandImagePromise;
}

async function openWetlandImageModal() {
  const modal = document.getElementById('wetlandImageModal');
  if (!modal) return;
  const image = document.getElementById('wetlandImage');
  const empty = document.getElementById('wetlandImageEmpty');
  const hasPreview = Boolean(image?.getAttribute('src'));
  if (image) {
    image.hidden = !hasPreview;
    image.style.display = hasPreview ? 'block' : 'none';
  }
  if (empty) {
    empty.hidden = hasPreview;
    empty.style.display = hasPreview ? 'none' : 'grid';
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('wetland-modal-open');
  document.getElementById('wetlandImageClose')?.focus();
  const fullImage = await preloadWetlandImage();
  if (fullImage && image && image.dataset.fullSrc) {
    image.src = image.dataset.fullSrc;
    image.hidden = false;
    image.style.display = 'block';
    if (empty) {
      empty.hidden = true;
      empty.style.display = 'none';
    }
    image.dataset.fullReady = 'true';
  }
}

function closeWetlandImageModal() {
  const modal = document.getElementById('wetlandImageModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('wetland-modal-open');
}

document.getElementById('wetlandImageClose')?.addEventListener('click', closeWetlandImageModal);
document.getElementById('wetlandImageModal')?.addEventListener('click', event => {
  if (event.target.id === 'wetlandImageModal') closeWetlandImageModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeWetlandImageModal();
});

document.getElementById('nodeDetailClose')?.addEventListener('click', closeNodeDetailModal);
document.getElementById('nodeDetailFocus')?.addEventListener('click', focusNodeConnections);
document.getElementById('nodeDetailModal')?.addEventListener('click', event => {
  if (event.target.id === 'nodeDetailModal') closeNodeDetailModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNodeDetailModal();
});

function openScaleNetworkModal(mode) {
  const modal = document.getElementById('scaleNetworkModal');
  const definition = scaleNetworks[mode];
  if (!modal || !definition) return;
  scalePopupMode = mode;
  scaleNetworkFlowState.running = true;
  scalePopupHiddenNodes.clear();
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
  cancelScaleNetworkFlowLoop();
  cancelScaleNetworkAmbientLoop();
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('scale-modal-open');
}

document.getElementById('scaleNetworkRestore')?.addEventListener('click', () => {
  scalePopupHiddenNodes.clear();
  scalePopupSelectedNode = null;
  renderScaleNetworkPopup(scalePopupMode);
  updateScaleNetworkStats(scaleNetworks[scalePopupMode]);
  const description = document.getElementById('scaleNetworkDescription');
  if (description) description.textContent = scaleNetworkDescriptions[scalePopupMode];
});
document.getElementById('scaleNetworkFlowToggle')?.addEventListener('click', event => {
  event.stopPropagation();
  setScaleNetworkFlowRunning(!scaleNetworkFlowState.running);
});
document.getElementById('scaleNetworkFlowReset')?.addEventListener('click', event => {
  event.stopPropagation();
  resetScaleNetworkFlow();
});
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
    window.setTimeout(preloadWetlandImage, 650);
    window.BogotaVivaNavigator = { state, UPLS, SCALE_DATA, setScale, focusSelectedUpl, loadScaleData, calculateRoute, useProceduralFallback, toggleLocalPmtiles, setScaleNetworkFlowRunning, resetScaleNetworkFlow, getScaleNetworkFlowState: () => ({ running: scaleNetworkFlowState.running, particles: scaleNetworkFlowState.particles.length, edges: document.querySelectorAll('#scaleNetworkCanvas .popup-edge').length }) };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
