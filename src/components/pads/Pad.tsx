import { useEffect, useState } from "react";
import { KitPad } from "@/lib/types/kit";
import { playback } from "@/lib/audio/audio-utils";
import { updatePadLabel } from "@/lib/services/PadsService";
import { EditableText } from "../pad/EditableText";
import { PadButton } from "../pad/PadButton";
import { PadFace } from "../pad/PadFace";
import { PadMask } from "../pad/PadMask";
import { usePadKeybind } from "@/lib/hooks/usePadKeybind";
import { usePadDropzone } from "@/lib/hooks/usePadDropzone";
import { useAudioContext } from "@/lib/contexts/AudioContextProvider";

type PadProps = {
  pad: KitPad;
};

export default function Pad({ pad }: PadProps) {
  const { audioContext, gainNodes } = useAudioContext();
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const padNode = gainNodes[pad.slot];

  const { isActive, padMaskIds, addPadMask, removePadMask } = usePadKeybind(
    pad,
    audioBuffer,
    padNode,
  );

  const { getRootProps, getInputProps, isDragActive, open } = usePadDropzone(
    pad.id,
    setAudioBuffer,
  );

  useEffect(() => {
    audioContext.decodeAudioData(pad.arrayBuffer.slice(0)).then(setAudioBuffer);
    // pad.id is the correct dependency — arrayBuffer has no stable reference equality
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pad.id]);

  const handleEditLabel = (value: string) => {
    updatePadLabel(pad.id, value);
  };

  const handleClick = async () => {
    if (audioBuffer) playback(audioContext, audioBuffer, padNode);
    addPadMask();
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <PadButton
          {...getRootProps()}
          onClick={handleClick}
          isActive={isActive}
        >
          <PadFace
            label={pad.label}
            isActive={isActive}
            isDragActive={isDragActive}
          />
          <PadMask padMaskIds={padMaskIds} onAnimationEnd={removePadMask} />
        </PadButton>
        <div className="mt-2 flex">
          <EditableText
            buttonText={`pad ${pad.slot + 1}`}
            initialValue={pad.label}
            onSave={handleEditLabel}
            openFileDialog={open}
          />
        </div>
      </div>
      <input
        {...getInputProps()}
        className="hidden"
        type="file"
        multiple={false}
      />
    </>
  );
}
