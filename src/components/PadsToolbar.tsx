import { useState } from "react";
import { HelpCircle, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import HelpDialog from "./HelpDialog";

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
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <ul className="flex flex-col gap-1">
      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
      <Tooltip>
        <TooltipTrigger asChild>
          <ToolbarButton onClick={() => setHelpOpen(true)}>
            <HelpCircle className="size-5" />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent side="right">ShortCuts</TooltipContent>
      </Tooltip>

      <ToolbarButton>
        <Save className="size-5" />
      </ToolbarButton>
    </ul>
  );
}
