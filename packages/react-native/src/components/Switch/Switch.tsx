import { forwardRef, useState } from "react";
import { Pressable, View, Animated, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const switchTrackVariants = cva("rounded-full justify-center", {
  variants: {
    size: {
      sm: "h-5 w-9",
      md: "h-6 w-11",
      lg: "h-7 w-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const thumbSizes: Record<string, { dimension: number; travel: number }> = {
  sm: { dimension: 16, travel: 16 },
  md: { dimension: 20, travel: 20 },
  lg: { dimension: 24, travel: 28 },
};

export interface SwitchProps
  extends ViewProps,
    VariantProps<typeof switchTrackVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch = forwardRef<View, SwitchProps>(
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
    const { dimension, travel } = thumbSizes[sizeKey];

    const [translateX] = useState(() => new Animated.Value(isChecked ? travel : 2));

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      Animated.timing(translateX, {
        toValue: newChecked ? travel : 2,
        duration: 200,
        useNativeDriver: true,
      }).start();
      onCheckedChange?.(newChecked);
    };

    return (
      <Pressable
        ref={ref}
        onPress={handleToggle}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityState={{ checked: isChecked, disabled }}
        className={cn(
          switchTrackVariants({ size }),
          isChecked ? "bg-tt-primary" : "bg-tt-surface-3",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <Animated.View
          // The thumb color is a className now rather than an inline hex, so
          // it follows the theme like everything else.
          className="bg-tt-surface"
          style={[
            {
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
              transform: [{ translateX }],
            },
          ]}
        />
      </Pressable>
    );
  }
);

Switch.displayName = "Switch";

export { switchTrackVariants };
