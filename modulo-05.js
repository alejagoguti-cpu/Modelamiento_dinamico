/* Topografía Nocturna: Macro=vías, Meso=capa 0 y Micro=UPZ. */
(function () {
  "use strict";

  /* Si vas a usar los tres archivos fuera de este proyecto, descarga los GeoJSON
     y reemplaza las rutas manus-storage por "vias.geojson", "capa0.geojson" y "upz.geojson". */
  const layers = {
    macro: {
      name: "Vías", color: "#ff936e", soft: "rgba(255,147,110,.18)",
      source: "/manus-storage/vias_70683c38.geojson", count: "16.962", entity: "trazos de vía",
      text: "Lee la estructura vial que conecta el territorio y organiza los flujos metropolitanos.",
      image: "/manus-storage/nm-macro-ambient_367fa1e0.png"
    },
    meso: {
      name: "Capa 0", color: "#45e1d1", soft: "rgba(69,225,209,.18)",
      source: "/manus-storage/capa0_4150571e.geojson", count: "33", entity: "polígonos",
      text: "Observa los polígonos contenidos en la capa 0 del plano para interpretar la organización intermedia.",
      image: "/manus-storage/nm-meso-ambient_8b52d549.png"
    },
    micro: {
      name: "UPZ", color: "#ddeb75", soft: "rgba(221,235,117,.18)",
      source: "/manus-storage/upz_f15b94cf.geojson", count: "5", entity: "polígonos UPZ",
      text: "Acércate a los límites UPZ para reconocer unidades de planeación y decisiones de proximidad.",
      image: "/manus-storage/nm-micro-ambient_3f449db0.png"
    }
  };

  const canvas = document.getElementById("dwg-map");
  const context = canvas.getContext("2d");
  const buttons = Array.from(document.querySelectorAll("[data-scale]"));
  const dom = {
    layerName: document.getElementById("layer-name"), status: document.getElementById("layer-status"),
    geometry: document.getElementById("geometry-count"), swatch: document.getElementById("legend-swatch"),
    cardScale: document.getElementById("card-scale"), cardTitle: document.getElementById("card-title"),
    cardCount: document.getElementById("card-count"), cardCopy: document.getElementById("card-copy"),
    cardImage: document.getElementById("card-image"), cardError: document.getElementById("card-error")
  };
  const cache = new Map();
  const view = { zoom: 1, panX: 0, panY: 0, dragging: false, pointerX: 0, pointerY: 0 };
  let activeId = "macro";
  let activeData = null;

  function getPaths(geometry) {
    const c = geometry.coordinates;
    if (geometry.type === "LineString") return [{ points: c, closed: false }];
    if (geometry.type === "MultiLineString") return c.map(points => ({ points, closed: false }));
    if (geometry.type === "Polygon") return c.map(points => ({ points, closed: true }));
    if (geometry.type === "MultiPolygon") return c.flatMap(polygon => polygon.map(points => ({ points, closed: true })));
    return [];
  }

  function withOpacity(hex, opacity) {
    const raw = hex.replace("#", "");
    const number = parseInt(raw.length === 3 ? raw.split("").map(x => x + x).join("") : raw, 16);
    return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${opacity})`;
  }

  function boundsOf(collection) {
    let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
    collection.features.forEach(feature => getPaths(feature.geometry).forEach(path => path.points.forEach(([lng, lat]) => {
      minLng = Math.min(minLng, lng); maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
    })));
    return { minLng, maxLng, minLat, maxLat };
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.fillStyle = "#071119"; context.fillRect(0, 0, rect.width, rect.height);
    context.lineWidth = 1; context.strokeStyle = "rgba(124,171,182,.12)";
    for (let x = -56; x <= rect.width + 56; x += 56) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, rect.height); context.stroke(); }
    for (let y = -56; y <= rect.height + 56; y += 56) { context.beginPath(); context.moveTo(0, y); context.lineTo(rect.width, y); context.stroke(); }
    if (!activeData) return;

    const layer = layers[activeId], bounds = boundsOf(activeData);
    if (!Number.isFinite(bounds.minLng)) return;
    const spanLng = Math.max(bounds.maxLng - bounds.minLng, .00001), spanLat = Math.max(bounds.maxLat - bounds.minLat, .00001);
    const padding = Math.min(100, Math.max(46, rect.width * .08));
    const baseScale = Math.min((rect.width - padding * 2) / spanLng, (rect.height - padding * 2) / spanLat);
    const scale = baseScale * view.zoom, centerLng = (bounds.minLng + bounds.maxLng) / 2, centerLat = (bounds.minLat + bounds.maxLat) / 2;
    const point = ([lng, lat]) => [rect.width / 2 + (lng - centerLng) * scale + view.panX, rect.height / 2 - (lat - centerLat) * scale + view.panY];
    context.save(); context.shadowColor = withOpacity(layer.color, activeId === "macro" ? .42 : .28); context.shadowBlur = activeId === "macro" ? 5 : 10; context.lineJoin = "round"; context.lineCap = "round";
    activeData.features.forEach(feature => {
      const polygon = feature.geometry.type.includes("Polygon");
      getPaths(feature.geometry).forEach(path => {
        if (path.points.length < 2) return;
        context.beginPath(); path.points.forEach((p, index) => { const [x, y] = point(p); index ? context.lineTo(x, y) : context.moveTo(x, y); }); if (path.closed) context.closePath();
        context.strokeStyle = layer.color; context.globalAlpha = polygon ? .94 : .84; context.lineWidth = polygon ? 1.45 : .7; context.stroke();
        if (polygon) { context.globalAlpha = .17; context.fillStyle = layer.soft; context.fill(); }
      });
    });
    context.restore();
    context.fillStyle = withOpacity(layer.color, .72); context.font = '600 9px "IBM Plex Sans", sans-serif';
    context.fillText(`DWG / ${layer.name.toUpperCase()} / ${activeData.features.length} ELEMENTOS`, 18, rect.height - 19);
  }

  function resetView() { view.zoom = 1; view.panX = 0; view.panY = 0; draw(); }
  function updateInfo(layerId) {
    const layer = layers[layerId]; document.documentElement.style.setProperty("--active", layer.color); document.documentElement.style.setProperty("--active-soft", layer.soft);
    dom.layerName.textContent = layer.name; dom.geometry.textContent = `${layer.count} ${layer.entity}`;
    dom.cardScale.textContent = `LECTURA ${layerId.toUpperCase()}`; dom.cardTitle.textContent = layer.name;
    dom.cardCount.innerHTML = `${layer.count} <small>${layer.entity}</small>`; dom.cardCopy.textContent = layer.text;
    dom.cardImage.style.backgroundImage = `linear-gradient(180deg, ${withOpacity(layer.color,.1)}, rgba(2,7,10,.62)), url('${layer.image}')`;
    canvas.setAttribute("aria-label", `Plano DWG: capa ${layer.name}`);
    buttons.forEach(button => { const active = button.dataset.scale === layerId; button.classList.toggle("is-active", active); button.setAttribute("aria-selected", String(active)); });
  }

  async function loadLayer(layerId) {
    activeId = layerId; updateInfo(layerId); resetView(); activeData = null; dom.cardError.hidden = true;
    dom.status.classList.add("is-loading"); dom.status.lastChild.textContent = "Cargando capa"; draw();
    try {
      const layer = layers[layerId];
      if (!cache.has(layer.source)) {
        const response = await fetch(layer.source); if (!response.ok) throw new Error("GeoJSON no disponible"); cache.set(layer.source, await response.json());
      }
      activeData = cache.get(layer.source); draw(); dom.status.lastChild.textContent = "Visible";
    } catch (error) {
      console.error(error); dom.status.lastChild.textContent = "Error de capa"; dom.cardError.hidden = false;
    } finally { dom.status.classList.remove("is-loading"); }
  }

  buttons.forEach(button => button.addEventListener("click", () => loadLayer(button.dataset.scale)));
  document.getElementById("zoom-in").addEventListener("click", () => { view.zoom = Math.min(view.zoom * 1.24, 7); draw(); });
  document.getElementById("zoom-out").addEventListener("click", () => { view.zoom = Math.max(view.zoom / 1.24, .72); draw(); });
  document.getElementById("map-reset").addEventListener("click", resetView);
  canvas.addEventListener("pointerdown", event => { view.dragging = true; view.pointerX = event.clientX; view.pointerY = event.clientY; canvas.setPointerCapture(event.pointerId); });
  canvas.addEventListener("pointermove", event => { if (!view.dragging) return; view.panX += event.clientX - view.pointerX; view.panY += event.clientY - view.pointerY; view.pointerX = event.clientX; view.pointerY = event.clientY; draw(); });
  canvas.addEventListener("pointerup", event => { view.dragging = false; canvas.releasePointerCapture(event.pointerId); });
  canvas.addEventListener("pointerleave", () => { view.dragging = false; });
  canvas.addEventListener("wheel", event => { event.preventDefault(); view.zoom = Math.min(7, Math.max(.72, view.zoom * (event.deltaY > 0 ? .9 : 1.11))); draw(); }, { passive: false });
  new ResizeObserver(draw).observe(canvas);
  loadLayer("macro");
})();
