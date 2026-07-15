import { forwardRef } from "react";
import { View, Text, Pressable, type ViewProps, type TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const alertVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-gray-50 border-gray-200",
      info: "bg-blue-50 border-blue-200",
      success: "bg-green-50 border-green-200",
      warning: "bg-amber-50 border-amber-200",
      error: "bg-red-50 border-red-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertTextVariants: Record<string, string> = {
  default: "text-gray-800",
  info: "text-blue-800",
  success: "text-green-800",
  warning: "text-amber-800",
  error: "text-red-800",
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
