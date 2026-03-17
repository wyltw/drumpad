import CallToAction from "./components/CallToAction";
import Pad from "./components/Pad";
import { HOUSE_KIT } from "./lib/constants";
import SamplePackContextProvider from "./lib/contexts/SamplePackContextProvider";

function App() {
  return (
    <SamplePackContextProvider>
      <main className="container mx-auto grid min-h-screen grid-cols-[fit-content(520px)_1fr] overflow-hidden">
        <div className="col-span-1 mt-32 place-items-center px-6">
          <CallToAction />
        </div>
        <div className="col-span-1 mx-auto mt-auto grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
          {HOUSE_KIT.map((sample, index) => (
            <Pad key={sample.name} sample={sample} order={String(index + 1)} />
          ))}
        </div>
      </main>
    </SamplePackContextProvider>
  );
}

export default App;
