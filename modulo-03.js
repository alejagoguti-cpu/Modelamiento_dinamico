/* ==========================================================
   RED — RELACIONES DEL TEXTO DEL POT — DISCURSO VS REALIDAD (Módulo 03)
   diagrama con física de nodos
   - Los nodos parten de una posición fija, pero se pueden ARRASTRAR:
     al mover una bola, las conectadas la "siguen" (fuerza de resorte),
     y el conjunto tiende a volver a su posición original.
   - Cada línea es una relación explícita o razonablemente inferible del texto del POT:
     dependencia, condicionamiento, causal, funcional, complementariedad,
     conflicto, jerarquía o retroalimentación.
   - Clic en una línea -> panel con la relación, el tipo, la frase exacta
     del POT y su página/fuente.
   - Doble clic en una bola -> la apaga (opacidad) y oculta sus líneas.
   - Triple clic en una bola -> aísla su flujo (solo se ven los nodos
     y líneas con los que se conecta directamente).
   - Convenciones:
       Dependencia:       azul      #5b8def  continua con flecha
       Condicionamiento:  turquesa  #2fd4c8  continua con flecha
       Causal:            naranja   #ef9552  continua con flecha
       Funcional:         morado    #a276f2  continua con flecha
       Complementariedad: verde     #4ade80  continua, sin flecha
       Conflicto:         rojo      #ef4444  continua, sin flecha
       Jerarquía:         rosa      #f76fb0  doble línea
       Retroalimentación: amarillo  #f5c945  punteada con flecha doble
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- Nodos: conceptos del POT con posición fija -------- */
const ODS_NODES = [
  { id: "metro",      num: "", name: "METRO",                                icon: "fa-train-subway",      color: "#2fd4c8", x: 760,  y: 150, r: 64 },
  { id: "transporte", num: "", name: "TRANSPORTE\nPÚBLICO",                   icon: "fa-bus",               color: "#ef9552", x: 470,  y: 180, r: 56 },
  { id: "corredores", num: "", name: "CORREDORES\nVERDES",                    icon: "fa-tree",              color: "#4ade80", x: 250,  y: 400, r: 58 },
  { id: "ciclorutas", num: "", name: "CICLORRUTAS",                           icon: "fa-person-biking",     color: "#a276f2", x: 560,  y: 440, r: 54 },
  { id: "equip",      num: "", name: "EQUIPAMIENTOS",                         icon: "fa-school",            color: "#5b8def", x: 1000, y: 210, r: 58 },
  { id: "vivienda",   num: "", name: "VIVIENDA\nVIS/PIP",                     icon: "fa-house",             color: "#f5c945", x: 1290, y: 260, r: 54 },
  { id: "manzanas",   num: "", name: "MANZANAS\nDEL CUIDADO",                 icon: "fa-people-roof",       color: "#f76fb0", x: 890,  y: 560, r: 56 },
  { id: "sserv",      num: "", name: "SERVICIOS\nSOCIALES",                   icon: "fa-hand-holding-heart", color: "#8de8c4", x: 600,  y: 650, r: 48 },
  { id: "scuidado",   num: "", name: "SERVICIOS\nDE CUIDADO",                 icon: "fa-heart-pulse",       color: "#ff7eb6", x: 1190, y: 520, r: 44 },
  { id: "patrimonio", num: "", name: "PATRIMONIO\nCULTURAL",                  icon: "fa-landmark",          color: "#c9a01a", x: 140,  y: 120, r: 56 },
  { id: "eep",        num: "", name: "EEP / ESTRUCTURA\nECOLÓGICA",           icon: "fa-leaf",              color: "#10b981", x: 420,  y: 660, r: 62 },
  { id: "riobogota",  num: "", name: "RÍO BOGOTÁ\nCUENCA",                    icon: "fa-water",             color: "#38bdf8", x: 1340, y: 620, r: 48 },
];

