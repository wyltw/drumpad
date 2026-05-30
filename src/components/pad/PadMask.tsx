import { cn } from "@/lib/utils/cn";

type PadMaskProps = {
  padMaskIds: number[];
  onAnimationEnd: (id: number) => void;
};

export function PadMask({ padMaskIds, onAnimationEnd }: PadMaskProps) {
  return padMaskIds.map((maskId) => (
    <span
      key={maskId}
      onAnimationEnd={() => onAnimationEnd(maskId)}
      className={cn(
        "animate-button-pulsing absolute inset-0 z-10 rounded-full",
      )}
    />
  ));
}
