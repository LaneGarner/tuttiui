import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavMenu, NavMenuItem, NavMenuLink } from "./NavMenu";

describe("NavMenu", () => {
  it("renders nav element", () => {
    render(
      <NavMenu aria-label="Main navigation">
        <NavMenuItem>
          <NavMenuLink href="/">Home</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders menu items", () => {
    render(
      <NavMenu aria-label="Main navigation">
        <NavMenuItem>
          <NavMenuLink href="/">Home</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink href="/about">About</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders NavMenuLink as anchor with href", () => {
    render(
      <NavMenu aria-label="Main navigation">
        <NavMenuItem>
          <NavMenuLink href="/dashboard">Dashboard</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    const link = screen.getByText("Dashboard");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders active link with aria-current='page'", () => {
    render(
      <NavMenu aria-label="Main navigation">
        <NavMenuItem>
          <NavMenuLink href="/dashboard" active>
            Dashboard
          </NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    const link = screen.getByText("Dashboard");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current on inactive link", () => {
    render(
      <NavMenu aria-label="Main navigation">
        <NavMenuItem>
          <NavMenuLink href="/dashboard">Dashboard</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    const link = screen.getByText("Dashboard");
    expect(link).not.toHaveAttribute("aria-current");
  });

  it("applies horizontal orientation classes", () => {
    render(
      <NavMenu aria-label="Main navigation" orientation="horizontal">
        <NavMenuItem>
          <NavMenuLink href="/">Home</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    const menubar = screen.getByRole("menubar");
    expect(menubar).toHaveClass("flex");
    expect(menubar).toHaveClass("items-center");
    expect(menubar).toHaveClass("gap-1");
  });

  it("applies vertical orientation classes", () => {
    render(
      <NavMenu aria-label="Main navigation" orientation="vertical">
        <NavMenuItem>
          <NavMenuLink href="/">Home</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    const menu = screen.getByRole("menu");
    expect(menu).toHaveClass("flex");
    expect(menu).toHaveClass("flex-col");
    expect(menu).toHaveClass("gap-0.5");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>;
    render(
      <NavMenu ref={ref} aria-label="Main navigation">
        <NavMenuItem>
          <NavMenuLink href="/">Home</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("applies custom className", () => {
    render(
      <NavMenu aria-label="Main navigation" className="custom-class" data-testid="nav">
        <NavMenuItem>
          <NavMenuLink href="/">Home</NavMenuLink>
        </NavMenuItem>
      </NavMenu>
    );
    expect(screen.getByTestId("nav")).toHaveClass("custom-class");
  });
});
