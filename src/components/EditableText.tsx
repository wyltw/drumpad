import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EditableTextProps = {
  buttonText: string;
  initialValue?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSave?: (value: string) => void;
};

export function EditableText({
  buttonText,
  initialValue,
  onChange,
  onSave,
}: EditableTextProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsEditable(false);
    onSave?.(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onChange?.(event);
  };

  if (isEditable) {
    return (
      <Input
        autoFocus
        value={text}
        onBlur={handleBlur}
        onChange={handleChange}
        size={1}
        className="h-6 py-0 font-sans text-sm md:text-base"
      />
    );
  }

  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      className="group flex h-6 flex-1 cursor-pointer justify-between px-3 hover:bg-transparent focus-visible:ring-0"
      onClick={() => {
        setIsEditable(true);
      }}
    >
      <span className="text-sm md:text-base">{buttonText}</span>
      <SquarePen className="size-5 opacity-0 duration-300 group-hover:opacity-100" />
    </Button>
  );
}
