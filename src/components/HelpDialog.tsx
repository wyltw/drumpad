import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type HelpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Help</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
