# Raccourcis clavier

Cette page liste tous les raccourcis clavier disponibles dans SEABIM
Editor, par catégorie. Tous sont également affichés en survolant le
bouton correspondant dans le launcher.

## Header (actions transversales)

| Raccourci        | Action                                                                    | Détail                                        |
| ---------------- | ------------------------------------------------------------------------- | --------------------------------------------- |
| ++ctrl+z++       | [Annuler la dernière action](../modules/header.md#undo)                   | Annule la dernière modification.              |
| ++ctrl+y++       | [Rétablir](../modules/header.md#redo)                                     | Rétablit la dernière annulation.              |
| ++ctrl+shift+z++ | [Rétablir](../modules/header.md#redo) (alias)                             | Convention Mac / Linux pour Rétablir.         |
| ++ctrl+r++       | [Rafraîchir la vue](../modules/header.md#update-view)                     | Rafraîchit l'affichage de tous les blocs.     |
| ++ctrl+l++       | [Changer l'échelle de couleurs](../modules/header.md#change-color-scale)  | Ouvre la modale de coloration.                |
| ++ctrl+shift+l++ | [Afficher/masquer l'échelle](../modules/header.md#toggle-color-scale)     | Montre/masque la barre graduée dans la vue.   |
| ++ctrl+d++       | [Afficher par type](../modules/header.md#display-by-type)                 | Masque/affiche les blocs par type et volume.  |
| ++ctrl+t++       | [Transparence de la sélection](../modules/header.md#toggle-transparency)  | Rend les blocs sélectionnés translucides.     |
| ++ctrl+u++       | [Basculer mètres / pieds](../modules/header.md#switch-units)              | Change l'unité de longueur de travail.        |
| ++ctrl++,        | [Paramètres](../modules/header.md#settings)                               | Ouvre les préférences.                        |
| ++f1++           | [Affichage des raccourcis](../modules/header.md#affichage-des-raccourcis) | Ouvre la fenêtre listant tous les raccourcis. |

!!! note "Les raccourcis SEABIM priment sur ceux de CloudCompare"
    CloudCompare attribue de son côté ++ctrl+t++ à `Apply transformation` et
    ++ctrl+d++ à `Enable visual debug traces`. Deux raccourcis identiques
    actifs en même temps n'en déclenchent aucun des deux : à l'ouverture du
    launcher, SEABIM Editor retire donc ces raccourcis aux actions de
    CloudCompare, qui restent accessibles par leurs menus. Ils reviennent à
    CloudCompare au redémarrage de l'application.

## Module Édition

| Raccourci  | Action                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------- |
| ++ctrl+e++ | [Recaler la sélection - Distance adaptative](../modules/edit.md#register-selection---adaptive-dist) |
| ++ctrl+f++ | [Ajuster la position](../modules/edit.md#fit-position)                                               |

## Module Métadonnées

| Raccourci  | Action                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| ++ctrl+m++ | [Afficher les métadonnées (bloc)](../modules/metadata.md#show-metadata-block) |
