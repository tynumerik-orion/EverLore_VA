# EverLore VA — P0-S : protection des données et restauration (V0.1)

**Statut :** cadrage validé sur les principes, réalisation non autorisée avant revue du plan de Codex.
**Positionnement :** étape de sécurité préalable à P1 ; ne remplace pas et ne réécrit pas LOT-EVA-002 ou les huit lots existants.

## 1. Décisions validées

1. Import principal directement dans la PWA ; solution Windows éventuelle de secours.
2. Annotations anciennes sans identification certaine de l’édition : `édition non déterminée`, sans attribution fabriquée.
3. À terme synchroniser les préférences de lecture (thème, police, taille), favoris et progression ; conserver les états liés à un appareil (ex. plein écran) localement. **P0-S ne met pas en place cette synchronisation.**
4. Sauvegarde portable versionnée : archive ZIP avec manifeste, JSON brut et données nécessaires, empreintes et vérification d’intégrité ; chiffrement des sauvegardes privées à étudier avant de l’exposer à l’utilisateur. Le format définitif et le schéma sont à concevoir, pas déjà validés.
5. Conserver l’origine de production actuelle durant les premiers essais ; toute migration de domaine est une étape distincte.

## 2. Constats P0 à respecter

- Corpus dépôt : 10 histoires, 563 chapitres, indices de catalogue 0 à 9, slugs et ancres historiques à préserver.
- `localStorage` : 11 clés (`everloreTextSize`, `everloreReadingFont`, `everloreReadingTheme`, `everloreReadingBackground`, `everloreReadingWeight`, `everloreReadingTextTone`, `everloreLastStoryIndex`, `everloreLanguageMode`, `everloreFavoriteChapters`, `everloreFavoritePassages`, `everlorePreferredTranslations`).
- IndexedDB `everloreTranslationCache`, version 1, magasin `translations`, données HTML de traduction et métadonnées.
- Aucune sauvegarde complète/restauration intégrée ; aucune sauvegarde des données réelles du navigateur démontrée.
- Les préférences de formulation ne contiennent pas de rattachement fiable à l’histoire/édition/chapitre ; les passages n’ont pas d’ancrage stable complet. Préserver les valeurs brutes.
- Le service worker actuel peut supprimer d’autres caches de la même origine. Un profil différent sur **la même origine**, une branche Git ou un simple chemin ne constituent pas une stratégie d’isolation suffisante à eux seuls.

## 3. Objectif et périmètre

Définir une procédure sûre d’export et de restauration **sur données fictives uniquement**, dans un environnement indépendant de la PWA en production. Produire les preuves qu'une sauvegarde complète de chaque catégorie de données est possible avant de prévoir une sauvegarde explicite des données réelles, sous autorisation distincte.

**P0-S ne réalise pas :** import d’histoires P1, synchronisation cloud, migration réelle de données, réorganisation du catalogue, modification de l’interface desktop, activation d’un nouveau service worker en production, installation/déploiement sans accord.

## 4. Conditions d’isolation

- Travail sur branche ou copie dédiée **et** origine distincte de la production (hostname/protocole/port selon contexte), profil navigateur de test si nécessaire.
- Préfixes et noms propres aux données fictives et aux caches ; aucun accès en écriture aux données de production.
- Ne pas réutiliser le service worker actuel dans l’origine de test sans analyse préalable de son comportement de nettoyage des caches.
- Aucune donnée personnelle, clé de cloud ou archive réelle dans le dépôt public, journaux, captures ou rapports.
- En cas de doute sur l'isolation : **arrêt et demande de validation**.

## 5. Exigences de sauvegarde à spécifier

- Inventaire exhaustif, sans perte de clés inconnues pertinentes, des données EverLore accessibles sur l’origine autorisée. Ne jamais prétendre pouvoir exporter les données d’un autre appareil ou d’une autre origine.
- Export brut des 11 clés connues et enregistrements `everloreTranslationCache/translations`, y compris valeurs atypiques, invalides ou orphelines, sans correction silencieuse.
- Manifeste versionné décrivant schéma, provenance locale explicite, nombre d’enregistrements, tailles et empreintes vérifiables. Distinguer données personnelles et contenu de référence du dépôt.
- Format ZIP et JSON portable, déterministe lorsque possible, gestion des encodages, quotas et gros volumes ; aucune archive téléchargée ne doit être considérée fiable sans validation.
- Intégrité vérifiée *avant* application d’une restauration ; échec sans modification du jeu existant quand c'est techniquement possible, et stratégie de retour arrière documentée.
- Réimport répété : absence de doublons et aucune perte ; règles de remplacement, fusion et conflits définies explicitement.
- Préservation des identifiants et des valeurs brutes ; champs manquants laissés indéterminés, pas de réécriture implicite.
- Chiffrement : fournir une étude concrète des méthodes, gestion de mot de passe, récupération, limitations navigateur et confidentialité. Ne pas présenter un simple ZIP non chiffré comme une protection des données sensibles.

## 6. Séquence de travail et points d'arrêt

**P0-S.A — Plan lecture seule (prochaine mission Codex)** : examiner code et documentation, proposer format, inventaire, isolation, scénarios de tests et commandes envisagées ; **aucun fichier modifié**. Retour pour validation humaine.

**P0-S.B — Prototype isolé, uniquement après autorisation** : construire l’export/import sur données fictives et jeux de test dédiés. Aucune production.

**P0-S.C — Preuves de restauration** : tester export→effacement de la copie→restauration, comptages, empreintes, doublons, données inconnues, archive tronquée, erreurs de quota, interruption, reprises et compatibilité historique. Rapports expurgés.

**P0-S.D — Procédure données réelles** : établir un protocole distinct, nécessitant une autorisation expresse et incluant vérification de la destination de sauvegarde privée, de la restauration et des risques. Ne pas exécuter automatiquement.

**Critère de passage à P1** : P0-S.B/C validés, schéma de sauvegarde et restauration vérifiés, isolation du prototype P1 documentée, et plan de préservation de production explicite. La protection effective des données réelles doit être décidée séparément avant toute intervention qui les expose.

## 7. Livrables de P0-S.A

1. Inventaire sourcé du code P0 utile à l’export.
2. Schéma proposé de l’archive et de son manifeste, avec exemple **fictif**.
3. Stratégie d’isolation de test, nom d’origine et de stockage proposés (ne rien créer).
4. Plans de restauration, validation d’intégrité, idempotence, échec et retour arrière.
5. Matrice des tests, critères PASS/FAIL et risques résiduels.
6. Décisions à soumettre à l’utilisatrice et liste des opérations qui nécessiteraient une autorisation.

## 8. Règle de non-régression

Conserver le rendu desktop, les dix histoires et les 563 identifiants historiques, les réglages, les traductions mémorisées et les favoris existants. **Ne pas inférer une progression ou une édition inconnue.**
