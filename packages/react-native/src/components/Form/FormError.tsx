import { forwardRef, type ReactNode } from "react";
import { Text, type TextProps } from "react-native";
import { cn } from "@tutti-ui/shared";
import { useFormField } from "./FormField";

export interface FormErrorProps extends TextProps {
  children: ReactNode;
}

export const FormError = forwardRef<Text, FormErrorProps>(
  ({ children, className, ...props }, ref) => {
    useFormField();

    if (!children) {
      return null;
    }

    return (
      <Text
        ref={ref}
        accessibilityRole="alert"
        className={cn("text-sm font-medium text-tt-danger", className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

FormError.displayName = "FormError";
