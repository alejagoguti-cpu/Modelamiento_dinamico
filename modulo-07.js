// MODULO 07: SIMULADOR
console.log('Módulo 07: Simulador - Inicializado');

// ---------------------------------------------------------------------------
// ESCENARIOS (apagar/encender una estructura completa)
// ---------------------------------------------------------------------------
const scenarios = {
  sin_eep:   { label: 'Escenario sin Estructura Ecológica Principal', struct: 'eco' },
  sin_efc:   { label: 'Escenario sin Estructura Funcional y del Cuidado', struct: 'func' },
  sin_eseci: { label: 'Escenario sin Estructura Socioeconómica, Creativa y de Innovación', struct: 'econ' },
  sin_eip:   { label: 'Escenario sin Estructura Integradora de Patrimonios', struct: 'patri' }
};

function loadScenario(scenarioKey, buttonEl) {
  const scenario = scenarios[scenarioKey];
  if (!scenario) return;

  const struct = scenario.struct;
  const isOff = buttonEl.classList.toggle('active');

  const icon = buttonEl.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-circle-minus', !isOff);
    icon.classList.toggle('fa-power-off', isOff);
  }

  document.querySelectorAll('.node.n-' + struct).forEach(node => {
    node.classList.toggle('node-off', isOff);
  });

  document.querySelectorAll('.links line.l-' + struct).forEach(link => {
    link.classList.toggle('link-off', isOff);
  });

  console.log((isOff ? 'Apagando' : 'Reactivando') + ' estructura:', scenario.label);
  updateStats();
}

// ---------------------------------------------------------------------------
// LEYENDA
// "Directa/Indirecta" = estilo de línea (sólida/punteada), independiente del
// color. "Soporte/Resiliencia" = tipo de relación (color naranja/azul).
// Ambas dimensiones convivenen en la misma línea, así que se filtran por
// separado.
// ---------------------------------------------------------------------------
function toggleLinkType(type, itemEl) {
  const isOff = itemEl.classList.toggle('off');
  const icon = itemEl.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-square-check', !isOff);
    icon.classList.toggle('fa-square', isOff);
  }

  let selector;
  if (type === 'directa') selector = '#staticNetwork .links line:not(.link-punteada)';
  else if (type === 'indirecta') selector = '#staticNetwork .links line.link-punteada';
  else selector = '#staticNetwork .links line.link-' + type;

  document.querySelectorAll(selector).forEach(link => {
    link.classList.toggle('type-off', isOff);
  });

  console.log((isOff ? 'Ocultando' : 'Mostrando') + ' relaciones tipo:', type);
}

