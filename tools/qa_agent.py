#!/usr/bin/env python3
"""Agente QA determinista para Bogotá Viva.

Ejecuta auditorías locales y opcionalmente comprueba la versión pública.
Genera un informe Markdown y un resultado JSON aptos para CI.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_URL = "https://alejagoguti-cpu.github.io/Modelamiento_dinamico/modulo-05.html"
MODULES = [f"modulo-{i:02d}.html" for i in range(1, 10)]


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets: list[str] = []
        self.buttons: list[str] = []
        self.scripts: list[str] = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"a", "link", "img", "script"}:
            value = attrs.get("href") or attrs.get("src")
            if value:
                self.assets.append(value)
            if tag == "script" and value:
                self.scripts.append(value)
        if tag == "button":
            self.buttons.append((attrs.get("id") or "") + " " + (attrs.get("class") or ""))


def check_local_assets() -> list[str]:
    failures = []
    for html_path in sorted(ROOT.glob("*.html")):
        parser = AssetParser()
        parser.feed(html_path.read_text(encoding="utf-8", errors="ignore"))
        for asset in parser.assets:
            clean = asset.split("?", 1)[0].split("#", 1)[0]
            parsed = urlparse(clean)
            if not clean or parsed.scheme or clean.startswith(("data:", "javascript:", "/")):
                continue
            if not (ROOT / clean).exists():
                failures.append(f"{html_path.name}: recurso local ausente: {clean}")
    return failures


def check_javascript() -> list[str]:
    failures = []
    for js_path in sorted(ROOT.glob("*.js")):
        result = subprocess.run(["node", "--check", str(js_path)], capture_output=True, text=True)
        if result.returncode:
            failures.append(f"{js_path.name}: {result.stderr.strip()}")
    return failures


def check_sidebars() -> list[str]:
    failures = []
    pattern = re.compile(r'<aside class="sidebar sidebar-icons-only">.*?</aside>', re.S)
    reference = (ROOT / "modulo-02.html").read_text(encoding="utf-8", errors="ignore")
    reference_match = pattern.search(reference)
    if not reference_match:
        return ["modulo-02.html: no se encontró la sidebar de referencia"]
    reference_html = re.sub(r"\s+(?:is-active|active)(?=[\"'])", "", reference_match.group(0))
    reference_hash = hashlib.sha256(reference_html.encode()).hexdigest()
    for name in MODULES:
        path = ROOT / name
        if not path.exists():
            failures.append(f"{name}: módulo ausente")
            continue
        match = pattern.search(path.read_text(encoding="utf-8", errors="ignore"))
        if not match:
            failures.append(f"{name}: sidebar ausente")
        else:
            current = re.sub(r"\s+(?:is-active|active)(?=[\"'])", "", match.group(0))
            if hashlib.sha256(current.encode()).hexdigest() != reference_hash:
                failures.append(f"{name}: sidebar diferente a modulo-02.html")
    return failures


def check_module05_contract() -> list[str]:
    failures = []
    html = (ROOT / "modulo-05.html").read_text(encoding="utf-8", errors="ignore")
    js = (ROOT / "modulo-05.js").read_text(encoding="utf-8", errors="ignore")
    category_labels = [
        "Calles", "Peatonal y bici", "Transporte público", "Ferrocarril y metro", "Cables y aéreo",
        "Naturaleza", "Agua y humedales", "Bosques y cobertura", "Parques y recreación", "Deporte",
        "Equipamientos", "Educación", "Salud", "Cuidado y comunidad", "Cívico y público", "Servicios urbanos",
        "Comercio y empleo", "Alimentos y mercados", "Industria y producción", "Vivienda", "Edificaciones",
        "Usos del suelo", "Límites y barrios", "Patrimonio y cultura", "Turismo y atracciones", "Memoria y monumentos",
        "Infraestructura técnica", "Mobiliario vial",
    ]
    missing = [label for label in category_labels if label not in html and label not in js]
    if missing:
        failures.append("modulo-05: categorías ausentes en HTML/JS: " + ", ".join(missing))
    required_js = ["AbortController", "overpass-api.de", "nominatim.openstreetmap.org", "router.project-osrm.org", "osm-places"]
    for token in required_js:
        if token not in js:
            failures.append(f"modulo-05.js: falta integración o protección esperada: {token}")
    return failures


def check_public(url: str) -> list[str]:
    failures = []
    try:
        request = Request(url, headers={"User-Agent": "BogotaViva-QA/1.0"})
        with urlopen(request, timeout=20) as response:
            body = response.read().decode("utf-8", errors="ignore")
            if response.status != 200:
                failures.append(f"sitio público: HTTP {response.status}")
            if "modulo-05.js" not in body:
                failures.append("sitio público: no carga modulo-05.js")
            if "CATÁLOGO API · 28 CATEGORÍAS OSM" not in body:
                failures.append("sitio público: no muestra el catálogo de 28 categorías")
    except Exception as exc:
        failures.append(f"sitio público: {exc}")
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description="Auditoría QA de Bogotá Viva")
    parser.add_argument("--url", default=DEFAULT_URL, help="URL pública a comprobar")
    parser.add_argument("--skip-public", action="store_true", help="No comprobar GitHub Pages")
    parser.add_argument("--report-dir", default=str(ROOT / "qa-reports"))
    args = parser.parse_args()

    checks = {
        "recursos_locales": check_local_assets(),
        "javascript": check_javascript(),
        "sidebars": check_sidebars(),
        "contrato_modulo_05": check_module05_contract(),
    }
    if not args.skip_public:
        checks["sitio_publico"] = check_public(args.url)

    total_failures = sum(len(items) for items in checks.values())
    status = "PASS" if total_failures == 0 else "FAIL"
    timestamp = datetime.now(timezone.utc).isoformat()
    result = {"status": status, "timestamp": timestamp, "url": args.url, "checks": checks, "failures": total_failures}

    report_dir = Path(args.report_dir)
    report_dir.mkdir(parents=True, exist_ok=True)
    (report_dir / "qa-result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    lines = [f"# Informe QA · Bogotá Viva", "", f"**Estado:** {status}", f"**Fecha UTC:** {timestamp}", f"**URL:** {args.url}", ""]
    for name, failures in checks.items():
        label = "OK" if not failures else f"FALLÓ ({len(failures)})"
        lines.append(f"## {name}: {label}")
        if failures:
            lines.extend(f"- {failure}" for failure in failures)
        else:
            lines.append("Sin hallazgos.")
        lines.append("")
    (report_dir / "qa-report.md").write_text("\n".join(lines), encoding="utf-8")

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if status == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
