import { useCallback, useEffect } from "react";
import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT } from "../constants";
import { toast } from "sonner";
import { db } from "../db/db";

export const useDefaultSamples = (selectedKit: string) => {
  const saveDefaultSamplesToDb = useCallback(async () => {
    const sample = await loadSample(HOUSE_KIT);
    const dbPromise = db.kit.add({
      name: "default",
      pads: sample,
    });
    toast.promise(dbPromise, {
      loading: "Initializing default samples",
      success: "Samples created",
    });
  }, []);

  useEffect(() => {
    if (selectedKit) {
      saveDefaultSamplesToDb();
    }
  }, [selectedKit, saveDefaultSamplesToDb]);
};
