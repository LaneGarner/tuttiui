import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    required: { control: "boolean" },
  },
  args: {
    children: "Label",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
    children: "Email address",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="demo-input">Username</Label>
      <input
        id="demo-input"
        type="text"
        placeholder="Enter your username"
        className="h-10 rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  ),
};
