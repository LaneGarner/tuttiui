import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { FormError } from "./FormError";
import { FormHint } from "./FormHint";

const meta: Meta<typeof FormField> = {
  title: "Components/Form",
  component: FormField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const BasicField: Story = {
  render: () => (
    <FormField id="username">
      <label htmlFor="username" className="text-sm font-medium text-gray-700">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Enter your username"
        className="flex w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField id="email" error="Please enter a valid email address" required>
      <label htmlFor="email" className="text-sm font-medium text-gray-700">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        aria-describedby="email-error"
        className="flex w-full h-10 rounded-md border border-red-500 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      />
      <FormError>Please enter a valid email address</FormError>
    </FormField>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormField id="password">
      <label htmlFor="password" className="text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        aria-describedby="password-hint"
        className="flex w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      />
      <FormHint>Must be at least 8 characters long</FormHint>
    </FormField>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <form className="flex flex-col gap-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
      <FormField id="full-name" required name="fullName">
        <label htmlFor="full-name" className="text-sm font-medium text-gray-700">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="full-name"
          type="text"
          placeholder="Jane Doe"
          className="flex w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
      </FormField>

      <FormField id="form-email" error="Email is required" required name="email">
        <label htmlFor="form-email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="form-email"
          type="email"
          placeholder="you@example.com"
          aria-describedby="form-email-error"
          className="flex w-full h-10 rounded-md border border-red-500 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        />
        <FormError>Email is required</FormError>
      </FormField>

      <FormField id="form-password" name="password">
        <label htmlFor="form-password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="form-password"
          type="password"
          placeholder="Enter your password"
          aria-describedby="form-password-hint"
          className="flex w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        <FormHint>Must be at least 8 characters with one number</FormHint>
      </FormField>

      <button
        type="submit"
        className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Create Account
      </button>
    </form>
  ),
};
