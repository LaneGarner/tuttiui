import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette, type CommandItem } from "./CommandPalette";

const meta: Meta<typeof CommandPalette> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const sampleItems: CommandItem[] = [
  {
    id: "dashboard",
    label: "Go to Dashboard",
    category: "Navigation",
    shortcut: "Ctrl+D",
    onSelect: () => alert("Dashboard"),
  },
  {
    id: "new-file",
    label: "Create New File",
    category: "Actions",
    shortcut: "Ctrl+N",
    onSelect: () => alert("New File"),
  },
  {
    id: "settings",
    label: "Open Settings",
    category: "Navigation",
    shortcut: "Ctrl+,",
    onSelect: () => alert("Settings"),
  },
  {
    id: "search",
    label: "Search Files",
    category: "Actions",
    shortcut: "Ctrl+P",
    onSelect: () => alert("Search"),
  },
  {
    id: "theme",
    label: "Toggle Dark Mode",
    category: "Appearance",
    onSelect: () => alert("Theme toggled"),
  },
  {
    id: "logout",
    label: "Sign Out",
    category: "Account",
    onSelect: () => alert("Signed out"),
    disabled: true,
  },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <div className="space-y-2">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
            onClick={() => setOpen(true)}
          >
            Open Command Palette
          </button>
          <p className="text-sm text-gray-500">
            Or press Ctrl+K / Cmd+K
          </p>
        </div>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={sampleItems}
        />
      </>
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <button
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          Open Empty Palette
        </button>
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={[]}
          emptyMessage="No commands available."
        />
      </>
    );
  },
};
