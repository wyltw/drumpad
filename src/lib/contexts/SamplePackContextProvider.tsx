import { createContext, ReactNode, useContext, useRef } from "react";
import { useSamplePack } from "../hooks/useSamplePack";
import { SamplePack } from "../types";

type TSamplePackContext = {
  samplePack: SamplePack[] | null;
  isPending: boolean;
};

const SamplePackContext = createContext<TSamplePackContext | null>(null);

export default function SamplePackContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioContextRef = useRef<AudioContext>(null);
  if (audioContextRef.current === null) {
    audioContextRef.current = new AudioContext();
  }
  const { samplePack, isPending } = useSamplePack(audioContextRef.current);
  console.log(samplePack);
  const context = { samplePack, isPending };

  return (
    <SamplePackContext.Provider value={context}>
      {children}
    </SamplePackContext.Provider>
  );
}

export const useSamplePackContext = () => {
  const context = useContext(SamplePackContext);
  if (!context) {
    throw new Error("Use SamplePackContext with Provider! ");
  }
  return context;
};
