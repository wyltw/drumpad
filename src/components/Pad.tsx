import { EditableText } from "./EditableText";
import { PadItem } from "@/lib/types/types";
import { playback } from "@/lib/audio/audio-utils";
import usePadsStore from "@/lib/stores/PadsStore";
import { PadButton } from "./pad/PadButton";
import { PadFace } from "./pad/PadFace";
import { PadMask } from "./pad/PadMask";
import { usePadKeybind } from "@/lib/hooks/usePadKeybind";

type PadProps = {
  pad: PadItem;
};

export default function Pad({ pad }: PadProps) {
  const updatePad = usePadsStore((state) => state.updatePad);
  const { isActive, padMaskIds, addPadMask, removePadMask } =
    usePadKeybind(pad);

  const handleEditLabel = (value: string) => {
    updatePad(pad.id, { label: value });
  };

  const handleClick = async () => {
    if (pad.audioBuffer) playback(pad.audioBuffer);
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
