const potData = {
  structures: [
    {
      id: "eep",
      name: "Sistema Ambiental y EEP",
      color: "#2fd4c8",
      icon: "water",
      components: [
        { id: 1, name: "Río Bogotá", icon: "water" }, { id: 2, name: "Río Tunjuelo", icon: "water" }, { id: 3, name: "Río Cauca", icon: "water" }, { id: 4, name: "Quebrada Chiguaza", icon: "water" }, { id: 5, name: "Quebrada Arzobispo", icon: "water" },
        { id: 6, name: "Quebrada Piedra Negra", icon: "water" }, { id: 7, name: "Humedal Juan Amarillo", icon: "waves" }, { id: 8, name: "Humedal Córdoba", icon: "waves" }, { id: 9, name: "Humedal Torca", icon: "waves" }, { id: 10, name: "Humedal Santa María del Lago", icon: "waves" },
        { id: 11, name: "Laguna Subachoque", icon: "waves" }, { id: 12, name: "Humedal Jaboque", icon: "waves" }, { id: 13, name: "Cerros Orientales", icon: "mountain" }, { id: 14, name: "Cerro Monserrate", icon: "mountain" }, { id: 15, name: "Páramo Sumapaz", icon: "mountain" },
        { id: 16, name: "Páramo Cruz Verde", icon: "mountain" }, { id: 17, name: "Páramo Chingaza", icon: "mountain" }, { id: 18, name: "Serranía Usme", icon: "mountain" }, { id: 19, name: "Loma Coruña", icon: "mountain" }, { id: 20, name: "Loma Espolón", icon: "mountain" },
        { id: 21, name: "Loma Mercedes", icon: "mountain" }, { id: 22, name: "Alto Misericordia", icon: "mountain" }, { id: 23, name: "Serranía Macarena", icon: "mountain" }, { id: 24, name: "Páramo Guasca", icon: "mountain" }, { id: 25, name: "Bosque Bolívar", icon: "tree" },
        { id: 26, name: "Bosque Encenillo", icon: "tree" }, { id: 27, name: "Bosque Roble", icon: "tree" }, { id: 28, name: "Bosque Florida", icon: "tree" }, { id: 29, name: "Bosque Alférez", icon: "tree" }, { id: 30, name: "Bosque San Antonio", icon: "tree" },
        { id: 31, name: "Frailejonales", icon: "leaf" }, { id: 32, name: "Bosques riparios", icon: "leaf" }, { id: 33, name: "Matorrales deciduos", icon: "leaf" }, { id: 34, name: "Pastizales naturales", icon: "leaf" }, { id: 35, name: "Arbustal denso", icon: "leaf" },
        { id: 36, name: "Herbazal húmedo", icon: "leaf" }, { id: 37, name: "Reserva Bosque Oriental", icon: "shield" }, { id: 38, name: "Parque Sumapaz", icon: "shield" }, { id: 39, name: "Parque Chingaza", icon: "shield" }, { id: 40, name: "Santuario Fauna Togüi", icon: "shield" }
      ]
    },
    {
      id: "patrimonio",
      name: "Estructura de Patrimonios",
      color: "#a276f2",
      icon: "landmark",
      components: [
        { id: 101, name: "Catedral Metropolitana", icon: "church" }, { id: 102, name: "Iglesia Candelaria", icon: "church" }, { id: 103, name: "Iglesia Santa Clara", icon: "church" }, { id: 104, name: "Monasterio Teusaquillo", icon: "church" }, { id: 105, name: "Iglesia San Ignacio", icon: "church" },
        { id: 106, name: "Convento Santo Domingo", icon: "church" }, { id: 107, name: "Capilla Sagrario", icon: "church" }, { id: 108, name: "Basílica Voto Nacional", icon: "church" }, { id: 109, name: "Iglesia Lourdes", icon: "church" }, { id: 110, name: "Santuario Monserrate", icon: "church" },
        { id: 111, name: "Museo de Oro", icon: "image" }, { id: 112, name: "Museo Nacional", icon: "image" }, { id: 113, name: "Museo Botero", icon: "image" }, { id: 114, name: "Museo Arte Moderno", icon: "image" }, { id: 115, name: "Museo Histórico", icon: "image" },
        { id: 116, name: "Museo Terracota", icon: "image" }, { id: 117, name: "Galería Arte Colonial", icon: "image" }, { id: 118, name: "Biblioteca Arango", icon: "book" }, { id: 119, name: "Archivo Bogotá", icon: "book" }, { id: 120, name: "Hemeroteca Distrital", icon: "book" },
        { id: 121, name: "Sitio El Abra", icon: "search" }, { id: 122, name: "Sitio Soacha", icon: "search" }, { id: 123, name: "Sitio Zipaquirá", icon: "search" }, { id: 124, name: "Sitio Usme", icon: "search" }, { id: 125, name: "Plaza Bolívar", icon: "marker" },
        { id: 126, name: "Plaza Democracia", icon: "marker" }, { id: 127, name: "Parque Berrío", icon: "park" }, { id: 128, name: "Parque Santander", icon: "park" }, { id: 129, name: "Centro Histórico", icon: "building" }, { id: 130, name: "Palacio Nariño", icon: "landmark" }
      ]
    },
    {
      id: "funcional",
      name: "Estructura Funcional y Cuidado",
      color: "#3b82f6",
      icon: "hospital",
      components: [
        { id: 201, name: "Colegio Flores", icon: "school" }, { id: 202, name: "Colegio Nueva Colombia", icon: "school" }, { id: 203, name: "Colegio Rural Sumapaz", icon: "school" }, { id: 204, name: "Colegio Usaquén", icon: "school" }, { id: 205, name: "Colegio Fontdecaba", icon: "school" },
        { id: 206, name: "Universidad Nacional", icon: "school" }, { id: 207, name: "Universidad Andes", icon: "school" }, { id: 208, name: "Universidad Javeriana", icon: "school" }, { id: 209, name: "Universidad Rosario", icon: "school" }, { id: 210, name: "SENA Bogotá", icon: "school" },
        { id: 211, name: "Hospital Nacional", icon: "hospital" }, { id: 212, name: "Hospital San Ignacio", icon: "hospital" }, { id: 213, name: "Hospital Misericordia", icon: "hospital" }, { id: 214, name: "Hospital Tunal", icon: "hospital" }, { id: 215, name: "Hospital Simón Bolívar", icon: "hospital" },
        { id: 216, name: "Clínica Palermo", icon: "hospital" }, { id: 217, name: "Clínica Reina Sofía", icon: "hospital" }, { id: 218, name: "Centro Salud Chapinero", icon: "hospital" }, { id: 219, name: "Centro Salud Usaquén", icon: "hospital" }, { id: 220, name: "Instituto Salud", icon: "hospital" },
        { id: 221, name: "Jardín Infantil Auxiliadora", icon: "baby" }, { id: 222, name: "Jardín Mundo Mágico", icon: "baby" }, { id: 223, name: "Guardería Refugio", icon: "baby" }, { id: 224, name: "Centro Desarrollo Crecer", icon: "baby" }, { id: 225, name: "Hogar Infantil Arcoíris", icon: "baby" },
        { id: 226, name: "Parque Piecitos Felices", icon: "playground" }, { id: 227, name: "Parque Colina Feliz", icon: "playground" }, { id: 228, name: "Ludoteca Barrio Nuevo", icon: "game" }, { id: 229, name: "Comedor San Bosco", icon: "utensils" }, { id: 230, name: "Biblioteca Felicidad", icon: "book" }
      ]
    },
    {
      id: "socioeconomica",
      name: "Estructura Socioeconómica, Creativa e Innovación",
      color: "#f59e0b",
      icon: "briefcase",
      components: [
        { id: 301, name: "Tiendas Barrio Localidad 1", icon: "shop" }, { id: 302, name: "Tiendas Barrio Localidad 3", icon: "shop" }, { id: 303, name: "Comercio Informal Centro", icon: "shop" }, { id: 304, name: "Pequeño Comercio Paseo", icon: "shop" }, { id: 305, name: "Mercado Flores", icon: "cart" },
        { id: 306, name: "Centro Abastos Corabastos", icon: "cart" }, { id: 307, name: "Mercado Samper Mendoza", icon: "cart" }, { id: 308, name: "Plaza Minorista", icon: "cart" }, { id: 309, name: "Centro Comercial Carrefour", icon: "store" }, { id: 310, name: "Centro Comercial Éxito", icon: "store" },
        { id: 311, name: "Talleres Confecciones", icon: "sewing" }, { id: 312, name: "Talleres Zapatería", icon: "shoe" }, { id: 313, name: "Talleres Carpintería", icon: "hammer" }, { id: 314, name: "Talleres Ebanistería", icon: "chair" }, { id: 315, name: "Taller Cerámica", icon: "pot" },
        { id: 316, name: "Taller Textiles", icon: "yarn" }, { id: 317, name: "Taller Joyería", icon: "gem" }, { id: 318, name: "Taller Restauración", icon: "brush" }, { id: 319, name: "Taller Artes Gráficas", icon: "print" }, { id: 320, name: "Taller Estampación", icon: "stamp" },
        { id: 321, name: "Centro Innovación Hub", icon: "lightbulb" }, { id: 322, name: "Parque Tecnológico", icon: "microscope" }, { id: 323, name: "Incubadora Negocios", icon: "rocket" }, { id: 324, name: "Laboratorio Innovación", icon: "microscope" }, { id: 325, name: "Centro Desarrollo Empresarial", icon: "chart" },
        { id: 326, name: "Espacio Creativo Huerta", icon: "sprout" }, { id: 327, name: "Estudio Diseño Industrial", icon: "palette" }, { id: 328, name: "Agencia Publicidad", icon: "megaphone" }, { id: 329, name: "Productora Audiovisual", icon: "film" }, { id: 330, name: "Estudio Música Digital", icon: "music" }
      ]
    }
  ],
  
  relationsBetweenStructures: [
    { source: "eep", target: "patrimonio", type: "flujo" },
    { source: "eep", target: "funcional", type: "flujo" },
    { source: "eep", target: "socioeconomica", type: "flujo" },
    { source: "patrimonio", target: "funcional", type: "flujo" },
    { source: "patrimonio", target: "socioeconomica", type: "flujo" },
    { source: "funcional", target: "socioeconomica", type: "flujo" }
  ],
  
  relationsWithin: []
};

