import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "@tutti-ui/shared";

export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroupContext = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("RadioItem must be used within a RadioGroup");
  }
  return ctx;
};

export interface RadioGroupProps extends ViewProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
}

export const RadioGroup = forwardRef<View, RadioGroupProps>(
  (
    {
      name,
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? ""
    );

    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value: currentValue,
          onValueChange: handleValueChange,
          disabled,
        }}
      >
        <View
          ref={ref}
          accessibilityRole="radiogroup"
          className={cn("flex-col gap-2", className)}
          {...props}
        >
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
