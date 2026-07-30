import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@tutti-ui/shared";
import { useFormField } from "./FormField";

export interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const FormError = ({ children, className, ...props }: FormErrorProps) => {
  const { id } = useFormField();

  if (!children) {
    return null;
  }

  return (
    <p
      id={`${id}-error`}
      role="alert"
      className={cn("text-sm font-medium text-tt-danger", className)}
      {...props}
    >
      {children}
    </p>
  );
};

FormError.displayName = "FormError";
