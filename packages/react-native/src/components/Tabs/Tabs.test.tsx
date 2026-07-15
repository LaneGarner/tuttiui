import { createRef } from "react";
import { View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const renderTabs = (props: Record<string, unknown> = {}) =>
  render(
    <Tabs defaultValue="tab1" {...props}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <View testID="content-1" />
      </TabsContent>
      <TabsContent value="tab2">
        <View testID="content-2" />
      </TabsContent>
      <TabsContent value="tab3">
        <View testID="content-3" />
      </TabsContent>
    </Tabs>
  );

describe("Tabs", () => {
  it("renders tabs with triggers", () => {
    renderTabs();
    expect(screen.getByText("Tab 1")).toBeTruthy();
    expect(screen.getByText("Tab 2")).toBeTruthy();
    expect(screen.getByText("Tab 3")).toBeTruthy();
  });

  it("shows the default tab content", () => {
    renderTabs({ defaultValue: "tab2" });
    expect(screen.getByTestId("content-2")).toBeTruthy();
    expect(screen.queryByTestId("content-1")).toBeNull();
    expect(screen.queryByTestId("content-3")).toBeNull();
  });

  it("changes content when pressing a tab trigger", () => {
    renderTabs();
    expect(screen.getByTestId("content-1")).toBeTruthy();
    expect(screen.queryByTestId("content-2")).toBeNull();

    fireEvent.press(screen.getByText("Tab 2"));
    expect(screen.getByTestId("content-2")).toBeTruthy();
    expect(screen.queryByTestId("content-1")).toBeNull();
  });

  it("supports controlled mode with value and onValueChange", () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Tabs value="tab1" onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <View testID="content-1" />
        </TabsContent>
        <TabsContent value="tab2">
          <View testID="content-2" />
        </TabsContent>
      </Tabs>
    );

    fireEvent.press(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("tab2");
    // Still tab1 because controlled
    expect(screen.getByTestId("content-1")).toBeTruthy();
    expect(screen.queryByTestId("content-2")).toBeNull();

    rerender(
      <Tabs value="tab2" onValueChange={handleChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <View testID="content-1" />
        </TabsContent>
        <TabsContent value="tab2">
          <View testID="content-2" />
        </TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId("content-2")).toBeTruthy();
    expect(screen.queryByTestId("content-1")).toBeNull();
  });

  it("calls onValueChange in uncontrolled mode", () => {
    const handleChange = jest.fn();
    renderTabs({ onValueChange: handleChange });

    fireEvent.press(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("tab2");
    // Also changes internally in uncontrolled mode
    expect(screen.getByTestId("content-2")).toBeTruthy();
  });

  it("sets accessibilityState selected on active trigger", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" testID="trigger-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" testID="trigger-2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <View testID="content-1" />
        </TabsContent>
        <TabsContent value="tab2">
          <View testID="content-2" />
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByTestId("trigger-1").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByTestId("trigger-2").getAttribute("aria-selected")).toBe("false");
  });

  it("forwards ref on TabsTrigger", () => {
    const ref = createRef<View>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger ref={ref} value="tab1">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <View testID="content-1" />
        </TabsContent>
      </Tabs>
    );
    expect(ref.current).toBeTruthy();
  });

  it("forwards ref on TabsList", () => {
    const ref = createRef<View>();
    render(
      <Tabs defaultValue="tab1">
        <TabsList ref={ref}>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <View testID="content-1" />
        </TabsContent>
      </Tabs>
    );
    expect(ref.current).toBeTruthy();
  });

  it("throws when TabsTrigger is used outside Tabs", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() =>
      render(<TabsTrigger value="orphan">Orphan</TabsTrigger>)
    ).toThrow("TabsList/TabsTrigger/TabsContent must be used within a Tabs");

    consoleSpy.mockRestore();
  });
});
