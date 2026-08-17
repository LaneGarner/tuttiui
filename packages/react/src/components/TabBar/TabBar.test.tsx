import "@testing-library/jest-dom";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabBar, TabBarItem } from "./TabBar";

describe("TabBar", () => {
  it("renders a navigation landmark with default aria-label", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" active />
        <TabBarItem label="Search" />
      </TabBar>
    );
    expect(
      screen.getByRole("navigation", { name: "Main" })
    ).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(
      <TabBar aria-label="Primary">
        <TabBarItem label="Home" />
      </TabBar>
    );
    expect(
      screen.getByRole("navigation", { name: "Primary" })
    ).toBeInTheDocument();
  });

  it("renders item labels and icons", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" icon={<svg data-testid="home-icon" />} />
      </TabBar>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("calls onClick when an item is activated", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <TabBar>
        <TabBarItem label="Search" onClick={handleClick} />
      </TabBar>
    );
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets aria-current='page' and data-active on the active item", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" active />
        <TabBarItem label="Search" />
      </TabBar>
    );
    const home = screen.getByRole("button", { name: "Home" });
    const search = screen.getByRole("button", { name: "Search" });
    expect(home).toHaveAttribute("aria-current", "page");
    expect(home).toHaveAttribute("data-active", "true");
    expect(search).not.toHaveAttribute("aria-current");
    expect(search).toHaveAttribute("data-active", "false");
  });

  it("renders an anchor when href is provided", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" href="/home" active />
      </TabBar>
    );
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("href", "/home");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("applies safe-area padding class when safeArea is set", () => {
    render(
      <TabBar safeArea data-testid="bar">
        <TabBarItem label="Home" />
      </TabBar>
    );
    expect(screen.getByTestId("bar")).toHaveClass(
      "pb-[env(safe-area-inset-bottom)]"
    );
  });

  it("does not apply safe-area padding by default", () => {
    render(
      <TabBar data-testid="bar">
        <TabBarItem label="Home" />
      </TabBar>
    );
    expect(screen.getByTestId("bar")).not.toHaveClass(
      "pb-[env(safe-area-inset-bottom)]"
    );
  });

  it("guarantees a 44px minimum touch target on items", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" />
      </TabBar>
    );
    // min-h-11 resolves to 44px (2.75rem) via the token-derived Tailwind preset
    expect(screen.getByRole("button", { name: "Home" })).toHaveClass(
      "min-h-11"
    );
  });

  it("forwards ref on TabBar", () => {
    const ref = createRef<HTMLElement>();
    render(
      <TabBar ref={ref}>
        <TabBarItem label="Home" />
      </TabBar>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("NAV");
  });

  it("forwards ref on TabBarItem", () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <TabBar>
        <TabBarItem ref={ref} label="Home" />
      </TabBar>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom className on TabBar and TabBarItem", () => {
    render(
      <TabBar className="custom-bar" data-testid="bar">
        <TabBarItem label="Home" className="custom-item" />
      </TabBar>
    );
    const bar = screen.getByTestId("bar");
    expect(bar).toHaveClass("custom-bar");
    expect(bar).toHaveClass("border-t");
    const item = screen.getByRole("button", { name: "Home" });
    expect(item).toHaveClass("custom-item");
    expect(item).toHaveClass("flex-1");
  });
});
