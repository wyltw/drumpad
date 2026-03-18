export type Kit = { kitName: string; samples: Sample[] | DecodedSample[] };

export type Sample = { sampleName: string; source: string };

export type DecodedSample = {
  id: ReturnType<typeof crypto.randomUUID>;
  sampleName: string;
  buffer: Promise<AudioBuffer>;
};
