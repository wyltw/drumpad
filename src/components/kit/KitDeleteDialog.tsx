import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type KitDeleteDialogProps = {
  kitName: string;
  onConfirm: () => void;
  disabled?: boolean;
};

export function KitDeleteDialog({
  kitName,
  onConfirm,
  disabled,
}: KitDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="ms-auto"
          size={"icon"}
          variant={"destructive"}
          disabled={disabled}
        >
          <Trash />
          <span className="sr-only">Delete kit</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete kit?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete "{kitName}". This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
