import { forwardRef, type ReactNode } from "react";
import { View, Text, Pressable, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const toastVariants = cva(
  "flex w-full flex-row items-start gap-3 rounded-lg border p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-tt-surface border-tt-border",
        success: "bg-tt-success-subtle border-tt-success-border",
        error: "bg-tt-danger-subtle border-tt-danger-border",
        warning: "bg-tt-warning-subtle border-tt-warning-border",
        info: "bg-tt-primary-subtle border-tt-info-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toastTextVariants: Record<string, string> = {
  default: "text-tt-fg",
  success: "text-tt-success-on-subtle",
  error: "text-tt-danger-on-subtle",
  warning: "text-tt-warning-on-subtle",
  info: "text-tt-info-on-subtle",
};

export interface ToastProps
  extends Omit<ViewProps, "children">,
    VariantProps<typeof toastVariants> {
  title?: ReactNode;
  description?: ReactNode;
  onDismiss?: () => void;
  children?: ReactNode;
}

export const Toast = forwardRef<View, ToastProps>(
  ({ className, variant = "default", title, description, onDismiss, children, ...props }, ref) => {
    const textColor = toastTextVariants[variant ?? "default"];

    return (
      <View
        ref={ref}
        accessibilityRole="summary"
        accessibilityLiveRegion="polite"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <View className="flex-1">
          {title && typeof title === "string" ? (
            <Text className={cn("text-sm font-semibold", textColor)}>{title}</Text>
          ) : (
            title
          )}
          {description && typeof description === "string" ? (
            <Text className={cn("text-sm opacity-90", textColor)}>{description}</Text>
          ) : (
            description
          )}
          {children}
        </View>
        {onDismiss && (
          <Pressable
            onPress={onDismiss}
            accessibilityLabel="Dismiss"
            accessibilityRole="button"
            className="shrink-0 rounded-sm opacity-70"
          >
            <Text className={cn("text-base", textColor)}>{"\u2715"}</Text>
          </Pressable>
        )}
      </View>
    );
  }
);

Toast.displayName = "Toast";

export { toastVariants };
