import "fake-indexeddb/auto";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import "fake-indexeddb/auto";
import { db } from "@/lib/db/db";

const mockBufferSource = { connect: vi.fn(), start: vi.fn(), buffer: null };
const mockGainNode = { connect: vi.fn(), gain: { value: 1 } };
const mockAudioContext = {
  createGain: vi.fn(() => mockGainNode),
  createBufferSource: vi.fn(() => mockBufferSource),
  decodeAudioData: vi.fn().mockResolvedValue({}),
  destination: {},
  state: "running" as AudioContextState,
  resume: vi.fn().mockResolvedValue(undefined),
  currentTime: 0,
};

vi.stubGlobal("AudioContext", vi.fn(() => mockAudioContext));

beforeEach(async () => {
  await db.delete();
  await db.open();
});

afterEach(() => {
  cleanup();
});
