# EverLore VA — P0-S.B1 : environnement isolé et données fictives (V0.1)

**Statut :** spécification de mission B1, autorisation limitée à la préparation d'une copie de test après validation des garde-fous. **B2, B3, B4, C et D non autorisés.**  
**Document parent :** `LOT-EVA-P0S_SAUVEGARDE_RESTAURATION_V0.1.md`.  
**Référence :** rapport Codex P0-S.A, commit source relevé `da09960a0f3345a4a2ad2b274a47ee6c517c760e` (à contrôler avant toute opération).

## 1. Décisions validées

1. Première restauration : **vérification seule** et **restauration exacte** ; fusion désactivée.
2. Conserver séparément la sauvegarde personnelle et le paquet de référence du lecteur/corpus. Une sauvegarde personnelle seule n'est pas une réinstallation autonome.
3. Origines fictives proposées : `http://127.0.0.1:43171` (export) et `http://127.0.0.1:43172` (restauration), sous réserve de disponibilité ; tout changement doit être signalé.
4. Prévoir l'étude et les essais du chiffrement en B4, exclusivement sur données fictives ; aucune donnée réelle autorisée.
5. Conserver toute capture de retour arrière jusqu'à vérification et autorisation explicite de suppression.

## 2. Objectif propre à B1

Préparer et **prouver** un espace de test distinct du dépôt de travail et de la PWA de production : copie indépendante, deux origines locales distinctes, profil de navigateur fictif, jeux de données fictifs et garde-fous empêchant toute confusion avec la production. **Ne pas implémenter l'export ZIP ni la restauration pendant B1.**

## 3. Périmètre autorisé

- Examiner l'état Git et le contenu documentaire en lecture seule ; vérifier le commit de départ et signaler tout écart.
- Créer uniquement un répertoire de travail de test **hors du checkout `EverLore_VA`**, nommé explicitement P0S-B1, contenant des fichiers de démonstration sans données personnelles.
- Préparer des pages ou outils de test minimaux **sans** importer `app.js`, `bootstrap.js`, `register-sw.js`, `sw.js`, ni initialiser un service worker de production.
- Employer uniquement les origines `127.0.0.1` et les deux ports réservés, si disponibles, et lier les serveurs à l'interface loopback ; ne jamais exposer `0.0.0.0`.
- Utiliser un profil navigateur de test dédié, non synchronisé et non connecté à un compte personnel ; **pas** de session, cookies, stockage ni permissions du profil quotidien.
- Générer des données totalement fictives et non sensibles, représentatives des formats P0 : les 11 clés logiques (présentes, absentes, chaînes atypiques et JSON volontairement invalide) et un magasin IndexedDB fictif.
- Préfixer les clés d'essai par `everloreP0SFixture:` et nommer les bases `everloreP0SFixtureTranslationCache` et `everloreP0SFixtureRestoreControl`. Des noms physiques fictifs doivent être utilisés : ne **jamais** créer `everloreTranslationCache` dans une origine de production.
- Établir un inventaire du jeu fictif (valeurs, comptages, types, empreintes éventuelles), sans inclure de véritable fanfiction.
- Effectuer uniquement des tests de **mise en place et isolation** sur les jeux fictifs ; relever PASS/FAIL et arrêter en cas de doute.

## 4. Interdictions absolues

- Aucune modification des fichiers suivis de `EverLore_VA`, ni de son historique, ni de `docs/lots`, ni de la PWA déployée.
- Aucun commit, push, déploiement, branche de développement ou changement de dépendances du dépôt réel.
- Aucun accès à l'origine de production (même en lecture), aux profils personnels, aux sauvegardes personnelles, aux identifiants et aux services cloud ; aucune requête vers un domaine réel EverLore.
- Aucune ouverture du lecteur réel avec les jeux fictifs ; aucune exécution du service worker existant.
- Aucune dépendance externe à installer sans autorisation ; privilégier les API natives et les outils déjà disponibles. Si une installation est nécessaire, s'arrêter pour demander autorisation.
- Aucune suppression de stockage hors des origines fictives, ni `localStorage.clear()` ou effacement global sans délimitation stricte ; ne pas procéder à une restauration destructive dans B1.
- Aucun export ZIP, chiffrement, restauration, migration, synchronisation, ni import d'histoires : réservés aux étapes ultérieures.

## 5. Contrôles d'isolation PASS/FAIL

| Test | PASS attendu |
|---|---|
| Répertoire source | `EverLore_VA` inchangé : état Git initial/final identique |
| Copie de test | Chemin indépendant et clairement identifié, aucun lien symbolique vers le dépôt ou données réelles |
| Origines | Deux ports différents sur `127.0.0.1`, sans écoute publique ; ports réellement disponibles |
| Profil navigateur | Profil dédié et non connecté, distinct des sessions personnelles |
| Noms des données | Uniquement clés/bases fictives avec les préfixes convenus |
| Jeux fictifs | Cas normal, absent, vide, JSON invalide, Unicode, enregistrement orphelin, schéma connu et champ inconnu |
| Référence historique | Métadonnées fictives testant 10 index et 563 ancres sans recopier de texte privé ; aucune modification du catalogue existant |
| Séparation des origines | Les données de 43171 ne sont pas visibles depuis 43172 avant tout transfert volontaire ultérieur |
| Service worker | Aucun service worker de production enregistré ni activé dans les deux origines |
| Réseau | Aucune requête sortante vers production, comptes ou services cloud |
| Reproductibilité | Procédure d'installation et vérifications documentées, pouvant être rejouées |

**STOP immédiat** : doute sur origine/profil, port pris, répertoire pointant vers la production, besoin d'installation, accès à des données non fictives, changement Git inattendu, échec de séparation, ou comportement de suppression non borné.

## 6. Livrables B1 attendus dans le chat

1. Chemins exacts des répertoires de test créés (hors dépôt) ; liste des fichiers fictifs.
2. Ports disponibles/utilisés et preuve du bind loopback (sans métriques inventées).
3. Inventaire reproductible des jeux fictifs, des clés et des schémas.
4. Résultats PASS/FAIL pour chaque contrôle d'isolation, avec preuves et commandes effectivement exécutées.
5. État Git initial/final, confirmation qu'aucun fichier de production n'a été modifié.
6. Blocages, risques résiduels, opérations non faites et recommandations pour B2.

Si les outils ne permettent pas de créer et vérifier le profil navigateur dédié, déclarer les contrôles correspondants **NON TESTÉS** plutôt que PASS. Ne pas considérer B1 terminé tant que l'isolation n'est pas démontrée.

## 7. Point d'arrêt

À la fin de B1, **arrêt obligatoire** et revue avec l'utilisatrice. Aucun lancement automatique de B2. Les données personnelles du navigateur et les données réelles EverLore demeurent hors périmètre.