// ---------------------------------------------------------------------------
// RELACIONES DOCUMENTADAS EN EL POT
// Fuente: "Red_relaciones_POT_CORREGIDA_FRASES_EXACTAS.xlsx" (hoja "Todas
// las relaciones"). Clave: "origen|destino" tal como aparece en la tabla
// (columnas Concepto origen -> Concepto destino). El sentido de la flecha se
// resuelve comparando esto contra data-s/data-t de cada línea, así que no
// importa en qué orden se dibujó la línea en el SVG.
// ---------------------------------------------------------------------------
const relationData = {
  "corredores_mont|rios": { page: '70', relation: 'soporte', description: 'Art. 7', phrase: '"corredores montañosos … ríos y humedales"' },
  "quebradas|humedales": { page: '72', relation: 'soporte', description: 'Art. 42 / 62', phrase: '"ríos y quebradas … humedales"' },
  "cerros_orientales|humedales": { page: '70', relation: 'soporte', description: 'Art. 7', phrase: '"cerros orientales … ríos y humedales"' },
  "humedales|rios": { page: '72', relation: 'soporte', description: 'Art. 42 / 62', phrase: '"ríos y quebradas … humedales"' },
  "rios|complejos_paramos": { page: '70', relation: 'soporte', description: 'Art. 7', phrase: '"complejos de páramos … ríos y humedales"' },
  "bosques_urbanos|coberturas_vegetales": { page: '73', relation: 'soporte', description: 'Art. 74', phrase: '"cobertura vegetal … flora propia"' },
  "areas_resiliencia|coberturas_vegetales": { page: '72', relation: 'resiliencia', description: 'Art. 42', phrase: '"territorio resiliente … cambio climático"' },
  "humedales|areas_resiliencia": { page: '72', relation: 'soporte', description: 'Art. 42', phrase: '"amortiguación de los impactos ambientales"' },
  "areas_protegidas|humedales": { page: '71', relation: 'soporte', punteada: true, description: 'Art. 41 / 51', phrase: '"Reservas Distritales de Humedal"' },
  "areas_protegidas|parques_eco_montana": { page: '71', relation: 'soporte', punteada: true, description: 'Art. 51 / 54', phrase: '"Parques Distritales Ecológicos de Montaña"' },
  "areas_protegidas|reservas_forestales": { page: '71', relation: 'soporte', punteada: true, description: 'Art. 41 / 45 / 48', phrase: '"Reserva Forestal Protectora … Regional"' },
  "reservas_forestales|humedales": { page: '72', relation: 'resiliencia', description: 'Art. 42', phrase: '"conectividad y complementariedad"' },
  "parques_eco_montana|coberturas_vegetales": { page: '72', relation: 'soporte', punteada: true, description: 'Art. 54', phrase: '"restaurar y preservar … especies nativas"' },
  "coberturas_vegetales|parques_borde": { page: '136', relation: 'soporte', punteada: true, description: 'Art. 121', phrase: '"coberturas vegetales … parques de borde"' },
  "coberturas_vegetales|paisajes_sostenibles": { page: '72', relation: 'soporte', punteada: true, description: 'Art. 52 / 74', phrase: '"funcionalidad ecosistémica … conectividad"' },
  "complejos_paramos|paisajes_sostenibles": { page: '70', relation: 'soporte', punteada: true, description: 'Art. 7 / 52', phrase: '"complejos de páramos … paisajes"' },
  "equipamientos|servicios_cuidado": { page: '117–118', relation: 'soporte', punteada: true, description: 'Art. 94–95', phrase: '"equipamientos y servicios de cuidado"' },
  "equipamientos|servicios_sociales": { page: '117–118', relation: 'soporte', punteada: true, description: 'Art. 94–95', phrase: '"equipamientos y servicios sociales"' },
  "equipamientos|vivienda": { page: '117', relation: 'soporte', description: 'Art. 94 / 95', phrase: '"equipamientos … soluciones habitacionales"' },
  "servicios_publicos|vivienda": { page: '179', relation: 'soporte', punteada: true, description: 'Art. 179', phrase: '"servicio público … actividades en la ciudad"' },
  "ciclorrutas|vivienda": { page: '117', relation: 'soporte', punteada: true, description: 'Art. 88', phrase: '"accesibilidad … conectividad"' },
  "ciclorrutas|transporte_publico": { page: '117 / 158–159', relation: 'resiliencia', punteada: true, noArrow: true, description: 'Art. 88 / 158–159', phrase: '"cicloinfraestructura … corredores verdes"' },
  "transporte_publico|vivienda": { page: '117', relation: 'soporte', punteada: true, description: 'Art. 88', phrase: '"accesibilidad … conectividad"' },
  "red_vial|transporte_publico": { page: '158–159', relation: 'soporte', description: 'Art. 158–159', phrase: '"malla arterial … transporte público"' },
  "red_vial|equipamientos": { page: '117', relation: 'soporte', description: 'Art. 88 / 95', phrase: '"accesibilidad … equipamientos"' },
  "corredores_verdes|ciclorrutas": { page: '117', relation: 'soporte', description: 'Política de movilidad', phrase: '"corredores verdes … cicloinfraestructura"' },
  "corredores_verdes|transporte_publico": { page: '158–159', relation: 'soporte', description: 'Art. 158–159', phrase: '"corredores verdes de transporte público"' },
  "manzanas_cuidado|servicios_sociales": { page: '117–118', relation: 'soporte', description: 'Art. 94–95', phrase: '"manzanas del cuidado … servicios sociales"' },
  "manzanas_cuidado|equipamientos": { page: '117–118', relation: 'soporte', description: 'Art. 94–95', phrase: '"manzanas del cuidado … equipamientos"' },
  "manzanas_cuidado|parques": { page: '117', relation: 'soporte', description: 'Art. 94', phrase: '"jardines infantiles, colegios, parques"' },
  "distrito_tec|servicios_empresariales": { page: '122', relation: 'soporte', description: 'Art. 101', phrase: '"Eje de servicios empresariales"' },
  "distrito_tec|sist_educacion": { page: '122', relation: 'soporte', description: 'Art. 100–101', phrase: '"formación del talento humano"' },
  "centros_abastecimiento|plazas_mercado": { page: '122', relation: 'soporte', punteada: true, description: 'Art. 100–101', phrase: '"Centros de Abasto Mayorista … Plazas de Mercado"' },
  "plazas_mercado|servicios_empresariales": { page: '122', relation: 'soporte', description: 'Art. 101', phrase: '"Plazas de Mercado … infraestructuras"' },
  "zonas_industriales|servicios_empresariales": { page: '122', relation: 'soporte', description: 'Art. 101', phrase: '"Eje de servicios empresariales … zonas industriales"' },
  "zonas_industriales|sist_educacion": { page: '122', relation: 'soporte', punteada: true, description: 'Art. 100–101', phrase: '"formación del talento humano … empresas"' },
  "zonas_industriales|produccion_artesanal": { page: '122', relation: 'soporte', description: 'Art. 100–101', phrase: '"producción tradicional … industrias creativas"' },
  "zonas_interes_turistico|plazas_mercado": { page: '122', relation: 'soporte', description: 'Art. 101', phrase: '"Zonas de Interés Turístico … Plazas de Mercado"' },
  "centros_financieros|servicios_empresariales": { page: '122', relation: 'soporte', description: 'Art. 100', phrase: '"centros financieros y de servicios empresariales"' },
  "sitios_sagrados|patrimonio_inmaterial": { page: '103–104', relation: 'resiliencia', description: 'Art. 80', phrase: '"patrimonio cultural inmaterial … comunidades"' },
  "patrimonio_arqueologico|patrimonio_natural": { page: '103–104', relation: 'soporte', description: 'Art. 80', phrase: '"Patrimonio Natural … Patrimonio Arqueológico"' },
  "patrimonio_arqueologico|patrimonio_material": { page: '103–104', relation: 'resiliencia', description: 'Art. 80', phrase: '"Patrimonio Cultural material … Patrimonio Arqueológico"' },
  "patrimonio_natural|patrimonio_inmaterial": { page: '103–104', relation: 'soporte', description: 'Art. 80', phrase: '"patrimonio cultural material, inmaterial y natural"' },
  "patrimonio_material|patrimonio_natural": { page: '103–104', relation: 'soporte', description: 'Art. 80', phrase: '"integra … material, inmaterial y natural"' },
  "patrimonio_material|patrimonio_inmaterial": { page: '103–104', relation: 'soporte', description: 'Art. 80', phrase: '"patrimonio cultural material, inmaterial y natural"' },

  // --- Relaciones ENTRE estructuras distintas (puentes de la red) ---
  "humedales|patrimonio_natural": { page: '195–196', relation: 'soporte', punteada: true, description: 'EIP y patrimonio natural', phrase: '"la eip inscribe … patrimonio material, inmaterial y natural"' },
  "patrimonio_arqueologico|equipamientos": { page: '200', relation: 'soporte', description: 'SDP – implementación del POT', phrase: '"incorporarlos como nodo de equipamientos próximos"' },
  "patrimonio_inmaterial|produccion_artesanal": { page: '190', relation: 'soporte', description: 'Producción artesanal', phrase: '"actividades creativas … predominio manual"' },
  "manzanas_cuidado|sist_educacion": { page: '126', relation: 'soporte', description: 'Manzanas del Cuidado', phrase: '"nuevos colegios y jardines … Manzanas del Cuidado"' },
  "equipamientos|sist_educacion": { page: '126', relation: 'soporte', description: 'Infraestructura social compatible', phrase: '"infraestructura social es compatible con otros usos"' },
  "equipamientos|servicios_empresariales": { page: '165', relation: 'soporte', punteada: true, description: 'Equipamiento y economía', phrase: '"equipamiento como detonante de dinámicas económicas"' },
  "transporte_publico|zonas_industriales": { page: '31', relation: 'soporte', punteada: true, description: 'Sistema multimodal de transporte', phrase: '"sistema multimodal de transporte público … conectado"' },
  "parques_eco_montana|zonas_interes_turistico": { page: '54', relation: 'soporte', punteada: true, description: 'Ecoturismo', phrase: '"ecoturismo, viverismo, agricultura urbana y periurbana"' },
  "parques_eco_montana|patrimonio_natural": { page: '54', relation: 'soporte', description: 'Parques ecológicos de montaña', phrase: '"remanentes de bosques altoandinos … importancia ecosistémica"' },
  "areas_resiliencia|patrimonio_natural": { page: '72', relation: 'resiliencia', punteada: true, description: 'Áreas de Resiliencia Climática', phrase: '"creamos las Áreas de Resiliencia Climática y Protección por Riesgo"' },
};