const iconSVG = {
  water: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 14l4-4 4 4" stroke="currentColor" stroke-width="2" fill="none"/>',
  waves: '<path d="M3 12c1-1 2-2 4-2s3 1 4 2 2 2 4 2 3-1 4-2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 16c1-1 2-2 4-2s3 1 4 2 2 2 4 2 3-1 4-2" stroke="currentColor" stroke-width="2" fill="none"/>',
  mountain: '<path d="M4 16l4-6 4 4 4-8 4 10" stroke="currentColor" stroke-width="2" fill="none"/>',
  tree: '<circle cx="12" cy="6" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 9v7M8 14l8 2" stroke="currentColor" stroke-width="2" fill="none"/>',
  leaf: '<path d="M4 12c2-2 4-4 8-4s6 2 8 4c-2 2-4 4-8 4s-6-2-8-4" stroke="currentColor" stroke-width="2" fill="none"/>',
  shield: '<path d="M12 2L4 5v5c0 5 8 8 8 8s8-3 8-8V5l-8-3z" stroke="currentColor" stroke-width="2" fill="none"/>',
  church: '<path d="M12 2l-2 3h-2v2h4v3h-4v8h10v-8h-4v-3h4v-2h-2l-2-3z" stroke="currentColor" stroke-width="2" fill="none"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="8" cy="8" r="1.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 15l5-5 7 7 6-6" stroke="currentColor" stroke-width="2" fill="none"/>',
  book: '<path d="M4 4v16c0 1 1 2 2 2h12c1 0 2-1 2-2V4M4 4h16v2H4" stroke="currentColor" stroke-width="2" fill="none"/><line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="2"/><line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" stroke-width="2"/>',
  search: '<circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="2" fill="none"/><path d="M14 14l4 4" stroke="currentColor" stroke-width="2"/>',
  marker: '<path d="M12 2C7 2 3 6 3 11c0 5 9 11 9 11s9-6 9-11c0-5-4-9-9-9zm0 7a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" stroke-width="2" fill="none"/>',
  park: '<rect x="4" y="8" width="16" height="10" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="9" cy="11" r="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="15" cy="12" r="2" stroke="currentColor" stroke-width="2" fill="none"/>',
  building: '<rect x="4" y="4" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"/><line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" stroke-width="1"/><line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="1"/><line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" stroke-width="1"/><line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" stroke-width="1"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1"/><line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" stroke-width="1"/>',
  school: '<rect x="4" y="8" width="16" height="10" stroke="currentColor" stroke-width="2" fill="none"/><polygon points="4,8 12,2 20,8" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="8" x2="12" y2="18" stroke="currentColor" stroke-width="2"/>',
  hospital: '<rect x="4" y="4" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 12h6M12 9v6" stroke="currentColor" stroke-width="2"/>',
  baby: '<circle cx="12" cy="7" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M5 11c1-1 2-2 7-2s6 1 7 2c0 2 0 4-7 8-7-4-7-6-7-8z" stroke="currentColor" stroke-width="2" fill="none"/>',
  playground: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="2"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/>',
  game: '<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="8" cy="12" r="1.5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="10" r="1.5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16" cy="14" r="1.5" stroke="currentColor" stroke-width="2" fill="none"/>',
  utensils: '<path d="M6 3v13M18 3v13M12 6c2 0 4 2 4 4-2 2-4 4-4 8-0-4-2-6-4-8 0-2 2-4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>',
  shop: '<path d="M2 4h20v3H2V4zm0 3h20l-2 12H4L2 7zm6-2v2m4-2v2m4-2v2" stroke="currentColor" stroke-width="2" fill="none"/>',
  cart: '<circle cx="7" cy="18" r="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="17" cy="18" r="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 6h18l-1 10H4L3 6z" stroke="currentColor" stroke-width="2" fill="none"/>',
  store: '<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M2 10h20M6 10v10M18 10v10" stroke="currentColor" stroke-width="1"/>',
  sewing: '<circle cx="9" cy="8" r="1.5" stroke="currentColor" stroke-width="2" fill="currentColor"/><path d="M12 8l4-4M8 12l4 4" stroke="currentColor" stroke-width="2"/>',
  shoe: '<path d="M4 10c0-2 2-4 8-4s8 2 8 4v6H4v-6z" stroke="currentColor" stroke-width="2" fill="none"/><line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" stroke-width="2"/>',
  hammer: '<path d="M8 16l2-8 6-6 2 2-6 6 8 2" stroke="currentColor" stroke-width="2" fill="none"/><rect x="4" y="14" width="3" height="6" stroke="currentColor" stroke-width="2" fill="none"/>',
  chair: '<rect x="6" y="6" width="12" height="8" stroke="currentColor" stroke-width="2" fill="none"/><line x1="8" y1="14" x2="8" y2="18" stroke="currentColor" stroke-width="2"/><line x1="16" y1="14" x2="16" y2="18" stroke="currentColor" stroke-width="2"/>',
  pot: '<path d="M8 8c0-2 1-4 4-4s4 2 4 4v8c0 1-1 2-2 2H10c-1 0-2-1-2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>',
  yarn: '<circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 11v7M9 14h6" stroke="currentColor" stroke-width="2"/>',
  gem: '<path d="M12 2l3 4 4 2-3 4 1 6-7 0 1-6-3-4 4-2z" stroke="currentColor" stroke-width="2" fill="none"/>',
  brush: '<circle cx="10" cy="6" r="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 8v10M6 16h8" stroke="currentColor" stroke-width="2"/>',
  print: '<rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 8h16M4 10h16M6 14h12" stroke="currentColor" stroke-width="1"/><path d="M4 17h16v2H4v-2" stroke="currentColor" stroke-width="2" fill="none"/>',
  stamp: '<rect x="4" y="4" width="16" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/>',
  lightbulb: '<path d="M10 2h4v2h-4V2zm2 4c-3 0-5 2-5 4 0 2 1 2 1 3v2h8v-2c0-1 1-1 1-3 0-2-2-4-5-4z" stroke="currentColor" stroke-width="2" fill="none"/><line x1="10" y1="16" x2="14" y2="16" stroke="currentColor" stroke-width="2"/>',
  microscope: '<circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 11l-2 5h10l-2-5" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="11" x2="12" y2="16" stroke="currentColor" stroke-width="2"/>',
  rocket: '<path d="M12 2l2 4h-4l2-4zm0 6l3 8-3-2-3 2 3-8z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="18" r="2" stroke="currentColor" stroke-width="2" fill="none"/>',
  chart: '<path d="M4 18h16M4 14h3v4M9 12h3v6M14 10h3v8" stroke="currentColor" stroke-width="2" fill="none"/>',
  sprout: '<path d="M12 2v6M9 8c-2 0-3 2-3 4 0 3 3 6 3 6s3-3 3-6c0-2-1-4-3-4z" stroke="currentColor" stroke-width="2" fill="none"/>',
  palette: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="10" cy="10" r="1.5" fill="currentColor"/><circle cx="14" cy="10" r="1.5" fill="currentColor"/><circle cx="10" cy="14" r="1.5" fill="currentColor"/><circle cx="14" cy="14" r="1.5" fill="currentColor"/>',
  megaphone: '<path d="M3 8l12-4v12L3 12v-4z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="18" cy="10" r="2" stroke="currentColor" stroke-width="2" fill="none"/>',
  film: '<rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1"/><line x1="2" y1="16" x2="22" y2="16" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>',
  music: '<path d="M9 2v12c0 2-1.5 3-3 3s-3-1-3-3 1.5-3 3-3M9 2c2 0 3 1 3 3v9c0 2-1 3-2 3s-2-1-2-3M9 2h5v2h-5M14 4v11" stroke="currentColor" stroke-width="2" fill="none"/>',
  landmark: '<path d="M2 18h20M4 18V8l8-4 8 4v10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="8" y1="10" x2="8" y2="18" stroke="currentColor" stroke-width="1"/><line x1="12" y1="8" x2="12" y2="18" stroke="currentColor" stroke-width="1"/><line x1="16" y1="10" x2="16" y2="18" stroke="currentColor" stroke-width="1"/>',
  briefcase: '<rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 5V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 9v4" stroke="currentColor" stroke-width="2" fill="none"/>'
};

