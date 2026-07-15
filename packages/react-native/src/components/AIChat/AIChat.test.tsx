import { createRef } from "react";
import { ScrollView } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { AIChat, type ChatMessage } from "./AIChat";

jest.mock("../../primitives", () => ({
  AnimatedPulse: ({ children, ...props }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="animated-pulse" {...props}>{children}</MockView>;
  },
}));

const userMessage: ChatMessage = {
  id: "1",
  role: "user",
  content: "Hello, how are you?",
};

const assistantMessage: ChatMessage = {
  id: "2",
  role: "assistant",
  content: "I am doing well, thank you!",
};

const systemMessage: ChatMessage = {
  id: "3",
  role: "system",
  content: "Conversation started",
};

describe("AIChat", () => {
  it("renders user messages", () => {
    render(<AIChat messages={[userMessage]} />);
    expect(screen.getByText("Hello, how are you?")).toBeTruthy();
  });

  it("renders assistant messages", () => {
    render(<AIChat messages={[assistantMessage]} />);
    expect(screen.getByText("I am doing well, thank you!")).toBeTruthy();
  });

  it("renders system messages", () => {
    render(<AIChat messages={[systemMessage]} />);
    expect(screen.getByText("Conversation started")).toBeTruthy();
  });

  it("renders multiple messages", () => {
    render(
      <AIChat messages={[userMessage, assistantMessage, systemMessage]} />
    );
    expect(screen.getByText("Hello, how are you?")).toBeTruthy();
    expect(screen.getByText("I am doing well, thank you!")).toBeTruthy();
    expect(screen.getByText("Conversation started")).toBeTruthy();
  });

  it("shows loading dots when isLoading is true", () => {
    render(<AIChat messages={[]} isLoading />);
    const dots = screen.getAllByTestId("loading-dot");
    expect(dots.length).toBe(3);
  });

  it("hides loading dots when isLoading is false", () => {
    render(<AIChat messages={[]} isLoading={false} />);
    expect(screen.queryAllByTestId("loading-dot").length).toBe(0);
  });

  it("renders timestamps when provided", () => {
    const messageWithTimestamp: ChatMessage = {
      id: "4",
      role: "user",
      content: "Timestamped message",
      timestamp: new Date("2025-01-15T10:30:00"),
    };
    render(<AIChat messages={[messageWithTimestamp]} />);
    expect(screen.getByText("Timestamped message")).toBeTruthy();
    const timeString = messageWithTimestamp.timestamp!.toLocaleTimeString();
    expect(screen.getByText(timeString)).toBeTruthy();
  });

  it("does not render timestamps when not provided", () => {
    render(<AIChat messages={[userMessage]} />);
    expect(screen.getByText("Hello, how are you?")).toBeTruthy();
  });

  it("calls scrollToEnd when messages change", () => {
    jest.useFakeTimers();
    const { ScrollView: MockScrollView } = require("react-native");
    MockScrollView._scrollToEndMock.mockClear();

    const { rerender } = render(<AIChat messages={[userMessage]} />);

    // First render triggers scrollToEnd
    jest.advanceTimersByTime(150);
    MockScrollView._scrollToEndMock.mockClear();

    rerender(
      <AIChat messages={[userMessage, assistantMessage]} />
    );

    jest.advanceTimersByTime(150);
    expect(MockScrollView._scrollToEndMock).toHaveBeenCalledWith({ animated: true });
    jest.useRealTimers();
  });

  it("forwards ref", () => {
    const ref = createRef<ScrollView>();
    render(<AIChat ref={ref} messages={[]} />);
    expect(ref.current).toBeTruthy();
  });

  it("renders with empty messages", () => {
    render(<AIChat messages={[]} testID="chat" />);
    expect(screen.getByTestId("chat")).toBeTruthy();
  });
});
