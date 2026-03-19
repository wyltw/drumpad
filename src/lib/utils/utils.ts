import { SampleBinary, SampleDecoded, SampleSource } from "../types/types";

export const getArrayBuffer = async (url: string) => {
  const response = await fetch(url);
  return response.arrayBuffer();
};

export const loadSample = async (
  samples: SampleSource[],
): Promise<SampleBinary[]> => {
  const promises = samples.map(async (sample) => ({
    id: crypto.randomUUID(),
    sampleName: sample.sampleName,
    arrayBuffer: await getArrayBuffer(sample.source),
  }));
  return Promise.all(promises);
};

export const decodeSample = async (
  samples: Promise<SampleBinary[]>,
  audioContext: AudioContext,
): Promise<SampleDecoded[]> => {
  const result = await samples;
  return result.map((item) => ({
    ...item,
    audioBuffer: audioContext.decodeAudioData(item.arrayBuffer),
  }));
};

// export const playback = async (url: string) => {
//   const playSound = audioContext.createBufferSource();
//   playSound.buffer = await arrayBuffer(url);
//   playSound.connect(audioContext.destination);
//   playSound.start(audioContext.currentTime);
// };
