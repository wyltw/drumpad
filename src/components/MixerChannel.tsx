import { useRef } from "react";
import { useVolumeContext } from "@/lib/contexts/VolumeContextProvider";
import MuteButton from "./MuteButton";
import { Slider } from "./ui/slider";
import { getGainNodes } from "@/lib/audio/gainNodes";
import { updateGainNode } from "@/lib/audio/audio-utils";

type MixerChannelProps = {
  label: string;
  slot: number;
};

export default function MixerChannel({ label, slot }: MixerChannelProps) {
  const { volumes, setVolume } = useVolumeContext();
  const padVolume = volumes[slot];
  const padNode = getGainNodes()[slot];
  const premuteVolume = useRef(padVolume);

  const applyVolume = (value: number) => {
    setVolume(slot, value);
    updateGainNode(padNode, value);
  };

  return (
    <li className="border-muted relative flex h-72 w-24 flex-col items-center gap-y-2 border-r px-4">
      <span className="max-w-full truncate">{label}</span>
      <Slider
        value={[padVolume]}
        onValueChange={([value]) => applyVolume(value)}
        max={2}
        min={0}
        step={0.01}
        orientation="vertical"
      />
      <MuteButton
        volume={padVolume}
        onMute={() => {
          premuteVolume.current = padVolume;
          applyVolume(0);
        }}
        onUnmute={() => applyVolume(premuteVolume.current)}
      />
    </li>
  );
}
