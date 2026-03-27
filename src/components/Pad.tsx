import { EditableText } from "./EditableText";
import { PadItem } from "@/lib/types/types";
import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { cn } from "@/lib/utils/cn";
import { playback } from "@/lib/utils/utils";
import usePadsStore from "@/lib/stores/PadsStore";
import { PadButton } from "./pad/PadButton";
import { PadFace } from "./pad/PadFace";
import { PadMask } from "./pad/PadMask";

type PadProps = {
  pad: PadItem;
  onClick: React.Dispatch<React.SetStateAction<string>>;
  isActived: boolean;
};

export default function Pad({ pad, onClick, isActived }: PadProps) {
  const { audioContext } = useKitContext();
  const updatePad = usePadsStore((state) => state.updatePad);
  const handleClick = () => {
    onClick(pad.id);
    playback(pad.audioBuffer, audioContext);
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
