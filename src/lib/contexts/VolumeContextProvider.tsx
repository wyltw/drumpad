import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const PAD_COUNT = 9;
const CHANNEL_COUNT = PAD_COUNT + 1; // pads (0–8) + master (9)
const DEFAULT_VOLUME = 1;

const defaultVolumes = () => Array<number>(CHANNEL_COUNT).fill(DEFAULT_VOLUME);

type TVolumeContext = {
  volumes: number[];
  setVolume: (index: number, value: number) => void;
  resetVolumes: () => void;
};

const VolumeContext = createContext<TVolumeContext | null>(null);

export default function VolumeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [volumes, setVolumes] = useState<number[]>(defaultVolumes);

  const setVolume = useCallback((index: number, value: number) => {
    setVolumes((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const resetVolumes = useCallback(() => {
    setVolumes(defaultVolumes());
  }, []);

  const context = useMemo(
    () => ({ volumes, setVolume, resetVolumes }),
    [volumes, setVolume, resetVolumes],
  );

  return (
    <VolumeContext.Provider value={context}>{children}</VolumeContext.Provider>
  );
}

export const useVolumeContext = () => {
  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error(
      "useVolumeContext must be used within VolumeContextProvider",
    );
  }
  return context;
};
