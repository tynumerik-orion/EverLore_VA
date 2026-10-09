# EverLore Core — Stockage et synchronisation (V0.1)

## Objectif utilisateur
Depuis la PWA, importer et valider une histoire **une seule fois** ; elle doit devenir disponible sur les autres appareils associés, sans GitHub Desktop, avec reprise automatique lorsque la connexion revient. La lecture et les corrections restent possibles hors ligne.

## Architectures à comparer

| Architecture | Description | Points forts | Risques |
|---|---|---|---|
| A. Fichiers/WebDAV | IndexedDB et fichiers exportés vers un serveur WebDAV | Portable, plusieurs fournisseurs | Logique de synchronisation à développer, CORS et identifiants |
| B. Base synchronisée | RxDB, PouchDB, PowerSync, etc., et backend compatible | Réplication intégrée partiellement | Coûts, schémas, licences, backend, dépendances |
| C. Hybride | Documents comme fichiers privés + métadonnées/corrections synchronisées séparément | Évite les transferts inutiles, adaptée aux volumes | Cohérence multi-stockages plus complexe |

**Orientation de l'audit** : C à prototyper, sans sélection du service ni déploiement actuel.

## Contrat de synchronisation à définir
- Chaque opération possède identifiant unique, objet cible, version, horodatage et source/appareil ; l'horloge seule ne doit pas déterminer les conflits critiques.
- Upload réessayable, idempotent, avec contrôle d'intégrité ; pas de doublon après interruption.
- Suppression = marqueur récupérable (« tombstone »), confirmation côté utilisateur, possibilité de restaurer.
- Favoris : union ou résolution explicite selon type ; progression : ne pas toujours supposer que la valeur maximale est la bonne (relectures/remise à zéro).
- Corrections concurrentes d'un même passage : conserver les deux variantes et demander arbitrage, jamais écrasement silencieux.
- Conserver l'édition et la révision exacte de chaque passage enregistré.
- Sauvegardes versionnées indépendantes de la synchronisation ; procédure de récupération après corruption.

## Scénarios indispensables
1. Import sur PC, lecture depuis téléphone après sync.
2. Import hors ligne, envoi après reconnexion ; interruption/reprise.
3. Édition conflictuelle d'une traduction sur deux appareils ; versions récupérables.
4. Suppression accidentelle sur un appareil ; récupération possible.
5. Authentification expirée ; aucune perte des modifications locales.
6. Réinstallation PWA puis restauration ; compteur exact d'histoires et de favoris.
7. Quotas navigateur/cloud ; refus propre, sans corruption.
8. PWA de fandom A ne lit ni n'efface le stockage local de fandom B.

## Confidentialité
- Service privé authentifié, règles d'autorisation vérifiées sur serveur pour chaque objet et chaque utilisateur.
- Ne pas publier les fanfictions importées, leurs traductions ou les jetons dans le repo public.
- Chiffrement et emplacement des données à comparer selon prestataire ; clé utilisateur perdue = risque d'irréversibilité si chiffrement bout en bout.
- Ne jamais assimiler « synchronisé » à « sauvegardé ».
