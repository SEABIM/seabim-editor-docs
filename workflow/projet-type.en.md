# Typical project walkthrough

This page goes through the steps of a typical 3D reconstruction project, from
the point cloud to the client deliverables, and the subtleties often met
along the way. It also serves as a guide for a first project.

## 1. Launch CloudCompare, then SEABIM Editor { #launch }

![CloudCompare](../assets/images/prise-en-main/logo_cloudcompare.png)

When CloudCompare starts, a "SEABIM" logo is displayed, showing that SEABIM
Editor started correctly. Then open the launcher with the SEABIM icon of the
plugins toolbar:

![SEABIM Editor icon in the plugins toolbar](../assets/images/prise-en-main/fenetre_seabim.png)

The license is checked when the launcher opens. If the workstation is not
activated yet, follow the [License activation](../demarrage/activation-licence.md)
procedure. The launcher opens on the `Home` tab (see
[Interface](../demarrage/interface.md)).

## 2. Organize the project { #working-folder }

### 2.1. Working folder

Create the folder structure that gathers every element of the project in a
single directory:

- a folder with the raw data;
- a folder for the placement plan;
- a folder, to be kept, with the `.bin` working session;
- a folder with the client deliverables.

When the team works on a shared folder, everyone creates their project locally
with **the same folder structure** as the shared folder.

!!! warning "Folder and file names"
    No spaces or special characters in names: see
    [File formats](formats-fichiers.md).

### 2.2. Save at each milestone { #save }

