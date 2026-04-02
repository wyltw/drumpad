import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT } from "../constants";
import { db } from "../db/db";

export const countKits = async () => {
  return db.kits.count();
};

export const listKits = async () => {
  return db.kits.toArray();
};

export const getKit = async (kitId: number) => {
  return db.kits.get(kitId);
};

export const seedWithDefaultSamples = async () => {
  const id = await createDefaultKit();
  const kit = await db.kits.get(id);
  if (!kit) throw new Error("Failed to create default samples");
  return { id: kit.id, name: kit.name };
};

const createDefaultKit = async () => {
  const sample = await loadSample(HOUSE_KIT);
  return db.kits.put({
    name: "default",
    pads: sample,
  });
};
