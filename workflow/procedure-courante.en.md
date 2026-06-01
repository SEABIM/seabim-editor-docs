# Standard procedure

This page describes the standard workflow for reconstructing a breakwater
from a point cloud: cloud preparation, automatic detection, quality
control and delivery.

## 1. Cloud cutting { #cutting }

For **photogrammetry** and **bathymetry** clouds:

1. Cut the cloud by **block size** (volume).
2. Then split into sub-parts `p1`, `p2`, … to get sections of **500 m
   maximum**.
3. Keep for each zone the **full cloud** before the `pX` cutting — it
   will be used for the final render.

!!! warning "Mandatory overlap"
    Always keep an overlap between two clouds when a cut is made,
    otherwise it can cause errors during processing.

Stick to the [naming convention for cut
clouds](formats-fichiers.md#pcd-naming).

## 2. Automatic reconstruction { #auto-reconstruction }

1. Create a local project mirroring the **same folder structure** as the
   shared folder.
2. Run the automatic block detection (action [`Find blocks in a point
   cloud`](../modules/input.md#find-blocks-in-a-point-cloud) of the
   [Import](../modules/input.md) module).
3. Several detections may run in parallel in distinct CloudCompare
   instances.
4. Run a **first filtering** of the detected blocks by their score
   (action [`Filter blocks`](../modules/edit.md#filter-blocks) of the
   [Edit](../modules/edit.md) module).
5. Copy the resulting JSON to the shared folder following the [structure
   naming convention](formats-fichiers.md#json-naming).

## 3. Manual reconstruction { #manual-reconstruction }

1. Create a local project mirroring the shared folder structure.
2. Carry out the manual work with the CloudCompare + SEABIM Editor
   interface. **Only add blocks if there is no doubt about the position.**
3. Verify with a final render including `diff`, `density` and `overlap`
   (modules [Quality control](../modules/quality.md) +
   [Filters](../modules/filters.md)) and adjust if needed.
4. Copy the JSON to the shared folder following the naming convention.

## 4. Verification { #verification }

Once every sub-part has been processed:

1. **Merge** the models of the different parts (`bathy` + `photog`,
   different block sizes).
2. Run a final render integrating `diff`, `density` and `overlap`.
3. Adjust if needed, making sure to use the **right cloud** when
   re-editing manually.

!!! tip "Points of attention"
    Pay particular attention to the **interfaces between different
    volumes**, the **waterline**, the **berm** and the **toe**.

## 5. Final render { #final-render }

1. **Reindex** the blocks (action [`Rename blocks with prefix
   (Batch)`](../modules/metadata.md#rename-blocks-with-prefix-batch) of
   the [Metadata](../modules/metadata.md) module).
2. Run the final render with the desired filters via the [`Export final
   render`](../modules/output.md#export-final-render) action of the
   [Export](../modules/output.md) module.
