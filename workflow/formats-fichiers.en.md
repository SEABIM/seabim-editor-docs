# File formats

SEABIM Editor requires the manipulation of several file types. Using the
right formats is required to ensure the software works correctly.

## Point clouds { #point-clouds }

Point clouds hold a set of coordinates in space, sometimes with extra
information: colors, scalar fields or normals.

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

### Optional keys

| Key               | Description                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `plot_number`     | Block plot number.                                                                                                 |
| `bloc_number`     | Block target number.                                                                                               |
| `source`          | Way the block was produced.                                                                                        |
| `cloud`           | Name of the cloud used to obtain the block's position.                                                             |
| `correspondences` | Number of correspondence points between the model and the cloud for the block during the detection phase.          |
| `median_score`    | Median distance of the points located within a given distance of the block.                                        |
| `count_score`     | Number of points located within a given distance of the block.                                                     |

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

The [Edit](../modules/edit.md) module also uses placement plan CSVs
(action [`Find names`](../modules/edit.md#find-names)) to assign panel /
block numbers from a placement plan.

## CloudCompare BIN files

CloudCompare BIN files are CloudCompare's native save files. They serve
to save a CloudCompare scene, possibly holding one or several point
clouds or 3D models. 3D models and renders produced by SEABIM Editor are
written in this format.

These files can be opened or dropped directly into a CloudCompare window.
