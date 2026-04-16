import { useEffect, useRef, useState } from "react";
import { playback } from "@/lib/audio/audio-utils";
import { KEYBIND } from "@/lib/constants";
import { KitPad } from "@/lib/types/kit";

export function usePadKeybind(pad: KitPad, audioBuffer: AudioBuffer | null) {
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
      if (event.target instanceof HTMLInputElement) return;
      if (isKeyHeld.current) return;
      if (!keys.includes(event.code) || !audioBuffer) return;
      event.preventDefault();
      playback(audioBuffer);
      isKeyHeld.current = true;
      setIsActive(true);
      addPadMask();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
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
  }, [pad.id, pad.order, audioBuffer]);

  return { isActive, padMaskIds, removePadMask, addPadMask };
}
