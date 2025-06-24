import { Kit } from "../lib/types";
import { playback } from "../lib/utils";
import { EditableText } from "./EditableText";

type PadProps = { order: string; sample: Kit };

export default function Pad({ order, sample }: PadProps) {
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => {
          playback(sample.source);
        }}
        className="hover:ring-primary/75 relative size-32 cursor-pointer rounded-2xl bg-zinc-800 shadow-md shadow-gray-600 transition hover:ring-4 focus:shadow-none"
      >
        <span className="text-sm text-white">{sample.name}</span>
        <span className="ring-primary/75 hover:animate-button-pulsing absolute top-3/6 left-3/6 block size-32 -translate-16 scale-100 rounded-2xl opacity-100 ease-in-out hover:ring-2"></span>
      </button>
      <EditableText order={order} name={sample.name} />
    </div>
  );
}
