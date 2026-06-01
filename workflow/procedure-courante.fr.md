# Procédure courante

Cette page décrit le workflow standard de reconstruction d'une digue à partir
d'un nuage de points : préparation du nuage, détection automatique, contrôle
qualité et livraison.

## 1. Découpage des nuages { #cutting }

Pour les nuages **photogrammétrie** et **bathymétrie** :

1. Découper le nuage par **taille de bloc** (volume).
2. Puis découper en sous-parties `p1`, `p2`, … afin d'avoir des tronçons de
   longueur **500 m maximum**.
3. Conserver pour chaque zone le **nuage complet** avant le découpage en
   `pX` — il sera utilisé lors du rendu final.

!!! warning "Recouvrement obligatoire"
Toujours conserver un recouvrement entre deux nuages lorsqu'un découpage
est effectué, sinon cela peut entraîner des erreurs lors du traitement.

Respecter la [nomenclature des nuages découpés](formats-fichiers.md#pcd-naming).

## 2. Reconstruction automatique { #auto-reconstruction }

1. Créer un projet en local en respectant la **même arborescence** que sur
   le dossier partagé.
2. Lancer la détection automatique de blocs (action [`Détecter les blocs dans un nuage`](../modules/input.md#find-blocks-in-a-point-cloud) du module
   [Import](../modules/input.md)).
3. Plusieurs détections peuvent tourner en parallèle dans des interfaces
   CloudCompare distinctes.
4. Effectuer un **premier filtrage** des blocs détectés par leur score
   (action [`Filtrer les blocs`](../modules/edit.md#filter-blocks) du module
   [Édition](../modules/edit.md)).
5. Copier le JSON résultat sur le dossier partagé en respectant la
   [nomenclature des structures](formats-fichiers.md#json-naming).

## 3. Reconstruction manuelle { #manual-reconstruction }

1. Créer un projet en local respectant l'arborescence du dossier partagé.
2. Effectuer le traitement manuel avec l'interface CloudCompare + SEABIM
   Editor. **N'ajouter les blocs que s'il n'y a aucun doute sur la position.**
3. Effectuer une vérification par rendu final avec `diff`, `densité` et
   `overlap` (module [Contrôle qualité](../modules/quality.md) + module
   [Filtres](../modules/filters.md)) et ajuster si besoin.
4. Copier le JSON sur le dossier partagé en respectant la nomenclature.

## 4. Vérification { #verification }

Une fois toutes les sous-parties traitées :

1. **Fusionner** les modèles des différentes parties (`bathy` + `photog`,
   différentes tailles de bloc).
2. Effectuer un rendu final intégrant `diff`, `densité` et `overlap`.
3. Ajuster si nécessaire en faisant attention à utiliser le **bon nuage**
   lors d'une nouvelle édition manuelle.

!!! tip "Points d'attention"
Faire particulièrement attention aux **interfaces entre différents
volumes**, à la **ligne d'eau**, à la **berme** et à la **butée de pied**.

## 5. Rendu final { #final-render }

1. **Réindexer** les blocs (action [`Renommer les blocs avec un préfixe
   (lot)`](../modules/metadata.md#rename-blocks-with-prefix-batch) du
   module [Métadonnées](../modules/metadata.md)).
2. Lancer le rendu final avec les filtres souhaités via l'action
   [`Exporter le rendu final`](../modules/output.md#export-final-render) du
   module [Export](../modules/output.md).
