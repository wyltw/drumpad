import { createContext, ReactNode, useContext } from "react";
import { useSamplePack } from "../hooks/useSamplePack";
import { SampleDecoded } from "../types/types";
import { useKitContext } from "./KitContextProvider";

type TPadsPackContext = {
  samplePack: SampleDecoded[] | null;
  isPending: boolean;
};

const PadsContext = createContext<TPadsPackContext | null>(null);

export default function PadsContextProvider({
  selectedKit = "default",
  children,
}: {
  selectedKit: string;
  children: ReactNode;
}) {
  const { audioContext } = useKitContext();
  const { samplePack, isPending } = useSamplePack(selectedKit, audioContext);
  const context = { samplePack, isPending };

  return (
    <PadsContext.Provider value={context}>{children}</PadsContext.Provider>
  );
}

export const usePadsContextContext = () => {
  const context = useContext(PadsContext);
  if (!context) {
    throw new Error("Use PadsContext with Provider!");
  }
  return context;
};
