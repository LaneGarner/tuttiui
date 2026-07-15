import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "React Native/Input",
  component: Input,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter text...",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm", placeholder: "Small input" } };
export const Medium: Story = { args: { size: "md", placeholder: "Medium input" } };
export const Large: Story = { args: { size: "lg", placeholder: "Large input" } };
export const WithError: Story = { args: { error: true, placeholder: "Error state" } };
export const Disabled: Story = { args: { disabled: true, placeholder: "Disabled input" } };
export const WithValue: Story = { args: { value: "Hello, world!" } };
