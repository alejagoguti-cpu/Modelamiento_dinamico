# PMTiles/MVT local para Bogotá Viva

## Objetivo

Este documento describe un flujo reproducible para sustituir la consulta pública de Overpass en tiempo de ejecución por un archivo local de teselas vectoriales. La aplicación puede seguir usando MapLibre para renderizar el mapa, pero las calles de Bogotá se leen desde un archivo `PMTiles` o desde un endpoint local `/{z}/{x}/{y}.mvt`. PMTiles es un archivo único de teselas que permite lecturas parciales mediante rangos HTTP, mientras que MVT es el formato de cada tesela vectorial [1] [2].

La recomendación para la exposición es generar un archivo local de calles, mantenerlo dentro de `tiles/` y activar una fuente local en el navegador. Así el mapa no depende de Overpass, Nominatim ni OSRM para mostrar la red vial. Es posible conservar esos servicios únicamente como funciones opcionales de búsqueda y rutas.

## Arquitectura recomendada

| Capa | Desarrollo local | Producción estática |
|---|---|---|
| Datos fuente | `colombia-latest.osm.pbf` descargado de Geofabrik y recortado a Bogotá | El mismo extracto versionado con fecha de descarga |
| Preparación | Osmium o GDAL para recortar; Tippecanoe para teselar | Pipeline reproducible en CI o en una máquina de preparación |
| Archivo | `tiles/bogota-roads.pmtiles` | PMTiles servido como archivo estático con rangos HTTP |
| Renderizador | MapLibre GL JS + `pmtiles.js` | MapLibre GL JS + `pmtiles.js` |
| Alternativa | `pmtiles serve tiles --port 8080` como endpoint local ZXY | Caddy, Nginx o CDN con CORS y soporte de rangos |

## Ruta A: PMTiles directo desde GeoJSON

Esta ruta es adecuada si ya existe un GeoJSON de vías, como `vias.geojson`, y se quiere generar un archivo manejable sin levantar una base de datos espacial. Tippecanoe es la herramienta recomendada por Protomaps para convertir grandes colecciones de GeoJSON en teselas y puede escribir PMTiles directamente desde la versión 2.17 [1].

```bash
# Instalar Tippecanoe desde su repositorio en Ubuntu si aún no está instalado.
git clone https://github.com/felt/tippecanoe.git /tmp/tippecanoe
cd /tmp/tippecanoe
make -j"$(nproc)"
sudo make install

# Convertir las calles a PMTiles. La capa se llamará roads.
tippecanoe \
  -o /home/ubuntu/Modelamiento_dinamico/tiles/bogota-roads.pmtiles \
  -l roads \
  -n "Bogotá Viva · Red vial OSM" \
  -zg \
  -Z10 -z17 \
  --drop-densest-as-needed \
  --extend-zooms-if-still-dropping \
  --no-tile-compression \
  /home/ubuntu/Modelamiento_dinamico/vias.geojson
```

`-Z10 -z17` limita el archivo a los niveles útiles para la lectura urbana. A niveles bajos se puede mostrar la red principal y, al acercarse, aparecen las calles locales. `--drop-densest-as-needed` controla teselas excesivamente densas; `--extend-zooms-if-still-dropping` conserva detalle agregando niveles cuando sea necesario [3]. Para un archivo final con compresión de teselas se puede retirar `--no-tile-compression`; esa bandera resulta útil durante la depuración.

## Ruta B: descargar OSM, recortar Bogotá y generar PMTiles

Si se parte de datos abiertos de OSM, Geofabrik publica extractos regionales en formato PBF. La página de Colombia ofrece `colombia-latest.osm.pbf`, que incluye todos los objetos OSM de Colombia hasta la fecha de actualización indicada por el proveedor [4]. Para no procesar el país completo en cada iteración, se recorta primero el PBF al rectángulo de Bogotá.

