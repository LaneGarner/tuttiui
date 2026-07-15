import { Text } from "react-native";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";

const renderTooltip = (props: { duration?: number; side?: "top" | "bottom" } = {}) =>
  render(
    <Tooltip duration={props.duration}>
      <TooltipTrigger testID="trigger">
        <Text>Press me</Text>
      </TooltipTrigger>
      <TooltipContent side={props.side}>Helpful hint</TooltipContent>
    </Tooltip>
  );

describe("Tooltip", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("does not show content initially", () => {
    renderTooltip();
    expect(screen.queryByText("Helpful hint")).toBeNull();
  });

  it("shows content on long press", () => {
    renderTooltip();
    fireEvent.longPress(screen.getByTestId("trigger"));
    expect(screen.getByText("Helpful hint")).toBeTruthy();
  });

  it("hides content after the duration elapses", () => {
    renderTooltip({ duration: 1000 });
    fireEvent.longPress(screen.getByTestId("trigger"));
    expect(screen.getByText("Helpful hint")).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(screen.queryByText("Helpful hint")).toBeNull();
  });

  it("stays visible before the duration elapses", () => {
    renderTooltip({ duration: 2000 });
    fireEvent.longPress(screen.getByTestId("trigger"));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText("Helpful hint")).toBeTruthy();
  });

  it("renders with bottom side", () => {
    renderTooltip({ side: "bottom" });
    fireEvent.longPress(screen.getByTestId("trigger"));
    expect(screen.getByText("Helpful hint")).toBeTruthy();
  });

  it("calls user onLongPress in addition to opening", () => {
    const onLongPress = jest.fn();
    render(
      <Tooltip>
        <TooltipTrigger testID="trigger" onLongPress={onLongPress}>
          <Text>Press me</Text>
        </TooltipTrigger>
        <TooltipContent>Hint</TooltipContent>
      </Tooltip>
    );
    fireEvent.longPress(screen.getByTestId("trigger"));
    expect(onLongPress).toHaveBeenCalled();
    expect(screen.getByText("Hint")).toBeTruthy();
  });

  it("throws when TooltipContent is used outside Tooltip", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TooltipContent>Hint</TooltipContent>)).toThrow(
      "TooltipTrigger/TooltipContent must be used within a Tooltip"
    );
    spy.mockRestore();
  });

  it("renders custom (non-string) content", () => {
    render(
      <Tooltip>
        <TooltipTrigger testID="trigger">
          <Text>Press me</Text>
        </TooltipTrigger>
        <TooltipContent>
          <Text testID="custom-content">Custom</Text>
        </TooltipContent>
      </Tooltip>
    );
    fireEvent.longPress(screen.getByTestId("trigger"));
    expect(screen.getByTestId("custom-content")).toBeTruthy();
  });
});
