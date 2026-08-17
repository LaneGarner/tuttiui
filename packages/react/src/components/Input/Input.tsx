import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const inputVariants = cva(
  "flex w-full rounded-md border border-tt-border-strong bg-tt-field text-sm text-tt-fg transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-tt-fg-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 py-1 text-sm",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        // The error state was purely visual before — a screen reader had no
        // way to know the field was invalid.
        aria-invalid={error || undefined}
        className={cn(
          inputVariants({ size }),
          error && "border-tt-danger focus-visible:ring-tt-focus",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { inputVariants };
