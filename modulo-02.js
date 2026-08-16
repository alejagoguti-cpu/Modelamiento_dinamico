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
const CANVAS = { w: 3000, h: 3000 };
const HUB_CENTERS = (() => {
  const cx = CANVAS.w / 2, cy = CANVAS.h / 2, R = 760;
  // e1 arriba (teal), e2 derecha (naranja), e3 abajo (amarillo), e4 izquierda (rosa) —
  // igual disposición en diamante que la referencia de las 4 estructuras.
  return {
    e1: { x: cx, y: cy - R },
    e2: { x: cx + R, y: cy },
    e3: { x: cx, y: cy + R },
    e4: { x: cx - R, y: cy },
  };
})();

function layoutNetwork() {
  const deg = computeDegrees();
  ODS_NODES.forEach(n => {
    n.color = STRUCT_STYLE[n.cat].color;
    n.vx = 0; n.vy = 0; n.fixed = false; n.isMainHub = false;
    const d = deg[n.id] || 0;
    n.r = 22 + Math.pow(d, 1.35) * 10; // el tamaño real sale del grado, no de una etiqueta — hubs MUCHO más grandes que la periferia
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
    const rest = group.slice(1);

    // hasta 3 anillos concéntricos según grado real, para que los componentes
    // algo conectados queden más cerca del hub y los periféricos más lejos —
    // igual lectura visual que la referencia (satélites chicos bien separados).
    const ringHigh = rest.filter(n => n._deg >= 3);
    const ringMid  = rest.filter(n => n._deg === 1 || n._deg === 2);
    const ringLow  = rest.filter(n => n._deg === 0);

    const GAP = 50;
    function placeRing(ringNodes, minRadius, angleSpan, angleStart) {
      if (!ringNodes.length) return minRadius;
      const sumDiam = ringNodes.reduce((s, n) => s + 2 * n.r + GAP, 0);
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
    const n = rest.length;
    const angleSpan = Math.min(Math.PI * 1.15, Math.PI * 0.32 + n * (Math.PI / 11));
    const angleStart = outward - angleSpan / 2;

    const rHigh = placeRing(ringHigh, hub.r + 180, angleSpan, angleStart);
    const rMid = placeRing(ringMid, rHigh + (ringHigh[0] ? Math.max(...ringHigh.map(n => n.r)) : 0) + 150, angleSpan, angleStart);
    placeRing(ringLow, rMid + (ringMid[0] ? Math.max(...ringMid.map(n => n.r)) : 0) + 140, angleSpan, angleStart);
  });

  // ---- 2. Resolución de colisiones por radio real (red de seguridad) ----
  // El layout radial ya evita casi toda superposición por diseño; esta pasada
  // solo destraba los pocos casos límite entre anillos vecinos o estructuras
  // cercanas, sin mover la red entera.
  const PAD = 12;
  for (let pass = 0; pass < 120; pass++) {
    let anyOverlap = false;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        if (a.isMainHub && b.isMainHub) continue; // no mover los 4 hubs principales entre sí
        let dx = b.x - a.x, dy = b.y - a.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const minDist = a.r + b.r + PAD;
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
      n.x = Math.max(n.r + 20, Math.min(CANVAS.w - n.r - 20, n.x));
      n.y = Math.max(n.r + 20, Math.min(CANVAS.h - n.r - 20, n.y));
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
   ZOOM / PAN
   ========================================================== */
const viewState = { x: 0, y: 0, scale: 1, minScale: 0.35, maxScale: 3.5 };
let baseViewBox = null;

function applyZoomPan(svg) {
  if (!baseViewBox) return;
  const [bx, by, bw, bh] = baseViewBox;
  const w = bw / viewState.scale, h = bh / viewState.scale;
  const x = bx + (bw - w) / 2 + viewState.x;
  const y = by + (bh - h) / 2 + viewState.y;
  svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
}

function setupZoomPan(svg) {
  const vb = svg.getAttribute("viewBox").split(" ").map(Number);
  baseViewBox = vb;

  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    viewState.scale = Math.min(viewState.maxScale, Math.max(viewState.minScale, viewState.scale * delta));
    applyZoomPan(svg);
  }, { passive: false });

  let panning = false, lastX = 0, lastY = 0;
  svg.addEventListener("pointerdown", (e) => {
    if (e.target !== svg) return;
    panning = true; lastX = e.clientX; lastY = e.clientY;
    svg.classList.add("panning");
  });
  window.addEventListener("pointermove", (e) => {
    if (!panning) return;
    const vb2 = svg.getAttribute("viewBox").split(" ").map(Number);
    const scaleFactor = vb2[2] / svg.clientWidth;
    viewState.x -= (e.clientX - lastX) * scaleFactor;
    viewState.y -= (e.clientY - lastY) * scaleFactor;
    lastX = e.clientX; lastY = e.clientY;
    applyZoomPan(svg);
  });
  window.addEventListener("pointerup", () => { panning = false; svg.classList.remove("panning"); });

  document.getElementById("zoomIn")?.addEventListener("click", () => { viewState.scale = Math.min(viewState.maxScale, viewState.scale * 1.25); applyZoomPan(svg); });
  document.getElementById("zoomOut")?.addEventListener("click", () => { viewState.scale = Math.max(viewState.minScale, viewState.scale / 1.25); applyZoomPan(svg); });
  document.getElementById("zoomReset")?.addEventListener("click", () => { viewState.scale = 1; viewState.x = 0; viewState.y = 0; applyZoomPan(svg); });
}

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
   FONDO DE MAPA (decorativo) — silueta abstracta tipo "territorio",
   inspirada en el estilo de referencia (contorno oscuro + textura de
   puntos), pero SIN pretender ser una cartografía real de Bogotá:
   es una forma estilizada, generada matemáticamente (sin datos
   geográficos), solo para dar ambientación de "mapa" detrás de la red.
   No lleva escala numérica ni coordenadas reales — sería una falsa
   precisión que no podemos respaldar.
   ========================================================== */
function buildMapBackground(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "map-bg-layer");

  const cx = CANVAS.w / 2, cy = CANVAS.h / 2;
  // multiplicadores fijos (no aleatorios) para un contorno irregular
  // pero reproducible en cada carga — silueta alargada norte-sur,
  // evocando la forma general de la sabana de Bogotá sin copiar límites reales.
  const mult = [0.5,0.68,0.6,0.88,0.72,1.02,0.85,1.12,0.95,1.18,1.0,1.15,0.9,1.05,0.78,0.95,0.68,0.82,0.55,0.7,0.42,0.58,0.38,0.46];
  const rx = CANVAS.w * 0.34, ry = CANVAS.h * 0.42;
  const pts = mult.map((m, i) => {
    const angle = (i / mult.length) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * rx * m, y: cy + Math.sin(angle) * ry * m };
  });

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

  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("id", "mapDotPattern");
  pattern.setAttribute("width", "34"); pattern.setAttribute("height", "34");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  const dot = document.createElementNS(SVG_NS, "circle");
  dot.setAttribute("cx", "3"); dot.setAttribute("cy", "3"); dot.setAttribute("r", "1.4");
  dot.setAttribute("fill", "rgba(190,205,230,0.16)");
  pattern.appendChild(dot);
  defs.appendChild(pattern);
  g.appendChild(defs);

  // relleno base de la silueta
  const fill = document.createElementNS(SVG_NS, "path");
  fill.setAttribute("d", blobPath);
  fill.setAttribute("fill", "#151f38");
  fill.setAttribute("opacity", "0.9");
  g.appendChild(fill);

  // textura de puntos, recortada a la silueta
  const dotsRect = document.createElementNS(SVG_NS, "rect");
  dotsRect.setAttribute("x", "0"); dotsRect.setAttribute("y", "0");
  dotsRect.setAttribute("width", CANVAS.w); dotsRect.setAttribute("height", CANVAS.h);
  dotsRect.setAttribute("fill", "url(#mapDotPattern)");
  dotsRect.setAttribute("clip-path", `url(#${blobId}-clip)`);
  g.appendChild(dotsRect);

  // un par de "curvas de nivel" concéntricas, solo decorativas
  [0.7, 0.45].forEach(scale => {
    const innerPts = pts.map(p => ({
      x: cx + (p.x - cx) * scale,
      y: cy + (p.y - cy) * scale,
    }));
    const contour = document.createElementNS(SVG_NS, "path");
    contour.setAttribute("d", smoothClosedPath(innerPts));
    contour.setAttribute("fill", "none");
    contour.setAttribute("stroke", "rgba(150,170,200,0.15)");
    contour.setAttribute("stroke-width", "1.5");
    g.appendChild(contour);
  });

  // borde de la silueta
  const outline = document.createElementNS(SVG_NS, "path");
  outline.setAttribute("d", blobPath);
  outline.setAttribute("fill", "none");
  outline.setAttribute("stroke", "rgba(160,180,210,0.32)");
  outline.setAttribute("stroke-width", "2");
  g.appendChild(outline);

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
  const startPad = s.r + 2, endPad = t.r + 8;
  const x1 = s.x + ux * startPad, y1 = s.y + uy * startPad;
  const x2 = t.x - ux * endPad, y2 = t.y - uy * endPad;
  return `M${x1},${y1} L${x2},${y2}`;
}

