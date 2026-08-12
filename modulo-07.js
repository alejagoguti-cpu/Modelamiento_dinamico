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

  // Recalcula el apagado de TODAS las líneas según el estado real de sus dos
  // nodos: una línea que cruza estructuras (p. ej. eco-func) debe quedar
  // apagada si CUALQUIERA de las dos estructuras que toca está apagada, sin
  // importar cuál fue la última que se reactivó.
  recomputeLinkOffState();

  console.log((isOff ? 'Apagando' : 'Reactivando') + ' estructura:', scenario.label);
  updateStats();
}

function recomputeLinkOffState() {
  document.querySelectorAll('#staticNetwork .links line').forEach(link => {
    const s = link.getAttribute('data-s');
    const t = link.getAttribute('data-t');
    const sNode = document.getElementById('n_' + s);
    const tNode = document.getElementById('n_' + t);
    const sOff = !!(sNode && sNode.classList.contains('node-off'));
    const tOff = !!(tNode && tNode.classList.contains('node-off'));
    link.classList.toggle('link-off', sOff || tOff);
  });

  updateFragmentationDrift();
}

// ---------------------------------------------------------------------------
// "DESPEGUE" de nodos huérfanos: cuando se apaga un sistema, cualquier nodo
// que se quede SIN ninguna conexión activa (aunque él mismo siga encendido)
// se separa un poco de su posición original, empujado hacia afuera del
// centro de la red, para mostrar visualmente que la red se está rompiendo.
// ---------------------------------------------------------------------------
function initNodeTransforms() {
  document.querySelectorAll('#staticNetwork .node').forEach(nodeEl => {
    const x0 = nodeEl.getAttribute('data-x0');
    const y0 = nodeEl.getAttribute('data-y0');
    nodeEl.removeAttribute('transform');
    nodeEl.style.transform = `translate(${x0}px, ${y0}px)`;
  });
}

function updateFragmentationDrift() {
  document.querySelectorAll('#staticNetwork .node').forEach(nodeEl => {
    const id = nodeEl.id.replace(/^n_/, '');
    const x0 = parseFloat(nodeEl.getAttribute('data-x0'));
    const y0 = parseFloat(nodeEl.getAttribute('data-y0'));
    const isOff = nodeEl.classList.contains('node-off');
    const links = nodeLinks[id] || [];
    const hasActiveLink = links.some(l => !l.classList.contains('link-off'));
    const orphaned = !isOff && links.length > 0 && !hasActiveLink;

    if (orphaned) {
      const dist = Math.hypot(x0, y0) || 1;
      const drift = 42;
      const dx = (x0 / dist) * drift;
      const dy = (y0 / dist) * drift;
      nodeEl.style.transform = `translate(${x0 + dx}px, ${y0 + dy}px)`;
      nodeEl.classList.add('node-drift');
    } else {
      nodeEl.style.transform = `translate(${x0}px, ${y0}px)`;
      nodeEl.classList.remove('node-drift');
    }
  });
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
const baseViewBox = { x: -523, y: -364, w: 926, h: 704 };
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
  recomputeLinkOffState();

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

  checkIndicatorPrompt(id);
}

