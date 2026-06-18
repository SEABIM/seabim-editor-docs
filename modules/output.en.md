# Export

The **Export** module groups the **output** actions: saving the current
structure as JSON, CSV export (standard or custom columns), and
generation of the final render ready for delivery.

## Save JSON { #save-json }

Saves the current structure to a JSON file. The format is the one
described in section [Structure JSON
file](../workflow/formats-fichiers.md#json-structure).

!!! tip "Frequent saving recommended"
    The SEABIM Editor module keeps an `autosave.json` in the data folder,
    but a manual save named after the
    [nomenclature](../workflow/formats-fichiers.md#json-naming)
    is essential at the work milestones (`find`, `filtered`, `manual_n`).

## Export CSV { #export-csv }

Exports the structure's blocks to CSV. The action covers two cases in a
unified dialog:

- **Standard**: the usual columns (position, type, volume, plot, block)
  for exchange with another tool.
- **Custom**: free selection of columns to export based on the metadata
  present in the structure.

![Export CSV (step 1)](../assets/images/cc_export_csv_1.png)
![Export CSV (step 2)](../assets/images/cc_export_csv_2.png)

## Export final render { #export-final-render }

Generates the **final delivery render** as **CloudCompare BIN** files, split
into parts. A dialog lets you choose precisely **which blocks** to export,
**how** to split them and **which fields** to keep.

![Export final render](../assets/images/cc_export_final.png)

### Splitting options

| Option                       | Effect                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| `Blocks per part`            | Number of blocks per BIN file. Pre-filled from the parameters (`n_blocks_final_render`), editable here. |
| `Group by panel`             | Names each part after its **panel** (e.g. `M24`) instead of `Part 1`, `Part 2`… On by default.         |
| `Sort blocks alphabetically` | Orders the blocks within each part. On by default.                                                     |

!!! note "Oversized panels"
    In "Group by panel" mode, if a panel exceeds the blocks-per-part limit, a
    window offers to **split** it (`M24`, `M24_2`…) or **keep it whole** (a
    single part for that panel).

### Selection filters

When the structure contains **several types** or **several volumes** of blocks,
**`Block types`** and **`Volumes`** sections appear: only blocks whose **type
AND volume** are checked are exported. If there is only one type (or volume),
the matching section is hidden and all blocks are kept on that side.

### Fields to export

Scalar fields are grouped into collapsible sections: **Block main properties**
(`panel`), **Quality control**, **Placement filters**, **Displacement** and
**Other**. Check the ones to keep in the delivered render. A field **not
computed** on the blocks appears greyed out and marked "(not computed)": there
is nothing to export for it.

![Final render dialog](../assets/images/cc_export_final_modal.png)

!!! note "Final step of the workflow"
    This action is the final step described in the [standard
    procedure](../workflow/procedure-courante.md#final-render). It is
    preceded by a **reindexing** (action [`Rename blocks with prefix
    (Batch)`](metadata.md#rename-blocks-with-prefix-batch) of the
    [Metadata](metadata.md) module) which ensures continuous numbering
    without gaps before delivery.
