# Home page

The **`Home`** tab is the first tab of the SEABIM Editor launcher. It holds no
action on the structure: it is the plugin **status** page (version, license,
active options) and the access point to the **documentation**, the **updates**
and the **legal documents**.

![Home page](../assets/images/cc_home.png)

## Displayed information

- **Version** of the installed plugin (`vX.Y.Z`).
- **License status**: the validity window of the software license, and — if
  included — the **Blockfinder** and **Sync** licenses. If the license is
  invalid, **`Not activated`** is shown in red and the module tabs stay greyed
  out (see [License activation](activation-licence.md)).
- **Optional badges**:
    - **LAB version activated** — block volumes are expressed in cm³ and the
      scales are experimental.
    - **Imperial units (feet)** — the working length unit is the foot (see
      [`Switch to meters / feet`](../modules/header.md#switch-units)).

## Links

- **Open documentation** — opens this site in the browser, in the current
  language.
- **Check for updates** — see [below](#updates).
- **Terms of use** / **Maintenance conditions** — open the legal documents in a
  dedicated window.
- **Language** — French / English / العربية selector; the launcher is
  re-translated immediately.

## Updates { #updates }

The **`Check for updates`** button queries the SEABIM update server. A **valid
license is required**: without one, a warning is shown and no network call is
made.

!!! info "Automatic check at startup"
    The plugin also checks for an update **at launch**. If a newer version
    exists, the window below opens automatically. Choosing "Later" stops it
    from popping up again for the current session.

Possible check outcomes:

- **No update** / **you are using the latest version** — informational message,
  nothing to do.
- **Network / server / authentication error** — a message explains the cause
  (connection, server unavailable, installation refused…); retry later or
  contact support depending on the case.
- **Update available** — the **`Update available`** window opens.

### Update procedure

When a new version is available:

1. The window shows the **new version number**, the current version and the
   **release notes**.
2. **Save your work** (a [`Save JSON`](../modules/output.md#save-json)) and get
   ready to **close CloudCompare** — the installer cannot run while the plugin
   is running.
3. Click **`Download`** (or **`Later`** to postpone).
4. Choose **where** to save the `.exe` installer. The download starts with a
   progress bar.
5. Once the `.exe` is downloaded, **close CloudCompare**, then **run the
   installer** to apply the update (see [Installation](installation.md)).

![Update available](../assets/images/cc_update_available.png)

!!! note "Authenticated download"
    The installer download goes through the plugin (it attaches your
    workstation's `X-API-KEY`). It is therefore not possible to fetch it
    directly from a browser.
