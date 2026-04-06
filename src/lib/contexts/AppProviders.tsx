import { ReactNode } from "react";
import KitContextProvider from "./KitContextProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

type AppProvidersProps = { children: ReactNode };

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      <TooltipProvider>
        <KitContextProvider>{children}</KitContextProvider>
      </TooltipProvider>
    </>
  );
}
