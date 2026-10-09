# EverLore VA | P0-S.B2-B.1 | Contrat d'archive et diagnostic HTTP

**Version : 0.3, candidate à la revue ciblée, non homologuée.** Les V0.1 et V0.2 sont conservées comme historiques ; cette V0.3 remplace leurs conventions pour toute future implémentation B2. **Périmètre : spécification documentaire pour données entièrement fictives.** Aucun accès aux données réelles, aucune installation, modification de la PWA, production de ZIP ou restauration n'est autorisé par ce contrat.

**État :** B1 accepté uniquement pour l'isolation fonctionnelle rapportée, avec cinq erreurs historiques `ERR_HTTP_REQUEST_TIMEOUT` et `serverShutdown: FAIL` inchangés. C1 reste `BLOCKED`. `@zip.js/zip.js` demeure le premier *candidat* de prototype, `fflate` l'alternative, sans homologation ni installation.

## 1. Décisions héritées et périmètre figé

Références : spécifications P0-S, B1, six documents EverLore Core, contrats V0.1 et V0.2, audits Codex B2-A/B2-B.1, `app.js`, `bootstrap.js`, `stories/catalog.json` et laboratoire B1. Les sept observations de l'audit V0.2 ont été intégrées ici ; cette révision documentaire ne prouve aucun comportement fonctionnel.

Décisions conservées : restauration future « vérification seule » ou « exacte », fusion désactivée ; sauvegarde personnelle indépendante du lecteur et du corpus ; deux origines fictives `http://127.0.0.1:43171` (A) et `http://127.0.0.1:43172` (B) ; chiffrement reporté à B4 avant données réelles ; conservation des captures de retour arrière jusqu'à décision explicite ; profils de navigateur dédiés sans compte/synchronisation pour essais autorisés.

**La liste requise est figée avant capture.** Une lecture impossible, un élément inconnu pertinent, une valeur non encodable ou un plafond dépassé rend la capture `incomplete`. Interdiction de rétrécir le périmètre a posteriori pour annoncer un résultat complet. Ne jamais réécrire les valeurs source, interpréter le JSON métier ni déduire `editionId` ou progression inexistants.

### 1.1 `localStorage` (noms logiques en archive)

Dans le laboratoire uniquement, nom physique = `everloreP0SFixture:` + nom logique. Exactement douze entrées obligatoires :

| Nom logique | Présence attendue dans la fixture historique |
|---|---|
| `everloreTextSize` | présente |
| `everloreReadingFont` | présente |
| `everloreReadingTheme` | présente |
| `everloreReadingBackground` | présente |
| `everloreReadingWeight` | présente, valeur vide |
| `everloreReadingTextTone` | absente |
| `everloreLastStoryIndex` | présente |
| `everloreLanguageMode` | présente |
| `everloreFavoriteChapters` | présente |
| `everloreFavoritePassages` | présente |
| `everlorePreferredTranslations` | présente, JSON invalide |
| `unknownLegacyKey` | présente |

`everloreP0SFixture:isolationProbe` est **inventorié comme exclu** (`B1_TECHNICAL_MARKER`), qu'il soit physiquement présent ou absent. Clé étrangère imprévue : relever uniquement son nom et arrêter avant lecture de sa valeur, sans la classer arbitrairement. Les états réels sont mesurés, jamais recopiés aveuglément depuis la fixture attendue.

### 1.2 IndexedDB

- Inclure exclusivement la base physique fictive `everloreP0SFixtureTranslationCache`, version 1, magasin `translations`, `keyPath: "key"`, `autoIncrement: false`, aucun index ; enregistrer le schéma observé et capturer séparément chaque clé primaire et valeur brute. Huit enregistrements préparés sont attendus pour le jeu complet, orphelins et champs atypiques compris.
- Inventorier mais exclure `everloreP0SFixtureRestoreControl` (`B1_TECHNICAL_CONTROL`), même si elle est absente. Base ou magasin inconnu : arrêter avant lecture de valeurs hors périmètre ; version, index ou schéma incompatibles : refus de complétude.
- Ne pas ouvrir une base absente de manière à la créer ; si son absence ne peut pas être établie, utiliser `unverifiable` et refuser « complete ». Les interfaces métier du lecteur, `readJson()`, filtres de traduction, générateur JSON `fixture-contract.js` et UI C2 minimale ne sont pas des exporteurs génériques.

