let upzData = [];
let currentSelection = null;
const humedales = [
  {id: 'h1', nombre: "Humedal Burro", lat: 4.644296801427965, lng: -74.15052710000018, area: 18.5},
  {id: 'h2', nombre: "Humedal El Techo", lat: 4.645366863767807, lng: -74.14136322378499, area: 32.2},
  {id: 'h3', nombre: "Humedal Vaca", lat: 4.627282592850425, lng: -74.15947984079249, area: 24.8},
];

// Inicializar mapa oscuro
const map = L.map('map').setView([4.60, -74.08], 11);

// Mapa oscuro personalizado
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '© CartoDB',
  maxZoom: 19
}).addTo(map);

let upzLayers = {};
let upzLabels = {};
let humedalLayers = {};
let humedalMarkers = {};
let networkLines = [];
let currentMode = 'meso';

// Cargar UPL
fetch('upz_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    upzData = data.features.map(f => f.properties);
    
    data.features.forEach((feature, idx) => {
      const props = feature.properties;
      const code = props.uplcodigo.split('UPZ')[1]?.trim() || props.id;
      
      // Layer para polígono
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
      
      // Agregar número en centro
      const bounds = layer.getBounds();
      const center = bounds.getCenter();
      
      const labelDiv = L.divIcon({
        html: `<div style="
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #2fd4c8;
          font-weight: 700;
          font-size: 16px;
          border: 2px solid #2fd4c8;
          border-radius: 50%;
          text-shadow: 0 0 6px rgba(0,0,0,0.8);
        ">${code}</div>`,
        className: 'upz-label-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      
      const marker = L.marker(center, { icon: labelDiv, interactive: false }).addTo(map);
      upzLabels[props.id] = marker;
    });
    
    // Crear humedales
    humedales.forEach(h => {
      // Polígono del humedal (círculo)
      const humedalCircle = L.circle([h.lat, h.lng], {
        radius: 1500, // metros
        color: '#4ade80',
        weight: 2,
        opacity: 0.8,
        fillColor: '#4ade80',
        fillOpacity: 0.3
      })
      .bindPopup(`<strong>${h.nombre}</strong><br>${h.area} ha`)
      .on('click', () => selectHumedal(h));
      
      humedalLayers[h.id] = humedalCircle;
      humedalCircle.addTo(map);
      
      // Marcador
      const marker = L.circleMarker([h.lat, h.lng], {
        radius: 8,
        fillColor: '#4ade80',
        color: '#2d8a5f',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.7
      })
      .on('click', () => selectHumedal(h));
      
      humedalMarkers[h.id] = marker;
    });
    
    renderItemList();
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
      div.className = 'upz-item' + (currentSelection?.id === h.id ? ' active' : '');
      div.innerHTML = `${h.nombre} (${h.area} ha)`;
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
    <p><strong>Estrategia Bogotá Viva</strong></p>
  `;
  
  renderItemList();
}

function selectHumedal(h) {
  currentSelection = h;
  
  // Limpiar red anterior
  networkLines.forEach(line => map.removeLayer(line));
  networkLines = [];
  
  // Zoom al humedal
  map.setView([h.lat, h.lng], 13);
  
  // Dibujar red de conectividad entre humedales
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
  
  document.getElementById('detail-title').textContent = `HUMEDAL SELECCIONADO: ${h.nombre.toUpperCase()}`;
  
  document.getElementById('detail-description').innerHTML = `
    <p><strong>Área:</strong> ${h.area} hectáreas</p>
    <p>Red de conectividad ecológica de la EEP. Los humedales son espacios de biodiversidad, regulación hídrica y corredores de fauna silvestre.</p>
    <p><strong>Protección EEP - Estructura Ecológica Principal</strong></p>
  `;
  
  renderItemList();
}

// Tabs
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', function(e) {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const scale = this.dataset.scale;
    
    // Limpiar layers previos
    Object.values(humedalLayers).forEach(layer => map.removeLayer(layer));
    Object.values(humedalMarkers).forEach(marker => {
      try { map.removeLayer(marker); } catch(e) {}
    });
    networkLines.forEach(line => map.removeLayer(line));
    networkLines = [];
    
    if (scale === 'macro') {
      currentMode = 'macro';
      map.setView([4.60, -74.08], 10);
    } else if (scale === 'meso') {
      currentMode = 'meso';
      map.setView([4.60, -74.08], 11);
    } else if (scale === 'micro') {
      currentMode = 'micro';
      
      // Mostrar humedales
      Object.values(humedalLayers).forEach(layer => layer.addTo(map));
      Object.values(humedalMarkers).forEach(marker => marker.addTo(map));
      
      // Zoom a humedales
      const group = new L.featureGroup(Object.values(humedalLayers));
      map.fitBounds(group.getBounds().pad(0.2));
    }
    
    renderItemList();
  });
});
