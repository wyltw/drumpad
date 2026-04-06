export type PadItem = {
  id: string;
  order: number;
  label: string;
  audioBuffer: Promise<AudioBuffer> | null;
};

export type SampleSource = {
  sampleName: string;
  source: string;
};
