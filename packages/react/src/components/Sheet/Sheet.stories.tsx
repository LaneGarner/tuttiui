import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

const triggerClass =
  "inline-flex h-10 items-center justify-center rounded-md bg-tt-primary px-4 text-sm font-medium text-tt-primary-fg hover:bg-tt-primary-hover";

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <button className={triggerClass} onClick={() => setOpen(true)}>
          Open Sheet
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetClose />
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>
                A bottom-anchored panel that slides up from the edge of the
                screen.
              </SheetDescription>
            </SheetHeader>
            <p className="py-4 text-sm text-tt-fg-muted">
              This is the main content area of the sheet.
            </p>
            <SheetFooter>
              <button className={triggerClass} onClick={() => setOpen(false)}>
                Done
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

export const SnapPoints: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <button className={triggerClass} onClick={() => setOpen(true)}>
          Open with snap points
        </button>
        <Sheet open={open} onOpenChange={setOpen} snapPoints={[0.5, 0.9]}>
          <SheetContent>
            <SheetClose />
            <SheetHeader>
              <SheetTitle>Snap Points</SheetTitle>
              <SheetDescription>
                Opens at 50% of the viewport. Drag the handle up to expand to
                90%, or drag down to return.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-2 py-4">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="text-sm text-tt-fg-muted">
                  Scrollable row {i + 1}
                </p>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

export const DismissOnDrag: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <button className={triggerClass} onClick={() => setOpen(true)}>
          Open dismissible sheet
        </button>
        <Sheet open={open} onOpenChange={setOpen} dismissOnDrag>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Drag to dismiss</SheetTitle>
              <SheetDescription>
                Drag this sheet downward past the threshold to close it. Escape
                and overlay click also close it.
              </SheetDescription>
            </SheetHeader>
            <p className="py-4 text-sm text-tt-fg-muted">
              Try dragging the handle bar at the top.
            </p>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};
