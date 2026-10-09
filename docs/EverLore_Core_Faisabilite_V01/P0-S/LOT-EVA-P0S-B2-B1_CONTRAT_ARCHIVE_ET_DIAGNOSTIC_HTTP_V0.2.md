# EverLore VA | P0-S.B2-B.1 | Contrat normatif d'archive et diagnostic HTTP

**Version :** 0.2 — proposition corrigée soumise à revue Codex, non homologuée  
**Remplace pour le cadrage futur :** V0.1, conservée intacte comme historique.  
**Périmètre :** laboratoire fictif uniquement ; B2-B.1 documentaire. Aucun code exécuté, aucun export, ZIP, restauration, installation, accès à la production ou données réelles autorisés par ce document.  
**État du projet :** B1 accepté *uniquement* pour l'isolation fonctionnelle, avec réserve historique HTTP (cinq `ERR_HTTP_REQUEST_TIMEOUT`, `serverShutdown: FAIL`). C1 reste `BLOCKED`.

## 1. Décisions et références

Références : P0-S V0.1 ; protocole B1 V0.1 ; six études de faisabilité EverLore Core ; rapports P0-S.A, B1-C2b, B2-A et audit Codex B2-B.1 du 09/10/2026 ; `app.js`, `bootstrap.js`, `stories/catalog.json` et fichiers du laboratoire. L'audit documentaire est source des précisions de cette V0.2, et **non** preuve d'implémentation.

Décisions héritées : restauration future « vérification seule » ou « exacte », pas de fusion ; sauvegarde personnelle séparée du paquet de référence ; origines fictives A `http://127.0.0.1:43171` et B `http://127.0.0.1:43172` ; chiffrement examiné ultérieurement en B4 ; captures de retour arrière conservées jusqu'à décision explicite ; premier candidat ZIP `@zip.js/zip.js` (non homologué), alternative `fflate` ; aucune mutation du dépôt principal, des données de navigateur réel ou de `execution-policy.json`.

**Priorité normative :** la complétude dépend d'un *périmètre figé avant toute capture*, pas du seul sous-ensemble que l'exporteur a réussi à lire. Toute entrée requise non vérifiable, inaccessible ou non encodable entraîne `INCOMPLETE/FAIL`, jamais `COMPLETE`. Un export ne corrige et ne normalise aucune donnée métier.

## 2. Périmètre fermé B2 fictif et inventaire

### 2.1 localStorage

L'archive utilise les **noms logiques**, jamais un chemin d'écriture imposé par son contenu. Dans le laboratoire, le nom physique est `everloreP0SFixture:` + nom logique. Onze noms historiques *obligatoirement inventoriés*, présents ou absents :

| Nom logique | État de fixture B1 attendu |
|---|---|
| `everloreTextSize` | présent |
| `everloreReadingFont` | présent |
| `everloreReadingTheme` | présent |
| `everloreReadingBackground` | présent |
| `everloreReadingWeight` | présent, chaîne vide |
| `everloreReadingTextTone` | absent |
| `everloreLastStoryIndex` | présent |
| `everloreLanguageMode` | présent |
| `everloreFavoriteChapters` | présent |
| `everloreFavoritePassages` | présent |
| `everlorePreferredTranslations` | présent, JSON invalide |

**Douzième entrée requise :** clé physique `everloreP0SFixture:unknownLegacyKey`, stockée dans l'archive avec nom logique `unknownLegacyKey` ; son contenu demeure brut et sans interprétation.

**Marqueur technique, inventorié mais exclu :** `everloreP0SFixture:isolationProbe` (`reason: "B1_TECHNICAL_MARKER"`). Il peut être absent si le jeu complet B2 est déployé sur une nouvelle origine/profil ; cette absence doit être rapportée, et non inventée.

**Règle fermée de découverte :** ne lire aucune valeur de clé étrangère. Si un nom supplémentaire ambigu/non répertorié apparaît, enregistrer seulement le nom nécessaire au diagnostic (sans valeur) puis interrompre la complétude. Les 12 entrées requises désignent onze clés historiques plus la clé ancienne additionnelle ; dans la fixture préparée : onze attendues présentes et une absente. La présence effective dans le navigateur est encore NON TESTÉE.