let simulation = null;
let allNodes = [];
let allLinks = [];
let selectedNode1 = null;
let selectedNode2 = null;
const state = { selectedStructures: new Set(), selectedComponents: new Set() };

window.addEventListener('load', () => {
  renderStructureSelector();
  renderComponentSelector();
  setupListeners();
  setTimeout(() => initNetwork(), 100);
});

function renderStructureSelector() {
  const container = document.getElementById('structuresSelector');
  if (!container) return;
  container.innerHTML = potData.structures.map(struct => `
    <div class="struct-item" style="border-left: 3px solid ${struct.color};">
      <input type="checkbox" id="struct-${struct.id}" data-id="${struct.id}" class="structure-checkbox">
      <label for="struct-${struct.id}">
        <div class="struct-name">${struct.name}</div>
        <div class="struct-count">${struct.components.length} componentes</div>
      </label>
    </div>
  `).join('');
}

function renderComponentSelector() {
  const container = document.getElementById('componentsSelector');
  if (!container) return;
  if (state.selectedStructures.size === 0) {
    container.innerHTML = '<p style="color: var(--text-dim); font-size: 0.8rem;">Selecciona una estructura primero</p>';
    return;
  }
  let html = '';
  state.selectedStructures.forEach(structId => {
    const struct = potData.structures.find(s => s.id === structId);
    if (struct) {
      struct.components.forEach(comp => {
        html += `<div class="comp-item"><input type="checkbox" id="comp-${comp.id}" data-id="${comp.id}"><label for="comp-${comp.id}"><span>${comp.name}</span></label></div>`;
      });
    }
  });
  container.innerHTML = html;
  document.querySelectorAll('#componentsSelector input').forEach(cb => {
    cb.addEventListener('change', function() {
      const id = parseInt(this.dataset.id);
      this.checked ? state.selectedComponents.add(id) : state.selectedComponents.delete(id);
      initNetwork();
    });
  });
}

