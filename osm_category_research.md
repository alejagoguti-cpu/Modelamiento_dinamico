# Fuentes para ampliar categorías OSM

## Hallazgos

OpenStreetMap representa elementos físicos mediante nodos, vías y relaciones con etiquetas; su sistema de etiquetado es abierto y permite múltiples atributos por elemento. Las categorías deben tratarse como vistas de etiquetas, no como un catálogo cerrado.

La documentación de `amenity` cubre instalaciones y servicios para residentes y visitantes, por lo que conviene separar salud, educación, cuidado, cultura, culto, seguridad, alimentación, transporte y servicios públicos.

La documentación de `landuse` distingue uso del suelo y cobertura; ambas capas pueden coexistir. Para el módulo 05 conviene añadir residencial, comercial, industrial, institucional/educativo, recreativo, forestal, agrícola, construcción, cementerio, ferrocarril, religioso y servicios técnicos.

Overpass QL permite consultar nodos, vías y relaciones y combinar cláusulas dentro de un conjunto. Las consultas deben mantener `out:json`, limitarse al bbox visible, evitar `meta` y dividirse por grupos para controlar tiempo y memoria.

## Fuentes

1. https://wiki.openstreetmap.org/wiki/Map_features — Map features, OpenStreetMap Wiki.
2. https://wiki.openstreetmap.org/wiki/Key:amenity — Key:amenity, OpenStreetMap Wiki.
3. https://wiki.openstreetmap.org/wiki/Land_use — Land use, OpenStreetMap Wiki.
4. https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL — Overpass QL, OpenStreetMap Wiki.
