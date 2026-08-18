import { forwardRef, type ReactNode } from "react";
import { Text, type TextProps } from "react-native";
import { cn } from "@tuttiui/shared";
import { useFormField } from "./FormField";

export interface FormHintProps extends TextProps {
  children: ReactNode;
}

export const FormHint = forwardRef<Text, FormHintProps>(
  ({ children, className, ...props }, ref) => {
    useFormField();

    return (
      <Text
        ref={ref}
        className={cn("text-sm text-tt-fg-subtle", className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

FormHint.displayName = "FormHint";