function initNetwork() {
  const selectedStructIds = Array.from(state.selectedStructures);
  const selectedCompIds = Array.from(state.selectedComponents);
  
  allNodes = potData.structures.filter(s => selectedStructIds.includes(s.id))
    .map(s => ({ id: s.id, label: s.name.split(' ')[0], type: "structure", color: s.color, icon: s.icon, size: 60 }));
  
  selectedStructIds.forEach(structId => {
    const struct = potData.structures.find(s => s.id === structId);
    struct.components.filter(c => selectedCompIds.includes(c.id)).forEach(comp => {
      allNodes.push({ id: comp.id, label: comp.name, type: "component", color: struct.color, icon: comp.icon, size: 45, parent: structId });
    });
  });
  
  // RELACIONES ENTRE ESTRUCTURAS
  allLinks = potData.relationsBetweenStructures
    .filter(l => selectedStructIds.includes(l.source) && selectedStructIds.includes(l.target))
    .map(l => ({ source: l.source, target: l.target, type: l.type, isStructure: true }));
  
  // CONEXIONES AUTOMÁTICAS: componente con su estructura padre
  selectedCompIds.forEach(compId => {
    const struct = potData.structures.find(s => s.components.some(c => c.id === compId));
    if (struct && selectedStructIds.includes(struct.id)) {
      if (!allLinks.find(l => (l.source === struct.id && l.target === compId) || (l.source === compId && l.target === struct.id))) {
        allLinks.push({ source: struct.id, target: compId, type: "flujo", isStructure: false, isAuto: true });
        console.log('✅ CONEXIÓN AUTOMÁTICA:', struct.name, '←→', potData.structures.find(s => s.id === struct.id).components.find(c => c.id === compId).name);
      }
    }
  });
  
  const svg = d3.select("#networkSvg");
  const container = svg.node().parentElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  
  svg.attr('width', width).attr('height', height);
  svg.selectAll("*").remove();
  
  const g = svg.append("g");
  const defs = svg.append("defs");
  
  ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"].forEach((color, idx) => {
    defs.append("filter").attr("id", `glow-${idx}`)
      .append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
  });
  
  defs.selectAll("marker").data([{id: "m-teal", color: "#2fd4c8"}, {id: "m-green", color: "#4ade80"}, {id: "m-pink", color: "#f76fb0"}])
    .enter().append("marker").attr("id", d => d.id).attr("markerWidth", 10).attr("markerHeight", 10).attr("refX", 28).attr("refY", 3).attr("orient", "auto")
    .append("polygon").attr("points", "0 0, 10 3, 0 6").attr("fill", d => d.color);
  
  if (simulation) simulation.stop();
  
  simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(allLinks).id(d => d.id).distance(d => d.isStructure ? 200 : 120).strength(0.3))
    .force('charge', d3.forceManyBody().strength(-500).distanceMax(600))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(d => d.size + 20).strength(0.85))
    .alphaDecay(0.02).velocityDecay(0.5);
  
  const link = g.selectAll("line.link").data(allLinks).enter().append("line").attr("class", "link")
    .attr("stroke", d => d.type === "flujo" ? "#2fd4c8" : d.type === "conflicto" ? "#f76fb0" : "#4ade80")
    .attr("stroke-width", d => d.isStructure ? 2.5 : 1.5)
    .attr("stroke-dasharray", d => d.isStructure ? "6,3" : d.type === "conflicto" ? "3,3" : "0")
    .attr("opacity", d => d.isStructure ? 0.6 : 0.4)
    .attr("marker-end", d => d.type === "flujo" ? "url(#m-teal)" : d.type === "conflicto" ? "url(#m-pink)" : "url(#m-green)")
    .attr("cursor", "pointer").style("pointer-events", "stroke")
    .on("click", function(event, d) {
      const sName = typeof d.source === 'object' ? d.source.label : d.source;
      const tName = typeof d.target === 'object' ? d.target.label : d.target;
      alert(`📍 ${sName} → ${tName}\nTipo: ${d.type}`);
    });
  
  const nodeGroup = g.selectAll("g.node-group").data(allNodes).enter().append("g").attr("class", "node-group").style("cursor", "pointer")
    .on("click", function(event, d) { selectNodeForConnection(d.id); })
    .call(drag(simulation));
  
  // GLOW CON COLOR
  nodeGroup.append("circle").attr("r", d => d.size + 15).attr("fill", d => d.color).attr("opacity", 0.2)
    .attr("filter", (d) => { const colors = ["#2fd4c8", "#a276f2", "#3b82f6", "#f59e0b"]; const idx = colors.indexOf(d.color); return `url(#glow-${idx})`; });
  
  // BOLA AZUL SÓLIDA
  nodeGroup.append("circle").attr("r", d => d.size).attr("fill", "#3b82f6").attr("opacity", 1).attr("stroke", "none").style("cursor", "move");
  
  // ICONO OUTLINE CENTRADO
  nodeGroup.append("g").attr("transform", "translate(0, 0)")
    .append("svg").attr("viewBox", "0 0 24 24").attr("width", d => d.size * 0.8).attr("height", d => d.size * 0.8)
    .attr("x", d => -d.size * 0.4).attr("y", d => -d.size * 0.4)
    .style("overflow", "visible")
    .style("color", "#fff")
    .html(d => iconSVG[d.icon] || '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/>');
  
  // LABEL
  nodeGroup.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("dy", d => d.size * 0.25)
    .attr("font-size", d => d.type === "structure" ? 11 : 8).attr("font-weight", 700).attr("fill", "#fff").attr("pointer-events", "none").text(d => d.label)
    .style("text-shadow", "0 1px 3px rgba(0,0,0,0.7)");
  
  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    nodeGroup.attr('transform', d => `translate(${Math.max(120, Math.min(width - 120, d.x))},${Math.max(120, Math.min(height - 120, d.y))})`);
  });
  
  updateStats();
}

