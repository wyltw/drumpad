import { useEffect, useState } from "react";
import { KitPad } from "@/lib/types/kit";
import { playback } from "@/lib/audio/audio-utils";
import { getAudioContext } from "@/lib/audio/audioContext";
import { updatePadLabel } from "@/lib/services/PadsService";
import { EditableText } from "./EditableText";
import { PadButton } from "./pad/PadButton";
import { PadFace } from "./pad/PadFace";
import { PadMask } from "./pad/PadMask";
import { usePadKeybind } from "@/lib/hooks/usePadKeybind";

type PadProps = {
  pad: KitPad;
};

export default function Pad({ pad }: PadProps) {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const { isActive, padMaskIds, addPadMask, removePadMask } =
    usePadKeybind(pad, audioBuffer);

  useEffect(() => {
    const audioContext = getAudioContext();
    audioContext.decodeAudioData(pad.arrayBuffer.slice(0)).then(setAudioBuffer);
    // pad.id is the correct dependency — arrayBuffer has no stable reference equality
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pad.id]);

  const handleEditLabel = (value: string) => {
    updatePadLabel(pad.id, value);
  };

  const handleClick = async () => {
    if (audioBuffer) playback(audioBuffer);
    addPadMask();
  };

  return (
    <div className="flex flex-col gap-1">
      <PadButton onClick={handleClick} isActive={isActive}>
        <PadFace label={pad.label} isActive={isActive} />
        <PadMask padMaskIds={padMaskIds} removePadMask={removePadMask} />
      </PadButton>
      <div className="mt-2 flex">
        <EditableText
          buttonText={`pad ${pad.order}`}
          initialValue={pad.label}
          onSave={handleEditLabel}
        />
      </div>
    </div>
  );
}
