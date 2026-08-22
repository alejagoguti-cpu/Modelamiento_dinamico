console.log("INFO: Módulo 05 ha sido cargado - code 01");

let upzData = [];
let barrosData = [];
let currentSelection = null;
const humedales = [
  {id: 'h1', nombre: "Humedal Burro", lat: 4.644296801427965, lng: -74.15052710000018, area: 18.5},
  {id: 'h2', nombre: "Humedal El Techo", lat: 4.645366863767807, lng: -74.14136322378499, area: 32.2},
  {id: 'h3', nombre: "Humedal Vaca", lat: 4.627282592850425, lng: -74.15947984079249, area: 24.8},
];

const map = L.map('map').setView([4.60, -74.08], 11);
window.bogotaLeafletMap = map;

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '© CartoDB',
  maxZoom: 19
}).addTo(map);

let upzLayers = {};
let barriosLayers = {};
let humedalLayers = {};
let humedalMarkers = {};
let eepNodos = [];
let eepLayers = {};
let networkLines = [];
let currentMode = 'tecnologico'; // Escala inicial: Tecnológico, red vial jugable activa

// --- VARIABLE PARA LA CAPA DE VÍAS ---
let viasLayer = null;

// --- VARIABLE PARA LA CAPA 0 (AUTOCAD) ---
let capa0Layer = null;

// --- VARIABLE PARA LA CAPA UPZ (AUTOCAD - MICRO) ---
let capaUpzLayer = null;

// Cargar UPZ (MACRO)
fetch('upz_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    upzData = data.features.map(f => f.properties);
    
    // Los códigos de las UPL se mantienen únicamente en la lista lateral.
    // No se crean marcadores ni círculos dentro del mapa.
    renderItemList();
  });

// Cargar Barrios (MESO)
fetch('barrios_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    barrosData = data.features.map(f => f.properties);
    
    // Los códigos de los barrios se mantienen únicamente en la lista lateral.
    // No se crean marcadores ni círculos dentro del mapa.
  });

// Cargar nodos de la red EEP
fetch('red_eep.geojson')
  .then(r => r.json())
  .then(data => {
    eepNodos = data.features;
  });

// --- FETCH PARA CARGAR LA CAPA DE VÍAS CON ALINEACIÓN PRECISA BASADA EN EL DORADO ---
fetch('vias.geojson')
  .then(r => {
    if (!r.ok) throw new Error("Archivo vias_bogota.geojson no encontrado");
    return r.json();
  })
  .then(data => {
    const latOffset = +0.02890;  // Desplazamiento exacto hacia el norte
    const lngOffset = -0.14375; // Desplazamiento exacto hacia el oeste
    
    const scale = 1.0;
    const centerLng = -74.08;
    const centerLat = 4.60;

    const canvasRenderer = L.canvas({ padding: 0.5 });

    viasLayer = L.geoJSON(data, {
      renderer: canvasRenderer,
      style: function (feature) {
        return {
          color: "#46d6d0",
          weight: 1,
          opacity: 0.6
        };
      },
      interactive: false,
      coordsToLatLng: function (coords) {
        return new L.LatLng(
          centerLat + ((coords[1] - centerLat) * scale) + latOffset,
          centerLng + ((coords[0] - centerLng) * scale) + lngOffset
        );
      }
    });

    if (currentMode === 'tecnologico' || currentMode === 'metaverso') {
      viasLayer.addTo(map);
    }
  })
  .catch(err => console.warn("Aviso: No se pudo cargar la capa de vías.", err));