Chaque entrée requise a un état `present` ou `absent` confirmé ; `excluded` et `unverifiable` appartiennent à l'inventaire et non à la liste de données prétendument capturées. La chaîne vide, la chaîne littérale `null`, une chaîne JSON invalide et une absence restent distinctes. Aucun `JSON.parse`, trim, modification des fins de ligne ou normalisation Unicode.

### 2.2 IndexedDB

| Destination | Décision |
|---|---|
| `everloreP0SFixtureTranslationCache` / `translations` | **INCLURE** données brutes et schéma complet observable |
| `everloreP0SFixtureRestoreControl` et ses magasins | **EXCLURE**, motif `B1_TECHNICAL_CONTROL`, inventaire de nom uniquement |
| Autre base, magasin ou index inattendu | **ARRÊT / INCOMPLETE** jusqu'à décision documentée ; ne pas récupérer ses valeurs arbitrairement |

Schéma attendu de `everloreP0SFixtureTranslationCache` : version 1 ; magasin `translations` ; `keyPath: "key"` ; `autoIncrement: false` ; aucun index. Relever l'état réel, ne pas le reconstruire d'après l'attente. Lire chaque clé primaire **séparément** de chaque valeur, même si une propriété métier `key` existe. Lire les huit enregistrements fictifs prévus, sans filtrer données anciennes/orphelines, `html: null`, champs inconnus ou incohérences. Échec ou transaction avortée => incomplete. Une base absente ne doit **pas** être créée par un appel à `indexedDB.open()` sans précaution ; l'impossibilité d'en prouver l'absence entraîne `unverifiable`.

**Cas particulier :** dans les prototypes B2, le marqueur minimal C2 existant n'est pas une preuve d'initialisation des 11 clés et 8 enregistrements ; préparer un parcours B2 séparé. `fixture-contract.js` effectue un aller-retour JSON incompatible avec les cycles et plusieurs types ; ne pas le réutiliser comme codec universel. Ne pas adapter silencieusement `c2-storage.js`.

### 2.3 Corpus et paquet de référence

La référence du dépôt décrit l'ordre des dix histoires, les slugs, **563 ancres historiques uniques**, la version/empreinte du catalogue et une empreinte vérifiable du paquet de référence. Aucun `editionId` ni progression précise inventés. Le paquet personnel ne transporte pas automatiquement les textes du lecteur ou les ressources du corpus. Son absence ou sa non-vérification se traduit explicitement par `referenceStatus: "not_verified"`, sans confusion avec l'intégrité du paquet personnel.

**Important :** `source-baseline.json` du laboratoire pointe historiquement sur `1b770563…`, tandis que l'audit B2-B.1 a relevé `f67ffc68…` comme HEAD après ajout de la V0.1. Ne modifier ni contourner cette garde. Une nouvelle baseline, datée et approuvée séparément, sera nécessaire avant réutilisation dynamique ; préserver l'ancienne preuve.

## 3. Format d'archive B2 proposé (contrat documentaire v1)

**Identifiant :** `everlore-personal-backup` ; **version expérimentale** `1.0.0-prototype` pour la documentation. Avant développement, figer les versions reconnues dans une table explicite ; pas de supposition de compatibilité mineure ni de décodage permissif. `kind: "personal"`, `fixtureOnly: true` obligatoires en B2. Aucun décodeur de production n'est autorisé par ce document.

Noms ZIP relatifs ASCII, grammaire proposée `^[a-z0-9][a-z0-9._/-]*$`, avec segments non vides ; rejeter `.` / `..`, slash inverse, chemins absolus, préfixes lecteurs, caractères de contrôle, doublons exacts et collisions après normalisation/casefold. **Liste fermée / patron de noms générés par l'exporteur**, pas depuis les noms ou valeurs du stockage. Noms d'entrées proposés :

```text
manifest.json
manifest.sha256
inventory.json
localstorage/entries.json
indexeddb/db-0001/schema.json
indexeddb/db-0001/store-0001/records-000001.json
reference/requirement.json
```

Les fichiers additionnels éventuels doivent respecter des patrons de chemins, des compteurs et limites explicites ; aucune entrée inconnue admise par le vérificateur du prototype. Les fichiers de données peuvent être découpés en segments bornés. Le futur ZIP de données réelles ne doit pas être créé avant la politique de confidentialité/chiffrement dédiée.

