import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-72">
      <CollapsibleTrigger>Show release notes</CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-2 text-sm text-tt-fg-muted">
          Version 1.4 adds dark mode, a rethemable semantic color layer, and a
          WCAG contrast harness that runs in a real browser.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-72">
      <CollapsibleTrigger>Hide advanced options</CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-2 text-sm text-tt-fg-muted">
          These options are visible on first render because the collapsible
          mounts with defaultOpen.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="w-72">
        <p className="mb-2 text-sm text-tt-fg-subtle">
          State: {open ? "open" : "closed"}
        </p>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger>
            {open ? "Collapse details" : "Expand details"}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="pt-2 text-sm text-tt-fg-muted">
              This collapsible is fully controlled by the parent via open and
              onOpenChange.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
