import { useKitContext } from "@/lib/contexts/KitContextProvider";
import Pad from "./Pad";
import usePadsStore, { emptyPads } from "@/lib/stores/PadsStore";
import { useKit } from "@/lib/adapters/KitsAdapter";
import { kitPadsToPads } from "@/lib/dto/kitPadsToPads";
import { useEffect } from "react";
import PadsToolbar from "./PadsToolbar";

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
    setPads(kitPadsToPads(kit.pads));
  }, [kit?.pads, setPads]);

  return (
    <div className="mt-4 flex gap-2">
      <div className="grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
        {pads.map((pad) => (
          <Pad key={pad.id || pad.order} pad={pad} />
        ))}
      </div>
      <PadsToolbar />
    </div>
  );
}
