import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-tt-surface-3",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const barVariants = cva("h-full rounded-full transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-tt-primary",
      success: "bg-tt-success",
      warning: "bg-tt-warning",
      error: "bg-tt-danger",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, size, variant, value = 0, max = 100, ...props }, ref) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = (clampedValue / max) * 100;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          data-part="bar"
          data-variant={variant ?? "default"}
          className={barVariants({ variant })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { progressVariants };
