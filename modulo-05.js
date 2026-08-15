let upzData = [];
let currentSelection = null;
const humedales = [
  {id: 'h1', nombre: "Humedal Burro", lat: 4.644296801427965, lng: -74.15052710000018, area: 18.5},
  {id: 'h2', nombre: "Humedal El Techo", lat: 4.645366863767807, lng: -74.14136322378499, area: 32.2},
  {id: 'h3', nombre: "Humedal Vaca", lat: 4.627282592850425, lng: -74.15947984079249, area: 24.8},
];

const map = L.map('map').setView([4.60, -74.08], 11);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '© CartoDB',
  maxZoom: 19
}).addTo(map);

let upzLayers = {};
let upzLabels = {};
let humedalLayers = {};
let humedalMarkers = {};
let areaActiviadLayers = {};
let eepNodos = [];
let eepLayers = {};
let networkLines = [];
let currentMode = 'meso';
let areasActiviadVisible = false;
let tratamientosVisible = false;
let conectoresVisible = false;
let manzanasVisible = false;
let movilidadVisible = false;
let distritosVisible = false;

// Cargar UPL
fetch('upz_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    upzData = data.features.map(f => f.properties);
    
    data.features.forEach((feature, idx) => {
      const props = feature.properties;
      const code = props.uplcodigo.split('UPZ')[1]?.trim() || props.id;
      
      const layer = L.geoJSON(feature, {
        style: {
          color: '#2fd4c8',
          weight: 2,
          opacity: 0.7,
          fillColor: '#0a0e17',
          fillOpacity: 0.2
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => selectUPZ(props));
        }
      }).addTo(map);
      
      upzLayers[props.id] = layer;
      
      const bounds = layer.getBounds();
      const center = bounds.getCenter();
      
      const labelDiv = L.divIcon({
        html: `<div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: transparent; color: #2fd4c8; font-weight: 700; font-size: 16px; border: 2px solid #2fd4c8; border-radius: 50%; text-shadow: 0 0 6px rgba(0,0,0,0.8);">${code}</div>`,
        className: 'upz-label-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      
      const marker = L.marker(center, { icon: labelDiv, interactive: false }).addTo(map);
      upzLabels[props.id] = marker;
    });
    
    renderItemList();
  });

// Cargar nodos de la red EEP
fetch('red_eep.geojson')
  .then(r => r.json())
  .then(data => {
    eepNodos = data.features;
  });

// Cargar Áreas de Actividad
fetch('areas_actividad.geojson')
  .then(r => r.json())
  .then(data => {
    data.features.forEach(feature => {
      const layer = L.geoJSON(feature, {
        style: {
          color: feature.properties.color,
          weight: 2,
          opacity: 0.8,
          fillColor: feature.properties.color,
          fillOpacity: 0.5
        }
      });
      areaActiviadLayers['aa_' + feature.properties.id] = layer;
    });
  });

// Cargar Tratamientos Urbanísticos
fetch('tratamientos_urbanisticos.geojson')
  .then(r => r.json())
  .then(data => {
    data.features.forEach(feature => {
      const layer = L.geoJSON(feature, {
        style: {
          color: feature.properties.color,
          weight: 2,
          opacity: 0.8,
          fillColor: feature.properties.color,
          fillOpacity: 0.4
        }
      });
      areaActiviadLayers['tu_' + feature.properties.id] = layer;
    });
  });

// Cargar Conectores Ecosistémicos
fetch('conectores_ecosistemicos.geojson')
  .then(r => r.json())
  .then(data => {
    data.features.forEach(feature => {
      let layer;
      
      if (feature.geometry.type === 'LineString') {
        layer = L.geoJSON(feature, {
          style: {
            color: feature.properties.color,
            weight: 3,
            opacity: 0.7,
            dashArray: '5, 3'
          }
        });
      } else {
        layer = L.geoJSON(feature, {
          style: {
            color: feature.properties.color,
            weight: 2,
            opacity: 0.6,
            fillColor: feature.properties.color,
            fillOpacity: 0.2
          }
        });
      }
      
      areaActiviadLayers['ce_' + feature.properties.id] = layer;
    });
  });

