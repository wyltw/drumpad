import { cn } from "@/lib/utils/cn";

type PadMaskProps = {
  className?: string;
};

export function PadMask({ className }: PadMaskProps) {
  return (
    <span
      className={cn(
        "group-hover:animate-button-pulsing pointer-events-none absolute inset-0 rounded-md",
        className,
      )}
    />
  );
}
