/* ==========================================================
   MÓDULO 01 — CONSTRUIR LA RED — RED INTEGRAL DE LAS 4 ESTRUCTURAS DEL POT
   (v2: estructura visual del Módulo 02 — red interactiva + métricas)

   Las 4 estructuras del POT como capas de una sola red:
   1. Estructura Ecológica Principal ......... VERDE  (#4ade80)
   2. Estructura Funcional y del Cuidado ..... AZUL   (#5b8def)
   3. Estructura Socioeconómica Creativa e Innovación .. NARANJA (#ef9552)
   4. Estructura Integradora de Patrimonio ... MORADA (#a276f2)

   Tipos de relación:
   - soporte:    naranja #ef9552
   - resiliencia: azul    #5b8def
   - indirecta:  gris     #8b93a8 (discontinua, sin flecha)

   Líneas: continua (directa, con flecha) / discontinua (inferida o indirecta)
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

/* -------- Nodos: los componentes de las 4 estructuras -------- */
const ODS_NODES = [
  /* ============================================================
     5 MACROMODELOS (nodos madre, grandes) + sus conceptos propios.
     Cada paradigma tiene su color. Los conceptos comparten el color
     de su macromodelo. Las conexiones cruzadas revelan qué domina.
     ============================================================ */

  /* === 1. NEOLIBERAL / MERCANTILISTA — MAGENTA === */
  { id: "neoliberal",    cat: "m1", name: "NEOLIBERAL\nMERCANTILISTA",   icon: "fa-money-bill-trend-up", color: "#e94d8c", x: 1900, y: 200, r: 64 },
  { id: "renta_suelo",   cat: "m1", name: "RENTA DEL\nSUELO",            icon: "fa-sack-dollar",    color: "#e94d8c", x: 2150, y: 120, r: 46 },
  { id: "competitividad",cat: "m1", name: "COMPETITIVIDAD\nURBANA",      icon: "fa-trophy",         color: "#e94d8c", x: 2250, y: 300, r: 46 },
  { id: "mercado_inmob", cat: "m1", name: "MERCADO\nINMOBILIARIO",       icon: "fa-building-circle-arrow-right", color: "#e94d8c", x: 2100, y: 400, r: 46 },
  { id: "aglomeracion",  cat: "m1", name: "AGLOMERACIÓN\nCAPITALISTA",    icon: "fa-city",           color: "#e94d8c", x: 1750, y: 350, r: 46 },

  /* === 2. DESARROLLISTA / PRODUCTIVISTA — NARANJA === */
  { id: "desarrollista", cat: "m2", name: "DESARROLLISTA\nPRODUCTIVISTA", icon: "fa-industry",       color: "#ef9552", x: 1400, y: 780, r: 64 },
  { id: "grandes_obras", cat: "m2", name: "GRANDES\nOBRAS",              icon: "fa-helmet-safety",  color: "#ef9552", x: 1150, y: 850, r: 46 },
  { id: "pib_urbano",    cat: "m2", name: "CRECIMIENTO\nPIB",            icon: "fa-arrow-trend-up", color: "#ef9552", x: 1650, y: 870, r: 46 },
  { id: "infra_vial",    cat: "m2", name: "INFRAESTRUCTURA\nVIAL",       icon: "fa-road",           color: "#ef9552", x: 1400, y: 950, r: 46 },
  { id: "reconversion",  cat: "m2", name: "RECONVERSIÓN\nPRODUCTIVA",     icon: "fa-arrows-spin",    color: "#ef9552", x: 1750, y: 720, r: 46 },

  /* === 3. AMBIENTALISTA (DISCURSIVO) — VERDE === */
  { id: "ambientalista", cat: "m3", name: "AMBIENTALISTA\n(DISCURSIVO)",  icon: "fa-leaf",           color: "#4ade80", x: 500,  y: 250, r: 64 },
  { id: "serv_ecosist",  cat: "m3", name: "SERVICIOS\nECOSISTÉMICOS",     icon: "fa-seedling",       color: "#4ade80", x: 250,  y: 150, r: 46 },
  { id: "reverdece",     cat: "m3", name: "BOGOTÁ\nREVERDECE",           icon: "fa-tree",           color: "#4ade80", x: 200,  y: 380, r: 46 },
  { id: "resiliencia_c", cat: "m3", name: "RESILIENCIA\nCLIMÁTICA",       icon: "fa-shield-heart",   color: "#4ade80", x: 400,  y: 480, r: 46 },
  { id: "eep",           cat: "m3", name: "ESTRUCTURA\nECOLÓGICA (EEP)",  icon: "fa-mountain-sun",   color: "#4ade80", x: 700,  y: 380, r: 46 },

  /* === 4. TECNOCRÁTICO / ESTATISTA — AZUL === */
  { id: "tecnocratico",  cat: "m4", name: "TECNOCRÁTICO\nESTATISTA",      icon: "fa-gears",          color: "#5b8def", x: 1050, y: 180, r: 64 },
  { id: "indicadores",   cat: "m4", name: "INDICADORES\nY MÉTRICAS",      icon: "fa-chart-line",     color: "#5b8def", x: 800,  y: 100, r: 46 },
  { id: "norma_pot",     cat: "m4", name: "NORMA\nJURÍDICA (POT)",        icon: "fa-scale-balanced", color: "#5b8def", x: 1300, y: 90,  r: 46 },
  { id: "ciudad_intel",  cat: "m4", name: "CIUDAD\nINTELIGENTE",          icon: "fa-microchip",      color: "#5b8def", x: 1200, y: 320, r: 46 },
  { id: "planeacion",    cat: "m4", name: "PLANEACIÓN\nCENTRALIZADA",     icon: "fa-sitemap",        color: "#5b8def", x: 900,  y: 320, r: 46 },

  /* === 5. COMUNITARIO / DEL CUIDADO — MORADO === */
  { id: "comunitario",   cat: "m5", name: "COMUNITARIO\nDEL CUIDADO",     icon: "fa-people-group",   color: "#a276f2", x: 1300, y: 550, r: 64 },
  { id: "proximidad",    cat: "m5", name: "PROXIMIDAD\n(15 MIN)",         icon: "fa-person-walking", color: "#a276f2", x: 1100, y: 620, r: 46 },
  { id: "trabajo_cuidado",cat: "m5", name: "TRABAJO DE\nCUIDADO",         icon: "fa-hand-holding-heart", color: "#a276f2", x: 1550, y: 600, r: 46 },
  { id: "economia_pop",  cat: "m5", name: "ECONOMÍA\nPOPULAR",            icon: "fa-store",          color: "#a276f2", x: 1500, y: 450, r: 46 },
  { id: "tejido_barrial",cat: "m5", name: "TEJIDO\nBARRIAL",              icon: "fa-house-chimney-window", color: "#a276f2", x: 1150, y: 470, r: 46 },
];

