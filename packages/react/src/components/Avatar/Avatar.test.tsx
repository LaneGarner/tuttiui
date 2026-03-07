import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

describe("Avatar", () => {
  it("renders", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;
    render(
      <Avatar ref={ref}>
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("applies custom className", () => {
    render(
      <Avatar className="custom-class" data-testid="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toHaveClass("custom-class");
  });
});

describe("Avatar size variants", () => {
  it("applies sm size classes", () => {
    render(
      <Avatar size="sm" data-testid="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toHaveClass("h-8", "w-8");
  });

  it("applies md size classes", () => {
    render(
      <Avatar size="md" data-testid="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toHaveClass("h-10", "w-10");
  });

  it("applies lg size classes", () => {
    render(
      <Avatar size="lg" data-testid="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toHaveClass("h-12", "w-12");
  });

  it("applies xl size classes", () => {
    render(
      <Avatar size="xl" data-testid="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toHaveClass("h-16", "w-16");
  });
});

describe("AvatarFallback", () => {
  it("renders fallback text when no image is provided", () => {
    render(
      <Avatar>
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("LG")).toBeInTheDocument();
  });

  it("applies base classes", () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="fallback">LG</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByTestId("fallback");
    expect(fallback).toHaveClass("flex");
    expect(fallback).toHaveClass("items-center");
    expect(fallback).toHaveClass("justify-center");
    expect(fallback).toHaveClass("bg-gray-100");
    expect(fallback).toHaveClass("font-medium");
  });

  it("applies size-aware text class for sm", () => {
    render(
      <Avatar size="sm">
        <AvatarFallback data-testid="fallback">LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback")).toHaveClass("text-xs");
  });

  it("applies size-aware text class for md", () => {
    render(
      <Avatar size="md">
        <AvatarFallback data-testid="fallback">LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback")).toHaveClass("text-sm");
  });

  it("applies size-aware text class for lg", () => {
    render(
      <Avatar size="lg">
        <AvatarFallback data-testid="fallback">LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback")).toHaveClass("text-base");
  });

  it("applies size-aware text class for xl", () => {
    render(
      <Avatar size="xl">
        <AvatarFallback data-testid="fallback">LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback")).toHaveClass("text-lg");
  });

  it("applies custom className", () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fb" data-testid="fallback">
          LG
        </AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("fallback")).toHaveClass("custom-fb");
  });
});

describe("AvatarImage", () => {
  it("renders with src and alt (image does not load in jsdom, so img is hidden)", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    // In jsdom, the Image constructor's onload never fires,
    // so AvatarImage returns null and fallback is shown
    expect(screen.getByText("LG")).toBeInTheDocument();
  });

  it("shows fallback when image has no src", () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("LG")).toBeInTheDocument();
  });
});
