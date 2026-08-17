import { forwardRef, type ReactNode } from "react";
import { View, Pressable, Text, type ViewProps } from "react-native";
import { cva } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

export interface TabBarProps extends ViewProps {
  bottomInset?: number;
}

export const TabBar = forwardRef<View, TabBarProps>(
  ({ className, bottomInset = 0, style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        accessibilityRole={"tablist" as any}
        className={cn(
          "flex-row items-stretch border-t border-tt-border bg-tt-surface",
          className
        )}
        style={[{ paddingBottom: bottomInset }, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

TabBar.displayName = "TabBar";

const tabBarItemTextVariants = cva("text-xs font-medium", {
  variants: {
    active: {
      true: "text-tt-primary",
      false: "text-tt-fg-muted",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export interface TabBarItemProps extends ViewProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const TabBarItem = forwardRef<View, TabBarItemProps>(
  ({ className, icon, label, active = false, onPress, style, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        accessibilityLabel={label}
        onPress={onPress}
        className={cn(
          "flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5",
          className
        )}
        style={[{ minHeight: 44 }, style as any]}
        {...props}
      >
        {icon}
        <Text className={cn(tabBarItemTextVariants({ active }))}>{label}</Text>
      </Pressable>
    );
  }
);

TabBarItem.displayName = "TabBarItem";

export { tabBarItemTextVariants };
