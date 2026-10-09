# EverLore VA | P0-S.B2-B.1 | Contrat d’archive et diagnostic HTTP

**Version :** 0.1 (proposition à homologuer)  
**Statut :** cadrage documentaire, non implémenté  
**Périmètre :** laboratoire fictif P0-S uniquement. Aucune donnée de production, aucune restauration, aucun déploiement.

## 1. Références et décisions

Sources de travail obligatoires :
- `docs/EverLore_Core_Faisabilite_V01/P0-S/LOT-EVA-P0S_SAUVEGARDE_RESTAURATION_V0.1.md`
- `docs/EverLore_Core_Faisabilite_V01/P0-S/LOT-EVA-P0S-B1_ENVIRONNEMENT_ISOLE_V0.1.md`
- les six études `docs/EverLore_Core_Faisabilite_V01/`
- rapport P0-S.A, bilan B1-C2b et étude P0-S.B2-A (rapport Codex du 09/10/2026, à rapprocher du code réel).

Décisions adoptées : (1) vérification seule et restauration exacte future, sans fusion initiale ; (2) sauvegarde personnelle distincte du paquet de référence ; (3) essais exclusivement sur origines locales isolées ; (4) chiffrement seulement étudié en B4, aucun contenu réel dans un ZIP non chiffré ; (5) captures de retour arrière conservées jusqu'à décision explicite. `zip.js` est **premier candidat de prototype**, et non une dépendance définitivement homologuée ; `fflate` demeure une alternative bornée.

B1 est **accepté exclusivement pour la séparation fonctionnelle** des deux origines fictives (localStorage, IndexedDB, persistance, accès croisés). Son historique contient cinq `ERR_HTTP_REQUEST_TIMEOUT` et `serverShutdown: FAIL` : ils ne sont ni supprimés ni requalifiés. Aucun confinement global du navigateur n'est démontré.

## 2. Objectif et arrêt B2-B.1

Établir **avant implémentation** un contrat de sauvegarde stable et vérifiable, son modèle de données, ses refus explicites, les limites de test et une correction indépendante des diagnostics HTTP. Il s'agit du socle de B2-B.2 à B2-B.7, **pas de leur réalisation**.

**Critère de sortie B2-B.1 :** spécification relue et approuvée, interfaces et exemples fictifs cohérents, limites provisoires documentées, plan de correctif HTTP distinct. Aucun export créé, aucune base réelle ouverte, aucune installation ni test dynamique.

## 3. Périmètre de sauvegarde

### localStorage

Onze clés historiques à inventorier séparément, qu'elles soient présentes ou absentes :

1. `everloreTextSize`
2. `everloreReadingFont`
3. `everloreReadingTheme`
4. `everloreReadingBackground`
5. `everloreReadingWeight`
6. `everloreReadingTextTone`
7. `everloreLastStoryIndex`
8. `everloreLanguageMode`
9. `everloreFavoriteChapters`
10. `everloreFavoritePassages`
11. `everlorePreferredTranslations`

Valeurs stockées conservées **sans `JSON.parse` métier, normalisation ni réécriture**. Distinguer : absent, chaîne vide, chaîne littérale `null`, JSON invalide, valeurs anciennes. Inventorier les clés EverLore supplémentaires en appliquant une règle explicite d'appartenance documentée. Les marqueurs physiques `everloreP0SFixture:` et les identifiants internes de session / test ne sont pas des données personnelles à exporter dans le produit final ; dans le laboratoire, ils servent uniquement à l'évaluation du codec et sont étiquetés `fixtureOnly`. Les clés ambiguës demandent une décision et ne doivent pas être lues arbitrairement.

**Attention :** documenter séparément les noms logiques historiques et leur correspondance physique `everloreP0SFixture:` dans le laboratoire ; ne jamais permettre à une archive d'imposer une destination de stockage.

### IndexedDB

Stockage historique attendu : base `everloreTranslationCache`, version 1, magasin `translations`, clé incorporée `keyPath: "key"`, sans auto-incrément attendu. Exporter les clés primaires distinctement des valeurs et capturer le schéma réel (version, magasins, keyPath, autoIncrement, index unique/multiEntry). Les enregistrements anciens, incomplets, inconnus et orphelins sont préservés ; aucune fonction du lecteur qui filtre ou corrige les données ne peut servir à l'export.

Ne jamais provoquer la création d'une base prétendument absente. Échec d'inventaire, store requis inaccessible, transaction annulée ou valeur non représentable : **échec explicite de complétude**.

### Référence historique

