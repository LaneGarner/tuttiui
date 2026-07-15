import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "React Native/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: (args) => (
    <View className="gap-4">
      <Text className="text-gray-900">Above the divider</Text>
      <Divider {...args} />
      <Text className="text-gray-900">Below the divider</Text>
    </View>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <View className="flex-row items-center gap-4 h-10">
      <Text className="text-gray-900">Left</Text>
      <Divider orientation="vertical" {...args} />
      <Text className="text-gray-900">Right</Text>
    </View>
  ),
};

export const Semantic: Story = {
  args: { decorative: false },
  render: (args) => (
    <View className="gap-4">
      <Text className="text-gray-900">Section A</Text>
      <Divider {...args} />
      <Text className="text-gray-900">Section B</Text>
    </View>
  ),
};
