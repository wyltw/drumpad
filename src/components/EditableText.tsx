import { SquarePen } from "lucide-react";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EditableTextProps = {
  buttonText: string;
  onBlurValue?: (value: string) => void;
} & ComponentPropsWithoutRef<"input">;

export function EditableText({
  buttonText,
  value,
  onChange,
  onBlurValue,
}: EditableTextProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsEditable(false);
    setLocalValue(event.target.value);
    onBlurValue?.(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    onChange?.(event);
  };

  if (isEditable) {
    return (
      <SampleNameInput
        value={localValue}
        onBlur={handleBlur}
        onChange={handleChange}
        size={1}
        className="h-6 w-full py-0 font-sans text-sm md:text-base"
      />
    );
  }

  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      className="group flex h-6 cursor-pointer justify-between px-1 hover:bg-transparent focus-visible:ring-0"
      onClick={() => {
        setIsEditable(true);
      }}
    >
      <span className="text-sm md:text-base">{buttonText}</span>
      <SquarePen
        className="opacity-0 duration-300 group-hover:opacity-100"
        size={100}
      />
    </Button>
  );
}

type SampleNameInputProps = ComponentPropsWithoutRef<"input">;

function SampleNameInput({ className, ...props }: SampleNameInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <Input ref={inputRef} className={className} {...props} />;
}
