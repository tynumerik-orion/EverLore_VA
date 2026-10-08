# LOT-EVA-005 — Original, Français, PDF et traduction Google

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Très élevé (à réévaluer à l’ouverture du lot)  
**But :** Associer les versions d’une œuvre, intégrer les PDF texte français vérifiés et sécuriser la traduction.

## Périmètre
1. Comparer les PDF aux œuvres originales par source/titre/auteur et contrôle humain : ne jamais fusionner sur seul titre; conserver aussi les variantes FR/EN indépendantes si ce ne sont pas des éditions correspondantes.
2. Séparer original, version française importée et traduction automatique; prévoir métadonnées de provenance et statut de correspondance.
3. Tester extraction texte PDF, titres, paragraphes, césures, notes, chapitres et alignement (qui n’est pas forcément 1:1); écarter PDF image/OCR hors périmètre.
4. Auditer et fiabiliser le système de traduction Google existant sur PC et mobile; vérifier limites techniques, réseau, confidentialité, cache offline et indicateur de langue.
5. Protéger la progression et les favoris par édition/version et assurer une préférence de langue stable.

## Livrables attendus
- Modèle et affichage multi-version avec avertissements de correspondance.
- Pipeline de PDF texte avec prévisualisation et validation humaine.
- Rapport de tests traduction Google mobile et comportement hors connexion.

## Critères de validation
- Jamais de confusion entre traduction humaine et automatique.
- Aucune traduction non vérifiée présentée comme originale ou officielle.
- Aucune conversion OCR lancée sur les PDF image.

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
Validation formelle du LOT-EVA-004, sous réserve des dépendances précisées dans le plan général.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
