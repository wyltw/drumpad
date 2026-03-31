import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useKits } from "../hooks/useKits";
import { Kit, LastSelectedKit } from "../types/kit";

type TKitPackContext = {
  selectedKit: LastSelectedKit;
  selectKit: (value: LastSelectedKit) => void;
  kitOptions: Omit<Kit, "pads">[];
};

const KitContext = createContext<TKitPackContext | null>(null);

export default function KitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedKit, setSelectedKit] = useLocalStorage<LastSelectedKit>(
    "selectedKit",
    { id: 1, name: "default" },
  );
  const { kitOptions } = useKits();

  const selectKit = (value: LastSelectedKit) => {
    setSelectedKit(value);
  };
  const context = {
    selectedKit,
    selectKit,
    kitOptions,
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
