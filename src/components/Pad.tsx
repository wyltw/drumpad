import { Kit } from "../lib/types";
import { playback } from "../lib/utils";

type PadProps = { order: string; sample: Kit };

export default function Pad({ order, sample }: PadProps) {
  return (
    <div className="flex flex-col">
      <div className="hover:animate-button-pulsing rounded-2xl">
        <button
          onClick={() => playback(sample.source)}
          className="hover:ring-primary/50 focus:animate-button-pulsing h-36 w-36 cursor-pointer rounded-2xl bg-zinc-800 shadow-md shadow-gray-600 transition hover:ring-4 focus:shadow-none"
        >
          <span className="text-sm text-white">{sample.name}</span>
        </button>
      </div>
      <span className="self-start">
        pad
        <span className="ms-1">{order}</span>
      </span>
    </div>
  );
}
