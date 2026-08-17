import { createRef } from "react";
import { View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { TabBar, TabBarItem } from "./TabBar";

describe("TabBar", () => {
  it("renders items with labels", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" active />
        <TabBarItem label="Cart" />
      </TabBar>
    );
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Cart")).toBeTruthy();
  });

  it("calls onPress when an item is pressed", () => {
    const handlePress = jest.fn();
    render(
      <TabBar>
        <TabBarItem label="Cart" onPress={handlePress} testID="cart-tab" />
      </TabBar>
    );
    fireEvent.press(screen.getByTestId("cart-tab"));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("sets accessibilityState selected on the active item", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" active testID="home-tab" />
        <TabBarItem label="Cart" testID="cart-tab" />
      </TabBar>
    );
    expect(screen.getByTestId("home-tab").getAttribute("aria-selected")).toBe(
      "true"
    );
    expect(screen.getByTestId("cart-tab").getAttribute("aria-selected")).toBe(
      "false"
    );
  });

  it("renders an icon slot", () => {
    render(
      <TabBar>
        <TabBarItem label="Home" icon={<View testID="home-icon" />} />
      </TabBar>
    );
    expect(screen.getByTestId("home-icon")).toBeTruthy();
  });

  it("forwards ref on TabBar", () => {
    const ref = createRef<View>();
    render(
      <TabBar ref={ref}>
        <TabBarItem label="Home" />
      </TabBar>
    );
    expect(ref.current).toBeTruthy();
  });

  it("forwards ref on TabBarItem", () => {
    const ref = createRef<View>();
    render(
      <TabBar>
        <TabBarItem ref={ref} label="Home" />
      </TabBar>
    );
    expect(ref.current).toBeTruthy();
  });
});
