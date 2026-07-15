import { forwardRef, useState, useCallback, useRef } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";
import { AnimatedSpinner } from "../../primitives";

type ActionState = "idle" | "pending" | "confirmed" | "failed";

const optimisticActionContainerVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-blue-600",
        secondary: "bg-gray-100",
        danger: "bg-red-600",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const optimisticActionTextVariants = cva("font-medium", {
  variants: {
    variant: {
      primary: "text-white",
      secondary: "text-gray-900",
      danger: "text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const spinnerColors: Record<string, string> = {
  primary: "#ffffff",
  secondary: "#111827",
  danger: "#ffffff",
};

export interface OptimisticActionProps
  extends Omit<PressableProps, "onPress" | "children">,
    VariantProps<typeof optimisticActionContainerVariants> {
  onAction: () => Promise<void>;
  confirmLabel?: string;
  pendingLabel?: string;
  failedLabel?: string;
  resetDelay?: number;
  children?: React.ReactNode;
}

export const OptimisticAction = forwardRef<View, OptimisticActionProps>(
  (
    {
      className,
      variant = "primary",
      size,
      onAction,
      confirmLabel = "Done",
      pendingLabel = "Processing...",
      failedLabel = "Failed",
      resetDelay = 2000,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [state, setState] = useState<ActionState>("idle");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const variantKey = variant ?? "primary";

    const handlePress = useCallback(async () => {
      if (state !== "idle") return;

      setState("pending");
      try {
        await onAction();
        setState("confirmed");
      } catch {
        setState("failed");
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setState("idle");
      }, resetDelay);
    }, [state, onAction, resetDelay]);

    const stateContainerOverrides: Record<ActionState, string> = {
      idle: "",
      pending: "",
      confirmed: "bg-green-600",
      failed: "bg-red-600",
    };

    const stateTextColor: Record<ActionState, string> = {
      idle: "",
      pending: "",
      confirmed: "text-white",
      failed: "text-white",
    };

    const isDisabled = disabled || state === "pending";

    return (
      <Pressable
        ref={ref}
        className={cn(
          optimisticActionContainerVariants({ variant, size }),
          stateContainerOverrides[state],
          isDisabled && "opacity-50",
          className
        )}
        disabled={isDisabled}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: state === "pending" }}
        {...props}
      >
        {state === "pending" && (
          <>
            <AnimatedSpinner size="sm" color={spinnerColors[variantKey]} />
            <Text
              className={cn(
                optimisticActionTextVariants({ variant, size })
              )}
            >
              {pendingLabel}
            </Text>
          </>
        )}
        {state === "confirmed" && (
          <>
            <Text className={cn(stateTextColor[state])}>
              {"\u2713"}
            </Text>
            <Text
              className={cn(
                optimisticActionTextVariants({ variant, size }),
                stateTextColor[state]
              )}
            >
              {confirmLabel}
            </Text>
          </>
        )}
        {state === "failed" && (
          <>
            <Text className={cn(stateTextColor[state])}>
              {"\u2715"}
            </Text>
            <Text
              className={cn(
                optimisticActionTextVariants({ variant, size }),
                stateTextColor[state]
              )}
            >
              {failedLabel}
            </Text>
          </>
        )}
        {state === "idle" && (
          typeof children === "string" ? (
            <Text
              className={cn(
                optimisticActionTextVariants({ variant, size })
              )}
            >
              {children}
            </Text>
          ) : (
            children
          )
        )}
      </Pressable>
    );
  }
);

OptimisticAction.displayName = "OptimisticAction";

export { optimisticActionContainerVariants, optimisticActionTextVariants };
