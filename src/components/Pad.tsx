import { EditableText } from "./EditableText";
import { PadItem } from "@/lib/types/types";
import { playback } from "@/lib/audio/audio-utils";
import usePadsStore from "@/lib/stores/PadsStore";
import { PadButton } from "./pad/PadButton";
import { PadFace } from "./pad/PadFace";
import { PadMask } from "./pad/PadMask";

type PadProps = {
  pad: PadItem;
  onClick: (padId: string) => void;
};

export default function Pad({ pad, onClick }: PadProps) {
  const updatePad = usePadsStore((state) => state.updatePad);
  const handleClick = async () => {
    onClick(pad.id);
    if (pad.audioBuffer) playback(pad.audioBuffer);
  };

  return (
    <div className="flex flex-col gap-1">
      <PadButton onClick={handleClick}>
        <PadFace label={pad.label} />
        <PadMask />
      </PadButton>
      <div className="mt-2 flex">
        <EditableText
          buttonText={`pad ${pad.order}`}
          value={pad.label}
          onBlurValue={(value) => {
            updatePad(pad.id, { label: value });
          }}
        />
      </div>
    </div>
  );
}
