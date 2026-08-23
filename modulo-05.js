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
  const OVERPASS_ENDPOINT_TIMEOUT_MS = 9000;
  const state = {
    map: null,
    mapReady: false,
    selectedUpl: null,
    selectedScale: "natural",
    dataMode: "real",
    streetSource: "overpass",
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
      roads: true, walking: true, transport: true, rail: true, aerial: true,
      natural: true, water: true, green: true,
      amenities: true, education: true, health: true, care: true, civic: true, services: true,
      commerce: true, food: true, industrial: true,
      residential: true, buildings: true, landuse: true,
      parks: true, sports: true,
      culture: true, tourism: true, memorial: true,
      boundaries: true, utilities: true, street: true,
    },
    apiLayerStatus: {},
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
    state.streetSource = "overpass";
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
    const counts = Object.fromEntries(Object.keys(API_LAYERS).map((key) => [key, 0]));
    elements.forEach((element) => {
      const tags = element.tags || {};
      Object.entries(API_LAYERS).forEach(([key, layer]) => {
        if (layer.match?.(tags, element)) counts[key] += 1;
      });
    });
    summary.innerHTML = Object.entries(API_LAYERS).filter(([key]) => state.apiLayers[key]).map(([key, layer]) => {
      const status = state.apiLayerStatus[key] || "idle";
      const label = status === "loading" ? "cargando" : status === "ok" ? "lista" : status === "error" ? "falló" : "pendiente";
      return `<span class="api-summary-item is-${status}"><i class="fa-solid ${layer.icon}" style="color:${layer.color}"></i><strong>${layer.label}</strong><b>${counts[key]}</b><em>${label}</em></span>`;
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
  }

  function initializeMap() {
    if (!window.maplibregl) {
      useProceduralFallback("MapLibre no pudo cargarse; se activó la lectura procedural.");
      return;
    }
    const style = {
      version: 8,
      sources: {
        "osm-raster": {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          minzoom: 0,
          maxzoom: 19,
          attribution: OSM_ATTRIBUTION,
        },
      },
      layers: [{ id: "osm-raster-layer", type: "raster", source: "osm-raster" }],
    };
    try {
      state.map = new maplibregl.Map({ container: "map", style, center: BOGOTA, zoom: 11.3, attributionControl: true, maxZoom: 19 });
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
        showToast("Mapa listo. Se muestra el respaldo mientras llegan los datos OSM.");
        applyRoadZoomFilter();
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
    state.map.addSource("osm-places", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
    state.map.addLayer({ id: "osm-places", type: "circle", source: "osm-places", paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 9, 1.2, 12, 2.2, 15, 4], "circle-color": ["coalesce", ["get", "color"], "#e8925c"], "circle-opacity": .72, "circle-stroke-color": "#ffffff", "circle-stroke-width": .5, "circle-stroke-opacity": .55 } });
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
    if (state.streetSource === "overpass") updateStreetLayer(streetFeatures);
    elements.forEach((element) => {
      const point = featurePoint(element);
      const tags = element.tags || {};
      if (!point || tags.highway) return;
      const matchedLayer = featureLayer(element);
      placeFeatures.push({ type: "Feature", properties: { color: matchedLayer?.[1].color || "#e8925c", osmId: element.id, label: featureName(element) }, geometry: { type: "Point", coordinates: point } });
    });
    updatePlaceLayer(placeFeatures);
    placeCount = placeFeatures.length;
    elements.slice(0, 220).forEach((element) => {
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
    setText("#metricRoads", state.streetSource === "pmtiles" ? "MVT" : (roadCount ? String(roadCount) : "—"));
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
        const response = await fetch(endpoint, {
          method: "POST",
          signal: requestSignal,
          headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
          body: `data=${encodeURIComponent(query)}`,
        });
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
    activeKeys.forEach((key) => { state.apiLayerStatus[key] = "loading"; });
    renderApiSummary([]);
    setText("#connectionLabel", `Consultando OSM… 0/${activeKeys.length} capas`);

    /* Carga progresiva: cada lote se dibuja al llegar y no bloquea toda la cartografía. */
    const results = [];
    let completed = 0;
    for (let index = 0; index < activeKeys.length; index += 2) {
      const batch = activeKeys.slice(index, index + 2);
      const settled = await Promise.allSettled(batch.map((key) => fetchOverpass(upl, scaleKey, bbox, signal, key)));
      settled.forEach((result, offset) => {
        const key = batch[offset];
        state.apiLayerStatus[key] = result.status === "fulfilled" ? "ok" : "error";
        if (result.status === "fulfilled") results.push(...result.value);
        completed += 1;
        const unique = new Map();
        results.forEach((element) => unique.set(`${element.type}/${element.id}`, element));
        const visibleResults = [...unique.values()];
        /* El mapa y los contadores se actualizan después de cada respuesta. */
        renderPlaces(visibleResults);
        renderApiSummary(visibleResults);
        setText("#connectionLabel", `Datos OSM parciales · ${completed}/${activeKeys.length} capas · ${visibleResults.length.toLocaleString("es-CO")} elementos`);
      });
      if (signal.aborted) throw new DOMException("Consulta cancelada", "AbortError");
    }
    const unique = new Map();
    results.forEach((element) => unique.set(`${element.type}/${element.id}`, element));
    if (!results.length) throw new Error("Ningún servidor Overpass respondió");
    setText("#connectionLabel", `Datos OSM listos · ${unique.size.toLocaleString("es-CO")} elementos`);
    return [...unique.values()];
  }

  function renderProceduralMarkers() {
    if (!state.map || !state.selectedUpl || !window.maplibregl) return;
    clearPlaceMarkers();
    updateStreetLayer([]);
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
    const bbox = getViewportBBox();
    if (!bbox) return;
    const layerKey = Object.entries(state.apiLayers).filter(([, enabled]) => enabled).map(([key]) => key).join("|");
    const queryKey = `${state.selectedUpl.num}:${state.selectedScale}:${layerKey}:${bboxString(bbox)}`;
    if (queryKey === state.activeQueryKey && fromViewport) return;
    state.activeQueryKey = queryKey;
    const token = ++state.queryToken;
    if (state.overpassController) state.overpassController.abort();
    const controller = new AbortController();
    state.overpassController = controller;
    const timeout = window.setTimeout(() => controller.abort(), 28000);
    const scale = SCALE_DATA[state.selectedScale];
    if (state.dataMode !== "real") {
      window.clearTimeout(timeout);
      renderProceduralMarkers();
      setText("#connectionLabel", "Modo procedural de respaldo");
      return;
    }
    clearPlaceMarkers();
    renderProceduralMarkers();
    setText("#metricPlaces", "…");
    setText("#metricRoads", "…");
    Object.keys(API_LAYERS).forEach((key) => { state.apiLayerStatus[key] = state.apiLayers[key] ? "loading" : "idle"; });
    renderApiSummary([]);
    setText("#connectionLabel", "Consultando OSM…");
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
