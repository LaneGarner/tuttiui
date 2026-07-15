import { createRef } from "react";
import { View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal divider by default", () => {
    render(<Divider testID="divider" />);
    expect(screen.getByTestId("divider")).toBeTruthy();
  });

  it("renders a vertical divider", () => {
    render(<Divider testID="divider-v" orientation="vertical" />);
    expect(screen.getByTestId("divider-v")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it("applies custom className", () => {
    render(<Divider testID="divider-custom" className="bg-red-500" />);
    expect(screen.getByTestId("divider-custom")).toBeTruthy();
  });
});
