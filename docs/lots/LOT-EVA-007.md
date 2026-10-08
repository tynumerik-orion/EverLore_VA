# LOT-EVA-007 — Migration contrôlée et import pilote

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Très élevé (à réévaluer à l’ouverture du lot)  
**But :** Exécuter et vérifier l’import de cinq histoires avant extension du catalogue.

## Périmètre
1. Geler un instantané des dix histoires et des préférences utiles, versionner les modifications sur branche dédiée.
2. Choisir cinq sources diversifiées (1 et plusieurs chapitres), contrôler métadonnées et comparer contenu importé avec source, notamment fin des chapitres.
3. Exécuter la simulation puis l’import uniquement sur environnement de test; vérifier chemins, sN-c, catalog.js/catalog.json, scripts, images, CSS, taille et service worker.
4. Tester reprise, favoris, chapitres fermés, Sommaire, Bibliothèque, traduction Google et versions françaises éventuelles.
5. Mesurer performances et taille totale; demander validation explicite avant toute mise en ligne ou import du reste des 85 candidats.

## Livrables attendus
- Compte rendu par histoire avec tests réalisés et écarts.
- Procédure d’annulation/restauration validée.
- Décision go/no-go avant extension à un plus grand corpus.

## Critères de validation
- Les dix histoires actuelles restent lisibles et retrouvables.
- Aucune histoire nouvelle publiée sur GitHub Pages sans validation des droits et de la publication.

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
Validation formelle du LOT-EVA-006, sous réserve des dépendances précisées dans le plan général.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
