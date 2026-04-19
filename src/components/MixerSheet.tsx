import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Slider } from "./ui/slider";
import { KitPad } from "@/lib/types/kit";

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
          <SheetTitle>Mixer</SheetTitle>
        </SheetHeader>
        <div className="flex">
          <div className="flex w-40 flex-col justify-center">
            <Slider
              defaultValue={[75]}
              max={100}
              step={5}
              orientation="vertical"
            />
            <p>Master Volume</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
