---
name: Le Linci · Branco Podistico
description: Sito mobile-first del branco podistico di Faenza, giallo fluo e blu come le maglie
colors:
  giallo-fluo: "#f5ea2a"
  giallo-chiaro: "#f8f160"
  giallo-velo: "#fdfbd2"
  blu-notte: "#0b1430"
  blu-branco: "#14224a"
  blu-profondo: "#1d3163"
  blu-segnale: "#2a4589"
  blu-velo: "#e4e9f5"
  azzurro-novita: "#3fd0f0"
  azzurro-velo: "#dff6fc"
  carta: "#f2f4f9"
  bianco: "#ffffff"
typography:
  display:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1
  title:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
  mano:
    fontFamily: "Caveat, cursive"
    fontSize: "1.875rem"
    fontWeight: 600
rounded:
  chip: "9999px"
  campo: "12px"
  pulsante: "16px"
  card: "24px"
spacing:
  gutter: "16px"
  card: "24px"
  sezione: "48px"
  sezione-desktop: "64px"
components:
  button-primary:
    backgroundColor: "{colors.giallo-fluo}"
    textColor: "{colors.blu-notte}"
    typography: "{typography.title}"
    rounded: "{rounded.pulsante}"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.giallo-chiaro}"
  button-dark:
    backgroundColor: "{colors.blu-branco}"
    textColor: "{colors.bianco}"
    rounded: "{rounded.pulsante}"
    height: "48px"
  card:
    backgroundColor: "{colors.bianco}"
    rounded: "{rounded.card}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.giallo-velo}"
    textColor: "{colors.blu-branco}"
    rounded: "{rounded.chip}"
    padding: "2px 10px"
  input:
    backgroundColor: "{colors.carta}"
    rounded: "{rounded.campo}"
    height: "48px"
---

# Design System: Le Linci · Branco Podistico

## Overview

**Concetto guida: "Pelo fulgido".** Il sito si veste come il branco in gara: maglia giallo fluo su blu notte,
lettere strette da pettorale, e una battuta scritta a mano ("grr grr grr", "ciò che trail!") come firma.
È un sito da consultare in piedi alla partenza, dal telefono: le informazioni che servono (data, ora, luogo,
iscrizione) stanno nel primo schermo, grandi e contrastate. Tono diretto, ironico, mai corporate.

Anti-riferimenti: il vecchio blog con 172 link in home; i siti "eleganti" color crema; i layout da startup.

## Colors

- **Giallo fluo `#f5ea2a`**: il colore delle maglie. Solo per l'azione principale (Iscriviti), le evidenze e le scritte a mano su fondo blu. Su giallo il testo è sempre blu notte.
- **Blu branco `#14224a` / blu notte `#0b1430`**: header, hero, footer, sezioni di forte impatto. Il testo secondario su blu è bianco al 70-85%, mai grigio.
- **Blu segnale `#2a4589`**: link, numeri, etichette di dettaglio su fondo chiaro.
- **Azzurro novità `#3fd0f0`**: solo per segnalare le novità (es. "si corre a coppie"), come il bollino NEW delle locandine.
- **Carta `#f2f4f9`**: sfondo della pagina, un blu appena accennato. Le card sono bianche.
- I veli (`giallo-velo`, `blu-velo`, `azzurro-velo`) servono per chip e riquadri informativi.

Contrasto minimo 4,5:1 per testo e placeholder, verificato su tutte le combinazioni in uso.

## Typography

- **Barlow Condensed** (600–800, maiuscolo) per titoli, numeri e pulsanti principali: ricorda i pettorali e la segnaletica.
- **Barlow** (400–700) per il testo corrente: stessa famiglia, leggibile da telefono.
- **Caveat** (600) per una sola frase scritta a mano per sezione, sotto il titolo, mai sopra.
- Niente etichette sopra i titoli: il titolo parla da solo, i dettagli (mese, luogo, edizione) vanno sotto.
- I numeri che cambiano (conto alla rovescia, quote) usano cifre a larghezza fissa.
- Tutti i font sono ospitati nel sito (`assets/fonts/`), nessuna richiesta a Google.

## Layout

- Mobile-first, contenitore massimo 72rem con margini laterali di 16px.
- Su mobile l'header ha due righe: logo + Iscriviti, poi le 5 voci di menu sempre visibili.
- Barra "Iscriviti" fissa in basso su mobile quando il pulsante principale esce dallo schermo.
- Sezioni separate da 48px (64px da desktop), alternando fondo carta, bianco e blu.
- Aree cliccabili di almeno 44px; nessuno scroll orizzontale a 390px.

## Elevation & Depth

Quasi piatto. Le card hanno un'ombra leggera e un bordo sottile `blu-velo`; la profondità viene dall'alternanza
di fondi chiari e blu e dalle foto. Il pulsante giallo ha un'ombra gialla tenue per "accendersi".

## Shapes

Angoli morbidi e generosi: 24px per card e riquadri, 16px per i pulsanti, 12px per i campi, pillola per i chip.
Per evidenziare una card si usa un anello colorato di 2px, non un bordo spesso su un solo lato.

## Components

- **Pulsante principale**: giallo fluo, Barlow Condensed maiuscolo, alto 56px, una sola azione (Iscriviti).
- **Pulsante scuro**: blu branco con testo bianco, per le azioni secondarie importanti (moduli, regolamento).
- **Pulsante a contorno**: bordo del colore del testo, su fondo blu.
- **Card**: bianca, 24px di raggio, 24px di padding; titolo in Barlow Condensed.
- **Chip**: pillola con velo colorato per stato e categoria (A coppie, 6–12 anni, Fatto, Prossimo).
- **Calendario**: card con data in blu segnale; gli eventi passati si attenuano e il prossimo ha un anello giallo.
- **Icone**: SVG a tratto 2px, mai emoji.
- **Focus**: anello azzurro di 4px; selezione del testo gialla con testo blu.

## Do's and Don'ts

- **Do**: tieni data, ora, luogo e Iscriviti nel primo schermo della gara in corso.
- **Do**: usa le parole delle Linci (graffi, branco, lincesco, pelo fulgido) con misura, una battuta per sezione.
- **Do**: usa foto vere del branco e delle locandine, non immagini stock.
- **Don't**: sfondi crema, font Inter o Roboto, gradienti nel testo, emoji come icone.
- **Don't**: etichette sopra i titoli o bordi spessi colorati su un lato delle card.
- **Don't**: più di un pulsante giallo per sezione, oltre a "Iscriviti" nell'header.