// Cargar Manzanas del Cuidado
fetch('manzanas_cuidado.geojson')
  .then(r => r.json())
  .then(data => {
    data.features.forEach(feature => {
      const props = feature.properties;
      const layer = L.geoJSON(feature, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 7,
            fillColor: props.color,
            color: props.estado === 'proyectada' ? '#2fd4c8' : '#4ade80',
            weight: props.estado === 'proyectada' ? 2 : 1.5,
            opacity: props.estado === 'proyectada' ? 0.6 : 0.9,
            fillOpacity: props.estado === 'proyectada' ? 0.5 : 0.8
          });
        }
      }).bindPopup(`<strong>${props.nombre}</strong><br/>Estado: ${props.estado}`);
      
      areaActiviadLayers['mc_' + feature.properties.id] = layer;
    });
  });

// Cargar Sistema de Movilidad
fetch('sistema_movilidad.geojson')
  .then(r => r.json())
  .then(data => {
    data.features.forEach(feature => {
      const props = feature.properties;
      let style = {
        color: props.color,
        weight: 3,
        opacity: 0.7
      };
      
      if (props.tipo === 'Cable Aéreo') {
        style.dashArray = '5, 3';
      } else if (props.tipo === 'BRT') {
        style.weight = 4;
      } else if (props.tipo === 'Vía Arterial') {
        style.weight = 2;
        style.opacity = 0.5;
      }
      
      const layer = L.geoJSON(feature, {
        style: style
      }).bindPopup(`<strong>${props.nombre}</strong><br/>Tipo: ${props.tipo}`);
      
      areaActiviadLayers['sm_' + feature.properties.id] = layer;
    });
  });

// Cargar Distritos Creativos
fetch('distritos_creativos.geojson')
  .then(r => r.json())
  .then(data => {
    data.features.forEach(feature => {
      const props = feature.properties;
      const layer = L.geoJSON(feature, {
        style: {
          color: props.color,
          weight: 2,
          opacity: 0.8,
          fillColor: props.color,
          fillOpacity: 0.4
        }
      }).bindPopup(`<strong>${props.nombre}</strong><br/>Tipo: ${props.tipo}`);
      
      areaActiviadLayers['dc_' + feature.properties.id] = layer;
    });
  });

