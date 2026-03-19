type BaseSample = {
  id: ReturnType<typeof crypto.randomUUID>;
  sampleName: string;
};

export type SampleSource = {
  sampleName: string;
  source: string;
};

export type SampleBinary = BaseSample & {
  arrayBuffer: ArrayBuffer;
};

export type SampleDecoded = BaseSample & {
  audioBuffer: Promise<AudioBuffer>;
};
