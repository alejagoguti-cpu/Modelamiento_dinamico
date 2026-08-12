/* =======================================================================
   RAPOT · MÓDULO 07 — Simulador de las 4 Estructuras del POT
   Base de datos: Red_4_Estructuras_POT_CORREGIDA.xlsx (hoja RELACIONES)
   32 relaciones · 58 conceptos · 4 sistemas
   No se inventan relaciones ni se alteran frases o páginas.
   ======================================================================= */

// GENERADO DESDE tabla_relaciones_POT_frases_exactas.xlsx (hoja 'Relaciones sustentadas')
// NO editar a mano: frases, páginas y secciones son literales del Excel.
const POT_DATA = {
 "sistemas": {
  "EEP": {
   "nombre": "Estructura Ecológica Principal",
   "color": "#22b88a",
   "funcion": "Base ecológica"
  },
  "EFC": {
   "nombre": "Estructura Funcional y del Cuidado",
   "color": "#3b82f6",
   "funcion": "Soporte funcional"
  },
  "ESECI": {
   "nombre": "Estructura Socioeconómica, Creativa y de Innovación",
   "color": "#d9a441",
   "funcion": "Puente socioeconómico"
  },
  "EIP": {
   "nombre": "Estructura Integradora de Patrimonios",
   "color": "#a855f7",
   "funcion": "Integración patrimonial"
  }
 },
 "conceptos": {
  "EEP": [
   "Coberturas vegetales",
   "Conservación ambiental",
   "Humedales",
   "Parques ecológicos de montaña",
   "Reservas forestales"
  ],
  "EFC": [
   "Ciclorutas",
   "Corredores verdes",
   "Equipamientos",
   "Espacio público",
   "Manzanas del Cuidado",
   "Servicios públicos",
   "Servicios sociales",
   "Transporte público",
   "Vivienda"
  ],
  "ESECI": [
   "Actividades económicas",
   "Corazones productivos",
   "Distrito Centro Tecnológico e Innovación",
   "Economía",
   "Empleo",
   "Producción artesanal",
   "Producción de alimentos",
   "Servicios empresariales",
   "Sistema de educación",
   "Zonas de interés turístico",
   "Zonas industriales"
  ],
  "EIP": [
   "Patrimonio cultural",
   "Patrimonio inmaterial",
   "Patrimonio natural"
  ]
 },
 "relaciones": [
  {
   "id": 0,
   "sO": "EFC",
   "cO": "Transporte público",
   "sD": "ESECI",
   "cD": "Empleo",
   "dir": "→",
   "sentido": "Transporte público → Empleo",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "164",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“Los tiempos de desplazamiento son el resultado de la eficiencia y calidad de los sistemas de transporte masivo y de sus modos y estructuración. Un buen sistema de transporte se nota en menores tiempos de viaje que suplen las necesidades de desplazamiento de la ciudadanía y facilitan la conexión entre las personas y el sector productivo.”"
  },
  {
   "id": 1,
   "sO": "EFC",
   "cO": "Vivienda",
   "sD": "ESECI",
   "cD": "Empleo",
   "dir": "→",
   "sentido": "Vivienda → Empleo",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“De esta manera, el Plan Maestro de Hábitat y Servicios Públicos se convierte en una herramienta eficaz para concretar la visión de mixtura, al acercar la vivienda a los grandes centros de productividad y, por consiguiente, mejorar las condiciones de acceso al empleo, consolidando así tejidos económicos continuos y complementarios entre el gran corazón productivo de escala urbana y las actividades económicas de soporte a la vida.”"
  },
  {
   "id": 2,
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Empleo",
   "dir": "→",
   "sentido": "Equipamientos → Empleo",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“Esos equipamientos —que están pensados para ofrecer, de manera híbrida, la mayor cantidad de servicios sociales posibles— tienen un potencial de ser, en sí mismos, fuentes de generación de empleo de proximidad y de fomentar dinámicas económicas complementarias en sus zonas de influencia.”"
  },
  {
   "id": 3,
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "ESECI",
   "cD": "Empleo",
   "dir": "→",
   "sentido": "Manzanas del Cuidado → Empleo",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "118",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "clase": "Intersistema",
   "frase": "“El sistema atiende tres tipos de poblaciones: a las personas cuidadoras, ofreciéndoles servicios de educación, respiro, formación y capitalización para el trabajo y el emprendimiento, y otras formas de generación de ingresos, con los que les devolvemos las oportunidades que han sacrificado por las cargas de cuidado.”"
  },
  {
   "id": 4,
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "ESECI",
   "cD": "Servicios empresariales",
   "dir": "→",
   "sentido": "Equipamientos → Servicios empresariales",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "165",
   "seccion": "Instrumentos del ordenamiento territorial que impactan la productividad y el empleo",
   "clase": "Intersistema",
   "frase": "“Equipamiento como detonante de dinámicas económicas”"
  },
  {
   "id": 5,
   "sO": "EFC",
   "cO": "Vivienda",
   "sD": "ESECI",
   "cD": "Economía",
   "dir": "→",
   "sentido": "Vivienda → Economía",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“El Plan Maestro de Hábitat tiene la capacidad de robustecer las economías de proximidad, no solamente al propiciar la mixtura de usos del suelo en los proyectos de vivienda y en los instrumentos de los diferentes planes parciales, sino combinando sus usos al interior de las mismas edificaciones.”"
  },
  {
   "id": 6,
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "ESECI",
   "cD": "Zonas industriales",
   "dir": "→",
   "sentido": "Servicios públicos → Zonas industriales",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”"
  },
  {
   "id": 7,
   "sO": "EFC",
   "cO": "Servicios públicos",
   "sD": "ESECI",
   "cD": "Distrito Centro Tecnológico e Innovación",
   "dir": "→",
   "sentido": "Servicios públicos → Distrito Centro Tecnológico e Innovación",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”"
  },
  {
   "id": 8,
   "sO": "EFC",
   "cO": "Ciclorutas",
   "sD": "ESECI",
   "cD": "Empleo",
   "dir": "→",
   "sentido": "Ciclorutas → Empleo",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“Los cables eléctricos, rutas circulares y cicloinfraestructura permite a su vez interconectividad de proximidad dentro de las upl y conexión con los corredores de alta demanda, sean de metro o de TransMilenio. Esto mejorará significativamente la calidad de vida y la productividad de la población, que hará uso de estas infraestructuras; también, consolidará las dinámicas de aglomeración económica que concentran el tejido empresarial y, con ello, las fuentes de generación de empleo en el centro ampliado, pero también en las nuevas zonas más periféricas, mejor servidas y conectadas gracias a la red multimodal de transporte.”"
  },
  {
   "id": 9,
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EFC",
   "cD": "Vivienda",
   "dir": "→",
   "sentido": "Actividades económicas → Vivienda",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "171",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“El programa busca promover el dinamismo, la reactivación económica y la creación de empleos. Se apuesta por el impulso a proyectos que generen actividades económicas asociadas al emprendimiento, la creatividad, la innovación y la cultura, que se complementa con las áreas residenciales donde se interactúa a partir del sistema de movilidad.”"
  },
  {
   "id": 10,
   "sO": "ESECI",
   "cO": "Corazones productivos",
   "sD": "EFC",
   "cD": "Vivienda",
   "dir": "→",
   "sentido": "Corazones productivos → Vivienda",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“El nuevo modelo de ordenamiento del territorio a partir de la mixtura y la complementariedad que plantea el pot busca revertir esta tendencia promoviendo las áreas receptoras de actividad económica, las áreas de actividad receptoras de vivienda de interés social en cercanía de las aglomeraciones y el ecosistema productivo y la mixtura de usos en las áreas de proximidad (antiguas zonas de uso residencial neto).”"
  },
  {
   "id": 11,
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "dir": "→",
   "sentido": "Zonas industriales → Servicios públicos",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“El Plan Maestro de Hábitat y Servicios Públicos debe garantizar las condiciones de prestación de los servicios públicos de las diferentes actividades económicas.”"
  },
  {
   "id": 12,
   "sO": "ESECI",
   "cO": "Distrito Centro Tecnológico e Innovación",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "dir": "→",
   "sentido": "Distrito Centro Tecnológico e Innovación → Servicios públicos",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“Por ejemplo, allí serán fundamentales los servicios de energía en las zonas industriales o de almacenamiento de datos, o los servicios de telecomunicaciones e internet en zonas como el Campus de Ciencia, Tecnología e Innovación de la Ciudad (ctib).”"
  },
  {
   "id": 13,
   "sO": "ESECI",
   "cO": "Actividades económicas",
   "sD": "EFC",
   "cD": "Servicios públicos",
   "dir": "→",
   "sentido": "Actividades económicas → Servicios públicos",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "169",
   "seccion": "Una ciudad para el empleo y las oportunidades",
   "clase": "Intersistema",
   "frase": "“El Plan Maestro de Hábitat y Servicios Públicos debe garantizar las condiciones de prestación de los servicios públicos de las diferentes actividades económicas.”"
  },
  {
   "id": 14,
   "sO": "ESECI",
   "cO": "Sistema de educación",
   "sD": "ESECI",
   "cD": "Empleo",
   "dir": "→",
   "sentido": "Sistema de educación → Empleo",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "30",
   "seccion": "Presentación del POT",
   "clase": "Intrasistema",
   "frase": "“La inversión y ejecución sostenida del pot, el pmss y la inversión en esa educación con calidad y pertinencia, desde la básica hasta la superior, lograrán en conjunto, en la próxima década, el mayor crecimiento en productividad, empleabilidad de calidad y competitividad que haya tenido Bogotá.”"
  },
  {
   "id": 15,
   "sO": "ESECI",
   "cO": "Zonas industriales",
   "sD": "ESECI",
   "cD": "Producción artesanal",
   "dir": "→",
   "sentido": "Zonas industriales → Producción artesanal",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "30",
   "seccion": "Presentación del POT",
   "clase": "Intrasistema",
   "frase": "“Por eso el pot promueve la permanencia de las industrias tradicionales en el tejido urbano y promueve nuevas implantaciones económicas generadoras de empleo formal, articuladas a los entornos urbanos donde se aglomeran saberes y talentos, y en particular aquellos que dan lugar a aglomeraciones especializadas de producción tradicional e industrias creativas, culturales, verdes, digitales y tecnológicas.”"
  },
  {
   "id": 16,
   "sO": "EIP",
   "cO": "Patrimonio cultural",
   "sD": "ESECI",
   "cD": "Zonas de interés turístico",
   "dir": "→",
   "sentido": "Patrimonio cultural → Zonas de interés turístico",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "31",
   "seccion": "Presentación del POT",
   "clase": "Intersistema",
   "frase": "“Por eso promovemos la ciudad como destino turístico inteligente, sostenible, de salud y de negocios que reconozca el patrimonio local, las dinámicas comunitarias, los sistemas cooperativos de producción sostenible como huertas productivas, bancos de semillas nativas y plantas de uso medicinal, entre otros.”"
  },
  {
   "id": 17,
   "sO": "EIP",
   "cO": "Patrimonio natural",
   "sD": "ESECI",
   "cD": "Zonas de interés turístico",
   "dir": "→",
   "sentido": "Patrimonio natural → Zonas de interés turístico",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "31",
   "seccion": "Presentación del POT",
   "clase": "Intersistema",
   "frase": "“En la ruralidad es urgente mejorar las condiciones habitacionales, desde los componentes de servicios públicos domiciliarios, accesibilidad y movilidad, con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”"
  },
  {
   "id": 18,
   "sO": "EIP",
   "cO": "Patrimonio inmaterial",
   "sD": "ESECI",
   "cD": "Producción artesanal",
   "dir": "→",
   "sentido": "Patrimonio inmaterial → Producción artesanal",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "200",
   "seccion": "Los reconocimientos y el plan para los patrimonios vitales",
   "clase": "Intersistema",
   "frase": "“Esta producción artesanal corresponde entonces a las actividades creativas de producción de objetos, realizadas con predominio manual y auxiliadas en algunos casos con maquinarias simples, obteniendo un resultado final individualizado, determinado por los patrones culturales, el medio ambiente y su desarrollo histórico.”"
  },
  {
   "id": 19,
   "sO": "EIP",
   "cO": "Patrimonio cultural",
   "sD": "ESECI",
   "cD": "Economía",
   "dir": "→",
   "sentido": "Patrimonio cultural → Economía",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "204",
   "seccion": "Los reconocimientos y el plan para los patrimonios vitales",
   "clase": "Intersistema",
   "frase": "“Esta oferta y este movimiento económico y cultural hacen parte de una de las iniciativas primordiales que fija el pot para que la cultura, en ciertos barrios o sectores de Bogotá, se convierta en un polo de desarrollo económico y social: los Distritos Creativos.”"
  },
  {
   "id": 20,
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "EFC",
   "cD": "Espacio público",
   "dir": "→",
   "sentido": "Humedales → Espacio público",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "92",
   "seccion": "Transformaciones urbanas",
   "clase": "Intersistema",
   "frase": "“Se debatió si podíamos considerar espacio público los elementos de nuestra Estructura Ecológica Principal (eep) adecuando humedales, bordes de ríos y quebradas, para el disfrute ciudadano.”"
  },
  {
   "id": 21,
   "sO": "EEP",
   "cO": "Humedales",
   "sD": "ESECI",
   "cD": "Producción de alimentos",
   "dir": "→",
   "sentido": "Humedales → Producción de alimentos",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "196",
   "seccion": "Nuestro territorio y nuestra identidad",
   "clase": "Intersistema",
   "frase": "“Las huertas son entonces parte de un valor presente interesado en restablecer vínculos entre los ciclos de producción de alimentos y consumo en ámbitos domésticos. La existencia de estos lugares reconcilia distintas maneras de habitar la ciudad, de conocimientos y prácticas asociados a la preservación de especies y semillas nativas, la siembra, al manejo responsable del agua y de la comprensión del clima.”"
  },
  {
   "id": 22,
   "sO": "EEP",
   "cO": "Conservación ambiental",
   "sD": "ESECI",
   "cD": "Economía",
   "dir": "→",
   "sentido": "Conservación ambiental → Economía",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "31",
   "seccion": "Presentación del POT",
   "clase": "Intersistema",
   "frase": "“En la ruralidad es urgente mejorar las condiciones habitacionales, desde los componentes de servicios públicos domiciliarios, accesibilidad y movilidad, con equipamientos que faciliten la economía campesina, familiar y comunitaria, el turismo responsable de naturaleza que vincule residentes y saberes del lugar y la conservación del ambiente como formas de productividad, sustento y desarrollo sostenible.”"
  },
  {
   "id": 23,
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Servicios sociales",
   "dir": "→",
   "sentido": "Equipamientos → Servicios sociales",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "117",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "clase": "Interna",
   "frase": "“Dotar a los barrios de esta infraestructura social hace que los servicios de educación, salud, cultura y cuidado estén próximos y accesibles para garantizar los derechos y satisfacer las necesidades básicas de las personas.”"
  },
  {
   "id": 24,
   "sO": "EFC",
   "cO": "Equipamientos",
   "sD": "EFC",
   "cD": "Vivienda",
   "dir": "→",
   "sentido": "Equipamientos → Vivienda",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "40",
   "seccion": "Presentación del POT",
   "clase": "Interna",
   "frase": "“Que sea en suelo de desarrollo o en suelo de renovación urbana, los constructores y desarrolladores inmobiliarios siempre tengan que garantizar diversos tipos de vivienda de interés social y soportes urbanos y equipamientos sociales de calidad para familias de diferentes tamaños y niveles de ingreso que comparten un mismo trozo de ciudad.”"
  },
  {
   "id": 25,
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Servicios sociales",
   "dir": "→",
   "sentido": "Manzanas del Cuidado → Servicios sociales",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "118",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "clase": "Interna",
   "frase": "“El sistema articula servicios existentes y crea otros nuevos para atender las altas demandas de cuidado de una manera corresponsable entre el gobierno distrital, las comunidades, el sector privado y los demás miembros de los hogares para redistribuir la sobrecarga que llevaban solas las mujeres y balancear la provisión del cuidado, con el fin de devolverles tiempo a las mujeres y a las personas cuidadoras para su desarrollo personal, autocuidado, bienestar, generación de ingresos o participación política.”"
  },
  {
   "id": 26,
   "sO": "EFC",
   "cO": "Manzanas del Cuidado",
   "sD": "EFC",
   "cD": "Equipamientos",
   "dir": "→",
   "sentido": "Manzanas del Cuidado → Equipamientos",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "118",
   "seccion": "Sistema Distrital de Manzanas del Cuidado",
   "clase": "Interna",
   "frase": "“El tejido que se forma entre las Manzanas del Cuidado y la infraestructura nueva y existente de salud, educación, cultura, cuidado y recreación convierte cada una de las upl —que son las nuevas localidades en las que el pot proyecta la ciudad— en una Red del Cuidado.”"
  },
  {
   "id": 27,
   "sO": "EFC",
   "cO": "Corredores verdes",
   "sD": "EFC",
   "cD": "Ciclorutas",
   "dir": "→",
   "sentido": "Corredores verdes → Ciclorutas",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "30",
   "seccion": "Presentación del POT",
   "clase": "Interna",
   "frase": "“Y que, en todo caso, las diversas zonas de la ciudad estén conectadas por un sistema multimodal de transporte público, colectivo, de energías limpias y renovables basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorrutas.”"
  },
  {
   "id": 28,
   "sO": "EFC",
   "cO": "Corredores verdes",
   "sD": "EFC",
   "cD": "Transporte público",
   "dir": "→",
   "sentido": "Corredores verdes → Transporte público",
   "tipo": "Soporte",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Naranja",
   "pag": "30",
   "seccion": "Presentación del POT",
   "clase": "Interna",
   "frase": "“Y que, en todo caso, las diversas zonas de la ciudad estén conectadas por un sistema multimodal de transporte público, colectivo, de energías limpias y renovables basadas en la red Metro y alimentadas por los demás modos y medios de transporte público como los corredores verdes, los cables y las ciclorrutas.”"
  },
  {
   "id": 29,
   "sO": "EEP",
   "cO": "Reservas forestales",
   "sD": "EEP",
   "cD": "Humedales",
   "dir": "→",
   "sentido": "Reservas forestales → Humedales",
   "tipo": "Resiliencia",
   "evid": "Directa",
   "linea": "Sólida",
   "color": "Azul",
   "pag": "72",
   "seccion": "Art. 42",
   "clase": "Interna",
   "frase": "“La Estructura Ecológica Principal es un sistema de áreas y corredores que sostienen la biodiversidad y los servicios ecosistémicos, y su conectividad y complementariedad son fundamentales para garantizar su funcionalidad.”"
  },
  {
   "id": 30,
   "sO": "EEP",
   "cO": "Parques ecológicos de montaña",
   "sD": "EEP",
   "cD": "Coberturas vegetales",
   "dir": "→",
   "sentido": "Parques ecológicos de montaña → Coberturas vegetales",
   "tipo": "Soporte",
   "evid": "Indirecta",
   "linea": "Punteada",
   "color": "Naranja",
   "pag": "72",
   "seccion": "Art. 54",
   "clase": "Interna",
   "frase": "“Los Parques Distritales Ecológicos de Montaña tienen como objetivo restaurar y preservar las especies nativas y garantizar la conectividad ecológica.”"
  }
 ]
};

