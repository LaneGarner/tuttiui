import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders progressbar role", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets correct width style based on value", () => {
    render(<Progress value={60} />);
    const bar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(bar).toHaveStyle({ width: "60%" });
  });

  it("clamps negative value to 0%", () => {
    render(<Progress value={-10} />);
    const bar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(bar).toHaveStyle({ width: "0%" });
  });

  it("clamps value over max to 100%", () => {
    render(<Progress value={150} max={100} />);
    const bar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(bar).toHaveStyle({ width: "100%" });
  });

  it("has correct aria attributes", () => {
    render(<Progress value={30} max={50} />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "30");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "50");
  });

  it("applies size variants", () => {
    const { rerender } = render(<Progress value={50} size="sm" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-1");

    rerender(<Progress value={50} size="md" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-2");

    rerender(<Progress value={50} size="lg" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-3");
  });

  it("applies color variants", () => {
    const { rerender } = render(<Progress value={50} variant="default" />);
    let bar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(bar).toHaveAttribute("data-variant", "default");

    rerender(<Progress value={50} variant="success" />);
    bar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(bar).toHaveAttribute("data-variant", "success");

    rerender(<Progress value={50} variant="warning" />);
    bar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(bar).toHaveAttribute("data-variant", "warning");

    rerender(<Progress value={50} variant="error" />);
    bar = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(bar).toHaveAttribute("data-variant", "error");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(<Progress value={50} className="my-custom-class" />);
    expect(screen.getByRole("progressbar")).toHaveClass("my-custom-class");
  });
});