### 3.1 Schéma minimal normatif proposé de `manifest.json`

Exemple entièrement fictif. **Les empreintes indiquées ici sont des espaces réservés, non des SHA-256 réels ; ce fragment n'est pas un manifeste accepté par un validateur.** Les futures fixtures normatives devront contenir des valeurs et empreintes réelles calculées sur leurs octets.

```json
{
  "format": "everlore-personal-backup",
  "formatVersion": "1.0.0-prototype",
  "kind": "personal",
  "fixtureOnly": true,
  "producer": {"name": "everlore-p0s-export-fixture", "version": "0.1.0", "zipLibrary": "candidate-zipjs"},
  "source": {"origin": "http://127.0.0.1:43171", "application": "EverLore-VA-fixture", "commit": "fictitious-reference"},
  "capture": {"startedAt": "2026-10-09T00:00:00.000Z", "finishedAt": "2026-10-09T00:00:01.000Z", "atomicGlobal": false, "concurrentMutationDetected": false, "status": "complete"},
  "codecs": {"localStorage": "utf16le-base64-v1", "indexedDbValues": "idb-graph-subset-v1", "indexedDbKeys": "idb-key-string-v1"},
  "inventoryPath": "inventory.json",
  "files": [
    {"path": "inventory.json", "role": "inventory", "bytes": 0, "sha256": "SHA256_TO_CALCULATE"},
    {"path": "localstorage/entries.json", "role": "localstorage", "bytes": 0, "sha256": "SHA256_TO_CALCULATE"},
    {"path": "indexeddb/db-0001/schema.json", "role": "idb-schema", "bytes": 0, "sha256": "SHA256_TO_CALCULATE"},
    {"path": "indexeddb/db-0001/store-0001/records-000001.json", "role": "idb-records", "bytes": 0, "sha256": "SHA256_TO_CALCULATE"},
    {"path": "reference/requirement.json", "role": "reference-requirement", "bytes": 0, "sha256": "SHA256_TO_CALCULATE"}
  ],
  "counts": {"requiredLocalStorage": 12, "presentLocalStorage": 11, "absentLocalStorage": 1, "includedDatabases": 1, "includedStores": 1, "includedRecords": 8},
  "referenceRequirement": {"path": "reference/requirement.json", "status": "not_verified"},
  "limitsProfile": "p0s-b2-fixture-v1",
  "limitations": ["NO_GLOBAL_ATOMICITY", "REFERENCE_PACKAGE_NOT_VERIFIED"]
}
```

**Règles de schéma :** champ manquant, type incorrect, chemin dupliqué ou version inconnue => FAIL ; champs supplémentaires inconnus => FAIL dans cette version prototype, sauf registre de champs optionnels explicitement versionnés. `format`, `formatVersion`, `kind`, `fixtureOnly`, `producer`, `source`, `capture`, `codecs`, `inventoryPath`, `files`, `counts`, `referenceRequirement`, `limitsProfile`, `limitations` sont requis. `files` contient exactement les fichiers utiles **hors** `manifest.json` et `manifest.sha256`, et leur longueur en octets décodés est un entier >= 0 ; `sha256` est une chaîne hexadécimale de 64 caractères minuscules. `capture.status: "complete"` seulement après inventaire figé, capture et vérification ZIP réussies ; sinon ne jamais livrer ce manifeste comme archive complète. Les dates d'export ne sont pas des dates métier.

`manifest.sha256` contient le SHA-256 des **octets exacts** de `manifest.json` (convention précise de texte hexadécimal + fin de ligne à figer avant ZIP). Le manifeste ne s'auto-référence pas. Les contrôles internes détectent la corruption et non l'authenticité face à un tiers qui modifierait données et empreintes ensemble.

### 3.2 `inventory.json` et `reference/requirement.json`

Exemple de forme normative, toujours fictif :

