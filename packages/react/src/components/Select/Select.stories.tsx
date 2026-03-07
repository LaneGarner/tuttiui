import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const sampleOptions = (
  <>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry">Cherry</option>
    <option value="date">Date</option>
  </>
);

export const Default: Story = {
  args: {
    children: sampleOptions,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Select a fruit...",
    defaultValue: "",
    children: sampleOptions,
  },
};

export const WithError: Story = {
  args: {
    error: true,
    children: sampleOptions,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: sampleOptions,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Select size="sm">{sampleOptions}</Select>
      <Select size="md">{sampleOptions}</Select>
      <Select size="lg">{sampleOptions}</Select>
    </div>
  ),
};
