import type { Meta, StoryObj } from "@storybook/react";
import { AIChat, type ChatMessage } from "./AIChat";

const meta: Meta<typeof AIChat> = {
  title: "AI/AIChat",
  component: AIChat,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AIChat>;

const conversationMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Hey, can you help me with a React question?",
    timestamp: new Date("2025-01-15T10:00:00"),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Of course! I'd be happy to help with your React question. What would you like to know?",
    timestamp: new Date("2025-01-15T10:00:05"),
  },
  {
    id: "3",
    role: "user",
    content: "What is the difference between useEffect and useLayoutEffect?",
    timestamp: new Date("2025-01-15T10:01:00"),
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Great question! The key difference is timing:\n\nuseEffect runs asynchronously after the browser paints the screen. This is the most common choice and works well for data fetching, subscriptions, and side effects that don't need to block visual updates.\n\nuseLayoutEffect runs synchronously after DOM mutations but before the browser paints. Use it when you need to measure DOM elements or make visual adjustments that must happen before the user sees the rendered output.",
    timestamp: new Date("2025-01-15T10:01:10"),
  },
];

export const Default: Story = {
  args: {
    messages: conversationMessages,
    className: "h-96 p-4",
  },
};

export const WithLoading: Story = {
  args: {
    messages: [
      {
        id: "1",
        role: "user",
        content: "Explain quantum computing in simple terms.",
        timestamp: new Date("2025-01-15T10:00:00"),
      },
    ],
    isLoading: true,
    className: "h-96 p-4",
  },
};

export const WithSystemMessage: Story = {
  args: {
    messages: [
      {
        id: "0",
        role: "system",
        content: "You are now chatting with an AI assistant.",
      },
      {
        id: "1",
        role: "user",
        content: "Hello!",
        timestamp: new Date("2025-01-15T10:00:00"),
      },
      {
        id: "2",
        role: "assistant",
        content: "Hello! How can I help you today?",
        timestamp: new Date("2025-01-15T10:00:03"),
      },
    ],
    className: "h-96 p-4",
  },
};

export const LongConversation: Story = {
  args: {
    messages: [
      { id: "1", role: "user", content: "What is TypeScript?" },
      {
        id: "2",
        role: "assistant",
        content:
          "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      },
      { id: "3", role: "user", content: "Why should I use it?" },
      {
        id: "4",
        role: "assistant",
        content:
          "TypeScript catches errors early through its type system, provides better editor support with autocompletion and refactoring tools, and makes large codebases easier to maintain.",
      },
      {
        id: "5",
        role: "user",
        content: "Can I use it with React?",
      },
      {
        id: "6",
        role: "assistant",
        content:
          "Absolutely! TypeScript works great with React. You can type your props, state, context, and hooks for a much safer development experience.",
      },
      {
        id: "7",
        role: "user",
        content: "What about performance? Does it add overhead?",
      },
      {
        id: "8",
        role: "assistant",
        content:
          "No runtime overhead at all. TypeScript compiles down to plain JavaScript, so there is zero performance cost. All the type checking happens at build time.",
      },
      { id: "9", role: "user", content: "How do I get started?" },
      {
        id: "10",
        role: "assistant",
        content:
          "The easiest way is to create a new project with a TypeScript template:\n\nnpx create-react-app my-app --template typescript\n\nOr if you prefer Vite:\n\nnpm create vite@latest my-app -- --template react-ts\n\nThen just start writing .tsx files instead of .jsx!",
      },
      { id: "11", role: "user", content: "Thanks, that was very helpful!" },
      {
        id: "12",
        role: "assistant",
        content:
          "You're welcome! Feel free to ask if you have any more questions. Happy coding!",
      },
    ],
    className: "h-96 p-4",
  },
};
