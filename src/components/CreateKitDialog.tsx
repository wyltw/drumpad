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

type CreateKitDialogProps = {
  trigger: React.ReactNode;
};

export default function CreateKitDialog({ trigger }: CreateKitDialogProps) {
  const { selectKit } = useKitContext();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const hasError = !!error;

  const handleCreate = async () => {
    const result = await createKit(name);
    if (typeof result === "number") {
      selectKit({ id: result, name });
    } else {
      setError(result);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
            onChange={(e) => setName(e.target.value)}
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
    </Dialog>
  );
}
