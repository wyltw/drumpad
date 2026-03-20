import { useSamplesContext } from "@/lib/contexts/SamplesContextProvider";
import Pad from "./Pad";
import { useEffect } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function Pads() {
  const { samples, isPending } = useSamplesContext();
  useEffect(() => {
    if (isPending)
      toast(
        <div className="flex items-center">
          <LoaderCircle className="animate-spin" />
          <span> 音源載入中...</span>
        </div>,
      );
  }, [isPending]);
  return (
    <>
      {samples?.map((sample, index) => (
        <Pad
          key={sample.sampleName}
          sample={sample}
          order={String(index + 1)}
        />
      ))}
    </>
  );
}
