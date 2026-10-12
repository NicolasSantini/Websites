# Le Linci · Branco Podistico: proposta di redesign

**Cliente:** Le Linci - Branco Podistico (Pol. Dil. Santa Lucia, Via S. Mamante 71, Faenza)
**Sito attuale:** https://corriconlelinci.com/ (WordPress.com)
**Referente:** Davide
**Proposta di:** Nicolas Santini
**Data:** 12 ottobre 2026
**Prototipo:** [`index.html`](./index.html) (file singolo, apribile direttamente nel browser) · anteprime: [mobile](./screenshots/mobile.png), [desktop](./screenshots/desktop-full.png)

> **Nota sui dati.** I contenuti del prototipo vengono dalle pagine indicizzate di corriconlelinci.com
> (Home, *Il branco*, *Contatti*, *Calendario eventi*, *Trail sul Trebbio*) e dai portali gara.
> Le fonti sono elencate in fondo. I dati segnati con `*` nel prototipo (quote, dislivello, tempo massimo)
> sono quelli dell'edizione 2025 e vanno confermati sul regolamento 2026 (aggiornato al 27/08/26).

---

## Sezione 1: Nuova architettura delle informazioni

### Il problema in una riga

Oggi la home elenca più di 170 link: articoli del blog, categorie, tag, pagine evento (Sveglia Presto
Running, Meeting Run, Trail sul Trebbio, Notturne Trail, Birrabranco…), elenchi soci per anno e rassegna stampa,
tutti allo stesso livello. Chi deve iscriversi al Trebbio dal telefono deve cercare tra decine di voci.

### Sitemap proposta (5 pagine)

```
corriconlelinci.com
│
├── 1. HOME  /                  ← "la prossima gara" in primo piano
│      ├─ Hero prossimo evento (data, ora, luogo, Iscriviti, GPX, Regolamento)
│      ├─ La gara in breve (percorsi, dislivello, ristori)
│      ├─ Il Branco + Linciodromo (anteprima)
│      └─ Contatti rapidi + modulo
│
├── 2. GARE  /gare/
│      ├─ /gare/trail-sul-trebbio/      (pagina evento completa: programma, percorsi,
│      │                                  mappa ritrovo, GPX, regolamento, FAQ, classifiche)
│      ├─ /gare/sveglia-presto-running/
│      └─ /gare/meeting-run/
│         (stesso modello per ogni gara: si duplica e si cambiano i dati)
│
├── 3. IL BRANCO  /branco/
│      ├─ Chi siamo (dal 2013, Pol. Dil. Santa Lucia)
│      ├─ Allenamenti: Linciodromo (lunedì 18:00, Parco Bucci) e Notturne Trail
│      └─ Come entrare nel branco (tesseramento, certificato, quota)
│
├── 4. ARCHIVIO  /archivio/      ← qui finiscono i 170 link di oggi
│      ├─ Calendario storico eventi (ex "effemeride")
│      ├─ Risultati e classifiche per anno
│      ├─ Rassegna stampa
│      └─ Articoli del blog (per anno, con ricerca)
│
└── 5. CONTATTI  /contatti/
       ├─ Email associazione + email Trail
       ├─ Social (Instagram, Facebook, X)
       ├─ Modulo info / avvisi iscrizioni
       └─ Sede, dati legali, privacy
```

Il menu principale ha **4 voci** (Gare · Il Branco · Archivio · Contatti) più il pulsante fisso **Iscriviti**,
che porta sempre all'evento in corso.

### Dove finisce ogni contenuto attuale

| Contenuto attuale su WordPress | Nuova posizione |
|---|---|
| Home con articoli, widget, categorie, tag | Home con il solo evento in corso + 3 anteprime |
| Pagine evento (`/effemeride/trail-sul-trebbio/`, `/effemeride/sveglia-presto-running/`…) | `/gare/<nome-evento>/` con un modello unico |
| *Calendario eventi* (`/effemeride/`) | `/archivio/` (storico) e `/gare/` (eventi attivi) |
| *Il branco* (elenchi soci per anno) | `/branco/` (presentazione) + elenco soci in `/archivio/` |
| *Contatti* (`/about/`) | `/contatti/` |
| *Rassegna stampa*, articoli del blog, tag | `/archivio/` |
| Novità quotidiane | Restano sui social, già aggiornati dal direttivo |

Non serve più scrivere articoli sul sito per ogni notizia: le notizie vanno sui social come avviene già oggi,
e il sito mostra solo le informazioni che servono a chi corre.

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
 (ENDU o      (download     (apertura          (navigatore)
  modulo)      diretto)      diretta)
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

## Sezione 3: Prototipo home page mobile-first

**File:** [`index.html`](./index.html). È un singolo file HTML con Tailwind CSS (Play CDN) e circa 100 righe di JavaScript, senza dipendenze da installare.

### Cosa contiene

