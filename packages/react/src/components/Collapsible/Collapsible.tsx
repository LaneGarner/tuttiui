import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

export const useCollapsibleContext = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error(
      "CollapsibleTrigger/CollapsibleContent must be used within a Collapsible"
    );
  }
  return ctx;
};

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      defaultOpen,
      onOpenChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contentId = useId();
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(
      defaultOpen ?? false
    );

    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const handleOpenChange = useCallback(
      (nextOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [isControlled, onOpenChange]
    );

    return (
      <CollapsibleContext.Provider
        value={{ open, onOpenChange: handleOpenChange, contentId }}
      >
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={className}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

export interface CollapsibleTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, children, onClick, ...props }, ref) => {
  const ctx = useCollapsibleContext();

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      data-state={ctx.open ? "open" : "closed"}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-tt-fg transition-colors hover:text-tt-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        ctx.onOpenChange(!ctx.open);
      }}
      {...props}
    >
      {children}
    </button>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const collapsibleContentVariants = cva(
  "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
  {
    variants: {
      state: {
        open: "grid-rows-[1fr]",
        closed: "grid-rows-[0fr]",
      },
    },
    defaultVariants: {
      state: "closed",
    },
  }
);

export interface CollapsibleContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof collapsibleContentVariants> {}

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const ctx = useCollapsibleContext();
  const state = ctx.open ? "open" : "closed";

  return (
    <div
      ref={ref}
      id={ctx.contentId}
      data-state={state}
      aria-hidden={ctx.open ? undefined : true}
      className={cn(collapsibleContentVariants({ state }), className)}
      {...props}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";