**Export** tab → [`Save JSON`](../modules/output.md#save-json) saves the
structure. Save at each project milestone, naming the file according to the
[structure naming convention](formats-fichiers.md#json-naming), for instance
`2026-05-28_14.30.00_mbes_3m3_MAIN_INT_p1_find.json`:

| Milestone        | When                                                          |
| ---------------- | ------------------------------------------------------------- |
| `find`           | After automatic detection.                                    |
| `filtered`       | After the first filtering.                                    |
| `manual_n`       | After each version `n` of the manual processing.              |
| `manual_n_AB`    | After version `n` has been checked by `AB` (initials).        |

Then copy the JSON to the shared folder. The `autosave.json` file kept by the
launcher does not replace these named saves.

## 3. The point cloud: bathymetric, LiDAR, photogrammetric { #point-cloud }

To load a point cloud, drag and drop it onto the CloudCompare window.

### 3.1. Offset { #offset }

CloudCompare asks for a project offset:

- if an offset has already been set for this project, make sure to reuse
  **the same one**;
- otherwise, choose one close to the working area.

**Warning: there is one offset per project!** Details are given in
[CloudCompare basics](cloudcompare.md#offset).

!!! note "Finding a project's offset"
    Select a block: the project offset is shown on the `Global shift` line of
    the CloudCompare Properties window.

### 3.2. Point cloud processing { #cloud-processing }

If needed, the point cloud can be processed for smoother work and a better
display.

#### 3.2.1. Cut { #cutting }

The point cloud can be cut by block size, by geographic area (trunk,
roundhead, etc.) or otherwise. For photogrammetric and bathymetric clouds:

1. first cut the cloud by **block size** (volume);
2. then split it into sub-parts `p1`, `p2`, … of **500 meters maximum**, for
   smooth work.

![Point cloud to cut](../assets/images/prise-en-main/nuage_avant_pcv.png)

**Note:** keep the **full cloud** of each zone, before the `pX` cutting: it is
needed for the client deliverable.

!!! warning "Mandatory overlap"
    Always keep an overlap between two cut clouds, otherwise processing may
    produce errors.

#### 3.2.2. Subsample

For very dense photogrammetric data, resampling to **2 cm (0.02 m)** is
recommended for CloudCompare's smoothness and the computation time of the
automatic detection. Bathymetric or LiDAR data do not need resampling.

![Sampling window](../assets/images/prise-en-main/sampling_interface.png)

### 3.3. Point cloud display { #cloud-display }

Run the CloudCompare `PCV` function from the plugins toolbar:

![Point cloud after PCV](../assets/images/prise-en-main/nuage_apres_pcv.png)

!!! note "Before running these operations"
    - The point cloud to process must be **selected in the DB Tree**.
    - Follow the file naming convention (cutting, resampling, etc.): see
      [File formats](formats-fichiers.md#pcd-naming).
    - The cut, merge and sampling functions are detailed in
      [CloudCompare basics](cloudcompare.md#common-functions).

## 4. 3D model { #model }

### 4.1. Building a first 3D model { #first-model }

#### 4.1.1. Find blocks in a point cloud { #detection }

**Import** tab → [`Find blocks in a point cloud`](../modules/input.md#find-blocks-in-a-point-cloud)
(BlockFinder license):

![Find blocks in a point cloud](../assets/images/prise-en-main/etape411.png)

**The block type and volume are required** to run the detection correctly.

With two point clouds, run the detection on each one separately: the
algorithm is trained specifically for each block type and each cloud type,
and differs between photogrammetry and MBES. Several detections can run in
parallel, in separate CloudCompare windows.

Save the result (`find` milestone, see [§ 2.2](#save)).

!!! warning "Results to be filtered"
    The detection finds the true position of most blocks, but also produces
    a few misplaced blocks and misses others. Filtering and manual processing
    are therefore needed (see [Processing](#processing)).

!!! note "Detection rate"
    The detection rate depends on the quality of the input point cloud.
    Based on many trials on various projects, the automatic reconstruction
    rate exceeds 99% on a good photogrammetric cloud, and 95% on a good
    bathymetric or LiDAR cloud. It is lower on areas of poorer quality, such
    as the air-water interface or blocks partly hidden behind rock armour. If
    the rate is low on a standard area, check the quality of the point cloud.

#### 4.1.2. Without automatic detection: add an initial block

**Import** tab → [`Load init block`](../modules/input.md#load-init-block):
creates the first block of a project.

This action is used when automatic detection is not used for a block type,
when the license does not include BlockFinder, or to model a block with few
features, such as an Accroberm-type toe block.

![Load init block](../assets/images/prise-en-main/etape412.png)

Select the point cloud, then fill in the block type and volume. If the block
is not placed at the right spot, it must be moved (see
[Registration](#registration)). The following blocks are created one by one,
by duplicating an existing block and registering it (see
[Adding a missing block](#add-missing-block)).

### 4.2. Importing an existing 3D model { #existing-model }

#### 4.2.1. Importing a JSON

**Import** tab → [`Load JSON`](../modules/input.md#load-json): imports only
the 3D structure of an existing model.

![Load JSON](../assets/images/prise-en-main/etape421.png)

#### 4.2.2. Importing a BIN

The whole working session is imported: drag the `.bin` directly onto the
CloudCompare window.

### 4.3. Importing a second JSON { #merge }

JSON files sometimes need to be combined, for instance when block placement
went on in an area where a first model was built: the new model then
completes the first one.

Use [`Load JSON`](../modules/input.md#load-json). If the areas overlap, the
**Merge structures** window asks how to resolve conflicts:

![Merge structures](../assets/images/prise-en-main/Merge_structures.png)

- **Keep both blocks**;
- **Priority to new model**;
- **Priority to old model**.

The **distance threshold**, expressed as a proportion of the block size, sets
how close two blocks must be to count as a duplicate.

!!! tip "Points of attention"
    Pay particular attention to the **interfaces between different
    volumes**, the **waterline**, the **berm** and the **toe**.

If some blocks are not displayed, run
[`Update view`](../modules/header.md#update-view) (++ctrl+r++).

## 5. Block naming { #naming }

Before the placement plan is loaded, each block carries a unique number
assigned by default. For easier handling, the blocks need to be renamed.

### 5.1. Loading the placement plan { #placement-plan }

Loading the placement plan of the working area associates each block with a
target and a panel. **Edit** tab → [`Find names`](../modules/edit.md#find-names):

![Find names](../assets/images/prise-en-main/find_names.png)

### 5.2. Without a placement plan { #prefix-renaming }

To make blocks easier to identify, rename them with a prefix. **Select the
blocks to rename**, then **Metadata** tab →
[`Rename blocks with prefix (Batch)`](../modules/metadata.md#rename-blocks-with-prefix-batch).
Choose a prefix (by area or by volume, for instance) and the starting
number:

![Rename blocks with prefix](../assets/images/prise-en-main/Rename_prefix.png)

!!! warning
    Renaming replaces the panel and the block number: do not apply it to
    blocks already named from a placement plan.

**Note:** to sort blocks by name, select the folder holding all the blocks,
then right click → `Sort children by name (A-Z)`.

![Sorting blocks by name](../assets/images/prise-en-main/tri_nom.png)

## 6. Processing { #processing }

After automatic detection, the structure may hold true blocks but also false
ones. The quality control filters highlight them.

### 6.1. Spotting false or misregistered blocks { #spot-errors }

After a detection or a registration, the actions of the
[Quality control](../modules/quality.md) module check the consistency and
reliability of the model.

- [`Overlap`](../modules/quality.md#overlap) and
  [`Check for duplicates`](../modules/quality.md#check-for-duplicates)
  (nearest neighbor distance) highlight false blocks: overlaps and
  duplicates.

    ![Overlap](../assets/images/prise-en-main/legende_overlap.png)

    *Overlap highlights misplaced blocks that intersect each other.*

    ![Check for duplicates](../assets/images/prise-en-main/legende_local-density.png)

    *Check for duplicates highlights blocks with a high local density, often
    duplicates.*

- [`Compute accuracy`](../modules/quality.md#compute-accuracy) and
  [`Compute differential`](../modules/quality.md#compute-differential)
  (making sure the relevant point cloud is displayed) identify unreliable,
  hence misregistered, blocks that need particular attention.

    ![Accuracy and differential](../assets/images/prise-en-main/diff_projet.png)

    *Here, accuracy and differential highlight misregistered blocks.*

!!! note
    When applying these filters, keeping the 3D model displayed behind helps
    to see the defects.

**Recurring errors:**

- duplicates when merging two models with an overlapping area;
- false blocks from the automatic detection;
- long and short sides swapped when registering Accropode™ II units.

### 6.2. Removing false blocks { #remove-false-blocks }

#### 6.2.1. Manual filtering

False blocks highlighted by quality control can be removed by hand:

- [`Safe delete`](../modules/edit.md#safe-delete) (++ctrl+d++): deletes the
  selected blocks while keeping an undo point;
  [`Undo`](../modules/header.md#undo) (++ctrl+z++) restores them if needed.
- Deleting directly in CloudCompare (++del++ key) is **permanent**: there is
  no way back.

#### 6.2.2. Automatic filtering

Right after a detection, a first filtering removes most false blocks. **Edit**
tab → [`Filter blocks`](../modules/edit.md#filter-blocks):

![Filter blocks](../assets/images/prise-en-main/etape622.png)

Three criteria, each one can be turned on or off, quickly sort true and false
blocks:

- **Distance**: removes overlapping blocks closer than the threshold;
- **Accuracy**: removes inaccurate blocks, based on their median score;
- **Point count**: removes blocks built on too few points.

![Filter blocks window](../assets/images/prise-en-main/filter_block.png)

The **Accuracy** criterion requires running
[`Compute accuracy`](../modules/quality.md#compute-accuracy) first. Filtering
does not delete blocks permanently: it can be reverted with
[`Undo`](../modules/header.md#undo) (++ctrl+z++).

Save the result (`filtered` milestone, see [§ 2.2](#save)).

### 6.3. Adding a missing block { #add-missing-block }

1. Select an existing block close to the missing one.
2. Duplicate it with the CloudCompare `Clone` function.
3. Move it as close as possible to the expected position (make sure to
   confirm at the end of the move).
4. Register it with [`Register selection`](../modules/edit.md#register-selection---adaptive-dist)
   (++ctrl+e++), see [Registration](#registration).

CloudCompare's basic functions (clone, move, etc.) are covered in
[CloudCompare basics](cloudcompare.md#common-functions).

If the block exists on the structure but cannot be modeled from the cloud,
use [`Mark missing block`](../modules/edit.md#mark-missing-block) instead.

### 6.4. Registration { #registration }

To register blocks found by the detection, reworked or added by hand:

1. Select the block and use the CloudCompare move function.
2. Place the block as close as possible to the expected position and confirm
   the position in the move window:

    ![Moving a block](../assets/images/prise-en-main/deplacement.png)

    During the move, the ++space++ bar pauses the block, so you can change
    the viewing angle for a better placement.

3. Run [`Register selection`](../modules/edit.md#register-selection---adaptive-dist)
   (++ctrl+e++). Once registered, the block takes a color reflecting the
   registration accuracy, from red to green:

    ![Registered block](../assets/images/prise-en-main/adaptive_register.png)

    *Here, the block turned dark green: good registration.*

If the point cloud is noisy, the **Custom distance** mode of
[`Register selection`](../modules/edit.md#registration-modes) forces a
maximum distance between the block and the cloud. The block must then be
moved to its exact position beforehand.

Alternatively, [`Help register`](../modules/edit.md#help-register) opens a
panel to translate or rotate the selected block, then registers it on
confirmation. If a block stays misplaced, remove it with
[`Safe delete`](../modules/edit.md#safe-delete).

!!! warning
    Only add blocks when their position is certain.

## 7. Quality control { #quality-control }

Quality control is essential to rebuild a 3D model correctly. As detailed
above, each filter has its role.

### 7.1. Compute accuracy { #accuracy }

[`Compute accuracy`](../modules/quality.md#compute-accuracy) first gives an
idea of the registration accuracy relative to the point cloud. Blocks
showing in red and yellow need further registration.

When the point cloud is noisy or of lower quality, accuracy drops: blocks
along the waterline then stand out.

### 7.2. Compute differential { #differential }

[`Compute differential`](../modules/quality.md#compute-differential)
highlights the differences between the registered 3D model and the point
cloud. Areas showing in yellow or red point to a problem and can be
re-registered (often misidentified appendices, or long and short sides
swapped on Accropode™ II units).

!!! note
    Hide the 3D model to clearly see the areas showing in red and yellow.

### 7.3. Check for duplicates { #duplicates }

[`Check for duplicates`](../modules/quality.md#check-for-duplicates) computes
the distance from each block to its nearest neighbor. A red block points to a
potential duplicate. To check it, play with the display of the selection:
select the block, then press ++a++ or ++v++. If a block is still visible, it
is a duplicate: one of them can be deleted.

### 7.4. Overlap { #overlap }

[`Overlap`](../modules/quality.md#overlap) identifies overlapping blocks. They
need particular attention, as they reveal a poor registration, or a broken
unit and therefore movement in the area.

The [Quality control](../modules/quality.md) module details these actions.

Once the version has been checked, save it (`manual_n_AB` milestone, see
[§ 2.2](#save)). Any remaining corrections go into a new `manual_n+1`
version.

## 8. Analysis filters { #filters }

For the analysis and monitoring of structures, some areas may be more exposed
or more sensitive than others, and change over time (settlement, storm,
etc.). SEABIM Editor's filters are an aid to analysis and control: they
highlight these areas, identify points of interest and make the analysis
easier for a specialist.

!!! warning "An aid to analysis"
    These are only computation and analysis aid tools: they give a trend,
    but can in no way give a firm and final conclusion on whether an area is
    compliant.

### 8.1. Filter parameters { #filter-parameters }

Filter parameters are edited in [`Settings`](../modules/header.md#settings)
(++ctrl++,). This is where you change, for instance, the expected tolerance
for an out-of-profile or for the voids computation.

### 8.2. Filter results { #filter-results }

The filters of the [Filters](../modules/filters.md) module generate scalar
fields. The result is shown on the 3D model at the end of the computation,
stored in the metadata of each block, and can be viewed again:

- with [`Change color scale`](../modules/header.md#change-color-scale)
  (++ctrl+l++), which also lets you adapt each filter's color scale to the
  project. Checking **Save as default for this scalar field** keeps the
  change on this computer;
- in the CloudCompare Properties window, `Scalar Fields` section: the arrow on
  the right opens the list of the selection's scalar fields. This only works
  for a single selected block in a working session;

    ![Scalar fields in the properties](../assets/images/prise-en-main/proprietes_sf.png)

- in the final render, by changing the display of the whole 3D model in the
  Properties window, as above;
- with [`Show metadata (Block)`](../modules/metadata.md#show-metadata-block)
  (++ctrl+m++), which gathers all the numerical values of the applied
  filters.

!!! note "Check the console"
    To confirm that a function completed without error, check the console at
    the bottom of the CloudCompare window: `Process finished` must appear at
    the end of the operation, otherwise the error is detailed there.

## 9. Assemble and verify { #verification }

Once all sub-parts have been processed:

1. Reassemble the complete project: full point clouds and the models of the
   different parts (`bathy` and `photog`, different block sizes), merged with
   [`Load JSON`](../modules/input.md#load-json) (see [§ 4.3](#merge)).
2. Run the differential, the duplicate check and the overlap on the whole
   model (see [Quality control](#quality-control)).
3. Adjust if needed, making sure to use **the right cloud** for any new manual
   edit.

Pay particular attention to the **interfaces between different volumes**, the
**waterline**, the **berm** and the **toe**.

## 10. Exports and deliverables { #exports }

All filters must be run or displayed before exporting. Without a placement
plan, first reindex the blocks with
[`Rename blocks with prefix (Batch)`](../modules/metadata.md#rename-blocks-with-prefix-batch)
to get continuous numbering (see [§ 5.2](#prefix-renaming)).

Exports are done from the [Export](../modules/output.md) module:

- [`Export CSV`](../modules/output.md#export-csv), in **Standard format**: a
  list of all blocks and their associated information.
- [`Export CSV`](../modules/output.md#export-csv), in **Custom selection**:
  you choose the fields to export (positions, filters, name, etc.).

    ![Export CSV with custom selection](../assets/images/prise-en-main/export_custom_CSV.png)

- [`Export final render`](../modules/output.md#export-final-render): the
  project can then be viewed directly in CloudCompare, without SEABIM
  Editor. You choose the information exported in the final render:

    ![Export final render](../assets/images/prise-en-main/export_final_render.png)

## 11. Viewing a final render { #final-render }

A final render is viewed directly in CloudCompare, without launching SEABIM
Editor. It contains:

- a 3D section:
    - the 3D model and the scalar fields chosen at export;
    - the layer from the voids computation;
    - the layer from the density computation;
    - the layer from the displacement computation;
- the point cloud and the associated differential.

Example:

![Final render tree](../assets/images/prise-en-main/arborescence_finalrender.png)

!!! note
    For the export of adjacent blocks, do not export the filters: only check
    `panel`.

In the final render, block display applies to the whole 3D model: changing
the scalar field in the CloudCompare Properties window applies to the entire
model.
