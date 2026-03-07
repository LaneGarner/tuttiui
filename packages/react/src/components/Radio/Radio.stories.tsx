import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { RadioItem } from "./RadioItem";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup name="default">
      <label className="flex items-center gap-2">
        <RadioItem value="option1" />
        <span className="text-sm text-gray-700">Option 1</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option2" />
        <span className="text-sm text-gray-700">Option 2</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option3" />
        <span className="text-sm text-gray-700">Option 3</span>
      </label>
    </RadioGroup>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <RadioGroup name="preselected" defaultValue="option2">
      <label className="flex items-center gap-2">
        <RadioItem value="option1" />
        <span className="text-sm text-gray-700">Option 1</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option2" />
        <span className="text-sm text-gray-700">Option 2</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option3" />
        <span className="text-sm text-gray-700">Option 3</span>
      </label>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup name="disabled" defaultValue="option1" disabled>
      <label className="flex items-center gap-2">
        <RadioItem value="option1" />
        <span className="text-sm text-gray-700">Option 1</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option2" />
        <span className="text-sm text-gray-700">Option 2</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option3" />
        <span className="text-sm text-gray-700">Option 3</span>
      </label>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup name="horizontal" className="flex-row gap-4">
      <label className="flex items-center gap-2">
        <RadioItem value="option1" />
        <span className="text-sm text-gray-700">Option 1</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option2" />
        <span className="text-sm text-gray-700">Option 2</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioItem value="option3" />
        <span className="text-sm text-gray-700">Option 3</span>
      </label>
    </RadioGroup>
  ),
};