ODS_NODES.forEach(n => {
  n.homeX = n.x; n.homeY = n.y;
  n.vx = 0; n.vy = 0;
  n.fixed = false;
});

/* -------- Estructuras: nombre y color de capa -------- */
const STRUCT_STYLE = {
  m1: { color: "#e94d8c", label: "Neoliberal / Mercantilista", tag: "NEOLIBERAL" },
  m2: { color: "#ef9552", label: "Desarrollista / Productivista", tag: "DESARROLLISTA" },
  m3: { color: "#4ade80", label: "Ambientalista (discursivo)", tag: "AMBIENTALISTA" },
  m4: { color: "#5b8def", label: "Tecnocrático / Estatista", tag: "TECNOCRÁTICO" },
  m5: { color: "#a276f2", label: "Comunitario / del Cuidado", tag: "COMUNITARIO" },
};

/* -------- Tipos de relación -------- */
const TYPE_STYLE = {
  dependencia:       { color: "#ef4444", width: 2.6, label: "Dependencia" },
  condicionamiento:  { color: "#f472b6", width: 2.6, label: "Condicionamiento" },
  causal:            { color: "#60a5fa", width: 2.6, label: "Causal" },
  funcional:         { color: "#c084fc", width: 2.6, label: "Funcional" },
  complementariedad: { color: "#fbbf24", width: 2.6, label: "Complementariedad" },
  conflicto:         { color: "#f87171", width: 2.6, label: "Conflicto" },
  jerarquia:         { color: "#a78bfa", width: 2.6, label: "Jerarquía" },
  retroalimentacion: { color: "#10b981", width: 2.6, label: "Retroalimentación" },
  regulacion:        { color: "#38bdf8", width: 2.6, label: "Regulación" },
};

