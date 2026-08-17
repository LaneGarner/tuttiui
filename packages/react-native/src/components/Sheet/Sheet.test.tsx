import { createRef } from "react";
import { Text, View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./Sheet";

function renderSheet(open: boolean, onOpenChange = jest.fn()) {
  return {
    onOpenChange,
    ...render(
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent testID="sheet-content">
          <SheetClose />
          <SheetHeader>
            <SheetTitle>Test Title</SheetTitle>
            <SheetDescription>Test Description</SheetDescription>
          </SheetHeader>
          <Text>Sheet body</Text>
          <SheetFooter>
            <Text>Cancel</Text>
            <Text>Confirm</Text>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  };
}

describe("Sheet", () => {
  it("does not render content when open=false", () => {
    renderSheet(false);
    expect(screen.queryByText("Test Title")).toBeNull();
  });

  it("renders content when open=true", () => {
    renderSheet(true);
    expect(screen.getByText("Test Title")).toBeTruthy();
  });

  it("renders title and description", () => {
    renderSheet(true);
    expect(screen.getByText("Test Title")).toBeTruthy();
    expect(screen.getByText("Test Description")).toBeTruthy();
  });

  it("renders footer children", () => {
    renderSheet(true);
    expect(screen.getByText("Cancel")).toBeTruthy();
    expect(screen.getByText("Confirm")).toBeTruthy();
  });

  it("renders sheet body", () => {
    renderSheet(true);
    expect(screen.getByText("Sheet body")).toBeTruthy();
  });

  it("SheetClose button calls onOpenChange with false", () => {
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange);
    const closeButton = screen.getByLabelText("Close");
    fireEvent.press(closeButton);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("pressing overlay calls onOpenChange with false", () => {
    const onOpenChange = jest.fn();
    renderSheet(true, onOpenChange);
    const overlay = screen.getByLabelText("Close sheet");
    fireEvent.press(overlay);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("forwards ref on SheetContent", () => {
    const ref = createRef<View>();
    render(
      <Sheet open={true} onOpenChange={jest.fn()}>
        <SheetContent ref={ref}>
          <SheetTitle>Title</SheetTitle>
          <Text>Content</Text>
        </SheetContent>
      </Sheet>
    );
    expect(ref.current).toBeTruthy();
  });

  it("forwards ref on SheetTitle", () => {
    const ref = createRef<Text>();
    render(
      <Sheet open={true} onOpenChange={jest.fn()}>
        <SheetContent>
          <SheetTitle ref={ref}>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(ref.current).toBeTruthy();
  });

  it("forwards ref on SheetClose", () => {
    const ref = createRef<View>();
    render(
      <Sheet open={true} onOpenChange={jest.fn()}>
        <SheetContent>
          <SheetClose ref={ref} />
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(ref.current).toBeTruthy();
  });

  it("renders custom children in SheetClose", () => {
    render(
      <Sheet open={true} onOpenChange={jest.fn()}>
        <SheetContent>
          <SheetClose>
            <Text>X</Text>
          </SheetClose>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("X")).toBeTruthy();
  });

  it("accepts snapPoints without crashing (first point applied)", () => {
    render(
      <Sheet open={true} onOpenChange={jest.fn()} snapPoints={[0.5, 0.9]}>
        <SheetContent testID="snap-content">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("Title")).toBeTruthy();
  });
});
