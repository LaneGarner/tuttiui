import { createRef } from "react";
import { TextInput } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders with placeholder", () => {
    render(<Textarea placeholder="Write something..." />);
    expect(screen.getByPlaceholderText("Write something...")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const onChangeText = jest.fn();
    render(<Textarea placeholder="Notes" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByPlaceholderText("Notes"), "hello world");
    expect(onChangeText).toHaveBeenCalledWith("hello world");
  });

  it("is not editable when disabled", () => {
    render(<Textarea placeholder="Notes" disabled />);
    const input = screen.getByPlaceholderText("Notes");
    expect(input.getAttribute("data-editable")).toBe("false");
  });

  it("sets accessibilityState disabled", () => {
    render(<Textarea placeholder="Notes" disabled />);
    const input = screen.getByPlaceholderText("Notes");
    expect(input.getAttribute("aria-disabled")).toBe("true");
  });

  it("renders with error state", () => {
    render(<Textarea placeholder="Notes" error />);
    expect(screen.getByPlaceholderText("Notes")).toBeTruthy();
  });

  it("calls onFocus and onBlur handlers", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(<Textarea placeholder="Notes" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText("Notes");
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = createRef<TextInput>();
    render(<Textarea ref={ref} placeholder="Notes" />);
    expect(ref.current).toBeTruthy();
  });

  it("renders controlled value", () => {
    render(<Textarea placeholder="Notes" value="controlled text" />);
    const input = screen.getByPlaceholderText("Notes") as HTMLInputElement;
    expect(input.value).toBe("controlled text");
  });
});
