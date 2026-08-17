import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl, Segment } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Connected pill of mutually exclusive options with radiogroup semantics. Controlled only — pass `value` and `onChange`. Arrow keys move focus and select, matching native radio behavior.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("2x");
    return (
      <SegmentedControl value={value} onChange={setValue}>
        <Segment value="1x">1×</Segment>
        <Segment value="2x">2×</Segment>
        <Segment value="3x">3×</Segment>
      </SegmentedControl>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState("week");
    const [medium, setMedium] = useState("week");
    return (
      <div className="flex flex-col items-start gap-4">
        <SegmentedControl size="sm" value={small} onChange={setSmall}>
          <Segment value="day">Day</Segment>
          <Segment value="week">Week</Segment>
          <Segment value="month">Month</Segment>
        </SegmentedControl>
        <SegmentedControl size="md" value={medium} onChange={setMedium}>
          <Segment value="day">Day</Segment>
          <Segment value="week">Week</Segment>
          <Segment value="month">Month</Segment>
        </SegmentedControl>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("list");
    return (
      <div className="flex flex-col items-start gap-4">
        <SegmentedControl value={value} onChange={setValue} disabled>
          <Segment value="list">List</Segment>
          <Segment value="grid">Grid</Segment>
        </SegmentedControl>
        <SegmentedControl value={value} onChange={setValue}>
          <Segment value="list">List</Segment>
          <Segment value="grid">Grid</Segment>
          <Segment value="map" disabled>
            Map
          </Segment>
        </SegmentedControl>
      </div>
    );
  },
};
