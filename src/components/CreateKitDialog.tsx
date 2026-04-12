import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { createKit } from "@/lib/services/KitsService";
import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { handleError } from "@/lib/utils/utils";

type CreateKitDialogProps = {
  trigger: React.ReactNode;
};

export default function CreateKitDialog({ trigger }: CreateKitDialogProps) {
  const [open, setOpen] = useState(false);
  const { selectKit } = useKitContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {open && (
        <CreateKitDialogContent setOpen={setOpen} selectKit={selectKit} />
      )}
    </Dialog>
  );
}

function CreateKitDialogContent({
  setOpen,
  selectKit,
}: {
  setOpen: (open: boolean) => void;
  selectKit: (kit: { id: number; name: string }) => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const hasError = !!error;

  const validateKitName = (name: string) => {
    if (name.trim() === "") throw new Error("Name is required.");
    if (name.length > 40)
      throw new Error("Name must be 40 characters or fewer.");
  };

  const handleCreate = async () => {
    try {
      validateKitName(name);
      const result = await createKit(name);
      if (typeof result === "number") {
        selectKit({ id: result, name });
        setOpen(false);
      } else {
        setError(result);
      }
    } catch (error) {
      setError(handleError(error));
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Kit</DialogTitle>
        <DialogDescription>
          Starts as a copy of the default kit. Rename the pads to make it your
          own.
        </DialogDescription>
      </DialogHeader>
      <Field data-invalid={hasError}>
        <FieldLabel htmlFor="name">Kit name</FieldLabel>
        <Input
          id="name"
          autoComplete="off"
          aria-invalid={hasError}
          placeholder="e.g. My House Kit"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
        />
        <FieldError>{error}</FieldError>
      </Field>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={handleCreate}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
