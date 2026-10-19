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
import { countKits, seedWithDefaultSamples } from "../services/KitsService";
import { handleError } from "../utils/utils";

type TKitPackContext = {
  selectedKitId: number | null;
  selectKit: (id: number) => void;
};

const KitContext = createContext<TKitPackContext | null>(null);

export default function KitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedKitId, setSelectedKitId] = useLocalStorage<number | null>(
    "selectedKit",
    null,
  );

  const selectKit = useCallback(
    (id: number) => {
      setSelectedKitId(id);
    },
    [setSelectedKitId],
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
        selectKit(defaultKit.id);
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
      selectedKitId,
      selectKit,
    }),
    [selectKit, selectedKitId],
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
