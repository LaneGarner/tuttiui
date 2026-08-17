import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const textareaVariants = cva(
  "flex min-h-[5rem] w-full rounded-md border border-tt-border-strong bg-tt-field px-3 py-2 text-sm text-tt-fg transition-colors placeholder:text-tt-fg-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      error: {
        true: "border-tt-danger focus-visible:ring-tt-focus",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof textareaVariants>, "error"> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ error }), className)}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { textareaVariants };
