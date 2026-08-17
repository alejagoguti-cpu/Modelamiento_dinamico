/* ==========================================================
   RAPOT · LA RED IMPLÍCITA DEL POT (Bogotá Reverdece 2022-2035)

   FUENTE DE DATOS: reconstruido directamente desde el archivo del equipo
   "tabla_completa_relaciones_POT_Bogota_Reverdece.xlsx" (hoja "Matriz
   completa": 45 relaciones intra-estructura con página, artículo y —
   cuando existe— cita textual verbatim del POT). Se generó el código a
   partir del Excel para evitar errores de transcripción manual.

   Regla de nodos (hoja "Criterios" del Excel): no se introducen conceptos
   abstractos ni subcategorías de otro nodo; los conceptos se mantienen al
   mismo nivel de detalle. Por eso "Humedales" pesa exactamente igual que
   "Transporte público": ningún nodo es hijo/categoría de otro.

   Convención de líneas (hoja "Criterios"):
     - Tipo de línea → ESTILO del trazo:
         Sólida / Directa   : el POT establece de forma explícita el vínculo.
         Punteada / Indirecta: vínculo construido por una relación funcional
                                intermedia, menos directa.
     - Tipo de relación → COLOR del trazo (dimensión independiente):
         Soporte     (naranja): el primer concepto sostiene/facilita/habilita
                                 el funcionamiento del segundo.
         Resiliencia (azul)   : la relación está ligada expresamente a
                                 conectividad ecosistémica, resiliencia
                                 climática o reducción de riesgo.
     - Vacío (rojo, discontinuo, con flecha): AUSENCIA documentada de
       articulación entre dos componentes reales de estructuras distintas.
       Es un hallazgo del equipo, no una relación del texto del POT — y no
       forma parte del esquema Soporte/Resiliencia (que es 100% intra-
       estructura en la Excel).

   Nivel de evidencia (hoja "Criterios"):
     - cita_literal (Nivel A)         : frase textual continua del POT,
       validada desde el documento — evidencia recomendada para la red final.
     - inventario_pendiente (Nivel B/C): relación que estaba en el inventario
       previo del equipo pero sin cita textual completa aún validada — el
       propio Excel indica "No presentarla como cita exacta" / "Usar en red:
       Solo después de verificar". Se muestra igual en la red (con su
       página/artículo aproximado) pero SIN inventar una cita, y con badge
       visualmente distinto de cita_literal.
     - fuente_secundaria / inferencia : quedan disponibles para hallazgos
       propios del equipo por fuera de la Excel (p.ej. los vacíos de
       articulación intersistema, que la Excel corrobora de forma
       independiente: en la hoja "Resumen" las 4 estructuras muestran 0
       relaciones verificadas intersistema).

   No hay nodos-hub artificiales: el tamaño de cada bola sale del GRADO
   REAL de conexión dentro de esta red (cuántas relaciones directas/
   indirectas tiene), calculado después de construir las aristas — así
   los hubs son los que el propio grafo revela, no una categoría
   administrativa impuesta.
   ========================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const XHTML_NS = "http://www.w3.org/1999/xhtml";

const STRUCT_STYLE = {
  e1: { color: "#5cd6d1", label: "1. Estructura Ecológica Principal", short: "EEP",
    articulos: "Art. 41–79 (39 artículos)", paginas: "pp. 70–101" },
  e2: { color: "#ef9f54", label: "2. Estructura Funcional y del Cuidado", short: "EFC",
    articulos: "Art. 88–99 (12 artículos)", paginas: "pp. 109–120" },
  e3: { color: "#fac47b", label: "3. Estructura Socioeconómica, Creativa y de Innovación", short: "ESECI",
    articulos: "Art. 100–101 (2 artículos, + Art.240/243/327 en Libro III)", paginas: "pp. 120–122 / 223–279" },
  e4: { color: "#fb8d84", label: "4. Estructura Integradora de Patrimonios", short: "EIP",
    articulos: "Art. 80–87 (8 artículos)", paginas: "pp. 101–109" },
};

const FUENTE_STYLE = {
  cita_literal:         { color: "#2fd4c8", label: "Cita literal verificada (Nivel A)",              icon: "fa-quote-right" },
  indice_oficial:       { color: "#5b8def", label: "Índice oficial (título confirmado)",             icon: "fa-list-check" },
  fuente_secundaria:    { color: "#f5c945", label: "Fuente secundaria (ABC POT / prensa oficial)",    icon: "fa-newspaper" },
  inferencia:           { color: "#ef9552", label: "Inferencia razonada del equipo",                 icon: "fa-lightbulb" },
  inventario_pendiente: { color: "#8b93a8", label: "Inventario previo (Nivel B/C — cita sin validar)", icon: "fa-hourglass-half" },
  por_verificar:        { color: "#e0a94c", label: "Aportado por la usuaria — pendiente de comprobar contra el PDF", icon: "fa-magnifying-glass" },
};

/* ==========================================================
   NODOS — 39 conceptos extraídos 1:1 de la hoja "Matriz completa"
   del Excel del equipo, al mismo nivel de detalle (sin subcategorías
   ni nodos-agregadores), + 1 nodo suplementario claramente marcado.
   ========================================================== */
const ODS_NODES = [
  /* ---- ESTRUCTURA ECOLÓGICA PRINCIPAL ---- */
  { id:"corredores_montanosos", cat:"e1", name:"CORREDORES\nMONTAÑOSOS", icon:"fa-mountain", fuente:"inventario_pendiente" },
  { id:"rios", cat:"e1", name:"RÍOS", icon:"fa-water", fuente:"inventario_pendiente" },
  { id:"quebradas", cat:"e1", name:"QUEBRADAS", icon:"fa-water", fuente:"inventario_pendiente" },
  { id:"humedales", cat:"e1", name:"HUMEDALES", icon:"fa-droplet", fuente:"cita_literal" },
  { id:"cerros_orientales", cat:"e1", name:"CERROS\nORIENTALES", icon:"fa-mountain-sun", fuente:"inventario_pendiente" },
  { id:"complejos_de_paramos", cat:"e1", name:"COMPLEJOS\nDE PÁRAMOS", icon:"fa-mountain", fuente:"inventario_pendiente" },
  { id:"bosques_urbanos", cat:"e1", name:"BOSQUES\nURBANOS", icon:"fa-tree", fuente:"inventario_pendiente" },
  { id:"coberturas_vegetales", cat:"e1", name:"COBERTURAS\nVEGETALES", icon:"fa-leaf", fuente:"inventario_pendiente" },
  { id:"areas_de_resiliencia_climatica", cat:"e1", name:"ÁREAS DE\nRESILIENCIA CLIMÁTICA", icon:"fa-shield-heart", fuente:"cita_literal" },
  { id:"areas_protegidas", cat:"e1", name:"ÁREAS\nPROTEGIDAS", icon:"fa-shield-halved", fuente:"inventario_pendiente" },
  { id:"parques_ecologicos_de_montana", cat:"e1", name:"PARQUES ECOLÓGICOS\nDE MONTAÑA", icon:"fa-campground", fuente:"inventario_pendiente" },
  { id:"reservas_forestales", cat:"e1", name:"RESERVAS\nFORESTALES", icon:"fa-tree-city", fuente:"inventario_pendiente" },
  { id:"parques_de_borde", cat:"e1", name:"PARQUES\nDE BORDE", icon:"fa-archway", fuente:"inventario_pendiente" },
  { id:"paisajes_sostenibles", cat:"e1", name:"PAISAJES\nSOSTENIBLES", icon:"fa-sun", fuente:"inventario_pendiente" },

  /* ---- ESTRUCTURA FUNCIONAL Y DEL CUIDADO ---- */
  { id:"equipamientos", cat:"e2", name:"EQUIPAMIENTOS", icon:"fa-school", fuente:"cita_literal" },
  { id:"servicios_de_cuidado", cat:"e2", name:"SERVICIOS\nDE CUIDADO", icon:"fa-hand-holding-heart", fuente:"inventario_pendiente" },
  { id:"servicios_sociales", cat:"e2", name:"SERVICIOS\nSOCIALES", icon:"fa-people-roof", fuente:"cita_literal" },
  { id:"vivienda", cat:"e2", name:"VIVIENDA", icon:"fa-house", fuente:"cita_literal" },
  { id:"servicios_publicos", cat:"e2", name:"SERVICIOS\nPÚBLICOS", icon:"fa-bolt", fuente:"inventario_pendiente" },
  { id:"ciclorutas", cat:"e2", name:"CICLORUTAS", icon:"fa-person-biking", fuente:"cita_literal" },
  { id:"transporte_publico", cat:"e2", name:"TRANSPORTE\nPÚBLICO", icon:"fa-bus", fuente:"cita_literal" },
  { id:"red_vial", cat:"e2", name:"RED\nVIAL", icon:"fa-road", fuente:"cita_literal" },
  { id:"corredores_verdes", cat:"e2", name:"CORREDORES\nVERDES", icon:"fa-seedling", fuente:"cita_literal" },
  { id:"manzanas_del_cuidado", cat:"e2", name:"MANZANAS\nDEL CUIDADO", icon:"fa-building-shield", fuente:"cita_literal" },
  { id:"parques", cat:"e2", name:"PARQUES", icon:"fa-tree", fuente:"inventario_pendiente" },

  /* ---- ESTRUCTURA SOCIOECONÓMICA, CREATIVA Y DE INNOVACIÓN ---- */
  { id:"distrito_centro_tecnologico_e_innovacion", cat:"e3", name:"DISTRITO CENTRO\nTECNOLÓGICO E INNOVACIÓN", icon:"fa-microchip", fuente:"inventario_pendiente" },
  { id:"servicios_empresariales", cat:"e3", name:"SERVICIOS\nEMPRESARIALES", icon:"fa-briefcase", fuente:"inventario_pendiente" },
  { id:"sistema_de_educacion", cat:"e3", name:"SISTEMA\nDE EDUCACIÓN", icon:"fa-graduation-cap", fuente:"inventario_pendiente" },
  { id:"centros_de_abastecimiento", cat:"e3", name:"CENTROS\nDE ABASTECIMIENTO", icon:"fa-warehouse", fuente:"inventario_pendiente" },
  { id:"plazas_de_mercado", cat:"e3", name:"PLAZAS\nDE MERCADO", icon:"fa-store", fuente:"inventario_pendiente" },
  { id:"zonas_industriales", cat:"e3", name:"ZONAS\nINDUSTRIALES", icon:"fa-industry", fuente:"cita_literal" },
  { id:"produccion_artesanal", cat:"e3", name:"PRODUCCIÓN\nARTESANAL", icon:"fa-hammer", fuente:"cita_literal" },
  { id:"zonas_de_interes_turistico", cat:"e3", name:"ZONAS DE\nINTERÉS TURÍSTICO", icon:"fa-camera", fuente:"inventario_pendiente" },
  { id:"centros_financieros", cat:"e3", name:"CENTROS\nFINANCIEROS", icon:"fa-building-columns", fuente:"inventario_pendiente" },

  /* ---- ESTRUCTURA INTEGRADORA DE PATRIMONIOS ---- */
  { id:"sistema_de_sitios_sagrados", cat:"e4", name:"SISTEMA DE\nSITIOS SAGRADOS", icon:"fa-place-of-worship", fuente:"inventario_pendiente" },
  { id:"patrimonio_inmaterial", cat:"e4", name:"PATRIMONIO\nINMATERIAL", icon:"fa-masks-theater", fuente:"inventario_pendiente" },
  { id:"patrimonio_arqueologico", cat:"e4", name:"PATRIMONIO\nARQUEOLÓGICO", icon:"fa-monument", fuente:"inventario_pendiente" },
  { id:"patrimonio_natural", cat:"e4", name:"PATRIMONIO\nNATURAL", icon:"fa-leaf", fuente:"inventario_pendiente" },
  { id:"patrimonio_material", cat:"e4", name:"PATRIMONIO\nMATERIAL", icon:"fa-landmark", fuente:"inventario_pendiente" },

  /* ---- NODO SUPLEMENTARIO (fuera de la matriz del Excel; añadido por su fuerza narrativa
          para el hallazgo "general vs. particular": el POT nombra esta reserva por su
          nombre propio en el Art.7, a diferencia del tratamiento genérico de "humedales") ---- */
  { id:"van_der_hammen", cat:"e1", name:"RESERVA THOMAS\nVAN DER HAMMEN", icon:"fa-tree",
    fuente:"cita_literal", suplementario:true },
];

