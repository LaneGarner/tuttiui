import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "React Native/Progress",
  component: Progress,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
    },
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
  args: {
    value: 60,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Half: Story = { args: { value: 50 } };
export const Full: Story = { args: { value: 100 } };
export const Small: Story = { args: { size: "sm", value: 40 } };
export const Large: Story = { args: { size: "lg", value: 75 } };
export const Success: Story = { args: { variant: "success", value: 80 } };
export const Warning: Story = { args: { variant: "warning", value: 50 } };
export const Error: Story = { args: { variant: "error", value: 30 } };

export const AllVariants: Story = {
  render: () => (
    <View className="gap-4 w-64">
      <Progress value={60} variant="default" />
      <Progress value={80} variant="success" />
      <Progress value={50} variant="warning" />
      <Progress value={30} variant="error" />
    </View>
  ),
};
