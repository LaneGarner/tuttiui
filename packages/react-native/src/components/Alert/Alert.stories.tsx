import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "React Native/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>This is a default alert message.</AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  render: (args) => (
    <Alert variant="info" {...args}>
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>This is an informational alert.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: (args) => (
    <Alert variant="success" {...args}>
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: (args) => (
    <Alert variant="warning" {...args}>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Please review your input before proceeding.</AlertDescription>
    </Alert>
  ),
};

export const Error: Story = {
  render: (args) => (
    <Alert variant="error" {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  ),
};

export const WithDismiss: Story = {
  render: (args) => (
    <Alert variant="info" onDismiss={() => {}} {...args}>
      <AlertTitle>Dismissible</AlertTitle>
      <AlertDescription>This alert can be dismissed.</AlertDescription>
    </Alert>
  ),
};
