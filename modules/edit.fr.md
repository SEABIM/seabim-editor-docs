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

## Ajuster la position { #fit-position }

**Raccourci : ++ctrl+f++**

Cherche la **meilleure pose et orientation** des blocs sélectionnés sur le
nuage. Là où [`Recaler la sélection`](#register-selection---adaptive-dist)
part de la pose courante et l'affine localement (ICP), cette action
**explore** : elle tire des poses dans un rayon de recherche autour du bloc
et retient la meilleure au sens d'un critère qui pèse ensemble

- la **distance au nuage** (médiane des distances points/bloc) ;
- le **non-recouvrement des voisins** : un bloc ne peut pas se poser dans la
  matière d'un autre ;
- la **surface exposée sans points** : une face tournée vers le haut et non
  masquée par un voisin doit porter des points, sinon la pose expose de la
  matière là où le levé n'a rien mesuré.

Elle rattrape donc des **erreurs d'orientation** qu'un recalage local ne
défait pas, au prix d'une quinzaine de secondes par bloc.

Les blocs sont traités un par un, et chacun contraint les suivants. La barre
de progression du launcher indique le bloc en cours ; `Annuler` interrompt
la série, et **les blocs déjà ajustés sont conservés**.

### Bouton « Recherche approfondie »

L'**icône loupe** à droite du bouton commute le budget de recherche
(paramètre `fit_deep_search`) :

| État               | Budget                                            | Quand l'utiliser                                                          |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------- |
| Gris (par défaut)  | Recherche rapide, environ **15 s par bloc**       | Cas courant.                                                              |
| Orange             | Recherche approfondie, environ **80 s par bloc**  | Blocs que la recherche rapide ne parvient pas à placer, pose de départ très incertaine. |

Le réglage est conservé d'une session à l'autre, comme le recalage
personnalisé de `Recaler la sélection`. Au-delà de 20 blocs sélectionnés, une
confirmation rappelle le coût de l'opération.

### Rapport d'ajustement

À la fin du calcul, une modale donne **une ligne par bloc** : déplacement et
rotation appliqués, médiane obtenue, part de surface exposée sans points. Les
blocs qui dépassent `fit_alert_median` ou `fit_alert_visible` sont marqués
d'un ⚠ et remontés en tête de liste. Toute la sélection est listée : au-delà
d'une douzaine de blocs, la liste défile.

La **badge rapport** (icône à droite du bouton) coupe l'affichage
automatique ; la rallumer réaffiche le dernier rapport de la session, comme
pour `Recaler la sélection`. Le détail descente par descente reste en console
(lignes `[FIT]`), pour le diagnostic.

Les blocs sont recolorés sur `median_score` à l'issue de l'action, et un
point de restauration permet d'annuler l'ensemble ( ++ctrl+z++ ).

### Réglages { #fit-settings }

Tous ces paramètres sont modifiables dans les **Préférences** (ou directement
dans `parameters.json`). Deux familles :

- ceux dont le nom finit par `_rel` sont des **proportions de la taille du
  bloc** : ils suivent donc automatiquement le volume saisi, l'unité de travail
  (feet) et le mode laboratoire, sans rien avoir à changer ;
- les autres sont des longueurs absolues en mètres, converties dans l'unité du
  nuage à l'exécution, à l'exception de `fit_visible_weight`, un nombre pur.

| Paramètre | Défaut | Effet | Quand y toucher |
| --------- | ------ | ----- | --------------- |
| `fit_search_radius_rel` | 0,25 | Rayon de la boîte de recherche en translation, en proportion de la taille du bloc (0,60 m pour un bloc de 2,4 m). | Seulement si la pose de départ est fausse **au-delà** de ce rayon, et alors en recherche approfondie. Le volume à explorer croît comme le cube du rayon : à budget constant, l'élargir dégrade le résultat (32 blocs replacés sur 36 à 0,25 contre 24 sur 36 à 0,40). |
| `fit_max_angle` | 180 | Demi-amplitude de la recherche en rotation, en degrés. 180 balaye toutes les orientations possibles. | L'abaisser (30 par exemple) pour ne corriger que la position quand l'orientation courante est déjà jugée bonne. |
| `fit_cloud_dist_rel` | 0,125 | Distance au-delà de laquelle un point du nuage ne décrit plus le bloc (0,30 m pour un bloc de 2,4 m). | Réglée avec `fit_visible_weight` (0,125 avec 3) : une distance plus serrée affine l'optimum, le terme de surface exposée évite que la recherche ne le perde. La resserrer sur un levé très propre, la desserrer sur un nuage bruité ou une couche mal séparée, en gardant le couple : 0,40 dégrade, 0,10 fait échouer la recherche. |
| `fit_visible_weight` | 3 | Poids du terme « surface exposée sans points ». Le terme est la distance moyenne entre les facettes exposées et le nuage, écrêtée à 0,042 × taille du bloc : une longueur comme la distance au nuage, d'où un poids sans dimension, valable à toute échelle. | **0 le désactive** : le critère se réduit alors à la distance au nuage et au non-recouvrement. C'est le premier réglage à essayer si des blocs déjà bien posés se retournent. En dessous de 1,5 la recherche perd son bassin d'attraction (plus de blocs laissés sur une pose fausse) ; entre 2 et 5 le résultat est plat ; au-delà de 5, ce terme écrase la distance au nuage. |
| `fit_coverage_min` | 0,05 | Fraction minimale de la surface du bloc devant porter des points. Garde-fou contre les poses dégénérées, pas une cible : un levé vu du dessus n'éclaire qu'une partie d'un bloc. | Rarement. Ne le monter que si des blocs se posent dans le vide. |
| `fit_n_sample` | 150 | Nombre de points tirés sur la surface du bloc pour mesurer le recouvrement avec les voisins. | Le monter (300) sur une carapace très enchevêtrée ; le coût est linéaire. |
| `fit_alert_median` | 0,10 m | Médiane au-delà de laquelle le rapport marque le bloc d'un ⚠. | À ajuster à la qualité du levé. Sans effet sur le calcul : cela ne change que le tri du rapport. |
| `fit_alert_visible` | 0,50 | Même rôle, sur la part de surface exposée sans points. | Idem. |
| `fit_deep_search` | 0 | Budget de recherche. | Depuis l'icône loupe plutôt que d'ici. |
| `show_fit_report` | 1 | Ouverture automatique du rapport. | Depuis la badge rapport plutôt que d'ici. |

Les seuils en `_rel` sont mesurés sur la **taille physique du bloc**
(`block_size`), pas sur la racine cubique de son volume : pour un Coreloc de
3 m³, la première vaut 2,39 m et la seconde 1,44 m.

### Mode laboratoire { #fit-lab }

Le critère est **homogène à une longueur** : chacun de ses termes suit
l'échelle du nuage, si bien que les valeurs par défaut ci-dessus conviennent
en mètres, en feet comme sur maquette. Deux points d'attention :

- `lab_tolerance_factor` (2,0 par défaut) desserre les tolérances de **mesure**
  en mode laboratoire, parce que le bruit d'un scanner ne rétrécit pas avec la
  maquette. Il agit sur la distance de comptage et sur la finesse de la grille
  du terme de surface exposée. C'est le premier réglage à ajuster si
  l'ajustement paraît nerveux en labo.
- Le rapport affiche **deux décimales de plus** en mode laboratoire : à cette
  échelle, les déplacements se comptent en dixièmes de millimètre.

### Diagnostic { #fit-diagnostics }

La console garde une ligne `[FIT]` par bloc : médiane et valeur du critère
avant puis après, nombre de générations et temps de calcul. Deux indicateurs
sont en plus écrits sur le bloc, lisibles dans
[`Afficher les métadonnées`](metadata.md#show-metadata-block), section
« Autre » :

- `visible_uncovered` : part de la surface exposée que le levé n'a pas
  instrumentée, c'est la colonne `Exposé` du rapport ;
- `restart_agreement` : part des recherches indépendantes ayant convergé vers
  la pose retenue. 1,0 signifie qu'elles sont toutes d'accord ; une valeur
  basse signale un résultat à rejouer, au besoin en recherche approfondie.

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

| Paramètre                        | Description                                                                                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Browse…`                        | Le plan de pose CSV utilisé pour nommer les blocs.                                                                                                                                                  |
| `Separator`                      | `Auto` (détection automatique), `,`, `;`, tabulation ou barre verticale.                                                                                                                             |
| `First row is a header`          | Devinée à l'ouverture du fichier. Décochée, la première ligne est lue comme une donnée et les colonnes sont nommées `a1`, `a2`, …                                                                     |
| `Split a column`                 | Découpe une colonne sur un séparateur (`-` par défaut), au dernier ou au premier. Les deux morceaux deviennent des colonnes affectables.                                                             |
| `Column mapping`                 | Chaque champ attendu reçoit une colonne du plan. `NumSection`, `NumBlock`, `X` et `Y` sont obligatoires ; `Z` active l'appariement 3D et `NumPrefa` renseigne le numéro de préfabrication.           |
| `Match tolerance (× block size)` | Un point du plan correspond à un bloc si leur distance est inférieure à ce facteur multiplié par la taille du bloc. La valeur est enregistrée comme nouveau défaut.                                  |

L'affectation est devinée à partir des en-têtes quel que soit leur ordre et reste
modifiable à la main. L'aperçu montre les valeurs telles qu'elles seront lues, et
`Run` reste inactif tant qu'un champ obligatoire n'a pas de colonne. Les blocs
qu'aucun point du plan n'atteint dans la tolérance sont nommés `Unknown_xx`.

!!! note "Plan sans en-tête, ou nom de bloc concaténé"
    Un plan dont la première ligne est déjà une donnée, ou dont une colonne unique
    porte à la fois la section et le numéro de bloc (`P12-A-01`), se lit sans
    retouche préalable : décochez `First row is a header`, découpez la colonne sur
    `-` au dernier séparateur, puis affectez `P12-A` à `NumSection` et `01` à
    `NumBlock`.

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
