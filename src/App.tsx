import CallToAction from "./components/CallToAction";
import KitSelection from "./components/KitSelection";
import Pad from "./components/Pad";
import { HOUSE_KIT } from "./lib/constants";
import PadsContextProvider from "./lib/contexts/PadsContextProvider";

function App() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col overflow-hidden">
      <div className="px-6">
        <CallToAction />
      </div>
      <KitSelection />
      <div className="mx-auto grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
        <PadsContextProvider>
          <></>
        </PadsContextProvider>
        {HOUSE_KIT.map((sample, index) => (
          <Pad
            key={sample.sampleName}
            sample={sample}
            order={String(index + 1)}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
