# Filters

The **Filters** module computes **geometric placement quality filters**
on the current structure. Each action produces a **scalar field** on the
blocks, which can be visualized through the [`Change color
scale`](header.md#change-color-scale) action of the [Header](header.md).

The tab is displayed as a **grid** (11 buttons) rather than a list, to
ease quick filter selection.

!!! tip "Visualize a filter"
    Once a filter is computed, open the [`Change color
    scale`](header.md#change-color-scale) action (++ctrl+l++) and pick the
    filter name in the scalar field list to color the blocks.

## Out profile { #out-profile }

Computes the **out-of-profile distance**: distance from a block to the
mean plane formed by its neighbors. Lets you spot blocks too prominent or
too recessed compared to their neighbors.

![Out profile](../assets/images/cc_filter_outprofil.png)

## Underlayer distance { #underlayer-distance }

Computes the **distance** between each block and the **underlying
surface** (underlayer). Useful to verify that the blocks correctly rest
on the lower layer of the breakwater.

![Underlayer distance](../assets/images/cc_filter_sous_couche.png)

## Column placement { #column-placement }

Highlights **pairs of neighboring blocks stacked vertically** one above
the other. A column placement is a defect: forces don't redistribute
properly between layers.

![Column placement](../assets/images/cc_filter_placem.png)

## Similar orientation { #similar-orientation }

Highlights **pairs of neighboring blocks sharing the same orientation**.
A too-homogeneous orientation between immediate neighbors can be a
placement defect (the alternation of orientations contributes to
stability).

![Similar orientation](../assets/images/cc_filter_orientation.png)

## Perpendicular nose { #perpendicular-nose }

Computes the **angle between each block's "nose" axis and the reference
slope normal**. Lets you verify that block noses are oriented
perpendicular to the slope (optimal theoretical orientation).

![Perpendicular nose](../assets/images/cc_filter_nez_perpendiculaire.png)

## Perpendicular anvil { #perpendicular-anvil }

Same as [`Perpendicular nose`](#perpendicular-nose) but on the **"anvil"
axis** of the block.

![Perpendicular anvil](../assets/images/cc_filter_enclume.png)

## Contacts (All blocks) { #contacts-all-blocks }

Computes the **number of blocks in contact** with each block. A block
with too few contacts is poorly stabilized; a high number can indicate a
too-dense zone.

![Contacts (All blocks)](../assets/images/cc_filter_contact_all.png)

## Contacts (Inferior blocks) { #contacts-inferior-blocks }

Variant of [`Contacts (All blocks)`](#contacts-all-blocks) that restricts
the count to **blocks located in lower layers**. Isolates the structural
supports without noise from lateral or upper blocks.

![Contacts (Inferior blocks)](../assets/images/cc_filter_contact_inf.png)

## Voids { #voids }

Detects **aeration cavities** inside the structure: zones where the
absence of blocks creates a void unplanned by the design.

![Voids](../assets/images/cc_filter_voids.png)

## Triangle density { #triangle-density }

Computes the **mesh triangle density** per block. A control metric: a
block whose triangle density strongly diverges from the mean often
signals a geometric issue (deformed block, wrong type).

![Triangle density](../assets/images/cc_filter_density.png)

## Displacement { #displacement }

Computes the **displacement** of blocks against a **reference structure**
(typically the previous survey), to spot movements between two campaigns.
The **Compute displacement** dialog offers the following settings:

- **Minimum arrow size** and **Maximum displacement value** (relative to
  block size): drive only the **initial coloring** and the color of the
  arrows shown in the view.
- **Reference scale**: the unit the displacement is expressed in for
  coloring.
    - **Absolute**: raw value, in the working unit.
    - **H (block size)**: displacement relative to the block's
      **characteristic height** (dimensionless ratio).
    - **DN (nominal diameter)**: displacement relative to the block's
      **nominal diameter** (cube root of its volume).
- **Matching method**: how each current block is paired with its
  counterpart in the reference structure.
    - **distance**: by spatial proximity.
    - **section and number**: by identity (same section + same block
      number).

!!! note "Displacement is stored in absolute value"
    The scale picked here only sets the initial coloring and arrows.
    Displacement is kept in **absolute value** on the blocks: **H** and
    **DN** are merely **views** recomputed on the fly. You can therefore
    switch to any field or scale via [`Change color
    scale`](header.md#change-color-scale) — or [export](output.md) in
    another reference scale — **without recomputing**.

![Displacement](../assets/images/cc_filter_dep.png)
