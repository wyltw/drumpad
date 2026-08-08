import { useEffect, useRef, useState } from "react";
import { playback } from "@/lib/audio/audio-utils";
import { KEYBIND } from "@/lib/constants";
import { KitPad } from "@/lib/types/kit";
import { useAudioContext } from "../contexts/AudioContextProvider";

export function usePadKeybind(
  pad: KitPad,
  audioBuffer: AudioBuffer | null,
  gainNode: GainNode,
) {
  const { audioContext } = useAudioContext();
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
    const keys = KEYBIND[pad.slot];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (isKeyHeld.current) return;
      // Every pad receives the global keydown; e.g. KeyQ continues only for its assigned pad.
      if (!keys.includes(event.code) || !audioBuffer) return;
      event.preventDefault();
      playback(audioContext, audioBuffer, gainNode);
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
  }, [pad.id, pad.slot, audioBuffer, gainNode, audioContext]);

  return { isActive, padMaskIds, removePadMask, addPadMask };
}
