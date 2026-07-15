import { forwardRef } from "react";
import { View, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-gray-200",
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
  default: "bg-blue-600",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
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
