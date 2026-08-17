import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when loading", () => {
    render(<Button loading>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("does not fire click when disabled", () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="primary">Btn</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "primary");

    rerender(<Button variant="danger">Btn</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "danger");
  });

  it("applies size classes", () => {
    render(<Button size="lg">Btn</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    render(<Button ref={ref}>Btn</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