function findRelation(s, t) {
  return relationData[s + '|' + t] || relationData[t + '|' + s] || null;
}

// Marca con 'has-data' cada línea (todas, en este dataset, tienen ficha) y le
// asigna: flecha (forward/backward/both/ninguna si noArrow), y el modificador
// 'link-punteada' cuando la lectura del POT es "Indirecta" (línea punteada).
function applyArrowDirections() {
  document.querySelectorAll('#staticNetwork .links line').forEach(line => {
    const s = line.getAttribute('data-s');
    const t = line.getAttribute('data-t');
    const rel = relationData[s + '|' + t];
    const relRev = relationData[t + '|' + s];
    const isDirectional = line.classList.contains('link-soporte') || line.classList.contains('link-resiliencia');

    if (!rel && !relRev) {
      if (isDirectional) line.classList.add('arrow-forward');
      return;
    }

    line.classList.add('has-data');

    const noArrow = (rel && rel.noArrow) || (relRev && relRev.noArrow);
    if (noArrow) return; // sin flecha: el POT no permite identificar una dirección inequívoca

    let cls = 'arrow-forward';
    if ((rel && rel.bidirectional) || (relRev && relRev.bidirectional)) {
      cls = 'arrow-both';
    } else if (relRev) {
      cls = 'arrow-backward';
    }
    line.classList.add(cls);
  });
}

