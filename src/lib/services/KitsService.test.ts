import { beforeEach, describe, expect, test, vi } from "vitest";
import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT, JAZZ_KIT } from "../constants";
import { db } from "../db/db";
import { SampleSource } from "../types/types";
import { createNewKit, seedWithDefaultSamples } from "./KitsService";

const makePads = (samples: SampleSource[]) =>
  samples.map((sample, slot) => ({
    sampleName: sample.sampleName,
    label: sample.sampleName,
    slot,
    arrayBuffer: new ArrayBuffer(1),
  }));

describe("KitsService transactions", () => {
  beforeEach(() => {
    vi.mocked(loadSample).mockImplementation(async (samples) =>
      makePads(samples),
    );
  });

  test("seeds both starter kits and all pads atomically", async () => {
    const defaultKit = await seedWithDefaultSamples();

    expect(defaultKit.name).toBe("default");
    expect(await db.kits.orderBy("name").toArray()).toMatchObject([
      { name: "default" },
      { name: "jazz" },
    ]);
    expect(await db.pads.count()).toBe(18);
  });

  test("rolls back all starter data when seeding fails", async () => {
    vi.mocked(loadSample)
      .mockResolvedValueOnce(makePads(HOUSE_KIT))
      .mockResolvedValueOnce([
        ...makePads(JAZZ_KIT).slice(0, 1),
        ...makePads(JAZZ_KIT).slice(0, 1),
      ]);

    await expect(seedWithDefaultSamples()).rejects.toThrow();

    expect(await db.kits.count()).toBe(0);
    expect(await db.pads.count()).toBe(0);
  });

  test("creates a new kit and its pads atomically", async () => {
    const result = await createNewKit("my kit");

    expect(typeof result).toBe("number");
    expect(await db.kits.count()).toBe(1);
    expect(await db.pads.count()).toBe(9);
  });

  test("rolls back a new kit when its pads cannot be written", async () => {
    vi.mocked(loadSample).mockResolvedValueOnce([
      ...makePads(HOUSE_KIT).slice(0, 1),
      ...makePads(HOUSE_KIT).slice(0, 1),
    ]);

    const result = await createNewKit("my kit");

    expect(typeof result).toBe("string");
    expect(await db.kits.count()).toBe(0);
    expect(await db.pads.count()).toBe(0);
  });
});
