import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    "aria-label": "Default switch",
  },
};

export const Checked: Story = {
  args: {
    "aria-label": "Checked switch",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Disabled switch",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch aria-label="Small" size="sm" />
        <span className="text-sm text-gray-700">Small</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch aria-label="Medium" size="md" />
        <span className="text-sm text-gray-700">Medium</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch aria-label="Large" size="lg" />
        <span className="text-sm text-gray-700">Large</span>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" aria-label="Enable notifications" />
      <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
        Enable notifications
      </label>
    </div>
  ),
};
