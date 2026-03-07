import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea aria-label="message" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Textarea aria-label="message" onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello");

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(textarea).toHaveValue("Hello");
  });

  it("shows error state classes", () => {
    render(<Textarea aria-label="message" error />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-red-500");
    expect(textarea).toHaveClass("focus-visible:ring-red-500");
  });

  it("disables properly", () => {
    render(<Textarea aria-label="message" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLTextAreaElement | null>;
    render(<Textarea ref={ref} aria-label="message" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("applies custom className", () => {
    render(<Textarea aria-label="message" className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("rows attribute works", () => {
    render(<Textarea aria-label="message" rows={10} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "10");
  });
});
