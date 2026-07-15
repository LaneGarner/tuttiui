import { createRef } from "react";
import { View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { AgentWorkflow, type WorkflowStep } from "./AgentWorkflow";

jest.mock("../../primitives", () => ({
  AnimatedPulse: ({ children, ...props }: any) => {
    const { View: MockView } = require("react-native");
    return <MockView testID="animated-pulse" {...props}>{children}</MockView>;
  },
}));

const sampleSteps: WorkflowStep[] = [
  { id: "1", label: "Analyze", state: "completed" },
  { id: "2", label: "Generate", state: "running", progress: 45 },
  { id: "3", label: "Review", state: "pending" },
];

describe("AgentWorkflow", () => {
  it("renders all steps", () => {
    render(<AgentWorkflow steps={sampleSteps} />);
    expect(screen.getByText("Analyze")).toBeTruthy();
    expect(screen.getByText("Generate")).toBeTruthy();
    expect(screen.getByText("Review")).toBeTruthy();
  });

  it("renders step descriptions when provided", () => {
    const steps: WorkflowStep[] = [
      { id: "1", label: "Step 1", state: "completed", description: "First step done" },
    ];
    render(<AgentWorkflow steps={steps} />);
    expect(screen.getByText("First step done")).toBeTruthy();
  });

  it("renders connector lines between steps", () => {
    render(<AgentWorkflow steps={sampleSteps} />);
    const connectors = screen.getAllByTestId("connector-line");
    expect(connectors.length).toBe(sampleSteps.length - 1);
  });

  it("does not render connector after last step", () => {
    const steps: WorkflowStep[] = [
      { id: "1", label: "Only step", state: "completed" },
    ];
    render(<AgentWorkflow steps={steps} />);
    expect(screen.queryAllByTestId("connector-line").length).toBe(0);
  });

  it("renders step indicators", () => {
    render(<AgentWorkflow steps={sampleSteps} />);
    expect(screen.getByTestId("step-indicator-1")).toBeTruthy();
    expect(screen.getByTestId("step-indicator-2")).toBeTruthy();
    expect(screen.getByTestId("step-indicator-3")).toBeTruthy();
  });

  it("shows progress bar for running step with progress", () => {
    render(<AgentWorkflow steps={sampleSteps} />);
    expect(screen.getByTestId("step-progress-2")).toBeTruthy();
  });

  it("does not show progress bar for non-running steps", () => {
    const steps: WorkflowStep[] = [
      { id: "1", label: "Done", state: "completed", progress: 100 },
    ];
    render(<AgentWorkflow steps={steps} />);
    expect(screen.queryByTestId("step-progress-1")).toBeNull();
  });

  it("does not show progress bar when progress is undefined", () => {
    const steps: WorkflowStep[] = [
      { id: "1", label: "Running", state: "running" },
    ];
    render(<AgentWorkflow steps={steps} />);
    expect(screen.queryByTestId("step-progress-1")).toBeNull();
  });

  it("renders state icons for each state", () => {
    const allStates: WorkflowStep[] = [
      { id: "1", label: "Pending", state: "pending" },
      { id: "2", label: "Running", state: "running" },
      { id: "3", label: "Streaming", state: "streaming" },
      { id: "4", label: "Completed", state: "completed" },
      { id: "5", label: "Failed", state: "failed" },
      { id: "6", label: "Needs Approval", state: "needs-approval" },
    ];
    render(<AgentWorkflow steps={allStates} />);

    expect(screen.getByText("\u25CB")).toBeTruthy(); // pending
    expect(screen.getByText("\u25C9")).toBeTruthy(); // running
    expect(screen.getByText("\u2248")).toBeTruthy(); // streaming
    expect(screen.getByText("\u2713")).toBeTruthy(); // completed
    expect(screen.getByText("\u2715")).toBeTruthy(); // failed
    expect(screen.getByText("!")).toBeTruthy();      // needs-approval
  });

  it("uses AnimatedPulse for running and streaming states", () => {
    const steps: WorkflowStep[] = [
      { id: "1", label: "Running", state: "running" },
      { id: "2", label: "Streaming", state: "streaming" },
    ];
    render(<AgentWorkflow steps={steps} />);
    const pulses = screen.getAllByTestId("animated-pulse");
    expect(pulses.length).toBe(2);
  });

  it("does not use AnimatedPulse for non-animated states", () => {
    const steps: WorkflowStep[] = [
      { id: "1", label: "Completed", state: "completed" },
      { id: "2", label: "Pending", state: "pending" },
    ];
    render(<AgentWorkflow steps={steps} />);
    expect(screen.queryAllByTestId("animated-pulse").length).toBe(0);
  });

  it("renders empty steps array", () => {
    render(<AgentWorkflow steps={[]} testID="workflow" />);
    expect(screen.getByTestId("workflow")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<AgentWorkflow ref={ref} steps={[]} />);
    expect(ref.current).toBeTruthy();
  });
});
