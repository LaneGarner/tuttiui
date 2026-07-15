import { forwardRef, useState } from "react";
import { Pressable, View, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";
import { CheckIcon } from "../../primitives";

const checkboxVariants = cva(
  "items-center justify-center rounded border border-gray-300 bg-white",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const checkIconSizes: Record<string, number> = {
  sm: 10,
  md: 14,
  lg: 18,
};

export interface CheckboxProps
  extends ViewProps,
    VariantProps<typeof checkboxVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = forwardRef<View, CheckboxProps>(
  (
    {
      className,
      size = "md",
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const sizeKey = size ?? "md";

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <Pressable
        ref={ref}
        onPress={handleToggle}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked, disabled }}
        className={cn(
          checkboxVariants({ size }),
          isChecked && "bg-blue-600 border-blue-600",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        {isChecked && (
          <CheckIcon size={checkIconSizes[sizeKey]} color="#ffffff" />
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { checkboxVariants };
