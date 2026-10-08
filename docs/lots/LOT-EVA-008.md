# LOT-EVA-008 — Thèmes, performances et livraison V2

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Élevé (à réévaluer à l’ouverture du lot)  
**But :** Finaliser la stabilité et la capacité de réutilisation du socle pour d’autres fandoms.

## Périmètre
1. Extraire système de thèmes paramétrable (palette, ressources, thèmes par fandom), tout en gardant le thème Vampire Academy validé comme référence.
2. Créer au moins une configuration exemple fictive sans déployer de deuxième fandom, pour prouver l’absence de dépendance codée en dur.
3. Optimiser chargement du catalogue, recherche, poids index.html, cache service worker et stockage local; contrôler fonctionnement hors ligne.
4. Tests de régression desktop, Chromebook, tablette, mobile, PDF/versions, import/suppression, thèmes et reprise.
5. Documenter installation, maintenance, duplication d’une PWA vers un autre fandom et composants potentiellement extractibles vers TyEverLore.

## Livrables attendus
- Documentation V2, schéma du socle, guide duplication fandom et matrice finale de tests.
- Rapport de performance et inventaire des fonctions réutilisables vers TyEverLore.
- Liste des améliorations reportées, sans élargir silencieusement le périmètre.

## Critères de validation
- L’utilisateur peut remplacer la configuration fandom sans modifier le moteur commun.
- Aucune régression majeure ouverte avant validation finale.

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
Validation formelle du LOT-EVA-007, sous réserve des dépendances précisées dans le plan général.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
