let upzData = [];

// Inicializar mapa
const map = L.map('map').setView([4.60, -74.08], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 19
}).addTo(map);

let upzLayers = {};
let currentSelection = null;

// Cargar UPL
fetch('upz_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    upzData = data.features.map(f => f.properties);
    
    data.features.forEach(feature => {
      const props = feature.properties;
      const code = props.uplcodigo.split('UPZ')[1]?.trim() || props.id;
      
      // Layer para el polígono
      const layer = L.geoJSON(feature, {
        style: {
          color: '#2fd4c8',
          weight: 2,
          opacity: 0.5,
          fillColor: '#0f1419',
          fillOpacity: 0.2
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => selectUPZ(props));
        }
      }).addTo(map);
      
      upzLayers[props.id] = { layer, code };
      
      // Agregar label con número
      const bounds = layer.getBounds();
      const center = bounds.getCenter();
      
      L.marker(center, {
        icon: L.divIcon({
          html: `<div class="upz-label">${code}</div>`,
          className: 'upz-marker',
          iconSize: [40, 40]
        })
      }).addTo(map);
    });
    
    renderItemList();
  });

// Estilo para labels
const style = document.createElement('style');
style.innerHTML = `
  .upz-marker {
    display: grid !important;
    place-items: center !important;
  }
  .upz-label {
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
  }
`;
document.head.appendChild(style);

function renderItemList() {
  const container = document.getElementById('item-list');
  container.innerHTML = '';
  
  upzData.slice(0, 20).forEach(upz => {
    const div = document.createElement('div');
    div.className = 'upz-item' + (currentSelection?.id === upz.id ? ' active' : '');
    div.innerHTML = `
      <strong>${upz.uplcodigo}</strong> - ${upz.nombre}
    `;
    div.onclick = () => selectUPZ(upz);
    container.appendChild(div);
  });
}

function selectUPZ(upz) {
  currentSelection = upz;
  
  // Actualizar mapa
  if (upzLayers[upz.id]) {
    const bounds = upzLayers[upz.id].layer.getBounds();
    map.fitBounds(bounds);
    upzLayers[upz.id].layer.setStyle({ fillOpacity: 0.4 });
  }
  
  // Actualizar panel derecho
  const code = upz.uplcodigo.split('UPZ')[1]?.trim() || upz.id;
  document.getElementById('detail-title').textContent = `UPL SELECCIONADA: ${code} · ${upz.nombre.toUpperCase()}`;
  
  document.getElementById('section-title').textContent = `UPL seleccionada: ${code}`;
  
  renderItemList();
}

// Tabs
document.querySelectorAll('.scale-tab').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.scale-tab').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  });
});
