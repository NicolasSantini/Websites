"""Genera l'elenco dell'archivio in archivio.html dagli articoli del vecchio blog WordPress.com.

Uso: python3 tools/build_archivio.py
Scarica titoli e date dall'API pubblica di WordPress.com e riscrive il blocco tra
<!-- ARCHIVIO:START --> e <!-- ARCHIVIO:END -->. I link puntano a corriconlelinci.wordpress.com,
l'indirizzo che resta attivo anche dopo il passaggio del dominio al nuovo sito.
"""
import datetime
import html
import json
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
API = 'https://public-api.wordpress.com/wp/v2/sites/corriconlelinci.com'
VECCHIO = 'https://corriconlelinci.wordpress.com'
MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']
# Pagine del vecchio sito il cui contenuto è già nelle nuove pagine
GIA_NEL_NUOVO_SITO = {'il-branco', 'effemeride', 'about', 'trail-sul-trebbio', 'sveglia-presto-running',
                      'sotto-la-luna-e-la-torre', 'corse-luppoline', 'aperitivo-di-natale', 'linci-on-mountains',
                      'abbigliamento'}


def scarica(tipo):
    voci, pagina = [], 1
    while True:
        url = f'{API}/{tipo}?per_page=100&page={pagina}&_fields=date,slug,link,title,parent'
        with urllib.request.urlopen(url, timeout=60) as r:
            voci += json.load(r)
            totale = int(r.headers.get('X-WP-TotalPages', 1))
        if pagina >= totale:
            return voci
        pagina += 1


def link_vecchio(url):
    return re.sub(r'^https?://(www\.)?corriconlelinci\.com', VECCHIO, url)


def titolo(voce):
    return html.unescape(re.sub(r'<[^>]+>', '', voce['title']['rendered'])).strip() or '(senza titolo)'


def genera():
    articoli = sorted(scarica('posts'), key=lambda p: p['date'], reverse=True)
    pagine = [p for p in scarica('pages') if p['slug'] not in GIA_NEL_NUOVO_SITO]

    per_anno = {}
    for a in articoli:
        per_anno.setdefault(a['date'][:4], []).append(a)

    out = [f'<p class="text-sm text-blu-800/80"><span data-conteggio>{len(articoli)}</span> articoli dal {min(per_anno)} al {max(per_anno)} · aggiornato il {datetime.date.today():%d/%m/%Y}</p>']
    for i, (anno, voci) in enumerate(sorted(per_anno.items(), reverse=True)):
        out.append(f'<details data-anno-archivio class="card"{" open" if i == 0 else ""}>')
        out.append(f'  <summary class="flex min-h-[44px] cursor-pointer items-center justify-between font-display text-3xl font-extrabold">{anno} <span class="chip bg-blu-100 font-sans text-blu-900">{len(voci)}</span></summary>')
        out.append('  <ul class="mt-3 divide-y divide-blu-100">')
        for a in voci:
            t = titolo(a)
            d = datetime.date.fromisoformat(a['date'][:10])
            out.append(f'    <li data-titolo="{html.escape(t.lower())}"><a href="{link_vecchio(a["link"])}" target="_blank" rel="noopener" class="flex min-h-[44px] items-baseline gap-3 py-2 hover:text-blu-700">'
                       f'<time datetime="{d}" class="w-14 shrink-0 text-sm text-blu-800/70">{d.day} {MESI[d.month - 1]}</time><span>{html.escape(t)}</span></a></li>')
        out.append('  </ul>')
        out.append('</details>')

    out.append('<h2 id="pagine" class="titolo mt-12">Pagine storiche</h2>')
    out.append('<ul class="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">')
    for p in sorted(pagine, key=titolo):
        out.append(f'  <li><a href="{link_vecchio(p["link"])}" target="_blank" rel="noopener" class="flex min-h-[48px] items-center rounded-xl bg-white px-4 font-medium ring-1 ring-blu-100 hover:ring-blu-700">{html.escape(titolo(p).capitalize())} ↗</a></li>')
    out.append('</ul>')
    return '\n'.join(out), len(articoli), len(pagine)


if __name__ == '__main__':
    blocco, n_art, n_pag = genera()
    file = ROOT / 'archivio.html'
    testo, n = re.subn(r'<!-- ARCHIVIO:START -->.*?<!-- ARCHIVIO:END -->',
                       lambda _: f'<!-- ARCHIVIO:START -->\n{blocco}\n<!-- ARCHIVIO:END -->', file.read_text(), flags=re.S)
    if n != 1:
        raise SystemExit('segnaposto ARCHIVIO mancante in archivio.html')
    file.write_text(testo)
    print(f'archivio.html: {n_art} articoli, {n_pag} pagine storiche')
