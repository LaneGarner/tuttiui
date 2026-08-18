import { forwardRef } from "react";
import { Text, type TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const labelVariants = cva("text-sm font-medium text-tt-fg-muted");

export interface LabelProps extends TextProps, VariantProps<typeof labelVariants> {
  required?: boolean;
}

export const Label = forwardRef<Text, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(labelVariants(), className)}
        accessibilityRole="text"
        {...props}
      >
        {children}
        {required && (
          <Text className="text-tt-danger ml-1" aria-hidden>
            *
          </Text>
        )}
      </Text>
    );
  }
);

Label.displayName = "Label";

export { labelVariants };
