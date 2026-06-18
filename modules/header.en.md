# Header (top bar)

The **header** is the row of icons at the top of the SEABIM Editor
launcher. Its actions are **cross-cutting**: they are accessible from
any tab and each one comes with a keyboard shortcut.

![Header](../assets/images/cc_header.png)

## Undo { #undo }

**Shortcut: ++ctrl+z++**

Reverts the **last structure change**. Editing actions that push a
checkpoint (deletion, registration, batch update, detection, …) can all
be undone.

The button is **automatically disabled** while no checkpoint is on the
stack (for example at the start of a session, or after an undo that
emptied the stack).

## Redo { #redo }

**Shortcut: ++ctrl+y++ (alias: ++ctrl+shift+z++)**

Reapplies the last change that was undone with [`Undo`](#undo). Disabled
while the redo stack is empty.

!!! note "Shortcut compatibility"
    The primary shortcut is ++ctrl+y++ (Windows convention). The alias
    ++ctrl+shift+z++ is provided for users used to the Mac / Linux
    convention.

## Update view { #update-view }

**Shortcut: ++ctrl+r++**

Refreshes the 3D display of **all blocks** in CloudCompare. Useful when
the scene is out of sync with the internal state of the structure (for
example after an external JSON modification, or a display setting that
didn't propagate).

## Change color scale { #change-color-scale }

**Shortcut: ++ctrl+l++**

Opens the dialog that lets you choose:

- The **active scalar field** (for example `accuracy`, `overlap`,
  `out_profile`, `displacement`, …)
- The **color palette** applied to that field
- Optionally, the **bounds** (min/max) of the coloring

This is the natural companion of the [Filters](filters.md) and [Quality
control](quality.md) modules: computing a filter produces a scalar field,
`Change color scale` lets you visualize it.

![Color scale](../assets/images/cc_color_panel.png)

## Display by type { #display-by-type }

**Shortcut: ++ctrl+d++**

Opens a dialog that lets you **show only certain block types and certain
volumes**. This is a **non-destructive** display filter: it neither deletes
nor modifies any block, it temporarily hides those that don't match the
selection.

Handy to visually isolate a category (for example a single block type, a
single volume, or the `Missing` blocks) in a dense structure, without
touching the structure itself.

## Switch to meters / feet { #switch-units }

**Shortcut: ++ctrl+u++**

Toggles the **working length unit** between **meters** and **feet**. The
button label reflects the unit you are switching to ("Switch to feet" when
in meters, and vice versa).

!!! warning "Re-run detection after switching"
    Switching the unit does not automatically reconvert block sizes that
    have already been detected. After switching, **re-run
    [`Find blocks in a point cloud`](input.md#find-blocks-in-a-point-cloud)**
    so block sizes are recomputed in the new unit.

## Settings { #settings }

**Shortcut: ++ctrl++,**

Opens the **Settings** dialog which edits the plugin's internal
parameters: action defaults, display options, debug flags (for example
`enable_profiling`), default filter thresholds, etc.

Changes are persisted to `parameters.json` in the user data folder
(`%LOCALAPPDATA%\Seabim\` in installer mode, `C:\Program Files\SEABIM\`
in development mode).

![Settings](../assets/images/cc_parameters.png)

!!! tip "Performance profiling"
    Enabling `enable_profiling = 1` in Settings produces, on every action
    click, a `.prof` file (cProfile) + a `.txt` file (top-30 cumulative)
    in `<DATA_FOLDER>/profiles/`. Turn off after use; the overhead is
    around 5–10% on instrumented actions.

## Reduce window size { #reduire-la-taille-de-fenetre }

Switches the launcher between two layouts:

- **Normal view**: all modules visible as horizontal tabs (`Import`,
  `Edit`, `Quality control`, `Filters`, `Metadata`, `Export`).
- **Compact view**: vertical accordion sidebar, collapsible sections.
  Handy when you want to give more room to CloudCompare or work on a
  narrow screen.

The button works as a toggle: one click activates compact mode, a second
click goes back to normal view.

![Reduce window size](../assets/images/cc_minify.png)

!!! note "Automatic switch"
    The launcher automatically switches to compact mode as soon as its
    window width drops below **600 pixels**, and goes back to normal mode
    when widened. So you don't need to click the button if you just
    resize the window — the right mode is picked automatically.

!!! tip "Persistence"
    Compact mode is **not remembered between launcher openings**: each
    session starts in normal view.

## Shortcuts help { #affichage-des-raccourcis }

**Shortcut: ++f1++**

Opens a window listing **every keyboard shortcut** available in the
current session, grouped by origin:

- The header actions (Undo, Redo, Update view, Change color scale,
  Display by type, Switch to meters / feet, Settings, Reduce window,
  Shortcuts help).
- The actions of the modules that declare a shortcut (for example
  [`Register selection - Adaptive
  dist`](edit.md#register-selection---adaptive-dist) with ++ctrl+e++ or
  [`Show metadata (Block)`](metadata.md#show-metadata-block) with
  ++ctrl+m++).

![Shortcuts help](../assets/images/cc_helper.png)

!!! tip "Quick contextual help"
    ++f1++ is an application-wide shortcut: it works from any tab, even
    when the focus is on a child dialog.
