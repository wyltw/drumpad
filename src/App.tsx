import { Toaster } from "sonner";
import CallToAction from "./components/CallToAction";
import KitSelection from "./components/KitSelect";
import Pads from "./components/Pads";
import AppProviders from "./lib/contexts/AppProviders";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback";

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
                <KitSelection />
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
