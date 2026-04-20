import {
  Sheet,
  SheetContent,
  SheetDescription,
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
          <SheetTitle className="text-xl">Mixer</SheetTitle>
          <SheetDescription>Volume Setting </SheetDescription>
        </SheetHeader>
        <ul className="flex px-4">
          <li className="flex flex-col gap-y-2 text-center">
            <Slider
              defaultValue={[75]}
              max={100}
              step={5}
              orientation="vertical"
            />
            <p>Master</p>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
