import App from "@/App";
import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { test, expect, describe } from "vitest";

describe("KitSelect", () => {
  test("load selectedKit based on localStorage", async () => {
    localStorage.setItem(
      "selectedKit",
      JSON.stringify({ id: 1, name: "test" }),
    );
    render(<App />);
    const select = await screen.findByText("test");
    await waitFor(() => {
      expect(select).toBeInTheDocument();
    });
  });
});
