import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type MuteButtonProps = { volume: number };
export default function MuteButton({ volume }: MuteButtonProps) {
  const [isMuted, setIsMuted] = useState(false);

  if (isMuted) {
    return (
      <Button
        onClick={() => {
          setIsMuted(false);
        }}
        variant="default"
        size={"icon"}
      >
        <VolumeOff className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        setIsMuted(true);
      }}
      variant="ghost"
      size={"icon"}
    >
      {volume === 0 && <Volume className="size-5" />}
      {volume > 50 && volume !== 0 ? (
        <Volume2 className="size-5" />
      ) : (
        <Volume1 className="size-5" />
      )}
    </Button>
  );
}
