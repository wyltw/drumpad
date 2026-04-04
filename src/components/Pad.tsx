import { EditableText } from "./EditableText";
import { PadItem } from "@/lib/types/types";
import { playback } from "@/lib/audio/audio-utils";
import usePadsStore from "@/lib/stores/PadsStore";
import { PadButton } from "./pad/PadButton";
import { PadFace } from "./pad/PadFace";
import { PadMask } from "./pad/PadMask";
import { useState } from "react";

type PadProps = {
  pad: PadItem;
};

export default function Pad({ pad }: PadProps) {
  const updatePad = usePadsStore((state) => state.updatePad);
  const handleClick = async () => {
    if (pad.audioBuffer) playback(pad.audioBuffer);
  };
  const [isPressing, setIsPressing] = useState(false);
  console.log(isPressing);
  return (
    <div className="flex flex-col gap-1">
      <PadButton
        onClick={handleClick}
        onKeyDown={() => {
          setIsPressing(true);
        }}
        onKeyUp={() => {
          setIsPressing(false);
        }}
      >
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
