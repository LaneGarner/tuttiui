import { forwardRef } from "react";
import { View, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-tt-surface-3",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const barVariantClasses: Record<string, string> = {
  default: "bg-tt-primary",
  success: "bg-tt-success",
  warning: "bg-tt-warning",
  error: "bg-tt-danger",
};

export interface ProgressProps
  extends Omit<ViewProps, "accessibilityRole">,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
}

export const Progress = forwardRef<View, ProgressProps>(
  ({ className, size, variant = "default", value = 0, max = 100, ...props }, ref) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = (clampedValue / max) * 100;

    return (
      <View
        ref={ref}
        accessibilityRole="progressbar"
        accessibilityValue={{ now: clampedValue, min: 0, max }}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <View
          className={cn("h-full rounded-full", barVariantClasses[variant])}
          style={{ width: `${percentage}%` }}
          testID="progress-bar"
        />
      </View>
    );
  }
);

Progress.displayName = "Progress";

export { progressVariants };
