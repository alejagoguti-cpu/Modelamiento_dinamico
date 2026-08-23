from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import subprocess

root = Path('/home/ubuntu/Modelamiento_dinamico')
class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in {'href', 'src'} and value:
                clean = value.split('?', 1)[0].split('#', 1)[0]
                if clean and not urlparse(clean).scheme and not clean.startswith(('data:', 'javascript:', '#')):
                    self.links.append(clean)

missing = []
for html in sorted(root.glob('modulo-*.html')):
    parser = LinkParser()
    parser.feed(html.read_text(encoding='utf-8', errors='ignore'))
    misses = sorted({link for link in parser.links if not (root / link).exists()})
    print(f'{html.name}: local_links={len(parser.links)} missing={misses}')
    missing.extend((html.name, link) for link in misses)

js_failures = []
for js in sorted(root.glob('*.js')):
    result = subprocess.run(['node', '--check', str(js)], capture_output=True, text=True)
    if result.returncode:
        js_failures.append(js.name)
        print(f'JS_FAIL {js.name}: {result.stderr.strip()}')
    else:
        print(f'JS_OK {js.name}')

print(f'RESULT missing_links={len(missing)} js_failures={len(js_failures)}')
raise SystemExit(1 if missing or js_failures else 0)