```json
{
  "localStorage": [
    {"logicalName": "everloreReadingWeight", "status": "present", "valuePath": "localstorage/entries.json"},
    {"logicalName": "everloreReadingTextTone", "status": "absent"},
    {"logicalName": "isolationProbe", "status": "excluded", "reason": "B1_TECHNICAL_MARKER"}
  ],
  "indexedDB": [
    {"name": "everloreP0SFixtureTranslationCache", "status": "present", "includedStores": ["translations"]},
    {"name": "everloreP0SFixtureRestoreControl", "status": "excluded", "reason": "B1_TECHNICAL_CONTROL"}
  ]
}
```

L'inventaire **réel** devra comprendre explicitement chacun des douze noms requis et chaque base prévue. `present`, `absent`, `excluded`, `unverifiable` sont les seules valeurs de statut ; `unverifiable` sur une entrée requise bloque `complete`. `valuePath` sur un élément absent ou exclu est interdit ; le champ `reason` est obligatoire pour `excluded` et `unverifiable`.

```json
{
  "referenceFormat": "everlore-reference-requirement-v1",
  "application": "EverLore-VA-fixture",
  "catalogueStories": 10,
  "historicalAnchors": 563,
  "requiredCommit": "TO_BE_FIXED_BEFORE_EXPORT",
  "catalogueSha256": "SHA256_TO_CALCULATE",
  "referencePackageSha256": "SHA256_TO_CALCULATE",
  "referenceStatus": "not_verified"
}
```

Les exemples comportent des **marqueurs de substitution** non admissibles dans une archive déclarée valide. Les fichiers réels exigent des empreintes de 64 hexadécimaux et un commit vérifié ; un paquet de référence absent/indisponible doit rester signalé sans invention d'empreinte. Prévoir un statut de référence `not_verified` sans remplir frauduleusement les champs d'empreinte : la valeur normative détaillée sera précisée avant B2-B.3.

## 4. Codec exact `localStorage` v1

Pour chaque nom logique et valeur `present`, encoder la séquence d'**unités de code UTF-16 little-endian, sans BOM**, octets ensuite exprimés en **Base64 RFC 4648 canonique** (padding obligatoire, aucun espace ni saut de ligne). Indiquer `codeUnits`, entier >= 0. Octets décodés = exactement `2 * codeUnits`. Refuser Base64 invalide, non canonique ou longueur incompatible. Restituer/Comparer unité de code par unité de code, sans passer par UTF-8 et sans normalisation Unicode.

Exemple **valide** pour un cas technique isolé :

```json
{"name":{"encoding":"utf16le-base64-v1","codeUnits":1,"base64":"QQA="},"status":"present","value":{"encoding":"utf16le-base64-v1","codeUnits":1,"base64":"QgA="}}
```

Cela représente la clé `A` et la valeur `B`. Pour `status: "absent"`, **aucun** membre `value` n'est autorisé. Les exemples de clés réelles doivent contenir leur encodage complet et le nom logique correspondant dans l'inventaire. Tests obligatoires : chaîne vide, NUL, substituts haut et bas isolés, paire valide, caractères composés et décomposés, espaces, CR/LF/CRLF, chaîne littérale `null`, JSON invalide. L'encodage Base64 n'est pas du chiffrement.

## 5. Codec IndexedDB v1 : sous-ensemble vérifiable

**La fidélité vise la valeur observable après une lecture IndexedDB (clonage structuré)**, non les prototypes/accesseurs/attributs perdus avant la mise en base. Capturer clés primaires séparément des valeurs, même en `keyPath` incorporé. Aucun filtre métier, aucune normalisation, aucun enrichissement d'`editionId` ou de progression.

Sous-ensemble **proposé, non encore implémenté ni testé** :

| Valeur | Étiquette normative proposée / règle |
|---|---|
| `null` | `{ "t": "null" }` |
| booléen | `{ "t": "bool", "v": true }` ou `false` |
| chaîne | `{ "t": "str", "v": <objet utf16le-base64-v1> }` |
| `undefined` | `{ "t": "undefined" }`, distinct d'une propriété absente |
| nombre fini | `{ "t": "number", "v": <nombre JSON fini> }` sauf `-0` |
| `-0` | `{ "t": "number-special", "v": "-0" }` |
| `NaN`, `+Infinity`, `-Infinity` | `{ "t": "number-special", "v": "NaN" / "+Infinity" / "-Infinity" }` |
| objet ordinaire | `{ "t": "ref", "id": <entier> }` vers table des nœuds |
| tableau | référence vers nœud avec longueur et liste explicite des indices présents ; trous conservés |
| références partagées et cycles | identifiants de nœuds uniques, résolution en deux temps, rejeter les références pendantes |
| clé primaire historique | `{ "t": "key-string", "v": <objet utf16le-base64-v1> }` |

