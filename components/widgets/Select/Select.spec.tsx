import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

describe.skip("Select", () => {
  it("should toggle on click", async () => {
    render(
      <Select
        selectedValue="1"
        changeValue={vi.fn()}
        options={[{ value: "2", text: "2" }]}
      />
    );

    const $select = screen.getByRole("combobox");

    expect($select).toBeInTheDocument();

    await userEvent.click($select);
    expect(screen.getByText("2")).toBeVisible();

    await userEvent.click($select);
    expect(screen.getByText("2")).not.toBeVisible();
  });
});
