"""Copia header e footer comuni (src/partials) in tutte le pagine HTML.

Uso: python3 tools/sync_partials.py
Ogni pagina indica la voce di menu attiva con <body data-pagina="...">.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PARTIALS = {name: (ROOT / 'src' / 'partials' / f'{name}.html').read_text().rstrip() for name in ('header', 'footer')}

for page in sorted(ROOT.glob('*.html')):
    if page.name == '404.html':  # pagina autonoma, senza header/footer
        continue
    html = page.read_text()
    m = re.search(r'<body[^>]*data-pagina="([^"]*)"', html)
    attiva = m.group(1) if m else ''
    for name, block in PARTIALS.items():
        if attiva:
            block = block.replace(f'data-pagina="{attiva}" class="nav-link',
                                  f'data-pagina="{attiva}" aria-current="page" class="nav-link')
        tag = name.upper()
        html, n = re.subn(rf'<!-- {tag}:START -->.*?<!-- {tag}:END -->',
                          f'<!-- {tag}:START -->\n{block}\n<!-- {tag}:END -->', html, flags=re.S)
        if n != 1:
            raise SystemExit(f'{page.name}: segnaposto {tag} mancante')
    page.write_text(html)
    print('ok', page.name)
