# Verificación del pop-up de redes multiescala

Se sustituyó la red sobre el mapa por un modal independiente. Al cargar el Módulo 05, el mapa principal queda sin nodos ni conexiones de la red. Al pulsar Natural, se abre `scaleNetworkModal` con un lienzo SVG oscuro, nodos circulares, hubs, conexiones rectas, flechas para relaciones directas y líneas discontinuas para relaciones indirectas.

La primera prueba abrió correctamente la red Natural y mostró diez nodos dentro del pop-up. El modal incluye cierre, leyenda de relaciones y selección accesible de nodos. El mapa cartográfico permanece detrás sin la red superpuesta.

Pendiente: probar el cierre y la apertura de Cultural, Tecnológico y Metaverso antes de publicar.

La prueba de cierre funcionó y la red desapareció del mapa. Después, al pulsar Cultural, el mismo pop-up se abrió con diez nodos culturales, hubs de Patrimonio Material y Patrimonio Inmaterial, y sus conexiones correspondientes. El mapa principal no recibió nodos ni líneas de la red.

La prueba Tecnológica también funcionó: al cerrar Cultural y pulsar Tecnológico, el pop-up cambió a diez nodos de movilidad, infraestructura y conectividad, con Red Vial y Transporte Público como hubs. El mapa principal permaneció sin la red.

La prueba final de Metaverso funcionó: el modal mostró Gemelo Digital, Modelos 3D, Capas GIS, Plataformas BIM, nodos IoT, visualización VR, laboratorios urbanos, datos territoriales, escenarios simulados y sensores urbanos. Las cuatro escalas ya muestran su red exclusivamente en el pop-up.

La interacción interna también fue verificada: al pulsar el nodo Gemelo Digital, el nodo queda seleccionado y el encabezado del pop-up actualiza el contexto a `GEMELO DIGITAL · Red Metaverso`, sin cerrar el modal ni dibujar elementos en el mapa.

La auditoría técnica confirmó: `mapNetworkNodes: 0`, `modalOpen: true`, `popupNetworkNodes: 10` y escala activa `metaverso`. Por tanto, la red ya no se renderiza en el mapa principal; solo aparece dentro del pop-up.

Se añadieron controles `−`, `100%` y `+` al pop-up. La prueba del botón `+` actualizó el indicador a 118% y el viewport pasó a `scale(1.18)`, confirmando que el zoom se aplica al diagrama sin cerrar el pop-up. El canvas quedó marcado como interactivo para soportar rueda y arrastre.

La auditoría final del pop-up confirmó: transición de opacidad de 0.26 s y transformación de 0.32 s, fondo `rgb(11, 12, 15)`, borde turquesa tenue, título Space Grotesk en blanco, zoom reiniciado a 100%, viewport interactivo activo y `mapNodes: 0`. Esto confirma que el diseño mantiene la base visual del Módulo 01 y que la red permanece fuera del mapa.
