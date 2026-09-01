# Capas GIS de Bogotá

Este directorio contiene los archivos espaciales suministrados para el modelo conceptual de desplazamiento potencial de *Turdus fuscater* en función de la resistencia del paisaje y la perturbación acústica.

| Archivo | Representación | Estado |
|---|---|---|
| `Cober_vege_humedales.shp` | Geometrías poligonales de cobertura vegetal asociada a humedales | Geometría recibida |
| `ArboladoUrbano.shp` | Geometrías puntuales de arbolado urbano | Geometría recibida |
| `pasted_content.txt` | Especificación metodológica del modelo | Recibida |

## Componentes pendientes

Cada shapefile normalmente requiere, como mínimo, los archivos `.shp`, `.shx`, `.dbf` y `.prj` con el mismo nombre base. En esta entrega solo fueron recibidos los archivos `.shp`; por tanto, todavía faltan los índices espaciales `.shx`, las tablas de atributos `.dbf` y la definición del sistema de referencia `.prj` de cada capa.

No se reproyectaron ni modificaron las geometrías. La integración espacial, la tabla de atributos, la clasificación de hábitat/corredor/barrera y la matriz de resistencia deben realizarse después de recibir los componentes faltantes y el cuadrante de referencia.

## Criterio metodológico

El proyecto debe tratar las rutas como desplazamientos potenciales derivados de una superficie de resistencia, no como trayectorias reales de individuos. La relación conceptual indicada para la perturbación acústica es:

```text
R_total = R_cobertura × F_ruido
```

Los valores de resistencia deberán quedar identificados como parámetros normalizados del modelo cuando no provengan de una fuente publicada específica para *Turdus fuscater*.
