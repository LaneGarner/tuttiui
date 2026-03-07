import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">Small</span>
        <Progress value={60} size="sm" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">Medium</span>
        <Progress value={60} size="md" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">Large</span>
        <Progress value={60} size="lg" />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">Default</span>
        <Progress value={60} variant="default" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">Success</span>
        <Progress value={60} variant="success" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">Warning</span>
        <Progress value={60} variant="warning" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">Error</span>
        <Progress value={60} variant="error" />
      </div>
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">25%</span>
        <Progress value={25} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">50%</span>
        <Progress value={50} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">75%</span>
        <Progress value={75} />
      </div>
    </div>
  ),
};
