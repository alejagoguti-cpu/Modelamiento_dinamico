from pathlib import Path
import io, math
import requests
from PIL import Image, ImageOps, ImageEnhance

OUT = Path(__file__).resolve().parents[1] / "assets" / "bogota-osm-detail-gray.jpg"
OUT.parent.mkdir(parents=True, exist_ok=True)
Z = 13
WEST, SOUTH, EAST, NORTH = -74.25, 4.50, -73.95, 4.82

def tile_xy(lon, lat, z):
    n = 2 ** z
    x = int((lon + 180.0) / 360.0 * n)
    y = int((1.0 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2.0 * n)
    return x, y

x0, y0 = tile_xy(WEST, NORTH, Z)
x1, y1 = tile_xy(EAST, SOUTH, Z)
canvas = Image.new("RGB", ((x1 - x0 + 1) * 256, (y1 - y0 + 1) * 256), "#e9e9e9")
headers = {"User-Agent": "BogotaViva/1.0 educational cartography"}
for x in range(x0, x1 + 1):
    for y in range(y0, y1 + 1):
        url = f"https://tile.openstreetmap.org/{Z}/{x}/{y}.png"
        response = requests.get(url, headers=headers, timeout=20)
        response.raise_for_status()
        tile = Image.open(io.BytesIO(response.content)).convert("RGB")
        canvas.paste(tile, ((x - x0) * 256, (y - y0) * 256))

gray = ImageOps.grayscale(canvas).convert("RGB")
gray = ImageEnhance.Contrast(gray).enhance(1.12)
gray.save(OUT, quality=88, optimize=True, progressive=True)
print(f"saved={OUT} size={gray.size} tiles={(x1-x0+1)*(y1-y0+1)}")