```bash
# Descargar el extracto regional; el archivo puede superar varios cientos de MB.
curl -L --fail --retry 3 \
  -o /home/ubuntu/Modelamiento_dinamico/tiles/colombia-latest.osm.pbf \
  https://download.geofabrik.de/south-america/colombia-latest.osm.pbf

# Instalar Osmium Tool según el sistema operativo.
sudo apt-get update
sudo apt-get install -y osmium-tool

# Recortar aproximadamente el Distrito Capital.
osmium extract \
  -b -74.25,4.45,-73.95,4.85 \
  /home/ubuntu/Modelamiento_dinamico/tiles/colombia-latest.osm.pbf \
  -o /home/ubuntu/Modelamiento_dinamico/tiles/bogota.osm.pbf
```

Para construir un tileset de calles solamente, primero se puede exportar un GeoJSON filtrando objetos `highway`. Osmium mantiene los datos OSM en PBF, mientras que GDAL/OGR o un filtro de preparación puede producir el GeoJSON que Tippecanoe necesita. El filtro debe conservar al menos `highway`, `name`, `ref` y `surface`.

```bash
# Ejemplo conceptual de exportación mediante ogr2ogr/GDAL.
ogr2ogr \
  -f GeoJSON \
  -where "highway IS NOT NULL" \
  /home/ubuntu/Modelamiento_dinamico/tiles/bogota-roads.geojson \
  /home/ubuntu/Modelamiento_dinamico/tiles/bogota.osm.pbf \
  lines

# Generar el archivo vectorial local.
tippecanoe \
  -o /home/ubuntu/Modelamiento_dinamico/tiles/bogota-roads.pmtiles \
  -l roads \
  -n "Bogotá Viva · Calles reales" \
  -zg -Z10 -z17 \
  --drop-densest-as-needed \
  --extend-zooms-if-still-dropping \
  /home/ubuntu/Modelamiento_dinamico/tiles/bogota-roads.geojson
```

La capa `lines` depende de cómo GDAL interprete el PBF y de los controladores instalados. Si esa conversión no está disponible, la alternativa más estable es usar `osmium export` con un archivo de estilo JSON y después pasar el GeoJSON resultante por Tippecanoe. Para una preparación profesional de un basemap completo se puede utilizar Planetiler, Tilemaker o el perfil de basemaps de Protomaps; Protomaps documenta estas rutas como alternativas para generar basemaps vectoriales [1].

## Validar el archivo generado

El binario `pmtiles` es independiente y puede inspeccionar, verificar, extraer y servir archivos locales. Se recomienda verificar siempre el archivo antes de conectarlo al navegador [5].

```bash
# Descargar el binario de PMTiles desde sus releases oficiales y ponerlo en PATH.
# Después:
pmtiles show tiles/bogota-roads.pmtiles --metadata
pmtiles verify tiles/bogota-roads.pmtiles
pmtiles show tiles/bogota-roads.pmtiles --header-json
```

El comando `show --metadata` permite confirmar el nombre de la capa, los límites, los niveles de zoom y el tipo de tesela. Si se necesita reducir el archivo a un área concreta, `pmtiles extract` puede extraer un subconjunto por bbox o GeoJSON [5].

## Servir PMTiles localmente

Para que el navegador lea PMTiles directamente, el servidor debe permitir solicitudes parciales `Range`. La forma más simple es usar el propio CLI de PMTiles para exponer un endpoint ZXY:

```bash
cd /home/ubuntu/Modelamiento_dinamico
pmtiles serve tiles --port 8080 --cors='*' --public-url=http://localhost:8080
```

Esto expone una tesela vectorial en una ruta similar a:

```text
http://localhost:8080/bogota-roads/{z}/{x}/{y}.mvt
```

El CLI también expone TileJSON en:

```text
http://localhost:8080/bogota-roads.json
```

La documentación oficial aclara que `pmtiles serve` sirve un endpoint ZXY; para servir el archivo PMTiles crudo con rangos parciales se debe usar un servidor HTTP estándar que soporte `Range`, como Apache, Nginx o Caddy [5]. Un servidor estático que no maneje rangos puede obligar al navegador a descargar el archivo completo, anulando parte de la ventaja de PMTiles.

## Conectar PMTiles directamente a MapLibre

Para una página estática, el cliente oficial `pmtiles.js` registra el protocolo `pmtiles://` y MapLibre solicita únicamente las teselas necesarias. El patrón documentado por MapLibre y Protomaps es el siguiente [2] [6]:

