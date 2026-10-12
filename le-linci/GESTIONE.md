# Come si gestisce il sito delle Linci

Il sito è fatto di pagine statiche: non c'è nessun server, plugin o database da aggiornare.
Tutto quello che cambia spesso (articoli, foto, newsletter, commenti) resta su **WordPress.com**, dove le Linci
scrivono già oggi. Il nuovo sito lo legge da lì in tempo reale e lo mostra con la sua grafica, senza pubblicità.

## Chi modifica cosa

| Cosa | Dove si modifica | Chi | Quando compare sul sito |
|---|---|---|---|
| **Notizie, racconti, classifiche, foto** | WordPress.com, come oggi (anche dall'app sul telefono) | Direttivo | Subito: home ("Ultime dal branco"), archivio, pagina dell'articolo |
| **Newsletter** (oltre 400 iscritti) | Automatica: WordPress manda l'email a ogni nuovo articolo | Nessuno | Subito |
| **Commenti** | Si scrivono sul blog WordPress; il sito li mostra sotto l'articolo | Lettori | Subito |
| **Loghi sponsor** | Pagina "Patrocinatori" su WordPress: aggiungi o togli un'immagine | Direttivo | Subito (home, "Ci sostengono") |
| **Foto degli eventi** (Birronde, Aperitivo, Luna e Torre, Sveglia, Cena, Millennium) | La pagina dell'evento su WordPress | Direttivo | Subito (pagina Eventi) |
| **Classifica lincesca, elenco linci, rassegna stampa, meme** | La rispettiva pagina su WordPress | Direttivo | Subito |
| **Iscrizioni alle gare** | Google Form, come oggi | Direttivo | I link sono nelle pagine del sito |
| **Dati fissi delle gare** (date, quote, orari, link ai moduli) | File HTML del sito (vedi sotto) | Nicolas, o chiunque dal browser | 1–2 minuti dopo il salvataggio |
| **Contatti dal modulo** | Arrivano per email a lelinci.brancopodistico@gmail.com | — | — |

In pratica il direttivo continua a usare WordPress come oggi. Le modifiche al sito vero e proprio servono
1–2 volte l'anno, quando cambia l'edizione di una gara.

## Modificare un testo dal browser (senza installare nulla)

1. Apri il repository su GitHub e il file da cambiare (per esempio `le-linci/trail-sul-trebbio.html`).
2. Premi la matita ✏️ ("Edit this file"), cerca il testo con Ctrl+F e cambialo.
3. Premi **Commit changes**. Dopo 1–2 minuti il sito è aggiornato.

Se si sbaglia, nella cronologia del file ("History") si torna alla versione precedente con un clic.

## Checklist: nuova edizione del Trail sul Trebbio

- `index.html`: data, orario, quote nella sezione hero e il conto alla rovescia (`data-countdown="2027-..."`).
- `trail-sul-trebbio.html`: date, quote, link ai 4 Google Form e al regolamento, programma.
- `index.html` ed `eventi.html`: il calendario (`data-quando="AAAA-MM-GG"`). Gli eventi passati si segnano da soli come "Fatto".
- `src/partials/header.html`: il richiamo "Prossima gara". Poi `python3 tools/sync_partials.py`, oppure chiedi a Nicolas.
- La traccia GPX va in `assets/` (vedi il pulsante "Scarica traccia GPX").

## Primo avvio (una volta sola)

1. **Pubblicare gratis su GitHub Pages**: con il repository pubblico, in *Settings → Pages* scegliere
   *Source: GitHub Actions*. Poi in *Actions → Sito Le Linci su GitHub Pages → Run workflow* lanciare la prima pubblicazione.
   Da lì in avanti ogni modifica al ramo `main` ripubblica il sito da sola, su
   `https://nicolassantini.github.io/Websites/`. Nessun costo e nessuna carta di credito.
   Il workflow pubblica solo le pagine e `assets/`: questo documento, `PROPOSTA.md`, `src/` e `tools/` non vanno online
   (restano però visibili nel repository, se è pubblico).
2. **Modulo contatti**: al primo messaggio FormSubmit manda un'email di attivazione a lelinci.brancopodistico@gmail.com;
   basta cliccarla una volta.
3. **Newsletter**: provare l'iscrizione dalla home con un indirizzo vero. Se il modulo diretto non dovesse funzionare,
   resta il link "iscriviti dal blog", che porta al modulo originale di WordPress.
4. **Dominio** (quando le Linci approvano): su GitHub *Settings → Pages → Custom domain* scrivere `corriconlelinci.com`
   e puntare il dominio secondo le istruzioni di GitHub. Il blog WordPress resta attivo e gratuito su
   `corriconlelinci.wordpress.com`: è da lì che il sito legge gli articoli.

In alternativa a GitHub Pages va bene anche Netlify o Cloudflare Pages (piani gratuiti, repository anche privato).
Il sito funziona uguale; `netlify.toml` aggiunge solo i redirect lato server se si sceglie Netlify.

## Cosa il sito non fa (ancora) rispetto al vecchio

- **Scrivere un commento direttamente sul sito**: i commenti si leggono sotto l'articolo, ma per scriverne uno si apre il blog WordPress.
- **"Mi piace" di WordPress e contatore visite**: non ci sono. Se servono statistiche, si può aggiungere un contatore
  senza cookie (per esempio GoatCounter, gratuito).
- **Ricerca nel testo delle pagine storiche**: la ricerca dell'archivio trova titoli e testo degli articoli, non il contenuto delle pagine storiche.
- **Traccia GPX ufficiale**: va fornita dall'organizzazione.
- **Senza connessione a WordPress** (caso raro), le pagine degli articoli e le gallerie non si caricano;
  il resto del sito, le iscrizioni e i contatti funzionano comunque.

## Per chi sviluppa

```bash
cd le-linci
npm install                       # una volta, installa Tailwind
npm run build                     # ricompila assets/styles.css dopo aver usato classi nuove
python3 tools/sync_partials.py    # copia header e footer (src/partials/) in tutte le pagine
python3 tools/build_archivio.py   # aggiorna la copia statica dell'archivio e degli ultimi articoli (facoltativo)
```

Il JavaScript è tutto in `assets/site.js`, gli stili sorgente in `src/input.css`. I font sono ospitati in `assets/fonts/`:
nessuna richiesta a Google, quindi niente banner cookie.