// Oculta por defecto las líneas Directa/Indirecta que NO tienen ficha
// (no debería quedar ninguna en este dataset, pero se conserva por si se
// agregan relaciones sin evidencia documentada más adelante).
function hideUndocumentedLines() {
  document.querySelectorAll('#staticNetwork .links line.link-directa, #staticNetwork .links line.link-indirecta').forEach(line => {
    if (!line.classList.contains('has-data')) {
      line.classList.add('type-off');
    }
  });
}

let selectedLink = null;

function openRelationPanel(line) {
  const s = line.getAttribute('data-s');
  const t = line.getAttribute('data-t');
  const sEl = document.getElementById('n_' + s);
  const tEl = document.getElementById('n_' + t);
  const sLabel = sEl ? nodeLabel(sEl) : s;
  const tLabel = tEl ? nodeLabel(tEl) : t;

  const rel = findRelation(s, t);
  const isSoporte = line.classList.contains('link-soporte');
  const relationName = rel ? rel.relation : (isSoporte ? 'soporte' : 'resiliencia');

  document.querySelectorAll('.links line.link-selected').forEach(l => l.classList.remove('link-selected'));
  line.classList.add('link-selected');
  selectedLink = line;

  const arrowSymbol = line.classList.contains('arrow-both') ? '↔' : (line.classList.contains('arrow-forward') || line.classList.contains('arrow-backward') ? '→' : '—');
  document.getElementById('relConcepts').textContent = `${sLabel} ${arrowSymbol} ${tLabel}`;

  const badge = document.getElementById('relBadge');
  const badgeNames = { soporte: 'Soporte', resiliencia: 'Resiliencia', directa: 'Directa' };
  badge.textContent = badgeNames[relationName] || 'Directa';
  badge.className = 'relation-badge badge-' + relationName;

  const descEl = document.getElementById('relDescription');
  if (rel && rel.description) {
    descEl.textContent = rel.description;
    descEl.style.display = 'block';
  } else {
    descEl.style.display = 'none';
  }

  document.getElementById('relPhrase').textContent = rel ? rel.phrase : 'Aún no hay una ficha con la frase exacta del POT para esta relación.';
  document.getElementById('relPage').textContent = rel ? ('Página ' + rel.page) : '—';

  document.getElementById('relationPanel').style.display = 'block';
  document.getElementById('relationPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeRelationPanel() {
  document.getElementById('relationPanel').style.display = 'none';
  if (selectedLink) selectedLink.classList.remove('link-selected');
  selectedLink = null;
}

// ---------------------------------------------------------------------------
// RED: adjacencia, tamaño dinámico según conectividad, selección/resaltado,
// zoom, reset, stats
// ---------------------------------------------------------------------------
let adjacency = {};       // nodeId -> Set de nodeIds vecinos
let nodeLinks = {};       // nodeId -> [line elements]
let selectedNode = null;
const baseViewBox = { x: -195, y: -238, w: 1018, h: 988 };
let currentViewBox = { ...baseViewBox };

function buildAdjacency() {
  adjacency = {};
  nodeLinks = {};
  document.querySelectorAll('#staticNetwork .links line').forEach(line => {
    const s = line.getAttribute('data-s');
    const t = line.getAttribute('data-t');
    if (!s || !t) return;
    (adjacency[s] = adjacency[s] || new Set()).add(t);
    (adjacency[t] = adjacency[t] || new Set()).add(s);
    (nodeLinks[s] = nodeLinks[s] || []).push(line);
    (nodeLinks[t] = nodeLinks[t] || []).push(line);
  });
}

// Tres presets de tamaño (radio del círculo, tamaño del ícono, posición del
// texto) según el número real de conexiones del nodo. Un nodo con más
// relaciones documentadas en el POT se dibuja más grande.
const SIZE_PRESETS = {
  low:  { r: 13, fo: 17, icon: 9,  textY: 23 },
  mid:  { r: 21, fo: 30, icon: 12, textY: 32 },
  high: { r: 34, fo: 48, icon: 17, textY: 48 }
};

function degreeTier(degree) {
  if (degree >= 5) return 'high';
  if (degree >= 3) return 'mid';
  return 'low';
}

// Redimensiona cada nodo (círculo, ícono y posición del texto) según su
// grado real de conectividad calculado a partir de las líneas del SVG.
function applyDynamicSizing() {
  document.querySelectorAll('#staticNetwork .node').forEach(nodeEl => {
    const id = nodeEl.id.replace(/^n_/, '');
    const degree = (adjacency[id] || new Set()).size;
    const tier = degreeTier(degree);
    const preset = SIZE_PRESETS[tier];

    nodeEl.classList.remove('node-hub', 'node-main');
    if (tier === 'mid') nodeEl.classList.add('node-hub');
    if (tier === 'high') nodeEl.classList.add('node-main');

    const circle = nodeEl.querySelector('circle.node-fill');
    if (circle) circle.setAttribute('r', preset.r);

    const fo = nodeEl.querySelector('foreignObject');
    if (fo) {
      const off = -preset.fo / 2;
      fo.setAttribute('x', off);
      fo.setAttribute('y', off);
      fo.setAttribute('width', preset.fo);
      fo.setAttribute('height', preset.fo);
    }

    const icon = nodeEl.querySelector('.node-icon i');
    if (icon) icon.style.fontSize = preset.icon + 'px';

    const text = nodeEl.querySelector('text.node-label');
    if (text) {
      text.setAttribute('y', preset.textY);
      // Evita que las etiquetas largas se salgan del círculo.
      const label = text.textContent.trim();
      const estWidth = label.length * (tier === 'high' ? 4.1 : tier === 'mid' ? 3.7 : 3.4);
      const maxWidth = preset.r * 2 * 1.55;
      if (estWidth > maxWidth) {
        text.setAttribute('textLength', maxWidth.toFixed(0));
        text.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      } else {
        text.removeAttribute('textLength');
        text.removeAttribute('lengthAdjust');
      }
    }
  });
}

// Asigna deg-low / deg-mid / deg-high para el glow (mismo criterio que el
// tamaño, así el glow y el tamaño crecen juntos).
function compactNetworkLayout() {
  const nodes = [...document.querySelectorAll('#staticNetwork .node')];
  if (!nodes.length) return;

  const positions = nodes.map(node => ({ node, ...nodePosition(node) }));
  const currentCenter = positions.reduce((acc, item) => ({ x: acc.x + item.x, y: acc.y + item.y }), { x: 0, y: 0 });
  currentCenter.x /= positions.length;
  currentCenter.y /= positions.length;
  const targetCenter = { x: currentViewBox.x + currentViewBox.w / 2, y: currentViewBox.y + currentViewBox.h / 2 };
  const compactFactor = 0.82;

  positions.forEach(item => {
    item.x = targetCenter.x + (item.x - currentCenter.x) * compactFactor;
    item.y = targetCenter.y + (item.y - currentCenter.y) * compactFactor;
  });

  // Relajación: junta la red, pero empuja los círculos que se aproximan demasiado.
  for (let pass = 0; pass < 90; pass += 1) {
    for (let i = 0; i < positions.length; i += 1) {
      for (let j = i + 1; j < positions.length; j += 1) {
        const a = positions[i];
        const b = positions[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let distance = Math.hypot(dx, dy);
        const minimum = nodeRadius(a.node) + nodeRadius(b.node) + NODE_GAP;
        if (distance >= minimum) continue;
        if (distance < 0.01) { dx = 1; dy = 0; distance = 1; }
        const push = (minimum - distance) / 2;
        const nx = dx / distance;
        const ny = dy / distance;
        a.x -= nx * push;
        a.y -= ny * push;
        b.x += nx * push;
        b.y += ny * push;
      }
    }
  }

  positions.forEach(item => {
    const r = nodeRadius(item.node);
    item.x = Math.max(currentViewBox.x + r + 4, Math.min(currentViewBox.x + currentViewBox.w - r - 4, item.x));
    item.y = Math.max(currentViewBox.y + r + 4, Math.min(currentViewBox.y + currentViewBox.h - r - 4, item.y));
    setNodePosition(item.node, item.x, item.y);
  });
}

function applyConnectivityGlow() {
  document.querySelectorAll('#staticNetwork .node').forEach(nodeEl => {
    const id = nodeEl.id.replace(/^n_/, '');
    const degree = (adjacency[id] || new Set()).size;
    const tier = degreeTier(degree);
    nodeEl.classList.remove('deg-low', 'deg-mid', 'deg-high');
    nodeEl.classList.add('deg-' + tier);
  });
}

function nodeLabel(nodeEl) {
  const span = nodeEl.querySelector('.node-label');
  return span ? span.textContent.replace(/\s+/g, ' ').trim() : nodeEl.id;
}

// ---------------------------------------------------------------------------
// PANEL "¿Qué pasa si se desconecta un nodo central?"
// Ofrece varias opciones (no solo el de mayor grado): se listan los nodos
// con más conexiones documentadas para que el usuario elija cuál simular.
// ---------------------------------------------------------------------------
let centralNodeId = null;
let centralNodeOff = false;
const CENTRAL_OPTIONS_COUNT = 8;

function topCentralNodes(count) {
  return Object.keys(adjacency)
    .map(id => ({ id, degree: adjacency[id].size }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, count);
}

function updateCentralNodePanel() {
  const select = document.getElementById('centralNodeSelect');
  if (!select) return;

  const options = topCentralNodes(CENTRAL_OPTIONS_COUNT);
  select.innerHTML = options.map(opt => {
    const nodeEl = document.getElementById('n_' + opt.id);
    const label = nodeEl ? nodeLabel(nodeEl) : opt.id;
    return `<option value="${opt.id}">${label} · ${opt.degree} conexiones</option>`;
  }).join('');

  if (options.length) {
    centralNodeId = options[0].id;
    select.value = centralNodeId;
  }
}

function onCentralNodeChange() {
  // Si había un nodo apagado y el usuario elige otro, reconecta el anterior
  // antes de cambiar de selección.
  if (centralNodeOff) toggleCentralNode();
  const select = document.getElementById('centralNodeSelect');
  centralNodeId = select.value;
}

function toggleCentralNode() {
  if (!centralNodeId) return;
  const nodeEl = document.getElementById('n_' + centralNodeId);
  if (!nodeEl) return;

  centralNodeOff = !centralNodeOff;

  nodeEl.classList.toggle('node-off', centralNodeOff);
  (nodeLinks[centralNodeId] || []).forEach(line => {
    line.classList.toggle('link-off', centralNodeOff);
  });

  const select = document.getElementById('centralNodeSelect');
  if (select) select.disabled = centralNodeOff;

  const btn = document.getElementById('centralSimBtn');
  if (btn) {
    btn.classList.toggle('active', centralNodeOff);
    btn.innerHTML = centralNodeOff
      ? '<i class="fa-solid fa-power-off"></i>Reconectar'
      : '<i class="fa-solid fa-power-off"></i>Simular';
  }

  console.log((centralNodeOff ? 'Desconectando' : 'Reconectando') + ' nodo central:', centralNodeId);
}

// ---------------------------------------------------------------------------
// Los nodos son fijos (posición calculada por el layout de la red); ya no se
// pueden arrastrar. updateLinesForNode se conserva por si en el futuro se
// necesita mover un nodo por código.
// ---------------------------------------------------------------------------
function updateLinesForNode(id, x, y) {
  document.querySelectorAll('#staticNetwork .links line[data-s="' + id + '"]').forEach(l => {
    l.setAttribute('x1', x); l.setAttribute('y1', y);
  });
  document.querySelectorAll('#staticNetwork .links line[data-t="' + id + '"]').forEach(l => {
    l.setAttribute('x2', x); l.setAttribute('y2', y);
  });
}

function selectNode(id) {
  const nodeEl = document.getElementById('n_' + id);
  if (!nodeEl) return;

  if (selectedNode === id) {
    clearSelection();
    return;
  }

  selectedNode = id;
  const neighbors = adjacency[id] || new Set();

  document.querySelectorAll('#staticNetwork .node').forEach(n => {
    const nid = n.id.replace(/^n_/, '');
    const keep = nid === id || neighbors.has(nid);
    n.classList.toggle('node-dim', !keep);
    n.classList.toggle('node-selected', nid === id);
  });

  document.querySelectorAll('#staticNetwork .links line').forEach(l => {
    const active = l.getAttribute('data-s') === id || l.getAttribute('data-t') === id;
    l.classList.toggle('link-dim', !active);
    l.classList.toggle('link-active', active);
  });

  const chip = document.getElementById('selectedChip');
  const label = document.getElementById('statSelected');
  if (chip && label) {
    label.textContent = nodeLabel(nodeEl) + ' · ' + neighbors.size + ' conexiones';
    chip.style.display = 'flex';
  }
}

function clearSelection() {
  selectedNode = null;
  document.querySelectorAll('#staticNetwork .node').forEach(n => {
    n.classList.remove('node-dim', 'node-selected');
  });
  document.querySelectorAll('#staticNetwork .links line').forEach(l => {
    l.classList.remove('link-dim', 'link-active');
  });
  const chip = document.getElementById('selectedChip');
  if (chip) chip.style.display = 'none';
}

function applyViewBox() {
  const svg = document.getElementById('staticNetwork');
  if (!svg) return;
  svg.setAttribute('viewBox', `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.w} ${currentViewBox.h}`);
}

function resetNetwork() {
  document.querySelectorAll('.scenario-btn.active').forEach(btn => {
    const key = btn.getAttribute('data-scenario');
    loadScenario(key, btn);
  });

  document.querySelectorAll('.legend-item.off').forEach(item => {
    toggleLinkType(item.getAttribute('data-linktype'), item);
  });

  clearSelection();
  closeRelationPanel();

  if (centralNodeOff) toggleCentralNode();

  currentViewBox = { ...baseViewBox };
  applyViewBox();
  updateStats();
  console.log('Red reiniciada');
}

function updateStats() {
  const totalNodes = document.querySelectorAll('#staticNetwork .node').length;
  const totalLinks = document.querySelectorAll('#staticNetwork .links line').length;
  const totalStructs = Object.keys(scenarios).length;
  const offStructs = document.querySelectorAll('.scenario-btn.active').length;

  const nEl = document.getElementById('statNodes');
  const lEl = document.getElementById('statLinks');
  const aEl = document.getElementById('statActive');
  if (nEl) nEl.textContent = totalNodes;
  if (lEl) lEl.textContent = totalLinks;
  if (aEl) aEl.textContent = (totalStructs - offStructs) + '/' + totalStructs;
}

// ---------------------------------------------------------------------------
// ARRASTRE DE NODOS CON COLISIÓN
// ---------------------------------------------------------------------------
let dragState = null;
const NODE_GAP = 8;

function svgPointFromEvent(event) {
  const svg = document.getElementById('staticNetwork');
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function nodePosition(nodeEl) {
  const transform = nodeEl.transform.baseVal.consolidate();
  if (transform) return { x: transform.matrix.e, y: transform.matrix.f };
  const circle = nodeEl.querySelector('circle.node-fill');
  return { x: Number(circle?.getAttribute('cx') || 0), y: Number(circle?.getAttribute('cy') || 0) };
}

function nodeRadius(nodeEl) {
  return Number(nodeEl.querySelector('circle.node-fill')?.getAttribute('r') || 13);
}

function canPlaceNode(nodeEl, x, y) {
  const radius = nodeRadius(nodeEl);
  const minX = currentViewBox.x + radius + 4;
  const maxX = currentViewBox.x + currentViewBox.w - radius - 4;
  const minY = currentViewBox.y + radius + 4;
  const maxY = currentViewBox.y + currentViewBox.h - radius - 4;
  if (x < minX || x > maxX || y < minY || y > maxY) return false;

  return [...document.querySelectorAll('#staticNetwork .node')].every(other => {
    if (other === nodeEl) return true;
    const otherPos = nodePosition(other);
    const minDistance = radius + nodeRadius(other) + NODE_GAP;
    return Math.hypot(x - otherPos.x, y - otherPos.y) >= minDistance;
  });
}

function setNodePosition(nodeEl, x, y) {
  nodeEl.setAttribute('transform', `translate(${x} ${y})`);
  updateLinesForNode(nodeEl.id.replace(/^n_/, ''), x, y);
}

function startNodeDrag(event) {
  if (event.button !== undefined && event.button !== 0) return;
  const nodeEl = event.currentTarget;
  const pointer = svgPointFromEvent(event);
  const position = nodePosition(nodeEl);
  dragState = { nodeEl, offsetX: position.x - pointer.x, offsetY: position.y - pointer.y, moved: false };
  nodeEl.classList.add('is-dragging');
  nodeEl.setPointerCapture?.(event.pointerId);
  event.preventDefault();
  event.stopPropagation();
}

function moveNodeDrag(event) {
  if (!dragState) return;
  const pointer = svgPointFromEvent(event);
  const x = pointer.x + dragState.offsetX;
  const y = pointer.y + dragState.offsetY;
  if (!canPlaceNode(dragState.nodeEl, x, y)) return;
  setNodePosition(dragState.nodeEl, x, y);
  dragState.moved = true;
  event.preventDefault();
}

function endNodeDrag(event) {
  if (!dragState) return;
  const nodeEl = dragState.nodeEl;
  nodeEl.classList.remove('is-dragging');
  nodeEl.releasePointerCapture?.(event.pointerId);
  nodeEl.dataset.dragged = dragState.moved ? 'true' : 'false';
  dragState = null;
}

document.addEventListener('DOMContentLoaded', function () {
  buildAdjacency();
  applyArrowDirections();
  applyDynamicSizing();
  compactNetworkLayout();
  applyConnectivityGlow();
  hideUndocumentedLines();
  applyViewBox();
  updateCentralNodePanel();
  updateStats();

  document.querySelectorAll('#staticNetwork .node').forEach(nodeEl => {
    nodeEl.addEventListener('pointerdown', startNodeDrag);
    nodeEl.addEventListener('pointermove', moveNodeDrag);
    nodeEl.addEventListener('pointerup', endNodeDrag);
    nodeEl.addEventListener('pointercancel', endNodeDrag);
    nodeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (nodeEl.dataset.dragged === 'true') {
        nodeEl.dataset.dragged = 'false';
        return;
      }
      selectNode(nodeEl.id.replace(/^n_/, ''));
    });
  });

  document.querySelectorAll('#staticNetwork .links line.link-soporte, #staticNetwork .links line.link-resiliencia, #staticNetwork .links line.has-data').forEach(line => {
    line.addEventListener('click', (e) => {
      e.stopPropagation();
      openRelationPanel(line);
    });
  });

  const svg = document.getElementById('staticNetwork');
  if (svg) {
    svg.addEventListener('click', (e) => {
      if (e.target === svg) {
        clearSelection();
        closeRelationPanel();
      }
    });
  }
});
