import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
        <DialogContent data-testid="dialog-content">
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
          <p>Dialog body</p>
          <DialogFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  };
}

describe("Dialog", () => {
  it("is hidden when open=false", () => {
    renderDialog(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows when open=true", () => {
    renderDialog(true);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("clicking overlay closes dialog", () => {
    const onOpenChange = jest.fn();
    renderDialog(true, onOpenChange);
    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Escape key closes dialog", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    renderDialog(true, onOpenChange);
    const dialog = screen.getByRole("dialog");
    await user.type(dialog, "{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("has correct ARIA attributes", () => {
    renderDialog(true);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  it("DialogTitle renders", () => {
    renderDialog(true);
    const title = screen.getByText("Test Title");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H2");
  });

  it("DialogDescription renders", () => {
    renderDialog(true);
    const desc = screen.getByText("Test Description");
    expect(desc).toBeInTheDocument();
    expect(desc.tagName).toBe("P");
  });

  it("DialogTitle id matches aria-labelledby", () => {
    renderDialog(true);
    const dialog = screen.getByRole("dialog");
    const titleId = dialog.getAttribute("aria-labelledby");
    const title = screen.getByText("Test Title");
    expect(title).toHaveAttribute("id", titleId);
  });

  it("DialogDescription id matches aria-describedby", () => {
    renderDialog(true);
    const dialog = screen.getByRole("dialog");
    const descId = dialog.getAttribute("aria-describedby");
    const desc = screen.getByText("Test Description");
    expect(desc).toHaveAttribute("id", descId);
  });

  it("DialogClose button calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    renderDialog(true, onOpenChange);
    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("forwards ref on DialogContent", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <Dialog open={true} onOpenChange={jest.fn()}>
        <DialogContent ref={ref}>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Desc</DialogDescription>
          <p>Content</p>
        </DialogContent>
      </Dialog>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders footer with children", () => {
    renderDialog(true);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});
