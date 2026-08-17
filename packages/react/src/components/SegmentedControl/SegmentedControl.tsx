import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

interface SegmentedControlContextValue {
  value: string;
  onChange: (value: string) => void;
  size: "sm" | "md";
  disabled?: boolean;
}

const SegmentedControlContext =
  createContext<SegmentedControlContextValue | null>(null);

const useSegmentedControlContext = () => {
  const ctx = useContext(SegmentedControlContext);
  if (!ctx) {
    throw new Error("Segment must be used within a SegmentedControl");
  }
  return ctx;
};

const segmentedControlVariants = cva(
  "inline-flex items-center rounded-full bg-tt-surface-2 p-1",
  {
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof segmentedControlVariants> {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Connected pill of mutually exclusive options with radiogroup semantics.
 * Controlled only: pass `value` and `onChange`. Arrow keys move focus and
 * select, matching native radio behavior.
 */
const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    { className, value, onChange, size, disabled, children, onKeyDown, ...props },
    ref
  ) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);

      const group = e.currentTarget;
      const segments = Array.from(
        group.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)')
      );
      const currentIndex = segments.indexOf(e.target as HTMLButtonElement);

      if (currentIndex === -1) return;

      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % segments.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (currentIndex - 1 + segments.length) % segments.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = segments.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      const next = segments[nextIndex];
      next.focus();
      const nextValue = next.getAttribute("data-value");
      if (nextValue !== null) {
        onChange(nextValue);
      }
    };

    return (
      <SegmentedControlContext.Provider
        value={{ value, onChange, size: size ?? "md", disabled }}
      >
        <div
          ref={ref}
          role="radiogroup"
          data-size={size ?? "md"}
          className={cn(segmentedControlVariants({ size }), className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";

const segmentVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-8 px-3 text-sm",
      },
      active: {
        true: "bg-tt-surface text-tt-fg-strong shadow-sm",
        false: "bg-transparent text-tt-fg-muted hover:text-tt-fg",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  }
);

export interface SegmentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
  ({ className, value, disabled: segmentDisabled, children, onClick, ...props }, ref) => {
    const {
      value: groupValue,
      onChange,
      size,
      disabled: groupDisabled,
    } = useSegmentedControlContext();

    const isActive = groupValue === value;
    const disabled = segmentDisabled ?? groupDisabled;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isActive}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        data-value={value}
        data-state={isActive ? "active" : "inactive"}
        className={cn(segmentVariants({ size, active: isActive }), className)}
        onClick={(e) => {
          onClick?.(e);
          onChange(value);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Segment.displayName = "Segment";

export { SegmentedControl, Segment, segmentedControlVariants, segmentVariants };
