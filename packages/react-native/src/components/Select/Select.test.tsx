import { createRef } from "react";
import { View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Select, type SelectOption } from "./Select";

jest.mock("../../primitives", () => ({
  CheckIcon: () => {
    const { View: MockView } = require("react-native");
    return <MockView testID="check-icon" />;
  },
}));

const options: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
];

describe("Select", () => {
  it("renders placeholder when no value selected", () => {
    render(<Select options={options} placeholder="Pick a fruit" />);
    expect(screen.getByText("Pick a fruit")).toBeTruthy();
  });

  it("renders as combobox with accessibility label", () => {
    render(<Select options={options} label="Fruit" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeTruthy();
    expect(trigger.getAttribute("aria-label")).toBe("Fruit");
  });

  it("opens the options list when pressed", () => {
    render(<Select options={options} placeholder="Pick a fruit" />);
    fireEvent.press(screen.getByRole("combobox"));
    expect(screen.getByText("Apple")).toBeTruthy();
    expect(screen.getByText("Banana")).toBeTruthy();
  });

  it("selects an option and calls onValueChange", () => {
    const onValueChange = jest.fn();
    render(
      <Select
        options={options}
        placeholder="Pick a fruit"
        onValueChange={onValueChange}
      />
    );
    fireEvent.press(screen.getByRole("combobox"));
    fireEvent.press(screen.getByText("Banana"));
    expect(onValueChange).toHaveBeenCalledWith("banana");
  });

  it("shows the selected label after selection (uncontrolled)", () => {
    render(<Select options={options} placeholder="Pick a fruit" />);
    fireEvent.press(screen.getByRole("combobox"));
    fireEvent.press(screen.getByText("Apple"));
    expect(screen.getByText("Apple")).toBeTruthy();
    expect(screen.queryByText("Pick a fruit")).toBeNull();
  });

  it("respects defaultValue", () => {
    render(<Select options={options} defaultValue="banana" />);
    expect(screen.getByText("Banana")).toBeTruthy();
  });

  it("works as controlled component", () => {
    const onValueChange = jest.fn();
    render(
      <Select options={options} value="apple" onValueChange={onValueChange} />
    );
    expect(screen.getByText("Apple")).toBeTruthy();
    fireEvent.press(screen.getByRole("combobox"));
    fireEvent.press(screen.getByText("Banana"));
    expect(onValueChange).toHaveBeenCalledWith("banana");
    // Controlled: displayed value does not change without prop update
    expect(screen.getByText("Apple")).toBeTruthy();
  });

  it("does not select disabled options", () => {
    const onValueChange = jest.fn();
    render(
      <Select
        options={options}
        placeholder="Pick a fruit"
        onValueChange={onValueChange}
      />
    );
    fireEvent.press(screen.getByRole("combobox"));
    fireEvent.press(screen.getByText("Cherry"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("does not open when disabled", () => {
    render(<Select options={options} placeholder="Pick a fruit" disabled />);
    fireEvent.press(screen.getByRole("combobox"));
    expect(screen.queryByText("Apple")).toBeNull();
  });

  it("marks the selected option with accessibilityState", () => {
    render(<Select options={options} defaultValue="apple" />);
    fireEvent.press(screen.getByRole("combobox"));
    const items = screen.getAllByRole("menuitem");
    expect(items[0].getAttribute("aria-selected")).toBe("true");
  });

  it("shows check icon next to the selected option", () => {
    render(<Select options={options} defaultValue="apple" />);
    fireEvent.press(screen.getByRole("combobox"));
    expect(screen.getByTestId("check-icon")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Select ref={ref} options={options} />);
    expect(ref.current).toBeTruthy();
  });
});
