import { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Kbd } from "./ui/kbd";
import { KEYBIND } from "@/lib/constants";
import { KitPad } from "@/lib/types/kit";

type HelpDialogProps = {
  trigger: React.ReactNode;
  pads: KitPad[];
};

export default function HelpDialog({ trigger, pads }: HelpDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Help</DialogTitle>
          <DialogDescription>
            Use Numpad or Q W E / A S D / Z X C
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          {pads.map((pad) => (
            <div
              key={pad.slot}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-foreground truncate">{pad.label}:</span>
              <span className="flex items-center gap-1">
                {KEYBIND[pad.slot].map((key, i) => (
                  <Fragment key={key}>
                    {i > 0 && <span className="text-muted-foreground">/</span>}
                    <Kbd>{key.replace(/Numpad|Key/, "")}</Kbd>
                  </Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
