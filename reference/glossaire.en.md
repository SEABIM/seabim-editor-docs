# Glossary

Business and technical terms used throughout the SEABIM Editor documentation.

## A

**Accuracy**
:   Median distance between the reference cloud points around a block and
    the block's surface. Main metric for fidelity to the survey. Computed
    by [`Compute accuracy`](../modules/quality.md#compute-accuracy).

**Adaptive dist**
:   Threshold distances that vary by context (block type, neighborhood)
    used by the automatic registration [`Register selection - Adaptive
    dist`](../modules/edit.md#register-selection---adaptive-dist). Defined
    in `parameters.json`.

**As-Design**
:   Project folder holding the theoretical placement plans of the breakwater.

## B

**Berm**
:   Horizontal or low-slope section of a breakwater, at the crest or at a
    slope break.

**BIN (CloudCompare)**
:   CloudCompare's native save format, able to hold a full scene (clouds
    + 3D models). See [File
    formats](../workflow/formats-fichiers.md#cloudcompare-bin-files).

**BlockFinder**
:   Automatic block detection algorithm running on a point cloud (action
    [`Find blocks in a point
    cloud`](../modules/input.md#find-blocks-in-a-point-cloud)). Gated by
    the WIBU license.

**Block**
:   Structural element of a breakwater (accropode, X-bloc, cube, …). SEABIM
    work is about positioning each block in space from a point cloud.

**Toe** _(butée de pied)_
:   Lowest section of a breakwater, in contact with the seabed. A focus
    area during the verification step ([standard procedure §
    Verification](../workflow/procedure-courante.md#verification)).

## C

**Checkpoint**
:   Snapshot of the structure pushed before every modification, allowing
    rollback via [`Undo`](../modules/header.md#undo) (++ctrl+z++).

**CloudCompare**
:   Open-source point-cloud manipulation software. SEABIM Editor runs as a
    **plugin** of CloudCompare 2.13.

**CodeMeter / WIBU**
:   USB-key licensing system used by SEABIM Editor for activation and
    feature enablement. See [License
    activation](../demarrage/activation-licence.md).

**Contacts**
:   Number of neighboring blocks in direct contact with a given block.
    Filter computed by [`Contacts (All
    blocks)`](../modules/filters.md#contacts-all-blocks).

**Cycle (training)**
:   Training unit of the V2 detection algorithm. A cycle contains 100
    samples of the cloud, each covering about ten blocks.

## D

**Displacement**
:   Movement of a block between two consecutive surveys. Computed by
    [`Displacement`](../modules/filters.md#displacement). Stored in absolute
    value; viewable and exportable in three **reference scales**: `Absolute`,
    `H` (relative to block size) or `DN` (relative to nominal diameter).

## F

**Feature Map**
:   Set of feature bits enabled by the client's WIBU license. Conditions
    the visibility of some actions (e.g. BlockFinder).

**Filter**
:   Scalar field computed on the blocks to qualify their placement (out
    profile, contacts, overlap, …). See [Filters
    module](../modules/filters.md).

## J

**JSON (structure)**
:   Main storage format for a SEABIM Editor structure. See [Structure JSON
    file](../workflow/formats-fichiers.md#json-structure).

## L

**Launcher**
:   PyQt5 window opened when clicking the SEABIM Editor button in
    CloudCompare. Centralises all actions, organised by tabs.

**Batch**
:   Action category in the [Metadata](../modules/metadata.md) module
    acting on all selected blocks at once (e.g. [`Change parameter
    (Batch)`](../modules/metadata.md#change-parameter-batch)).

**Waterline**
:   Level where the breakwater crosses the mean sea level. Focus area for
    bathy/photog placement coherence.

## M

**MBES (Multibeam Echosounder)**
:   Multibeam bathymetric survey, typical source for the submerged part of
    the breakwater.

**Module**
:   Group of actions by domain, exposed as a tab in the launcher (Import,
    Edit, Quality control, Filters, Metadata, Export).

## N

**Point cloud (PCD)**
:   Set of 3D points coming from a survey. The cloud is loaded **by
    CloudCompare** (any format it can read: PCD, LAS, BIN, …); `.pcd` is the
    **recommended delivery** format, not a plugin constraint. See [File
    formats](../workflow/formats-fichiers.md#point-clouds).

## O

**Offset**
:   Translation applied to switch from local coordinates (used internally
    for precision) to global coordinates.

## P

**Package**
:   Logical grouping of several **panels** under a common business name.

**Panel**
:   Logical grouping of blocks sharing a `plot_number`. Used by [`Group /
    Ungroup`](../modules/edit.md#group--ungroup).

**Photog (photogrammetry)**
:   Photogrammetric survey, typical source for the emerged part of the
    breakwater.

**Plot**
:   Theoretical position of a block on the placement plan. Identified by a
    `plot_number`.

## R

**Registration**
:   Realignment of a block on the point cloud to refine its position.
    Main action of the [Edit module](../modules/edit.md).

**Overlap**
:   Volume of intersection between two neighboring blocks, expressed as a
    fraction of the block volume. Computed by
    [`Overlap`](../modules/quality.md#overlap).

**Final render**
:   CloudCompare BIN files generated at the end of a project, ready for
    delivery. See [`Export final
    render`](../modules/output.md#export-final-render).

## S

**Median score**
:   Synonym of **accuracy**.

**Structure**
:   Set of blocks making up a reconstructed breakwater. Saved as JSON.

## T

**Slope**
:   Inclined face of a breakwater. The slope normal is used as a reference
    by the [`Perpendicular
    nose`](../modules/filters.md#perpendicular-nose) and [`Perpendicular
    anvil`](../modules/filters.md#perpendicular-anvil) filters.

## V

**Voids**
:   Unexpected aeration cavities inside the structure. Detected by
    [`Voids`](../modules/filters.md#voids).
