# EverLore Core — Plan de cinq prototypes isolés (V0.1)

**Règles générales** : aucun changement sur `main`, les originaux ou la PWA de production ; prototypes dans branches ou environnements isolés, données fictives ou copies anonymisées. Pas de déploiement ni connexion cloud payante sans validation expresse. Chaque prototype : compte rendu simple, résultats PASS/FAIL, risques, dépendances, coûts estimés, décision de poursuite.

## P0 — Préparation (obligatoire)
- Snapshot du dépôt et inventaire exact de la version existante, des fonds et de ses 10 histoires / 563 chapitres.
- Sauvegarde vérifiée et procédure de restauration **testée sur copie**.
- Jeux d'essai : HTML export FicHub/AO3, ZIP, PDF texte, EPUB en réserve, cas atypiques/malformés, histoires FR et EN liées, quelques gros fichiers ; éviter contenus privés dans tickets publics.
- Matrice PC Windows, Chromebook, Android, tablette.

## P1 — Import dans la PWA
- Choix d'un fichier local, extraction sécurisée, détection titre/auteur/chapitres/langue, visualisation et validation.
- Import ZIP et PDF texte, annulation, erreur, reprise, détection des doublons, association d'une édition traduite.
- Comparer zip.js / fflate et approche HTML spécifique / Readability. Mesurer mémoire et durée.
- **PASS** : une histoire correcte apparaît dans bibliothèque après validation et rechargement ; aucune injection HTML ; import répété n'ajoute pas de doublon ; annulation n'altère pas la base.

## P2 — Stockage et synchronisation
- Mettre en place un simulateur de backend privé, puis éventuellement un backend pilote approuvé ; séparer documents volumineux et métadonnées.
- Tester import PC -> réception deuxième appareil, mode hors ligne et mise en file, connexion interrompue, changements de compte et limites de taille.
- **PASS** : intégrité des fichiers, zéro perte, reprise sans doublon, données privées inaccessibles sans authentification.

## P3 — Conflits et sauvegardes
- Modifier une même correction sur deux appareils hors ligne ; résoudre sans écraser les versions.
- Tester favoris, progression, suppression, récupération, export/restauration totale et partielle.
- **PASS** : chaque modification importante reste récupérable et la sauvegarde restaure une bibliothèque cohérente.

## P4 — Deux PWA, un moteur partagé
- Deux builds indépendants sur environnements de test, thèmes/configurations/versions de module distincts.
- Activer une fonction expérimentale dans un seul fandom, changer le moteur puis vérifier l'autre PWA.
- **PASS** : pas d'interférence de caches, stockage, manifest, URLs, sessions et versions ; les deux restent utilisables hors ligne.

## P5 — Migration EverLore VA
- Copie de la PWA actuelle, migration explicite des anciens identifiants et préférences.
- Contrôler les 10 histoires, 563 chapitres, liens historiques, favoris, éditions, traductions, progression, thèmes, hors ligne et visuel desktop.
- Simuler échec de migration et restauration.
- **PASS** : aucune perte ni modification visuelle non autorisée, contrôle de rapprochement détaillé, retour arrière reproductible.

## Décisions après chaque prototype
Poursuivre / modifier / comparer une alternative / arrêter. Ne pas présumer qu'un prototype réussi autorise une intégration en production.
