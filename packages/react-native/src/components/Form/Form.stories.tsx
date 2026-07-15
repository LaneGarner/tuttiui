import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { FormField } from "./FormField";
import { FormError } from "./FormError";
import { FormHint } from "./FormHint";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";

const meta: Meta<typeof FormField> = {
  title: "React Native/Form",
  component: FormField,
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField id="email" name="email">
      <Label>Email</Label>
      <Input placeholder="you@example.com" />
      <FormHint>We will never share your email.</FormHint>
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField id="email" name="email" error="Email is required">
      <Label required>Email</Label>
      <Input placeholder="you@example.com" error />
      <FormError>Email is required</FormError>
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField id="name" name="name" required>
      <Label required>Full Name</Label>
      <Input placeholder="John Doe" />
      <FormHint>Enter your first and last name.</FormHint>
    </FormField>
  ),
};

export const MultipleFields: Story = {
  render: () => (
    <View className="gap-4">
      <FormField id="firstName" name="firstName">
        <Label>First Name</Label>
        <Input placeholder="John" />
      </FormField>
      <FormField id="lastName" name="lastName">
        <Label>Last Name</Label>
        <Input placeholder="Doe" />
      </FormField>
      <FormField id="email" name="email" error="Invalid email">
        <Label required>Email</Label>
        <Input placeholder="you@example.com" error />
        <FormError>Invalid email</FormError>
      </FormField>
    </View>
  ),
};
