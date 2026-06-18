# Glossaire

Termes métier et techniques utilisés dans la documentation SEABIM Editor.

## A

**Accuracy** _(précision)_
: Distance médiane entre les points du nuage de référence situés autour
d'un bloc et la surface de ce bloc. Métrique principale de fidélité au
levé. Calculée par [`Calculer la précision`](../modules/quality.md#compute-accuracy).

## B

**Berme**
: Section horizontale ou faiblement inclinée d'une digue, en sommet ou
en rupture de talus.

**BIN (CloudCompare)**
: Format de sauvegarde propre à CloudCompare, capable de contenir une
scène complète (nuages + modèles 3D). Voir [Formats de fichiers](../workflow/formats-fichiers.md#fichiers-cloudcompare-bin).

**BlockFinder**
: Algorithme de détection automatique de blocs dans un nuage de points
(action [`Détecter les blocs dans un nuage`](../modules/input.md#find-blocks-in-a-point-cloud)).
Disponibilité gardée par licence WIBU.

**Bloc**
: Élément structurel d'une digue (accropode, X-bloc, cube, …). Le
travail de SEABIM consiste à positionner chaque bloc dans l'espace à
partir d'un nuage de points.

**Butée de pied**
: Section inférieure d'une digue, en contact avec le sol marin. Zone
d'attention particulière lors de la vérification ([procédure
courante § Vérification](../workflow/procedure-courante.md#verification)).

## C

**Checkpoint** _(point de reprise)_
: Instantané de la structure empilé avant chaque modification, permettant
de revenir en arrière via [`Annuler la dernière action`](../modules/header.md#undo) (++ctrl+z++).

**CloudCompare**
: Logiciel open source de manipulation de nuages de points. SEABIM
Editor s'exécute comme **plugin** de CloudCompare 2.13.

**CodeMeter / WIBU**
: Système de licence par clé USB utilisé par SEABIM Editor pour
l'activation et la définition des fonctionnalités autorisées. Voir
[Activation de la licence](../demarrage/activation-licence.md).

**Contacts**
: Nombre de blocs voisins en contact direct avec un bloc donné. Filtre
calculé par [`Contacts (tous les blocs)`](../modules/filters.md#contacts-all-blocks).

## D

**Déplacement**
: Mouvement d'un bloc entre deux campagnes successives (deux levés).
Calculé par [`Déplacement`](../modules/filters.md#displacement).

**Distance adaptative**
: Distances seuils variables selon le contexte (type de bloc, voisinage)
utilisées par le recalage automatique [`Recaler la sélection - Distance adaptative`](../modules/edit.md#register-selection---adaptive-dist).
Définies dans `parameters.json`.

## F

**Feature Map** _(carte des fonctionnalités)_
: Ensemble des bits de fonctionnalités autorisés par la licence WIBU du
client. Conditionne l'affichage de certaines actions (ex.
BlockFinder).

**Filtre**
: Champ scalaire calculé sur les blocs pour qualifier leur pose (hors
profil, contacts, recouvrement, …). Voir [module Filtres](../modules/filters.md).

## H

**Hors profil**
: Distance d'un bloc au plan moyen formé par ses voisins. Filtre calculé
par [`Hors profil`](../modules/filters.md#out-profile).

## J

**JSON (structure)**
: Format de stockage principal d'une structure SEABIM Editor. Voir
[Fichier de structure JSON](../workflow/formats-fichiers.md#json-structure).

## L

**Launcher**
: Fenêtre PyQt5 qui s'ouvre lors du clic sur le bouton SEABIM Editor
dans CloudCompare. Centralise toutes les actions par onglets.

**Lot** _(batch)_
: Catégorie d'actions du module [Métadonnées](../modules/metadata.md)
qui agissent sur tous les blocs sélectionnés en une seule opération
(ex. [`Changer un paramètre (lot)`](../modules/metadata.md#change-parameter-batch)).

**Ligne d'eau**
: Niveau où la digue passe sous le niveau marin moyen. Zone d'attention
pour la cohérence des poses bathy/photog.

## M

**MBES (Multibeam Echosounder)**
: Levé bathymétrique multifaisceaux, source typique pour la partie
immergée de la digue.

**Module**
: Regroupement d'actions par domaine, exposé comme un onglet dans le
launcher (Import, Édition, Contrôle qualité, Filtres, Métadonnées,
Export).

## N

**Nuage de points (PCD)**
: Ensemble de points 3D issu d'un levé. Le nuage est chargé **par
CloudCompare** (tout format qu'il sait lire : PCD, LAS, BIN, …) ; `.pcd` est
le format de **livraison recommandé**, pas une contrainte du plugin. Voir
[Formats de fichiers](../workflow/formats-fichiers.md#point-clouds).

## O

**Offset** _(décalage global)_
: Translation à appliquer pour passer des coordonnées locales (utilisées
en interne pour la précision) aux coordonnées globales.

## P

**Package** _(lot)_
: Regroupement logique de plusieurs **panneaux** sous un même nom métier.

**Panneau** _(panel)_
: Regroupement logique de blocs partageant un `plot_number`. Utilisé par
[`Grouper / Dégrouper`](../modules/edit.md#group--ungroup).

**Photog (photogrammétrie)**
: Levé photogrammétrique, source typique pour la partie émergée de la
digue.

**Plot**
: Position théorique d'un bloc sur le plan de pose. Identifiée par un
`plot_number`.

## R

**Recalage** _(registration)_
: Réalignement d'un bloc sur le nuage de points pour ajuster sa
position. Action principale du module [Édition](../modules/edit.md).

**Recouvrement** _(overlap)_
: Volume d'intersection entre deux blocs voisins, exprimé en fraction du
volume total. Calculé par [`Recouvrement`](../modules/quality.md#overlap).

**Rendu final**
: Fichiers BIN CloudCompare générés en fin de projet, prêts pour la
livraison. Voir [`Exporter le rendu final`](../modules/output.md#export-final-render).

## S

**Score médian**
: Synonyme de **précision** (accuracy).

**Structure**
: Ensemble des blocs constituant une digue reconstruite. Sauvegardée en
JSON.

## T

**Talus**
: Pente d'une digue. La normale au talus sert de référence pour les
filtres [`Nez perpendiculaire`](../modules/filters.md#perpendicular-nose)
et [`Enclume perpendiculaire`](../modules/filters.md#perpendicular-anvil).

## V

**Voids** _(aérations)_
: Cavités d'aération non prévues à l'intérieur de la structure.
Détectées par [`Aérations`](../modules/filters.md#voids).
