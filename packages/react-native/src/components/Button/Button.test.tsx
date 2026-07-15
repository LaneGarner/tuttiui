import { createRef } from "react";
import { View, Text } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Button } from "./Button";

jest.mock("../../primitives", () => ({
  AnimatedSpinner: ({ size, color, ...props }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="animated-spinner" {...props} />;
  },
}));

describe("Button", () => {
  it("renders with text children", () => {
    render(<Button>Press me</Button>);
    expect(screen.getByText("Press me")).toBeTruthy();
  });

  it("renders with custom children", () => {
    render(
      <Button>
        <Text>Custom child</Text>
      </Button>
    );
    expect(screen.getByText("Custom child")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress}>Click</Button>);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    render(
      <Button onPress={onPress} disabled>
        Click
      </Button>
    );
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("does not call onPress when loading", () => {
    const onPress = jest.fn();
    render(
      <Button onPress={onPress} loading>
        Click
      </Button>
    );
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows spinner when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByTestId("animated-spinner")).toBeTruthy();
  });

  it("does not show spinner when not loading", () => {
    render(<Button>Click</Button>);
    expect(screen.queryByTestId("animated-spinner")).toBeNull();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Button ref={ref}>Test</Button>);
    expect(ref.current).toBeTruthy();
  });

  it("has correct accessibility role", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("accepts variant prop", () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByText("Delete")).toBeTruthy();
  });

  it("accepts size prop", () => {
    render(<Button size="lg">Big</Button>);
    expect(screen.getByText("Big")).toBeTruthy();
  });
});
