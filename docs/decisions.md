# DrumPad Decision History

> These decisions were reconstructed after implementation from the repository's
> commit history. They record why the design changed, not only how the current
> code works. Where the history does not establish a motivation, this document
> avoids presenting an inference as fact.

## ADR-001: Use IndexedDB and Dexie as the persistent reactive source

**Context:** Sample loading briefly used React Query. As kit and pad persistence
moved into IndexedDB, loaded sample data also passed through a separate React
Context before reaching components.

**Problem:** React Query and the sample-owning Context no longer had a distinct
data-ownership role once persisted kit and pad records could be queried
reactively through Dexie.

**Decision:** Remove React Query and the sample-owning Context. Keep persistent
kit and pad data in IndexedDB and expose query results to React through Dexie's
`useLiveQuery`.

**Consequence:** Database changes can update consumers without copying query
results into another data-owning layer. Decoded audio and interaction state
remain local because they are runtime concerns rather than persistent records.

**Evidence:** `092ce8f`, `03e4c41`, `1d6a8b1`, `8ddb344`

## ADR-002: Separate the persistence model from the UI-shaped data

**Context:** The original `Kit` record embedded its complete pads array. That
shape was convenient for rendering a complete grid but tied every pad change to
the parent kit record.

**Problem:** Updating one pad, such as changing its label or audio bytes,
required rewriting the pads collection stored with the kit.

**Decision:** Store kits and pads in separate IndexedDB tables. Associate each
pad with a kit through `kitId`, and use the unique `[kitId+slot]` compound index
to identify one slot within one kit. Reconstruct `KitWithPads` when reading data
for the UI.

**Consequence:** Individual pad fields can be updated without rewriting a kit.
The application must assemble kit and pad records when reading and must remove
related pads explicitly when deleting a kit because IndexedDB does not enforce
foreign keys.

**Evidence:** `f716604`, `b732b1b`, `1f2092f`

## ADR-003: Remove the Zustand pad draft

**Context:** An earlier version copied pads into a Zustand store for rendering
and editing while IndexedDB held the persistent records. DTOs and effects moved
data between those representations.

**Problem:** The draft store duplicated persisted pad data and introduced a
synchronization responsibility without owning distinct information. Decoded
audio also made the in-memory pad shape differ from the persisted record.

**Decision:** Remove the Zustand store and its conversion layer. Render
persistent pad data from Dexie query results, persist edits through pad services,
and keep each decoded `AudioBuffer` in the individual `Pad` that consumes it.

**Consequence:** IndexedDB remains the persistent source of truth and the pad
component owns only its runtime audio representation. Editable controls may keep
short-lived local state, but there is no application-wide pad draft.

**Evidence:** `e98989a`, `f716604`, `49965bb`, `32e4bd9`

## ADR-004: Scope AudioContext to a React provider

**Context:** `AudioContext` and the GainNodes were originally module-level
singletons. Introducing integration tests exposed that those objects survived
across separately rendered test cases.

**Problem:** The singleton lifetime made audio state leak between tests and made
the audio graph independent of the rendered application lifecycle.

**Decision:** Create the `AudioContext` and GainNodes inside
`AudioContextProvider`. Hold them in refs so one provider instance creates one
stable audio graph, and let consumers access that graph through context.

**Consequence:** Application code still shares one audio graph, while tests can
receive a new graph for each rendered provider lifecycle. Tests must provide a
browser AudioContext implementation or mock.

**Evidence:** `9181c62`

## ADR-005: Avoid independent state when a value can be derived or referenced

**Context:** Mute initially had its own boolean state in addition to channel
volume. Kit selection was also persisted separately from the kit and pad records
so the last selection could survive a reload.

**Problem:** Independently storing a value that can be obtained from existing
state creates additional synchronization paths. A mute boolean can disagree with
a zero volume, and copying a complete selected kit would duplicate the database
entity.

**Decision:** Derive `isMuted` from `volume === 0` and retain only the pre-mute
volume needed for restoration. Persist only the selected kit ID in localStorage,
while loading the selected kit and its pads from IndexedDB.

**Consequence:** Mute cannot contradict the current volume, and localStorage does
not duplicate kit or pad data.

**Evidence:** `3f630af`, `6a34b4c`, `27a9f27`

## ADR-006: Represent every pad hit as an independent animation instance

**Context:** Pad feedback originally used one active or pulsing boolean. A later
hit could arrive before the animation created by an earlier hit had finished.

**Problem:** One boolean cannot represent multiple in-progress animations on the
same pad. Rapid hits therefore competed for the same animation state instead of
producing distinct feedback.

**Decision:** Create one mask element and ID for every hit. Remove that specific
mask in its `animationend` handler instead of resetting a shared pulsing flag.

**Consequence:** Mouse and keyboard hits can produce overlapping animations, and
each animation cleans up its own element after completion. The pad keeps a small
runtime list only while animations are active.

**Evidence:** `997e3c9`, `ed525b2`

## ADR-007: Seed starter kits only into an empty database

**Context:** A new browser database has no playable kit or pad records, although
the application ships with 909 and jazz sample assets. Once initialized, the
same records can contain user-created kits, renamed pads, and replacement audio.

**Problem:** The application needs usable data on first launch, but running the
starter-data initializer on every launch could overwrite persisted changes.
Initialization also needs to establish a valid initial selection after creating
the first records.

**Decision:** `KitContextProvider` checks the number of kit records when it
mounts and runs `seedWithDefaultSamples()` only when the kits table is empty.
The initializer loads both bundled sample sets before opening a transaction,
then creates `default`, `jazz`, and all 18 pads in that transaction. It selects
`default` only after the transaction succeeds.

**Consequence:** Reloading the application does not replace existing kits or pad
customizations. Starter kits use the same persistence model as user-created
kits, so playback and editing do not require a separate built-in-kit path.
Sample-loading failures occur before any database write, while database-write
failures roll back the complete transaction. Initialization therefore cannot
leave only one starter kit or a kit with incomplete pads; the database remains
empty and a later launch can try again.

**Evidence:** `8ddb344`, `dcbc953`, `9181c62`, `d809846`, `ee1a9fe`,
`2f738f3`
