import { useCallback, useEffect, useState, useTransition } from "react";
import { decodeSample, loadSample } from "../utils/utils";
import { HOUSE_KIT } from "../constants";
import { SampleDecoded } from "../types/types";

export const useSamples = (
  selectedKit: string,
  audioContext: AudioContext,
) => {
  const [samples, setSamples] = useState<SampleDecoded[] | null>(null);
  const [isPending, startTransiion] = useTransition();

  const loadDefaultSample = useCallback(async () => {
    startTransiion(async () => {
      const sample = await decodeSample(loadSample(HOUSE_KIT), audioContext);
      setSamples(sample);
    });
  }, [audioContext]);

  useEffect(() => {
    if (selectedKit === "default") {
      loadDefaultSample();
    }
  }, [selectedKit, loadDefaultSample]);

  return { samples, isPending };
};
