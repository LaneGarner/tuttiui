import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@tutti-ui/shared";

export interface ConfidenceIndicatorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "h-1.5 w-24",
  md: "h-2 w-40",
  lg: "h-3 w-64",
};

type ConfidenceLevel = "low" | "medium" | "high";

function getLevel(value: number): ConfidenceLevel {
  if (value < 30) return "low";
  if (value < 60) return "medium";
  return "high";
}

const levelBarColor: Record<ConfidenceLevel, string> = {
  low: "bg-tt-danger",
  medium: "bg-tt-warning",
  high: "bg-tt-success",
};

export const ConfidenceIndicator = forwardRef<
  HTMLDivElement,
  ConfidenceIndicatorProps
>(
  (
    {
      className,
      value,
      label,
      showPercentage = true,
      size = "md",
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <div
        ref={ref}
        role="meter"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Confidence: ${clampedValue}%`}
        className={cn("inline-flex flex-col", className)}
        {...props}
      >
        {(label || showPercentage) && (
          <div className="flex items-center justify-between text-sm mb-1">
            {label && (
              <span className="font-medium text-tt-fg-muted">{label}</span>
            )}
            {showPercentage && (
              <span className="text-tt-fg-subtle">{clampedValue}%</span>
            )}
          </div>
        )}
        <div
          className={cn(
            "rounded-full bg-tt-surface-3 overflow-hidden",
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              levelBarColor[getLevel(clampedValue)]
            )}
            style={{ width: `${clampedValue}%` }}
            data-level={getLevel(clampedValue)}
            data-testid="confidence-bar"
          />
        </div>
      </div>
    );
  }
);

ConfidenceIndicator.displayName = "ConfidenceIndicator";
