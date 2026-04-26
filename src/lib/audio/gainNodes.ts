import { getAudioContext } from "./audioContext";
import { CHANNEL_COUNT, MASTER_SLOT } from "../constants";

let gainNodes: GainNode[] | null = null;

export const getGainNodes = (): GainNode[] => {
  if (!gainNodes) {
    const ctx = getAudioContext();
    gainNodes = Array.from({ length: CHANNEL_COUNT }, () => ctx.createGain());
    const masterNode = gainNodes[MASTER_SLOT];
    masterNode.connect(ctx.destination);
    for (let i = 0; i < MASTER_SLOT; i++) {
      gainNodes[i].connect(masterNode);
    }
  }
  return gainNodes;
};
