import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";
import { ToastProvider, ToastViewport, useToast } from "./ToastProvider";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: "Notification",
    description: "Something happened that you should know about.",
    onDismiss: () => {},
  },
};

export const Success: Story = {
  args: {
    title: "Success",
    description: "Your changes have been saved.",
    variant: "success",
    onDismiss: () => {},
  },
};

export const Error: Story = {
  args: {
    title: "Error",
    description: "Something went wrong. Please try again.",
    variant: "error",
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    description: "Your session is about to expire.",
    variant: "warning",
    onDismiss: () => {},
  },
};

export const Info: Story = {
  args: {
    title: "Info",
    description: "A new version is available.",
    variant: "info",
    onDismiss: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Toast
        title="Default"
        description="This is a default toast."
        onDismiss={() => {}}
      />
      <Toast
        title="Success"
        description="Operation completed successfully."
        variant="success"
        onDismiss={() => {}}
      />
      <Toast
        title="Error"
        description="Something went wrong."
        variant="error"
        onDismiss={() => {}}
      />
      <Toast
        title="Warning"
        description="Please check your input."
        variant="warning"
        onDismiss={() => {}}
      />
      <Toast
        title="Info"
        description="Here is some useful information."
        variant="info"
        onDismiss={() => {}}
      />
    </div>
  ),
};

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-4 text-sm font-medium text-gray-900 hover:bg-gray-200"
        onClick={() =>
          toast({
            title: "Notification",
            description: "This is a default toast notification.",
          })
        }
      >
        Default Toast
      </button>
      <button
        className="inline-flex h-10 items-center justify-center rounded-md bg-green-100 px-4 text-sm font-medium text-green-800 hover:bg-green-200"
        onClick={() =>
          toast({
            title: "Success",
            description: "Your changes have been saved.",
            variant: "success",
          })
        }
      >
        Success Toast
      </button>
      <button
        className="inline-flex h-10 items-center justify-center rounded-md bg-red-100 px-4 text-sm font-medium text-red-800 hover:bg-red-200"
        onClick={() =>
          toast({
            title: "Error",
            description: "Something went wrong.",
            variant: "error",
          })
        }
      >
        Error Toast
      </button>
      <button
        className="inline-flex h-10 items-center justify-center rounded-md bg-amber-100 px-4 text-sm font-medium text-amber-800 hover:bg-amber-200"
        onClick={() =>
          toast({
            title: "Warning",
            description: "Check your input.",
            variant: "warning",
          })
        }
      >
        Warning Toast
      </button>
      <button
        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-100 px-4 text-sm font-medium text-blue-800 hover:bg-blue-200"
        onClick={() =>
          toast({
            title: "Info",
            description: "A new update is available.",
            variant: "info",
          })
        }
      >
        Info Toast
      </button>
    </div>
  );
}

export const WithProvider: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
      <ToastViewport />
    </ToastProvider>
  ),
};
