import { SquarePen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EditableTextProps = { order: string; sampleName: string };

export function EditableText({ order, sampleName }: EditableTextProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(sampleName);
  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEditable(false);
    setValue(event.target.value);
    // blur時應該需要同步修改sampleName，此狀態需提升
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  if (isEditable) {
    return (
      <SampleNameInput
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        size={1}
        className="h-6 w-full py-0 font-sans text-sm md:text-base"
      />
    );
  }
  return (
    <>
      <Button
        size={"sm"}
        variant={"ghost"}
        className="group flex h-6 cursor-pointer justify-between px-1 hover:bg-transparent focus-visible:ring-0"
        onClick={() => {
          setIsEditable(true);
          // inputRef.current?.focus();
          // console.log(inputRef);
        }}
      >
        <span className="text-sm">
          pad<span className="ml-1">{order}</span>
        </span>
        <SquarePen
          className="opacity-0 duration-300 group-hover:opacity-100"
          size={100}
        />
      </Button>
    </>
  );
}

type SampleNameInputProps = React.ComponentProps<"input">;

function SampleNameInput({ className, ...props }: SampleNameInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    input?.focus();
  }, []);
  return <Input ref={inputRef} className={className} {...props} />;
}
