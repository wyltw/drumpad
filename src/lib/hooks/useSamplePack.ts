import { useCallback, useEffect, useState, useTransition } from "react";
import { Kit, SamplePack } from "../types";
import { getArrayBuffer } from "../utils/utils";
import { HOUSE_KIT } from "../constants";

export const useSamplePack = (audioContext: AudioContext) => {
  const [samplePack, setSamplePack] = useState<SamplePack[] | null>(null);
  const [isPending, startTransiion] = useTransition();
  const loadSamplePack = useCallback(
    async (sources: Kit[]) => {
      const promises = sources.map(async (source) => ({
        id: crypto.randomUUID(),
        sampleName: source.name,
        buffer: await getArrayBuffer(source.source),
      }));
      const result = await Promise.all(promises);
      const decodedData = result.map((item) => ({
        ...item,
        buffer: audioContext.decodeAudioData(item.buffer),
      }));
      startTransiion(() => {
        setSamplePack(decodedData);
      });
    },
    [audioContext],
  );

  useEffect(() => {
    loadSamplePack(HOUSE_KIT);
  }, [loadSamplePack]);

  return { samplePack, isPending };
};
