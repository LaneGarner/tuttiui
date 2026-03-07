import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup } from "./RadioGroup";
import { RadioItem } from "./RadioItem";

const renderGroup = (props: Record<string, unknown> = {}) =>
  render(
    <RadioGroup name="fruit" {...props}>
      <label>
        <RadioItem value="apple" /> Apple
      </label>
      <label>
        <RadioItem value="banana" /> Banana
      </label>
      <label>
        <RadioItem value="cherry" /> Cherry
      </label>
    </RadioGroup>
  );

describe("Radio", () => {
  it("renders a radio group with items", () => {
    renderGroup();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("handles selection change", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderGroup({ onValueChange: handleChange });

    await user.click(screen.getAllByRole("radio")[1]);
    expect(handleChange).toHaveBeenCalledWith("banana");
  });

  it("supports controlled mode", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { rerender } = render(
      <RadioGroup name="fruit" value="apple" onValueChange={handleChange}>
        <RadioItem value="apple" />
        <RadioItem value="banana" />
      </RadioGroup>
    );

    const [apple, banana] = screen.getAllByRole("radio");
    expect(apple).toBeChecked();
    expect(banana).not.toBeChecked();

    await user.click(banana);
    expect(handleChange).toHaveBeenCalledWith("banana");
    // Still apple because controlled
    expect(apple).toBeChecked();

    rerender(
      <RadioGroup name="fruit" value="banana" onValueChange={handleChange}>
        <RadioItem value="apple" />
        <RadioItem value="banana" />
      </RadioGroup>
    );
    expect(banana).toBeChecked();
  });

  it("supports uncontrolled mode with defaultValue", async () => {
    const user = userEvent.setup();
    renderGroup({ defaultValue: "cherry" });

    const radios = screen.getAllByRole("radio");
    expect(radios[2]).toBeChecked();

    await user.click(radios[0]);
    expect(radios[0]).toBeChecked();
  });

  it("disables all items when group is disabled", () => {
    renderGroup({ disabled: true });
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it("tab navigates to radio items", async () => {
    const user = userEvent.setup();
    renderGroup({ defaultValue: "apple" });

    await user.tab();
    expect(screen.getAllByRole("radio")[0]).toHaveFocus();
  });

  it("forwards ref on RadioItem", () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>;
    render(
      <RadioGroup name="test">
        <RadioItem ref={ref} value="a" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
