# Réserve technique TyNumérik (V0.1)

Pistes repérées lors des quatre passes et des vérifications. **Aucune intégration décidée.**

| Projet / piste | Destination potentielle | Motif de conservation et réserve |
|---|---|---|
| [FanFicFare](https://github.com/JimmXinu/FanFicFare) | EverLore Core / outils d'import | Métadonnées et mises à jour des fanfictions ; outil Python, non intégrable tel quel à une PWA |
| [foliate-js](https://github.com/johnfactotum/foliate-js) | EverLore Core | Lecture d'autres formats ; API annoncée instable |
| [Tesseract.js](https://github.com/naptha/tesseract.js) | Import futur / TyCore | OCR de pages images ; coût mémoire/CPU, PDF exige conversion de pages |
| [Mammoth.js](https://github.com/mwilliamson/mammoth.js) | Import DOCX futur | Conversion HTML ; nettoyage de sécurité supplémentaire obligatoire |
| [i18next](https://github.com/i18next/i18next) | TyCore | Traduction des interfaces, distincte des fanfictions |
| [Floating UI](https://github.com/floating-ui/floating-ui) | TyCore | Menus contextuels réutilisables |
| [Automerge](https://github.com/automerge/automerge) et [Yjs](https://github.com/yjs/yjs) | TyCloud / annotations | Conflits et collaboration ; charge de conception et stockage |
| [Selfstore](https://github.com/selfstoredev/selfstore) | TyCloud / TyCore | Sauvegardes locales et cloud ; projet jeune, sécurité à auditer |
| [tldraw-sync-cloudflare](https://github.com/tldraw/tldraw-sync-cloudflare) | TyCloud | Architecture Durable Objects + R2 comme référence, pas moteur à réutiliser |
| [GrowthBook](https://github.com/growthbook/growthbook) | TyNumérik futur | Expérimentations à grande échelle ; probablement excessif pour quelques PWA |
| [Workbox](https://github.com/GoogleChrome/workbox), [Serwist](https://github.com/serwist/serwist) | TyCore infrastructure | Cache et hors ligne, à garder comme alternatives contrôlées |
| [Calibre-Web Automated](https://github.com/crocodilestick/calibre-web-automated) | Référence bibliothèque | Métadonnées et workflows, licence GPL à examiner |
| [BookLore](https://github.com/booklore-app/booklore) | TyEverLore référence | Classement/étagères, licence AGPL, pas de copie automatique |
| [Epublifier](https://github.com/maoserr/epublifier) | Import URL futur | Règles d'extraction, extension de navigateur GPL |
| [WebReader](https://github.com/FIERsity/WebReader) | PDF futur | Reflow PDF et blocs de texte, projet jeune |

## Règle de réserve
Une trouvaille intéressante mais inadéquate au périmètre EverLore VA reste documentée et peut être réévaluée plus tard après une nouvelle vérification de licence, sécurité et maintenance.
