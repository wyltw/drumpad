import { KitPad } from "../types/kit";
import { SampleSource } from "../types/types";
import { ensureAudioContextReady } from "./audioContext";

const getArrayBuffer = async (url: string) => {
  const response = await fetch(url);
  return response.arrayBuffer();
};

export const loadSample = async (
  samples: SampleSource[],
): Promise<Omit<KitPad, "kitId" | "id">[]> => {
  const promises = samples.map(async (sample, index) => ({
    sampleName: sample.sampleName,
    label: sample.sampleName,
    slot: index + 1,
    arrayBuffer: await getArrayBuffer(sample.source),
  }));

  return Promise.all(promises);
};

export const playback = async (audioBuffer: AudioBuffer) => {
  const audioContext = await ensureAudioContextReady();
  const playSound = audioContext.createBufferSource();

  playSound.buffer = audioBuffer;
  playSound.connect(audioContext.destination);
  playSound.start(audioContext.currentTime);
};
