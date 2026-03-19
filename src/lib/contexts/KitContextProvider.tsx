import { createContext, ReactNode, useContext, useRef, useState } from "react";

type TKitPackContext = {
  selectedKit: string;
  selectKit: (value: string) => void;
  audioContext: AudioContext;
};

const KitContext = createContext<TKitPackContext | null>(null);

export default function KitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioContextRef = useRef<AudioContext>(null);
  if (audioContextRef.current === null) {
    audioContextRef.current = new AudioContext();
  }

  const [selectedKit, setSelectedKit] = useState("default");

  const selectKit = (value: string) => {
    setSelectedKit(value);
  };
  const context = {
    selectedKit,
    selectKit,
    audioContext: audioContextRef.current,
  };

  return <KitContext.Provider value={context}>{children}</KitContext.Provider>;
}

export const useKitContext = () => {
  const context = useContext(KitContext);
  if (!context) {
    throw new Error("Use KitsContext with Provider!");
  }
  return context;
};