**Représentation des nœuds proposée** : un enregistrement contient `codec: "idb-graph-subset-v1"`, `primaryKey`, `root`, `nodes`; chaque nœud a un `id` entier positif, `kind: "object"|"array"`, et `properties: [{"name": <utf16>, "value": <tagged>}...]`. Les tableaux exigent en plus `length` entier ; index numériques présents explicites et trous déduits des indices manquants ; ordre stable des propriétés tel qu'observable. Les identifiants de référence doivent être uniques et chaque identifiant référencé doit exister. Les détails des propriétés de tableaux hors indices seront figés dans des cas normatifs avant implémentation. Ne pas déclarer ce codec « prêt » tant que de vrais vecteurs de conformité (cycles, alias, holes, `undefined`) ne sont pas écrits et validés.

**Premier exemple fictif partiel, illustratif et non qualifiant** :

```json
{
  "codec": "idb-graph-subset-v1",
  "primaryKey": {"t": "key-string", "v": {"encoding": "utf16le-base64-v1", "codeUnits": 2, "base64": "SwAxAA=="}},
  "root": {"t": "ref", "id": 1},
  "nodes": [{"id": 1, "kind": "object", "properties": [
    {"name": {"encoding": "utf16le-base64-v1", "codeUnits": 1, "base64": "eAA="}, "value": {"t": "number", "v": 1}}
  ]}]
}
```

**Refus initial explicite :** `BigInt`, `Date`, `Map`, `Set`, `ArrayBuffer`, typed arrays, `DataView`, `Blob`, `File`, clés primaires autres que chaîne, objets non ordinaires, symboles et fonctions, handles/objets non portables, propriétés ou structures hors contrat. Ces types restent **prévus comme extensions**, jamais déclarés pris en charge. Si un type refusé apparaît dans une entrée requise, l'export **échoue comme incomplet**, sans réduire son périmètre. Certains types comme fonctions/symboles seraient déjà refusés par IndexedDB lors du stockage ; la règle de refus demeure.

Schéma IndexedDB : enregistrer version entière, magasins, `keyPath` (chaîne/array/null), `autoIncrement`, index et options `unique`/`multiEntry`. Le schéma actuel est sans index, sans auto-incrément ; tout schéma effectivement différent est signalé et refusé tant que la compatibilité n'est pas figée. L'état interne d'un générateur auto-incrémenté ne doit jamais être inventé.

## 6. Limites expérimentales approuvées pour proposition B2 (non-production)

Valeurs **provisoires soumises à revue Codex**, directement issues de l'audit B2-B.1. `Kio = 1 024 octets`, `Mio = 1 048 576 octets`. Les plafonds se cumulent ; dépassement => refus explicite, jamais troncature ni hausse automatique.

