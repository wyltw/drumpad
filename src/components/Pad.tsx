import { SquarePen } from "lucide-react";
import { Kit } from "../lib/types";
import { playback } from "../lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

type PadProps = { order: string; sample: Kit };

export default function Pad({ order, sample }: PadProps) {
  return (
    <div className="flex w-36 flex-col gap-1">
      <div className="hover:animate-button-pulsing rounded-2xl">
        <button
          onClick={() => playback(sample.source)}
          className="hover:ring-primary/50 focus:animate-button-pulsing size-36 cursor-pointer rounded-2xl bg-zinc-800 shadow-md shadow-gray-600 transition hover:ring-4 focus:shadow-none"
        >
          <span className="text-sm text-white">{sample.name}</span>
        </button>
      </div>
      <EditableText order={order} />
    </div>
  );
}

type EditableTextProps = { order: string };

function EditableText({ order }: EditableTextProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(`pad${order}`);
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
