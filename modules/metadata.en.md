# Metadata

The **Metadata** module groups the tools for **editing block metadata**:
changing a parameter value, renumbering, and consulting / fine-editing
a single block.

The 5 actions are split into three categories:

- **Batch**: acts on every block currently selected in the CloudCompare
  scene.
- **Block**: acts on the single selected block.
- **Statistics**: read-only count, over the selection or the whole scene.

## Change parameter (Batch) { #change-parameter-batch }

**Category: Batch**

Updates a **single parameter** on every selected block at once. Useful to
homogenize a field (for example `block_type`, `package`, or any other
metadata attribute) over an entire zone.

![Change parameter](../assets/images/cc_meta_change.png)

!!! warning "Destructive action"
    The operation overwrites the previous value on every affected block.
    Save (action [`Save JSON`](output.md#save-json)) before a large batch,
    and use [`Undo`](header.md#undo) if you need to roll back.

## Rename blocks with prefix (Batch) { #rename-blocks-with-prefix-batch }

**Category: Batch**

Applies a **prefix** to the selection and **reindexes** the blocks behind
that prefix. This is the **batch renaming** operation typically used at
the end of processing to produce a clean final naming before the delivery
render.

![Rename blocks with prefix](../assets/images/cc_meta_prefix.png)

Example: `B-0001`, `B-0002`, … for every selected block, where `B-` is
the prefix and `0001`, `0002`… is the sequential index.

!!! note "Prerequisite for the final render"
    This action is mentioned in the [standard
    procedure](../workflow/procedure-courante.md#final-render) as the
    **reindexing** step preceding [`Export final
    render`](output.md#export-final-render). It guarantees that the final
    numbering is continuous and gap-free.

## Metadata editor (Block) { #metadata-editor-block }

**Category: Block**

Opens an editor that lets you **modify any metadata field** of the
selected block. Where [`Change parameter
(Batch)`](#change-parameter-batch) targets one field at a time across N
blocks, this action targets N fields at a time on a single block.

The editor also exposes a **`Validation status`** selector that sets the
block's validation state among three values:

- **Invalid** (`0`) — rejected block.
- **Pending** (`1`) — awaiting review.
- **Valid** (`2`) — validated block.

This status is shared with the cloud viewer and used to track the quality
review.

![Metadata editor](../assets/images/cc_meta_edit.png)

### Comments log { #comments-log }

The **`Comments`** field keeps a timestamped log per block. Each entry
carries its date, its author and its type: either a free comment, or an audit
event written automatically on every `Validation status` change.

- **Post**: type the text, then click **`Send`** or press ++enter++. The
  comment is written immediately, without going through `Save values`. Text
  left in the field is not a comment: it is discarded when you change block,
  with a warning.
- **Edit**: the ✎ icon of an entry reopens its text. The original date and
  author are kept.
- **Delete**: the × icon removes the entry, after confirmation.

Validation audit events carry neither ✎ nor ×: they record the status history
and cannot be altered.

### Comment author { #comment-author }

On your first post, a dialog asks for the **display name** to use as the
author. It is stored in the preferences (`comment_author` parameter, editable
at any time with ++ctrl++,) and is also used for validation audit events.
Declining to give a name cancels the post.

This name is declarative: it identifies the operator, it does not
authenticate them. Anyone can edit or delete anyone's comments.

## Show metadata (Block) { #show-metadata-block }

**Category: Block · Shortcut: ++ctrl+m++**

Displays in read-only mode the metadata of the selected block, **grouped
by category** (`Base`, `Filter`, `Other`). Quick consultation action
with no risk of modification.

![Show metadata](../assets/images/cc_meta_view.png)

## Block counts { #block-counts }

**Category: Statistics**

Counts blocks **by type**, **by package** and **by plot**, plus a **by JSON**
tab (top-level DB tree folder created by [`Load JSON`](input.md#load-json)).

- **Nothing selected**: every JSON in the scene.
- **One or more JSON folders selected**: only their blocks. A panel group or a
  few blocks can be selected too.

Each table adds up to the total shown at the top: blocks without a value are
counted on the `(not set)` row. Clicking a column header sorts by value or by
count. The action changes nothing.
