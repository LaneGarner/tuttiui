import {
  createContext,
  forwardRef,
  useContext,
  type ReactNode,
} from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  type ViewProps,
  type TextProps,
} from "react-native";
import { cn } from "@tutti-ui/shared";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snapPoint?: number;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet compound components must be used within <Sheet>");
  }
  return context;
}

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Viewport-height fractions. On native the sheet rests at the FIRST point
   * only — multi-point snapping is a web-only affordance (see PARITY.md).
   */
  snapPoints?: number[];
  children: ReactNode;
}

export const Sheet = ({
  open,
  onOpenChange,
  snapPoints,
  children,
}: SheetProps) => {
  return (
    <SheetContext.Provider
      value={{ open, onOpenChange, snapPoint: snapPoints?.[0] }}
    >
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => onOpenChange(false)}
        statusBarTranslucent
      >
        {open ? children : null}
      </Modal>
    </SheetContext.Provider>
  );
};

Sheet.displayName = "Sheet";

export interface SheetOverlayProps extends ViewProps {}

export const SheetOverlay = forwardRef<View, SheetOverlayProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useSheetContext();

    return (
      <Pressable
        ref={ref}
        className={cn("absolute inset-0 bg-tt-overlay", className)}
        onPress={() => onOpenChange(false)}
        accessibilityLabel="Close sheet"
        {...props}
      />
    );
  }
);

SheetOverlay.displayName = "SheetOverlay";

export interface SheetContentProps extends ViewProps {
  children: ReactNode;
}

export const SheetContent = forwardRef<View, SheetContentProps>(
  ({ className, children, style, ...props }, ref) => {
    const { snapPoint } = useSheetContext();

    return (
      <View className="flex-1 justify-end">
        <SheetOverlay />
        <View
          ref={ref}
          accessibilityViewIsModal
          className={cn(
            "w-full rounded-t-2xl bg-tt-surface p-6 pt-2 shadow-lg",
            snapPoint === undefined && "max-h-[85%]",
            className
          )}
          style={[
            snapPoint !== undefined ? { height: `${snapPoint * 100}%` } : null,
            style,
          ]}
          {...props}
        >
          <View
            className="mb-4 h-1.5 w-10 self-center rounded-full bg-tt-border"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          />
          {children}
        </View>
      </View>
    );
  }
);

SheetContent.displayName = "SheetContent";

export interface SheetHeaderProps extends ViewProps {}

export const SheetHeader = forwardRef<View, SheetHeaderProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} className={cn("gap-1.5", className)} {...props} />;
  }
);

SheetHeader.displayName = "SheetHeader";

export interface SheetTitleProps extends TextProps {}

export const SheetTitle = forwardRef<Text, SheetTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        accessibilityRole="header"
        className={cn(
          "text-lg font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    );
  }
);

SheetTitle.displayName = "SheetTitle";

export interface SheetDescriptionProps extends TextProps {}

export const SheetDescription = forwardRef<Text, SheetDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-sm text-tt-fg-subtle", className)}
        {...props}
      />
    );
  }
);

SheetDescription.displayName = "SheetDescription";

export interface SheetFooterProps extends ViewProps {}

export const SheetFooter = forwardRef<View, SheetFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-row justify-end gap-2 mt-4", className)}
        {...props}
      />
    );
  }
);

SheetFooter.displayName = "SheetFooter";

export interface SheetCloseProps extends ViewProps {
  children?: ReactNode;
}

export const SheetClose = forwardRef<View, SheetCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { onOpenChange } = useSheetContext();

    return (
      <Pressable
        ref={ref}
        accessibilityLabel="Close"
        accessibilityRole="button"
        onPress={() => onOpenChange(false)}
        className={cn("absolute right-4 top-4 z-10", className)}
        {...props}
      >
        {children ?? (
          <Text className="text-tt-fg-subtle text-lg leading-none">
            {"✕"}
          </Text>
        )}
      </Pressable>
    );
  }
);

SheetClose.displayName = "SheetClose";
