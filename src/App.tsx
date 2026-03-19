import CallToAction from "./components/CallToAction";
import KitSelection from "./components/KitSelect";
import PadsLayout from "./components/PadsLayout";
import AppProviders from "./lib/contexts/AppProviders";

function App() {
  return (
    <>
      <AppProviders>
        <div className="min-h-screen">
          <header className="px-4 py-2">
            <CallToAction />
          </header>
          <main className="container mx-auto flex flex-col overflow-hidden">
            <KitSelection />
            <PadsLayout />
          </main>
        </div>
      </AppProviders>
    </>
  );
}

export default App;