function nodeById(id) { return ODS_NODES.find(n => n.id === id); }

/* ==========================================================
   ARISTAS — 45 relaciones intra-estructura de la Matriz completa,
   + 2 del nodo suplementario, + 7 "vacío" (hallazgo de ausencias
   intersistema, corroborado independientemente por la hoja "Resumen"
   del Excel: 0 relaciones verificadas intersistema en las 4 filas).
   ========================================================== */
const TYPE_STYLE = {
  directa:   { color: "#2fd4c8", label: "Directa (respaldo explícito del POT)" },
  indirecta: { color: "#8b93a8", label: "Indirecta (relación funcional intermedia)" },
  vacio:     { color: "#ef4444", label: "Vacío de articulación (hallazgo)" },
};
// Color de trazo por "Tipo de relación" (dimensión independiente del estilo de línea)
const RELACION_STYLE = {
  Soporte:     { color: "#f5a623", label: "Soporte (sostiene / habilita)" },
  Resiliencia: { color: "#5b8def", label: "Resiliencia (conectividad ecosistémica / clima)" },
};

const RAW_EDGES = [
  // ==== Relaciones intra-estructura (45), fuente: hoja "Matriz completa" — tabla_completa_relaciones_POT_Bogota_Reverdece.xlsx ====
  // ---- Estructura Ecológica Principal ----
  { s:"corredores_montanosos", t:"rios", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 7", pagina:"70", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: ríos y humedales]." },
  { s:"quebradas", t:"humedales", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 42 / 62", pagina:"72", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: ríos y quebradas y humedales]." },
  { s:"cerros_orientales", t:"humedales", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 7", pagina:"70", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: cerros orientales, ríos y humedales]." },
  { s:"humedales", t:"rios", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 42 / 62", pagina:"72", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: ríos y quebradas y humedales]." },
  { s:"rios", t:"complejos_de_paramos", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 7", pagina:"70", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: complejos de páramos, ríos y humedales]." },
  { s:"bosques_urbanos", t:"coberturas_vegetales", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 74", pagina:"73", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: cobertura vegetal]." },
  { s:"areas_de_resiliencia_climatica", t:"coberturas_vegetales", cat:"e1", tipo:"directa", relacion:"Resiliencia", fuente:"inventario_pendiente", articulo:"Art. 42", pagina:"72", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: territorio resiliente al cambio climático]." },
  { s:"humedales", t:"areas_de_resiliencia_climatica", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Estrategias de EEP / resiliencia", pagina:"57",
    cita:"La EEP, como la suma de las áreas protegidas y verdes de especial importancia ambiental, cumple con su potencial en términos de regulación hídrica, acumulación de carbono, aumento de la biodiversidad y el paisaje, entre otros servicios ecosistémicos. El esfuerzo de cuidar las zonas verdes y naturales que trae el POT se hace por el paisaje y la oferta de espacios para la recreación en medio de la naturaleza, pero también porque su existencia puede mejorar nuestra resiliencia frente al cambio climático, nos garantiza el acceso al agua y una relación menos agresiva con esta, reduciendo lo extremo de las temporadas de lluvias y sequías.",
    analisis:"El humedal es un elemento de la EEP; la frase explica que la conservación de zonas verdes y naturales aporta resiliencia climática y regulación hídrica." },
  { s:"areas_protegidas", t:"humedales", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 41 / 51", pagina:"71", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Reservas Distritales de Humedal]." },
  { s:"areas_protegidas", t:"parques_ecologicos_de_montana", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 51 / 54", pagina:"71", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Parques Distritales Ecológicos de Montaña]." },
  { s:"areas_protegidas", t:"reservas_forestales", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 41 / 45 / 48", pagina:"71", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Reserva Forestal Protectora Regional]." },
  { s:"reservas_forestales", t:"humedales", cat:"e1", tipo:"directa", relacion:"Resiliencia", fuente:"inventario_pendiente", articulo:"Art. 42", pagina:"72", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: conectividad y complementariedad]." },
  { s:"parques_ecologicos_de_montana", t:"coberturas_vegetales", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 54", pagina:"72", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: restaurar y preservar las especies nativas]." },
  { s:"coberturas_vegetales", t:"parques_de_borde", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 121", pagina:"136", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: coberturas vegetales en parques de borde]." },
  { s:"coberturas_vegetales", t:"paisajes_sostenibles", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 52 / 74", pagina:"72", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: funcionalidad ecosistémica y conectividad]." },
  { s:"complejos_de_paramos", t:"paisajes_sostenibles", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 7 / 52", pagina:"70", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: complejos de páramos y paisajes]." },

  // ---- Estructura Funcional y del Cuidado ----
  { s:"equipamientos", t:"servicios_de_cuidado", cat:"e2", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 94–95", pagina:"117–118", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: equipamientos y servicios de cuidado]." },
  { s:"equipamientos", t:"servicios_sociales", cat:"e2", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 94–95", pagina:"117–118", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: equipamientos y servicios sociales]." },
  { s:"equipamientos", t:"vivienda", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Una ciudad para el empleo y las oportunidades", pagina:"29",
    cita:"Que sea en suelo de desarrollo o en suelo de renovación urbana, los constructores y desarrolladores inmobiliarios siempre tengan que garantizar diversos tipos de vivienda de interés social y soportes urbanos y equipamientos sociales de calidad para familias de diferentes tamaños y niveles de ingreso que comparten un mismo trozo de ciudad.",
    analisis:"El POT vincula la vivienda con soportes urbanos y equipamientos sociales de calidad. (Corrige un hallazgo previo erróneo: sí existe una relación real y textual entre Equipamientos y Vivienda dentro de la EFC.)" },
  { s:"servicios_publicos", t:"vivienda", cat:"e2", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 179", pagina:"179", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: servicio público para las actividades en la ciudad]." },
  { s:"ciclorutas", t:"vivienda", cat:"e2", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 88", pagina:"117", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: accesibilidad y conectividad]." },
  { s:"ciclorutas", t:"transporte_publico", cat:"e2", tipo:"indirecta", relacion:"Resiliencia", fuente:"cita_literal", articulo:"Art. 159", pagina:"159",
    cita:"Los proyectos de infraestructura de los corredores verdes de alta capacidad, media capacidad y los corredores de baja capacidad deberán incluir intervenciones que permitan su conexión con la red de ciclo infraestructura de la ciudad.",
    analisis:"El POT establece literalmente que los corredores de transporte deben conectarse con la red de cicloinfraestructura." },
  { s:"transporte_publico", t:"vivienda", cat:"e2", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 88", pagina:"117", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: accesibilidad y conectividad]." },
  { s:"red_vial", t:"transporte_publico", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 158–159", pagina:"158–159",
    cita:"La malla arterial: Son las calles que permiten el desarrollo de viajes de alcance urbano, dan soporte a la operación de todos los modos y es el sustrato para la localización de infraestructuras de la red de transporte público de alta y media capacidad.",
    analisis:"El POT define la red vial como soporte de la infraestructura de transporte público." },
  { s:"red_vial", t:"equipamientos", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 88 / 95", pagina:"117", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: accesibilidad … equipamientos]." },
  { s:"corredores_verdes", t:"ciclorutas", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Art. 159", pagina:"159",
    cita:"Los proyectos de infraestructura de los corredores verdes de alta capacidad, media capacidad y los corredores de baja capacidad deberán incluir intervenciones que permitan su conexión con la red de ciclo infraestructura de la ciudad.",
    analisis:"El texto hace explícita la conexión entre corredores verdes y cicloinfraestructura." },
  { s:"corredores_verdes", t:"transporte_publico", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Arts. 158–160", pagina:"158–160",
    cita:"En un corredor verde se desarrolla infraestructura de movilidad que privilegia modos de transporte limpios, al peatón y a la micromovilidad; protege y resalta el patrimonio cultural y desarrolla estrategias de reverdecimiento, entendidas como acciones de mitigación al cambio climático, conexión ecosistémica y cumplimiento de los Objetivos de Desarrollo Sostenible – ODS.",
    analisis:"El POT define el corredor verde como infraestructura de movilidad y, simultáneamente, como espacio de reverdecimiento y conexión ecosistémica." },
  { s:"manzanas_del_cuidado", t:"servicios_sociales", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Sistema Distrital de Manzanas del Cuidado", pagina:"128",
    cita:"El tejido que se forma entre las Manzanas del Cuidado y la infraestructura nueva y existente de salud, educación, cultura, cuidado y recreación convierte cada una de las UPL —que son las nuevas localidades en las que el POT proyecta la ciudad— en una Red del Cuidado.",
    analisis:"La Red del Cuidado se construye articulando las Manzanas con infraestructura de servicios." },
  { s:"manzanas_del_cuidado", t:"equipamientos", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Sistema Distrital de Manzanas del Cuidado", pagina:"128",
    cita:"El tejido que se forma entre las Manzanas del Cuidado y la infraestructura nueva y existente de salud, educación, cultura, cuidado y recreación convierte cada una de las UPL —que son las nuevas localidades en las que el POT proyecta la ciudad— en una Red del Cuidado.",
    analisis:"Las Manzanas del Cuidado se articulan explícitamente con la infraestructura social existente y nueva." },
  { s:"manzanas_del_cuidado", t:"parques", cat:"e2", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 94", pagina:"117", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: jardines infantiles, colegios, parques]." },

  // ---- Estructura Socioeconómica, Creativa y de Innovación ----
  { s:"distrito_centro_tecnologico_e_innovacion", t:"servicios_empresariales", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 101", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Eje de Servicios Empresariales Avenida El Dorado]." },
  { s:"distrito_centro_tecnologico_e_innovacion", t:"sistema_de_educacion", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 100–101", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: formación del talento humano]." },
  { s:"centros_de_abastecimiento", t:"plazas_de_mercado", cat:"e3", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 100–101", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Centros de Abasto Mayorista y Plazas de Mercado]." },
  { s:"plazas_de_mercado", t:"servicios_empresariales", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 101", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Plazas de Mercado e infraestructuras]." },
  { s:"zonas_industriales", t:"servicios_empresariales", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 101", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Eje de Servicios Empresariales Avenida El Dorado y Zonas industriales]." },
  { s:"zonas_industriales", t:"sistema_de_educacion", cat:"e3", tipo:"indirecta", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 100–101", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: formación del talento humano y empresas]." },
  { s:"zonas_industriales", t:"produccion_artesanal", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:"Presentación del POT", pagina:"30",
    cita:"Por eso el POT promueve la permanencia de las industrias tradicionales en el tejido urbano y promueve nuevas implantaciones económicas generadoras de empleo formal, articuladas a los entornos urbanos donde se aglomeran saberes y talentos, y en particular aquellos que dan lugar a aglomeraciones especializadas de producción tradicional e industrias creativas, culturales, verdes, digitales y tecnológicas.",
    analisis:"La frase vincula la permanencia de industrias tradicionales con producción tradicional e industrias creativas/culturales." },
  { s:"zonas_de_interes_turistico", t:"plazas_de_mercado", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 101", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Zonas de Interés Turístico y Plazas de Mercado]." },
  { s:"centros_financieros", t:"servicios_empresariales", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 100", pagina:"122", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: centros financieros y de servicios empresariales]." },

  // ---- Estructura Integradora de Patrimonios ----
  { s:"sistema_de_sitios_sagrados", t:"patrimonio_inmaterial", cat:"e4", tipo:"directa", relacion:"Resiliencia", fuente:"inventario_pendiente", articulo:"Art. 80", pagina:"103–104", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: patrimonio cultural inmaterial y comunidades]." },
  { s:"patrimonio_arqueologico", t:"patrimonio_natural", cat:"e4", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 80", pagina:"103–104", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Patrimonio Natural y Patrimonio Arqueológico]." },
  { s:"patrimonio_arqueologico", t:"patrimonio_material", cat:"e4", tipo:"directa", relacion:"Resiliencia", fuente:"inventario_pendiente", articulo:"Art. 80", pagina:"103–104", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: Patrimonio Cultural material y Patrimonio Arqueológico]." },
  { s:"patrimonio_natural", t:"patrimonio_inmaterial", cat:"e4", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 80", pagina:"103–104", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: patrimonio cultural material, inmaterial y natural]." },
  { s:"patrimonio_material", t:"patrimonio_natural", cat:"e4", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 80", pagina:"103–104", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: integra el patrimonio cultural material, inmaterial y natural]." },
  { s:"patrimonio_material", t:"patrimonio_inmaterial", cat:"e4", tipo:"directa", relacion:"Soporte", fuente:"inventario_pendiente", articulo:"Art. 80", pagina:"103–104", cita:null,
    analisis:"La relación estaba en el inventario previo del equipo; no se incorpora como evidencia textual definitiva sin verificar la frase completa. Pista sin validar: [Fragmento previo: patrimonio cultural material, inmaterial y natural]." },

  // ==== NODO SUPLEMENTARIO: Reserva Thomas van der Hammen (no está en la matriz del Excel; se añade
  //      por su fuerza narrativa para el hallazgo "general vs. particular" — el POT la nombra por su
  //      nombre propio en el Art.7, a diferencia del tratamiento genérico de "humedales") ====
  { s:"van_der_hammen", t:"areas_protegidas", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"cita_literal",
    articulo:"Art. 7 / Art. 50", pagina:"33 / 79-80",
    cita:"“…la Reserva Thomas Van Der Hammen, los complejos de páramos, los corredores montañosos, las reservas forestales y los ríos y humedales que comparte con su entorno regional.” (Art. 7, p.33)",
    analisis:"La Reserva se nombra por nombre propio junto a los demás elementos de la EEP en el Art.7, y tiene artículo dedicado propio (Art.50) dentro del Sistema Distrital de Áreas Protegidas — a diferencia de los humedales, tratados como categoría genérica." },
  { s:"van_der_hammen", t:"reservas_forestales", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"cita_literal",
    articulo:"Art. 50", pagina:"79-80", cita:null,
    analisis:"Su nombre oficial completo es 'Reserva Forestal Regional Productora del Norte de Bogotá D.C., Thomas van der Hammen' — administrativamente es un caso particular de la categoría Reservas forestales." },


  // ==== Relaciones ampliadas (39), fuente: "relaciones_POT_ampliadas_usuario.xlsx" aportado por la usuaria ====
  // Igual que las 45 originales, estas 39 son también 100% intra-estructura -- no agregan nuevos puentes entre EEP/EFC/ESECI/EIP, pero sí enriquecen y densifican cada estructura por dentro.
  // fuente:"por_verificar" = la propia hoja "Revisión documental" del Excel de la usuaria marca la relación como
  // pendiente de comprobar contra el PDF oficial del POT — se muestra en la red con badge visual distinto (ámbar).
  { s:"reservas_forestales", t:"rios", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"cita_literal", articulo:null, pagina:"22",
    cita:"El POT incluye reservas forestales y ríos dentro de la estructura hídrica y ecosistémica, pero no establece que uno actúe sobre el otro.",
    analisis:"Fuente: Tabla aportada por la usuaria" },
  { s:"coberturas_vegetales", t:"areas_protegidas", cat:"e1", tipo:"directa", relacion:"Soporte", fuente:"cita_literal", articulo:null, pagina:"59",
    cita:"El POT señala que se priorizan “coberturas vegetales que conecten entre sí las áreas protegidas”.",
    analisis:"Fuente: Tabla aportada por la usuaria" },
  { s:"cerros_orientales", t:"rios", cat:"e1", tipo:"indirecta", relacion:"Soporte", fuente:"cita_literal", articulo:null, pagina:"59",
    cita:"El POT sí identifica el conector “Cerros Orientales-río Bogotá”, pero eso demuestra conectividad, no que exista una relación unidireccional.",
    analisis:"Fuente: Tabla aportada por la usuaria" },
  { s:"vivienda", t:"servicios_sociales", cat:"e2", tipo:"indirecta", relacion:"Soporte", fuente:"cita_literal", articulo:null, pagina:"156",
    cita:"El POT plantea “vivienda con ciudad”, teniendo cerca servicios sociales e infraestructura.",
    analisis:"Fuente: Tabla aportada por la usuaria" },
  { s:"red_vial", t:"vivienda", cat:"e2", tipo:"indirecta", relacion:"Soporte", fuente:"cita_literal", articulo:null, pagina:"110",
    cita:"El POT incluye la malla vial local e intermedia entre los soportes que acompañan la escala de proximidad y el cuidado.",
    analisis:"Fuente: Tabla aportada por la usuaria" },
  { s:"distrito_centro_tecnologico_e_innovacion", t:"zonas_industriales", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"por_verificar", articulo:null, pagina:"158",
    cita:"El corazón del campus comprende un área de 247 hectáreas en el centro de la ciudad articulada con las AE Zibo y Reencuentro.",
    analisis:"Fuente: Fuente indicada: Bogotá.gov.co; comprobar contra PDF" },
  { s:"centros_de_abastecimiento", t:"produccion_artesanal", cat:"e3", tipo:"indirecta", relacion:"Soporte", fuente:"por_verificar", articulo:null, pagina:"92",
    cita:"Economías de aglomeración con énfasis de especialización – Corazones productivos de escala urbana- compuestas por: [...] Centros de Abasto Mayorista.",
    analisis:"Fuente: Texto aportado; comprobar concepto exacto del segundo nodo" },
  { s:"sistema_de_educacion", t:"servicios_empresariales", cat:"e3", tipo:"directa", relacion:"Soporte", fuente:"por_verificar", articulo:null, pagina:"30",
    cita:"Los programas de becas de educación universitaria como Jóvenes a la U y de formación para el trabajo como Todos a la U se han enfocado en esas mismas habilidades y tipos de carreras para encuadrar con las necesidades y ofertas de trabajo y emprendimiento presentes y futuras de la ciudad.",
    analisis:"Fuente: Texto aportado; comprobar contra PDF" },
  { s:"sistema_de_educacion", t:"produccion_artesanal", cat:"e3", tipo:"indirecta", relacion:"Soporte", fuente:"por_verificar", articulo:null, pagina:"30",
    cita:"La inversión en educación pública de calidad ha asegurado que desde los colegios se mejoren las habilidades en ciencias, matemáticas, bilingüismo, ingenierías y tecnologías, y los programas de becas de educación universitaria como Jóvenes a la U y de formación para el trabajo como Todos a la U se han enfocado en esas mismas habilidades y tipos de carreras para encuadrar con las necesidades y ofertas de trabajo y emprendimiento presentes y futuras de la ciudad.",
    analisis:"Fuente: Texto aportado; comprobar contra PDF" },

  // ==== VACÍOS DE ARTICULACIÓN: hallazgo central — ausencias documentadas entre estructuras.
  //      La Excel corrobora este hallazgo de forma independiente (hoja "Resumen": columna
  //      "Relaciones verificadas intersistema" = 0 en las 4 filas). Estas NO son relaciones del
  //      texto: son la ausencia documentada de un puente, ligada a un componente real del inventario. ====
  { s:"humedales", t:"vivienda", cat:"e1-e2", tipo:"vacio", relacion:"Soporte", fuente:"inferencia", articulo:null, pagina:null, cita:null,
    analisis:"No existe ningún artículo confirmado (ni en la matriz de 45 relaciones del equipo, ni en el índice oficial) que articule Humedales (EEP) con la producción de Vivienda (EFC) — pese a que la expansión de vivienda sobre rondas de humedal es uno de los conflictos urbanos más documentados de Bogotá (Jaboque, Tibanica, Capellanía)." },
  { s:"humedales", t:"manzanas_del_cuidado", cat:"e1-e2", tipo:"vacio", relacion:"Soporte", fuente:"inferencia", articulo:null, pagina:null, cita:null,
    analisis:"Las Manzanas del Cuidado se promocionan cercanas a espacios verdes, pero no hay mecanismo articulado, ni en la matriz de relaciones ni en el índice oficial, que conecte su localización con la protección de humedales." },
  { s:"rios", t:"transporte_publico", cat:"e1-e2", tipo:"vacio", relacion:"Resiliencia", fuente:"inferencia", articulo:null, pagina:null, cita:null,
    analisis:"No hay relación registrada que articule el Sistema Hídrico (ríos/quebradas) con el Sistema de Movilidad, pese a que rondas hídricas y trazados viales compiten por el mismo suelo (caso documentado: ALO junto al río Bogotá)." },
  { s:"complejos_de_paramos", t:"distrito_centro_tecnologico_e_innovacion", cat:"e1-e3", tipo:"vacio", relacion:"Soporte", fuente:"inferencia", articulo:null, pagina:null, cita:null,
    analisis:"Ninguna relación confirmada conecta la protección de páramos con los componentes de la ESECI (Distrito Tecnológico, zonas industriales, servicios empresariales) — la estructura ecológica y la socioeconómica no comparten ni un solo puente verificado en las 45 relaciones documentadas." },
  { s:"areas_de_resiliencia_climatica", t:"zonas_industriales", cat:"e1-e3", tipo:"vacio", relacion:"Resiliencia", fuente:"inferencia", articulo:null, pagina:null, cita:null,
    analisis:"Las Áreas de Resiliencia Climática no tienen ningún puente confirmado hacia las Zonas Industriales u otro componente de la ESECI, pese a que estas últimas son, típicamente, infraestructura de alto impacto ambiental." },
  { s:"rios", t:"sistema_de_sitios_sagrados", cat:"e1-e4", tipo:"vacio", relacion:"Soporte", fuente:"inferencia", articulo:null, pagina:null, cita:null,
    analisis:"No hay relación registrada que conecte el Sistema Hídrico con los Sitios Sagrados o el patrimonio de la EIP, aunque el centro histórico de Bogotá se fundó junto a los ríos San Francisco/Vicachá, hoy canalizados." },
  { s:"distrito_centro_tecnologico_e_innovacion", t:"patrimonio_natural", cat:"e3-e4", tipo:"vacio", relacion:"Soporte", fuente:"inferencia", articulo:null, pagina:null, cita:null,
    analisis:"Ningún puente confirmado entre los componentes económicos de la ESECI y la protección patrimonial de la EIP, pese a que la presión inmobiliaria/comercial sobre zonas patrimoniales es un conflicto documentado (La Candelaria, Chapinero)." },
];

