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
        need = 60 - item.nodes.length,
        offset = item.nodes.length;
      for (let i = 0; i < need; i++) {
        const label = labels[i % labels.length],
          col = i % 6,
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
      const cols = 10,
        x0 = 130,
        y0 = 120,
        dx = 205,
        dy = 165;
      const degree = item.nodes.map((_, i) =>
        item.edges.reduce((n, [a, b]) => n + (a === i || b === i ? 1 : 0), 0),
      );
      const order = item.nodes
        .map((_, i) => i)
        .sort((a, b) => degree[b] - degree[a]);
      order.forEach((nodeIndex, rank) => {
        const col = rank % cols,
          row = Math.floor(rank / cols);
        item.nodes[nodeIndex][1] = x0 + col * dx;
        item.nodes[nodeIndex][2] = y0 + row * dy;
        item.nodes[nodeIndex][3] = Math.min(item.nodes[nodeIndex][3], 58);
      });
      item.nodes[order[0]][1] = 1060;
      item.nodes[order[0]][2] = 540;
    };
    const lines = (item) =>
      item.edges
        .map(([a, b, t], i) => {
          const A = item.nodes[a],
            B = item.nodes[b];
          return `<line class="network-edge ${t}" data-edge-index="${i}" x1="${A[1]}" y1="${A[2]}" x2="${B[1]}" y2="${B[2]}"/>`;
        })
        .join("");
    const iconSvg = (label, index) => {
      const s = label.toLowerCase(),
        angle = (index * 17) % 360,
        seed = index + 3,
        unique = `<path d="M12 3v3M12 18v3M3 12h3M18 12h3" transform="rotate(${angle} 12 12)"/>`;
      let p = '<circle cx="12" cy="12" r="5"/>';
      if (/hospital|salud|aire|respiratoria/.test(s))
        p = '<path d="M12 4v16M4 12h16"/>';
      else if (/colegio|educación/.test(s))
        p = '<path d="M4 9l8-4 8 4-8 4-8-4Zm3 3v4c2 2 8 2 10 0v-4M20 9v7"/>';
      else if (/metro|regiotram|cable|transporte|carga/.test(s))
        p =
          '<rect x="5" y="5" width="14" height="12" rx="3"/><path d="M8 17v3m8-3v3M5 10h14M8 14h.01M16 14h.01"/>';
      else if (/vivienda|espacio/.test(s))
        p = '<path d="m4 11 8-7 8 7v8H4zM9 19v-5h6v5"/>';
      else if (/empleo|empresa|productividad|salario|comercio/.test(s))
        p =
          '<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2"/>';
      else if (/cuidado|manzanas/.test(s))
        p =
          '<path d="M12 20S4 15 4 9a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 6-8 11-8 11Z"/>';
      else if (
        /ciclorruta|peatonal|movilidad|viajes|flota|vehículos|taxis/.test(s)
      )
        p =
          '<circle cx="8" cy="16" r="3"/><circle cx="17" cy="16" r="3"/><path d="m8 16 3-8 4 2 2 6M11 8h-3"/>';
      else if (/emisiones|gei|pm|combustible/.test(s))
        p = '<path d="M8 18h8M9 14c-2-2 0-5 3-7 3 2 5 5 3 7-1 2-5 2-6 0Z"/>';
      else if (/upl|población|periféricas|segregación/.test(s))
        p =
          '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19c0-3 2-5 5-5s5 2 5 5M11 19c0-3 2-5 5-5s5 2 5 5"/>';
      else if (/innovación|investigación/.test(s))
        p = '<path d="M9 3h6l1 5-4 4-4-4 1-5ZM12 12v8M8 20h8"/>';
      else if (/verde|calidad|parques/.test(s))
        p =
          '<path d="M12 20V8M12 12C8 12 5 9 5 5c4 0 7 3 7 7ZM12 15c4 0 7-3 7-7-4 0-7 3-7 7Z"/>';
      else if (/inversión|suelo|densidad/.test(s))
        p = '<path d="M4 19h16M6 16V9h3v7m3 0V5h3v11m3 0v-4h3v4"/>';
      else if (/tiempo|espera|velocidad|congestión/.test(s))
        p = '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>';
      else if (/internet|conectividad/.test(s))
        p =
          '<path d="M4 10a12 12 0 0 1 16 0M7 13a7 7 0 0 1 10 0M10 16a3 3 0 0 1 4 0M12 20h.01"/>';
      else if (/población|hogares|dependiente/.test(s))
        p =
          '<circle cx="12" cy="8" r="3"/><path d="M6 20c0-4 2-6 6-6s6 2 6 6"/>';
      const marker = `<circle cx="12" cy="12" r="9" stroke-dasharray="${3 + (seed % 4)} ${2 + (seed % 3)}" opacity=".6"/>`;
      return `<g class="node-icon-svg" transform="translate(-12 -12)" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p}${marker}${unique}</g>`;
    };
    const nodes = (item) =>
      item.nodes
        .map(([label, x, y, r, type, icon], i) => {
          const display = quantify(label);
          const rows = display
            .split(/\n|\\n/)
            .flatMap((row) =>
              row.length > 18 ? [row.slice(0, 17) + "…"] : [row],
            )
            .slice(0, 2);
          return `<g class="network-node ${type || ""} ${layer(label)}" data-node-index="${i}" tabindex="0" role="button" aria-label="${esc(clean(display))}"><circle cx="${x}" cy="${y}" r="${r}"/><g transform="translate(${x} ${y - 12})">${iconSvg(label, i)}</g><text x="${x}" y="${y + 7 + (rows.length - 1) * 4}">${rows.map((row, j) => `<tspan x="${x}" dy="${j ? 13 : 0}">${esc(row)}</tspan>`).join("")}</text></g>`;
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
        "<h3>Nodo oculto</h3><p>Se ocultó el nodo y sus conexiones directas. Usa <b>Mostrar ocultos</b> para restaurarlo.</p>";
    };
    const selectNode = (item, index) => {
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
      details.innerHTML = `<h3>Inspección del nodo</h3><span class="node-badge ${l.replace("layer-", "")}">${name}</span><p class="node-name">${esc(info.n)}</p><p class="node-meta"><b>${linked.length}</b> conexiones reales en esta red</p><div class="node-fact"><b>${esc(info.value)}</b><small>Unidad: ${esc(info.unit)}</small></div><p class="node-explanation">${esc(info.role)}</p><p class="node-source">Fuente: ${esc(info.source)}</p><h4>Relaciones conectadas</h4><ul class="node-connections">${linked.map((v) => `<li>${esc(clean(item.nodes[v.index][0]))} <small>· ${v.type === "support" ? "soporte" : v.type === "indirect" ? "indirecta" : v.type === "result" ? "resultado" : "directa"}</small></li>`).join("")}</ul>`;
    };
    const openNetwork = (key) => {
      const item = networks[key];
      layoutNetwork(item);
      $("#networkTitle").textContent = item.title;
      $("#networkSubtitle").textContent = item.subtitle;
      $("#networkCount").textContent =
        `${item.nodes.length} nodos · ${item.edges.length} conexiones`;
      $("#networkExplanation").textContent = item.text;
      canvas.innerHTML = `<svg viewBox="0 0 2180 1120" role="img" aria-label="${esc(item.title)}"><g id="networkViewport">${lines(item)}${nodes(item)}</g></svg>`;
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
        g.addEventListener("click", fn);
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
      selectNode(
        networks[document.body.dataset.activeNetwork || "30min"],
        null,
      );
      clickCycle = { index: null, count: 0 };
      toast("Nodos y conexiones restaurados");
    });
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
