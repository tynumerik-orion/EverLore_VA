# EverLore Core — Critères de validation (V0.1)

## Conditions communes pour valider une brique
- Dépôt et package exacts confirmés, licence applicable lue (y compris dépendances et assets), maintenance suffisante ou risque assumé.
- API documentée, intégration isolable, module désactivable/remplaçable, format de données réexportable.
- Aucun secret dans le code client ; HTML importé nettoyé et ressources distantes contrôlées.
- Tests automatisés et manuels pertinents exécutés avec résultats mesurés, et non seulement prescrits.
- Compatibilité et ergonomie sur PC/Chromebook/Android ; capacité de fonctionner hors ligne.
- Mesures : taille du bundle, temps de chargement, pic mémoire, volume local, consommation cloud et coûts.
- Licence/conditions des services cloud et éventuelles obligations légales validées avant activation.

## Critères éliminatoires
- Fichiers personnels rendus publics, ou accès non autorisé à d'autres comptes.
- Perte silencieuse de corrections, favoris, progressions, histoires ou historique.
- Migration non restaurable sur copie de test.
- Impossible de conserver deux PWA isolées (caches/DB/manifests) dans la configuration ciblée.
- Nécessité de manipulations récurrentes GitHub Desktop pour importer une histoire dans le parcours final.
- Changement du visuel desktop validé sans consentement ou dégradation significative de la lecture mobile.
- Coûts non maîtrisables ou dépendance non remplaçable incompatible avec la stratégie TyCloud.

## Validation technique par famille
- **Import** : format détecté, chapitres exacts, prévisualisation, source préservée, idempotence, refus des ZIP bomb et scripts actifs.
- **Stockage** : transactions, migration, quotas, intégrité, sauvegarde hors navigateur.
- **Synchronisation** : authentification, délai acceptable, reprise, conflits, suppression restaurable, deux appareils et hors ligne.
- **Lecture** : édition/progression isolées, chapitre continu, sommaire fermé, fiche desktop inchangée.
- **Passages** : ancrage à bonne édition/chapitre, conservation du texte même en cas de repérage impossible, historique des corrections.
- **Multi-PWA** : identités manifest, chemins relatifs, caches, stockage, versions et déploiements indépendants.
- **UX mobile** : bloc presque pleine largeur, zoom et grandes polices, plein écran immersif, commandes tactiles, sélection native non interrompue.

## Niveau des conclusions
- **Décision métier validée** : principe approuvé par l'utilisatrice.
- **Candidat** : dépôt découvert, pas homologué.
- **Vérifié sur documentation** : identité, activité et capacités revendiquées contrôlées.
- **Prototypé PASS** : scénarios réalisés en environnement isolé.
- **Validé pour intégration** : audit licences/sécurité/performance, régression et décision explicite.