const SYS = ['EEP', 'EFC', 'EIP', 'ESECI'];

// Icono de Font Awesome para cada concepto (no emojis)
const ICONS = {
  // Estructura Ecológica Principal
  'Humedales': 'fa-droplet',
  'Coberturas vegetales': 'fa-seedling',
  'Conservación ambiental': 'fa-shield-heart',
  'Parques ecológicos de montaña': 'fa-mountain',
  'Reservas forestales': 'fa-tree',
  // Estructura Funcional y del Cuidado
  'Vivienda': 'fa-house',
  'Equipamientos': 'fa-building-columns',
  'Servicios públicos': 'fa-plug',
  'Servicios sociales': 'fa-people-group',
  'Manzanas del Cuidado': 'fa-hand-holding-heart',
  'Transporte público': 'fa-bus',
  'Ciclorutas': 'fa-bicycle',
  'Corredores verdes': 'fa-road',
  'Espacio público': 'fa-umbrella-beach',
  // Estructura Socioeconómica, Creativa y de Innovación
  'Empleo': 'fa-briefcase',
  'Economía': 'fa-coins',
  'Zonas industriales': 'fa-industry',
  'Actividades económicas': 'fa-chart-line',
  'Distrito Centro Tecnológico e Innovación': 'fa-microchip',
  'Producción artesanal': 'fa-gem',
  'Producción de alimentos': 'fa-wheat-awn',
  'Servicios empresariales': 'fa-handshake',
  'Sistema de educación': 'fa-graduation-cap',
  'Zonas de interés turístico': 'fa-camera',
  'Corazones productivos': 'fa-heart-pulse',
  // Estructura Integradora de Patrimonios
  'Patrimonio cultural': 'fa-landmark',
  'Patrimonio inmaterial': 'fa-masks-theater',
  'Patrimonio natural': 'fa-mountain-sun'
};
const iconFor = label => ICONS[label] || 'fa-circle-dot';

