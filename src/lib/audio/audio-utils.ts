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
    slot: index,
    arrayBuffer: await getArrayBuffer(sample.source),
  }));

  return Promise.all(promises);
};

export const playback = async (
  audioBuffer: AudioBuffer,
  gainNode: GainNode,
) => {
  const audioContext = await ensureAudioContextReady();
  const source = audioContext.createBufferSource();

  source.buffer = audioBuffer;
  source.connect(gainNode).connect(audioContext.destination);
  source.start(audioContext.currentTime);
};

export const updateGainNode = (gainNode: GainNode, volume: number) => {
  gainNode.gain.value = volume;
};