function renderItemList() {
  const container = document.getElementById('item-list');
  container.innerHTML = '';
  
  if (currentMode === 'meso') {
    upzData.forEach(upz => {
      const div = document.createElement('div');
      div.className = 'upz-item' + (currentSelection?.id === upz.id ? ' active' : '');
      div.innerHTML = `${upz.uplcodigo}`;
      div.onclick = () => selectUPZ(upz);
      container.appendChild(div);
    });
  } else if (currentMode === 'micro') {
    humedales.forEach(h => {
      const div = document.createElement('div');
      div.className = 'upz-item humedal-card' + (currentSelection?.id === h.id ? ' active' : '');
      div.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <strong style="color: #2fd4c8; font-size: 11px;">${h.nombre}</strong>
          <div style="font-size: 9px; color: #7a8fa0;">
            <div>📍 ${h.lat.toFixed(4)}, ${h.lng.toFixed(4)}</div>
            <div>📏 Área: ${h.area} ha</div>
          </div>
        </div>
      `;
      div.onclick = () => selectHumedal(h);
      container.appendChild(div);
    });
  }
}

function selectUPZ(upz) {
  currentSelection = upz;
  
  if (upzLayers[upz.id]) {
    const bounds = upzLayers[upz.id].getBounds();
    map.fitBounds(bounds);
    upzLayers[upz.id].setStyle({ fillOpacity: 0.4 });
  }
  
  const code = upz.uplcodigo.replace('UPZ', '').trim();
  document.getElementById('detail-title').textContent = `UPL SELECCIONADA: ${code} · ${upz.nombre.toUpperCase()}`;
  
  document.getElementById('detail-description').innerHTML = `
    <p>La escala Meso (33 UPL) es el corazón del proyecto. Es aquí donde se gestiona la proximidad para lograr la ciudad de los 30 minutos <span style="font-size: 8px; color: #7a8fa0;">[4, 59; 212]</span></p>
    <p><strong>El POT busca:</strong></p>
    <p>Institucionalizar la proximidad para equilibrar las cargas de servicios y empleo en el territorio, permitiendo analizar si la meta de una ciudad de 30 minutos es viable en cada unidad de planeamiento.</p>
    <p><strong>Estrategia Bogotá Viva</strong></p>
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
    ['h1', 'rio'], ['h1', 'ce'], ['h1', 'qb'], ['h1', 'ap'],
    ['rio', 'corr'], ['rio', 'ec'], ['ce', 'cp'], ['ce', 'rf'],
    ['qb', 'ru'], ['qb', 'pb'], ['ap', 'rf'], ['cm', 'cv']
  ];
  
  conexiones.forEach(([from, to]) => {
    const nodoFrom = eepNodos.find(n => n.properties.id === from);
    const nodoTo = eepNodos.find(n => n.properties.id === to);
    
    if (nodoFrom && nodoTo) {
      const coords = nodoFrom.geometry.coordinates;
      const coordsTo = nodoTo.geometry.coordinates;
      
      const line = L.polyline([
        [coords[1], coords[0]],
        [coordsTo[1], coordsTo[0]]
      ], {
        color: '#2fd4c8',
        weight: 1.5,
        opacity: 0.4,
        dashArray: '3, 2'
      }).addTo(map);
      
      eepLayers['conn_' + from + '_' + to] = line;
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
      fillColor: '#2fd4c8',
      color: '#0a0e17',
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.8
    })
    .bindPopup(`<strong>${props.nombre}</strong>`)
    .addTo(map);
    
    eepLayers['nodo_' + props.id] = circle;
    
    const labelDiv = L.divIcon({
      html: `<div style="font-size: 8px; color: #fff; text-align: center; font-weight: 600; text-shadow: 0 0 3px rgba(0,0,0,0.8);">${props.nombre}</div>`,
      className: 'eep-label',
      iconSize: [60, 20],
      iconAnchor: [30, 10]
    });
    
    const label = L.marker([coords[1], coords[0]], { icon: labelDiv, interactive: false }).addTo(map);
    eepLayers['label_' + props.id] = label;
  });
}

function selectHumedal(h) {
  currentSelection = h;
  
  networkLines.forEach(line => map.removeLayer(line));
  networkLines = [];
  
  map.setView([h.lat, h.lng], 13);
  
  humedales.forEach(other => {
    if (other.id !== h.id) {
      const line = L.polyline([
        [h.lat, h.lng],
        [other.lat, other.lng]
      ], {
        color: '#2fd4c8',
        weight: 2,
        opacity: 0.5,
        dashArray: '5, 5'
      }).addTo(map);
      
      networkLines.push(line);
    }
  });
  
  showEepNetwork();
  
  document.getElementById('detail-title').textContent = `HUMEDAL SELECCIONADO: ${h.nombre.toUpperCase()}`;
  
  document.getElementById('detail-description').innerHTML = `
    <p><strong>Estructura Ecológica Principal (EEP)</strong></p>
    <p>La EEP es la integración de áreas de origen natural que tienen una oferta ambiental significativa, es ordenadora del territorio y garante de los equilibrios ecosistémicos, del agua y la riqueza hídrica.</p>
    <p><strong>Relación Cuerpo Hídrico - Verde - Ecosistemas:</strong></p>
    <p>Los humedales son elementos clave de la EEP. Regulan el ciclo del agua, proveen hábitat para fauna silvestre y flora nativa, actúan como corredores ecológicos y mitigar el riesgo climático.</p>
    <p style="font-size: 9px; color: #7a8fa0; margin-top: 8px;">📍 ${h.lat.toFixed(4)}, ${h.lng.toFixed(4)}<br/>📏 Área: ${h.area} ha</p>
    <p style="font-size: 8px; color: #7a8fa0;">POT Bogotá Reverdece 2022-2035</p>
  `;
  
  renderItemList();
}

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', function(e) {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const scale = this.dataset.scale;
    
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
    
    if (scale === 'macro') {
      currentMode = 'macro';
      map.setView([4.60, -74.08], 10);
    } else if (scale === 'meso') {
      currentMode = 'meso';
      map.setView([4.60, -74.08], 11);
    } else if (scale === 'micro') {
      currentMode = 'micro';
      
      humedales.forEach(h => {
        const circle = L.circle([h.lat, h.lng], {
          radius: 1500,
          color: '#4ade80',
          weight: 2,
          opacity: 0.8,
          fillColor: '#4ade80',
          fillOpacity: 0.3
        })
        .on('click', () => selectHumedal(h))
        .addTo(map);
        
        humedalLayers[h.id] = circle;
        
        const marker = L.circleMarker([h.lat, h.lng], {
          radius: 8,
          fillColor: '#4ade80',
          color: '#2d8a5f',
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.7
        })
        .on('click', () => selectHumedal(h))
        .addTo(map);
        
        humedalMarkers[h.id] = marker;
      });
      
      const group = new L.featureGroup(Object.values(humedalLayers));
      map.fitBounds(group.getBounds().pad(0.2));
    }
    
    renderItemList();
  });
});