function drag(simulation) {
  function dragstarted(event, d) { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
  function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
  function dragended(event, d) { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }
  return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
}

function updateStats() {
  document.getElementById('countStructures').textContent = state.selectedStructures.size;
  document.getElementById('countComponents').textContent = state.selectedComponents.size;
  const subtitle = state.selectedStructures.size === 0 ? 'Selecciona estructuras →' : `${state.selectedStructures.size} estructura(s) | ${state.selectedComponents.size} componentes`;
  document.getElementById('networkSubtitle').textContent = subtitle;
}

function setupListeners() {
  document.querySelectorAll('.structure-checkbox').forEach(cb => {
    cb.addEventListener('change', function() {
      const id = this.dataset.id;
      if (this.checked) { state.selectedStructures.add(id); state.selectedComponents.clear(); } 
      else { state.selectedStructures.delete(id); state.selectedComponents.clear(); }
      renderComponentSelector();
      initNetwork();
    });
  });
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.selectedStructures.clear();
      state.selectedComponents.clear();
      document.querySelectorAll('.structure-checkbox').forEach(cb => cb.checked = false);
      renderComponentSelector();
      initNetwork();
    });
  }
}

function selectNodeForConnection(nodeId) {
  if (!selectedNode1) { 
    selectedNode1 = nodeId;
    console.log('✅ NODO 1:', allNodes.find(n => n.id === nodeId).label);
  }
  else if (!selectedNode2 && nodeId !== selectedNode1) { 
    selectedNode2 = nodeId;
    console.log('✅ NODO 2:', allNodes.find(n => n.id === nodeId).label);
    showConnectionPanel(selectedNode1, selectedNode2);
  }
}

