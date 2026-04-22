import { getAudioContext } from "./audioContext";

const PAD_COUNT = 9;

let gainNodes: GainNode[] | null = null;

export const getGainNodes = (): GainNode[] => {
  if (!gainNodes) {
    const ctx = getAudioContext();
    gainNodes = Array.from({ length: PAD_COUNT }, () => ctx.createGain());
  }
  return gainNodes;
};
