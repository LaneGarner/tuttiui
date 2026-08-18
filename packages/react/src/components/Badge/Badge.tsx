import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-full font-medium",
  {
    variants: {
      variant: {
        default: "bg-tt-surface-2 text-tt-fg-muted",
        primary: "bg-tt-primary-subtle text-tt-primary-on-subtle",
        success: "bg-tt-success-subtle text-tt-success-on-subtle",
        warning: "bg-tt-warning-subtle text-tt-warning-on-subtle",
        info: "bg-tt-info-subtle text-tt-info-on-subtle",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Pill-shaped inline status label.
 *
 * Variant semantics:
 * - `info` — informational context, e.g. a value produced by a merge or an
 *   override. Nothing is wrong and nothing is required of the user.
 * - `warning` — reserved strictly for "needs a decision from the user". Do
 *   not use it for informational states; if no user decision is pending,
 *   use `info` (or `default`) instead.
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-variant={variant ?? "default"}
        data-size={size ?? "md"}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
