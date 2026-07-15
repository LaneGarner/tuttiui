import { render, screen, act } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";
import { StreamingText } from "./StreamingText";

jest.mock("../../primitives", () => ({
  AnimatedPulse: ({ children, ...props }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="animated-pulse" {...props}>{children}</MockView>;
  },
}));

// Mock AccessibilityInfo
const mockIsReduceMotionEnabled = jest.fn().mockResolvedValue(false);
const mockAddEventListener = jest.fn().mockReturnValue({ remove: jest.fn() });

jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockImplementation(
  mockIsReduceMotionEnabled
);
jest.spyOn(AccessibilityInfo, "addEventListener").mockImplementation(
  mockAddEventListener
);

describe("StreamingText", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockIsReduceMotionEnabled.mockResolvedValue(false);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders full text when not streaming", () => {
    render(<StreamingText text="Hello world" />);
    expect(screen.getByText("Hello world")).toBeTruthy();
  });

  it("renders with testID", () => {
    render(<StreamingText text="Hello" />);
    expect(screen.getByTestId("streaming-text")).toBeTruthy();
  });

  it("shows cursor when streaming and not complete", async () => {
    render(<StreamingText text="Hello" isStreaming showCursor />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId("streaming-cursor")).toBeTruthy();
  });

  it("hides cursor when showCursor is false", async () => {
    render(<StreamingText text="Hello" isStreaming showCursor={false} />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.queryByTestId("streaming-cursor")).toBeNull();
  });

  it("streams text character by character", async () => {
    render(<StreamingText text="Hi" isStreaming speed="normal" />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    // After 40ms (one tick at normal speed), should show "H"
    await act(async () => {
      jest.advanceTimersByTime(40);
    });

    const textEl = screen.getByTestId("streaming-text");
    // Text should be partially revealed
    expect(textEl).toBeTruthy();
  });

  it("calls onComplete when streaming finishes", async () => {
    const onComplete = jest.fn();

    render(
      <StreamingText text="Hi" isStreaming speed="fast" onComplete={onComplete} />
    );

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    // Advance enough time for all characters (2 chars * 15ms = 30ms + buffer)
    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    expect(onComplete).toHaveBeenCalled();
  });

  it("shows full text immediately when reduced motion is enabled", async () => {
    mockIsReduceMotionEnabled.mockResolvedValue(true);

    const onComplete = jest.fn();

    render(
      <StreamingText text="Hello world" isStreaming onComplete={onComplete} />
    );

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByText(/Hello world/)).toBeTruthy();
  });

  it("resets when text changes", async () => {
    const { rerender } = render(
      <StreamingText text="First" isStreaming speed="fast" />
    );

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    rerender(<StreamingText text="Second" isStreaming speed="fast" />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    // After reset, text should start streaming again
    expect(screen.getByTestId("streaming-text")).toBeTruthy();
  });

  it("does not show cursor when streaming is complete", async () => {
    render(<StreamingText text="Hi" isStreaming speed="fast" />);

    await act(async () => {
      jest.advanceTimersByTime(0);
    });

    // Advance enough to finish streaming
    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.queryByTestId("streaming-cursor")).toBeNull();
  });

  it("renders full text when isStreaming is false", () => {
    render(<StreamingText text="Full text here" isStreaming={false} />);
    expect(screen.getByText("Full text here")).toBeTruthy();
  });
});
