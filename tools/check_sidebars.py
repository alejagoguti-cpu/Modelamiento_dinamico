from pathlib import Path
import re
import hashlib

ROOT = Path(__file__).resolve().parents[1]
PATTERN = re.compile(r'<aside\b[^>]*class="sidebar sidebar-icons-only"[^>]*>.*?</aside>', re.S)

blocks = []
for number in range(1, 10):
    path = ROOT / f"modulo-{number:02d}.html"
    text = path.read_text(encoding="utf-8")
    matches = PATTERN.findall(text)
    if len(matches) != 1:
        raise SystemExit(f"{path.name}: se esperaban 1 sidebar y se encontraron {len(matches)}")
    normalized = re.sub(r' active(?=")', '', matches[0])
    digest = hashlib.sha256(normalized.encode()).hexdigest()[:12]
    blocks.append((path.name, digest))

reference = blocks[1][1]
for name, digest in blocks:
    if digest != reference:
        raise SystemExit(f"{name}: sidebar distinta ({digest} != {reference})")
print("sidebar común verificada en 9 módulos")
for name, digest in blocks:
    print(f"{name}: {digest}")
