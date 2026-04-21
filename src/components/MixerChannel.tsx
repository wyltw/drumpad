import MuteButton from "./MuteButton";
import { Slider } from "./ui/slider";

type MixerChannelProps = {
  label: string;
};

export default function MixerChannel({ label }: MixerChannelProps) {
  return (
    <li className="border-muted relative flex h-72 w-24 flex-col items-center gap-y-2 border-r px-4">
      <span className="max-w-full truncate">{label}</span>
      <Slider defaultValue={[75]} max={100} step={5} orientation="vertical" />
      <MuteButton volume={30} />
    </li>
  );
}
