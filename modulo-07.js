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
        text: "La red conecta las 33 UPL con cuidado, salud, educación, movilidad, vivienda, empleo y servicios. Las 45 Manzanas del Cuidado, 24 hospitales, 41 centros de salud y 80 colegios permiten explicar la meta de mejorar 24% el acceso antes de 2035. Capa Azul: infraestructura y servicios, POT pág. 170. Capa Verde: UPL y cuidado con agencia.",
        nodes: [
          ["UPL · 33", 390, 230, 58, "central", "⌖"],
          ["45 Manzanas\\ndel Cuidado", 145, 105, 42, "", "♥"],
          ["24 Hospitales", 160, 350, 37, "", "✚"],
          ["41 Centros\\nde salud", 355, 82, 38, "", "✚"],
          ["80 Colegios", 605, 94, 40, "", "▦"],
          ["Transporte\\npúblico", 635, 290, 45, "", "▣"],
          ["Empleo y\\nservicios", 425, 390, 40, "", "▤"],
          ["Meta +24%\\n2035", 720, 215, 42, "result", "↗"],
          ["Vivienda", 185, 225, 35, "", "⌂"],
          ["Cuidado\\ncomunitario", 315, 340, 36, "", "♥"],
          ["Equipamientos", 520, 335, 38, "", "▥"],
          ["Comercio\\nlocal", 590, 410, 32, "", "▤"],
          ["Brecha 26–62\\nminutos", 90, 245, 34, "", "◷"],
          ["Red peatonal", 465, 115, 33, "", "⌁"],
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
        text: "El escenario alto proyecta 24% de crecimiento en la población ocupada, 910.509 empleos potenciales y desempleo del 7%. La red relaciona UPL, empresas, vivienda, movilidad, educación y mixtura de usos; solo 10 de 33 UPL generan más empleo del que demanda su población. Capa Verde: actores con agencia, POT pág. 218. Capa Azul: infraestructura, POT pág. 170.",
        nodes: [
          ["Empleo\\n+24%", 390, 230, 58, "central", "▥"],
          ["910.509\\nnuevos empleos", 135, 100, 42, "result", "↗"],
          ["10 / 33 UPL\\nsuperávit", 125, 350, 38, "", "⌖"],
          ["Chapinero\\n×10", 390, 80, 38, "", "▥"],
          ["13 UPL\\nperiféricas", 650, 100, 42, "support", "⌖"],
          ["Mixtura de\\nusos", 660, 330, 42, "", "◈"],
          ["Vivienda", 390, 410, 36, "", "⌂"],
          ["Transporte", 175, 225, 36, "", "▣"],
          ["Brecha de\\ngénero", 700, 220, 36, "", "⇄"],
          ["Empresas", 205, 470, 32, "", "♙"],
          ["Educación", 535, 455, 35, "", "▦"],
          ["Servicios", 70, 220, 33, "", "▤"],
          ["Actividades\\neconómicas", 550, 195, 39, "", "◉"],
          ["Actuaciones\\nestratégicas", 700, 450, 35, "", "◆"],
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
        text: "El transporte representa 47% de los gases de efecto invernadero y 18% del material particulado fino. La red articula Metro, RegioTram, cables, corredores verdes, ciclorrutas y renovación de flota para alcanzar 77% de viajes limpios en 2035 y 100% de flota pública eléctrica en 2040. Capa Azul: redes, POT pág. 170. Capa Roja: aire y soporte vital, POT pág. 112.",
        nodes: [
          ["Viajes\\nlimpios 77%", 390, 230, 58, "central", "⌁"],
          ["5 líneas\\nde Metro", 110, 90, 38, "support", "▣"],
          ["2 RegioTram", 350, 70, 35, "", "▣"],
          ["7 Cables", 590, 85, 35, "", "▥"],
          ["22 Corredores\\nverdes", 670, 315, 42, "support", "♧"],
          ["1.000 km\\nciclorrutas", 390, 430, 45, "support", "♢"],
          ["Flota pública\\n2040", 115, 330, 40, "result", "⚡"],
          ["47% GEI\\ntransporte", 390, 125, 38, "layer-red", "◌"],
          ["18% PM\\nfino", 620, 205, 37, "layer-red", "◌"],
          ["Taxis 2026\\neléctricos", 145, 220, 34, "", "⚡"],
          ["Carga 2035\\nlimpia", 680, 450, 36, "support", "▣"],
          ["Vehículos\\nparticulares", 545, 420, 35, "", "⌂"],
          ["Rutas\\nescolares", 180, 455, 33, "", "▤"],
          ["Aire y\\nsalud", 70, 190, 34, "layer-red", "♧"],
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
      const item = networks[key],
        offset = item.nodes.length;
      item.nodes.push(...extraNodes);
      item.edges.push(
        ...extraEdges.map(([a, b, t]) => [a + offset, b + offset, t]),
      );
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
        ["Productividad urbana", 70, 70, 31, "result", "↗"],
        ["Salario promedio", 250, 42, 30, "", "▤"],
        ["Formalización laboral", 505, 42, 30, "", "✓"],
        ["Acceso a empleo", 735, 85, 31, "", "◎"],
        ["Economía del cuidado", 735, 175, 30, "", "♥"],
        ["Educación superior", 70, 395, 31, "", "▦"],
        ["Innovación", 260, 470, 30, "", "✦"],
        ["Inversión pública", 500, 470, 31, "support", "▥"],
        ["Segregación territorial", 735, 370, 33, "", "⇄"],
        ["Participación laboral", 70, 475, 29, "", "♙"],
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
        ["Demanda de viajes", 70, 70, 31, "", "⇄"],
        ["Consumo de combustible", 250, 42, 31, "", "◌"],
        ["Emisiones GEI", 505, 42, 32, "layer-red", "◌"],
        ["Material particulado", 735, 90, 30, "layer-red", "◌"],
        ["Calidad del aire", 735, 180, 32, "layer-red", "♧"],
        ["Electrificación", 70, 395, 31, "result", "⚡"],
        ["Infraestructura de carga", 260, 470, 31, "", "▣"],
        ["Cambio modal", 500, 470, 31, "support", "↗"],
        ["Velocidad operacional", 735, 365, 30, "", "◷"],
        ["Salud respiratoria", 70, 475, 31, "layer-red", "♥"],
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
    const fillTo60 = (key, labels) => {
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
      const need = Math.max(0, 60 - item.nodes.length),
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
    };
    fillTo60("30min", [
      "UPL norte · acceso 62 min",
      "UPL sur · acceso 26 min",
      "Cobertura de cuidado · %",
      "Cobertura de salud · %",
      "Cobertura educativa · %",
      "Población dependiente · %",
      "Hogares con niños · %",
      "Hogares mayores · %",
      "Distancia a hospital · km",
      "Distancia a colegio · km",
      "Distancia a cuidado · km",
      "Viajes de cuidado · día",
      "Viajes a empleo · día",
      "Tiempo de espera · min",
      "Frecuencia transporte · min",
      "Conectividad peatonal · %",
      "Intersecciones seguras · #",
      "Andenes accesibles · km",
      "Espacio público · m²/hab",
      "Equipamientos activos · #",
      "Empleo cercano · #",
      "Oferta comercial · #",
      "Vivienda asequible · %",
      "Densidad residencial · hab/ha",
      "Mezcla de usos · índice",
      "Acceso a parques · %",
      "Acceso a internet · %",
      "Seguridad percibida · %",
      "Manzanas nuevas · #",
      "Brecha territorial · %",
      "Acceso efectivo · %",
      "Costo de viaje · COP",
      "Transferencias · #",
      "Inversión en cuidado · COP",
      "Ahorro de tiempo · min",
      "Meta de proximidad · 2035",
    ]);
    fillTo60("empleo", [
      "Empleo formal · %",
      "Empleo informal · %",
      "Tasa de desempleo · 7%",
      "Participación laboral · %",
      "Brecha laboral de género · %",
      "Salario promedio · COP",
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
    fillTo60("carbono", [
      "Demanda de viajes · #",
      "Viajes motorizados · %",
      "Viajes transporte público · %",
      "Viajes bicicleta · %",
      "Viajes a pie · %",
      "Viajes limpios · 77%",
      "Kilómetros recorridos · km",
      "Consumo gasolina · gal",
      "Consumo diésel · gal",
      "Consumo GNV · m³",
      "Consumo eléctrico · kWh",
      "Emisiones GEI · tCO₂e",
      "Emisiones PM10 · kg",
      "Emisiones PM2.5 · kg",
      "NOx · kg",
      "Calidad del aire · índice",
      "Salud respiratoria · casos",
      "Mortalidad atribuible · #",
      "Flota gasolina · #",
      "Flota diésel · #",
      "Flota GNV · #",
      "Flota eléctrica · %",
      "Taxis eléctricos · %",
      "Buses eléctricos · %",
      "Carga eléctrica · #",
      "Puntos de carga · #",
      "Metro · km",
      "RegioTram · km",
      "Cables · km",
      "Ciclorrutas · km",
      "Corredores verdes · km",
      "Velocidad operacional · km/h",
      "Tiempo de viaje · min",
      "Congestión · índice",
      "Cambio modal · %",
      "Meta flota eléctrica · 2040",
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
        /metro|regiotram|cable|transporte|hospital|centro|colegio|ciclorruta|carga|taxis|flota pública|vehículos/.test(
          s,
        )
      )
        return "layer-blue";
      return "layer-green";
    };
    const quantify = (label) => {
      const q = {
        "UPL · 33": "UPL\n33 unidades",
        "45 Manzanas\\ndel Cuidado": "Cuidado\n45 manzanas",
        "24 Hospitales": "Salud\n24 hospitales",
        "41 Centros\\nde salud": "Salud\n41 centros",
        "80 Colegios": "Educación\n80 colegios",
        "Brecha 26–62\\nminutos": "Brecha\n26–62 min",
        "Meta +24%\\n2035": "Meta\n+24% · 2035",
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
      const degree = item.nodes.map((_, i) =>
        item.edges.reduce((n, [a, b]) => n + (a === i || b === i ? 1 : 0), 0),
      );
      const order = item.nodes
          .map((_, i) => i)
          .sort((a, b) => degree[b] - degree[a]),
        maxDegree = Math.max(...degree, 1);
      const centers = [
        [210, 190],
        [610, 160],
        [1030, 185],
        [330, 520],
        [760, 500],
        [1160, 520],
      ];
      order.forEach((nodeIndex, rank) => {
        const cluster = rank % centers.length,
          local = Math.floor(rank / centers.length),
          [cx, cy] = centers[cluster],
          angle = local * 1.72 + cluster * 0.55,
          radius = local === 0 ? 0 : 72 + (local - 1) * 42;
        item.nodes[nodeIndex][1] = Math.max(
          60,
          Math.min(1340, cx + Math.cos(angle) * radius),
        );
        item.nodes[nodeIndex][2] = Math.max(
          60,
          Math.min(840, cy + Math.sin(angle) * radius),
        );
        const d = degree[nodeIndex];
        item.nodes[nodeIndex][3] =
          d <= 2 ? 22 : d <= 4 ? 32 : d <= 6 ? 46 : d <= 9 ? 64 : 84;
      });
      /* Seis comunidades distribuidas: no existe una fila ni un centro dominante. */
    };
    const lines = (item) =>
      item.edges
        .map(([a, b, t], i) => {
          const A = item.nodes[a],
            B = item.nodes[b];
          return `<line class="network-edge ${t}" data-edge-index="${i}" marker-end="url(#arrow-${t})" x1="${A[1]}" y1="${A[2]}" x2="${B[1]}" y2="${B[2]}"/><line class="network-edge-hit ${t}" data-edge-index="${i}" data-edge-type="${t}" tabindex="0" x1="${A[1]}" y1="${A[2]}" x2="${B[1]}" y2="${B[2]}"/>`;
        })
        .join("");
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
      return `<foreignObject class="node-icon-svg" x="-14" y="-14" width="28" height="28"><div xmlns="http://www.w3.org/1999/xhtml" class="node-fa-icon"><i class="fa-solid ${icon}" aria-hidden="true"></i></div></foreignObject>`;
    };
    const nodes = (item) =>
      item.nodes
        .map(([label, x, y, r, type, icon], i) => {
          const display = quantify(label),
            maxChars = r >= 58 ? 15 : r >= 44 ? 12 : r >= 32 ? 9 : 7,
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
              r >= 58 ? "hub-large" : r >= 44 ? "hub-medium" : "node-small",
            iconY = r >= 44 ? y - 9 : y - 5,
            labelY = y + (r >= 44 ? 10 : 7),
            lineGap = r >= 44 ? 10 : 7;
          return `<g class="network-node ${sizeClass} ${type || ""} ${layer(label)}" data-node-index="${i}" tabindex="0" role="button" aria-label="${esc(clean(display))}"><circle cx="${x}" cy="${y}" r="${r}"/><g class="node-icon-wrap" transform="translate(${x} ${iconY})">${iconSvg(label)}</g><text class="node-label" x="${x}" y="${labelY}">${rows.map((row, j) => `<tspan x="${x}" dy="${j ? lineGap : 0}">${esc(row)}</tspan>`).join("")}</text></g>`;
        })
        .join("");
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
        : l === "layer-blue"
          ? "Capa Azul · Determinista"
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
      $$(".network-edge", canvas).forEach((e, edgeIndex) => {
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
      $$(".network-edge", canvas).forEach((e, edgeIndex) => {
        const [a, b] = item.edges[edgeIndex];
        if (a === index || b === index) e.classList.add("hidden-network-edge");
      });
      const node = $(`.network-node[data-node-index="${index}"]`, canvas);
      node?.classList.add("hidden-network-node");
      details.innerHTML =
        "<h3>Nodo oculto</h3><p>Se ocultó el nodo y sus conexiones directas. Usa <b>Restablecer red</b> para restaurarlo.</p>";
    };
    const selectNode = (item, index) => {
      details.classList.toggle("is-active", index !== null);
      details.hidden = false;
      const groups = $$(".network-node", canvas),
        edges = $$(".network-edge", canvas);
      groups.forEach((g) => g.classList.remove("selected", "dimmed"));
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
        if (i === index) g.classList.add("selected");
        else if (!linked.some((v) => v.index === i)) g.classList.add("dimmed");
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
            : l === "layer-blue"
              ? "Capa Azul · Determinista"
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
      canvas.innerHTML = `<svg viewBox="0 0 1400 900" role="img" aria-label="${esc(item.title)}"><defs><marker id="arrow-direct" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 7 3.5 0 7Z" fill="#55b7ff"/></marker><marker id="arrow-indirect" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 7 3.5 0 7Z" fill="#b27cff"/></marker><marker id="arrow-support" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 7 3.5 0 7Z" fill="#e0b447"/></marker><marker id="arrow-result" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 7 3.5 0 7Z" fill="#ff6eaa"/></marker></defs><g id="networkViewport">${lines(item)}${nodes(item)}</g></svg>`;
      document.body.dataset.activeNetwork = key;
      hiddenNodes = new Set();
      clickCycle = { index: null, count: 0 };
      zoom = 1;
      panX = 0;
      panY = 0;
      updateZoom();
      show(modal);
      selectNode(item, null);
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
      svg.addEventListener("pointerdown", (e) => {
        if (e.target.closest(".network-node")) return;
        drag = { x: e.clientX, y: e.clientY, panX, panY };
        svg.setPointerCapture(e.pointerId);
        svg.classList.add("is-dragging");
      });
      svg.addEventListener("pointermove", (e) => {
        if (!drag) return;
        panX = drag.panX + (e.clientX - drag.x) * 1.5;
        panY = drag.panY + (e.clientY - drag.y) * 1.5;
        updateZoom();
      });
      ["pointerup", "pointercancel"].forEach((eventName) =>
        svg.addEventListener(eventName, () => {
          drag = null;
          svg.classList.remove("is-dragging");
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
    $$(".side-item").forEach((b) =>
      b.addEventListener("click", () => {
        $$(".side-item").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        toast(b.title + " seleccionado");
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
            "Dashboard de Emergencia e Impacto\nRedes ampliadas con nodos semánticos y clasificación por capas.",
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
  });
})();
