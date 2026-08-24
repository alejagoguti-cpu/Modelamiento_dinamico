## Verificación pública reciente

URL: https://alejagoguti-cpu.github.io/Modelamiento_dinamico/modulo-05.html

- El pop-up Natural carga correctamente con 30 nodos y 42 conexiones.
- Doble clic de HUMEDALES probado con el gestor secuencial: modal abierto, imagen visible, `complete: true`, `naturalWidth: 2048`.
- Triple clic probado con el gestor secuencial: HUMEDALES desaparece del SVG, nodos activos 30 -> 29 y conexiones 42 -> 36.
- Antes de la corrección de radios, apagar el hub provocaba recalculo de radios porque `maxDegree` y `activeHubIds` dependían de la topología activa.
- Corrección local aplicada: `visualDegrees`, `visualMaxDegree` y `visualHubIds` se calculan sobre la topología completa; estadísticas y conexiones sí responden a nodos apagados, pero los radios de nodos restantes no cambian.
- El último despliegue público verificado antes de esta corrección corresponde al commit `2e7f664`.
