import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  type ViewProps,
  type TextProps,
} from "react-native";
import { cn } from "@tuttiui/shared";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog compound components must be used within <Dialog>");
  }
  return context;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
        statusBarTranslucent
      >
        {open ? children : null}
      </Modal>
    </DialogContext.Provider>
  );
};

Dialog.displayName = "Dialog";

export interface DialogOverlayProps extends ViewProps {}

export const DialogOverlay = forwardRef<View, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    return (
      <Pressable
        ref={ref}
        className={cn("absolute inset-0 bg-tt-overlay", className)}
        onPress={() => onOpenChange(false)}
        accessibilityLabel="Close dialog"
        {...props}
      />
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps extends ViewProps {
  children: ReactNode;
}

export const DialogContent = forwardRef<View, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View className="flex-1 justify-center items-center">
        <DialogOverlay />
        <View
          ref={ref}
          accessibilityRole={"dialog" as any}
          className={cn(
            "w-11/12 max-w-lg rounded-lg bg-tt-surface p-6 shadow-lg",
            className
          )}
          {...props}
        >
          {children}
        </View>
      </View>
    );
  }
);

DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends ViewProps {}

export const DialogHeader = forwardRef<View, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("gap-1.5", className)}
        {...props}
      />
    );
  }
);

DialogHeader.displayName = "DialogHeader";

export interface DialogTitleProps extends TextProps {}

export const DialogTitle = forwardRef<Text, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        accessibilityRole="header"
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  }
);

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps extends TextProps {}

export const DialogDescription = forwardRef<Text, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-sm text-tt-fg-subtle", className)}
        {...props}
      />
    );
  }
);

DialogDescription.displayName = "DialogDescription";

export interface DialogFooterProps extends ViewProps {}

export const DialogFooter = forwardRef<View, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-row justify-end gap-2 mt-4", className)}
        {...props}
      />
    );
  }
);

DialogFooter.displayName = "DialogFooter";

export interface DialogCloseProps extends ViewProps {
  children?: ReactNode;
}

export const DialogClose = forwardRef<View, DialogCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    return (
      <Pressable
        ref={ref}
        accessibilityLabel="Close"
        accessibilityRole="button"
        onPress={() => onOpenChange(false)}
        className={cn("absolute right-4 top-4 z-10", className)}
        {...props}
      >
        {children ?? (
          <Text className="text-tt-fg-subtle text-lg leading-none">
            {"\u2715"}
          </Text>
        )}
      </Pressable>
    );
  }
);

DialogClose.displayName = "DialogClose";
