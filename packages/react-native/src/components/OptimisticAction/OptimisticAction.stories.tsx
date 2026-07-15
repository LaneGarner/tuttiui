import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { OptimisticAction } from "./OptimisticAction";

const successAction = () => new Promise<void>((resolve) => setTimeout(resolve, 1500));
const failAction = () =>
  new Promise<void>((_, reject) => setTimeout(() => reject(new Error("Failed")), 1500));

const meta: Meta<typeof OptimisticAction> = {
  title: "React Native/OptimisticAction",
  component: OptimisticAction,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof OptimisticAction>;

export const Primary: Story = {
  args: {
    variant: "primary",
    onAction: successAction,
    children: "Save Changes",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    onAction: successAction,
    children: "Update",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    onAction: successAction,
    children: "Delete",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    onAction: successAction,
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    onAction: successAction,
    children: "Large Action",
  },
};

export const WillFail: Story = {
  args: {
    variant: "primary",
    onAction: failAction,
    children: "This Will Fail",
    failedLabel: "Something went wrong",
  },
};

export const CustomLabels: Story = {
  args: {
    variant: "primary",
    onAction: successAction,
    children: "Submit",
    pendingLabel: "Submitting...",
    confirmLabel: "Submitted!",
  },
};

export const Disabled: Story = {
  args: {
    onAction: successAction,
    children: "Cannot Click",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-3">
      <OptimisticAction variant="primary" onAction={successAction}>
        Primary
      </OptimisticAction>
      <OptimisticAction variant="secondary" onAction={successAction}>
        Secondary
      </OptimisticAction>
      <OptimisticAction variant="danger" onAction={successAction}>
        Danger
      </OptimisticAction>
    </View>
  ),
};
