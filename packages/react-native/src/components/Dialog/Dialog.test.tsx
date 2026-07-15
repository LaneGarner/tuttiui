import { createRef } from "react";
import { Text, View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./Dialog";

function renderDialog(open: boolean, onOpenChange = jest.fn()) {
  return {
    onOpenChange,
    ...render(
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent testID="dialog-content">
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
          <Text>Dialog body</Text>
          <DialogFooter>
            <Text>Cancel</Text>
            <Text>Confirm</Text>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  };
}

describe("Dialog", () => {
  it("does not render content when open=false", () => {
    renderDialog(false);
    expect(screen.queryByText("Test Title")).toBeNull();
  });

  it("renders content when open=true", () => {
    renderDialog(true);
    expect(screen.getByText("Test Title")).toBeTruthy();
  });

  it("renders title and description", () => {
    renderDialog(true);
    expect(screen.getByText("Test Title")).toBeTruthy();
    expect(screen.getByText("Test Description")).toBeTruthy();
  });

  it("renders footer children", () => {
    renderDialog(true);
    expect(screen.getByText("Cancel")).toBeTruthy();
    expect(screen.getByText("Confirm")).toBeTruthy();
  });

  it("renders dialog body", () => {
    renderDialog(true);
    expect(screen.getByText("Dialog body")).toBeTruthy();
  });

  it("DialogClose button calls onOpenChange with false", () => {
    const onOpenChange = jest.fn();
    renderDialog(true, onOpenChange);
    const closeButton = screen.getByLabelText("Close");
    fireEvent.press(closeButton);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("pressing overlay calls onOpenChange with false", () => {
    const onOpenChange = jest.fn();
    renderDialog(true, onOpenChange);
    const overlay = screen.getByLabelText("Close dialog");
    fireEvent.press(overlay);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("forwards ref on DialogContent", () => {
    const ref = createRef<View>();
    render(
      <Dialog open={true} onOpenChange={jest.fn()}>
        <DialogContent ref={ref}>
          <DialogTitle>Title</DialogTitle>
          <Text>Content</Text>
        </DialogContent>
      </Dialog>
    );
    expect(ref.current).toBeTruthy();
  });

  it("forwards ref on DialogTitle", () => {
    const ref = createRef<Text>();
    render(
      <Dialog open={true} onOpenChange={jest.fn()}>
        <DialogContent>
          <DialogTitle ref={ref}>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(ref.current).toBeTruthy();
  });

  it("forwards ref on DialogClose", () => {
    const ref = createRef<View>();
    render(
      <Dialog open={true} onOpenChange={jest.fn()}>
        <DialogContent>
          <DialogClose ref={ref} />
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(ref.current).toBeTruthy();
  });

  it("renders custom children in DialogClose", () => {
    render(
      <Dialog open={true} onOpenChange={jest.fn()}>
        <DialogContent>
          <DialogClose>
            <Text>X</Text>
          </DialogClose>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText("X")).toBeTruthy();
  });
});