// Tamaño del nodo según su número de relaciones documentadas
const TIERS = {
  high: { r: 34, icon: 16, font: 8.8 },
  mid:  { r: 24, icon: 12, font: 8.4 },
  low:  { r: 16, icon: 9,  font: 8.0 }
};
function tierOf(degree) {
  if (degree >= 5) return 'high';
  if (degree >= 3) return 'mid';
  return 'low';
}
const tierOfConcept = id => tierOf(model.concepts[id].rels.length);

// Estado del simulador: true = sistema activo
const state = { EEP: true, EFC: true, EIP: true, ESECI: true };
// Conceptos apagados individualmente (escenario "¿qué pasaría si no existiera X?")
const offNodes = new Set();
let lastToggledOff = null;
let selectedRel = null;

// ---------------------------------------------------------------------
// 1. MODELO: nodos (sistemas + conceptos) y aristas
// ---------------------------------------------------------------------
const conceptId = (sis, con) => sis + '::' + con;

const model = { systems: {}, concepts: {}, relations: [] };

function buildModel() {
  // idempotente: reconstruye desde cero para no duplicar relaciones si se
  // vuelve a invocar la inicialización
  model.systems = {};
  model.concepts = {};
  model.relations = [];

  SYS.forEach(s => {
    model.systems[s] = Object.assign({ code: s, concepts: [] }, POT_DATA.sistemas[s]);
  });

  SYS.forEach(s => {
    (POT_DATA.conceptos[s] || []).forEach(c => {
      const id = conceptId(s, c);
      model.concepts[id] = { id, sys: s, label: c, rels: [] };
      model.systems[s].concepts.push(id);
    });
  });

  POT_DATA.relaciones.forEach(r => {
    const from = conceptId(r.sO, r.cO);
    const to = conceptId(r.sD, r.cD);
    const rel = Object.assign({}, r, { from, to });
    model.relations.push(rel);
    model.concepts[from].rels.push(rel);
    model.concepts[to].rels.push(rel);
  });
}

