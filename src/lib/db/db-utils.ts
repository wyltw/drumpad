import { toast } from "sonner";
import { db } from "./db";
import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT } from "../constants";

export const seedWithDefaultSamples = async () => {
  const id = await putDefaultSamples();
  const kit = await db.kits.get(id);

  return { id: kit?.id, name: kit?.name };
};

const putDefaultSamples = async () => {
  const sample = await loadSample(HOUSE_KIT);
  const dbPromise = db.kits.put({
    name: "default",
    pads: sample,
  });
  toast.promise(dbPromise, {
    loading: "Initializing default samples",
    success: "Samples created",
  });
  return dbPromise;
};
