import { cn } from "@/lib/utils/cn";

type PadMaskProps = {
  padMaskIds: number[];
  removePadMask: (id: number) => void;
};

export function PadMask({ padMaskIds, removePadMask }: PadMaskProps) {
  return padMaskIds.map((maskId) => (
    <span
      key={maskId}
      onAnimationEnd={() => removePadMask(maskId)}
      className={cn("animate-button-pulsing absolute inset-0 rounded-full")}
    />
  ));
}
