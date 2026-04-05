import { getAudioContext } from "@/lib/audio/audioContext";
import { KitPad } from "@/lib/types/kit";
import type { PadItem } from "@/lib/types/types";

export const kitPadsToPads = (kitPads: KitPad[]): PadItem[] => {
  const audioContext = getAudioContext();
  return kitPads.map((kitPad) => ({
    id: kitPad.id,
    order: kitPad.order,
    label: kitPad.label || kitPad.sampleName,
    audioBuffer: audioContext.decodeAudioData(kitPad.arrayBuffer),
  }));
};