### 1.3 Référence distincte

Dix histoires et **563 ancres uniques** avec ordre, slugs et identifiants historiques, sans renumérotation. Le paquet personnel peut décrire la référence requise mais **ne contient pas** à lui seul les textes et le lecteur. La preuve de correspondance à une référence extérieure n'est pas inférée de l'intégrité de l'archive personnelle.

## 2. Versions, fichiers et grammaire ZIP

Pour ce premier contrat expérimental, seuls sont reconnus : `format = "everlore-personal-backup"`, `formatVersion = "1.0.0-prototype"`, `localStorageCodec = "utf16le-base64-v1"`, `valueCodec = "idb-graph-subset-v1"`, `keyCodec = "idb-key-string-v1"`. Toute autre valeur, même version « mineure compatible », est refusée. Pas de champs inconnus dans les objets normatifs, sauf les propriétés métier encodées dans le graphe.

**Exactement sept entrées ZIP, sans segmentation dans ce premier prototype** :

```text
manifest.json
manifest.sha256
inventory.json
localstorage/entries.json
indexeddb/db-0001/schema.json
indexeddb/db-0001/store-0001/records-000001.json
reference/requirement.json
```

Chemins ASCII littéraux, relatifs, sensibles à la casse, sans autre entrée, doublon, répertoire implicite autonome, lien, `..`, `.` ou antislash. Pas de nom dérivé des données. Chaque entrée est un fichier ordinaire ; taille individuelle décompressée ≤ 256 Kio et somme décompressée ≤ 4 Mio. Les objets JSON sont encodés UTF-8 **sans BOM** ; leurs clés structurelles sont écrites selon le contrat. L'ordre textuel des propriétés JSON n'a pas de valeur sémantique, mais les *octets effectivement produits* sont utilisés pour les empreintes.

`manifest.sha256` : exactement 64 caractères hexadécimaux ASCII minuscules représentant SHA-256 des octets de `manifest.json`, suivis d'un unique caractère LF (`0A`) ; aucun espace ou nom de fichier. Le `manifest.json` ne liste dans `files` **que les cinq entrées** autres que `manifest.json` et `manifest.sha256`. L'archive ZIP elle-même ne contient pas sa propre empreinte. Le contrôle de l'intégrité interne ne fournit pas d'authenticité cryptographique.

## 3. Formats normatifs, inventaire et manifeste

### 3.1 Règles communes

Toutes les structures normatives sont des **objets JSON** aux champs exactement définis ci-après ; types entiers = nombres JSON sûrs, non négatifs et sans fraction. Un champ obligatoire ne peut pas être remplacé par `null`, sauf indication explicite. Aucune propriété structurelle inconnue n'est tolérée. Les tableaux sont ordonnés quand précisé ; les identifiants et chemins qui doivent être uniques sont comparés littéralement. Le décodeur refuse doublons de clés d'un même objet JSON, profondeur excessive, caractères non valides en UTF-8, versions inconnues et références non résolues.

État d'inventaire `present | absent | excluded | unverifiable`. Pour une exclusion, `physicalPresence` vaut `present | absent | unknown` ; les autres états imposent `physicalPresence: null`. Un élément `excluded` conserve son motif et **aucune valeur**. `unverifiable` est une erreur pour tout élément requis. L'absence d'un élément exclu n'est ni une présence inventée ni une anomalie.

### 3.2 `inventory.json`

Objet racine **exact** :

- `schemaVersion`: chaîne `"inventory-v1"` ;
- `localStorage`: tableau de **13 objets** (12 obligatoires, un marqueur technique), trié dans l'ordre de §1.1 suivi du marqueur ; chaque objet `{logicalName:string, physicalName:string, required:boolean, state:string, physicalPresence:string|null, reason:string|null}`. Les douze entrées ont `required:true`, `state:present|absent|unverifiable`, `reason:null` ; le marqueur a `required:false`, `state:"excluded"`, `reason:"B1_TECHNICAL_MARKER"` ; aucun autre nom accepté ;
- `indexedDb`: tableau de **deux objets** ordonnés, `{physicalName:string, required:boolean, state:string, physicalPresence:string|null, reason:string|null}`. La base de traductions a `required:true`, état `present|absent|unverifiable` (une base requise absente rend la capture incomplète) ; la base de contrôle est `required:false`, `state:"excluded"`, `reason:"B1_TECHNICAL_CONTROL"` ;
- `unexpectedNames`: tableau de chaînes ne contenant que les *noms* découverts hors liste autorisée, jamais les valeurs ; tableau non vide => capture incomplète. Si une découverte n'est pas autorisée ou possible, arrêter et déclarer non vérifiable, sans inspection arbitraire.

