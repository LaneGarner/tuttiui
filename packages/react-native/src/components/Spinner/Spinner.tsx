import { forwardRef } from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "@tuttiui/shared";
import { AnimatedSpinner } from "../../primitives";

export interface SpinnerProps extends ViewProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
}

export const Spinner = forwardRef<View, SpinnerProps>(
  ({ className, size = "md", color, label = "Loading", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("items-center justify-center", className)}
        accessibilityRole="progressbar"
        accessibilityLabel={label}
        accessibilityState={{ busy: true }}
        {...props}
      >
        <AnimatedSpinner size={size} color={color} />
      </View>
    );
  }
);

Spinner.displayName = "Spinner";
