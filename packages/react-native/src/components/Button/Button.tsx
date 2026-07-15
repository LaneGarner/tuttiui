import { forwardRef } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";
import { AnimatedSpinner } from "../../primitives";

const buttonContainerVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-blue-600",
        secondary: "bg-gray-100",
        outline: "border border-gray-300 bg-transparent",
        ghost: "bg-transparent",
        danger: "bg-red-600",
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
      primary: "text-white",
      secondary: "text-gray-900",
      outline: "text-gray-700",
      ghost: "text-gray-700",
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
  outline: "#374151",
  ghost: "#374151",
  danger: "#ffffff",
};

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
