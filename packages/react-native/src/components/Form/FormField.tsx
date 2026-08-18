import { createContext, forwardRef, useContext, type ReactNode } from "react";
import { View, type ViewProps } from "react-native";
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

export interface FormFieldProps extends ViewProps {
  id: string;
  error?: string;
  required?: boolean;
  name?: string;
  children: ReactNode;
}

export const FormField = forwardRef<View, FormFieldProps>(
  ({ id, error, required, name, children, className, ...props }, ref) => {
    return (
      <FormFieldContext.Provider value={{ id, error, required, name }}>
        <View ref={ref} className={cn("gap-1.5", className)} {...props}>
          {children}
        </View>
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = "FormField";
