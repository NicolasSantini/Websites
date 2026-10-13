# Le Linci · Branco Podistico: proposta di redesign

**Cliente:** Le Linci - Branco Podistico (Pol. Dil. Santa Lucia, Via S. Mamante 71, Faenza)
**Sito attuale:** https://corriconlelinci.com/ (WordPress.com)
**Referente:** Davide
**Proposta di:** Nicolas Santini
**Data:** 12 ottobre 2026
**Nuovo sito:** cartella [`le-linci/`](./): 6 pagine statiche pronte da pubblicare, a partire da [`index.html`](./index.html) · anteprime: [mobile](./screenshots/home-mobile.png), [desktop](./screenshots/home-desktop.png)

> **Nota sui dati.** Tutti i contenuti vengono dal sito attuale (29 pagine e 310 articoli letti tramite l'API
> pubblica di WordPress.com) e dal **regolamento ufficiale 2026** (rev. 27/08/26). Orari, quote, dislivello,
> ristori e moduli d'iscrizione del Trail sul Trebbio sono quelli ufficiali. Resta da fornire solo la traccia GPX.

---

## Sezione 1: Nuova architettura delle informazioni

### Il problema in una riga

Oggi la home contiene **172 link** e il menu principale ha **30 voci**: pagine evento, sottopagine per anno
(Millennium Triathlon 2014–2019), elenchi soci, meme, classifiche, rassegna stampa, tutti allo stesso livello,
più 310 articoli del blog. Chi deve iscriversi al Trebbio dal telefono deve cercare tra decine di voci, e i moduli
d'iscrizione sono sepolti in fondo a una pagina di testo.

### Sitemap del nuovo sito (home + 5 sezioni)

```
corriconlelinci.com
│
├── HOME  index.html                 ← la prossima gara in primo piano
│      ├─ Hero Trail sul Trebbio (data, ora, luogo, Iscriviti, percorso, regolamento, countdown)
│      ├─ La gara in breve (percorsi, dislivello, ristori)
│      ├─ Calendario 2026 (scorre da solo fino al prossimo evento)
│      ├─ Il Branco + Linciodromo
│      └─ Social + modulo "avvisami quando aprono le iscrizioni"
│
├── 1. TRAIL SUL TREBBIO  trail-sul-trebbio.html
│      Iscrizioni (4 moduli: coppia, libertini, 10 km, kids + moduli cartacei) · Quote e pagamento
│      (IBAN copiabile, Satispay) · Programma · Percorsi + GPX · Materiale obbligatorio (numeri da salvare
│      in rubrica con un tocco) · Info utili (dove, dormire, cani, requisiti) · Domande frequenti
│
├── 2. EVENTI  eventi.html
│      Calendario 2026 con stato (fatto / prossimo / in arrivo) · Le gare con locandina e dettagli
│      (Trebbio, Sotto la Luna e la Torre, Sveglia Presto Running, Meeting Run) · Vita di branco · Storico 40+ eventi
│
├── 3. IL BRANCO  branco.html
│      Chi siamo · Numeri (214 linci dal 2013, grafico per anno) · Linciodromo · Campionato lincesco ·
│      Abbigliamento · Come entrare
│
├── 4. ARCHIVIO  archivio.html       ← qui finiscono i 310 articoli e le pagine storiche
│      Ricerca per titolo · Articoli per anno · 19 pagine storiche (classifiche, rassegna stampa, meme…)
│
└── 5. CONTATTI  contatti.html
       Sede, telefono, email · Email dei singoli eventi · Social · Modulo · Privacy
```

Il menu ha **5 voci** più il pulsante fisso **Iscriviti**, che porta sempre all'evento in corso. Da mobile le 5
voci stanno tutte in una riga sempre visibile, senza menu a scomparsa.

### Dove finisce ogni contenuto attuale