// Cargar Capa 0 de AutoCAD (Para modo MESO)
fetch('capa0.geojson') 
  .then(r => {
    if (!r.ok) throw new Error("Archivo de capa 0 no encontrado");
    return r.json();
  })
  .then(data => {
    const latOffset = 0.0285; 
    const lngOffset = -0.1455; 
    const scale = 1.01; 
    const centerLat = 4.60;  
    const centerLng = -74.08; 

    capa0Layer = L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "#e89a6c",
          weight: 1.5,
          opacity: 0.8
        };
      },
      interactive: false,
      coordsToLatLng: function (coords) {
        return new L.LatLng(
          centerLat + ((coords[1] - centerLat) * scale) + latOffset,
          centerLng + ((coords[0] - centerLng) * scale) + lngOffset
        );
      }
    });

    if (currentMode === 'cultural' || currentMode === 'metaverso') {
      capa0Layer.addTo(map);
    }
  })
  .catch(err => console.warn("Aviso: No se pudo cargar la capa 0 de AutoCAD.", err));

// Cargar Capa UPZ de AutoCAD (Para modo MICRO)
fetch('upz.geojson') 
  .then(r => {
    if (!r.ok) throw new Error("Archivo upz.geojson no encontrado");
    return r.json();
  })
  .then(data => {
    // Valores por defecto: ajusta estos parámetros según la ubicación real de tu CAD
    const latOffset = 0.0283; 
    const lngOffset = -0.1440; 
    const scale = 1.0; 
    const centerLat = 4.60;  
    const centerLng = -74.08; 

    capaUpzLayer = L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "#46d6d0", // Turquesa para la capa de detalle
          weight: 1.5,
          opacity: 0.8
        };
      },
      interactive: false,
      coordsToLatLng: function (coords) {
        return new L.LatLng(
          centerLat + ((coords[1] - centerLat) * scale) + latOffset,
          centerLng + ((coords[0] - centerLng) * scale) + lngOffset
        );
      }
    });

    if (currentMode === 'tecnologico' || currentMode === 'metaverso') {
      capaUpzLayer.addTo(map);
    }
  })
  .catch(err => console.warn("Aviso: No se pudo cargar la capa UPZ de AutoCAD.", err));
// --------------------------------------------------------------------------

