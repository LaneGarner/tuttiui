import { createRef } from "react";
import { View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders with progressbar role", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeTruthy();
  });

  it("sets correct width style based on value", () => {
    render(<Progress value={60} />);
    const bar = screen.getByTestId("progress-bar");
    const style = JSON.parse(bar.getAttribute("data-style")!);
    expect(style).toEqual(expect.objectContaining({ width: "60%" }));
  });

  it("clamps negative value to 0%", () => {
    render(<Progress value={-10} />);
    const bar = screen.getByTestId("progress-bar");
    const style = JSON.parse(bar.getAttribute("data-style")!);
    expect(style).toEqual(expect.objectContaining({ width: "0%" }));
  });

  it("clamps value over max to 100%", () => {
    render(<Progress value={150} max={100} />);
    const bar = screen.getByTestId("progress-bar");
    const style = JSON.parse(bar.getAttribute("data-style")!);
    expect(style).toEqual(expect.objectContaining({ width: "100%" }));
  });

  it("has correct accessibility value", () => {
    render(<Progress value={30} max={50} />);
    const progressbar = screen.getByRole("progressbar");
    expect(Number(progressbar.getAttribute("aria-valuenow"))).toBe(30);
    expect(Number(progressbar.getAttribute("aria-valuemin"))).toBe(0);
    expect(Number(progressbar.getAttribute("aria-valuemax"))).toBe(50);
  });

  it("accepts size variants", () => {
    const { rerender } = render(<Progress value={50} size="sm" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();

    rerender(<Progress value={50} size="md" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();

    rerender(<Progress value={50} size="lg" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();
  });

  it("accepts color variants", () => {
    const { rerender } = render(<Progress value={50} variant="default" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();

    rerender(<Progress value={50} variant="success" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();

    rerender(<Progress value={50} variant="warning" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();

    rerender(<Progress value={50} variant="error" testID="progress" />);
    expect(screen.getByTestId("progress")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeTruthy();
  });

  it("passes additional props", () => {
    render(<Progress value={50} testID="my-progress" />);
    expect(screen.getByTestId("my-progress")).toBeTruthy();
  });

  it("uses custom max value for percentage calculation", () => {
    render(<Progress value={25} max={50} />);
    const bar = screen.getByTestId("progress-bar");
    const style = JSON.parse(bar.getAttribute("data-style")!);
    expect(style).toEqual(expect.objectContaining({ width: "50%" }));
  });

  it("defaults value to 0", () => {
    render(<Progress />);
    const bar = screen.getByTestId("progress-bar");
    const style = JSON.parse(bar.getAttribute("data-style")!);
    expect(style).toEqual(expect.objectContaining({ width: "0%" }));
  });
});
