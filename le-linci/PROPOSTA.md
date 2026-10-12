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
(per esempio `/effemeride/trail-sul-trebbio/`) vengono reindirizzati alle nuove pagine (`netlify.toml`).
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

## Sezione 2: Proposta economica e stima costi

### Confronto

| Voce | Oggi: WordPress.com gratuito (+ dominio) | WordPress.com senza pubblicità (piano Personal) | **Nuovo: sito statico (Jamstack)** |
|---|---|---|---|
| Hosting | 0 € | incluso nel piano | **0 €** (Netlify / Cloudflare Pages, piano gratuito) |
| Piano / abbonamento | 0 € | ~48 €/anno ¹ | **0 €** |
| Dominio `.com` | ~15–25 €/anno ¹ ² | incluso il 1° anno, poi ~20 €/anno ¹ | **~11–12 €/anno** (Cloudflare Registrar / Porkbun, a prezzo di costo) |
| Pubblicità e banner della piattaforma | **Sì**, fino a ~30% dello schermo da telefono | No | **No** |
| Aggiornamenti tema, plugin, sicurezza | A carico della piattaforma, temi limitati | A carico della piattaforma | **Nessuno**: HTML statico, niente da aggiornare né da attaccare |
| Velocità da mobile | Pagine pesanti (temi, script, pubblicità) | Media | **Molto alta**: una pagina leggera servita da CDN |
| Modulo contatti | Limitato | Limitato | Netlify Forms (gratis fino a 100 invii/mese) con avviso via email |
| Certificato HTTPS | Incluso | Incluso | Incluso, automatico |
| **Totale annuo** | **~15–25 €, con pubblicità** | **~48–70 €** | **~12 €, senza pubblicità** |

¹ Prezzi di listino indicativi a ottobre 2026; verificare sul pannello WordPress.com dell'associazione.
² Su WordPress.com un dominio personalizzato richiede di norma un piano a pagamento o una vecchia "mappatura dominio".
Conviene verificare quanto paga oggi l'associazione prima di inviare i numeri.

**Il punto chiave:** per togliere la pubblicità restando su WordPress.com bisogna pagare un piano.
Con il sito statico la pubblicità sparisce e l'unico costo fisso resta il rinnovo del dominio (~12 €/anno),
**circa il 75% in meno** rispetto a un WordPress.com senza pubblicità.

### Perché "zero manutenzione" è realistico

- **Niente da aggiornare:** nessun CMS, plugin o database. Le pagine HTML non "invecchiano" e non si possono bucare come un WordPress non aggiornato.
- **Niente server:** Netlify o Cloudflare servono i file gratis da una rete globale; il certificato HTTPS si rinnova da solo.
- **Aggiornare una gara è semplice:** i dati del Trebbio sono in un solo blocco del file (`GARA` + testi della sezione hero). Per l'edizione 2027 bastano 10 minuti, li posso fare io.
- **Le notizie restano sui social**, dove il direttivo pubblica già: il sito non chiede altro lavoro.
- **Opzionale, più avanti:** un pannello di modifica semplice (Decap CMS) se qualcuno del direttivo vuole aggiornare i testi da solo.

### Piano di passaggio, senza rischi e senza disturbare il Trebbio

1. **Adesso (ottobre):** il mockup è online su un indirizzo di prova (`lelinci-mockup.netlify.app`). Il sito attuale non viene toccato.
2. **Dopo il 15 novembre:** esporto i contenuti da WordPress (Strumenti → Esporta, un file XML), costruisco le pagine Gare, Branco e Archivio e le faccio verificare a Davide.
3. **Passaggio:** cambio i DNS del dominio verso Netlify (5 minuti, reversibile). Il vecchio sito resta raggiungibile all'indirizzo `*.wordpress.com` come copia di sicurezza.
4. **Facoltativo:** trasferimento del dominio da WordPress.com a Cloudflare Registrar per ridurre il rinnovo a ~11 €/anno.

### Testo per spiegare il risparmio a Davide

> Oggi il sito è gratuito, ma il prezzo lo pagano i vostri runner: banner e avvisi della piattaforma che da
> telefono coprono le informazioni della gara. Per toglierli restando su WordPress.com servirebbe un piano da
> circa 48 € l'anno.
> Con la soluzione che vi propongo il sito diventa un insieme di pagine leggere ospitate gratis (Netlify o
> Cloudflare, gli stessi servizi usati da aziende molto più grandi). Resta un solo costo, il dominio
> corriconlelinci.com, circa 12 € l'anno: niente pubblicità, niente aggiornamenti o plugin da seguire, e
> niente da rifare in fretta il giorno prima della gara.

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
├── netlify.toml   redirect dai vecchi indirizzi + cache
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
| Contatti & modulo | Email associazione ed eventi, telefono sede, social, moduli Netlify Forms con honeypot antispam e consenso privacy |
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
- **Pubblicazione gratuita su Netlify:** trascinare la cartella `le-linci/` su https://app.netlify.com/drop.
  Si ottiene un indirizzo `*.netlify.app` da mandare a Davide; moduli e redirect funzionano subito.
- **Modifiche:** si modifica l'HTML; se si cambiano header o footer, `python3 tools/sync_partials.py`; se si usano
  classi Tailwind nuove, `npm install` una volta e poi `npm run build`.

### Da completare prima della messa online

- [ ] Traccia GPX ufficiale della 19 km in `assets/trail-sul-trebbio-2026-19km.gpx`, poi togliere `data-da-fornire` dal pulsante.
- [ ] Codice fiscale / P.IVA della Pol. Dil. Santa Lucia nel footer (`src/partials/footer.html`).
- [ ] Far validare dal direttivo il testo privacy in `contatti.html`.
- [ ] Netlify → Forms → Notifications: inoltro a `lelinci.brancopodistico@gmail.com`.
- [ ] Facoltativo: elenco nominativo delle linci per anno in `branco.html` (oggi solo i numeri, per scelta di privacy).

---

## Sezione 4: Bozza email di risposta a Davide

**Oggetto:** Il nuovo sito delle Linci: ecco il mockup (si guarda in 1 minuto dal telefono)

> Ciao Davide,
>
> grazie per la risposta, e in bocca al lupo per il Trebbio! Visto che siete sotto gara non ti rubo tempo:
> ho preparato il mockup della nuova home, lo trovi qui e si guarda in un minuto dal telefono:
>
> 👉 **[LINK AL MOCKUP – es. https://lelinci-mockup.netlify.app]**
>
> È fatto tutto con i vostri contenuti: il regolamento 2026 del Trebbio con i vostri moduli Google,
> le locandine, le foto del Linciodromo, il calendario dell'anno e i 310 articoli del blog in archivio.
>
> In tre punti, perché secondo me vi semplifica la vita:
>
> 1. **Chi si iscrive dal telefono trova subito tutto.** Data, ora, luogo e il pulsante "Iscriviti" sono nel
>    primo schermo; GPX, regolamento e navigatore sono a un tocco. I 172 link della home di oggi finiscono in un archivio
>    ordinato, così non si perde niente.
> 2. **Niente pubblicità e costi quasi a zero.** Il sito diventa un insieme di pagine leggere ospitate
>    gratis: resta solo il rinnovo del dominio, circa 12 € l'anno. Per togliere i banner su WordPress.com
>    servirebbe invece un piano a pagamento.
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
