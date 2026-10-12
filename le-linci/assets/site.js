// Le Linci - script comune a tutte le pagine. Nessuna dipendenza esterna.
(function () {
  'use strict';
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var pad = function (n) { return String(n).padStart(2, '0'); };

  // Anno corrente nel footer
  $$('[data-anno]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Conto alla rovescia: <div data-countdown="2026-11-15T09:30:00+01:00"> con figli [data-cd=d|h|m|s]
  $$('[data-countdown]').forEach(function (box) {
    var target = new Date(box.dataset.countdown).getTime();
    var part = function (k) { return $('[data-cd="' + k + '"]', box); };
    function tick() {
      var diff = Math.max(0, target - Date.now());
      part('d').textContent = Math.floor(diff / 864e5);
      part('h').textContent = pad(Math.floor(diff / 36e5) % 24);
      part('m').textContent = pad(Math.floor(diff / 6e4) % 60);
      part('s').textContent = pad(Math.floor(diff / 1e3) % 60);
    }
    tick();
    setInterval(tick, 1000);
  });

  // Aggiungi al calendario: file .ics generato al volo (iPhone e Android)
  function scarica(nome, tipo, testo) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([testo], { type: tipo }));
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  $$('[data-ics]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var d = btn.dataset;
      var fmt = function (x) { return new Date(x).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
      var esc = function (s) { return s.replace(/([,;])/g, '\\$1'); };
      scarica(d.ics + '.ics', 'text/calendar', [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Le Linci//Eventi//IT', 'BEGIN:VEVENT',
        'UID:' + d.ics + '@corriconlelinci.com', 'DTSTAMP:' + fmt(Date.now()),
        'DTSTART:' + fmt(d.inizio), 'DTEND:' + fmt(d.fine),
        'SUMMARY:' + esc(d.titolo), 'LOCATION:' + esc(d.luogo),
        'URL:https://corriconlelinci.com/trail-sul-trebbio',
        'END:VEVENT', 'END:VCALENDAR'
      ].join('\r\n'));
    });
  });

  // Rubrica: salva i numeri dell'organizzazione (materiale obbligatorio del Trebbio)
  $$('[data-vcard]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tel = btn.dataset.vcard.split(',').map(function (n) { return 'TEL;TYPE=CELL:' + n.trim(); });
      scarica('organizzazione-trail-sul-trebbio.vcf', 'text/vcard',
        ['BEGIN:VCARD', 'VERSION:3.0', 'FN:Trail sul Trebbio - Organizzazione', 'ORG:Le Linci - Branco Podistico']
          .concat(tel, ['EMAIL:trailsultrebbio@gmail.com', 'END:VCARD']).join('\r\n'));
    });
  });

  // Copia negli appunti (IBAN, causale)
  $$('[data-copia]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var testo = btn.dataset.copia, etichetta = btn.textContent;
      var fatto = function () { btn.textContent = 'Copiato ✓'; setTimeout(function () { btn.textContent = etichetta; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(testo).then(fatto, function () {});
    });
  });

  // Barra "Iscriviti" in basso su mobile: compare quando il pulsante principale esce dallo schermo
  var barra = $('[data-barra-cta]');
  if (barra) {
    var bersaglio = $(barra.dataset.barraCta);
    if (bersaglio && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (voci) {
        var v = voci[0];
        barra.classList.toggle('translate-y-full', v.isIntersecting || v.boundingClientRect.top > 0);
      }).observe(bersaglio);
    } else {
      barra.classList.remove('translate-y-full');
    }
  }

  // Calendario: segna gli eventi passati e il prossimo in arrivo (<li data-quando="2026-07-12">)
  $$('[data-calendario]').forEach(function (lista) {
    var oggi = new Date(); oggi.setHours(0, 0, 0, 0);
    var prossimo = null;
    $$('[data-quando]', lista).forEach(function (li) {
      var fine = new Date((li.dataset.fino || li.dataset.quando) + 'T23:59:59');
      var badge = $('[data-stato]', li);
      if (li.hasAttribute('data-ricorrente') && fine >= oggi) {
        if (badge) badge.textContent = 'In corso';
        return;
      }
      if (fine < oggi) {
        li.classList.add('opacity-60');
        if (badge) { badge.textContent = 'Fatto'; badge.dataset.stato = 'passato'; }
      } else if (!prossimo) {
        prossimo = li;
        li.classList.add('ring-2', 'ring-giallo-400');
        if (badge) { badge.textContent = 'Prossimo'; badge.dataset.stato = 'prossimo'; }
        // nei calendari a scorrimento orizzontale parti dal prossimo evento
        if (lista.scrollWidth > lista.clientWidth) lista.scrollLeft += li.getBoundingClientRect().left - lista.getBoundingClientRect().left - 16;
      } else if (badge) {
        badge.textContent = 'In arrivo';
      }
    });
  });

  // Archivio: filtro per titolo
  var filtro = $('[data-filtro]');
  if (filtro) {
    var voci = $$('[data-titolo]');
    var anni = $$('[data-anno-archivio]');
    var conteggio = $('[data-conteggio]');
    filtro.addEventListener('input', function () {
      var q = filtro.value.trim().toLowerCase();
      var visibili = 0;
      voci.forEach(function (li) {
        var ok = !q || li.dataset.titolo.indexOf(q) !== -1;
        li.hidden = !ok;
        if (ok) visibili++;
      });
      anni.forEach(function (sez) {
        sez.hidden = !$$('[data-titolo]:not([hidden])', sez).length;
        if (q) sez.open = true;
      });
      if (conteggio) conteggio.textContent = visibili;
    });
  }

  // Avviso per i contenuti ancora da fornire (es. traccia GPX ufficiale)
  var toast = $('#toast'), timer;
  $$('[data-da-fornire]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!toast) return;
      e.preventDefault();
      toast.textContent = a.dataset.daFornire;
      toast.classList.remove('opacity-0');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.add('opacity-0'); }, 3500);
    });
  });

  // Moduli (contatti): FormSubmit inoltra il messaggio alla casella email delle Linci.
  // Funziona su qualsiasi hosting statico (GitHub Pages, Netlify, Cloudflare) e anche senza JavaScript.
  $$('form[data-modulo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var esito = $('[data-esito]', form), btn = $('button[type="submit"]', form);
      var mostra = function (msg, ok) {
        esito.textContent = msg;
        esito.className = 'mt-3 rounded-xl p-3 text-sm ' + (ok ? 'bg-azzurro-100 text-blu-900' : 'bg-giallo-100 text-blu-900');
      };
      if (location.protocol === 'file:') {
        mostra('Anteprima: sul sito online il messaggio arriva nella casella email delle Linci.', true);
        form.reset();
        return;
      }
      btn.disabled = true;
      fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form)
      }).then(function (r) { return r.json(); }).then(function (j) {
        if (String(j.success) !== 'true') throw new Error(j.message);
        mostra('Grazie! Ti rispondiamo appena rientriamo dal Linciodromo. Grr grr grr!', true);
        form.reset();
      }).catch(function () {
        mostra('Invio non riuscito: riprova oppure scrivici a lelinci.brancopodistico@gmail.com', false);
      }).finally(function () { btn.disabled = false; });
    });
  });

  // ================= Contenuti da WordPress.com =================
  // Le Linci continuano a scrivere articoli e pagine su WordPress.com (anche dall'app sul telefono):
  // il sito li legge dall'API pubblica e li mostra con la sua grafica, senza pubblicità.
  // ID numerico del blog: resta valido anche dopo il passaggio del dominio al nuovo sito
  var WP = 'https://public-api.wordpress.com/wp/v2/sites/64730052';
  var VECCHIO = 'https://corriconlelinci.wordpress.com';
  var MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
  // Pagine del vecchio sito che ora hanno una pagina nuova dedicata
  var PAGINE_NUOVE = {
    'il-branco': 'branco.html', 'about': 'contatti.html', 'effemeride': 'eventi.html',
    'trail-sul-trebbio': 'trail-sul-trebbio.html', 'abbigliamento': 'branco.html#abbigliamento',
    'sveglia-presto-running': 'eventi.html#sveglia-presto', 'sotto-la-luna-e-la-torre': 'eventi.html#sotto-la-luna'
  };

  function wp(percorso) {
    return fetch(WP + percorso).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }
  function soloTesto(html) { return new DOMParser().parseFromString(html, 'text/html').body.textContent.trim(); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
  function dataIt(iso) { var d = new Date(iso); return d.getDate() + ' ' + MESI[d.getMonth()] + ' ' + d.getFullYear(); }

  // Indirizzi del vecchio sito -> nuovo sito (articoli e pagine si leggono qui, le foto restano su WordPress.com)
  function nuovoLink(url) {
    var m = String(url).match(/^https?:\/\/(?:www\.)?corriconlelinci\.(?:com|wordpress\.com)(\/[^?#]*)?([?#].*)?$/);
    if (!m) return url;
    var path = m[1] || '/';
    if (path.indexOf('/wp-content/') === 0) return VECCHIO + path + (m[2] || '');
    var art = path.match(/^\/\d{4}\/\d{2}\/\d{2}\/([^/]+)/);
    if (art) return 'notizia.html?articolo=' + art[1];
    var parti = path.split('/').filter(Boolean);
    if (!parti.length) return 'index.html';
    if (parti[0] === 'category' || parti[0] === 'tag') return 'archivio.html';
    var slug = parti[parti.length - 1];
    return PAGINE_NUOVE[slug] || 'notizia.html?pagina=' + slug;
  }
  window.LinciNuovoLink = nuovoLink;

  // Video YouTube: si carica solo dopo il clic (nessun cookie né richiesta a Google prima)
  function attivaVideo(box) {
    var id = box.dataset.youtube;
    box.innerHTML = '<button type="button" class="group grid aspect-video w-full place-items-center rounded-2xl bg-blu-900 text-white">' +
      '<span class="flex flex-col items-center gap-3"><span class="grid h-16 w-16 place-items-center rounded-full bg-giallo-400 text-blu-950 transition group-hover:scale-110">' +
      '<svg class="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>' +
      '<span class="px-4 text-center font-semibold">' + esc(box.dataset.titolo || 'Guarda il video') + '</span>' +
      '<span class="text-xs text-white/60">Si apre il video di YouTube</span></span></button>';
    $('button', box).addEventListener('click', function () {
      box.innerHTML = '<iframe class="aspect-video w-full rounded-2xl" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
        '?autoplay=1&rel=0" title="' + esc(box.dataset.titolo || 'Video') + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    });
  }
  $$('[data-youtube]').forEach(attivaVideo);

  // Ripulisce l'HTML che arriva da WordPress prima di mostrarlo
  function pulisci(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    $$('script,style,link,meta,base,form,input,button,textarea,select,object,embed,noscript,svg,.sharedaddy,#jp-post-flair', doc)
      .forEach(function (n) { n.remove(); });
    $$('iframe', doc).forEach(function (f) {
      var m = (f.getAttribute('src') || '').match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/);
      if (!m) { f.remove(); return; }
      var box = doc.createElement('div');
      box.setAttribute('data-youtube', m[1]);
      f.replaceWith(box);
    });
    $$('*', doc).forEach(function (el) {
      Array.prototype.slice.call(el.attributes).forEach(function (a) {
        var n = a.name.toLowerCase();
        if (n.indexOf('on') === 0 || n === 'style' || n === 'srcset' || n === 'sizes' ||
            ((n === 'href' || n === 'src') && /^\s*(javascript|data|vbscript):/i.test(a.value))) el.removeAttribute(a.name);
      });
    });
    $$('a[href]', doc).forEach(function (a) {
      var url = nuovoLink(a.getAttribute('href'));
      a.setAttribute('href', url);
      if (url.indexOf('/wp-content/uploads/') !== -1) a.setAttribute('data-foto', '');
      else if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
    $$('img', doc).forEach(function (img) {
      img.setAttribute('src', nuovoLink(img.getAttribute('src') || ''));
      img.setAttribute('loading', 'lazy');
    });
    return doc.body;
  }
  function inserisci(dove, html) {
    var corpo = pulisci(html);
    dove.textContent = '';
    Array.prototype.slice.call(corpo.childNodes).forEach(function (n) { dove.appendChild(document.importNode(n, true)); });
    $$('[data-youtube]', dove).forEach(attivaVideo);
  }

  // Immagini che non esistono più su WordPress (rotte anche sul vecchio sito): si nascondono
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || img.src.indexOf('/wp-content/uploads/') === -1) return;
    var cont = img.closest('a[data-foto]') || img.closest('figure') || img;
    cont.style.display = 'none';
  }, true);

  // Foto a schermo intero
  var lightbox;
  function apriFoto(src, alt) {
    if (!lightbox) {
      lightbox = document.createElement('dialog');
      lightbox.className = 'max-h-[92vh] max-w-[94vw] overflow-visible bg-transparent p-0 backdrop:bg-blu-950/90';
      lightbox.innerHTML = '<img class="max-h-[88vh] w-auto rounded-xl" alt="">' +
        '<form method="dialog" class="mt-2 text-center"><button class="btn bg-white text-blu-950">Chiudi</button></form>';
      lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
      document.body.appendChild(lightbox);
    }
    var img = $('img', lightbox);
    img.src = src;
    img.alt = alt || '';
    lightbox.showModal();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-foto]');
    if (!a || !window.HTMLDialogElement) return;
    e.preventDefault();
    var img = $('img', a);
    apriFoto(a.href.split('?')[0] + '?w=1600', img ? img.alt : '');
  });

  // Gallerie: <div data-wp-galleria="slug-pagina-wordpress" data-max="12" data-stile="loghi">
  // Le foto si aggiungono o tolgono direttamente dalla pagina su WordPress.
  $$('[data-wp-galleria]').forEach(function (box) {
    wp('/pages?slug=' + encodeURIComponent(box.dataset.wpGalleria) + '&_fields=content').then(function (r) {
      if (!r.length) throw new Error('pagina non trovata');
      var doc = new DOMParser().parseFromString(r[0].content.rendered, 'text/html');
      var visti = {}, foto = [];
      $$('img', doc).forEach(function (img) {
        var src = nuovoLink((img.getAttribute('src') || '').split('?')[0]);
        if (/^https:\/\//.test(src) && !visti[src]) { visti[src] = 1; foto.push({ src: src, alt: img.getAttribute('alt') || '' }); }
      });
      if (box.dataset.recenti !== undefined) foto.reverse();
      var loghi = box.dataset.stile === 'loghi';
      box.innerHTML = foto.slice(0, +box.dataset.max || foto.length).map(function (f) {
        return '<a data-foto href="' + esc(f.src) + '" class="block overflow-hidden rounded-xl ' + (loghi ? 'bg-white p-3 ring-1 ring-blu-100' : 'bg-blu-100') + '">' +
          '<img src="' + esc(f.src) + (loghi ? '?w=300' : '?w=400&h=400&crop=1') + '" alt="' + esc(f.alt) + '" loading="lazy" class="' +
          (loghi ? 'h-20 w-full object-contain' : 'aspect-square w-full object-cover transition hover:scale-105') + '"></a>';
      }).join('');
      box.style.display = foto.length ? '' : 'none';
    }).catch(function () { box.style.display = 'none'; });
  });

  // Ultimi articoli (home): sostituisce l'elenco statico di riserva con quello aggiornato
  $$('[data-wp-ultime]').forEach(function (box) {
    wp('/posts?per_page=' + (box.dataset.wpUltime || 3) + '&_fields=slug,title,date,excerpt,content').then(function (articoli) {
      box.innerHTML = articoli.map(function (a) {
        var img = (a.content.rendered.match(/<img[^>]+src="([^"?]+)/) || [])[1];
        return '<li><a href="notizia.html?articolo=' + esc(a.slug) + '" class="card flex h-full flex-col overflow-hidden p-0 hover:ring-blu-700">' +
          (img ? '<img src="' + esc(nuovoLink(img)) + '?w=600&h=340&crop=1" alt="" loading="lazy" class="aspect-[16/9] w-full object-cover">'
               : '<div class="grid aspect-[16/9] place-items-center bg-giallo-400 font-mano text-4xl text-blu-950">grr grr grr</div>') +
          '<div class="p-5"><time datetime="' + esc(a.date) + '" class="text-sm text-blu-800/70">' + dataIt(a.date) + '</time>' +
          '<p class="mt-1 font-display text-2xl font-bold leading-tight">' + esc(soloTesto(a.title.rendered)) + '</p>' +
          '<p class="mt-2 line-clamp-3 text-sm text-blu-800/80">' + esc(soloTesto(a.excerpt.rendered)) + '</p></div></a></li>';
      }).join('');
    }).catch(function () {});
  });

  // Pagina di lettura: notizia.html?articolo=slug oppure notizia.html?pagina=slug
  var lettura = $('[data-wp-lettura]');
  if (lettura) {
    var par = new URLSearchParams(location.search);
    var tipo = par.get('pagina') ? 'pages' : 'posts';
    var slug = par.get('pagina') || par.get('articolo') || '';
    var originale = $('[data-wp-originale]');
    if (originale) originale.href = VECCHIO + '/' + (tipo === 'pages' ? slug + '/' : '?name=' + encodeURIComponent(slug));
    if (PAGINE_NUOVE[slug] && tipo === 'pages' && !par.has('integrale')) { location.replace(PAGINE_NUOVE[slug]); return; }
    wp('/' + tipo + '?slug=' + encodeURIComponent(slug) + '&_fields=id,title,date,content,link,comment_status').then(function (r) {
      if (!r.length) throw new Error('non trovato');
      var a = r[0], titolo = soloTesto(a.title.rendered) || 'Senza titolo';
      document.title = titolo + ' · Le Linci';
      $('[data-wp-titolo]').textContent = titolo;
      $('[data-wp-data]').textContent = tipo === 'posts' ? dataIt(a.date) : 'Pagina storica';
      inserisci($('[data-wp-corpo]'), a.content.rendered);
      if (originale) originale.href = a.link.replace(/^https?:\/\/(www\.)?corriconlelinci\.com/, VECCHIO);
      if (tipo === 'posts') caricaCommenti(a.id, originale ? originale.href : VECCHIO, a.comment_status === 'open');
    }).catch(function () {
      $('[data-wp-titolo]').textContent = 'Contenuto non trovato';
      $('[data-wp-corpo]').innerHTML = '<p>Non riusciamo a caricare questo contenuto. Prova dall’<a href="archivio.html">archivio</a>.</p>';
    });
  }

  function caricaCommenti(id, linkOriginale, aperti) {
    var box = $('[data-wp-commenti]');
    if (!box) return;
    wp('/comments?post=' + id + '&per_page=50&order=asc&_fields=author_name,date,content').then(function (c) {
      var lista = $('[data-wp-commenti-lista]', box);
      $('[data-wp-commenti-numero]', box).textContent = c.length ? c.length + (c.length === 1 ? ' commento' : ' commenti') : 'Nessun commento';
      lista.innerHTML = c.map(function (x) {
        return '<li class="rounded-2xl bg-white p-4 ring-1 ring-blu-100"><p class="text-sm"><strong>' + esc(x.author_name) + '</strong> · ' + dataIt(x.date) +
          '</p><p class="mt-1">' + esc(soloTesto(x.content.rendered)) + '</p></li>';
      }).join('');
      var commenta = $('[data-wp-commenta]', box);
      commenta.href = linkOriginale + '#respond';
      if (!aperti) commenta.style.display = 'none';
      if (!c.length && !aperti) return;
      box.hidden = false;
    }).catch(function () {});
  }

  // Condividi (WhatsApp o menu di condivisione del telefono)
  $$('[data-condividi]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dati = { title: document.title, url: location.href };
      if (navigator.share) navigator.share(dati).catch(function () {});
      else window.open('https://wa.me/?text=' + encodeURIComponent(dati.title + ' ' + dati.url), '_blank', 'noopener');
    });
  });

  // Archivio: aggiunge gli articoli pubblicati dopo l'ultima generazione e cerca anche nel testo
  var elencoArchivio = $('[data-archivio]');
  if (elencoArchivio) {
    wp('/posts?per_page=20&_fields=slug,title,date').then(function (recenti) {
      var noti = {};
      $$('[data-slug]', elencoArchivio).forEach(function (li) { noti[li.dataset.slug] = 1; });
      recenti.filter(function (a) { return !noti[a.slug]; }).reverse().forEach(function (a) {
        var anno = a.date.slice(0, 4), sez = $('[data-anno-archivio="' + anno + '"]', elencoArchivio);
        if (!sez) return;
        var ul = $('ul', sez), d = new Date(a.date), t = soloTesto(a.title.rendered);
        var li = document.createElement('li');
        li.dataset.titolo = t.toLowerCase();
        li.dataset.slug = a.slug;
        li.innerHTML = '<a href="notizia.html?articolo=' + esc(a.slug) + '" class="flex min-h-[44px] items-baseline gap-3 py-2 hover:text-blu-700">' +
          '<time class="w-14 shrink-0 text-sm text-blu-800/70">' + d.getDate() + ' ' + MESI[d.getMonth()] + '</time><span>' + esc(t) + '</span></a>';
        ul.insertBefore(li, ul.firstChild);
      });
    }).catch(function () {});

    var risultati = $('[data-risultati-testo]'), attesa;
    if (filtro && risultati) {
      filtro.addEventListener('input', function () {
        clearTimeout(attesa);
        var q = filtro.value.trim();
        if (q.length < 3) { risultati.hidden = true; return; }
        attesa = setTimeout(function () {
          wp('/posts?search=' + encodeURIComponent(q) + '&per_page=20&_fields=slug,title,date').then(function (r) {
            var ql = q.toLowerCase();
            var extra = r.filter(function (a) { return soloTesto(a.title.rendered).toLowerCase().indexOf(ql) === -1; });
            $('ul', risultati).innerHTML = extra.map(function (a) {
              return '<li><a href="notizia.html?articolo=' + esc(a.slug) + '" class="flex min-h-[44px] items-baseline gap-3 py-2 hover:text-blu-700">' +
                '<time class="w-24 shrink-0 text-sm text-blu-800/70">' + dataIt(a.date) + '</time><span>' + esc(soloTesto(a.title.rendered)) + '</span></a></li>';
            }).join('');
            risultati.hidden = !extra.length;
          }).catch(function () { risultati.hidden = true; });
        }, 400);
      });
    }
    // archivio.html?cerca=trebbio apre l'archivio con la ricerca già fatta
    var cerca = new URLSearchParams(location.search).get('cerca');
    if (filtro && cerca) { filtro.value = cerca; filtro.dispatchEvent(new Event('input')); }
  }
})();
