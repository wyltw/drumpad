import { useKitContext } from "@/lib/contexts/KitContextProvider";
import PadsContextProvider from "@/lib/contexts/PadsContextProvider";
import Pads from "./Pads";

export default function PadsLayout() {
  const { selectedKit } = useKitContext();
  return (
    <PadsContextProvider selectedKit={selectedKit}>
      <div className="mx-auto grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
        <Pads />
      </div>
    </PadsContextProvider>
  );
}
