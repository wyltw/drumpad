import { Skeleton } from "../ui/skeleton";

export default function EmptyPad() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="size-36 animate-pulse rounded-lg bg-zinc-500" />
      <Skeleton className="h-6 bg-zinc-500" />
    </div>
  );
}
