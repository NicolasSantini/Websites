"""Rigenera le parti statiche che vengono dal blog WordPress.com.

Uso: python3 tools/build_archivio.py

- archivio.html, tra <!-- ARCHIVIO:START --> e <!-- ARCHIVIO:END -->: tutti gli articoli per anno e le pagine storiche
- index.html, tra <!-- ULTIME:START --> e <!-- ULTIME:END -->: gli ultimi 3 articoli

Sono copie di riserva per motori di ricerca e browser senza JavaScript: con JavaScript il sito
legge comunque gli articoli nuovi in tempo reale (assets/site.js), quindi non serve rilanciarlo
a ogni articolo pubblicato. Articoli e pagine si aprono in notizia.html con la grafica del sito.
"""
import datetime
import html
import json
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
API = 'https://public-api.wordpress.com/wp/v2/sites/64730052'  # ID del blog: non dipende dal dominio
VECCHIO = 'https://corriconlelinci.wordpress.com'
MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']
# Pagine del vecchio sito il cui contenuto è già nelle nuove pagine
GIA_NEL_NUOVO_SITO = {'il-branco', 'effemeride', 'about', 'trail-sul-trebbio', 'sveglia-presto-running',
                      'sotto-la-luna-e-la-torre', 'corse-luppoline', 'aperitivo-di-natale', 'linci-on-mountains',
                      'abbigliamento'}


def scarica(tipo):
    voci, pagina = [], 1
    while True:
        url = f'{API}/{tipo}?per_page=100&page={pagina}&_fields=date,slug,link,title,parent,excerpt,content'
        with urllib.request.urlopen(url, timeout=60) as r:
            voci += json.load(r)
            totale = int(r.headers.get('X-WP-TotalPages', 1))
        if pagina >= totale:
            return voci
        pagina += 1


def link_vecchio(url):
    return re.sub(r'^https?://(www\.)?corriconlelinci\.com', VECCHIO, url)


def immagine(html_contenuto):
    m = re.search(r'<img[^>]+src="([^"?]+)', html_contenuto)
    return link_vecchio(m.group(1)) if m else None


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
        out.append(f'<details data-anno-archivio="{anno}" class="card"{" open" if i == 0 else ""}>')
        out.append(f'  <summary class="flex min-h-[44px] cursor-pointer items-center justify-between font-display text-3xl font-extrabold">{anno} <span class="chip bg-blu-100 font-sans text-blu-900">{len(voci)}</span></summary>')
        out.append('  <ul class="mt-3 divide-y divide-blu-100">')
        for a in voci:
            t = titolo(a)
            d = datetime.date.fromisoformat(a['date'][:10])
            out.append(f'    <li data-titolo="{html.escape(t.lower())}" data-slug="{a["slug"]}"><a href="notizia.html?articolo={a["slug"]}" class="flex min-h-[44px] items-baseline gap-3 py-2 hover:text-blu-700">'
                       f'<time datetime="{d}" class="w-14 shrink-0 text-sm text-blu-800/70">{d.day} {MESI[d.month - 1]}</time><span>{html.escape(t)}</span></a></li>')
        out.append('  </ul>')
        out.append('</details>')

    out.append('<h2 id="pagine" class="titolo mt-12">Pagine storiche</h2>')
    out.append('<ul class="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">')
    for p in sorted(pagine, key=titolo):
        out.append(f'  <li><a href="notizia.html?pagina={p["slug"]}" class="flex min-h-[48px] items-center rounded-xl bg-white px-4 font-medium ring-1 ring-blu-100 hover:ring-blu-700">{html.escape(titolo(p).capitalize())}</a></li>')
    out.append('</ul>')
    ultime = []
    for a in articoli[:3]:
        img = immagine(a['content']['rendered'])
        estratto = html.unescape(re.sub(r'<[^>]+>', '', a['excerpt']['rendered'])).strip()
        d = datetime.date.fromisoformat(a['date'][:10])
        ultime.append(f'<li><a href="notizia.html?articolo={a["slug"]}" class="card flex h-full flex-col overflow-hidden p-0 hover:ring-blu-700">'
                      + (f'<img src="{img}?w=600&amp;h=340&amp;crop=1" alt="" loading="lazy" class="aspect-[16/9] w-full object-cover">' if img else
                         '<div class="grid aspect-[16/9] place-items-center bg-giallo-400 font-mano text-4xl text-blu-950">grr grr grr</div>')
                      + f'<div class="p-5"><time datetime="{a["date"]}" class="text-sm text-blu-800/70">{d.day} {MESI[d.month - 1]} {d.year}</time>'
                      f'<p class="mt-1 font-display text-2xl font-bold leading-tight">{html.escape(titolo(a))}</p>'
                      f'<p class="mt-2 line-clamp-3 text-sm text-blu-800/80">{html.escape(estratto)}</p></div></a></li>')
    return '\n'.join(out), '\n'.join(ultime), len(articoli), len(pagine)


def sostituisci(nome_file, segnaposto, blocco):
    file = ROOT / nome_file
    testo, n = re.subn(rf'<!-- {segnaposto}:START -->.*?<!-- {segnaposto}:END -->',
                       lambda _: f'<!-- {segnaposto}:START -->\n{blocco}\n<!-- {segnaposto}:END -->', file.read_text(), flags=re.S)
    if n != 1:
        raise SystemExit(f'segnaposto {segnaposto} mancante in {nome_file}')
    file.write_text(testo)


if __name__ == '__main__':
    archivio, ultime, n_art, n_pag = genera()
    sostituisci('archivio.html', 'ARCHIVIO', archivio)
    sostituisci('index.html', 'ULTIME', ultime)
    print(f'archivio.html: {n_art} articoli, {n_pag} pagine storiche · index.html: ultimi 3 articoli')
