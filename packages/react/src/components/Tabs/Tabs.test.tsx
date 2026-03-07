import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const renderTabs = (props: Record<string, unknown> = {}) =>
  render(
    <Tabs defaultValue="tab1" {...props}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );

describe("Tabs", () => {
  it("renders tabs with correct roles", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
  });

  it("selects the default tab via defaultValue", () => {
    renderTabs({ defaultValue: "tab2" });
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("changes selection when clicking a tab", async () => {
    const user = userEvent.setup();
    renderTabs();

    expect(screen.getByText("Content 1")).toBeVisible();

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByText("Content 2")).toBeVisible();
    expect(screen.getByText("Content 1")).not.toBeVisible();
  });

  it("supports controlled mode with value and onValueChange", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { rerender } = render(
      <Tabs value="tab1" onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(handleChange).toHaveBeenCalledWith("tab2");
    // Still tab1 because controlled
    expect(screen.getByText("Content 1")).toBeVisible();

    rerender(
      <Tabs value="tab2" onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("sets aria-selected correctly on active and inactive tabs", () => {
    renderTabs({ defaultValue: "tab1" });
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
  });

  it("hides tabpanel when not active using hidden attribute", () => {
    renderTabs({ defaultValue: "tab1" });
    const panel2 = screen.getByText("Content 2").closest('[role="tabpanel"]')!;
    expect(panel2).toHaveAttribute("hidden");
  });

  it("shows tabpanel when active without hidden attribute", () => {
    renderTabs({ defaultValue: "tab1" });
    const panel1 = screen.getByText("Content 1").closest('[role="tabpanel"]')!;
    expect(panel1).not.toHaveAttribute("hidden");
  });

  it("moves focus to next trigger on ArrowRight", async () => {
    const user = userEvent.setup();
    renderTabs();

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    expect(tabs[0]).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(tabs[1]).toHaveFocus();
  });

  it("moves focus to previous trigger on ArrowLeft", async () => {
    const user = userEvent.setup();
    renderTabs();

    const tabs = screen.getAllByRole("tab");
    tabs[1].focus();
    expect(tabs[1]).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(tabs[0]).toHaveFocus();
  });

  it("forwards ref on TabsTrigger", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger ref={ref} value="tab1">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("links aria-controls and aria-labelledby correctly", () => {
    renderTabs({ defaultValue: "tab1" });
    const trigger = screen.getByRole("tab", { name: "Tab 1" });
    const panel = screen.getByText("Content 1").closest('[role="tabpanel"]')!;

    expect(trigger).toHaveAttribute("aria-controls", "panel-tab1");
    expect(trigger).toHaveAttribute("id", "tab-tab1");
    expect(panel).toHaveAttribute("aria-labelledby", "tab-tab1");
    expect(panel).toHaveAttribute("id", "panel-tab1");
  });
});
