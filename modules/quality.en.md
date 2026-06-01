# Quality control

The **Quality control** module groups the placement quality metrics:
fit accuracy on the cloud, deviation from design, duplicates, volume
overlaps.

While [Filters](filters.md) computes **geometric** filters (relations
between neighboring blocks), Quality control focuses on metrics of
**fidelity to the reference cloud** and **internal consistency** of the
structure.

## Compute accuracy { #compute-accuracy }

Computes, for each block, the **median distance** between the reference
cloud points around the block and the block's surface. This is the main
**accuracy** score of SEABIM Editor: the lower it is, the better the
block matches the cloud.

To visualize via the [`Change color
scale`](header.md#change-color-scale) action by picking the `accuracy`
scalar field.

![Compute accuracy](../assets/images/cc_quality_accuracy.png)

!!! tip "Typical usage"
    Run `Compute accuracy` after a **registration** (action [`Register
    selection - Adaptive
    dist`](edit.md#register-selection---adaptive-dist) of the
    [Edit](edit.md) module) to check that the blocks are well fitted.
    Blocks in red (high accuracy value) deserve a new registration or
    manual inspection.

## Compute differential { #compute-differential }

Computes the **distance between the reference cloud points and the
structure model** (point-cloud vs blocks differential). Produces a point
cloud colored by deviation, highlighting the **residual gaps**: cloud
pockets not covered by blocks, areas where blocks overflow the cloud, etc.

Lets you quickly spot zones that need a **complementary manual
reconstruction**.

![Compute differential](../assets/images/cc_quality_diff.png)

## Check for duplicates { #check-for-duplicates }

Detects blocks that are **too close to each other** by computing the
nearest-neighbor distance. Below a certain threshold, two blocks likely
represent the **same physical reality** (detection duplicate).

To use typically after automatic detection to clean the structure before
registration.

![Check for duplicates](../assets/images/cc_quality_doublons.png)

## Overlap { #overlap }

Highlights blocks whose **volume intersects with a neighbor's**: two
blocks cannot occupy the same physical space, so an overlap signals a
positioning error.

The result is a scalar field `overlap` expressing the **fraction of the
block volume intersecting with its neighbors**.

![Overlap](../assets/images/cc_quality_recouvrement.png)

!!! note "Difference with Contacts"
    [`Contacts`](filters.md#contacts-all-blocks) counts blocks that
    **touch**. `Overlap` detects blocks that **overlap** (which is
    physically impossible and thus necessarily a placement defect).
