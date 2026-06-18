# Interface

Le **launcher SEABIM Editor** est une fenêtre PyQt5 indépendante qui
s'ouvre par-dessus CloudCompare. Il sert de point d'entrée à toutes les
actions du plugin et est organisé en **onglets** par domaine fonctionnel.

![launcher SEABIM Editor après chargement (onglets visibles)](../assets/images/cc_seabim_homepage.png)

## Anatomie du launcher

```text
┌────────────────────────────────────────────────────┐
│  ↶ ↷ ⟳ 🎨 👁 📏 ⚙ ▭ ❓   ← Header (transversal)  │
├────────────────────────────────────────────────────┤
│ Accueil | Import | Édition | Contrôle qualité |    │
│ Filtres | Métadonnées | Export   ← Onglets         │
├────────────────────────────────────────────────────┤
│                                                    │
│   [Bouton action 1]  [Bouton action 2]  …          │
│   [Bouton action 3]  [Bouton action 4]  …          │
│                                                    │
│              ← Zone d'actions de l'onglet actif    │
└────────────────────────────────────────────────────┘
```

- Le **header** propose des actions transversales accessibles depuis n'importe
  quel onglet (cf. [module Header](../modules/header.md)).
- Les **onglets** : un onglet `Accueil` (état de la licence), puis les
  modules métier `Import`, `Édition`, `Contrôle qualité`, `Filtres`,
  `Métadonnées`, `Export` — et `Synchronisation` à la fin si activé par la
  licence.
- La **zone d'actions** affiche les boutons du module actif, soit en liste
  verticale, soit en grille (cas du module [Filtres](../modules/filters.md)
  qui propose 11 actions en grille).

## Onglets disponibles

| Onglet              | Rôle                       | Détail                                           |
| ------------------- | -------------------------- | ------------------------------------------------ |
| `Accueil`           | État de la licence         | Date de début et options activées                |
| `Import`            | Chargement de structures   | [Module Import](../modules/input.md)             |
| `Édition`           | Édition de blocs           | [Module Édition](../modules/edit.md)             |
| `Contrôle qualité`  | Métriques de qualité       | [Module Contrôle qualité](../modules/quality.md) |
| `Filtres`           | Filtres géométriques       | [Module Filtres](../modules/filters.md)          |
| `Métadonnées`       | Édition des métadonnées    | [Module Métadonnées](../modules/metadata.md)     |
| `Export`            | Sauvegarde et export       | [Module Export](../modules/output.md)            |
| `Synchronisation` ⃰ | Échange avec le cloud SEABIM | [Module Synchronisation](../modules/sync.md)   |

⃰ L'onglet `Synchronisation` n'apparaît que si le bit de licence correspondant
est actif (cf. [Activation de la licence](activation-licence.md)).

## Header — actions transversales

Le header est toujours visible :

| Icône | Action                                                                            | Raccourci                           |
| ----- | --------------------------------------------------------------------------------- | ----------------------------------- |
| ↶     | [Annuler la dernière action](../modules/header.md#undo)                           | ++ctrl+z++                          |
| ↷     | [Rétablir](../modules/header.md#redo)                                             | ++ctrl+y++ (alias ++ctrl+shift+z++) |
| ⟳     | [Rafraîchir la vue](../modules/header.md#update-view)                             | ++ctrl+r++                          |
| 🎨    | [Changer l'échelle de couleurs](../modules/header.md#change-color-scale)          | ++ctrl+l++                          |
| 👁    | [Afficher par type](../modules/header.md#display-by-type)                         | ++ctrl+d++                          |
| 📏    | [Basculer mètres / pieds](../modules/header.md#switch-units)                      | ++ctrl+u++                          |
| ⚙     | [Paramètres](../modules/header.md#settings)                                       | ++ctrl++,                           |
| ▭     | [Réduire la taille de fenêtre](../modules/header.md#reduire-la-taille-de-fenetre) | —                                   |
| ❓    | [Affichage des raccourcis](../modules/header.md#affichage-des-raccourcis)         | ++f1++                              |

## États visuels des boutons

- **Activé** : bouton coloré, cliquable.
- **Désactivé** : bouton grisé. Typique pour `Annuler` / `Rétablir` quand
  la pile est vide, ou pour une action qui requiert une sélection (clic =
  pas d'effet).
- **Badge** : certaines actions ont une **badge** secondaire à droite du
  bouton principal (par exemple [`Rapport de recalage`](../modules/edit.md#register-selection---adaptive-dist) sur
  l'action `Recaler la sélection - Distance adaptative`). La badge bascule un
  état On/Off lié à l'action.

## Tooltips et aide

- **Survoler** un bouton pour voir sa description.
- Cliquer sur l'**icône d'aide** d'une modale ouvre la page de
  documentation correspondante de ce site dans le navigateur.

## Persistance

- Les **paramètres internes** (`parameters.json`) et les **profils
  utilisateur** sont conservés dans `%LOCALAPPDATA%\Seabim\`.
- Une **sauvegarde automatique** (`autosave.json`) est maintenue pendant
  la session.

## Multi-langue

Le launcher est traduit en **Français**, **Anglais** et **Arabe**. La
langue est détectée automatiquement à partir du système, mais peut être
forcée via la variable d'environnement `SEABIM_LANG=fr|en|ar`.
