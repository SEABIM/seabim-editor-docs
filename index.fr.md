# SEABIM Editor

Documentation utilisateur du plugin **SEABIM Editor** pour CloudCompare 2.13.

SEABIM Editor est un plugin qui ajoute à CloudCompare les outils métier pour
préparer, contrôler et exporter des structures de digues (blocs) à partir de nuages
de points : détection automatique de blocs, recalage, contrôle qualité, gestion
des métadonnées et export vers les formats de livraison.

## Pour démarrer

- [Installer le plugin](demarrage/installation.md)
- [Activer la licence](demarrage/activation-licence.md)
- [Créer son premier projet](demarrage/premier-projet.md)
- [Découvrir l'interface](demarrage/interface.md)

## Référence par module

L'interface est organisée en onglets. Chaque onglet correspond à un module ;
chaque module regroupe plusieurs actions accessibles depuis le launcher.

| Module                              | Rôle                                                            |
| ----------------------------------- | --------------------------------------------------------------- |
| [Header](modules/header.md)         | Actions transverses (annuler, échelle de couleurs, paramètres)  |
| [Import](modules/input.md)          | Import depuis nuages, JSON, CSV, détection de blocs             |
| [Édition](modules/edit.md)          | Édition de blocs : recalage, suppression, regroupement          |
| [Contrôle qualité](modules/quality.md) | Précision, doublons, recouvrement                            |
| [Filtres](modules/filters.md)       | Calculs de filtres qualité (profil, contacts, aérations…)       |
| [Métadonnées](modules/metadata.md)  | Édition par lot et par bloc des métadonnées                     |
| [Export](modules/output.md)         | Export JSON, CSV, rendu final                                   |

## Workflow et concepts

- [Procédure courante de travail](workflow/procedure-courante.md)
- [Formats de fichiers échangés](workflow/formats-fichiers.md)

## Ressources

- [Raccourcis clavier](reference/raccourcis.md)
- [Glossaire](reference/glossaire.md)
