import type { Meta, StoryObj } from "@storybook/react";
import { AgentWorkflow } from "./AgentWorkflow";

const meta: Meta<typeof AgentWorkflow> = {
  title: "AI/AgentWorkflow",
  component: AgentWorkflow,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentWorkflow>;

export const Default: Story = {
  args: {
    steps: [
      {
        id: "1",
        label: "Fetch data",
        state: "completed",
        description: "Retrieved 1,204 records",
      },
      {
        id: "2",
        label: "Process results",
        state: "running",
        description: "Transforming dataset",
        progress: 63,
      },
      {
        id: "3",
        label: "Generate report",
        state: "pending",
        description: "Waiting for processing",
      },
    ],
  },
};

export const AllStates: Story = {
  args: {
    steps: [
      { id: "1", label: "Pending step", state: "pending" },
      {
        id: "2",
        label: "Running step",
        state: "running",
        progress: 50,
      },
      { id: "3", label: "Streaming step", state: "streaming" },
      { id: "4", label: "Completed step", state: "completed" },
      { id: "5", label: "Failed step", state: "failed" },
      {
        id: "6",
        label: "Needs approval step",
        state: "needs-approval",
      },
    ],
  },
};

export const CompletedWorkflow: Story = {
  args: {
    steps: [
      {
        id: "1",
        label: "Initialize",
        state: "completed",
        description: "Environment ready",
      },
      {
        id: "2",
        label: "Analyze",
        state: "completed",
        description: "Found 3 issues",
      },
      {
        id: "3",
        label: "Fix",
        state: "completed",
        description: "All issues resolved",
      },
      {
        id: "4",
        label: "Verify",
        state: "completed",
        description: "Tests passing",
      },
    ],
  },
};
