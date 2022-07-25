import { AuthContext } from "@core/contexts";
import { cleanup, render, screen } from "@testing-library/react";
import Login from "pages/login";
import { afterEach, describe, expect, it, vi } from "vitest";

// vi.mock("@core/hooks", () => {
//   return {
//     useAuth: vi.fn(() => {
//       return {
//         user: {
//           id: "id",
//           name: "name",
//           avatar: "avatar",
//         },
//         signInWithGoogle: vi.fn(),
//       };
//     }),

//     useTheme: vi.fn(() => {
//       return {
//         appTheme: "dark",
//       };
//     }),
//   };
// });

vi.mock("lottie-react", () => {
  return {
    useLottie: vi.fn(),
  };
});

vi.mock("@core/services", () => {
  return {
    auth: vi.fn(),
    FirebaseSignInService: vi.fn(),
  };
});

const MockedAuthContext = ({ noUser }: { noUser?: boolean }) => {
  const mockedValuesWithUser = {
    user: {
      id: "id",
      name: "name",
      avatar: "avatar",
    },
    loading: false,
    signInWithGoogle: vi.fn(),
  };

  const mockedValuesWithoutUser = {
    user: undefined,
    loading: false,
    signInWithGoogle: vi.fn(),
  };

  if (noUser) {
    return (
      <AuthContext.Provider value={mockedValuesWithoutUser}>
        <Login />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={mockedValuesWithUser}>
      <Login />
    </AuthContext.Provider>
  );
};

describe("Login page", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the logo", () => {
    render(<Login />);

    expect(screen.getByText(/only/i)).toBeInTheDocument();
  });

  it("should show 'All set' message when user is logged in", () => {
    render(<MockedAuthContext />);

    expect(screen.getByText(/all set/i)).toBeInTheDocument();
  });

  it("should show 'Login' button when user is not logged in", () => {
    render(<MockedAuthContext noUser />);

    expect(screen.getByText(/login with google/i)).toBeInTheDocument();
  });
});
