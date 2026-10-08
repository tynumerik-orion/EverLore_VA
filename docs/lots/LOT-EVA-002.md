# LOT-EVA-002 — Spécifications et socle réutilisable

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Élevé (à réévaluer à l’ouverture du lot)  
**But :** Fixer les contrats du futur moteur EverLore commun et de la configuration d’une PWA mono-fandom avant les modifications.

## Périmètre
1. Rédiger modèle de données des œuvres, éditions/versions, chapitres, langue, source, traduction humaine/PDF et Google, progression par version, favoris et passages.
2. Définir une configuration de fandom (nom, route, décors, palette, thèmes activés, catalogue), sans multicatalogue réel dans cette PWA.
3. Définir les états de navigation : Bibliothèque → Lecture → Sommaire des chapitres; retour, chapitre replié, ancre et reprise.
4. Définir import, mise à jour et suppression sécurisés avec sauvegarde, export et restauration; distinguer actions possibles dans PWA statique et via outil local.
5. Définir tests de migration compatibilité 10 histoires et format de thèmes extensible; valider maquettes fonctionnelles sans retoucher le desktop approuvé.

## Livrables attendus
- Spécification fonctionnelle V0.1, schémas de données et contrats de stockage.
- Plan de migration et critères de réversibilité.
- Liste des décisions ouvertes à arbitrer avec l’utilisatrice.

## Critères de validation
- Aucune architecture incompatible avec la PWA actuelle sans plan de migration.
- Les relations original/FR et crossovers futurs restent modélisables sans obliger à livrer ces fonctions maintenant.

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
Validation formelle du LOT-EVA-001, sous réserve des dépendances précisées dans le plan général.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
