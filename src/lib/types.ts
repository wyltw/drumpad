export type Kit = { name: string; source: string };

export type SamplePack = {
  id: ReturnType<typeof crypto.randomUUID>;
  sampleName: string;
  buffer: Promise<AudioBuffer>;
};
