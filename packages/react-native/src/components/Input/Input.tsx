import { forwardRef, useState } from "react";
import { View, TextInput, type TextInputProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, useTheme } from "@tutti-ui/shared";

const inputContainerVariants = cva(
  "rounded-md border border-tt-border-strong bg-tt-field",
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

const inputTextVariants = cva("flex-1 text-tt-fg", {
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
    // Values that can't be a className read the resolved theme instead of a
    // hardcoded hex. ThemeContext defaults to lightColors, so a tree without a
    // ThemeProvider degrades to light rather than crashing.
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);

    return (
      <View
        className={cn(
          inputContainerVariants({ size }),
          "justify-center",
          focused && !error && "border-tt-focus border-2",
          error && "border-tt-danger",
          error && focused && "border-tt-danger border-2",
          disabled && "opacity-50",
          className
        )}
      >
        <TextInput
          ref={ref}
          className={cn(inputTextVariants({ size }))}
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

Input.displayName = "Input";

export { inputContainerVariants, inputTextVariants };
