import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const alertVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-tt-canvas border-tt-border text-tt-fg-strong",
      info: "bg-tt-info-subtle border-tt-info-border text-tt-info-on-subtle",
      success: "bg-tt-success-subtle border-tt-success-border text-tt-success-on-subtle",
      warning: "bg-tt-warning-subtle border-tt-warning-border text-tt-warning-on-subtle",
      error: "bg-tt-danger-subtle border-tt-danger-border text-tt-danger-on-subtle",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onDismiss?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, onDismiss, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {children}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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

Alert.displayName = "Alert";

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-tight", className)}
        {...props}
      >
        {children}
      </h5>
    );
  }
);

AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps
  extends HTMLAttributes<HTMLDivElement> {}

const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-sm opacity-90", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