// Una relación está activa solo si AMBOS sistemas están ON y ninguno de sus
// dos conceptos fue apagado individualmente
const nodeOn = id => !offNodes.has(id);
const relActive = r => state[r.sO] && state[r.sD] && nodeOn(r.from) && nodeOn(r.to);
const conceptVisible = c => state[c.sys];

// ---------------------------------------------------------------------
// 2. LAYOUT: UNA SOLA RED CIRCULAR.
//    Los 4 sistemas van en un círculo pequeño al centro; sus conceptos se
//    reparten en dos anillos, cada sistema dentro de su propio sector
//    angular. Así la red se lee integrada (no como 4 grupos sueltos) y
//    todos los conceptos quedan visibles y bien separados.
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// 2. LAYOUT: la ESECI va AL CENTRO porque sus conceptos funcionan como
//    puentes entre las demás estructuras (es el destino de 17 de las 31
//    relaciones). EEP, EFC y EIP se reparten en un anillo exterior, cada
//    una en su propio sector angular.
// ---------------------------------------------------------------------
const CENTER_SYS = 'ESECI';
const OUTER_ORDER = ['EFC', 'EEP', 'EIP'];

const R_IN = 195;    // anillo central (conceptos puente de la ESECI)
const R_OUT = 395;   // anillo exterior (las otras tres estructuras)
const CON_R = 12;    // radio del nodo de concepto

const layout = {};
const sectors = {};  // sistema -> {a0, a1, mid}