/* -------- Aristas: relaciones de las 4 estructuras -------- */
const RAW_EDGES = [
  /* ============================================================
     A) Cada MACROMODELO despliega sus conceptos propios (dependencia)
     B) Conexiones CRUZADAS entre paradigmas revelan cuál domina
     El popup responde: por qué, qué circula, quién manda, consecuencia.
     ============================================================ */

  /* === A) NEOLIBERAL despliega sus conceptos === */
  { s: "neoliberal", t: "renta_suelo", type: "dependencia", directa: true, cat: "m1", sustento: "POR QUÉ: La renta del suelo es el motor del paradigma neoliberal. QUÉ CIRCULA: valorización, plusvalía urbana. CONSECUENCIA: el suelo se gestiona como activo financiero, no como bien común." },
  { s: "neoliberal", t: "competitividad", type: "dependencia", directa: true, cat: "m1", sustento: "POR QUÉ: La ciudad debe competir por inversión global. QUÉ CIRCULA: capital, imagen de marca-ciudad. CONSECUENCIA: prioriza atraer capital sobre resolver necesidades locales." },
  { s: "neoliberal", t: "mercado_inmob", type: "dependencia", directa: true, cat: "m1", sustento: "POR QUÉ: El mercado inmobiliario materializa la renta del suelo. QUÉ CIRCULA: transacciones, desarrollo privado. CONSECUENCIA: la vivienda como mercancía antes que como derecho." },
  { s: "neoliberal", t: "aglomeracion", type: "funcional", directa: true, cat: "m1", sustento: "POR QUÉ: La aglomeración concentra la actividad económica rentable. QUÉ CIRCULA: economías de escala. CONSECUENCIA: refuerza la segregación norte-sur de Bogotá." },

  /* === A) DESARROLLISTA despliega sus conceptos === */
  { s: "desarrollista", t: "grandes_obras", type: "dependencia", directa: true, cat: "m2", sustento: "POR QUÉ: El progreso se mide en megaproyectos visibles. QUÉ CIRCULA: inversión pública, legitimidad política. CONSECUENCIA: privilegia lo monumental sobre lo cotidiano." },
  { s: "desarrollista", t: "pib_urbano", type: "dependencia", directa: true, cat: "m2", sustento: "POR QUÉ: El crecimiento del PIB es el fin último. QUÉ CIRCULA: producción, empleo formal. CONSECUENCIA: subordina otros valores (ambiente, cuidado) al indicador económico." },
  { s: "desarrollista", t: "infra_vial", type: "dependencia", directa: true, cat: "m2", sustento: "POR QUÉ: La infraestructura vial encarna el desarrollo. QUÉ CIRCULA: inversión en asfalto (p.229). CONSECUENCIA: privilegia el auto y contradice la movilidad sostenible declarada." },
  { s: "desarrollista", t: "reconversion", type: "funcional", directa: true, cat: "m2", sustento: "POR QUÉ: Reconvertir zonas industriales genera nuevo valor. QUÉ CIRCULA: renovación urbana. CONSECUENCIA: puede desplazar economías y comunidades existentes." },

  /* === A) AMBIENTALISTA despliega sus conceptos === */
  { s: "ambientalista", t: "serv_ecosist", type: "dependencia", directa: true, cat: "m3", sustento: "POR QUÉ: Los servicios ecosistémicos justifican la protección. QUÉ CIRCULA: agua, aire, regulación climática. CONSECUENCIA: base técnica del discurso verde, pero débilmente operacionalizada." },
  { s: "ambientalista", t: "reverdece", type: "dependencia", directa: true, cat: "m3", sustento: "POR QUÉ: 'Bogotá Reverdece' es la marca del POT. QUÉ CIRCULA: legitimidad política, imagen. CONSECUENCIA: riesgo de greenwashing si no hay estructura que lo sostenga." },
  { s: "ambientalista", t: "resiliencia_c", type: "funcional", directa: true, cat: "m3", sustento: "POR QUÉ: La resiliencia climática es meta declarada. QUÉ CIRCULA: adaptación al cambio climático. CONSECUENCIA: aparece en objetivos pero con pocas relaciones vinculantes." },
  { s: "ambientalista", t: "eep", type: "dependencia", directa: true, cat: "m3", sustento: "POR QUÉ: La EEP es el corazón del paradigma ambiental (p.92). QUÉ CIRCULA: mandato de 'primera ordenante'. CONSECUENCIA: alta centralidad discursiva que la red pondrá a prueba." },

  /* === A) TECNOCRÁTICO despliega sus conceptos === */
  { s: "tecnocratico", t: "indicadores", type: "dependencia", directa: true, cat: "m4", sustento: "POR QUÉ: La ciudad se gobierna por métricas. QUÉ CIRCULA: datos, metas cuantitativas. CONSECUENCIA: lo no medible (calidad de vida, vínculos) queda fuera del modelo." },
  { s: "tecnocratico", t: "norma_pot", type: "dependencia", directa: true, cat: "m4", sustento: "POR QUÉ: El POT como norma jurídica ordena el territorio. QUÉ CIRCULA: regulación, obligatoriedad legal. CONSECUENCIA: da estabilidad pero puede rigidizar frente a dinámicas emergentes." },
  { s: "tecnocratico", t: "ciudad_intel", type: "funcional", directa: true, cat: "m4", sustento: "POR QUÉ: La 'ciudad inteligente' promete gestión eficiente. QUÉ CIRCULA: datos, tecnología. CONSECUENCIA: puede despolitizar decisiones urbanas presentándolas como técnicas." },
  { s: "tecnocratico", t: "planeacion", type: "dependencia", directa: true, cat: "m4", sustento: "POR QUÉ: La planeación centralizada es el método del Estado. QUÉ CIRCULA: decisiones top-down. CONSECUENCIA: tensión con la autoorganización barrial y comunitaria." },

  /* === A) COMUNITARIO despliega sus conceptos === */
  { s: "comunitario", t: "proximidad", type: "dependencia", directa: true, cat: "m5", sustento: "POR QUÉ: La proximidad (ciudad de 15 min) es el ideal del cuidado. QUÉ CIRCULA: acceso cotidiano a servicios. CONSECUENCIA: reconfiguraría la ciudad si dejara de ser periférica." },
  { s: "comunitario", t: "trabajo_cuidado", type: "dependencia", directa: true, cat: "m5", sustento: "POR QUÉ: El trabajo de cuidado sostiene la vida. QUÉ CIRCULA: tiempo, labor no remunerada. CONSECUENCIA: su reconocimiento cambiaría las prioridades del modelo urbano." },
  { s: "comunitario", t: "economia_pop", type: "funcional", directa: true, cat: "m5", sustento: "POR QUÉ: La economía popular es la base material del barrio. QUÉ CIRCULA: comercio local, plazas de mercado. CONSECUENCIA: en tensión con la modernización mercantil que la desplaza." },
  { s: "comunitario", t: "tejido_barrial", type: "dependencia", directa: true, cat: "m5", sustento: "POR QUÉ: El tejido barrial es la red social del cuidado. QUÉ CIRCULA: confianza, apoyo mutuo. CONSECUENCIA: capital social que el POT reconoce poco en su estructura." },

  /* === B) CONEXIONES CRUZADAS — el hallazgo: quién domina === */
  { s: "renta_suelo", t: "eep", type: "conflicto", directa: true, cat: "m1", sustento: "HALLAZGO CENTRAL: La renta del suelo choca con la EEP. QUIÉN MANDA: la renta subordina a la ecología en la práctica presupuestal. CONSECUENCIA: la EEP 'rectora' cede ante el mercado — el modelo declarado (verde) ≠ operativo (mercado)." },
  { s: "mercado_inmob", t: "reverdece", type: "conflicto", directa: true, cat: "m1", sustento: "POR QUÉ: El mercado inmobiliario vacía de contenido a 'Reverdece'. QUIÉN MANDA: el capital sobre el discurso verde. CONSECUENCIA: greenwashing — la marca ambiental sin sustancia estructural." },
  { s: "infra_vial", t: "eep", type: "conflicto", directa: true, cat: "m2", sustento: "POR QUÉ: La expansión vial (ALO) amenaza cerros y riberas. QUIÉN MANDA: el desarrollismo sobre lo ecológico. CONSECUENCIA: contradicción central que la lectura lineal del POT oculta." },
  { s: "pib_urbano", t: "trabajo_cuidado", type: "jerarquia", directa: true, cat: "m2", sustento: "POR QUÉ: El PIB no contabiliza el trabajo de cuidado. QUIÉN MANDA: la lógica productivista invisibiliza el cuidado. CONSECUENCIA: el cuidado, central en el discurso, es periférico en el presupuesto." },
  { s: "aglomeracion", t: "proximidad", type: "conflicto", directa: true, cat: "m1", sustento: "POR QUÉ: La aglomeración concentra, la proximidad distribuye. QUIÉN MANDA: la aglomeración capitalista domina la localización. CONSECUENCIA: la ciudad de 15 min queda como aspiración frente a la concentración real." },
  { s: "grandes_obras", t: "tejido_barrial", type: "conflicto", directa: true, cat: "m2", sustento: "POR QUÉ: Las grandes obras fracturan el tejido barrial. QUIÉN MANDA: la escala megaproyecto sobre la escala humana. CONSECUENCIA: revela qué prioriza el POT — la macro-obra sobre el micro-cuidado." },
  { s: "norma_pot", t: "eep", type: "regulacion", directa: true, cat: "m4", sustento: "POR QUÉ: La norma jurídica debería proteger la EEP. QUÉ CIRCULA: obligatoriedad legal. CONSECUENCIA: si la norma no vincula fuerte, la protección es declarativa." },
  { s: "indicadores", t: "trabajo_cuidado", type: "jerarquia", directa: true, cat: "m4", sustento: "POR QUÉ: Los indicadores no miden el cuidado. QUIÉN MANDA: la métrica define qué importa. CONSECUENCIA: lo no cuantificable se vuelve invisible para la planeación." },
  { s: "competitividad", t: "economia_pop", type: "conflicto", directa: true, cat: "m1", sustento: "POR QUÉ: La competitividad global desprecia la economía popular. QUIÉN MANDA: el capital formal sobre el informal. CONSECUENCIA: plazas de mercado y economía barrial en riesgo de desplazamiento." },
  { s: "reconversion", t: "economia_pop", type: "conflicto", directa: false, cat: "m2", sustento: "POR QUÉ: La reconversión productiva desplaza economías existentes. QUIÉN MANDA: el desarrollo sobre lo popular. CONSECUENCIA: gentrificación económica no reconocida en el POT." },

  /* === B) EMERGENCIA: alianzas y contrapesos === */
  { s: "comunitario", t: "ambientalista", type: "complementariedad", directa: true, cat: "m5", sustento: "EMERGENCIA: Cuidado y ambiente comparten lógica de sostenibilidad de la vida. ALIANZA POTENCIAL: juntos podrían ser contrapeso al eje neoliberal-desarrollista. CONSECUENCIA: de esta alianza podría emerger un modelo alternativo de ciudad." },
  { s: "neoliberal", t: "desarrollista", type: "complementariedad", directa: true, cat: "m1", sustento: "EMERGENCIA: Neoliberal y desarrollista se refuerzan mutuamente. ALIANZA DOMINANTE: mercado + grandes obras = el eje que realmente estructura el POT. CONSECUENCIA: juntos subordinan a los otros tres paradigmas." },
  { s: "tecnocratico", t: "neoliberal", type: "funcional", directa: false, cat: "m4", sustento: "EMERGENCIA: La tecnocracia da forma técnica-neutral a decisiones de mercado. QUÉ CIRCULA: legitimación experta. CONSECUENCIA: presenta como 'técnico' lo que es una opción política a favor del capital." },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* -------- física: longitud de reposo -------- */
RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) return;
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

