# QA módulo 05 · Minimal v4

Se simplificó `modulo-05.html` para dejar solo cuatro botones de escala (`Natural`, `Cultural`, `Tecnológico`, `Metaverso`) y un selector `#uplSelect` para elegir la UPL. Se retiraron del HTML la guía, el cambio de vista, ruta, fuente, PMTiles, las 28 capas, el resumen API y el panel derecho duplicado. Se conservaron el mapa real MapLibre, el título de UPL, la atribución y los controles nativos de zoom.

La versión local `minimal-scale-upl-v4` cargó el mapa real y mostró la UPL 13 · Tintal. El DOM expone 4 botones de escala, 1 selector UPL y controles nativos del mapa; no quedan bloques `advanced-section` en el HTML.

## Interacción mínima

La prueba local confirmó que el botón Cultural cambia `state.selectedScale` a `cultural`, el selector cambia correctamente a UPL 23 y el título del mapa pasa a `UPL 23 · Centro Histórico`. El mapa queda `mapReady: true`.

El DOM final contiene 4 botones de escala, 1 selector de UPL, 0 tarjetas de cambio de vista, 0 secciones avanzadas y 0 paneles de insight duplicados. La consola local solo mostró advertencias esperables de `file://` al intentar consultas externas; no hubo errores de la interfaz ni de los controles mínimos.