```html
<script src="https://unpkg.com/pmtiles@3.2.0/dist/pmtiles.js"></script>
<script type="module">
  import * as maplibregl from "https://unpkg.com/maplibre-gl@6.5.0/dist/maplibre-gl.mjs";

  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol("pmtiles", protocol.tile);

  const archiveUrl = new URL("./tiles/bogota-roads.pmtiles", window.location.href).href;
  const archive = new pmtiles.PMTiles(archiveUrl);
  protocol.add(archive);

  const map = new maplibregl.Map({
    container: "map",
    center: [-74.10, 4.66],
    zoom: 11.5,
    style: {
      version: 8,
      sources: {
        bogota: {
          type: "vector",
          url: `pmtiles://${archiveUrl}`,
          attribution: "© OpenStreetMap contributors"
        }
      },
      layers: [
        {
          id: "bogota-roads-casing",
          type: "line",
          source: "bogota",
          "source-layer": "roads",
          paint: { "line-color": "#ffffff", "line-width": 2.8, "line-opacity": 0.72 }
        },
        {
          id: "bogota-roads",
          type: "line",
          source: "bogota",
          "source-layer": "roads",
          paint: {
            "line-color": "#2d9790",
            "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.5, 14, 1.3, 17, 2.5],
            "line-opacity": 0.95
          }
        }
      ]
    }
  });
</script>
```

Si se utiliza `pmtiles serve` en vez de PMTiles directo, MapLibre puede consumir el TileJSON local:

```js
const localSource = {
  type: "vector",
  url: "http://localhost:8080/bogota-roads.json",
  attribution: "© OpenStreetMap contributors"
};
```

## Integración progresiva en Bogotá Viva

El navegador actual puede incorporar un selector `OSM público / PMTiles local`. En modo local, la capa `bogota-roads` reemplaza la colección GeoJSON de Overpass, mientras que los puntos culturales o de equipamientos pueden seguir cargándose desde GeoJSON local. La regla de zoom se conserva en MapLibre: a nivel macro se filtran autopistas y arteriales; a nivel meso se agregan vías secundarias y terciarias; a nivel micro se muestran residenciales y servicios.

La estrategia más robusta es conservar el orden de preferencia `PMTiles local → GeoJSON local → Overpass público → red procedural`. De esta forma la exposición sigue funcionando incluso sin conexión, pero el proyecto conserva la posibilidad de consultar datos recientes cuando el usuario la habilita.

## Tamaño, licencia y actualización

El archivo PBF de Colombia debe tratarse como un insumo de preparación y no necesariamente como un archivo que se descarga en cada visita. La fecha del extracto y la atribución de OpenStreetMap deben quedar registradas junto al PMTiles. Los datos de OpenStreetMap se distribuyen bajo ODbL; la página de Geofabrik también informa esa licencia y la atribución correspondiente [4].

Para una primera versión de Bogotá, conviene generar únicamente la capa vial en zoom 10–17 y excluir atributos que la interfaz no utiliza. Para una versión completa se pueden agregar capas separadas como `water`, `landuse`, `buildings`, `places` y `transit`, y combinarlas con `tile-join` o con el flujo de Planetiler. Mantener capas separadas permite encender y apagar Natural, Cultural y Tecnológica sin volver a descargar la red completa.

## Referencias

[1]: https://docs.protomaps.com/pmtiles/create "Protomaps · Creating PMTiles"
[2]: https://maplibre.org/maplibre-gl-js/docs/examples/pmtiles-source-and-protocol/ "MapLibre GL JS · PMTiles source and protocol"
[3]: https://github.com/felt/tippecanoe "Felt Tippecanoe · Vector tile generation"
[4]: https://download.geofabrik.de/south-america/colombia.html "Geofabrik · OpenStreetMap extract for Colombia"
[5]: https://docs.protomaps.com/pmtiles/cli "Protomaps · pmtiles CLI"
[6]: https://github.com/protomaps/PMTiles/blob/main/js/README.md "Protomaps PMTiles JavaScript API"
