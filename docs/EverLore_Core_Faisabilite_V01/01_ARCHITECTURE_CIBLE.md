# EverLore Core — Architecture cible proposée (V0.1)

**Statut : proposition de faisabilité ; pas d'autorisation d'implémentation.**

## Décisions déjà retenues
- **Option B** : plusieurs PWA autonomes par fandom, chacune installable et déployable séparément. Pas de PWA multifandom unique à ce stade.
- Un moteur métier **EverLore Core** commun à la construction, et des configurations par fandom. Ne pas cloner manuellement l'application.
- Essais de fonctionnalités et de versions de modules indépendants selon la PWA ; pas de déploiement automatique d'une expérience dans toutes les PWA.
- TyCore accueille seulement les briques réellement génériques ; EverLore Core garde les règles de lecture et de fanfictions.
- Interface de lecture et fiche **desktop Vampire Academy existantes préservées** ; pas de refonte involontaire.
- Import directement depuis la PWA, sans GitHub Desktop pour les ajouts courants ; histoires disponibles sur d'autres appareils après synchronisation.
- Fonctionnement **local-first** : lecture et modifications possibles hors connexion.

## Architecture logique à tester

```text
apps/
  vampire-academy/       config, manifest, thème, tests et déploiement dédiés
  fandom-pilote-2/       configuration d'essai distincte (aucun nouveau fandom imposé)
packages/
  everlore-core/         histoire / édition / chapitre / lecteur / navigation
  everlore-library/      catalogue, recherche, filtres, fiche
  everlore-import/       adaptateurs de sources et analyse sécurisée
  everlore-annotations/  favoris, repères de passages et corrections
  everlore-storage/      contrat stockage local et migrations
  everlore-sync/         contrat synchronisation, opérations et conflits
  everlore-themes/       thèmes, polices, fonds
  shared-utils/          candidats TyCore après validation
```

Ce schéma est **conceptuel** ; ne pas imposer ces noms ni un monorepo sans prototype.

## Contrats de données minimaux
- `workId` immuable pour une histoire ; `editionId` pour chaque édition/langue/source ; `chapterId` stable.
- Favori histoire relié à `workId`, favori chapitre à `editionId` + `chapterId` ; favori passage aux mêmes identifiants + citation, contexte, position et révision.
- Conservation de la provenance et de l'historique des corrections, sans remplacer les originaux.
- Révision et empreinte pour import/mise à jour ; distinction nouveau chapitre, nouvelle édition et doublon.
- Identifiants globalement uniques ou qualifiés pour préparer l'agrégation future dans TyEverLore et les crossovers sans duplication.
- Données locales de chaque PWA isolées par application/fandom ; services cloud avec autorisations côté serveur.

## Séparation du stockage
1. **Documents** : fichiers d'histoires et éditions, éventuellement contenus binaires, transferés avec détection d'identité et intégrité.
2. **Métadonnées** : catalogue, index, progression et favoris.
3. **Modifications personnelles** : corrections, notes, historiques, journal d'opérations.
4. **Préférences** : distinguer celles propres à l'appareil de celles synchronisées.
5. **Sauvegardes historiques** : séparées de la réplication automatique.

## Hébergement
- Conserver GitHub Pages tant que le prototype n'impose pas de migration ; étudier Cloudflare Pages + Workers + R2 et WebDAV comme alternatives.
- Ne jamais placer secrets, clés cloud permanentes ni fichiers privés dans le bundle PWA, sur Pages ou dans un dépôt public.
- Changement de domaine = changement d'origine navigateur : prévoir un export/migration explicite des données locales.

## Invariants de non-régression
- 10 histoires et 563 chapitres préservés ; anciens liens historiques maintenus ; progression, favoris, traductions et préférences migrés sans perte.
- Sélection de texte et correction restent utilisables en mode immersif mobile.
- Fond Améthyste Nocturne : externalisation contrôlée, sans retouche ni changement de rendu, en coordination avec le service worker.
- Caches de chaque PWA scellés par nom/version/périmètre ; ne jamais effacer les caches d'autres applications.
