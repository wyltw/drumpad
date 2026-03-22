import { useSamplesContext } from "@/lib/contexts/SamplesContextProvider";
import Pad from "./Pad";
import { useEffect } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import usePadsStore from "@/lib/stores/PadsStore";

export default function Pads() {
  const { samples, isPending } = useSamplesContext();
  const pads = usePadsStore((state) => state.pads);
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
      {pads?.map((pad, index) => (
        <Pad key={pad.id} label={pad.label} order={String(index + 1)} />
      ))}
    </>
  );
}
