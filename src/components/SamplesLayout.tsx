import { useKitContext } from "@/lib/contexts/KitContextProvider";
import SamplesContextProvider from "@/lib/contexts/SamplesContextProvider";
import Samples from "./Samples";

export default function SamplesLayout() {
  const { selectedKit } = useKitContext();
  return (
    <SamplesContextProvider selectedKit={selectedKit}>
      <div className="mx-auto grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
        <Samples />
      </div>
    </SamplesContextProvider>
  );
}
