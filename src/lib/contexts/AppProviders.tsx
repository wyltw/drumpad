import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KitContextProvider from "./KitContextProvider";

type AppProvidersProps = { children: ReactNode };

const queryClient = new QueryClient();

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <KitContextProvider>{children}</KitContextProvider>
    </QueryClientProvider>
  );
}
