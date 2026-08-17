import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text, View } from "react-native";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./Sheet";
import { Button } from "../Button";

const meta: Meta<typeof Sheet> = {
  title: "React Native/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <View>
        <Button onPress={() => setOpen(true)}>Open Sheet</Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetClose />
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>
                A bottom sheet using the native slide-up Modal.
              </SheetDescription>
            </SheetHeader>
            <Text className="py-4 text-sm text-tt-fg-muted">
              This is the main content area of the sheet.
            </Text>
            <SheetFooter>
              <Button onPress={() => setOpen(false)}>Done</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </View>
    );
  },
};

export const SnapPoint: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <View>
        <Button onPress={() => setOpen(true)}>Open half-height sheet</Button>
        <Sheet open={open} onOpenChange={setOpen} snapPoints={[0.5, 0.9]}>
          <SheetContent>
            <SheetClose />
            <SheetHeader>
              <SheetTitle>Snap Point</SheetTitle>
              <SheetDescription>
                On native the sheet rests at the first snap point only (50%
                here); multi-point dragging is web-only.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </View>
    );
  },
};
