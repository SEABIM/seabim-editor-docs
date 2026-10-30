# License activation

This page describes the procedure for activating a SEABIM Editor license
using **CodeMeter Runtime** from WIBU-SYSTEMS. It is performed **only
once**, after [installing the plugin](installation.md) and before being
able to create a [first project](../workflow/projet-type.md).

Two kinds of license exist:

- the **software license**, bound to the workstation it is activated on
  (sections 1 to 5 below);
- the **CmStick USB license**, carried by the dongle and therefore
  transferable from one machine to another (see
  [Variant: activation with a CmStick key](#variant-activation-with-a-cmstick-key)).

## Prerequisites

- [SEABIM Editor installed](installation.md) and working in CloudCompare.
- CodeMeter Runtime installed on the workstation (see the Prerequisites
  table on the [Installation](installation.md#prerequis) page).
- Depending on the license type: an initial **`.lif`** license file
  provided by the SEABIM team, or the **CmStick key** shipped by SEABIM.

## 1. Check the absence of any active license

Once SEABIM Editor is correctly installed, a dedicated icon appears in
the right sidebar of CloudCompare. As long as no license has been
activated in CodeMeter Runtime, clicking that icon displays the
no-license message:

![No active license](../assets/images/licence_01.png)

## 2. Import the `.lif` file

1. Save the received `.lif` file in a folder of your choice.
2. Open **CodeMeter Control Center**.
3. Drag and drop the `.lif` file into the application window.

![Drag and drop the .lif file](../assets/images/licence_02.png)

![Import confirmation](../assets/images/licence_03.png)

The license then appears in the list: a **CmContainer** has just been
created on your workstation.

## 3. Request the license activation

The next step is to generate a **license request** (`.RaC` file) that the
SEABIM team will use to issue your final license.

1. In CodeMeter Control Center, click **"License update"** at the bottom
   right.
2. Follow the wizard screens:

![Wizard start](../assets/images/licence_04.png)

![Generating the RaC file](../assets/images/licence_06.png)

![Choose the output folder](../assets/images/licence_07.png)

![Generation confirmation](../assets/images/licence_08.png)

3. Send the resulting **`.RaC`** file to the SEABIM team.

In return, you will receive a **`.RaU`** file to import in CodeMeter
Control Center following the same procedure (drag-and-drop or via the
update wizard).

![Import the RaU file](../assets/images/licence_09.png)

![Activation completed](../assets/images/licence_10.png)

## 4. Check the license in CodeMeter WebAdmin

You can check at any time the detailed information of your license from
**CodeMeter WebAdmin**:

![License information in WebAdmin](../assets/images/licence_11.png)

## 5. Confirm activation in CloudCompare

To finalize, open CloudCompare and click the **SEABIM** icon in the
sidebar. A summary window opens with the license information:
activation is successful.

![License active in SEABIM Editor](../assets/images/licence_12.png)

At that point you can move on to creating your [first
project](../workflow/projet-type.md).

## Variant: activation with a CmStick key

The license can also be carried by a **CmStick USB key** shipped by
SEABIM instead of being bound to the workstation. The license then
follows the key: plug the dongle into another machine, with CloudCompare
and SEABIM Editor installed on it, and you can work there without any new
activation.

The principle is the same (`.RaC` request, then `.RaU` update), with two
differences:

- there is **no `.lif` file to import**: the key already holds an empty
  CmContainer;
- the **SEABIM Firm Code** (`6002880`) must be entered manually in the
  wizard.

!!! note "About the screenshots"
    The screenshots below come from a French CodeMeter installation. The
    English labels of each button are given in the text.

### 1. Plug the key in and open CodeMeter

Plug the CmStick into a USB port, then open **CodeMeter Control Center**.
The key shows up in the left-hand column as **CmStick/B**, followed by its
serial number (here `3-8269754`). Check that its status is **Enabled**,
then click **"License update"**.

![The CmStick detected by CodeMeter Control Center](../assets/images/wibu_stick_01.png)

!!! note "Serial number"
    That number identifies your key: it is reused in the name of the
    `.WibuCmRaC` and `.WibuCmRaU` files exchanged with the SEABIM team.
    Quote it whenever you contact support.

### 2. Generate the license request

The **CmFAS** wizard opens. Go through it screen by screen:

1. Welcome screen: click **Next**.

    ![CmFAS wizard, welcome screen](../assets/images/wibu_stick_02.png)

2. Desired action: select **Create license request**.

    ![Selecting the desired action](../assets/images/wibu_stick_03.png)

3. Option for the license request: select **Add license of a new vendor**,
   since the key holds no SEABIM license yet. **Extend existing license**
   is only used to renew a SEABIM license already present on the key.

    ![Option for the license request](../assets/images/wibu_stick_04.png)

4. Firm Code: enter **`6002880`**, the SEABIM vendor code.

    ![Entering the SEABIM Firm Code](../assets/images/wibu_stick_05.png)

5. File name: choose the destination folder, then click **Commit**. The
   `<serial number>.WibuCmRaC` file is created there.

    ![Selecting the output file](../assets/images/wibu_stick_06.png)

### 3. Send the `.WibuCmRaC` file

Open the folder chosen in the previous step and send the `.WibuCmRaC`
file to the SEABIM team.

![The generated .WibuCmRaC file](../assets/images/wibu_stick_07.png)

### 4. Import the `.WibuCmRaU` file

In return, the SEABIM team sends you a **`.WibuCmRaU`** file. Save it on
the workstation, with the key still plugged in.

![The .WibuCmRaU file received in return](../assets/images/wibu_stick_08.png)

Then drag it into the CodeMeter Control Center window, or double-click
it: the import starts.

![License update in progress](../assets/images/wibu_stick_09.png)

A message confirms that the CmContainer has been updated.

![Update confirmation](../assets/images/wibu_stick_10.png)

### 5. Check the license in CodeMeter WebAdmin

Click **WebAdmin** at the bottom right of CodeMeter Control Center, then
open the **CmContainer** tab and select your CmStick. The **SEABIM
Editor** license must be listed there, with its Firm Code `6002880`, its
Product Code `1000` and its expiry date.

![The SEABIM Editor license carried by the CmStick](../assets/images/wibu_stick_11.png)

All that is left is to confirm the activation in CloudCompare, as in
[section 5](#5-confirm-activation-in-cloudcompare).

!!! warning "The key must stay plugged in"
    Since the license is carried by the CmStick, it must stay connected to
    the workstation the whole time SEABIM Editor is used. Remove it with
    the **Eject CmStick** button in CodeMeter Control Center rather than
    unplugging it directly.

!!! tip "In case of trouble"
    Keep the `.lif`, `.RaC` and `.RaU` files safe (or `.WibuCmRaC` and
    `.WibuCmRaU`), and contact the SEABIM support attaching a screenshot
    of the error message shown by CodeMeter Control Center or by the
    SEABIM Editor launcher.
