import "fake-indexeddb/auto";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { db } from "@/lib/db/db";

vi.stubGlobal(
  "AudioContext",
  vi.fn(
    class {
      createGain = vi.fn(() => ({ connect: vi.fn(), gain: { value: 1 } }));
      createBufferSource = vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        buffer: null,
      }));
      decodeAudioData = vi.fn().mockResolvedValue({});
      destination = {};
      state: AudioContextState = "running";
      resume = vi.fn().mockResolvedValue(undefined);
      currentTime = 0;
    },
  ),
);

beforeEach(async () => {
  await db.delete();
  await db.open();
});

afterEach(() => {
  cleanup();
});
