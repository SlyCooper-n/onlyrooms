import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AvatarPopover } from "./AvatarPopover";

vi.mock("@core/hooks", () => {
  return {
    useAuth: () => ({
      signOutFromApp: () => Promise.resolve(),
    }),
  };
});

describe("Avatar Popover", () => {
  it("should toggle the popover", async () => {
    render(
      <AvatarPopover
        user={{
          id: "",
          name: "name",
          avatar: "https://github.com/slycooper-n.png",
        }}
      />
    );

    const avatar = screen.getByAltText("name's avatar");

    // check that the popover is visible
    await userEvent.click(avatar);
    expect(screen.getByText(/settings/i)).toBeVisible();

    // check that the popover is not visible
    await userEvent.click(avatar);
    expect(screen.queryByText(/profile/i)).not.toBeInTheDocument();
  });
});
