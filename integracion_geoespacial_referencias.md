# Integración geoespacial — Bogotá Viva

## Decisiones verificadas

- MapLibre GL JS puede usar una fuente raster con la URL exacta `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, `tileSize: 256`, `maxzoom: 19` y atribución `© OpenStreetMap contributors`.
- OpenStreetMap exige atribución visible en el mapa, la URL de teselas indicada, identificación válida de la aplicación y respeto de caché; la disponibilidad del servicio es best-effort y no existe SLA.
- La página se implementará con un mapa central navegable, controles de zoom, atribución visible, capas temáticas y modo de respaldo procedural.

## Fuentes consultadas

1. MapLibre GL JS, ejemplo oficial de fuente raster: https://maplibre.org/maplibre-gl-js/docs/examples/add-a-raster-tile-source/
2. OpenStreetMap Foundation, Tile Usage Policy: https://operations.osmfoundation.org/policies/tiles/
3. OpenStreetMap, Overpass API: https://wiki.openstreetmap.org/wiki/Overpass_API
4. Nominatim: https://nominatim.org/
5. OSRM API: https://project-osrm.org/docs/v5.24.0/api/

## Criterio de implementación

Las consultas públicas se harán bajo demanda, con debounce, límites de bbox reducidos, mensajes de estado y caché en memoria. Si Overpass/Nominatim/OSRM no responde, se conserva el mapa base y la red procedural de demostración; no se debe presentar una respuesta fallida como dato territorial.

## Referencia visual solicitada

La interfaz debe seguir la captura aportada: barra superior negra, navegación lateral de iconos, panel de control izquierdo, mapa central claro de calles reales, panel derecho con cuatro escalas Natural, Cultural, Tecnológico y Metaverso, UPL seleccionada y tarjetas de indicadores.
