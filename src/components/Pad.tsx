type PadProps = { order: string };

export default function Pad({ order }: PadProps) {
  return (
    <div className="flex flex-col">
      <div className="hover:animate-button-pulsing rounded-2xl">
        <button className="hover:ring-primary/50 focus:animate-button-pulsing h-36 w-36 cursor-pointer rounded-2xl bg-zinc-800 shadow-md shadow-gray-600 transition hover:ring-4 focus:shadow-none" />
      </div>
      <span className="self-start">
        pad<span className="ms-1">{order}</span>
      </span>
    </div>
  );
}
