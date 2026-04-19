import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { KitPad } from "@/lib/types/kit";

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
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Master volume</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {pads.map((pad) => (
              <div key={pad.slot} className="flex flex-col gap-1">
                <span className="truncate text-sm">{pad.label}</span>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="text-xs text-muted-foreground">Pan</p>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
