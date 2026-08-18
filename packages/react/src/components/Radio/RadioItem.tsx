import { forwardRef, type InputHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@tuttiui/shared";
import { useRadioGroupContext } from "./RadioGroup";

const radioItemVariants = cva(
  "peer shrink-0 h-4 w-4 rounded-full border border-tt-border-strong bg-tt-field transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:border-tt-primary accent-tt-primary"
);

export interface RadioItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  value: string;
}

export const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(
  ({ className, value, disabled: itemDisabled, ...props }, ref) => {
    const {
      name,
      value: groupValue,
      onValueChange,
      disabled: groupDisabled,
    } = useRadioGroupContext();

    const disabled = itemDisabled ?? groupDisabled;

    return (
      <input
        ref={ref}
        type="radio"
        name={name}
        value={value}
        checked={groupValue === value}
        disabled={disabled}
        className={cn(radioItemVariants(), className)}
        onChange={() => onValueChange(value)}
        {...props}
      />
    );
  }
);

RadioItem.displayName = "RadioItem";

export { radioItemVariants };
