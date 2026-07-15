import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "React Native/Textarea",
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => (
    <View className="max-w-md">
      <Textarea placeholder="Write your message..." />
    </View>
  ),
};

export const WithError: Story = {
  render: () => (
    <View className="max-w-md">
      <Textarea placeholder="Write your message..." error />
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View className="max-w-md">
      <Textarea placeholder="Write your message..." disabled />
    </View>
  ),
};

export const WithValue: Story = {
  render: () => (
    <View className="max-w-md">
      <Textarea defaultValue="Some pre-filled content that spans multiple lines when it gets long enough." />
    </View>
  ),
};
