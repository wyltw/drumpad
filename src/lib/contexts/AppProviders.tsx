import { ReactNode } from "react";
import KitContextProvider from "./KitContextProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import AudioContextProvider from "./AudioContextProvider";

type AppProvidersProps = { children: ReactNode };

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AudioContextProvider>
      <TooltipProvider>
        <KitContextProvider>{children}</KitContextProvider>
      </TooltipProvider>
    </AudioContextProvider>
  );
}
