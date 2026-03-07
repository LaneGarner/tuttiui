import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-gray-700">
          Manage your account settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-gray-700">
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="text-sm text-gray-700">
          Configure how you receive notifications.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return (
      <div>
        <p className="mb-2 text-sm text-gray-500">Active tab: {value}</p>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">First</TabsTrigger>
            <TabsTrigger value="tab2">Second</TabsTrigger>
            <TabsTrigger value="tab3">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p className="text-sm text-gray-700">First tab content.</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="text-sm text-gray-700">Second tab content.</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p className="text-sm text-gray-700">Third tab content.</p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
        <TabsTrigger value="tab4">Settings</TabsTrigger>
        <TabsTrigger value="tab5">Integrations</TabsTrigger>
        <TabsTrigger value="tab6">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-gray-700">Overview dashboard content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-gray-700">Analytics and metrics.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-gray-700">Generated reports.</p>
      </TabsContent>
      <TabsContent value="tab4">
        <p className="text-sm text-gray-700">Application settings.</p>
      </TabsContent>
      <TabsContent value="tab5">
        <p className="text-sm text-gray-700">Third-party integrations.</p>
      </TabsContent>
      <TabsContent value="tab6">
        <p className="text-sm text-gray-700">Billing and subscription.</p>
      </TabsContent>
    </Tabs>
  ),
};
