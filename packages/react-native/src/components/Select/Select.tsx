import { forwardRef, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewProps,
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, useTheme } from "@tuttiui/shared";
import { CheckIcon } from "../../primitives";

const selectTriggerVariants = cva(
  "w-full flex-row items-center justify-between rounded-md border border-tt-border-strong bg-tt-field",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4",
      },
      error: {
        true: "border-tt-danger",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

const selectValueVariants = cva("text-tt-fg", {
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

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<ViewProps, "children">,
    Omit<VariantProps<typeof selectTriggerVariants>, "error" | "size"> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  disabled?: boolean;
  /** Accessible label announced for the select trigger */
  label?: string;
}

export const Select = forwardRef<View, SelectProps>(
  (
    {
      className,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Select an option",
      size,
      error,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    // Values that can't be a className read the resolved theme instead of a
    // hardcoded hex. ThemeContext defaults to lightColors, so a tree without a
    // ThemeProvider degrades to light rather than crashing.
    const { colors } = useTheme();
    const [open, setOpen] = useState(false);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const selected = options.find((option) => option.value === value);

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;
      if (!isControlled) {
        setUncontrolledValue(option.value);
      }
      onValueChange?.(option.value);
      setOpen(false);
    };

    return (
      <View ref={ref} className={cn("w-full", className)} {...props}>
        <Pressable
          className={cn(
            selectTriggerVariants({ size, error }),
            disabled && "opacity-50"
          )}
          onPress={() => setOpen(true)}
          disabled={disabled}
          accessibilityRole="combobox"
          accessibilityLabel={label ?? placeholder}
          accessibilityState={{ disabled, expanded: open }}
          accessibilityValue={selected ? { text: selected.label } : undefined}
        >
          <Text
            className={cn(
              selectValueVariants({ size }),
              !selected && "text-tt-fg-faint"
            )}
            numberOfLines={1}
          >
            {selected ? selected.label : placeholder}
          </Text>
          <Text className="text-tt-fg-subtle text-xs ml-2">{"▼"}</Text>
        </Pressable>
        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
          statusBarTranslucent
        >
          <View className="flex-1 justify-end">
            <Pressable
              className="absolute inset-0 bg-tt-overlay"
              onPress={() => setOpen(false)}
              accessibilityLabel="Close options"
            />
            <View className="max-h-96 rounded-t-lg bg-tt-surface pb-6 pt-2 shadow-lg">
              {label || placeholder ? (
                <Text className="px-4 py-2 text-sm font-medium text-tt-fg-subtle">
                  {label ?? placeholder}
                </Text>
              ) : null}
              <ScrollView accessibilityRole="list">
                {options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <Pressable
                      key={option.value}
                      className={cn(
                        "flex-row items-center justify-between px-4 py-3",
                        isSelected && "bg-tt-primary-subtle",
                        option.disabled && "opacity-50"
                      )}
                      onPress={() => handleSelect(option)}
                      disabled={option.disabled}
                      accessibilityRole="menuitem"
                      accessibilityState={{
                        selected: isSelected,
                        disabled: option.disabled,
                      }}
                    >
                      <Text
                        className={cn(
                          "text-base text-tt-fg",
                          isSelected && "font-medium text-tt-primary"
                        )}
                      >
                        {option.label}
                      </Text>
                      {isSelected && <CheckIcon size={16} color={colors.primary} />}
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
);

Select.displayName = "Select";

export { selectTriggerVariants, selectValueVariants };
