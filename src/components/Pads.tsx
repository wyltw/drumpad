import { useKitContext } from "@/lib/contexts/KitContextProvider";
import Pad from "./Pad";
import { useKit } from "@/lib/adapters/KitsAdapter";
import PadsToolbar from "./PadsToolbar";

export default function Pads() {
  const { selectedKit } = useKitContext();
  const { kit } = useKit(selectedKit?.id);
  const pads = kit?.pads ?? [];

  return (
    <div className="mt-4 flex gap-2">
      <div className="grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
        {pads.map((pad) => (
          <Pad key={pad.id} pad={pad} />
        ))}
      </div>
      <PadsToolbar pads={pads} />
    </div>
  );
}
