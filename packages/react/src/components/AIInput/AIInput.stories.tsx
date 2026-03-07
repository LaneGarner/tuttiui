import type { Meta, StoryObj } from "@storybook/react";
import { AIInput } from "./AIInput";

const meta: Meta<typeof AIInput> = {
  title: "AI/AIInput",
  component: AIInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    minRows: { control: "number" },
    maxRows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof AIInput>;

export const Default: Story = {
  args: {
    onSubmit: (value: string) => console.log("Submitted:", value),
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Describe what you want to build...",
    onSubmit: (value: string) => console.log("Submitted:", value),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: "Waiting for response...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Input is disabled",
  },
};
