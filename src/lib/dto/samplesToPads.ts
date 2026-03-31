import type { PadItem, SampleDecoded } from "@/lib/types/types";

export const samplesToPads = (samples: SampleDecoded[]): PadItem[] =>
  samples.map((sample, index) => ({
    id: sample.id,
    order: index + 1,
    label: sample.sampleName,
    audioBuffer: sample.audioBuffer,
  }));