| Contenuto attuale su WordPress | Nuova posizione |
|---|---|
| Home con articoli in sequenza | Home con il solo evento in corso + calendario + branco |
| `/effemeride/trail-sul-trebbio/` (moduli, regolamento, shop) | `trail-sul-trebbio.html`, ordinata per sezioni |
| `/effemeride/` e pagine evento (Sveglia, Luna e Torre, Birronde, Aperitivo, Linci on Mountains) | `eventi.html` |
| *Il branco*, *graduatoria*, *abbigliamento* | `branco.html` |
| *Contatti* (`/about/`) | `contatti.html` |
| 310 articoli, rassegna stampa, meme, pagine per anno | `archivio.html`, con link agli originali |
| Novità quotidiane | Restano sui social, come già avviene |

**Nessun link si rompe.** Gli indirizzi vecchi già stampati sulle locandine o condivisi sui social
(per esempio `/effemeride/trail-sul-trebbio/`) vengono reindirizzati alle nuove pagine (`404.html`, funziona su qualsiasi hosting).
Gli articoli restano su `corriconlelinci.wordpress.com`, che dopo il passaggio del dominio continua a funzionare
gratis come archivio, senza migrare nulla a mano.

### Flusso ideale di un runner da smartphone

```
Instagram / Facebook / WhatsApp / Google "trail sul trebbio"
                 │
                 ▼
          HOME (1° schermo)
   Data · Ora · Luogo · [ISCRIVITI ORA]      ← 0 tap: info chiave subito visibili
                 │
     ┌───────────┼──────────────┬───────────────────┐
     ▼           ▼              ▼                   ▼
 Iscrizione   Traccia GPX   Regolamento PDF   Luogo su Google Maps
 (Google       (download     (apertura          (navigatore)
  Form)        diretto)      diretta)
     │
     ▼  scroll
 Percorsi · Dislivello · Ristori (card)  →  Aggiungi al calendario (.ics)
```

- **1 tap** per iscriversi, scaricare il GPX, aprire il regolamento o avviare il navigatore.
- La **barra "Iscriviti"** resta fissa in basso, dove arriva il pollice, appena il pulsante principale esce dallo schermo.
- Il **countdown** e **"Aggiungi al calendario"** riducono le domande del tipo "quando era?".
- L'anteprima su WhatsApp (Open Graph) mostra già titolo, data e luogo quando il link viene condiviso nei gruppi.

---

## Sezione 2: Costi

### Situazione attuale (verificata)

- Il blog è su **WordPress.com, piano gratuito**: per questo da telefono compaiono pubblicità e banner della piattaforma.
- Il dominio `corriconlelinci.com` è **registrato tramite WordPress.com** (nameserver WordPress) e **scade il 26 novembre 2026**.
  Il rinnovo di un `.com` su WordPress.com costa circa 13 $ l'anno ¹.
- Quindi oggi le Linci spendono solo il dominio, ma il sito ha la pubblicità e non è pensato per il telefono.

### Confronto

| Voce | Oggi: WordPress.com gratuito | WordPress.com senza pubblicità (piano a pagamento) | **Nuovo sito + WordPress gratuito come redazione** |
|---|---|---|---|
| Hosting del sito | 0 € | incluso nel piano | **0 €** (GitHub Pages) |
| Piano WordPress | 0 € | ~48 €/anno ¹ | **0 €** (il blog gratuito resta per scrivere gli articoli) |
| Dominio `.com` | ~13 $/anno (WordPress.com) | incluso il 1° anno | **~10–13 €/anno** (resta su WordPress.com o passa a Cloudflare/Porkbun) |
| Pubblicità sul sito che vedono i runner | **Sì**, fino a ~30% dello schermo da telefono | No | **No** |
| Sito pensato per il telefono | No (home con 172 link) | Dipende dal tema | **Sì** |
| Aggiornamenti tema, plugin, sicurezza | Della piattaforma | Della piattaforma | **Nessuno**: HTML statico |
| Newsletter (414 iscritti), articoli dall'app | Sì | Sì | **Sì, invariati** |
| **Totale annuo** | **~12 €, con pubblicità** | **~48–60 €** | **~12 €, senza pubblicità** |