function drawEdges(svg) {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "edges-layer");
  RAW_EDGES.forEach((edge, i) => {
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
    wrapper.setAttribute("style", "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none;");

    const iconEl = document.createElementNS(XHTML_NS, "i");
    iconEl.setAttribute("class", "fa-solid " + node.icon + " node-icon");
    iconEl.setAttribute("style", `color:${node.color}; font-size:${node.r * 0.4}px; margin:1px 0;`);

    const nameEl = document.createElementNS(XHTML_NS, "div");
    nameEl.setAttribute("class", "node-name");
    nameEl.setAttribute("style", `font-size:${Math.max(node.r * 0.145, 7)}px; padding:0 3px; font-weight:700; color:#e7eaf2; line-height:1.15; white-space:pre-line;`);
    nameEl.textContent = node.name;

    const fuenteDot = document.createElementNS(XHTML_NS, "div");
    fuenteDot.setAttribute("style", `width:6px;height:6px;border-radius:50%;background:${FUENTE_STYLE[node.fuente].color};margin-top:2px;`);

    wrapper.appendChild(iconEl); wrapper.appendChild(nameEl); wrapper.appendChild(fuenteDot);
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
    const size = n.r * 2.2;
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
  buildDefs(svg); buildMapBackground(svg); drawEdges(svg); drawNodes(svg); setupZoomPan(svg);
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

  const mapaWrap = document.getElementById("nodeInfoMapaWrap");
  mapaWrap.style.display = "none";

  document.getElementById("nodeInfoPanel").classList.add("visible");
  document.getElementById("edgeInfoPanel")?.classList.remove("visible");
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
    node.classList.toggle("hidden-node", nodeOff.has(node.dataset.id));
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
    if (el) el.textContent = `${STRUCT_STYLE[cat].label}: ${STRUCT_STYLE[cat].articulos} · ${nCount} componentes en la red`;
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
  document.querySelectorAll(".network-controls .control-btn").forEach(btn => btn.classList.remove("active"));
  if (window.event && window.event.currentTarget) window.event.currentTarget.classList.add("active");
  typeOff.clear(); catOff.clear();
  document.querySelectorAll(".legend-item input").forEach(inp => { inp.checked = true; inp.closest(".legend-item").classList.remove("off"); });

  const groups = {
    all: null,
    vacio: { types: ["vacio"] },
    directa: { types: ["directa"] },
    indirecta: { types: ["indirecta"] },
    e1: { cats: ["e1"] }, e2: { cats: ["e2"] }, e3: { cats: ["e3"] }, e4: { cats: ["e4"] },
  };
  const active = groups[mode];
  if (!active) { refreshEdgeVisibility(); return; }
  if (active.types) ["directa","indirecta","vacio"].forEach(t => { if (!active.types.includes(t)) typeOff.add(t); });
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
