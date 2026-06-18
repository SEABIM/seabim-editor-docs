# Formats de fichiers

L'utilisation de SEABIM Editor nécessite la manipulation de plusieurs types
de fichiers. L'utilisation des formats adaptés est nécessaire pour garantir
le bon fonctionnement du logiciel.

## Nuages de points { #point-clouds }

Les nuages de points contiennent un ensemble de coordonnées dans l'espace,
avec parfois des informations supplémentaires : couleurs, champs scalaires
ou normales.

!!! note "Chargement délégué à CloudCompare"
    Le nuage est **chargé par CloudCompare**, qui lit de nombreux formats
    (PCD, LAS, BIN, …). SEABIM Editor travaille ensuite sur le nuage
    déjà présent dans la scène. Le `.pcd` ci-dessous est la convention de
    **nommage / livraison** recommandée, non une contrainte technique du
    plugin.

### Nomenclature recommandée { #pcd-naming }

Pour les nuages de points issus d'un levé et donnés en entrée à SEABIM :

```text
PROJET_YYYYMMDD_ENTREPRISE_SOURCE_Vm3_SECTION_subsampleYcm_pX.pcd
```

| Champ          | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `PROJET`       | Nom du projet.                                                                     |
| `YYYYMMDD`     | Date du levé.                                                                      |
| `ENTREPRISE`   | Entreprise ayant effectué l'acquisition.                                           |
| `SOURCE`       | Type de nuage : `mbes`, `lidar` ou `photog`.                                       |
| `V`            | Volume des blocs dans la zone (en m³).                                             |
| `SECTION`      | Section de la digue (`MAIN_EXT`, `MAIN_INT`, …).                                   |
| `subsampleYcm` | Facultatif. Distance de sous-échantillonnage si le nuage a été sous-échantillonné. |
| `pX`           | Facultatif. Numéro de partie si le nuage a été divisé en plusieurs sous-sections.  |

## Fichier de structure JSON { #json-structure }

Les fichiers de structure, au format JSON, contiennent l'ensemble des
informations des blocs constituant une digue reconstruite à partir de
SEABIM Editor, sous la forme d'un dictionnaire.

Chaque bloc est associé à un numéro unique à partir duquel on peut extraire
les informations suivantes.

### Clés présentes pour tous les blocs

| Clé            | Description                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `block_type`   | Type de bloc.                                                                                                                                   |
| `block_volume` | Volume du bloc en m³.                                                                                                                           |
| `block_size`   | Taille du bloc en m.                                                                                                                            |
| `offset`       | Translation pour replacer le bloc en coordonnées globales. Les positions sont décrites dans un repère local pour éviter une perte de précision. |
| `translation`  | Position du bloc dans le repère local après soustraction de l'offset global.                                                                    |
| `rotation`     | Matrice de rotation du bloc par rapport au bloc de référence.                                                                                   |

### Clés facultatives

| Clé               | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `plot_number`     | Numéro de plot du bloc.                                                                                    |
| `bloc_number`     | Numéro de cible du bloc.                                                                                   |
| `source`          | Mode d'obtention du bloc.                                                                                  |
| `cloud`           | Nom du nuage utilisé pour obtenir la position du bloc.                                                     |
| `correspondences` | Nombre de points de correspondance entre le modèle et le nuage pour le bloc lors de la phase de détection. |
| `median_score`    | Distance médiane de l'ensemble des points situés à une distance donnée du bloc.                            |
| `count_score`     | Nombre de points situés à une distance donnée du bloc.                                                     |

Les valeurs associées aux différents filtres de contrôle ([module Filtres](../modules/filters.md), [module Contrôle qualité](../modules/quality.md))
sont également stockées dans le fichier de structure.

### Nomenclature recommandée { #json-naming }

Pour les fichiers de structure lors des opérations courantes :

```text
YYYY-MM-DD_hh.mm.ss_SOURCE_Vm3_SECTION_pX_AVANCEMENT.json
```

| Champ                 | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `YYYY-MM-DD_hh.mm.ss` | Date et heure de génération.                           |
| `SOURCE`              | Type de nuage : `mbes`, `lidar` ou `photog`.           |
| `V`                   | Volume des blocs (m³).                                 |
| `SECTION`             | Section de la digue (`MAIN_EXT`, `MAIN_INT`, …).       |
| `pX`                  | Facultatif. Numéro de partie si le nuage a été divisé. |
| `AVANCEMENT`          | Voir tableau ci-dessous.                               |

#### Valeurs d'avancement

| Valeur           | Signification                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `find`           | Après recalage automatique.                                                                                                                                             |
| `filtered`       | Après filtrage sur la base du score.                                                                                                                                    |
| `manual_n`       | Version `n` du recalage manuel.                                                                                                                                         |
| `manual_n_AB_CD` | Version contrôlée à l'aide des filtres et différentiel par `AB` et `CD` (initiales des personnes ayant effectué le contrôle). Ajouter des initiales au fur et à mesure. |

En cas de modification à effectuer après contrôle, créer un nouveau fichier
`manual_n+1` avec les corrections.

## Fichiers CSV { #csv-files }

Les fichiers CSV sont utilisés pour l'**import** et l'**export** de blocs
(actions [`Importer un CSV`](../modules/input.md#import-csv) et [`Exporter un CSV`](../modules/output.md#export-csv)). Ils contiennent typiquement une
ligne par bloc avec, en colonnes, les métadonnées à transférer
(coordonnées, numéro de plot, type, etc.).

Le module [Édition](../modules/edit.md) utilise également des CSV de plan
(action [`Trouver les noms`](../modules/edit.md#find-names)) pour assigner des
numéros de panneau / bloc à partir d'un plan de pose.

## Fichiers CloudCompare BIN

Les fichiers CloudCompare BIN sont les fichiers de sauvegarde propres à
CloudCompare. Ils servent à sauvegarder une scène CloudCompare pouvant
contenir un ou plusieurs nuages de points ou modèles 3D. Les modèles 3D
et les rendus issus de SEABIM Editor sont écrits dans ce format.

Ces fichiers peuvent être ouverts ou glissés directement dans une fenêtre
CloudCompare.
