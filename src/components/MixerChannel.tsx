import { useVolumeContext } from "@/lib/contexts/VolumeContextProvider";
import MuteButton from "./MuteButton";
import { Slider } from "./ui/slider";

type MixerChannelProps = {
  label: string;
  slot: number;
};

export default function MixerChannel({ label, slot }: MixerChannelProps) {
  const { volumes } = useVolumeContext();
  const padVolume = volumes[slot];
  return (
    <li className="border-muted relative flex h-72 w-24 flex-col items-center gap-y-2 border-r px-4">
      <span className="max-w-full truncate">{label}</span>
      <Slider
        defaultValue={[0.75]}
        value={[padVolume]}
        max={1}
        min={0}
        step={0.01}
        orientation="vertical"
      />
      <MuteButton volume={30} />
    </li>
  );
}
