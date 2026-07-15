import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text, View } from "react-native";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./Dialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "React Native/Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a description of the dialog content.
              </DialogDescription>
            </DialogHeader>
            <Text className="text-gray-700 mt-4">
              Dialog body content goes here.
            </Text>
            <DialogFooter>
              <Button variant="outline" onPress={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onPress={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

export const WithLongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setOpen(true)}>Open Long Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>
                Please read the following terms carefully.
              </DialogDescription>
            </DialogHeader>
            <View className="mt-4 gap-2">
              <Text className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text className="text-gray-700">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text className="text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </Text>
            </View>
            <DialogFooter>
              <Button variant="outline" onPress={() => setOpen(false)}>
                Decline
              </Button>
              <Button onPress={() => setOpen(false)}>Accept</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

export const DestructiveConfirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <View>
        <Button variant="danger" onPress={() => setOpen(true)}>
          Delete Account
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogClose />
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Your account and all data will be
                permanently deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onPress={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onPress={() => setOpen(false)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};
