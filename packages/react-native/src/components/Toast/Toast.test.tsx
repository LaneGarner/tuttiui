import { createRef } from "react";
import { View, Pressable, Text } from "react-native";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import { Toast } from "./Toast";
import { ToastProvider, useToast } from "./ToastProvider";

describe("Toast", () => {
  it("renders with title and description", () => {
    render(<Toast title="Hello" description="World" />);
    expect(screen.getByText("Hello")).toBeTruthy();
    expect(screen.getByText("World")).toBeTruthy();
  });

  it("renders default variant", () => {
    render(<Toast title="Default" testID="toast" />);
    expect(screen.getByTestId("toast")).toBeTruthy();
  });

  it("renders success variant", () => {
    render(<Toast title="Success" variant="success" testID="toast" />);
    expect(screen.getByTestId("toast")).toBeTruthy();
  });

  it("renders error variant", () => {
    render(<Toast title="Error" variant="error" testID="toast" />);
    expect(screen.getByTestId("toast")).toBeTruthy();
  });

  it("renders warning variant", () => {
    render(<Toast title="Warning" variant="warning" testID="toast" />);
    expect(screen.getByTestId("toast")).toBeTruthy();
  });

  it("renders info variant", () => {
    render(<Toast title="Info" variant="info" testID="toast" />);
    expect(screen.getByTestId("toast")).toBeTruthy();
  });

  it("shows dismiss button when onDismiss is provided", () => {
    render(<Toast title="Dismissable" onDismiss={() => {}} />);
    expect(screen.getByLabelText("Dismiss")).toBeTruthy();
  });

  it("does not show dismiss button when onDismiss is not provided", () => {
    render(<Toast title="No dismiss" />);
    expect(screen.queryByLabelText("Dismiss")).toBeNull();
  });

  it("calls onDismiss when dismiss button is pressed", () => {
    const onDismiss = jest.fn();
    render(<Toast title="Dismissable" onDismiss={onDismiss} />);
    fireEvent.press(screen.getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Toast ref={ref} title="Ref test" />);
    expect(ref.current).toBeTruthy();
  });
});

function ToastTrigger({ variant }: { variant?: string }) {
  const { toast } = useToast();
  return (
    <Pressable
      testID="add-toast"
      onPress={() =>
        toast({
          title: "Test toast",
          description: "Test description",
          variant: variant as any,
        })
      }
    >
      <Text>Add toast</Text>
    </Pressable>
  );
}

function DismissTrigger() {
  const { toast, dismiss } = useToast();
  let lastId = "";
  return (
    <>
      <Pressable
        testID="add-toast"
        onPress={() => {
          lastId = toast({
            title: "Dismissable toast",
            duration: 0,
          });
          // Store on global for dismiss button access
          (global as any).__lastToastId = lastId;
        }}
      >
        <Text>Add toast</Text>
      </Pressable>
      <Pressable
        testID="dismiss-toast"
        onPress={() => dismiss((global as any).__lastToastId)}
      >
        <Text>Dismiss toast</Text>
      </Pressable>
    </>
  );
}

describe("ToastProvider + useToast", () => {
  it("adding a toast renders it", () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );

    fireEvent.press(screen.getByTestId("add-toast"));
    expect(screen.getByText("Test toast")).toBeTruthy();
    expect(screen.getByText("Test description")).toBeTruthy();
  });

  it("toast auto-dismisses after duration", () => {
    jest.useFakeTimers();

    function AutoDismissTrigger() {
      const { toast } = useToast();
      return (
        <Pressable
          testID="add-toast"
          onPress={() =>
            toast({
              title: "Auto dismiss",
              duration: 3000,
            })
          }
        >
          <Text>Add toast</Text>
        </Pressable>
      );
    }

    render(
      <ToastProvider>
        <AutoDismissTrigger />
      </ToastProvider>
    );

    act(() => {
      fireEvent.press(screen.getByTestId("add-toast"));
    });
    expect(screen.getByText("Auto dismiss")).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText("Auto dismiss")).toBeNull();

    jest.useRealTimers();
  });

  it("dismiss removes a toast", () => {
    render(
      <ToastProvider>
        <DismissTrigger />
      </ToastProvider>
    );

    fireEvent.press(screen.getByTestId("add-toast"));
    expect(screen.getByText("Dismissable toast")).toBeTruthy();

    fireEvent.press(screen.getByTestId("dismiss-toast"));
    expect(screen.queryByText("Dismissable toast")).toBeNull();
  });

  it("throws when useToast is used outside provider", () => {
    function BadComponent() {
      useToast();
      return null;
    }

    expect(() => render(<BadComponent />)).toThrow(
      "useToast must be used within a <ToastProvider>"
    );
  });
});
