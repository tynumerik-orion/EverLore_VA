# LOT-EVA-004 — Responsive mobile, tablette et Chromebook

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Très élevé (à réévaluer à l’ouverture du lot)  
**But :** Créer une expérience mobile dédiée cohérente avec le visuel desktop, sans casser celui-ci.

## Périmètre
1. Inventorier les points de rupture réels et fixer les comportements mobile, tablette portrait, tablette paysage, Chromebook et desktop.
2. Adapter Bibliothèque (cartes, filtres, recherche, résumé), Lecture (largeur, typographie, boutons, menus, ancrages, barres), et réglages/traduction.
3. Vérifier décors, ornements et éléments interactifs aux petites et grandes résolutions; gestes tactiles sans chevauchement.
4. Assurer texte sélectionnable, taille de police configurable, thème clair/sépia lisible, contraste, focus et navigation clavier.
5. Préparer tests manuels sur appareils réels de l’utilisatrice et captures par taille; ne pas substituer de nouvelles maquettes d’ambiance aux visuels validés.

## Livrables attendus
- Vues responsive réellement opérationnelles.
- Matrice de tests et captures avant/après pour chaque classe d’écran.
- Liste d’éventuelles limites connues restant à corriger.

## Critères de validation
- Desktop de référence inchangé sans validation.
- Aucun contrôle principal coupé, chevauché ou inaccessible au tactile.

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
Validation formelle du LOT-EVA-003, sous réserve des dépendances précisées dans le plan général.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