`present` pour les données requises signifie lecture réussie et concordance avec le fichier de données correspondant. `absent` signifie absence effectivement constatée. Des diagnostics pouvant révéler des noms privés ne doivent pas être exportés en production sans politique distincte.

### 3.3 `localstorage/entries.json`

Objet racine exact `{schemaVersion:"ls-entries-v1", entries:[...]}`. `entries` comprend exactement **12 objets**, dans l'ordre de §1.1. Chaque entrée a `{name:{codec:"utf16le-base64-v1", units:uint, base64:string}, state:"present"|"absent", value: object|null}` ; `name` représente le nom *logique*. Une valeur présente a exactement les mêmes trois champs de codec ; une entrée absente a `value:null`. Jamais de champ `value` contenant une chaîne vide pour représenter une absence. Correspondance obligatoire avec `inventory.json` et avec les noms physiques autorisés. Les unités et octets décodés doivent coïncider.

Codec `utf16le-base64-v1` : coder **chaque unité de code JavaScript de 16 bits** en deux octets faible puis fort (little-endian), sans BOM de transport ; un U+FEFF réellement présent reste conservé. Base64 RFC 4648 standard avec padding canonique, sans espaces ni retour ligne ; octets décodés exactement `2 * units`. Refuser Base64 mal formé ou non canonique ; comparer les unités de code à la source, sans normalisation Unicode, parsing métier, trim ou conversion CR/LF. Prendre en charge substituts isolés, U+0000 et chaîne vide (`units:0`, `base64:""`).

### 3.4 `indexeddb/db-0001/schema.json`

Objet racine exact :

```json
{
  "schemaVersion": "idb-schema-v1",
  "logicalName": "everloreTranslationCache",
  "physicalName": "everloreP0SFixtureTranslationCache",
  "version": 1,
  "stores": [
    {"name": "translations", "keyPath": "key", "autoIncrement": false, "indexes": []}
  ]
}
```

C'est l'unique schéma accepté dans le premier prototype. Une version, un magasin, un index, un chemin de clé ou une politique auto-incrémentée différents doivent entraîner un refus, pas une conversion. Le schéma capturé doit être **observé**, pas généré par hypothèse. La base technique exclue ne figure pas dans `schema.json`.

### 3.5 `indexeddb/db-0001/store-0001/records-000001.json`

Objet racine exact `{schemaVersion:"idb-records-v1", store:"translations", records:[...]}`. `records` est un tableau ordonné par les règles de comparaison des clés IndexedDB, entre 0 et 64 éléments. Chaque élément a exactement `{primaryKey:{codec:"idb-key-string-v1", value:<encoded-string>}, value:<idb-graph-v1>}`. `<encoded-string>` suit les trois champs normatifs `codec/units/base64` de §3.3 **sans son propre champ `codec` interne** : `{units:uint, base64:string}`. Le graphe est défini §4. Pas de clés primaires dupliquées. La `primaryKey` est observée indépendamment du champ métier `key` ; jamais déduite de celui-ci. Les huit enregistrements de fixture doivent rester huit après capture ; l'échec d'accès à l'un d'eux invalide la complétude.

### 3.6 `reference/requirement.json`

Objet racine exact :

```json
{
  "schemaVersion": "reference-requirement-v1",
  "referenceId": "everlore-va-corpus-legacy-10x563",
  "catalogVersion": "legacy-v1",
  "stories": [
    {"index": 0, "slug": "never-tear-us-apart", "chapterIds": ["s1-c1"]}
  ],
  "catalogSha256": null,
  "packageSha256": null,
  "verificationStatus": "not_verified"
}
```

