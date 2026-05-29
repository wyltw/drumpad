import { render, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { listKits } from "../services/KitsService";
import App from "@/App";

describe("Kits", () => {
  test("should seed successfully", async () => {
    render(<App />);
    await waitFor(async () => {
      const kits = await listKits();
      const defaultKit = kits.find((kit) => kit.name === "default");
      const jazzKit = kits.find((kit) => kit.name === "jazz");
      expect(defaultKit).toBeTruthy();
      expect(jazzKit).toBeTruthy();
    });
  });
});
