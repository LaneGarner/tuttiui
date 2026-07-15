import { forwardRef } from "react";
import { View, Text, type ViewProps } from "react-native";
import { cn } from "@tutti-ui/shared";

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
  if (value < 30) return "bg-red-500";
  if (value < 60) return "bg-amber-500";
  return "bg-green-500";
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
              <Text className="font-medium text-sm text-gray-700">
                {label}
              </Text>
            )}
            {showPercentage && (
              <Text className="text-sm text-gray-500" testID="confidence-percentage">
                {clampedValue}%
              </Text>
            )}
          </View>
        )}
        <View
          className="rounded-full bg-gray-200 overflow-hidden"
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