/* -------- física: cada nodo guarda su posición "casa" (ancla) y velocidad -------- */
ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* Tipos de relación del texto del POT (módulo 03) */
const TYPE_STYLE = {
  dependencia:      { color: "#5b8def", width: 2.6, label: "Dependencia" },
  condicionamiento: { color: "#2fd4c8", width: 2.6, label: "Condicionamiento" },
  causal:           { color: "#ef9552", width: 2.6, label: "Relación causal" },
  funcional:        { color: "#a276f2", width: 2.6, label: "Relación funcional" },
  complementariedad:{ color: "#4ade80", width: 2.4, label: "Complementariedad" },
  conflicto:        { color: "#ef4444", width: 2.6, label: "Conflicto" },
  jerarquia:        { color: "#f76fb0", width: 2.6, label: "Jerarquía" },
  retroalimentacion:{ color: "#f5c945", width: 2.4, label: "Retroalimentación" },
};

/* -------- Aristas: relaciones del texto del POT, 1 a 1 con la tabla -------- */
const RAW_EDGES = [
  { s: "metro",      t: "transporte", type: "dependencia",      directa: true,  pagina: 30,   sustento: '“...conectadas por un sistema multimodal de transporte público... basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorrutas.” La estructura de transporte público DEPENDe funcionalmente de la red Metro: el sistema multimodal se organiza alrededor de ella."' },
  { s: "corredores", t: "transporte", type: "dependencia",      directa: true,  pagina: 239,  sustento: '“...además del Metro, y para alimentarlo y complementarlo, están los corredores verdes, con diseño ecosistémico, transporte público eléctrico, ciclorrutas seguras y andenes, plazas y espacios de encuentro...” Los corredores verdes contienen los modos de transporte público eléctrico (arista dependencia, p. 239): su existencia y trazado dependen de la función de alimentar el sistema de transporte.' },
  { s: "corredores", t: "ciclorutas", type: "dependencia",      directa: true,  pagina: 239,  sustento: '“...además del Metro, y para alimentarlo y complementarlo, están los corredores verdes, con diseño ecosistémico, transporte público eléctrico, ciclorrutas seguras y andenes, plazas y espacios de encuentro...” Los corredores verdes contienen e imponen a las ciclorrutas seguras: la cicloinfraestructura depende del trazado del corredor."' },
  { s: "equip",      t: "manzanas",   type: "dependencia",      directa: true,  pagina: 125,  sustento: "“Aprovechar los equipamientos existentes como anclas de las Manzanas del Cuidado, para que en estos diferentes entidades del Distrito cuiden a quienes nos cuidan, fue el cuello de botella que se resolvió con el pot.” Las Manzanas del Cuidado dependen de los equipamientos existentes: sin anclas, no hay manzanas." },
  { s: "manzanas",   t: "sserv",      type: "dependencia",      directa: true,  pagina: 126,  sustento: "“...cualifica los servicios sociales del Distrito y hace efectiva la articulación interinstitucional.” Los servicios sociales dependen de las Manzanas del Cuidado para articularse: la cualificación declarada opera a través de ellas." },
  { s: "sserv",      t: "scuidado",   type: "dependencia",      directa: true,  pagina: 122,  sustento: "“Las Manzanas del Cuidado son áreas acotadas que agrupan diversas infraestructuras para brindar servicios de manera simultánea y articulada a las personas cuidadoras, a quienes ellas cuidan y a sus familias.” Los servicios de cuidado dependen de la infraestructura social agrupada: el servicio no existe sin el equipamiento que lo contiene." },
  { s: "metro",      t: "vivienda",   type: "condicionamiento", directa: true,  pagina: 43,   sustento: "“Además del Metro, Bogotá necesita con urgencia ampliar sus entradas y salidas, tapar más huecos, hacer más vías, ciclorrutas, cables y corredores verdes con buses eléctricos para que el transporte público de calidad llegue a todas partes, conecte a la gente, la saque del trancón y la contaminación.” La inversión en Metro condiciona el valor y la localización de la vivienda: la accesibilidad que promete el Metro se capitaliza en el mercado de suelo." },
  { s: "vivienda",   t: "equip",      type: "condicionamiento", directa: true,  pagina: 126,  sustento: "“Por un lado, priorizamos que los colegios o equipamientos educativos estén cerca de la vivienda o incluso cerca del trabajo de los padres.” La localización de la vivienda condiciona la ubicación de los equipamientos: la ciudad educativa se planea a partir del mapa de vivienda." },
  { s: "corredores", t: "transporte", type: "condicionamiento", directa: true,  pagina: 30, curve: 40,   sustento: "“...conectadas por un sistema multimodal de transporte público... basadas en la red Metro y alimentadas por los demás modos... como los corredores verdes...” La cobertura del transporte público está condicionada por los corredores verdes: el modo eléctrico se define por el trazado ambiental." },
  { s: "ciclorutas", t: "metro",      type: "condicionamiento", directa: true,  pagina: 43,   sustento: "“...hacer más vías, ciclorrutas, cables y corredores verdes con buses eléctricos para que el transporte público de calidad llegue a todas partes...” La expansión de ciclorrutas se condiciona al objetivo de conectar con la red Metro: la cicloinfraestructura se diseña como alimentadora del sistema principal." },
  { s: "eep",        t: "metro",      type: "causal",           directa: true,  pagina: 30,   sustento: "“...basadas en la red Metro y alimentadas por los demás modos...” La existencia de la red Metro como núcleo causa la subordinación del resto de modos: sin el Metro, el sistema multimodal no tendría la estructura que el POT describe." },
  { s: "corredores", t: "sserv",      type: "causal",           directa: true,  pagina: 30,   sustento: "“...corredores verdes, con diseño ecosistémico, transporte público eléctrico, ciclorrutas seguras y andenes, plazas y espacios de encuentro...” Los corredores verdes causan mejoras en los servicios sociales: el diseño ecosistémico reduce la carga térmica y de contaminación sobre la salud de quienes usan los servicios cercanos." },
  { s: "manzanas",   t: "sserv",      type: "causal",           directa: true,  pagina: 126,  sustento: "“...cualifica los servicios sociales del Distrito y hace efectiva la articulación interinstitucional.” La articulación de las Manzanas causa la cualificación de los servicios sociales: la simultaneidad del servicio es la causa directa del resultado declarado." },
  { s: "eep",        t: "riobogota",  type: "causal",           directa: true,  pagina: null, sustento: "“Fuente: Observaciones y Recomendaciones al POT — Cámara de Comercio de Bogotá (CTPD). El POT omite el Plan de Ordenación y Manejo de la Cuenca del Río Bogotá en su jerarquía de instrumentos, pese a que la estructura ecológica depende directamente de la cuenca.” La salud de la cuenca causa la funcionalidad de la estructura ecológica: si la cuenca se degrada, la EEP pierde su base hidrográfica.", paginaTexto: "Fuente: CCB" },
  { s: "metro",      t: "corredores", type: "funcional",        directa: true,  pagina: 239,  sustento: "“...además del Metro, y para alimentarlo y complementarlo, están los corredores verdes...” Los corredores verdes tienen la función de alimentar y complementar el Metro: su propósito estructural se define en relación con el sistema de transporte." },
  { s: "equip",      t: "sserv",      type: "funcional",        directa: true,  pagina: 126,  sustento: "“Por un lado, priorizamos que los colegios o equipamientos educativos estén cerca de la vivienda...” Los equipamientos funcionan como provisión física de los servicios sociales: su localización es la materialización del servicio." },
  { s: "patrimonio", t: "eep",        type: "funcional",        directa: true,  pagina: 196,  sustento: "“la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio.” El patrimonio cultural funciona como contenido de la EIP: su sistema de relaciones se precisa dentro de la estructura ecológica." },
  { s: "corredores", t: "ciclorutas", type: "complementariedad", directa: true,  pagina: 239, curve: 35,  sustento: "“...están los corredores verdes, con diseño ecosistémico, transporte público eléctrico, ciclorrutas seguras y andenes, plazas y espacios de encuentro...” Corredores verdes y ciclorrutas se complementan: el corredor aporta el trazado y la ciclorruta el modo activo; ambos se necesitan para el diseño ecosistémico completo." },
  { s: "manzanas",   t: "equip",      type: "complementariedad", directa: true,  pagina: 125, curve: 35,  sustento: "“Aprovechar los equipamientos existentes como anclas de las Manzanas del Cuidado...” Manzanas del Cuidado y equipamientos se complementan: la manzana aporta la articulación social y el equipamiento la infraestructura; juntos forman el sistema de cuidado sin duplicarlo." },
  { s: "transporte", t: "ciclorutas", type: "complementariedad", directa: true,  pagina: 43,   sustento: "“...hacer más vías, ciclorrutas, cables y corredores verdes con buses eléctricos para que el transporte público de calidad llegue a todas partes...” El transporte público masivo y la ciclorruta se complementan: el bus eléctrico cubre distancias largas y la bicicleta las de proximidad; la calidad del transporte depende de ambos." },
  { s: "metro",      t: "patrimonio", type: "conflicto",        directa: true,  pagina: 186,  sustento: "“...son el testimonio de complejas estrategias de cómo interpretamos y valoramos las huellas del territorio que habitamos.” (p. 186) y p. 43: el Metro avanza sobre territorios con huellas patrimoniales sin que la red de transporte declare mecanismos de protección del patrimonio arqueológico en su trazado; los dos sistemas compiten por el mismo suelo." },
  { s: "metro",      t: "eep",        type: "jerarquia",        directa: true,  pagina: 30,   sustento: "“...basadas en la red Metro y alimentadas por los demás modos...” La red Metro ocupa el primer nivel de la jerarquía de transporte: todos los demás modos se definen como “alimentadores” de ella, sin simetría entre modos." },
  { s: "patrimonio", t: "eep",        type: "jerarquia",        directa: true,  pagina: 196,  sustento: "“la EIP inscribe y precisa un sistema de relaciones del patrimonio cultural material, inmaterial y natural en el territorio.” El patrimonio queda jerárquicamente subordinado a la EIP: la EIP “inscribe” al patrimonio, no al revés; el patrimonio hereda la posición de la estructura ecológica." },
  { s: "transporte", t: "corredores", type: "jerarquia",        directa: true,  pagina: 30, curve: 40,   sustento: "“...conectadas por un sistema multimodal de transporte público... basadas en la red Metro y alimentadas por los demás modos...” El sistema de transporte ordena jerárquicamente a los corredores verdes: estos son “modos y medios” que alimentan, no estructuras autónomas con propósito propio." },
  { s: "vivienda",   t: "metro",      type: "retroalimentacion", directa: true,  pagina: 43,   sustento: "“...para que el transporte público de calidad llegue a todas partes, conecte a la gente, la saque del trancón y la contaminación.” El Metro aumenta el valor del suelo y la vivienda se encarece cerca de las estaciones; el encarecimiento expulsa a la población que el Metro pretendía conectar, que demanda más transporte público: el sistema se realimenta negativamente." },
  { s: "corredores", t: "transporte", type: "retroalimentacion", directa: true,  pagina: 30, curve: 55,   sustento: "“...basadas en la red Metro y alimentadas por los demás modos...” Los corredores verdes alimentan al transporte público, pero la expansión del transporte público exige más corredores: cada ampliación del sistema multimodal reclama nuevo trazado verde, realimentando la dependencia." },
  { s: "sserv",      t: "manzanas",   type: "retroalimentacion", directa: true,  pagina: 126, curve: 30,  sustento: "“...cualifica los servicios sociales del Distrito y hace efectiva la articulación interinstitucional.” Los servicios sociales cualifican las Manzanas, pero las Manzanas demandan más servicios sociales para mantener la articulación: la cualificación genera demanda que exige más cualificación." },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- física: longitud de reposo de cada resorte (arista) -------- */
RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  const dist = Math.hypot(t.x - s.x, t.y - s.y);
  edge.restLength = dist;
  /* curvas suaves para las relaciones de retroalimentación, para que no se solapen con las directas */
  if (edge.type === "retroalimentacion" && !edge.curve) edge.curve = 26;
});

