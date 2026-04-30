import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { KitPad } from "@/lib/types/kit";
import MixerChannel from "./MixerChannel";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { DEFAULT_VOLUME, MASTER_SLOT } from "@/lib/constants";
import { useVolumeContext } from "@/lib/contexts/VolumeContextProvider";
import { getGainNodes } from "@/lib/audio/gainNodes";
import { updateGainNode } from "@/lib/audio/audio-utils";

type MixerSheetProps = {
  trigger: React.ReactNode;
  pads: KitPad[];
};

export default function MixerSheet({ trigger, pads }: MixerSheetProps) {
  const { resetVolumes } = useVolumeContext();
  const kitId = pads[0]?.kitId;

  useEffect(() => {
    resetVolumes();
    getGainNodes().forEach((node) => updateGainNode(node, DEFAULT_VOLUME));
  }, [kitId, resetVolumes]);

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle className="text-xl">Mixer</SheetTitle>
          <SheetDescription>Volume Setting </SheetDescription>
        </SheetHeader>
        <ScrollArea className="whitespace-nowrap">
          <ul className="flex px-4 pb-4">
            <MixerChannel label="Master" slot={MASTER_SLOT} />
            {pads.map((pad) => (
              <MixerChannel
                key={pad.id}
                slot={pad.slot}
                label={`Pad ${pad.slot + 1}`}
              />
            ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
