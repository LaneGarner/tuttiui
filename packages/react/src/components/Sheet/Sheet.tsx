import {
  forwardRef,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  snapPoints?: number[];
  activeSnap: number;
  setActiveSnap: (index: number) => void;
  dismissOnDrag: boolean;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet compound components must be used within <Sheet>");
  }
  return context;
}

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Viewport-height fractions the sheet can rest at (e.g. [0.5, 0.9]).
   * The sheet opens at the first point; dragging up/down moves between
   * points. Omit for a content-sized sheet (single implicit point).
   */
  snapPoints?: number[];
  /** Dragging the sheet downward past a threshold closes it. */
  dismissOnDrag?: boolean;
  children: ReactNode;
}

export const Sheet = ({
  open,
  onOpenChange,
  snapPoints,
  dismissOnDrag = false,
  children,
}: SheetProps) => {
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const [activeSnap, setActiveSnap] = useState(0);

  useEffect(() => {
    if (open) setActiveSnap(0);
  }, [open]);

  return (
    <SheetContext.Provider
      value={{
        open,
        onOpenChange,
        titleId,
        descriptionId,
        snapPoints,
        activeSnap,
        setActiveSnap,
        dismissOnDrag,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
};

Sheet.displayName = "Sheet";

export interface SheetOverlayProps extends HTMLAttributes<HTMLDivElement> {}

export const SheetOverlay = forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { open, onOpenChange } = useSheetContext();

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
        data-state={open ? "open" : "closed"}
        className={cn("fixed inset-0 z-50 bg-tt-overlay", className)}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

SheetOverlay.displayName = "SheetOverlay";

const sheetContentVariants = cva(
  "fixed inset-x-0 bottom-0 z-50 flex w-full flex-col rounded-t-2xl border-t border-tt-border bg-tt-surface text-tt-fg shadow-lg transition-[height,transform] duration-300 ease-out motion-reduce:transition-none"
);

/** Minimum downward drag (px) before release closes or snaps down. */
const DRAG_DISMISS_THRESHOLD = 80;

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, style, ...props }, ref) => {
    const {
      open,
      onOpenChange,
      titleId,
      descriptionId,
      snapPoints,
      activeSnap,
      setActiveSnap,
      dismissOnDrag,
    } = useSheetContext();

    const dragStartY = useRef<number | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const dragging = dragStartY.current !== null;

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
        props.onKeyDown?.(e);
      },
      [onOpenChange, props.onKeyDown]
    );

    // Mirrors Dialog's focus handling (move focus into the modal on open).
    // Dialog keeps this inline rather than exposing a shared helper, so it is
    // intentionally duplicated here instead of refactoring Dialog.
    useEffect(() => {
      if (open) {
        const content = document.querySelector<HTMLDivElement>(
          '[data-tt-sheet-content]'
        );
        content?.focus();
      }
    }, [open]);

    // Body scroll lock while open. Dialog predates this and does not lock
    // scroll; kept inline here (not extracted) to avoid touching Dialog.
    useEffect(() => {
      if (!open) return;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }, [open]);

    const draggable = dismissOnDrag || (snapPoints?.length ?? 0) > 1;

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        props.onPointerDown?.(e);
        if (!draggable) return;
        dragStartY.current = e.clientY;
        e.currentTarget.setPointerCapture?.(e.pointerId);
      },
      [draggable, props.onPointerDown]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        props.onPointerMove?.(e);
        if (dragStartY.current === null) return;
        setDragOffset(Math.max(0, e.clientY - dragStartY.current));
      },
      [props.onPointerMove]
    );

    const endDrag = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragStartY.current === null) return;
        const delta = e.clientY - dragStartY.current;
        dragStartY.current = null;
        setDragOffset(0);

        if (delta > DRAG_DISMISS_THRESHOLD) {
          if (snapPoints && activeSnap > 0) {
            setActiveSnap(activeSnap - 1);
          } else if (dismissOnDrag) {
            onOpenChange(false);
          }
        } else if (
          delta < -DRAG_DISMISS_THRESHOLD &&
          snapPoints &&
          activeSnap < snapPoints.length - 1
        ) {
          setActiveSnap(activeSnap + 1);
        }
      },
      [snapPoints, activeSnap, setActiveSnap, dismissOnDrag, onOpenChange]
    );

    const handlePointerUp = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        props.onPointerUp?.(e);
        endDrag(e);
      },
      [endDrag, props.onPointerUp]
    );

    if (!open) return null;

    const snapFraction = snapPoints?.[activeSnap];

    return createPortal(
      <>
        <SheetOverlay />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          data-tt-sheet-content=""
          data-state={open ? "open" : "closed"}
          data-snap={snapFraction ?? undefined}
          className={cn(
            sheetContentVariants(),
            !snapFraction && "max-h-[85vh]",
            dragging && "transition-none",
            className
          )}
          style={{
            ...(snapFraction !== undefined
              ? { height: `${snapFraction * 100}vh` }
              : {}),
            ...(dragOffset > 0
              ? { transform: `translateY(${dragOffset}px)` }
              : {}),
            ...style,
          }}
          {...props}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="mx-auto mt-2 h-1.5 w-10 shrink-0 cursor-grab rounded-full bg-tt-border"
            data-tt-sheet-handle=""
            aria-hidden="true"
          />
          <div className="flex-1 overflow-y-auto p-6 pt-4">{children}</div>
        </div>
      </>,
      document.body
    );
  }
);

SheetContent.displayName = "SheetContent";

export interface SheetHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 text-left", className)}
        {...props}
      />
    );
  }
);

SheetHeader.displayName = "SheetHeader";

export interface SheetTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useSheetContext();

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

SheetTitle.displayName = "SheetTitle";

export interface SheetDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const SheetDescription = forwardRef<
  HTMLParagraphElement,
  SheetDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useSheetContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-tt-fg-subtle", className)}
      {...props}
    />
  );
});

SheetDescription.displayName = "SheetDescription";

export interface SheetFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
          className
        )}
        {...props}
      />
    );
  }
);

SheetFooter.displayName = "SheetFooter";

export interface SheetCloseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useSheetContext();

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

SheetClose.displayName = "SheetClose";