**Cet exemple est partiel et NON conforme** (seule une ancre est montrée). Une entrée conforme a **exactement dix objets `stories` dans l'ordre historique, les 563 ancres exhaustives et uniques**, sans raccourci de plage ; `index` entier de 0 à 9, `slug` chaîne exacte du catalogue, `chapterIds` tableau de chaînes. Le champ `catalogSha256` et `packageSha256` vaut soit `null` (empreinte indisponible), soit une chaîne de 64 caractères hexadécimaux minuscules sur les octets de la ressource effectivement identifiée. `verificationStatus` prend **uniquement** `"not_verified"` ou `"verified"`. Le statut `verified` exige deux empreintes non nulles vérifiées sur des ressources authentifiées par leur origine approuvée ; faute de ces preuves, `not_verified` même si des valeurs de hash sont présentes. Ce statut qualifie la *référence extérieure*, pas la fidélité de la sauvegarde personnelle.

Les longueurs attendues, dans l'ordre : 75, 70, 106, 105, 27, 14, 26, 45, 42, 53. Le décodeur compare chaque slug, index et ancre aux références historiques approuvées ; aucune édition n'est inférée.

### 3.7 `manifest.json`

Objet racine exactement composé de :

- `format`: `"everlore-personal-backup"` ; `formatVersion`: `"1.0.0-prototype"` ; `kind`: `"personal"` ; `fixtureOnly`: `true` ;
- `producer`: `{name:"everlore-p0s-export-fixture", version:string, zipLibrary:string}` ; `zipLibrary` est une chaîne descriptive, jamais une preuve d'homologation ;
- `source`: `{origin:string, application:"EverLore-VA-fixture", commit:string|null}` ; `origin` vaut A ou B, `commit` est le hash Git source observé (40 hex minuscules) ou `null` si non vérifiable ;
- `capture`: `{startedAt:string, finishedAt:string, atomicGlobal:false, concurrentMutationDetected:boolean, status:"complete"|"incomplete"}` ; horodatages UTC ISO 8601, `finishedAt >= startedAt`, et `complete` ne signifie **que capture réussie dans le périmètre fixé** ;
- `codecs`: `{localStorage:"utf16le-base64-v1", indexedDbValues:"idb-graph-subset-v1", indexedDbKeys:"idb-key-string-v1"}` ;
- `inventoryPath`: `"inventory.json"` ;
- `files`: tableau de **5 objets** `{path:string, role:string, bytes:uint, sha256:string}`, un pour chacune des cinq entrées utiles, en ordre exact : `inventory.json` (`inventory`), `localstorage/entries.json` (`localstorage`), `indexeddb/db-0001/schema.json` (`idb-schema`), `indexeddb/db-0001/store-0001/records-000001.json` (`idb-records`), `reference/requirement.json` (`reference-requirement`) ; chaque hash = 64 caractères hex minuscules des **octets décompressés** ;
- `counts`: `{requiredLocalStorage:12, presentLocalStorage:uint, absentLocalStorage:uint, includedDatabases:1, includedStores:1, includedRecords:uint}` ; `present + absent = 12` seulement si aucune requise n'est `unverifiable`, sinon statut `incomplete` ;
- `referenceRequirement`: `{path:"reference/requirement.json", status:"not_verified"|"verified"}` strictement égal au statut du fichier de référence ;
- `limitsProfile`: `"p0s-b2-fixture-v1"` ;
- `limitations`: tableau de chaînes parmi `"NON_ATOMIC_CROSS_STORAGE"`, `"REFERENCE_NOT_VERIFIED"`, `"UNVERIFIABLE_REQUIRED_DATA"`, `"CONCURRENT_MUTATION"`, `"UNSUPPORTED_TYPE"`, `"LIMIT_EXCEEDED"`, sans doublon ; `"NON_ATOMIC_CROSS_STORAGE"` obligatoire, `"REFERENCE_NOT_VERIFIED"` obligatoire si applicable.

Le **manifeste décrit la capture**, pas le verdict du ZIP. Le résultat `archiveVerification = PASS|FAIL|NON_TESTE` et la preuve de remise sur disque sont **externes à l'archive**, consignés séparément après fermeture puis relecture. Ne jamais éditer `manifest.json` après l'avoir empreinté : si correction nécessaire, reconstruire et revérifier toute l'archive. Un ZIP candidat `capture.status:"incomplete"` est exclusivement diagnostic et **jamais remis comme sauvegarde complète**. Le prototype peut simplement ne pas produire de ZIP en cas d'échec.

