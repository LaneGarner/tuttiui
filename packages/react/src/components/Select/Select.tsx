import { forwardRef, type SelectHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const selectVariants = cva(
  "flex w-full rounded-md border border-tt-border-strong bg-tt-field text-sm text-tt-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
  {
    variants: {
      size: {
        sm: "h-8 px-2 py-1 text-sm pr-8",
        md: "h-10 px-3 py-2 text-sm pr-8",
        lg: "h-12 px-4 py-3 text-base pr-10",
      },
      error: {
        true: "border-tt-danger focus-visible:ring-tt-focus",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

/**
 * The chevron used to be a `data:` URI in `backgroundImage` with its stroke
 * color baked into the URL. A CSS variable can't be interpolated into a
 * URL-encoded SVG, so a themeable chevron has to be a real element. Rendering
 * it inline with `stroke="currentColor"` also brings Select in line with every
 * other icon in the library and drops the size-dependent `backgroundPosition`
 * arithmetic the old approach needed.
 */
const chevronPosition: Record<"sm" | "md" | "lg", string> = {
  sm: "right-2",
  md: "right-2",
  lg: "right-3",
};

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    Omit<VariantProps<typeof selectVariants>, "error"> {
  error?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  /** Applied to the positioning wrapper rather than the `<select>` itself. */
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      wrapperClassName,
      size = "md",
      error,
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span className={cn("relative block w-full", wrapperClassName)}>
        <select
          ref={ref}
          className={cn(selectVariants({ size, error }), className)}
          aria-invalid={error || undefined}
          data-size={size}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <svg
          aria-hidden="true"
          data-part="chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-tt-fg-faint",
            chevronPosition[size]
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    );
  }
);

Select.displayName = "Select";

export { selectVariants };
