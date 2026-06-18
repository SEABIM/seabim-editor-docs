# Export

Le module **Export** regroupe les actions de **sortie** : sauvegarde de la
structure courante en JSON, export CSV (standard ou colonnes
personnalisées), et génération du rendu final prêt pour livraison.

## Sauvegarder un JSON { #save-json }

Sauvegarde la structure courante dans un fichier JSON. Le format est celui
décrit dans la section [Fichier de structure JSON](../workflow/formats-fichiers.md#json-structure).

!!! tip "Sauvegarde fréquente recommandée"
Le module SEABIM Editor maintient un fichier `autosave.json` dans le
dossier de données, mais une sauvegarde manuelle nommée selon la
[nomenclature](../workflow/formats-fichiers.md#json-naming)
est essentielle aux jalons de travail (`find`, `filtered`, `manual_n`).

## Exporter un CSV { #export-csv }

Exporte les blocs de la structure en CSV. L'action couvre deux cas dans une
modale unifiée :

- **Standard** : les colonnes habituelles (position, type, volume, plot,
  bloc) pour échange avec un autre outil.
- **Personnalisé** : sélection libre des colonnes à exporter selon les
  métadonnées présentes dans la structure.

![Exporter un CSV (étape 1)](../assets/images/cc_export_csv_1.png)
![Exporter un CSV (étape 2)](../assets/images/cc_export_csv_2.png)

## Exporter le rendu final { #export-final-render }

Génère le **rendu final** de livraison sous forme de fichiers **BIN
CloudCompare**, découpé en parts. Une modale permet de choisir précisément
**quels blocs** exporter, **comment** les répartir et **quels champs**
conserver.

![Exporter le rendu final](../assets/images/cc_export_final.png)

### Options de découpage

| Option                            | Effet                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Blocs par part`                  | Nombre de blocs par fichier BIN. Pré-rempli depuis les paramètres (`n_blocks_final_render`), modifiable ici.   |
| `Grouper par panneau`             | Nomme chaque part d'après son **panneau** (ex. `M24`) au lieu de `Part 1`, `Part 2`… Coché par défaut.        |
| `Trier les blocs alphabétiquement`| Ordonne les blocs dans chaque part. Coché par défaut.                                                          |

!!! note "Panneaux trop volumineux"
    En mode « Grouper par panneau », si un panneau dépasse la limite de blocs
    par part, une fenêtre propose de le **redécouper** (`M24`, `M24_2`…) ou de
    le **garder entier** (un seul part pour ce panneau).

### Filtres de sélection

Quand la structure contient **plusieurs types** ou **plusieurs volumes** de
blocs, des sections **`Types de blocs`** et **`Volumes`** apparaissent : seuls
les blocs dont le **type ET le volume** sont cochés sont exportés. S'il n'y a
qu'un seul type (ou volume), la section correspondante est masquée et tous les
blocs sont retenus de ce côté.

### Champs à exporter

Les champs scalaires sont regroupés en sections pliables : **Propriétés
principales** (`panel`), **Contrôle qualité**, **Filtres de placement**,
**Déplacement** et **Autres**. Cochez ceux à conserver dans le rendu livré. Un
champ **non calculé** sur les blocs apparaît grisé et marqué « (non calculé) » :
il n'y a rien à exporter pour ce champ.

![Modale Rendu final](../assets/images/cc_export_final_modal.png)

!!! note "Étape finale du workflow"
    Cette action est l'étape finale décrite dans la [procédure
    courante](../workflow/procedure-courante.md#final-render). Elle est
    précédée d'une **réindexation** (action [`Renommer les blocs avec un
    préfixe (lot)`](metadata.md#rename-blocks-with-prefix-batch) du module
    [Métadonnées](metadata.md)) qui assure une numérotation continue avant la
    livraison.
