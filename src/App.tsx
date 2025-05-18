import CallToAction from "./components/CallToAction";
import Pad from "./components/Pad";

function App() {
  return (
    <main className="container mx-auto grid min-h-screen grid-cols-[fit-content(520px)_1fr]">
      <div className="col-span-1 mt-32 place-items-center px-6">
        <CallToAction />
      </div>
      <div className="col-span-1 mx-auto mt-auto grid grid-cols-3 grid-rows-3 place-items-center gap-x-10 gap-y-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <Pad key={index} order={String(index + 1)} />
        ))}
      </div>
    </main>
  );
}

export default App;
