import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

type TKitPackContext = {
  selectedKit: string;
  selectKit: (value: string) => void;
};

const KitContext = createContext<TKitPackContext | null>(null);

export default function KitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedKit, setSelectedKit] = useLocalStorage("selectedKit", "");

  const selectKit = (value: string) => {
    setSelectedKit(value);
  };
  const context = {
    selectedKit,
    selectKit,
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
