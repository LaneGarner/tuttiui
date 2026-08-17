import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  type SheetProps,
} from "./Sheet";

function renderSheet(
  open: boolean,
  onOpenChange = jest.fn(),
  extra: Partial<Pick<SheetProps, "snapPoints" | "dismissOnDrag">> = {}
) {
  return {
    onOpenChange,
    ...render(
      <Sheet open={open} onOpenChange={onOpenChange} {...extra}>
        <SheetContent data-testid="sheet-content">
          <SheetClose />
          <SheetHeader>
            <SheetTitle>Test Title</SheetTitle>
            <SheetDescription>Test Description</SheetDescription>
          </SheetHeader>
          <p>Sheet body</p>
          <SheetFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  };
}

// jsdom has no PointerEvent, and testing-library's fireEvent.pointerDown
// falls back to a plain Event that drops clientY. MouseEvent carries the
// coordinates and React dispatches it to onPointer* handlers just the same.
function firePointer(el: HTMLElement, type: string, clientY: number) {
  fireEvent(el, new MouseEvent(type, { bubbles: true, clientY }));
}

function drag(el: HTMLElement, fromY: number, toY: number) {
  firePointer(el, "pointerdown", fromY);
  firePointer(el, "pointermove", toY);
  firePointer(el, "pointerup", toY);
}

describe("Sheet", () => {
  it("is hidden when open=false", () => {
    renderSheet(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows when open=true", () => {
    renderSheet(true);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("clicking overlay closes sheet", () => {
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange);
    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Escape key closes sheet", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange);
    const sheet = screen.getByRole("dialog");
    await user.type(sheet, "{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("moves focus into the sheet on open", () => {
    renderSheet(true);
    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it("locks body scroll while open and restores on close", () => {
    const { rerender } = render(
      <Sheet open={true} onOpenChange={jest.fn()}>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(document.body.style.overflow).toBe("hidden");
    rerender(
      <Sheet open={false} onOpenChange={jest.fn()}>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("has correct ARIA attributes", () => {
    renderSheet(true);
    const sheet = screen.getByRole("dialog");
    expect(sheet).toHaveAttribute("aria-modal", "true");
    expect(sheet).toHaveAttribute("aria-labelledby");
    expect(sheet).toHaveAttribute("aria-describedby");
  });

  it("SheetTitle id matches aria-labelledby", () => {
    renderSheet(true);
    const sheet = screen.getByRole("dialog");
    const titleId = sheet.getAttribute("aria-labelledby");
    expect(screen.getByText("Test Title")).toHaveAttribute("id", titleId);
  });

  it("SheetDescription id matches aria-describedby", () => {
    renderSheet(true);
    const sheet = screen.getByRole("dialog");
    const descId = sheet.getAttribute("aria-describedby");
    expect(screen.getByText("Test Description")).toHaveAttribute("id", descId);
  });

  it("exposes data-state=open", () => {
    renderSheet(true);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-state", "open");
  });

  it("renders a grab handle", () => {
    renderSheet(true);
    expect(
      document.querySelector("[data-tt-sheet-handle]")
    ).toBeInTheDocument();
  });

  it("SheetClose button calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies the first snap point as height", () => {
    renderSheet(true, jest.fn(), { snapPoints: [0.5, 0.9] });
    const sheet = screen.getByRole("dialog");
    expect(sheet).toHaveStyle({ height: "50vh" });
    expect(sheet).toHaveAttribute("data-snap", "0.5");
  });

  it("dragging up moves to the next snap point", () => {
    renderSheet(true, jest.fn(), { snapPoints: [0.5, 0.9] });
    const sheet = screen.getByRole("dialog");
    drag(sheet, 500, 300);
    expect(sheet).toHaveStyle({ height: "90vh" });
    expect(sheet).toHaveAttribute("data-snap", "0.9");
  });

  it("dragging down from an upper snap point snaps down instead of closing", () => {
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange, {
      snapPoints: [0.5, 0.9],
      dismissOnDrag: true,
    });
    const sheet = screen.getByRole("dialog");
    drag(sheet, 500, 300); // up to 0.9
    drag(sheet, 300, 500); // down to 0.5
    expect(sheet).toHaveStyle({ height: "50vh" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("dragging down past threshold closes when dismissOnDrag", () => {
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange, { dismissOnDrag: true });
    drag(screen.getByRole("dialog"), 300, 500);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("a short downward drag does not close", () => {
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange, { dismissOnDrag: true });
    drag(screen.getByRole("dialog"), 300, 340);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("dragging down does not close without dismissOnDrag", () => {
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange);
    drag(screen.getByRole("dialog"), 300, 500);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("forwards ref on SheetContent", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <Sheet open={true} onOpenChange={jest.fn()}>
        <SheetContent ref={ref}>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges className on SheetContent", () => {
    render(
      <Sheet open={true} onOpenChange={jest.fn()}>
        <SheetContent className="custom-class">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    const sheet = screen.getByRole("dialog");
    expect(sheet).toHaveClass("custom-class");
    expect(sheet).toHaveClass("rounded-t-2xl");
  });

  it("renders footer with children", () => {
    renderSheet(true);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("throws when compound components are used outside <Sheet>", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<SheetTitle>Orphan</SheetTitle>)).toThrow(
      "Sheet compound components must be used within <Sheet>"
    );
    spy.mockRestore();
  });
});
