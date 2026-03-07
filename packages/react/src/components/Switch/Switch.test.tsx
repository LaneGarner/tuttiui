import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders a switch", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch", { name: "Toggle" })).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={handleChange} />);

    await user.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("supports controlled mode", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { rerender } = render(
      <Switch aria-label="Controlled" checked={false} onCheckedChange={handleChange} />
    );

    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");

    await user.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
    // Still false because controlled
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");

    rerender(
      <Switch aria-label="Controlled" checked={true} onCheckedChange={handleChange} />
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("supports uncontrolled mode", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Uncontrolled" />);

    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-checked", "false");

    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");

    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  it("shows disabled state", () => {
    render(<Switch aria-label="Disabled" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Switch aria-label="Disabled" disabled onCheckedChange={handleChange} />
    );

    await user.click(screen.getByRole("switch"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    render(<Switch ref={ref} aria-label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has correct aria-checked attribute", () => {
    const { rerender } = render(
      <Switch aria-label="Aria" checked={false} onCheckedChange={() => {}} />
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");

    rerender(
      <Switch aria-label="Aria" checked={true} onCheckedChange={() => {}} />
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("toggles on space key", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Switch aria-label="Keyboard" onCheckedChange={handleChange} />);

    const sw = screen.getByRole("switch");
    sw.focus();
    await user.keyboard(" ");
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("applies size variant classes", () => {
    const { rerender } = render(<Switch aria-label="Size" size="sm" />);
    expect(screen.getByRole("switch")).toHaveClass("h-5", "w-9");

    rerender(<Switch aria-label="Size" size="lg" />);
    expect(screen.getByRole("switch")).toHaveClass("h-7", "w-14");
  });
});
