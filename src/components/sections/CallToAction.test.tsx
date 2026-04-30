import { render, screen } from "@testing-library/react";
import CallToAction from "./CallToAction";
import { describe, expect, it } from "vitest";

describe("CallToAction", () => {
  it("renders the app title", () => {
    render(<CallToAction />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "DrumPad",
    );
  });

  it("renders the tagline", () => {
    render(<CallToAction />);
    expect(screen.getByText(/a simple drum pad/i)).toBeInTheDocument();
  });
});
