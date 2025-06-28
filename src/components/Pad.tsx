import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { Kit } from "../lib/types";
import { playback } from "../lib/utils";
import { EditableText } from "./EditableText";

type PadProps = { order: string; sample: Kit };

export default function Pad({ order, sample }: PadProps) {
  const handleClick = () => {
    playback(sample.source);
  };

  return (
    <div className="flex flex-col gap-1">
      <PadButton onClick={handleClick}>
        <span className="text-sm text-white/50 transition group-hover:text-white">
          {sample.name}
        </span>
        <Mask />
      </PadButton>
      <EditableText order={order} name={sample.name} />
    </div>
  );
}

type PadButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

function PadButton({ children, onClick }: PadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group ring-primary/75 relative size-32 cursor-pointer rounded-2xl bg-zinc-800 shadow-md shadow-gray-600 transition hover:ring-4 focus:shadow-none"
      // hover時出現ring-4，focus時取消box-shadow
    >
      {children}
    </button>
  );
}

function Mask() {
  return (
    <span className="ring-primary/75 hover:animate-button-pulsing outline-primary/75 absolute top-3/6 left-3/6 block size-32 -translate-16 rounded-2xl opacity-100 ring-2 outline-2 hover:outline-offset-2" />
    // hover時播放動畫，opacity變淡，常時outline-2
  );
}
