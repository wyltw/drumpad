import { useQuery } from "@tanstack/react-query";
import { HOUSE_KIT } from "../constants";
import { decodeSample, loadSample } from "../utils/utils";
import { toast } from "sonner";

export const useSamples = (selectedKit: string, audioContext: AudioContext) => {
  const { data, isPending } = useQuery({
    queryKey: ["samples", selectedKit],
    queryFn: () => {
      const samplePromise = decodeSample(loadSample(HOUSE_KIT), audioContext);

      toast.promise(samplePromise, {
        loading: "Loading samples...",
        success: "Samples loaded",
      });

      return samplePromise;
    },
  });

  return { samples: data ?? null, isPending };
};
