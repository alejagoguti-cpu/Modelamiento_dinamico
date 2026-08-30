#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INPUT="${1:-$ROOT/vias.geojson}"
OUTPUT="${2:-$ROOT/tiles/bogota-roads.pmtiles}"

if ! command -v tippecanoe >/dev/null 2>&1; then
  echo "Falta tippecanoe. Instálalo desde https://github.com/felt/tippecanoe" >&2
  exit 1
fi
if [[ ! -f "$INPUT" ]]; then
  echo "No existe el GeoJSON de entrada: $INPUT" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"
echo "Generando PMTiles de calles desde: $INPUT"
tippecanoe \
  -o "$OUTPUT" \
  -l roads \
  -n "Bogotá Viva · Red vial OSM" \
  -zg -Z10 -z17 \
  --drop-densest-as-needed \
  --extend-zooms-if-still-dropping \
  "$INPUT"

if command -v pmtiles >/dev/null 2>&1; then
  pmtiles verify "$OUTPUT"
  pmtiles show "$OUTPUT" --metadata
fi

echo
echo "Archivo creado: $OUTPUT"
echo "Para servirlo como endpoint local:"
echo "  pmtiles serve $(dirname "$OUTPUT") --port 8080 --cors='*' --public-url=http://localhost:8080"
echo "TileJSON esperado: http://localhost:8080/$(basename "$OUTPUT" .pmtiles).json"
