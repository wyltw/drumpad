import CallToAction from "./components/CallToAction";
import KitSelection from "./components/KitSelect";
import PadsLayout from "./components/PadsLayout";
import AppProviders from "./lib/contexts/AppProviders";

function App() {
  return (
    <>
      <header className="px-4 py-2">
        <CallToAction />
      </header>
      <AppProviders>
        <main className="container mx-auto flex min-h-screen flex-col overflow-hidden">
          <KitSelection />
          <PadsLayout />
        </main>
      </AppProviders>
    </>
  );
}

export default App;
