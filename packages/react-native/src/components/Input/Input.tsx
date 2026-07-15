import { forwardRef, useState } from "react";
import { View, TextInput, type TextInputProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const inputContainerVariants = cva(
  "rounded-md border border-gray-300 bg-white",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const inputTextVariants = cva("flex-1 text-gray-900", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface InputProps
  extends Omit<TextInputProps, "editable">,
    VariantProps<typeof inputContainerVariants> {
  error?: boolean;
  disabled?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ className, size, error, disabled, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <View
        className={cn(
          inputContainerVariants({ size }),
          "justify-center",
          focused && !error && "border-blue-500 border-2",
          error && "border-red-500",
          error && focused && "border-red-500 border-2",
          disabled && "opacity-50",
          className
        )}
      >
        <TextInput
          ref={ref}
          className={cn(inputTextVariants({ size }))}
          editable={!disabled}
          placeholderTextColor="#9ca3af"
          accessibilityRole="text"
          accessibilityState={{ disabled }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = "Input";

export { inputContainerVariants, inputTextVariants };
