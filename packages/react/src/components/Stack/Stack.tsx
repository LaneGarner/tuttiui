import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    spacing: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    wrap: {
      true: "flex-wrap",
      false: "",
    },
  },
  defaultVariants: {
    direction: "column",
    spacing: "md",
    align: "stretch",
  },
});

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, wrap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stackVariants({ direction, spacing, align, justify, wrap }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

export type VStackProps = Omit<StackProps, "direction">;

export const VStack = forwardRef<HTMLDivElement, VStackProps>(
  ({ children, ...props }, ref) => {
    return (
      <Stack ref={ref} direction="column" {...props}>
        {children}
      </Stack>
    );
  }
);

VStack.displayName = "VStack";

export type HStackProps = Omit<StackProps, "direction">;

export const HStack = forwardRef<HTMLDivElement, HStackProps>(
  ({ children, ...props }, ref) => {
    return (
      <Stack ref={ref} direction="row" {...props}>
        {children}
      </Stack>
    );
  }
);

HStack.displayName = "HStack";

export { stackVariants };