/* ==========================================================
   GRADO REAL — de aquí sale cuáles son los hubs, no de una
   categoría administrativa. Los "vacío" NO cuentan como conexión.
   ========================================================== */
function computeDegrees() {
  const deg = {};
  ODS_NODES.forEach(n => { deg[n.id] = 0; });
  RAW_EDGES.forEach(e => {
    if (e.tipo === "vacio") return;
    if (deg[e.s] === undefined || deg[e.t] === undefined) return;
    deg[e.s]++; deg[e.t]++;
  });
  return deg;
}

/* ==========================================================
   LAYOUT — hub-y-satélites por estructura (como la referencia
   "El POT Implícito"): cada una de las 4 estructuras tiene un centro
   propio bien separado de los otros 3, con su nodo de mayor grado en
   el centro y el resto de sus componentes distribuidos en anillos
   concéntricos alrededor — así las líneas hub→satélite quedan como
   rayos bien visibles, sin nodos apilados unos sobre otros.
   Los "vacío" (ausencias entre estructuras) quedan como líneas largas
   que cruzan de un centro a otro, igual que en la referencia.
   ========================================================== */
// Lienzo panorámico — los 4 hubs en disposición de diamante amplio, con
// espacio suficiente para que cada satélite muestre su ícono + nombre
// completo sin solaparse con los demás.
const HUMEDALES_RED_IMG_B64 = "data:image/webp;base64,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";

