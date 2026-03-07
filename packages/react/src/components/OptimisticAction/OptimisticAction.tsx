import { forwardRef, useState, useCallback, useRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

type ActionState = "idle" | "pending" | "confirmed" | "failed";

const optimisticActionVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface OptimisticActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof optimisticActionVariants> {
  onAction: () => Promise<void>;
  confirmLabel?: string;
  pendingLabel?: string;
  failedLabel?: string;
  resetDelay?: number;
}

export const OptimisticAction = forwardRef<HTMLButtonElement, OptimisticActionProps>(
  (
    {
      className,
      variant,
      size,
      onAction,
      confirmLabel = "Done",
      pendingLabel = "Processing...",
      failedLabel = "Failed",
      resetDelay = 2000,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [state, setState] = useState<ActionState>("idle");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = useCallback(async () => {
      if (state !== "idle") return;

      setState("pending");
      try {
        await onAction();
        setState("confirmed");
      } catch {
        setState("failed");
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setState("idle");
      }, resetDelay);
    }, [state, onAction, resetDelay]);

    const stateClasses = {
      idle: "",
      pending: "",
      confirmed: "bg-green-600 hover:bg-green-600 text-white",
      failed: "bg-red-600 hover:bg-red-600 text-white",
    };

    return (
      <button
        ref={ref}
        className={cn(
          optimisticActionVariants({ variant, size }),
          stateClasses[state],
          className
        )}
        disabled={disabled || state === "pending"}
        onClick={handleClick}
        {...props}
      >
        {state === "pending" && (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {pendingLabel}
          </>
        )}
        {state === "confirmed" && (
          <>
            <span aria-hidden="true">{"\u2713"}</span>
            {confirmLabel}
          </>
        )}
        {state === "failed" && (
          <>
            <span aria-hidden="true">{"\u2715"}</span>
            {failedLabel}
          </>
        )}
        {state === "idle" && children}
      </button>
    );
  }
);

OptimisticAction.displayName = "OptimisticAction";

export { optimisticActionVariants };
