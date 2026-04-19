import { CircleQuestionMark, Plus, SlidersVertical } from "lucide-react";
import { Button } from "./ui/button";
import HelpDialog from "./HelpDialog";
import CreateKitDialog from "./CreateKitDialog";
import MixerDrawer from "./MixerDrawer";
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
      <MixerDrawer
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
