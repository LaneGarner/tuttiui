import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const checkboxVariants = cva(
  "peer shrink-0 rounded border border-tt-border-strong bg-tt-field transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-tt-primary checked:border-tt-primary accent-tt-primary",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof checkboxVariants> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(checkboxVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export { checkboxVariants };
