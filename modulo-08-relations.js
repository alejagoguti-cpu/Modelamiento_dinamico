// Relaciones territoriales transcritas de la tabla adjunta.
const CITY_DATA_RELATIONS = [
  {
    "n": 1,
    "source": "Ríos",
    "target": "Quebradas",
    "relation": "conectividad hídrica",
    "directness": "directa",
    "process": "El agua circula entre cauces y quebradas",
    "lineType": "continua"
  },
  {
    "n": 2,
    "source": "Ríos",
    "target": "Humedales",
    "relation": "soporte hídrico",
    "directness": "directa",
    "process": "Los ríos alimentan o reciben agua de humedales",
    "lineType": "continua"
  },
  {
    "n": 3,
    "source": "Ríos",
    "target": "Canales",
    "relation": "transformación",
    "directness": "directa",
    "process": "Los canales conducen o alteran flujos hídricos",
    "lineType": "continua"
  },
  {
    "n": 4,
    "source": "Ríos",
    "target": "Escorrentía de lluvia",
    "relation": "flujo",
    "directness": "directa",
    "process": "La escorrentía llega a cauces y cuerpos de agua",
    "lineType": "continua"
  },
  {
    "n": 5,
    "source": "Ríos",
    "target": "Infiltración del agua",
    "relation": "regulación",
    "directness": "directa",
    "process": "La infiltración modifica el aporte subterráneo y superficial",
    "lineType": "continua"
  },
  {
    "n": 6,
    "source": "Quebradas",
    "target": "Humedales",
    "relation": "conectividad hídrica",
    "directness": "directa",
    "process": "Las quebradas aportan o transportan agua hacia humedales",
    "lineType": "continua"
  },
  {
    "n": 7,
    "source": "Humedales",
    "target": "Canales",
    "relation": "drenaje",
    "directness": "directa",
    "process": "Los canales reciben o conducen agua de humedales",
    "lineType": "continua"
  },
  {
    "n": 8,
    "source": "Humedales",
    "target": "Escorrentía de lluvia",
    "relation": "recepción",
    "directness": "directa",
    "process": "La escorrentía entra y se acumula en humedales",
    "lineType": "continua"
  },
  {
    "n": 9,
    "source": "Humedales",
    "target": "Nivel del agua",
    "relation": "variación",
    "directness": "directa",
    "process": "El nivel cambia según los aportes y salidas de agua",
    "lineType": "continua"
  },
  {
    "n": 10,
    "source": "Humedales",
    "target": "Sedimentos transportados por el agua",
    "relation": "acumulación",
    "directness": "directa",
    "process": "Los sedimentos se depositan y modifican el almacenamiento",
    "lineType": "continua"
  },
  {
    "n": 11,
    "source": "Escorrentía de lluvia",
    "target": "Infiltración del agua",
    "relation": "intercambio",
    "directness": "directa",
    "process": "Parte del agua escurre y parte infiltra",
    "lineType": "continua"
  },
  {
    "n": 12,
    "source": "Escorrentía de lluvia",
    "target": "Nivel del agua",
    "relation": "variación",
    "directness": "directa",
    "process": "La lluvia puede elevar el nivel del agua",
    "lineType": "continua"
  },
  {
    "n": 13,
    "source": "Infiltración del agua",
    "target": "Suelos permeables",
    "relation": "soporte",
    "directness": "directa",
    "process": "La permeabilidad facilita el paso del agua al suelo",
    "lineType": "continua"
  },
  {
    "n": 14,
    "source": "Suelos saturados",
    "target": "Nivel del agua",
    "relation": "condicionamiento",
    "directness": "directa",
    "process": "La saturación cambia con la altura del agua",
    "lineType": "continua"
  },
  {
    "n": 15,
    "source": "Suelos compactados",
    "target": "Escorrentía de lluvia",
    "relation": "transformación",
    "directness": "directa",
    "process": "La compactación aumenta el escurrimiento superficial",
    "lineType": "continua"
  },
  {
    "n": 16,
    "source": "Superficies impermeables",
    "target": "Escorrentía de lluvia",
    "relation": "transformación",
    "directness": "directa",
    "process": "Las superficies impermeables reducen la infiltración",
    "lineType": "continua"
  },
  {
    "n": 17,
    "source": "Nivel del agua",
    "target": "Zonas de inundación",
    "relation": "riesgo",
    "directness": "directa",
    "process": "Un aumento del nivel puede ampliar áreas inundables",
    "lineType": "continua"
  },
  {
    "n": 18,
    "source": "Nivel del agua",
    "target": "Zonas de encharcamiento",
    "relation": "riesgo",
    "directness": "directa",
    "process": "La acumulación temporal produce encharcamientos",
    "lineType": "continua"
  },
  {
    "n": 19,
    "source": "Sedimentos transportados por el agua",
    "target": "Canales",
    "relation": "obstrucción",
    "directness": "directa",
    "process": "Los sedimentos reducen la sección útil de los canales",
    "lineType": "continua"
  },
  {
    "n": 20,
    "source": "Lluvia",
    "target": "Escorrentía de lluvia",
    "relation": "generación",
    "directness": "directa",
    "process": "La lluvia genera escorrentía",
    "lineType": "continua"
  },
  {
    "n": 21,
    "source": "Variación estacional de lluvias",
    "target": "Nivel del agua",
    "relation": "variación temporal",
    "directness": "directa",
    "process": "La temporada lluviosa modifica los niveles",
    "lineType": "continua"
  },
  {
    "n": 22,
    "source": "Humedad del aire",
    "target": "Humedales",
    "relation": "condición ambiental",
    "directness": "indirecta",
    "process": "La humedad atmosférica acompaña condiciones de humedad local",
    "lineType": "continua"
  },
  {
    "n": 23,
    "source": "Aves migratorias",
    "target": "Humedales",
    "relation": "hábitat",
    "directness": "directa",
    "process": "Los humedales ofrecen lugares de descanso o alimentación",
    "lineType": "continua"
  },
  {
    "n": 24,
    "source": "Aves residentes",
    "target": "Humedales",
    "relation": "hábitat",
    "directness": "directa",
    "process": "Las aves residentes usan el humedal de forma recurrente",
    "lineType": "continua"
  },
  {
    "n": 25,
    "source": "Aves migratorias",
    "target": "Aves que atraviesan la ciudad",
    "relation": "desplazamiento",
    "directness": "directa",
    "process": "Las aves se desplazan entre áreas de la ciudad",
    "lineType": "continua"
  },
  {
    "n": 26,
    "source": "Vegetación acuática",
    "target": "Nivel del agua",
    "relation": "respuesta ecológica",
    "directness": "directa",
    "process": "La vegetación cambia con la profundidad y permanencia del agua",
    "lineType": "continua"
  },
  {
    "n": 27,
    "source": "Vegetación ribereña",
    "target": "Ríos",
    "relation": "hábitat",
    "directness": "directa",
    "process": "La vegetación se ubica y cambia junto a los cauces",
    "lineType": "continua"
  },
  {
    "n": 28,
    "source": "Vegetación ribereña",
    "target": "Humedales",
    "relation": "hábitat",
    "directness": "directa",
    "process": "La vegetación forma refugios en los bordes húmedos",
    "lineType": "continua"
  },
  {
    "n": 29,
    "source": "Insectos polinizadores",
    "target": "Vegetación ribereña",
    "relation": "alimentación",
    "directness": "directa",
    "process": "Los insectos dependen de flores y coberturas vegetales",
    "lineType": "continua"
  },
  {
    "n": 30,
    "source": "Arañas tejedoras",
    "target": "Vegetación ribereña",
    "relation": "refugio",
    "directness": "directa",
    "process": "Las coberturas ofrecen soportes para redes y refugio",
    "lineType": "continua"
  },
  {
    "n": 31,
    "source": "Especies invasoras",
    "target": "Vegetación acuática",
    "relation": "competencia",
    "directness": "directa",
    "process": "Las invasoras desplazan o cubren vegetación acuática",
    "lineType": "continua"
  },
  {
    "n": 32,
    "source": "Aves residentes",
    "target": "Vegetación ribereña",
    "relation": "refugio",
    "directness": "directa",
    "process": "Las aves usan la vegetación para refugio y reproducción",
    "lineType": "continua"
  },
  {
    "n": 33,
    "source": "Aves migratorias",
    "target": "Vegetación ribereña",
    "relation": "refugio",
    "directness": "directa",
    "process": "Las aves migratorias usan coberturas durante sus recorridos",
    "lineType": "continua"
  },
  {
    "n": 34,
    "source": "Aves que atraviesan la ciudad",
    "target": "Humedales",
    "relation": "conectividad ecológica",
    "directness": "directa",
    "process": "Los humedales funcionan como lugares de paso",
    "lineType": "continua"
  },
  {
    "n": 35,
    "source": "Cerros Orientales",
    "target": "Aves que atraviesan la ciudad",
    "relation": "conectividad ecológica",
    "directness": "indirecta",
    "process": "Las aves se desplazan entre ecosistemas urbanos y regionales",
    "lineType": "continua"
  },
  {
    "n": 36,
    "source": "Páramo de Sumapaz",
    "target": "Ríos",
    "relation": "aporte hídrico",
    "directness": "indirecta",
    "process": "El páramo aporta agua a la red hídrica regional",
    "lineType": "continua"
  },
  {
    "n": 37,
    "source": "Sabana de Bogotá",
    "target": "Ríos",
    "relation": "conectividad territorial",
    "directness": "directa",
    "process": "La red hídrica atraviesa la sabana",
    "lineType": "continua"
  },
  {
    "n": 38,
    "source": "Humedales",
    "target": "Patrimonio natural",
    "relation": "valoración",
    "directness": "directa",
    "process": "Los humedales pueden ser reconocidos como lugares naturales valiosos",
    "lineType": "continua"
  },
  {
    "n": 39,
    "source": "Ríos",
    "target": "Patrimonio natural",
    "relation": "valoración",
    "directness": "directa",
    "process": "Los ríos forman parte de la memoria y valoración del territorio",
    "lineType": "continua"
  },
  {
    "n": 40,
    "source": "Vías arteriales",
    "target": "Transporte público",
    "relation": "soporte",
    "directness": "directa",
    "process": "Las vías soportan recorridos de transporte público",
    "lineType": "continua"
  },
  {
    "n": 41,
    "source": "Vías locales",
    "target": "Transporte público",
    "relation": "acceso",
    "directness": "directa",
    "process": "Las vías locales permiten aproximación a barrios y paraderos",
    "lineType": "continua"
  },
  {
    "n": 42,
    "source": "Transporte público",
    "target": "Estaciones de transporte",
    "relation": "operación",
    "directness": "directa",
    "process": "El servicio se organiza mediante estaciones",
    "lineType": "continua"
  },
  {
    "n": 43,
    "source": "Transporte público",
    "target": "Paraderos",
    "relation": "operación",
    "directness": "directa",
    "process": "Los usuarios acceden al servicio en paraderos",
    "lineType": "continua"
  },
  {
    "n": 44,
    "source": "Transporte público",
    "target": "Recorridos diarios",
    "relation": "desplazamiento",
    "directness": "directa",
    "process": "El transporte produce recorridos cotidianos",
    "lineType": "continua"
  },
  {
    "n": 45,
    "source": "Transporte público",
    "target": "Tiempo de viaje",
    "relation": "variación",
    "directness": "directa",
    "process": "El servicio modifica el tiempo de desplazamiento",
    "lineType": "continua"
  },
  {
    "n": 46,
    "source": "Transporte público",
    "target": "Congestión vehicular",
    "relation": "interacción",
    "directness": "indirecta",
    "process": "La oferta de transporte puede modificar la presión vehicular",
    "lineType": "continua"
  },
  {
    "n": 47,
    "source": "Bicicletas",
    "target": "Ciclorrutas construidas",
    "relation": "soporte",
    "directness": "directa",
    "process": "Las ciclorrutas permiten los desplazamientos en bicicleta",
    "lineType": "continua"
  },
  {
    "n": 48,
    "source": "Peatones",
    "target": "Andenes",
    "relation": "soporte",
    "directness": "directa",
    "process": "Los andenes soportan el desplazamiento peatonal",
    "lineType": "continua"
  },
  {
    "n": 49,
    "source": "Peatones",
    "target": "Recorridos diarios",
    "relation": "desplazamiento",
    "directness": "directa",
    "process": "Las personas realizan recorridos cotidianos",
    "lineType": "continua"
  },
  {
    "n": 50,
    "source": "Carga urbana",
    "target": "Vías arteriales",
    "relation": "circulación",
    "directness": "directa",
    "process": "La carga usa corredores viales",
    "lineType": "continua"
  },
  {
    "n": 51,
    "source": "Estaciones de transporte",
    "target": "Paraderos",
    "relation": "intermodalidad",
    "directness": "indirecta",
    "process": "Ambos puntos organizan el acceso al transporte",
    "lineType": "continua"
  },
  {
    "n": 52,
    "source": "Congestión vehicular",
    "target": "Tiempo de viaje",
    "relation": "retraso",
    "directness": "directa",
    "process": "La congestión aumenta los tiempos de desplazamiento",
    "lineType": "continua"
  },
  {
    "n": 53,
    "source": "Congestión vehicular",
    "target": "Ruido del tráfico",
    "relation": "presión ambiental",
    "directness": "directa",
    "process": "Más tráfico produce mayor ruido",
    "lineType": "continua"
  },
  {
    "n": 54,
    "source": "Viviendas",
    "target": "Recorridos diarios",
    "relation": "generación de viajes",
    "directness": "directa",
    "process": "Las viviendas generan viajes cotidianos",
    "lineType": "continua"
  },
  {
    "n": 55,
    "source": "Viviendas",
    "target": "Barrios",
    "relation": "localización",
    "directness": "directa",
    "process": "Las viviendas forman áreas residenciales barriales",
    "lineType": "continua"
  },
  {
    "n": 56,
    "source": "Barrios",
    "target": "Transporte público",
    "relation": "demanda",
    "directness": "directa",
    "process": "Los barrios generan demanda de transporte",
    "lineType": "continua"
  },
  {
    "n": 57,
    "source": "Densidad residencial",
    "target": "Transporte público",
    "relation": "demanda",
    "directness": "directa",
    "process": "La concentración residencial modifica la demanda",
    "lineType": "continua"
  },
  {
    "n": 58,
    "source": "Cambios de uso del suelo",
    "target": "Construcciones nuevas",
    "relation": "transformación",
    "directness": "directa",
    "process": "Los cambios de uso habilitan o impulsan nuevas construcciones",
    "lineType": "continua"
  },
  {
    "n": 59,
    "source": "Construcciones nuevas",
    "target": "Ocupación del borde ambiental",
    "relation": "presión territorial",
    "directness": "directa",
    "process": "Las nuevas construcciones pueden avanzar sobre bordes ambientales",
    "lineType": "continua"
  },
  {
    "n": 60,
    "source": "Lotes vacantes",
    "target": "Construcciones nuevas",
    "relation": "transformación",
    "directness": "indirecta",
    "process": "Los lotes disponibles pueden convertirse en áreas construidas",
    "lineType": "continua"
  },
  {
    "n": 61,
    "source": "Empleos",
    "target": "Viajes entre vivienda y empleo",
    "relation": "generación de viajes",
    "directness": "directa",
    "process": "La localización del empleo produce desplazamientos",
    "lineType": "continua"
  },
  {
    "n": 62,
    "source": "Viajes entre vivienda y empleo",
    "target": "Transporte público",
    "relation": "demanda",
    "directness": "directa",
    "process": "Los viajes usan sistemas de transporte",
    "lineType": "continua"
  },
  {
    "n": 63,
    "source": "Actividades productivas",
    "target": "Empleos",
    "relation": "generación",
    "directness": "directa",
    "process": "Las actividades productivas generan puestos de trabajo",
    "lineType": "continua"
  },
  {
    "n": 64,
    "source": "Comercio local",
    "target": "Viviendas",
    "relation": "proximidad",
    "directness": "directa",
    "process": "El comercio atiende necesidades de áreas residenciales",
    "lineType": "continua"
  },
  {
    "n": 65,
    "source": "Trabajo informal",
    "target": "Vendedores ambulantes",
    "relation": "actividad",
    "directness": "directa",
    "process": "El trabajo informal se expresa en ventas ambulantes",
    "lineType": "continua"
  },
  {
    "n": 66,
    "source": "Zonas de abastecimiento",
    "target": "Alimentos que llegan a Bogotá",
    "relation": "distribución",
    "directness": "directa",
    "process": "Las zonas reciben y redistribuyen alimentos",
    "lineType": "continua"
  },
  {
    "n": 67,
    "source": "Carga que entra a Bogotá",
    "target": "Zonas de abastecimiento",
    "relation": "flujo de bienes",
    "directness": "directa",
    "process": "La carga alimenta las zonas de distribución",
    "lineType": "continua"
  },
  {
    "n": 68,
    "source": "Bibliotecas",
    "target": "Recorridos comunitarios",
    "relation": "uso social",
    "directness": "directa",
    "process": "Las bibliotecas reciben recorridos y actividades comunitarias",
    "lineType": "continua"
  },
  {
    "n": 69,
    "source": "Hospitales",
    "target": "Tiempo de acceso a servicios",
    "relation": "acceso",
    "directness": "directa",
    "process": "La localización hospitalaria modifica el tiempo de acceso",
    "lineType": "continua"
  },
  {
    "n": 70,
    "source": "Centros de salud",
    "target": "Tiempo de acceso a servicios",
    "relation": "acceso",
    "directness": "directa",
    "process": "Los centros de salud estructuran tiempos de desplazamiento",
    "lineType": "continua"
  },
  {
    "n": 71,
    "source": "Centros de cuidado infantil",
    "target": "Personas cuidadoras",
    "relation": "cuidado",
    "directness": "directa",
    "process": "Los centros apoyan las tareas de cuidado",
    "lineType": "continua"
  },
  {
    "n": 72,
    "source": "Comedores comunitarios",
    "target": "Habitantes",
    "relation": "atención",
    "directness": "directa",
    "process": "Los comedores atienden población local",
    "lineType": "continua"
  },
  {
    "n": 73,
    "source": "Parques",
    "target": "Visitantes",
    "relation": "uso",
    "directness": "directa",
    "process": "Los parques reciben visitantes",
    "lineType": "continua"
  },
  {
    "n": 74,
    "source": "Plazas públicas",
    "target": "Comercio local",
    "relation": "intercambio",
    "directness": "directa",
    "process": "Las plazas concentran actividades y comercio",
    "lineType": "continua"
  },
  {
    "n": 75,
    "source": "Tiempo de acceso a servicios",
    "target": "Recorridos diarios",
    "relation": "variación",
    "directness": "directa",
    "process": "La distancia y el tiempo modifican las rutinas",
    "lineType": "continua"
  },
  {
    "n": 76,
    "source": "Habitantes",
    "target": "Viviendas",
    "relation": "residencia",
    "directness": "directa",
    "process": "Los habitantes ocupan viviendas",
    "lineType": "continua"
  },
  {
    "n": 77,
    "source": "Habitantes",
    "target": "Recorridos comunitarios",
    "relation": "participación",
    "directness": "directa",
    "process": "Los habitantes realizan recorridos colectivos",
    "lineType": "continua"
  },
  {
    "n": 78,
    "source": "Visitantes",
    "target": "Humedales",
    "relation": "uso",
    "directness": "directa",
    "process": "Los visitantes usan los humedales",
    "lineType": "continua"
  },
  {
    "n": 79,
    "source": "Organizaciones ambientales",
    "target": "Humedales",
    "relation": "cuidado",
    "directness": "directa",
    "process": "Las organizaciones participan en el cuidado",
    "lineType": "continua"
  },
  {
    "n": 80,
    "source": "Juntas de Acción Comunal",
    "target": "Barrios",
    "relation": "representación",
    "directness": "directa",
    "process": "Las juntas representan y organizan comunidades barriales",
    "lineType": "continua"
  },
  {
    "n": 81,
    "source": "Colectivos culturales",
    "target": "Patrimonio cultural inmaterial",
    "relation": "transmisión",
    "directness": "directa",
    "process": "Los colectivos practican y transmiten expresiones culturales",
    "lineType": "continua"
  },
  {
    "n": 82,
    "source": "Organizaciones de mujeres",
    "target": "Personas cuidadoras",
    "relation": "organización",
    "directness": "indirecta",
    "process": "Las organizaciones pueden articular demandas de cuidado",
    "lineType": "continua"
  },
  {
    "n": 83,
    "source": "Vendedores ambulantes",
    "target": "Comercio local",
    "relation": "actividad económica",
    "directness": "indirecta",
    "process": "Las ventas ambulantes interactúan con el comercio local",
    "lineType": "continua"
  },
  {
    "n": 84,
    "source": "Recorridos comunitarios",
    "target": "Humedales",
    "relation": "uso colectivo",
    "directness": "directa",
    "process": "Los recorridos producen presencia y conocimiento local",
    "lineType": "continua"
  },
  {
    "n": 85,
    "source": "Jornadas comunitarias",
    "target": "Organizaciones ambientales",
    "relation": "acción colectiva",
    "directness": "directa",
    "process": "Las organizaciones convocan jornadas",
    "lineType": "continua"
  },
  {
    "n": 86,
    "source": "Patrimonio cultural material",
    "target": "Patrimonio cultural inmaterial",
    "relation": "relación cultural",
    "directness": "indirecta",
    "process": "Los lugares y prácticas culturales se refuerzan mutuamente",
    "lineType": "continua"
  },
  {
    "n": 87,
    "source": "Patrimonio cultural material",
    "target": "Patrimonio natural",
    "relation": "relación territorial",
    "directness": "indirecta",
    "process": "Los bienes culturales se relacionan con lugares naturales valorados",
    "lineType": "continua"
  },
  {
    "n": 88,
    "source": "Patrimonio cultural inmaterial",
    "target": "Patrimonio natural",
    "relation": "memoria territorial",
    "directness": "indirecta",
    "process": "Las prácticas culturales construyen vínculos con la naturaleza",
    "lineType": "continua"
  },
  {
    "n": 89,
    "source": "Patrimonio arqueológico",
    "target": "Patrimonio natural",
    "relation": "adaptación cultural",
    "directness": "indirecta",
    "process": "Los sitios arqueológicos revelan relaciones históricas con el territorio",
    "lineType": "continua"
  },
  {
    "n": 90,
    "source": "Memorias barriales",
    "target": "Barrios",
    "relation": "memoria",
    "directness": "directa",
    "process": "Las memorias se construyen en los barrios",
    "lineType": "continua"
  },
  {
    "n": 91,
    "source": "Relatos sobre ríos y humedales",
    "target": "Humedales",
    "relation": "memoria ecológica",
    "directness": "directa",
    "process": "Los relatos transmiten experiencias sobre lugares de agua",
    "lineType": "continua"
  },
  {
    "n": 92,
    "source": "Prácticas de observación de aves",
    "target": "Aves residentes",
    "relation": "conocimiento",
    "directness": "directa",
    "process": "La observación produce conocimiento sobre aves",
    "lineType": "continua"
  },
  {
    "n": 93,
    "source": "Recorridos patrimoniales",
    "target": "Patrimonio cultural material",
    "relation": "acceso cultural",
    "directness": "directa",
    "process": "Los recorridos conectan lugares patrimoniales",
    "lineType": "continua"
  },
  {
    "n": 94,
    "source": "Redes de acueducto",
    "target": "Consumo de agua",
    "relation": "abastecimiento",
    "directness": "directa",
    "process": "La red permite el consumo de agua",
    "lineType": "continua"
  },
  {
    "n": 95,
    "source": "Redes de alcantarillado",
    "target": "Residuos acumulados en canales",
    "relation": "drenaje",
    "directness": "indirecta",
    "process": "Las redes y canales reciben flujos residuales o sólidos",
    "lineType": "continua"
  },
  {
    "n": 96,
    "source": "Redes de drenaje pluvial",
    "target": "Escorrentía de lluvia",
    "relation": "conducción",
    "directness": "directa",
    "process": "El drenaje conduce escorrentía",
    "lineType": "continua"
  },
  {
    "n": 97,
    "source": "Redes eléctricas",
    "target": "Consumo de energía",
    "relation": "abastecimiento",
    "directness": "directa",
    "process": "Las redes soportan el consumo energético",
    "lineType": "continua"
  },
  {
    "n": 98,
    "source": "Alumbrado público",
    "target": "Peatones",
    "relation": "seguridad y recorrido",
    "directness": "indirecta",
    "process": "El alumbrado modifica las condiciones de los recorridos",
    "lineType": "continua"
  },
  {
    "n": 99,
    "source": "Redes de telecomunicaciones",
    "target": "Información ambiental entre entidades",
    "relation": "intercambio",
    "directness": "directa",
    "process": "Las redes permiten intercambiar información",
    "lineType": "continua"
  },
  {
    "n": 100,
    "source": "Consumo de agua",
    "target": "Ríos",
    "relation": "presión hídrica",
    "directness": "indirecta",
    "process": "El consumo modifica la demanda sobre fuentes de agua",
    "lineType": "continua"
  },
  {
    "n": 101,
    "source": "Consumo de energía",
    "target": "Temperatura superficial alta",
    "relation": "presión térmica",
    "directness": "indirecta",
    "process": "El consumo energético puede acompañar concentraciones de calor urbano",
    "lineType": "continua"
  },
  {
    "n": 102,
    "source": "Residuos domésticos",
    "target": "Rutas de recolección",
    "relation": "gestión",
    "directness": "directa",
    "process": "La generación de residuos requiere rutas de recolección",
    "lineType": "continua"
  },
  {
    "n": 103,
    "source": "Residuos comerciales",
    "target": "Rutas de recolección",
    "relation": "gestión",
    "directness": "directa",
    "process": "Los residuos comerciales requieren recolección",
    "lineType": "continua"
  },
  {
    "n": 104,
    "source": "Residuos de construcción",
    "target": "Escombros en bordes ambientales",
    "relation": "acumulación",
    "directness": "directa",
    "process": "Los residuos de obra pueden acumularse en bordes",
    "lineType": "continua"
  },
  {
    "n": 105,
    "source": "Residuos acumulados en canales",
    "target": "Nivel del agua",
    "relation": "obstrucción",
    "directness": "directa",
    "process": "Los residuos pueden obstruir el flujo y elevar niveles",
    "lineType": "continua"
  },
  {
    "n": 106,
    "source": "Contenedores de residuos",
    "target": "Residuos domésticos",
    "relation": "recepción",
    "directness": "directa",
    "process": "Los contenedores reciben residuos domésticos",
    "lineType": "continua"
  },
  {
    "n": 107,
    "source": "Rutas de recolección",
    "target": "Contenedores de residuos",
    "relation": "servicio",
    "directness": "directa",
    "process": "Las rutas conectan puntos de recolección",
    "lineType": "continua"
  },
  {
    "n": 108,
    "source": "Recicladores de oficio",
    "target": "Material reciclable recuperado",
    "relation": "recuperación",
    "directness": "directa",
    "process": "Los recicladores recuperan materiales",
    "lineType": "continua"
  },
  {
    "n": 109,
    "source": "Material reciclable recuperado",
    "target": "Residuos domésticos",
    "relation": "transformación",
    "directness": "directa",
    "process": "Parte de los residuos se separa y recupera",
    "lineType": "continua"
  },
  {
    "n": 110,
    "source": "Compostaje",
    "target": "Residuos domésticos",
    "relation": "transformación",
    "directness": "directa",
    "process": "El compostaje transforma residuos orgánicos",
    "lineType": "continua"
  },
  {
    "n": 111,
    "source": "Jardín Botánico de Bogotá",
    "target": "Planes de manejo ambiental",
    "relation": "gestión",
    "directness": "directa",
    "process": "La entidad participa en la formulación o aplicación de manejo",
    "lineType": "continua"
  },
  {
    "n": 112,
    "source": "Secretaría Distrital de Ambiente",
    "target": "Planes de manejo ambiental",
    "relation": "regulación",
    "directness": "directa",
    "process": "La entidad regula y coordina instrumentos ambientales",
    "lineType": "continua"
  },
  {
    "n": 113,
    "source": "Empresa de Acueducto de Bogotá",
    "target": "Redes de acueducto",
    "relation": "operación",
    "directness": "directa",
    "process": "La empresa opera redes de abastecimiento",
    "lineType": "continua"
  },
  {
    "n": 114,
    "source": "Empresa de Acueducto de Bogotá",
    "target": "Redes de alcantarillado",
    "relation": "operación",
    "directness": "directa",
    "process": "La empresa opera redes sanitarias",
    "lineType": "continua"
  },
  {
    "n": 115,
    "source": "Secretaría Distrital de Movilidad",
    "target": "Transporte público",
    "relation": "gestión",
    "directness": "directa",
    "process": "La entidad regula y coordina movilidad",
    "lineType": "continua"
  },
  {
    "n": 116,
    "source": "Instituto de Desarrollo Urbano",
    "target": "Vías arteriales",
    "relation": "obra pública",
    "directness": "directa",
    "process": "La entidad interviene infraestructura vial",
    "lineType": "continua"
  },
  {
    "n": 117,
    "source": "Alcaldías locales",
    "target": "Juntas de Acción Comunal",
    "relation": "coordinación",
    "directness": "directa",
    "process": "Las alcaldías coordinan acciones con organizaciones locales",
    "lineType": "continua"
  },
  {
    "n": 118,
    "source": "Empresas de servicios públicos",
    "target": "Redes de telecomunicaciones",
    "relation": "operación",
    "directness": "indirecta",
    "process": "Las empresas mantienen redes de servicio",
    "lineType": "continua"
  },
  {
    "n": 119,
    "source": "Normas de uso del suelo",
    "target": "Cambios de uso del suelo",
    "relation": "regulación",
    "directness": "directa",
    "process": "Las normas condicionan cambios de uso",
    "lineType": "continua"
  },
  {
    "n": 120,
    "source": "Planes de manejo ambiental",
    "target": "Jornadas comunitarias",
    "relation": "participación",
    "directness": "indirecta",
    "process": "Los planes pueden orientar acciones comunitarias",
    "lineType": "continua"
  },
  {
    "n": 121,
    "source": "Presupuestos de intervención",
    "target": "Construcciones nuevas",
    "relation": "decisión",
    "directness": "indirecta",
    "process": "Los recursos permiten obras y transformaciones",
    "lineType": "continua"
  },
  {
    "n": 122,
    "source": "Cerros Orientales",
    "target": "Ríos",
    "relation": "conectividad ecológica",
    "directness": "directa",
    "process": "Las montañas se relacionan con nacimientos y cauces",
    "lineType": "continua"
  },
  {
    "n": 123,
    "source": "Páramo de Sumapaz",
    "target": "Sabana de Bogotá",
    "relation": "conectividad regional",
    "directness": "indirecta",
    "process": "Ambos pertenecen al sistema territorial regional",
    "lineType": "continua"
  },
  {
    "n": 124,
    "source": "Municipios proveedores de agua",
    "target": "Redes de acueducto",
    "relation": "abastecimiento regional",
    "directness": "directa",
    "process": "El abastecimiento conecta municipios y redes",
    "lineType": "continua"
  },
  {
    "n": 125,
    "source": "Municipios receptores de residuos",
    "target": "Rutas de recolección",
    "relation": "flujo regional",
    "directness": "directa",
    "process": "Los residuos salen mediante rutas hacia otros municipios",
    "lineType": "continua"
  },
  {
    "n": 126,
    "source": "Viajes desde municipios vecinos",
    "target": "Transporte público",
    "relation": "movilidad regional",
    "directness": "directa",
    "process": "Los viajes conectan Bogotá con municipios vecinos",
    "lineType": "continua"
  },
  {
    "n": 127,
    "source": "Carga que entra a Bogotá",
    "target": "Vías arteriales",
    "relation": "circulación",
    "directness": "directa",
    "process": "La carga utiliza corredores de acceso",
    "lineType": "continua"
  },
  {
    "n": 128,
    "source": "Información ambiental entre entidades",
    "target": "Planes de manejo ambiental",
    "relation": "decisión",
    "directness": "directa",
    "process": "La información alimenta decisiones de manejo",
    "lineType": "continua"
  },
  {
    "n": 129,
    "source": "Temperatura del aire",
    "target": "Temperatura superficial alta",
    "relation": "variación térmica",
    "directness": "directa",
    "process": "La temperatura atmosférica influye en superficies urbanas",
    "lineType": "continua"
  },
  {
    "n": 130,
    "source": "Viento",
    "target": "Concentración de material particulado",
    "relation": "dispersión",
    "directness": "directa",
    "process": "El viento dispersa o concentra partículas",
    "lineType": "continua"
  },
  {
    "n": 131,
    "source": "Radiación solar",
    "target": "Temperatura del aire",
    "relation": "energía",
    "directness": "directa",
    "process": "La radiación modifica la temperatura del aire",
    "lineType": "continua"
  },
  {
    "n": 132,
    "source": "Sombra de edificaciones",
    "target": "Temperatura superficial alta",
    "relation": "regulación térmica",
    "directness": "directa",
    "process": "La sombra reduce el calentamiento superficial",
    "lineType": "continua"
  },
  {
    "n": 133,
    "source": "Temperatura del borde urbano",
    "target": "Humedales",
    "relation": "presión térmica",
    "directness": "indirecta",
    "process": "El borde urbano puede transferir condiciones térmicas al humedal",
    "lineType": "continua"
  },
  {
    "n": 134,
    "source": "Ruido del tráfico",
    "target": "Aves residentes",
    "relation": "perturbación",
    "directness": "directa",
    "process": "El ruido altera condiciones de permanencia de aves",
    "lineType": "continua"
  },
  {
    "n": 135,
    "source": "Ruido del tráfico",
    "target": "Aves migratorias",
    "relation": "perturbación",
    "directness": "indirecta",
    "process": "El ruido puede afectar lugares de descanso",
    "lineType": "continua"
  },
  {
    "n": 136,
    "source": "Parques",
    "target": "Patrimonio natural",
    "relation": "valoración",
    "directness": "indirecta",
    "process": "Los parques pueden sostener valores naturales y paisajísticos",
    "lineType": "continua"
  },
  {
    "n": 137,
    "source": "Parques",
    "target": "Ciclorrutas construidas",
    "relation": "conectividad",
    "directness": "indirecta",
    "process": "Los parques pueden conectar recorridos no motorizados",
    "lineType": "continua"
  },
  {
    "n": 138,
    "source": "Bibliotecas",
    "target": "Habitantes",
    "relation": "servicio cultural",
    "directness": "directa",
    "process": "Las bibliotecas atienden habitantes",
    "lineType": "continua"
  },
  {
    "n": 139,
    "source": "Colegios",
    "target": "Recorridos diarios",
    "relation": "movilidad educativa",
    "directness": "directa",
    "process": "La asistencia escolar produce viajes cotidianos",
    "lineType": "continua"
  },
  {
    "n": 140,
    "source": "Universidades",
    "target": "Viajes entre vivienda y empleo",
    "relation": "movilidad de conocimiento",
    "directness": "indirecta",
    "process": "La educación superior organiza desplazamientos y oportunidades",
    "lineType": "continua"
  },
  {
    "n": 141,
    "source": "Servicios empresariales",
    "target": "Centros financieros",
    "relation": "aglomeración",
    "directness": "directa",
    "process": "Ambos se localizan y funcionan como actividades de servicios",
    "lineType": "continua"
  },
  {
    "n": 142,
    "source": "Centros de innovación",
    "target": "Universidades",
    "relation": "conocimiento",
    "directness": "directa",
    "process": "La innovación se relaciona con educación superior",
    "lineType": "continua"
  },
  {
    "n": 143,
    "source": "Plazas públicas",
    "target": "Recorridos patrimoniales",
    "relation": "encuentro",
    "directness": "indirecta",
    "process": "Las plazas pueden formar parte de recorridos urbanos",
    "lineType": "continua"
  },
  {
    "n": 144,
    "source": "Zonas de abastecimiento",
    "target": "Carga urbana",
    "relation": "logística",
    "directness": "directa",
    "process": "El abastecimiento requiere movimiento de carga",
    "lineType": "continua"
  },
  {
    "n": 145,
    "source": "Patrimonio cultural inmaterial",
    "target": "Recorridos patrimoniales",
    "relation": "transmisión",
    "directness": "directa",
    "process": "Los recorridos transmiten prácticas y memorias",
    "lineType": "continua"
  },
  {
    "n": 146,
    "source": "Habitantes",
    "target": "Transporte público",
    "relation": "demanda cotidiana",
    "directness": "directa",
    "process": "Los habitantes generan viajes y demanda de transporte",
    "lineType": "continua"
  },
  {
    "n": 147,
    "source": "Habitantes",
    "target": "Tiempo de acceso a servicios",
    "relation": "desigualdad de acceso",
    "directness": "directa",
    "process": "El tiempo de acceso cambia según localización y condiciones de movilidad",
    "lineType": "continua"
  },
  {
    "n": 148,
    "source": "Habitantes",
    "target": "Colegios",
    "relation": "uso cotidiano",
    "directness": "directa",
    "process": "Los habitantes acceden a colegios",
    "lineType": "continua"
  },
  {
    "n": 149,
    "source": "Viviendas",
    "target": "Empleos",
    "relation": "relación residencia-trabajo",
    "directness": "indirecta",
    "process": "La localización de vivienda y empleo produce desplazamientos",
    "lineType": "continua"
  },
  {
    "n": 150,
    "source": "Viviendas",
    "target": "Tiempo de viaje",
    "relation": "variación cotidiana",
    "directness": "directa",
    "process": "La ubicación residencial modifica tiempos de viaje",
    "lineType": "continua"
  },
  {
    "n": 151,
    "source": "Viviendas",
    "target": "Redes de acueducto",
    "relation": "abastecimiento",
    "directness": "directa",
    "process": "Las viviendas requieren abastecimiento de agua",
    "lineType": "continua"
  },
  {
    "n": 152,
    "source": "Viviendas",
    "target": "Redes de alcantarillado",
    "relation": "saneamiento",
    "directness": "directa",
    "process": "Las viviendas generan flujos hacia el alcantarillado",
    "lineType": "continua"
  },
  {
    "n": 153,
    "source": "Empleos",
    "target": "Transporte público",
    "relation": "acceso laboral",
    "directness": "directa",
    "process": "Los empleos atraen viajes y demanda de transporte",
    "lineType": "continua"
  },
  {
    "n": 154,
    "source": "Empleos",
    "target": "Congestión vehicular",
    "relation": "presión cotidiana",
    "directness": "indirecta",
    "process": "La concentración de empleos puede intensificar viajes y congestión",
    "lineType": "continua"
  },
  {
    "n": 155,
    "source": "Empleos",
    "target": "Colegios",
    "relation": "relación territorial",
    "directness": "indirecta",
    "process": "La localización de empleo y colegios organiza viajes urbanos",
    "lineType": "continua"
  },
  {
    "n": 156,
    "source": "Colegios",
    "target": "Transporte público",
    "relation": "acceso educativo",
    "directness": "directa",
    "process": "El transporte permite llegar a colegios",
    "lineType": "continua"
  },
  {
    "n": 157,
    "source": "Universidades",
    "target": "Transporte público",
    "relation": "acceso educativo",
    "directness": "directa",
    "process": "El transporte permite llegar a universidades",
    "lineType": "continua"
  },
  {
    "n": 158,
    "source": "Bibliotecas",
    "target": "Transporte público",
    "relation": "acceso cultural",
    "directness": "directa",
    "process": "El transporte permite llegar a bibliotecas",
    "lineType": "continua"
  },
  {
    "n": 159,
    "source": "Parques",
    "target": "Habitantes",
    "relation": "uso cotidiano",
    "directness": "directa",
    "process": "Los parques reciben uso de habitantes",
    "lineType": "continua"
  },
  {
    "n": 160,
    "source": "Patrimonio cultural material",
    "target": "Habitantes",
    "relation": "memoria y uso",
    "directness": "indirecta",
    "process": "Los habitantes usan y reconocen lugares patrimoniales",
    "lineType": "continua"
  },
  {
    "n": 161,
    "source": "Patrimonio natural",
    "target": "Organizaciones ambientales",
    "relation": "cuidado",
    "directness": "directa",
    "process": "Las organizaciones participan en la valoración y cuidado",
    "lineType": "continua"
  },
  {
    "n": 162,
    "source": "Organizaciones ambientales",
    "target": "Información ambiental entre entidades",
    "relation": "intercambio",
    "directness": "indirecta",
    "process": "Las organizaciones pueden producir y transmitir información",
    "lineType": "continua"
  },
  {
    "n": 163,
    "source": "Juntas de Acción Comunal",
    "target": "Información ambiental entre entidades",
    "relation": "intercambio",
    "directness": "indirecta",
    "process": "Las juntas comunican observaciones y demandas",
    "lineType": "continua"
  },
  {
    "n": 164,
    "source": "Temperatura del borde urbano",
    "target": "Habitantes",
    "relation": "exposición",
    "directness": "indirecta",
    "process": "Las condiciones térmicas del borde afectan la experiencia cotidiana",
    "lineType": "continua"
  },
  {
    "n": 165,
    "source": "Residuos acumulados en canales",
    "target": "Habitantes",
    "relation": "afectación cotidiana",
    "directness": "indirecta",
    "process": "La acumulación modifica condiciones de uso y percepción del entorno",
    "lineType": "continua"
  }
];
