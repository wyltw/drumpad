import { cn } from "@/lib/utils/cn";
import { Upload } from "lucide-react";

type PadFaceProps = {
  label: string;
  isActive?: boolean;
  isDragActive?: boolean;
  className?: string;
};

export function PadFace({
  label,
  isActive = false,
  isDragActive = false,
  className,
}: PadFaceProps) {
  return (
    <span
      className={cn(
        "flex flex-1 items-center justify-center rounded-lg",
        isDragActive
          ? "border border-dashed bg-mist-50"
          : "-translate-y-1 bg-zinc-700 text-base text-white/50 transition duration-300 group-hover:-translate-y-[6px] group-hover:text-white group-active:-translate-y-0 group-active:text-white",
        { "-translate-y-0 text-white": isActive && !isDragActive },
        className,
      )}
    >
      {isDragActive ? <Upload /> : label}
    </span>
  );
}
