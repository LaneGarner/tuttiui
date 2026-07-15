import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { AIChat, type ChatMessage } from "./AIChat";

const sampleMessages: ChatMessage[] = [
  { id: "1", role: "user", content: "Hello! Can you help me with a question?" },
  {
    id: "2",
    role: "assistant",
    content: "Of course! I'd be happy to help. What would you like to know?",
  },
  {
    id: "3",
    role: "user",
    content: "What is the meaning of life?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "That's a profound question. Many philosophers have pondered this throughout history. The answer often depends on your personal values and beliefs.",
  },
];

const meta: Meta<typeof AIChat> = {
  title: "React Native/AIChat",
  component: AIChat,
  decorators: [
    (Story) => (
      <View className="h-96 border border-gray-200 rounded-lg">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AIChat>;

export const Default: Story = {
  args: {
    messages: sampleMessages,
  },
};

export const Loading: Story = {
  args: {
    messages: [
      { id: "1", role: "user", content: "Tell me a joke." },
    ],
    isLoading: true,
  },
};

export const WithSystemMessage: Story = {
  args: {
    messages: [
      { id: "1", role: "system", content: "Conversation started" },
      { id: "2", role: "user", content: "Hi there!" },
      { id: "3", role: "assistant", content: "Hello! How can I assist you today?" },
    ],
  },
};

export const WithTimestamps: Story = {
  args: {
    messages: [
      {
        id: "1",
        role: "user",
        content: "What time is it?",
        timestamp: new Date(2025, 0, 15, 10, 30),
      },
      {
        id: "2",
        role: "assistant",
        content: "I don't have access to real-time data, but I can help with other things!",
        timestamp: new Date(2025, 0, 15, 10, 31),
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    messages: [],
  },
};
