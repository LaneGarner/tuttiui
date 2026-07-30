import { forwardRef } from "react";
import { View, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

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
  extends ViewProps,
    VariantProps<typeof dividerVariants> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Divider = forwardRef<View, DividerProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(dividerVariants({ orientation }), className)}
        accessibilityRole={decorative ? "none" : "separator" as any}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { dividerVariants };
