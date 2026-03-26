type PadFaceProps = {
  label: string;
};

export function PadFace({ label }: PadFaceProps) {
  return (
    <span className="flex flex-1 -translate-y-1 items-center justify-center rounded-xl bg-gray-800 text-base text-white/50 transition group-hover:-translate-y-0 group-hover:text-white">
      {label}
    </span>
  );
}
