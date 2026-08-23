# QA módulo 05 · Minimal v4

Se simplificó `modulo-05.html` para dejar solo cuatro botones de escala (`Natural`, `Cultural`, `Tecnológico`, `Metaverso`) y un selector `#uplSelect` para elegir la UPL. Se retiraron del HTML la guía, el cambio de vista, ruta, fuente, PMTiles, las 28 capas, el resumen API y el panel derecho duplicado. Se conservaron el mapa real MapLibre, el título de UPL, la atribución y los controles nativos de zoom.

La versión local `minimal-scale-upl-v4` cargó el mapa real y mostró la UPL 13 · Tintal. El DOM expone 4 botones de escala, 1 selector UPL y controles nativos del mapa; no quedan bloques `advanced-section` en el HTML.

## Interacción mínima

La prueba local confirmó que el botón Cultural cambia `state.selectedScale` a `cultural`, el selector cambia correctamente a UPL 23 y el título del mapa pasa a `UPL 23 · Centro Histórico`. El mapa queda `mapReady: true`.

El DOM final contiene 4 botones de escala, 1 selector de UPL, 0 tarjetas de cambio de vista, 0 secciones avanzadas y 0 paneles de insight duplicados. La consola local solo mostró advertencias esperables de `file://` al intentar consultas externas; no hubo errores de la interfaz ni de los controles mínimos.

## Verificación pública

GitHub Pages compiló en estado `built`. La URL pública `https://alejagoguti-cpu.github.io/Modelamiento_dinamico/modulo-05.html?qa=minimal-scale-upl-v4-final` referencia `modulo-05.css?v=minimal-v4`, `site-theme.css?v=minimal-v4` y `modulo-05.js?v=minimal-v4`. La vista pública cargó el mapa OSM monocromático con el indicador `16.962 calles locales` y mostró únicamente los cuatro botones de escala, el selector único de UPL y los controles nativos de zoom/atribución del mapa.

La prueba pública confirmó `mapReady: true`, cambio de escala a `cultural`, selección de UPL 23 y título `UPL 23 · Centro Histórico`. El DOM mantiene 4 botones de escala, 1 selector UPL, 0 `advanced-section`, 0 `view-card`, 0 `insight-panel` y el mapa presente. La consola no registró errores de la interfaz durante esta prueba.

Commit publicado tras integrar la rama remota: `183b1ec`.

## Pop-up de red por escala

Se reincorporó la estructura del pop-up de redes al HTML y el CSS `modulo-05-popup.css`. Al pulsar `Natural`, el pop-up abre `Red Natural` con 10 nodos, 1 hub (`HUMEDALES`), 11 relaciones, 6 directas y 5 indirectas. Las relaciones se renderizan mediante elementos SVG `<line>`; los 2 elementos `<path>` detectados corresponden únicamente a las puntas de flecha de los marcadores SVG, no a curvas de conexión. Se conservan los 4 botones de escala y el selector de UPL.
