import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders horizontal divider as hr element", () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass("w-full", "border-t");
  });

  it("renders vertical divider as div element", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const hr = container.querySelector("hr");
    expect(hr).not.toBeInTheDocument();
    const div = container.querySelector("div > div");
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass("border-l", "self-stretch");
  });

  it("has role=none when decorative is true", () => {
    render(<Divider decorative />);
    expect(screen.getByRole("none")).toBeInTheDocument();
  });

  it("has role=separator when decorative is false", () => {
    render(<Divider decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("sets aria-orientation on non-decorative divider", () => {
    const { rerender } = render(
      <Divider decorative={false} orientation="horizontal" />
    );
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "horizontal"
    );

    rerender(<Divider decorative={false} orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
  });

  it("does not set aria-orientation on decorative divider", () => {
    render(<Divider decorative />);
    expect(screen.getByRole("none")).not.toHaveAttribute("aria-orientation");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLHRElement | null>;
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });

  it("applies custom className", () => {
    const { container } = render(<Divider className="custom-class" />);
    const hr = container.querySelector("hr");
    expect(hr).toHaveClass("custom-class");
  });
});