function computeLayout() {
  // --- sectores del anillo exterior, proporcionales al nº de conceptos
  const totalOuter = OUTER_ORDER.reduce((n, s) => n + model.systems[s].concepts.length, 0);
  let acc = -Math.PI / 2;
  OUTER_ORDER.forEach(s => {
    const span = (2 * Math.PI * model.systems[s].concepts.length) / totalOuter;
    sectors[s] = { a0: acc, a1: acc + span, mid: acc + span / 2 };
    acc += span;
  });

  const place = (arr, R, a0, a1) => {
    const k = arr.length;
    arr.forEach((id, i) => {
      const ang = a0 + (a1 - a0) * ((i + 0.5) / k);
      layout[id] = { x: R * Math.cos(ang), y: R * Math.sin(ang) };
    });
  };

  // --- anillo exterior: ordenar cada sector para reducir cruces
  OUTER_ORDER.forEach(s => {
    const sec = sectors[s];
    const ids = model.systems[s].concepts.slice()
      .sort((a, b) => model.concepts[b].rels.length - model.concepts[a].rels.length || a.localeCompare(b));
    place(ids, R_OUT, sec.a0 + 0.06, sec.a1 - 0.06);
  });

  // --- anillo central (ESECI): cada concepto puente se coloca mirando hacia
  //     el promedio angular de los conceptos externos con los que se conecta
  const centerIds = model.systems[CENTER_SYS].concepts;
  const pref = {};
  centerIds.forEach(id => {
    const c = model.concepts[id];
    let vx = 0, vy = 0, n = 0;
    c.rels.forEach(r => {
      const other = r.from === id ? r.to : r.from;
      const p = layout[other];
      if (!p) return;                       // otro concepto de la ESECI: aún sin posición
      vx += p.x; vy += p.y; n++;
    });
    pref[id] = n ? Math.atan2(vy, vx) : 0;
  });

  const sortedCenter = centerIds.slice().sort((a, b) => pref[a] - pref[b] || a.localeCompare(b));
  const startAng = sortedCenter.length ? pref[sortedCenter[0]] : 0;
  sortedCenter.forEach((id, i) => {
    const ang = startAng + (2 * Math.PI * i) / sortedCenter.length;
    layout[id] = { x: R_IN * Math.cos(ang), y: R_IN * Math.sin(ang) };
  });
}

// ---------------------------------------------------------------------
// 3. RENDER
// ---------------------------------------------------------------------
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
};

function wrapLabel(text, maxChars = 15) {
  if (text.length <= maxChars) return [text];
  const parts = text.split(' / ');
  if (parts.length === 2 && parts[0].length <= maxChars + 4 && parts[1].length <= maxChars + 4) {
    return [parts[0] + ' /', parts[1]];
  }
  const words = text.split(' ');
  const lines = [''];
  words.forEach(w => {
    const i = lines.length - 1;
    if ((lines[i] + ' ' + w).trim().length <= maxChars || !lines[i]) {
      lines[i] = (lines[i] + ' ' + w).trim();
    } else {
      lines.push(w);
    }
  });
  if (lines.length > 2) {
    const rest = lines.slice(1).join(' ');
    return [lines[0], rest.length > maxChars + 6 ? rest.slice(0, maxChars + 4) + '…' : rest];
  }
  return lines;
}

// Trayectoria curva entre dos puntos, recortada en los bordes de los nodos
function curvePath(a, b, rA, rB) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const p1 = { x: a.x + ux * (rA + 2), y: a.y + uy * (rA + 2) };
  const p2 = { x: b.x - ux * (rB + 8), y: b.y - uy * (rB + 8) };
  const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
  const bow = Math.min(46, len * 0.11);
  const cx = mx - uy * bow, cy = my + ux * bow;
  return `M${p1.x.toFixed(1)},${p1.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
}

function render() {
  const gGuides = document.getElementById('gGuides');
  const gMembers = document.getElementById('gMembers');
  const gRels = document.getElementById('gRels');
  const gNodes = document.getElementById('gNodes');
  [gGuides, gMembers, gRels, gNodes].forEach(g => (g.innerHTML = ''));

  // -- relaciones activas (las inactivas NO se dibujan: desaparecen de verdad)
  model.relations.forEach(r => {
    if (!relActive(r)) return;
    const a = layout[r.from], b = layout[r.to];
    const rA = TIERS[tierOfConcept(r.from)].r;
    const rB = TIERS[tierOfConcept(r.to)].r;
    const d = curvePath(a, b, rA, rB);
    const kind = r.tipo === 'Soporte' ? 'soporte' : 'resiliencia';
    const cls = ['rel', kind];
    if (r.linea === 'Punteada') cls.push('punteada');
    if (selectedRel === r.id) cls.push('sel');

    const path = el('path', {
      class: cls.join(' '),
      d,
      'marker-end': `url(#ar-${kind})`,
      'data-rel': r.id
    });
    const hit = el('path', { class: 'rel-hit', d, 'data-rel': r.id });

    [path, hit].forEach(node => {
      node.addEventListener('click', ev => { ev.stopPropagation(); selectRelation(r.id); });
      node.addEventListener('mouseenter', ev => showTooltip(ev,
        `<div class="tt-sys" style="color:${model.systems[r.sO].color}">${r.sO} → ${r.sD}</div>` +
        `${esc(r.cO)} → ${esc(r.cD)}<br><span style="color:#8891a5">${r.tipo} · ${r.evid} · p. ${r.pag}</span>`));
      node.addEventListener('mousemove', moveTooltip);
      node.addEventListener('mouseleave', hideTooltip);
    });

    gRels.appendChild(path);
    gRels.appendChild(hit);
  });

  // -- conceptos
  SYS.forEach(s => {
    if (!state[s]) return;
    model.systems[s].concepts.forEach(id => {
      const c = model.concepts[id];
      const p = layout[id];
      const activeRels = c.rels.filter(relActive).length;
      const isolated = activeRels === 0;
      const off = offNodes.has(id);
      const tier = tierOfConcept(id);
      const T = TIERS[tier];

      const cls = ['concept', 'node-appear', 'deg-' + tier];
      if (isolated && !off) cls.push('isolated');
      if (off) cls.push('node-off');

      const g = el('g', {
        class: cls.join(' '),
        transform: `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`,
        style: `--sys:${model.systems[s].color}`,
        'data-id': id
      });

      g.appendChild(el('circle', { class: 'node-fill', r: T.r }));

      // icono dentro del nodo
      const fo = el('foreignObject', {
        x: -T.r, y: -T.r, width: T.r * 2, height: T.r * 2
      });
      const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      div.setAttribute('class', 'node-icon');
      div.innerHTML = `<i class="fa-solid ${iconFor(c.label)}" style="font-size:${T.icon}px"></i>`;
      fo.appendChild(div);
      g.appendChild(fo);

      const lines = wrapLabel(c.label);
      lines.forEach((ln, i) => {
        const t = el('text', { y: T.r + 11 + i * 8.6, style: `font-size:${T.font}px` });
        t.textContent = ln;
        g.appendChild(t);
      });

      g.addEventListener('mouseenter', ev => showTooltip(ev,
        `<div class="tt-sys" style="color:${model.systems[s].color}">${s}</div>${esc(c.label)}<br>` +
        `<span style="color:#8891a5">${c.rels.length} relación(es) en el POT · ${activeRels} activa(s)` +
        `${off ? ' · APAGADO' : isolated ? ' · AISLADO' : ''}</span>`));
      g.addEventListener('mousemove', moveTooltip);
      g.addEventListener('mouseleave', hideTooltip);
      g.addEventListener('click', ev => { ev.stopPropagation(); focusConcept(id); });

      gNodes.appendChild(g);
    });
  });

}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------------
// 4. MÉTRICAS
// ---------------------------------------------------------------------
const outgoing = s => model.relations.filter(r => r.sO === s && relActive(r)).length;
const incoming = s => model.relations.filter(r => r.sD === s && relActive(r)).length;
// relaciones que desaparecerían si ese sistema se apagara (desde red completa)
const incident = s => model.relations.filter(r => r.sO === s || r.sD === s).length;

