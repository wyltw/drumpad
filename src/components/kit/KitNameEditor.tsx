import { ComponentPropsWithoutRef, useState } from "react";
import { SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Check, SquarePen, Trash, Undo2 } from "lucide-react";
import { Input } from "../ui/input";
import { useKitContext } from "@/lib/contexts/KitContextProvider";
import {
  deleteKit,
  getDefaultKit,
  updateKitName,
} from "@/lib/services/KitsService";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function KitNameEditor() {
  const { selectedKit, selectKit } = useKitContext();
  const [isEditing, setIsEditing] = useState(false);

  const isDefault = selectedKit?.name === "default";

  const handleSuccess = (newName: string) => {
    if (selectedKit) selectKit({ ...selectedKit, name: newName });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!selectedKit?.id) return;
    const error = await deleteKit(selectedKit.id);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Kit deleted.");
    const defaultKit = await getDefaultKit();
    if (defaultKit) selectKit(defaultKit);
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
        <>
          <Button
            className="ms-auto"
            size={"icon"}
            variant={"ghost"}
            onClick={() => setIsEditing(true)}
            disabled={isDefault}
          >
            <SquarePen />
            <span className="sr-only">Edit kit name</span>
          </Button>
          <Button
            className="ms-auto"
            size={"icon"}
            variant={"ghost"}
            onClick={handleDelete}
            disabled={isDefault}
          >
            <Trash />
            <span className="sr-only">Delete kit</span>
          </Button>
        </>
      )}
      {isEditing && (
        <Button
          className="ms-auto"
          size={"icon"}
          variant={"ghost"}
          onClick={() => setIsEditing(false)}
        >
          <Undo2 className="size-5" />
          <span className="sr-only">Cancel editing</span>
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
  const isSameName = name === initialName;

  const handleEditKitName = async () => {
    if (kitId) {
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
      <label htmlFor="name" className="sr-only">
        kitName
      </label>

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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="ms-auto"
              size={"icon"}
              variant={"ghost"}
              onClick={handleEditKitName}
              disabled={isSameName}
            >
              <Check />
              <span className="sr-only">Confirm kit name</span>
            </Button>
          </TooltipTrigger>
          {isSameName && (
            <TooltipContent>
              <p>Name hasn't changed</p>
            </TooltipContent>
          )}
        </Tooltip>
      )}
    </>
  );
}
