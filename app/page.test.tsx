import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the homepage", () => {
    render(<Home />);
    expect(screen.getByText("Vibe List")).toBeInTheDocument();
    expect(
      screen.getByText("Shared shopping list web app")
    ).toBeInTheDocument();
  });
});
