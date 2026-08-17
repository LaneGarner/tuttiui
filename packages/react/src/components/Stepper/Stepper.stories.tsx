import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    return (
      <Stepper value={value} onChange={setValue} aria-label="Quantity" />
    );
  },
};

export const Bounded: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div className="flex flex-col gap-3">
        <Stepper
          value={value}
          min={0}
          max={5}
          onChange={setValue}
          aria-label="Bounded quantity"
        />
        <span className="text-sm text-tt-fg-muted">
          Buttons disable at min 0 and max 5
        </span>
      </div>
    );
  },
};

export const LongPress: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div className="flex flex-col gap-3">
        <Stepper
          value={value}
          min={0}
          max={500}
          longPressRepeat
          onChange={setValue}
          aria-label="Long-press quantity"
        />
        <span className="text-sm text-tt-fg-muted">
          Hold a button: repeat starts after 500ms and accelerates
        </span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = useState(1);
    const [md, setMd] = useState(1);
    return (
      <div className="flex items-center gap-4">
        <Stepper size="sm" value={sm} onChange={setSm} aria-label="Small stepper" />
        <Stepper size="md" value={md} onChange={setMd} aria-label="Medium stepper" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Stepper value={2} disabled onChange={() => {}} aria-label="Disabled stepper" />
  ),
};
