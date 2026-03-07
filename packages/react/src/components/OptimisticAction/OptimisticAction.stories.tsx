import type { Meta, StoryObj } from "@storybook/react";
import { OptimisticAction } from "./OptimisticAction";

const meta: Meta<typeof OptimisticAction> = {
  title: "AI/OptimisticAction",
  component: OptimisticAction,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof OptimisticAction>;

export const Default: Story = {
  args: {
    children: "Save Changes",
    onAction: () => new Promise<void>((resolve) => setTimeout(resolve, 1000)),
  },
};

export const WithFailure: Story = {
  args: {
    children: "Submit",
    onAction: () =>
      new Promise<void>((_, reject) =>
        setTimeout(() => reject(new Error("Network error")), 1000)
      ),
    failedLabel: "Submission Failed",
  },
};

export const DangerVariant: Story = {
  args: {
    children: "Delete Item",
    variant: "danger",
    onAction: () => new Promise<void>((resolve) => setTimeout(resolve, 1000)),
    confirmLabel: "Deleted",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <OptimisticAction
        size="sm"
        onAction={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      >
        Small
      </OptimisticAction>
      <OptimisticAction
        size="md"
        onAction={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      >
        Medium
      </OptimisticAction>
      <OptimisticAction
        size="lg"
        onAction={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      >
        Large
      </OptimisticAction>
    </div>
  ),
};
