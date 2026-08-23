from pathlib import Path

root = Path('/home/ubuntu/Modelamiento_dinamico')
for path in sorted(root.glob('*.html')):
    if path.name == 'dashboard.html':
        continue
    text = path.read_text(encoding='utf-8')
    original = text
    replacements = {
        'href="dashboard.html"': 'href="index.html"',
        'Volver al dashboard': 'Volver al inicio',
        'title="Dashboard"': 'title="Inicio"',
        'aria-label="Dashboard"': 'aria-label="Inicio"',
        '<span>Dashboard</span>': '<span>Inicio</span>',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'actualizado {path.name}')
