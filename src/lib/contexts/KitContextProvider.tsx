import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { LastSelectedKit } from "../types/kit";
import { countKits, seedWithDefaultSamples } from "../services/KitsService";

type TKitPackContext = {
  selectedKit: LastSelectedKit | null;
  selectKit: (value: LastSelectedKit) => void;
};

const KitContext = createContext<TKitPackContext | null>(null);

export default function KitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedKit, setSelectedKit] = useLocalStorage<LastSelectedKit | null>(
    "selectedKit",
    null,
  );

  const selectKit = useCallback(
    (value: LastSelectedKit | null) => {
      setSelectedKit(value);
    },
    [setSelectedKit],
  );

  const seed = useCallback(async () => {
    const kitsCount = await countKits();
    if (kitsCount === 0) {
      const seedPromise = seedWithDefaultSamples();
      toast.promise(seedPromise, {
        loading: "Initializing default samples",
        success: "Samples created",
      });
      const defaultKit = await seedPromise;
      selectKit(defaultKit as LastSelectedKit);
    }
  }, [selectKit]);

  useEffect(() => {
    seed();
  }, [seed]);

  const context = useMemo(
    () => ({
      selectedKit,
      selectKit,
    }),
    [selectKit, selectedKit],
  );

  return <KitContext.Provider value={context}>{children}</KitContext.Provider>;
}

export const useKitContext = () => {
  const context = useContext(KitContext);
  if (!context) {
    throw new Error("Use KitsContext with Provider!");
  }
  return context;
};
