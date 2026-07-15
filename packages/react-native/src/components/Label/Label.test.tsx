import { createRef } from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { Label } from "./Label";

describe("Label", () => {
  it("renders children text", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toBeTruthy();
  });

  it("shows required asterisk when required is true", () => {
    render(<Label required>Email</Label>);
    expect(screen.getByText("*")).toBeTruthy();
  });

  it("does not show asterisk when required is false", () => {
    render(<Label>Email</Label>);
    expect(screen.queryByText("*")).toBeNull();
  });

  it("forwards ref", () => {
    const ref = createRef<Text>();
    render(<Label ref={ref}>Test</Label>);
    expect(ref.current).toBeTruthy();
  });

  it("passes additional props", () => {
    render(<Label testID="label-test">Test</Label>);
    expect(screen.getByTestId("label-test")).toBeTruthy();
  });
});
