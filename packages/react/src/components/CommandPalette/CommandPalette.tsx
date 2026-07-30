import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@tutti-ui/shared";

export interface CommandItem {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
}

export const CommandPalette = ({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command...",
  emptyMessage = "No results found.",
}: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const enabledIndices = filteredItems.reduce<number[]>((acc, item, index) => {
    if (!item.disabled) acc.push(index);
    return acc;
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback(
    (item: CommandItem) => {
      if (item.disabled) return;
      item.onSelect();
      onOpenChange(false);
    },
    [onOpenChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (enabledIndices.length === 0) return;
        const currentPos = enabledIndices.indexOf(selectedIndex);
        const nextPos =
          currentPos < 0
            ? 0
            : (currentPos + 1) % enabledIndices.length;
        setSelectedIndex(enabledIndices[nextPos]);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (enabledIndices.length === 0) return;
        const currentPos = enabledIndices.indexOf(selectedIndex);
        const prevPos =
          currentPos <= 0
            ? enabledIndices.length - 1
            : currentPos - 1;
        setSelectedIndex(enabledIndices[prevPos]);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredItems[selectedIndex];
        if (item && !item.disabled) {
          handleSelect(item);
        }
        return;
      }
    },
    [enabledIndices, selectedIndex, filteredItems, handleSelect, onOpenChange]
  );

  if (!open) return null;

  return createPortal(
    <div onKeyDown={handleKeyDown}>
      <div
        className="fixed inset-0 z-50 bg-tt-overlay"
        onClick={() => onOpenChange(false)}
        data-testid="command-palette-overlay"
      />
      <div className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-lg border border-tt-border bg-tt-surface text-tt-fg shadow-2xl overflow-hidden">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full border-b border-tt-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-tt-fg-faint"
          data-testid="command-palette-input"
        />
        <div className="max-h-72 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-tt-fg-faint">
              {emptyMessage}
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                role="option"
                aria-selected={index === selectedIndex}
                aria-disabled={item.disabled}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors",
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : index === selectedIndex
                      ? "bg-tt-primary-subtle text-tt-primary-on-subtle"
                      : "text-tt-fg-muted hover:bg-tt-surface-hover"
                )}
                onClick={() => handleSelect(item)}
                data-testid={`command-item-${item.id}`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.category && (
                    <span className="text-xs text-tt-fg-faint">
                      {item.category}
                    </span>
                  )}
                </div>
                {item.shortcut && (
                  <kbd className="text-xs text-tt-fg-faint bg-tt-surface-2 px-1.5 py-0.5 rounded">
                    {item.shortcut}
                  </kbd>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

CommandPalette.displayName = "CommandPalette";
