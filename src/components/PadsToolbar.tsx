import { CircleQuestionMark, Plus } from "lucide-react";
import { Button } from "./ui/button";
import HelpDialog from "./HelpDialog";
import CreateKitDialog from "./CreateKitDialog";
import { KitPad } from "@/lib/types/kit";

function ToolbarButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button variant={"ghost"} size={"icon"} onClick={onClick} asChild>
      <li>{children}</li>
    </Button>
  );
}

export default function PadsToolbar({ pads }: { pads: KitPad[] }) {
  return (
    <ul className="flex flex-col gap-1">
      <HelpDialog
        trigger={
          <ToolbarButton>
            <CircleQuestionMark className="size-5" />
          </ToolbarButton>
        }
        pads={pads}
      />
      <CreateKitDialog
        trigger={
          <ToolbarButton>
            <Plus className="size-5" />
          </ToolbarButton>
        }
      />
    </ul>
  );
}
