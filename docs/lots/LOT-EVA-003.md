# LOT-EVA-003 — Bibliothèque et navigation de lecture

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Très élevé (à réévaluer à l’ouverture du lot)  
**But :** Créer la page Bibliothèque propre au fandom et simplifier la lecture sans dénaturer le visuel validé.

## Périmètre
1. Créer une page Bibliothèque avec fiches titre/auteur/résumé, ouverture Lire/Reprendre, recherche et filtres essentiels, tri et états vides/erreurs.
2. Conserver le décor et l’identité du lecteur validé; retirer la liste déroulante de toutes les histoires de la page Lecture.
3. Renommer le retour haut gauche Bibliothèque; réserver Sommaire à la liste des chapitres.
4. Évaluer sur prototype les deux variantes de transition entre chapitres; privilégier précédent en bas du chapitre précédent, Sommaire entre chapitres et Suivant au début du suivant, sous réserve de lisibilité.
5. Préserver fermeture par défaut des chapitres, favoris chapitre/passage, ancrages et reprise, traduction préférée et navigation bas de chapitre décidée précédemment sauf arbitrage explicite.

## Livrables attendus
- Page Bibliothèque et composants réutilisables intégrés.
- Tests navigation, accessibilité clavier et non-régression sur les 10 histoires.
- Captures de comparaison desktop avant/après.

## Critères de validation
- La suppression de la liste n’efface ni contenus ni progression.
- Retour Bibliothèque, Sommaire chapitres, Précédent/Suivant accessibles et cohérents.

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
Validation formelle du LOT-EVA-002, sous réserve des dépendances précisées dans le plan général.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
