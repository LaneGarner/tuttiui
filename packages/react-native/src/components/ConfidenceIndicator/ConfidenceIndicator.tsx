import { forwardRef } from "react";
import { View, Text, type ViewProps } from "react-native";
import { cn } from "@tuttiui/shared";

export interface ConfidenceIndicatorProps extends ViewProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<"sm" | "md" | "lg", { height: number; width: number }> = {
  sm: { height: 6, width: 96 },
  md: { height: 8, width: 160 },
  lg: { height: 12, width: 256 },
};

function getBarColorClass(value: number): string {
  if (value < 30) return "bg-tt-danger";
  if (value < 60) return "bg-tt-warning";
  return "bg-tt-success";
}

export const ConfidenceIndicator = forwardRef<View, ConfidenceIndicatorProps>(
  (
    {
      className,
      value,
      label,
      showPercentage = true,
      size = "md",
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const dimensions = sizeStyles[size];

    return (
      <View
        ref={ref}
        className={cn("flex-col", className)}
        accessibilityRole="none"
        accessibilityLabel={label ?? `Confidence: ${clampedValue}%`}
        accessibilityValue={{
          now: clampedValue,
          min: 0,
          max: 100,
        }}
        {...props}
      >
        {(label || showPercentage) && (
          <View className="flex-row items-center justify-between mb-1">
            {label && (
              <Text className="font-medium text-sm text-tt-fg-muted">
                {label}
              </Text>
            )}
            {showPercentage && (
              <Text className="text-sm text-tt-fg-subtle" testID="confidence-percentage">
                {clampedValue}%
              </Text>
            )}
          </View>
        )}
        <View
          className="rounded-full bg-tt-surface-3 overflow-hidden"
          style={{ height: dimensions.height, width: dimensions.width }}
        >
          <View
            className={cn(
              "h-full rounded-full",
              getBarColorClass(clampedValue)
            )}
            style={{ width: `${clampedValue}%` }}
            testID="confidence-bar"
          />
        </View>
      </View>
    );
  }
);

ConfidenceIndicator.displayName = "ConfidenceIndicator";
