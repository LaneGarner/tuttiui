import type { Meta, StoryObj } from "@storybook/react";
import { StreamingText } from "./StreamingText";

const sampleText =
  "Hello! I'm an AI assistant. I can help you with a wide variety of tasks including writing, coding, analysis, and more. How can I assist you today?";

const meta: Meta<typeof StreamingText> = {
  title: "React Native/StreamingText",
  component: StreamingText,
  argTypes: {
    speed: {
      control: "select",
      options: ["slow", "normal", "fast"],
    },
    isStreaming: { control: "boolean" },
    showCursor: { control: "boolean" },
  },
  args: {
    text: sampleText,
    isStreaming: true,
    showCursor: true,
    speed: "normal",
  },
};

export default meta;
type Story = StoryObj<typeof StreamingText>;

export const Default: Story = {};

export const SlowSpeed: Story = {
  args: {
    speed: "slow",
    text: "This text streams slowly, one character at a time.",
  },
};

export const FastSpeed: Story = {
  args: {
    speed: "fast",
    text: "This text streams quickly, appearing almost instantly.",
  },
};

export const NoCursor: Story = {
  args: {
    showCursor: false,
    text: "Streaming without a visible cursor.",
  },
};

export const NotStreaming: Story = {
  args: {
    isStreaming: false,
    text: "This text appears all at once, not streamed.",
  },
};

export const LongText: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
};
