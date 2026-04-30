import { CircleQuestionMark, Plus, SlidersVertical } from "lucide-react";
import { Button } from "../ui/button";
import HelpDialog from "../sections/HelpDialog";
import CreateKitDialog from "../kit/CreateKitDialog";
import MixerSheet from "../mixer/MixerSheet";
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
      <MixerSheet
        trigger={
          <ToolbarButton>
            <SlidersVertical className="size-5" />
          </ToolbarButton>
        }
        pads={pads}
      />
    </ul>
  );
}
