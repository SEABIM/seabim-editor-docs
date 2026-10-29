# Keyboard shortcuts

This page lists every keyboard shortcut available in SEABIM Editor, by
category. They are also shown when hovering the matching button in the
launcher.

## Header (cross-cutting actions)

| Shortcut         | Action                                                                       | Detail                                |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------- |
| ++ctrl+z++       | [Undo](../modules/header.md#undo)                                            | Reverts the last change.              |
| ++ctrl+y++       | [Redo](../modules/header.md#redo)                                            | Reapplies the last undone change.     |
| ++ctrl+shift+z++ | [Redo](../modules/header.md#redo) (alias)                                    | Mac / Linux convention for Redo.      |
| ++ctrl+r++       | [Update view](../modules/header.md#update-view)                              | Refreshes the display of all blocks.  |
| ++ctrl+l++       | [Change color scale](../modules/header.md#change-color-scale)                | Opens the color picker dialog.        |
| ++ctrl+shift+l++ | [Toggle color scale](../modules/header.md#toggle-color-scale)                | Shows/hides the graduated bar in the view. |
| ++ctrl+t++       | [Toggle transparency](../modules/header.md#toggle-transparency)              | Makes the selected blocks translucent. |
| ++ctrl+u++       | [Switch to meters / feet](../modules/header.md#switch-units)                 | Changes the working length unit.      |
| ++ctrl++,        | [Settings](../modules/header.md#settings)                                    | Opens the preferences dialog.         |
| ++f1++           | [Shortcuts help](../modules/header.md#affichage-des-raccourcis)              | Opens the window listing all shortcuts. |

!!! note "SEABIM shortcuts take precedence over CloudCompare's"
    CloudCompare assigns ++ctrl+t++ to `Apply transformation` and ++ctrl+d++
    to `Enable visual debug traces`. Two identical shortcuts active at the
    same time trigger neither: when the launcher opens, SEABIM Editor
    therefore removes those shortcuts from the CloudCompare actions, which
    stay reachable from their menus. They return to CloudCompare when the
    application restarts.

## Edit module

| Shortcut   | Action                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------- |
| ++ctrl+e++ | [Register selection - Adaptive dist](../modules/edit.md#register-selection---adaptive-dist)       |
| ++ctrl+f++ | [Fit position](../modules/edit.md#fit-position)                                                   |
| ++ctrl+d++ | [Safe delete](../modules/edit.md#safe-delete)                                                     |

## Metadata module

| Shortcut   | Action                                                                  |
| ---------- | ----------------------------------------------------------------------- |
| ++ctrl+m++ | [Show metadata (Block)](../modules/metadata.md#show-metadata-block)     |
