import {
  forwardRef,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useId,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@tutti-ui/shared";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
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
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  return (
    <DialogContext.Provider value={{ open, onOpenChange, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  );
};

Dialog.displayName = "Dialog";

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onOpenChange(false);
        onClick?.(e);
      },
      [onOpenChange, onClick]
    );

    return (
      <div
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-tt-overlay", className)}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, titleId, descriptionId } = useDialogContext();

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
        props.onKeyDown?.(e);
      },
      [onOpenChange, props.onKeyDown]
    );

    useEffect(() => {
      if (open) {
        const content = document.querySelector<HTMLDivElement>(
          '[role="dialog"]'
        );
        content?.focus();
      }
    }, [open]);

    if (!open) return null;

    return createPortal(
      <>
        <DialogOverlay />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-tt-border bg-tt-surface text-tt-fg p-6 shadow-lg",
            className
          )}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </>,
      document.body
    );
  }
);

DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5 text-center sm:text-left",
          className
        )}
        {...props}
      />
    );
  }
);

DialogHeader.displayName = "DialogHeader";

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDialogContext();

    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn(
          "text-lg font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    );
  }
);

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useDialogContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-tt-fg-subtle", className)}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
          className
        )}
        {...props}
      />
    );
  }
);

DialogFooter.displayName = "DialogFooter";

export interface DialogCloseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onOpenChange(false);
        onClick?.(e);
      },
      [onOpenChange, onClick]
    );

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-tt-focus",
          className
        )}
        onClick={handleClick}
        aria-label="Close"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    );
  }
);

DialogClose.displayName = "DialogClose";
