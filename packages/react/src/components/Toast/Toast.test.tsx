import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "./Toast";
import { ToastProvider, ToastViewport, useToast } from "./ToastProvider";

describe("Toast", () => {
  it("renders with title and description", () => {
    render(<Toast title="Hello" description="World" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("renders default variant", () => {
    render(<Toast title="Default" data-testid="toast" />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveAttribute("data-variant", "default");
  });

  it("renders success variant", () => {
    render(<Toast title="Success" variant="success" data-testid="toast" />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveAttribute("data-variant", "success");
  });

  it("renders error variant", () => {
    render(<Toast title="Error" variant="error" data-testid="toast" />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveAttribute("data-variant", "error");
  });

  it("renders warning variant", () => {
    render(<Toast title="Warning" variant="warning" data-testid="toast" />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveAttribute("data-variant", "warning");
  });

  it("renders info variant", () => {
    render(<Toast title="Info" variant="info" data-testid="toast" />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveAttribute("data-variant", "info");
  });

  it("dismiss button calls onDismiss", async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    render(<Toast title="Dismissable" onDismiss={onDismiss} />);
    const dismissButton = screen.getByRole("button", { name: "Dismiss" });
    await user.click(dismissButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not render dismiss button when onDismiss is not provided", () => {
    render(<Toast title="No dismiss" />);
    expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();
  });

  it("has role=status and aria-live=polite", () => {
    render(<Toast title="Accessible" data-testid="toast" />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveAttribute("role", "status");
    expect(toast).toHaveAttribute("aria-live", "polite");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Toast ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

function ToastTrigger({ variant }: { variant?: string }) {
  const { toast } = useToast();
  return (
    <button
      onClick={() =>
        toast({
          title: "Test toast",
          description: "Test description",
          variant: variant as any,
        })
      }
    >
      Add toast
    </button>
  );
}

function DismissTrigger() {
  const { toast, dismiss } = useToast();
  return (
    <>
      <button
        onClick={() => {
          const id = toast({
            title: "Dismissable toast",
            duration: 0,
          });
          // Store the id for the dismiss button
          (window as any).__lastToastId = id;
        }}
      >
        Add toast
      </button>
      <button onClick={() => dismiss((window as any).__lastToastId)}>
        Dismiss toast
      </button>
    </>
  );
}

describe("ToastProvider + useToast", () => {
  it("adding a toast renders it", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastTrigger />
        <ToastViewport />
      </ToastProvider>
    );

    await user.click(screen.getByText("Add toast"));
    expect(screen.getByText("Test toast")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("toast auto-dismisses after duration", () => {
    jest.useFakeTimers();

    function AutoDismissTrigger() {
      const { toast } = useToast();
      return (
        <button
          onClick={() =>
            toast({
              title: "Auto dismiss",
              duration: 3000,
            })
          }
        >
          Add toast
        </button>
      );
    }

    render(
      <ToastProvider>
        <AutoDismissTrigger />
        <ToastViewport />
      </ToastProvider>
    );

    act(() => {
      screen.getByText("Add toast").click();
    });
    expect(screen.getByText("Auto dismiss")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText("Auto dismiss")).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it("dismiss removes a toast", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <DismissTrigger />
        <ToastViewport />
      </ToastProvider>
    );

    await user.click(screen.getByText("Add toast"));
    expect(screen.getByText("Dismissable toast")).toBeInTheDocument();

    await user.click(screen.getByText("Dismiss toast"));
    expect(screen.queryByText("Dismissable toast")).not.toBeInTheDocument();
  });
});
