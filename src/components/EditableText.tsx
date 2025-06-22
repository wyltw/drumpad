import { SquarePen } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EditableTextProps = { order: string; name: string };

export function EditableText({ order, name }: EditableTextProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(name);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEditable(false);
    setValue(event.target.value);
  };
  if (isEditable) {
    return (
      <Input
        // ref={inputRef}
        value={value}
        onBlur={handleBlur}
        onChange={(event) => {
          setValue(event.target.value);
        }}
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

// function SampleNameInput() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   return (
//     <Input
//       ref={inputRef}
//       value={value}
//       onBlur={handleBlur}
//       onChange={(event) => {
//         setValue(event.target.value);
//       }}
//       size={1}
//       className="h-6 w-full py-0 font-sans text-sm md:text-base"
//     />
//   );
// }
