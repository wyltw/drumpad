import { Toaster } from "sonner";
import CallToAction from "./components/sections/CallToAction";
import KitSelect from "./components/kit/KitSelect";
import Pads from "./components/pads/Pads";
import AppProviders from "./lib/contexts/AppProviders";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/sections/ErrorFallback";

function App() {
  return (
    <>
      <AppProviders>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="min-h-screen">
            <header className="px-4 py-2">
              <CallToAction />
            </header>
            <main className="container mx-auto mt-8 flex flex-col items-center overflow-hidden">
              <div>
                <KitSelect />
                <Pads />
              </div>
            </main>
          </div>
        </ErrorBoundary>
      </AppProviders>
      <Toaster />
    </>
  );
}

export default App;
