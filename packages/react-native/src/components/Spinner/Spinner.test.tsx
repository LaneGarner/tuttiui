import { createRef } from "react";
import { View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { Spinner } from "./Spinner";

jest.mock("../../primitives", () => ({
  AnimatedSpinner: ({ size, color, ...props }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="animated-spinner" {...props} />;
  },
}));

describe("Spinner", () => {
  it("renders with default props", () => {
    render(<Spinner testID="spinner" />);
    expect(screen.getByTestId("spinner")).toBeTruthy();
  });

  it("has accessibility label", () => {
    render(<Spinner label="Processing" />);
    expect(screen.getByLabelText("Processing")).toBeTruthy();
  });

  it("uses default label when none provided", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading")).toBeTruthy();
  });

  it("renders the AnimatedSpinner primitive", () => {
    render(<Spinner />);
    expect(screen.getByTestId("animated-spinner")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});
