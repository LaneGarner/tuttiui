import type { Meta, StoryObj } from "@storybook/react";
import { Stack, VStack, HStack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
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
    wrap: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
    {children}
  </div>
);

export const VStackDefault: Story = {
  render: () => (
    <VStack>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </VStack>
  ),
};

export const HStackDefault: Story = {
  render: () => (
    <HStack>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </HStack>
  ),
};

export const WithSpacing: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">spacing=&quot;xs&quot;</p>
        <HStack spacing="xs">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">spacing=&quot;sm&quot;</p>
        <HStack spacing="sm">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">spacing=&quot;md&quot;</p>
        <HStack spacing="md">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">spacing=&quot;lg&quot;</p>
        <HStack spacing="lg">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">spacing=&quot;xl&quot;</p>
        <HStack spacing="xl">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </HStack>
      </div>
    </div>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">align=&quot;start&quot;</p>
        <HStack align="start" className="h-24 rounded border border-gray-200 p-2">
          <Box>Short</Box>
          <Box>Taller item</Box>
          <Box>Short</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">align=&quot;center&quot;</p>
        <HStack align="center" className="h-24 rounded border border-gray-200 p-2">
          <Box>Short</Box>
          <Box>Taller item</Box>
          <Box>Short</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">align=&quot;end&quot;</p>
        <HStack align="end" className="h-24 rounded border border-gray-200 p-2">
          <Box>Short</Box>
          <Box>Taller item</Box>
          <Box>Short</Box>
        </HStack>
      </div>
    </div>
  ),
};

export const Nested: Story = {
  render: () => (
    <VStack spacing="lg">
      <HStack spacing="md">
        <Box>Row 1, Col 1</Box>
        <Box>Row 1, Col 2</Box>
        <Box>Row 1, Col 3</Box>
      </HStack>
      <HStack spacing="md">
        <Box>Row 2, Col 1</Box>
        <Box>Row 2, Col 2</Box>
      </HStack>
      <HStack spacing="md">
        <Box>Row 3, Col 1</Box>
        <Box>Row 3, Col 2</Box>
        <Box>Row 3, Col 3</Box>
        <Box>Row 3, Col 4</Box>
      </HStack>
    </VStack>
  ),
};
