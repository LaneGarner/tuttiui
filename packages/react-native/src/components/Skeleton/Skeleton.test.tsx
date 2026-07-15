import { createRef } from "react";
import { View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { Skeleton } from "./Skeleton";

// Mock AnimatedPulse since reanimated isn't available in test
jest.mock("../../primitives", () => ({
  AnimatedPulse: ({ children, ...props }: any) => children,
}));

describe("Skeleton", () => {
  it("renders", () => {
    render(<Skeleton testID="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeTruthy();
  });

  it("passes additional props", () => {
    render(<Skeleton testID="skeleton-test" />);
    expect(screen.getByTestId("skeleton-test")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Skeleton ref={ref} testID="skeleton" />);
    expect(ref.current).toBeTruthy();
  });

  it("renders with custom dimensions via className", () => {
    render(<Skeleton testID="skeleton" className="h-4 w-48" />);
    expect(screen.getByTestId("skeleton")).toBeTruthy();
  });

  it("accepts custom duration", () => {
    render(<Skeleton testID="skeleton" duration={2000} />);
    expect(screen.getByTestId("skeleton")).toBeTruthy();
  });
});
