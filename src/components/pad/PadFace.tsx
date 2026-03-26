type PadFaceProps = {
  label: string;
};

export function PadFace({ label }: PadFaceProps) {
  return (
    <span className="flex flex-1 -translate-y-[6px] items-center justify-center rounded-lg bg-zinc-700 text-base text-white/50 transition group-hover:-translate-y-0 group-hover:text-white">
      {label}
    </span>
  );
}