const CANVAS = { w: 3800, h: 3300 };
const HUB_CENTERS = {
  e1: { x: 1550, y: 1250 },  // Ecológica Principal — noroccidente
  e2: { x: 2350, y: 1270 },  // Funcional y del Cuidado — nororiente
  e3: { x: 1600, y: 2000 },  // Socioeconómica Creativa — suroccidente (subida para cerrar el hueco central)
  e4: { x: 2300, y: 1980 },  // Integradora de Patrimonio — suroriente
};

function layoutNetwork() {
  const deg = computeDegrees();
  ODS_NODES.forEach(n => {
    n.color = STRUCT_STYLE[n.cat].color;
    n.vx = 0; n.vy = 0; n.fixed = false; n.isMainHub = false;
    const d = deg[n.id] || 0;
    n.r = 32 + Math.pow(d, 1.25) * 7.5; // radio "temático" (sale del grado real) — bolas notablemente más chicas para que la red respire, conservando legibilidad de ícono+nombre
    n._deg = d;
  });

  const nodes = ODS_NODES;

  // ---- 1. Layout radial determinístico por estructura ----
  ["e1", "e2", "e3", "e4"].forEach(cat => {
    const center = HUB_CENTERS[cat];
    const group = nodes.filter(n => n.cat === cat).sort((a, b) => b._deg - a._deg);
    if (!group.length) return;

    const hub = group[0];
    hub.x = center.x; hub.y = center.y; hub.isMainHub = true;
    hub.collR = hub.r; // el hub ocupa su radio temático completo
    const rest = group.slice(1);
    rest.forEach(n => { n.collR = n.r; }); // satélite: también dibuja su círculo+texto completo (radio real, no un punto)

    // hasta 3 anillos concéntricos según grado real, para que los componentes
    // algo conectados queden más cerca del hub y los periféricos más lejos —
    // igual lectura visual que la referencia (satélites bien separados, cada
    // uno con su propio nombre visible).
    const ringHigh = rest.filter(n => n._deg >= 3);
    const ringMid  = rest.filter(n => n._deg === 1 || n._deg === 2);
    const ringLow  = rest.filter(n => n._deg === 0);

    const GAP = 58;
    function placeRing(ringNodes, minRadius, angleSpan, angleStart) {
      if (!ringNodes.length) return minRadius;
      const sumDiam = ringNodes.reduce((s, n) => s + 2 * n.collR + GAP, 0);
      const neededR = Math.max(minRadius, sumDiam / angleSpan);
      ringNodes.forEach((n, i) => {
        const angle = angleStart + ((i + 0.5) / ringNodes.length) * angleSpan;
        n.x = center.x + Math.cos(angle) * neededR;
        n.y = center.y + Math.sin(angle) * neededR;
      });
      return neededR;
    }

    // ángulo "hacia afuera" del centro del canvas: cada estructura abre su
    // abanico de satélites hacia el borde del lienzo, no hacia el centro,
    // para que las 4 estructuras no se invadan entre sí. El ancho del abanico
    // escala con la cantidad de satélites — pocos nodos = abanico angosto
    // apuntando derecho hacia afuera; muchos nodos = abanico más amplio.
    const cx = CANVAS.w / 2, cy = CANVAS.h / 2;
    const outward = Math.atan2(center.y - cy, center.x - cx) || 0;
    hub._outwardAngle = outward;
    const n = rest.length;
    const angleSpan = Math.min(Math.PI * 1.6, Math.PI * 0.5 + n * (Math.PI / 10));
    const angleStart = outward - angleSpan / 2;

    const rHigh = placeRing(ringHigh, hub.r + 130, angleSpan, angleStart);
    const rMid = placeRing(ringMid, rHigh + (ringHigh[0] ? Math.max(...ringHigh.map(n => n.r)) : 0) + 105, angleSpan, angleStart);
    placeRing(ringLow, rMid + (ringMid[0] ? Math.max(...ringMid.map(n => n.r)) : 0) + 95, angleSpan, angleStart);
  });

  // ---- 2. Resolución de colisiones por radio real (red de seguridad) ----
  // El layout radial ya evita casi toda superposición por diseño; esta pasada
  // solo destraba los pocos casos límite entre anillos vecinos o estructuras
  // cercanas, sin mover la red entera. PAD generoso: garantiza aire visible
  // entre cualquier par de bolas, para que las líneas siempre se vean bien.
  const PAD = 40;
  for (let pass = 0; pass < 120; pass++) {
    let anyOverlap = false;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        if (a.isMainHub && b.isMainHub) continue; // no mover los 4 hubs principales entre sí
        let dx = b.x - a.x, dy = b.y - a.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const minDist = a.collR + b.collR + PAD;
        if (dist < minDist) {
          anyOverlap = true;
          const overlap = (minDist - dist) / 2;
          const ux = dx / dist, uy = dy / dist;
          a.x -= ux * overlap; a.y -= uy * overlap;
          b.x += ux * overlap; b.y += uy * overlap;
        }
      }
    }
    nodes.forEach(n => {
      n.x = Math.max(n.collR + 20, Math.min(CANVAS.w - n.collR - 20, n.x));
      n.y = Math.max(n.collR + 20, Math.min(CANVAS.h - n.collR - 20, n.y));
    });
    if (!anyOverlap) break;
  }

  nodes.forEach(n => { n.homeX = n.x; n.homeY = n.y; });
}
layoutNetwork();

