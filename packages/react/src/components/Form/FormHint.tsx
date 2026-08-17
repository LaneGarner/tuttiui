import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@tutti-ui/shared";
import { useFormField } from "./FormField";

export interface FormHintProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const FormHint = ({ children, className, ...props }: FormHintProps) => {
  const { id } = useFormField();

  return (
    <p
      id={`${id}-hint`}
      className={cn("text-sm text-tt-fg-subtle", className)}
      {...props}
    >
      {children}
    </p>
  );
};

FormHint.displayName = "FormHint";
