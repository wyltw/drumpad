import App from "@/App";
import { db } from "@/lib/db/db";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("KitNameEditor", () => {
  test("should switch to edit mode", async () => {
    const user = userEvent.setup();
    render(<App />);
    const editButton = screen.getByRole("button", { name: "Edit kit name" });
    await user.click(editButton);
    const kitNameInput = screen.getByLabelText("kitName");
    expect(kitNameInput).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirm kit name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancel editing" }),
    ).toBeInTheDocument();
  });
  test("updates kit name in DB after confirming edit", async () => {
    const kitId = await db.kits.add({ name: "my kit" });
    localStorage.setItem("selectedKit", JSON.stringify({ id: kitId, name: "my kit" }));

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Edit kit name" }));
    const input = screen.getByLabelText("kitName");
    await user.clear(input);
    await user.type(input, "renamed kit");
    await user.click(screen.getByRole("button", { name: "Confirm kit name" }));

    await waitFor(async () => {
      const kit = await db.kits.get(kitId);
      expect(kit?.name).toBe("renamed kit");
    });
  });

  test("buttons should be disabled when kit is default", async () => {
    const kitId = await db.kits.add({ name: "default" });
    localStorage.setItem("selectedKit", JSON.stringify({ id: kitId, name: "default" }));

    render(<App />);

    expect(screen.getByRole("button", { name: "Edit kit name" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Delete kit" })).toBeDisabled();
  });
});
