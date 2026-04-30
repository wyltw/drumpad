import { SquarePen, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type EditableTextProps = {
  buttonText: string;
  initialValue?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSave?: (value: string) => void;
  openFileDialog: () => void;
};

export function EditableText({
  buttonText,
  initialValue,
  onChange,
  onSave,
  openFileDialog,
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
    <div className="flex h-6 flex-1 items-center justify-between px-1">
      <span className="text-sm md:text-base">{buttonText}</span>
      <div className="space-x-1">
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          onClick={() => {
            setIsEditable(true);
          }}
        >
          <SquarePen />
        </Button>
        <Button size={"icon-sm"} variant={"ghost"} onClick={openFileDialog}>
          <Upload />
        </Button>
      </div>
    </div>
  );
}