function showConnectionPanel(node1Id, node2Id) {
  const node1 = allNodes.find(n => n.id === node1Id);
  const node2 = allNodes.find(n => n.id === node2Id);
  if (node1 && node2) {
    document.getElementById('connectionInfo').textContent = `${node1.label} ➜ ${node2.label}`;
    document.getElementById('connectionPanel').style.display = 'block';
    document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
    console.log('📍 PANEL ABIERTO');
  }
}

function confirmConnection() {
  const selected = document.querySelector('input[name="convention"]:checked');
  if (!selected) { alert('⚠️ Selecciona convención'); return; }
  if (!selectedNode1 || !selectedNode2) { alert('⚠️ Nodos no válidos'); return; }
  
  const typeMap = { 'dirigida': 'flujo', 'nodirigida': 'bidirectional', 'fuerte': 'fuerte', 'conflicto': 'conflicto' };
  const node1 = allNodes.find(n => n.id === selectedNode1);
  const node2 = allNodes.find(n => n.id === selectedNode2);
  const tipo = typeMap[selected.value];
  
  allLinks.push({ source: selectedNode1, target: selectedNode2, type: tipo, isStructure: false });
  
  console.log('✅ CONEXIÓN CREADA:', { from: node1.label, to: node2.label, type: tipo });
  console.log('📊 TOTAL LINKS:', allLinks.length);
  
  alert(`✅ CONEXIÓN CREADA\n\n${node1.label} → ${node2.label}\nTipo: ${tipo}`);
  
  closeConnection();
  initNetwork();
}

function closeConnection() {
  document.getElementById('connectionPanel').style.display = 'none';
  selectedNode1 = null;
  selectedNode2 = null;
  document.querySelectorAll('input[name="convention"]').forEach(r => r.checked = false);
}

function updatePreview() {}