/* -------- defs: glow por color de nodo + flechas por tipo -------- */
function buildDefs(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");

  const uniqueColors = [...new Set(ODS_NODES.map(n => n.color))];
  uniqueColors.forEach(color => {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "glow-" + color.replace("#", ""));
    filter.setAttribute("x", "-60%"); filter.setAttribute("y", "-60%");
    filter.setAttribute("width", "220%"); filter.setAttribute("height", "220%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3.2"); blur.setAttribute("result", "blur");
    const merge = document.createElementNS(SVG_NS, "feMerge");
    ["blur", "blur", "SourceGraphic"].forEach(ref => {
      const m = document.createElementNS(SVG_NS, "feMergeNode");
      m.setAttribute("in", ref);
      merge.appendChild(m);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });

  Object.entries(TYPE_STYLE).forEach(([type, style]) => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", "arrow-" + type);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8"); marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "7"); marker.setAttribute("markerHeight", "7");
    marker.setAttribute("orient", "auto-start-reverse");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", "M0,0 L10,5 L0,10 z");
    path.setAttribute("fill", style.color);
    marker.appendChild(path);
    defs.appendChild(marker);
  });

  svg.appendChild(defs);
}

/* -------- aristas: grupo con línea visual + línea invisible más ancha para clic -------- */
function edgePathData(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const startPad = s.r + 2;
  const endPad = t.r + 8;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad,   y2 = t.y - uy * endPad;

  if (edge.curve) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const px = -uy, py = ux;
    const cx = mx + px * edge.curve, cy = my + py * edge.curve;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  }
  return `M${x1},${y1} L${x2},${y2}`;
}

