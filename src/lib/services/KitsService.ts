import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT, JAZZ_KIT } from "../constants";
import Dexie from "dexie";
import { db } from "../db/db";
import { Kit, KitPad, KitWithPads } from "../types/kit";
import { handleError } from "../utils/utils";

type LoadedPad = Omit<KitPad, "id" | "kitId">;

// --- internal helpers ---

const findKitByName = (name: string) =>
  db.kits.where("name").equals(name).first();

const addPadsToKit = async (kitId: number, pads: LoadedPad[]) => {
  const padsWithKitId = pads.map((pad) => ({
    ...pad,
    kitId,
  }));
  await db.pads.bulkAdd(padsWithKitId);
};

const createKitWithPads = async (name: string, pads: LoadedPad[]) => {
  const kitId = await db.kits.add({ name });
  await addPadsToKit(kitId, pads);
  return kitId;
};

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
    const pads = await loadSample(HOUSE_KIT);

    return await db.transaction("rw", db.kits, db.pads, async () => {
      const existing = await findKitByName(name);
      if (existing) return "A kit with this name already exists.";
      return createKitWithPads(name, pads);
    });
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
  const [defaultPads, jazzPads] = await Promise.all([
    loadSample(HOUSE_KIT),
    loadSample(JAZZ_KIT),
  ]);

  return db.transaction("rw", db.kits, db.pads, async () => {
    const kitsCount = await db.kits.count();
    if (kitsCount > 0) {
      const defaultKit = await findKitByName("default");
      if (!defaultKit) throw new Error("Failed to start with default samples");
      return { id: defaultKit.id, name: defaultKit.name };
    }

    const defaultKitId = await createKitWithPads("default", defaultPads);
    await createKitWithPads("jazz", jazzPads);
    return { id: defaultKitId, name: "default" };
  });
};
