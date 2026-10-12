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

  // Moduli Netlify: invio senza ricaricare la pagina
  $$('form[data-netlify]').forEach(function (form) {
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
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        mostra('Grazie! Ti rispondiamo appena rientriamo dal Linciodromo. Grr grr grr!', true);
        form.reset();
      }).catch(function () {
        mostra('Invio non riuscito: riprova oppure scrivici a lelinci.brancopodistico@gmail.com', false);
      }).finally(function () { btn.disabled = false; });
    });
  });
})();
