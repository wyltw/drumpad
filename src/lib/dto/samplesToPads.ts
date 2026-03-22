import type { PadItem, SampleDecoded } from "@/lib/types/types";

export const samplesToPads = (samples: SampleDecoded[]): PadItem[] =>
  samples.map((sample, index) => ({
    id: sample.id,
    order: String(index + 1),
    label: sample.sampleName,
    sampleId: sample.id,
    audioBuffer: sample.audioBuffer,
  }));
