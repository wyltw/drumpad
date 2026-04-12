import { ComponentPropsWithoutRef, useState } from "react";
import { SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { SquarePen, Undo2 } from "lucide-react";
import { Input } from "./ui/input";
import { useKitContext } from "@/lib/contexts/KitContextProvider";
import { updateKitName } from "@/lib/services/KitsService";

export default function KitNameEditor() {
  const { selectedKit } = useKitContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex gap-2">
      {isEditing ? (
        <KitNameInput
          initialName={selectedKit?.name ?? ""}
          kitId={selectedKit?.id}
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
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {isEditing ? (
          <Undo2 className="size-5" />
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
} & ComponentPropsWithoutRef<"input">;

function KitNameInput({ initialName, kitId, ...props }: KitNameInputProps) {
  const [name, setName] = useState(initialName);

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (kitId && e.target.value !== initialName) {
      await updateKitName(kitId, e.target.value);
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
