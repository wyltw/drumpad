type PadProps = { order: string };

export default function Pad({ order }: PadProps) {
  return (
    <div className="flex flex-col">
      <button className="h-36 w-36 rounded-2xl bg-zinc-800 shadow-xl" />
      <span className="self-start">pad{order}</span>
    </div>
  );
}
