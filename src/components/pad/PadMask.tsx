import { cn } from "@/lib/utils/cn";
import { useState } from "react";

type PadMaskProps = {
  className?: string;
};

export function PadMask({ className }: PadMaskProps) {
  const [isPulsing, setIsPuling] = useState(false);
  return (
    <span
      onClick={() => setIsPuling(true)}
      onAnimationEnd={() => setIsPuling(false)}
      className={cn(
        "absolute inset-0 rounded-full",
        { "animate-button-pulsing": isPulsing },
        className,
      )}
    />
  );
}