## 4. Codec IndexedDB `idb-graph-subset-v1`

### 4.1 Portée

Fidélité = **valeur observable après lecture IndexedDB** (clonage structuré), non les accesseurs/prototypes de l'objet d'origine avant stockage. Types acceptés : `null`, booléens, chaînes UTF-16 exactes, nombres dont `-0`, `NaN`, `+Infinity`, `-Infinity`, `undefined`, objets ordinaires, tableaux, trous, cycles, alias/références partagées. Clé primaire **chaîne uniquement**. Un type obligatoire hors sous-ensemble (notamment `BigInt`, `Date`, `Map`, `Set`, `ArrayBuffer`, vues typées, `Blob`, `File`, handles) est **refusé explicitement** jusqu'à une extension testée, jamais converti silencieusement. Un enregistrement illisible ou incompatible invalide l'export complet.

### 4.2 Encodage exact

Racine du graphe : objet `{schemaVersion:"idb-graph-v1", root:<atom>, nodes:[<node>...]}`. Chaque `<atom>` est l'une des formes exactes suivantes :

- `{t:"null"}` ; `{t:"undefined"}` ; `{t:"bool",v:boolean}` ;
- `{t:"str",v:{units:uint,base64:string}}`, encodage §3.3 ;
- `{t:"num",v:string}`, avec `v` égal à `"-0"`, `"NaN"`, `"+Infinity"`, `"-Infinity"` ou à la **représentation décimale canonique de `Number.toString()`** pour tout autre nombre fini ; refuser les graphies non canoniques ;
- `{t:"ref",id:uint}` avec `id >= 1`, pointant vers une définition `nodes[].id`.

`nodes` contient une définition par objet/tableau accessible, chacune de forme :

- Objet : `{id:uint,kind:"object",properties:[{name:<utf16>,value:<atom>},...]}` ;
- Tableau : `{id:uint,kind:"array",length:uint,items:[{index:uint,value:<atom>},...],properties:[{name:<utf16>,value:<atom>},...]}`.

Dans ces structures, `<utf16>` vaut exactement `{units:uint,base64:string}` de §3.3. Les **définitions** `nodes[].id` doivent être uniques, consécutives de 1 à N, et ordonnées par leur ID. Les **occurrences** `{t:"ref",id:…}` peuvent être répétées librement et référencer la même définition, y compris leur propre nœud ou un ancêtre : c'est le mécanisme normatif des cycles et alias. Chaque définition doit être atteignable depuis `root` ; une référence vers un ID absent est invalide. L'encodeur attribue un ID au premier passage et réutilise cet ID lors des revisites ; le décodeur crée d'abord tous les conteneurs puis affecte leurs valeurs.

Pour les objets, `properties` énumère les **propriétés propres énumérables sous forme de chaînes** observées après lecture ; pas de noms dupliqués après décodage, y compris `__proto__`, `constructor`, `prototype`. Ces noms sont des données, jamais utilisés pour modifier le prototype du conteneur ; décoder par définition de propriété propre sur un objet sûr, sans affectation naïve `obj[name] = ...` lorsque cela peut déclencher un setter. Si la représentation de l'objet observé ne peut être reconstruite sans perte dans cette portée : REFUS. L'ordre des propriétés sérialisées est celui de l'énumération observable JavaScript ; ne pas le trier arbitrairement.

Pour les tableaux : `length` est un entier ≤ 1024. `items` contient **uniquement les indices propres présents** de 0 à `length-1`, strictement croissants, sans doublon ; chaque trou est l'absence d'un indice dans `items` et reste un trou, distinct d'un `undefined` explicitement présent. `properties` contient les propres propriétés énumérables **qui ne sont pas des indices de tableau**, sans `length` ni doublon ; les noms représentant un index canonique de tableau (entier décimal de `0` à `2^32-2` sans zéros superflus) sont interdits dans `properties`, y compris s'ils dépassent `length`. La longueur, les trous et propriétés extra-indices doivent être rétablis sans exécuter de code stocké. Les attributs et propriétés non énumérables hors comportement normal du clonage structuré ne sont pas promis par ce premier codec.

Un graph ayant une `root` primitive doit avoir `nodes:[]`. Les références ne peuvent sortir de l'ensemble de définitions du même enregistrement. Le codage est jugé fidèle par comparaison structurelle *avec identité des alias*, nombre et présence des indices, clés et nombres spéciaux, et non par seul `JSON.stringify()`.

