import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@tuttiui/shared";

export interface FormFieldContextValue {
  id: string;
  error?: string;
  required?: boolean;
  name?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField(): FormFieldContextValue {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within a FormField");
  }
  return context;
}

export interface FormFieldProps {
  id: string;
  error?: string;
  required?: boolean;
  name?: string;
  children: ReactNode;
  className?: string;
}

export const FormField = ({
  id,
  error,
  required,
  name,
  children,
  className,
}: FormFieldProps) => {
  return (
    <FormFieldContext.Provider value={{ id, error, required, name }}>
      <div className={cn("space-y-1.5", className)}>{children}</div>
    </FormFieldContext.Provider>
  );
};

FormField.displayName = "FormField";
