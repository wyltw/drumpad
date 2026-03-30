import { useKitContext } from "@/lib/contexts/KitContextProvider";
import Pads from "./Pads";
import { useDefaultSamples } from "@/lib/hooks/useDefaultSamples";

export default function PadsLayout() {
  const { selectedKit } = useKitContext();
  // useDefaultSamples(selectedKit);
  return (
    <div className="mx-auto mt-20 grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
      <Pads />
    </div>
  );
}