### 4.3 Sécurité et conditions de refus

Le décodeur valide intégralement types, champs exacts, longueurs, identifiants, absence de doublons et budget avant création d'objets ; aucun HTML du champ métier n'est exécuté, aucun `eval` ni désérialisation de prototypes. Refuser des graphes avec un type non pris en charge, un ID inconnu, une racine inaccessible, un nœud non atteignable, une propriété répétée, un tableau mal formé, un index hors bornes, un graphe au-delà des limites ou une chaîne UTF-16 invalide selon le format (pas selon le contenu). Les propriétés dangereuses en tant que *noms* doivent être conservables comme données si le décodeur sûr le permet, sinon refus explicite sans dégradation.

## 5. Enveloppe expérimentale et comptage

**Plafonds approuvés uniquement pour la proposition expérimentale B2, non pour production**, à confirmer par tests ; `Kio = 1024 octets`, `Mio = 1048576 octets`. Limites **cumulatives**, dépassement => REFUS, sans troncature ni augmentation implicite.

| Dimension | Plafond |
|---|---:|
| Noms physiques localStorage autorisés | 13 (12 requis + marqueur) |
| Nom de clé / valeur localStorage | 256 / 16 384 unités UTF-16 |
| Bases inventoriées / magasins inclus | 2 / 1 |
| Enregistrements inclus | 64 |
| Fichier enregistrement encodé, clé comprise | 64 Kio |
| Ensemble des cinq fichiers de données encodés avant ZIP | 1 Mio |
| Entrée ZIP décompressée / total ZIP décompressé | 256 Kio / 4 Mio |
| ZIP compressé / nombre d'entrées ZIP | 4 Mio / 7 exactement |
| Chemin ZIP | 128 caractères ASCII |
| Profondeur d'un graphe | 16 |
| Nœuds objet/tableau | 256 par enregistrement ; 4096 au total |
| Propriétés + références atomiques | 1024 par enregistrement ; 8192 au total |
| Longueur d'un tableau | 1024 |
| Index par magasin | 0 pour le prototype |
| Ouverture base / capture / encodage | 4 s / 5 s / 10 s |
| Création ZIP / vérification ZIP | 15 s chacune |
| Durée automatique totale (hors gestes manuels) | 45 s |
| Buffers explicitement suivis / cible hausse tas JS | 64 Mio / 128 Mio |

**Mesures normatives :**

- « Ensemble des cinq fichiers » = somme de leurs octets UTF-8 ou binaires effectivement produits, **avant compression**, en excluant `manifest.json` et `manifest.sha256` ; taille de l'archive décompressée = somme des **sept entrées**, incluant manifeste et sidecar.
- Taille d'un enregistrement encodé = octets UTF-8 de sa représentation JSON canonique choisie pour la mesure, comprenant `primaryKey` et `value`, sans compression. Les limites de fichiers s'appliquent aux fichiers finaux réellement sérialisés.
- Nœuds = nombre de définitions `nodes[]` ; propriétés = chaque membre de `properties[]` d'objet/tableau plus chaque membre de `items[]` ; références = chaque atome `{t:"ref"}` apparaissant dans `root`, `properties[].value` ou `items[].value`. Les deux décomptes propriétés + références sont **additionnés** pour l'enveloppe. Chaque nœud est défini/compté une fois même s'il est référencé plusieurs fois.
- Profondeur = plus longue chaîne d'arêtes de références entre définitions **sans revisiter un ID sur le chemin courant** ; `root` à profondeur 0 ; un cycle arrête la descente de ce chemin, pas l'analyse globale. Chaque nœud doit être atteignable depuis la racine.
- Chaque plafond se teste aux trois frontières : juste dessous, exactement au plafond, juste au-dessus. Le dépassement de temps ne garantit pas une interruption synchrone immédiate ; déclarer NON TESTÉ si l'instrumentation mémoire n'est pas disponible. Le budget n'est pas une borne sur tous les processus Chrome.

## 6. Vérification et qualification

