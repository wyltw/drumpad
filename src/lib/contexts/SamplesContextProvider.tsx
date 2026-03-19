import { createContext, ReactNode, useContext } from "react";
import { useSamples } from "../hooks/useSamples";
import { SampleDecoded } from "../types/types";
import { useKitContext } from "./KitContextProvider";

type TSamplesContext = {
  samples: SampleDecoded[] | null;
  isPending: boolean;
};

const SamplesContext = createContext<TSamplesContext | null>(null);

export default function SamplesContextProvider({
  selectedKit = "default",
  children,
}: {
  selectedKit: string;
  children: ReactNode;
}) {
  const { audioContext } = useKitContext();
  const { samples, isPending } = useSamples(selectedKit, audioContext);
  const context = { samples, isPending };

  return (
    <SamplesContext.Provider value={context}>
      {children}
    </SamplesContext.Provider>
  );
}

export const useSamplesContext = () => {
  const context = useContext(SamplesContext);
  if (!context) {
    throw new Error("Use SamplesContext with Provider!");
  }
  return context;
};
