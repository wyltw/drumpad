import { createContext, ReactNode, useContext, useRef } from "react";
import { useSamplePack } from "../hooks/useSamplePack";
import { DecodedSample } from "../types/types";

type TPadsPackContext = {
  samplePack: DecodedSample[] | null;
  isPending: boolean;
};

const PadsContext = createContext<TPadsPackContext | null>(null);

export default function PadsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioContextRef = useRef<AudioContext>(null);
  if (audioContextRef.current === null) {
    audioContextRef.current = new AudioContext();
  }
  const { samplePack, isPending } = useSamplePack(audioContextRef.current);
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
