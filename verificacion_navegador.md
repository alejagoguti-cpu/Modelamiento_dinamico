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


## Corrección de calles confirmada

La nueva capa GeoJSON funciona: la consulta natural devolvió 12.267 elementos OSM, de los cuales 11.776 tramos viales se dibujan como líneas teal de alto contraste, diferenciando autopistas, arteriales, colectoras y calles residenciales. La captura de verificación muestra la red completa superpuesta sobre el mapa base, el recuadro de la UPL 13 y los lugares consultados.


## Optimización de consultas por viewport

El navegador mantiene `mapReady: true` y `mode: real`. La carga inicial de la UPL 13 se resolvió con 2.952 tramos y 82 lugares en el bbox visible, frente a la consulta anterior de más de 11.000 tramos para un radio fijo. La interfaz muestra `Nivel meso · 5 jerarquías visibles`, y el estado de conexión vuelve a `Mapa real conectado`. El código incorpora debounce de 420 ms, caché limitada a 16 entradas y cancelación de la consulta anterior mediante `AbortController`.


## Prueba de cancelación

Tras dos desplazamientos rápidos del mapa, la aplicación conservó un único `activeQueryKey` para el bbox visible y no dejó un controlador de Overpass colgado (`controllerActive: false` una vez terminada la respuesta). El debounce configurado es de 420 ms, por lo que los movimientos intermedios no generan una consulta por cada evento.


## Verificación final de rendimiento

La página mantiene el mapa real y la red vial visible. En la carga final, la interfaz muestra la nota de carga por área visible, `Nivel meso · 5 jerarquías visibles`, 2.952 tramos y 82 lugares para la UPL 13. El archivo JavaScript pasó `node --check`, y el script local de generación PMTiles pasó `bash -n`.


## GitHub Pages

La URL pública `https://alejagoguti-cpu.github.io/Modelamiento_dinamico/navegador-multiescalar.html` fue comprobada directamente. El JavaScript está cargado, MapLibre está listo, el modo es `real`, existen 4 botones de escala, 33 opciones UPL y el botón de ruta. Por tanto, esa URL ejecuta la aplicación; la URL `github.com/.../blob/main/...` solo muestra el archivo como código fuente.
