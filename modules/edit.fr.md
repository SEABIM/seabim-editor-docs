# Édition

Le module **Édition** regroupe les actions d'édition de la structure :
recalage des blocs sur le nuage de référence, filtrage par seuils,
suppression sécurisée, regroupement par panneau ou lot, et assignation de
numéros de plot via un plan de pose.

C'est l'onglet où se passe le travail de **correction et d'affinage** une
fois qu'une structure a été chargée (depuis JSON) ou détectée
automatiquement (via [`Détecter les blocs dans un nuage`](input.md#find-blocks-in-a-point-cloud)).

## Recaler la sélection { #register-selection---adaptive-dist }

**Raccourci : ++ctrl+e++**

Réaligne (registration) les blocs sélectionnés sur le nuage de points de
référence. Chaque bloc est ajusté indépendamment pour minimiser sa distance au
nuage. À utiliser après détection automatique ou après un déplacement manuel
d'un bloc, pour affiner sa position.

Tout passe par **un seul bouton** : par défaut il recale en **distance
adaptative**, et sa **petite icône curseurs** donne accès à trois modes
personnalisés. Une **badge `Rapport de recalage`** complète l'action.

![Recaler la sélection](../assets/images/cc_edit_register.png)

### Badge « Rapport de recalage »

À droite du bouton :

- **Activée** : un rapport détaillant les déplacements (translations,
  rotations, scores) s'ouvre automatiquement à la fin de chaque recalage.
- **Désactivée** : pas de pop-up ; cliquer la badge la réactive et réaffiche le
  dernier rapport produit dans la session.

### Modes de recalage

La **petite icône curseurs** accolée au bouton ne recale pas elle-même : elle
**configure le mode** que `Recaler la sélection` (++ctrl+e++) appliquera
ensuite.

| Mode                       | Effet                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Distance adaptative**    | Mode par défaut. Distances au nuage **adaptatives**, définies dans les paramètres du projet.                                                 |
| **Distance personnalisée** | Recale avec une **distance au nuage fixe** au lieu des distances adaptatives. Override **persistant** pour la session.                       |
| **Nouveau volume de bloc** | **Assigne un nouveau volume** à la sélection (taille différente de celle détectée) puis recale. Utile quand deux volumes voisins ont été confondus (ex. 2 m³ vs 3 m³). |
| **Recalage par zone**      | Recale en ne tenant compte que d'un **petit morceau du nuage** délimité par une boîte (voir ci-dessous).                                     |

Pour les modes **Distance personnalisée** et **Volume**, la valeur saisie est
mémorisée le temps de la session : l'icône reste **orange** et chaque `Recaler
la sélection` réapplique le mode sans ressaisie. Sélectionner « effacer » dans
la modale revient au mode adaptatif.

![Modes de recalage personnalisés](../assets/images/cc_edit_register_personal.png)

### Recalage par zone { #register-selection---zone }

Le **recalage par zone** restreint l'ajustement à une **portion du nuage**
plutôt qu'à l'ensemble des points autour du bloc. C'est utile quand seule une
partie du nuage est fiable (zone bruitée, blocs voisins parasites, interface
entre deux levés).

Au choix de ce mode, un **panneau dédié** s'ouvre et fait apparaître une
**boîte** dans la scène CloudCompare :

1. Positionnez et dimensionnez la boîte autour de la portion de nuage à
   conserver (ou à exclure).
2. Choisissez de garder le nuage **à l'intérieur** ou **à l'extérieur** de la
   boîte.
3. Validez : le recalage ne tient compte que des points retenus. La distance
   de crop reste **adaptative**.

Contrairement aux modes Distance / Volume, le recalage par zone **n'est pas un
override persistant** : la boîte est spatiale et placée à la main à chaque
usage.

![Recalage par zone](../assets/images/cc_edit_register_zone.png)

## Aider le recalage { #help-register }

Ouvre un panneau interactif permettant de **translater ou tourner** le bloc
sélectionné avant de lancer le recalage. Utile lorsque la position de
départ d'un bloc est trop éloignée du nuage pour que le recalage
automatique converge.

Procédure typique :

1. Sélectionner le bloc à pré-positionner.
2. Cliquer sur `Aider le recalage`.
3. Utiliser les flèches / sliders pour amener le bloc à proximité de sa
   position théorique sur le nuage.
4. En validant, l'action [`Recaler la sélection - Distance
   adaptative`](#register-selection---adaptive-dist) est exécutée
   automatiquement.

![Aider le recalage](../assets/images/cc_edit_help.png)

## Filtrer les blocs { #filter-blocks }

Supprime les blocs ne respectant pas certains seuils de qualité :
**distance médiane** au nuage, **accuracy**, ou **nombre de points** de
correspondance.

![Filtrer les blocs](../assets/images/cc_edit_filter.png)

Paramètres de la modale :

| Paramètre            | Description                                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Score threshold`    | Seuil supérieur sur la médiane des distances des points au voisinage du bloc, en mètres. Les blocs dont le score dépasse ce seuil sont supprimés.                     |
| `Distance threshold` | Seuil sur la distance entre centres de blocs, en mètres. Si deux blocs sont plus proches que ce seuil, celui qui a la plus faible médiane des distances est conservé. |
| `Accuracy threshold` | Seuil sur l'accuracy (champ scalaire de qualité). Les blocs en dessous sont supprimés.                                                                                |

!!! tip "Premier filtrage après détection"
Cette action est typiquement utilisée juste après une détection
automatique pour éliminer les faux positifs avant d'attaquer le
recalage manuel.

## Trouver les noms { #find-names }

Assigne les **numéros de plot et de cible** des blocs en faisant
correspondre leur position 3D à un **plan de pose** au format CSV.

![Trouver les noms](../assets/images/cc_edit_find_names.png)

Paramètres de la modale :

| Paramètre                               | Description                                                                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Reference plan`                        | Chemin du plan de pose CSV utilisé pour nommer les blocs.                                                                                    |
| `Plan format`                           | Format du plan (colonnes attendues).                                                                                                         |
| `Max distance`                          | Distance maximale, en mètres, entre le centre d'un bloc et le point correspondant sur le plan. Au-delà, le bloc est considéré « hors plan ». |
| `Change only blocks without name`       | Ne met à jour que les numéros de plot/cible des blocs **non encore numérotés**.                                                              |
| `Offset for renamed block number`       | Si renseigné, les numéros de cible attribués sont une suite d'entiers commençant à partir de cette valeur.                                   |
| `Plot name for blocks outside the plan` | Nom de plot donné aux blocs dont la distance au plan est supérieure à `Max distance`.                                                        |

## Suppression sécurisée { #safe-delete }

Supprime les blocs sélectionnés en gardant un **checkpoint d'annulation**.
Contrairement à une suppression directe via CloudCompare, cette action
permet de revenir en arrière via le bouton [`Annuler la dernière
action`](header.md#undo) du [Header](header.md).

## Marquer un bloc manquant { #mark-missing-block }

Signale un bloc qui **existe physiquement sur l'ouvrage mais qu'on
n'arrive pas à modéliser** depuis le nuage de points (données absentes ou
insuffisantes). CloudCompare n'exposant pas le picking 3D dans la vue, la
position est reprise d'un **bloc voisin** :

1. Sélectionnez le bloc existant le plus proche du trou.
2. Cliquez sur `Marquer un bloc manquant`.
3. Un **placeholder** rouge (type de bloc `Missing`) est créé à la
   position de ce bloc.
4. Repositionnez-le sur le trou réel avec l'outil de transformation natif
   de CloudCompare — la nouvelle position est relue automatiquement.

Les placeholders sont exclus des calculs qualité (précision, différentiel,
recouvrement, densité), du recalage et des exports de pose : ils ne servent
qu'à enregistrer le trou. Ils sont synchronisés vers le cloud-viewer via
leur type `Missing`, afin que les statistiques de complétude puissent en
tenir compte, et apparaissent sous **Missing** dans
[`Afficher par type`](header.md#display-by-type). Pour retirer un placeholder mal placé,
utilisez la [`Suppression sécurisée`](#safe-delete).

## Grouper / Dégrouper { #group--ungroup }

Réorganise l'affichage de la structure dans l'arborescence CloudCompare en
**regroupant** les blocs par panneau ou par lot, ou en **dissociant** des
groupements existants.

Une modale unique propose les 4 opérations :

| Opération                | Effet                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `Grouper par panneaux`   | Regroupe les blocs partageant le même `plot_number` dans un sous-groupe « panneau ». |
| `Dégrouper les panneaux` | Dissocie les groupes panneau et remet les blocs au niveau supérieur.                 |
| `Grouper par lots`       | Regroupe les blocs partageant le même `package`.                                     |
| `Dégrouper tout`         | Dissocie tous les regroupements (panneau + lot).                                     |

![Grouper / Dégrouper](../assets/images/cc_edit_group_ungroup.png)
