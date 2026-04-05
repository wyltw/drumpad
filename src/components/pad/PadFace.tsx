import { cn } from "@/lib/utils/cn";

type PadFaceProps = {
  label: string;
  isActive?: boolean;
  className?: string;
};

export function PadFace({ label, isActive = false, className }: PadFaceProps) {
  return (
    <span
      className={cn(
        "flex flex-1 -translate-y-1 items-center justify-center rounded-lg bg-zinc-700 text-base text-white/50 transition duration-300 group-hover:-translate-y-[6px] group-hover:text-white",
        { "-translate-y-0 text-white": isActive },
        className,
      )}
    >
      {label}
    </span>
  );
}
