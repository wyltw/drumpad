import { cn } from "@/lib/utils/cn";
import { useState } from "react";

type PadMaskProps = {
  className?: string;
};

export function PadMask({ className }: PadMaskProps) {
  const [isPulsing, setIsPulsing] = useState(false);
  return (
    <span
      onClick={() => setIsPulsing(true)}
      onAnimationEnd={() => setIsPulsing(false)}
      className={cn(
        "absolute inset-0 rounded-full",
        { "animate-button-pulsing": isPulsing },
        className,
      )}
    />
  );
}