/* doble línea paralela para jerarquías implícitas */
function edgePathDataDouble(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const px = -uy, py = ux;
  const off = 3;
  const startPad = s.r + 2;
  const endPad = t.r + 2;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad,   y2 = t.y - uy * endPad;
  return [
    `M${x1 + px * off},${y1 + py * off} L${x2 + px * off},${y2 + py * off}`,
    `M${x1 - px * off},${y1 - py * off} L${x2 - px * off},${y2 - py * off}`,
  ];
}

function drawEdges(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edges-layer");

  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s);
    const t = nodeById(edge.t);
    if (!s || !t) return;
    const style = TYPE_STYLE[edge.type];
    const d = edgePathData(edge, s, t);
    /* retroalimentación: punteada siempre, flecha doble en ambos sentidos */

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);
    group.style.setProperty("--edge-color", style.color);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("d", d);
    hit.setAttribute("class", "ods-edge edge-hit");

    let visualEl = null;
    if (edge.type === "jerarquia") {
      /* dos líneas paralelas para jerarquías implícitas */
      const [d1, d2] = edgePathDataDouble(edge, s, t);
      const sub = document.createElementNS(SVG_NS, "g");
      sub.setAttribute("class", "ods-edge edge-visual");
      const v1 = document.createElementNS(SVG_NS, "path");
      v1.setAttribute("d", d1);
      const v2 = document.createElementNS(SVG_NS, "path");
      v2.setAttribute("d", d2);
      [v1, v2].forEach(v => {
        v.setAttribute("stroke", style.color);
        v.setAttribute("stroke-width", style.width * 0.55);
      });
      sub.appendChild(v1); sub.appendChild(v2);
      visualEl = sub;
      edge._el = { visual: sub, d1, d2, hit };
    } else {
      const visual = document.createElementNS(SVG_NS, "path");
      visual.setAttribute("d", d);
      visual.setAttribute("class", "ods-edge edge-visual");
      visual.setAttribute("stroke", style.color);
      visual.setAttribute("stroke-width", style.width);
      const sinFlecha = (edge.type === "complementariedad" || edge.type === "conflicto");
      const esRetro = (edge.type === "retroalimentacion");
      if (esRetro || !edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
      if (edge.directa && !sinFlecha) visual.setAttribute("marker-end", `url(#arrow-${edge.type})`);
      if (esRetro && edge.directa) {
        /* flecha doble: retroalimentación en ambos sentidos */
        visual.setAttribute("marker-start", `url(#arrow-${edge.type})`);
      }
      visual.setAttribute("opacity", "0.9");
      visualEl = visual;
      edge._el = { visual, hit };
    }

    group.appendChild(visualEl);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(i));
    g.appendChild(group);
  });

  svg.appendChild(g);
}

