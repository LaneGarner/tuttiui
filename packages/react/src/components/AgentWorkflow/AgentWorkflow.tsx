import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@tutti-ui/shared";

export type WorkflowState =
  | "pending"
  | "running"
  | "streaming"
  | "completed"
  | "failed"
  | "needs-approval";

export interface WorkflowStep {
  id: string;
  label: string;
  state: WorkflowState;
  description?: string;
  progress?: number;
}

export interface AgentWorkflowProps extends HTMLAttributes<HTMLDivElement> {
  steps: WorkflowStep[];
}

const stateClasses: Record<WorkflowState, string> = {
  pending: "bg-gray-200 text-gray-500",
  running: "bg-blue-500 text-white animate-pulse",
  streaming: "bg-cyan-500 text-white animate-pulse",
  completed: "bg-green-500 text-white",
  failed: "bg-red-500 text-white",
  "needs-approval": "bg-amber-500 text-white",
};

const stateIcons: Record<WorkflowState, string> = {
  pending: "\u25CB",
  running: "\u25C9",
  streaming: "\u2248",
  completed: "\u2713",
  failed: "\u2715",
  "needs-approval": "!",
};

export const AgentWorkflow = forwardRef<HTMLDivElement, AgentWorkflowProps>(
  ({ className, steps, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        {steps.map((step, index) => (
          <div key={step.id}>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                  stateClasses[step.state]
                )}
                data-testid={`step-indicator-${step.id}`}
              >
                {stateIcons[step.state]}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm">{step.label}</h3>
                {step.description && (
                  <p className="text-xs text-gray-500">{step.description}</p>
                )}
                {step.state === "running" && step.progress !== undefined && (
                  <div className="mt-1.5 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(Math.max(step.progress, 0), 100)}%` }}
                      data-testid={`step-progress-${step.id}`}
                    />
                  </div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-4 h-6 border-l-2 border-gray-200" data-testid="connector-line" />
            )}
          </div>
        ))}
      </div>
    );
  }
);

AgentWorkflow.displayName = "AgentWorkflow";
