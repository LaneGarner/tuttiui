import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AIInput } from "./AIInput";

describe("AIInput", () => {
  it("renders textarea with placeholder", () => {
    render(<AIInput />);
    expect(screen.getByPlaceholderText("Ask anything...")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<AIInput placeholder="Type a message..." />);
    expect(screen.getByPlaceholderText("Type a message...")).toBeInTheDocument();
  });

  it("handles typing", async () => {
    const user = userEvent.setup();
    render(<AIInput />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
  });

  it("submits on Enter key", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<AIInput onSubmit={handleSubmit} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello");
    await user.keyboard("{Enter}");

    expect(handleSubmit).toHaveBeenCalledWith("Hello");
  });

  it("Shift+Enter inserts newline and does NOT submit", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<AIInput onSubmit={handleSubmit} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Line 1");
    await user.keyboard("{Shift>}{Enter}{/Shift}");
    await user.type(textarea, "Line 2");

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(textarea).toHaveValue("Line 1\nLine 2");
  });

  it("clears input after submit", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<AIInput onSubmit={handleSubmit} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello");
    await user.keyboard("{Enter}");

    expect(textarea).toHaveValue("");
  });

  it("submit button is disabled when empty", () => {
    render(<AIInput />);
    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toBeDisabled();
  });

  it("submit button is disabled when loading", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<AIInput />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello");

    rerender(<AIInput loading />);

    const button = screen.getByRole("button", { name: "Loading" });
    expect(button).toBeDisabled();
  });

  it("shows spinner when loading", () => {
    render(<AIInput loading />);
    expect(screen.getByTestId("ai-input-spinner")).toBeInTheDocument();
  });

  it("disabled state disables textarea", () => {
    render(<AIInput disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("auto-expands rows based on content", async () => {
    const user = userEvent.setup();
    render(<AIInput minRows={1} maxRows={6} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "1");

    await user.type(textarea, "Line 1\nLine 2\nLine 3");
    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("clamps rows to maxRows", async () => {
    const user = userEvent.setup();
    render(<AIInput minRows={1} maxRows={3} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "1\n2\n3\n4\n5");
    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("forwards ref to the textarea", () => {
    const ref = { current: null } as React.RefObject<HTMLTextAreaElement | null>;
    render(<AIInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("does not submit when value is only whitespace", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<AIInput onSubmit={handleSubmit} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "   ");
    await user.keyboard("{Enter}");

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(<AIInput className="custom-wrapper" />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("custom-wrapper");
  });
});
