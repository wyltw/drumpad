import { useCallback, useEffect, useState, useTransition } from "react";
import { decodeSample, loadSample } from "../utils/utils";
import { HOUSE_KIT } from "../constants";
import { SampleDecoded } from "../types/types";
import { toast } from "sonner";

export const useSamples = (selectedKit: string, audioContext: AudioContext) => {
  const [samples, setSamples] = useState<SampleDecoded[] | null>(null);
  const [isPending, startTransiion] = useTransition();

  const loadSamples = useCallback(async () => {
    startTransiion(async () => {
      const samplePromise = decodeSample(loadSample(HOUSE_KIT), audioContext);
      toast.promise(samplePromise, {
        loading: "音源載入中...",
        success: "載入完成",
      });
      const sample = await samplePromise;
      setSamples(sample);
    });
  }, [audioContext]);

  useEffect(() => {
    if (selectedKit === "default") {
      loadSamples();
    }
  }, [selectedKit, loadSamples]);

  return { samples, isPending };
};
