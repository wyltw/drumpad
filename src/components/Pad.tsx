import { ComponentPropsWithoutRef, ReactNode } from "react";
import { EditableText } from "./EditableText";
import { PadItem } from "@/lib/types/types";
import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { cn } from "@/lib/utils/cn";
import { playback } from "@/lib/utils/utils";
import usePadsStore from "@/lib/stores/PadsStore";

type PadProps = {
  pad: PadItem;
};

export default function Pad({ pad }: PadProps) {
  const { audioContext } = useKitContext();
  const updatePad = usePadsStore((state) => state.updatePad);
  const handleClick = () => {
    playback(pad.audioBuffer, audioContext);
  };

  return (
    <div className="flex flex-col gap-1">
      <PadButton onClick={handleClick} className="size-40">
        <span className="text-base text-white/50 transition group-hover:text-white">
          {pad.label}
        </span>
        <Mask className="size-40 -translate-20" />
      </PadButton>
      <EditableText
        buttonText={`pad ${pad.order}`}
        value={pad.label}
        onBlurValue={(value) => {
          updatePad(pad.id, { label: value });
        }}
      />
    </div>
  );
}

type PadButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

function PadButton({ children, onClick, className }: PadButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group ring-primary/75 relative size-32 cursor-pointer rounded-2xl bg-zinc-800 shadow-md shadow-gray-600 transition hover:shadow-none hover:ring-4 focus:shadow-none",
        className,
      )}
      // hover時出現ring-4，focus時取消box-shadow
    >
      {children}
    </button>
  );
}

type MaskProps = { className?: string };
function Mask({ className }: MaskProps) {
  return (
    <span
      className={cn(
        "ring-primary/75 hover:animate-button-pulsing siza-32 outline-primary/75 absolute top-3/6 left-3/6 block size-32 -translate-16 rounded-2xl opacity-100 ring-2 outline-2",
        className,
      )}
    />
    // hover時播放動畫，opacity變淡，常時outline-2
  );
}
