import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT } from "../constants";
import Dexie from "dexie";
import { db } from "../db/db";
import { KitWithPads } from "../types/kit";
import { handleError } from "../utils/utils";

export const countKits = async () => {
  return db.kits.count();
};

export const listKits = async () => {
  return db.transaction("r", db.kits, () => db.kits.toArray());
  // need this transaction method to prevent reading null after constraints error
  // see https://github.com/dexie/Dexie.js/issues/2058#issuecomment-2411322740
};

export const getKit = async (
  kitId: number,
): Promise<KitWithPads | undefined> => {
  const kit = await db.kits.get(kitId);
  if (!kit) return undefined;
  const pads = await db.pads
    .where("[kitId+slot]")
    .between([kitId, Dexie.minKey], [kitId, Dexie.maxKey])
    .toArray();
  return { ...kit, pads };
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

const seedPadsForKit = async (kitId: number) => {
  await db.pads.where("kitId").equals(kitId).delete();
  const sample = await loadSample(HOUSE_KIT);
  const sampleWithKitId = sample.map((item) => ({
    ...item,
    kitId,
  }));
  db.pads.bulkAdd(sampleWithKitId);
};

export const createNewKit = async (name: string): Promise<string | number> => {
  try {
    const existing = await findKitByName(name);
    if (existing) return "A kit with this name already exists.";
    const newKitId = await db.kits.add({ name });
    await seedPadsForKit(newKitId);
    return newKitId;
  } catch (error) {
    return handleError(error);
  }
};

const createDefaultKit = async () => {
  const existing = await findKitByName("default");
  if (existing) {
    await seedPadsForKit(existing.id);
    return existing.id!;
  }
  const newKitId = await db.kits.add({ name: "default" });
  await seedPadsForKit(newKitId);
  return newKitId;
};
