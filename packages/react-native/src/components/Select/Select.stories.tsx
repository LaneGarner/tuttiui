import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "React Native/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Dragonfruit", value: "dragonfruit", disabled: true },
];

export const Default: Story = {
  render: () => (
    <View className="max-w-md">
      <Select options={fruits} placeholder="Pick a fruit" label="Fruit" />
    </View>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <View className="max-w-md">
      <Select options={fruits} defaultValue="banana" label="Fruit" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View className="max-w-md gap-3">
      <Select options={fruits} size="sm" placeholder="Small" />
      <Select options={fruits} size="md" placeholder="Medium" />
      <Select options={fruits} size="lg" placeholder="Large" />
    </View>
  ),
};

export const WithError: Story = {
  render: () => (
    <View className="max-w-md">
      <Select options={fruits} placeholder="Pick a fruit" error />
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View className="max-w-md">
      <Select options={fruits} placeholder="Pick a fruit" disabled />
    </View>
  ),
};
