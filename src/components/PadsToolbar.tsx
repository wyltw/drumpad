import { HelpCircle, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import HelpDialog from "./HelpDialog";

function ToolbarButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <li>{children}</li>
    </Button>
  );
}

export default function PadsToolbar() {
  return (
    <ul className="flex flex-col gap-1">
      <HelpDialog
        trigger={
          <Tooltip>
            <TooltipTrigger>
              <ToolbarButton>
                <HelpCircle className="size-5" />
              </ToolbarButton>
            </TooltipTrigger>
            <TooltipContent side="right">ShortCuts</TooltipContent>
          </Tooltip>
        }
      />

      <ToolbarButton>
        <Save className="size-5" />
      </ToolbarButton>
    </ul>
  );
}
