from pathlib import Path
import re

root = Path('/home/ubuntu/Modelamiento_dinamico')
icons = [
    ('index.html', 'fa-house', 'Inicio'),
    ('modulo-01.html', 'fa-diagram-project', '01 · Construir la red'),
    ('modulo-02.html', 'fa-chart-simple', '02 · Medir la red'),
    ('modulo-03.html', 'fa-eye', '03 · Discurso vs realidad'),
    ('modulo-04.html', 'fa-bullseye', '04 · Macromodelos'),
    ('modulo-05.html', 'fa-magnifying-glass-location', '05 · Navegador multiescalar'),
    ('modulo-06.html', 'fa-earth-americas', '06 · POT ↔ ODS'),
    ('modulo-07.html', 'fa-flask', '07 · Simulador'),
    ('modulo-08.html', 'fa-wave-square', '08 · Lectura dinámica'),
    ('modulo-09.html', 'fa-atom', '09 · Modelo propio'),
]


def make_sidebar(active_file):
    rows = []
    for href, icon, title in icons:
        active = ' active' if href == active_file else ''
        rows.append(f'      <a href="{href}" class="icon-nav-item{active}" title="{title}"><i class="fa-solid {icon}"></i></a>')
    return '''  <aside class="sidebar sidebar-icons-only">
    <a class="brand-icon" href="index.html" title="Bogotá Viva · Inicio" aria-label="Inicio"><i class="fa-solid fa-diagram-project"></i></a>
    <nav class="icon-nav" aria-label="Módulos">
''' + '\n'.join(rows) + '''
    </nav>

    <div class="icon-nav-footer">
      <a href="configuracion.html" class="icon-nav-item" title="Configuración"><i class="fa-solid fa-gear"></i></a>
      <a href="demo.html" class="icon-nav-item" title="Salir"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
    </div>
  </aside>'''


pattern = re.compile(r'<aside\b[^>]*class="sidebar sidebar-icons-only"[^>]*>.*?</aside>', flags=re.S)
for path in sorted(root.glob('modulo-*.html')):
    if path.name not in {href for href, _, _ in icons}:
        continue
    text = path.read_text(encoding='utf-8')
    matches = list(pattern.finditer(text))
    if not matches:
        raise SystemExit(f'No se pudo localizar una sidebar en {path}')
    for match in reversed(matches[1:]):
        text = text[:match.start()] + text[match.end():]
    replacement = make_sidebar(path.name)
    updated, count = pattern.subn(replacement, text, count=1)
    if count != 1:
        raise SystemExit(f'No se pudo reemplazar la sidebar en {path}')
    path.write_text(updated, encoding='utf-8')
    print(f'actualizado {path.name}')

# Ensure the module-02 template itself remains the source-compatible shape.
print('sidebar unificada en 9 módulos')
