import { forwardRef } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, useTheme } from "@tutti-ui/shared";
import { AnimatedSpinner } from "../../primitives";

const buttonContainerVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-tt-primary",
        secondary: "bg-tt-surface-2",
        outline: "border border-tt-border-strong bg-transparent",
        ghost: "bg-transparent",
        danger: "bg-tt-danger-strong",
      },
      size: {
        sm: "h-8 px-3 gap-1.5",
        md: "h-10 px-4 gap-2",
        lg: "h-12 px-6 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const buttonTextVariants = cva("font-medium", {
  variants: {
    variant: {
      primary: "text-tt-primary-fg",
      secondary: "text-tt-fg",
      outline: "text-tt-fg-muted",
      ghost: "text-tt-fg-muted",
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

export interface ButtonProps
  extends Omit<PressableProps, "children">,
    VariantProps<typeof buttonContainerVariants> {
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<View, ButtonProps>(
  ({ className, variant = "primary", size, loading, disabled, children, ...props }, ref) => {
    const isDisabled = disabled || loading;
    const variantKey = variant ?? "primary";
    // Values that can't be a className read the resolved theme instead of a
// hardcoded hex. ThemeContext defaults to lightColors, so a tree without a
// ThemeProvider degrades to light rather than crashing.
    const { colors } = useTheme();
    const spinnerColors: Record<string, string> = {
      primary: colors.primaryFg,
      secondary: colors.fg,
      outline: colors.fgMuted,
      ghost: colors.fgMuted,
      danger: colors.dangerFg,
    };

    return (
      <Pressable
        ref={ref}
        className={cn(
          buttonContainerVariants({ variant, size }),
          isDisabled && "opacity-50",
          className
        )}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        {...props}
      >
        {loading && (
          <AnimatedSpinner
            size="sm"
            color={spinnerColors[variantKey]}
          />
        )}
        {typeof children === "string" ? (
          <Text className={cn(buttonTextVariants({ variant, size }))}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { buttonContainerVariants, buttonTextVariants };
