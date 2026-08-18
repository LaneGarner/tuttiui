import { forwardRef } from "react";
import { View, Text, Pressable, type ViewProps, type TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const alertVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-tt-canvas border-tt-border",
      info: "bg-tt-primary-subtle border-tt-info-border",
      success: "bg-tt-success-subtle border-tt-success-border",
      warning: "bg-tt-warning-subtle border-tt-warning-border",
      error: "bg-tt-danger-subtle border-tt-danger-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertTextVariants: Record<string, string> = {
  default: "text-tt-fg-strong",
  info: "text-tt-info-on-subtle",
  success: "text-tt-success-on-subtle",
  warning: "text-tt-warning-on-subtle",
  error: "text-tt-danger-on-subtle",
};

export interface AlertProps
  extends ViewProps,
    VariantProps<typeof alertVariants> {
  onDismiss?: () => void;
}

const Alert = forwardRef<View, AlertProps>(
  ({ className, variant = "default", onDismiss, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        accessibilityRole="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {children}
        {onDismiss && (
          <Pressable
            onPress={onDismiss}
            accessibilityLabel="Dismiss"
            accessibilityRole="button"
            className="absolute right-2 top-2 rounded-md p-1 opacity-70"
          >
            <Text className={cn("text-base", alertTextVariants[variant ?? "default"])}>
              {"\u2715"}
            </Text>
          </Pressable>
        )}
      </View>
    );
  }
);

Alert.displayName = "Alert";

export interface AlertTitleProps extends TextProps {
  variant?: string;
}

const AlertTitle = forwardRef<Text, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-tight", className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps extends TextProps {}

const AlertDescription = forwardRef<Text, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-sm opacity-90", className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
