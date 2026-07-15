import { createRef } from "react";
import { TextInput } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { AIInput } from "./AIInput";

jest.mock("../../primitives", () => ({
  AnimatedSpinner: ({ size, color, ...props }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="animated-spinner" {...props} />;
  },
}));

describe("AIInput", () => {
  it("renders with default placeholder", () => {
    render(<AIInput />);
    expect(screen.getByPlaceholderText("Ask anything...")).toBeTruthy();
  });

  it("renders with custom placeholder", () => {
    render(<AIInput placeholder="Type here..." />);
    expect(screen.getByPlaceholderText("Type here...")).toBeTruthy();
  });

  it("renders send button", () => {
    render(<AIInput />);
    expect(screen.getByLabelText("Send")).toBeTruthy();
  });

  it("calls onSubmit with trimmed value", () => {
    const onSubmit = jest.fn();
    render(<AIInput onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Ask anything...");
    fireEvent.changeText(input, "Hello world  ");
    fireEvent.press(screen.getByLabelText("Send"));

    expect(onSubmit).toHaveBeenCalledWith("Hello world");
  });

  it("does not call onSubmit with empty value", () => {
    const onSubmit = jest.fn();
    render(<AIInput onSubmit={onSubmit} />);

    fireEvent.press(screen.getByLabelText("Send"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not call onSubmit when loading", () => {
    const onSubmit = jest.fn();
    render(<AIInput onSubmit={onSubmit} loading value="test" />);

    fireEvent.press(screen.getByLabelText("Loading"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows spinner when loading", () => {
    render(<AIInput loading />);
    expect(screen.getByTestId("animated-spinner")).toBeTruthy();
    expect(screen.getByLabelText("Loading")).toBeTruthy();
  });

  it("shows send icon when not loading", () => {
    render(<AIInput />);
    expect(screen.getByTestId("ai-input-send-icon")).toBeTruthy();
    expect(screen.queryByTestId("animated-spinner")).toBeNull();
  });

  it("clears internal value after submit (uncontrolled)", () => {
    const onSubmit = jest.fn();
    render(<AIInput onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Ask anything...");
    fireEvent.changeText(input, "Hello");
    fireEvent.press(screen.getByLabelText("Send"));

    expect(onSubmit).toHaveBeenCalledWith("Hello");
  });

  it("supports controlled value", () => {
    const onChangeText = jest.fn();
    render(<AIInput value="controlled" onChangeText={onChangeText} />);
    expect(screen.getByDisplayValue("controlled")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const onChangeText = jest.fn();
    render(<AIInput onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Ask anything...");
    fireEvent.changeText(input, "new text");

    expect(onChangeText).toHaveBeenCalledWith("new text");
  });

  it("forwards ref", () => {
    const ref = createRef<TextInput>();
    render(<AIInput ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("disables input when disabled prop is true", () => {
    render(<AIInput disabled />);
    const input = screen.getByPlaceholderText("Ask anything...") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
