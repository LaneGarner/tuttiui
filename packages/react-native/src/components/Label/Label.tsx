import { forwardRef } from "react";
import { Text, type TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const labelVariants = cva("text-sm font-medium text-gray-700");

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
          <Text className="text-red-500 ml-1" aria-hidden>
            *
          </Text>
        )}
      </Text>
    );
  }
);

Label.displayName = "Label";

export { labelVariants };
