import { createRef } from "react";
import { View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Checkbox } from "./Checkbox";

jest.mock("../../primitives", () => ({
  CheckIcon: ({ size, color }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="check-icon" />;
  },
}));

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeTruthy();
    expect(screen.queryByTestId("check-icon")).toBeNull();
  });

  it("calls onCheckedChange when pressed", () => {
    const onCheckedChange = jest.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);
    fireEvent.press(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles uncontrolled state", () => {
    const onCheckedChange = jest.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.press(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    fireEvent.press(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("shows check icon when checked", () => {
    render(<Checkbox checked />);
    expect(screen.getByTestId("check-icon")).toBeTruthy();
  });

  it("works as controlled component", () => {
    const onCheckedChange = jest.fn();
    render(<Checkbox checked={false} onCheckedChange={onCheckedChange} />);
    fireEvent.press(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("respects defaultChecked", () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByTestId("check-icon")).toBeTruthy();
  });

  it("does not toggle when disabled", () => {
    const onCheckedChange = jest.fn();
    render(<Checkbox disabled onCheckedChange={onCheckedChange} />);
    fireEvent.press(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts size prop", () => {
    render(<Checkbox size="lg" checked />);
    expect(screen.getByRole("checkbox")).toBeTruthy();
  });
});
