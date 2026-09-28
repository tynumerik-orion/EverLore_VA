# EverLore — Vampire Academy (PWA)

Version temporaire installable préparée pour GitHub Pages.

## Organisation

- `index.html` : interface de lecture EverLore
- `app.js` : fonctions de la liseuse
- `bootstrap.js` : charge le catalogue et les histoires
- `stories/catalog.json` : catalogue
- `stories/vampire-academy/` : une histoire par fichier HTML
- `icons/` : favicons et icônes PWA
- `manifest.webmanifest` : installation
- `sw.js` : fonctionnement hors ligne

## Ajouter une histoire plus tard

Ajouter son fichier dans `stories/vampire-academy/` et son entrée dans `stories/catalog.json`.
Le cache `sw.js` devra également changer de version et inclure le nouveau fichier.

Les cinq histoires historiques gardent leurs préfixes `s1` à `s5` afin de préserver autant que possible les clés locales existantes.