RAW_EDGES.forEach(edge => {
  const s = nodeById(edge.s), t = nodeById(edge.t);
  if (!s || !t) { console.warn("Arista con nodo inexistente:", edge.s, edge.t); return; }
  edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
});

/* ==========================================================
   La red es ESTÁTICA: sin zoom ni pan. El lienzo SVG se ajusta
   siempre por completo al contenedor mediante el viewBox fijo.
   ========================================================== */

/* -------- defs -------- */
function buildDefs(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");
  const uniqueColors = [...new Set(ODS_NODES.map(n => n.color))];
  uniqueColors.forEach(color => {
    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "glow-" + color.replace("#", ""));
    filter.setAttribute("x", "-60%"); filter.setAttribute("y", "-60%");
    filter.setAttribute("width", "220%"); filter.setAttribute("height", "220%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3"); blur.setAttribute("result", "blur");
    const merge = document.createElementNS(SVG_NS, "feMerge");
    ["blur", "blur", "SourceGraphic"].forEach(ref => {
      const m = document.createElementNS(SVG_NS, "feMergeNode"); m.setAttribute("in", ref); merge.appendChild(m);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });
  // marcadores de flecha: solo 2 colores en toda la red — Soporte (naranja) y Resiliencia (azul).
  // "vacío" NO usa un tercer color: hereda el color de su propia dimensión Soporte/Resiliencia,
  // y se distingue únicamente por el estilo de línea (punteado disperso, ver drawEdges).
  const arrowColors = { "Soporte": RELACION_STYLE.Soporte.color, "Resiliencia": RELACION_STYLE.Resiliencia.color };
  Object.entries(arrowColors).forEach(([key, color]) => {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", "arrow-" + key);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8"); marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6"); marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto-start-reverse");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", "M0,0 L10,5 L0,10 z");
    path.setAttribute("fill", color);
    marker.appendChild(path);
    defs.appendChild(marker);
  });
  svg.appendChild(defs);
}

/* ==========================================================
   FONDO DE MAPA — silueta ESQUEMÁTICA de Bogotá D.C. (perímetro urbano +
   cerros orientales), trazada a mano sobre puntos de referencia conocidos
   de la forma general de la ciudad (alargada norte-sur, borde oriental
   recto por los Cerros, borde occidental más irregular por el río Bogotá
   y los humedales). Es una aproximación decorativa, NO cartografía oficial
   georreferenciada (no reemplaza IDECA/SDP) — se indica así en el title
   del ícono de escala, para no reclamar una precisión que no tenemos.
   La textura de "terreno" se genera con feTurbulence (ruido procedural),
   igual de forma al look de foto-satelital oscura de la referencia.
   ========================================================== */
function buildMapBackground(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "map-bg-layer");

  const cx = CANVAS.w / 2, cy = CANVAS.h / 2;
  // silueta esquemática: alargada N-S, borde oriental (derecha) casi recto,
  // borde occidental más irregular. Puntos en sentido horario desde el norte.
  const shapePts = [
    [0.30,0.02],[0.45,0.03],[0.55,0.05],[0.62,0.10],[0.66,0.16],
    [0.70,0.20],[0.72,0.27],[0.70,0.33],[0.74,0.38],[0.71,0.44],
    [0.75,0.50],[0.72,0.56],[0.76,0.62],[0.73,0.68],[0.70,0.74],
    [0.66,0.80],[0.60,0.86],[0.52,0.91],[0.44,0.95],[0.36,0.98],
    [0.28,0.96],[0.22,0.90],[0.20,0.82],[0.15,0.76],[0.18,0.68],
    [0.12,0.62],[0.16,0.55],[0.10,0.48],[0.14,0.41],[0.09,0.34],
    [0.13,0.27],[0.10,0.20],[0.15,0.13],[0.20,0.07],[0.26,0.03],
  ];
  const pts = shapePts.map(([px, py]) => ({ x: px * CANVAS.w, y: py * CANVAS.h }));

  function smoothClosedPath(points) {
    let d = "";
    const n = points.length;
    const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
    const start = mid(points[n - 1], points[0]);
    d += `M${start.x},${start.y} `;
    for (let i = 0; i < n; i++) {
      const p = points[i], next = points[(i + 1) % n];
      const m = mid(p, next);
      d += `Q${p.x},${p.y} ${m.x},${m.y} `;
    }
    d += "Z";
    return d;
  }

  const blobPath = smoothClosedPath(pts);
  const blobId = "mapBlobShape";

  const defs = document.createElementNS(SVG_NS, "defs");
  const clip = document.createElementNS(SVG_NS, "clipPath");
  clip.setAttribute("id", blobId + "-clip");
  const clipPath = document.createElementNS(SVG_NS, "path");
  clipPath.setAttribute("d", blobPath);
  clip.appendChild(clipPath);
  defs.appendChild(clip);

  // textura de "terreno" procedural (ruido) — imita el look foto-satelital
  // oscuro y rugoso de la referencia, sin pretender ser datos reales de elevación.
  const filter = document.createElementNS(SVG_NS, "filter");
  filter.setAttribute("id", "terrainNoise");
  filter.setAttribute("x", "-5%"); filter.setAttribute("y", "-5%");
  filter.setAttribute("width", "110%"); filter.setAttribute("height", "110%");
  const turb = document.createElementNS(SVG_NS, "feTurbulence");
  turb.setAttribute("type", "fractalNoise");
  turb.setAttribute("baseFrequency", "0.012 0.018");
  turb.setAttribute("numOctaves", "4");
  turb.setAttribute("seed", "7");
  turb.setAttribute("result", "noise");
  const colorMatrix = document.createElementNS(SVG_NS, "feColorMatrix");
  colorMatrix.setAttribute("in", "noise");
  colorMatrix.setAttribute("type", "matrix");
  colorMatrix.setAttribute("values", "0 0 0 0 0.08  0 0 0 0 0.10  0 0 0 0 0.11  0 0 0 0.55 0");
  filter.appendChild(turb); filter.appendChild(colorMatrix);
  defs.appendChild(filter);
  g.appendChild(defs);

  // relleno base oscuro de la silueta
  const fill = document.createElementNS(SVG_NS, "path");
  fill.setAttribute("d", blobPath);
  fill.setAttribute("fill", "#111111");
  g.appendChild(fill);

  // textura de terreno, recortada a la silueta
  const noiseRect = document.createElementNS(SVG_NS, "rect");
  noiseRect.setAttribute("x", "0"); noiseRect.setAttribute("y", "0");
  noiseRect.setAttribute("width", CANVAS.w); noiseRect.setAttribute("height", CANVAS.h);
  noiseRect.setAttribute("filter", "url(#terrainNoise)");
  noiseRect.setAttribute("clip-path", `url(#${blobId}-clip)`);
  g.appendChild(noiseRect);

  // viñeta radial suave (oscurece bordes, ilumina centro — como la referencia)
  const vignette = document.createElementNS(SVG_NS, "radialGradient");
  vignette.setAttribute("id", "mapVignette");
  vignette.setAttribute("cx", "50%"); vignette.setAttribute("cy", "42%"); vignette.setAttribute("r", "65%");
  const stop1 = document.createElementNS(SVG_NS, "stop");
  stop1.setAttribute("offset", "0%"); stop1.setAttribute("stop-color", "#1a1a1a"); stop1.setAttribute("stop-opacity", "0.3");
  const stop2 = document.createElementNS(SVG_NS, "stop");
  stop2.setAttribute("offset", "100%"); stop2.setAttribute("stop-color", "#000000"); stop2.setAttribute("stop-opacity", "0.55");
  vignette.appendChild(stop1); vignette.appendChild(stop2);
  defs.appendChild(vignette);
  const vignetteRect = document.createElementNS(SVG_NS, "rect");
  vignetteRect.setAttribute("x", "0"); vignetteRect.setAttribute("y", "0");
  vignetteRect.setAttribute("width", CANVAS.w); vignetteRect.setAttribute("height", CANVAS.h);
  vignetteRect.setAttribute("fill", "url(#mapVignette)");
  vignetteRect.setAttribute("clip-path", `url(#${blobId}-clip)`);
  g.appendChild(vignetteRect);

  // borde de la silueta
  const outline = document.createElementNS(SVG_NS, "path");
  outline.setAttribute("d", blobPath);
  outline.setAttribute("fill", "none");
  outline.setAttribute("stroke", "rgba(200,200,200,0.22)");
  outline.setAttribute("stroke-width", "1.5");
  g.appendChild(outline);

  svg.appendChild(g);
}

/* ==========================================================
   MESH AMBIENTAL — puntos y líneas finas de fondo, puramente decorativos
   (NO son los 40 componentes reales, que se dibujan aparte en drawNodes).
   Dan la densidad visual de "mesh de ciudad" de la referencia sin mezclar
   datos reales con relleno visual. Coordenadas fijas (no aleatorias) para
   que el resultado sea reproducible en cada carga.
   ========================================================== */
function buildAmbientMesh(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "ambient-mesh-layer");
  g.setAttribute("opacity", "0.5");

  // grilla fija con offset determinístico (sin Math.random) para look orgánico
  const seedPts = [];
  const cols = 14, rows = 16;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const baseX = (i + 0.5) / cols * CANVAS.w;
      const baseY = (j + 0.5) / rows * CANVAS.h;
      const jitterX = (((i * 37 + j * 19) % 23) - 11) * 6;
      const jitterY = (((i * 17 + j * 41) % 29) - 14) * 6;
      seedPts.push({ x: baseX + jitterX, y: baseY + jitterY, idx: i * rows + j });
    }
  }
  // colores ambientales: ciclan entre los 4 colores de estructura para dar
  // la sensación de "mesh multicolor" de la referencia
  const palette = ["#5cd6d1", "#ef9f54", "#fac47b", "#fb8d84"];

  // líneas finas entre puntos cercanos (umbral de distancia)
  const THRESH = 230;
  for (let i = 0; i < seedPts.length; i++) {
    for (let j = i + 1; j < seedPts.length; j++) {
      const a = seedPts[i], b = seedPts[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < THRESH && (a.idx + b.idx) % 3 !== 0) {
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
        line.setAttribute("x2", b.x); line.setAttribute("y2", b.y);
        line.setAttribute("stroke", palette[a.idx % 4]);
        line.setAttribute("stroke-width", "0.6");
        line.setAttribute("opacity", "0.22");
        g.appendChild(line);
      }
    }
  }
  seedPts.forEach(p => {
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y);
    dot.setAttribute("r", (p.idx % 5 === 0) ? 3.2 : 1.8);
    dot.setAttribute("fill", palette[p.idx % 4]);
    dot.setAttribute("opacity", (p.idx % 5 === 0) ? "0.55" : "0.4");
    g.appendChild(dot);
  });

  svg.appendChild(g);
}

