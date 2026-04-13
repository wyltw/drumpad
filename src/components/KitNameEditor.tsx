import { ComponentPropsWithoutRef, useState } from "react";
import { SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { CircleCheckBig, SquarePen } from "lucide-react";
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
          initialName={selectedKit?.name ?? ""}
          kitId={selectedKit?.id}
          onSuccess={handleSuccess}
        />
      ) : (
        <SelectTrigger id="kitName" className="flex-1">
          <SelectValue />
        </SelectTrigger>
      )}
      <Button
        className="ms-auto"
        size={"icon"}
        variant={"ghost"}
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <CircleCheckBig className="size-5" />
        ) : (
          <SquarePen className="size-5" />
        )}
      </Button>
    </div>
  );
}

type KitNameInputProps = {
  initialName: string;
  kitId: number | undefined;
  onSuccess: (newName: string) => void;
} & ComponentPropsWithoutRef<"input">;

function KitNameInput({
  initialName,
  kitId,
  onSuccess,
  ...props
}: KitNameInputProps) {
  const [name, setName] = useState(initialName);

  const handleBlur = async () => {
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
    <Input
      autoFocus
      id="name"
      type="text"
      placeholder="Enter new kit name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      {...props}
      onBlur={handleBlur}
    />
  );
}
