import type { Meta, StoryObj } from "@storybook/react";
import { StreamingText } from "./StreamingText";

const meta: Meta<typeof StreamingText> = {
  title: "AI/StreamingText",
  component: StreamingText,
  tags: ["autodocs"],
  argTypes: {
    speed: {
      control: "select",
      options: ["slow", "normal", "fast"],
    },
    isStreaming: { control: "boolean" },
    showCursor: { control: "boolean" },
    text: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof StreamingText>;

export const Default: Story = {
  args: {
    text: "Hello! I'm an AI assistant. I can help you with a variety of tasks including answering questions, writing code, and brainstorming ideas. How can I help you today?",
    isStreaming: true,
    speed: "normal",
  },
};

export const Fast: Story = {
  args: {
    text: "This text streams quickly, character by character, at 15ms per character. It feels responsive and snappy.",
    isStreaming: true,
    speed: "fast",
  },
};

export const Slow: Story = {
  args: {
    text: "This text streams slowly, at 80ms per character. It creates a dramatic, deliberate effect.",
    isStreaming: true,
    speed: "slow",
  },
};

export const NotStreaming: Story = {
  args: {
    text: "This text appears immediately because isStreaming is false. No animation, no cursor.",
    isStreaming: false,
  },
};

export const LongText: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    isStreaming: true,
    speed: "fast",
  },
};