// Color del trazo: SOLO 2 colores en toda la red — Soporte (naranja) y Resiliencia (azul).
// El estilo de línea (sólida+flecha / punteada / punteada dispersa) es lo que distingue
// directa / indirecta / vacío — nunca el color.
function edgeColor(edge) {
  return (edge.relacion && RELACION_STYLE[edge.relacion]) ? RELACION_STYLE[edge.relacion].color : RELACION_STYLE.Soporte.color;
}
function arrowMarkerId(edge) {
  if (edge.relacion) return "arrow-" + edge.relacion;
  return null;
}

function edgePathData(edge, s, t) {
  const dx = t.x - s.x, dy = t.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  const startPad = (s.collR || s.r) + 2, endPad = (t.collR || t.r) + 6;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad, y2 = t.y - uy * endPad;
  return `M${x1},${y1} L${x2},${y2}`;
}

function drawEdges(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edges-layer");
  RAW_EDGES.forEach((edge, i) => {
    // Las relaciones "vacío" (ausencias documentadas entre estructuras) ya NO
    // se dibujan en la red visual — quedan solo como hallazgo en la tabla y en
    // las tarjetas de "hallazgos clave", para que la red se lea limpia con
    // únicamente relaciones reales (directa/indirecta).
    if (edge.tipo === "vacio") return;
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const color = edgeColor(edge);
    const d = edgePathData(edge, s, t);

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "edge-group edge-" + edge.tipo);
    group.setAttribute("data-index", i);
    group.setAttribute("data-type", edge.tipo);
    group.setAttribute("data-cat", edge.cat);
    group.setAttribute("data-source", edge.s);
    group.setAttribute("data-target", edge.t);
    group.style.setProperty("--edge-color", color);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.setAttribute("d", d); hit.setAttribute("class", "ods-edge edge-hit");

    const visual = document.createElementNS(SVG_NS, "path");
    visual.setAttribute("d", d);
    visual.setAttribute("class", "ods-edge edge-visual");
    visual.setAttribute("stroke", color);
    visual.setAttribute("stroke-width", edge.tipo === "vacio" ? 2.6 : edge.tipo === "directa" ? 2.2 : 1.4);
    if (edge.tipo !== "directa") visual.setAttribute("stroke-dasharray", edge.tipo === "vacio" ? "2,7" : "5,4");
    const markerId = arrowMarkerId(edge);
    if (markerId) visual.setAttribute("marker-end", `url(#${markerId})`);
    visual.setAttribute("opacity", edge.tipo === "indirecta" ? "0.55" : edge.tipo === "vacio" ? "0.8" : "0.95");

    group.appendChild(visual); group.appendChild(hit);
    group.addEventListener("click", (ev) => { ev.stopPropagation(); showEdgeInfo(i); });
    g.appendChild(group);
    edge._el = { visual, hit, d };
  });
  svg.appendChild(g);
}

// Estilo "referencia": solo los 4 hubs principales llevan ícono + etiqueta de texto
// al lado (igual que "Humedales", "Actuaciones estratégicas", etc. en la imagen).
// El resto de los 36 componentes reales se muestran como puntos de color sólido,
// sin texto dentro — igual que los puntitos del mesh de fondo de la referencia —
// para no saturar la vista; su ficha completa sigue disponible al hacer clic.
// TODOS los nodos (hub y satélite) llevan círculo con anillo + ícono + nombre
// dentro — el tamaño (radio, ícono, texto) escala con el grado real, así que
// los hubs se leen mucho más grandes que la periferia sin dejar de mostrar
// la etiqueta de cada componente.
function drawNodes(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "nodes-layer");
  ODS_NODES.forEach(node => {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "ods-node ods-node-" + node.cat + (node.isMainHub ? " ods-hub" : " ods-satellite"));
    group.setAttribute("data-id", node.id);
    group.setAttribute("data-cat", node.cat);

    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("class", "node-ring" + (node.isMainHub ? " node-ring-hub" : ""));
    circle.setAttribute("cx", node.x); circle.setAttribute("cy", node.y); circle.setAttribute("r", node.r);
    circle.setAttribute("fill", "#0a0a0a");
    circle.setAttribute("stroke", node.color);
    circle.setAttribute("stroke-width", node.isMainHub ? 2.5 : 1.6);
    circle.setAttribute("filter", "url(#glow-" + node.color.replace("#", "") + ")");

    const fo = document.createElementNS(SVG_NS, "foreignObject");
    const size = node.r * 1.8;
    fo.setAttribute("x", node.x - size / 2); fo.setAttribute("y", node.y - size / 2);
    fo.setAttribute("width", size); fo.setAttribute("height", size);

    const wrapper = document.createElementNS(XHTML_NS, "div");
    wrapper.setAttribute("style", "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;pointer-events:none;padding:2px;");

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon);
    iconEl.setAttribute("style", `color:${node.color}; font-size:${Math.max(node.r * (node.isMainHub ? 0.42 : 0.34), 15)}px;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.16, 15)}px; padding:0 3px; font-weight:700; color:#f2f3f6; line-height:1.15; white-space:pre-line; text-align:center; font-family:'Inter',sans-serif;`);
    nameEl.textContent = node.name;

    wrapper.appendChild(iconEl); wrapper.appendChild(nameEl);
    fo.appendChild(wrapper);
    group.appendChild(circle); group.appendChild(fo);
    attachNodeClickHandler(group, node.id);
    attachNodeDragHandler(group, node);
    g.appendChild(group);
    node._el = { group, circle, fo };
  });
  svg.appendChild(g);
}

/* -------- física de interacción (arrastre) -------- */
const PHYSICS = { spring: 0.045, anchor: 0.02, damping: 0.82, minVel: 0.02 };

function updatePositions() {
  ODS_NODES.forEach(n => {
    if (!n._el) return;
    n._el.circle.setAttribute("cx", n.x); n._el.circle.setAttribute("cy", n.y);
    const size = n.r * 1.8;
    n._el.fo.setAttribute("x", n.x - size / 2); n._el.fo.setAttribute("y", n.y - size / 2);
  });
  RAW_EDGES.forEach(edge => {
    if (!edge._el) return;
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const d = edgePathData(edge, s, t);
    edge._el.visual.setAttribute("d", d); edge._el.hit.setAttribute("d", d);
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
    n.vx *= PHYSICS.damping; n.vy *= PHYSICS.damping;
    n.x += n.vx; n.y += n.vy;
    if (Math.abs(n.vx) > PHYSICS.minVel || Math.abs(n.vy) > PHYSICS.minVel) moving = true;
  });
  updatePositions();
  if (moving || ODS_NODES.some(n => n.fixed)) requestAnimationFrame(physicsStep);
  else physicsRunning = false;
}
function wakePhysics() { if (!physicsRunning) { physicsRunning = true; requestAnimationFrame(physicsStep); } }

function attachNodeDragHandler(group, node) {
  const svg = document.getElementById("networkViz");
  let dragging = false, moved = false, startClientX = 0, startClientY = 0;
  function toSvgPoint(clientX, clientY) {
    const pt = svg.createSVGPoint(); pt.x = clientX; pt.y = clientY;
    const m = svg.getScreenCTM().inverse();
    return pt.matrixTransform(m);
  }
  group.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    dragging = true; moved = false; startClientX = e.clientX; startClientY = e.clientY;
    node.fixed = true; group.classList.add("dragging"); group.setPointerCapture(e.pointerId); wakePhysics();
  });
  group.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    if (Math.hypot(e.clientX - startClientX, e.clientY - startClientY) > 4) moved = true;
    const p = toSvgPoint(e.clientX, e.clientY);
    node.x = p.x; node.y = p.y; node.vx = 0; node.vy = 0;
    updatePositions(); wakePhysics();
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false; node.fixed = false; group.classList.remove("dragging");
    try { group.releasePointerCapture(e.pointerId); } catch (err) {}
    wakePhysics();
    if (moved) { group.dataset.suppressClick = "1"; setTimeout(() => { delete group.dataset.suppressClick; }, 0); }
  }
  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
}

function renderNetwork() {
  const svg = document.getElementById("networkViz");
  if (!svg) return;
  svg.innerHTML = "";
  buildDefs(svg); buildAmbientMesh(svg); drawEdges(svg); drawNodes(svg);
}

/* -------- paneles de información -------- */
function fuenteBadgeHTML(fuente) {
  const st = FUENTE_STYLE[fuente] || FUENTE_STYLE.inferencia;
  return `<span class="fuente-badge" style="color:${st.color};background:${st.color}22;border:1px solid ${st.color}55;"><i class="fa-solid ${st.icon}"></i> ${st.label}</span>`;
}
function relacionBadgeHTML(relacion) {
  if (!relacion || !RELACION_STYLE[relacion]) return "";
  const st = RELACION_STYLE[relacion];
  return `<span class="fuente-badge" style="color:${st.color};background:${st.color}22;border:1px solid ${st.color}55;"><i class="fa-solid fa-arrow-right-arrow-left"></i> ${st.label}</span>`;
}

