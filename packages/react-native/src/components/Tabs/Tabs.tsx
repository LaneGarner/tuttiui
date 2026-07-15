import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { View, Pressable, Text, type ViewProps } from "react-native";
import { cva } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(
      "TabsList/TabsTrigger/TabsContent must be used within a Tabs"
    );
  }
  return ctx;
};

export interface TabsProps extends ViewProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export const Tabs = forwardRef<View, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      className,
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
      <TabsContext.Provider
        value={{ value: currentValue, onValueChange: handleValueChange }}
      >
        <View ref={ref} className={className} {...props}>
          {children}
        </View>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

export interface TabsListProps extends ViewProps {}

export const TabsList = forwardRef<View, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        accessibilityRole={"tablist" as any}
        className={cn(
          "flex-row items-center gap-1 border-b border-gray-200",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

TabsList.displayName = "TabsList";

const triggerTextVariants = cva("text-sm font-medium", {
  variants: {
    active: {
      true: "text-blue-600",
      false: "text-gray-500",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export interface TabsTriggerProps extends ViewProps {
  value: string;
  children: ReactNode;
}

export const TabsTrigger = forwardRef<View, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const ctx = useTabsContext();
    const isActive = ctx.value === value;

    return (
      <Pressable
        ref={ref}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        className={cn(
          "items-center justify-center px-3 py-2",
          isActive && "border-b-2 border-blue-600 -mb-px",
          className
        )}
        onPress={() => ctx.onValueChange(value)}
        {...props}
      >
        <Text className={cn(triggerTextVariants({ active: isActive }))}>
          {children}
        </Text>
      </Pressable>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends ViewProps {
  value: string;
  children: ReactNode;
}

export const TabsContent = forwardRef<View, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const ctx = useTabsContext();
    const isActive = ctx.value === value;

    if (!isActive) return null;

    return (
      <View
        ref={ref}
        accessibilityRole={"summary" as any}
        className={cn("mt-2", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

TabsContent.displayName = "TabsContent";
