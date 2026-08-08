# DrumPad Architecture

> This document describes the implemented system as a maintenance and learning
> reference. For observable product behavior, see
> [Product Specification](product-spec.md).

## System Overview

DrumPad is a client-only React application built with TypeScript and Vite. Dexie
wraps IndexedDB for persistent kit and pad data, while the Web Audio API owns the
runtime audio graph. There is no backend or network persistence.

```text
React UI
  |-- contexts: selected kit, mixer values, Web Audio objects
  |-- services: kit and pad reads/mutations
  |-- hooks: reactive database reads and pad interactions
  |
  +--> IndexedDB (kits and pads)
  +--> localStorage (selected kit)
  +--> Web Audio graph (decoded buffers and gain nodes)
```

## Code Organization

```text
src/
├── components/       UI grouped by kit, pad, mixer, sections, and primitives
├── lib/
│   ├── audio/        Sample loading, playback, and gain helpers
│   ├── contexts/     Selected-kit, mixer, and Web Audio ownership
│   ├── db/           IndexedDB database and schema definition
│   ├── hooks/        Reactive database reads and pad interactions
│   ├── services/     Kit and pad persistence operations
│   └── types/        Persistent entity and sample-source types
├── assets/           Bundled images and audio samples
└── test/             Shared Vitest setup
```

`AppProviders` establishes application-wide providers. `KitSelect` and `Pads`
form the main screen, while each `Pad` coordinates playback, sample replacement,
label editing, keyboard input, and visual feedback.

## Persistence and Data Model

The initial application data shape was designed around rendering an entire pad
grid as part of a kit. While convenient for UI rendering, it was not a suitable
persistence model because changing one pad could require rewriting the whole
kit. The stored model was later normalized into separate `kits` and `pads`
tables.

```text
kits
  id        auto-incremented primary key
  name      unique kit name

pads
  id          auto-incremented primary key
  kitId       owning kit ID
  slot        position from 0 through 8
  sampleName  source/display metadata
  label       user-editable pad label
  arrayBuffer persisted audio bytes
```

The unique compound index `[kitId+slot]` expresses the kit-scoped identity of a
slot and prevents two pad records from occupying the same slot in one kit.
Keeping pads as independent records also allows fields such as `label`,
`sampleName`, and `arrayBuffer` to be updated without rewriting the kit.

`kitId` acts as an application-level relationship, not an enforced IndexedDB
foreign key. Consequently, `deleteKit()` explicitly deletes the related pads
and the kit inside one Dexie transaction.

### Initialization

`KitContextProvider` counts kits when it mounts. If none exist,
`seedWithDefaultSamples()` loads the bundled 909 and jazz audio files into
ArrayBuffers, creates the two starter kits, and selects `default`.

### Reactive database reads

`useKits()` uses Dexie's `useLiveQuery` to provide the kit list as reactive data
to React. `useKit()` does the same for the kit and pads associated with the
current selected kit ID. When records used by either query change in IndexedDB,
Dexie reruns the query and React receives the updated result.

The selected kit reference is separate from these database query results.
`KitContextProvider` owns that selection and persists it in localStorage.

## State Ownership

State is kept at the narrowest scope shared by its consumers:

| State | Owner | Lifetime / source of truth |
| --- | --- | --- |
| Kits and pads | IndexedDB via Dexie | Persistent browser data |
| Selected kit | `KitContextProvider` via `useLocalStorage` | Persistent local preference |
| Decoded sample | Individual `Pad` | Recreated from stored audio bytes |
| Mixer values | `VolumeContextProvider` | Runtime React state; reset per kit |
| Effective gain | Web Audio `GainNode`s | Runtime audio state |
| Keyboard held state | `usePadKeybind` ref | One pad interaction lifecycle |
| Pulse animations | Individual `Pad` | Runtime list of animation IDs |

The mixer does not store a separate mute boolean. A channel is considered muted
when its React volume value is zero, and its previous non-muted value is retained
in a ref for restoration. React values keep controls rendered correctly, while
GainNodes determine the actual audio output.

An earlier Zustand draft duplicated editable UI and database state. It was
removed after the local optimistic editing pattern and Dexie live queries made
the extra cache unnecessary.

## Audio Architecture

`AudioContextProvider` creates one browser `AudioContext` and ten GainNodes for
the mounted application:

```text
Pad 0 source --> GainNode 0 --+
Pad 1 source --> GainNode 1 --|
...                            +--> Master GainNode 9 --> destination
Pad 8 source --> GainNode 8 --|
```

Each playback creates a short-lived `AudioBufferSourceNode`, attaches the pad's
decoded buffer, connects it to the GainNode for that slot, and starts it. A new
source is required for every hit by the Web Audio API. If the AudioContext is
suspended, playback resumes it before starting the source.

Stored samples remain as ArrayBuffers in IndexedDB. Each `Pad` decodes its bytes
when the pad identity changes and retains the resulting `AudioBuffer` locally.
When a user replaces a sample, the hook persists the new bytes and metadata,
decodes a copy, and supplies the result back to the pad.

Creating the AudioContext inside a React provider was a testing-informed design
change. A previous module-level singleton leaked state between test cases;
provider ownership ties the audio objects to the rendered application lifecycle.

## Pad Interaction and Rendering

A pad is composed from distinct visual layers:

- `PadButton` provides the interactive base.
- `PadFace` renders the label or drag-and-drop state.
- `PadMask` renders transient pulse elements above the face.

Mouse and keyboard interactions share the same playback helper and animation
state. Each hit appends a unique mask ID; that mask removes itself on
`animationend`. The list-based design allows rapid hits to animate independently
instead of competing for one active flag.

`usePadKeybind` installs window-level `keydown` and `keyup` listeners for its
pad. A ref suppresses browser key-repeat until the matching key is released.
Events originating from an HTML input are ignored.

`usePadDropzone` owns drag-and-drop and file-picker integration. Once a file is
read, it updates only the affected pad record and refreshes that pad's decoded
audio without rebuilding the entire kit.

## Error Handling

- React error-boundary handling protects the main application content from
  uncaught render errors.
- Service functions catch persistence errors and return readable error strings.
  Kit operations display these errors in the dialog or with a toast.
- Unsupported sample file types produce an error toast. File-reading failures
  are written to the browser console.
- Pad update functions also return error strings, but their current callers do
  not display those errors to the user.

## Tests

Vitest runs in JSDOM with React Testing Library. `fake-indexeddb` supplies the
browser database APIs during tests. The current suite emphasizes persistence and
kit-selection integration behavior rather than the Web Audio and pad interaction
paths.

The main covered architectural behaviors are:

- Seeding `default` and `jazz` into an empty database.
- Restoring `selectedKit` from localStorage.
- Falling back when a stored selection is missing from IndexedDB.
- Persisting a kit rename.
- Disabling rename and delete controls for `default`.

## Operational Constraints

- The application requires a browser with IndexedDB and Web Audio API support.
- Persistence is local to a browser profile and origin.
- Audio bytes stored in IndexedDB can consume substantially more space than kit
  metadata.
- Mixer values and decoded AudioBuffers are runtime-only.
- The seeding check only tests whether the kits table is empty. A non-empty but
  incomplete database could result if initialization stops after writing only
  part of the starter data, or if someone manually changes IndexedDB through
  browser developer tools. The application does not attempt to repair such a
  state automatically.