function toggleAreasActividad() {
  areasActiviadVisible = !areasActiviadVisible;
  Object.keys(areaActiviadLayers).forEach(key => {
    if (key.startsWith('aa_')) {
      const layer = areaActiviadLayers[key];
      if (areasActiviadVisible) {
        layer.addTo(map);
      } else {
        try { map.removeLayer(layer); } catch(e) {}
      }
    }
  });
}

function toggleTratamientos() {
  tratamientosVisible = !tratamientosVisible;
  Object.keys(areaActiviadLayers).forEach(key => {
    if (key.startsWith('tu_')) {
      const layer = areaActiviadLayers[key];
      if (tratamientosVisible) {
        layer.addTo(map);
      } else {
        try { map.removeLayer(layer); } catch(e) {}
      }
    }
  });
}

function toggleConectores() {
  conectoresVisible = !conectoresVisible;
  Object.keys(areaActiviadLayers).forEach(key => {
    if (key.startsWith('ce_')) {
      const layer = areaActiviadLayers[key];
      if (conectoresVisible) {
        layer.addTo(map);
      } else {
        try { map.removeLayer(layer); } catch(e) {}
      }
    }
  });
}

function toggleManzanas() {
  manzanasVisible = !manzanasVisible;
  Object.keys(areaActiviadLayers).forEach(key => {
    if (key.startsWith('mc_')) {
      const layer = areaActiviadLayers[key];
      if (manzanasVisible) {
        layer.addTo(map);
      } else {
        try { map.removeLayer(layer); } catch(e) {}
      }
    }
  });
}

function toggleMovilidad() {
  movilidadVisible = !movilidadVisible;
  Object.keys(areaActiviadLayers).forEach(key => {
    if (key.startsWith('sm_')) {
      const layer = areaActiviadLayers[key];
      if (movilidadVisible) {
        layer.addTo(map);
      } else {
        try { map.removeLayer(layer); } catch(e) {}
      }
    }
  });
}

function toggleDistritos() {
  distritosVisible = !distritosVisible;
  Object.keys(areaActiviadLayers).forEach(key => {
    if (key.startsWith('dc_')) {
      const layer = areaActiviadLayers[key];
      if (distritosVisible) {
        layer.addTo(map);
      } else {
        try { map.removeLayer(layer); } catch(e) {}
      }
    }
  });
}
