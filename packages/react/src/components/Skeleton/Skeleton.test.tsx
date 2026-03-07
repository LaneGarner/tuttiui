import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Skeleton data-testid="skeleton" className="my-custom-class" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("my-custom-class");
  });

  it("has animate-pulse class", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("animate-pulse");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders with custom dimensions via className", () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-48" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveClass("h-4");
    expect(el).toHaveClass("w-48");
  });
});
