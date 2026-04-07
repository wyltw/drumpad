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
import usePadsStore from "@/lib/stores/PadsStore";

type HelpDialogProps = {
  trigger: React.ReactNode;
};

export default function HelpDialog({ trigger }: HelpDialogProps) {
  const pads = usePadsStore((state) => state.pads);

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
              key={pad.order}
              className="flex items-center justify-between text-sm"
            >
              <span className="truncate text-black">{pad.label}:</span>
              <span className="flex items-center gap-1">
                {KEYBIND[pad.order].map((key, i) => (
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