¹ Prezzi di listino indicativi a ottobre 2026: verificare sul pannello WordPress.com dell'associazione.

**Il punto chiave:** non è un risparmio rispetto a oggi, è lo **stesso costo con un sito molto migliore**.
Per avere un sito senza pubblicità restando su WordPress.com servirebbe un piano a pagamento (~48 €/anno):
con questa soluzione si ottiene lo stesso risultato, e un sito pensato per il telefono, pagando solo il dominio.

**Scadenza da non perdere:** il dominio va rinnovato entro il 26 novembre 2026, subito dopo il Trebbio.
Si può rinnovare su WordPress.com come sempre, oppure trasferirlo a un altro registrar: il trasferimento include un anno di rinnovo.

### Perché "zero manutenzione" è realistico

- **Niente da aggiornare:** nessun plugin né database sul sito. Le pagine HTML non "invecchiano" e non si possono bucare come un WordPress non aggiornato.
- **Niente server:** GitHub Pages serve i file gratis; il certificato HTTPS si rinnova da solo.
- **Le notizie si scrivono come oggi:** articoli, foto e newsletter restano su WordPress.com, anche dall'app. Il nuovo sito li legge da lì e li mostra senza pubblicità. Dettagli in [`GESTIONE.md`](./GESTIONE.md).
- **Aggiornare una gara è semplice:** 1–2 volte l'anno si cambiano date e quote nei file del sito, anche dal browser. Lo posso fare io in pochi minuti.

### Piano di passaggio, senza rischi e senza disturbare il Trebbio

1. **Adesso (ottobre):** il nuovo sito è online su un indirizzo di prova gratuito (`nicolassantini.github.io/Websites/`). Il sito attuale non viene toccato.
2. **Dopo il 15 novembre:** Davide e il direttivo verificano i contenuti; io sistemo quello che serve.
3. **Passaggio (entro il 26 novembre, scadenza del dominio):** il dominio `corriconlelinci.com` punta al nuovo sito (pochi minuti, reversibile).
   Il blog resta attivo e gratuito su `corriconlelinci.wordpress.com`: è lì che si continuano a scrivere gli articoli.

### Testo per spiegare la proposta a Davide

> Oggi il sito vi costa solo il dominio, ma il prezzo lo pagano i vostri runner: pubblicità e banner della piattaforma che da
> telefono coprono le informazioni della gara. Per toglierli restando su WordPress.com servirebbe un piano da circa 48 € l'anno.
> Con la soluzione che vi propongo il costo resta lo stesso di oggi, solo il dominio: il sito nuovo è ospitato gratis
> e voi continuate a scrivere gli articoli su WordPress come fate adesso, newsletter compresa. In più niente pubblicità,
> niente plugin da aggiornare, e un sito pensato per chi si iscrive dal telefono.

---

## Sezione 3: Il nuovo sito (mobile-first, statico)

**Cartella:** [`le-linci/`](./). Sono 6 pagine HTML con Tailwind CSS già compilato (`assets/styles.css`, 30 KB)
e un solo file JavaScript (`assets/site.js`), senza framework né CDN per gli stili.

```
le-linci/
├── index.html  trail-sul-trebbio.html  eventi.html  branco.html  archivio.html  contatti.html
├── assets/        styles.css (compilato) · site.js · img/ (logo, foto e locandine ottimizzate, 1,5 MB)
├── src/           input.css (stili) · partials/header.html, footer.html (parti comuni)
├── tools/         sync_partials.py (copia header/footer in tutte le pagine)
│                  build_archivio.py (rigenera l'archivio dall'API di WordPress.com)
├── 404.html       redirect dai vecchi indirizzi (qualsiasi hosting)
├── notizia.html   legge articoli e pagine storiche dal blog WordPress.com
├── netlify.toml   configurazione facoltativa se si usa Netlify
└── package.json   npm run build → ricompila il CSS
```

### Cosa contiene

