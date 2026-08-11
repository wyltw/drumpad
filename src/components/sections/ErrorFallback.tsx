import { handleError } from "@/lib/utils/utils";

type ErrorFallbackProps = { error: unknown };
export function ErrorFallback({ error }: ErrorFallbackProps) {
  const errorText = handleError(error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{errorText}</pre>
    </div>
  );
}
