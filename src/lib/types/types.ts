export type CryptoRandomUUID = ReturnType<typeof crypto.randomUUID>;

export type PadItem = {
  id: string;
  order: number;
  label: string;
  sampleId: SampleDecoded["id"] | null;
  audioBuffer: SampleDecoded["audioBuffer"] | null;
};

type BaseSample = {
  id: CryptoRandomUUID;
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
