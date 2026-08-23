(() => {
  "use strict";
  const start = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();
  start(() => {
    const $ = (s, r = document) => r.querySelector(s),
      $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const toast = (text) => {
      let e = $("#dashboardToast");
      if (!e) {
        e = document.createElement("div");
        e.id = "dashboardToast";
        e.className = "dashboard-toast";
        document.body.appendChild(e);
      }
      e.textContent = text;
      e.classList.add("show");
      clearTimeout(toast.t);
      toast.t = setTimeout(() => e.classList.remove("show"), 2400);
    };
    const show = (e) => e && e.classList.remove("hidden"),
      hide = (e) => e && e.classList.add("hidden"),
      esc = (v) =>
        String(v)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
      clean = (v) => String(v).replaceAll("\\n", " ");
    const networks = {
      "30min": {
        title: "Ciudad de los 30 minutos",
        subtitle:
          "Modo analítico // Nodos de proximidad, cuidado e infraestructura",
        count: "14 nodos · 22 conexiones",
        text: "La red explica cómo las 33 Unidades de Planeamiento Local articulan la proximidad: servicios de cuidado, salud, educación, vivienda, empleo, espacio público y transporte deben quedar accesibles en un máximo de 30 minutos caminando, en bicicleta o en transporte público. Los 160 Proyectos Integrales de Proximidad convierten esta meta en intervenciones construidas con la ciudadanía. Fuente base: Secretaría Distrital de Planeación, noticia ¡La ciudad de los 30 minutos se consolida en Bogotá!, 29 de noviembre de 2023.",
        nodes: [
          ["33 Unidades de Planeamiento Local", 390, 230, 58, "central", "⌖"],
          ["Manzanas\\ndel Cuidado", 145, 105, 42, "", "♥"],
          ["Centros\\nde salud", 160, 350, 37, "", "✚"],
          ["Jardines\\ninfantiles", 355, 82, 38, "", "✚"],
          ["Colegios y\\nuniversidades", 605, 94, 40, "", "▦"],
          ["Transporte\\npúblico", 635, 290, 45, "", "▣"],
          ["Empleo\\nformal", 425, 390, 40, "", "▤"],
          ["Meta: acceso\\nen 30 minutos", 720, 215, 42, "result", "↗"],
          ["Vivienda\\ndigna VIS/VIP", 185, 225, 35, "", "⌂"],
          ["Cuidado\\ncomunitario", 315, 340, 36, "", "♥"],
          ["Equipamientos\\nsociales", 520, 335, 38, "", "▥"],
          ["Actividades\\nde ocio y cultura", 590, 410, 32, "", "▤"],
          ["Tiempo máximo\\nde acceso: 30 min", 90, 245, 34, "", "◷"],
          ["Redes peatonales\\ny bicicleta", 465, 115, 33, "", "⌁"],
        ],
        edges: [
          [0, 1, "direct"],
          [0, 2, "support"],
          [0, 3, "direct"],
          [0, 4, "direct"],
          [0, 5, "support"],
          [0, 6, "direct"],
          [0, 7, "result"],
          [0, 8, "direct"],
          [0, 9, "support"],
          [0, 10, "direct"],
          [0, 11, "indirect"],
          [0, 12, "indirect"],
          [0, 13, "support"],
          [1, 9, "direct"],
          [2, 10, "direct"],
          [3, 4, "indirect"],
          [5, 6, "direct"],
          [5, 13, "support"],
          [8, 12, "indirect"],
          [9, 10, "direct"],
          [10, 11, "direct"],
          [6, 7, "result"],
        ],
      },
      empleo: {
        title: "Productividad y empleo",
        subtitle: "Modo analítico // Actores, UPL y economía territorial",
        count: "14 nodos · 22 conexiones",
        text: "La red representa la apuesta del POT por una ciudad menos segregada y con productividad descentralizada. Conecta sectores productivos, servicios metropolitanos, incentivos urbanísticos y económicos, equipamientos públicos, transporte, vivienda y mejoramiento de barrios para acercar el empleo a las zonas deficitarias. El archivo oficial destaca la localización de actividades productivas en Rafael Uribe Uribe, Tunjuelito, Ciudad Bolívar y Bosa, así como el uso flexible del suelo y la adaptación del POT a los barrios populares.",
        nodes: [
          ["Empleo formal y\\nproductividad", 390, 230, 58, "central", "▥"],
          ["Sectores\\nproductivos", 135, 100, 42, "result", "↗"],
          ["Zonas deficitarias\\nde empleo", 125, 350, 38, "", "⌖"],
          ["Zonas superavitarias\\nde empleo", 390, 80, 38, "", "▥"],
          ["Descentralización\\nde oportunidades", 650, 100, 42, "support", "⌖"],
          ["Servicios\\nmetropolitanos", 660, 330, 42, "", "◈"],
          ["Vivienda y\\nsoportes urbanos", 390, 410, 36, "", "⌂"],
          ["Transporte\\ny bicicleta", 175, 225, 36, "", "▣"],
          ["Industrias creativas\\ny del conocimiento", 700, 220, 36, "", "⇄"],
          ["Industrias\\nverdes", 205, 470, 32, "", "♙"],
          ["Equipamientos\\npúblicos", 535, 455, 35, "", "▦"],
          ["Manzanas del Cuidado\\ncerca del transporte", 70, 220, 33, "", "▤"],
          ["Empresas e\\nindustria", 550, 195, 39, "", "◉"],
          ["Reubicación de\\nactividades productivas", 700, 450, 35, "", "◆"],
        ],
        edges: [
          [0, 1, "result"],
          [0, 2, "direct"],
          [0, 3, "direct"],
          [0, 4, "support"],
          [0, 5, "direct"],
          [0, 6, "direct"],
          [0, 7, "indirect"],
          [0, 8, "support"],
          [0, 9, "direct"],
          [0, 10, "direct"],
          [0, 11, "indirect"],
          [0, 12, "direct"],
          [0, 13, "support"],
          [2, 4, "indirect"],
          [5, 6, "direct"],
          [5, 12, "direct"],
          [7, 8, "indirect"],
          [9, 10, "direct"],
          [3, 12, "direct"],
          [1, 13, "result"],
          [6, 10, "support"],
        ],
      },
      carbono: {
        title: "Descarbonización de la movilidad",
        subtitle:
          "Modo analítico // Infraestructura limpia, emisiones y transición",
        count: "14 nodos · 23 conexiones",
        text: "La red representa la hoja de ruta del POT para descarbonizar la movilidad: una red férrea urbana y regional con Metro y Regiotram, seis cables aéreos, corredores verdes, red peatonal, bicicleta y transporte público eléctrico. También incorpora carga a gas, salida progresiva del diésel, construcción sostenible, separación de residuos y localización de actividades cerca del transporte para reducir desplazamientos. El archivo oficial fija metas de 11 corredores de alta capacidad, 218 km de red peatonal mejorada, 564 km de infraestructura ciclista y una reducción del 50% de las emisiones de gases de efecto invernadero.",
        nodes: [
          ["Viajes\\nlimpios", 390, 230, 58, "central", "⌁"],
          ["Red férrea\\nurbana y regional", 110, 90, 38, "support", "▣"],
          ["Cuatro líneas\\nde Metro", 350, 70, 35, "", "▣"],
          ["Regiotram\\nOccidente y Norte", 590, 85, 35, "", "▥"],
          ["Corredores\\nverdes", 670, 315, 42, "support", "♧"],
          ["Red peatonal y\\nmicromovilidad", 390, 430, 45, "support", "♢"],
          ["Transporte público\\neléctrico", 115, 330, 40, "result", "⚡"],
          ["Reducción de\\nemisiones GEI", 390, 125, 38, "layer-red", "◌"],
          ["Calidad del aire\\ny material particulado", 620, 205, 37, "layer-red", "◌"],
          ["Transporte de\\ncarga a gas", 145, 220, 34, "", "⚡"],
          ["Construcción\\nsostenible", 680, 450, 36, "support", "▣"],
          ["Manejo de residuos\\ny separación en fuente", 545, 420, 35, "", "⌂"],
          ["Calles\\ncompletas", 180, 455, 33, "", "▤"],
          ["Peatón como\\nprioridad", 70, 190, 34, "layer-red", "♧"],
        ],
        edges: [
          [0, 1, "support"],
          [0, 2, "direct"],
          [0, 3, "direct"],
          [0, 4, "support"],
          [0, 5, "support"],
          [0, 6, "result"],
          [0, 7, "indirect"],
          [0, 8, "indirect"],
          [0, 9, "direct"],
          [0, 10, "direct"],
          [0, 11, "direct"],
          [0, 12, "support"],
          [0, 13, "indirect"],
          [4, 5, "direct"],
          [1, 2, "indirect"],
          [5, 11, "direct"],
          [6, 9, "direct"],
          [10, 11, "support"],
          [12, 10, "direct"],
          [7, 8, "direct"],
          [8, 13, "result"],
          [2, 3, "indirect"],
        ],
      },
    };
    const expandNetwork = (key, extraNodes, extraEdges) => {
      const item = networks[key];
      const offset = item.nodes.length;
      item._key = key;
      item.edges = item.edges || [];
      item.nodes.push(...extraNodes);
      item.edges.push(
        ...extraEdges.map(([a, b, t]) => [a + offset, b + offset, t]),
      );
      item._categories = item.nodes.map((node) => thematicCategory(key, node[0]));
    };
    expandNetwork(
      "30min",
      [
        ["Tiempo medio de viaje", 70, 70, 30, "", "◷"],
        ["Acceso a servicios", 250, 45, 31, "result", "◉"],
        ["Oferta de cuidado", 505, 45, 30, "", "♥"],
        ["Distancia a salud", 735, 95, 29, "", "↔"],
        ["Cobertura educativa", 735, 185, 30, "", "▦"],
        ["Conectividad peatonal", 70, 390, 30, "", "⌁"],
        ["Calidad del espacio público", 275, 470, 32, "", "⌂"],
        ["Centralidad urbana", 520, 470, 30, "", "◎"],
        ["Población vulnerable", 735, 375, 31, "", "♙"],
        ["Tiempo de cuidado", 70, 485, 28, "", "◷"],
      ],
      [
        [0, 1, "direct"],
        [1, 2, "support"],
        [2, 3, "direct"],
        [3, 4, "indirect"],
        [4, 7, "support"],
        [5, 6, "direct"],
        [6, 7, "indirect"],
        [7, 8, "support"],
        [8, 9, "indirect"],
        [9, 0, "result"],
      ],
    );
    expandNetwork(
      "empleo",
      [
        ["Incentivos urbanísticos\\ny económicos", 70, 70, 31, "result", "↗"],
        ["Transferencia de oportunidades\\ny derechos urbanísticos", 250, 42, 30, "", "▤"],
        ["Uso flexible\\ndel suelo", 505, 42, 30, "", "✓"],
        ["Acceso territorial\\nal empleo", 735, 85, 31, "", "◎"],
        ["Economía del\\ncuidado", 735, 175, 30, "", "♥"],
        ["Educación\\nsuperior", 70, 395, 31, "", "▦"],
        ["Industrias del\\nconocimiento", 260, 470, 30, "", "✦"],
        ["Mejoramiento de\\nbarrios populares", 500, 470, 31, "support", "▥"],
        ["Acupuntura urbana\\ny urbanismo táctico", 735, 370, 33, "", "⇄"],
        ["Participación\\nterritorial", 70, 475, 29, "", "♙"],
      ],
      [
        [0, 1, "direct"],
        [1, 2, "direct"],
        [2, 3, "result"],
        [3, 4, "support"],
        [4, 9, "indirect"],
        [5, 6, "direct"],
        [6, 7, "support"],
        [7, 8, "direct"],
        [8, 9, "indirect"],
        [9, 0, "result"],
      ],
    );
    expandNetwork(
      "carbono",
      [
        ["Sistemas de alta\\ncapacidad", 70, 70, 31, "", "⇄"],
        ["Intermodalidad", 250, 42, 31, "", "◌"],
        ["Flota sin\\ndiésel", 505, 42, 32, "layer-red", "◌"],
        ["Corredores verdes\\narborizados", 735, 90, 30, "layer-red", "◌"],
        ["Andenes, plazas\\ny parques conectados", 735, 180, 32, "layer-red", "♧"],
        ["Infraestructura\\nde carga", 70, 395, 31, "result", "⚡"],
        ["Disminución del\\nvehículo particular", 260, 470, 31, "", "▣"],
        ["Actividades y servicios\\ncerca del transporte", 500, 470, 31, "support", "↗"],
        ["Conexión regional\\nSabana y Soacha", 735, 365, 30, "", "◷"],
        ["Salud ambiental", 70, 475, 31, "layer-red", "♥"],
      ],
      [
        [0, 1, "direct"],
        [1, 2, "direct"],
        [2, 3, "result"],
        [3, 4, "support"],
        [4, 9, "result"],
        [5, 6, "support"],
        [6, 7, "direct"],
        [7, 8, "direct"],
        [8, 0, "indirect"],
        [9, 5, "result"],
      ],
    );
    const fillTo30 = (key, labels) => {
      const item = networks[key],
        canonical = (value) =>
          clean(value).toLowerCase().replace(/\s+/g, " ").trim(),
        seen = new Map(),
        remap = [];
      item.nodes.forEach((node, index) => {
        const id = canonical(node[0]);
        if (seen.has(id)) remap[index] = seen.get(id);
        else {
          seen.set(id, item.nodes.length ? [...seen.values()].length : 0);
          remap[index] = seen.get(id);
        }
      });
      if (seen.size !== item.nodes.length) {
        const uniqueNodes = [];
        const firstIndex = new Map();
        item.nodes.forEach((node, index) => {
          const id = canonical(node[0]);
          if (!firstIndex.has(id)) {
            firstIndex.set(id, uniqueNodes.length);
            uniqueNodes.push(node);
          }
          remap[index] = firstIndex.get(id);
        });
        const uniqueEdges = [],
          edgeKeys = new Set();
        item.edges.forEach(([a, b, type]) => {
          const edge = [remap[a], remap[b], type],
            key = `${edge[0]}-${edge[1]}-${edge[2]}`;
          if (edge[0] !== edge[1] && !edgeKeys.has(key)) {
            edgeKeys.add(key);
            uniqueEdges.push(edge);
          }
        });
        item.nodes = uniqueNodes;
        item.edges = uniqueEdges;
      }
      const need = Math.max(0, 30 - item.nodes.length),
        offset = item.nodes.length,
        used = new Set(item.nodes.map((node) => canonical(node[0])));
      for (let i = 0; i < need; i++) {
        const base = labels[i % labels.length];
        let label = base,
          suffix = 2;
        while (used.has(canonical(label)))
          label = `${base} · componente ${suffix++}`;
        used.add(canonical(label));
        const col = i % 6,
          row = Math.floor(i / 6);
        item.nodes.push([label, 70 + col * 210, 70 + row * 86, 25, "", ""]);
        const target = i % 4 === 0 ? 0 : offset + i - 1;
        item.edges.push([
          target,
          offset + i,
          i % 5 === 0 ? "support" : i % 3 === 0 ? "indirect" : "direct",
        ]);
      }
      item._categories = item.nodes.map((node) => thematicCategory(key, node[0]));
    };
    const removeNodeByLabel = (key, matcher) => {
      const item = networks[key];
      const removed = item.nodes.findIndex((node) => matcher.test(clean(node[0])));
      if (removed < 0) return;
      const remap = new Map();
      item.nodes = item.nodes.filter((_, index) => {
        if (index === removed) return false;
        remap.set(index, remap.size);
        return true;
      });
      item.edges = item.edges
        .filter(([a, b]) => a !== removed && b !== removed)
        .map(([a, b, type]) => [remap.get(a), remap.get(b), type]);
      item._categories = item.nodes.map((node) => thematicCategory(key, node[0]));
    };
    removeNodeByLabel("30min", /^(33 Unidades de Planeamiento Local|Empleo formal)$/);
    removeNodeByLabel("empleo", /^(Empleo formal y productividad|Productividad por trabajador)/);
    removeNodeByLabel("carbono", /^Viajes limpios$/);

    const removeAllNodesByLabel = (key, matcher) => {
      let found = true;
      while (found) {
        const before = networks[key].nodes.length;
        removeNodeByLabel(key, matcher);
        found = networks[key].nodes.length < before;
      }
    };

    fillTo30("30min", [
      "160 Proyectos Integrales de Proximidad",
      "Redes peatonales y ciclistas",
      "UPL Occidente: Fontibón y Engativá",
      "UPL Centro Ampliado: Chapinero y Teusaquillo",
      "UPL Suroccidente: Bosa y Kennedy",
      "UPL Rural: Cerros, Tunjuelo y Sumapaz",
    ]);
    /* Depuración semántica: “Equipamientos sociales” es un nodo paraguas
       redundante cuando la red ya contiene colegios, universidades, jardines,
       centros de salud y demás equipamientos específicos. Se elimina después
       de completar el dataset para no generar nodos artificiales duplicados. */
    [
      /^Equipamientos\s+sociales$/,
      /^Meta:\s+acceso\s+en\s+30\s+minutos$/,
      /^Tiempo\s+máximo\s+de\s+acceso:\s+30\s+min$/,
      /^Tiempo\s+medio\s+de\s+viaje$/,
      /^Acceso\s+a\s+servicios$/,
      /^Oferta\s+de\s+cuidado$/,
      /^Distancia\s+a\s+salud$/,
      /^Cobertura\s+educativa$/,
      /^Conectividad\s+peatonal$/,
      /^Calidad\s+del\s+espacio\s+público$/,
      /^Centralidad\s+urbana$/,
      /^Población\s+vulnerable$/,
      /^Tiempo\s+de\s+cuidado$/,
      /^160\s+Proyectos\s+Integrales\s+de\s+Proximidad/,
      /^Redes\s+peatonales\s+y\s+bicicleta$/,
      /^Red\s+peatonal\s+y\s+bicicleta$/,
    ].forEach((matcher) => removeAllNodesByLabel("30min", matcher));
    fillTo30("empleo", [
      "Meta regional: 40% del PIB",
      "Sectores productivos en zonas deficitarias",
      "Actividad productiva en Bosa y Ciudad Bolívar",
      "Actividad productiva en Rafael Uribe y Tunjuelito",
      "Equipamientos sin restricción de uso del suelo",
      "Tiempo de desplazamiento al trabajo",
      "Productividad por trabajador · COP",
      "Empresas activas · #",
      "Nuevas empresas · #",
      "Cierre de empresas · #",
      "Vacantes · #",
      "Formación técnica · #",
      "Graduados · #",
      "Inserción laboral · %",
      "Innovación · índice",
      "Patentes · #",
      "Inversión privada · COP",
      "Inversión pública · COP",
      "UPL con déficit · 23",
      "UPL con superávit · 10",
      "Centralidad económica · índice",
      "Acceso a transporte · %",
      "Costo de transporte · COP",
      "Tiempo al empleo · min",
      "Vivienda cerca del empleo · %",
      "Suelo productivo · ha",
      "Suelo mixto · ha",
      "Comercio local · #",
      "Servicios empresariales · #",
      "Cadenas productivas · #",
      "Economía del cuidado · #",
      "Población activa · #",
      "Población ocupada · #",
      "Población desempleada · #",
      "Migración laboral · %",
      "Productividad territorial · índice",
    ]);
    fillTo30("carbono", [
      "11 corredores de alta capacidad",
      "218 km de red peatonal mejorada",
      "564 km de infraestructura para bicicleta",
      "Seis cables aéreos nuevos",
      "Dos Regiotram regionales",
      "Meta: reducir 50% las emisiones GEI",
    ]);
    // Limpieza final después de completar cada dataset: evita reinsertar agregadores.
    removeNodeByLabel("30min", /^(33 Unidades de Planeamiento Local|Empleo formal)$/);
    removeNodeByLabel("empleo", /^(Empleo formal y productividad|Productividad por trabajador)/);
    removeNodeByLabel("carbono", /^Viajes limpios$/);

    /* Depuración categorial de las dos redes restantes:
       se conservan entidades, infraestructuras y actividades concretas;
       se retiran hubs abstractos, metas, indicadores, cifras y capas de resultado. */
    const abstractEmployment = [
      /Empleo formal y\s+productividad/,
      /Descentralización de oportunidades/,
      /Servicios metropolitanos/,
      /Vivienda y\s+soportes urbanos/,
      /Equipamientos públicos/,
      /Empresas e\s+industria/,
      /Reubicación de\s+actividades productivas/,
      /Incentivos urbanísticos\s+y\s+económicos/,
      /Transferencia de oportunidades\s+y\s+derechos urbanísticos/,
      /^Uso flexible del suelo$/,
      /Acceso territorial\s+al empleo/,
      /Acupuntura urbana\s+y\s+urbanismo táctico/,
      /^Participación territorial$/,
      /Equipamientos sin restricción de uso del suelo/,
      /^(Meta regional|Tiempo de desplazamiento|Productividad por trabajador|Empresas activas|Nuevas empresas|Cierre de empresas|Vacantes|Formación técnica|Graduados|Inserción laboral|Innovación|Patentes|Inversión privada|Inversión pública|UPL con déficit|UPL con superávit|Centralidad económica|Acceso a transporte|Costo de transporte|Tiempo al empleo|Vivienda cerca del empleo|Suelo productivo|Suelo mixto|Comercio local|Servicios empresariales|Cadenas productivas|Economía del cuidado|Población activa|Población ocupada|Población desempleada|Migración laboral|Productividad territorial)/,
    ];
    const abstractCarbon = [
      /Viajes limpios/,
      /Reducción de\s+emisiones GEI/,
      /Calidad del aire\s+y\s+material particulado/,
      /Peatón como\s+prioridad/,
      /Disminución del\s+vehículo particular/,
      /^Salud ambiental$/,
      /^Sistemas de alta\s+capacidad$/,
      /^Intermodalidad$/,
      /^Flota sin\s+diésel$/,
      /^Actividades y servicios\s+cerca del transporte$/,
      /^Seis cables aéreos nuevos$/,
      /^Dos Regiotram regionales$/,
      /^Meta:/,
      /\b\d+\s*(?:km|corredores|cables|Regiotram)/,
    ];
    abstractEmployment.forEach((matcher) => removeAllNodesByLabel("empleo", matcher));
    abstractCarbon.forEach((matcher) => removeAllNodesByLabel("carbono", matcher));

    const mergeNodesByLabel = (key, primaryMatcher, duplicateMatchers) => {
      const item = networks[key];
      const primary = item.nodes.findIndex((node) => primaryMatcher.test(clean(node[0])));
      if (primary < 0) return;
      const duplicates = item.nodes
        .map((node, index) => ({ index, label: clean(node[0]) }))
        .filter(({ index, label }) => index !== primary && duplicateMatchers.some((matcher) => matcher.test(label)))
        .map(({ index }) => index);
      if (!duplicates.length) return;
      const duplicateSet = new Set(duplicates);
      const oldToNew = new Map();
      const kept = [];
      item.nodes.forEach((node, index) => {
        if (duplicateSet.has(index)) return;
        oldToNew.set(index, kept.length);
        kept.push(node);
      });
      const primaryNew = oldToNew.get(primary);
      duplicates.forEach((index) => oldToNew.set(index, primaryNew));
      const edgeKeys = new Set();
      item.edges = item.edges
        .map(([a, b, type]) => [oldToNew.get(a), oldToNew.get(b), type])
        .filter(([a, b, type]) => a !== b && Number.isInteger(a) && Number.isInteger(b) && !edgeKeys.has(`${a}-${b}-${type}`))
        .filter(([a, b, type]) => {
          const keyName = `${a}-${b}-${type}`;
          if (edgeKeys.has(keyName)) return false;
          edgeKeys.add(keyName);
          return true;
        });
      item.nodes = kept;
      item._categories = item.nodes.map((node) => thematicCategory(key, node[0]));
    };

    mergeNodesByLabel("carbono", /^Red férrea\s+urbana y regional$/, [
      /^Cuatro líneas\s+de Metro$/,
      /^Regiotram\s+Occidente y Norte$/,
    ]);
    mergeNodesByLabel("carbono", /^Corredores verdes$/, [
      /^Corredores verdes arborizados$/,
      /^Andenes, plazas y parques conectados$/,
    ]);

    const layer = (label) => {
      const s = label.toLowerCase();
      if (
        /río|humedal|ecosistema|emisiones|pm fino|aire|corredor verde|área protegida|parques ecológicos/.test(
          s,
        )
      )
        return "layer-red";
      if (
        /metro|regiotram|férrea|alta capacidad|cable|transporte|peatonal|micromovilidad|intermodalidad|hospital|centro|colegio|ciclorruta|carga|taxis|flota pública|vehículos|eléctrico/.test(
          s,
        )
      )
        return "layer-warm";
      return "layer-green";
    };
    const layerColor = (layerName) => ({
      "layer-red": "#ef6f6f",
      "layer-warm": "#e89a6c",
      "layer-green": "#46d6d0",
    }[layerName] || "#46d6d0");
    const edgeColor = {
      direct: "#d7dae2",
      indirect: "#8b93a8",
      support: "#f5a623",
      result: "#d9824e",
    };
    const thematicCatalog = {
      "30min": [
        { id: "care-health", label: "Cuidado y salud", color: "#2fd4c8" },
        { id: "education", label: "Educación y equipamientos", color: "#e89a6c" },
        { id: "mobility", label: "Movilidad y proximidad", color: "#ef9552" },
        { id: "housing-employment", label: "Vivienda y empleo", color: "#a276f2" },
        { id: "access-goals", label: "Acceso y metas", color: "#f5c945" },
      ],
      empleo: [
        { id: "economic-activity", label: "Actividad económica", color: "#ef9552" },
        { id: "human-capital", label: "Capital humano", color: "#e89a6c" },
        { id: "labor-mobility", label: "Movilidad laboral", color: "#2fd4c8" },
        { id: "territorial-equity", label: "Equidad territorial", color: "#a276f2" },
        { id: "employment-results", label: "Resultados de empleo", color: "#f5c945" },
      ],
      carbono: [
        { id: "clean-transit", label: "Transporte limpio", color: "#2fd4c8" },
        { id: "clean-infrastructure", label: "Infraestructura limpia", color: "#e89a6c" },
        { id: "emissions-air", label: "Emisiones y aire", color: "#ef9552" },
        { id: "modal-change", label: "Cambio modal", color: "#a276f2" },
        { id: "environmental-health", label: "Salud ambiental", color: "#f5c945" },
      ],
    };
    function thematicCategory(key, label) {
      const s = clean(label).toLowerCase();
      if (key === "30min") {
        if (/cuidado|salud|hospital/.test(s)) return "care-health";
        if (/colegio|educación|equipamiento/.test(s)) return "education";
        if (/transporte|peatonal|viaje|distancia|tiempo|conectividad/.test(s)) return "mobility";
        if (/vivienda|empleo|comercio/.test(s)) return "housing-employment";
        return "access-goals";
      }
      if (key === "empleo") {
        if (/empresa|actividad|productividad|innovación|inversión|comercio|sectores productivos|servicios metropolitanos|industrias|reubicación/.test(s)) return "economic-activity";
        if (/educación|formación|graduados|salario|capital|patentes|conocimiento/.test(s)) return "human-capital";
        if (/transporte|movilidad|tiempo|acceso|vivienda|equipamientos|manzanas del cuidado|uso flexible/.test(s)) return "labor-mobility";
        if (/upl|segregación|género|participación|territorial|incentivos|transferencia|deficitarias|superavitarias|barrios populares|bosa|ciudad bolívar|rafael uribe|tunjuelito/.test(s)) return "territorial-equity";
        return "employment-results";
      }
      if (/emisiones|gei|pm|aire|salud respiratoria/.test(s)) return /salud/.test(s) ? "environmental-health" : "emissions-air";
      if (/metro|regiotram|cable|ciclorruta|transporte|flota|taxis|viajes/.test(s)) return "clean-transit";
      if (/carga|electrificación|infraestructura|corredor/.test(s)) return "clean-infrastructure";
      if (/cambio modal|demanda|combustible|velocidad/.test(s)) return "modal-change";
      return "environmental-health";
    }
    const quantify = (label) => {
      const q = {
        "UPL · 33": "UPL\n33 unidades",
        "33 Unidades de Planeamiento Local": "UPL\n33 unidades",
        "160 Proyectos Integrales de Proximidad": "160 PIP",
        "Redes peatonales y ciclistas": "Red peatonal\ny bicicleta",
        "Espacio público local reverdecido": "Espacio público\nreverdecido",
        "Vivienda VIS y VIP": "Vivienda\nVIS/VIP",
        "Empleo formal cercano": "Empleo formal\ncercano",
        "UPL Occidente: Fontibón y Engativá": "Occidente\nFontibón · Engativá",
        "UPL Centro Ampliado: Chapinero y Teusaquillo": "Centro ampliado\nChapinero · Teusaquillo",
        "UPL Suroccidente: Bosa y Kennedy": "Suroccidente\nBosa · Kennedy",
        "UPL Rural: Cerros, Tunjuelo y Sumapaz": "Rural\nCerros · Tunjuelo · Sumapaz",
        "Manzanas\\ndel Cuidado": "Manzanas\ndel Cuidado",
        "Centros\\nde salud": "Centros\nde salud",
        "Jardines\\ninfantiles": "Jardines\ninfantiles",
        "Colegios y\\nuniversidades": "Colegios y\nuniversidades",
        "Tiempo máximo\\nde acceso: 30 min": "Acceso máximo\n30 minutos",
        "Meta: acceso\\nen 30 minutos": "Meta: acceso\n30 minutos",
        "910.509\\nnuevos empleos": "Empleo\n910.509",
        "10 / 33 UPL\\nsuperávit": "Superávit\n10/33 UPL",
        "13 UPL\\nperiféricas": "Periferia\n13 UPL",
        "47% GEI\\ntransporte": "GEI\n47% transporte",
        "18% PM\\nfino": "PM fino\n18% transporte",
        "Viajes\\nlimpios 77%": "Viajes limpios\n77% · 2035",
        "Flota pública\\n2040": "Flota eléctrica\n100% · 2040",
        "5 líneas\\nde Metro": "Metro\n5 líneas",
        "1.000 km\\nciclorrutas": "Ciclorrutas\n1.000 km",
      };
      return q[label] || label;
    };
    const layoutNetwork = (item) => {
      const degree = item.nodes.map((_, i) => item.edges.reduce((n, [a, b]) => n + (a === i || b === i ? 1 : 0), 0));
      const centerByCategory = {
        "care-health": [165,235],
        "education": [470,175],
        "mobility": [790,235],
        "housing-employment": [220,610],
        "access-goals": [665,620],
        "economic-activity": [165,220],
        "human-capital": [470,175],
        "labor-mobility": [790,220],
        "territorial-equity": [220,650],
        "employment-results": [665,650],
        "emissions-air": [165,220],
        "clean-transit": [470,175],
        "clean-infrastructure": [790,220],
        "modal-change": [220,650],
        "environmental-health": [665,650],
      };
      const fallbackCenters = [[165,235],[470,175],[790,235],[220,610],[665,620],[470,420]];
      const categoryIds = [...new Set(item._categories || [])];
      const groups = categoryIds.map((category, categoryIndex) => ({
        category,
        nodes: item.nodes.map((_, index) => index).filter((index) => item._categories[index] === category).sort((a, b) => degree[b] - degree[a]),
        center: centerByCategory[category] || fallbackCenters[categoryIndex % fallbackCenters.length],
      })).filter((group) => group.nodes.length);
      const radiusFor = (d) => d <= 2 ? 52 : d <= 4 ? 64 : d <= 6 ? 76 : d <= 9 ? 90 : 104;
      item._centralIndices = groups.map((group) => group.nodes[0]);
      groups.forEach((group) => {
        const [cx, cy] = group.center;
        const hubIndex = group.nodes[0];
        const hub = item.nodes[hubIndex];
        hub[1] = cx; hub[2] = cy; hub[3] = radiusFor(degree[hubIndex]); hub._layoutHub = true;
        const rest = group.nodes.slice(1);
        const outward = Math.atan2(cy - 450, cx - 700) || 0;
        const span = Math.min(1.45, .72 + rest.length * .13);
        const rings = [
          rest.filter((index) => degree[index] >= 4),
          rest.filter((index) => degree[index] >= 2 && degree[index] < 4),
          rest.filter((index) => degree[index] < 2),
        ].filter((ring) => ring.length);
        rings.forEach((ring, ringIndex) => {
          const radius = 155 + ringIndex * 125;
          ring.forEach((nodeIndex, position) => {
            // Variación determinista: rompe la simetría sin producir saltos entre recargas.
            const seed = (nodeIndex * 47 + ringIndex * 71 + position * 29 + categoryIds.indexOf(group.category) * 113) % 997;
            const jitter = seed / 997 - .5;
            const angle = outward - span / 2 + ((position + .5) / ring.length) * span + jitter * .22;
            const radiusJitter = jitter * 42 + ((position % 3) - 1) * 12;
            const tangent = jitter * 34;
            const node = item.nodes[nodeIndex];
            node[1] = cx + Math.cos(angle) * (radius + radiusJitter) - Math.sin(angle) * tangent;
            node[2] = cy + Math.sin(angle) * (radius + radiusJitter) * .82 + Math.cos(angle) * tangent * .72;
            node[3] = radiusFor(degree[nodeIndex]);
            node._layoutHub = false;
          });
        });
      });
      for (let pass = 0; pass < 150; pass++) {
        let moved = false;
        for (let i = 0; i < item.nodes.length; i++) for (let j = i + 1; j < item.nodes.length; j++) {
          const A = item.nodes[i], B = item.nodes[j];
          const dx = B[1] - A[1], dy = B[2] - A[2], dist = Math.hypot(dx, dy) || 1;
          const min = A[3] + B[3] + 42;
          if (dist >= min) continue;
          const ux = dx / dist, uy = dy / dist, push = (min - dist) / 2;
          if (!A._layoutHub) { A[1] -= ux * push; A[2] -= uy * push; }
          if (!B._layoutHub) { B[1] += ux * push; B[2] += uy * push; }
          moved = true;
        }
        item.nodes.forEach((node) => {
          node[1] = Math.max(50, Math.min(980, node[1]));
          node[2] = Math.max(50, Math.min(830, node[2]));
        });
        if (!moved) break;
      }
      item.nodes.forEach((node) => { delete node._layoutHub; });
    };
    const lines = (item) => item.edges.map(([a, b, t], i) => {
      const A = item.nodes[a], B = item.nodes[b];
      const dx = B[1] - A[1], dy = B[2] - A[2], distance = Math.hypot(dx, dy) || 1;
      const ux = dx / distance, uy = dy / distance;
      const startPad = A[3] + 2, endPad = B[3] + 7;
      const x1 = A[1] + ux * startPad, y1 = A[2] + uy * startPad;
      const x2 = B[1] - ux * endPad, y2 = B[2] - uy * endPad;
      const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      return `<path class="network-edge ${t}" data-edge-index="${i}" marker-end="url(#arrow-${t})" d="${d}"/><path class="network-edge-hit ${t}" data-edge-index="${i}" data-edge-type="${t}" tabindex="0" d="${d}"/>`;
    }).join("");
    const iconSvg = (label) => {
      const s = label.toLowerCase();
      const icon = /río|quebrada|agua|humedal/.test(s)
        ? "fa-water"
        : /cerro|páramo|montaña|corredor verde|parques ecológicos/.test(s)
          ? "fa-mountain"
          : /área protegida|reserva/.test(s)
            ? "fa-shield-halved"
            : /bosque|vegetal|ecosistema|parque/.test(s)
              ? "fa-tree"
              : /resiliencia|temperatura|emisiones|gei|pm|aire/.test(s)
                ? "fa-temperature-half"
                : /cuidado|manzana|salud|hospital/.test(s)
                  ? "fa-heart"
                  : /colegio|educación|formación|graduados/.test(s)
                    ? "fa-graduation-cap"
                    : /metro|regiotram|cable|transporte|bus|viajes|flota/.test(
                          s,
                        )
                      ? "fa-bus"
                      : /ciclorruta|bicicleta|peatonal/.test(s)
                        ? "fa-bicycle"
                        : /carga|electrificación|eléctric/.test(s)
                          ? "fa-bolt"
                          : /vivienda|hogares|residencial/.test(s)
                            ? "fa-house"
                            : /empleo|empresa|productividad|salario|comercio|actividad económica/.test(
                                  s,
                                )
                              ? "fa-briefcase"
                              : /innovación|investigación|patentes/.test(s)
                                ? "fa-diagram-project"
                                : /internet|conectividad|red/.test(s)
                                  ? "fa-network-wired"
                                  : /tiempo|espera|velocidad|congestión/.test(s)
                                    ? "fa-clock"
                                    : /inversión|suelo|densidad|centralidad/.test(
                                          s,
                                        )
                                      ? "fa-building"
                                      : /población|upl|periféricas|segregación|participación/.test(
                                            s,
                                          )
                                        ? "fa-people-group"
                                        : "fa-circle-nodes";
      return `<i class="fa-solid ${icon} node-fa-icon" aria-hidden="true"></i>`;
    };
    const nodes = (item) =>
      item.nodes
        .map(([label, x, y, r, type, icon], i) => {
          const display = quantify(label),
            maxChars = r >= 90 ? 22 : r >= 70 ? 18 : r >= 52 ? 15 : 11,
            rows = display
              .split(/\n|\\n/)
              .flatMap((row) => {
                const value = row.trim().toUpperCase();
                return value.length <= maxChars
                  ? [value]
                  : [value.slice(0, maxChars - 1) + "…"];
              })
              .slice(0, 2);
          const sizeClass =
              r >= 70 ? "hub-large" : r >= 48 ? "hub-medium" : "node-small",
            centralClass = type === "central" || item._centralIndices?.includes(i) ? "central-node" : "",
            iconY = r >= 44 ? y - 9 : y - 5,
            labelY = y + (r >= 44 ? 10 : 7),
            lineGap = r >= 44 ? 10 : 7;
          const category = item._categories?.[i] || "access-goals";
          const categoryColor = layerColor(layer(label));
          const relationCounts = item.edges.reduce((counts, edge) => {
            if (edge[0] === i || edge[1] === i) counts[edge[2]] = (counts[edge[2]] || 0) + 1;
            return counts;
          }, {});
          const relationType = ["direct", "indirect", "support", "result"].sort((a, b) => (relationCounts[b] || 0) - (relationCounts[a] || 0))[0];
          const labelText = rows.join(" ");
          const centralRing = centralClass ? `<circle class="node-central-halo" cx="0" cy="0" r="${r + 8}" fill="none" stroke="${categoryColor}" stroke-width="2" stroke-dasharray="3 5"/>` : "";
          return `<g class="network-node floating-node ${sizeClass} ${centralClass} ${type || ""} relation-${relationType} ${layer(label)} category-${category}" data-node-index="${i}" data-relation-type="${relationType}" data-category="${category}" tabindex="0" role="button" aria-label="${esc(clean(display))}" transform="translate(${x} ${y})" style="--node-color:${categoryColor};color:${categoryColor}">${centralRing}<circle class="node-ring" cx="0" cy="0" r="${r}" fill="#0a0a0a" stroke="${categoryColor}" stroke-width="${centralClass ? 4 : (r >= 44 ? 2.5 : 1.6)}" style="${centralClass ? `stroke-width:4px !important;filter:drop-shadow(0 0 8px ${categoryColor}) drop-shadow(0 0 18px ${categoryColor}) !important;` : ""}"/><foreignObject class="node-content" x="${-r * 0.9}" y="${-r * 0.9}" width="${r * 1.8}" height="${r * 1.8}"><div xmlns="http://www.w3.org/1999/xhtml" class="node-inner" style="color:${categoryColor} !important"><span class="node-icon-wrap" style="color:${categoryColor} !important">${iconSvg(label).replace('node-fa-icon"', `node-fa-icon" style="color:${categoryColor} !important"`)}</span><span class="node-name">${esc(labelText)}</span></div></foreignObject></g>`;
        })
        .join("");
    const categoryHalos = () => "";
    const modal = $("#networkModal"),
      canvas = $("#networkCanvas"),
      details = $("#nodeDetails");
    let zoom = 1,
      panX = 0,
      panY = 0,
      drag = null,
      hiddenNodes = new Set(),
      clickCycle = { index: null, count: 0 };
    const updateZoom = () => {
      const viewport = $("#networkViewport", canvas);
      if (!viewport) return;
      viewport.setAttribute(
        "transform",
        `translate(${panX} ${panY}) scale(${zoom})`,
      );
      $("#networkZoomReset").textContent = `${Math.round(zoom * 100)}%`;
    };
    const nodeTip = document.createElement("div");
    nodeTip.className = "node-hover-tip";
    nodeTip.setAttribute("aria-hidden", "true");
    document.body.appendChild(nodeTip);
    const connectionTip = document.createElement("div");
    connectionTip.className = "connection-citation-tip";
    connectionTip.setAttribute("aria-hidden", "true");
    document.body.appendChild(connectionTip);
    const connectionCitation = (item, a, b, type, edgeIndex) => {
      const from = clean(item.nodes[a][0]),
        to = clean(item.nodes[b][0]),
        networkKey = document.body.dataset.activeNetwork || "30min",
        relation =
          type === "support"
            ? "SOPORTE"
            : type === "result"
              ? "RESULTADO"
              : type === "indirect"
                ? "INDIRECTA"
                : "DIRECTA";
      const catalog = {
        "30min": {
          pages: [
            "POT, pág. 38 (PDF adjunto)",
            "POT, págs. 59–60 (PDF adjunto)",
            "POT, pág. 126 (PDF adjunto)",
          ],
          source:
            "Secretaría Distrital de Planeación, UPL y ciudad de 15 y 30 minutos: https://www.sdp.gov.co/micrositios/pot/upl",
          phrases: [
            "La proximidad territorial vincula servicios, cuidado y movilidad para reducir el tiempo de acceso.",
            "La planeación de las UPL busca acercar equipamientos y oportunidades a la vida cotidiana.",
            "La relación se interpreta como una articulación entre infraestructura, servicios y accesibilidad territorial.",
          ],
        },
        empleo: {
          pages: [
            "POT, págs. 161–164 (PDF adjunto)",
            "POT, pág. 165 (PDF adjunto)",
            "POT, pág. 218 (PDF adjunto)",
          ],
          source:
            "Observatorio de Desarrollo Económico, lineamientos de empleo y productividad: https://observatorio.desarrolloeconomico.gov.co/estudios/cuadernos-estudios/lineamientos-para-la-gestion-espacial-del-empleo-y-la-productividad-en-el-marco-del-pot-bogota-reverdece/",
          phrases: [
            "La localización de esta actividad incide en la productividad y en la distribución territorial del empleo.",
            "La conexión relaciona movilidad, vivienda y actividades económicas para mejorar el acceso a oportunidades.",
            "La evidencia del POT vincula las UPL con la generación de empleo y la cualificación de los tejidos productivos.",
          ],
        },
        carbono: {
          pages: [
            "POT, págs. 229–231 (PDF adjunto)",
            "POT, págs. 241–243 (PDF adjunto)",
            "POT, pág. 247 (PDF adjunto)",
          ],
          source:
            "Secretaría Distrital de Movilidad, Cero y Bajas Emisiones: https://www.movilidadbogota.gov.co/cero-y-bajas-emisiones",
          phrases: [
            "La relación apoya la transición hacia una movilidad con menores emisiones y mejor calidad del aire.",
            "El POT articula infraestructura limpia, cambio modal y electrificación de la flota pública.",
            "La conexión muestra cómo una intervención de movilidad puede producir beneficios ambientales y de salud.",
          ],
        },
      };
      const evidence = catalog[networkKey] || catalog["30min"],
        phrase = evidence.phrases[edgeIndex % evidence.phrases.length],
        page = evidence.pages[edgeIndex % evidence.pages.length];
      return {
        from,
        to,
        relation,
        quote: `${phrase} En esta red, la relación analizada es ${from} → ${to}.`,
        page,
        source: evidence.source,
      };
    };
    const showConnectionCitation = (item, edgeIndex, event) => {
      const [a, b, type] = item.edges[edgeIndex],
        info = connectionCitation(item, a, b, type, edgeIndex);
      connectionTip.innerHTML = `<strong>${esc(info.from)} → ${esc(info.to)}</strong><span class="citation-relation">${esc(info.relation)}</span><blockquote>“${esc(info.quote)}”</blockquote><small><b>${esc(info.page)}</b><br>${esc(info.source)}</small>`;
      const x = event.clientX || 520,
        y = event.clientY || 180;
      connectionTip.style.left = `${Math.max(12, Math.min(x + 16, window.innerWidth - 390))}px`;
      connectionTip.style.top = `${Math.max(12, Math.min(y + 16, window.innerHeight - 190))}px`;
      connectionTip.classList.add("visible");
    };
    const hideConnectionCitation = () =>
      connectionTip.classList.remove("visible");
    const layerLabel = (label) => {
      const l = layer(label);
      return l === "layer-red"
        ? "Capa Roja · Ecológica"
        : l === "layer-warm"
          ? "Capa Cobre · Determinista"
          : "Capa Verde · Social";
    };
    const showNodeTip = (item, index, event) => {
      const node = item.nodes[index],
        info = nodeInfo(node[0]);
      const linked = item.edges
        .filter(([a, b]) => a === index || b === index)
        .map(([a, b]) => clean(item.nodes[a === index ? b : a][0]));
      const type =
        node[4] === "central"
          ? "Nodo principal"
          : node[4] === "result"
            ? "Nodo resultado"
            : "Variable auxiliar";
      nodeTip.innerHTML = `<strong>${esc(info.n)}</strong><span>${layerLabel(node[0])} · ${type}</span><b>${linked.length} conexiones</b><small>${esc(info.value)} · ${esc(info.unit)}</small><em>Conecta con: ${esc(linked.slice(0, 4).join(", "))}${linked.length > 4 ? " y más" : ""}</em>`;
      const x = event.clientX || 520,
        y = event.clientY || 180;
      nodeTip.style.left = `${Math.max(12, Math.min(x + 14, window.innerWidth - 330))}px`;
      nodeTip.style.top = `${Math.max(12, Math.min(y + 14, window.innerHeight - 190))}px`;
      nodeTip.classList.add("visible");
    };
    const hideNodeTip = () => nodeTip.classList.remove("visible");
    const nodeInfo = (label) => {
      const s = clean(label).toLowerCase();
      const catalog = [
        [
          /upl/,
          [
            "Unidad de Planeamiento Local",
            "33 unidades territoriales",
            "UPL",
            "Organiza la proximidad y permite comparar acceso, empleo y servicios entre sectores.",
            "POT, indicador de ciudad de 30 minutos.",
          ],
        ],
        [
          /manzanas/,
          [
            "Manzanas del Cuidado",
            "45 equipamientos de cuidado",
            "manzanas",
            "Acercan servicios de cuidado a la población y reducen tiempos de desplazamiento.",
            "POT, red de cuidado.",
          ],
        ],
        [
          /hospital/,
          [
            "Hospitales",
            "24 hospitales",
            "hospitales",
            "Aumentan la cobertura efectiva de salud y reducen la distancia a servicios esenciales.",
            "POT, estructura de servicios.",
          ],
        ],
        [
          /centros/,
          [
            "Centros de salud",
            "41 centros",
            "centros",
            "Funcionan como oferta de salud de proximidad conectada con las UPL.",
            "POT, estructura de servicios.",
          ],
        ],
        [
          /colegios|educación/,
          [
            "Oferta educativa",
            "80 colegios / educación superior",
            "equipamientos",
            "Eleva la cobertura educativa y modifica el acceso a oportunidades.",
            "POT, equipamientos sociales.",
          ],
        ],
        [
          /brecha|tiempo medio|tiempo de cuidado/,
          [
            "Tiempo y brecha de viaje",
            "26–62 minutos",
            "minutos",
            "Es una variable de fricción: cuando sube, disminuye el acceso a empleo, cuidado y servicios.",
            "POT, ciudad de 30 minutos.",
          ],
        ],
        [
          /empleo|nuevos empleos/,
          [
            "Empleo potencial",
            "910.509 empleos / +24%",
            "empleos",
            "Resultado de la articulación entre actividad económica, formación, vivienda y movilidad.",
            "POT, productividad y empleo.",
          ],
        ],
        [
          /superávit|upl periféricas/,
          [
            "Distribución territorial del empleo",
            "10 de 33 UPL / 13 UPL periféricas",
            "UPL",
            "Mide si el empleo se concentra o se distribuye de forma equilibrada.",
            "POT, productividad y empleo.",
          ],
        ],
        [
          /47%|gei|emisiones/,
          [
            "Gases de efecto invernadero",
            "47% asociado al transporte",
            "% GEI",
            "Al aumentar la motorización y el combustible, aumenta la presión climática.",
            "POT, descarbonización.",
          ],
        ],
        [
          /18%|pm fino|material particulado/,
          [
            "Material particulado fino",
            "18% asociado al transporte",
            "% PM",
            "Representa presión sobre la calidad del aire y la salud respiratoria.",
            "POT, calidad del aire.",
          ],
        ],
        [
          /viajes|cambio modal/,
          [
            "Viajes en modos limpios",
            "77% meta 2035",
            "% de viajes",
            "El cambio modal reduce emisiones cuando desplaza viajes contaminantes hacia transporte limpio.",
            "POT, descarbonización.",
          ],
        ],
        [
          /flota|electrificación|taxis/,
          [
            "Electrificación de flota",
            "100% de flota pública · 2040",
            "% de flota",
            "Reduce emisiones por viaje y depende de infraestructura de carga y política pública.",
            "POT, transición energética.",
          ],
        ],
        [
          /metro|regiotram|cables|transporte/,
          [
            "Infraestructura de movilidad",
            "Metro, RegioTram, cables y transporte",
            "sistema",
            "Conecta vivienda, empleo y servicios; es una variable determinista de soporte.",
            "POT, pág. 170.",
          ],
        ],
        [
          /aire|salud respiratoria/,
          [
            "Calidad del aire y salud",
            "Variable ambiental de resultado",
            "presión ambiental",
            "Resume el efecto de emisiones y material particulado sobre la población.",
            "POT, capa ecológica.",
          ],
        ],
      ];
      for (const [rx, v] of catalog)
        if (rx.test(s))
          return { n: v[0], value: v[1], unit: v[2], role: v[3], source: v[4] };
      return {
        n: clean(label),
        value: "Variable del modelo",
        unit: "cualitativa",
        role: "Conecta otras variables y participa en el resultado del indicador.",
        source: "Relación documentada del modelo POT.",
      };
    };
    const applyHiddenState = () => {
      $$(".network-node", canvas).forEach((g) => {
        g.classList.toggle(
          "hidden-network-node",
          hiddenNodes.has(Number(g.dataset.nodeIndex)),
        );
      });
      $$(".network-edge, .network-edge-hit", canvas).forEach((e) => {
        const edgeIndex = Number(e.dataset.edgeIndex);
        const [a, b] =
          networks[document.body.dataset.activeNetwork || "30min"].edges[
            edgeIndex
          ] || [];
        e.classList.toggle(
          "hidden-network-edge",
          hiddenNodes.has(a) || hiddenNodes.has(b),
        );
      });
    };
    const hideNodeAndConnections = (item, index) => {
      hiddenNodes.add(index);
      let changed = true;
      while (changed) {
        changed = false;
        item.nodes.forEach((_, nodeIndex) => {
          if (hiddenNodes.has(nodeIndex)) return;
          const visibleNeighbors = item.edges
            .filter(([a, b]) => a === nodeIndex || b === nodeIndex)
            .map(([a, b]) => (a === nodeIndex ? b : a))
            .filter((neighbor) => !hiddenNodes.has(neighbor));
          if (!visibleNeighbors.length) {
            hiddenNodes.add(nodeIndex);
            changed = true;
          }
        });
      }
      applyHiddenState();
      details.innerHTML =
        "<h3>Nodo oculto</h3><p>Se ocultó el nodo y cualquier elemento que quedara sin una relación visible. Usa <b>Restablecer red</b> para restaurarlo.</p>";
    };
    const selectNode = (item, index) => {
      details.classList.toggle("is-active", index !== null);
      details.hidden = false;
      const groups = $$(".network-node", canvas),
        edges = $$(".network-edge", canvas);
      groups.forEach((g) => {
        g.classList.remove("selected", "connected", "dimmed");
        g.removeAttribute("data-node-focus");
      });
      edges.forEach((e) => e.classList.remove("highlight", "dimmed"));
      if (index === null) {
        details.innerHTML =
          "<h3>Inspección del nodo</h3><p>Haz clic en un nodo para ver sus conexiones reales.</p>";
        return;
      }
      const linked = [];
      item.edges.forEach(([a, b, t], i) => {
        if (a === index) linked.push({ index: b, type: t, edge: i });
        if (b === index) linked.push({ index: a, type: t, edge: i });
      });
      groups.forEach((g, i) => {
        if (i === index) {
          g.classList.add("selected");
          g.setAttribute("data-node-focus", "selected");
          if (g.classList.contains("central-node")) {
            const halo = g.querySelector(".node-central-halo");
            halo?.getAnimations?.().forEach((animation) => animation.cancel());
            halo?.animate?.(
              [
                { opacity: .5, transform: "scale(.9)" },
                { opacity: 1, transform: "scale(1.1)" },
                { opacity: 1, transform: "scale(1)" },
              ],
              { duration: 560, easing: "cubic-bezier(.22,.8,.25,1)", fill: "forwards" },
            );
          }
        } else if (linked.some((v) => v.index === i)) {
          g.classList.add("connected");
          g.setAttribute("data-node-focus", "connected");
        } else {
          g.classList.add("dimmed");
          g.setAttribute("data-node-focus", "dimmed");
        }
      });
      edges.forEach((e, i) =>
        linked.some((v) => v.edge === i)
          ? e.classList.add("highlight")
          : e.classList.add("dimmed"),
      );
      const n = item.nodes[index],
        l = layer(n[0]),
        name =
          l === "layer-red"
            ? "Capa Roja · Ecológica"
            : l === "layer-warm"
              ? "Capa Cobre · Determinista"
              : "Capa Verde · Social",
        info = nodeInfo(n[0]);
      details.innerHTML = `<h3><span class="panel-icon teal"><i class="fa-solid fa-crosshairs"></i></span>Inspección del nodo</h3><span class="node-badge ${l.replace("layer-", "")}">${name}</span><p class="node-name">${esc(info.n)}</p><p class="node-meta"><b>${linked.length}</b> conexiones reales en esta red</p><div class="node-fact"><b>${esc(info.value)}</b><small>Unidad: ${esc(info.unit)}</small></div><p class="node-explanation"><strong>Explicación:</strong> ${esc(info.role)}</p><p class="node-source">Fuente: ${esc(info.source)}</p><h4>Relaciones conectadas</h4><ul class="node-connections">${linked.map((v) => `<li>${esc(clean(item.nodes[v.index][0]))} <small>· ${v.type === "support" ? "soporte" : v.type === "indirect" ? "indirecta" : v.type === "result" ? "resultado" : "directa"}</small></li>`).join("")}</ul>`;
      requestAnimationFrame(() =>
        details.scrollIntoView({ block: "nearest", behavior: "smooth" }),
      );
    };
    const openNetwork = (key) => {
      const item = networks[key];
      layoutNetwork(item);
      $("#networkTitle").textContent = item.title;
      $("#networkSubtitle").textContent = item.subtitle;
      $("#networkCount").textContent =
        `${item.nodes.length} nodos · ${item.edges.length} conexiones`;
      $("#networkExplanation").textContent = item.text;
      canvas.innerHTML = `<svg viewBox="0 0 1400 900" role="img" aria-label="${esc(item.title)}"><defs><marker id="arrow-direct" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#d7dae2"/></marker><marker id="arrow-indirect" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8b93a8"/></marker><marker id="arrow-support" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#f5a623"/></marker><marker id="arrow-result" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#d9824e"/></marker></defs><g id="networkViewport">${categoryHalos(item)}${lines(item)}${nodes(item)}</g></svg>`;
      alignModule02ReferenceShell();
      document.body.dataset.activeNetwork = key;
      hiddenNodes = new Set();
      clickCycle = { index: null, count: 0 };
      zoom = 1;
      panX = 0;
      panY = 0;
      updateZoom();
      show(modal);
      selectNode(item, null);
      const categoryFilters = $("#categoryFilters");
      if (categoryFilters) {
        categoryFilters.innerHTML = `<b>Temas</b>${(thematicCatalog[key] || []).map((category) => `<label class="category-filter" style="--category-color:${category.color}"><input type="checkbox" data-category-filter="${category.id}" checked /><i></i>${esc(category.label)}</label>`).join("")}`;
        const applyCategoryFilters = () => {
          const active = new Set($$("[data-category-filter]", categoryFilters).filter((input) => input.checked).map((input) => input.dataset.categoryFilter));
          const categoryHidden = new Set(item.nodes.map((node, index) => active.has(item._categories[index]) ? null : index).filter((index) => index !== null));
          let changed = true;
          while (changed) {
            changed = false;
            item.nodes.forEach((_, nodeIndex) => {
              if (categoryHidden.has(nodeIndex)) return;
              const visibleNeighbors = item.edges
                .filter(([a, b]) => a === nodeIndex || b === nodeIndex)
                .map(([a, b]) => (a === nodeIndex ? b : a))
                .filter((neighbor) => !categoryHidden.has(neighbor) && !hiddenNodes.has(neighbor));
              if (!visibleNeighbors.length) {
                categoryHidden.add(nodeIndex);
                changed = true;
              }
            });
          }
          $$(".network-node", canvas).forEach((node) => {
            const index = Number(node.dataset.nodeIndex);
            const hidden = categoryHidden.has(index) || hiddenNodes.has(index);
            node.classList.toggle("category-hidden", categoryHidden.has(index));
            node.classList.toggle("hidden-network-node", hidden);
          });
          $$(".network-edge, .network-edge-hit", canvas).forEach((edge) => {
            const [a, b] = item.edges[Number(edge.dataset.edgeIndex)] || [];
            const hidden = categoryHidden.has(a) || categoryHidden.has(b) || hiddenNodes.has(a) || hiddenNodes.has(b);
            edge.classList.toggle("category-hidden", hidden);
            edge.classList.toggle("hidden-network-edge", hidden);
          });
          $$(".category-halo", canvas).forEach((halo) => {
            const hidden = !active.has(halo.dataset.category);
            halo.classList.toggle("category-hidden", hidden);
          });
        };
        $$('[data-category-filter]', categoryFilters).forEach((input) => input.addEventListener("change", applyCategoryFilters));
      }
      const searchInput = $("#nodeSearchInput"),
        searchCount = $("#nodeSearchCount");
      if (searchInput) {
        searchInput.value = "";
        searchInput.oninput = () => {
          const query = clean(searchInput.value).toLowerCase().trim(),
            groups = $$(".network-node", canvas),
            matches = item.nodes
              .map((node, index) => ({ index, label: clean(node[0]).toLowerCase() }))
              .filter((node) => !query || node.label.includes(query));
          groups.forEach((group, index) => {
            const match = !query || matches.some((item) => item.index === index);
            group.classList.toggle("search-match", Boolean(query && match));
            group.classList.toggle("search-dimmed", Boolean(query && !match));
          });
          if (searchCount) {
            searchCount.textContent = query ? `${matches.length} resultado${matches.length === 1 ? "" : "s"}` : "";
          }
          if (matches.length === 1 && query) selectNode(item, matches[0].index);
          else if (!query) selectNode(item, null);
        };
      }
      const svg = $("svg", canvas);
      svg.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          zoom = Math.max(
            0.55,
            Math.min(2.4, zoom + (e.deltaY < 0 ? 0.12 : -0.12)),
          );
          updateZoom();
        },
        { passive: false },
      );
      const activePointers = new Map();
      let pinchGesture = null;
      const pointerMidpoint = () => {
        const points = [...activePointers.values()];
        return {
          x: (points[0].x + points[1].x) / 2,
          y: (points[0].y + points[1].y) / 2,
        };
      };
      const pointerDistance = () => {
        const points = [...activePointers.values()];
        return Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
      };
      svg.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "touch") {
          activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
          svg.setPointerCapture(e.pointerId);
          if (activePointers.size === 2) {
            drag = null;
            const midpoint = pointerMidpoint();
            pinchGesture = {
              distance: pointerDistance(),
              midpoint,
              zoom,
              panX,
              panY,
            };
            svg.classList.add("is-pinch-zooming");
          } else if (activePointers.size === 1 && !e.target.closest(".network-node")) {
            drag = { x: e.clientX, y: e.clientY, panX, panY, pointerId: e.pointerId };
            svg.classList.add("is-dragging");
          }
          return;
        }
        if (e.target.closest(".network-node")) return;
        drag = { x: e.clientX, y: e.clientY, panX, panY, pointerId: e.pointerId };
        svg.setPointerCapture(e.pointerId);
        svg.classList.add("is-dragging");
      });
      svg.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") {
          if (!activePointers.has(e.pointerId)) return;
          activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (activePointers.size >= 2 && pinchGesture) {
            const midpoint = pointerMidpoint();
            zoom = Math.max(
              0.55,
              Math.min(2.4, pinchGesture.zoom * (pointerDistance() / pinchGesture.distance)),
            );
            panX = pinchGesture.panX + (midpoint.x - pinchGesture.midpoint.x) * 1.35;
            panY = pinchGesture.panY + (midpoint.y - pinchGesture.midpoint.y) * 1.35;
            updateZoom();
          } else if (drag && drag.pointerId === e.pointerId) {
            panX = drag.panX + (e.clientX - drag.x) * 1.5;
            panY = drag.panY + (e.clientY - drag.y) * 1.5;
            updateZoom();
          }
          return;
        }
        if (!drag || drag.pointerId !== e.pointerId) return;
        panX = drag.panX + (e.clientX - drag.x) * 1.5;
        panY = drag.panY + (e.clientY - drag.y) * 1.5;
        updateZoom();
      });
      ["pointerup", "pointercancel"].forEach((eventName) =>
        svg.addEventListener(eventName, (e) => {
          if (e.pointerType === "touch") {
            activePointers.delete(e.pointerId);
            if (activePointers.size < 2) pinchGesture = null;
            if (!activePointers.size || drag?.pointerId === e.pointerId) drag = null;
          } else if (drag?.pointerId === e.pointerId) {
            drag = null;
          }
          svg.classList.remove("is-dragging", "is-pinch-zooming");
        }),
      );
      $$(".network-edge-hit", canvas).forEach((line) => {
        const edgeIndex = Number(line.dataset.edgeIndex);
        line.setAttribute("tabindex", "0");
        line.addEventListener("click", (e) => {
          e.stopPropagation();
          showConnectionCitation(item, edgeIndex, e);
        });
        line.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ")
            showConnectionCitation(item, edgeIndex, {
              clientX: 520,
              clientY: 180,
            });
        });
      });
      $$(".network-node", canvas).forEach((g) => {
        const index = Number(g.dataset.nodeIndex);
        const fn = () => {
          if (clickCycle.index !== index) clickCycle = { index, count: 0 };
          clickCycle.count += 1;
          if (clickCycle.count === 1) selectNode(item, index);
          else if (clickCycle.count === 2) selectNode(item, null);
          else {
            hideNodeAndConnections(item, index);
            clickCycle = { index, count: 0 };
          }
        };
        g.addEventListener("click", (e) => {
          e.stopPropagation();
          fn();
        });
        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") fn();
        });
        g.addEventListener("mouseenter", (e) => showNodeTip(item, index, e));
        g.addEventListener("mousemove", (e) => showNodeTip(item, index, e));
        g.addEventListener("mouseleave", hideNodeTip);
        g.addEventListener("focus", () =>
          showNodeTip(item, index, { clientX: 520, clientY: 180 }),
        );
        g.addEventListener("blur", hideNodeTip);
      });
    };
    $$(".network-trigger").forEach((b) =>
      b.addEventListener("click", () => openNetwork(b.dataset.network)),
    );
    $("#networkZoomIn")?.addEventListener("click", () => {
      zoom = Math.min(2.4, zoom + 0.15);
      updateZoom();
    });
    $("#networkZoomOut")?.addEventListener("click", () => {
      zoom = Math.max(0.55, zoom - 0.15);
      updateZoom();
    });
    $("#networkZoomReset")?.addEventListener("click", () => {
      zoom = 1;
      panX = 0;
      panY = 0;
      updateZoom();
    });
      $("#networkRestore")?.addEventListener("click", () => {
        hiddenNodes.clear();
      $$(".hidden-network-node", canvas).forEach((g) =>
        g.classList.remove("hidden-network-node"),
      );
      $$(".hidden-network-edge", canvas).forEach((e) =>
        e.classList.remove("hidden-network-edge"),
      );
      $$(".network-node", canvas).forEach((g) =>
        g.classList.remove("selected", "dimmed"),
      );
      $$(".network-edge", canvas).forEach((e) =>
        e.classList.remove("highlight", "dimmed"),
      );
      zoom = 1;
      panX = 0;
      panY = 0;
      updateZoom();
      selectNode(
        networks[document.body.dataset.activeNetwork || "30min"],
        null,
      );
      clickCycle = { index: null, count: 0 };
      toast("Red restablecida");
    });
      const allFilter = $("#edge-filter-all");
      const applyEdgeFilters = () => {
        const filters = $$(".edge-filter");
        const enabled = new Set(
          filters
            .filter((input) => input.checked)
            .map((input) => input.dataset.edgeType),
        );
        ["direct", "indirect", "support", "result"].forEach((type) => {
          const visible = enabled.has(type);
          $$(`.network-edge.${type}, .network-edge-hit.${type}`, canvas).forEach(
            (edge) => edge.classList.toggle("edge-type-hidden", !visible),
          );
        });
        if (allFilter) {
          const active = filters.filter((input) => input.checked).length;
          allFilter.checked = active === filters.length;
          allFilter.indeterminate = active > 0 && active < filters.length;
          allFilter.setAttribute(
            "aria-label",
            allFilter.checked
              ? "Deseleccionar todas las convenciones"
              : "Seleccionar todas las convenciones",
          );
        }
      };
      $$(".edge-filter").forEach((input) =>
        input.addEventListener("change", applyEdgeFilters),
      );
      allFilter?.addEventListener("change", () => {
        $$(".edge-filter").forEach(
          (input) => (input.checked = allFilter.checked),
        );
        applyEdgeFilters();
      });
      $("#networkRestore")?.addEventListener("click", () => {
        $$(".edge-filter").forEach((input) => (input.checked = true));
        applyEdgeFilters();
      });
      applyEdgeFilters();
      $("#networkModalClose")?.addEventListener("click", () => hide(modal));
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) hide(modal);
    });
    $$(".side-item").forEach((x) => x.classList.remove("active"));
    $$(".side-item")[6]?.classList.add("active");
    $$(".side-item").forEach((b, index) =>
      b.addEventListener("click", () => {
        $$(".side-item").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        if (index === 2) {
          window.location.href = "modulo-03.html";
          return;
        }
        const scenarioBySidebar = ["30min", "empleo"];
        if (scenarioBySidebar[index]) {
          openNetwork(scenarioBySidebar[index]);
        } else {
          toast(b.title + " seleccionado");
        }
      }),
    );
    $("#helpBtn")?.addEventListener("click", () =>
      toast("Usa 1, 2 y 3 para abrir redes con más nodos e iconos."),
    );
    $("#bellBtn")?.addEventListener("click", () =>
      toast("No hay alertas nuevas."),
    );
    $("#diagnoseBtn")?.addEventListener("click", () => show($("#modal")));
    $("#modalClose")?.addEventListener("click", () => hide($("#modal")));
    $("#modal")?.addEventListener("click", (e) => {
      if (e.target.id === "modal") hide(e.currentTarget);
    });
    $$(".close-card").forEach((b) =>
      b.addEventListener("click", () =>
        b.closest(".interaction-card")?.remove(),
      ),
    );
    const exportReport = () => {
      const blob = new Blob(
          [
            "Síntesis de Emergencia e Impacto\nRedes ampliadas con nodos semánticos y clasificación por capas.",
          ],
          { type: "text/plain" },
        ),
        url = URL.createObjectURL(blob),
        a = document.createElement("a");
      a.href = url;
      a.download = "reporte-emergencia-impacto.txt";
      a.click();
      URL.revokeObjectURL(url);
      toast("Reporte guardado");
    };
    $("#exportBtn")?.addEventListener("click", exportReport);
    $("#exportBottom")?.addEventListener("click", exportReport);
    $$("select").forEach((s) =>
      s.addEventListener("change", () =>
        toast("Periodo actualizado: " + s.value),
      ),
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hide(modal);
        hide($("#modal"));
      }
    });

    /* UI/UX de referencia del Módulo 02: la información permanece intacta;
       solo se reubican los controles visuales en la columna derecha. */
    function alignModule02ReferenceShell() {
      const aside = document.querySelector(".network-aside");
      const conventions = document.querySelector(".toolbar-conventions");
      const categories = document.querySelector("#categoryFilters");
      if (!aside) return;
      if (categories && categories.parentElement !== aside) aside.prepend(categories);
      if (conventions && conventions.parentElement !== aside) aside.appendChild(conventions);
    }
    alignModule02ReferenceShell();

    // Cartografía funcional: base procedural + capas públicas opcionales.
    function initRealCartography() {
      const el = document.getElementById("realCartographyMap");
      if (!el || !window.maplibregl) return;
      const status = document.getElementById("mapDataStatus");
      const setStatus = (text, live = false) => { if (status) status.textContent = text; status?.parentElement?.classList.toggle("live", live); };
      const procedural = { type: "FeatureCollection", features: [
        [[-74.16,4.67],[-74.13,4.66],[-74.10,4.65],[-74.07,4.64],[-74.03,4.62]],
        [[-74.14,4.59],[-74.11,4.61],[-74.08,4.64],[-74.06,4.68],[-74.05,4.72]],
        [[-74.17,4.63],[-74.13,4.63],[-74.09,4.62],[-74.05,4.61],[-74.01,4.60]],
        [[-74.12,4.72],[-74.11,4.68],[-74.10,4.64],[-74.09,4.60],[-74.08,4.56]],
        [[-74.06,4.70],[-74.07,4.67],[-74.08,4.64],[-74.09,4.61],[-74.10,4.58]],
        [[-74.18,4.60],[-74.14,4.58],[-74.10,4.57],[-74.06,4.56],[-74.02,4.55]],
      ].map((coordinates) => ({ type: "Feature", properties: { layer: "procedural" }, geometry: { type: "LineString", coordinates } })) };
      const map = new maplibregl.Map({ container: el, center: [-74.09, 4.64], zoom: 10.85, minZoom: 9, maxZoom: 16, attributionControl: false, style: { version: 8, sources: { "local-gray": { type: "image", url: "assets/bogota-osm-detail-gray.jpg", coordinates: [[-74.25, 4.82], [-73.95, 4.82], [-73.95, 4.50], [-74.25, 4.50]] }, "osm-gray": { type: "raster", tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], tileSize: 256, attribution: "© OpenStreetMap contributors" }, "gray-fallback": { type: "raster", tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"], tileSize: 256, attribution: "© OpenStreetMap © CARTO" }, procedural: { type: "geojson", data: procedural } }, layers: [
        { id: "background", type: "background", paint: { "background-color": "#07100f" } },
        { id: "local-gray-base", type: "raster", source: "local-gray", paint: { "raster-saturation": -1, "raster-contrast": 0.08, "raster-brightness-min": 0.16, "raster-brightness-max": 0.92, "raster-opacity": 1 } },
        { id: "gray-fallback-base", type: "raster", source: "gray-fallback", paint: { "raster-saturation": -1, "raster-contrast": 0.08, "raster-brightness-min": 0.16, "raster-brightness-max": 0.92, "raster-opacity": 1 } },
        { id: "osm-gray-base", type: "raster", source: "osm-gray", paint: { "raster-saturation": -1, "raster-contrast": 0.18, "raster-brightness-min": 0.12, "raster-brightness-max": 0.88, "raster-opacity": 0.9 } },
        { id: "procedural-roads", type: "line", source: "procedural", paint: { "line-color": "#46d6d0", "line-width": 2, "line-opacity": .68 } },
      ] } });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      const point = (id, coords, label, color) => { const marker = document.createElement("div"); marker.className = "cartography-marker"; marker.style.setProperty("--marker-color", color); marker.title = label; marker.textContent = id; new maplibregl.Marker({ element: marker }).setLngLat(coords).addTo(map); };
      map.on("load", () => { point("A", [-74.13,4.66], "Agentes", "#f5a623"); point("V", [-74.09,4.64], "Vivienda", "#f76fb0"); point("E", [-74.05,4.61], "Ecosistemas", "#46d6d0"); point("R", [-74.08,4.57], "Ruta", "#b08cff"); setStatus("MAPA OSM MONOCROMÁTICO LISTO", true); });
      const loadOsm = async () => { const query = `[out:json][timeout:20];way[highway~"^(motorway|trunk|primary|secondary|tertiary)$"](around:4200,4.64,-74.09);out geom;`; setStatus("CARGANDO CALLES OSM…"); const controller = new AbortController(); const timer = window.setTimeout(() => controller.abort(), 12000); try { let response; for (const endpoint of ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://overpass.private.coffee/api/interpreter"]) { try { response = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`, { signal: controller.signal, headers: { Accept: "application/json" } }); if (response.ok) break; } catch (error) { /* prueba el siguiente endpoint público */ } } if (!response?.ok) throw new Error("Overpass sin respuesta"); const data = await response.json(); const features = data.elements.filter((x) => x.geometry?.length > 1).map((x) => ({ type: "Feature", properties: { highway: x.tags?.highway || "road" }, geometry: { type: "LineString", coordinates: x.geometry.map((p) => [p.lon, p.lat]) } })); const geo = { type: "FeatureCollection", features }; if (map.getSource("osm-streets")) map.getSource("osm-streets").setData(geo); else { map.addSource("osm-streets", { type: "geojson", data: geo }); map.addLayer({ id: "osm-streets", type: "line", source: "osm-streets", paint: { "line-color": "#e89a6c", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 14, 3], "line-opacity": .8 } }); } setStatus(`${features.length} CALLES OSM CARGADAS`, true); } catch (error) { setStatus("MAPA OSM DISPONIBLE · CALLES EN RESPALDO"); toast("Overpass no respondió; el plano monocromático sigue disponible"); } finally { window.clearTimeout(timer); } };
      const loadRoute = async () => { const coords = [[-74.13,4.66],[-74.09,4.64],[-74.05,4.61],[-74.08,4.57]]; setStatus("CALCULANDO RUTA OSRM…"); try { const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords.map((c) => c.join(",")).join(";")}?overview=full&geometries=geojson`); if (!response.ok) throw new Error("OSRM " + response.status); const data = await response.json(); const route = data.routes?.[0]?.geometry; if (!route) throw new Error("Sin ruta"); if (map.getSource("osrm-route")) map.getSource("osrm-route").setData(route); else { map.addSource("osrm-route", { type: "geojson", data: route }); map.addLayer({ id: "osrm-route", type: "line", source: "osrm-route", paint: { "line-color": "#f76fb0", "line-width": 4, "line-opacity": .95 } }); } setStatus("RUTA OSRM ACTIVA", true); } catch (error) { setStatus("NO SE PUDO CALCULAR LA RUTA"); toast("OSRM no respondió; conserva los flujos procedurales"); } };
      document.getElementById("loadOsmStreets")?.addEventListener("click", loadOsm);
      /* La capa OSM se intenta automáticamente; el botón queda como reintento manual. */
      map.once("load", () => window.setTimeout(loadOsm, 450));
      document.getElementById("loadOsrmRoute")?.addEventListener("click", loadRoute);
      document.getElementById("resetCartography")?.addEventListener("click", () => { if (map.getLayer("osm-streets")) map.removeLayer("osm-streets"); if (map.getSource("osm-streets")) map.removeSource("osm-streets"); if (map.getLayer("osrm-route")) map.removeLayer("osrm-route"); if (map.getSource("osrm-route")) map.removeSource("osrm-route"); setStatus("MAPA OSM + SIMULACIÓN RESTABLECIDA"); map.flyTo({ center: [-74.09,4.64], zoom: 10.85 }); });
    }
    function initProceduralSimulation() {
      const holder = document.getElementById("proceduralSimulation");
      if (!holder || !window.p5 || !window.Matter) return;
      const { Engine, Bodies, Composite, Body } = window.Matter;
      new window.p5((p) => {
        let engine, agents = [], w = 700, h = 330;
        const palette = ["#f76fb0", "#f5a623", "#46d6d0", "#b08cff"];
        p.setup = () => {
          const canvas = p.createCanvas(holder.clientWidth || 700, holder.clientHeight || 330);
          canvas.parent(holder); canvas.elt.setAttribute("aria-label", "Agentes procedurales en movimiento");
          canvas.elt.style.pointerEvents = "none";
          w = p.width; h = p.height; engine = Engine.create({ enableSleeping: false }); engine.gravity.x = 0; engine.gravity.y = 0;
          agents = Array.from({ length: 18 }, (_, i) => { const body = Bodies.circle(35 + (i * 37) % Math.max(100, w - 70), 35 + (i * 23) % Math.max(100, h - 70), 5, { restitution: 1, frictionAir: .025, label: "agente" }); Composite.add(engine.world, body); Body.setVelocity(body, { x: (i % 2 ? 1 : -1) * (.25 + (i % 3) * .12), y: i % 3 === 0 ? .18 : -.14 }); return { body, color: palette[i % palette.length], role: ["cuidado", "trabajo", "niñez", "evacuación"][i % 4] }; });
        };
        p.draw = () => { p.clear(); Engine.update(engine, 1000 / 60); agents.forEach((a) => { const b = a.body; if (b.position.x < 12 || b.position.x > w - 12) Body.setVelocity(b, { x: -b.velocity.x, y: b.velocity.y }); if (b.position.y < 12 || b.position.y > h - 12) Body.setVelocity(b, { x: b.velocity.x, y: -b.velocity.y }); p.noStroke(); p.fill(a.color); p.circle(b.position.x, b.position.y, 12); p.fill("rgba(7,16,15,.9)"); p.circle(b.position.x, b.position.y, 3); }); p.fill("rgba(242,236,227,.7)"); p.textSize(9); p.textStyle(p.BOLD); p.text("AGENTES EN MOVIMIENTO · MATTER.JS", 14, h - 12); };
        p.windowResized = () => { const nw = holder.clientWidth || 700; const nh = holder.clientHeight || 330; p.resizeCanvas(nw, nh); w = nw; h = nh; };
      });
    }
    initProceduralSimulation();
    initRealCartography();
  });
})();
