import { ReactNode } from "react";
import KitContextProvider from "./KitContextProvider";

type AppProvidersProps = { children: ReactNode };

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      <KitContextProvider>{children}</KitContextProvider>
    </>
  );
}
