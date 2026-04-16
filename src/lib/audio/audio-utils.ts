import { KitPad } from "../types/kit";
import { SampleSource } from "../types/types";
import { ensureAudioContextReady } from "./audioContext";

const getArrayBuffer = async (url: string) => {
  const response = await fetch(url);
  return response.arrayBuffer();
};

export const loadSample = async (
  samples: SampleSource[],
): Promise<Omit<KitPad, "kitId">[]> => {
  const promises = samples.map(async (sample, index) => ({
    id: crypto.randomUUID(),
    sampleName: sample.sampleName,
    label: sample.sampleName,
    order: index + 1,
    arrayBuffer: await getArrayBuffer(sample.source),
  }));

  return Promise.all(promises);
};

export const playback = async (audioBuffer: Promise<AudioBuffer>) => {
  const audioContext = await ensureAudioContextReady();
  const playSound = audioContext.createBufferSource();

  playSound.buffer = await audioBuffer;
  playSound.connect(audioContext.destination);
  playSound.start(audioContext.currentTime);
};
