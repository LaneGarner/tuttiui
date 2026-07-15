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
import { cn } from "@tutti-ui/shared";
import { CheckIcon } from "../../primitives";

const selectTriggerVariants = cva(
  "w-full flex-row items-center justify-between rounded-md border border-gray-300 bg-white",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4",
      },
      error: {
        true: "border-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

const selectValueVariants = cva("text-gray-900", {
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
              !selected && "text-gray-400"
            )}
            numberOfLines={1}
          >
            {selected ? selected.label : placeholder}
          </Text>
          <Text className="text-gray-500 text-xs ml-2">{"▼"}</Text>
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
              className="absolute inset-0 bg-black/50"
              onPress={() => setOpen(false)}
              accessibilityLabel="Close options"
            />
            <View className="max-h-96 rounded-t-lg bg-white pb-6 pt-2 shadow-lg">
              {label || placeholder ? (
                <Text className="px-4 py-2 text-sm font-medium text-gray-500">
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
                        isSelected && "bg-blue-50",
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
                          "text-base text-gray-900",
                          isSelected && "font-medium text-blue-600"
                        )}
                      >
                        {option.label}
                      </Text>
                      {isSelected && <CheckIcon size={16} color="#2563eb" />}
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
