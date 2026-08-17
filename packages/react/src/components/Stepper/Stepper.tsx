import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const stepperVariants = cva(
  "inline-flex items-center rounded-full border border-tt-border bg-tt-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus focus-visible:ring-offset-2 data-[state=disabled]:cursor-not-allowed data-[state=disabled]:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        md: "h-9 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const stepperButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full font-medium text-tt-fg-muted transition-colors hover:bg-tt-surface-hover hover:text-tt-fg disabled:pointer-events-none disabled:opacity-50 before:absolute before:left-1/2 before:top-1/2 before:h-[var(--tt-stepper-hit)] before:w-[var(--tt-stepper-hit)] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const stepperValueVariants = cva(
  "select-none text-center tabular-nums text-tt-fg",
  {
    variants: {
      size: {
        sm: "min-w-6",
        md: "min-w-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const REPEAT_START_DELAY = 500;
const REPEAT_INITIAL_INTERVAL = 250;
const REPEAT_MIN_INTERVAL = 100;
const REPEAT_ACCELERATION = 25;

export interface StepperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof stepperVariants> {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** Hold-to-accelerate: repeats after 500ms, accelerating 250ms -> 100ms */
  longPressRepeat?: boolean;
  /** Minimum hit-target size in px for each button (default 44) */
  hitSlop?: number;
  disabled?: boolean;
  "aria-label": string;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      size,
      value,
      onChange,
      min = 0,
      max,
      longPressRepeat = false,
      hitSlop = 44,
      disabled,
      style,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const clamp = useCallback(
      (next: number) => {
        const lower = Math.max(next, min);
        return max !== undefined ? Math.min(lower, max) : lower;
      },
      [min, max]
    );

    const holdValueRef = useRef(value);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalRef = useRef(REPEAT_INITIAL_INTERVAL);

    useEffect(() => {
      holdValueRef.current = value;
    }, [value]);

    const clearRepeat = useCallback(() => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }, []);

    useEffect(() => clearRepeat, [clearRepeat]);

    const stepFromHold = useCallback(
      (direction: 1 | -1) => {
        const next = clamp(holdValueRef.current + direction);
        if (next === holdValueRef.current) {
          clearRepeat();
          return false;
        }
        holdValueRef.current = next;
        onChange(next);
        return true;
      },
      [clamp, clearRepeat, onChange]
    );

    const startRepeat = useCallback(
      (direction: 1 | -1) => {
        clearRepeat();
        holdValueRef.current = value;
        if (!stepFromHold(direction)) return;
        intervalRef.current = REPEAT_INITIAL_INTERVAL;
        timerRef.current = setTimeout(function tick() {
          if (!stepFromHold(direction)) return;
          intervalRef.current = Math.max(
            REPEAT_MIN_INTERVAL,
            intervalRef.current - REPEAT_ACCELERATION
          );
          timerRef.current = setTimeout(tick, intervalRef.current);
        }, REPEAT_START_DELAY);
      },
      [clearRepeat, stepFromHold, value]
    );

    const handlePointerDown = (direction: 1 | -1) => (event: PointerEvent) => {
      if (!longPressRepeat) return;
      if (typeof event.button === "number" && event.button > 0) return;
      startRepeat(direction);
    };

    const handleClick = (direction: 1 | -1) => (event: React.MouseEvent) => {
      // With longPressRepeat, pointer-originated presses already stepped on
      // pointerdown; only keyboard-originated clicks (detail === 0) step here.
      if (longPressRepeat && event.detail > 0) return;
      onChange(clamp(value + direction));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (disabled || event.defaultPrevented) return;
      let next: number | undefined;
      switch (event.key) {
        case "ArrowUp":
          next = clamp(value + 1);
          break;
        case "ArrowDown":
          next = clamp(value - 1);
          break;
        case "Home":
          next = min;
          break;
        case "End":
          if (max !== undefined) next = max;
          break;
        default:
          return;
      }
      event.preventDefault();
      if (next !== undefined && next !== value) {
        onChange(next);
      }
    };

    const atMin = value <= min;
    const atMax = max !== undefined && value >= max;
    const state = disabled
      ? "disabled"
      : atMin
        ? "at-min"
        : atMax
          ? "at-max"
          : "idle";

    return (
      <div
        ref={ref}
        role="spinbutton"
        tabIndex={disabled ? -1 : 0}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled || undefined}
        data-size={size ?? "md"}
        data-state={state}
        className={cn(stepperVariants({ size }), className)}
        style={
          {
            "--tt-stepper-hit": `${hitSlop}px`,
            ...style,
          } as React.CSSProperties
        }
        onKeyDown={handleKeyDown}
        {...props}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Decrease"
          disabled={disabled || atMin}
          className={cn(stepperButtonVariants({ size }))}
          onPointerDown={handlePointerDown(-1)}
          onPointerUp={clearRepeat}
          onPointerLeave={clearRepeat}
          onPointerCancel={clearRepeat}
          onClick={handleClick(-1)}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 6h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span aria-hidden="true" className={cn(stepperValueVariants({ size }))}>
          {value}
        </span>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Increase"
          disabled={disabled || atMax}
          className={cn(stepperButtonVariants({ size }))}
          onPointerDown={handlePointerDown(1)}
          onPointerUp={clearRepeat}
          onPointerLeave={clearRepeat}
          onPointerCancel={clearRepeat}
          onClick={handleClick(1)}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 2v8M2 6h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { stepperVariants, stepperButtonVariants };
