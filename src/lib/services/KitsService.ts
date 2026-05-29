import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT, JAZZ_KIT } from "../constants";
import Dexie from "dexie";
import { db } from "../db/db";
import { Kit, KitWithPads } from "../types/kit";
import { handleError } from "../utils/utils";
import { SampleSource } from "../types/types";

// --- internal helpers ---

const findKitByName = (name: string) =>
  db.kits.where("name").equals(name).first();

const seedPadsForKit = async (kitId: number, sampleSource: SampleSource[]) => {
  await db.pads.where("kitId").equals(kitId).delete();
  const sample = await loadSample(sampleSource);
  const sampleWithKitId = sample.map((item) => ({
    ...item,
    kitId,
  }));
  await db.pads.bulkAdd(sampleWithKitId);
};

const initKit = async (name: string, sampleSource: SampleSource[]) => {
  const existing = await findKitByName(name);
  if (existing) {
    await seedPadsForKit(existing.id!, sampleSource);
    return existing.id!;
  }
  const newKitId = await db.kits.add({ name });
  await seedPadsForKit(newKitId, sampleSource);
  return newKitId;
};

const createDefaultKit = () => initKit("default", HOUSE_KIT);
const createJazzKit = () => initKit("jazz", JAZZ_KIT);

// --- queries ---

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

export const getDefaultKit = async (): Promise<Kit | undefined> => {
  const kit = await findKitByName("default");
  if (!kit) return undefined;
  return { id: kit.id!, name: kit.name };
};

// --- mutations ---

export const createNewKit = async (name: string): Promise<string | number> => {
  try {
    const existing = await findKitByName(name);
    if (existing) return "A kit with this name already exists.";
    const newKitId = await db.kits.add({ name });
    await seedPadsForKit(newKitId, HOUSE_KIT);
    return newKitId;
  } catch (error) {
    return handleError(error);
  }
};

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

export const deleteKit = async (kitId: number): Promise<string | undefined> => {
  try {
    await db.transaction("rw", db.kits, db.pads, async () => {
      await db.pads.where("kitId").equals(kitId).delete();
      await db.kits.delete(kitId);
    });
  } catch (error) {
    return handleError(error);
  }
};

// --- initialization ---

export const seedWithDefaultSamples = async () => {
  const id = await createDefaultKit();
  await createJazzKit();
  const kit = await db.kits.get(id);
  if (!kit) throw new Error("Failed to start with default samples");
  return { id: kit.id, name: kit.name };
};
