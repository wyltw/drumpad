import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT } from "../constants";
import { db } from "../db/db";
import { handleError } from "../utils/utils";

export const countKits = async () => {
  return db.kits.count();
};

export const listKits = async () => {
  return db.transaction("r", db.kits, () => db.kits.toArray());
  // need this transaction method to prevent reading null
  // see https://github.com/dexie/Dexie.js/issues/2058#issuecomment-2411322740
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

const findKitByName = (name: string) =>
  db.kits.where("name").equals(name).first();

export const updateKitName = async (
  id: number,
  name: string,
): Promise<string | undefined> => {
  try {
    const existing = await findKitByName(name);
    if (existing) return "A kit with this name already exists.";
    await db.kits.update(id, { name });
  } catch (error) {
    return handleError(error);
  }
};

export const createKit = async (name: string): Promise<string | number> => {
  try {
    const existing = await findKitByName(name);
    if (existing) return "A kit with this name already exists.";
    const sample = await loadSample(HOUSE_KIT);
    return await db.kits.add({ name, pads: sample });
  } catch (error) {
    return handleError(error);
  }
};

const createDefaultKit = async () => {
  const existing = await findKitByName("default");
  const sample = await loadSample(HOUSE_KIT);
  if (existing) {
    await db.kits.update(existing.id!, { pads: sample });
    return existing.id!;
  }
  return db.kits.add({ name: "default", pads: sample });
};
