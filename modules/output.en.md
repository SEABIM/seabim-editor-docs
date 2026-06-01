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

Generates a **final render** as CloudCompare BIN files ready for
delivery, integrating the quality control filters.

![Export final render](../assets/images/cc_export_final.png)

!!! note "Final step of the workflow"
    This action is the final step described in the [standard
    procedure](../workflow/procedure-courante.md#final-render). It is
    preceded by a **reindexing** (action [`Rename blocks with prefix
    (Batch)`](metadata.md#rename-blocks-with-prefix-batch) of the
    [Metadata](metadata.md) module) which ensures continuous numbering
    without gaps before delivery.
