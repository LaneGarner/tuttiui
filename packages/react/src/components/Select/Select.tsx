import { forwardRef, type SelectHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

const selectVariants = cva(
  "flex w-full rounded-md border border-gray-300 bg-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-no-repeat",
  {
    variants: {
      size: {
        sm: "h-8 px-2 py-1 text-sm pr-8",
        md: "h-10 px-3 py-2 text-sm pr-8",
        lg: "h-12 px-4 py-3 text-base pr-10",
      },
      error: {
        true: "border-red-500 focus-visible:ring-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    Omit<VariantProps<typeof selectVariants>, "error"> {
  error?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, error, placeholder, children, style, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(selectVariants({ size, error }), className)}
        aria-invalid={error || undefined}
        style={{
          backgroundImage: chevronSvg,
          backgroundPosition: `right ${size === "lg" ? "0.75rem" : "0.5rem"} center`,
          backgroundSize: "1rem",
          ...style,
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export { selectVariants };
