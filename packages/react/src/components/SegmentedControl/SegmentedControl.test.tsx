import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { SegmentedControl, Segment } from "./SegmentedControl";

const ControlledHarness = ({
  onChange,
  initialValue = "1x",
}: {
  onChange?: (value: string) => void;
  initialValue?: string;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <SegmentedControl
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    >
      <Segment value="1x">1×</Segment>
      <Segment value="2x">2×</Segment>
      <Segment value="3x">3×</Segment>
    </SegmentedControl>
  );
};

describe("SegmentedControl", () => {
  it("renders with radiogroup role and radio segments", () => {
    render(<ControlledHarness />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("marks the selected segment with aria-checked and data-state", () => {
    render(<ControlledHarness initialValue="2x" />);
    const active = screen.getByRole("radio", { name: "2×" });
    expect(active).toHaveAttribute("aria-checked", "true");
    expect(active).toHaveAttribute("data-state", "active");
    const inactive = screen.getByRole("radio", { name: "1×" });
    expect(inactive).toHaveAttribute("aria-checked", "false");
    expect(inactive).toHaveAttribute("data-state", "inactive");
  });

  it("calls onChange when clicking a segment", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<ControlledHarness onChange={handleChange} />);

    await user.click(screen.getByRole("radio", { name: "3×" }));
    expect(handleChange).toHaveBeenCalledWith("3x");
    expect(screen.getByRole("radio", { name: "3×" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("is controlled: value does not change without onChange updating it", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <SegmentedControl value="1x" onChange={handleChange}>
        <Segment value="1x">1×</Segment>
        <Segment value="2x">2×</Segment>
      </SegmentedControl>
    );

    await user.click(screen.getByRole("radio", { name: "2×" }));
    expect(handleChange).toHaveBeenCalledWith("2x");
    expect(screen.getByRole("radio", { name: "1×" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("only the active segment is in the tab order", () => {
    render(<ControlledHarness initialValue="2x" />);
    expect(screen.getByRole("radio", { name: "2×" })).toHaveAttribute(
      "tabindex",
      "0"
    );
    expect(screen.getByRole("radio", { name: "1×" })).toHaveAttribute(
      "tabindex",
      "-1"
    );
    expect(screen.getByRole("radio", { name: "3×" })).toHaveAttribute(
      "tabindex",
      "-1"
    );
  });

  it("moves focus and selection with ArrowRight, wrapping at the end", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<ControlledHarness onChange={handleChange} initialValue="3x" />);

    screen.getByRole("radio", { name: "3×" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("radio", { name: "1×" })).toHaveFocus();
    expect(handleChange).toHaveBeenCalledWith("1x");
    expect(screen.getByRole("radio", { name: "1×" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("moves focus and selection with ArrowLeft, wrapping at the start", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<ControlledHarness onChange={handleChange} initialValue="1x" />);

    screen.getByRole("radio", { name: "1×" }).focus();
    await user.keyboard("{ArrowLeft}");

    expect(screen.getByRole("radio", { name: "3×" })).toHaveFocus();
    expect(handleChange).toHaveBeenCalledWith("3x");
  });

  it("supports Home and End keys", async () => {
    const user = userEvent.setup();
    render(<ControlledHarness initialValue="2x" />);

    screen.getByRole("radio", { name: "2×" }).focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("radio", { name: "3×" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "3×" })).toHaveAttribute(
      "aria-checked",
      "true"
    );

    await user.keyboard("{Home}");
    expect(screen.getByRole("radio", { name: "1×" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "1×" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("renders data-size on the group", () => {
    render(
      <SegmentedControl value="a" onChange={() => {}} size="sm">
        <Segment value="a">A</Segment>
      </SegmentedControl>
    );
    expect(screen.getByRole("radiogroup")).toHaveAttribute("data-size", "sm");
  });

  it("disables all segments when the group is disabled", () => {
    render(
      <SegmentedControl value="a" onChange={() => {}} disabled>
        <Segment value="a">A</Segment>
        <Segment value="b">B</Segment>
      </SegmentedControl>
    );
    expect(screen.getByRole("radio", { name: "A" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "B" })).toBeDisabled();
  });

  it("forwards refs on group and segment", () => {
    const groupRef = createRef<HTMLDivElement>();
    const segmentRef = createRef<HTMLButtonElement>();
    render(
      <SegmentedControl ref={groupRef} value="a" onChange={() => {}}>
        <Segment ref={segmentRef} value="a">
          A
        </Segment>
      </SegmentedControl>
    );
    expect(groupRef.current).toBeInstanceOf(HTMLDivElement);
    expect(segmentRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies custom className on group and segment", () => {
    render(
      <SegmentedControl
        value="a"
        onChange={() => {}}
        className="custom-group"
      >
        <Segment value="a" className="custom-segment">
          A
        </Segment>
      </SegmentedControl>
    );
    expect(screen.getByRole("radiogroup")).toHaveClass("custom-group");
    expect(screen.getByRole("radio", { name: "A" })).toHaveClass(
      "custom-segment"
    );
  });

  it("throws when Segment is used outside SegmentedControl", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Segment value="a">A</Segment>)).toThrow(
      "Segment must be used within a SegmentedControl"
    );
    spy.mockRestore();
  });
});
