# LOT-EVA-001 — Audit initial et protections

**Projet :** EverLore VA, PWA pilote mono-fandom Vampire Academy  
**État :** Préparé, non démarré  
**Niveau Codex conseillé :** Très élevé (à réévaluer à l’ouverture du lot)  
**But :** Audit en lecture seule du dépôt actuel, de la PWA, du rendu et de l’importeur préparé hors dépôt.

## Périmètre
1. Inventorier les fichiers, flux de chargement, catalogues, IDs de chapitres, gestion des URLs, service worker/cache, préférences et stockage.
2. Vérifier les mécanismes existants de traduction Google, favoris, passages, progression, paramètres, thème, chapitres fermés, précédent/suivant/sommaire.
3. Auditer les contraintes de GitHub Pages et le poids anormalement élevé de index.html, les effets offline et les limites d’export public.
4. Auditer les scripts v0.1 à v0.5 et les rapports précédents sans les intégrer aveuglément : parseurs FicHub/AO3, validité du HTML multi-chapitre, doublons, gestion des erreurs, sauvegardes.
5. Constituer un état de référence sur desktop, Chromebook, tablette, mobile et sur les jeux d’essai; relever les écarts et prioriser.

## Livrables attendus
- Rapport d’audit factuel avec preuves, chemins, risques, dette technique.
- Inventaire des comportements à préserver et tests de non-régression proposés.
- Proposition de découpage moteur commun / configuration fandom / contenu, sans refactorisation effectuée.

## Critères de validation
- Aucune écriture dans les fichiers de l’application.
- Les incertitudes et hypothèses sont explicitement séparées des faits observés.

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
Aucun lot précédent; audit avant changement.

## Hors périmètre
Pas de développement anticipé d’un lot ultérieur; toute extension devra être signalée et validée.