| Requisito | Implementazione |
|---|---|
| Header sticky | Logo "Le Linci", indicatore "Prossima gara: Trebbio · 15 nov" con pallino animato, nav a 4 voci (su mobile riga sempre visibile, senza menu a scomparsa), pulsante *Iscriviti* |
| Hero "Trail sul Trebbio" | Badge *Prossimo evento · 11ª edizione*, data, ora (9:30) e luogo (Modigliana, Camping La Luna sul Trebbio, link a Maps) a caratteri grandi |
| CTA | **Iscriviti ora** (56 px di altezza, larghezza piena da mobile); *Traccia GPX* e *Regolamento PDF* come secondari |
| Extra hero | Countdown live, "Aggiungi al calendario" (file `.ics` per iPhone e Android), nota iscrizioni (aperte dal 1° ottobre, max 150, requisiti 19 km) |
| Quick card | **Percorsi** (19 km competitiva a coppie, 10 km ludico-motoria, 1,2 km Kids trail, quote), **Dislivello** (19 km ~1.000 m D+, tempo massimo 4 h), **Ristori** (lungo il percorso e all'arrivo, terzo tempo con vino rosso e polenta al cinghiale) |
| Chi siamo & Allenamenti | Presentazione del branco (dal 2013, Faenza), eventi dell'anno (Sveglia Presto Running, Meeting Run, Trebbio, Notturne Trail e Birrabranco), **Linciodromo** (lunedì dalle 18:00, Parco Bucci) |
| Contatti & modulo | Email associazione e Trail, card social (Instagram, Facebook @lincipodismo, X @le_linci), modulo Netlify Forms (interesse, nome, email, messaggio, consenso privacy, honeypot antispam), invio senza ricaricare la pagina |
| Footer | Pol. Dil. Santa Lucia, Via S. Mamante 71, Faenza, link utili, social, copyright automatico |
| Mobile UX | Barra *Iscriviti* fissa in basso (zona pollice) che compare quando il CTA principale esce dallo schermo; aree cliccabili ≥ 44 px; safe-area iPhone; nessuno scroll orizzontale a 390 px |
| Accessibilità | Skip link, landmark e `aria-label`, testi alternativi, contrasto AA, rispetto di `prefers-reduced-motion` |

Il rendering è stato verificato con Chromium headless a 390×844 (iPhone) e 1280×900 (desktop): nessun errore
JavaScript e nessuno scroll orizzontale.

### Come provarlo e pubblicarlo

- **Anteprima locale:** doppio clic su `index.html`. Il modulo in locale mostra un messaggio di anteprima.
- **Pubblicazione gratuita su Netlify:** trascinare la cartella `le-linci/` su https://app.netlify.com/drop.
  Si ottiene un indirizzo `*.netlify.app` da mandare a Davide, e il modulo funziona subito.
- **Per la produzione:** compilare il CSS una volta sola (`npx tailwindcss -o styles.css --minify`) e
  sostituire lo script della Play CDN con `<link rel="stylesheet" href="styles.css">`. La pagina diventa più veloce
  e indipendente dalla CDN.

### Da completare prima della messa online

- [ ] Togliere la fascia "Mockup di proposta" in cima.
- [ ] Confermare ora di partenza, quote, dislivello, tempo massimo e ristori 2026 (regolamento del 27/08/26).
- [ ] Link d'iscrizione: oggi punta a `endu.net/events/trail-sul-trebbio`. Verificare la piattaforma 2026 e poi rimuovere l'attributo `data-placeholder`.
- [ ] Caricare `files/trail-sul-trebbio-2026.gpx` e `files/regolamento-trail-sul-trebbio-2026.pdf`, poi rimuovere `data-placeholder` dai due pulsanti.
- [ ] Inserire codice fiscale dell'associazione e informativa privacy nel footer.
- [ ] Netlify → Forms → Notifications: inoltro a `lelinci.brancopodistico@gmail.com`.
- [ ] Aggiungere una foto reale del branco o del Trebbio nell'hero (facoltativo, rende molto).

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
> Ho usato i vostri contenuti reali (11° Trail sul Trebbio del 15 novembre, il Linciodromo del lunedì al
> Parco Bucci, Sveglia Presto Running, Meeting Run…). I dettagli 2026 come quote e dislivello li ho presi
> dall'anno scorso, quindi vanno solo confermati.
>
> In tre punti, perché secondo me vi semplifica la vita:
>
> 1. **Chi si iscrive dal telefono trova subito tutto.** Data, ora, luogo e il pulsante "Iscriviti" sono nel
>    primo schermo; GPX, regolamento e navigatore sono a un tocco. I 170 link di oggi finiscono in un archivio
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

## Fonti dei dati usati nel prototipo

- [corriconlelinci.com: Home](https://corriconlelinci.com/)
- [corriconlelinci.com: Il branco](https://corriconlelinci.com/il-branco/)
- [corriconlelinci.com: Contatti](https://corriconlelinci.com/about/)
- [corriconlelinci.com: Calendario eventi](https://corriconlelinci.com/effemeride/)
- [corriconlelinci.com: Trail sul Trebbio](https://corriconlelinci.com/effemeride/trail-sul-trebbio/)
- [corriconlelinci.com: Un mese all'apertura iscrizioni del Trail sul Trebbio](https://corriconlelinci.com/2026/09/01/un-mese-allapertura-iscrizioni-del-trail-sul-trebbio/)
- [corriconlelinci.com: Sveglia Presto Running](https://corriconlelinci.com/effemeride/sveglia-presto-running/)
- [Il Piccolo: Trail sul Trebbio 16 novembre 2025](https://ilpiccolo.org/ilpiccolo/2025/11/trail-sul-trebbio-16-novembre/)
- [ForlìToday: programma Trail sul Trebbio 2025](https://www.forlitoday.it/eventi/trail-sul-trebbio-programma-16-novembre-2025.html)
- [Finishers: Trail sul Trebbio 2026](https://www.finishers.com/it/evento/trail-sul-trebbio)
- [ENDU: Trail sul Trebbio](https://www.endu.net/events/trail-sul-trebbio)
- [Facebook: Le Linci - Branco Podistico](https://www.facebook.com/lincipodismo/)
