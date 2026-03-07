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
    expect(alert).toHaveClass("bg-gray-50", "border-gray-200", "text-gray-800");
  });

  it("renders info variant with correct classes", () => {
    render(<Alert variant="info">Info</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-blue-50", "border-blue-200", "text-blue-800");
  });

  it("renders success variant with correct classes", () => {
    render(<Alert variant="success">Success</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-green-50", "border-green-200", "text-green-800");
  });

  it("renders warning variant with correct classes", () => {
    render(<Alert variant="warning">Warning</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-amber-50", "border-amber-200", "text-amber-800");
  });

  it("renders error variant with correct classes", () => {
    render(<Alert variant="error">Error</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-red-50", "border-red-200", "text-red-800");
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
