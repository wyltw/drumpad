type PadFaceProps = {
  label: string;
};

export function PadFace({ label }: PadFaceProps) {
  return (
    <span className="flex flex-1 -translate-y-[6px] items-center justify-center rounded-lg bg-zinc-700 text-base text-white/50 transition duration-300 group-hover:-translate-y-0 group-hover:text-white group-focus:-translate-y-0 group-focus:text-white">
      {label}
    </span>
  );
}
