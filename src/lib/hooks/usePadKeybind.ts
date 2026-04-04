import { useEffect } from "react";
import { playback } from "@/lib/audio/audio-utils";
import { KEYBIND } from "@/lib/constants";
import { PadItem } from "@/lib/types/types";

export function usePadKeybind(pads: PadItem[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchedPad = pads.find((pad) => KEYBIND[pad.order] === event.key);

      if (!matchedPad?.audioBuffer) return;

      event.preventDefault();
      playback(matchedPad.audioBuffer);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pads]);
}
