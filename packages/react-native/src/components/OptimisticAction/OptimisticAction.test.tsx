import { createRef } from "react";
import { View } from "react-native";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import { OptimisticAction } from "./OptimisticAction";

jest.mock("../../primitives", () => ({
  AnimatedSpinner: ({ size, color, ...props }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="animated-spinner" {...props} />;
  },
}));

describe("OptimisticAction", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders with children in idle state", () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(<OptimisticAction onAction={onAction}>Save</OptimisticAction>);
    expect(screen.getByText("Save")).toBeTruthy();
  });

  it("enters pending state on press", async () => {
    let resolve: () => void;
    const onAction = jest.fn(
      () => new Promise<void>((r) => { resolve = r; })
    );
    render(<OptimisticAction onAction={onAction}>Save</OptimisticAction>);

    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    expect(screen.getByText("Processing...")).toBeTruthy();
    expect(screen.getByTestId("animated-spinner")).toBeTruthy();

    await act(async () => {
      resolve!();
    });
  });

  it("shows confirmed state after action resolves", async () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction onAction={onAction} confirmLabel="Saved">
        Save
      </OptimisticAction>
    );

    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    expect(screen.getByText("Saved")).toBeTruthy();
  });

  it("shows failed state after action rejects", async () => {
    const onAction = jest.fn().mockRejectedValue(new Error("fail"));
    render(
      <OptimisticAction onAction={onAction} failedLabel="Error">
        Save
      </OptimisticAction>
    );

    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    expect(screen.getByText("Error")).toBeTruthy();
  });

  it("resets to idle after resetDelay", async () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction onAction={onAction} resetDelay={1000}>
        Save
      </OptimisticAction>
    );

    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    expect(screen.getByText("Done")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Save")).toBeTruthy();
  });

  it("does not fire action when pending", async () => {
    let resolve: () => void;
    const onAction = jest.fn(
      () => new Promise<void>((r) => { resolve = r; })
    );
    render(<OptimisticAction onAction={onAction}>Save</OptimisticAction>);

    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    // Try pressing again while pending
    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    expect(onAction).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolve!();
    });
  });

  it("shows default confirm label", async () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(<OptimisticAction onAction={onAction}>Save</OptimisticAction>);

    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    expect(screen.getByText("Done")).toBeTruthy();
  });

  it("shows default failed label", async () => {
    const onAction = jest.fn().mockRejectedValue(new Error("err"));
    render(<OptimisticAction onAction={onAction}>Save</OptimisticAction>);

    await act(async () => {
      fireEvent.press(screen.getByRole("button"));
    });

    expect(screen.getByText("Failed")).toBeTruthy();
  });

  it("accepts variant prop", () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction onAction={onAction} variant="danger">
        Delete
      </OptimisticAction>
    );
    expect(screen.getByText("Delete")).toBeTruthy();
  });

  it("accepts size prop", () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction onAction={onAction} size="lg">
        Big
      </OptimisticAction>
    );
    expect(screen.getByText("Big")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction ref={ref} onAction={onAction}>
        Save
      </OptimisticAction>
    );
    expect(ref.current).toBeTruthy();
  });

  it("respects disabled prop", () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction onAction={onAction} disabled>
        Save
      </OptimisticAction>
    );
    fireEvent.press(screen.getByRole("button"));
    expect(onAction).not.toHaveBeenCalled();
  });
});