function showEdgeInfo(index) {
  const edge = RAW_EDGES[index];
  const s = nodeById(edge.s), t = nodeById(edge.t);
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelector(`.edge-group[data-index="${index}"]`)?.classList.add("edge-selected");
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));

  const label = (n) => n.name.replace(/\n/g, " ");
  document.getElementById("edgeInfoTitle").textContent = `${label(s)} → ${label(t)}`;
  const typeEl = document.getElementById("edgeInfoType");
  const color = edgeColor(edge);
  typeEl.innerHTML = TYPE_STYLE[edge.tipo].label + (edge.cat ? " · " + edge.cat.toUpperCase() : "");
  typeEl.style.color = color; typeEl.style.background = color + "26";

  document.getElementById("edgeInfoFuente").innerHTML = fuenteBadgeHTML(edge.fuente) + " " + relacionBadgeHTML(edge.relacion);
  document.getElementById("edgeInfoQuote").textContent = edge.cita ? edge.cita : "(No hay cita literal disponible para esta relación — ver análisis abajo.)";
  document.getElementById("edgeInfoAnalisis").textContent = edge.analisis || "";
  document.getElementById("edgeInfoPage").textContent = (edge.articulo ? edge.articulo : "Sin artículo específico") + (edge.pagina ? ` · p. ${edge.pagina}` : "");
  document.getElementById("edgeInfoPanel").classList.add("visible");
  document.getElementById("nodeInfoPanel")?.classList.remove("visible");

  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.toggle("row-highlight", Number(row.dataset.edge) === index));
}
function hideEdgeInfo() {
  document.getElementById("edgeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".edge-group").forEach(el => el.classList.remove("edge-selected"));
  document.querySelectorAll(".matrix-row[data-edge]").forEach(row => row.classList.remove("row-highlight"));
}

function showNodeInfo(id) {
  if (id === "humedales") {
    showHumedalesOverlay();
    return;
  }
  const node = nodeById(id);
  if (!node) return;
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
  document.querySelector(`.ods-node[data-id="${id}"]`)?.classList.add("node-selected");

  const deg = computeDegrees()[id] || 0;
  document.getElementById("nodeInfoTitle").textContent = node.name.replace(/\n/g, " ") + (node.suplementario ? " (suplementario)" : "");
  document.getElementById("nodeInfoStruct").innerHTML = `<span class="swatch-tag" style="background:${node.color}"></span> ${STRUCT_STYLE[node.cat].label} · grado real: ${deg}`;
  document.getElementById("nodeInfoFuente").innerHTML = fuenteBadgeHTML(node.fuente);

  // artículo/página/cita: se toman de la primera arista de este nodo que tenga la mejor evidencia disponible
  const relEdges = RAW_EDGES.filter(e => e.s === id || e.t === id);
  const bestEdge = relEdges.find(e => e.fuente === "cita_literal") || relEdges[0];
  document.getElementById("nodeInfoArticulo").textContent = bestEdge ? (bestEdge.articulo || "—") + (bestEdge.pagina ? ` · p. ${bestEdge.pagina}` : "") : "—";
  document.getElementById("nodeInfoQuote").textContent = bestEdge && bestEdge.cita ? bestEdge.cita : "(Sin cita literal verificada para este componente — ver relaciones asociadas en la tabla.)";
  document.getElementById("nodeInfoNota").textContent = node.suplementario
    ? "Nodo suplementario: no forma parte de la Matriz completa (Excel) del equipo, pero se incluye por su valor narrativo para el hallazgo 'general vs. particular'."
    : (bestEdge ? bestEdge.analisis || "" : "");

  document.getElementById("nodeInfoMapaWrap").style.display = "none";

  document.getElementById("nodeInfoPanel").classList.add("visible");
  document.getElementById("edgeInfoPanel")?.classList.remove("visible");
}

// ---- Vista ampliada de "Humedales": sustituye la red principal, en el mismo
// espacio del lienzo, por la foto de la sub-red de humedales (aportada por la
// usuaria) con hotspots clicables sobre cada humedal individual. Al hacer clic
// en un hotspot se muestra su cita literal + página del POT en la ficha lateral. ----
const HUMEDALES_CASOS = {
  torca_guaymaral: { nombre: "Humedal Torca–Guaymaral", x: 59.6, y: 11.4,
    cita: "La Reserva Forestal Thomas van der Hammen incluye los Humedales de La Conejera y Torca-Guaymaral.", pagina: "56" },
  la_conejera: { nombre: "Humedal La Conejera", x: 40.0, y: 29.9,
    cita: "La Reserva Forestal Thomas van der Hammen incluye los Humedales de La Conejera y Torca-Guaymaral. 11 de los humedales de Bogotá, como el de La Conejera, tienen certificación Ramsar, la máxima distinción internacional en la conservación de estos ecosistemas.", pagina: "56 · 77" },
  tibabuyes: { nombre: "Humedal Tibabuyes", x: 40.35, y: 40.2,
    cita: "Peñalosa consideró útil endurecer el humedal Tibabuyes y, orgulloso de su obra, decidió continuarla en su segundo mandato superponiéndole una ciclovía de concreto.", pagina: null,
    conclusion: "El polígono es útil para establecer límites jurídicos, responsabilidades y restricciones de uso, pero es insuficiente para representar todo lo que ocurre en el humedal. No muestra por sí solo los flujos de agua, los cambios estacionales, los recorridos de las especies, los usos comunitarios ni las presiones de la infraestructura." },
  ciclorutas_humedal: { nombre: "Ciclorutas sobre el sistema de humedales", x: 45.0, y: 47.5,
    cita: "Peñalosa consideró útil endurecer el humedal Tibabuyes y, orgulloso de su obra, decidió continuarla en su segundo mandato superponiéndole una ciclovía de concreto.", pagina: null },
  cordoba: { nombre: "Humedal Córdoba", x: 51.5, y: 54.5,
    cita: "Humedal Córdoba regula el agua, previene inundaciones y es el hogar de las aves, murciélagos e insectos que polinizan nuestras plantas.", pagina: "56" },
  santa_maria_del_lago: { nombre: "Humedal Santa María del Lago", x: 45.9, y: 58.3,
    cita: "La transferencia de derechos de construcción y desarrollo de predios ubicados en suelo de protección nos permite asegurar mejores condiciones para la preservación de ecosistemas como el humedal Santa María del Lago, en la localidad de Engativá.", pagina: "221–222" },
  fauna_y_flora: { nombre: "Fauna y flora asociada al sistema de humedales", x: 49.25, y: 59.9,
    cita: "El POT reconoce 15 humedales en Bogotá. Estos son los casos que el POT desarrolla o nombra de manera específica en los fragmentos analizados; esto no significa que sean los únicos humedales existentes, sino que son los que reciben mayor visibilidad dentro del documento.", pagina: "77" },
  suelo_de_proteccion: { nombre: "Suelo de protección", x: 44.85, y: 64.3,
    cita: "La transferencia de derechos de construcción y desarrollo de predios ubicados en suelo de protección nos permite asegurar mejores condiciones para la preservación de ecosistemas como el humedal Santa María del Lago, en la localidad de Engativá.", pagina: "221–222" },
  malla_via: { nombre: "Malla vial (conflicto con Capellanía)", x: 39.75, y: 67.6,
    cita: "Con respecto a los humedales de la ciudad, dentro del POT únicamente se identificó un conflicto de malla vial arterial con la Reserva Distrital de Humedal Capellanía, en Fontibón.", pagina: "49–50" },
  capellania: { nombre: "Humedal Capellanía", x: 35.15, y: 72.4,
    cita: "Para permitir el paso de la vía, el POT plantea reducir parte del ecosistema y modificar sus áreas. Capellanía pasa de 27,03 hectáreas a 29,32 hectáreas mediante una operación de sustracción y ampliación en otros sectores.", pagina: "49–50" },
  la_vaca: { nombre: "Humedal La Vaca", x: 35.15, y: 93.4,
    cita: "El Humedal La Vaca, en Patio Bonito, parte de una antigua laguna muisca gobernada por el cacique Techovita, es un reservorio de agua, plantas y animales protegido por la comunidad.", pagina: "103" },
};

function showHumedalesOverlay() {
  hideNodeInfo();
  hideEdgeInfo();
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
  document.querySelector('.ods-node[data-id="humedales"]')?.classList.add("node-selected");

  const body = document.getElementById("humedalesOverlayBody");
  const hotspotsHTML = Object.entries(HUMEDALES_CASOS).map(([key, c]) => `
    <button type="button" class="humedal-hotspot" data-key="${key}" style="left:${c.x}%; top:${c.y}%;" title="${c.nombre}">
      <span class="humedal-hotspot-dot"></span>
    </button>
  `).join("");

  body.innerHTML = `
    <div class="humedales-overlay-image-wrap">
      <img src="${HUMEDALES_RED_IMG_B64}" alt="Mapa-red de humedales de Bogotá con sus relaciones" class="humedales-overlay-image" />
      ${hotspotsHTML}
    </div>
    <div class="humedales-overlay-sidebar" id="humedalesOverlaySidebar">
      <div class="humedal-ramsar">
        <div class="humedal-caso-cita">"11 de los humedales de Bogotá, como el de La Conejera, tienen certificación Ramsar, la máxima distinción internacional en la conservación de estos ecosistemas."</div>
        <div class="humedal-caso-pagina">POT, p. 77 · El POT reconoce 15 humedales en Bogotá — estos son los casos que desarrolla o nombra de forma específica en los fragmentos analizados; no implica que sean los únicos existentes, sino los de mayor visibilidad dentro del documento.</div>
      </div>
      <div class="humedal-hint">Haz clic en cualquier punto del mapa para ver la cita y la página del POT.</div>
    </div>
  `;

  body.querySelectorAll(".humedal-hotspot").forEach(btn => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const key = btn.dataset.key;
      showHumedalCasoDetalle(key);
      body.querySelectorAll(".humedal-hotspot").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  document.querySelector(".network-canvas").style.display = "none";
  document.getElementById("humedalesOverlay").style.display = "flex";
}

function showHumedalCasoDetalle(key) {
  const c = HUMEDALES_CASOS[key];
  const sidebar = document.getElementById("humedalesOverlaySidebar");
  if (!c || !sidebar) return;
  sidebar.innerHTML = `
    <div class="humedal-caso humedal-caso-detalle">
      <div class="humedal-caso-nombre">${c.nombre}</div>
      <div class="humedal-caso-cita">"${c.cita}"</div>
      <div class="humedal-caso-pagina">POT${c.pagina ? ", p. " + c.pagina : ""}</div>
    </div>
    ${c.conclusion ? `<div class="humedal-conclusion">${c.conclusion}</div>` : ""}
    <button type="button" class="humedal-back-btn" id="humedalBackBtn">&larr; Ver todos los humedales</button>
  `;
  document.getElementById("humedalBackBtn")?.addEventListener("click", () => showHumedalesOverlay());
}

function hideHumedalesOverlay() {
  document.getElementById("humedalesOverlay").style.display = "none";
  document.querySelector(".network-canvas").style.display = "";
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
}

function hideNodeInfo() {
  document.getElementById("nodeInfoPanel").classList.remove("visible");
  document.querySelectorAll(".ods-node").forEach(el => el.classList.remove("node-selected"));
}

/* -------- visibilidad / leyenda -------- */
const typeOff = new Set(), nodeOff = new Set(), catOff = new Set();
function refreshEdgeVisibility() {
  document.querySelectorAll(".edge-group").forEach(group => {
    const type = group.dataset.type, cat = group.dataset.cat, s = group.dataset.source, t = group.dataset.target;
    const catBits = cat.split("-");
    const hidden = typeOff.has(type) || nodeOff.has(s) || nodeOff.has(t) || catBits.some(c => catOff.has(c));
    group.classList.toggle("hidden-edge", hidden);
  });
  document.querySelectorAll(".ods-node").forEach(node => {
    const cat = node.dataset.cat;
    node.classList.toggle("hidden-node", nodeOff.has(node.dataset.id) || catOff.has(cat));
  });
}
function toggleNode(id) {
  const group = document.querySelector(`.ods-node[data-id="${id}"]`);
  if (!group) return;
  if (nodeOff.has(id)) { nodeOff.delete(id); group.classList.remove("node-off"); }
  else { nodeOff.add(id); group.classList.add("node-off"); }
  refreshEdgeVisibility();
}

function attachNodeClickHandler(group, id) {
  let count = 0, timer = null;
  group.addEventListener("click", (ev) => {
    ev.stopPropagation();
    if (group.dataset.suppressClick) return;
    count++;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (count === 1) showNodeInfo(id);
      else if (count === 2) toggleNode(id);
      else if (count >= 3) toggleNodeFlow(id);
      count = 0;
    }, 300);
  });
}

