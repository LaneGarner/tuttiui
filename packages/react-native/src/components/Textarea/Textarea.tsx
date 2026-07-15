import { forwardRef, useState } from "react";
import { View, TextInput, type TextInputProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const textareaContainerVariants = cva(
  "min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2",
  {
    variants: {
      error: {
        true: "border-red-500",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

const textareaTextVariants = cva("flex-1 text-sm text-gray-900");

export interface TextareaProps
  extends Omit<TextInputProps, "editable" | "multiline">,
    Omit<VariantProps<typeof textareaContainerVariants>, "error"> {
  error?: boolean;
  disabled?: boolean;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className, error, disabled, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <View
        className={cn(
          textareaContainerVariants({ error }),
          focused && !error && "border-blue-500 border-2",
          error && focused && "border-red-500 border-2",
          disabled && "opacity-50",
          className
        )}
      >
        <TextInput
          ref={ref}
          className={cn(textareaTextVariants())}
          multiline
          textAlignVertical="top"
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

Textarea.displayName = "Textarea";

export { textareaContainerVariants, textareaTextVariants };