Chaîne future : **inventaire figé → lecture brute sans transformation → transaction IndexedDB `readonly` et clés primaires indépendantes → encodage réversible → manifeste/cinq empreintes → ZIP candidat → relecture complète et contrôle de structure / SHA-256 / CRC si applicable → décodage et comparaison à la capture → preuve séparée de remise sur disque.** Aucune transaction atomique commune entre IndexedDB et `localStorage` ; tout changement concurrent détecté invalide la capture. Un aller-retour rapide modification/retour pourrait échapper à un contrôle de stabilité ; cette limite reste explicitement documentée.

Le vérificateur refuse : archive tronquée, entrée supplémentaire, manque, nom hostile, ZIP bomb, `manifest.sha256` erroné, CRC invalide si contrôlé, empreinte divergente, version inconnue, codec invalide, comptages contradictoires, champ manquant/inconnu, valeur requise non lue, échec de décodage, budget dépassé. La comparaison logique n'ignore **que** les métadonnées d'exécution (dates d'export, organisation ZIP), jamais les champs métier `savedAt`. Aucun contenu HTML sauvegardé ne doit être interprété comme script lors de l'inspection. Une archive avec capture incomplète peut être conservée en diagnostic isolé, jamais annoncée comme sauvegarde complète.

**Vecteurs obligatoires avant tout PASS fonctionnel :** les douze clés et leurs états, chaîne vide/`null`/JSON invalide, NUL et substituts isolés, CR/LF/CRLF, clé étrangère refusée ; huit enregistrements historiques avec champs inconnus et orphelins ; valeurs numériques spéciales, `undefined`, cycles, deux références vers un même objet, tableau à trou et propriété extra-index, propriété `__proto__`, ID en double et ID manquant, indice hors limites, type exclu ; dix histoires et 563 ancres ; limites au seuil -1 / seuil / seuil +1 ; octet modifié, ZIP tronqué et fichier manquant. Les vecteurs avancés sont fabriqués sans clone JSON ; résultats attendus calculés indépendamment du codec testé. **Tous ces tests sont NON EXÉCUTÉS en B2-B.1.**

## 7. Réserve HTTP et baseline, travaux distincts

B1 : cinq `ERR_HTTP_REQUEST_TIMEOUT`, `serverShutdown: FAIL` historiques inchangés. Le script `c2-serve.mjs` mélange actuellement les erreurs de session avec celles de fermeture. Correctif ultérieur **indépendant et soumis à autorisation** : tableaux séparés `httpSessionErrors` / `shutdownErrors`, résultats `httpSessionStatus`, `serverShutdown`, `overallStatus` ; erreur HTTP pendant `closing` reste HTTP ; tout échec inattendu => résultat global FAIL. Chaque événement : heure UTC, temps monotone, phase, port, identifiant de socket, opération, code, sans charge utile ni données privées. Conserver les délais jusqu'à enquête justifiant un changement, les preuves et le FAIL ancien ; ne pas qualifier une fermeture de secours comme réussite sans réserve.

La baseline locale historique pointe sur `1b770563…` alors que le dépôt a évolué par ajouts documentaires. Ne pas écraser l'ancienne preuve, ne pas modifier les gardes ou `execution-policy.json` pour lancer C1 ; une nouvelle baseline datée requiert autorisation indépendante avant prochain test dynamique. L'acceptation fonctionnelle B1 ne démontre pas le confinement réseau global ni tous les descendants de processus.

## 8. Critères de sortie et verrou

B2-B.1 est **VALIDABLE DOCUMENTAIREMENT** seulement si les sept ambiguïtés relevées dans la V0.2 sont effectivement levées et si aucun choix implicite n'est nécessaire pour développer le sous-ensemble fictif B2-B.2. Les éléments futurs sont volontairement fermés : tests de capture, ZIP réel, chiffrement, restauration, accès aux données de production, publication ou import d'histoires.

**Ordre des suites, autorisations séparées :** B2-B.2 capture fictive + codec, sans ZIP ; B2-B.3 manifeste et SHA-256 ; B2-B.4 choix, licence, intégration locale de la bibliothèque ZIP ; B2-B.5 ZIP en mémoire et relecture ; B2-B.6 fichier sauvegardé et vérifié ; B2-B.7 anomalies/performances/appareils. B3 restauration, B4 chiffrement et P1 import restent bloqués. Ne pas relancer d'essai dynamique sans correctif HTTP, baseline approuvée et protocole spécifiquement autorisé.
