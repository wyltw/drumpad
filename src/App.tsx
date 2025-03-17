import CallToAction from "./components/CallToAction";
import Pad from "./components/Pad";

function App() {
  return (
    <main className="mesh-background grid min-h-screen grid-cols-[fit-content(520px)_1fr]">
      <div className="col-span-1 mt-32 place-items-center px-6">
        <CallToAction />
      </div>
      <div className="col-span-1 grid h-4/5 w-3xl grid-cols-3 grid-rows-3 place-items-center">
        {Array.from({ length: 9 }).map((_, index) => (
          <Pad order={String(index + 1)} />
        ))}
      </div>
    </main>
  );
}

export default App;
