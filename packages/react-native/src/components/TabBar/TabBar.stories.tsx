import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TabBar, TabBarItem } from "./TabBar";

const meta: Meta<typeof TabBar> = {
  title: "React Native/TabBar",
  component: TabBar,
};

export default meta;
type Story = StoryObj<typeof TabBar>;

const tabs = ["Home", "Lists", "Cart", "Settings"];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("Home");
    return (
      <TabBar>
        {tabs.map((tab) => (
          <TabBarItem
            key={tab}
            label={tab}
            active={active === tab}
            onPress={() => setActive(tab)}
          />
        ))}
      </TabBar>
    );
  },
};

export const WithBottomInset: Story = {
  render: () => {
    const [active, setActive] = useState("Home");
    return (
      <TabBar bottomInset={24}>
        {tabs.map((tab) => (
          <TabBarItem
            key={tab}
            label={tab}
            active={active === tab}
            onPress={() => setActive(tab)}
          />
        ))}
      </TabBar>
    );
  },
};
