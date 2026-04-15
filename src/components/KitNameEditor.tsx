import { ComponentPropsWithoutRef, useState } from "react";
import { SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Check, SquarePen, Undo2 } from "lucide-react";
import { Input } from "./ui/input";
import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { updateKitName } from "@/lib/services/KitsService";
import { toast } from "sonner";

export default function KitNameEditor() {
  const { selectedKit, selectKit } = useKitContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleSuccess = (newName: string) => {
    if (selectedKit) selectKit({ ...selectedKit, name: newName });
    setIsEditing(false);
  };

  return (
    <div className="flex gap-2">
      {isEditing ? (
        <KitNameInput
          isEditing={isEditing}
          initialName={selectedKit?.name ?? ""}
          kitId={selectedKit?.id}
          onSuccess={handleSuccess}
        />
      ) : (
        <SelectTrigger id="kitName" className="flex-1">
          <SelectValue />
        </SelectTrigger>
      )}
      {!isEditing && (
        <Button
          className="ms-auto"
          size={"icon"}
          variant={"ghost"}
          onClick={() => setIsEditing(true)}
        >
          <SquarePen />
        </Button>
      )}
      {isEditing && (
        <Button
          className="ms-auto"
          size={"icon"}
          variant={"ghost"}
          onClick={() => setIsEditing(false)}
        >
          <Undo2 className="size-5" />
        </Button>
      )}
    </div>
  );
}

type KitNameInputProps = {
  initialName: string;
  kitId: number | undefined;
  onSuccess: (newName: string) => void;
  isEditing: boolean;
} & ComponentPropsWithoutRef<"input">;

function KitNameInput({
  initialName,
  kitId,
  onSuccess,
  isEditing,
  ...props
}: KitNameInputProps) {
  const [name, setName] = useState(initialName);

  const handleEditKitName = async () => {
    if (kitId && name !== initialName) {
      const error = await updateKitName(kitId, name);
      if (error) {
        toast.error(error);
      } else {
        onSuccess(name);
      }
    }
  };

  return (
    <>
      <Input
        autoFocus
        id="name"
        type="text"
        placeholder="Enter new kit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        {...props}
      />
      {isEditing && (
        <Button
          className="ms-auto"
          size={"icon"}
          variant={"ghost"}
          onClick={handleEditKitName}
        >
          <Check />
        </Button>
      )}
    </>
  );
}
