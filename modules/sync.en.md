# Sync

The **Sync** module exchanges the project structure (the blocks JSON) with
the **SEABIM cloud API**. It lets you fetch a structure stored on the server
or publish the current structure to it.

!!! note "License-gated tab"
    The `Sync` tab appears **only if the matching license bit is active**
    (see [License activation](../demarrage/activation-licence.md)). If it is
    missing from your launcher, your license does not include this option.

## Credentials { #credentials }

Two fields must be filled in; **no value is provided by default**:

- **API URL** — the address of the SEABIM server `json-api` endpoint,
  provided to you by SEABIM.
- **API key** — the `X-API-KEY` token provided to you by SEABIM (masked on
  input).

The **`Save credentials`** button persists both values to `parameters.json`
(`sync_api_url`, `sync_api_key`) in your user data folder, so they are kept
across sessions. Both values are **required** to enable download and upload.

## Download { #download }

Fetches the JSON structure stored on the server and **applies it into the
CloudCompare scene**, exactly like a [`Load JSON`](input.md#load-json). The
loaded structure replaces the current history (the undo stack is reset to
that state).

## Upload { #upload }

Serializes the **current structure** and sends it to the server (POST).

!!! warning "Server-side overwrite"
    Upload **overwrites the structure stored on the server**. A confirmation
    is requested before the operation. If there is no block to upload, the
    action reports it and sends nothing.

## Technical notes

- HTTP calls are **synchronous**: the launcher may freeze for one or two
  seconds during the transfer, like the other plugin actions.
- The module depends on the Python **`requests`** library (installed by the
  installer). If it is missing, an explicit error message is shown.
