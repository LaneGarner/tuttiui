import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
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
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            This is the main content area of the card. You can put any content
            here.
          </p>
        </CardContent>
        <CardFooter>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">
            Action
          </button>
        </CardFooter>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>A card with no shadow, just a border.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            This variant is useful for less prominent card elements.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>
            A card with a stronger shadow for emphasis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            Use this variant when you want the card to stand out more.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const SimpleCard: Story = {
  render: () => (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-700">
          A simple card with just content, no header or footer.
        </p>
      </CardContent>
    </Card>
  ),
};