/* -------- defs: glow + flechas -------- */
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

/* -------- aristas -------- */
function edgePathData(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const startPad = s.r + 2;
  const endPad = t.r + 8;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad,   y2 = t.y - uy * endPad;
  return `M${x1},${y1} L${x2},${y2}`;
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

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group");
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.type);
    group.setAttribute("data-cat", edge.cat);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);
    group.style.setProperty("--edge-color", style.color);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("d", d);
    hit.setAttribute("class", "ods-edge edge-hit");

    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("d", d);
    visual.setAttribute("class", "ods-edge edge-visual");
    visual.setAttribute("stroke", style.color);
    visual.setAttribute("stroke-width", style.width);
    if (!edge.directa) visual.setAttribute("stroke-dasharray", "6,5");
    if (edge.directa) visual.setAttribute("marker-end", `url(#arrow-${edge.type})`);
    visual.setAttribute("opacity", "0.9");

    group.appendChild(visual);
    group.appendChild(hit);
    group.addEventListener("click", () => showEdgeInfo(i));
    g.appendChild(group);

    edge._el = { visual, hit, d };
  });

  svg.appendChild(g);
}

/* -------- nodos -------- */
function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");

  ODS_NODES.forEach(node => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node ods-node-" + node.cat);
    group.setAttribute("data-id", node.id);
    group.setAttribute("data-cat", node.cat);

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

    const tagEl = document.createElementNS(XHTML_NS, "div");
    tagEl.setAttribute("class", "node-cat-tag");
    tagEl.setAttribute("style", `font-size:${Math.max(node.r * 0.135, 6.5)}px; margin-top:1px; font-weight:700; letter-spacing:0.3px; color:${node.color}; white-space:nowrap;`);
    tagEl.textContent = STRUCT_STYLE[node.cat].tag;

    wrapper.appendChild(iconEl); wrapper.appendChild(nameEl); wrapper.appendChild(tagEl);
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

/* -------- física -------- */
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
    edge._el.visual.setAttribute("d", d);
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
    if (!s.fixed) { s.vx += fx; s.vy += fy; }
    if (!t.fixed) { t.vx -= fx; t.vy -= fy; }
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

/* -------- arrastre -------- */
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

/* -------- panel de información -------- */
function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  const style = TYPE_STYLE[edge.type];
  const struct = STRUCT_STYLE[edge.cat];

  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");

  const label = (n) => n.name.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = `${label(s)} → ${label(t)}`;

  const typeEl = document.getElementById("edgeInfoType");
  typeEl.textContent = style.label + " · " + struct.label + (edge.directa ? " · Directa — continua" : " · Indirecta / inferida");
  typeEl.style.color = style.color;
  typeEl.style.background = style.color + "26";

    document.getElementById("edgeInfoQuote").textContent = edge.sustento;
  document.getElementById("edgeInfoPage").textContent =
    (edge.pagina ? `Página POT: p. ${edge.pagina} · ` : "") + "Estructura POT: " + struct.label;
  document.getElementById("edgeInfoPanel").classList.add("visible");

  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => {
    row.classList.toggle("row-highlight", Number(row.dataset.edge) === index);
  });
}

