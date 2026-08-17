import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  it("renders as a spinbutton with aria value attributes", () => {
    render(
      <Stepper value={3} min={0} max={10} onChange={() => {}} aria-label="Tofu quantity" />
    );
    const spinbutton = screen.getByRole("spinbutton", { name: "Tofu quantity" });
    expect(spinbutton).toHaveAttribute("aria-valuenow", "3");
    expect(spinbutton).toHaveAttribute("aria-valuemin", "0");
    expect(spinbutton).toHaveAttribute("aria-valuemax", "10");
  });

  it("labels the decrease and increase buttons", () => {
    render(<Stepper value={1} onChange={() => {}} aria-label="Quantity" />);
    expect(screen.getByRole("button", { name: "Decrease" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Increase" })).toBeInTheDocument();
  });

  it("increments on increase click", () => {
    const handleChange = jest.fn();
    render(<Stepper value={2} onChange={handleChange} aria-label="Quantity" />);
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("decrements on decrease click", () => {
    const handleChange = jest.fn();
    render(<Stepper value={2} onChange={handleChange} aria-label="Quantity" />);
    fireEvent.click(screen.getByRole("button", { name: "Decrease" }));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("disables decrease at min", () => {
    const handleChange = jest.fn();
    render(<Stepper value={0} min={0} onChange={handleChange} aria-label="Quantity" />);
    const decrease = screen.getByRole("button", { name: "Decrease" });
    expect(decrease).toBeDisabled();
    fireEvent.click(decrease);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("disables increase at max", () => {
    const handleChange = jest.fn();
    render(
      <Stepper value={5} max={5} onChange={handleChange} aria-label="Quantity" />
    );
    const increase = screen.getByRole("button", { name: "Increase" });
    expect(increase).toBeDisabled();
    fireEvent.click(increase);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("disables both buttons when disabled", () => {
    render(
      <Stepper value={2} max={5} disabled onChange={() => {}} aria-label="Quantity" />
    );
    expect(screen.getByRole("button", { name: "Decrease" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
    expect(screen.getByRole("spinbutton")).toHaveAttribute("data-state", "disabled");
  });

  it("steps with ArrowUp and ArrowDown", () => {
    const handleChange = jest.fn();
    render(
      <Stepper value={3} min={0} max={10} onChange={handleChange} aria-label="Quantity" />
    );
    const spinbutton = screen.getByRole("spinbutton");
    fireEvent.keyDown(spinbutton, { key: "ArrowUp" });
    expect(handleChange).toHaveBeenLastCalledWith(4);
    fireEvent.keyDown(spinbutton, { key: "ArrowDown" });
    expect(handleChange).toHaveBeenLastCalledWith(2);
  });

  it("jumps to min with Home and max with End", () => {
    const handleChange = jest.fn();
    render(
      <Stepper value={5} min={0} max={10} onChange={handleChange} aria-label="Quantity" />
    );
    const spinbutton = screen.getByRole("spinbutton");
    fireEvent.keyDown(spinbutton, { key: "Home" });
    expect(handleChange).toHaveBeenLastCalledWith(0);
    fireEvent.keyDown(spinbutton, { key: "End" });
    expect(handleChange).toHaveBeenLastCalledWith(10);
  });

  it("does not step past bounds via keyboard", () => {
    const handleChange = jest.fn();
    render(
      <Stepper value={0} min={0} max={0} onChange={handleChange} aria-label="Quantity" />
    );
    const spinbutton = screen.getByRole("spinbutton");
    fireEvent.keyDown(spinbutton, { key: "ArrowDown" });
    fireEvent.keyDown(spinbutton, { key: "ArrowUp" });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("ignores keyboard input when disabled", () => {
    const handleChange = jest.fn();
    render(
      <Stepper value={3} disabled onChange={handleChange} aria-label="Quantity" />
    );
    fireEvent.keyDown(screen.getByRole("spinbutton"), { key: "ArrowUp" });
    expect(handleChange).not.toHaveBeenCalled();
  });

  describe("longPressRepeat", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("steps once on pointer down, then repeats after 500ms", () => {
      const handleChange = jest.fn();
      render(
        <Stepper
          value={0}
          max={100}
          longPressRepeat
          onChange={handleChange}
          aria-label="Quantity"
        />
      );
      const increase = screen.getByRole("button", { name: "Increase" });

      fireEvent.pointerDown(increase);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenLastCalledWith(1);

      act(() => {
        jest.advanceTimersByTime(499);
      });
      expect(handleChange).toHaveBeenCalledTimes(1);

      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenLastCalledWith(2);

      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(handleChange).toHaveBeenCalledTimes(3);
      expect(handleChange).toHaveBeenLastCalledWith(3);
    });

    it("accelerates repeats down to 100ms", () => {
      const handleChange = jest.fn();
      render(
        <Stepper
          value={0}
          max={1000}
          longPressRepeat
          onChange={handleChange}
          aria-label="Quantity"
        />
      );
      fireEvent.pointerDown(screen.getByRole("button", { name: "Increase" }));

      act(() => {
        jest.advanceTimersByTime(5000);
      });
      const callsAfterFive = handleChange.mock.calls.length;

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      // At full acceleration the repeat interval is 100ms -> 10 steps/second
      expect(handleChange.mock.calls.length).toBe(callsAfterFive + 10);
    });

    it("stops repeating on pointer up", () => {
      const handleChange = jest.fn();
      render(
        <Stepper
          value={0}
          max={100}
          longPressRepeat
          onChange={handleChange}
          aria-label="Quantity"
        />
      );
      const increase = screen.getByRole("button", { name: "Increase" });
      fireEvent.pointerDown(increase);
      act(() => {
        jest.advanceTimersByTime(500);
      });
      const callsBeforeRelease = handleChange.mock.calls.length;
      fireEvent.pointerUp(increase);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(handleChange).toHaveBeenCalledTimes(callsBeforeRelease);
    });

    it("stops repeating on pointer leave", () => {
      const handleChange = jest.fn();
      render(
        <Stepper
          value={0}
          max={100}
          longPressRepeat
          onChange={handleChange}
          aria-label="Quantity"
        />
      );
      const increase = screen.getByRole("button", { name: "Increase" });
      fireEvent.pointerDown(increase);
      fireEvent.pointerLeave(increase);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("stops repeating at max", () => {
      const handleChange = jest.fn();
      render(
        <Stepper
          value={0}
          max={2}
          longPressRepeat
          onChange={handleChange}
          aria-label="Quantity"
        />
      );
      fireEvent.pointerDown(screen.getByRole("button", { name: "Increase" }));
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenLastCalledWith(2);
    });

    it("clears timers on unmount", () => {
      const handleChange = jest.fn();
      const { unmount } = render(
        <Stepper
          value={0}
          max={100}
          longPressRepeat
          onChange={handleChange}
          aria-label="Quantity"
        />
      );
      fireEvent.pointerDown(screen.getByRole("button", { name: "Increase" }));
      unmount();
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  it("applies size via data attribute", () => {
    const { rerender } = render(
      <Stepper value={1} onChange={() => {}} aria-label="Quantity" />
    );
    expect(screen.getByRole("spinbutton")).toHaveAttribute("data-size", "md");

    rerender(
      <Stepper value={1} size="sm" onChange={() => {}} aria-label="Quantity" />
    );
    expect(screen.getByRole("spinbutton")).toHaveAttribute("data-size", "sm");
  });

  it("exposes bound state via data-state", () => {
    const { rerender } = render(
      <Stepper value={0} min={0} max={5} onChange={() => {}} aria-label="Quantity" />
    );
    expect(screen.getByRole("spinbutton")).toHaveAttribute("data-state", "at-min");

    rerender(
      <Stepper value={5} min={0} max={5} onChange={() => {}} aria-label="Quantity" />
    );
    expect(screen.getByRole("spinbutton")).toHaveAttribute("data-state", "at-max");

    rerender(
      <Stepper value={3} min={0} max={5} onChange={() => {}} aria-label="Quantity" />
    );
    expect(screen.getByRole("spinbutton")).toHaveAttribute("data-state", "idle");
  });

  it("sets the hit-target size custom property from hitSlop", () => {
    render(
      <Stepper value={1} hitSlop={48} onChange={() => {}} aria-label="Quantity" />
    );
    expect(screen.getByRole("spinbutton")).toHaveStyle({
      "--tt-stepper-hit": "48px",
    });
  });

  it("merges consumer className", () => {
    render(
      <Stepper
        value={1}
        className="custom-class"
        onChange={() => {}}
        aria-label="Quantity"
      />
    );
    expect(screen.getByRole("spinbutton")).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Stepper ref={ref} value={1} onChange={() => {}} aria-label="Quantity" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
