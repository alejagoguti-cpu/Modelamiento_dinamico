let upzData = [];
let currentSelection = null;

// Inicializar mapa
const map = L.map('map').setView([4.60, -74.08], 11);

// Mapa colorido OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

let upzLayers = {};

// Cargar UPL
fetch('upz_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    upzData = data.features.map(f => f.properties);
    
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    
    data.features.forEach((feature, idx) => {
      const props = feature.properties;
      const color = colors[idx % colors.length];
      
      const layer = L.geoJSON(feature, {
        style: {
          color: color,
          weight: 2,
          opacity: 0.8,
          fillColor: color,
          fillOpacity: 0.4
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => selectUPZ(props));
          layer.bindPopup(`<strong>${props.nombre}</strong><br>${props.uplcodigo}`);
        }
      }).addTo(map);
      
      upzLayers[props.id] = layer;
    });
    
    renderItemList();
  });

function renderItemList() {
  const container = document.getElementById('item-list');
  container.innerHTML = '';
  
  upzData.forEach(upz => {
    const div = document.createElement('div');
    div.className = 'upz-item' + (currentSelection?.id === upz.id ? ' active' : '');
    div.innerHTML = `${upz.uplcodigo} - ${upz.nombre}`;
    div.onclick = () => selectUPZ(upz);
    container.appendChild(div);
  });
}

function selectUPZ(upz) {
  currentSelection = upz;
  
  if (upzLayers[upz.id]) {
    const bounds = upzLayers[upz.id].getBounds();
    map.fitBounds(bounds);
  }
  
  // Actualizar panel derecho
  const code = upz.uplcodigo.replace('UPZ', '').trim();
  document.getElementById('detail-title').textContent = `UPL SELECCIONADA: ${code} · ${upz.nombre.toUpperCase()}`;
  
  document.getElementById('detail-description').innerHTML = `
    <p>La escala Meso (33 UPL) es el corazón del proyecto. Es aquí donde se gestiona la proximidad para lograr la ciudad de los 15 minutos.</p>
    <p><strong>Estrategia Bogotá Viva</strong></p>
  `;
  
  renderItemList();
}

// Tabs escala
document.querySelectorAll('.scale-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const scale = e.target.dataset.scale;
    
    if (scale === 'macro') {
      map.setView([4.60, -74.08], 10);
    } else if (scale === 'meso') {
      map.setView([4.60, -74.08], 11);
    } else if (scale === 'micro') {
      if (currentSelection) {
        const bounds = upzLayers[currentSelection.id].getBounds();
        map.fitBounds(bounds);
      } else {
        map.setView([4.60, -74.08], 12);
      }
    }
  });
});
