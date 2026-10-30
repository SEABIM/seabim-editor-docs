# File formats

SEABIM Editor requires the manipulation of several file types. Using the
right formats is required to ensure the software works correctly.

!!! warning "No spaces or special characters"
    Spaces and special characters in file names can make some functions crash
    on launch. Also save the CloudCompare project in a folder whose path
    contains none.

## Point clouds { #point-clouds }

Point clouds hold a set of coordinates in space, sometimes with extra
information: colors, scalar fields or normals.

!!! note "Loading delegated to CloudCompare"
    The cloud is **loaded by CloudCompare**, which reads many formats (PCD,
    LAS, BIN, …). SEABIM Editor then works on the cloud already present in
    the scene. The `.pcd` below is the recommended **naming / delivery**
    convention, not a technical constraint of the plugin.

The cloud must be in a format CloudCompare can read (XYZ, LAS/LAZ, E57, PCD,
etc.). RCP/RCS files from the Autodesk suite cannot be imported directly into
CloudCompare.

### Recommended naming convention { #pcd-naming }

For point clouds coming from a survey and fed into SEABIM:

```text
PROJECT_YYYYMMDD_COMPANY_SOURCE_Vm3_SECTION_subsampleYcm_pX.pcd
```

| Field          | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| `PROJECT`      | Project name.                                                                     |
| `YYYYMMDD`     | Survey date.                                                                      |
| `COMPANY`      | Company that performed the acquisition.                                           |
| `SOURCE`       | Cloud type: `mbes`, `lidar` or `photog`.                                          |
| `V`            | Block volume in the zone (in m³).                                                 |
| `SECTION`      | Breakwater section (`MAIN_EXT`, `MAIN_INT`, …).                                   |
| `subsampleYcm` | Optional. Subsampling distance if the cloud was subsampled.                       |
| `pX`           | Optional. Part number if the cloud has been split into several sub-sections.       |

## Structure JSON file { #json-structure }

Structure files, in JSON format, hold all the information of the blocks
making up a breakwater reconstructed with SEABIM Editor, as a dictionary.

Each block is associated with a unique number from which the following
information can be extracted.

### Keys present for every block

| Key            | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `block_type`   | Block type.                                                                                                                              |
| `block_volume` | Block volume in m³.                                                                                                                      |
| `block_size`   | Block size in m.                                                                                                                         |
| `offset`       | Translation to bring the block back to global coordinates. Positions are described in a local frame to avoid precision loss.             |
| `translation`  | Block position in the local frame after subtracting the global offset.                                                                   |
| `rotation`     | Block rotation matrix relative to the reference block.                                                                                   |
| `version`      | Version of SEABIM Editor that loaded the block into the scene.                                                                           |

### Optional keys

| Key               | Description                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `plot_number`     | Block plot number.                                                                                                 |
| `block_number`    | Block target number.                                                                                               |
| `block_name`      | Block name in the CloudCompare DB Tree, for instance after renaming with a prefix.                                 |
| `source`          | Way the block was produced.                                                                                        |
| `cloud`           | Name of the cloud used to obtain the block's position.                                                             |
| `correspondences` | Number of correspondence points between the model and the cloud for the block during the detection phase.          |
| `median_score`    | Median distance of the points located within a given distance of the block.                                        |
| `count_score`     | Number of points located within a given distance of the block.                                                     |
| `nb_points`       | Number of cloud points matched with the block during automatic detection.                                          |
| `fitness`         | Share of matched points during the detection registration, between 0 and 1.                                       |
| `rmse`            | Root mean square error of the matches during the detection registration.                                          |

Values associated with the various control filters ([Filters
module](../modules/filters.md), [Quality control
module](../modules/quality.md)) are also stored in the structure file.

### Recommended naming convention { #json-naming }

For structure files during day-to-day operations:

```text
YYYY-MM-DD_hh.mm.ss_SOURCE_Vm3_SECTION_pX_PROGRESS.json
```

| Field                 | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `YYYY-MM-DD_hh.mm.ss` | Date and time of generation.                             |
| `SOURCE`              | Cloud type: `mbes`, `lidar` or `photog`.                 |
| `V`                   | Block volume (m³).                                       |
| `SECTION`             | Breakwater section (`MAIN_EXT`, `MAIN_INT`, …).          |
| `pX`                  | Optional. Part number if the cloud was split.            |
| `PROGRESS`            | See table below.                                         |

#### Progress values

| Value            | Meaning                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `find`           | After automatic registration.                                                                                                                                                      |
| `filtered`       | After score-based filtering.                                                                                                                                                       |
| `manual_n`       | Version `n` of the manual registration.                                                                                                                                            |
| `manual_n_AB_CD` | Version checked with filters and differential by `AB` and `CD` (initials of the people who did the check). Append initials over time.                                              |

If a fix is needed after the check, create a new `manual_n+1` file with
the corrections.

## CSV files { #csv-files }

CSV files are used for **importing** and **exporting** blocks (actions
[`Import CSV`](../modules/input.md#import-csv) and [`Export
CSV`](../modules/output.md#export-csv)). They typically hold one row per
block with, in columns, the metadata to transfer (coordinates, plot
number, type, etc.).

On import, columns are recognised by their header rather than by their
position: the editor's export formats can be re-imported, as can a third-party
file whose columns come in a different order. A POSIBLOC or custom export comes
back identical; a VOSS export carries no volume column (it is then entered in
the import dialog) and writes normalised angles, so re-imported orientations
differ from the original ones.

A file without a header row is accepted: its columns are then named `a1`, `a2`,
… and assigned by hand. A column concatenating two fields (`P12-A-01`) can be
split on a separator, and both parts are assigned like ordinary columns.

The [Edit](../modules/edit.md) module also uses placement plan CSVs
(action [`Find names`](../modules/edit.md#find-names)) to assign panel /
block numbers from a placement plan. Such a plan is read with the same column
mapping as the import: `NumSection`, `NumBlock`, `X` and `Y` are needed, `Z` and
`NumPrefa` are optional, and their names as well as their order are free.

## CloudCompare BIN files

CloudCompare BIN files are CloudCompare's native save files. They serve
to save a CloudCompare scene, possibly holding one or several point
clouds or 3D models. 3D models and renders produced by SEABIM Editor are
written in this format.

These files can be opened or dropped directly into a CloudCompare window.

To keep the interface smooth, keeping a `.bin` under **900 MB** is
recommended. To do so, a point cloud can be cut to the working area or
resampled (see [CloudCompare basics](cloudcompare.md#sampling)).

!!! warning "Saving the whole project"
    CloudCompare does **not** save a working session like a standard
    software: it saves **what is selected** in the DB Tree. A point cloud or a
    3D layer can thus be saved separately. To save the whole project, **select
    the root folder of the project**, then click Save.
