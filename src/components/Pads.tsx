import { useSamplesContext } from "@/lib/contexts/SamplesContextProvider";
import { samplesToPads } from "@/lib/dto/samplesToPads";
import Pad from "./Pad";
import { useEffect } from "react";
import usePadsStore from "@/lib/stores/PadsStore";

export default function Pads() {
  const { samples, isPending } = useSamplesContext();
  const pads = usePadsStore((state) => state.pads);
  const setPads = usePadsStore((state) => state.setPads);
  useEffect(() => {
    if (samples) setPads(samplesToPads(samples));
  }, [isPending, samples, setPads]);
  return (
    <>
      {pads.map((pad) => (
        <Pad key={pad.id || pad.order} pad={pad} onClick={() => {}} />
      ))}
    </>
  );
}
