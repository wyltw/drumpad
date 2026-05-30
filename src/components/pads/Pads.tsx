import { useKitContext } from "@/lib/contexts/KitContextProvider";
import Pad from "./Pad";
import { useKit } from "@/lib/adapters/KitsAdapter";
import PadsToolbar from "./PadsToolbar";
import VolumeContextProvider from "@/lib/contexts/VolumeContextProvider";
import { Spinner } from "../ui/spinner";
import { ReactNode } from "react";

export default function Pads() {
  const { selectedKit } = useKitContext();
  const { kit } = useKit(selectedKit?.id);
  const pads = kit?.pads ?? [];

  return (
    <VolumeContextProvider>
      <div className="mt-4 flex justify-center gap-2">
        {kit ? (
          <>
            <PadsLayout>
              {pads.map((pad) => (
                <Pad key={pad.id} pad={pad} />
              ))}
            </PadsLayout>
            <PadsToolbar pads={pads} />
          </>
        ) : (
          <Spinner className="size-32" />
        )}
      </div>
    </VolumeContextProvider>
  );
}

function PadsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
      {children}
    </div>
  );
}
