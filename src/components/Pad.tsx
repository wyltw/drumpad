import { Kit } from "../lib/types";
import { playback } from "../lib/utils";
import { EditableText } from "./EditableText";

type PadProps = { order: string; sample: Kit };

export default function Pad({ order, sample }: PadProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="hover:animate-button-pulsing rounded-2xl">
        <button
          onClick={() => {
            playback(sample.source);
          }}
          className="hover:ring-primary/50 focus:animate-button-pulsing size-36 cursor-pointer rounded-2xl bg-zinc-800 shadow-md shadow-gray-600 transition hover:ring-4 focus:shadow-none"
        >
          <span className="text-sm text-white">{sample.name}</span>
        </button>
      </div>
      <EditableText order={order} />
    </div>
  );
}
