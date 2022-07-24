import { render, screen } from "@testing-library/react";
import Login from "pages/login";
import { describe, expect, it, vi } from "vitest";

vi.mock("@core/hooks", () => {
  return {
    useAuth: vi.fn(() => {
      return {
        user: {
          id: "id",
          name: "name",
          avatar: "avatar",
        },
        signInWithGoogle: vi.fn(),
      };
    }),

    useTheme: vi.fn(() => {
      return {
        appTheme: "dark",
      };
    }),
  };
});

describe("Login page", () => {
  it("should render", () => {
    render(<Login />);

    expect(screen.getByText(/only/i)).toBeInTheDocument();
  });
});
