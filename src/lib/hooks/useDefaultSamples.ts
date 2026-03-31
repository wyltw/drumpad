import { useCallback, useEffect } from "react";
import { loadSample } from "../audio/audio-utils";
import { HOUSE_KIT } from "../constants";
import { toast } from "sonner";
import { db } from "../db/db";
import { LastSelectedKit } from "../types/kit";

export const useDefaultSamples = (lastSelectedKit: LastSelectedKit | null) => {
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
    if (lastSelectedKit?.name === "default") {
      saveDefaultSamplesToDb();
    }
  }, [lastSelectedKit, saveDefaultSamplesToDb]);
};
