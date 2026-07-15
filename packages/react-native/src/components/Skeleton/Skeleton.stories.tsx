import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "React Native/Skeleton",
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
};

export const Rectangle: Story = {
  render: () => <Skeleton className="h-24 w-64" />,
};

export const CardPlaceholder: Story = {
  render: () => (
    <View className="gap-3 w-64">
      <View className="flex-row items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <View className="gap-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </View>
      </View>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-5/6" />
    </View>
  ),
};
