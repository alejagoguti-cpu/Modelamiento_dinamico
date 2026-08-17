# Auditoría de botones de acción móvil

La prueba interactiva del Módulo 07 confirmó que el botón de apertura de la primera red abre correctamente el modal analítico y que su botón de cierre devuelve la vista al dashboard. Los botones de exportación, diagnóstico y apertura de redes están presentes y tienen handlers o enlaces definidos.

La prueba interactiva del Módulo 01 confirmó que el botón `Soporte` cambia el estado del filtro y actualiza la red sin desaparecer ni alterar el contenido de la tabla. Los botones `Todos`, `Resiliencia`, `Indirectas` y filtros por estructura permanecen disponibles.

La captura del Módulo 07 en viewport de escritorio mostró que la geometría de sus botones es consistente; la prueba móvil previa mostró que exportación queda a ancho completo. La captura móvil del Módulo 01 mostró controles agrupados en una fila desplazable visualmente, por lo que debe verificarse que el wrap del overlay no genere clipping en el ancho más estrecho.

La prueba del Módulo 08 confirmó que `Largo plazo` cambia el estado activo y despliega el contenido correspondiente, incluyendo las tarjetas de acciones de largo plazo. El botón conserva su alineación con los otros botones de plazo y no rompe la red; en escritorio los controles aparecen en una fila, mientras que el overlay móvil los apila cuando el ancho es reducido.

La prueba del Módulo 06 confirmó que `Conflictos` cambia el conjunto visible de relaciones sin romper la red. Los controles `Todos`, `Alineados`, `Conflictos`, los filtros ODS y los botones de zoom están definidos y permanecen disponibles; visualmente, los filtros superiores requieren wrap en móvil para evitar compresión.
