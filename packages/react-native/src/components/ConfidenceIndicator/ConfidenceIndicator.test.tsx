import { createRef } from "react";
import { View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { ConfidenceIndicator } from "./ConfidenceIndicator";

describe("ConfidenceIndicator", () => {
  it("renders with a value", () => {
    render(<ConfidenceIndicator value={75} testID="confidence" />);
    expect(screen.getByTestId("confidence")).toBeTruthy();
  });

  it("shows percentage by default", () => {
    render(<ConfidenceIndicator value={42} />);
    expect(screen.getByText("42%")).toBeTruthy();
  });

  it("hides percentage when showPercentage is false", () => {
    render(<ConfidenceIndicator value={42} showPercentage={false} />);
    expect(screen.queryByTestId("confidence-percentage")).toBeNull();
  });

  it("renders label when provided", () => {
    render(<ConfidenceIndicator value={50} label="Accuracy" />);
    expect(screen.getByText("Accuracy")).toBeTruthy();
  });

  it("clamps value to 0-100 range", () => {
    const { rerender } = render(<ConfidenceIndicator value={150} />);
    expect(screen.getByText("100%")).toBeTruthy();

    rerender(<ConfidenceIndicator value={-20} />);
    expect(screen.getByText("0%")).toBeTruthy();
  });

  it("renders the confidence bar", () => {
    render(<ConfidenceIndicator value={60} />);
    const bar = screen.getByTestId("confidence-bar");
    expect(bar).toBeTruthy();
  });

  it("has correct accessibilityValue", () => {
    render(<ConfidenceIndicator value={75} testID="confidence" />);
    const el = screen.getByTestId("confidence");
    expect(Number(el.getAttribute("aria-valuenow"))).toBe(75);
    expect(Number(el.getAttribute("aria-valuemin"))).toBe(0);
    expect(Number(el.getAttribute("aria-valuemax"))).toBe(100);
  });

  it("has default accessibility label when no label provided", () => {
    render(<ConfidenceIndicator value={80} testID="confidence" />);
    expect(screen.getByLabelText("Confidence: 80%")).toBeTruthy();
  });

  it("uses label for accessibility label when provided", () => {
    render(<ConfidenceIndicator value={80} label="Accuracy" testID="confidence" />);
    expect(screen.getByLabelText("Accuracy")).toBeTruthy();
  });

  it("accepts size prop", () => {
    render(<ConfidenceIndicator value={50} size="sm" testID="confidence" />);
    expect(screen.getByTestId("confidence")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<ConfidenceIndicator ref={ref} value={50} />);
    expect(ref.current).toBeTruthy();
  });

  it("shows both label and percentage", () => {
    render(
      <ConfidenceIndicator value={65} label="Score" showPercentage />
    );
    expect(screen.getByText("Score")).toBeTruthy();
    expect(screen.getByText("65%")).toBeTruthy();
  });
});
