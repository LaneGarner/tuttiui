import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { ConfidenceIndicator } from "./ConfidenceIndicator";

const meta: Meta<typeof ConfidenceIndicator> = {
  title: "React Native/ConfidenceIndicator",
  component: ConfidenceIndicator,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showPercentage: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    value: 75,
  },
};

export default meta;
type Story = StoryObj<typeof ConfidenceIndicator>;

export const Default: Story = {};

export const LowConfidence: Story = {
  args: { value: 15, label: "Low Confidence" },
};

export const MediumConfidence: Story = {
  args: { value: 45, label: "Medium Confidence" },
};

export const HighConfidence: Story = {
  args: { value: 85, label: "High Confidence" },
};

export const Small: Story = {
  args: { size: "sm", value: 60, label: "Small" },
};

export const Large: Story = {
  args: { size: "lg", value: 60, label: "Large" },
};

export const NoPercentage: Story = {
  args: { value: 70, label: "Model Confidence", showPercentage: false },
};

export const NoLabel: Story = {
  args: { value: 50 },
};

export const AllLevels: Story = {
  render: () => (
    <View className="gap-4">
      <ConfidenceIndicator value={10} label="Very Low" />
      <ConfidenceIndicator value={30} label="Low" />
      <ConfidenceIndicator value={50} label="Medium" />
      <ConfidenceIndicator value={70} label="High" />
      <ConfidenceIndicator value={95} label="Very High" />
    </View>
  ),
};
