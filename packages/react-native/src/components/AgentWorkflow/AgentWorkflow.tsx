import { forwardRef } from "react";
import { View, Text, type ViewProps } from "react-native";
import { cn } from "@tutti-ui/shared";
import { AnimatedPulse } from "../../primitives";

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

export interface AgentWorkflowProps extends ViewProps {
  steps: WorkflowStep[];
}

const stateContainerClasses: Record<WorkflowState, string> = {
  pending: "bg-tt-surface-3",
  running: "bg-tt-info",
  streaming: "bg-tt-stream",
  completed: "bg-tt-success",
  failed: "bg-tt-danger",
  "needs-approval": "bg-tt-warning",
};

const stateTextClasses: Record<WorkflowState, string> = {
  pending: "text-tt-fg-subtle",
  running: "text-tt-info-fg",
  streaming: "text-tt-stream-fg",
  completed: "text-tt-success-fg",
  failed: "text-tt-danger-fg",
  "needs-approval": "text-tt-warning-fg",
};

const stateIcons: Record<WorkflowState, string> = {
  pending: "\u25CB",
  running: "\u25C9",
  streaming: "\u2248",
  completed: "\u2713",
  failed: "\u2715",
  "needs-approval": "!",
};

const StepIndicator = ({ state }: { state: WorkflowState }) => {
  const isPulsing = state === "running" || state === "streaming";

  const indicator = (
    <View
      className={cn(
        "h-8 w-8 rounded-full items-center justify-center",
        stateContainerClasses[state]
      )}
    >
      <Text
        className={cn(
          "text-sm font-bold",
          stateTextClasses[state]
        )}
      >
        {stateIcons[state]}
      </Text>
    </View>
  );

  if (isPulsing) {
    return <AnimatedPulse>{indicator}</AnimatedPulse>;
  }

  return indicator;
};

export const AgentWorkflow = forwardRef<View, AgentWorkflowProps>(
  ({ className, steps, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("flex-col", className)} {...props}>
        {steps.map((step, index) => (
          <View key={step.id}>
            <View className="flex-row items-start gap-3">
              <View testID={`step-indicator-${step.id}`}>
                <StepIndicator state={step.state} />
              </View>
              <View className="flex-1 min-w-0">
                <Text className="font-medium text-sm text-tt-fg">
                  {step.label}
                </Text>
                {step.description && (
                  <Text className="text-xs text-tt-fg-subtle">
                    {step.description}
                  </Text>
                )}
                {step.state === "running" && step.progress !== undefined && (
                  <View className="mt-1.5 h-1 bg-tt-surface-3 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-tt-info rounded-full"
                      style={{
                        width: `${Math.min(Math.max(step.progress, 0), 100)}%`,
                      }}
                      testID={`step-progress-${step.id}`}
                    />
                  </View>
                )}
              </View>
            </View>
            {index < steps.length - 1 && (
              <View
                className="ml-4 h-6 border-l-2 border-tt-border"
                style={{ borderLeftWidth: 2 }}
                testID="connector-line"
              />
            )}
          </View>
        ))}
      </View>
    );
  }
);

AgentWorkflow.displayName = "AgentWorkflow";
