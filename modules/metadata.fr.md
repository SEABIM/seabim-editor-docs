# Métadonnées

Le module **Métadonnées** regroupe les outils d'**édition des métadonnées
des blocs** : changement de valeur d'un paramètre, renumérotation, et
consultation / édition fine d'un bloc unitaire.

Les 4 actions sont réparties en deux catégories :

- **Lot** : agit sur tous les blocs actuellement sélectionnés dans la
  scène CloudCompare.
- **Bloc** : agit sur le bloc unique sélectionné.

## Changer un paramètre (lot) { #change-parameter-batch }

**Catégorie : Lot**

Met à jour un **paramètre unique** sur tous les blocs sélectionnés en une
seule opération. Utile pour homogénéiser un champ (par exemple
`block_type`, `package`, ou tout autre attribut métadonnée) sur une zone
entière.

![Changer un paramètre](../assets/images/cc_meta_change.png)

!!! warning "Action destructive"
L'opération écrase la valeur précédente sur tous les blocs concernés.
Sauvegarder (action [`Sauvegarder un JSON`](output.md#save-json))
avant un traitement massif, et utiliser [`Annuler la dernière action`](header.md#undo) si besoin de revenir en arrière.

## Renommer les blocs avec un préfixe (lot) { #rename-blocks-with-prefix-batch }

**Catégorie : Lot**

Applique un **préfixe** à la sélection et **réindexe** les blocs derrière
ce préfixe. C'est l'opération de **renommage par lot** utilisée typiquement
en fin de traitement pour produire une nomenclature finale propre avant
le rendu de livraison.

![Renommer les blocs avec un préfixe](../assets/images/cc_meta_prefix.png)

Exemple : `B-0001`, `B-0002`, … pour tous les blocs sélectionnés, où `B-`
est le préfixe et `0001`, `0002`… est l'index séquentiel.

!!! note "Préalable au rendu final"
Cette action est citée dans la [procédure courante](../workflow/procedure-courante.md#final-render)
comme étape de **réindexation** précédant l'action [`Exporter le rendu final`](output.md#export-final-render). Elle garantit que la
numérotation finale est continue et sans trou.

## Éditeur de métadonnées (bloc) { #metadata-editor-block }

**Catégorie : Bloc**

Ouvre un éditeur permettant de **modifier n'importe quel champ
métadonnée** du bloc sélectionné. Là où [`Changer un paramètre
(lot)`](#change-parameter-batch) cible un champ à la fois sur N blocs,
cette action cible N champs à la fois sur un seul bloc.

![Éditeur de métadonnées](../assets/images/cc_meta_edit.png)

## Afficher les métadonnées (bloc) { #show-metadata-block }

**Catégorie : Bloc · Raccourci : ++ctrl+m++**

Affiche en lecture seule les métadonnées du bloc sélectionné, **regroupées
par catégorie** (`Base`, `Filtre`, `Autre`). Action
de consultation rapide sans risque de modification.

![Afficher les métadonnées](../assets/images/cc_meta_view.png)
