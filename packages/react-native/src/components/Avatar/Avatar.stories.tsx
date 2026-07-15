import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "React Native/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithFallbackText: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=storybook" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Small: Story = {
  render: () => (
    <Avatar size="sm">
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
  ),
};

export const Medium: Story = {
  render: () => (
    <Avatar size="md">
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  ),
};

export const Large: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <Avatar size="xl">
      <AvatarFallback>XL</AvatarFallback>
    </Avatar>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View className="flex-row items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </View>
  ),
};
