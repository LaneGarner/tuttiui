import { forwardRef } from "react";
import { Pressable, View, type ViewProps } from "react-native";
import { cva } from "class-variance-authority";
import { cn } from "@tuttiui/shared";
import { useRadioGroupContext } from "./RadioGroup";

const radioOuterVariants = cva(
  "h-5 w-5 rounded-full border-2 items-center justify-center",
  {
    variants: {
      checked: {
        true: "border-tt-primary",
        false: "border-tt-border-strong",
      },
      disabled: {
        true: "opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

const radioInnerVariants = cva("rounded-full bg-tt-primary", {
  variants: {
    checked: {
      true: "h-2.5 w-2.5",
      false: "h-0 w-0",
    },
  },
  defaultVariants: {
    checked: false,
  },
});

export interface RadioItemProps extends ViewProps {
  value: string;
  disabled?: boolean;
}

export const RadioItem = forwardRef<View, RadioItemProps>(
  ({ className, value, disabled: itemDisabled, ...props }, ref) => {
    const {
      value: groupValue,
      onValueChange,
      disabled: groupDisabled,
    } = useRadioGroupContext();

    const disabled = itemDisabled ?? groupDisabled ?? false;
    const checked = groupValue === value;

    return (
      <Pressable
        ref={ref}
        accessibilityRole="radio"
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={() => onValueChange(value)}
        className={cn(radioOuterVariants({ checked, disabled }), className)}
        {...props}
      >
        <View className={cn(radioInnerVariants({ checked }))} />
      </Pressable>
    );
  }
);

RadioItem.displayName = "RadioItem";

export { radioOuterVariants, radioInnerVariants };
