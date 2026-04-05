import { useEffect, useState } from "react";
import { playback } from "@/lib/audio/audio-utils";
import { KEYBIND } from "@/lib/constants";
import { PadItem } from "@/lib/types/types";

export function usePadKeybind(pad: PadItem) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const key = KEYBIND[pad.order];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== key || !pad.audioBuffer) return;
      event.preventDefault();
      playback(pad.audioBuffer);
      setIsActive(true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key !== key) return;
      setIsActive(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pad.id, pad.order, pad.audioBuffer]);

  return { isActive };
}
