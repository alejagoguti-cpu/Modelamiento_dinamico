import json
from collections import defaultdict
from pathlib import Path
import shapefile

ROOT = Path('/home/ubuntu/Modelamiento_dinamico')
SRC = ROOT / 'assets' / 'gis_bogota'
OUT = ROOT / 'assets' / 'kennedy_ecology.json'

# Calibración ya documentada en modulo-08-sumo.js: coordenadas geográficas -> SUMO local.
GEO_ORIG = {'minLon': -74.219402, 'minLat': 4.597853, 'maxLon': -74.096915, 'maxLat': 4.737337}
W, H = 10682.66, 6323.80
CORR = {'dLon': 0.0005382763434624849, 'dLat': 0.0005305220023128498}

def local(lon, lat):
    lon -= CORR['dLon']; lat -= CORR['dLat']
    return [((lon - GEO_ORIG['minLon']) / (GEO_ORIG['maxLon'] - GEO_ORIG['minLon'])) * W,
            ((lat - GEO_ORIG['minLat']) / (GEO_ORIG['maxLat'] - GEO_ORIG['minLat'])) * H]

def inside(lon, lat):
    return GEO_ORIG['minLon'] <= lon <= GEO_ORIG['maxLon'] and GEO_ORIG['minLat'] <= lat <= GEO_ORIG['maxLat']

def simplify(points, step=3):
    if len(points) <= 180: return points
    out = points[::step]
    if out[-1] != points[-1]: out.append(points[-1])
    return out

# Cobertura vegetal: se conserva como geometría derivada para visualización, con vertices
# reducidos únicamente para rendimiento; el shapefile original permanece intacto.
coverage = []
reader = shapefile.Reader(str(SRC / 'Cober_vege_humedales.shp'), load=False)
for shape in reader.iterShapes():
    if not shape.bbox or shape.bbox[2] < GEO_ORIG['minLon'] or shape.bbox[0] > GEO_ORIG['maxLon'] or shape.bbox[3] < GEO_ORIG['minLat'] or shape.bbox[1] > GEO_ORIG['maxLat']:
        continue
    rings, ring = [], []
    for x, y in shape.points:
        if inside(x, y): ring.append(local(x, y))
        elif ring:
            if len(ring) >= 3: rings.append(simplify(ring))
            ring = []
    if len(ring) >= 3: rings.append(simplify(ring))
    if rings: coverage.append(rings)

# Arbolado: celdas de 60 m; cada valor es el conteo real de puntos dentro de la celda.
trees = defaultdict(int)
reader = shapefile.Reader(str(SRC / 'ArboladoUrbano.shp'), load=False)
for shape in reader.iterShapes():
    x, y = shape.points[0]
    if inside(x, y):
        lx, ly = local(x, y)
        gx, gy = int(lx // 60), int(ly // 60)
        trees[(gx, gy)] += 1

tree_cells = [{'x': gx * 60 + 30, 'y': gy * 60 + 30, 'count': n} for (gx, gy), n in trees.items()]

payload = {
    'version': 1,
    'sourceCrs': 'GCS_MAGNA (grados; definición recibida en ArboladoUrbano.prj)',
    'target': 'SUMO local coordinates; calibrated extent in modulo-08-sumo.js',
    'coverage': coverage,
    'treeCells': tree_cells,
    'treeSourceCount': 0,
    'treeCellSizeMeters': 60,
}
# El contador exacto se obtiene sin recorrer de nuevo toda la tabla.
payload['treeSourceCount'] = sum(trees.values())
OUT.write_text(json.dumps(payload, separators=(',', ':')), encoding='utf-8')
print('coverage_features=', len(coverage), 'tree_cells=', len(tree_cells), 'tree_points=', payload['treeSourceCount'], 'bytes=', OUT.stat().st_size)
