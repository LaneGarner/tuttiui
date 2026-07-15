import { forwardRef } from "react";
import { View, Text, type ViewProps, type TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

const cardVariants = cva("rounded-lg border bg-white", {
  variants: {
    variant: {
      default: "border-gray-200 shadow-sm",
      outline: "border-gray-200",
      elevated: "border-gray-200 shadow-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<View, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends ViewProps {}

export const CardHeader = forwardRef<View, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-col gap-1.5 p-6", className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends TextProps {}

export const CardTitle = forwardRef<Text, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight text-gray-900", className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends TextProps {}

export const CardDescription = forwardRef<Text, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-sm text-gray-500", className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

export interface CardContentProps extends ViewProps {}

export const CardContent = forwardRef<View, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    );
  }
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends ViewProps {}

export const CardFooter = forwardRef<View, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex flex-row items-center p-6 pt-0", className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export { cardVariants };
