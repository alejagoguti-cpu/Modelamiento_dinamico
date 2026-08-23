import json
from pathlib import Path

checks = {
    "overpass_principal": "/tmp/overpass.json",
    "overpass_respaldo": "/tmp/overpass2.json",
    "nominatim": "/tmp/nominatim.json",
    "osrm": "/tmp/osrm.json",
}

lines = []
for name, path in checks.items():
    try:
        payload = json.loads(Path(path).read_text())
        if name.startswith("overpass"):
            ok = isinstance(payload, dict) and isinstance(payload.get("elements"), list)
            detail = f"elements={len(payload.get('elements', []))}"
        elif name == "nominatim":
            ok = isinstance(payload, list) and len(payload) > 0
            detail = f"results={len(payload)}"
        else:
            ok = isinstance(payload, dict) and payload.get("code") == "Ok" and bool(payload.get("routes"))
            detail = f"code={payload.get('code')} routes={len(payload.get('routes', []))}"
        lines.append(f"{name}: {'OK' if ok else 'FAIL'} ({detail})")
    except Exception as exc:
        lines.append(f"{name}: FAIL ({type(exc).__name__}: {exc})")

Path("api_smoke_results.txt").write_text("\n".join(lines) + "\n")
print("\n".join(lines))
