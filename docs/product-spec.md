# DrumPad Product Specification

> This is an as-built reference for the implemented application. It describes
> current behavior and scope; it is not an implementation plan or an active
> development specification.

## Product Overview

DrumPad is a browser-based, nine-pad drum machine for playing bundled or
user-provided audio samples. It is intended for lightweight local use: kits and
samples remain in the current browser, and the application has no account,
server, or synchronization layer.

## Product Scope

The application provides:

- A fixed 3 x 3 pad layout.
- Mouse, Numpad, and QWERTY playback controls.
- Persistent drum kits with editable pad labels and samples.
- Per-pad and master volume controls with mute behavior.
- Two bundled starter kits: `default` (909 samples) and `jazz`.

The application does not provide sequencing, recording, a metronome, effects,
cloud storage, accounts, or cross-browser synchronization.

## User Workflows

### Play a kit

1. The user selects a kit.
2. The application loads its nine pads from IndexedDB.
3. The user triggers a pad by clicking it or pressing its assigned key.
4. The sample plays through its channel gain and the master gain, while the pad
   displays visual feedback.

The keyboard layout follows the visual grid:

| Pad row | Numpad | QWERTY |
| --- | --- | --- |
| Top | 7, 8, 9 | Q, W, E |
| Middle | 4, 5, 6 | A, S, D |
| Bottom | 1, 2, 3 | Z, X, C |

Holding a key does not repeatedly trigger its sample. Releasing and pressing it
again produces the next hit. Rapid separate hits can display overlapping pulse
animations.

### Manage kits

- On first use, the application creates the `default` and `jazz` kits and
  selects `default`.
- The user can create a named kit. A new kit starts with the bundled 909 sample
  set.
- Kit names must be unique. Creation additionally requires a non-empty name of
  at most 40 characters.
- The user can rename or delete a non-default kit.
- The `default` kit cannot be renamed or deleted through the UI.
- After a selected kit is deleted, the application selects `default`.
- If the previously selected kit no longer exists, the application falls back
  to `default` and informs the user.

### Customize pads

- The user can edit a pad's display label. The edit is saved when the input
  loses focus.
- The user can replace a pad's sample by dropping a supported audio file on the
  pad or opening the file picker from its upload control.
- Replacing a sample updates its stored audio data, sample name, and label.
- Accepted formats are MP3 (`audio/mpeg`) and WAV (`audio/wav`). Rejected files
  produce an error notification.
- Pad changes apply only to that pad in that kit and remain after a page reload.

### Adjust the mixer

- The mixer exposes one channel for each pad and one master channel.
- Each channel ranges from 0 to 2, with 1 as the default gain.
- Muting sets the channel to 0. Unmuting restores the value held immediately
  before muting.
- Selecting another kit resets every channel and the master channel to 1.
- Mixer values are not persisted across kit changes or page reloads.

## Functional Requirements

- **FR-001:** The application displays exactly nine pad slots in a 3 x 3 grid.
- **FR-002:** A populated pad can play its decoded sample by mouse or assigned
  keyboard input.
- **FR-003:** Keyboard auto-repeat must not produce repeated hits while a key is
  held.
- **FR-004:** Independent pad hits can show concurrent visual feedback.
- **FR-005:** Kits and their pads persist in the current browser.
- **FR-006:** A kit contains at most one pad for each slot.
- **FR-007:** Users can create, select, rename, and delete non-default kits.
- **FR-008:** The application preserves an immutable `default` kit through the
  available UI controls.
- **FR-009:** Users can rename individual pads and replace their audio samples.
- **FR-010:** Users can adjust or mute individual pad channels and the master
  channel.
- **FR-011:** Deleting a kit removes its associated pads in the same database
  transaction.

## Data Concepts

- **Kit:** A named collection identified by an integer ID.
- **Pad:** One playable slot belonging to a kit. It stores its slot number,
  sample name, display label, and audio bytes.
- **Selected kit:** The last selected kit reference, retained separately from
  kit data so the application can restore the selection on reload.
- **Mixer channel:** Runtime-only volume state associated with a pad slot or the
  master output.

## Edge Cases and Constraints

- All user data is local to the browser profile and origin. Clearing site data
  removes custom kits and samples.
- The application seeds bundled kits only when the kits table is empty. It
  otherwise assumes that a `default` kit exists for fallback behavior.
- IndexedDB does not enforce foreign-key relationships; the application is
  responsible for keeping kit and pad records consistent.
- Audio playback depends on browser support for the Web Audio API and successful
  decoding of the supplied file.
- Keyboard shortcuts are ignored while focus is inside an HTML input so editing
  text does not trigger pads.

## Verification Coverage

Automated tests currently cover initial kit seeding, restoring a prior kit
selection, fallback when a selected kit is missing, kit renaming, protection of
the default kit controls, and basic header content. Audio playback, sample
replacement, mixer behavior, deletion, keyboard input, and animation behavior
are not covered by the current automated test suite.
