import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { StreamingText } from "./StreamingText";

beforeEach(() => {
  jest.useFakeTimers();
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe("StreamingText", () => {
  it("shows full text when isStreaming is false", () => {
    render(<StreamingText text="Hello, world!" />);
    expect(screen.getByTestId("streaming-text")).toHaveTextContent("Hello, world!");
  });

  it("shows partial text during streaming", () => {
    render(<StreamingText text="Hello" isStreaming speed="normal" />);

    // After 0ms, no characters revealed yet
    expect(screen.getByTestId("streaming-text").textContent).toContain("|");

    // Advance 3 intervals (3 * 40ms = 120ms) to reveal 3 characters
    act(() => {
      jest.advanceTimersByTime(120);
    });

    const content = screen.getByTestId("streaming-text").textContent;
    expect(content).toContain("Hel");
    expect(content).not.toContain("Hello");
  });

  it("calls onComplete when streaming finishes", () => {
    const onComplete = jest.fn();
    render(<StreamingText text="Hi" isStreaming speed="normal" onComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();

    // Advance enough time to reveal all characters (2 * 40ms = 80ms)
    act(() => {
      jest.advanceTimersByTime(80);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("shows cursor during streaming", () => {
    render(<StreamingText text="Hello" isStreaming speed="normal" />);
    expect(screen.getByTestId("streaming-cursor")).toBeInTheDocument();
  });

  it("hides cursor after streaming completes", () => {
    render(<StreamingText text="Hi" isStreaming speed="normal" />);

    // Advance to complete streaming (2 * 40ms = 80ms)
    act(() => {
      jest.advanceTimersByTime(80);
    });

    expect(screen.queryByTestId("streaming-cursor")).not.toBeInTheDocument();
  });

  it("respects speed prop", () => {
    const { rerender } = render(
      <StreamingText text="ABCDE" isStreaming speed="fast" />
    );

    // Fast: 15ms per char. After 30ms, should have 2 chars
    act(() => {
      jest.advanceTimersByTime(30);
    });
    expect(screen.getByTestId("streaming-text").textContent).toContain("AB");

    rerender(<StreamingText text="ABCDE" isStreaming speed="slow" />);

    // Reset displayed count due to text being the same won't trigger reset,
    // but let's test slow from scratch
    rerender(<StreamingText text="XYZWV" isStreaming speed="slow" />);

    // Slow: 80ms per char. After 80ms, should have 1 char
    act(() => {
      jest.advanceTimersByTime(80);
    });
    const content = screen.getByTestId("streaming-text").textContent;
    expect(content).toContain("X");
  });

  it("applies custom className", () => {
    render(<StreamingText text="Hello" className="custom-class" />);
    expect(screen.getByTestId("streaming-text")).toHaveClass("custom-class");
  });

  it("hides cursor when showCursor is false", () => {
    render(<StreamingText text="Hello" isStreaming showCursor={false} />);
    expect(screen.queryByTestId("streaming-cursor")).not.toBeInTheDocument();
  });

  it("resets when text prop changes", () => {
    const { rerender } = render(
      <StreamingText text="Hello" isStreaming speed="normal" />
    );

    // Advance to reveal some characters
    act(() => {
      jest.advanceTimersByTime(120);
    });
    expect(screen.getByTestId("streaming-text").textContent).toContain("Hel");

    // Change text - should reset
    rerender(<StreamingText text="World" isStreaming speed="normal" />);

    // After reset, should start from beginning
    act(() => {
      jest.advanceTimersByTime(40);
    });
    const content = screen.getByTestId("streaming-text").textContent;
    expect(content).toContain("W");
    expect(content).not.toContain("Hello");
  });

  it("respects prefers-reduced-motion", () => {
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const onComplete = jest.fn();
    render(<StreamingText text="Hello" isStreaming onComplete={onComplete} />);

    // Should show full text immediately
    expect(screen.getByTestId("streaming-text").textContent).toContain("Hello");
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
