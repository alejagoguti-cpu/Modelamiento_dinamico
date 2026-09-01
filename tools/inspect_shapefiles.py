from pathlib import Path

try:
    import shapefile
except ImportError as exc:
    raise SystemExit(f"pyshp no instalado: {exc}")

for path in sorted(Path('/home/ubuntu/Modelamiento_dinamico/assets/gis_bogota').glob('*.shp')):
    reader = shapefile.Reader(str(path), load=False)
    print(path.name, 'shapeType=', reader.shapeType, 'records=', len(reader))
    first = next(iter(reader.iterShapes()), None)
    print('bbox=', reader.bbox, 'first_points=', len(first.points) if first else 0)
