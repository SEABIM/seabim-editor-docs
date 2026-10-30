# CloudCompare basics

CloudCompare is a free 3D visualization software. SEABIM Editor is a Python
plugin used from within the CloudCompare interface.

CloudCompare download: <https://www.danielgm.net/cc/release/> (see also the
[Installation](../demarrage/installation.md) page).

## General interface { #interface }

The CloudCompare interface is split into several windows:

![CloudCompare interface](../assets/images/prise-en-main/interface_CC.png)

1. **DB Tree**: all the data loaded in the `.bin` working session, organized
   in folders and layers. **Every checked layer is shown in the 3D view.** The
   arrow left of a name expands the folder or layer to show its content.
2. **Properties** of the selected layer: this is where you change the scalar
   field displayed on a 3D model, switch a point cloud from **RGB** display to
   **scalar field** display, and show or edit the color scale.
3. **Console** of running and past actions. It lets you follow the steps of a
   function: every function must end with `Process finished`. If an error
   occurs, it is reported here.
4. **SEABIM Editor launcher**, which gives access to the plugin functions (see
   [Interface](../demarrage/interface.md)). It opens with the
   ![SEABIM Editor icon](../assets/images/prise-en-main/lancement_seabim.png){ .off-glb }
   icon of the plugins toolbar, on the right.
5. Main **3D view**, where you move around and zoom.

!!! note "Display smoothness"
    The more data a project holds, the heavier it gets and the less smooth
    the navigation. The 3D view may lag when too many layers are checked:
    **uncheck** those not needed for the analysis or outside the study area.

## Importing a point cloud { #import }

To import a point cloud, drag and drop the file onto the CloudCompare main
window.

### Coordinate system and offset { #offset }

CloudCompare **does not handle** coordinate systems or reprojection. The XY
coordinates of the cloud must therefore be projected in a planimetric
reference frame specific to the project and expressed in meters (or in cm or
mm for a physical model in a laboratory). Latitude and longitude coordinates
in degrees are not interpreted.

To handle fewer significant digits, CloudCompare offers an **offset**
(`Global shift`) at import, which brings the cloud closer to the origin of the
reference frame. Without an offset, or with an offset that does not reduce the
number of significant digits enough, the cloud may look distorted.

- The suggested offset **can be adjusted** by the operator.
- It is set when importing the first cloud and **must be applied identically**
  when importing every new cloud: with a different offset, the second cloud is
  shifted relative to the first one.
- Applying an offset in **XY** only, not in Z, is recommended to avoid any
  confusion.

**There is therefore one offset per project.**

!!! note "Offset and export"
    CloudCompare thus creates a local frame close to the origin. The offset
    is stored for every layer of the project and applied back automatically
    on export. Naming layers in detail tells you which coordinate system and
    which vertical reference each one is expressed in.

### Moving around in the 3D view { #navigation }

| Gesture                       | Effect                                                   |
| ----------------------------- | -------------------------------------------------------- |
| Right click held              | Pan in the screen plane (up, down, left, right).         |
| Left click held               | Rotate around the pivot point.                           |
| Double click on an element    | Sets the rotation pivot point.                           |
| Mouse wheel                   | Zoom in and out.                                         |

### Subsampling { #sampling }

For smoother work, subsampling very dense photogrammetric clouds to
**0.02 m** is recommended. The sampling tool is available once the cloud is
selected:

![CloudCompare sampling tool](../assets/images/prise-en-main/sampling.png)

## Common functions { #common-functions }

Main CloudCompare functions used on a SEABIM project:

![Common CloudCompare functions](../assets/images/prise-en-main/CC.png)

| No. | Icon | Function | Role |
| --- | ---- | -------- | ---- |
| 1   | ![Clone](../assets/images/prise-en-main/fonctiob_clone.png){ .off-glb } | Clone | Duplicates the selection. |
| 2   | ![Scissors](../assets/images/prise-en-main/ciseau.png){ .off-glb } | Scissors (`Segment`) | Cuts areas out of the point cloud, to process areas differently or lighten the project by removing data outside the working area. |
| 3   | ![Auto-pick rotation center](../assets/images/prise-en-main/auto_pick_rotation.png){ .off-glb } | `Auto-pick rotation center` | Puts the rotation center at the center of the view. |
| 4   | ![SEABIM Editor](../assets/images/prise-en-main/python.png){ .off-glb } | SEABIM Editor | Opens the SEABIM Editor launcher. |
| 5   | ![Save](../assets/images/prise-en-main/save.png){ .off-glb } | Save | Saves the selection: select the root folder to save the whole working session (see [CloudCompare BIN files](formats-fichiers.md#cloudcompare-bin-files)). |
| 6   | ![Zoom](../assets/images/prise-en-main/zoom.png){ .off-glb } | Zoom | Zooms on the selection. |
| 7   | ![Delete](../assets/images/prise-en-main/delete.png){ .off-glb } | Delete | **Permanently** deletes the selection. For blocks, prefer [`Safe delete`](../modules/edit.md#safe-delete), which can be undone. |
| 8   | ![PCV](../assets/images/prise-en-main/PCV.png){ .off-glb } | PCV | Computes the PCV shading of the selected point cloud. |
| 9   | ![Move](../assets/images/prise-en-main/deplacement_.png){ .off-glb } | Move (`Translate/Rotate`) | Moves the selection in X, Y and Z (see [below](#translate)). |
| 10  | ![Point picking](../assets/images/prise-en-main/point_picking.png){ .off-glb } | `Point picking` | Reads the information of the picked point: coordinates, value of the active scalar field (for instance the result of a SEABIM filter). |
| 11  | ![Merge](../assets/images/prise-en-main/merge.png){ .off-glb } | `Merge` | Combines several data sets, for instance to reassemble clouds cut by area before a final render. |

### Moving the selection { #translate }

![Translate window](../assets/images/prise-en-main/details_deplacement.png)

- The ++space++ bar pauses the move, so you can change the point of view and
  adjust the position.
- For more precision, an axis can be locked (**1**).
- The move only applies once confirmed with the green check mark of the
  window (**2**).

## Useful shortcuts { #shortcuts }

| Key                                 | Effect                                                   |
| ----------------------------------- | -------------------------------------------------------- |
| ++a++                               | Toggles the activation of the selection in the DB Tree.  |
| ++v++                               | Shows or hides the selection.                            |
| ++d++                               | Shows or hides entity names in the 3D view.              |
| ++z++                               | Zooms and centers the view on the selection (a block for instance). |
| ++e++                               | Exports the selection information to CSV.                |
| ++s++                               | Toggles the scalar field display.                        |
| ++t++                               | Scissors (segment).                                      |
| ++del++                             | Deletes the selected layer.                              |
| ++alt++ + left click held           | Draws a rectangle for multiple selection.                |

A block selected in the 3D view is automatically selected in the DB Tree.

SEABIM Editor's own shortcuts are listed on the
[Keyboard shortcuts](../reference/raccourcis.md) page.

!!! note "Going further"
    CloudCompare website: <https://www.danielgm.net/cc/>
