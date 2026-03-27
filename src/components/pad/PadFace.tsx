type PadFaceProps = {
  label: string;
};

export function PadFace({ label }: PadFaceProps) {
  return (
    <span className="flex flex-1 -translate-y-1 items-center justify-center rounded-lg bg-zinc-700 text-base text-white/50 transition duration-300 group-hover:-translate-y-[6px] group-hover:text-white group-active:-translate-y-0 group-active:text-white">
      {label}
    </span>
  );
}
