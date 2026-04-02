import { useKitContext } from "@/lib/contexts/KitContextProvider";

import Pad from "./Pad";
import usePadsStore, { emptyPads } from "@/lib/stores/PadsStore";
import { useKit } from "@/lib/adapters/KitsAdapter";
import { decodeSample } from "@/lib/audio/audio-utils";
import { samplesToPads } from "@/lib/dto/samplesToPads";
import { useEffect } from "react";

export default function Pads() {
  const { selectedKit } = useKitContext();
  const { kit } = useKit(selectedKit?.id);
  const setPads = usePadsStore((state) => state.setPads);
  const pads = usePadsStore((state) => state.pads);

  useEffect(() => {
    if (!kit?.pads) {
      setPads(emptyPads);
      return;
    }
    const decodedPads = decodeSample(kit?.pads);
    setPads(samplesToPads(decodedPads));
  }, [kit?.pads, setPads]);

  return (
    <>
      {pads.map((pad) => (
        <Pad key={pad.id || pad.order} pad={pad} />
      ))}
    </>
  );
}