/* -------- nodos -------- */
function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node");
    group.setAttribute("data-id", node.id);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring");
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("stroke", node.color);
    circle.setAttribute("stroke-width", 2.5);
    circle.setAttribute("filter", "url(#glow-" + node.color.replace("#", "") + ")");

    const fo = document.createElementNS(SVG_NS, "foreignObject");
    const size = node.r * 2.2;
    fo.setAttribute("x", node.x - size / 2); fo.setAttribute("y", node.y - size / 2);
    fo.setAttribute("width", size); fo.setAttribute("height", size);

    const wrapper = document.createElementNS(XHTML_NS, "div");
    wrapper.setAttribute("class", "node-inner");
    wrapper.setAttribute("style",
      "width:100%;height:100%;display:flex;flex-direction:column;" +
      "align-items:center;justify-content:center;gap:1px;pointer-events:none;"
    );

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon + " node-icon");
    iconEl.setAttribute("style", `color:${node.color}; font-size:${node.r * 0.42}px; margin:1px 0;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("class", "node-name");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.155, 7.5)}px; padding:0 3px; font-weight:700; color:#e7eaf2; line-height:1.15; white-space:pre-line;`);
    nameEl.textContent = node.name;

    wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
    fo.appendChild(wrapper);

    group.appendChild(circle);
    group.appendChild(fo);
    attachNodeClickHandler(group, node.id);
    attachNodeDragHandler(group, node);
    g.appendChild(group);

    node._el = { group, circle, fo };
  });

  svg.appendChild(g);
}

