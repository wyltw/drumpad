import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { KitPad } from "@/lib/types/kit";
import MixerChannel from "./MixerChannel";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { MASTER_SLOT } from "@/lib/constants";

type MixerSheetProps = {
  trigger: React.ReactNode;
  pads: KitPad[];
};

export default function MixerSheet({ trigger, pads }: MixerSheetProps) {
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