function renderItemList() {
  const container = document.getElementById('item-list');
  container.innerHTML = '';
  
  if (currentMode === 'natural') {
    humedales.forEach(h => {
      const div = document.createElement('div');
      div.className = 'upz-item humedal-card' + (currentSelection?.id === h.id ? ' active' : '');
      div.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <strong style="color: #46d6d0; font-size: 11px;">${h.nombre}</strong>
          <div style="font-size: 9px; color: #aab2bc;">
            <div>Ubicación: ${h.lat.toFixed(4)}, ${h.lng.toFixed(4)}</div>
            <div>Área: ${h.area} ha</div>
          </div>
        </div>
      `;
      div.onclick = () => selectHumedal(h);
      container.appendChild(div);
    });
  } else if (currentMode === 'cultural') {
    barrosData.forEach(barrio => {
      const div = document.createElement('div');
      div.className = 'upz-item' + (currentSelection?.id === barrio.id ? ' active' : '');
      div.innerHTML = `${barrio.codigo} - ${barrio.nombre}`;
      div.onclick = () => selectBarrio(barrio);
      container.appendChild(div);
    });
  } else if (currentMode === 'tecnologico') {
    upzData.forEach(upz => {
      const div = document.createElement('div');
      div.className = 'upz-item' + (currentSelection?.id === upz.id ? ' active' : '');
      div.innerHTML = `${upz.uplcodigo}`;
      div.onclick = () => selectUPZ(upz);
      container.appendChild(div);
    });
  } else if (currentMode === 'metaverso') {
    const div = document.createElement('div');
    div.className = 'upz-item active';
    div.innerHTML = '<strong>Modelo digital integrado</strong><br><span style="font-size:9px;color:#aab2bc;">Capas Natural, Cultural y Tecnológica superpuestas</span>';
    container.appendChild(div);
  }
}

function selectUPZ(upz) {
  currentSelection = upz;
  document.getElementById('detail-title').textContent = `UPZ SELECCIONADA: ${upz.uplcodigo.toUpperCase()}`;
  document.getElementById('detail-description').innerHTML = `
    <p><strong>${upz.nombre}</strong></p>
    <p>Zona de Planeamiento de Bogotá</p>
  `;
  renderItemList();
}

function selectBarrio(barrio) {
  currentSelection = barrio;
  document.getElementById('detail-title').textContent = `${barrio.nombre.toUpperCase()}`;
  document.getElementById('detail-description').innerHTML = `
    <p><strong>${barrio.nombre}</strong></p>
    <p style="margin-top: 10px;">Barrio de Bogotá</p>
    <p style="font-size: 9px; color: #aab2bc; margin-top: 8px;">Código: ${barrio.codigo}</p>
  `;
  renderItemList();
}

function showEepNetwork() {
  Object.values(eepLayers).forEach(layer => {
    try { map.removeLayer(layer); } catch(e) {}
  });
  eepLayers = {};
  
  if (eepNodos.length === 0) return;
  
  const conexiones = [
    {from: 'h1', to: 'rio', tipo: 'directa'},
    {from: 'h1', to: 'ce', tipo: 'directa'},
    {from: 'h1', to: 'qb', tipo: 'indirecta'},
    {from: 'h1', to: 'ap', tipo: 'indirecta'},
    {from: 'rio', to: 'corr', tipo: 'directa'},
    {from: 'rio', to: 'ec', tipo: 'indirecta'},
    {from: 'ce', to: 'cp', tipo: 'directa'},
    {from: 'ce', to: 'rf', tipo: 'directa'},
    {from: 'qb', to: 'ru', tipo: 'indirecta'},
    {from: 'qb', to: 'pb', tipo: 'indirecta'},
    {from: 'ap', to: 'rf', tipo: 'directa'},
    {from: 'cm', to: 'cv', tipo: 'indirecta'}
  ];
  
  conexiones.forEach(conn => {
    const nodoFrom = eepNodos.find(n => n.properties.id === conn.from);
    const nodoTo = eepNodos.find(n => n.properties.id === conn.to);
    
    if (nodoFrom && nodoTo) {
      const coords = nodoFrom.geometry.coordinates;
      const coordsTo = nodoTo.geometry.coordinates;
      const dashArray = conn.tipo === 'indirecta' ? '5, 3' : '0';
      const lineColor = conn.tipo === 'indirecta' ? '#e89a6c' : '#46d6d0';
      
      const line = L.polyline([
        [coords[1], coords[0]],
        [coordsTo[1], coordsTo[0]]
      ], {
        color: lineColor,
        weight: 2,
        opacity: 0.7,
        dashArray: dashArray
      }).addTo(map);
      
      eepLayers['conn_' + conn.from + '_' + conn.to] = line;
    }
  });
  
  eepNodos.forEach(nodo => {
    const coords = nodo.geometry.coordinates;
    const props = nodo.properties;
    
    let radius = 15;
    if (props.tipo === 'nodo_secundario') radius = 10;
    if (props.tipo === 'nodo_terciario') radius = 7;
    
    const circle = L.circleMarker([coords[1], coords[0]], {
      radius: radius,
      fillColor: '#46d6d0',
      color: '#0a0a0a',
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.8
    })
    .bindPopup(`<strong>${props.nombre}</strong>`)
    .addTo(map);
    
    eepLayers['nodo_' + props.id] = circle;
    
    const labelDiv = L.divIcon({
      html: `<div style="font-size: 7px; color: #fff; text-align: center; font-weight: 600; text-shadow: 0 0 3px rgba(0,0,0,0.8); width: 50px;">${props.nombre}</div>`,
      className: 'eep-label',
      iconSize: [50, 16],
      iconAnchor: [25, 8]
    });
    
    const label = L.marker([coords[1], coords[0]], { icon: labelDiv, interactive: false }).addTo(map);
    eepLayers['label_' + props.id] = label;
  });
}

function selectHumedal(h) {
  currentSelection = h;
  networkLines.forEach(line => { try { map.removeLayer(line); } catch (e) {} });
  networkLines = [];
  
  map.setView([h.lat, h.lng], 13);
  openEepModal(h);
  
  document.getElementById('detail-title').textContent = `HUMEDAL SELECCIONADO: ${h.nombre.toUpperCase()}`;
  document.getElementById('detail-description').innerHTML = `
    <p><strong>Estructura Ecológica Principal (EEP)</strong></p>
    <p>La EEP es la integración de áreas de origen natural que tienen una oferta ambiental significativa, es ordenadora del territorio y garante de los equilibrios ecosistémicos, del agua y la riqueza hídrica.</p>
    <p><strong>Relación Cuerpo Hídrico - Verde - Ecosistemas:</strong></p>
    <p>Los humedales son elementos clave de la EEP. Regulan el ciclo del agua, proveen hábitat para fauna silvestre y flora nativa, actúan como corredores ecológicos y mitigar el riesgo climático.</p>
    <p style="font-size: 9px; color: #aab2bc; margin-top: 8px;">📍 ${h.lat.toFixed(4)}, ${h.lng.toFixed(4)}<br/>📏 Área: ${h.area} ha</p>
    <p style="font-size: 8px; color: #aab2bc;">POT Bogotá Reverdece 2022-2035</p>
    <p style="margin-top: 10px; font-size: 9px;"><strong>Relaciones en la red EEP:</strong></p>
    <p style="font-size: 8px;">— Línea sólida teal = Relación directa<br/>— Línea punteada naranja = Relación indirecta</p>
  `;
  renderItemList();
}

function openEepModal(humedal) {
  const modal = document.getElementById('eepModal');
  if (!modal) return;
  modal.style.display = 'block';
  
  setTimeout(() => {
    const container = document.getElementById('eepMapContainer');
    if (!container) return;
    
    container.innerHTML = '';
    const miniMap = L.map(container, {
      zoomControl: true,
      attributionControl: true
    }).setView([4.63, -74.15], 12);
    
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: '© CartoDB',
      maxZoom: 19
    }).addTo(miniMap);
    
    if (eepNodos.length > 0) {
      const conexiones = [
        {from: 'h1', to: 'rio', tipo: 'directa'},
        {from: 'h1', to: 'ce', tipo: 'directa'},
        {from: 'h1', to: 'qb', tipo: 'indirecta'},
        {from: 'h1', to: 'ap', tipo: 'indirecta'},
        {from: 'rio', to: 'corr', tipo: 'directa'},
        {from: 'rio', to: 'ec', tipo: 'indirecta'},
        {from: 'ce', to: 'cp', tipo: 'directa'},
        {from: 'ce', to: 'rf', tipo: 'directa'},
        {from: 'qb', to: 'ru', tipo: 'indirecta'},
        {from: 'qb', to: 'pb', tipo: 'indirecta'},
        {from: 'ap', to: 'rf', tipo: 'directa'},
        {from: 'cm', to: 'cv', tipo: 'indirecta'}
      ];
      
      conexiones.forEach(conn => {
        const nodoFrom = eepNodos.find(n => n.properties.id === conn.from);
        const nodoTo = eepNodos.find(n => n.properties.id === conn.to);
        
        if (nodoFrom && nodoTo) {
          const coords = nodoFrom.geometry.coordinates;
          const coordsTo = nodoTo.geometry.coordinates;
          const dashArray = conn.tipo === 'indirecta' ? '5, 3' : '0';
          const lineColor = conn.tipo === 'indirecta' ? '#e89a6c' : '#46d6d0';
          
          L.polyline([
            [coords[1], coords[0]],
            [coordsTo[1], coordsTo[0]]
          ], {
            color: lineColor,
            weight: 2,
            opacity: 0.7,
            dashArray: dashArray
          }).addTo(miniMap);
        }
      });
      
      eepNodos.forEach(nodo => {
        const coords = nodo.geometry.coordinates;
        const props = nodo.properties;
        let radius = 15;
        if (props.tipo === 'nodo_secundario') radius = 10;
        if (props.tipo === 'nodo_terciario') radius = 7;
        
        L.circleMarker([coords[1], coords[0]], {
          radius: radius,
          fillColor: '#46d6d0',
          color: '#0a0a0a',
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.8
        })
        .bindPopup(`<strong>${props.nombre}</strong>`)
        .addTo(miniMap);
        
        const labelDiv = L.divIcon({
          html: `<div style="font-size: 7px; color: #fff; text-align: center; font-weight: 600; text-shadow: 0 0 3px rgba(0,0,0,0.8); width: 50px;">${props.nombre}</div>`,
          className: 'eep-label',
          iconSize: [50, 16],
          iconAnchor: [25, 8]
        });
        
        L.marker([coords[1], coords[0]], { icon: labelDiv, interactive: false }).addTo(miniMap);
      });
    }
    miniMap.invalidateSize();
  }, 100);
}

function closeEepModal() {
  const modal = document.getElementById('eepModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', function(e) {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const scale = this.dataset.scale;
    
    // LIMPIEZA ADICIONAL: Quitar vías si cambiamos de escala
    if (viasLayer) {
      try { map.removeLayer(viasLayer); } catch(e) {}
    }

    // LIMPIEZA ADICIONAL: Quitar la Capa 0 si cambiamos de escala
    if (capa0Layer) {
      try { map.removeLayer(capa0Layer); } catch(e) {}
    }

    // LIMPIEZA ADICIONAL: Quitar la Capa UPZ si cambiamos de escala
    if (capaUpzLayer) {
      try { map.removeLayer(capaUpzLayer); } catch(e) {}
    }
    
    Object.values(humedalLayers).forEach(layer => {
      try { map.removeLayer(layer); } catch(e) {}
    });
    Object.values(humedalMarkers).forEach(marker => {
      try { map.removeLayer(marker); } catch(e) {}
    });
    networkLines.forEach(line => {
      try { map.removeLayer(line); } catch(e) {}
    });
    Object.values(eepLayers).forEach(layer => {
      try { map.removeLayer(layer); } catch(e) {}
    });
    networkLines = [];
    eepLayers = {};
    clearScaleNetwork();
    
    if (scale === 'natural') {
      currentMode = 'natural';
      map.setView([4.63, -74.15], 12);
      if (capaUpzLayer) capaUpzLayer.addTo(map);
      humedales.forEach(h => {
        const circle = L.circle([h.lat, h.lng], {
          radius: 1500,
          color: '#4ade80',
          weight: 2,
          opacity: 0.8,
          fillColor: '#4ade80',
          fillOpacity: 0.3
        }).on('click', () => selectHumedal(h)).addTo(map);
        humedalLayers[h.id] = circle;
        const marker = L.circleMarker([h.lat, h.lng], {
          radius: 8,
          fillColor: '#4ade80',
          color: '#2d8a5f',
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.7
        }).on('click', () => selectHumedal(h)).addTo(map);
        humedalMarkers[h.id] = marker;
      });
      const group = new L.featureGroup(Object.values(humedalLayers));
      if (Object.keys(humedalLayers).length) map.fitBounds(group.getBounds().pad(0.2));
    } else if (scale === 'cultural') {
      currentMode = 'cultural';
      map.setView([4.60, -74.08], 12);
      if (capa0Layer) capa0Layer.addTo(map);
    } else if (scale === 'tecnologico') {
      currentMode = 'tecnologico';
      map.setView([4.60, -74.08], 11);
      if (viasLayer) viasLayer.addTo(map);
    } else if (scale === 'metaverso') {
      currentMode = 'metaverso';
      map.setView([4.60, -74.08], 11);
      if (viasLayer) viasLayer.addTo(map);
      if (capa0Layer) capa0Layer.addTo(map);
      if (capaUpzLayer) capaUpzLayer.addTo(map);
      humedales.forEach(h => {
        const marker = L.circleMarker([h.lat, h.lng], {
          radius: 7,
          fillColor: '#4ade80',
          color: '#2d8a5f',
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.7
        }).on('click', () => selectHumedal(h)).addTo(map);
        humedalMarkers[h.id] = marker;
      });
    }
    
    renderItemList();
    openScaleNetworkModal(scale);
  });
});

/* ========================================================================
   REDES MULTIESCALA · renderizador visual común del Módulo 05
   ======================================================================== */
const scaleNetworkLayers = [];

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

function clearScaleNetwork() {
  scaleNetworkLayers.forEach(layer => {
    try { map.removeLayer(layer); } catch (e) {}
  });
  scaleNetworkLayers.length = 0;
}

function networkLabel(label) {
  const words = label.split(' ');
  const lines = [];
  let line = '';
  words.forEach(word => {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > 14 && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 3).join('<br>');
}

function networkArrow(from, to, color, type) {
  const mid = [(from.lat + to.lat) / 2, (from.lng + to.lng) / 2];
  const angle = Math.atan2(to.lat - from.lat, to.lng - from.lng) * 180 / Math.PI;
  const arrow = L.marker(mid, {
    interactive: false,
    icon: L.divIcon({
      className: 'scale-network-arrow',
      html: `<span style="color:${color}; transform:rotate(${angle}deg)">${type === 'indirecta' ? '◇' : '➤'}</span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    })
  }).addTo(map);
  scaleNetworkLayers.push(arrow);
}

