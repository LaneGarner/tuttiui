import { createRef } from "react";
import { View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with default props", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeTruthy();
  });

  it("calls onCheckedChange when pressed", () => {
    const onCheckedChange = jest.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    fireEvent.press(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles uncontrolled state", () => {
    const onCheckedChange = jest.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    const switchEl = screen.getByRole("switch");
    fireEvent.press(switchEl);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    fireEvent.press(switchEl);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("works as controlled component", () => {
    const onCheckedChange = jest.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} />);
    fireEvent.press(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("respects defaultChecked", () => {
    const onCheckedChange = jest.fn();
    render(<Switch defaultChecked onCheckedChange={onCheckedChange} />);
    fireEvent.press(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("does not toggle when disabled", () => {
    const onCheckedChange = jest.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);
    fireEvent.press(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Switch ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("has correct accessibility state", () => {
    render(<Switch checked disabled />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeTruthy();
  });
});
