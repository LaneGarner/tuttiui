import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const toastVariants = cva(
  "pointer-events-auto flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-tt-surface border-tt-border text-tt-fg",
        success: "bg-tt-success-subtle border-tt-success-border text-tt-success-on-subtle",
        error: "bg-tt-danger-subtle border-tt-danger-border text-tt-danger-on-subtle",
        warning: "bg-tt-warning-subtle border-tt-warning-border text-tt-warning-on-subtle",
        info: "bg-tt-info-subtle border-tt-info-border text-tt-info-on-subtle",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof toastVariants> {
  title?: ReactNode;
  description?: ReactNode;
  onDismiss?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onDismiss, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        data-variant={variant ?? "default"}
        className={cn(toastVariants({ variant }), "relative", className)}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <div className="text-sm font-semibold">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
          {children}
        </div>
        {onDismiss && (
          <button
            type="button"
            className="shrink-0 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-tt-focus"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { toastVariants };
