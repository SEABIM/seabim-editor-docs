# Premier projet

Cette page guide pas à pas la création et le traitement d'un premier projet
SEABIM Editor, du chargement du nuage de points jusqu'à un premier rendu
final.

## Préparer les fichiers

Avant d'ouvrir CloudCompare :

1. Placer le **nuage de points** brut au format PCD, LAS, BIN dans un dossier
   projet.
2. Découper le nuage en sous-parties `p1`, `p2`, … si nécessaire (cf.
   [Procédure courante § Découpage](../workflow/procedure-courante.md#cutting)).
3. Respecter la [nomenclature des nuages](../workflow/formats-fichiers.md#pcd-naming).

## 1. Charger le nuage dans CloudCompare

1. Ouvrir **CloudCompare 2.13**.
2. Glisser-déposer le nuage dans la scène.
3. Vérifier que le nuage s'affiche correctement et qu'il porte un offset
   global cohérent.

## 2. Lancer SEABIM Editor

1. Cliquer sur l'icône **SEABIM Editor** dans la barre d'outils.
2. La vérification de licence s'exécute (Licence WIBU CodeMeter requise — si
   votre poste n'est pas encore activé, suivre la procédure
   [Activation de la licence](activation-licence.md)).
3. Le **launcher** s'ouvre sur l'onglet `Accueil` par défaut.

![launcher SEABIM Editor après chargement (onglets visibles)](../assets/images/cc_seabim_homepage.png)

## 3. Créer le bloc de référence

Onglet **Import** :

1. Sélectionner le nuage de points dans l'arborescence CloudCompare.
2. Cliquer sur [`Charger un bloc initial`](../modules/input.md#load-init-block).
3. Renseigner le type et le volume de bloc.
4. Valider — un bloc apparaît dans la scène, ancré sur le nuage.

## 4. Détection automatique (si licence BlockFinder)

Onglet **Import** → [`Détecter les blocs dans un nuage`](../modules/input.md#find-blocks-in-a-point-cloud) :

1. Sélectionner le nuage et lancer la détection avec les paramètres par
   défaut.
2. À la fin du calcul, une structure JSON apparaît dans le DBTree de CloudCompare.

!!! tip "Sans licence BlockFinder"
Sans le feature BlockFinder, vous pouvez créer manuellement chaque
bloc via [`Charger un bloc initial`](../modules/input.md#load-init-block) puis
[`Recaler la sélection - Distance adaptative`](../modules/edit.md#register-selection---adaptive-dist) (++ctrl+e++)
pour les recaler un par un sur le nuage.

## 5. Premier filtrage

Onglet **Édition** → [`Filtrer les blocs`](../modules/edit.md#filter-blocks) :

1. Définir un seuil de score (ex. `0.30 m`) pour éliminer les faux
   positifs.
2. Définir un seuil de distance entre blocs si nécessaire (déduplication).
3. Valider.

## 6. Sauvegarder

Onglet **Export** → [`Sauvegarder un JSON`](../modules/output.md#save-json) :

Nommer le fichier selon la [nomenclature
recommandée](../workflow/formats-fichiers.md#json-naming),
par exemple :

```
2026-05-28_14.30.00_mbes_3m3_MAIN_INT_p1_find.json
```

## 7. Vérifier les filtres qualité

Onglet **Filtres** : calculer `Hors profil`, `Déplacement`, `Aérations`,
`Contacts (tous les blocs)`, `Placement en colonne`. Onglet **Contrôle qualité** : calculer
`Calculer la précision`, `Recouvrement`, `Vérification des doublons`.

Visualiser chaque champ scalaire via [`Changer l'échelle de couleurs`](../modules/header.md#change-color-scale) (++ctrl+l++).

## 8. Recalage manuel des blocs problématiques

Pour les blocs en rouge (précision élevée) ou en recouvrement :

1. Sélectionner le bloc.
2. [`Aider le recalage`](../modules/edit.md#help-register) pour pré-positionner et recaler.
3. Si le bloc reste mauvais, [`Suppression
   sécurisée`](../modules/edit.md#safe-delete) et envisager de le recréer
   ailleurs.

Utiliser [`Annuler la dernière
action`](../modules/header.md#undo) (++ctrl+z++) en cas d'erreur.

## 9. Rendu final

Onglet **Métadonnées** → [`Renommer les blocs avec un préfixe (lot)`](../modules/metadata.md#rename-blocks-with-prefix-batch) pour
réindexer la structure.

Onglet **Export** → [`Exporter le rendu final`](../modules/output.md#export-final-render) avec les filtres
souhaités.

Vous avez terminé un cycle complet. Pour la suite, consulter la
[procédure courante](../workflow/procedure-courante.md) qui détaille les
allers-retours typiques d'un projet réel.