function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.remove("row-highlight"));
}

/* -------- visibilidad -------- */
const typeOff = new Set();
const nodeOff = new Set();
const catOff = new Set();

function refreshEdgeVisibility() {
  // Primero, ocultar/mostrar líneas
  const visibleNodes = new Set(ODS_NODES.map(n => n.id));
  
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type;
    const cat = group.dataset.cat;
    const s = group.dataset.source;
    const t = group.dataset.target;
    const hidden = typeOff.has(type) || nodeOff.has(s) || nodeOff.has(t) || catOff.has(cat);
    group.classList.toggle("hidden-edge", hidden);
    
    // Si la línea está visible, marcar sus nodos como conectados
    if (!hidden) {
      visibleNodes.add(s);
      visibleNodes.add(t);
    }
  });

  // Luego, ocultar nodos que NO tienen líneas visibles
  document.querySelectorAll(".ods-node").forEach(node => {
    const nodeId = node.dataset.id;
    const hasVisibleEdges = visibleNodes.has(nodeId) && !nodeOff.has(nodeId);
    node.classList.toggle("hidden-node", !hasVisibleEdges);
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

/* -------- clic simple / doble / triple -------- */
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
  applySpotlightState();
}

function setSpotlightTypes(types) {
  spotlight = { mode: "types", types };
  applySpotlightState();
}

function setSpotlightCats(cats, keepAllNodes) {
  spotlight = { mode: "cats", cats, keepAllNodes: !!keepAllNodes };
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
    visibleNodes = new Set();
    RAW_EDGES.forEach((edge, i) => {
      if (spotlight.types.includes(edge.type)) {
        visibleEdges.add(i);
        visibleNodes.add(edge.s);
        visibleNodes.add(edge.t);
      }
    });
  } else if (spotlight && spotlight.mode === "cats") {
    visibleNodes = new Set();
    visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      if (spotlight.cats.includes(edge.cat)) {
        visibleEdges.add(i);
        visibleNodes.add(edge.s);
        visibleNodes.add(edge.t);
      }
    });
    if (spotlight.keepAllNodes) {
      ODS_NODES.forEach(n => visibleNodes.add(n.id));
    }
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
  e1: ODS_NODES.filter(n => n.cat === "e1").map(n => n.id),
  e2: ODS_NODES.filter(n => n.cat === "e2").map(n => n.id),
  e3: ODS_NODES.filter(n => n.cat === "e3").map(n => n.id),
  e4: ODS_NODES.filter(n => n.cat === "e4").map(n => n.id),
};

