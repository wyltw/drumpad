# 🥁 DrumPad

> A browser-based drum machine with per-kit sample management, built with React, TypeScript, and the Web Audio API.

[![Live Demo](https://shields.io)][Demo-Link]
[![Tech Stack](https://shields.io)][Tech-Stack-Anchor]

---

## 💡 The Problem & The Solution

### The Problem

- Browser-based drum machines tend to be either throwaway demos (hard-coded samples, no persistence) or full DAWs with steep learning curves.
- Most demos do not treat the pad as a real UI component — interactions feel disconnected from the sound.

### The Solution

- A focused drum pad with real IndexedDB persistence: kits and samples survive page reloads, and custom samples can be uploaded per pad.
- The pad button is built as a layered UI component so visual feedback genuinely reflects what the audio engine is doing, for both mouse and keyboard.

---

## 🎬 Live Demo

👉 **Check out the live application:** [View Deployment]([Insert URL])

![Project Demo Screenshot or GIF]([Insert path/URL to a high-quality GIF or screenshot showing core user workflows])

---

## ✨ Core Features

- **Kit management**: Create, rename, and delete kits. Selecting a kit loads its pads from IndexedDB and resets the mixer.
- **Custom samples**: Drag-and-drop a file onto any pad to replace its sample. The upload is persisted per pad, per kit.
- **Mixer panel**: Per-channel volume slider and mute toggle. Master gain is routed through the Web Audio graph.
- **Keyboard support**: Numpad and QWERTY layouts both supported. Long-press does not repeat.
- **Animated feedback**: Each pad hit — mouse or keyboard — spawns an independent animation so rapid inputs overlap cleanly.

---

## 🛠️ Tech Stack & Architecture

<a id="Tech-Stack-Anchor"></a>

### Frontend

- **Languages:** `TypeScript`
- **Framework:** `React 19`, `Vite`
- **Persistence:** `Dexie` (IndexedDB wrapper)
- **Audio:** `Web Audio API`
- **UI:** `Tailwind CSS`, `shadcn/ui`
- **Testing:** `Vitest`, `Testing Library`, `fake-indexeddb`

### Key Engineering Decisions

- **IndexedDB as Single Source of Truth via Dexie:** All kit and pad data lives in IndexedDB. `useLiveQuery` keeps the UI reactive without manually syncing DB results into React state. A service/adapter layer sits between Dexie and the UI: the service owns business logic, the adapter owns query shape, and components stay ignorant of either. On first load, the DB is seeded only if the store is empty — no blind overwrites on refresh. An earlier version used Zustand to hold a draft layer on top of IndexedDB, treating the DB as server state and the store as a client cache. That model was removed when it became clear that `EditableText` already follows an optimistic UI pattern — it updates the UI immediately and persists in the background — making the draft layer a redundant source of truth rather than a useful abstraction.

- **Schema designed for partial updates:** The pad schema uses a compound index on `(kitId, slot)` so individual fields — such as `arrayBuffer` for a custom sample — can be updated without touching the full record.

- **Pad button as a layered UI component:** The pad button is split into a base layer, a face layer, and a dynamically rendered list of mask `<span>` elements that carry the pulse animation. Each interaction appends a new ID to the list and removes it on `animationend`, so overlapping inputs each get their own animation without shared state. Mouse clicks and keydown events feed the same path.

- **Integration tests as design feedback:** Key flows (kit selection fallback, kit name editing, DB seeding) are covered with Vitest + Testing Library + `fake-indexeddb`. The AudioContext was originally a module-level singleton; this caused test state to bleed between cases. Refactoring it into a React context provider resolved the leakage — the architectural change came from a test constraint, not from planning ahead.

- **State co-location and derived state:** State lives at the narrowest scope that covers its consumers: `audioBuffer` inside the Pad component, `volumes[]` in a dedicated context for the mixer, `selectedKit` globally. Mute state is derived from volume rather than stored as a separate boolean flag. GainNodes are the Web Audio source of truth and are not duplicated into React state.

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

- Node.js v18+

### Installation & Execution

1. **Clone the repository**

   ```bash
   git clone https://github.com/wyltw/drumpad.git
   cd drumpad
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the local development server**
   ```bash
   npm run dev
   ```

---

## 🚀 Future Roadmap

- [ ] BPM sequencer: schedule pad hits on a grid instead of manual triggering
- [ ] Export kit as a ZIP of labelled samples
- [ ] Pan control per channel

---

## 🤝 Contact

wyltw - [wyltw812@gmail.com](mailto:wyltw812@gmail.com)

Project Link: [https://github.com/wyltw/drumpad](https://github.com/wyltw/drumpad)

---

<!-- Markdown Links and Images Anchors -->

[Demo-Link]: [Insert URL to deployment]
