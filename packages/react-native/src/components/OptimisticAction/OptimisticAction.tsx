import { forwardRef, useState, useCallback, useRef } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, useTheme } from "@tuttiui/shared";
import { AnimatedSpinner } from "../../primitives";

type ActionState = "idle" | "pending" | "confirmed" | "failed";

const optimisticActionContainerVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-tt-primary",
        secondary: "bg-tt-surface-2",
        danger: "bg-tt-danger-strong",
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
      primary: "text-tt-primary-fg",
      secondary: "text-tt-fg",
      danger: "text-tt-danger-fg",
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
    // Values that can't be a className read the resolved theme instead of a
    // hardcoded hex. ThemeContext defaults to lightColors, so a tree without a
    // ThemeProvider degrades to light rather than crashing.
    const { colors } = useTheme();
    const [state, setState] = useState<ActionState>("idle");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const variantKey = variant ?? "primary";
    const spinnerColors: Record<string, string> = {
      primary: colors.primaryFg,
      secondary: colors.fg,
      danger: colors.dangerFg,
    };

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
      confirmed: "bg-tt-success-strong",
      failed: "bg-tt-danger-strong",
    };

    const stateTextColor: Record<ActionState, string> = {
      idle: "",
      pending: "",
      confirmed: "text-tt-success-fg",
      failed: "text-tt-danger-fg",
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