function clearSelection() {
  selectedNode = null;
  document.querySelectorAll('#staticNetwork .node').forEach(n => {
    n.classList.remove('node-dim', 'node-selected');
  });
  document.querySelectorAll('#staticNetwork .links line').forEach(l => {
    l.classList.remove('link-dim', 'link-active');
  });
  checkIndicatorPrompt(null);
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

document.addEventListener('DOMContentLoaded', function () {
  buildAdjacency();
  applyArrowDirections();
  applyDynamicSizing();
  applyConnectivityGlow();
  hideUndocumentedLines();
  applyViewBox();
  updateCentralNodePanel();
  updateStats();
  initNodeTransforms();

  document.querySelectorAll('#staticNetwork .node').forEach(nodeEl => {
    nodeEl.addEventListener('click', (e) => {
      e.stopPropagation();
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

// ---------------------------------------------------------------------------
// INDICADORES DE SIMULACIÓN
// Cada indicador está anclado a un par de nodos conectados en la red. Al
// seleccionar cualquiera de los dos nodos del par aparece un aviso; al abrir
// el indicador se resaltan SOLO esos dos nodos y la flecha entre ellos, y se
// muestra la fórmula, se puede simular con cualquier valor, y se explica la
// cadena de causalidad.
// ---------------------------------------------------------------------------
const INDICATORS = {
  'transporte_publico|vivienda': {
    pair: ['transporte_publico', 'vivienda'],
    tag: 'Transporte público → Vivienda',
    title: 'Accesibilidad residencial al transporte público',
    varName: 'A<sub>TP</sub>',
    numLabel: 'Viviendas a ≤500 m de una parada',
    denLabel: 'Viviendas totales',
    numField: 'Viviendas a ≤500 m de una parada',
    denField: 'Viviendas totales',
    explanation: 'Mide qué porcentaje de las viviendas de la zona tiene una parada de transporte público a menos de 500 metros. A mayor indicador, mayor accesibilidad residencial al sistema de transporte.',
    cascade: ['Transporte público', 'Cobertura de vivienda', 'Indicador A_TP'],
    cascadeText: 'Si cambia el transporte público → cambia la cobertura de vivienda → cambia el indicador.'
  },
  'corredores_verdes|ciclorrutas': {
    pair: ['corredores_verdes', 'ciclorrutas'],
    tag: 'Corredores verdes → Ciclorrutas',
    title: 'Integración de la cicloinfraestructura con los corredores verdes',
    varName: 'I<sub>CV</sub>',
    numLabel: 'km de ciclorrutas que recorren o se integran a corredores verdes',
    denLabel: 'km totales de ciclorrutas',
    numField: 'km de ciclorrutas dentro/junto a un corredor verde',
    denField: 'km totales de ciclorrutas',
    explanation: 'Numerador: kilómetros de ciclorrutas que están dentro, junto a o conectadas directamente con un corredor verde. Denominador: kilómetros totales de ciclorrutas del área estudiada. Resultado: porcentaje de la red ciclista articulada con la estructura verde. A mayor indicador, mayor integración entre la movilidad ciclista y los corredores verdes.',
    cascade: ['Corredores verdes', 'Cicloinfraestructura articulada', 'Indicador I_CV'],
    cascadeText: 'Si cambian los corredores verdes → cambia la articulación de las ciclorrutas → cambia el indicador.'
  },
  'humedales|espacio_publico': {
    pair: ['humedales', 'espacio_publico'],
    tag: 'Humedales → Espacio público',
    title: 'Vinculación del espacio público a los humedales',
    varName: 'I<sub>H</sub>',
    numLabel: 'Área de espacio público vinculada a humedales',
    denLabel: 'Área total de espacio público',
    numField: 'Área de espacio público vinculada a humedales (m²)',
    denField: 'Área total de espacio público (m²)',
    explanation: 'A mayor indicador, mayor integración entre el sistema ambiental y el espacio público.',
    cascade: ['Humedales', 'Espacio público vinculado', 'Indicador I_H'],
    cascadeText: 'Si cambian los humedales → cambia el espacio público vinculado a ellos → cambia el indicador.'
  },
  'red_vial|equipamientos': {
    pair: ['red_vial', 'equipamientos'],
    tag: 'Red vial → Equipamientos',
    title: 'Articulación de la red vial con los equipamientos',
    varName: 'I',
    numLabel: 'Equipamientos con acceso adecuado por la red vial',
    denLabel: 'Total de equipamientos',
    numField: 'Equipamientos con acceso adecuado por la red vial',
    denField: 'Total de equipamientos',
    explanation: 'Un mayor porcentaje indica una mayor articulación entre la red vial y la distribución territorial de los equipamientos.',
    cascade: ['Red vial', 'Acceso a equipamientos', 'Indicador I'],
    cascadeText: 'Si cambia la red vial → cambia el acceso a los equipamientos → cambia el indicador.'
  }
};

let activeIndicatorKey = null;

function findIndicatorForNode(id) {
  for (const key in INDICATORS) {
    if (INDICATORS[key].pair.includes(id)) return key;
  }
  return null;
}

function checkIndicatorPrompt(id) {
  const prompt = document.getElementById('indicatorPrompt');
  if (!prompt) return;
  const key = id ? findIndicatorForNode(id) : null;
  if (key) {
    activeIndicatorKey = key;
    const textEl = document.getElementById('indicatorPromptText');
    if (textEl) textEl.textContent = 'Este nodo tiene un indicador asociado del POT: ' + INDICATORS[key].tag + '.';
    prompt.style.display = 'flex';
  } else {
    prompt.style.display = 'none';
  }
}

function highlightIndicatorPair(pair) {
  document.querySelectorAll('#staticNetwork .node').forEach(n => {
    const nid = n.id.replace(/^n_/, '');
    n.classList.toggle('node-dim', !pair.includes(nid));
    n.classList.toggle('node-selected', pair.includes(nid));
  });

  document.querySelectorAll('#staticNetwork .links line').forEach(l => {
    const s = l.getAttribute('data-s');
    const t = l.getAttribute('data-t');
    const isPairLink = pair.includes(s) && pair.includes(t);
    l.classList.toggle('link-dim', !isPairLink);
    l.classList.toggle('link-active', isPairLink);
  });
}

function openIndicatorModal() {
  if (!activeIndicatorKey) return;
  const ind = INDICATORS[activeIndicatorKey];
  highlightIndicatorPair(ind.pair);

  document.getElementById('indicatorTag').textContent = ind.tag;
  document.getElementById('indicatorTitle').textContent = ind.title;
  document.getElementById('indicatorVarName').innerHTML = ind.varName;
  document.getElementById('indicatorVarName2').innerHTML = ind.varName;
  document.getElementById('indicatorNumLabel').textContent = ind.numLabel;
  document.getElementById('indicatorDenLabel').textContent = ind.denLabel;
  document.getElementById('indicatorNumFieldLabel').firstChild.textContent = ind.numField;
  document.getElementById('indicatorDenFieldLabel').firstChild.textContent = ind.denField;

  const expl = document.getElementById('indicatorExplanation');
  if (ind.explanation) {
    expl.textContent = ind.explanation;
    expl.style.display = 'block';
  } else {
    expl.style.display = 'none';
  }

  document.getElementById('indicatorCascade').innerHTML = ind.cascade
    .map(step => `<span class="cascade-step">${step}</span>`)
    .join('<i class="fa-solid fa-arrow-right"></i>');
  document.getElementById('indicatorCascadeText').textContent = ind.cascadeText;

  document.getElementById('indicatorNumerador').value = '';
  document.getElementById('indicatorDenominador').value = '';
  document.getElementById('indicatorError').style.display = 'none';
  document.getElementById('indicatorResult').style.display = 'none';

  const backdrop = document.getElementById('indicatorModalBackdrop');
  if (backdrop) backdrop.style.display = 'flex';
}

function closeIndicatorModal() {
  const backdrop = document.getElementById('indicatorModalBackdrop');
  if (backdrop) backdrop.style.display = 'none';
  clearSelection();
}

function closeIndicatorModalBackdrop(evt) {
  if (evt.target && evt.target.id === 'indicatorModalBackdrop') closeIndicatorModal();
}

function simulateIndicator() {
  const numEl = document.getElementById('indicatorNumerador');
  const denEl = document.getElementById('indicatorDenominador');
  const num = parseFloat(numEl.value);
  const den = parseFloat(denEl.value);

  const resultBox = document.getElementById('indicatorResult');
  const valueEl = document.getElementById('indicatorValue');
  const errorEl = document.getElementById('indicatorError');

  if (isNaN(num) || isNaN(den) || den <= 0 || num < 0) {
    if (errorEl) errorEl.style.display = 'block';
    if (resultBox) resultBox.style.display = 'none';
    return;
  }
  if (errorEl) errorEl.style.display = 'none';

  const value = (num / den) * 100;
  if (valueEl) valueEl.textContent = value.toFixed(1);
  if (resultBox) resultBox.style.display = 'block';
}
