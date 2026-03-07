import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@tutti-ui/shared";

interface TooltipContextValue {
  open: boolean;
  tooltipId: string;
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
}

export const Tooltip = ({ children, className }: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onOpen = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, 150);
  }, []);

  const onClose = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }, []);

  return (
    <TooltipContext.Provider value={{ open, tooltipId, onOpen, onClose }}>
      <div className={cn("relative inline-block", className)}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

Tooltip.displayName = "Tooltip";

export interface TooltipTriggerProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const TooltipTrigger = forwardRef<HTMLSpanElement, TooltipTriggerProps>(
  ({ children, ...props }, ref) => {
    const { tooltipId, open, onOpen, onClose } = useTooltipContext();

    return (
      <span
        ref={ref}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        onFocus={onOpen}
        onBlur={onClose}
        aria-describedby={open ? tooltipId : undefined}
        {...props}
      >
        {children}
      </span>
    );
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

const sideClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ side = "top", className, children, ...props }, ref) => {
    const { open, tooltipId } = useTooltipContext();

    if (!open) return null;

    return (
      <div
        ref={ref}
        id={tooltipId}
        role="tooltip"
        className={cn(
          "absolute z-50 rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TooltipContent.displayName = "TooltipContent";
