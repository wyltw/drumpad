import { Volume1, Volume2, VolumeOff } from "lucide-react";
import { Button } from "../ui/button";

type MuteButtonProps = {
  volume: number;
  onMute: () => void;
  onUnmute: () => void;
};
export default function MuteButton({
  volume,
  onMute,
  onUnmute,
}: MuteButtonProps) {
  const isMuted = volume === 0;

  return (
    <Button
      onClick={isMuted ? onUnmute : onMute}
      variant={"ghost"}
      size={"icon"}
    >
      {isMuted && <VolumeOff className="size-5" />}
      {!isMuted && volume <= 1 && <Volume1 className="size-5" />}
      {!isMuted && volume > 1 && <Volume2 className="size-5" />}
    </Button>
  );
}
