import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://i.pravatar.cc/100" alt="User avatar" />
        <AvatarFallback>LG</AvatarFallback>
      </>
    ),
  },
};

export const WithFallback: Story = {
  args: {
    children: <AvatarFallback>LG</AvatarFallback>,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/100?u=sm" alt="Small" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <span className="text-xs text-gray-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar size="md">
          <AvatarImage src="https://i.pravatar.cc/100?u=md" alt="Medium" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <span className="text-xs text-gray-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar size="lg">
          <AvatarImage src="https://i.pravatar.cc/100?u=lg" alt="Large" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span className="text-xs text-gray-500">lg</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar size="xl">
          <AvatarImage src="https://i.pravatar.cc/100?u=xl" alt="Extra large" />
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
        <span className="text-xs text-gray-500">xl</span>
      </div>
    </div>
  ),
};

export const FallbackOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
    </div>
  ),
};
