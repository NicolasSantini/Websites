# Skill per Claude Code

Skill di terze parti installate per i progetti web di questo repository. Si attivano da sole nelle sessioni
di Claude Code aperte su questo repo (o con `/impeccable`, `/design-taste-frontend`, `/redesign-existing-projects`).

| Skill | Origine | Licenza | A cosa serve |
|---|---|---|---|
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) v4.5.2 | Apache 2.0 | `audit`, `critique`, `polish`, `document` (genera DESIGN.md) e altri comandi di revisione del design |
| `design-taste-frontend` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (`skills/taste-skill`) | MIT | Regole anti-"sito generico" per landing page e redesign |
| `redesign-existing-projects` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (`skills/redesign-skill`) | MIT | Checklist per migliorare un sito esistente senza romperlo |

Impeccable, al primo uso, scarica il suo motore dalle release ufficiali GitHub del progetto e ne verifica l'impronta SHA-256.
Per aggiornare una skill si ricopia la cartella dal repository di origine.
