import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "React Native/Toast",
  component: Toast,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning", "info"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    title: "Notification",
    description: "This is a toast notification.",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    description: "Your changes have been saved.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "Something went wrong.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please review your input.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Info",
    description: "A new version is available.",
  },
};

export const WithDismiss: Story = {
  args: {
    variant: "info",
    title: "Dismissible",
    description: "Tap the X to dismiss this toast.",
    onDismiss: () => {},
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Quick update!",
    description: undefined,
  },
};
