import { useEffect, useRef, useState } from "react";
import { playback } from "@/lib/audio/audio-utils";
import { KEYBIND } from "@/lib/constants";
import { PadItem } from "@/lib/types/types";

export function usePadKeybind(pad: PadItem) {
  const [isActive, setIsActive] = useState(false);
  const [padMaskIds, setPadMaskIds] = useState<number[]>([]);
  const isKeyHeld = useRef(false);

  const addPadMask = () => {
    setPadMaskIds((prev) => [...prev, Date.now()]);
  };

  const removePadMask = (id: number) => {
    setPadMaskIds((prev) => prev.filter((maskId) => id !== maskId));
  };

  useEffect(() => {
    const keys = KEYBIND[pad.order];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyHeld.current) return;
      if (!keys.includes(event.code) || !pad.audioBuffer) return;
      event.preventDefault();
      playback(pad.audioBuffer);
      isKeyHeld.current = true;
      setIsActive(true);
      addPadMask();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!keys.includes(event.code)) return;
      isKeyHeld.current = false;
      setIsActive(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pad.id, pad.order, pad.audioBuffer]);

  return { isActive, padMaskIds, removePadMask, addPadMask };
}
