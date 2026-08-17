import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TabBar, TabBarItem } from "./TabBar";

const meta: Meta<typeof TabBar> = {
  title: "Components/TabBar",
  component: TabBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TabBar>;

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ListIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 008.6 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 8.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const tabs = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "lists", label: "Lists", icon: <ListIcon /> },
  { id: "cart", label: "Cart", icon: <CartIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-96 w-80 overflow-hidden rounded-xl border border-tt-border bg-tt-bg">
    <div className="p-4 text-sm text-tt-fg-muted">App content</div>
    {children}
  </div>
);

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <PhoneFrame>
        <TabBar className="absolute">
          {tabs.map((tab) => (
            <TabBarItem
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              active={active === tab.id}
              onClick={() => setActive(tab.id)}
            />
          ))}
        </TabBar>
      </PhoneFrame>
    );
  },
};

export const SafeArea: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <PhoneFrame>
        <TabBar safeArea className="absolute">
          {tabs.map((tab) => (
            <TabBarItem
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              active={active === tab.id}
              onClick={() => setActive(tab.id)}
            />
          ))}
        </TabBar>
      </PhoneFrame>
    );
  },
};
