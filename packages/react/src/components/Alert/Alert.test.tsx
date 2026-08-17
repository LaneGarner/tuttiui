import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

describe("Alert", () => {
  it("renders with alert role", () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders default variant with correct classes", () => {
    render(<Alert>Default</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "default");
  });

  it("renders info variant with correct classes", () => {
    render(<Alert variant="info">Info</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "info");
  });

  it("renders success variant with correct classes", () => {
    render(<Alert variant="success">Success</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "success");
  });

  it("renders warning variant with correct classes", () => {
    render(<Alert variant="warning">Warning</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "warning");
  });

  it("renders error variant with correct classes", () => {
    render(<Alert variant="error">Error</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "error");
  });

  it("renders AlertTitle", () => {
    render(
      <Alert>
        <AlertTitle>Title text</AlertTitle>
      </Alert>
    );
    expect(screen.getByText("Title text")).toBeInTheDocument();
    expect(screen.getByText("Title text").tagName).toBe("H5");
    expect(screen.getByText("Title text")).toHaveClass(
      "mb-1",
      "font-medium",
      "leading-none",
      "tracking-tight"
    );
  });

  it("renders AlertDescription", () => {
    render(
      <Alert>
        <AlertDescription>Description text</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Description text")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toHaveClass("text-sm", "opacity-90");
  });

  it("shows dismiss button when onDismiss is provided", () => {
    render(<Alert onDismiss={() => {}}>Dismissible</Alert>);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("does not show dismiss button when onDismiss is not provided", () => {
    render(<Alert>Not dismissible</Alert>);
    expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const handleDismiss = jest.fn();
    render(<Alert onDismiss={handleDismiss}>Dismissible</Alert>);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Alert ref={ref}>Ref test</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(<Alert className="custom-class">Custom</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });
});
