import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AIChat, type ChatMessage } from "./AIChat";

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
  it("renders messages", () => {
    render(
      <AIChat
        data-testid="chat"
        messages={[userMessage, assistantMessage]}
      />
    );
    expect(screen.getByText("Hello, how are you?")).toBeInTheDocument();
    expect(screen.getByText("I am doing well, thank you!")).toBeInTheDocument();
  });

  it("user message has correct alignment classes", () => {
    render(<AIChat messages={[userMessage]} />);
    const bubble = screen.getByText("Hello, how are you?");
    const container = bubble.closest(".flex");
    expect(container).toHaveClass("justify-end");
  });

  it("assistant message has correct alignment classes", () => {
    render(<AIChat messages={[assistantMessage]} />);
    const bubble = screen.getByText("I am doing well, thank you!");
    const container = bubble.closest(".flex");
    expect(container).toHaveClass("justify-start");
  });

  it("system message has correct alignment classes", () => {
    render(<AIChat messages={[systemMessage]} />);
    const bubble = screen.getByText("Conversation started");
    const container = bubble.closest(".flex");
    expect(container).toHaveClass("justify-center");
  });

  it("shows loading indicator when isLoading is true", () => {
    render(<AIChat data-testid="chat" messages={[]} isLoading />);
    const dots = screen.getByTestId("chat").querySelectorAll(".animate-pulse");
    expect(dots.length).toBe(3);
  });

  it("hides loading indicator when isLoading is false", () => {
    render(<AIChat data-testid="chat" messages={[]} isLoading={false} />);
    const dots = screen.getByTestId("chat").querySelectorAll(".animate-pulse");
    expect(dots.length).toBe(0);
  });

  it("renders timestamps when provided", () => {
    const messageWithTimestamp: ChatMessage = {
      id: "4",
      role: "user",
      content: "Timestamped message",
      timestamp: new Date("2025-01-15T10:30:00"),
    };
    render(<AIChat messages={[messageWithTimestamp]} />);
    const timeEl = screen.getByText("Timestamped message")
      .closest("div")!
      .querySelector("time");
    expect(timeEl).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<AIChat ref={ref} messages={[]} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(
      <AIChat data-testid="chat" messages={[]} className="my-custom-class" />
    );
    expect(screen.getByTestId("chat")).toHaveClass("my-custom-class");
  });

  it("preserves whitespace with whitespace-pre-wrap class", () => {
    const multilineMessage: ChatMessage = {
      id: "5",
      role: "user",
      content: "Line one\nLine two",
    };
    render(<AIChat data-testid="chat" messages={[multilineMessage]} />);
    const paragraph = screen.getByTestId("chat").querySelector("p");
    expect(paragraph).toHaveClass("whitespace-pre-wrap");
    expect(paragraph?.textContent).toBe("Line one\nLine two");
  });
});