/* -------- física: mover nodos y recalcular líneas cada frame -------- */
const PHYSICS = {
  spring: 0.045,
  anchor: 0.02,
  damping: 0.82,
  minVel: 0.02,
};

function updatePositions() {
  ODS_NODES.forEach(n => {
    if (!n._el) return;
    n._el.circle.setAttribute("cx", n.x);
    n._el.circle.setAttribute("cy", n.y);
    const size = n.r * 2.2;
    n._el.fo.setAttribute("x", n.x - size / 2);
    n._el.fo.setAttribute("y", n.y - size / 2);
  });
  RAW_EDGES.forEach(edge => {
    if (!edge._el) return;
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const d = edgePathData(edge, s, t);
    if (edge.type === "jerarquia" && edge._el.d1) {
      const [d1, d2] = edgePathDataDouble(edge, s, t);
      edge._el.visual.childNodes[0].setAttribute("d", d1);
      edge._el.visual.childNodes[1].setAttribute("d", d2);
    } else {
      edge._el.visual.setAttribute("d", d);
    }
    edge._el.hit.setAttribute("d", d);
  });
}

let physicsRunning = false;
function physicsStep() {
  let moving = false;

  RAW_EDGES.forEach(edge => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const dx = t.x - s.x, dy = t.y - s.y;
    const dist = Math.hypot(dx, dy) || 1;
    const diff = (dist - edge.restLength) * PHYSICS.spring;
    const fx = (dx / dist) * diff, fy = (dy / dist) * diff;
    if (edge.repel) {
      /* repulsión: las tensiones implícitas empujan los nodos apartados */
      if (!s.fixed) { s.vx -= fx * 2.2; s.vy -= fy * 2.2; }
      if (!t.fixed) { t.vx += fx * 2.2; t.vy += fy * 2.2; }
    } else {
      if (!s.fixed) { s.vx += fx; s.vy += fy; }
      if (!t.fixed) { t.vx -= fx; t.vy -= fy; }
    }
  });

  ODS_NODES.forEach(n => {
    if (n.fixed) { n.vx = 0; n.vy = 0; return; }
    n.vx += (n.homeX - n.x) * PHYSICS.anchor;
    n.vy += (n.homeY - n.y) * PHYSICS.anchor;
    n.vx *= PHYSICS.damping;
    n.vy *= PHYSICS.damping;
    n.x += n.vx;
    n.y += n.vy;
    if (Math.abs(n.vx) > PHYSICS.minVel || Math.abs(n.vy) > PHYSICS.minVel) moving = true;
  });

  updatePositions();

  if (moving || ODS_NODES.some(n => n.fixed)) {
    requestAnimationFrame(physicsStep);
  } else {
    physicsRunning = false;
  }
}

function wakePhysics() {
  if (!physicsRunning) {
    physicsRunning = true;
    requestAnimationFrame(physicsStep);
  }
}

