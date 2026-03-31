import { SampleBinary, SampleDecoded, SampleSource } from "../types/types";
import { ensureAudioContextReady, getAudioContext } from "./audioContext";

const getArrayBuffer = async (url: string) => {
  const response = await fetch(url);
  return response.arrayBuffer();
};

export const loadSample = async (
  samples: SampleSource[],
): Promise<SampleBinary[]> => {
  const promises = samples.map(async (sample, index) => ({
    id: crypto.randomUUID(),
    sampleName: sample.sampleName,
    order: index + 1,
    arrayBuffer: await getArrayBuffer(sample.source),
  }));

  return Promise.all(promises);
};

export const decodeSample = (samples: SampleBinary[]): SampleDecoded[] => {
  const audioContext = getAudioContext();
  return samples.map((item) => ({
    ...item,
    audioBuffer: audioContext.decodeAudioData(item.arrayBuffer),
  }));
};

export const playback = async (audioBuffer: Promise<AudioBuffer>) => {
  const audioContext = await ensureAudioContextReady();
  const playSound = audioContext.createBufferSource();

  playSound.buffer = await audioBuffer;
  playSound.connect(audioContext.destination);
  playSound.start(audioContext.currentTime);
};
