# EverLore VA V2 — Plan de lots Codex V0.1

**Statut :** proposition à valider, aucun code modifié.  
**Dépôt existant :** `tynumerik-orion/EverLore_VA`.  
**Objectif :** conserver l’interface de lecture validée, transformer le lecteur en PWA mono-fandom avec Bibliothèque, multi-versions, import simple, mobile exploitable et thèmes extensibles; préparer un socle réutilisable pour TyEverLore et d’autres PWA de fandom.

## Décisions fonctionnelles déjà retenues
- La page listant **les histoires** s’appelle **Bibliothèque**.
- **Sommaire** signifie **sommaire des chapitres** de l’histoire ouverte.
- Le retour en haut de Lecture doit conduire à Bibliothèque.
- La liste déroulante de toutes les histoires disparaît de la page Lecture.
- Identité visuelle desktop Vampire Academy de référence à conserver.
- Chaque fandom aura à terme **sa propre PWA** avec sa configuration, ses contenus, thèmes et décors; les briques de lecture sont communes.
- Histoires originales et versions françaises PDF reliées à la même œuvre quand l’équivalence a été vérifiée; traductions humaines et Google clairement distinguées.
- Ajouter et supprimer des histoires doit être sécurisé et aussi simple que possible.
- Ne pas importer massivement ni publier de nouveaux contenus sans contrôle humain.

## Ordre des lots
| Lot | Désignation | Réflexion conseillée |
|---|---|---|
| LOT-EVA-001 | Audit initial et protections | Très élevé |
| LOT-EVA-002 | Spécifications et socle réutilisable | Élevé |
| LOT-EVA-003 | Bibliothèque et navigation de lecture | Très élevé |
| LOT-EVA-004 | Responsive mobile, tablette et Chromebook | Très élevé |
| LOT-EVA-005 | Original, Français, PDF et traduction Google | Très élevé |
| LOT-EVA-006 | Importeur multi-source, ajout et suppression | Très élevé |
| LOT-EVA-007 | Migration contrôlée et import pilote | Très élevé |
| LOT-EVA-008 | Thèmes, performances et livraison V2 | Élevé |

## Jalons de validation
1. **Après 001 et 002 :** audit validé, architecture et parcours approuvés.
2. **Après 003 et 004 :** Bibliothèque et expérience mobile validées visuellement et fonctionnellement.
3. **Après 005 et 006 :** versions FR / Google et gestion du corpus sûres.
4. **Après 007 :** cinq histoires pilotes vérifiées avant tout import plus large.
5. **Après 008 :** socle documenté et V2 validée.

## Points à vérifier dans le vrai dépôt pendant l’audit
- À la date de préparation, racine observée : `README.md`, `app.js`, `bootstrap.js`, `index.html`, `sw.js`, `register-sw.js`, `manifest.webmanifest`, `assets/`, `icons/`, `stories/`.
- `stories/` contient `catalog.js`, `catalog.json`, `vampire-academy/`.
- L’archive d’importeur v0.5 a été préparée **en dehors du dépôt** : il ne faut pas présumer qu’elle y est installée.
- Vérifier précisément les sauvegardes, compatibilités, limitations PWA et taille d’`index.html` avant d’écrire.

## Hors scope immédiat
- PWA réellement multi-fandom (TyEverLore), crossovers complets, OCR des PDF images, synchronisation cloud inter-appareils, deuxième fandom en production.
- Ces fonctions doivent rester **possibles** dans les contrats de données, mais ne sont pas des livraisons obligatoires de V2.

## Mode de travail
Pour chaque lot : document `lots/LOT-EVA-XXX.md` placé dans GitHub, puis **prompt Codex préparé séparément au moment du lancement**. Après livraison : revue du compte rendu et validation explicite avant le lot suivant. Ne pas lancer de commandes Codex depuis ce document.
