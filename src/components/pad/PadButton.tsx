import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type PadButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export function PadButton({ children, onClick, className }: PadButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex cursor-pointer rounded-lg bg-zinc-900 shadow-md transition duration-500 hover:[box-shadow:0_0_35px_4px_rgba(156,255,250,1)] focus:[box-shadow:0_0_35px_4px_rgba(156,255,250,1)]",
        className,
      )}
    >
      {children}
    </button>
  );
}
