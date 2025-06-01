import { SquarePen } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EditableTextProps = { order: string };

export function EditableText({ order }: EditableTextProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState("");
  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEditable(false);
    setValue(event.target.value);
  };
  if (isEditable) {
    return (
      <Input
        value={value}
        defaultValue={`pad${order}`}
        onBlur={handleBlur}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        className="h-6 w-full flex-1 py-0 font-sans md:text-base"
      />
    );
  }
  return (
    <>
      <Button
        size={"sm"}
        variant={"ghost"}
        className="group flex h-6 cursor-pointer justify-between px-1 hover:bg-transparent focus-visible:ring-0"
        onDoubleClick={() => {
          setIsEditable(true);
        }}
      >
        <span className="text-sm">
          pad <span className="ms-[2px]">{order}</span>
        </span>
        <SquarePen
          className="opacity-0 duration-300 group-hover:opacity-100"
          size={16}
        />
      </Button>
    </>
  );
}
