import { HelpCircle, Plus, Save } from "lucide-react";
import { Button } from "./ui/button";
import HelpDialog from "./HelpDialog";
import CreateKitDialog from "./CreateKitDialog";

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

export default function PadsToolbar() {
  return (
    <ul className="flex flex-col gap-1">
      <HelpDialog
        trigger={
          <ToolbarButton>
            <HelpCircle className="size-5" />
          </ToolbarButton>
        }
      />
      <ToolbarButton>
        <Save className="size-5" />
      </ToolbarButton>
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
