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
        "group ring-primary/75 relative flex cursor-pointer rounded-xl bg-zinc-900 shadow-md shadow-gray-600 transition hover:shadow-none hover:ring-4 focus:shadow-none",
        className,
      )}
    >
      {children}
    </button>
  );
}