const TYPE_KEY = {
  dependencia:       "dependencia",
  condicionamiento:  "condicionamiento",
  causal:            "causal",
  funcional:         "funcional",
  complementariedad: "complementariedad",
  conflicto:         "conflicto",
  jerarquia:         "jerarquia",
  retroalimentacion: "retroalimentacion",
  regulacion:        "regulacion",
};

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;

  if (card.classList.contains("active")) {
    clearSpotlight();
    return;
  }

  // Quitar active de todas las demás tarjetas primero
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));

  if (key === "todas" || key === "todos") {
    clearSpotlight();
    return;
  }

  // Si el key es un ID de nodo (macromodelo), resaltar ese nodo y sus conexiones
  if (nodeById(key)) {
    setSpotlightNodes([key], true);
    card.classList.add("active");
    return;
  }

  if (TYPE_KEY[key]) {
    setSpotlightTypes([TYPE_KEY[key]]);
  } else if (NODE_INSIGHTS[key] && NODE_INSIGHTS[key].length) {
    setSpotlightCats([key], true);
    NODE_INSIGHTS[key].forEach(id => {
      const el = document.querySelector(`.ods-node[data-id="${id}"]`);
      if (el) el.classList.add("node-focus-active");
    });
  } else {
    setSpotlightNodes(ODS_NODES.map(n => n.id), false);
  }

  card.classList.add("active");
}

