# Verificación Navegador Multiescalar

- La página `navegador-multiescalar.html` responde HTTP 200 y renderiza correctamente los tres paneles, las cuatro escalas, el selector de 33 UPL, la ruta y la atribución OSM.
- En la sesión de navegador de pruebas, MapLibre no quedó disponible (`MapLibre no pudo cargarse; se activó la lectura procedural`). El mapa central queda vacío claro, pero el fallback procedural sí está previsto.
- La consola no mostró mensajes adicionales. Próximo paso: comprobar `typeof maplibregl` y, si el CDN no se puede cargar en ese entorno, añadir un fallback visual/cargador alternativo sin afectar el funcionamiento público.


## Corrección aplicada

Se reemplazó la ruta inexistente `dist/maplibre-gl.js` por la distribución ESM oficial `dist/maplibre-gl.mjs` y el arranque espera el evento `maplibre-ready`. En la segunda carga, MapLibre se inicializó correctamente: aparece el mapa de Bogotá con calles, controles de zoom, marcador UPL 13 y atribución `© OpenStreetMap contributors`. El estado de la interfaz muestra `Calles reales` y `Consultando OSM…` mientras Overpass procesa la consulta.


## Interacción verificada

La consulta natural devolvió 6.146 elementos OSM en el radio exploratorio, con 20 lugares y 160 tramos contabilizados para el panel. El cambio a la escala Cultural sincronizó correctamente botones, lectura lateral y estado de consulta (`Consultando cultural en calles reales…`). El mapa permanece navegable y conserva la UPL 13 como referencia.


## Prueba de ruta

Se ingresaron `Parque El Tintal, Bogotá` y `Biblioteca El Tintal, Bogotá`. Nominatim encontró los puntos y la interfaz avanzó a `Calculando recorrido vial real con OSRM…`; el botón quedó temporalmente en estado de consulta. La ruta se está verificando sin bloquear la exploración del mapa.


## Ruta verificada

La prueba completó geocodificación y routing: `Parque Metropolitano El Tintal → Biblioteca El Tintal`, aproximadamente 1,0 km y 2 minutos sobre la red vial. La consola confirmó `mapReady: true`, `mode: real` y `routeLoaded: true`; la línea se dibuja sobre el mapa y el panel actualiza la métrica.