/* -------- arrastrar una bola -------- */
function attachNodeDragHandler(group, node) {
  const svg = document.getElementById("networkViz");
  let dragging = false;
  let moved = false;
  let startClientX = 0, startClientY = 0;

  function toSvgPoint(clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const m = svg.getScreenCTM().inverse();
    return pt.matrixTransform(m);
  }

  group.addEventListener("pointerdown", (e) => {
    dragging = true;
    moved = false;
    startClientX = e.clientX; startClientY = e.clientY;
    node.fixed = true;
    group.classList.add("dragging");
    group.setPointerCapture(e.pointerId);
    wakePhysics();
  });

  group.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    if (Math.hypot(e.clientX - startClientX, e.clientY - startClientY) > 4) moved = true;
    const p = toSvgPoint(e.clientX, e.clientY);
    node.x = p.x; node.y = p.y;
    node.vx = 0; node.vy = 0;
    updatePositions();
    wakePhysics();
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    node.fixed = false;
    group.classList.remove("dragging");
    try { group.releasePointerCapture(e.pointerId); } catch (err) {}
    wakePhysics();
    if (moved) {
      group.dataset.suppressClick = "1";
      setTimeout(() => { delete group.dataset.suppressClick; }, 0);
    }
  }

  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
}

function renderNetwork() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg);
  drawEdges(svg);
  drawNodes(svg);
}

/* -------- panel de sustento documental (clic en línea) -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  const label = (n) => n.name.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent =
    `${label(s)} → ${label(t)}`;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + (edge.directa ? " · Directa — continua" : " · Inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

  document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent =
    edge.paginaTexto ? `Página / Fuente: ${edge.paginaTexto}` : (edge.pagina != null ? `Página POT: p. ${edge.pagina}` : "Página: por confirmar");

  document.getElementById("edgeInfoPanel").classList.add("visible");

  /* resaltar la fila correspondiente de la tabla */
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => {
    row.classList.toggle("row-highlight", Number(row.dataset.edge) === index);
  });
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.remove("row-highlight"));
}

/* -------- estado de visibilidad: por tipo (leyenda) + por nodo (doble clic) -------- */
const typeOff = new Set();
const nodeOff = new Set();

function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type;
    const s = group.dataset.source;
    const t = group.dataset.target;
    const hidden = typeOff.has(type) || nodeOff.has(s) || nodeOff.has(t);
    group.classList.toggle("hidden-edge", hidden);
  });
}

function toggleNode(id) {
  const group = document.querySelector(`.ods-node[data-id="${id}"]`);
  if (!group) return;
  if (nodeOff.has(id)) {
    nodeOff.delete(id);
    group.classList.remove("node-off");
  } else {
    nodeOff.add(id);
    group.classList.add("node-off");
  }
  refreshEdgeVisibility();
}

/* -------- clic simple / doble / triple sobre una bola -------- */
function attachNodeClickHandler(group, id) {
  let count = 0;
  let timer = null;
  group.addEventListener("click", () => {
    if (group.dataset.suppressClick) return;
    count++;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (count === 2) {
        toggleNode(id);
      } else if (count >= 3) {
        toggleNodeFlow(id);
      }
      count = 0;
    }, 320);
  });
}

/* -------- spotlight -------- */
let spotlight = null;

function clearSpotlight() {
  spotlight = null;
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function setSpotlightNodes(nodeIds, expand) {
  spotlight = { mode: "nodes", nodes: new Set(nodeIds), expand: !!expand };
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function setSpotlightTypes(types) {
  spotlight = { mode: "types", types };
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  applySpotlightState();
}

function applySpotlightState() {
  let visibleNodes = null;
  let visibleEdges = null;

  if (spotlight && spotlight.mode === "nodes") {
    visibleNodes = new Set(spotlight.nodes);
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      const sIn = spotlight.nodes.has(edge.s);
      const tIn = spotlight.nodes.has(edge.t);
      if (spotlight.expand) {
        if (sIn || tIn) {
          visibleEdges.add(i);
          visibleNodes.add(edge.s);
          visibleNodes.add(edge.t);
        }
      } else {
        if (sIn && tIn) visibleEdges.add(i);
      }
    });
  } else if (spotlight && spotlight.mode === "types") {
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      if (spotlight.types.includes(edge.type)) visibleEdges.add(i);
    });
  }

  document.querySelectorAll(".ods-node").forEach(el => {
    const id = el.dataset.id;
    const dim = visibleNodes ? !visibleNodes.has(id) : false;
    el.classList.toggle("node-focus-dim", dim);
    el.classList.toggle("node-focus-active", !!(spotlight && spotlight.mode === "nodes" && spotlight.nodes.has(id)));
  });

  document.querySelectorAll(".edge-group").forEach(el => {
    const idx = Number(el.dataset.index);
    const dim = visibleEdges ? !visibleEdges.has(idx) : false;
    el.classList.toggle("edge-focus-dim", dim);
  });
}