function components() {
  // La red visible son los conceptos y las relaciones documentadas.
  // Un concepto sin ninguna relación activa cuenta como componente propio.
  const adj = {};
  const nodes = [];
  Object.values(model.concepts).forEach(c => {
    if (!state[c.sys]) return;
    nodes.push(c.id);
    adj[c.id] = [];
  });
  model.relations.forEach(r => {
    if (!relActive(r)) return;
    adj[r.from].push(r.to);
    adj[r.to].push(r.from);
  });

  const seen = new Set();
  const sizes = [];
  nodes.forEach(n => {
    if (seen.has(n)) return;
    let size = 0;
    const stack = [n];
    seen.add(n);
    while (stack.length) {
      const cur = stack.pop();
      size++;
      (adj[cur] || []).forEach(nb => { if (!seen.has(nb)) { seen.add(nb); stack.push(nb); } });
    }
    sizes.push(size);
  });
  sizes.sort((a, b) => b - a);
  return { count: sizes.length, largest: sizes[0] || 0, totalNodes: nodes.length };
}

function updateMetrics() {
  const total = model.relations.length;
  const active = model.relations.filter(relActive).length;
  const pct = total ? Math.round((active / total) * 100) : 0;
  const comp = components();
  const totalNodes = Object.keys(model.concepts).length;

  const isolatedCount = Object.values(model.concepts)
    .filter(c => state[c.sys] && !c.rels.some(relActive)).length;

  set('mRelTot', total);
  set('mRelAct', active + ' <small>/ ' + total + '</small>');
  set('mPct', pct + '<small>%</small>');
  set('mNodTot', totalNodes);
  set('mNodAct', comp.totalNodes + ' <small>/ ' + totalNodes + '</small>');
  set('mComp', comp.count);
  set('mMain', comp.largest + ' <small>nodos</small>');
  set('mIso', isolatedCount);

  const bar = document.getElementById('mBar');
  bar.style.width = pct + '%';
  bar.style.background = pct === 100 ? 'var(--eep)' : pct >= 60 ? 'var(--eseci)' : 'var(--danger)';

  // ---- centralidad saliente (calculada, nunca fija) ----
  const rank = SYS.map(s => ({ s, out: outgoing(s), inc: incoming(s), on: state[s] }))
    .sort((a, b) => b.out - a.out || a.s.localeCompare(b.s));
  const maxOut = Math.max(1, ...rank.map(r => r.out));

  document.getElementById('rankList').innerHTML = rank.map((r, i) => `
    <div class="rank-row ${r.on ? '' : 'is-off'}" style="--sys:${model.systems[r.s].color}">
      <span class="pos">${i + 1}</span>
      <span class="code">${r.s}</span>
      <span class="track"><span class="fill" style="width:${(r.out / maxOut) * 100}%"></span></span>
      <span class="n">${r.out}</span>
    </div>`).join('');

  const top = rank[0];
  const tie = rank.filter(r => r.out === top.out && top.out > 0);
  document.getElementById('topSys').innerHTML = top.out === 0
    ? '<span class="badge-top">Sin relaciones salientes activas</span>'
    : `<span class="badge-top" style="color:${model.systems[top.s].color};border-color:${model.systems[top.s].color}66;background:${model.systems[top.s].color}1f">
         ${tie.length > 1 ? tie.map(t => t.s).join(' / ') : top.s} · Mayor centralidad
       </span>`;
  set('mCentral', top.out === 0 ? '—' : (tie.length > 1 ? tie.map(t => t.s).join(' / ') : top.s));

  // ---- comparación: dependencia que genera cada sistema ----
  const maxInc = Math.max(...SYS.map(incident));
  document.getElementById('compareList').innerHTML = SYS
    .map(s => ({ s, n: incident(s) }))
    .sort((a, b) => b.n - a.n)
    .map(o => `
      <div class="compare-row" style="--sys:${model.systems[o.s].color}">
        <span class="code">${o.s}</span>
        <span class="track"><span class="fill" style="width:${(o.n / maxInc) * 100}%"></span></span>
        <span class="n">${o.n} rel.</span>
      </div>`).join('');

  updateSimPanel(active, total, rank);
}

const set = (id, html) => { document.getElementById(id).innerHTML = html; };

