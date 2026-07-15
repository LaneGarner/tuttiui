import { createRef } from "react";
import { Text, View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { RadioGroup } from "./RadioGroup";
import { RadioItem } from "./RadioItem";

const renderGroup = (props: Record<string, unknown> = {}) =>
  render(
    <RadioGroup name="fruit" {...props}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioItem value="apple" testID="radio-apple" />
        <Text>Apple</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioItem value="banana" testID="radio-banana" />
        <Text>Banana</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioItem value="cherry" testID="radio-cherry" />
        <Text>Cherry</Text>
      </View>
    </RadioGroup>
  );

describe("Radio", () => {
  it("renders a radio group with items", () => {
    renderGroup();
    expect(screen.getByRole("radiogroup")).toBeTruthy();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("handles selection change", () => {
    const handleChange = jest.fn();
    renderGroup({ onValueChange: handleChange });

    fireEvent.press(screen.getByTestId("radio-banana"));
    expect(handleChange).toHaveBeenCalledWith("banana");
  });

  it("supports controlled mode", () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <RadioGroup name="fruit" value="apple" onValueChange={handleChange}>
        <RadioItem value="apple" testID="radio-apple" />
        <RadioItem value="banana" testID="radio-banana" />
      </RadioGroup>
    );

    const apple = screen.getByTestId("radio-apple");
    const banana = screen.getByTestId("radio-banana");

    expect(apple.getAttribute("aria-checked")).toBe("true");
    expect(banana.getAttribute("aria-checked")).toBe("false");

    fireEvent.press(banana);
    expect(handleChange).toHaveBeenCalledWith("banana");
    // Still apple because controlled
    expect(apple.getAttribute("aria-checked")).toBe("true");

    rerender(
      <RadioGroup name="fruit" value="banana" onValueChange={handleChange}>
        <RadioItem value="apple" testID="radio-apple" />
        <RadioItem value="banana" testID="radio-banana" />
      </RadioGroup>
    );
    expect(screen.getByTestId("radio-banana").getAttribute("aria-checked")).toBe("true");
  });

  it("supports uncontrolled mode with defaultValue", () => {
    renderGroup({ defaultValue: "cherry" });

    expect(screen.getByTestId("radio-cherry").getAttribute("aria-checked")).toBe("true");

    fireEvent.press(screen.getByTestId("radio-apple"));
    expect(screen.getByTestId("radio-apple").getAttribute("aria-checked")).toBe("true");
    expect(screen.getByTestId("radio-cherry").getAttribute("aria-checked")).toBe("false");
  });

  it("disables all items when group is disabled", () => {
    renderGroup({ disabled: true });
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio.getAttribute("aria-disabled")).toBe("true");
    });
  });

  it("disables individual items", () => {
    render(
      <RadioGroup name="test">
        <RadioItem value="a" testID="radio-a" disabled />
        <RadioItem value="b" testID="radio-b" />
      </RadioGroup>
    );
    expect(screen.getByTestId("radio-a").getAttribute("aria-disabled")).toBe("true");
    expect(screen.getByTestId("radio-b").getAttribute("aria-disabled")).toBe("false");
  });

  it("forwards ref on RadioItem", () => {
    const ref = createRef<View>();
    render(
      <RadioGroup name="test">
        <RadioItem ref={ref} value="a" />
      </RadioGroup>
    );
    expect(ref.current).toBeTruthy();
  });

  it("forwards ref on RadioGroup", () => {
    const ref = createRef<View>();
    render(
      <RadioGroup ref={ref} name="test">
        <RadioItem value="a" />
      </RadioGroup>
    );
    expect(ref.current).toBeTruthy();
  });

  it("throws when RadioItem is used outside RadioGroup", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() =>
      render(<RadioItem value="orphan" testID="orphan" />)
    ).toThrow("RadioItem must be used within a RadioGroup");

    consoleSpy.mockRestore();
  });
});
