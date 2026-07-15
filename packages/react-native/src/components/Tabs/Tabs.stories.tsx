import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "React Native/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Text className="text-gray-700">Manage your account settings here.</Text>
      </TabsContent>
      <TabsContent value="tab2">
        <Text className="text-gray-700">Change your password here.</Text>
      </TabsContent>
      <TabsContent value="tab3">
        <Text className="text-gray-700">Configure your application settings.</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text className="text-gray-700">Overview content goes here.</Text>
      </TabsContent>
      <TabsContent value="details">
        <Text className="text-gray-700">Detailed information displayed here.</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const SecondTabSelected: Story = {
  render: () => (
    <Tabs defaultValue="tab2">
      <TabsList>
        <TabsTrigger value="tab1">First</TabsTrigger>
        <TabsTrigger value="tab2">Second</TabsTrigger>
        <TabsTrigger value="tab3">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Text className="text-gray-700">First tab content.</Text>
      </TabsContent>
      <TabsContent value="tab2">
        <Text className="text-gray-700">Second tab content is shown by default.</Text>
      </TabsContent>
      <TabsContent value="tab3">
        <Text className="text-gray-700">Third tab content.</Text>
      </TabsContent>
    </Tabs>
  ),
};
