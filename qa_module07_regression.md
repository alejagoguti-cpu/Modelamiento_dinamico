# QA módulo 07 — regresión visual

Fecha: 2026-08-23.

La captura de referencia del usuario muestra una red oscura de Bogotá Viva con aproximadamente 30 nodos de las cuatro estructuras (EEP, EFC, ESECI y EIP), hubs grandes según conexiones, líneas naranjas/azules/grises/moradas y flechas visibles.

En la versión pública actual de modulo-07.html?qa=simulacion-regresion, el dashboard principal muestra Síntesis territorial, un mapa negro vacío y tres tarjetas de indicadores. Al abrir el primer indicador, el modal sí aparece con SVG y nodos, pero reporta 13 nodos · 6 conexiones y no muestra el hub central "33 Unidades de Planeamiento Local". La causa visible en modulo-07.js es que el código ejecuta removeNodeByLabel("30min", /^(33 Unidades de Planeamiento Local|Empleo formal)$/) y posteriormente elimina numerosos nodos semánticos/abstractos; esto contradice la referencia visual y deja una red excesivamente reducida.

El HTML actual no contiene un elemento #proceduralSimulation aunque initProceduralSimulation() existe en el JavaScript; por tanto esa simulación no se inicializa. El módulo actual además incluye cartografía de El Burro que aparece negra en la captura pública.

La referencia del usuario corresponde visualmente a la red relacional de las cuatro estructuras, no al mapa negro de El Burro. El arreglo debe priorizar la red como simulación visible y conservar el panel de indicadores/interacciones.
