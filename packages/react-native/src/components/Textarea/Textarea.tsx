import { forwardRef, useState } from "react";
import { View, TextInput, type TextInputProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, useTheme } from "@tutti-ui/shared";

const textareaContainerVariants = cva(
  "min-h-[80px] w-full rounded-md border border-tt-border-strong bg-tt-field px-3 py-2",
  {
    variants: {
      error: {
        true: "border-tt-danger",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

const textareaTextVariants = cva("flex-1 text-sm text-tt-fg");

export interface TextareaProps
  extends Omit<TextInputProps, "editable" | "multiline">,
    Omit<VariantProps<typeof textareaContainerVariants>, "error"> {
  error?: boolean;
  disabled?: boolean;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className, error, disabled, onFocus, onBlur, ...props }, ref) => {
    // Values that can't be a className read the resolved theme instead of a
    // hardcoded hex. ThemeContext defaults to lightColors, so a tree without a
    // ThemeProvider degrades to light rather than crashing.
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);

    return (
      <View
        className={cn(
          textareaContainerVariants({ error }),
          focused && !error && "border-tt-focus border-2",
          error && focused && "border-tt-danger border-2",
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
          placeholderTextColor={colors.fgFaint}
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
