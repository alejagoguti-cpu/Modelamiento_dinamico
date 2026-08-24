// Fuente: 150nodosgeneralesreclasificadosenlossubsistemasexistentes.md
// Nombres, clasificación y tipos transcritos de la tabla adjunta.
const CITY_DATA_NODES = [
  {
    "n": 1,
    "name": "Ríos",
    "subsystem": "Sistema hídrico",
    "type": "Cuerpos de agua"
  },
  {
    "n": 2,
    "name": "Quebradas",
    "subsystem": "Sistema hídrico",
    "type": "Cuerpos de agua"
  },
  {
    "n": 3,
    "name": "Humedales",
    "subsystem": "Sistema hídrico",
    "type": "Cuerpos de agua"
  },
  {
    "n": 4,
    "name": "Canales",
    "subsystem": "Sistema hídrico",
    "type": "Infraestructura hídrica"
  },
  {
    "n": 5,
    "name": "Lagunas",
    "subsystem": "Sistema hídrico",
    "type": "Cuerpos de agua"
  },
  {
    "n": 6,
    "name": "Nacimientos de agua",
    "subsystem": "Sistema hídrico",
    "type": "Punto hídrico"
  },
  {
    "n": 7,
    "name": "Escorrentía de lluvia",
    "subsystem": "Sistema hídrico",
    "type": "Flujo de agua"
  },
  {
    "n": 8,
    "name": "Infiltración del agua",
    "subsystem": "Sistema hídrico",
    "type": "Proceso hídrico"
  },
  {
    "n": 9,
    "name": "Nivel del agua",
    "subsystem": "Sistema hídrico",
    "type": "Condición variable"
  },
  {
    "n": 10,
    "name": "Sedimentos transportados por el agua",
    "subsystem": "Sistema hídrico",
    "type": "Material móvil"
  },
  {
    "n": 11,
    "name": "Aves migratorias",
    "subsystem": "Sistema biótico",
    "type": "Organismos móviles"
  },
  {
    "n": 12,
    "name": "Aves residentes",
    "subsystem": "Sistema biótico",
    "type": "Organismos móviles"
  },
  {
    "n": 13,
    "name": "Mamíferos urbanos",
    "subsystem": "Sistema biótico",
    "type": "Organismos móviles"
  },
  {
    "n": 14,
    "name": "Reptiles urbanos",
    "subsystem": "Sistema biótico",
    "type": "Organismos móviles"
  },
  {
    "n": 15,
    "name": "Anfibios",
    "subsystem": "Sistema biótico",
    "type": "Organismos móviles"
  },
  {
    "n": 16,
    "name": "Insectos polinizadores",
    "subsystem": "Sistema biótico",
    "type": "Organismos móviles"
  },
  {
    "n": 17,
    "name": "Arañas tejedoras",
    "subsystem": "Sistema biótico",
    "type": "Artrópodos"
  },
  {
    "n": 18,
    "name": "Vegetación acuática",
    "subsystem": "Sistema biótico",
    "type": "Plantas"
  },
  {
    "n": 19,
    "name": "Vegetación ribereña",
    "subsystem": "Sistema biótico",
    "type": "Plantas"
  },
  {
    "n": 20,
    "name": "Especies invasoras",
    "subsystem": "Sistema biótico",
    "type": "Organismos introducidos"
  },
  {
    "n": 21,
    "name": "Suelos saturados",
    "subsystem": "Sistema hídrico",
    "type": "Condición del suelo"
  },
  {
    "n": 22,
    "name": "Suelos permeables",
    "subsystem": "Sistema hídrico",
    "type": "Condición del suelo"
  },
  {
    "n": 23,
    "name": "Suelos compactados",
    "subsystem": "Sistema hídrico",
    "type": "Condición del suelo"
  },
  {
    "n": 24,
    "name": "Superficies impermeables",
    "subsystem": "Sistema hídrico",
    "type": "Superficie urbana"
  },
  {
    "n": 25,
    "name": "Taludes inestables",
    "subsystem": "Sistema hídrico",
    "type": "Condición física"
  },
  {
    "n": 26,
    "name": "Zonas de inundación",
    "subsystem": "Sistema hídrico",
    "type": "Área de amenaza"
  },
  {
    "n": 27,
    "name": "Zonas de encharcamiento",
    "subsystem": "Sistema institucional de gestión",
    "type": "Área de amenaza"
  },
  {
    "n": 28,
    "name": "Zonas de remoción en masa",
    "subsystem": "Sistema institucional de gestión",
    "type": "Área de amenaza"
  },
  {
    "n": 29,
    "name": "Temperatura superficial alta",
    "subsystem": "Sistema institucional de gestión",
    "type": "Condición espacial"
  },
  {
    "n": 30,
    "name": "Daños por lluvias intensas",
    "subsystem": "Sistema institucional de gestión",
    "type": "Evento territorial"
  },
  {
    "n": 31,
    "name": "Vías arteriales",
    "subsystem": "Sistema físico-urbano",
    "type": "Infraestructura vial"
  },
  {
    "n": 32,
    "name": "Vías locales",
    "subsystem": "Sistema físico-urbano",
    "type": "Infraestructura vial"
  },
  {
    "n": 33,
    "name": "Edificaciones residenciales",
    "subsystem": "Sistema físico-urbano",
    "type": "Construcciones"
  },
  {
    "n": 34,
    "name": "Edificaciones comerciales",
    "subsystem": "Sistema físico-urbano",
    "type": "Construcciones"
  },
  {
    "n": 35,
    "name": "Edificaciones industriales",
    "subsystem": "Sistema físico-urbano",
    "type": "Construcciones"
  },
  {
    "n": 36,
    "name": "Cerramientos",
    "subsystem": "Sistema físico-urbano",
    "type": "Elementos de borde"
  },
  {
    "n": 37,
    "name": "Andenes",
    "subsystem": "Sistema físico-urbano",
    "type": "Espacio construido"
  },
  {
    "n": 38,
    "name": "Puentes",
    "subsystem": "Sistema físico-urbano",
    "type": "Infraestructura de conexión"
  },
  {
    "n": 39,
    "name": "Ciclorrutas construidas",
    "subsystem": "Sistema físico-urbano",
    "type": "Infraestructura ciclista"
  },
  {
    "n": 40,
    "name": "Superficies pavimentadas",
    "subsystem": "Sistema físico-urbano",
    "type": "Superficie construida"
  },
  {
    "n": 41,
    "name": "Transporte público",
    "subsystem": "Sistema de movilidad",
    "type": "Medio de transporte"
  },
  {
    "n": 42,
    "name": "Transporte privado",
    "subsystem": "Sistema de movilidad",
    "type": "Medio de transporte"
  },
  {
    "n": 43,
    "name": "Bicicletas",
    "subsystem": "Sistema de movilidad",
    "type": "Medio de transporte"
  },
  {
    "n": 44,
    "name": "Peatones",
    "subsystem": "Sistema de movilidad",
    "type": "Usuarios móviles"
  },
  {
    "n": 45,
    "name": "Carga urbana",
    "subsystem": "Sistema de movilidad",
    "type": "Flujo de bienes"
  },
  {
    "n": 46,
    "name": "Estaciones de transporte",
    "subsystem": "Sistema de movilidad",
    "type": "Infraestructura"
  },
  {
    "n": 47,
    "name": "Paraderos",
    "subsystem": "Sistema de movilidad",
    "type": "Infraestructura"
  },
  {
    "n": 48,
    "name": "Recorridos diarios",
    "subsystem": "Sistema de movilidad",
    "type": "Flujo de personas"
  },
  {
    "n": 49,
    "name": "Tiempo de viaje",
    "subsystem": "Sistema de movilidad",
    "type": "Variable temporal"
  },
  {
    "n": 50,
    "name": "Congestión vehicular",
    "subsystem": "Sistema de movilidad",
    "type": "Condición variable"
  },
  {
    "n": 51,
    "name": "Viviendas",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Uso residencial"
  },
  {
    "n": 52,
    "name": "Barrios",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Área urbana"
  },
  {
    "n": 53,
    "name": "Manzanas urbanas",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Organización espacial"
  },
  {
    "n": 54,
    "name": "Densidad residencial",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Condición espacial"
  },
  {
    "n": 55,
    "name": "Áreas de expansión",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Área de transformación"
  },
  {
    "n": 56,
    "name": "Áreas de renovación",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Área de transformación"
  },
  {
    "n": 57,
    "name": "Cambios de uso del suelo",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Proceso territorial"
  },
  {
    "n": 58,
    "name": "Construcciones nuevas",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Proceso de transformación"
  },
  {
    "n": 59,
    "name": "Lotes vacantes",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Área disponible"
  },
  {
    "n": 60,
    "name": "Ocupación del borde ambiental",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Proceso de transformación"
  },
  {
    "n": 61,
    "name": "Empleos",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad laboral"
  },
  {
    "n": 62,
    "name": "Actividades productivas",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad económica"
  },
  {
    "n": 63,
    "name": "Comercio local",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad económica"
  },
  {
    "n": 64,
    "name": "Industrias",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad económica"
  },
  {
    "n": 65,
    "name": "Servicios empresariales",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad económica"
  },
  {
    "n": 66,
    "name": "Centros financieros",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad económica"
  },
  {
    "n": 67,
    "name": "Centros de innovación",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad de conocimiento"
  },
  {
    "n": 68,
    "name": "Zonas de abastecimiento",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad de distribución"
  },
  {
    "n": 69,
    "name": "Trabajo informal",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Actividad laboral"
  },
  {
    "n": 70,
    "name": "Viajes entre vivienda y empleo",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Flujo socioeconómico"
  },
  {
    "n": 71,
    "name": "Colegios",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Equipamiento educativo"
  },
  {
    "n": 72,
    "name": "Universidades",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Equipamiento educativo"
  },
  {
    "n": 73,
    "name": "Bibliotecas",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Equipamiento cultural"
  },
  {
    "n": 74,
    "name": "Hospitales",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Equipamiento de salud"
  },
  {
    "n": 75,
    "name": "Centros de salud",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Equipamiento de salud"
  },
  {
    "n": 76,
    "name": "Centros de cuidado infantil",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Equipamiento de cuidado"
  },
  {
    "n": 77,
    "name": "Comedores comunitarios",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Servicio social"
  },
  {
    "n": 78,
    "name": "Parques",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Espacio público"
  },
  {
    "n": 79,
    "name": "Plazas públicas",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Espacio público"
  },
  {
    "n": 80,
    "name": "Tiempo de acceso a servicios",
    "subsystem": "Sistema de cuidado, servicios y espacio público",
    "type": "Variable temporal"
  },
  {
    "n": 81,
    "name": "Habitantes",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes residentes"
  },
  {
    "n": 82,
    "name": "Visitantes",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes usuarios"
  },
  {
    "n": 83,
    "name": "Organizaciones ambientales",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes colectivos"
  },
  {
    "n": 84,
    "name": "Juntas de Acción Comunal",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes colectivos"
  },
  {
    "n": 85,
    "name": "Colectivos culturales",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes colectivos"
  },
  {
    "n": 86,
    "name": "Organizaciones de mujeres",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes colectivos"
  },
  {
    "n": 87,
    "name": "Personas cuidadoras",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes sociales"
  },
  {
    "n": 88,
    "name": "Vendedores ambulantes",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes económicos"
  },
  {
    "n": 89,
    "name": "Recorridos comunitarios",
    "subsystem": "Sistema social-comunitario",
    "type": "Práctica colectiva"
  },
  {
    "n": 90,
    "name": "Jornadas comunitarias",
    "subsystem": "Sistema social-comunitario",
    "type": "Acción colectiva"
  },
  {
    "n": 91,
    "name": "Patrimonio cultural material",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Bien cultural"
  },
  {
    "n": 92,
    "name": "Patrimonio cultural inmaterial",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Práctica cultural"
  },
  {
    "n": 93,
    "name": "Patrimonio natural",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Lugar valorado"
  },
  {
    "n": 94,
    "name": "Patrimonio arqueológico",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Sitio cultural"
  },
  {
    "n": 95,
    "name": "Paisajes urbanos",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Paisaje"
  },
  {
    "n": 96,
    "name": "Paisajes rurales",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Paisaje"
  },
  {
    "n": 97,
    "name": "Memorias barriales",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Memoria colectiva"
  },
  {
    "n": 98,
    "name": "Relatos sobre ríos y humedales",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Memoria oral"
  },
  {
    "n": 99,
    "name": "Prácticas de observación de aves",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Práctica cultural"
  },
  {
    "n": 100,
    "name": "Recorridos patrimoniales",
    "subsystem": "Sistema patrimonial y de memoria",
    "type": "Práctica de movilidad"
  },
  {
    "n": 101,
    "name": "Redes de acueducto",
    "subsystem": "Sistema físico-urbano",
    "type": "Red de agua"
  },
  {
    "n": 102,
    "name": "Redes de alcantarillado",
    "subsystem": "Sistema físico-urbano",
    "type": "Red sanitaria"
  },
  {
    "n": 103,
    "name": "Redes de drenaje pluvial",
    "subsystem": "Sistema físico-urbano",
    "type": "Red hídrica"
  },
  {
    "n": 104,
    "name": "Subestaciones eléctricas",
    "subsystem": "Sistema físico-urbano",
    "type": "Infraestructura energética"
  },
  {
    "n": 105,
    "name": "Redes eléctricas",
    "subsystem": "Sistema físico-urbano",
    "type": "Red energética"
  },
  {
    "n": 106,
    "name": "Alumbrado público",
    "subsystem": "Sistema físico-urbano",
    "type": "Servicio urbano"
  },
  {
    "n": 107,
    "name": "Redes de gas",
    "subsystem": "Sistema físico-urbano",
    "type": "Red energética"
  },
  {
    "n": 108,
    "name": "Redes de telecomunicaciones",
    "subsystem": "Sistema físico-urbano",
    "type": "Red de información"
  },
  {
    "n": 109,
    "name": "Consumo de agua",
    "subsystem": "Sistema físico-urbano",
    "type": "Flujo de recursos"
  },
  {
    "n": 110,
    "name": "Consumo de energía",
    "subsystem": "Sistema físico-urbano",
    "type": "Flujo de recursos"
  },
  {
    "n": 111,
    "name": "Residuos domésticos",
    "subsystem": "Sistema institucional de gestión",
    "type": "Material descartado"
  },
  {
    "n": 112,
    "name": "Residuos comerciales",
    "subsystem": "Sistema institucional de gestión",
    "type": "Material descartado"
  },
  {
    "n": 113,
    "name": "Residuos de construcción",
    "subsystem": "Sistema institucional de gestión",
    "type": "Material descartado"
  },
  {
    "n": 114,
    "name": "Residuos acumulados en canales",
    "subsystem": "Sistema institucional de gestión",
    "type": "Material móvil"
  },
  {
    "n": 115,
    "name": "Contenedores de residuos",
    "subsystem": "Sistema institucional de gestión",
    "type": "Infraestructura"
  },
  {
    "n": 116,
    "name": "Rutas de recolección",
    "subsystem": "Sistema institucional de gestión",
    "type": "Recorrido de servicio"
  },
  {
    "n": 117,
    "name": "Recicladores de oficio",
    "subsystem": "Sistema social-comunitario",
    "type": "Agentes laborales"
  },
  {
    "n": 118,
    "name": "Material reciclable recuperado",
    "subsystem": "Sistema social-comunitario",
    "type": "Flujo de materiales"
  },
  {
    "n": 119,
    "name": "Compostaje",
    "subsystem": "Sistema social-comunitario",
    "type": "Proceso de transformación"
  },
  {
    "n": 120,
    "name": "Escombros en bordes ambientales",
    "subsystem": "Sistema social-comunitario",
    "type": "Material acumulado"
  },
  {
    "n": 121,
    "name": "Jardín Botánico de Bogotá",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agente institucional"
  },
  {
    "n": 122,
    "name": "Secretaría Distrital de Ambiente",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agente institucional"
  },
  {
    "n": 123,
    "name": "Empresa de Acueducto de Bogotá",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agente institucional"
  },
  {
    "n": 124,
    "name": "Secretaría Distrital de Movilidad",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agente institucional"
  },
  {
    "n": 125,
    "name": "Instituto de Desarrollo Urbano",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agente institucional"
  },
  {
    "n": 126,
    "name": "Alcaldías locales",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agente institucional"
  },
  {
    "n": 127,
    "name": "Empresas de servicios públicos",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agentes organizacionales"
  },
  {
    "n": 128,
    "name": "Normas de uso del suelo",
    "subsystem": "Sistema institucional de gestión",
    "type": "Instrumento normativo"
  },
  {
    "n": 129,
    "name": "Planes de manejo ambiental",
    "subsystem": "Sistema institucional de gestión",
    "type": "Instrumento de gestión"
  },
  {
    "n": 130,
    "name": "Presupuestos de intervención",
    "subsystem": "Sistema institucional de gestión",
    "type": "Recurso de decisión"
  },
  {
    "n": 131,
    "name": "Cerros Orientales",
    "subsystem": "Sistema biótico",
    "type": "Ecosistema regional"
  },
  {
    "n": 132,
    "name": "Páramo de Sumapaz",
    "subsystem": "Sistema biótico",
    "type": "Ecosistema regional"
  },
  {
    "n": 133,
    "name": "Sabana de Bogotá",
    "subsystem": "Sistema biótico",
    "type": "Territorio regional"
  },
  {
    "n": 134,
    "name": "Municipios proveedores de agua",
    "subsystem": "Sistema hídrico",
    "type": "Agentes territoriales"
  },
  {
    "n": 135,
    "name": "Municipios receptores de residuos",
    "subsystem": "Sistema institucional de gestión",
    "type": "Agentes territoriales"
  },
  {
    "n": 136,
    "name": "Viajes desde municipios vecinos",
    "subsystem": "Sistema de movilidad",
    "type": "Flujo de personas"
  },
  {
    "n": 137,
    "name": "Carga que entra a Bogotá",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Flujo de bienes"
  },
  {
    "n": 138,
    "name": "Alimentos que llegan a Bogotá",
    "subsystem": "Sistema socioeconómico y de ocupación",
    "type": "Flujo de recursos"
  },
  {
    "n": 139,
    "name": "Aves que atraviesan la ciudad",
    "subsystem": "Sistema biótico",
    "type": "Flujo ecológico"
  },
  {
    "n": 140,
    "name": "Información ambiental entre entidades",
    "subsystem": "Sistema institucional de gestión",
    "type": "Flujo de información"
  },
  {
    "n": 141,
    "name": "Lluvia",
    "subsystem": "Sistema hídrico",
    "type": "Fenómeno atmosférico"
  },
  {
    "n": 142,
    "name": "Temperatura del aire",
    "subsystem": "Sistema físico-urbano",
    "type": "Condición variable"
  },
  {
    "n": 143,
    "name": "Viento",
    "subsystem": "Sistema físico-urbano",
    "type": "Flujo atmosférico"
  },
  {
    "n": 144,
    "name": "Radiación solar",
    "subsystem": "Sistema físico-urbano",
    "type": "Flujo energético"
  },
  {
    "n": 145,
    "name": "Humedad del aire",
    "subsystem": "Sistema físico-urbano",
    "type": "Condición variable"
  },
  {
    "n": 146,
    "name": "Concentración de material particulado",
    "subsystem": "Sistema institucional de gestión",
    "type": "Medición ambiental"
  },
  {
    "n": 147,
    "name": "Ruido del tráfico",
    "subsystem": "Sistema institucional de gestión",
    "type": "Presión ambiental observable"
  },
  {
    "n": 148,
    "name": "Sombra de edificaciones",
    "subsystem": "Sistema físico-urbano",
    "type": "Condición espacial"
  },
  {
    "n": 149,
    "name": "Temperatura del borde urbano",
    "subsystem": "Sistema físico-urbano",
    "type": "Condición variable"
  },
  {
    "n": 150,
    "name": "Variación estacional de lluvias",
    "subsystem": "Sistema hídrico",
    "type": "Variación temporal"
  }
];
const CITY_DATA_SUBSYSTEM_COLORS = {
  "Sistema hídrico": "#43c7d7",
  "Sistema biótico": "#6bcf8f",
  "Sistema físico-urbano": "#b7c0cb",
  "Sistema de movilidad": "#f1cf5b",
  "Sistema de cuidado, servicios y espacio público": "#c6a0e9",
  "Sistema socioeconómico y de ocupación": "#e98b67",
  "Sistema social-comunitario": "#ef9a4b",
  "Sistema patrimonial y de memoria": "#f07bb1",
  "Sistema institucional de gestión": "#9d8be8"
};
const CITY_DATA_SUBSYSTEMS = [
  "Sistema hídrico",
  "Sistema biótico",
  "Sistema institucional de gestión",
  "Sistema físico-urbano",
  "Sistema de movilidad",
  "Sistema socioeconómico y de ocupación",
  "Sistema de cuidado, servicios y espacio público",
  "Sistema social-comunitario",
  "Sistema patrimonial y de memoria"
];