| Dimension | Plafond proposé |
|---|---:|
| Clés physiques `localStorage` autorisées à inventorier | 13 (12 incluses + 1 marqueur technique) |
| Nom de clé | 256 unités UTF-16 |
| Valeur `localStorage` | 16 384 unités UTF-16 (32 Kio d'unités brutes) |
| Bases autorisées à inventorier | 2, dont une technique exclue |
| Magasins inclus | 1 (`translations`) |
| Enregistrements inclus | 64 |
| Taille encodée d'un enregistrement (clé comprise) | 64 Kio |
| Capture encodée avant ZIP | 1 Mio |
| Fichier individuel décompressé | 256 Kio |
| Taille cumulée décompressée, contrôles inclus | 4 Mio |
| Taille ZIP | 4 Mio |
| Entrées ZIP | 128 |
| Chemin ZIP | 128 caractères ASCII |
| Profondeur de graphe (racine 0) | 16 |
| Nœuds objet/tableau | 256 par enregistrement ; 4 096 par capture |
| Propriétés/références | 1 024 par enregistrement ; 8 192 par capture |
| Longueur de tableau | 1 024 |
| Index par magasin | 8 maximum (mais prototype attendu : aucun) |
| Ouverture de base | 4 secondes |
| Capture | 5 secondes |
| Encodage | 10 secondes |
| Création ZIP et relecture | 15 secondes **chacune** |
| Opération automatique complète | 45 secondes hors manipulations manuelles |
| Buffers explicitement suivis par l'outil | 64 Mio |
| Cible hausse de tas JavaScript, si mesurable | 128 Mio |

Les limites mémoire **ne bornent pas** la totalité des allocations du navigateur ou des dépendances ; sans instrumentation pertinente : `NON TESTÉ`, pas PASS. Un délai ne garantit pas l'interruption d'un calcul synchrone bloqué. Les limites sont choisies pour de **petites fixtures** (huit enregistrements historiques préparés et 563 ancres documentaires) et ne définissent pas la taille future de la bibliothèque réelle.

## 7. Capture, validation et intégrité : règles d'arrêt

Pipeline futur : fixer périmètre et inventaire → lire `localStorage` brut et IndexedDB `readonly` → codec réversible → empreintes exactes → manifeste → ZIP candidat → relecture structure et CRC (si applicable) → empreintes SHA-256 recalculées sur octets décompressés → décodage/comparaison logique → remise vérifiée ultérieure. Ne jamais utiliser les fonctions métier du lecteur qui filtrent les traductions ou « réparent » un JSON.

Capture IndexedDB : transaction `readonly` couvrant le magasin autorisé, curseur et lecture des clés primaires, sans calcul de hash ou compression asynchrone entre requêtes ; attendre sa complétion. `localStorage` et IndexedDB ne partagent aucune transaction atomique. Interdire les écrivains concurrents dans le laboratoire autant que possible, comparer les états avant/après, invalider toute modification détectée, signaler qu'un changement transitoire peut échapper aux comparaisons.

Test structurel : format/version/codec reconnus, chemins sans traversée/collision, cardinalités conformes, entrées exactes, tailles et empreintes exactes, pas de contenu actif exécuté pendant lecture. Un ZIP endommagé, tronqué, ZIP bomb, objet hors capacité, valeur non supportée ou donnée requise non lisible est refusé. Une erreur ne modifie pas les données source et ne produit pas de fichier annoncé « complet ». L'export en mémoire ne prouve pas la conservation sur disque ; vérifier séparément la remise B2-B.6.

La comparaison logique ignore seulement métadonnées *d'exécution* (horodatage/export ID, organisation ZIP), **pas** les champs métier tels que `savedAt`. Empreintes dans un ZIP détectent la corruption, pas l'authenticité. Chiffrement/authentification réservés à B4, avant exposition à données réelles.

## 8. Jeux fictifs normatifs et preuves attendues

| Cas | Entrée préparée | PASS attendu |
|---|---|---|
| LS01 | onze noms historiques et clé inconnue | 12 états exacts, dont une absence |
| LS02 | valeur `""`, chaîne `"null"`, JSON invalide | aucune confusion ni parsing métier |
| LS03 | NUL, substituts isolés, paires UTF-16, composé/décomposé, CR/LF/CRLF | égalité des unités de code au décodage |
| LS04 | marqueur `isolationProbe` et clé étrangère injectée | marqueur exclu ; clé étrangère déclenche arrêt avant lecture de sa valeur |
| IDB01 | huit enregistrements préparés, y compris orphelins | huit clés primaires et valeurs fidèles, sans filtrage |
| IDB02 | `null`, bool, nombres spéciaux, `undefined` | tags distincts, équivalence après décodage |
| IDB03 | objet avec champ inconnu, tableau à trou, cycle, alias | graphe et trous préservés, sans duplication de référence |
| IDB04 | `Date`, `Map`, binaire, clé non-chaîne | refus localisé, aucune complétude annoncée |
| IDB05 | base absente, store inattendu, index non prévu | aucun `open()` créateur ; arrêt ou `unverifiable` explicite |
| ARC01 | manifeste et fichiers bornés, empreintes authentiquement calculées | cohérence fichiers/comptages/sha256 |
| ARC02 | octet modifié, entrée manquante, chemin `../`, version inconnue | refus sans écriture source |
| ARC03 | source modifiée pendant capture ; interruption | aucun succès silencieux ; non-atomicité documentée |
| REF01 | dix histoires fictives / 563 ancres ; référence non vérifiée | correspondance sans renumérotation ; `not_verified` explicite |
| HTTP01 | séparation diagnostics session/arrêt | erreurs historiques inchangées ; statut global FAIL si erreur inattendue |

Ces tests sont **NON EXÉCUTÉS** à B2-B.1. Chaque codec/type doit recevoir un vecteur d'essai complet attendu avant toute déclaration de PASS fonctionnel. Les cas avancés doivent être produits par un nouveau générateur qui **ne** fait **pas** de round-trip JSON. Exécutions sur Windows ARM64, Chromebook, Android/tablette plus tard et seulement selon autorisations.

## 9. Correction des diagnostics HTTP : mission indépendante et ultérieure

Réserve historique B1 : cinq `ERR_HTTP_REQUEST_TIMEOUT` + `serverShutdown: FAIL`; constat ponctuel `listening: false`, `sockets: 0`, ports sans écoute. Impossible d'attribuer avec certitude ces timeouts à la fermeture ; `clientError` et erreurs de fermeture alimentent actuellement un même tableau.

**Contrat du futur correctif de `c2-serve.mjs`, non autorisé dans B2-B.1 :**

- `httpSessionErrors` distinct de `shutdownErrors`, diagnostics de session vs fermeture mécanique ; événements `clientError` restent HTTP même en phase `closing`.
- `httpSessionStatus` = FAIL sur erreur HTTP inattendue ; `serverShutdown` = PASS seulement si chaque serveur lancé est réellement fermé sans erreur de fermeture et sockets restantes nulles ; `overallStatus` = FAIL dès qu'un des deux statuts est FAIL ou que le démarrage est incomplet.
- Statut du navigateur distinct, manuel/externe, `NON TESTÉ` en l'absence de preuve.
- Événements UTC + temps monotone, identifiant, phase, catégorie, port, identifiant de socket local, code et opération ; aucune charge utile, cookie, jeton ou donnée de navigateur.
- Conserver un code de sortie non nul et un rapport exploitable pour toute anomalie ; ne pas augmenter arbitrairement les délais, ignorer `clientError` ni requalifier les cinq erreurs historiques ; ne fermer que processus/sockets du laboratoire.

Avant toute exécution B2 dynamique : autorisation **distincte** du correctif HTTP, contrôle et révision autorisée de la baseline sans écraser la preuve historique, nouvel environnement/profil fictif, contrôle des ports et service workers. Les protections C1 restent `BLOCKED` ; le protocole manuel C2 ne démontre pas un confinement réseau global.

## 10. Critères de sortie de B2-B.1 et suite verrouillée

**PASS documentaire seulement si** : périmètre fermé et exclusions définies ; schémas de données/manifeste et exemples non ambigus ; codec initial/refus fermes ; fidélité UTF-16 spécifiée ; limites approuvées ; cas de test couvrants ; HTTP séparé avec historique préservé ; référence Git obsolète signalée sans contournement. Un exemple contenant des placeholders ne peut jamais être accepté comme archive valide.

**NON TESTÉ** : codec fonctionnel, validité ZIP réelle, CRC/SHA calculés, volumes et mémoire mesurés, compatibilité appareils, fermeture dynamique corrigée, restauration et utilisation de données réelles.

**Phases futures, chacune sur autorisation explicite :** B2-B.2 capture fictive + codec sans ZIP ; B2-B.3 manifeste et SHA-256 ; B2-B.4 intégration locale de la dépendance ZIP vérifiée ; B2-B.5 ZIP en mémoire et relecture ; B2-B.6 fichier réellement conservé puis relu ; B2-B.7 erreurs/volumes/appareils. B3 restauration, B4 chiffrement et P1 import restent fermés.

**Points à figer pendant revue avant B2-B.2 :** nommage définitif des wrappers `inventory`/`entries`, types exacts des structures de graphe et propriétés de tableaux, comportement normatif des champs de référence optionnels/non vérifiés, conventions d'encodage de `manifest.sha256`, règles de versions. Aucun détail sous-spécifié ne doit être rempli silencieusement par l'implémenteur.
