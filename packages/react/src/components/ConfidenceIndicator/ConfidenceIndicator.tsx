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

function getBarColor(value: number): string {
  if (value < 30) return "bg-red-500";
  if (value < 60) return "bg-amber-500";
  return "bg-green-500";
}

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
              <span className="font-medium text-gray-700">{label}</span>
            )}
            {showPercentage && (
              <span className="text-gray-500">{clampedValue}%</span>
            )}
          </div>
        )}
        <div
          className={cn(
            "rounded-full bg-gray-200 overflow-hidden",
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              getBarColor(clampedValue)
            )}
            style={{ width: `${clampedValue}%` }}
            data-testid="confidence-bar"
          />
        </div>
      </div>
    );
  }
);

ConfidenceIndicator.displayName = "ConfidenceIndicator";
