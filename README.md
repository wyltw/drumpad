# 🥁 DrumPad

> A browser-based drum machine with per-kit sample management, built with React, TypeScript, and the Web Audio API.

[Live Demo](https://drumpad-pi.vercel.app/)

---

## 🎬 Live Demo

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

### Frontend

- **Languages:** `TypeScript`
- **Framework:** `React 19`, `Vite`
- **Persistence:** `Dexie` (IndexedDB wrapper)
- **Audio:** `Web Audio API`
- **UI:** `Tailwind CSS`, `shadcn/ui`
- **Testing:** `Vitest`, `React Testing Library`, `fake-indexeddb`

Kit and pad records are persisted in IndexedDB, Dexie live queries keep the UI
reactive, and the Web Audio API owns playback and mixing. See the reference
documents for the complete product behavior and as-built design:

- [Product Specification](docs/product-spec.md)
- [Architecture](docs/architecture.md)

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

- [ ] Per-channel filter and pan controls
- [ ] Metronome
- [ ] Dark theme
