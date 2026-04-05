import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type PadButtonProps = {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export function PadButton({ children, isActive = false, className, ...props }: PadButtonProps) {
  return (
    <button
      className={cn(
        "group relative flex size-36 cursor-pointer rounded-lg bg-zinc-900 shadow-md transition duration-500 hover:[box-shadow:0_0_35px_4px_rgba(156,255,250,1)] active:[box-shadow:0_0_35px_4px_rgba(156,255,250,1)]",
        { "[box-shadow:0_0_35px_4px_rgba(156,255,250,1)]": isActive },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
