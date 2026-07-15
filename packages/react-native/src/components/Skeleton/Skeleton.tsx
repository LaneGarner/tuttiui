import { forwardRef } from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "@tutti-ui/shared";
import { AnimatedPulse } from "../../primitives";

export interface SkeletonProps extends ViewProps {
  duration?: number;
}

export const Skeleton = forwardRef<View, SkeletonProps>(
  ({ className, duration, ...props }, ref) => {
    return (
      <AnimatedPulse duration={duration}>
        <View
          ref={ref}
          className={cn("rounded-md bg-gray-200", className)}
          {...props}
        />
      </AnimatedPulse>
    );
  }
);

Skeleton.displayName = "Skeleton";
