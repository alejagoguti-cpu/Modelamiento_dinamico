## Inspección visual adicional

La red Cultural muestra dos hubs superiores, dos filas de relaciones intermedias y una cadena inferior continua; no se observan cruces radiales tipo telaraña. La red Tecnológica muestra una jerarquía de hubs, servicios intermedios y una cadena inferior de infraestructura, con rutas rectilíneas y puentes visibles. La red Metaverso mantiene la misma composición por niveles y sus conexiones inferiores quedan separadas del flujo superior.

La geometría manual se está aplicando a las cuatro escalas. Los pop-ups cambian de título, nodos, conteos y contenido al cambiar de pestaña, por lo que la reorganización no rompió la selección de escala.

## Prueba pública de HUMEDALES

En GitHub Pages, la secuencia de dos clics consecutivos sobre el nodo HUMEDALES abrió `wetlandImageModal`. El modal quedó con `display: grid`, clase `open` y visibilidad `visible`. La imagen `assets/planosnico.webp` terminó cargada con `naturalWidth: 2048` y `naturalHeight: 1345`. El nodo permaneció en la red y el estado mostró `HUMEDALES · Red Natural`.

## Verificación pública de imagen visible

Fuente pública verificada: https://alejagoguti-cpu.github.io/Modelamiento_dinamico/modulo-05.html?verify=wetland-image-live-c532b4c

Después del doble clic en HUMEDALES, la captura pública mostró la imagen satelital ocupando visualmente el cuerpo del popup. El placeholder desapareció. El elemento tuvo visibilidad efectiva, dimensiones aproximadas de 821 x 540 px, y cargó `https://alejagoguti-cpu.github.io/Modelamiento_dinamico/assets/planosnico.webp` con dimensiones naturales de 2048 x 1345 px. Los recursos versionados fueron `modulo-05.js?v=image-visible-v3` y `modulo-05-popup.css?v=image-visible-v2`.

## Auditoría pública de interacción y estilo — commit f947964

Fuente pública: https://alejagoguti-cpu.github.io/Modelamiento_dinamico/modulo-05.html?verify=interaction-style-live-f947964

La prueba pública confirmó: un clic en RÍOS abre `nodeDetailModal` con título RÍOS, resumen, 3 conexiones de salida y 1 de entrada; dos clics en HUMEDALES abren `wetlandImageModal`, con imagen visible de 821 x 540 px y dimensiones naturales 2048 x 1345, sin placeholder; el tercer clic oculta HUMEDALES, deja 29 nodos y 36 conexiones, y los 29 radios restantes permanecen iguales. Estilos comprobados: arista directa 1.25 px / opacidad .64; puente 1.8 px / opacidad .78; colores azules no detectados. Recursos versionados fueron `modulo-05.js?v=interaction-stable-v1` y `modulo-05-popup.css?v=calm-network-v1`.

## Prueba de múltiples popups — sesión pública all-node-popups-v1

Se probó un nodo representativo por escala en la publicación: Natural → RÍOS (`rios`), Cultural → MUSEOS (`museos`), Tecnológico → TRANSPORTE PÚBLICO (`transporte_publico`) y Metaverso → CAPAS GIS (`capas_gis`). Resultado: **4/4 fichas abiertas correctamente**, con título, grado y contenido informativo; cada ficha se cerró antes de cambiar de escala y al finalizar no quedó `nodeDetailModal` abierto.

La prueba específica de HUMEDALES ejecutó doble clic en `data-node-id="humedales"`. Resultado: `wetlandImageModal` abierto, `nodeDetailModal` cerrado, título “Humedales”, imagen visible, placeholder oculto, recurso cargado desde `assets/planosnico.webp`, dimensiones naturales 2048 × 1345.

Evidencia visual: `/home/ubuntu/screenshots/alejagoguti-cpu_gith_2026-08-24_01-14-14_4775.webp`.

## Restauración de flujo acuático — prueba local

El flujo no había sido eliminado del código: las partículas y el ciclo `requestAnimationFrame` seguían presentes, pero `buildScaleNetworkFlow()` intentaba leer `x1`, `y1`, `x2`, `y2` de elementos `<path>`. Como las conexiones orgánicas usan `d="M x y L x y"`, `Number(null)` convertía los extremos ausentes en 0 y dejaba las partículas en 0,0, fuera de la red. Se añadió un lector compatible con atributos de línea y rutas SVG.

Resultado local: Natural 42 conexiones / 71 partículas; Cultural 15 / 24; Tecnológico 16 / 26; Metaverso 16 / 26. En las cuatro escalas las partículas iniciaron dentro del SVG y cambiaron de posición durante 950 ms. Pausar mantuvo las posiciones estables y Reanudar volvió a moverlas. La ficha de RÍOS abrió correctamente y el doble clic de HUMEDALES abrió `wetlandImageModal` con `planosnico.webp` visible, sin abrir simultáneamente la ficha.

## Verificación pública posterior al despliegue — commit 258fa34

GitHub Pages cargó `modulo-05.js?v=water-flow-fixed-v1`. En Natural se verificaron 42 conexiones y 71 partículas; en Cultural, 15 conexiones y 24 partículas; en Tecnológico, 16 conexiones y 26 partículas; en Metaverso, 16 conexiones y 26 partículas. En las cuatro escalas las partículas cambiaron de posición con el flujo activo y ninguna permaneció en 0,0. La ficha de RÍOS continuó abriendo correctamente y el doble clic en HUMEDALES mostró la imagen con dimensiones naturales 2048 × 1345; al finalizar, los tres modales quedaron cerrados.

Evidencia visual pública: `/home/ubuntu/screenshots/alejagoguti-cpu_gith_2026-08-24_02-19-23_8055.webp`.

## Ajuste de etiquetas y separación — verificación local

Se reemplazó la etiqueta SVG de tamaño fijo por una composición que calcula líneas, fuente, alto de línea y ancho máximo según el radio real de cada nodo. Las etiquetas se mantienen centradas dentro del círculo y se comprimen solo cuando la línea supera el ancho útil; no se cambia ningún nombre ni la información del popup. También se separaron los últimos pares cercanos de Natural en la franja inferior.

Resultado de auditoría sobre las cuatro escalas: Natural 30 nodos, Cultural 14, Tecnológico 14 y Metaverso 14; `textOutside: 0` y `overlaps: 0` en todas las escalas. El flujo acuático siguió activo durante la prueba.

## Verificación pública del layout — commit d3c51ab

GitHub Pages cargó `modulo-05.js?v=text-fit-v4`. La auditoría pública confirmó en Natural, Cultural, Tecnológico y Metaverso: `textOutside: 0`, `overlaps: 0`, flujo activo y todas las etiquetas contenidas dentro del nodo. En Natural se mantuvieron 30 nodos, 42 conexiones y 71 partículas de agua; el flujo cambió de posición durante la comprobación. La vista pública final quedó abierta en Natural para evidencia visual.

Evidencia visual pública: `/home/ubuntu/screenshots/alejagoguti-cpu_gith_2026-08-24_02-28-34_2806.webp`.
