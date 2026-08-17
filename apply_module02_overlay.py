from pathlib import Path

root = Path('/home/ubuntu/repo-modelamiento')
modules = ['04', '05', '06', '08']
link = '    <link rel="stylesheet" href="module02-system.css?v=module02-system-v1">\n'
for number in modules:
    path = root / f'modulo-{number}.html'
    text = path.read_text(encoding='utf-8')
    if 'module02-system.css' in text:
        continue
    marker = '</head>'
    if marker not in text:
        raise SystemExit(f'No se encontró </head> en {path}')
    text = text.replace(marker, link + marker, 1)
    path.write_text(text, encoding='utf-8')
print('Overlay enlazado en:', ', '.join(f'modulo-{n}.html' for n in modules))
print('Módulo 01 omitido: modulo-01.html no contiene HTML válido y requiere recuperación separada.')