function updateSimPanel(active, total, rank) {
  const off = SYS.filter(s => !state[s]);
  const box = document.getElementById('simBox');

  if (!off.length) {
    box.innerHTML = `<p class="ev-empty">Todos los sistemas están activos. Apaga uno para medir cuánta articulación aporta a la red.</p>`;
  } else {
    const removed = total - active;
    const loss = total ? Math.round((removed / total) * 100) : 0;
    box.innerHTML = `
      <div class="sim-off">
        <div class="k">Sistema${off.length > 1 ? 's' : ''} desactivado${off.length > 1 ? 's' : ''}</div>
        <div class="v">${off.join(' + ')}</div>
      </div>
      <div class="sim-line"><span>Relaciones eliminadas</span><span>${removed}</span></div>
      <div class="sim-line"><span>Relaciones restantes</span><span>${active}</span></div>
      <div class="sim-line"><span>Pérdida de conectividad</span><span>${loss}%</span></div>
      <p class="note" style="border:0;padding-top:9px">Al desactivar ${off.join(' + ')}, la red pierde ${loss}% de sus relaciones.</p>`;
  }

  // ---- hallazgo dinámico ----
  const top = rank[0];
  const f = document.getElementById('finding');
  if (!off.length) {
    f.innerHTML = top.out === 0
      ? 'Sin relaciones activas para analizar.'
      : `La red está completa: <b>${active} de ${total}</b> relaciones activas.
         Según las relaciones construidas a partir del POT, <b>${top.s}</b> concentra la mayor
         centralidad saliente (<b>${top.out}</b> relaciones), por lo que opera como
         <b>principal articulador de esta red</b>.`;
  } else {
    const removed = total - active;
    const loss = total ? Math.round((removed / total) * 100) : 0;
    const worst = SYS.map(s => ({ s, n: incident(s) })).sort((a, b) => b.n - a.n)[0];
    f.innerHTML = `Al desactivar <b>${off.join(' + ')}</b>, la red pierde <b>${removed}</b> de sus
      <b>${total}</b> relaciones (<b>${loss}%</b>) y queda con <b>${components().count}</b>
      componente(s) conectado(s).
      ${top.out > 0
        ? `Con la red así, <b>${top.s}</b> pasa a tener la mayor centralidad saliente (<b>${top.out}</b> relaciones).`
        : 'No quedan relaciones salientes activas.'}
      En la red completa, el sistema que genera mayor dependencia es <b>${worst.s}</b>
      (${worst.n} relaciones incidentes).`;
  }
}

// ---------------------------------------------------------------------
// 5. INTERACCIÓN
// ---------------------------------------------------------------------
function toggleSystem(s) {
  state[s] = !state[s];
  lastToggledOff = state[s] ? null : s;
  if (selectedRel !== null) {
    const r = model.relations.find(x => x.id === selectedRel);
    if (r && !relActive(r)) clearEvidence();
  }
  updateSwitches();
  render();
  updateMetrics();
}

function updateSwitches() {
  SYS.forEach(s => {
    const b = document.querySelector('.scenario-btn[data-sys="' + s + '"]');
    if (!b) return;
    const off = !state[s];
    // en este módulo, "active" = escenario de apagado encendido
    b.classList.toggle('active', off);
    const st = b.querySelector('.sys-state');
    if (st) st.textContent = off ? 'OFF' : 'ON';
    const ic = b.querySelector('i');
    if (ic) {
      ic.classList.toggle('fa-circle-minus', !off);
      ic.classList.toggle('fa-power-off', off);
    }
  });
}

function resetAll() {
  SYS.forEach(s => (state[s] = true));
  offNodes.clear();
  lastToggledOff = null;
  clearEvidence();
  updateSwitches();
  render();
  updateMetrics();
  if (document.getElementById('nodeSelect')) { syncNodeBtn(); updateNodeImpact(); }
  resetView();
}

function selectRelation(id) {
  selectedRel = id;
  const r = model.relations.find(x => x.id === id);
  if (!r) return;
  const kind = r.tipo === 'Soporte' ? 'soporte' : 'resiliencia';

  document.getElementById('evBox').innerHTML = `
    <div class="ev-rel">
      <span style="color:${model.systems[r.sO].color}">${r.sO}</span>
      <span class="arrow">→</span>
      <span style="color:${model.systems[r.sD].color}">${r.sD}</span>
    </div>
    <div class="ev-concepts"><b>${esc(r.cO)}</b> ${r.dir} <b>${esc(r.cD)}</b></div>
    <div class="ev-meta">
      <div><div class="k">Tipo</div><div class="v" style="color:var(--${kind})">${r.tipo}</div></div>
      <div><div class="k">Lectura</div><div class="v">${r.evid}</div></div>
      <div><div class="k">Línea</div><div class="v">${r.linea}</div></div>
      <div><div class="k">Página POT</div><div class="v">${r.pag}</div></div>
      <div style="grid-column:1/-1"><div class="k">Clase de relación</div><div class="v">${r.clase}</div></div>
      <div style="grid-column:1/-1"><div class="k">Sección / referencia</div><div class="v" style="font-size:10.5px;line-height:1.4">${esc(r.seccion)}</div></div>
    </div>
    <div class="ev-quote ${kind}">${esc(r.frase)}</div>
    <div class="ev-src">Frase literal del POT Bogotá Reverdece 2022–2035 · página ${r.pag}</div>`;

  render();
}

function clearEvidence() {
  selectedRel = null;
  document.getElementById('evBox').innerHTML =
    `<p class="ev-empty">Haz clic en cualquier línea de la red para ver la frase exacta del POT que sustenta esa relación, con su página impresa.</p>`;
}

// Resalta un concepto y sus relaciones activas
function focusConcept(id) {
  const c = model.concepts[id];
  const neighbors = new Set([id]);
  c.rels.filter(relActive).forEach(r => { neighbors.add(r.from); neighbors.add(r.to); });

  document.querySelectorAll('.concept').forEach(g => {
    g.classList.toggle('dim', !neighbors.has(g.getAttribute('data-id')));
  });
  document.querySelectorAll('.rel').forEach(p => {
    const r = model.relations.find(x => x.id === +p.getAttribute('data-rel'));
    p.classList.toggle('dim', !(r && (r.from === id || r.to === id)));
  });
}

function clearFocus() {
  document.querySelectorAll('.dim').forEach(n => n.classList.remove('dim'));
}

// ---------------------------------------------------------------------
// 5b. ESCENARIO DE NODO CRÍTICO
// Permite apagar un concepto concreto ("¿qué pasaría si no existieran los
// Humedales?"). Al apagarlo desaparecen todas las relaciones que lo tocan.
// La lista se calcula sola: los conceptos con más relaciones primero.
// ---------------------------------------------------------------------
const TOP_NODES = 10;

function topNodes(n) {
  return Object.values(model.concepts)
    .filter(c => c.rels.length > 0)
    .map(c => ({ id: c.id, label: c.label, sys: c.sys, deg: c.rels.length }))
    .sort((a, b) => b.deg - a.deg || a.label.localeCompare(b.label))
    .slice(0, n);
}

