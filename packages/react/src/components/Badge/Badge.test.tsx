import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders a span with its children", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe("SPAN");
  });

  it("renders default variant and size by default", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveAttribute("data-variant", "default");
    expect(badge).toHaveAttribute("data-size", "md");
  });

  it.each(["default", "primary", "success", "warning", "info"] as const)(
    "renders %s variant via data-variant",
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toHaveAttribute(
        "data-variant",
        variant
      );
    }
  );

  it.each(["sm", "md"] as const)("renders %s size via data-size", (size) => {
    render(<Badge size={size}>{size}</Badge>);
    expect(screen.getByText(size)).toHaveAttribute("data-size", size);
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref test</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });

  it("spreads additional props onto the span", () => {
    render(<Badge data-testid="badge-el">Props</Badge>);
    expect(screen.getByTestId("badge-el")).toBeInTheDocument();
  });
});