Identité du lecteur et du corpus dans un **paquet de référence distinct** : commit / empreintes vérifiables, ordre des dix histoires, slugs et 563 ancres historiques. Aucune renumérotation, aucune invention d'`editionId` ou de progression précise. Une sauvegarde personnelle isolée n'est pas une restauration autonome hors ligne du lecteur et du corpus.

## 4. Contrat de format et compatibilité

Identifiant provisoire : `everlore-personal-backup`; version du format proposée `1.0.0` (à confirmer au moment de figer le schéma), versions indépendantes du codec localStorage et IndexedDB. Une version majeure inconnue entraîne refus. Une version mineure plus récente peut uniquement être acceptée après règle de compatibilité explicite et vérification des champs obligatoires ; aucun mode permissif silencieux.

Exemple documentaire :

```text
everlore-personal-fixture.zip
├── manifest.json
├── manifest.sha256
├── inventory.json
├── localstorage/entries.json
├── indexeddb/db-0001/schema.json
├── indexeddb/db-0001/store-0001/records-000001.json
├── binary/object-0001/chunk-000001.bin       # si requis
└── reference/requirement.json
```

Chemins d'archive **fabriqués par l'exporteur**, jamais à partir d'une clé utilisateur. Limiter les entrées et chemins ; refuser chemins absolus, traversée, doublons et collisions. Les formats ZIP hôtes, compression, dates d'entrées et variantes ne font pas partie du codec de valeurs.

### Manifeste minimal

- identité/version du format, identité/version de l'exporteur et codec(s) ;
- type `personal`, indicateur `fixtureOnly` ;
- origine source autorisée, identité de l'application et référence de code ;
- début/fin de capture, `atomicGlobal: false`, couverture et réserves ;
- inventaire détaillé `present` / `absent` / `excluded` / `unverifiable` ;
- schémas, comptages, taille et SHA-256 de **chaque** entrée utile ;
- exigence / identité vérifiable du paquet de référence ;
- limites déclarées, avertissements et diagnostics distincts des données brutes.

Une entrée requise `unverifiable` interdit le statut complet. Le SHA-256 du `manifest.json` est enregistré **hors du manifeste**, dans `manifest.sha256`, sans autoréférence. Des empreintes incluses dans l'archive détectent la corruption mais ne prouvent pas l'authenticité contre modification malveillante du ZIP et de ses contrôles.

## 5. Codec exact des valeurs

### Chaînes localStorage

Encoder clés et valeurs au niveau des **unités de code UTF-16**, little-endian, puis Base64, avec longueur en unités de code. Ne pas utiliser un passage UTF-8 qui remplacerait les substituts isolés. Prévoir test bidirectionnel incluant chaîne vide, caractère isolé, CR/LF/CRLF, espaces, Unicode, `null` littéral et JSON invalide. Une clé absente n'a **aucune** valeur encodée ; elle ne vaut pas `null`.

### Valeurs et clés IndexedDB

Définir un codec versionné réversible pour les types effectivement admis par le clonage structuré, notamment `undefined`, valeurs numériques spéciales (`-0`, `NaN`, `Infinity`), `BigInt`, Date, Map, Set, tableaux à trous, cycles / références partagées, ArrayBuffer, typed arrays, DataView, Blob/File, ainsi que les clés IndexedDB (valeurs autorisées et ordre). Vérifier le maintien des métadonnées et relations internes. **Ne pas promettre cette couverture tant qu'elle n'a pas été réalisée et testée.** Une valeur indécodable ou un type non pris en charge provoque refus localisé, pas un remplacement arbitraire. Signaler le cas des générateurs auto-incrémentés, dont l'état interne ne se reconstitue pas nécessairement.

Pour la première preuve, distinguer explicitement un sous-ensemble **supporté et testé** du catalogue des types **spécifiés mais non testés**. L'export complet ne pourra être déclaré fidèle qu'à son périmètre effectivement couvert.

## 6. Capture, intégrité et cohérence

Pipeline futur : inventaire → capture readonly indépendante du lecteur → encodage → empreintes des octets → manifeste → ZIP → relecture ZIP → comparaison sémantique et octet à octet des données décodées → remise contrôlée.

IndexedDB : transaction `readonly` sans attendre la compression ou le calcul des empreintes entre requêtes ; capturer la clé primaire et chaque valeur. `localStorage` et IndexedDB n'ont **pas** de transaction commune, ni entre plusieurs bases. Fermer les autres écrivains fictifs, relever bornes de capture et comparer l'état source avant/après ; un changement observé invalide le succès, sans prétendre détecter tous les changements transitoires.

Vérifier trois couches : (1) structure ZIP (pas de chemins dangereux, entrées dupliquées/inattendues, manquants), (2) tailles, CRC si applicable, SHA-256 des fichiers décompressés, (3) identité logique des valeurs, types, schéma, clé primaire, caractères exacts. Deux ZIP peuvent différer en métadonnées ; `savedAt` métier reste une donnée et **ne doit pas être ignorée**.

