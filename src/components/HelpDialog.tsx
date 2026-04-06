import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Kbd } from "./ui/kbd";
import { KEYBIND } from "@/lib/constants";
import usePadsStore from "@/lib/stores/PadsStore";

type HelpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const pads = usePadsStore((state) => state.pads);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Help</DialogTitle>
          <DialogDescription>Use Numpads</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          {pads.map((pad) => (
            <div
              key={pad.order}
              className="flex items-center justify-between px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground">{pad.label}</span>
              <Kbd>{KEYBIND[pad.order].replace("Numpad", "")}</Kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
