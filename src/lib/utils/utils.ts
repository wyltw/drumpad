export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong";
};
