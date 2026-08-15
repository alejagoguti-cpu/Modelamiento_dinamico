let upzData = [];
let currentSelection = null;

// Inicializar mapa oscuro
const map = L.map('map').setView([4.60, -74.08], 11);

// Mapa oscuro personalizado
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '© CartoDB',
  maxZoom: 19
}).addTo(map);

let upzLayers = {};
let upzLabels = {};
let currentMode = 'meso'; // macro, meso, micro

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
    
    renderItemList();
  });

function renderItemList() {
  const container = document.getElementById('item-list');
  container.innerHTML = '';
  
  upzData.forEach(upz => {
    const div = document.createElement('div');
    div.className = 'upz-item' + (currentSelection?.id === upz.id ? ' active' : '');
    div.innerHTML = `${upz.uplcodigo}`;
    div.onclick = () => selectUPZ(upz);
    container.appendChild(div);
  });
}

function selectUPZ(upz) {
  currentSelection = upz;
  
  if (upzLayers[upz.id]) {
    const bounds = upzLayers[upz.id].getBounds();
    map.fitBounds(bounds);
    upzLayers[upz.id].setStyle({ fillOpacity: 0.4 });
  }
  
  // Actualizar panel derecho
  const code = upz.uplcodigo.replace('UPZ', '').trim();
  document.getElementById('detail-title').textContent = `UPL SELECCIONADA: ${code} · ${upz.nombre.toUpperCase()}`;
  
  document.getElementById('detail-description').innerHTML = `
    <p>La escala Meso (33 UPL) es el corazón del proyecto. Es aquí donde se gestiona la proximidad para lograr la ciudad de los 30 minutos <span style="font-size: 8px; color: #7a8fa0;">[4, 59; 212]</span></p>
    <p><strong>Estrategia Bogotá Viva</strong></p>
  `;
  
  renderItemList();
}

// Tabs
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', function(e) {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const scale = this.dataset.scale;
    
    if (scale === 'macro') {
      currentMode = 'macro';
      map.setView([4.60, -74.08], 10);
    } else if (scale === 'meso') {
      currentMode = 'meso';
      map.setView([4.60, -74.08], 11);
    } else if (scale === 'micro') {
      currentMode = 'micro';
      map.setView([4.60, -74.08], 12);
    }
  });
});
