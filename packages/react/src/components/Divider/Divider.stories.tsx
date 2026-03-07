import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="mb-4 text-sm text-gray-700">Content above</p>
      <Divider orientation="horizontal" />
      <p className="mt-4 text-sm text-gray-700">Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-4">
      <span className="text-sm text-gray-700">Left</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-gray-700">Right</span>
    </div>
  ),
};

export const InStack: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
        Section 1
      </div>
      <Divider />
      <div className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
        Section 2
      </div>
      <Divider />
      <div className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
        Section 3
      </div>
    </div>
  ),
};
