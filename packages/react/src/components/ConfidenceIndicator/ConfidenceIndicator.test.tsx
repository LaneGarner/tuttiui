import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ConfidenceIndicator } from "./ConfidenceIndicator";

describe("ConfidenceIndicator", () => {
  it("renders", () => {
    render(<ConfidenceIndicator value={50} />);
    expect(screen.getByRole("meter")).toBeInTheDocument();
  });

  it("displays correct percentage text", () => {
    render(<ConfidenceIndicator value={73} />);
    expect(screen.getByText("73%")).toBeInTheDocument();
  });

  it("bar width matches value", () => {
    render(<ConfidenceIndicator value={65} />);
    const bar = screen.getByTestId("confidence-bar");
    expect(bar).toHaveStyle({ width: "65%" });
  });

  it("color is red when value < 30", () => {
    render(<ConfidenceIndicator value={15} />);
    const bar = screen.getByTestId("confidence-bar");
    expect(bar).toHaveAttribute("data-level", "low");
  });

  it("color is amber when value 30-59", () => {
    render(<ConfidenceIndicator value={45} />);
    const bar = screen.getByTestId("confidence-bar");
    expect(bar).toHaveAttribute("data-level", "medium");
  });

  it("color is green when value >= 60", () => {
    render(<ConfidenceIndicator value={80} />);
    const bar = screen.getByTestId("confidence-bar");
    expect(bar).toHaveAttribute("data-level", "high");
  });

  it("clamps negative value to 0", () => {
    render(<ConfidenceIndicator value={-20} />);
    const bar = screen.getByTestId("confidence-bar");
    expect(bar).toHaveStyle({ width: "0%" });
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "0");
  });

  it("clamps value over 100 to 100", () => {
    render(<ConfidenceIndicator value={150} />);
    const bar = screen.getByTestId("confidence-bar");
    expect(bar).toHaveStyle({ width: "100%" });
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "100");
  });

  it("renders label", () => {
    render(<ConfidenceIndicator value={50} label="Accuracy" />);
    expect(screen.getByText("Accuracy")).toBeInTheDocument();
  });

  it("hides percentage when showPercentage is false", () => {
    render(<ConfidenceIndicator value={50} showPercentage={false} />);
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("applies size variants", () => {
    const { rerender } = render(
      <ConfidenceIndicator value={50} size="sm" />
    );
    let track = screen.getByTestId("confidence-bar").parentElement!;
    expect(track).toHaveClass("h-1.5");
    expect(track).toHaveClass("w-24");

    rerender(<ConfidenceIndicator value={50} size="md" />);
    track = screen.getByTestId("confidence-bar").parentElement!;
    expect(track).toHaveClass("h-2");
    expect(track).toHaveClass("w-40");

    rerender(<ConfidenceIndicator value={50} size="lg" />);
    track = screen.getByTestId("confidence-bar").parentElement!;
    expect(track).toHaveClass("h-3");
    expect(track).toHaveClass("w-64");
  });

  it("has role=meter and aria attributes", () => {
    render(<ConfidenceIndicator value={42} label="Score" />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuenow", "42");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");
    expect(meter).toHaveAttribute("aria-label", "Score");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<ConfidenceIndicator ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(<ConfidenceIndicator value={50} className="my-custom-class" />);
    expect(screen.getByRole("meter")).toHaveClass("my-custom-class");
  });
});
