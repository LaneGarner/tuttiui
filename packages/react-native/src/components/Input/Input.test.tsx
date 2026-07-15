import { createRef } from "react";
import { TextInput } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const onChangeText = jest.fn();
    render(<Input placeholder="Type here" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByPlaceholderText("Type here"), "hello");
    expect(onChangeText).toHaveBeenCalledWith("hello");
  });

  it("calls onFocus and onBlur", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <Input
        placeholder="Focus test"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
    const input = screen.getByPlaceholderText("Focus test");
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = createRef<TextInput>();
    render(<Input ref={ref} placeholder="Ref test" />);
    expect(ref.current).toBeTruthy();
  });

  it("renders with error state", () => {
    render(<Input testID="input-error" error placeholder="Error" />);
    expect(screen.getByPlaceholderText("Error")).toBeTruthy();
  });

  it("renders with different sizes", () => {
    render(<Input placeholder="Small" size="sm" />);
    expect(screen.getByPlaceholderText("Small")).toBeTruthy();
  });

  it("renders in disabled state", () => {
    render(<Input placeholder="Disabled" disabled />);
    expect(screen.getByPlaceholderText("Disabled")).toBeTruthy();
  });
});
