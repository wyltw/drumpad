type PadProps = { order: string };

export default function Pad({ order }: PadProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <button className="h-48 w-48 rounded-2xl bg-zinc-800 shadow-xl" />
        <span className="self-start">pad{order}</span>
      </div>
    </div>
  );
}
