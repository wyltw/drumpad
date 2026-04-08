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
import { KitMeta } from "../types/kit";
import { countKits, seedWithDefaultSamples } from "../services/KitsService";
import { handleError } from "../utils/utils";

type TKitPackContext = {
  selectedKit: KitMeta | null;
  selectKit: (value: KitMeta) => void;
};

const KitContext = createContext<TKitPackContext | null>(null);

export default function KitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedKit, setSelectedKit] = useLocalStorage<KitMeta | null>(
    "selectedKit",
    null,
  );

  const selectKit = useCallback(
    (value: KitMeta | null) => {
      setSelectedKit(value);
    },
    [setSelectedKit],
  );

  const seed = useCallback(async () => {
    try {
      const kitsCount = await countKits();
      if (kitsCount === 0) {
        const seedPromise = seedWithDefaultSamples();
        toast.promise(seedPromise, {
          loading: "Initializing default samples",
          success: "Samples created",
        });
        const defaultKit = await seedPromise;
        selectKit(defaultKit);
      }
    } catch (error) {
      toast.error(handleError(error));
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
