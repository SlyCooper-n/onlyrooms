import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo widget", () => {
  it("should render", () => {
    render(<Logo />);

    expect(screen.getByText(/only/i)).toBeInTheDocument();
  });
});
