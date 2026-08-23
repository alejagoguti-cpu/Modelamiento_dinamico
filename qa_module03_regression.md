# QA módulo 03 — regresión confirmada

La página pública https://alejagoguti-cpu.github.io/Modelamiento_dinamico/modulo-03.html muestra correctamente el título “Simulación e Indicadores”, los cuatro controles de apagado y la franja de métricas, pero el panel central contiene únicamente 104 elementos dentro de #gRels y #gNodes tiene 0 hijos.

El SVG actual tiene grupos #gGuides, #gMembers, #gRels y #gNodes. #gRels contiene paths de relaciones y sus paths hit-area; #gNodes está completamente vacío. Por eso el usuario ve las flechas/líneas pero no los nodos, círculos ni etiquetas.

Los selectores de la página confirman que la captura del usuario corresponde al módulo 03 y no al módulo 07. El módulo 03 tiene los cuatro escenarios EEP/EFC/ESECI/EIP, filtros, zoom, exportación y métricas inferiores.

Corrección prioritaria: restaurar la creación de nodos en #gNodes, manteniendo los paths existentes, la lógica de reflow/apagado y la visual de fondo oscuro. Revisar además que los conteos y hubs se calculen con los nodos restaurados.

## Estado interno confirmado

La consola pública muestra `model.concepts = 31`, `model.relations = 52` y todos los sistemas EEP/EFC/ESECI/EIP activos. El primer concepto HUMEDALES tiene 8 relaciones y 8 activas. Por tanto, el problema no es la falta de datos ni de relaciones: la rutina de renderizado entra al ciclo de relaciones, pero el ciclo de nodos está saltando o no llega a insertar los grupos en #gNodes.

La consola también confirma que cada sistema tiene conceptos y grados activos: EEP 8 conceptos, EFC 9, ESECI 9 y EIP 5; todos los grados activos son mayores que cero y `offNodes` está vacío. Sin embargo, `#gNodes.children.length` sigue siendo 0. La condición `sysOff || off || isolated` no explica el fallo. La causa más probable está en la llamada a `purgeInactiveSvg()` o en una función posterior que elimina los grupos, o en un render duplicado que limpia #gNodes después de añadirlos.

## Primer parche probado localmente

Se añadió un mapa de colores fallback y normalización de campos de relación. `node --check` y `git diff --check` pasan. En local, la red vuelve a crear 31 grupos `.concept`, 31 círculos `.node-ring`, 31 etiquetas y 52 relaciones; los indicadores muestran 4 estructuras, 52 relaciones, 31 nodos y 52 activas.

Al apagar EEP localmente, el estado se actualiza a 3 estructuras, 36 relaciones, 23 nodos activos y 69% de conectividad. La reestructuración funciona, pero la escala en un viewport estrecho hace que varios nodos parezcan pequeños y las etiquetas sean poco legibles; conviene ajustar la vista/escala visual sin romper responsive.

La versión local restaurada muestra 31 nodos y 52 relaciones. La geometría actual ocupa aproximadamente x=330–2671 y=97–1680 dentro de un viewBox 0 0 3000 2400, mientras el escenario mide 793×500 px en el viewport de prueba. Esto explica que la red ocupe solo una parte del lienzo; el viewBox puede ajustarse con margen a aproximadamente 0 0 3000 2050 o equivalente, pero la prioridad es no recortar los nodos periféricos.

## Prueba de interacción

La prueba local alternó los cuatro botones de escenario en orden EEP → EFC → ESECI → EIP y luego pulsó “Reactivar todas”. Los estados observados fueron 52 relaciones/31 nodos al inicio, 36/23 tras apagar EEP, 20/14 tras apagar EFC, 6/5 tras apagar ESECI y 0/0 con las cuatro apagadas. El restablecimiento devolvió 52 relaciones, 31 nodos y las cuatro estructuras activas. El render no produjo errores durante la secuencia.