function toggleNodeFlow(id) {
  const already = spotlight && spotlight.mode === "nodes" && spotlight.expand &&
                   spotlight.nodes.size === 1 && spotlight.nodes.has(id);
  if (already) {
    clearSpotlight();
  } else {
    setSpotlightNodes([id], true);
  }
}

/* -------- tarjetas de insights -------- */
const NODE_INSIGHTS = {
  dependencias:    ["metro", "transporte", "equip", "manzanas", "sserv", "scuidado", "corredores", "ciclorutas"],
  condicionamientos:["metro", "vivienda", "equip", "corredores", "transporte", "ciclorutas"],
  causales:        ["eep", "metro", "corredores", "sserv", "manzanas", "riobogota"],
  funcionales:     ["metro", "corredores", "equip", "sserv", "patrimonio", "eep"],
  complementariedades:["corredores", "ciclorutas", "manzanas", "equip", "transporte"],
  conflictos:      ["metro", "patrimonio"],
  jerarquias:      ["metro", "eep", "patrimonio", "transporte", "corredores"],
  retroalimentaciones:["vivienda", "metro", "corredores", "transporte", "sserv", "manzanas"],
};

const TYPE_KEY = {
  dependencias:     "dependencia",
  condicionamientos:"condicionamiento",
  causales:         "causal",
  funcionales:      "funcional",
  complementariedades:"complementariedad",
  conflictos:       "conflicto",
  jerarquias:       "jerarquia",
  retroalimentaciones:"retroalimentacion",
};

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;

  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  if (TYPE_KEY[key]) {
    setSpotlightTypes([TYPE_KEY[key]]);
  } else if (key === "todos") {
    const allIds = ODS_NODES.map(n => n.id);
    setSpotlightNodes(allIds, false);
  } else if (NODE_INSIGHTS[key] && NODE_INSIGHTS[key].length) {
    setSpotlightNodes(NODE_INSIGHTS[key], true);
  } else {
    setSpotlightNodes(ODS_NODES.map(n => n.id), false);
  }

  card.classList.add("active");
}

/* -------- panel de convenciones -------- */
function setupLegendToggle() {
  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const type = item.dataset.type;
      if (e.target.checked) typeOff.delete(type); else typeOff.add(type);
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });

  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
}

/* -------- controles Todos / por tipo de relación -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  const btn = [...document.querySelectorAll(".network-controls .control-btn")].find(b => b.textContent.trim().toLowerCase().startsWith(mode === "all" ? "todos" : TYPE_STYLE[mode].label.slice(0, 6).toLowerCase()));
  (btn || document.querySelector(`.network-controls .control-btn`)).classList.add("active");

  const groups = {
    all: ["dependencia", "condicionamiento", "causal", "funcional", "complementariedad", "conflicto", "jerarquia", "retroalimentacion"],
    dependencia: ["dependencia"],
    condicionamiento: ["condicionamiento"],
    causal: ["causal"],
    funcional: ["funcional"],
    complementariedad: ["complementariedad"],
    conflicto: ["conflicto"],
    jerarquia: ["jerarquia"],
    retroalimentacion: ["retroalimentacion"],
  };
  const activeTypes = groups[mode] || groups.all;

  document.querySelectorAll(".legend-item[data-type]").forEach(item => {
    const type = item.dataset.type;
    const input = item.querySelector("input");
    const show = activeTypes.includes(type);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) typeOff.delete(type); else typeOff.add(type);
  });
  refreshEdgeVisibility();
}

/* -------- botones de acción (placeholders) -------- */
function generateODSReport() { console.log("Generando reporte de red..."); }
function downloadAlignment() { console.log("Descargando tabla de relaciones..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
});
