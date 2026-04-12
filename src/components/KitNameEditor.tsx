import React, { useState } from "react";
import { SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { SquarePen, Undo2 } from "lucide-react";
import { Input } from "./ui/input";

type KitNameEditorProps = {
  kitName: string;
};

export default function KitNameEditor({ kitName }: KitNameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex gap-2">
      {isEditing ? (
        <KitNameInput
          initialName={kitName}
          onBlur={() => setIsEditing(false)}
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

function KitNameInput({
  initialName,
  onBlur,
}: {
  initialName: string;
  onBlur: () => void;
}) {
  const [name, setName] = useState(initialName);

  return (
    <Input
      autoFocus
      id="name"
      type="text"
      placeholder="Enter new kit name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={onBlur}
    />
  );
}