function showScaleNetwork(mode) {
  clearScaleNetwork();
  const definition = scaleNetworks[mode];
  if (!definition) return;
  const centerLat = definition.nodes.reduce((sum, node) => sum + node.lat, 0) / definition.nodes.length;
  const centerLng = definition.nodes.reduce((sum, node) => sum + node.lng, 0) / definition.nodes.length;
  const spreadFactor = 2.15;
  const nodes = Object.fromEntries(definition.nodes.map(node => [node.id, {
    ...node,
    lat: centerLat + (node.lat - centerLat) * spreadFactor,
    lng: centerLng + (node.lng - centerLng) * spreadFactor
  }]));

  definition.edges.forEach(([fromId, toId, type]) => {
    const from = nodes[fromId];
    const to = nodes[toId];
    if (!from || !to) return;
    const color = type === 'indirecta' ? '#e89a6c' : definition.accent;
    const line = L.polyline([[from.lat, from.lng], [to.lat, to.lng]], {
      color,
      weight: type === 'indirecta' ? 1.4 : 2.2,
      opacity: type === 'indirecta' ? 0.72 : 0.9,
      dashArray: type === 'indirecta' ? '6, 6' : null,
      interactive: false
    }).addTo(map);
    scaleNetworkLayers.push(line);
    networkArrow(from, to, color, type);
  });

  definition.nodes.forEach(node => {
    const size = node.hub ? 84 : 54;
    const marker = L.marker([node.lat, node.lng], {
      icon: L.divIcon({
        className: 'scale-network-node-wrap',
        html: `<div class="scale-network-node ${node.hub ? 'hub' : ''}" style="--node-accent:${definition.accent};--node-size:${size}px"><span>${networkLabel(node.label)}</span></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      })
    }).bindPopup(`<strong>${node.label}</strong><br><span>${definition.title}</span>`).addTo(map);
    scaleNetworkLayers.push(marker);
  });

  const networkBounds = L.latLngBounds(Object.values(nodes).map(node => [node.lat, node.lng]));
  if (networkBounds.isValid()) {
    map.fitBounds(networkBounds.pad(0.10), { maxZoom: 12, animate: false });
  }
}

// Las redes se muestran únicamente al pulsar una escala y viven dentro del pop-up.


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