/* -------- leyenda -------- */
function setupLegendToggle() {
  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const mode = item.dataset.mode;
      const val = item.dataset.type || item.dataset.cat;
      if (e.target.checked) {
        if (mode === "type") typeOff.delete(val); else catOff.delete(val);
      } else {
        if (mode === "type") typeOff.add(val); else catOff.add(val);
      }
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });

  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
}

/* -------- filtros -------- */
function filterNetwork(mode) {
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");

  const T = ["dependencia", "condicionamiento", "causal", "funcional", "complementariedad", "conflicto", "jerarquia", "retroalimentacion", "regulacion"];
  const C = ["m1", "m2", "m3", "m4", "m5"];
  const groups = {
    all:               { types: T, cats: C },
    dependencia:       { types: ["dependencia"],       cats: C },
    condicionamiento:  { types: ["condicionamiento"],  cats: C },
    causal:            { types: ["causal"],            cats: C },
    funcional:         { types: ["funcional"],         cats: C },
    complementariedad: { types: ["complementariedad"], cats: C },
    conflicto:         { types: ["conflicto"],         cats: C },
    jerarquia:         { types: ["jerarquia"],         cats: C },
    retroalimentacion: { types: ["retroalimentacion"], cats: C },
    regulacion:        { types: ["regulacion"],        cats: C },
    m1: { types: T, cats: ["m1"] },
    m2: { types: T, cats: ["m2"] },
    m3: { types: T, cats: ["m3"] },
    m4: { types: T, cats: ["m4"] },
    m5: { types: T, cats: ["m5"] },
  };
  const active = groups[mode] || groups.all;

  document.querySelectorAll(".legend-item[data-mode='tension']").forEach(item => {
    const tension = item.dataset.tension;
    const input = item.querySelector("input");
    const show = active.types.includes(tension);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) typeOff.delete(tension); else typeOff.add(tension);
  });

  document.querySelectorAll(".legend-item[data-mode='cat']").forEach(item => {
    const cat = item.dataset.cat;
    const input = item.querySelector("input");
    const show = active.cats.includes(cat);
    input.checked = show;
    item.classList.toggle("off", !show);
    if (show) catOff.delete(cat); else catOff.add(cat);
  });

  refreshEdgeVisibility();
}

