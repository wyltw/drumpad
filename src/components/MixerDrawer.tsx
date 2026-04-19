import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { KitPad } from "@/lib/types/kit";
import { Slider } from "./ui/slider";

type MixerDrawerProps = {
  trigger: React.ReactNode;
  pads: KitPad[];
};

export default function MixerDrawer({ trigger, pads }: MixerDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Mixer</DrawerTitle>
        </DrawerHeader>
        <div className="flex">
          <div className="w-40">
            <Slider
              defaultValue={[75]}
              max={100}
              step={5}
              orientation="vertical"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
