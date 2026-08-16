let upzData = [];
let barrios Data = [];
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
let barrios Layers = {};
let barrio Labels = {};
let humedalLayers = {};
let humedalMarkers = {};
let eepNodos = [];
let eepLayers = {};
let networkLines = [];
let currentMode = 'meso';

// Cargar UPZ (MACRO)
fetch('upz_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    upzData = data.features.map(f => f.properties);
    
    data.features.forEach((feature, idx) => {
      const props = feature.properties;
      const code = props.uplcodigo.split('UPZ')[1]?.trim() || props.id;
      
      const coords = feature.geometry.coordinates;
      
      const labelDiv = L.divIcon({
        html: `<div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: transparent; color: #2fd4c8; font-weight: 700; font-size: 9px; border: 1.5px solid #2fd4c8; border-radius: 50%; text-shadow: 0 0 6px rgba(0,0,0,0.8);">${code}</div>`,
        className: 'upz-label-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      const marker = L.marker([coords[1], coords[0]], { icon: labelDiv, interactive: false });
      upzLabels[props.id] = marker;
    });
    
    renderItemList();
  });

// Cargar Barrios (MESO)
fetch('barrios_bogota.geojson')
  .then(r => r.json())
  .then(data => {
    barrios Data = data.features.map(f => f.properties);
    
    data.features.forEach((feature, idx) => {
      const props = feature.properties;
      const coords = feature.geometry.coordinates;
      
      const labelDiv = L.divIcon({
        html: `<div style="width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; background: transparent; color: #2fd4c8; font-weight: 700; font-size: 7px; border: 1px solid #2fd4c8; border-radius: 50%; text-shadow: 0 0 4px rgba(0,0,0,0.8);">${props.codigo}</div>`,
        className: 'barrio-label-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      
      const marker = L.marker([coords[1], coords[0]], { icon: labelDiv, interactive: false });
      barrio Labels[props.id] = marker;
    });
  });

// Cargar nodos de la red EEP
fetch('red_eep.geojson')
  .then(r => r.json())
  .then(data => {
    eepNodos = data.features;
  });

function renderItemList() {
  const container = document.getElementById('item-list');
  container.innerHTML = '';
  
  if (currentMode === 'macro') {
    upzData.forEach(upz => {
      const div = document.createElement('div');
      div.className = 'upz-item' + (currentSelection?.id === upz.id ? ' active' : '');
      div.innerHTML = `${upz.uplcodigo}`;
      div.onclick = () => selectUPZ(upz);
      container.appendChild(div);
    });
  } else if (currentMode === 'meso') {
    barrios Data.forEach(barrio => {
      const div = document.createElement('div');
      div.className = 'upz-item' + (currentSelection?.id === barrio.id ? ' active' : '');
      div.innerHTML = `${barrio.codigo} - ${barrio.nombre}`;
      div.onclick = () => selectBarrio(barrio);
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
    <p style="font-size: 9px; color: #7a8fa0; margin-top: 8px;">Código: ${barrio.codigo}</p>
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
      const lineColor = conn.tipo === 'indirecta' ? '#ff9552' : '#2fd4c8';
      
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
  openEepModal(h);
  
  document.getElementById('detail-title').textContent = `HUMEDAL SELECCIONADO: ${h.nombre.toUpperCase()}`;
  
  document.getElementById('detail-description').innerHTML = `
    <p><strong>Estructura Ecológica Principal (EEP)</strong></p>
    <p>La EEP es la integración de áreas de origen natural que tienen una oferta ambiental significativa, es ordenadora del territorio y garante de los equilibrios ecosistémicos, del agua y la riqueza hídrica.</p>
    <p><strong>Relación Cuerpo Hídrico - Verde - Ecosistemas:</strong></p>
    <p>Los humedales son elementos clave de la EEP. Regulan el ciclo del agua, proveen hábitat para fauna silvestre y flora nativa, actúan como corredores ecológicos y mitigar el riesgo climático.</p>
    <p style="font-size: 9px; color: #7a8fa0; margin-top: 8px;">📍 ${h.lat.toFixed(4)}, ${h.lng.toFixed(4)}<br/>📏 Área: ${h.area} ha</p>
    <p style="font-size: 8px; color: #7a8fa0;">POT Bogotá Reverdece 2022-2035</p>
    <p style="margin-top: 10px; font-size: 9px;"><strong>Relaciones en la red EEP:</strong></p>
    <p style="font-size: 8px;">— Línea sólida teal = Relación directa<br/>— Línea punteada naranja = Relación indirecta</p>
  `;
  
  renderItemList();
}

function openEepModal(humedal) {
  const modal = document.getElementById('eepModal');
  if (!modal) return;
  
  modal.style.display = 'block';
  
  // Esperar a que el DOM se renderice
  setTimeout(() => {
    const container = document.getElementById('eepMapContainer');
    if (!container) return;
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Crear mini-mapa
    const miniMap = L.map(container, {
      zoomControl: true,
      attributionControl: true
    }).setView([4.63, -74.15], 12);
    
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
      attribution: '© CartoDB',
      maxZoom: 19
    }).addTo(miniMap);
    
    // Dibujar red EEP en el mini-mapa
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
          const lineColor = conn.tipo === 'indirecta' ? '#ff9552' : '#2fd4c8';
          
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
          fillColor: '#2fd4c8',
          color: '#0a0e17',
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
    
    // Ajustar tamaño del mapa
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
    
    Object.values(barrio Labels).forEach(marker => {
      try { map.removeLayer(marker); } catch(e) {}
    });
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
      Object.values(upzLabels).forEach(marker => marker.addTo(map));
    } else if (scale === 'meso') {
      currentMode = 'meso';
      map.setView([4.60, -74.08], 12);
      Object.values(barrio Labels).forEach(marker => marker.addTo(map));
      Object.values(upzLabels).forEach(marker => {
        try { map.removeLayer(marker); } catch(e) {}
      });
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
