import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { RadioGroup } from "./RadioGroup";
import { RadioItem } from "./RadioItem";

const meta: Meta<typeof RadioGroup> = {
  title: "React Native/Radio",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup name="fruit" defaultValue="apple">
      <View className="flex-row items-center gap-2">
        <RadioItem value="apple" />
        <Text className="text-gray-900">Apple</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <RadioItem value="banana" />
        <Text className="text-gray-900">Banana</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <RadioItem value="cherry" />
        <Text className="text-gray-900">Cherry</Text>
      </View>
    </RadioGroup>
  ),
};

export const NoneSelected: Story = {
  render: () => (
    <RadioGroup name="color">
      <View className="flex-row items-center gap-2">
        <RadioItem value="red" />
        <Text className="text-gray-900">Red</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <RadioItem value="blue" />
        <Text className="text-gray-900">Blue</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <RadioItem value="green" />
        <Text className="text-gray-900">Green</Text>
      </View>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup name="disabled" defaultValue="a" disabled>
      <View className="flex-row items-center gap-2">
        <RadioItem value="a" />
        <Text className="text-gray-500">Option A</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <RadioItem value="b" />
        <Text className="text-gray-500">Option B</Text>
      </View>
    </RadioGroup>
  ),
};

export const SingleItemDisabled: Story = {
  render: () => (
    <RadioGroup name="partial" defaultValue="x">
      <View className="flex-row items-center gap-2">
        <RadioItem value="x" />
        <Text className="text-gray-900">Enabled</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <RadioItem value="y" disabled />
        <Text className="text-gray-500">Disabled</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <RadioItem value="z" />
        <Text className="text-gray-900">Enabled</Text>
      </View>
    </RadioGroup>
  ),
};
