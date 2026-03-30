import { useCallback, useEffect, useState, useTransition } from "react";
import { decodeSample, loadSample } from "../audio/audio-utils";
import { HOUSE_KIT } from "../constants";
import { SampleDecoded } from "../types/types";
import { toast } from "sonner";

export const useSamples = (selectedKit: string) => {
  const [samples, setSamples] = useState<SampleDecoded[] | null>(null);
  const [isPending, startTransiion] = useTransition();

  const loadSamples = useCallback(async () => {
    startTransiion(async () => {
      const samplePromise = decodeSample(loadSample(HOUSE_KIT));

      toast.promise(samplePromise, {
        loading: "Loading samples...",
        success: "Samples loaded",
      });

      const sample = await samplePromise;
      setSamples(sample);
    });
  }, []);

  useEffect(() => {
    if (selectedKit === "default") {
      loadSamples();
    }
  }, [selectedKit, loadSamples]);

  return { samples, isPending };
};