function initNodeScenario() {
  const sel = document.getElementById('nodeSelect');
  if (!sel) return;
  sel.innerHTML = topNodes(TOP_NODES).map(o =>
    `<option value="${o.id}">${esc(o.label)} · ${o.deg} conexiones</option>`).join('');
  sel.addEventListener('change', onNodeSelectChange);
  document.getElementById('btnNodeSim').addEventListener('click', toggleNodeScenario);
  onNodeSelectChange();
}

function plural(label) {
  // "¿Qué pasaría si no existieran los Humedales?" / "...si no existiera la Vivienda?"
  return /s$/i.test(label.trim());
}

function onNodeSelectChange() {
  const sel = document.getElementById('nodeSelect');
  const id = sel.value;
  const c = model.concepts[id];
  if (!c) return;

  // si había otro nodo apagado, se reactiva al cambiar de selección
  if (offNodes.size) {
    offNodes.clear();
    render();
    updateMetrics();
  }

  document.getElementById('nodeQuestion').textContent =
    plural(c.label)
      ? `¿Qué pasaría si no existieran «${c.label}»?`
      : `¿Qué pasaría si no existiera «${c.label}»?`;

  syncNodeBtn();
  updateNodeImpact();
}

function toggleNodeScenario() {
  const id = document.getElementById('nodeSelect').value;
  if (!id) return;
  if (offNodes.has(id)) offNodes.delete(id);
  else { offNodes.clear(); offNodes.add(id); }
  syncNodeBtn();
  render();
  updateMetrics();
}

function syncNodeBtn() {
  const id = document.getElementById('nodeSelect').value;
  const btn = document.getElementById('btnNodeSim');
  const on = offNodes.has(id);
  btn.classList.toggle('active', on);
  btn.innerHTML = on
    ? '<i class="fa-solid fa-power-off"></i> Reactivar nodo'
    : '<i class="fa-solid fa-power-off"></i> Simular sin este nodo';
}

function updateNodeImpact() {
  const id = document.getElementById('nodeSelect').value;
  const c = model.concepts[id];
  const box = document.getElementById('nodeImpact');
  if (!c || !box) return;
  const total = model.relations.length;
  const pct = Math.round((c.rels.length / total) * 100);
  box.innerHTML = `Este concepto participa en <b>${c.rels.length}</b> de las <b>${total}</b>
    relaciones documentadas (<b>${pct}%</b>). Al apagarlo, esas relaciones desaparecen de la red.`;
}
const tip = () => document.getElementById('tooltip');

function showTooltip(ev, html) {
  const t = tip();
  t.innerHTML = html;
  t.classList.add('show');
  moveTooltip(ev);
}

function moveTooltip(ev) {
  const t = tip();
  const stage = document.getElementById('stage').getBoundingClientRect();
  let x = ev.clientX - stage.left + 14;
  let y = ev.clientY - stage.top + 14;
  if (x + 270 > stage.width) x -= 290;
  if (y + 90 > stage.height) y -= 110;
  t.style.left = x + 'px';
  t.style.top = y + 'px';
}

function hideTooltip() { tip().classList.remove('show'); }

// ---------------------------------------------------------------------
// 7. ZOOM Y DESPLAZAMIENTO
// ---------------------------------------------------------------------
const BASE_VB = { x: -480, y: -480, w: 960, h: 960 };
let vb = Object.assign({}, BASE_VB);

function applyVB() {
  document.getElementById('svg').setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
}

function zoom(f, cx, cy) {
  const nw = Math.max(320, Math.min(3200, vb.w / f));
  const nh = nw * (BASE_VB.h / BASE_VB.w);
  if (cx === undefined) { cx = vb.x + vb.w / 2; cy = vb.y + vb.h / 2; }
  vb.x = cx - (cx - vb.x) * (nw / vb.w);
  vb.y = cy - (cy - vb.y) * (nh / vb.h);
  vb.w = nw; vb.h = nh;
  applyVB();
}

function resetView() { vb = Object.assign({}, BASE_VB); applyVB(); }

function initPanZoom() {
  const stage = document.getElementById('stage');
  const svg = document.getElementById('svg');

  stage.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const cx = vb.x + ((e.clientX - rect.left) / rect.width) * vb.w;
    const cy = vb.y + ((e.clientY - rect.top) / rect.height) * vb.h;
    zoom(e.deltaY < 0 ? 1.16 : 1 / 1.16, cx, cy);
  }, { passive: false });

  let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
  stage.addEventListener('pointerdown', e => {
    dragging = true; sx = e.clientX; sy = e.clientY; ox = vb.x; oy = vb.y;
    stage.classList.add('panning');
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    const rect = svg.getBoundingClientRect();
    vb.x = ox - ((e.clientX - sx) / rect.width) * vb.w;
    vb.y = oy - ((e.clientY - sy) / rect.height) * vb.h;
    applyVB();
  });
  const end = () => { dragging = false; stage.classList.remove('panning'); };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);

  svg.addEventListener('click', () => { clearFocus(); });
}

// ---------------------------------------------------------------------
// 8. ARRANQUE
// ---------------------------------------------------------------------
let initialized = false;

document.addEventListener('DOMContentLoaded', () => {
  if (initialized) return;
  initialized = true;

  buildModel();
  computeLayout();

  // interruptores = los botones de escenario del módulo
  document.querySelectorAll('.scenario-btn[data-sys]').forEach(b =>
    b.addEventListener('click', () => toggleSystem(b.getAttribute('data-sys'))));
  updateSwitches();

  document.getElementById('btnReset').addEventListener('click', resetAll);
  document.getElementById('btnIn').addEventListener('click', () => zoom(1.25));
  document.getElementById('btnOut').addEventListener('click', () => zoom(0.8));
  document.getElementById('btnFit').addEventListener('click', resetView);

  clearEvidence();
  initNodeScenario();
  initPanZoom();
  applyVB();
  render();
  updateMetrics();

  // verificación de integridad de datos en consola
  const r = model.relations;
  console.log('Relaciones cargadas:', r.length,
    '| Sólidas:', r.filter(x => x.linea === 'Sólida').length,
    '| Punteadas:', r.filter(x => x.linea === 'Punteada').length,
    '| Soporte:', r.filter(x => x.tipo === 'Soporte').length,
    '| Resiliencia:', r.filter(x => x.tipo === 'Resiliencia').length,
    '| Conceptos:', Object.keys(model.concepts).length);
});