Une compression réussie, un Blob créé ou un clic de téléchargement ne prouvent ni la fidélité, ni la durabilité du fichier sur disque. Le téléchargement puis relecture vérifiée relèvent de B2-B.6.

## 7. Limites provisoires du premier prototype

**À proposer et justifier en B2-B.1**, puis valider avant toute B2-B.2 dynamique : taille maximale de chaque entrée, taille totale capturée / décompressée, nombre d'enregistrements et de fichiers, profondeur / graphe d'objets, durée d'une opération et budget mémoire. Réduire les premiers essais à des **fixtures petites et artificielles**, sans fixer arbitrairement une limite définitive pour EverLore. Toute limite atteinte : échec clair, jamais troncature silencieuse.

Appareils de qualification ultérieure : Windows 11 ARM64, Chromebook, Android et tablette selon disponibilité. Leur compatibilité demeure **NON TESTÉE** pour le ZIP tant que les scénarios n'ont pas été exécutés.

## 8. Diagnostic HTTP B1, chantier distinct

Faits historiques : cinq `ERR_HTTP_REQUEST_TIMEOUT` et `serverShutdown: FAIL` dans C2b, alors que les résultats individuels de fermeture indiquaient `listening: false`, `sockets: 0`, et que les deux ports furent constatés sans écoute par PowerShell. Ces éléments ne prouvent ni une fermeture totalement exempte d'erreurs ni une perte de données ; aucune archive n'avait été produite.

Exigences du futur correctif sur le serveur fictif uniquement :
- **ne pas effacer ou réécrire** le FAIL de B1 ; archiver les faits ;
- séparer `httpSessionErrors` de `shutdownErrors` et exposer `httpSessionStatus`, `serverShutdown`, `overallStatus` ;
- horodatage, phase, port, code d'erreur et identifiant local de connexion (sans données privées) ;
- statut global FAIL pour toute erreur inattendue, même si la fermeture réussit ;
- ne pas augmenter arbitrairement les délais ni ignorer `clientError` afin d'obtenir PASS ;
- conserver preuve des listeners/sockets et vérifier l'arrêt des seuls processus de test.

**B2-B.1 n'autorise aucune modification du serveur.** Une correction de `c2-serve.mjs` et toute exécution dynamique demanderont une autorisation ultérieure, distincte de la validation documentaire.

## 9. Conditions PASS/FAIL du cadrage documentaire

| Exigence | PASS documentaire uniquement si… |
|---|---|
| Couverture | Les onze clés, la clé supplémentaire et les magasins fictifs sont inventoriés et les exclusions justifiées |
| Fidélité | Les règles de conservation exacte, cas inconnus et refus sont normatives |
| Codec | Les types, versions, clés et limites sont documentés sans promesse de compatibilité non testée |
| Manifeste | Pas d'autoréférence de hash ; compteurs, empreintes, couverture et références définis |
| ZIP | zip.js candidat, fflate alternatif ; licences et versions restent à confirmer à l'intégration |
| Limites | Enveloppe fictive bornée et mesurable proposée avant essais |
| HTTP | Diagnostic et fermeture distingués ; FAIL historique intact |
| Sécurité | Aucune archive réelle, donnée personnelle, restauration ou déploiement |
| Portée | B2-B.2 à B2-B.7 restent explicitement NON COMMENCÉS |

## 10. Prochain découpage (non autorisé par ce document)

- **B2-B.2** : capture fictive et codecs, sans ZIP ;
- **B2-B.3** : manifeste, comptages et SHA-256 sur fichiers fictifs ;
- **B2-B.4** : intégration locale explicitement autorisée de zip.js et notices ;
- **B2-B.5** : écriture/relecture ZIP en mémoire avec contrôle de fidélité ;
- **B2-B.6** : téléchargement manuel, relecture du fichier conservé ;
- **B2-B.7** : erreurs, concurrence, volumes et appareils.

B3 (restauration), B4 (chiffrement) et P1 (import de fanfictions) restent verrouillés.

## 11. Livrable attendu pour B2-B.1

Un **rapport de revue documentaire** dans la conversation Codex, avec décisions, contradictions éventuelles entre spécification et code, contrats de données prêts à implémenter, limites chiffrées **proposées et motivées** pour petites fixtures, plan HTTP distinct, tableau PASS/FAIL/NON TESTÉ, prérequis B2-B.2. La mission Codex demeure **lecture seule** tant qu'une nouvelle autorisation n'a pas été accordée.
