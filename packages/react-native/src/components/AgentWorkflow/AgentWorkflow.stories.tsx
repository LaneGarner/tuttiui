import type { Meta, StoryObj } from "@storybook/react";
import { AgentWorkflow, type WorkflowStep } from "./AgentWorkflow";

const completedWorkflow: WorkflowStep[] = [
  { id: "1", label: "Gather requirements", state: "completed", description: "Collected user inputs" },
  { id: "2", label: "Analyze data", state: "completed", description: "Processed 1,200 records" },
  { id: "3", label: "Generate report", state: "completed", description: "Report ready" },
];

const inProgressWorkflow: WorkflowStep[] = [
  { id: "1", label: "Initialize", state: "completed" },
  { id: "2", label: "Fetch data", state: "completed", description: "Downloaded 500 records" },
  { id: "3", label: "Processing", state: "running", description: "Analyzing results...", progress: 65 },
  { id: "4", label: "Generate output", state: "pending" },
  { id: "5", label: "Review", state: "pending" },
];

const mixedStateWorkflow: WorkflowStep[] = [
  { id: "1", label: "Parse input", state: "completed" },
  { id: "2", label: "Validate schema", state: "completed" },
  { id: "3", label: "Transform data", state: "failed", description: "Schema mismatch error" },
  { id: "4", label: "Write output", state: "pending" },
];

const approvalWorkflow: WorkflowStep[] = [
  { id: "1", label: "Draft email", state: "completed" },
  { id: "2", label: "Review content", state: "needs-approval", description: "Awaiting user approval" },
  { id: "3", label: "Send email", state: "pending" },
];

const streamingWorkflow: WorkflowStep[] = [
  { id: "1", label: "Connect to API", state: "completed" },
  { id: "2", label: "Stream response", state: "streaming", description: "Receiving tokens..." },
  { id: "3", label: "Format output", state: "pending" },
];

const meta: Meta<typeof AgentWorkflow> = {
  title: "React Native/AgentWorkflow",
  component: AgentWorkflow,
};

export default meta;
type Story = StoryObj<typeof AgentWorkflow>;

export const InProgress: Story = {
  args: { steps: inProgressWorkflow },
};

export const AllCompleted: Story = {
  args: { steps: completedWorkflow },
};

export const WithFailure: Story = {
  args: { steps: mixedStateWorkflow },
};

export const NeedsApproval: Story = {
  args: { steps: approvalWorkflow },
};

export const Streaming: Story = {
  args: { steps: streamingWorkflow },
};

export const AllStates: Story = {
  args: {
    steps: [
      { id: "1", label: "Pending step", state: "pending" },
      { id: "2", label: "Running step", state: "running", progress: 40 },
      { id: "3", label: "Streaming step", state: "streaming", description: "Receiving data..." },
      { id: "4", label: "Completed step", state: "completed" },
      { id: "5", label: "Failed step", state: "failed", description: "An error occurred" },
      { id: "6", label: "Needs approval", state: "needs-approval", description: "Awaiting review" },
    ],
  },
};
