import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "React Native/Label",
  component: Label,
  argTypes: {
    required: { control: "boolean" },
  },
  args: {
    children: "Email address",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
