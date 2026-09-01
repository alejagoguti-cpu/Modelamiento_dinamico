# Capas GIS de Bogotá

Este directorio contiene los archivos espaciales suministrados para el modelo conceptual de desplazamiento potencial de *Turdus fuscater* en función de la resistencia del paisaje y la perturbación acústica.

| Archivo | Representación | Estado |
|---|---|---|
| `Cober_vege_humedales.*` | Geometrías poligonales de cobertura vegetal asociada a humedales | Conjunto completo recibido |
| `ArboladoUrbano.shp` | Geometrías puntuales de arbolado urbano | Geometría recibida |
| `pasted_content.txt` | Especificación metodológica del modelo | Recibida |

## Integración en el módulo 8 de SUMO

El archivo `../kennedy_ecology.json` es un activo derivado para visualización dentro de `modulo-08.html`. La cobertura vegetal se dibuja como polígonos y el arbolado se agrega en celdas de densidad de 60 m, conservando el conteo real de puntos dentro del área calibrada de la red SUMO. El control **Mostrar hábitat y arbolado** permite activar o desactivar la superposición sin ocultar la red vial ni el ruido.

La transformación usa la calibración geográfica ya existente en `modulo-08-sumo.js`, de modo que no se inventa una nueva ubicación. El activo derivado no representa rutas de aves ni resultados biológicos; únicamente prepara las capas espaciales para la futura matriz de resistencia.

## Componentes de fuente

El ZIP de arbolado sí contiene `.shp`, `.shx`, `.dbf`, `.prj`, `.cpg`, `.sbn`, `.sbx` y `.shp.xml`. Los componentes pequeños fueron incorporados al repositorio. El `.dbf` pesa aproximadamente 368 MB, supera el límite de un archivo individual de GitHub y por eso no se subió; sus atributos se usaron localmente para validar la capa y el módulo web utiliza el activo optimizado derivado.

La cobertura vegetal ya cuenta con `.shp`, `.shx`, `.dbf`, `.prj`, `.cpg`, `.sbn`, `.sbx` y `.shp.xml`. Su definición recibida corresponde a `GCS_MAGNA` en grados. El cuadrante de referencia y la capa independiente de humedales todavía deben incorporarse antes de calcular la matriz de resistencia y las métricas de conectividad.

## Criterio metodológico

El proyecto debe tratar las rutas como desplazamientos potenciales derivados de una superficie de resistencia, no como trayectorias reales de individuos. La relación conceptual indicada para la perturbación acústica es:

```text
R_total = R_cobertura × F_ruido
```

Los valores de resistencia deberán quedar identificados como parámetros normalizados del modelo cuando no provengan de una fuente publicada específica para *Turdus fuscater*.
