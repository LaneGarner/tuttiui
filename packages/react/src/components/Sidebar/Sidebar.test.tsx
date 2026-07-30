import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "./Sidebar";

describe("Sidebar", () => {
  it("renders sidebar", () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.tagName).toBe("ASIDE");
    expect(sidebar).toHaveAttribute("role", "complementary");
  });

  it("applies default width", () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveStyle({ width: "16rem" });
  });

  it("collapsed prop changes width", () => {
    render(
      <Sidebar collapsed data-testid="sidebar">
        Content
      </Sidebar>
    );
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveStyle({ width: "4rem" });
  });

  it("uses custom width and collapsedWidth", () => {
    const { rerender } = render(
      <Sidebar width="20rem" collapsedWidth="5rem" data-testid="sidebar">
        Content
      </Sidebar>
    );
    expect(screen.getByTestId("sidebar")).toHaveStyle({ width: "20rem" });

    rerender(
      <Sidebar
        collapsed
        width="20rem"
        collapsedWidth="5rem"
        data-testid="sidebar"
      >
        Content
      </Sidebar>
    );
    expect(screen.getByTestId("sidebar")).toHaveStyle({ width: "5rem" });
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>;
    render(<Sidebar ref={ref}>Content</Sidebar>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("applies custom className", () => {
    render(
      <Sidebar className="custom-class" data-testid="sidebar">
        Content
      </Sidebar>
    );
    expect(screen.getByTestId("sidebar")).toHaveClass("custom-class");
  });

  it("applies base classes", () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("flex");
    expect(sidebar).toHaveClass("flex-col");
    expect(sidebar).toHaveClass("border-r");
    expect(sidebar).toHaveClass("h-full");
  });
});

describe("SidebarItem", () => {
  it("renders", () => {
    render(<SidebarItem>Dashboard</SidebarItem>);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(
      <SidebarItem icon={<span data-testid="icon">IC</span>}>
        Dashboard
      </SidebarItem>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("active item has correct classes", () => {
    render(<SidebarItem active>Dashboard</SidebarItem>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-active", "true");
    expect(button).toHaveClass("font-medium");
  });

  it("inactive item has correct classes", () => {
    render(<SidebarItem>Dashboard</SidebarItem>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-active", "false");
  });

  it("applies overflow-hidden when collapsed", () => {
    render(
      <Sidebar collapsed>
        <SidebarItem>Dashboard</SidebarItem>
      </Sidebar>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("overflow-hidden");
    expect(button).toHaveClass("whitespace-nowrap");
  });
});

describe("SidebarHeader", () => {
  it("renders", () => {
    render(<SidebarHeader data-testid="header">Header</SidebarHeader>);
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("flex");
    expect(header).toHaveClass("items-center");
    expect(header).toHaveClass("p-4");
    expect(header).toHaveClass("border-b");
  });
});

describe("SidebarContent", () => {
  it("renders", () => {
    render(
      <SidebarContent data-testid="content">Body</SidebarContent>
    );
    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("flex-1");
    expect(content).toHaveClass("overflow-y-auto");
    expect(content).toHaveClass("p-2");
  });
});

describe("SidebarFooter", () => {
  it("renders", () => {
    render(<SidebarFooter data-testid="footer">Footer</SidebarFooter>);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("p-4");
    expect(footer).toHaveClass("border-t");
  });
});

describe("SidebarGroupLabel", () => {
  it("renders", () => {
    render(
      <SidebarGroupLabel data-testid="label">Navigation</SidebarGroupLabel>
    );
    const label = screen.getByTestId("label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("text-xs");
    expect(label).toHaveClass("font-semibold");
    expect(label).toHaveClass("uppercase");
  });

  it("clips text when collapsed", () => {
    render(
      <Sidebar collapsed>
        <SidebarGroupLabel data-testid="label">Navigation</SidebarGroupLabel>
      </Sidebar>
    );
    const label = screen.getByTestId("label");
    expect(label).toHaveClass("overflow-hidden");
    expect(label).toHaveClass("whitespace-nowrap");
  });
});

describe("SidebarGroup", () => {
  it("renders", () => {
    render(<SidebarGroup data-testid="group">Group</SidebarGroup>);
    const group = screen.getByTestId("group");
    expect(group).toBeInTheDocument();
    expect(group).toHaveClass("py-2");
  });
});

describe("Sidebar composition", () => {
  it("renders all sub-components together", () => {
    render(
      <Sidebar data-testid="sidebar">
        <SidebarHeader>Logo</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarItem active>Dashboard</SidebarItem>
            <SidebarItem>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>User</SidebarFooter>
      </Sidebar>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });
});
