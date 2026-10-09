# EverLore Core — Catalogue de briques présélectionnées (V0.1)

**Statut : sélection pour prototypes, PAS validation de sécurité, de licence complète ou d'intégration.**
Sources : quatre passes de découverte, consolidation et six groupes de vérification documentaire effectués dans la conversation. La vérification des packages exacts, des transitive dependencies et des versions devra être refaite au moment de l'essai.

| Domaine | Premier candidat | Alternatives / références | Question à trancher |
|---|---|---|---|
| Code partagé multi-PWA | [pnpm](https://github.com/pnpm/pnpm) | npm workspaces, [Turborepo](https://github.com/vercel/turborepo), [Changesets](https://github.com/changesets/changesets) | Plusieurs builds indépendants sans surcharge ? |
| PWA | [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa) | [Workbox](https://github.com/GoogleChrome/workbox), [Serwist](https://github.com/serwist/serwist) | Caches et mises à jour sans régression ? |
| Base locale | [Dexie.js](https://github.com/dexie/Dexie.js) | [idb](https://github.com/jakearchibald/idb), [wa-sqlite](https://github.com/rhashimoto/wa-sqlite), OPFS | Volumes, migrations, transactions et restaurations ? |
| Sélecteur de fichiers | [browser-fs-access](https://github.com/GoogleChromeLabs/browser-fs-access) | File input standard | Fallback mobile et sélection multiple ? |
| ZIP | [zip.js](https://github.com/gildas-lormeau/zip.js) | [fflate](https://github.com/101arrowz/fflate) | Extraction progressive et limites de sécurité ? |
| PDF texte | [PDF.js](https://github.com/mozilla/pdf.js) | Traitement manuel pour PDF difficiles | Chapitres et ordre de lecture fiables ? |
| HTML brut | [Readability](https://github.com/mozilla/readability) | Analyseur EverLore spécifique aux exports | Chapitres et notes préservés ? |
| HTML non fiable | [DOMPurify](https://github.com/cure53/DOMPurify) | Aucun remplacement sans revue | Nettoyage sans perdre la mise en forme utile ? |
| Recherche | [MiniSearch](https://github.com/lucaong/minisearch) | [FlexSearch](https://github.com/nextapps-de/flexsearch), recherche native | Fonctionne sur des milliers de fiches ? |
| Annotations | [Recogito](https://github.com/recogito/text-annotator-js) | [Annotator](https://github.com/duckyb/annotator), référence Hypothesis | Persistance sur texte HTML/FR révisé ? |
| Menu sélection | [Floating UI](https://github.com/floating-ui/floating-ui) | Positionnement interne | Tactile et mode immersif sans gêner la sélection ? |
| Accès distant | [webdav-client](https://github.com/perry-mitchell/webdav-client) | Workers/API privée + R2, autres fournisseurs | CORS, authentification, quotas et récupération ? |
| Synchronisation | adaptateur métier EverLore | [RxDB](https://github.com/pubkey/rxdb), [Automerge](https://github.com/automerge/automerge), [offline-sync-kit](https://github.com/browser-storage-com/offline-sync-kit) | Fusion et absence de pertes après conflits ? |
| Sauvegarde | export complet EverLore à définir | Dexie export/import, [Selfstore](https://github.com/selfstoredev/selfstore) | Restaurer fichiers + corrections + historique ? |
| Tests | [Playwright](https://github.com/microsoft/playwright) | Essais appareils réels | Automatiser les parcours sans simuler abusivement le matériel ? |
| Accessibilité | [axe-core](https://github.com/dequelabs/axe-core) | Tests manuels | Contrastes, focus, zoom, lecteurs d'écran ? |

## Références d'architecture, pas de copie automatique
- [lieslese](https://github.com/jonash54/lieslese), [EPUB Browser](https://github.com/dfface/epub-browser), [foliate-js](https://github.com/johnfactotum/foliate-js), [BookLore](https://github.com/booklore-app/booklore), [FanFicFare](https://github.com/JimmXinu/FanFicFare), [tldraw-sync-cloudflare](https://github.com/tldraw/tldraw-sync-cloudflare).
- Attention spécifique aux licences GPL/AGPL, licences non identifiées et packages sous licences différentes du dépôt parent. Consulter les textes applicables et les dépendances avant toute reprise de code.

## À ne pas présupposer
- Une bibliothèque d'annotation ne sait pas automatiquement gérer les éditions, l'historique de correction et la synchronisation.
- Un client WebDAV n'apporte ni sécurité côté serveur ni résolution des conflits.
- Une base locale ne sauvegarde pas automatiquement les fichiers privés sur un autre appareil.
- Des feature flags ne remplacent pas la séparation des builds et des données.
