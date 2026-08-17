# Auditoría final de títulos

El Módulo 02 mantiene como referencia una tipografía Space Grotesk de 54 px en escritorio, peso 700, line-height 1.1, letter-spacing -1 px, eyebrow Teal y degradado de título de blanco a coral y cobre.

Los módulos 01, 03, 04, 06, 07 y 08 usan ahora el mismo sistema visual mediante `module02-system.css`. El Módulo 03 también tiene un breakpoint de mayor especificidad para evitar que el título se rompa letra por letra en móvil.

El Módulo 05 comparte familia, peso, degradado, color y jerarquía, pero utiliza una escala contextual con `clamp()` porque el título vive dentro de una columna lateral estrecha. Esta diferencia es necesaria para evitar desbordamiento y no representa un cambio de identidad visual.

Las capturas móviles finales de los módulos 03, 05 y 07 muestran títulos legibles, con degradado coherente y sin cortes de letras.
