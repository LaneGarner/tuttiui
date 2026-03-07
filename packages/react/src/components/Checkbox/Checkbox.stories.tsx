import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
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
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    "aria-label": "Default checkbox",
  },
};

export const Checked: Story = {
  args: {
    "aria-label": "Checked checkbox",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Disabled checkbox",
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm font-medium text-gray-700">
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="sm" size="sm" />
        <label htmlFor="sm" className="text-sm text-gray-700">Small</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="md" size="md" />
        <label htmlFor="md" className="text-sm text-gray-700">Medium</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="lg" size="lg" />
        <label htmlFor="lg" className="text-sm text-gray-700">Large</label>
      </div>
    </div>
  ),
};
