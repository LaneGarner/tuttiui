import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "React Native/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "elevated"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-gray-700">This is the card content area.</Text>
      </CardContent>
      <CardFooter>
        <Text className="text-sm text-gray-500">Card footer</Text>
      </CardFooter>
    </Card>
  ),
};

export const Outline: Story = {
  render: (args) => (
    <Card variant="outline" {...args}>
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>This card uses the outline variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-gray-700">Content with outline styling.</Text>
      </CardContent>
    </Card>
  ),
};

export const Elevated: Story = {
  render: (args) => (
    <Card variant="elevated" {...args}>
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has an elevated shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-gray-700">Content with elevated styling.</Text>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <Text className="text-gray-700">A simple card with content only.</Text>
      </CardContent>
    </Card>
  ),
};
