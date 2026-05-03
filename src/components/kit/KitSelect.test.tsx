import App from "@/App";
import { db } from "@/lib/db/db";
import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { test, expect, describe } from "vitest";

describe("KitSelect", () => {
  test("shows previously selected kit on load", async () => {
    const kitId = await db.kits.add({ name: "my kit" });
    localStorage.setItem(
      "selectedKit",
      JSON.stringify({ id: kitId, name: "my kit" }),
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("my kit")).toBeInTheDocument();
    });
  });

  test("falls back to default when selectedKit not found in DB", async () => {
    await db.kits.add({ name: "default" });
    localStorage.setItem(
      "selectedKit",
      JSON.stringify({ id: 999, name: "ghost kit" }),
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("default")).toBeInTheDocument();
    });
  });
});
