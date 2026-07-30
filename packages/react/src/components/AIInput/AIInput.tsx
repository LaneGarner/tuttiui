import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  type TextareaHTMLAttributes,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { cn } from "@tutti-ui/shared";

export interface AIInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows" | "onSubmit"> {
  onSubmit?: (value: string) => void;
  loading?: boolean;
  maxRows?: number;
  minRows?: number;
}

export const AIInput = forwardRef<HTMLTextAreaElement, AIInputProps>(
  (
    {
      onSubmit,
      placeholder = "Ask anything...",
      disabled,
      loading,
      maxRows = 6,
      minRows = 1,
      className,
      onChange,
      onKeyDown,
      value: controlledValue,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? String(controlledValue) : internalValue;

    const setRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [ref]
    );

    const computeRows = useCallback(
      (text: string): number => {
        const lineCount = (text.match(/\n/g) || []).length + 1;
        return Math.min(Math.max(lineCount, minRows), maxRows);
      },
      [minRows, maxRows]
    );

    const [rows, setRows] = useState(minRows);

    useEffect(() => {
      setRows(computeRows(value));
    }, [value, computeRows]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || loading) return;
      onSubmit?.(trimmed);
      if (!isControlled) {
        setInternalValue("");
      }
    }, [value, loading, onSubmit, isControlled]);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      onKeyDown?.(e);
    };

    const isEmpty = value.trim().length === 0;

    return (
      <div
        className={cn(
          "relative flex items-end rounded-lg border border-tt-border-strong bg-tt-field text-tt-fg transition-colors focus-within:ring-2 focus-within:ring-tt-focus focus-within:border-transparent",
          className
        )}
      >
        <textarea
          ref={setRef}
          value={value}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-tt-fg-faint disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={placeholder}
          {...props}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isEmpty || loading || disabled}
          className="shrink-0 p-2 m-1 rounded-md bg-tt-primary text-tt-primary-fg hover:bg-tt-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={loading ? "Loading" : "Send"}
        >
          {loading ? (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
              data-testid="ai-input-spinner"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-testid="ai-input-send-icon"
            >
              <path d="M3.105 2.29a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.084L2.28 16.76a.75.75 0 0 0 .826.95l15.5-5.5a.75.75 0 0 0 0-1.42l-15.5-5.5Z" />
            </svg>
          )}
        </button>
      </div>
    );
  }
);

AIInput.displayName = "AIInput";
