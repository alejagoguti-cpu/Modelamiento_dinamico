from pathlib import Path

root = Path(__file__).resolve().parents[1]
link = '<link rel="stylesheet" href="site-theme.css?v=20260823">'
updated = []
for path in sorted(root.glob('*.html')):
    text = path.read_text(encoding='utf-8')
    if 'site-theme.css' in text:
        continue
    marker = '</head>'
    if marker not in text.lower():
        continue
    pos = text.lower().find(marker)
    text = text[:pos] + '  ' + link + '\n' + text[pos:]
    path.write_text(text, encoding='utf-8')
    updated.append(path.name)
print('Tema común añadido a:', ', '.join(updated))
