import { AuthContext } from "@core/contexts";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Navbar } from "./Navbar";

vi.mock("@core/services", () => {
  return {
    auth: vi.fn(),
    FirebaseSignInService: vi.fn(),
  };
});

vi.mock("lottie-react", () => {
  return {
    useLottie: vi.fn(),
  };
});

vi.mock("next/router", () => {
  return {
    useRouter: () => ({ pathname: "/" }),
  };
});

const MockedNavbar = ({ noUser }: { noUser?: boolean }) => {
  const fakeUser = {
    id: "id",
    name: "name",
    avatar: "https://github.com/slycooper-n.png",
  };

  return (
    <AuthContext.Provider
      value={{
        user: noUser ? undefined : fakeUser,
        loading: false,
        signInWithGoogle: vi.fn(),
        signOut: vi.fn(),
      }}
    >
      <Navbar />
    </AuthContext.Provider>
  );
};

describe("Navbar", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should show Login button if user is not logged in", () => {
    render(<MockedNavbar noUser />);

    expect(
      screen.getAllByRole("link", { name: "Login" })[0]
    ).toBeInTheDocument();
  });

  it("should show AvatarPopover if user is logged in", () => {
    render(<MockedNavbar />);

    expect(screen.getByAltText("name's avatar")).toBeInTheDocument();
  });
});
