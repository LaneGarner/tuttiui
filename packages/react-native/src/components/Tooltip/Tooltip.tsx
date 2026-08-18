import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Pressable,
  Text,
  View,
  type PressableProps,
  type ViewProps,
} from "react-native";
import { cn } from "@tuttiui/shared";

interface TooltipContextValue {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error(
      "TooltipTrigger/TooltipContent must be used within a Tooltip"
    );
  }
  return ctx;
};

export interface TooltipProps {
  children: ReactNode;
  className?: string;
  /** How long the tooltip stays visible after long-press, in ms */
  duration?: number;
}

export const Tooltip = ({ children, className, duration = 1500 }: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const onOpen = useCallback(() => {
    clearHideTimeout();
    setOpen(true);
    hideTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, duration);
  }, [clearHideTimeout, duration]);

  const onClose = useCallback(() => {
    clearHideTimeout();
    setOpen(false);
  }, [clearHideTimeout]);

  useEffect(() => clearHideTimeout, [clearHideTimeout]);

  return (
    <TooltipContext.Provider value={{ open, onOpen, onClose }}>
      <View className={cn("relative self-start", className)}>{children}</View>
    </TooltipContext.Provider>
  );
};

Tooltip.displayName = "Tooltip";

export interface TooltipTriggerProps extends PressableProps {
  children: ReactNode;
}

export const TooltipTrigger = forwardRef<View, TooltipTriggerProps>(
  ({ children, onLongPress, ...props }, ref) => {
    const { onOpen } = useTooltipContext();

    return (
      <Pressable
        ref={ref}
        onLongPress={(e) => {
          onOpen();
          onLongPress?.(e);
        }}
        accessibilityHint="Long press to show tooltip"
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

const sideClasses = {
  top: "bottom-full left-0 mb-2",
  bottom: "top-full left-0 mt-2",
} as const;

export interface TooltipContentProps extends ViewProps {
  side?: "top" | "bottom";
  children: ReactNode;
}

export const TooltipContent = forwardRef<View, TooltipContentProps>(
  ({ side = "top", className, children, ...props }, ref) => {
    const { open } = useTooltipContext();

    if (!open) return null;

    return (
      <View
        ref={ref}
        accessibilityRole="text"
        accessibilityLiveRegion="polite"
        className={cn(
          "absolute z-50 rounded-md bg-tt-inverse px-3 py-1.5 shadow-md",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className="text-xs text-tt-inverse-fg">{children}</Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

TooltipContent.displayName = "TooltipContent";