| Requisito | Implementazione |
|---|---|
| Header sticky | Logo originale delle Linci (reso trasparente), indicatore "Prossima gara: Trebbio · 15 nov", 5 voci di menu, pulsante *Iscriviti* |
| Hero "Trail sul Trebbio" | Foto della locandina 2026, badge *11ª edizione* e *Novità: si corre a coppie*, data, ora (9:30, pettorali 8:00–9:15) e luogo (link al navigatore) a caratteri grandi |
| CTA | **Iscriviti ora** (56 px, larghezza piena da mobile) verso i 4 moduli ufficiali; *Percorso e GPX* e *Regolamento* come secondari |
| Quick card | **Percorsi** (19 km a coppie, 10 km ludico-motoria, Kids 1,2 km), **Dislivello** (900 m D+, tempo limite 4 h), **Ristori** (2 sulla 19 km, 1 sulla 10 km, pasta party, ecotazza obbligatoria) |
| Chi siamo & Allenamenti | Testi originali del branco, foto vere, **Linciodromo** ogni lunedì dalle 18 al Parco Bucci |
| Contatti & modulo | Email associazione ed eventi, telefono sede, social, newsletter WordPress.com (stessa lista di oggi), modulo FormSubmit con honeypot antispam e consenso privacy |
| Footer | Logo con *pelofulgidosempre*, Pol. Dil. Santa Lucia, Via S. Mamante 71, Faenza, link, social |
| Identità | Giallo fluo e blu delle maglie e delle locandine, motti originali ("Ciò che trail!", "grr grr grr", "pelo fulgido sempre") |
| Funzioni utili da telefono | Countdown, *Aggiungi al calendario* (.ics), *Copia IBAN*, *Salva i 3 numeri dell'organizzazione* (.vcf, sono materiale obbligatorio), calendario che segna da solo gli eventi passati, ricerca nell'archivio |
| Mobile UX | Barra *Iscriviti* fissa in basso che compare quando il pulsante principale esce dallo schermo; aree cliccabili ≥ 44 px; safe-area iPhone; nessuno scroll orizzontale a 390 px |
| SEO e condivisione | Titoli e descrizioni per pagina, anteprima WhatsApp/Facebook con la locandina, dati strutturati `SportsEvent` per Google |
| Accessibilità | Skip link, landmark, testi alternativi, contrasto AA, `prefers-reduced-motion` |

Verificato con Chromium headless a 390×844 e 1280×900 su tutte e 6 le pagine: nessun errore JavaScript, nessuna
risorsa mancante, nessuno scroll orizzontale. Testati anche countdown, calendario, barra fissa, download .ics e
.vcf, ricerca in archivio e modulo.

### Come provarlo e pubblicarlo

- **Anteprima locale:** doppio clic su `index.html`. In locale i moduli mostrano un messaggio di anteprima.
- **Pubblicazione gratuita:** GitHub Pages con il workflow `.github/workflows/le-linci-pages.yml` (repo pubblico, nessuna carta richiesta). Passi in [`GESTIONE.md`](./GESTIONE.md).
- **Modifiche:** si modifica l'HTML; se si cambiano header o footer, `python3 tools/sync_partials.py`; se si usano
  classi Tailwind nuove, `npm install` una volta e poi `npm run build`.

### Da completare prima della messa online

- [ ] Traccia GPX ufficiale della 19 km in `assets/trail-sul-trebbio-2026-19km.gpx`, poi togliere `data-da-fornire` dal pulsante.
- [ ] Codice fiscale / P.IVA della Pol. Dil. Santa Lucia nel footer (`src/partials/footer.html`).
- [ ] Far validare dal direttivo il testo privacy in `contatti.html`.
- [ ] Al primo messaggio dal modulo contatti, confermare l'email di attivazione di FormSubmit.
- [ ] Provare l'iscrizione alla newsletter con un indirizzo vero.
- [ ] Facoltativo: elenco nominativo delle linci per anno in `branco.html` (oggi solo i numeri, per scelta di privacy).

