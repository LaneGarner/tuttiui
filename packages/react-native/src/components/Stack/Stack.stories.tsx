import type { Meta, StoryObj } from "@storybook/react";
import { View, Text } from "react-native";
import { Stack, VStack, HStack } from "./Stack";

const Swatch = ({ label }: { label: string }) => (
  <View className="h-10 w-20 items-center justify-center rounded bg-blue-100 border border-blue-300">
    <Text className="text-xs text-blue-800">{label}</Text>
  </View>
);

const meta: Meta<typeof Stack> = {
  title: "React Native/Stack",
  component: Stack,
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
    },
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <Swatch label="A" />
      <Swatch label="B" />
      <Swatch label="C" />
    </Stack>
  ),
};

export const Row: Story = {
  render: (args) => (
    <Stack direction="row" {...args}>
      <Swatch label="A" />
      <Swatch label="B" />
      <Swatch label="C" />
    </Stack>
  ),
};

export const SpacingXS: Story = {
  render: () => (
    <Stack spacing="xs">
      <Swatch label="xs" />
      <Swatch label="xs" />
      <Swatch label="xs" />
    </Stack>
  ),
};

export const SpacingXL: Story = {
  render: () => (
    <Stack spacing="xl">
      <Swatch label="xl" />
      <Swatch label="xl" />
      <Swatch label="xl" />
    </Stack>
  ),
};

export const VStackStory: Story = {
  name: "VStack",
  render: () => (
    <VStack spacing="md">
      <Swatch label="1" />
      <Swatch label="2" />
      <Swatch label="3" />
    </VStack>
  ),
};

export const HStackStory: Story = {
  name: "HStack",
  render: () => (
    <HStack spacing="md">
      <Swatch label="1" />
      <Swatch label="2" />
      <Swatch label="3" />
    </HStack>
  ),
};

export const CenterAligned: Story = {
  render: () => (
    <HStack spacing="md" align="center" justify="center">
      <Swatch label="A" />
      <Swatch label="B" />
      <Swatch label="C" />
    </HStack>
  ),
};
