import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-tt-surface shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const thumbCheckedTranslate: Record<string, string> = {
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-7",
};

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked);

    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const sizeKey = size ?? "md";

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        className={cn(
          switchVariants({ size }),
          isChecked ? "bg-tt-primary" : "bg-tt-surface-3",
          className
        )}
        onClick={handleToggle}
        {...props}
      >
        <span
          className={cn(
            thumbVariants({ size }),
            isChecked ? thumbCheckedTranslate[sizeKey] : "translate-x-0"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { switchVariants };
