# EverLore VA V2 — Références visuelles pour Codex

## Priorité des références

1. Le **lecteur desktop/Chromebook existant** est déjà validé : préserver sa fiche de lecture, son habillage, ses ornements et ses réglages. Les fichiers `01_Fonds_references` sont les références graphiques d'origine, pas des maquettes à redessiner.
2. La **Bibliothèque desktop/Chromebook** a une disposition approuvée : recherche, filtres, tri, modes **Grille ET Liste**, cartes **100 % textuelles SANS IMAGES**, boutons Fiche et Lire. `03_Maquettes_bibliotheque/maquette_bibliotheque_desktop_grille_liste_et_fiche.png` sert uniquement à comprendre l'agencement. **NE PAS** intégrer les couvertures, photographies, miniatures, textes inventés, chiffres fictifs ou fonctions non validées que d'autres maquettes pourraient présenter.
3. La **fiche de lecture desktop/Chromebook déjà présente** reste la référence : ne pas la remplacer par la fiche illustrative des planches générées.
4. Le **fond mobile vertical** (`02_Fond_mobile_propose`) est une proposition artistique tirée de l'ambiance du fond desktop ; il n'est PAS validé comme asset définitif. Il faut vérifier le cadrage et le contraste sur Redmi Note 13 et écrans Samsung aux tailles variées.
5. La **fiche mobile** est proposée avec quatre onglets : Résumé, Infos, Versions, Favoris. Présentation mobile à affiner et tester.
6. La **lecture mobile doit occuper presque toute la largeur disponible** : texte à taille confortable, petites marges, bloc sur toute la hauteur de lecture, sans panneaux superflus.
7. En **mode plein écran immersif mobile**, les onglets, les grandes décorations et la navigation permanente disparaissent. Le texte occupe l'espace, tandis que les commandes (horloge discrète, Aa, quitter le plein écran, Précédent/Contenu/Suivant) sont accessibles à la demande par toucher. Les réglages persistent. Le toucher d'affichage des commandes ne doit pas gêner la sélection de texte.
8. **Contenu** (sommaire des chapitres) est fermé par défaut. Les chapitres eux-mêmes ne sont pas repliés. **Bibliothèque** nomme la liste des histoires.
9. Sur tous les formats, sélection de texte à teinte **améthyste douce** au lieu du bleu navigateur, avec contraste accessible en sombre, clair, sépia.
10. Les données d'histoires affichées sur les maquettes sont **fictives**, y compris certains auteurs, résumés, statuts, traductions, progressions et statistiques : les lire comme placeholders uniquement, ne jamais les recopier dans la PWA.
11. Les images de cette archive ne donnent aucune autorisation de changer des fichiers applicatifs durant LOT-EVA-002. Toute intégration doit suivre le lot autorisé et la validation humaine.

## Dossiers

- `01_Fonds_references/` : fonds existants fournis par l'utilisatrice.
- `02_Fond_mobile_propose/` : fond mobile vertical généré, **à valider et adapter**.
- `03_Maquettes_bibliotheque/` : agencement Bibliothèque desktop Grille/Liste et proposition mobile initiale ; certaines planches contiennent des couvertures, **à ignorer**.
- `04_Maquettes_mobile/` : propositions successives, la dernière privilégie la largeur de lecture ; **ne pas prendre les éléments secondaires au pied de la lettre**.

## Résolution

Les images sont fournies telles quelles, sans mise à l'échelle ni retouche. Elles ne sont pas encore des assets mobiles optimisés pour la production. Ne pas les importer telles quelles dans le code sans contrôle de taille, poids, responsivité et décision explicite.
