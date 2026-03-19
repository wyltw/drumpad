import { useKitContext } from "@/lib/contexts/KitContextProvider";
import SamplesContextProvider from "@/lib/contexts/SamplesContextProvider";
import Pads from "./Pads";

export default function PadsLayout() {
  const { selectedKit } = useKitContext();
  return (
    <SamplesContextProvider selectedKit={selectedKit}>
      <div className="mx-auto mt-20 grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
        <Pads />
      </div>
    </SamplesContextProvider>
  );
}
