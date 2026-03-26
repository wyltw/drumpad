import { cn } from "@/lib/utils/cn";

type PadMaskProps = {
  className?: string;
};

export function PadMask({ className }: PadMaskProps) {
  return (
    <span
      className={cn(
        "ring-primary/75 group-hover:animate-button-pulsing outline-primary pointer-events-none absolute inset-0 h-full w-full rounded-xl opacity-100 group-hover:outline-2",
        className,
      )}
    />
  );
}
