# First project

This page guides step by step through the creation and processing of a
first SEABIM Editor project, from loading the point cloud to a first
final render.

## Prepare the files

Before opening CloudCompare:

1. Place the **point cloud** in raw PCD, LAS, BIN format in a project
   folder.
2. Cut the cloud into sub-parts `p1`, `p2`, … if needed (see [Standard
   procedure §
   Cutting](../workflow/procedure-courante.md#cutting)).
3. Stick to the [cloud naming
   convention](../workflow/formats-fichiers.md#pcd-naming).

## 1. Load the cloud in CloudCompare

1. Open **CloudCompare 2.13**.
2. Drag and drop the cloud into the scene.
3. Check that the cloud displays correctly and carries a consistent
   global offset.

## 2. Launch SEABIM Editor

1. Click the **SEABIM Editor** icon in the toolbar.
2. The license check runs (WIBU CodeMeter license required — if your
   workstation is not yet activated, follow the [License
   activation](activation-licence.md) procedure).
3. The **launcher** opens on the `Home` tab by default.

![SEABIM Editor launcher after load (tabs visible)](../assets/images/cc_seabim_homepage.png)

## 3. Create the reference block

**Import** tab:

1. Select the point cloud in the CloudCompare tree.
2. Click [`Load init block`](../modules/input.md#load-init-block).
3. Set the block type and volume.
4. Validate — a block appears in the scene, anchored on the cloud.

## 4. Automatic detection (if BlockFinder license)

**Import** tab → [`Find blocks in a point
cloud`](../modules/input.md#find-blocks-in-a-point-cloud):

1. Select the cloud and run detection with the default parameters.
2. At the end of the computation, a JSON structure appears in
   CloudCompare's DBTree.

!!! tip "Without a BlockFinder license"
    Without the BlockFinder feature, you can manually create each block
    via [`Load init block`](../modules/input.md#load-init-block) then
    [`Register selection - Adaptive
    dist`](../modules/edit.md#register-selection---adaptive-dist)
    (++ctrl+e++) to register them one by one on the cloud.

## 5. First filtering

**Edit** tab → [`Filter blocks`](../modules/edit.md#filter-blocks):

1. Set a score threshold (e.g. `0.30 m`) to remove false positives.
2. Set a distance threshold between blocks if needed (deduplication).
3. Validate.

## 6. Save

**Export** tab → [`Save JSON`](../modules/output.md#save-json):

Name the file following the [recommended
naming](../workflow/formats-fichiers.md#json-naming),
for example:

```
2026-05-28_14.30.00_mbes_3m3_MAIN_INT_p1_find.json
```

## 7. Check the quality filters

**Filters** tab: compute `Out profile`, `Displacement`, `Voids`,
`Contacts (All blocks)`, `Column placement`. **Quality control** tab:
compute `Compute accuracy`, `Overlap`, `Check for duplicates`.

Visualize each scalar field via [`Change color
scale`](../modules/header.md#change-color-scale) (++ctrl+l++).

## 8. Manual registration of problematic blocks

For blocks in red (high accuracy value) or with overlap:

1. Select the block.
2. [`Help register`](../modules/edit.md#help-register) to pre-position
   and register.
3. If the block remains bad, [`Safe
   delete`](../modules/edit.md#safe-delete) and consider recreating it
   elsewhere.

Use [`Undo`](../modules/header.md#undo) (++ctrl+z++) in case of mistake.

## 9. Final render

**Metadata** tab → [`Rename blocks with prefix
(Batch)`](../modules/metadata.md#rename-blocks-with-prefix-batch) to
reindex the structure.

**Export** tab → [`Export final
render`](../modules/output.md#export-final-render) with the desired
filters.

You've completed a full cycle. For the next steps, see the [standard
procedure](../workflow/procedure-courante.md) which details the typical
back-and-forth of a real project.
