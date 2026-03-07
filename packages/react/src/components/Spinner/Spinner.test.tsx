import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has role=status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has aria-label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("accepts custom label", () => {
    render(<Spinner label="Please wait" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Please wait"
    );
  });

  it("applies size variants", () => {
    const { rerender } = render(<Spinner size="sm" />);
    let svg = screen.getByRole("status").querySelector("svg")!;
    expect(svg).toHaveClass("h-4", "w-4");

    rerender(<Spinner size="md" />);
    svg = screen.getByRole("status").querySelector("svg")!;
    expect(svg).toHaveClass("h-6", "w-6");

    rerender(<Spinner size="lg" />);
    svg = screen.getByRole("status").querySelector("svg")!;
    expect(svg).toHaveClass("h-8", "w-8");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("applies custom className", () => {
    render(<Spinner className="text-red-500" />);
    const svg = screen.getByRole("status").querySelector("svg")!;
    expect(svg).toHaveClass("text-red-500");
  });

  it("has animate-spin class on the svg", () => {
    render(<Spinner />);
    const svg = screen.getByRole("status").querySelector("svg")!;
    expect(svg).toHaveClass("animate-spin");
  });
});