/* -------- métricas de red -------- */
function computeMetrics() {
  const nodeCount = ODS_NODES.length;
  const edgeCount = RAW_EDGES.length;

  const degrees = {};
  ODS_NODES.forEach(n => { degrees[n.id] = 0; });
  RAW_EDGES.forEach(e => { degrees[e.s] = (degrees[e.s] || 0) + 1; degrees[e.t] = (degrees[e.t] || 0) + 1; });

  const avgDegree = (2 * edgeCount) / nodeCount;
  const density = (2 * edgeCount) / (nodeCount * (nodeCount - 1));

  /* grado máximo y nodo más conectado */
  let maxId = null, maxDeg = 0;
  ODS_NODES.forEach(n => { if (degrees[n.id] > maxDeg) { maxDeg = degrees[n.id]; maxId = n.id; } });

  /* por estructura */
  const byStruct = {};
  Object.keys(STRUCT_STYLE).forEach(cat => {
    byStruct[cat] = {
      nodes: ODS_NODES.filter(n => n.cat === cat).length,
      edges: RAW_EDGES.filter(e => e.cat === cat).length,
    };
  });

  /* centralidad: hubs (grado >= 4) */
  const hubs = ODS_NODES.filter(n => degrees[n.id] >= 4);

  /* tipo de línea */
  const cont = RAW_EDGES.filter(e => e.directa).length;
  const disc = RAW_EDGES.filter(e => !e.directa).length;

  return { nodeCount, edgeCount, avgDegree, density, maxId, maxDeg, byStruct, hubs, cont, disc, degrees };
}

function renderMetrics() {
  const m = computeMetrics();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set("metricNodes", m.nodeCount);
  set("metricEdges", m.edgeCount);
  set("metricAvgDegree", m.avgDegree.toFixed(2));
  set("metricDensity", (m.density * 100).toFixed(1) + "%");

  const maxNode = nodeById(m.maxId);
  set("metricHubNode", maxNode ? maxNode.name.replace(/\n/g, " ") : "—");
  set("metricHubDegree", m.maxDeg);
  set("metricHubs", m.hubs.length);
  set("metricCont", m.cont);
  set("metricDisc", m.disc);

  /* leyenda de contadores por estructura */
  Object.keys(STRUCT_STYLE).forEach(cat => {
    const el = document.getElementById("struct-" + cat);
    if (el) el.textContent = `${byStructLabel(m, cat)}: ${m.byStruct[cat].nodes} nodos · ${m.byStruct[cat].edges} relaciones`;
  });
}

function byStructLabel(m, cat) { return STRUCT_STYLE[cat].label; }

/* -------- botones de acción -------- */
function generateODSReport() { console.log("Generando reporte de red..."); }
function downloadAlignment() { console.log("Descargando tabla de relaciones..."); }
function shareAnalysis() { console.log("Compartiendo análisis..."); }

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
  renderMetrics();
});
