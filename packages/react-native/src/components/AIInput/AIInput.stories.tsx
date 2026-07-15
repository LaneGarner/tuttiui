import type { Meta, StoryObj } from "@storybook/react";
import { AIInput } from "./AIInput";

const meta: Meta<typeof AIInput> = {
  title: "React Native/AIInput",
  component: AIInput,
  argTypes: {
    placeholder: { control: "text" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Ask anything...",
  },
};

export default meta;
type Story = StoryObj<typeof AIInput>;

export const Default: Story = {};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Type your message here...",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    value: "Generating response...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "What is the weather like today?",
  },
};
