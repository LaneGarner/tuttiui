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
  pending: "bg-gray-200",
  running: "bg-blue-500",
  streaming: "bg-cyan-500",
  completed: "bg-green-500",
  failed: "bg-red-500",
  "needs-approval": "bg-amber-500",
};

const stateTextClasses: Record<WorkflowState, string> = {
  pending: "text-gray-500",
  running: "text-white",
  streaming: "text-white",
  completed: "text-white",
  failed: "text-white",
  "needs-approval": "text-white",
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
                <Text className="font-medium text-sm text-gray-900">
                  {step.label}
                </Text>
                {step.description && (
                  <Text className="text-xs text-gray-500">
                    {step.description}
                  </Text>
                )}
                {step.state === "running" && step.progress !== undefined && (
                  <View className="mt-1.5 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-blue-500 rounded-full"
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
                className="ml-4 h-6"
                style={{ borderLeftWidth: 2, borderLeftColor: "#e5e7eb" }}
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
