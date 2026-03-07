import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AgentWorkflow, type WorkflowStep } from "./AgentWorkflow";

const makeSteps = (
  overrides?: Partial<WorkflowStep>[]
): WorkflowStep[] => {
  const defaults: WorkflowStep[] = [
    { id: "1", label: "Step 1", state: "completed" },
    { id: "2", label: "Step 2", state: "running", progress: 45 },
    { id: "3", label: "Step 3", state: "pending" },
  ];
  if (!overrides) return defaults;
  return overrides.map((o, i) => ({
    ...defaults[i % defaults.length],
    id: String(i + 1),
    ...o,
  }));
};

describe("AgentWorkflow", () => {
  it("renders all steps", () => {
    const steps = makeSteps();
    render(<AgentWorkflow steps={steps} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("renders step labels and descriptions", () => {
    const steps = makeSteps([
      {
        id: "1",
        label: "Analyze",
        state: "completed",
        description: "Analyzing input data",
      },
    ]);
    render(<AgentWorkflow steps={steps} />);
    expect(screen.getByText("Analyze")).toBeInTheDocument();
    expect(screen.getByText("Analyzing input data")).toBeInTheDocument();
  });

  it("applies pending state classes", () => {
    const steps = makeSteps([{ id: "1", label: "Pending", state: "pending" }]);
    render(<AgentWorkflow steps={steps} />);
    const indicator = screen.getByTestId("step-indicator-1");
    expect(indicator).toHaveClass("bg-gray-200");
    expect(indicator).toHaveClass("text-gray-500");
  });

  it("applies running state with animate-pulse", () => {
    const steps = makeSteps([{ id: "1", label: "Running", state: "running" }]);
    render(<AgentWorkflow steps={steps} />);
    const indicator = screen.getByTestId("step-indicator-1");
    expect(indicator).toHaveClass("bg-blue-500");
    expect(indicator).toHaveClass("animate-pulse");
  });

  it("shows correct icon for completed state", () => {
    const steps = makeSteps([
      { id: "1", label: "Done", state: "completed" },
    ]);
    render(<AgentWorkflow steps={steps} />);
    const indicator = screen.getByTestId("step-indicator-1");
    expect(indicator).toHaveTextContent("\u2713");
  });

  it("shows correct icon for failed state", () => {
    const steps = makeSteps([
      { id: "1", label: "Failed", state: "failed" },
    ]);
    render(<AgentWorkflow steps={steps} />);
    const indicator = screen.getByTestId("step-indicator-1");
    expect(indicator).toHaveTextContent("\u2715");
  });

  it("renders needs-approval state", () => {
    const steps = makeSteps([
      { id: "1", label: "Approve", state: "needs-approval" },
    ]);
    render(<AgentWorkflow steps={steps} />);
    const indicator = screen.getByTestId("step-indicator-1");
    expect(indicator).toHaveClass("bg-amber-500");
    expect(indicator).toHaveTextContent("!");
  });

  it("shows progress bar when running with progress", () => {
    const steps = makeSteps([
      { id: "1", label: "Loading", state: "running", progress: 60 },
    ]);
    render(<AgentWorkflow steps={steps} />);
    expect(screen.getByTestId("step-progress-1")).toBeInTheDocument();
  });

  it("progress bar width matches value", () => {
    const steps = makeSteps([
      { id: "1", label: "Loading", state: "running", progress: 72 },
    ]);
    render(<AgentWorkflow steps={steps} />);
    const bar = screen.getByTestId("step-progress-1");
    expect(bar).toHaveStyle({ width: "72%" });
  });

  it("renders connector lines between steps but not after last", () => {
    const steps = makeSteps();
    render(<AgentWorkflow steps={steps} />);
    const connectors = screen.getAllByTestId("connector-line");
    expect(connectors).toHaveLength(steps.length - 1);
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<AgentWorkflow ref={ref} steps={[]} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <AgentWorkflow ref={ref} steps={[]} className="my-custom-class" />
    );
    expect(ref.current).toHaveClass("my-custom-class");
  });
});
