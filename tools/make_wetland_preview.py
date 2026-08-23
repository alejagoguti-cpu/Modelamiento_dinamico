from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "assets" / "planosnico.webp"
target = root / "assets" / "planosnico-preview.webp"

with Image.open(source) as image:
    image = image.convert("RGB")
    image.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
    image.save(target, "WEBP", quality=68, method=6)

print(f"preview={target}")
print(f"size={target.stat().st_size}")
print(f"dimensions={image.width}x{image.height}")
