import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { OptimisticAction } from "./OptimisticAction";

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
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("enters pending state on click", async () => {
    let resolve: () => void;
    const onAction = jest.fn(
      () => new Promise<void>((r) => { resolve = r; })
    );
    render(<OptimisticAction onAction={onAction}>Save</OptimisticAction>);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText("Processing...")).toBeInTheDocument();

    await act(async () => {
      resolve!();
    });
  });

  it("shows confirmed state after action resolves", async () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(<OptimisticAction onAction={onAction} confirmLabel="Saved">Save</OptimisticAction>);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("shows failed state after action rejects", async () => {
    const onAction = jest.fn().mockRejectedValue(new Error("fail"));
    render(<OptimisticAction onAction={onAction} failedLabel="Error">Save</OptimisticAction>);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("resets to idle after resetDelay", async () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction onAction={onAction} resetDelay={1000}>
        Save
      </OptimisticAction>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText("Done")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("is disabled during pending", async () => {
    let resolve: () => void;
    const onAction = jest.fn(
      () => new Promise<void>((r) => { resolve = r; })
    );
    render(<OptimisticAction onAction={onAction}>Save</OptimisticAction>);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByRole("button")).toBeDisabled();

    await act(async () => {
      resolve!();
    });
  });

  it("applies variant classes", () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    const { rerender } = render(
      <OptimisticAction onAction={onAction} variant="primary">Save</OptimisticAction>
    );
    expect(screen.getByRole("button")).toHaveClass("bg-blue-600");

    rerender(
      <OptimisticAction onAction={onAction} variant="danger">Save</OptimisticAction>
    );
    expect(screen.getByRole("button")).toHaveClass("bg-red-600");
  });

  it("applies size classes", () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    const { rerender } = render(
      <OptimisticAction onAction={onAction} size="sm">Save</OptimisticAction>
    );
    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(
      <OptimisticAction onAction={onAction} size="lg">Save</OptimisticAction>
    );
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(<OptimisticAction ref={ref} onAction={onAction}>Save</OptimisticAction>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies custom className", () => {
    const onAction = jest.fn().mockResolvedValue(undefined);
    render(
      <OptimisticAction onAction={onAction} className="my-custom-class">
        Save
      </OptimisticAction>
    );
    expect(screen.getByRole("button")).toHaveClass("my-custom-class");
  });
});
