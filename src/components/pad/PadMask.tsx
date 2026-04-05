import { cn } from "@/lib/utils/cn";
import { useEffect, useState } from "react";

type PadMaskProps = {
  isActive?: boolean;
  className?: string;
};

export function PadMask({ isActive = false, className }: PadMaskProps) {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (isActive) setIsPulsing(true);
  }, [isActive]);

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
