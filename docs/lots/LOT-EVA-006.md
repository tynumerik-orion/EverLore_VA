# LOT-EVA-006 — Importeur multi-source, ajout et suppression

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Très élevé (à réévaluer à l’ouverture du lot)  
**But :** Intégrer un outil convivial, robuste et réutilisable pour FicHub, AO3, TyHTML, HTML et PDF texte validés.

## Périmètre
1. Intégrer l’outil sous tools/everlore-story-importer/ après audit, avec documentation Windows; conserver les scripts d’origine comme références, pas comme solution présumée correcte.
2. Parsers séparés FicHub/AO3/TyHTML/HTML générique; vérifier multi-chapitres, titres, metadata, sommaires source, balises parasites, encodage, HTML malformé.
3. Accepter fichier, dossier, ZIP avec HTML internes; signaler les ZIP imbriqués sans exécution récursive involontaire ni écriture hors dossier.
4. Détecter doublons binaires, mêmes identifiants source, mêmes titres/auteurs et versions FR/EN; prévoir décisions explicites et mode simulation par défaut.
5. Mettre en place ajout, mise à jour de métadonnées/versions et suppression avec corbeille/sauvegarde, undo, absence de suppression irréversible accidentelle.
6. Proposer une interface Windows facile (sélection, analyse, résumé, validation, erreurs) et une CLI de secours; aucun push automatique.

## Livrables attendus
- Importeur intégré et documenté, interface accessible, CLI et tests automatiques.
- Rapports de simulation et de suppression/restauration.
- Journal de modifications reproductible et sauvegarde des catalogues.

## Critères de validation
- Aucune écriture sans confirmation.
- Jamais d’écrasement silencieux; aucune suppression non réversible avant validation.
- Le dépôt actuel peut être reconstruit après import à partir du catalogue validé.

## Règles transversales obligatoires
- Travail **par lot**, avec compte rendu, tests et validation de l’utilisatrice avant le lot suivant.
- Ne jamais modifier la lecture desktop validée sans démontrer la nécessité et obtenir validation.
- Préserver les dix histoires déjà présentes, leurs identifiants, favoris, passages, chapitres, préférences et progressions. Sauvegarder et vérifier les migrations.
- Ne pas publier les fanfictions nouvellement importées dans le dépôt/PWA publics sans décision explicite de l’utilisatrice et examen des droits de diffusion. Différencier contenu privé/local et contenu public.
- Tout import et toute suppression : aperçu, confirmation explicite, restauration possible, absence d’écrasement silencieux.
- Ne pas confondre le **Sommaire des chapitres** et la page **Bibliothèque** (histoires du fandom).
- Ne pas coder en dur Vampire Academy dans le moteur partagé : l’identité et les contenus du fandom appartiennent à sa configuration.
- Priorité aux appareils ordinateur et Chromebook, mais mobile à rendre réellement utilisable. Respecter tablette paysage et portrait.
- Ne pas introduire d’API payante, dépendance ou service tiers sans bilan des coûts, confidentialité, quotas et accord.
- Les prompts Codex seront rédigés seulement au lancement effectif de chaque lot, avec choix du modèle et niveau en français.

## Dépendances et verrou de passage
Validation formelle du LOT-EVA-005, sous réserve des dépendances précisées dans le plan général.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
