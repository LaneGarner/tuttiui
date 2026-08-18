import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

const dividerVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full border-t border-tt-border",
      vertical: "h-full border-l border-tt-border self-stretch",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface DividerProps
  extends Omit<HTMLAttributes<HTMLHRElement | HTMLDivElement>, "role">,
    VariantProps<typeof dividerVariants> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Divider = forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    const role = decorative ? "none" : "separator";
    const ariaOrientation = !decorative ? orientation : undefined;

    if (orientation === "vertical") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role={role}
          aria-orientation={ariaOrientation}
          className={cn(dividerVariants({ orientation }), className)}
          {...props}
        />
      );
    }

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        role={role}
        aria-orientation={ariaOrientation}
        className={cn(dividerVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { dividerVariants };
