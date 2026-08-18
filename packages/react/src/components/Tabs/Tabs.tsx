import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@tuttiui/shared";

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

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const Tabs = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: TabsProps) => {
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
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.displayName = "Tabs";

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, onKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);

      const tablist = e.currentTarget;
      const triggers = Array.from(
        tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      );
      const currentIndex = triggers.indexOf(e.target as HTMLButtonElement);

      if (currentIndex === -1) return;

      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % triggers.length;
          break;
        case "ArrowLeft":
          nextIndex =
            (currentIndex - 1 + triggers.length) % triggers.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = triggers.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      triggers[nextIndex].focus();
    };

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          "inline-flex items-center gap-1 border-b border-tt-border",
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, onClick, ...props }, ref) => {
    const ctx = useTabsContext();
    const isActive = ctx.value === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={`tab-${value}`}
        aria-selected={isActive}
        aria-controls={`panel-${value}`}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus",
          isActive
            ? "text-tt-primary border-b-2 border-tt-primary -mb-px"
            : "text-tt-fg-subtle hover:text-tt-fg-muted",
          className
        )}
        onClick={(e) => {
          onClick?.(e);
          ctx.onValueChange(value);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const ctx = useTabsContext();
    const isActive = ctx.value === value;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={isActive ? 0 : undefined}
        hidden={!isActive}
        className={cn(
          "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";