let spotlight = null;
function clearSpotlight() { spotlight = null; document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active")); applySpotlightState(); }
function setSpotlightNodes(nodeIds, expand) { spotlight = { mode:"nodes", nodes:new Set(nodeIds), expand:!!expand }; applySpotlightState(); }
function setSpotlightTypes(types) { spotlight = { mode:"types", types }; applySpotlightState(); }
function setSpotlightCats(cats) { spotlight = { mode:"cats", cats }; applySpotlightState(); }

function applySpotlightState() {
  let visibleNodes = null, visibleEdges = null;
  if (spotlight && spotlight.mode === "nodes") {
    visibleNodes = new Set(spotlight.nodes); visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => {
      const sIn = spotlight.nodes.has(edge.s), tIn = spotlight.nodes.has(edge.t);
      if (spotlight.expand) { if (sIn || tIn) { visibleEdges.add(i); visibleNodes.add(edge.s); visibleNodes.add(edge.t); } }
      else if (sIn && tIn) visibleEdges.add(i);
    });
  } else if (spotlight && spotlight.mode === "types") {
    visibleEdges = new Set(); visibleNodes = new Set();
    RAW_EDGES.forEach((edge, i) => { if (spotlight.types.includes(edge.tipo)) { visibleEdges.add(i); visibleNodes.add(edge.s); visibleNodes.add(edge.t); } });
  } else if (spotlight && spotlight.mode === "cats") {
    visibleNodes = new Set(); visibleEdges = new Set();
    RAW_EDGES.forEach((edge, i) => { if (spotlight.cats.some(c => edge.cat.split("-").includes(c))) { visibleEdges.add(i); visibleNodes.add(edge.s); visibleNodes.add(edge.t); } });
  }
  document.querySelectorAll(".ods-node").forEach(el => el.classList.toggle("node-focus-dim", visibleNodes ? !visibleNodes.has(el.dataset.id) : false));
  document.querySelectorAll(".edge-group").forEach(el => el.classList.toggle("edge-focus-dim", visibleEdges ? !visibleEdges.has(Number(el.dataset.index)) : false));
}
function toggleNodeFlow(id) {
  const already = spotlight && spotlight.mode === "nodes" && spotlight.expand && spotlight.nodes.size === 1 && spotlight.nodes.has(id);
  if (already) clearSpotlight(); else setSpotlightNodes([id], true);
}

function toggleInsight(key) {
  const card = document.querySelector(`.insight-card[data-insight="${key}"]`);
  if (!card) return;
  if (card.classList.contains("active")) { clearSpotlight(); return; }
  document.querySelectorAll(".insight-card").forEach(c => c.classList.remove("active"));
  if (key === "todas") { clearSpotlight(); return; }
  if (["directa","indirecta","vacio"].includes(key)) setSpotlightTypes([key]);
  else if (["e1","e2","e3","e4"].includes(key)) setSpotlightCats([key]);
  card.classList.add("active");
}

function setupLegendToggle() {
  document.querySelectorAll(".legend-item input").forEach(input => {
    input.addEventListener("change", (e) => {
      const item = e.target.closest(".legend-item");
      const mode = item.dataset.mode, val = item.dataset.type || item.dataset.cat;
      if (e.target.checked) { if (mode === "type") typeOff.delete(val); else catOff.delete(val); }
      else { if (mode === "type") typeOff.add(val); else catOff.add(val); }
      item.classList.toggle("off", !e.target.checked);
      refreshEdgeVisibility();
    });
  });
  document.getElementById("edgeInfoClose")?.addEventListener("click", hideEdgeInfo);
  document.getElementById("nodeInfoClose")?.addEventListener("click", hideNodeInfo);
  document.getElementById("humedalesOverlayClose")?.addEventListener("click", hideHumedalesOverlay);
}

/* -------- métricas -------- */
function computeMetrics() {
  const deg = computeDegrees();
  const nodeCount = ODS_NODES.length;
  const edgeCount = RAW_EDGES.length;
  const vacios = RAW_EDGES.filter(e => e.tipo === "vacio").length;
  const directas = RAW_EDGES.filter(e => e.tipo === "directa").length;
  const indirectas = RAW_EDGES.filter(e => e.tipo === "indirecta").length;
  const porFuente = { cita_literal:0, indice_oficial:0, fuente_secundaria:0, inferencia:0, inventario_pendiente:0 };
  [...ODS_NODES, ...RAW_EDGES].forEach(x => { if (x.fuente) porFuente[x.fuente] = (porFuente[x.fuente]||0)+1; });
  let maxId = null, maxDeg = -1;
  ODS_NODES.forEach(n => { if ((deg[n.id]||0) > maxDeg) { maxDeg = deg[n.id]||0; maxId = n.id; } });
  return { nodeCount, edgeCount, vacios, directas, indirectas, porFuente, deg, maxId, maxDeg };
}

function renderMetrics() {
  const m = computeMetrics();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("metricNodes", m.nodeCount);
  set("metricEdges", m.edgeCount);
  set("metricVacios", m.vacios);
  set("metricDirectas", m.directas);
  set("metricCitaLiteral", m.porFuente.cita_literal);
  set("metricIndiceOficial", m.porFuente.inventario_pendiente);
  set("metricInferencia", m.porFuente.inferencia);
  const hubNode = nodeById(m.maxId);
  set("metricHub", hubNode ? hubNode.name.replace(/\n/g," ") + ` (grado ${m.maxDeg})` : "—");

  Object.keys(STRUCT_STYLE).forEach(cat => {
    const el = document.getElementById("struct-" + cat);
    const nCount = ODS_NODES.filter(n => n.cat === cat).length;
    if (el) {
      el.textContent = String(nCount);
      const row = el.closest(".cat-item");
      if (row) row.title = `${STRUCT_STYLE[cat].label}: ${STRUCT_STYLE[cat].articulos} · ${nCount} componentes reales en la red`;
    }
  });
}

function renderMatrix() {
  const container = document.getElementById("matrixRows");
  if (!container) return;
  container.innerHTML = "";
  RAW_EDGES.forEach((edge, i) => {
    const s = nodeById(edge.s), t = nodeById(edge.t);
    if (!s || !t) return;
    const row = document.createElement("div");
    row.className = "matrix-row"; row.dataset.edge = i;
    const color = edgeColor(edge);
    row.innerHTML = `
      <div class="matrix-cell"><span class="swatch-tag" style="background:${s.color}"></span> ${edge.cat.toUpperCase()}</div>
      <div class="matrix-cell">${s.name.replace(/\n/g," ")} → ${t.name.replace(/\n/g," ")}</div>
      <div class="matrix-cell"><span class="alignment-tag" style="background:${color}26;color:${color}">${TYPE_STYLE[edge.tipo].label}</span></div>
      <div class="matrix-cell">${fuenteBadgeHTML(edge.fuente)}</div>
      <div class="matrix-cell">${edge.articulo || "—"}${edge.pagina ? " · p."+edge.pagina : ""}</div>
      <div class="matrix-cell quote-cell">${edge.analisis || ""}</div>
    `;
    row.addEventListener("click", () => showEdgeInfo(i));
    container.appendChild(row);
  });
}

function filterNetwork(mode) {
  document.querySelectorAll(".legend-footer-row .control-btn").forEach(btn => btn.classList.remove("active"));
  if (window.event && window.event.currentTarget) window.event.currentTarget.classList.add("active");
  typeOff.clear(); catOff.clear();
  document.querySelectorAll(".legend-item input").forEach(inp => { inp.checked = true; inp.closest(".legend-item").classList.remove("off"); });

  const groups = {
    all: null,
    directa: { types: ["directa"] },
    indirecta: { types: ["indirecta"] },
    e1: { cats: ["e1"] }, e2: { cats: ["e2"] }, e3: { cats: ["e3"] }, e4: { cats: ["e4"] },
  };
  const active = groups[mode];
  if (!active) { refreshEdgeVisibility(); return; }
  if (active.types) ["directa","indirecta"].forEach(t => { if (!active.types.includes(t)) typeOff.add(t); });
  if (active.cats) Object.keys(STRUCT_STYLE).forEach(c => { if (!active.cats.includes(c)) catOff.add(c); });

  document.querySelectorAll(".legend-item[data-mode='type']").forEach(item => {
    const show = !active.types || active.types.includes(item.dataset.type);
    item.querySelector("input").checked = show; item.classList.toggle("off", !show);
  });
  document.querySelectorAll(".legend-item[data-mode='cat']").forEach(item => {
    const show = !active.cats || active.cats.includes(item.dataset.cat);
    item.querySelector("input").checked = show; item.classList.toggle("off", !show);
  });
  refreshEdgeVisibility();
}

document.addEventListener("DOMContentLoaded", () => {
  renderNetwork();
  setupLegendToggle();
  renderMetrics();
  renderMatrix();
  document.getElementById("networkViz")?.addEventListener("click", () => { hideEdgeInfo(); hideNodeInfo(); });
});
