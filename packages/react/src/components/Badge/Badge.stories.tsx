import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pill-shaped inline status label. `info` marks informational states such as merged or overridden values — nothing is wrong and no action is required. `warning` is reserved strictly for states that need a decision from the user; if no decision is pending, use `info` or `default` instead.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

export const StatusSemantics: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`info` reads as informational — merges and overrides that need no action. `warning` means the user has a pending decision to make, and nothing else.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="info">Merged from list</Badge>
      <Badge variant="info">Override applied</Badge>
      <Badge variant="warning">Needs your decision</Badge>
    </div>
  ),
};
