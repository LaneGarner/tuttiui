import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("handles checked state change", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Checkbox aria-label="Toggle" onChange={handleChange} />);

    await user.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("supports controlled mode", () => {
    const { rerender } = render(
      <Checkbox aria-label="Controlled" checked={false} onChange={() => {}} />
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();

    rerender(
      <Checkbox aria-label="Controlled" checked={true} onChange={() => {}} />
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("shows disabled state", () => {
    render(<Checkbox aria-label="Disabled" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>;
    render(<Checkbox ref={ref} aria-label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("is keyboard accessible (space to toggle)", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Checkbox aria-label="Keyboard" onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    checkbox.focus();
    await user.keyboard(" ");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies size variant classes", () => {
    const { rerender } = render(<Checkbox aria-label="Size" size="sm" />);
    expect(screen.getByRole("checkbox")).toHaveClass("h-3.5", "w-3.5");

    rerender(<Checkbox aria-label="Size" size="lg" />);
    expect(screen.getByRole("checkbox")).toHaveClass("h-5", "w-5");
  });
});