---

## Sezione 4: Bozza email di risposta a Davide

**Oggetto:** Il nuovo sito delle Linci: ecco il mockup (si guarda in 1 minuto dal telefono)

> Ciao Davide,
>
> grazie per la risposta, e in bocca al lupo per il Trebbio! Visto che siete sotto gara non ti rubo tempo:
> ho preparato il mockup della nuova home, lo trovi qui e si guarda in un minuto dal telefono:
>
> 👉 **[LINK AL SITO DI PROVA – es. https://nicolassantini.github.io/Websites/]**
>
> È fatto tutto con i vostri contenuti: il regolamento 2026 del Trebbio con i vostri moduli Google,
> le locandine, le foto del Linciodromo, il calendario dell'anno e i 310 articoli del blog in archivio.
>
> In tre punti, perché secondo me vi semplifica la vita:
>
> 1. **Chi si iscrive dal telefono trova subito tutto.** Data, ora, luogo e il pulsante "Iscriviti" sono nel
>    primo schermo; GPX, regolamento e navigatore sono a un tocco. I 172 link della home di oggi finiscono in un archivio
>    ordinato, così non si perde niente.
> 2. **Niente pubblicità, allo stesso costo di oggi.** Il sito nuovo è ospitato gratis: resta solo il rinnovo del
>    dominio, come adesso. Gli articoli e la newsletter continuano su WordPress, senza cambiare nulla per voi.
> 3. **Zero manutenzione e zero tempo per voi.** Non ci sono plugin da aggiornare né password da custodire,
>    e le notizie restano sui social come adesso. Il lavoro tecnico lo faccio io, e il sito attuale non lo
>    tocco finché non mi date l'ok: possiamo pensarci con calma dopo il 15 novembre.
>
> Se vi va, posso anche mettere online una pagina dedicata solo al Trebbio prima della gara, senza toccare il
> sito attuale, da linkare nei vostri post e nei gruppi WhatsApp.
>
> Come scrivevo, nessun obbligo: se l'idea vi piace ne parliamo, altrimenti ci vediamo sui sentieri.
>
> Buone corse e buon Trebbio!
>
> Nicolas Santini
> [telefono] · [email]

---

## Fonti dei dati

- [Regolamento Trail sul Trebbio 2026, rev. 27/08/26](https://corriconlelinci.wordpress.com/wp-content/uploads/2026/09/2026-regolamento-rev.2026-08-27.docx)
- [API pubblica WordPress.com del sito (pagine e articoli)](https://public-api.wordpress.com/wp/v2/sites/corriconlelinci.com/posts)
- [corriconlelinci.com: Home](https://corriconlelinci.com/)
- [corriconlelinci.com: Il branco](https://corriconlelinci.com/il-branco/)
- [corriconlelinci.com: Contatti](https://corriconlelinci.com/about/)
- [corriconlelinci.com: Calendario eventi](https://corriconlelinci.com/effemeride/)
- [corriconlelinci.com: Trail sul Trebbio](https://corriconlelinci.com/effemeride/trail-sul-trebbio/)
- [corriconlelinci.com: Un mese all'apertura iscrizioni del Trail sul Trebbio](https://corriconlelinci.com/2026/09/01/un-mese-allapertura-iscrizioni-del-trail-sul-trebbio/)
- [corriconlelinci.com: Sveglia Presto Running](https://corriconlelinci.com/effemeride/sveglia-presto-running/)
- [Il Piccolo: Trail sul Trebbio 16 novembre 2025](https://ilpiccolo.org/ilpiccolo/2025/11/trail-sul-trebbio-16-novembre/)
- [ForlìToday: programma Trail sul Trebbio 2025](https://www.forlitoday.it/eventi/trail-sul-trebbio-programma-16-novembre-2025.html)
- [Facebook: Le Linci - Branco Podistico](https://www.facebook.com/Le-Linci-Branco-Podistico-1658052867794894/)
