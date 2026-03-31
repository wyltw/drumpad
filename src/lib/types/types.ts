export type PadItem = {
  id: string;
  order: number;
  label: string;
  audioBuffer: SampleDecoded["audioBuffer"] | null;
};

type BaseSample = {
  id: string;
  sampleName: string;
};

export type SampleSource = {
  sampleName: string;
  source: string;
};

export type SampleBinary = BaseSample & {
  arrayBuffer: ArrayBuffer;
  order: number;
};

export type SampleDecoded = BaseSample & {
  audioBuffer: Promise<AudioBuffer>;
};
