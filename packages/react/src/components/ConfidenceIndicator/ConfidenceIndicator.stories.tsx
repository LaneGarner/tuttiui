import type { Meta, StoryObj } from "@storybook/react";
import { ConfidenceIndicator } from "./ConfidenceIndicator";

const meta: Meta<typeof ConfidenceIndicator> = {
  title: "AI/ConfidenceIndicator",
  component: ConfidenceIndicator,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfidenceIndicator>;

export const HighConfidence: Story = {
  args: {
    value: 92,
  },
};

export const MediumConfidence: Story = {
  args: {
    value: 55,
  },
};

export const LowConfidence: Story = {
  args: {
    value: 18,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ConfidenceIndicator value={75} size="sm" label="Small" />
      <ConfidenceIndicator value={75} size="md" label="Medium" />
      <ConfidenceIndicator value={75} size="lg" label="Large" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    value: 87,
    label: "Model Accuracy",
  },
};

export const WithoutPercentage: Story = {
  args: {
    value: 64,
    label: "Relevance",
    showPercentage: false,
  },
};
